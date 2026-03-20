import React from "react";

import ElipsesBackground from "@/src/components/shared/elipses-background";
import LoadingScreen from "@/src/components/shared/loading-screen";
import Navbar from "@/src/components/shared/navbar";
import Badge from "@/src/components/ui/bedge";
import Input from "@/src/components/ui/input";
import Spacer from "@/src/components/ui/spacer";
import Typography from "@/src/components/ui/typography";
import { icons } from "@/src/constants/icons";
import { dateFormatter } from "@/src/utils/functions";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyTransactions from "../../home/components/empty-transactions";
import { barChartTypes } from "../constants";
import { Transaction, TransactionsListProps, TransactionType } from "../models";
import { utils } from "../utils";
import { images } from "@/src/constants";

export default function TransactionsList({
  search,
  handleSearchChange,
  transactions,
  handleActiveTransactionFilter,
  onPressTransaction,
  type,
  onRefresh,
  refreshing,
  onEndReached,
  loading,
}: TransactionsListProps) {
  const renderItem = ({ item }: { item: Transaction }) => {
    const typeIcon = utils.pickTransactionTypeIcon(item?.type);

    return (
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
          <Typography size={12} style={{ color: "#8E8E93" }}>
            {item.category?.value}
          </Typography>
          <Typography style={{ fontWeight: 600 }}>
            {item.description}
          </Typography>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Image
              source={icons.calendarCache}
              style={{ width: 16, height: 16 }}
            />

            <Typography size={12} color="#8E8E93">
              {dateFormatter(item.date)}
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
          <Image source={typeIcon} style={{ width: 24, height: 24 }} />
          <Typography style={{ fontWeight: 600 }}>R$ {item.amount}</Typography>
        </View>
      </TouchableOpacity>
    );
  };

  const listFooterComponent = () => <ActivityIndicator />;

  const listItemSeparator = () => <View style={{ height: 16 }} />;

  if (loading && !transactions?.length) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ backgroundColor: "#FDFDFD", paddingHorizontal: 22 }}>
      <ElipsesBackground />

      <Navbar showHeader={false} />

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
          {Object.values(TransactionType).map((transactionType) => (
            <Badge
              label={barChartTypes[transactionType]}
              isActive={type === transactionType}
              onPress={() => handleActiveTransactionFilter(transactionType)}
              key={transactionType}
            />
          ))}
        </View>
      </View>

      <View style={{ height: 16 }} />

      <FlatList
        data={transactions}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 200, paddingTop: 16 }}
        ItemSeparatorComponent={listItemSeparator}
        keyExtractor={(item) => item?.id}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loading ? listFooterComponent : null}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={() => {
          const hasSearch = search.length > 0;
          const title =
            hasSearch
              ? "Transação não encontrada"
              : "Ainda não registrou uma transação?";
          const description =
            hasSearch
              ? "Tente novamente com outro nome"
              : `Sem problemas, cadastre uma nova transação para serem listadas aqui,
          com a possibilidade de filtros e gestão de gastos`;
          const image = hasSearch ? images.error404 : images.officeEmployeeWorkingOvernight

          return <EmptyTransactions title={title} description={description} image={image} />;
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
            colors={["#6366f1"]}
          />
        }
      />

      <Spacer size={100} />
    </View>
  );
}
