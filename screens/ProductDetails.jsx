import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    Animated,
    ToastAndroid,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from "../components/Header";
// import Comment from "../components/Comment";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getProductDetails } from "../redux/actions/productActions";
import { server } from "../redux/store";
// import { AirbnbRating } from "react-native-ratings";
// import { deleteComment, getAllComments, getProductRatings } from "../redux/actions/commentActions";
import { FontAwesome } from 'react-native-vector-icons';

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({ route: { params } }) => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const isCarousel = useRef(null);
    const isFocused = useIsFocused();
    const { user } = useSelector((state) => state.user);

    // const comments = useSelector((state) => state.comment.comments); // Fetch comments from Redux store
    // const average = useSelector((state) => state.comment.averageRating); // Fetch comments from Redux store
    // const loading = useSelector((state) => state.comment.loading); // Fetch loading state from Redux store

    // const { productID } = route.params;

    console.log("current user:", user)
    const {
        product: { name, price, stock, description, images },
    } = useSelector((state) => state.product);

    const [quantity, setQuantity] = useState(1);
    const isOutOfStock = stock === 0;

    useEffect(() => {
        // dispatch(getAllComments(params.id)); // Fetch comments when component mounts
        dispatch(getProductDetails(params.id));
        // dispatch(getProductRatings(params.id));
    }, [dispatch, params.id, isFocused]);

    const incrementQty = () => {
        if (stock <= quantity) {
            return Toast.show({
                type: "error",
                text1: "Maximum Value Added",
            });
        }
        setQuantity((prev) => prev + 1);
    };

    const decrementQty = () => {
        if (quantity <= 1) return;
        setQuantity((prev) => prev - 1);
    };

    const addToCardHandler = () => {
        if (!user) {
            navigate.navigate("login");
            return;
        }
        if (stock === 0) {
            return Toast.show({
                type: "error",
                text1: "Out Of Stock",
            });
        }

        dispatch({
            type: "addToCart",
            payload: {
                product: params.id,
                name,
                price,
                image: images[0]?.url,
                stock,
                quantity,
            },
        });

        Toast.show({
            type: "success",
            text1: "Added To Cart",
        });
    };

    // const addToWishlistHandler = (id, name, price, image, stock) => {
    //     if (!user) {
    //         navigate.navigate("login");
    //         return;
    //     }
    //     dispatch({
    //         type: "addToWishlist",
    //         payload: {
    //             product: id,
    //             name,
    //             price,
    //             image,
    //             stock,
    //         }
    //     })

    //     Toast.show({
    //         type: "success",
    //         text1: "Added To Wishlist",
    //     });
    // };

    // const handleDeleteComment = async (commentId) => {
    //     try {
    //         await dispatch(deleteComment(commentId));
    //         Toast.show({
    //             type: "success",
    //             text1: "Comment deleted successfully",
    //         });
    //     } catch (error) {
    //         console.error("Error deleting comment:", error);
    //         Toast.show({
    //             type: "error",
    //             text1: "Failed to delete comment",
    //         });
    //     }
    // };

    // const [product, setProduct] = useState({});

    const width = Dimensions.get('window').width;

    const scrollX = new Animated.Value(0);

    let position = Animated.divide(scrollX, width);

    //product horizontal scroll product card
    // const renderProduct = ({ item, index }) => {
    //     return (
    //         <View
    //             style={{
    //                 width: width,
    //                 height: 240,
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //             }}>
    //             <Image
    //                 source={item}
    //                 style={{
    //                     width: '100%',
    //                     height: '100%',
    //                     resizeMode: 'contain',
    //                 }}
    //             />
    //         </View>
    //     );
    // };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: "#ffffff",
                position: 'relative',
            }}>
            <StatusBar
                backgroundColor='#F0F0F3'
                barStyle="dark-content"
            />
            <ScrollView>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: "#F4B546",
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 4,
                    }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: 16,
                            paddingLeft: 16,
                        }}>
                        <TouchableOpacity onPress={() => navigate.goBack('home')}>
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
                    {/* <FlatList
                        data={images ? images : null}
                        horizontal
                        renderItem={renderProduct}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={width}
                        bounces={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                    /> */}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 16,
                            marginTop: 16,
                            
                        }}>
                        {/* {product.productImageList
                            ? product.productImageList.map((data, index) => {
                                let opacity = position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: 'clamp',
                                });
                                return (
                                    <Animated.View
                                        key={index}
                                        style={{
                                            width: '16%',
                                            height: 2.4,
                                            backgroundColor: '#000000',
                                            opacity,
                                            marginHorizontal: 4,
                                            borderRadius: 100,
                                        }}></Animated.View>
                                );
                            })
                            : null} */}
                        <Carousel
                            layout="stack"
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            ref={isCarousel}
                            data={images}
                            renderItem={CarouselCardItem}
                        />
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 6,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 14,
                        }}>
                        <Entypo
                            name="shopping-cart"
                            style={{
                                fontSize: 18,
                                color: '#8b061d',
                                marginRight: 6,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#000000',
                            }}>
                            Shopping
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginVertical: 4,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '600',
                                letterSpacing: 0.5,
                                marginVertical: 4,
                                color: '#000000',
                                maxWidth: '84%',
                            }}>
                            {name}
                        </Text>
                    </View>
                    <View
                    style={{
                            paddingHorizontal: 16,
                            borderBottomColor: '#F0F0F3',
                            borderBottomWidth: 1,
                            paddingBottom: 6,
                        }}>                    
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#000000',
                            fontWeight: '400',
                            letterSpacing: 1,
                            opacity: 0.5,
                            lineHeight: 20,
                            maxWidth: '85%',
                            maxHeight: 44,
                            marginBottom: 12,
                        }}>
                        {description}
                    </Text>
                    </View>
                    {/* <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginVertical: 14,
                            borderBottomColor: '#F0F0F3',
                            borderBottomWidth: 1,
                            paddingBottom: 20,
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
                                    borderRadius: 100,
                                    marginRight: 10,
                                }}>
                                <Entypo
                                    name="location-pin"
                                    style={{
                                        fontSize: 16,
                                        color: '#8b061d',
                                    }}
                                />
                            </View>
                            <Text> Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
                        </View>
                        <Entypo
                            name="chevron-right"
                            style={{
                                fontSize: 22,
                                color: '#777777',
                            }}
                        />
                    </View> */}
                    <View
                        style={{
                            paddingHorizontal: 16,
                            borderBottomColor: '#F0F0F3',
                            borderBottomWidth: 1,
                            paddingBottom: 20,
                        }}>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '500',
                                maxWidth: '85%',
                                color: '#e84219',
                                marginBottom: 4,
                                marginTop: 10,
                            }}>
                            $ {price}
                        </Text>
                        <Text>
                            Tax Rate 2%~ ${price / 20} ($
                            {price + price / 20})
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 5,
                            marginTop: 10,
                        }}
                    >
                        <Text style={{ color: "rgb(45,45,45)", fontWeight: "400", fontSize: 18 }}>
                            Quantity
                        </Text>
                        <View
                            style={{
                                width: 80,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity onPress={decrementQty}>
                                <Avatar.Icon
                                    icon={"minus"}
                                    size={20}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "#F4B546",
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                backgroundColor: "transparent",
                                height: 25,
                                width: 25,
                                textAlignVertical: "center",
                                textAlign: "center",
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: "#F4B546",
                            }}>{quantity}</Text>
                            <TouchableOpacity onPress={incrementQty}>
                                <Avatar.Icon
                                    icon={"plus"}
                                    size={20}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "#F4B546",
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            </TouchableOpacity>
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
                    onPress={addToCardHandler} 
                    disabled={isOutOfStock}
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
                        {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CarouselCardItem = ({ item, index }) => (
    <View key={index}>
        <Image source={{ uri: item.url }} style={{
            width: ITEM_WIDTH,
            resizeMode: "contain",
            height: 250,
        }} />
    </View>
);

export default ProductDetails;