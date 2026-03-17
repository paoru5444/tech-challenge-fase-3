import ElipsesBackground from "@/src/components/shared/elipses-background";
import Typography from "@/src/components/ui/typography";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Navbar from "../../../components/shared/navbar";
import { FORM_TYPES } from "../../transactions/constants";
import { Transaction, TransactionType } from "../../transactions/models";
import Analytics from "../components/analytics";
import Balance from "../components/balance";
import LastTransactions from "../components/last-transactions";

interface HomeProps {
  totalBalance: number;
  goToTransactionsForm: (type: keyof typeof FORM_TYPES) => void;
  chartData: any;
  openTypesBottomSheet: () => void;
  selectedType: TransactionType;
  lastTransactions: Transaction[];
}

export default function Home({
  totalBalance,
  goToTransactionsForm,
  chartData,
  openTypesBottomSheet,
  selectedType,
  lastTransactions,
}: HomeProps) {
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

      <Balance
        totalBalance={totalBalance}
        goToTransactionsForm={goToTransactionsForm}
      />

      <View style={{ width: "100%", gap: 16 }}>
        <Typography weight="600">Analises</Typography>
        <Analytics
          chartData={chartData}
          openTypesBottomSheet={openTypesBottomSheet}
          selectedType={selectedType}
        />
      </View>

      <View style={{ gap: 16 }}>
        <TouchableOpacity onPress={() => router.push("/transactions/list")}>
          <Typography weight="600">Ulitmas Transações</Typography>
        </TouchableOpacity>

        <LastTransactions
          lastTransactions={lastTransactions}
          selectedType={selectedType}
        />
      </View>
    </ScrollView>
  );
}
