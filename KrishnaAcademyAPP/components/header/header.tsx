import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";
import { useFonts } from "expo-font";
import useUser from "@/hooks/auth/useUser";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Header() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const subscription = async () => {
      const cart: any = await AsyncStorage.getItem("cart");
      setCartItems(JSON.parse(cart));
    };
    subscription();
  }, []);

  const { user } = useUser();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => router.push("/(routes)/notifications")}>
        <FontAwesome name="bell" size={30} color="rgb(242, 221, 126)" />
      </TouchableOpacity>
      <View>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722698298/ieglfi8opdzrrtzwzfwi.png",
          }}
          style={{
            width: 60,
            height: 60,
            backgroundColor: "transparent",
            // marginRight: 8,
            borderRadius: 10,
          }}
        />
      </View>

      <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap:5
      }}
      >
        <Image 
        source={require('../../assets/icons/customer-service.png')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 10
        }}
        />

      <TouchableOpacity onPress={() => router.push("/(routes)/notifications")}>
        <FontAwesome name="bell" size={35} color="rgb(242, 221, 126)" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0000',
    width: "100%",
    // marginLeft: -10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    zIndex: 100,
  },

  headerWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal:10,
  },

  image: {
    width: 45,
    height: 45,
    marginRight: 8,
    borderRadius: 100,
  },

  text: {
    fontSize: 16,
  },

  bellButton: {
    borderWidth: 1,
    borderColor: "#E1E2E5",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  bellIcon: {
    alignSelf: "center",
  },

  bellContainer: {
    width: 20,
    height: 20,
    backgroundColor: "#ED3137",
    position: "absolute",
    borderRadius: 50,
    right: -5,
    top: -5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  helloText: { color: "#7C7C80", fontSize: 14 },
});
