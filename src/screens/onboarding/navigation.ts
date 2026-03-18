import { router } from "expo-router";

const goToSignIn = () => {
  router.push("/sign-in");
};

export const navigation = {
  goToSignIn,
};
