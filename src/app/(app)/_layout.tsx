import { TransactionsProvider } from "@/src/screens/transactions/context/transactionsContext";
import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
  return (
    <TransactionsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack />

        <Stack.Screen name="transaction-form" />

        <Stack.Screen
          name="categories-bottom-sheet"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.25, 0.4, 1],
            sheetInitialDetentIndex: 1,
            sheetGrabberVisible: true,
            sheetCornerRadius: 24,
          }}
        />
        <Stack.Screen
          name="calendar-bottom-sheet"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
            sheetGrabberVisible: false,
            sheetCornerRadius: 24,
          }}
        />
        <Stack.Screen
          name="filter-bottom-sheet"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
            sheetGrabberVisible: false,
            sheetCornerRadius: 24,
          }}
        />
        <Stack.Screen
          name="types-bottom-sheet"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
            sheetGrabberVisible: false,
            sheetCornerRadius: 24,
          }}
        />
      </Stack>
    </TransactionsProvider>
  );
}
