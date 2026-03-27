import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoleScreen from "../screens/RoleScreen";
import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";
import HomeScreen from "../screens/HomeScreen";
import ApprovalPending from "../screens/ApprovalPending";
import WorkerDetailsScreen from "../screens/WorkerDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Role" component={RoleScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pending" component={ApprovalPending} />
      <Stack.Screen name="WorkerDetails" component={WorkerDetailsScreen} />
    </Stack.Navigator>
  );
}
