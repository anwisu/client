import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
// import {COLOURS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions";
import { useSetCategories } from "../utils/hooks";
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [category, setCategory] = useState("");
    const [activeSearch, setActiveSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // const [categories, setCategories] = useState([]);

    const navigate = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { products } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.user);

    console.log(user)
    // const categoryButtonHandler = (id) => {
    //     setCategory(id);
    // };

    const addToCardHandler = (id, name, price, image, stock) => {
        if (!user) {
            navigate.navigate("login");
            return;
        }
        if (stock === 0)
            return Toast.show({
                type: "error",
                text1: "Out Of Stock",
            });

        dispatch({
            type: "addToCart",
            payload: {
                product: id,
                name,
                price,
                image,
                stock,
                quantity: 1,
            },
        });

        Toast.show({
            type: "success",
            text1: "Added To Cart",
        });
    };

    const addToWishlistHandler = (id, name, price, image, stock) => {
        if (!user) {
            // If no user is logged in, navigate to the login page
            navigate.navigate("login"); // Replace "Login" with your actual login screen name
            return;
        }
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

    // useSetCategories(setCategories, isFocused);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            dispatch(getAllProducts(searchQuery, category));
        }, 200);
        return () => {
            clearTimeout(timeOutId);
        };
    }, [dispatch, searchQuery, category, isFocused]);


    return (
        <>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: "#ffffff",
                }}>
                <StatusBar backgroundColor={"#ffffff"} barStyle="dark-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 16,
                        }}>
                        <TouchableOpacity>
                            <Entypo
                                name="shopping-bag"
                                style={{
                                    fontSize: 18,
                                    color: '#B9B9B9',
                                    padding: 12,
                                    borderRadius: 10,
                                    backgroundColor: '#F0F0F3',
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate.navigate('cart')}>
                            <MaterialCommunityIcons
                                name="cart"
                                style={{
                                    fontSize: 18,
                                    color: '#B9B9B9',
                                    padding: 12,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#F0F0F3',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginBottom: 10,
                            padding: 16,
                        }}>
                        {/* <Text
                            style={{
                                fontSize: 26,
                                color: '#000000',
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 10,
                            }}>
                            Hi-Fi Shop &amp; Service
                        </Text> */}
                        {/* <Text
                            style={{
                                fontSize: 14,
                                color: '#000000',
                                fontWeight: '400',
                                letterSpacing: 1,
                                lineHeight: 24,
                            }}>
                            Audio shop on Rustaveli Ave 57.
                            {'\n'}This shop offers both products and services
                        </Text> */}
                    </View>
                    <View
                        style={{
                            padding: 16,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 22,
                                        color: '#000000',
                                        fontWeight: '700',
                                        letterSpacing: 1,
                                    }}>
                                    Products
                                </Text>
                                {/* <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#000000',
                                        fontWeight: '400',
                                        opacity: 0.5,
                                        marginLeft: 10,
                                    }}>
                                    41
                                </Text> */}
                            </View>
                            {/* <Text
                                style={{
                                    fontSize: 14,
                                    color: '#0043F9',
                                    fontWeight: '400',
                                }}>
                                SeeAll
                            </Text> */}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                            }}>
                            {products.map((item, index) => (
                                <ProductCard
                                    stock={item.stock}
                                    name={item.name}
                                    price={item.price}
                                    image={item.images[0]?.url}
                                    addToCardHandler={addToCardHandler}
                                    addToWishlistHandler={addToWishlistHandler}
                                    id={item._id}
                                    key={item._id}
                                    i={index}
                                    navigate={navigate}
                                />
                            ))}
                            {/* {products.map(data => {
                                return <ProductCard data={data} key={data.id} />;
                            })} */}
                        </View>
                    </View>

                    <View
                        style={{
                            padding: 16,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#000000',
                                        fontWeight: '500',
                                        letterSpacing: 1,
                                    }}>
                                    Accessories
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#000000',
                                        fontWeight: '400',
                                        opacity: 0.5,
                                        marginLeft: 10,
                                    }}>
                                    78
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#0043F9',
                                    fontWeight: '400',
                                }}>
                                SeeAll
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                            }}>
                            {/* {accessory.map(data => {
                                return <ProductCard data={data} key={data.id} />;
                            })} */}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Footer activeRoute={"home"} />
        </>
    );
};

export default Home;