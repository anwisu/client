import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "react-native-heroicons/solid";
import mime from "mime";
import * as ImagePicker from 'expo-image-picker';
import Carousel from "react-native-snap-carousel";
import ImageCard from "../../components/Layout/ImageCard";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { getProductDetails } from "../../redux/actions/productActions";
import { updateProduct } from "../../redux/actions/otherActions";
import SelectComponent from "../../components/Layout/SelectComponent";
import { deleteProductImage, updateProductImage } from "../../redux/actions/otherActions";

const UpdateProduct= ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const { product } = useSelector((state) => state.product);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [categories, setCategories] = useState([]);
    const [images] = useState(route.params.images || []);
    const [productId] = useState(route.params.id);
    const [imageChanged, setImageChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [fetchedImages, setFetchedImages] = useState(route.params.images || []);

    useSetCategories(setCategories, isFocused);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductDetails(route.params.id));
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchData();
    }, [dispatch, route.params.id, isFocused]);
    
    const submitHandler = async () => {
        setLoading(true);
        try {
            await dispatch(updateProduct(route.params.id, name, description, price, stock, categoryID));
            if (selectedImages.length > 0) {
                const myForm = new FormData();
                selectedImages.forEach((image) => {
                    myForm.append("files", {
                        uri: image.uri,
                        type: mime.getType(image.uri),
                        name: image.uri.split("/").pop(),
                    });
                });
                await dispatch(updateProductImage(route.params.id, myForm));
                setSelectedImages([]);
            }
            navigation.navigate("products");
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(String(product.price));
            setStock(String(product.stock));
            setCategory(product.category?.category);
            setCategoryID(product.category?._id);
            setFetchedImages(product.images || []);
        }
    }, [product]);

// Update Images
    useEffect(() => {
        if (route.params?.image) {
            setSelectedImages([...selectedImages, route.params.image]);
        }
    }, [route.params]);

    const openImagePicker = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                multiple: true,
            });

            if (!result.cancelled && result.assets.length > 0) {
                const newImages = result.assets.map(asset => ({ uri: asset.uri, id: asset.id }));
                setSelectedImages([...selectedImages, ...newImages]);
            }
        } catch (error) {
            console.log('Error picking images:', error);
        }
    };

    const deleteHandler = async (imageId, imageUrl) => {
        try {
            console.log("Deleting image with ID:", imageId);
            console.log("Image URL:", imageUrl);
    
            if (imageUrl) {
                console.log("Deleting image from fetched images");
                await dispatch(deleteProductImage(productId, imageId));
                const updatedFetchedImages = fetchedImages.filter((img) => img._id !== imageId);
                setFetchedImages(updatedFetchedImages);
            } else {
                console.log("Deleting image from selected images");
                await dispatch(deleteProductImage(productId, imageId));
                const updatedSelectedImages = selectedImages.filter((img) => img.id !== imageId);
                setSelectedImages(updatedSelectedImages);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };
    
    
    const renderCarouselItem = ({ item }) => {
        const imageId = item._id || item.id;
        const imageUrl = item.url || item.uri;
    
        return (
            <View style={styles.carouselItem}>
                <ImageCard src={imageUrl} id={imageId} deleteHandler={deleteHandler} containerStyle={styles.imageCard} />
            </View>
        );
    };
    
    return (
        <View style={{ flex: 1, backgroundColor: "#f4b546" }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <TouchableOpacity
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        } else {
                            console.log("Can't go back");
                        }
                    }}
                    style={{ backgroundColor: "#bc430b", padding: 10, borderRadius: 5, margin: 10 }}
                >
                    <Icons.ArrowLeftIcon size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", height: 700 }}>
                <ScrollView>
                    <Carousel
                        data={[...(product?.images || []), ...selectedImages]}
                        renderItem={renderCarouselItem}
                        sliderWidth={300}
                        itemWidth={300}
                        layout={"default"}
                    />
                </ScrollView>
                <Button
                    mode="contained"
                    onPress={openImagePicker}
                    style={{ marginBottom: 20,  marginHorizontal: 20, padding: 6, backgroundColor: "#BC430B" }}
                >
                    Select Images
                </Button>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                </View>
    
                {/* Description Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                </View>
    
                {/* Price Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price:</Text>
                    <TextInput
                        placeholder="Price"
                        value={price}
                        keyboardType="number-pad"
                        onChangeText={setPrice}
                        style={styles.input}
                    />
                </View>
    
                {/* Stock Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Stock:</Text>
                    <TextInput
                        placeholder="Stock"
                        value={stock}
                        keyboardType="number-pad"
                        onChangeText={setStock}
                        style={styles.input}
                    />
                </View>
    
                {/* Category Text */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.label}>Category:</Text>
                    <Text
                        style={{
                        textAlign: "center",
                        textAlignVertical: "center",
                        borderRadius: 3,
                        backgroundColor: "#F9DAA2",
                        padding: 5,
                        width: 242,
                        textAlign: "left"
                    }}
                    onPress={() => setVisible(true)}
                    >
                    {category}
                </Text>
                </View> 
                <Button
                    textColor="#FFFFFF"
                    style={{ backgroundColor: "#bc430b", marginHorizontal: 20, padding: 6 }}
                    onPress={submitHandler}
                    loading={loading}
                    disabled={loading}
                >
                    Update
                </Button>
            </View>  
            <SelectComponent
                categories={categories}
                setCategoryID={setCategoryID}
                setCategory={setCategory}
                visible={visible}
                setVisible={setVisible}
            />
        </View>
    );
    
}

export default UpdateProduct;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
        width: 100,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 40, 
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 25,
    },
    categoryLabel: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
        width: 100,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselItem: {
        flex: 1,
    },

});
