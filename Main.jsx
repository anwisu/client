// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./screens/Home";
// import Camera from "./screens/Camera";
// import ProductDetails from "./screens/ProductDetails";
// import Cart from "./screens/Cart/Cart";
// import ConfirmOrder from "./screens/Cart/ConfirmOrder";
// import Payment from "./screens/Cart/Payment";
// import Login from "./screens/User/Login";
// import SignUp from "./screens/User/SignUp";
// import Orders from "./screens/Order/Orders";
// import OrderDetails from "./screens/Order/OrderDetails";
// import Toast from "react-native-toast-message";
// // import ForgetPassword from "./screens/ForgetPassword";
// // import Verify from "./screens/Verify";
// import Profile from "./screens/User/Profile";
// import AdminPanel from "./screens/Admin/AdminPanel";
// import Categories from "./screens/Admin/Categories";
// import UpdateCategory from "./screens/Admin/UpdateCategory";
// import Wishlist from "./screens/Wishlist";
// import MyAccount from "./screens/User/MyAccount";
// import UpdateProfile from "./screens/User/UpdateProfile";
// import ChangePassword from "./screens/User/ChangePassword";
// import Products from "./screens/Admin/Products";
// import NewProduct from "./screens/Admin/NewProduct";
// import AdminOrders from "./screens/Admin/AdminOrders";
// import AdminOrderDetails from "./screens/Admin/AdminOrderDetails";

// const Stack = createNativeStackNavigator();

// // const Main = () => {
// //     return (
// //         <NavigationContainer>
// //         <Stack.Navigator
// //             initialRouteName="home"
// //             screenOptions={{
// //             headerShown: false,
// //             }}
// //         >
// //             <Stack.Group>
// //             <Stack.Screen name="home" component={Home} />
// //             <Stack.Screen name="productdetails" component={ProductDetails} />
// //             <Stack.Screen name="cart" component={Cart} />
// //             <Stack.Screen name="confirmorder" component={ConfirmOrder} />
// //             <Stack.Screen name="payment" component={Payment} />
// //             <Stack.Screen name="wishlist" component={Wishlist} />
// //             <Stack.Screen name="camera" component={Camera} />
// //             <Stack.Screen name="login" component={Login} />
// //             <Stack.Screen name="signup" component={SignUp} />
// //             <Stack.Screen name="profile" component={Profile} />
// //             <Stack.Screen name="myaccount" component={MyAccount} />
// //             <Stack.Screen name="updateprofile" component={UpdateProfile} />
// //             <Stack.Screen name="changepassword" component={ChangePassword} />

// //             <Stack.Screen name="orders" component={Orders} />
// //             <Stack.Screen name="orderdetails" component={OrderDetails} />



// //             {/* Dashboard */}
// //             <Stack.Screen name="adminpanel" component={AdminPanel} />
// //             <Stack.Screen name="categories" component={Categories} />
// //             <Stack.Screen name="updatecategory" component={UpdateCategory} />
// //             <Stack.Screen name="products" component={Products} />
// //             <Stack.Screen name="newproduct" component={NewProduct} />
// //             <Stack.Screen name="adminorders" component={AdminOrders} />
// //             <Stack.Screen name="adminorderdetails" component={AdminOrderDetails} />


// //             {/* Password Reset Routes */}
// //             {/* <Stack.Screen name="forgetpassword" component={ForgetPassword} />
// //             <Stack.Screen name="verify" component={Verify} /> */}
// //             </Stack.Group>
// //         </Stack.Navigator>

// //         <Toast position="top" bottomOffset={20} />
// //         </NavigationContainer>
// //     );
// // };

// export default Main;

import React, { useEffect } from "react";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/Home";
import Camera from "./screens/Camera";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart/Cart";
import ConfirmOrder from "./screens/Cart/ConfirmOrder";
import Payment from "./screens/Cart/Payment";
import Login from "./screens/User/Login";
import SignUp from "./screens/User/SignUp";
import Orders from "./screens/Order/Orders";
import OrderDetails from "./screens/Order/OrderDetails";
import Toast from "react-native-toast-message";
// import ForgetPassword from "./screens/ForgetPassword";
// import Verify from "./screens/Verify";
import Profile from "./screens/User/Profile";
import AdminPanel from "./screens/Admin/AdminPanel";
import Categories from "./screens/Admin/Categories";
import UpdateCategory from "./screens/Admin/UpdateCategory";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import Wishlist from "./screens/Wishlist";
import MyAccount from "./screens/User/MyAccount";
import UpdateProfile from "./screens/User/UpdateProfile";
import ChangePassword from "./screens/User/ChangePassword";
import Analytics from "./screens/Admin/Analytics";
import Products from "./screens/Admin/Products";
import NewProduct from "./screens/Admin/NewProduct";
import AdminOrders from "./screens/Admin/AdminOrders";
import AdminOrderDetails from "./screens/Admin/AdminOrderDetails";


import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "./redux/actions/userActions";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CLIENT_ID_ANDROID, CLIENT_ID_IOS, CLIENT_ID_WEB } from "@env";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import { useMessageAndErrorUser } from "./utils/hooks";
// import UserLists from "./screens/Admin/UserLists";

const CustomDrawerContent = (props) => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { navigation } = props;
    const loading = useMessageAndErrorUser(navigation, dispatch, "profile");
    const loadingSignOut = useMessageAndErrorUser(navigation, dispatch, "login");
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId: CLIENT_ID_WEB,
            androidClientId: CLIENT_ID_ANDROID,
            iosClientId: CLIENT_ID_IOS,
        });
    };
    useEffect(() => {
        configureGoogleSignIn();
    });
    const navigateTohome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "home" }],
        });
    };
    const logoutHandler = () => {
        if (user.signInMethod === "google") {
            signOut();
        }
        dispatch(logout());
        dispatch({ type: "resetContacts" })
    };
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: "center", padding: 20 }}>
                {!loading && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (isAuthenticated) navigation.navigate("profile");
                            else navigation.navigate("login");
                        }}
                    >
                        <Avatar.Image
                            source={{ uri: user?.avatar ? user.avatar.url : require("./assets/images/default-user-icon.jpg") }}
                            size={100}
                            style={{ backgroundColor: "#c70049" }}
                        />
                    </TouchableOpacity>
                )}

                {!loading && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (isAuthenticated) navigation.navigate("profile");
                            else navigation.navigate("login");
                        }}
                    >
                        <Text style={{ marginTop: 20 }}>{user?.name || "Login"}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <DrawerItem label="Home" onPress={navigateTohome} />
            {user ? (
                <>
                    <DrawerItem
                        label="Orders"
                        onPress={() => navigation.navigate("orders")}
                    />
                </>
            ) : null}

            {/* <DrawerItemList {...props} /> */}
            {user && !loadingSignOut && (
                <DrawerItem label="Sign Out" onPress={logoutHandler} />
            )}
        </DrawerContentScrollView>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Group>
                <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="productdetails" component={ProductDetails} />
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="confirmorder" component={ConfirmOrder} />
            <Stack.Screen name="payment" component={Payment} />
            <Stack.Screen name="wishlist" component={Wishlist} />
            <Stack.Screen name="camera" component={Camera} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="myaccount" component={MyAccount} />
            <Stack.Screen name="updateprofile" component={UpdateProfile} />
            <Stack.Screen name="changepassword" component={ChangePassword} />

            <Stack.Screen name="orders" component={Orders} />
            <Stack.Screen name="orderdetails" component={OrderDetails} />



            {/* Dashboard */}
            <Stack.Screen name="adminpanel" component={AdminPanel} />
            <Stack.Screen name="categories" component={Categories} />
            <Stack.Screen name="updatecategory" component={UpdateCategory} />
            <Stack.Screen name="products" component={Products} />
            <Stack.Screen name="newproduct" component={NewProduct} />
            <Stack.Screen name="adminorders" component={AdminOrders} />
            <Stack.Screen name="adminorderdetails" component={AdminOrderDetails} />

            <Stack.Screen name="analytics" component={Analytics} />

            {/* Password Reset Routes */}
            {/* <Stack.Screen name="forgetpassword" component={ForgetPassword} />
            <Stack.Screen name="verify" component={Verify} /> */}
            </Stack.Group>
        </Stack.Navigator>
    );
};

const Main = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser(user));
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Home" component={HomeStack} />
            </Drawer.Navigator>

            <Toast position="top" bottomOffset={20} />
        </NavigationContainer>
    );
};

export default Main;
