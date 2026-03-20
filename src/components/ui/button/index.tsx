import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
}

export default function Button({
  onPress,
  label,
  isLoading,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.button_label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7B61E8",
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button_label: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
  },
});
