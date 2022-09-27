/** @format */
import * as FileSystem from "expo-file-system";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Btn from "../../components/button/button";
import BtnNavigate from "../../components/button/btnNavigate";
import Container from "../../components/container";
import { useDispatch } from "react-redux";
import { addUserPost, storage } from "../../redux/posts/operations";
import CameraCont from "../../components/camera";
import BtnDelete from "../../components/button/btnDelete";
import img from "../../image/pexels-photo-1563356.jpeg";

const CreatePostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [namePhoto, setNamePhoto] = useState(null);
  const [nameLocation, setNameLocation] = useState(null);

  const isActive = () => (namePhoto && nameLocation && photo ? true : false);

  const uploadPhotoToServer = async () => {
    const file = await FileSystem.readAsStringAsync(photo, {
      encoding: FileSystem.EncodingType.Base64,
    });
  };

  const cteatePost = () => {
    if (isActive()) {
      dispatch(addUserPost(namePhoto, nameLocation, location));
      removePost();
      navigation.navigate("Home", { screen: "Posts" });
    }
  };

  const removePost = () => {
    setPhoto(null);
    setLocation(null);
    setNamePhoto(null);
    setNameLocation(null);
  };

  return (
    <Container>
      <CameraCont setLocation={setLocation} setPhoto={setPhoto} photo={photo} />
      <TextInput
        style={styles.input}
        placeholder="Название..."
        value={namePhoto}
        onChangeText={(value) => setNamePhoto(value)}
      />
      <View style={styles.mapInput}>
        <BtnNavigate onPress={() => {}} />
        <TextInput
          placeholder="  Местность..."
          style={{ fontSize: 16 }}
          value={nameLocation}
          onChangeText={(value) => setNameLocation(value)}
        />
      </View>
      <Btn
        onPress={cteatePost}
        title={"Опубликовать"}
        style={{
          color: isActive() ? "#FFFFFF" : "#BDBDBD",
          backgroundColor: isActive() ? "#FF6C00" : "#E5E5E5",
        }}
      />
      <BtnDelete onPress={removePost} />
    </Container>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  input: {
    height: 66,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
  },
  mapInput: {
    flexDirection: "row",
    marginBottom: 35,
    alignItems: "center",
    height: 66,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
  },

  image: {
    height: "100%",
    width: 240,

    justifyContent: "center",
    alignItems: "center",
  },
});
