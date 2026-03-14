import Badge from "@/src/components/ui/bedge";
import Button from "@/src/components/ui/button";
import Typography from "@/src/components/ui/typography";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { barChartTypes } from "../constants";
import { useTransactionsContext } from "../context/transactionsContext";
import { TransactionType } from "../models";

export default function TypesList() {
  const { handleSelectedType } = useTransactionsContext();

  const [selectedType, setSelectedType] = useState<TransactionType>(
    TransactionType.ALL,
  );

  const onSelectCategory = () => {
    handleSelectedType(selectedType);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          minHeight: 200,
          paddingVertical: 40,
          paddingHorizontal: 32,
          gap: 16,
        }}
      >
        <Typography weight="600">Categorias: </Typography>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {Object.entries(TransactionType).map(([key, value]) => (
            <Badge
              key={key}
              label={barChartTypes[value]}
              onPress={() => setSelectedType(value)}
              isActive={value === selectedType}
            />
          ))}
        </View>

        <Button label="Selecionar" onPress={onSelectCategory} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
