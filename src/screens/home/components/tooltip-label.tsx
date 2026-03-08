import { RoundedRect, Text } from "@shopify/react-native-skia";
import React from "react";

export default function TooltipLabel({ x, y, value, font }) {
  const label = `$${value.toLocaleString()}`;
  const padding = 12;
  const boxWidth = 120;
  const boxHeight = 40;

  return (
    <>
      <RoundedRect
        x={x - boxWidth / 2}
        y={y - boxHeight - 12}
        width={boxWidth}
        height={boxHeight}
        r={8}
        color="white"
      />

      <Text
        x={x - boxWidth / 2 + padding}
        y={y - boxHeight / 2 - 4}
        text={label}
        color={"#1e3d6b"}
        font={font}
      />
    </>
  );
}
