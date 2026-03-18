import React from "react";
import Onboarding from "../components/onboarding";
import { navigation } from "../navigation";

const onPressGettingStarted = () => {
  navigation.goToSignIn();
};

export default function OnboardingScreen() {
  return <Onboarding onPressGettingStarted={onPressGettingStarted} />;
}
