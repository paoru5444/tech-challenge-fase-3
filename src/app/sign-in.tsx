import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Typography from "../components/ui/typography";
import { images } from "../constants";
import { useAuth } from "../context/auth.context";

export default function SignIn() {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSignIn = () => {
    signIn(formData.email, formData.password);
  };

  const handleCreateAccount = () => {
    router.push("/sign-up");
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
            Olá novamente 👋
          </Text>
          <Text style={{ fontSize: 14 }}>Entre na sua conta!</Text>
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
            label="Password"
            onChangeText={(value) => handleInputChange("password", value)}
            placeholder="******"
            autoCapitalize="none"
            secureTextEntry
          />

          {/* <Typography style={{ textAlign: "right" }}>
            Esqueci minha senha
          </Typography> */}
        </View>

        <Button onPress={onSignIn} label="Login" />

        <TouchableOpacity onPress={handleCreateAccount}>
          <Typography style={{ textAlign: "center", fontSize: 12 }}>
            Não tem uma conta? Cadastre-se!
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}
