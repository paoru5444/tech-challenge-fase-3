import { useTransactionsContext } from "@/src/screens/transactions/context/transactionsContext";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CategoriesCalendar() {
  const { width } = Dimensions.get("screen");
  const { handleSelectedDate } = useTransactionsContext();
  return (
    <View style={styles.container}>
      <Calendar
        style={{ width, padding: 16 }}
        onDayPress={({ dateString }) => {
          handleSelectedDate(dateString);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
