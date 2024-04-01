import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux"
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Footer = ({ activeRoute = "home" }) => {
    const navigate = useNavigation();

    // const isAuthenticated = false;
    const { loading, isAuthenticated } = useSelector((state) => state.user)

    const navigationHandler = (key) => {
        switch (key) {
        case 0:
            navigate.navigate("home");
            break;
        case 1:
            navigate.navigate("cart");
            break;
        case 2:
            if (isAuthenticated) console.log("is Authenticated:",isAuthenticated), navigate.navigate("profile");
            else navigate.navigate("login");
            break;
        default:
            navigate.navigate("home");
            break;
        }
    };

    const logoutHandler = () => {
        if (user.signInMethod === "google") {
            signOut();
        }
        dispatch(logout());
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.log(error)
        }
    }

    const iconStyle = {
        color:"rgb(45,45,45)",
        fontSize: 30,
    };

    return (
        <View
        style={{
            backgroundColor: "#F4B546",
            position: "absolute",
            width: "100%",
            bottom: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 50,
            justifyContent: "center"
        }}
        >
        <View
            style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            }}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigationHandler(0)}
            >
                <Icon
                name={activeRoute === "home" ? "home" : "home-outline"}
                style={iconStyle}
                />
            </TouchableOpacity>
            
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigationHandler(1)}
            >
            <Icon
                name={activeRoute === "cart" ? "cart" : "cart-outline"}
                style={iconStyle}
            />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigationHandler(2)}
            >
                <Icon
                name={
                    isAuthenticated !== true
                    ? "login"
                    : activeRoute === "profile"
                    ? "account"
                    : "account-outline"
                }
                style={iconStyle}
                />
            </TouchableOpacity>
        </View>

        {/* <View
            style={{
            position: "absolute",
            width: 80,
            height: 80,
            backgroundColor: "#ffffff",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            top: -50,
            alignSelf: "center",
            }}
        >
            <View
            style={{
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigationHandler(0)}
            >
                <Icon
                name={activeRoute === "home" ? "home" : "home-outline"}
                style={iconStyle}
                />
            </TouchableOpacity>
            </View>
        </View> */}
        </View>
    );
};

export default Footer;