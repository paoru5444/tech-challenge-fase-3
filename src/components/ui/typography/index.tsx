import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  weight?: FontWeightValues;
  color?: string;
  size?: number;
}

export type FontWeightValues =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export default function Typography({
  children,
  style,
  color,
  weight = "400",
  size = 14,
  ...rest
}: TypographyProps) {
  return (
    <Text
      style={[
        styles.text,
        style,
        { fontWeight: weight, fontSize: size, color: color },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 400,
    color: "#24252C",
    fontFamily: "Lexend Deca",
  },
});
