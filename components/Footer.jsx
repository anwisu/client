import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = ({ activeRoute = "home" }) => {
    const navigate = useNavigation();
    const loading = false;
    const isAuthenticated = false;

    const navigationHandler = (key) => {
        switch (key) {
        case 0:
            navigate.navigate("home");
            break;
        case 1:
            navigate.navigate("cart");
            break;
        case 2:
            if (isAuthenticated) navigate.navigate("profile");
            else navigate.navigate("login");
            break;
        default:
            navigate.navigate("home");
            break;
        }
    };

    const iconStyle = {
        color: "#ffffff",
        fontSize: 50,
        backgroundColor: "#c70049",
    };

    return (
        <View
        style={{
            backgroundColor: "#c70049",
            borderTopRightRadius: 120,
            borderTopLeftRadius: 120,
            position: "absolute",
            width: "100%",
            bottom: 0,
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
                    isAuthenticated === false
                    ? "login"
                    : activeRoute === "profile"
                    ? "account"
                    : "account-outline"
                }
                style={iconStyle}
                />
            </TouchableOpacity>
        </View>

        <View
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
        </View>
        </View>
    );
};

export default Footer;