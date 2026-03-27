import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import auth from "@react-native-firebase/auth";

export default function LoginScreen({ navigation, route }) {
  const { role } = route.params;
  const [mobile, setMobile] = useState("");

  const sendOTP = async () => {
    const confirmation = await auth().signInWithPhoneNumber(`+91${mobile}`);
    navigation.navigate("OTP", { confirmation, role });
  };

  return (
    <View>
      <TextInput placeholder="Mobile" onChangeText={setMobile} />
      <Button title="Send OTP" onPress={sendOTP} />
    </View>
  );
}
