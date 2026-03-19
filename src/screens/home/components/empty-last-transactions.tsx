import Typography from "@/src/components/ui/typography";
import { images } from "@/src/constants";
import React from "react";
import { Image, View } from "react-native";

export default function EmptyLastTransactions() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 32,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Image
        source={images.registerTransaction}
        style={{ width: 124, height: 124 }}
      />
      <Typography color="#24252C" style={{ textAlign: "center" }}>
        Ainda não registrou uma transação?
      </Typography>
      <Typography size={12} color="#6E6A7C" style={{ textAlign: "center" }}>
        Sem problemas, cadastre uma nova transação acima (Entrada, Saída ou
        Transação) e obtenha um resumo do seu orçamento.
      </Typography>
    </View>
  );
}
