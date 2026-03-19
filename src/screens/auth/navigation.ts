import { router } from "expo-router";

const goToSignUp = () => {
  router.push("/sign-up");
};

const goToSignIn = () => {
  router.push("/sign-in");
};

export const navigation = {
  goToSignUp,
  goToSignIn,
};
