import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext"; 
const Login: React.FC = () => {
  const navigation : NavigationProp<ParamListBase> = useNavigation();
  const { handleLogin, handleRegister } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.Loginbutton}
        onPress={() => handleLogin(email, password, navigation)}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.Registerbutton}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => handleRegister(email, password, navigation)}
        >
          <Text style={styles.registerText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  Loginbutton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#06668C",
    opacity: 0.8,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  Registerbutton: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    opacity: 0.8,

    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#5FC2BA",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
