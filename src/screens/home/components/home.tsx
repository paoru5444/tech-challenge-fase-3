import ElipsesBackground from "@/src/components/shared/elipses-background";
import LoadingScreen from "@/src/components/shared/loading-screen";
import Spacer from "@/src/components/ui/spacer";
import Typography from "@/src/components/ui/typography";
import React from "react";
import { ScrollView, View } from "react-native";
import Navbar from "../../../components/shared/navbar";
import { FORM_TYPES } from "../../transactions/constants";
import { Transaction, TransactionType } from "../../transactions/models";
import Analytics from "./analytics";
import Balance from "./balance";
import EmptyAnalytics from "./empty-analytics";
import LastTransactions from "./last-transactions";

interface HomeProps {
  totalBalance: number;
  goToTransactionsForm: (type: keyof typeof FORM_TYPES) => void;
  chartData: any;
  openTypesBottomSheet: () => void;
  selectedType: TransactionType;
  lastTransactions: Transaction[];
  loading: boolean;
}

export default function Home({
  totalBalance,
  goToTransactionsForm,
  chartData,
  openTypesBottomSheet,
  selectedType,
  lastTransactions,
  loading,
}: HomeProps) {
  if (loading && !chartData?.length) {
    return <LoadingScreen />;
  }

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

        {!chartData?.length ? (
          <EmptyAnalytics />
        ) : (
          <Analytics
            chartData={chartData}
            openTypesBottomSheet={openTypesBottomSheet}
            selectedType={selectedType}
          />
        )}
      </View>

      {lastTransactions.length && (
        <View style={{ gap: 16 }}>
          <Typography weight="600">Ulitmas Transações</Typography>

          <LastTransactions
            lastTransactions={lastTransactions}
            selectedType={selectedType}
          />
        </View>
      )}

      <Spacer />
    </ScrollView>
  );
}
