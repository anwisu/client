import React, { useEffect } from "react";
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

const Stack = createNativeStackNavigator();

const Main = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
  
    useEffect(() => {
      dispatch(loadUser(user));
    }, [dispatch]);

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

        <Toast position="top" bottomOffset={20} />
        </NavigationContainer>
    );
};

export default Main;