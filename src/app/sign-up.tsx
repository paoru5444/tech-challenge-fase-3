import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Typography from "../components/ui/typography";
import { images } from "../constants";
import { useAuth } from "../context/auth.context";
import { goTo } from "../utils/functions";

export default function SignUp() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSignUp = () => {
    const { email, password, passwordConfirm } = formData;
    if (password !== passwordConfirm) {
      Alert.alert("Senha incorreta, melhore!");
      return;
    }
    signUp(email, password);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        gap: 80,
        paddingTop: 60,
      }}
    >
      <Image
        source={images.logo}
        style={{ width: 150, height: 45 }}
        resizeMode="contain"
      />
      <View
        style={{
          gap: 32,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>
            Que bom te conhecer 👋
          </Text>
          <Text style={{ fontSize: 14 }}>Crie sua conta!</Text>
        </View>

        <View style={{ gap: 20 }}>
          <Input
            value={formData.email}
            label="Email"
            onChangeText={(value) => handleInputChange("email", value)}
            placeholder="john.doe@mail.com"
            autoCapitalize="none"
          />

          <Input
            value={formData.password}
            label="Senha"
            onChangeText={(value) => handleInputChange("password", value)}
            placeholder="******"
            autoCapitalize="none"
            secureTextEntry
          />

          <Input
            value={formData.passwordConfirm}
            label="Confirmar senha"
            onChangeText={(value) =>
              handleInputChange("passwordConfirm", value)
            }
            placeholder="******"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <Button onPress={onSignUp} label="Login" />

        <TouchableOpacity onPress={() => goTo("/sign-in")}>
          <Typography style={{ textAlign: "center", fontSize: 12 }}>
            Já tenho uma conta. Fazer Login!
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}
