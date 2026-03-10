import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Typography from "../typography";

interface InputProps extends TextInputProps {
  label?: string;
  control: Control<any>;
  error?: { message?: string };
  name: string;
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
  ...rest
}: InputProps) {
  return (
    <View
      style={{
        gap: 6,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 16,
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

      {error && (
        <Typography color={"red"}>
          * {error?.message || error?.message?.category?.key?.message || ""}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // borderWidth: 1,
    // borderColor: "#E5E5EA",
    // paddingHorizontal: 16,
    // borderRadius: 15,
    // height: 40,
  },
  label: {
    fontSize: 9,
    fontWeight: 600,
  },
});
