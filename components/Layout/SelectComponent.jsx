import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import { Avatar, Headline } from "react-native-paper";

const SelectComponent = ({
    visible,
    setVisible,
    setCategory,
    setCategoryID,
    categories = [],
}) => {
    const selectCategoryHandler = (item) => {
        setCategory(item.category);
        setCategoryID(item._id);
        setVisible(false);
    };

    return (
        visible && (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Avatar.Icon
                        size={30}
                        style={{
                            alignSelf: "flex-end",
                            backgroundColor: "#BC430B",
                        }}
                        icon={"close"}
                    />
                </TouchableOpacity>
                <Headline style={styles.heading}> Select a Category</Headline>
                <ScrollView>
                    {categories.map((i) => (
                        <Text
                            key={i._id}
                            onPress={() => selectCategoryHandler(i)}
                            style={styles.text}
                        >
                            {i.category}
                        </Text>
                    ))}
                </ScrollView>
            </View>
        )
    );
};

export default SelectComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9DAA2",
        position: "absolute",
        padding: 35,
        borderRadius: 20,
        width: "90%",
        height: "80%",
        alignSelf: "center",
        elevation: 10,
        top: 100,
    },
    heading: {
        textAlign: "center",
        marginVertical: 10,
        backgroundColor: "transparent",
        color: "#BC430B",
    },
    text: {
        fontSize: 17,
        fontWeight: "100",
        marginVertical: 10,
    },
});