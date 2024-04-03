import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/Layout/SelectComponent";
import { useSetCategories, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { createProduct, getAdminProducts } from "../../redux/actions/otherActions";
import * as Icons from "react-native-heroicons/solid";
import * as ImagePicker from 'expo-image-picker';
import Carousel from "react-native-snap-carousel";
import { IconButton } from "react-native-paper";

const NewProduct = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Choose Category");
    const [categoryID, setCategoryID] = useState(undefined);
    const [categories, setCategories] = useState([]);

    useSetCategories(setCategories, isFocused);
    const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

    const disableBtnCondition =
        !name || !description || !price || !stock || !image;
    
    const fetchProducts = async () => {
        try {
            await dispatch(getAdminProducts());
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
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
                    const newImages = result.assets.map(asset => asset.uri);
                    setImage([...image, ...newImages]);
                }
            } catch (error) {
                console.log('Error picking images:', error);
            }
        };

    const submitHandler = async () => {
        try {
            const myForm = new FormData();
            myForm.append("name", name);
            myForm.append("description", description);
            myForm.append("price", price);
            myForm.append("stock", stock);
            image.forEach((imageUri) => {
                myForm.append(`files`, {
                    uri: imageUri,
                    type: mime.getType(imageUri),
                    name: imageUri.split("/").pop(),
                });
            });
            if (categoryID) {
                myForm.append("category", categoryID);
            }
            await dispatch(createProduct(myForm));
            navigation.navigate("products");
            fetchProducts();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    

    useEffect(() => {
        if (route.params?.image) setImage(route.params.image);
    }, [route.params]);

    useEffect(() => {
        if (route.params?.image) {
            setImage(prevImages => [...prevImages, ...route.params.image]);
        } else if (route.params?.imageSingle) {
            setImage(prevImages => [...prevImages, route.params.imageSingle]);
        }
    }, [route.params]);

    const deleteImage = (index) => {
        const updatedImages = [...image];
        updatedImages.splice(index, 1);
        setImage(updatedImages);
    };

    const renderCarouselItem = ({ item, index }) => (
        <View key={index}>
            {item && (
                <View style={{ marginBottom: 5 }}>
                    <Image
                        style={{ width: 300, height: 150, resizeMode: 'contain' }}
                        source={{ uri: item }}
                    />
                    <IconButton
                        icon="delete"
                        color="#f44336"
                        size={20}
                        onPress={() => deleteImage(index)}
                        style={{ alignSelf: 'center' }}
                    />
                </View>
            )}
        </View>
    );
    
    return (
    <>
        <View style={{ flex: 1, backgroundColor: "#F4B546", padding: 20, }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop:20}}>
                <TouchableOpacity onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        console.log("Can't go back");
                    }
                }}
                    style={{ backgroundColor: "#bc430b", padding: 8, borderRadius: 10, marginLeft: 4, marginTop: 20 }}>
                    <Icons.ArrowLeftIcon size={20} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={{ fontSize: 24, color: "black", fontWeight: "800", marginTop:20 }}>Add Product</Text>
            </View>
            <ScrollView
                style={{
                    backgroundColor: "#FFFFFF",
                }}
            >
            <View
                style={{
                justifyContent: "center",
                height: 630,
                }}
            >
<View style={{ marginTop:20, alignItems: "center" }}>
    {image && image.length > 0 ? (
        <Carousel
            layout="default"
            data={image}
            renderItem={renderCarouselItem}
            sliderWidth={300}
            itemWidth={300}
            // loop={true}
        />
    ) : (
        <Text>No images selected</Text>
    )}
</View>

                <Button
                    mode="contained"
                    onPress={openImagePicker}
                    style={{ backgroundColor: "#BC430B", marginHorizontal: 80 }}
                >
                    Select Images
                </Button>
                <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ backgroundColor: "transparent" }}
                />
                <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={{ backgroundColor: "transparent" }}
                />

                <TextInput
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
                style={{ backgroundColor: "transparent" }}
                />
                <TextInput
                keyboardType="number-pad"
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                style={{ backgroundColor: "transparent" }}
                />

                <Text
                style={{
                    padding: 10,
                    paddingLeft:15,
                    textAlignVertical: "center",
                    marginBottom: 25,
                    backgroundColor: "transparent" 
                }}
                onPress={() => setVisible(true)}
                >
                {category}
                </Text>

                <Button
                textColor={"#FFFFFF"}
                style={{                     
                    backgroundColor: "#BC430B",
                    marginLeft: 80,
                    marginRight: 80,
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 5,
                    borderRadius: 30
                }}
                onPress={submitHandler}
                loading={loading}
                disabled={disableBtnCondition}
                >
                Create
                </Button>
            </View>
            </ScrollView>
        </View>

        <SelectComponent
            categories={categories}
            setCategoryID={setCategoryID}
            setCategory={setCategory}
            visible={visible}
            setVisible={setVisible}
        />
        </>
    );
};


export default NewProduct;