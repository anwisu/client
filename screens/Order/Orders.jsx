import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
// import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import Entypo from 'react-native-vector-icons/Entypo';
import OrderList from "../../components/Order/OrderList";
import { useGetOrders } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";

const Orders = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { loading, orders } = useGetOrders(isFocused);

    return (
        <View style={styles.container}>
            {/* <StatusBar></StatusBar>
            <ProgressDialog visible={isloading} label={label} /> */}
            <View style={styles.topBarContainer}>
            <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => navigation.goBack('home')}>
                            <Entypo
                                name="chevron-left"
                                style={{
                                    fontSize: 18,
                                    color: '#ffffff',
                                    padding: 12,
                                    backgroundColor: '#bc430b',
                                    borderRadius: 10,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                <TouchableOpacity onPress={() => handleOnRefresh()}>
                    <Ionicons name="cart-outline" size={30} color="#FB6831" />
                </TouchableOpacity>
            </View>
            <View style={styles.screenNameContainer}>
                <View>
                    <Text style={styles.screenNameText}>My Orders</Text>
                </View>
                <View>
                    <Text style={styles.screenNameParagraph}>
                        Your order and your order status
                    </Text>
                </View>
            </View>

            {/* <CustomAlert message={error} type={alertType} /> */}
            {orders.length > 0 ? (
                orders.map((item, index) => (
                    <ScrollView
                        style={{ flex: 1, width: "100%", padding: 20 }}
                        showsVerticalScrollIndicator={false}
                        
                    >
                        <OrderList
                            key={item._id}
                            id={item._id}
                            i={index}
                            price={item.totalAmount}
                            status={item.orderStatus}
                            paymentMethod={item.paymentMethod}
                            orderedOn={item.createdAt.split("T")[0]}
                            address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                        />
                        <View style={styles.emptyView}></View>
                    </ScrollView>
                ))
            ) : (
                <View style={styles.ListContiainerEmpty}>
                    <Text style={styles.secondaryTextSmItalic}>
                        "There are no orders placed yet."
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: "#F4B546",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    topBarContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    toBarText: {
        fontSize: 15,
        fontWeight: "600",
    },
    screenNameContainer: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    screenNameText: {
        fontSize: 30,
        fontWeight: "800",
        color: "#000000",
    },
    screenNameParagraph: {
        marginTop: 5,
        fontSize: 15,
    },
    bodyContainer: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    emptyView: {
        height: 20,
    },
    ListContiainerEmpty: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    secondaryTextSmItalic: {
        fontStyle: "italic",
        fontSize: 15,
        color: "#707981",
    },
});