import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import API from "../services/api";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTPScreen({ route, navigation }) {
  const { confirmation, role } = route.params;
  const [code, setCode] = useState("");

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(code);
      const idToken = await auth().currentUser.getIdToken();

      const res = await API.post(
        "/auth/login",
        { role },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      const { token, user } = res.data;
      await AsyncStorage.setItem("userToken", token);

      if (user.role === "customer") {
        navigation.replace("Home");
      } else {
        // Worker check
        if (!user.skills || user.skills.length === 0) {
          navigation.replace("WorkerDetails");
        } else if (!user.isApproved) {
          navigation.replace("Pending");
        } else {
          navigation.replace("Home");
        }
      }
    } catch (err) {
      if (err.response?.status === 403) {
        const { message, user } = err.response.data;
        if (message === "Details Missing") {
          navigation.replace("WorkerDetails");
        } else {
          navigation.replace("Pending");
        }
      } else {
        Alert.alert("Error", err.response?.data?.message || "OTP Failed");
      }
    }
  };

  return (
    <View>
      <TextInput placeholder="OTP" onChangeText={setCode} />
      <Button title="Verify OTP" onPress={verifyOTP} />
    </View>
  );
}
