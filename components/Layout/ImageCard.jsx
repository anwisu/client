import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const ImageCard = ({ src, id, deleteHandler }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: src,
                }}
                style={{
                    width: "100%",
                    height: "80%",
                    resizeMode: "contain",
                }}
            />
            <TouchableOpacity onPress={() => deleteHandler(id)}>
                <Avatar.Icon
                    size={30}
                    icon={"delete"}
                    style={{
                        backgroundColor: "#f4b546",
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ImageCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "bc430b",
        elevation: 5,
        margin: 10,
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        height: 300,
    },
});