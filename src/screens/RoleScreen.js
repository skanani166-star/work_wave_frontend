import React from "react";
import { View, Button } from "react-native";

export default function RoleScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:"center" }}>
      <Button title="Customer" onPress={() => navigation.navigate("Login",{role:"customer"})} />
      <Button title="Worker" onPress={() => navigation.navigate("Login",{role:"worker"})} />
    </View>
  );
}
