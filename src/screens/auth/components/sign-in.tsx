import ElipsesBackground from "@/src/components/shared/elipses-background";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import Typography from "@/src/components/ui/typography";
import { images } from "@/src/constants";
import { globals } from "@/src/globals";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface SignInForm {
  email: string;
  password: string;
}

interface SignInProps {
  control: Control<SignInForm>;
  errors: FieldErrors<SignInForm>;
  isLoading: boolean;
  onSignIn: (data: SignInForm) => void;
  goToSignUp: () => void;
  handleSubmit: any;
}

export default function SignIn({
  control,
  errors,
  isLoading,
  onSignIn,
  goToSignUp,
  handleSubmit,
}: SignInProps) {
  return (
    <View style={[globals.container, styles.container]}>
      <ElipsesBackground />
      <Image source={images.logo} style={globals.logo} resizeMode="contain" />

      <View style={styles.content}>
        <View>
          <Typography size={24} weight="600">
            Olá novamente 👋
          </Typography>
          <Typography size={14}>Entre na sua conta!</Typography>
        </View>

        <View style={{ gap: 20 }}>
          <Input
            label="Email"
            placeholder="john.doe@mail.com"
            autoCapitalize="none"
            control={control}
            error={errors["email"]}
            name="email"
          />

          <Input
            label="Password"
            placeholder="******"
            autoCapitalize="none"
            secureTextEntry
            control={control}
            error={errors["password"]}
            name="password"
          />
        </View>

        <Button
          onPress={handleSubmit(onSignIn)}
          label="Login"
          isLoading={isLoading}
        />

        <TouchableOpacity onPress={goToSignUp}>
          <Typography size={12} style={{ textAlign: "center" }}>
            Não tem uma conta? Cadastre-se!
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 80,
    paddingTop: 60,
  },
  content: {
    gap: 32,
  },
});
