import { useAuth } from "@/src/context/auth.context";
import { signInSchema } from "@/src/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import SignIn from "../components/sign-in";
import { navigation } from "../navigation";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const { signIn, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = (data: SignInForm) => {
    const { email, password } = data;
    signIn(email, password);
  };

  const goToSignUp = () => {
    navigation.goToSignUp();
  };

  return (
    <SignIn
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      isLoading={loading}
      onSignIn={onSignIn}
      goToSignUp={goToSignUp}
    />
  );
}
