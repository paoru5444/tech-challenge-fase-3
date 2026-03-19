import ElipsesBackground from "@/src/components/shared/elipses-background";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import Typography from "@/src/components/ui/typography";
import { images } from "@/src/constants";
import { globals } from "@/src/globals";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface SignUpForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface SignInProps {
  control: Control<SignUpForm>;
  errors: FieldErrors<SignUpForm>;
  isLoading: boolean;
  onSignUp: (data: SignUpForm) => void;
  goToSignIn: () => void;
  handleSubmit: any;
}

export default function SignUp({
  control,
  errors,
  isLoading,
  onSignUp,
  goToSignIn,
  handleSubmit,
}: SignInProps) {
  return (
    <View style={[globals.container, styles.container]}>
      <ElipsesBackground />
      <Image source={images.logo} style={globals.logo} resizeMode="contain" />
      <View
        style={{
          gap: 32,
        }}
      >
        <View>
          <Typography size={24} weight="600">
            Que bom te conhecer 👋
          </Typography>
          <Typography size={14}>Crie sua conta!</Typography>
        </View>

        <View style={{ gap: 20 }}>
          <Input
            control={control}
            name="email"
            label="Email"
            placeholder="john.doe@mail.com"
            autoCapitalize="none"
            error={errors["email"]}
          />

          <Input
            control={control}
            name="password"
            label="Senha"
            placeholder="******"
            autoCapitalize="none"
            secureTextEntry
            error={errors["password"]}
          />

          <Input
            control={control}
            name="passwordConfirm"
            label="Confirmar senha"
            placeholder="******"
            autoCapitalize="none"
            secureTextEntry
            error={errors["passwordConfirm"]}
          />
        </View>

        <Button
          onPress={handleSubmit(onSignUp)}
          label="Criar conta"
          isLoading={isLoading}
        />

        <TouchableOpacity onPress={goToSignIn}>
          <Typography size={12} style={{ textAlign: "center" }}>
            Já tenho uma conta. Fazer Login!
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
});
