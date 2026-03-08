import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Typography from "../typography";

interface InputProps extends TextInputProps {
  label?: string;
}

export default function Input({
  children,
  style,
  value,
  label,
  placeholder,
  onChangeText,
  autoCapitalize,
  secureTextEntry,
  ...rest
}: InputProps) {
  return (
    <View style={{ gap: 4 }}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
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
