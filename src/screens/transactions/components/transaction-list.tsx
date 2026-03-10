import React from "react";

import ElipsesBackground from "@/src/components/shared/elipses-background";
import Navbar from "@/src/components/shared/navbar";
import Badge from "@/src/components/ui/bedge";
import Input from "@/src/components/ui/input";
import Typography from "@/src/components/ui/typography";
import { icons } from "@/src/constants/icons";
import { router } from "expo-router";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Transaction, TransactionsListProps, TransactionType } from "../models";

export default function TransactionsList({
  search,
  handleSearchChange,
  transactions,
  handleActiveTransactionFilter,
  onPressTransaction,
}: TransactionsListProps) {
  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
      onPress={() => onPressTransaction(item)}
    >
      <View style={{ gap: 4 }}>
        <Typography style={{ color: "#8E8E93" }}>
          {item.category?.value}
        </Typography>
        <Typography style={{ fontWeight: 600 }}>{item.description}</Typography>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Image
            source={icons.calendarCache}
            style={{ width: 16, height: 16 }}
          />

          <Typography
            style={{
              color: "#8E8E93",
            }}
          >
            {item.date}
          </Typography>
        </View>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Image source={icons.withdraw} style={{ width: 24, height: 24 }} />
        <Typography style={{ fontWeight: 600 }}>R$ {item.amount}</Typography>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{ backgroundColor: "#FDFDFD", paddingHorizontal: 22, flex: 1 }}
    >
      <Navbar title={"Transactions"} />

      <ElipsesBackground />

      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Search Transaction"
              value={search}
              onChangeText={handleSearchChange}
            />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              gap: 4,
              borderWidth: 1,
              borderColor: "#E5E5EA",
              paddingHorizontal: 16,
              borderRadius: 15,
              height: 40,
            }}
            onPress={() => {
              router.push("/filter-bottom-sheet");
            }}
          >
            <Image source={icons.filter} style={{ width: 14, height: 14 }} />
            <Typography>Filter</Typography>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 5, flexDirection: "row" }}>
          <Badge
            label="All"
            isActive={true}
            onPress={() => handleActiveTransactionFilter(TransactionType.ALL)}
          />
          <Badge
            label="Deposit"
            isActive={false}
            onPress={() =>
              handleActiveTransactionFilter(TransactionType.DEPOSIT)
            }
          />
          <Badge
            label="Withdraw"
            isActive={false}
            onPress={() =>
              handleActiveTransactionFilter(TransactionType.WITHDRAW)
            }
          />
          <Badge
            label="Transfer"
            isActive={false}
            onPress={() =>
              handleActiveTransactionFilter(TransactionType.TRANSFER)
            }
          />
        </View>

        <FlatList
          data={transactions}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
