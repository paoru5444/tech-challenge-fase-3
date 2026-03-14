import Typography from "@/src/components/ui/typography";
import { icons } from "@/src/constants/icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { FORM_TYPES } from "../../transactions/constants";

interface BalanceProps {
  totalBalance: number;
  handleGoTo: (type: keyof typeof FORM_TYPES) => void;
}

export default function Balance({ totalBalance, handleGoTo }: BalanceProps) {
  return (
    <View style={{ paddingHorizontal: 22, gap: 32 }}>
      <View style={{ alignItems: "center", gap: 2 }}>
        <Typography weight="600" color="#AEAEB2">
          Saldo Total
        </Typography>
        <Typography weight="600" size={40}>
          R${totalBalance}
        </Typography>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleGoTo("deposit")}
          style={{
            width: 90,
            height: 90,
            backgroundColor: "#fff",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 32,
          }}
        >
          <Image
            source={icons.depositOutline}
            style={{ width: 24, height: 24 }}
          />
          <Typography size={12}>Entradas</Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleGoTo("withdraw")}
          style={{
            width: 90,
            height: 90,
            backgroundColor: "#fff",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 32,
          }}
        >
          <Image
            source={icons.withdrawOutline}
            style={{ width: 24, height: 24 }}
          />
          <Typography size={12}>Saídas</Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleGoTo("transfer")}
          style={{
            width: 90,
            height: 90,
            backgroundColor: "#fff",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 32,
          }}
        >
          <Image
            source={icons.transferOutline}
            style={{ width: 24, height: 24 }}
          />
          <Typography size={12}>Transações</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}
