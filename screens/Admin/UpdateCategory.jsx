import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "react-native-heroicons/solid";
import { updateCategory, getCategoryDetails } from "../../redux/actions/otherActions";
import Loader from "../../components/Layout/Loader";

const UpdateCategory = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [id] = useState(route.params.id);
  const [loading, setLoading] = useState(false);
  const [category, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getCategoryDetails(id));
      } catch (error) {
        console.error("Error fetching category details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id, isFocused]);

  const { category: categoryDetails } = useSelector((state) => state.other);

  const submitHandler = () => {
    dispatch(updateCategory(id, category));
  };

  useEffect(() => {
    if (categoryDetails) {
      setCategoryName(categoryDetails.category);
    }
  }, [categoryDetails]);

  const handleCategoryChange = (newCategory) => {
    setCategoryName(newCategory);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f4b546" }}>
      <View className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              console.log("Can't go back");
            }
          }}
          style={{ backgroundColor: "#bc430b" }}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-10"
        >
          <Icons.ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, color: "#FFFFFF", fontWeight: "800" }}>
          Update Category
        </Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          style={{
            padding: 20,
            elevation: 10,
            backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              height: 450,
            }}
          >
            <Button
              onPress={() =>
                navigation.navigate("categoryimages", {
                  id,
                  images: categoryDetails.images,
                })
              }
              textColor={"#bc430b"}
              disabled={loading}
            >
              Manage Images
            </Button>

            <TextInput
              placeholder="Name"
              value={category}
              onChangeText={handleCategoryChange}
              style={{ backgroundColor: "transparent" }}
            />

            <Button
              textColor={"#FFFFFF"}
              style={{
                backgroundColor: "#bc430b",
                margin: 20,
                padding: 6,
              }}
              onPress={submitHandler}
              loading={loading}
              disabled={loading}
            >
              Update
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default UpdateCategory;
