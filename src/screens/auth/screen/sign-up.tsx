import { useAuth } from "@/src/context/auth.context";
import { signUpSchema } from "@/src/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import SignUp from "../components/sign-up";
import { navigation } from "../navigation";

interface SignUpForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpScreen() {
  const { signUp, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const goToSignIn = () => {
    navigation.goToSignIn();
  };

  const onSignUp = (data: SignUpForm) => {
    const { email, password, passwordConfirm } = data;

    if (password != passwordConfirm) {
      console.log("As senhas precisam ser iguais");
      return;
    }

    signUp(email, password);
  };

  return (
    <SignUp
      control={control}
      errors={errors}
      goToSignIn={goToSignIn}
      handleSubmit={handleSubmit}
      isLoading={loading}
      onSignUp={onSignUp}
    />
  );
}
