import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Typography from "../typography";

interface SelectProps extends TextInputProps {
  label?: string;
}

export default function Select({
  style,
  value,
  label,
  placeholder,
  onPress,
  ...rest
}: SelectProps) {
  return (
    <View style={{ gap: 4 }}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      <TextInput
        value={value}
        onPress={onPress}
        placeholder={placeholder}
        editable={false}
        style={[styles.input, { backgroundColor: "#fff" }]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    paddingHorizontal: 16,
    borderRadius: 15,
    height: 40,
  },
  label: {
    fontWeight: 600,
  },
});
