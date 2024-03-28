import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Button } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ProductCard = ({
    stock,
    name,
    price,
    image,
    id,
    addToCardHandler,
    addToWishlistHandler,
    i,
    navigate,
}) => {
    const isOutOfStock = stock === 0;
    return (
        <TouchableOpacity
            onPress={() => navigate.navigate("productdetails", { id })} style={{
                width: '48%',
                marginVertical: 14,
            }}>
            <View
                style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: '#F0F0F3',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                }}>
                {/* {data.isOff ? (
                    <View
                        style={{
                            position: 'absolute',
                            width: '20%',
                            height: '24%',
                            backgroundColor: '#00AC76',
                            top: 0,
                            left: 0,
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLOURS.white,
                                fontWeight: 'bold',
                                letterSpacing: 1,
                            }}>
                            98%
                        </Text>
                    </View>
                ) : null} */}
                <Image
                    source={{
                        uri: image,
                    }}
                    style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <Text
                style={{
                    fontSize: 12,
                    color: '#000000',
                    fontWeight: '600',
                    marginBottom: 2,
                }}>
                {name}
            </Text>
            {/* {data.category == 'accessory' ? (
                data.isAvailable ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <FontAwesome
                            name="circle"
                            style={{
                                fontSize: 12,
                                marginRight: 6,
                                color: '#00AC76',
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#00AC76',
                            }}>
                            Available
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <FontAwesome
                            name="circle"
                            style={{
                                fontSize: 12,
                                marginRight: 6,
                                color: '#C04345',
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#C04345',
                            }}>
                            Unavailable
                        </Text>
                    </View>
                )
            ) : null} */}
            <Text className="text-semibold text-md">$ {price}</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: i % 2 === 0 ? "rgb(45,45,45)" :  "#F4B546",
                    borderRadius: 0,
                    paddingVertical: 4,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    width: "100%",
                }}
            >
                <Button
                    onPress={() => addToCardHandler(id, name, price, image, stock)}
                    textColor={i % 2 === 0 ?   "#F4B546" : "rgb(45,45,45)"}
                    style={{ flex: 4 }}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
                </Button>
                <TouchableOpacity
                    onPress={() => addToWishlistHandler(id, name, price, image, stock)}
                    style={{ flex: 2, padding: 4 }}
                >
                    <FontAwesome
                        name="heart"
                        size={18}
                        color="#ffffff" 
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;