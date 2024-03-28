import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Footer from "../components/Footer";

const Home = () => {

    return (
        <>
            <Text>Home</Text>

            <Footer activeRoute={"home"} />
        </>
    );
};

export default Home;