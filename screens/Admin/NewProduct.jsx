import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/Layout/SelectComponent";
import { useSetCategories, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { createProduct } from "../../redux/actions/otherActions";
import * as Icons from "react-native-heroicons/solid";
import * as ImagePicker from 'expo-image-picker';
import Carousel from "react-native-snap-carousel";

const NewProduct = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Choose Category");
    const [categoryID, setCategoryID] = useState(undefined);
    const [categories, setCategories] = useState([]);

    useSetCategories(setCategories, isFocused);

    const disableBtnCondition =
        !name || !description || !price || !stock || !image;

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
            image.forEach((imageUri, index) => {
                myForm.append(`files`, {
                    uri: imageUri,
                    type: mime.getType(imageUri),
                    name: imageUri.split("/").pop(),
                });
            });
            if (categoryID) {
                myForm.append("category", categoryID);
            }
            dispatch(createProduct(myForm));
            navigation.navigate("products");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    

    const loading = useMessageAndErrorOther(dispatch, navigation, "products");

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

    const renderCarouselItem = ({ item, index }) => (
        <View key={index}>
            <Image
                style={{ width: 300, height: 150, resizeMode: 'contain' }}
                source={item ? { uri: item } : require("../../assets/images/default-user-icon.jpg")}
            />
        </View>
    );

    return (
    <>
        <View style={{ flex: 1, backgroundColor: "#F4B546", padding: 15 }}>
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text>Create Product</Text>
            </View>
            <View className="flex-row justify-start">
                <TouchableOpacity onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        console.log("Can't go back");
                    }
                }}
                    style={{ backgroundColor: "#bc430b" }}
                    className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-10">
                    <Icons.ArrowLeftIcon size='20' color='white'
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
            style={{
                padding: 20,
                elevation: 10,
                borderRadius: 10,
                backgroundColor: "yellow",
            }}
            >
            <View
                style={{
                justifyContent: "center",
                height: 650,
                }}
            >
                <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <Carousel
                        layout="default"
                        data={image}
                        renderItem={renderCarouselItem}
                        sliderWidth={300}
                        itemWidth={300}
                        // loop={true}
                    />
                </View>
                <Button
                    mode="contained"
                    onPress={openImagePicker}
                    style={{ marginBottom: 20, marginTop: 10, backgroundColor: "#BC430B" }}
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
                    textAlign: "center",
                    textAlignVertical: "center",
                    borderRadius: 3,
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
                    margin: 20,
                    padding: 6,
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