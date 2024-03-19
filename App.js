import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [Todo, setTodo] = useState([]);
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const cameraRef = useRef();
  async function snapPicture() {
    const photo = await cameraRef.current.takePictureAsync();
    setTodo([...Todo, { uri: photo.uri }]);
  }
  console.log(Todo);

  function deleteImage(index) {
    Todo.splice(index, 1);
    setTodo([...Todo]);
  }

  return (
    <>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.textflip}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={snapPicture}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://static-00.iconduck.com/assets.00/snap-icon-2048x2048-hs6u6g2k.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
      <ScrollView>
        <View style={styles.container}>
          {Todo.map((item, index) => {
            return (
              <View key={index} style={styles.renderTodos}>
                <Image
                  source={{
                    uri: item?.uri,
                  }}
                  style={styles.top}
                />
                <TouchableOpacity
                  style={styles.buttond}
                  onPress={() => {
                    deleteImage(index);
                  }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    gap: 20,
  },
  camera: {
    height: 400,
    borderWidth: 1,
  },
  top: {
    height: 100,
    width: 200,
    borderWidth: 5,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    padding: 10,
    margin: 10,
    fontSize: 30,
  },
  renderTodos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
  },
  textflip: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  buttond: {
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
});
