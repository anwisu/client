import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useMessageAndErrorOther } from "../../utils/hooks";
import mime from "mime";
import * as Icons from "react-native-heroicons/solid";
import { deleteCategoryImage, updateCategoryImage } from "../../redux/actions/otherActions";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, navigate } from "react-redux";

const CategoryImages = ({ navigation, route }) => {
  const [images, setImages] = useState(route.params.images);
  const [categoryId] = useState(route.params.id);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  const deleteHandler = (imageId) => {
    dispatch(deleteCategoryImage(categoryId, imageId));
  };

  const submitHandler = async () => {
    try {
      const myForm = new FormData();

      selectedImages.forEach((image, index) => {
        myForm.append(`file${index}`, {
          uri: image,
          type: mime.getType(image),
          name: image.split("/").pop(),
        });
      });

      await dispatch(updateCategoryImage(categoryId, myForm));
      setImageChanged(false);
      setSelectedImages([]);
    } catch (error) {
      console.log('Error updating category images:', error);
    }
  };

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true,
      });

      if (!result.cancelled && result.assets.length > 0) {
        const newImages = result.assets.map(asset => asset.uri);
        setSelectedImages([...selectedImages, ...newImages]);
        setImageChanged(true);
      }
    } catch (error) {
      console.log('Error picking images:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4B546", padding: 15 }}>
      {/* Your UI components */}
      {/* Button to open multi-image picker */}
      <Button
        mode="contained"
        onPress={openImagePicker}
        style={{ marginBottom: 20, backgroundColor: "#BC430B" }}
      >
        Select Images
      </Button>

      {/* Display selected images */}
      <ScrollView>
        {selectedImages.map((image, index) => (
          <Image
            key={index}
            style={{ width: 300, height: 150, resizeMode: 'contain' }}
            source={{ uri: image }}
          />
        ))}
      </ScrollView>

      {/* Submit button */}
      <Button
        style={{
          backgroundColor: "#BC430B",
          padding: 6,
        }}
        loading={loading}
        onPress={submitHandler}
        disabled={!imageChanged}
      >
        Add
      </Button>
    </View>
  );
};

export default CategoryImages;
