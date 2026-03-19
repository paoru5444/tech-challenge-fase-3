import Button from "@/src/components/ui/button";
import { useAuth } from "@/src/context/auth.context";
import React from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <View>
      <Text>profile</Text>

      <Button label="Logout" onPress={() => logout()} />
    </View>
  );
}
