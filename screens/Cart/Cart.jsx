import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
// import { COLOURS, Items } from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItem from "../../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Cart = ({ navigation }) => {
    const navigate = useNavigation();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const incrementHandler = (id, name, price, image, stock, quantity) => {
        const newQty = quantity + 1;
        if (stock <= quantity)
            return Toast.show({
                type: "error",
                text1: "Maximum value added",
            });
        dispatch({
            type: "addToCart",
            payload: {
                product: id,
                name,
                price,
                image,
                stock,
                quantity: newQty,
            },
        });
    };

    const decrementHandler = (id, name, price, image, stock, quantity) => {
        const newQty = quantity - 1;

        if (1 >= quantity)
            return dispatch({ type: "removeFromCart", payload: id });

        dispatch({
            type: "addToCart",
            payload: {
                product: id,
                name,
                price,
                image,
                stock,
                quantity: newQty,
            },
        });
    };

    const addToWishlistHandler = (id, name, price, image, stock) => {
        dispatch({
            type: "addToWishlist",
            payload: {
                product:
                    id,
                name,
                price,
                image,
                stock,
            }
        })

        Toast.show({
            type: "success",
            text1: "Added To Wishlist",
        });
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#ffffff',
                position: 'relative',
            }}>
            <ScrollView>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        paddingTop: 16,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={{
                                fontSize: 18,
                                color: '#777777',
                                padding: 12,
                                backgroundColor: '#F0F0F3',
                                borderRadius: 12,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#000000',
                            fontWeight: '400',
                        }}>
                        Order Details
                    </Text>
                    <View></View>
                </View>
                <Text
                    style={{
                        fontSize: 20,
                        color: '#000000',
                        fontWeight: '500',
                        letterSpacing: 1,
                        paddingTop: 20,
                        paddingLeft: 16,
                        marginBottom: 10,
                    }}>
                    My Cart
                </Text>
                <View style={{ paddingHorizontal: 16 }}>
                    {cartItems.length > 0 ? (
                        cartItems.map((i, index) => (
                            <CartItem
                                navigate={navigate}
                                key={i.product}
                                id={i.product}
                                name={i.name}
                                stock={i.stock}
                                amount={i.price}
                                imgSrc={i.image}
                                index={index}
                                qty={i.quantity}
                                incrementhandler={incrementHandler}
                                decrementHandler={decrementHandler}
                                addToWishlistHandler={addToWishlistHandler}
                            />
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", fontSize: 18 }}>
                            No Items Yet
                        </Text>
                    )}
                </View>
                <View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginVertical: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#000000',
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}>
                            Delivery Location
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        color: '#0043F9',
                                        backgroundColor: '#F0F0F3',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: 10,
                                        marginRight: 18,
                                    }}>
                                    <MaterialCommunityIcons
                                        name="truck-delivery-outline"
                                        style={{
                                            fontSize: 18,
                                            color: '#0043F9',
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            fontWeight: '500',
                                        }}>
                                        2 Petre Melikishvili St.
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#000000',
                                            fontWeight: '400',
                                            lineHeight: 20,
                                            opacity: 0.5,
                                        }}>
                                        0162, Tbilisi
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                style={{ fontSize: 22, color: '#000000' }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginVertical: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#000000',
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}>
                            Payment Method
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        color: '#0043F9',
                                        backgroundColor: '#F0F0F3',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: 10,
                                        marginRight: 18,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontWeight: '900',
                                            color: '#0043F9',
                                            letterSpacing: 1,
                                        }}>
                                        VISA
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            fontWeight: '500',
                                        }}>
                                        Visa Classic
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#000000',
                                            fontWeight: '400',
                                            lineHeight: 20,
                                            opacity: 0.5,
                                        }}>
                                        ****-9092
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                style={{ fontSize: 22, color: '#000000' }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 40,
                            marginBottom: 80,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#000000',
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}>
                            Order Info
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 8,
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    maxWidth: '80%',
                                    color: '#000000',
                                    opacity: 0.5,
                                }}>
                                Subtotal
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    color: '#000000',
                                    opacity: 0.8,
                                }}>
                                ${cartItems.reduce(
                                    (prev, curr) => prev + curr.quantity * curr.price,
                                    0
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 22,
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    maxWidth: '80%',
                                    color: '#000000',
                                    opacity: 0.5,
                                }}>
                                Items
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    color: '#000000',
                                    opacity: 0.8,
                                }}>
                                {cartItems.length}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    maxWidth: '80%',
                                    color: '#000000',
                                    opacity: 0.5,
                                }}>
                                Total
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: '#000000',
                                }}>
                                ${cartItems.reduce(
                                    (prev, curr) => prev + curr.quantity * curr.price,
                                    0
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    height: '8%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={
                        cartItems.length > 0 ? () => navigate.navigate("confirmorder") : null
                    }
                    style={{
                        width: '86%',
                        height: '90%',
                        backgroundColor: '#bc430b',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '500',
                            letterSpacing: 1,
                            color: '#ffffff',
                            textTransform: 'uppercase',
                        }}>
                        CHECKOUT
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Cart;