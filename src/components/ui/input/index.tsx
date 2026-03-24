import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Typography from "../typography";

interface InputProps extends TextInputProps {
  label?: string;
  control?: Control<any>;
  error?: {
    message?: string;
  } | null;
  name?: string;
  disablePaddingVertical?: boolean;
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
  control,
  error,
  name = "",
  disablePaddingVertical,
  ...rest
}: InputProps) {
  return (
    <View
      style={{
        gap: 6,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: disablePaddingVertical ? 0 : 16,
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 32,
      }}
    >
      {label && (
        <Typography style={styles.label} size={12}>
          {label}
        </Typography>
      )}

      {control ? (
        <Controller
          control={control}
          name={name}
          defaultValue={""}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              style={[styles.input, { backgroundColor: "#fff" }]}
              {...rest}
            />
          )}
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          style={[styles.input, { backgroundColor: "#fff" }]}
          {...rest}
        />
      )}

      {error && <Typography color={"red"}>* {error?.message}</Typography>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {},
  label: {
    fontSize: 9,
    fontWeight: 600,
  },
});
