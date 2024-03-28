import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import mime from "mime";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorUser } from "../../utils/hooks";
import { register } from "../../redux/actions/userActions";

const SignUp = ({ navigation, route }) => {
    // const navigation = useNavigation();
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [googleId, setGoogleId] = useState();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const disableBtn = googleId ? !name || !email || !address || !city || !country || !pinCode :
        !name || !email || !password || !address || !city || !country || !pinCode;

    const submitHandler = async () => {
        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("address", address);
        myForm.append("city", city);
        myForm.append("country", country);
        myForm.append("pinCode", pinCode);
        // myForm.append("googleId", googleId);
        // if (googleId) {
        //     myForm.append("file", avatar);
        // } else {
        //     if (avatar !== "") {
        //         myForm.append("file", {
        //             uri: avatar,
        //             type: mime.getType(avatar),
        //             name: avatar.split("/").pop(),
        //         });
        //     }
        // }

        try {
            await dispatch(register(myForm));
            navigation.navigate('login');
        } catch (error) {
            console.error(error);
            // handle error here
        }
    };

    const loading = useMessageAndErrorUser(navigation, dispatch, "profile");
    useEffect(() => {
        if (user) {

            setName(user.name)
            setEmail(user.email)
            setAvatar(user.picture)
            // setGoogleId(user.sub)
            setPassword(googleId)

        }
    }, [user])
    useEffect(() => {
        if (route.params?.image) setAvatar(route.params.image);
    }, [route.params]);

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
                            style={{ width: 100, height: 100, marginTop: 50 }}
                        />
                    </View>

                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1 bg-white" style={{
                        elevation: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50
                    }}
                >
                    <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                        <View className="form space-y-2">
                            <Image
                                style={{
                                    alignSelf: "center",
                                    // backgroundColor: colors.color1,
                                }}
                                size={80}
                            // source={{
                            //     uri: avatar ? avatar : defaultImg,
                            // }}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
                                <Button title="Change Photo" />
                            </TouchableOpacity>


                            <Text className="text-gray-700 ml-4">
                                Name
                            </Text>
                            <TextInput
                                placeholder="Enter email address"
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

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

                            <Text className="text-gray-700 ml-4">
                                Address
                            </Text>
                            <TextInput
                                placeholder="Enter email address"
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                City
                            </Text>
                            <TextInput
                                placeholder="Enter email address"
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                Country
                            </Text>
                            <TextInput
                                placeholder="Enter email address"
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                Pin Code
                            </Text>
                            <TextInput
                                placeholder="Enter email address"
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />
                            <TouchableOpacity className="py-2 bg-yellow-400 rounded-xl">
                                <Text className="text-gray-700 font-bold text-center">
                                    Sign Up
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
                            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                                <Text className="text-yellow-400 font-semibold ml-2">Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* <Footer activeRoute={"home"} /> */}
        </>
    );
};

export default SignUp;