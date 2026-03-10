import ElipsesBackground from "@/src/components/shared/elipses-background";
import Typography from "@/src/components/ui/typography";
import useAnalytics from "@/src/hooks/useAnalytics";
import useTransactions from "@/src/hooks/useTransactions";
import { router } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Navbar from "../../components/shared/navbar";
import { FORM_TYPES } from "../transactions/constants";
import { FORM_MODE } from "../transactions/models";
import Analytics from "./components/analytics";
import Balance from "./components/balance";
import LastTransactions from "./components/last-transactions";

// Para amanhã: Atualizar e deletar transação & Anexar arquivo

export default function Home() {
  const { transactions, getTransactions } = useTransactions();
  const { chartData } = useAnalytics({ transactions });

  useEffect(() => {
    getTransactions();
  }, []);

  const handleGoTo = (type: keyof typeof FORM_TYPES) => {
    router.push({
      pathname: "/transactions/form",
      params: { ...FORM_TYPES[type], mode: FORM_MODE.CREATE },
    });
  };

  const derivedTotal = useMemo(() => {
    return transactions.reduce((acc, item) => {
      if (!item.amount) {
        return acc;
      }
      return acc + parseFloat(item.amount);
    }, 0);
  }, [transactions]);

  const lastTransactions = useMemo(() => {
    return transactions.slice(0, 3);
  }, [transactions]);

  const currentMonth = new Date().getMonth() - 1;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        gap: 24,
        paddingHorizontal: 22,
        backgroundColor: "#FDFDFD",
      }}
    >
      <ElipsesBackground />

      <Navbar showHeader />

      <Balance totalBalance={derivedTotal} handleGoTo={handleGoTo} />

      <View style={{ width: "100%", gap: 16 }}>
        <Typography weight="600">Analises</Typography>
        <Analytics chartData={chartData} currentMonth={currentMonth} />
      </View>

      <View style={{ gap: 16 }}>
        <TouchableOpacity onPress={() => router.push("/transactions/list")}>
          <Typography weight="600">Ulitmas Transações</Typography>
        </TouchableOpacity>

        <LastTransactions lastTransactions={lastTransactions} />
      </View>
    </ScrollView>
  );
}
