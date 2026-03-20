import ElipsesBackground from "@/src/components/shared/elipses-background";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import Spacer from "@/src/components/ui/spacer";
import Typography from "@/src/components/ui/typography";
import { images } from "@/src/constants";
import { User } from "firebase/auth";
import React from "react";
import { Image, ScrollView, View } from "react-native";

interface ProfileProps {
  user: User | null;
  onLogout: () => void;
}

export default function Profile({ user, onLogout }: ProfileProps) {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
      <ElipsesBackground />
      <View
        style={{
          width: "100%",
          height: 250,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.coupleDoingCamping}
          style={{ width: 150, height: 150, resizeMode: "contain" }}
        />
      </View>

      <View style={{ flex: 1, gap: 16 }}>
        <Typography>Informações:</Typography>

        <Input label="Email:" value={user?.email ?? ""} editable={false} />
      </View>

      <Button
        label="Sair"
        style={{ backgroundColor: "#F06480" }}
        onPress={onLogout}
      />

      <Spacer />
    </ScrollView>
  );
}
