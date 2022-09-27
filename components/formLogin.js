/** @format */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/auth/operations";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Btn from "./button/button";

const FormLogin = ({ navigation, setIsFocus, isFocus }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const dispatch = useDispatch();

  const login = () => {
    if ((email !== "", password !== "")) {
      dispatch(signInUser({ email, password }));
    }
  };

  return (
    <View style={{ ...styles.container, paddingBottom: isFocus ? 180 : 120 }}>
      <Text style={styles.title}>Войти</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onFocus={() => setIsFocus(true)}
          placeholder="Адрес электронной почты"
          autoComplete="email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <View style={styles.containerPass}>
          <TextInput
            style={{ ...styles.input, marginBottom: 43 }}
            onFocus={() => setIsFocus(true)}
            placeholder="Пароль"
            secureTextEntry={isSecure}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Btn
            onPress={() => setIsSecure(!isSecure)}
            title={isSecure ? "Показать" : "Скрыть"}
            style={{
              color: "#1B4371",
              position: "absolute",
              right: 12,
              top: 8,
            }}
          />
        </View>
        <Btn
          onPress={login}
          title={"Войти"}
          style={{ color: "#FFFFFF", backgroundColor: "#FF6C00" }}
        />
        <Btn
          onPress={() => {
            navigation.navigate("Registration");
          }}
          title={"Нет аккаунта? Зарегистрироваться"}
          style={{ color: "#1B4371" }}
        />
      </View>
    </View>
  );
};

export default FormLogin;

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
  },
  containerPass: {
    position: "reletave",
  },
  input: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    fontSize: 16,
    color: "#212121",
  },
});
