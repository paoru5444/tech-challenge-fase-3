import Badge from "@/src/components/ui/bedge";
import { icons } from "@/src/constants/icons";
import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { barChartTypes } from "../../transactions/constants";
import { TransactionType } from "../../transactions/models";

export interface AnalyticsProps {
  chartData: any[];
  openTypesBottomSheet: () => void;
  selectedType: TransactionType;
}

export type TooltipProps = {
  value: number;
};

export default function Analytics({
  chartData,
  openTypesBottomSheet,
  selectedType,
}: AnalyticsProps) {
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
          justifyContent: "flex-end",
        }}
      >
        <Badge
          label={`Tipo: ${barChartTypes[selectedType]}`}
          labelSize={12}
          icon={icons.chevronDown}
          onPress={openTypesBottomSheet}
        />
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
        hideAxesAndRules
        renderTooltip={(item: TooltipProps) => <Text>R${item.value}</Text>}
        focusBarOnPress
        focusedBarConfig={{ color: "#FFE1E1" }}
        barWidth={40}
        autoCenterTooltip
        disableScroll
        maxValue={Math.max(...chartData.map((item) => item.value)) * 1.3}
        adjustToWidth
        key={selectedType}
        minHeight={5}
      />
    </View>
  );
}
