import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../context/auth.context";
import OnboardingScreen from "../screens/onboarding/screens/onboarding";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (user) {
    return <Redirect href="/(app)" />;
  }

  // return <SignIn />;
  return <OnboardingScreen />;
}
