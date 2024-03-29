import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Camera from "./screens/Camera";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart/Cart";
import ConfirmOrder from "./screens/Cart/ConfirmOrder";
import Payment from "./screens/Cart/Payment";
import Login from "./screens/User/Login";
import SignUp from "./screens/User/SignUp";
import Orders from "./screens/Order/Orders";
// import Toast from "react-native-toast-message";
// import ForgetPassword from "./screens/ForgetPassword";
// import Verify from "./screens/Verify";
import Profile from "./screens/User/Profile";


const Stack = createNativeStackNavigator();

const Main = () => {
    return (
        <NavigationContainer>
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
            <Stack.Screen name="camera" component={Camera} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="profile" component={Profile} />

            <Stack.Screen name="orders" component={Orders} />
            {/* Password Reset Routes */}
            {/* <Stack.Screen name="forgetpassword" component={ForgetPassword} />
            <Stack.Screen name="verify" component={Verify} /> */}
            </Stack.Group>
        </Stack.Navigator>

        {/* <Toast position="top" bottomOffset={20} /> */}
        </NavigationContainer>
    );
};

export default Main;
