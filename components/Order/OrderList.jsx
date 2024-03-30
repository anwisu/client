import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
// import { colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const OrderList = ({
    id,
    price,
    address,
    orderedOn,
    status,
    paymentMethod,
    updateHandler,
    admin = false,
    loading,
    i = 0,
    navigate,
}) => {
    const navigation = useNavigation("Comment");

    const getProductIds = () => {
        return orderItems.map((item) => item.product);
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerRow}>
                <View>
                    <Text style={styles.primaryText}>Order # {id}</Text>
                </View>
                <View style={styles.timeDateContainer}>
                    <Text style={styles.secondaryTextSm}>
                        {orderedOn}
                    </Text>
                    {/* <Text style={styles.secondaryTextSm}>{getTime(item?.createdAt)}</Text> */}
                </View>
            </View>
            <View style={styles.innerRow}>
                <Text style={styles.secondaryText} i={i}>{address} </Text>
            </View>
            {/* <View style={styles.innerRow}>
                <Text style={styles.secondaryText} i={i}>{email} </Text>
            </View> */}
            <View style={styles.innerRow}>
                <Text style={styles.secondaryText} i={i}>Payment Method : {paymentMethod}</Text>
                <Text style={styles.secondaryText} i={i}>Total Amount : ${price}</Text>
            </View>
            <View style={styles.innerRow}>
                <TouchableOpacity style={styles.detailButton} onPress={() => navigate.navigate("orderdetails", { id })}>
                    <Text>Details</Text>
                </TouchableOpacity>
                <Text style={styles.secondaryText} i={i}>{status}</Text>
            </View>

            {!admin && status === "Delivered" && (
                <Button
                    textColor="#FFFFFF"
                    style={{
                        backgroundColor: "#c70049",
                        margin: 20,
                        padding: 6,
                    }}
                    onPress={() => navigation.navigate("comment", { orderItems: getProductIds })}
                >
                    Write a Review
                </Button>
            )}

            {admin && (
                <Button
                    icon={"update"}
                    mode={"contained"}
                    textColor={i % 2 === 0 ? "#ffffff" : "rgb(45,45,45)"}
                    style={{
                        width: 120,
                        alignSelf: "center",
                        marginTop: 10,
                        backgroundColor: i % 2 === 0 ? "rgb(45,45,45)" : "#ffffff",
                    }}
                    onPress={() => updateHandler(id)}
                    loading={loading}
                    disabled={loading}
                >
                    Update
                </Button>
            )}
        </View>
    );
};

export default OrderList;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "auto",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        elevation: 1,
    },
    innerRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    primaryText: {
        fontSize: 15,
        color: "#343A3F",
        fontWeight: "bold",
    },
    secondaryTextSm: {
        fontSize: 11,
        color: "#707981",
        fontWeight: "bold",
    },
    secondaryText: {
        fontSize: 14,
        color: "#707981",
        fontWeight: "bold",
    },
    timeDateContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    detailButton: {
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        borderColor: "#707981",
        color: "#707981",
        width: 100,
    },
});