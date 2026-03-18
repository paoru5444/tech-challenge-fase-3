import Badge from "@/src/components/ui/bedge";
import Button from "@/src/components/ui/button";
import Typography from "@/src/components/ui/typography";
import useCategories from "@/src/hooks/useCategories";
import useTransactions from "@/src/hooks/useTransactions";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { monthNamesInPortuguese } from "../constants";
import { useTransactionsContext } from "../context/transactionsContext";

export default function TransactionFilter() {
  const { handleSelectedCategory } = useTransactionsContext();

  const [selectedCategory, setSelectedCategory] = useState({
    key: "",
    value: "",
  });
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const { getCategories, categories, loading } = useCategories();
  const { getTransactionsYearsAndMonths, transactionMonths, transactionYears } =
    useTransactions();

  useEffect(() => {
    getCategories();
    getTransactionsYearsAndMonths();
  }, []);

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
          {!loading &&
            Object.entries(categories).map(([key, value]) => (
              <Badge
                key={key}
                label={value}
                onPress={() => setSelectedCategory({ key, value })}
                isActive={key === selectedCategory.key}
              />
            ))}
        </View>

        <Typography weight="600">Ano: </Typography>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {transactionYears.map((value) => (
            <Badge
              key={value}
              label={value}
              onPress={() => setSelectedYear(value)}
              isActive={value === selectedYear}
            />
          ))}
        </View>

        <Typography weight="600">Mês: </Typography>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {transactionMonths.map((value) => (
            <Badge
              key={value}
              label={monthNamesInPortuguese[parseInt(value - 1)]}
              onPress={() => setSelectedMonth(value)}
              isActive={value === selectedMonth}
            />
          ))}
        </View>

        {!loading && (
          <Button
            label="Filtrar"
            onPress={() => {
              handleSelectedCategory(selectedCategory);
              router.dismissTo({
                pathname: "/(app)/transactions/[list]",
                params: {
                  month: selectedMonth,
                  year: selectedYear,
                  category: selectedCategory.key,
                },
              });
            }}
          />
        )}
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
