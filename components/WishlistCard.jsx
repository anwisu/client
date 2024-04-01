import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

const WishListCard = ({
    name,
    amount,
    stock,
    index,
    imgSrc,
    price,
    removeWishlistHandler,
    addToCartHandler,
    id,
    navigate,
    }) => {

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.detailContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: imgSrc,
                        }}
                        style={{ height: 40, width: "auto", resizeMode: "contain" }}
                    />
                </View>
                <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle} onPress={() => navigate.navigate("productdetails", { id })}>{name ? `${name.substring(0, 30)}..` : ''}</Text>
                    {/* <Text style={styles.categoryDescription}>
                        {description ? `${description.substring(0, 20)}..` : ''}
                    </Text> */}
                    <Text style={styles.categoryDescription}>
                    ${amount}
                    </Text>
                    <Text style={styles.categoryTitle}>Add to cart</Text>
                </View>
            </View>
            <View style={styles.categoryActionContainer}>
                <View style={styles.infoButtonContainer}>
                    <View style={styles.wishlistButtonContainer}>
                        {/* <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => handleChangeState()}
                        >
                            {onWishlist == false ? (
                                <Ionicons name="heart" size={25} color="#707981" />
                            ) : (
                                <Ionicons name="heart" size={25} color="#FF4848" />
                            )}
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => removeWishlistHandler(id, name, amount, imgSrc, stock)}
                        >
                            <Ionicons name="heart" size={25} color="#FF4848" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default WishListCard;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
        backgroundColor: "#FFFFFF",
        height: 80,
        borderRadius: 10,
        elevation: 5,
        margin: 5,
    },
    detailContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#FFFFFF",
        height: 80,
        borderRadius: 10,
        margin: 5,
    },
    imageContainer: {
        width: 50,
        height: 50,
        elevation: 5,
        display: "flex",
        justifyContent: "center",

        backgroundColor: "#F5F5F5",
    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: "500",
    },
    categoryDescription: {
        fontSize: 12,
        color: "#707981",
    },
    categoryInfo: {
        marginLeft: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },

    actionButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        height: 30,
        width: 30,
        backgroundColor: "#FB6831",
        borderRadius: 5,
        elevation: 2,
    },
    infoButtonContainer: {
        padding: 5,
        paddingRight: 0,
        display: "flex",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    wishlistButtonContainer: {
        height: 50,
        width: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
});
