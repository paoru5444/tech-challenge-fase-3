import Badge from "@/src/components/ui/bedge";
import { icons } from "@/src/constants/icons";
import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface AnalyticsProps {
  chartData: any[];
  currentMonth: number;
}

export default function Analytics({ chartData, currentMonth }: AnalyticsProps) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 32,
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
        data={chartData}
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
        maxValue={Math.max(...chartData.map((item) => item.value)) * 1.3}
        adjustToWidth
        initialSelectedIndex={2}
      />
    </View>
  );
}
