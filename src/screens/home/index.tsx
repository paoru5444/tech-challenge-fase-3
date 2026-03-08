import inter from "@/assets/fonts/inter/Inter-VariableFont_opsz,wght.ttf";
import Deposit from "@/assets/icons/deposit.png";
import Badge from "@/src/components/ui/bedge";
import Typography from "@/src/components/ui/typography";
import { icons } from "@/src/constants/icons";
import useTransactions from "@/src/hooks/useTransactions";
import { goTo } from "@/src/utils/functions";
import { useFont } from "@shopify/react-native-skia";
import { router } from "expo-router";
import React, { useEffect, useMemo } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useDerivedValue } from "react-native-reanimated";
import { useChartPressState } from "victory-native";
import Navbar from "../../components/shared/navbar";
import { FORM_TYPES } from "../transactions/constants";
import { FORM_MODE } from "../transactions/models";

// Gráfico exibindo o total em dinheiro de transaçãoes para cada tipo mensalmente
// O mês atual é iniciado como default
// Eu preciso listar os meses para troca
// Buscar transações
// Calcular o total de ocorrências do tipo selecionado no mês
// Index do mês para cada month e o total acumulado

// const data = Array.from({ length: 6 }, (_, index) => ({
//   // Starting at 1 for January
//   month: index + 1,
//   // Randomizing the listen count between 100 and 50
//   listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
// }));

export default function Home() {
  const { transactions, getTransactions } = useTransactions();

  useEffect(() => {
    getTransactions();
  }, []);

  const data = useMemo(() => {
    const months = Array.from(
      new Set(
        transactions.map((transaction) => {
          return transaction.date.split("-")[1];
        }),
      ),
    );

    const item = months.map((month) => {
      const count = transactions.reduce((acc, item) => {
        const itemMonth = item.date.split("-")[1];
        const itemAmount = parseFloat(item.amount);
        if (itemMonth === month) {
          return acc + itemAmount;
        }

        return acc;
      }, 0);

      console.log("month:", month);

      return {
        label: parseInt(month),
        value: count,
        // topLabelComponent: () => <Text>{count}</Text>,
      };
    });

    return item;
  }, [transactions]);

  const font = useFont(inter, 16);

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { listenCount: 0 },
  });

  console.log("state: ", state);

  const selectedIndex = useDerivedValue(() =>
    isActive ? Math.round(state.x.value.value) : -1,
  );

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        minHeight: 66,
        paddingHorizontal: 16,
        borderRadius: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image source={Deposit} style={{ width: 34, height: 34 }} />

        <View>
          <Typography style={{ fontWeight: 600 }}>
            {item.description.substr(0, 15)}...
          </Typography>
          <Typography>{item.date}</Typography>
        </View>
      </View>

      <View>
        <Typography style={{ textAlign: "right" }}>R${item.amount}</Typography>
        <Typography style={{ textAlign: "right" }}>
          {item.category.value}
        </Typography>
      </View>
    </View>
  );

  const handleGoTo = (type: keyof typeof FORM_TYPES) => {
    router.push({
      pathname: "/transactions/form",
      params: { ...FORM_TYPES[type], mode: FORM_MODE.CREATE },
    });
  };

  console.log("data ", data);

  const derivedTotal = transactions.reduce((acc, item) => {
    return acc + parseFloat(item.amount);
  }, 0);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ gap: 32 }}
    >
      <Navbar />

      <View style={{ paddingHorizontal: 22, gap: 32 }}>
        <View style={{ alignItems: "center", gap: 2 }}>
          <Typography weight="600" color="#AEAEB2">
            Saldo Total
          </Typography>
          <Typography weight="600" size={40}>
            R${derivedTotal}
          </Typography>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => handleGoTo("deposit")}
            style={{
              width: 90,
              height: 90,
              backgroundColor: "#fff",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.depositOutline}
              style={{ width: 24, height: 24 }}
            />
            <Typography>Entradas</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleGoTo("withdraw")}
            style={{
              width: 90,
              height: 90,
              backgroundColor: "#fff",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.withdrawOutline}
              style={{ width: 24, height: 24 }}
            />
            <Typography>Saídas</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleGoTo("transfer")}
            style={{
              width: 90,
              height: 90,
              backgroundColor: "#fff",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.transferOutline}
              style={{ width: 24, height: 24 }}
            />
            <Typography>Trocas</Typography>
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%", gap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography weight="600">Analises</Typography>

            <Image
              source={icons.chevronRight}
              style={{ width: 6, height: 12 }}
            />
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Badge label="Categoria" icon={icons.chevronDown} />
              <Badge label="Mês" />
            </View>

            <BarChart
              data={data}
              frontColor={"#EDF0F7"}
              barBorderRadius={10}
              yAxisThickness={0}
              xAxisThickness={0}
              yAxisLabelWidth={0}
              yAxisExtraHeight={0}
              leftShiftForTooltip={0}
              isAnimated
              hideAxesAndRules
              renderTooltip={(item) => <Text>R${item.value}</Text>}
              focusBarOnPress
              focusedBarConfig={{ color: "#FFE1E1" }}
              barWidth={35}
              autoCenterTooltip
              disableScroll
              maxValue={Math.max(...data.map((item) => item.value)) * 1.3}
              adjustToWidth
            />
          </View>
        </View>

        <View style={{ width: "100%", height: 200, gap: 16 }}>
          <TouchableOpacity
            onPress={() => goTo("transactions/list")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography weight="600">Transações</Typography>

            <Image
              source={icons.chevronRight}
              style={{ width: 6, height: 12 }}
            />
          </TouchableOpacity>

          <FlatList
            data={transactions}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 16 }}
          />

          {/* <TouchableOpacity onPress={() => auth.logout()}>
            <Text>Logout</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
}
