import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import API from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkerDetailsScreen({ navigation, route }) {
  const [skills, setSkills] = useState("");
  const [documents, setDocuments] = useState(""); // Simplified for now

  const submitDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await API.post(
        "/auth/update-details",
        {
          skills: skills.split(",").map((s) => s.trim()),
          documents: [documents], // Simulated document upload
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Success", "Details submitted for approval");
      navigation.replace("Pending");
    } catch (err) {
      Alert.alert("Error", "Failed to submit details");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worker Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Skills (comma separated)"
        value={skills}
        onChangeText={setSkills}
      />
      <TextInput
        style={styles.input}
        placeholder="Document URL or ID"
        value={documents}
        onChangeText={setDocuments}
      />
      <Button title="Submit for Approval" onPress={submitDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
