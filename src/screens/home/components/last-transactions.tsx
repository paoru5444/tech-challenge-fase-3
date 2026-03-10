import Typography from "@/src/components/ui/typography";
import { images } from "@/src/constants";
import React from "react";
import { Image, View } from "react-native";
import { Transaction } from "../../transactions/models";

export default function LastTransactions({
  lastTransactions,
}: {
  lastTransactions: Transaction[];
}) {
  return (
    <>
      {lastTransactions.map((transaction) => (
        <View
          key={transaction.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            minHeight: 66,
            paddingHorizontal: 16,
            borderRadius: 15,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 32,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image source={images.deposit} style={{ width: 34, height: 34 }} />

            <View>
              <Typography style={{ fontWeight: 600 }}>
                {transaction.description.substr(0, 15)}...
              </Typography>
              <Typography>{transaction.date}</Typography>
            </View>
          </View>

          <View>
            <Typography style={{ textAlign: "right" }}>
              R${transaction.amount}
            </Typography>
            <Typography style={{ textAlign: "right" }}>
              {transaction.category.value}
            </Typography>
          </View>
        </View>
      ))}
    </>
  );
}
