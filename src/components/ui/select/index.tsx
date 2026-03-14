import { icons } from "@/src/constants/icons";
import React from "react";
import { Controller } from "react-hook-form";
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Typography from "../typography";

interface SelectProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function Select({
  style,
  value,
  label,
  placeholder,
  onPress,
  error,
  control,
  name,
  disableFields,
  ...rest
}: SelectProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
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
      disabled={disableFields}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 6 }}>
          {label && (
            <Typography style={styles.label} size={12}>
              {label}
            </Typography>
          )}

          <Controller
            control={control}
            name={name}
            defaultValue={""}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value?.value ?? value}
                placeholder={placeholder}
                editable={false}
                style={[styles.input, { backgroundColor: "#fff" }]}
                {...rest}
              />
            )}
          />
        </View>
        <Image source={icons.chevronDown} style={{ width: 16, height: 16 }} />
      </View>

      {error && <Typography color={"red"}>* {error?.message ?? ""}</Typography>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {},
  label: {
    fontWeight: 600,
  },
});
