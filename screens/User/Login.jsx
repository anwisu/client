import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation();

    return (
        <>
            {/* <View style={defaultStyle}>
            <View style={{ marginBottom: 20 }}>
            <Text style={formHeading}>Login</Text>
            </View>

            <View style={styles.container}>
            <TextInput
                {...inputOptions}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                
            />

            <TextInput
                {...inputOptions}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("forgetpassword")}
            >
                <Text style={styles.forget}>Forget Password?</Text>
            </TouchableOpacity>

            <Button
                textColor={colors.color2}
                disabled={email === "" || password === ""}
                style={styles.btn}
                onPress={submitHandler}
            >
                Log In
            </Button>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("signup")}
            >
                <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
            </View>
        </View> */}
            {/* <View className="bg-white h-full w-full">
                <Image className="h-full w-full absolute" source={require("../../assets/images/background.png")} />
                <View className="flex-row justify-around w-full absolute">
                    <Image className="h-[225] w-[90]" source={require("../../assets/images/light.png")} />
                    <Image className="h-[160] w-[65]" source={require("../../assets/images/light.png")} />
                </View>

                <View className="h-full w-full flex justify-around pt-40 pb-1">
                    <View className="flex items-center">
                        <Text className="text-white font-bold tracking-wider text-5xl">
                            Login
                        </Text>
                    </View>

                    <View className="flex items-center mx-4 space-y-4">
                        <View className="bg-black/5 p-5 rounded-2xl w-full">
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'gray'}
                                secureTextEntry
                            />
                        </View>
                        <View className="w-full">
                            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                                <Text className="text-xl font-bold text-white text-center">
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-center">
                            <Text >
                                Don't have an account?
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-sky-600 pl-2">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> */}

            <View className="flex-1" style={{ backgroundColor: "#F4B546" }}>
                <View className="flex">
                    <View className="flex-row justify-start">
                        <TouchableOpacity onPress={() => navigation.goBack()}
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

                <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4">
                            Email Address
                        </Text>
                        <TextInput
                            placeholder="Enter email address"
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        />
                        <Text className="text-gray-700 ml-4">
                            Password
                        </Text>
                        <TextInput
                            placeholder="Enter password"
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                            secureTextEntry
                        />
                        <TouchableOpacity className="flex items-end mb-5">
                            <Text className="text-gray-700">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="py-2 bg-yellow-400 rounded-xl">
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
                </View>
            </View>

            {/* <Footer activeRoute={"home"} /> */}
        </>
    );
};

export default Login;