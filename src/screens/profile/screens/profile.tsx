import ElipsesBackground from "@/src/components/shared/elipses-background";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import Typography from "@/src/components/ui/typography";
import { images } from "@/src/constants";
import { useAuth } from "@/src/context/auth.context";
import React from "react";
import { Image, ScrollView, View } from "react-native";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: "red", padding: 16 }}
    >
      <ElipsesBackground />
      <View
        style={{
          width: "100%",
          height: 250,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            borderWidth: 4,
            borderColor: "#F478B8",
          }}
        >
          <Image
            source={images.logo}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>
      </View>

      <View style={{ flex: 1, gap: 16 }}>
        <Typography>Informação Detalhada:</Typography>

        <Input label="Nome:" value="Paulo Roberto" editable={false} />
        <Input label="Email:" value="a@b.com" editable={false} />
      </View>

      <Button label="Sair" onPress={() => logout()} />
    </ScrollView>
  );
}
