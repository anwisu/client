import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from "@react-native-google-signin/google-signin";
import Footer from "../../components/Footer";
import * as Icons from "react-native-heroicons/solid";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyToken } from "../../redux/actions/userActions";
import { useMessageAndErrorUser } from "../../utils/hooks";

const Profile = () => {
    const navigation = useNavigation();

    return (
        <>
            <View className="flex-1" style={{ backgroundColor: "#F4B546" }}>
                <View className="flex">
                <View className="flex-row justify-start">
                        <TouchableOpacity onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                            } else {
                                console.log("Can't go back");
                            }
                        }}
                            className="bg-yellow-700 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-10">
                            <Icons.ArrowLeftIcon size='20' color='black'
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center mt-[-40px]">
                        <Image source={require("../../assets/images/cat_dog_home.png")}
                            style={{ width: 200, height: 200, marginTop: 50 }}
                        />
                    </View>

                </View>

                {/* <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4">
                            Email Address
                        </Text>
                        <TextInput
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter email address"
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        />
                        <Text className="text-gray-700 ml-4">
                            Password
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter password"
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                        />
                        <TouchableOpacity
                            className="flex items-end mb-5"
                            onPress={() => navigation.navigate("forgetpassword")}
                        >
                            <Text className="text-gray-700">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="py-2 bg-yellow-400 rounded-xl"
                            loading={loading}
                            disabled={email === "" || password === ""}
                            onPress={submitHandler}
                        >
                            <Text className="text-gray-700 font-bold text-center">
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl text-gray-700 text-center font-bold py-2">
                        Or
                    </Text>
                    <View className="flex-row justify-center">
                        <TouchableOpacity className="flex-row items-center p-2 bg-gray-100 rounded-2xl">
                            <Image source={require("../../assets/images/google-icon.png")}
                                className="w-8 h-8"
                            />
                            <Text className="text-gray-700 font-bold text-center mx-6">Google Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center py-2">
                        <Text className="text-gray-500 font-semibold">Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                            <Text className="text-yellow-400 font-semibold ml-2">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View>
            <Footer activeRoute={"home"} />
        </>
    );
};

export default Profile;