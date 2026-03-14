import Typography from "@/src/components/ui/typography";
import { icons } from "@/src/constants/icons";
import { dateFormatter } from "@/src/utils/functions";
import React from "react";
import { Image, View } from "react-native";
import { Transaction, TransactionType } from "../../transactions/models";

const typeColors = {
  deposit: "#ECFFE8",
  withdraw: "#FFE1E1",
  transfer: "#DBE7FF",
};

export default function LastTransactions({
  lastTransactions,
  selectedType,
}: {
  lastTransactions: Transaction[];
  selectedType: TransactionType;
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
            <View
              style={{
                backgroundColor: typeColors[transaction.type],
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={icons.deposit} style={{ width: 40, height: 40 }} />
            </View>
            {/* <Image source={images.deposit} style={{ width: 34, height: 34 }} /> */}

            <View>
              <Typography size={12} style={{ fontWeight: 600 }}>
                {/* {transaction.description.substr(0, 15)}... */}
                {transaction.description}
              </Typography>
              <Typography size={11} color="gray">
                {dateFormatter(transaction.date)}
              </Typography>
            </View>
          </View>

          <View>
            <Typography style={{ textAlign: "right" }}>
              R${transaction.amount}
            </Typography>
            <Typography size={12} style={{ textAlign: "right" }}>
              {transaction.category.value}
            </Typography>
          </View>
        </View>
      ))}
    </>
  );
}
