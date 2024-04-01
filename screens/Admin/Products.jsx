import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAdminProducts, useMessageAndErrorOther } from "../../utils/hooks";
import { Avatar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { deleteProduct } from "../../redux/actions/otherActions";
import { getAdminProducts } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import * as Icons from "react-native-heroicons/solid";
import Carousel from "react-native-snap-carousel";

const Products = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { products } = useAdminProducts(dispatch, isFocused);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const loadingDelete = useMessageAndErrorOther(
        dispatch,
        null,
        null,
        getAdminProducts
    );

    return(
        <View style={{ flex: 1, backgroundColor: "#F4B546", padding: 15 }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        console.log("Can't go back");
                    }
                }}
                    style={{ backgroundColor: "#bc430b", padding: 8, borderRadius: 10, marginLeft: 4, marginTop: 10 }}>
                    <Icons.ArrowLeftIcon size={20} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={{ fontSize: 24, color: "#FFFFFF", fontWeight: "800" }}>Products</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View>
                    {!loadingDelete &&
                        products.map((item) => (
                            <ProductCard
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                category={item.category?.category}
                                price={item.price}
                                stock={item.stock}
                                images={item.images}
                                deleteHandler={deleteProductHandler}
                                navigation={navigation}
                            />
                        ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("newproduct")}
            >
                <Text style={styles.addButtonText}>Add Product</Text>
            </TouchableOpacity>
        </View>
    )
}

const ProductCard = ({ id, name, category, price, stock, images, deleteHandler, navigation }) => (
    <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
            <View style={styles.leftColumn}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Category:</Text>
                    <Text style={styles.value}>{category}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.value}>{price}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Stock:</Text>
                    <Text style={styles.value}>{stock}</Text>
                </View>
            </View>
            <View style={styles.rightColumn}>
                <TouchableOpacity onPress={() => navigation.navigate("update", { id })}>
                    <Avatar.Icon icon="pen" size={40} color="#BC430B" style={{ backgroundColor: "transparent" }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteHandler(id)}>
                    <Avatar.Icon icon="delete" size={40} color="#BC430B" style={{ backgroundColor: "transparent" }} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.imageContainer}>
            <Carousel
                layout="stack"
                data={images}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.url }} style={styles.productImage} />
                )}
                sliderWidth={300}
                itemWidth={300}
                loop={true}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        elevation: 5,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
    },
    imageContainer: {
        alignItems: "center",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        alignItems: "flex-end",
    },
    infoRow: {
        flexDirection: "row",
        marginBottom: 5,
    },
    label: {
        fontWeight: "600",
        color: "#555555",
        marginRight: 5,
    },
    value: {
        color: "#333333",
    },
    productImage: {
        width: 300,
        height: 150,
        resizeMode: "contain",
    },
    addButton: {
        backgroundColor: "#BC430B",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 20,
    },
    addButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Products;
