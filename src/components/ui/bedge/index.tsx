import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Typography from "../typography";

interface BadgeProps extends TouchableOpacityProps {
  isActive: boolean;
  label: string;
  icon: any;
}

export default function Badge({ isActive, label, icon, ...rest }: BadgeProps) {
  const selectedStyle = isActive ? styles.active : styles.inative;
  const selectedLabelStyle = isActive
    ? styles.labelActive
    : styles.labelInative;

  return (
    <TouchableOpacity style={[styles.base, selectedStyle]} {...rest}>
      <Typography style={selectedLabelStyle}>{label}</Typography>

      {icon && <Image source={icon} style={{ width: 11, height: 11 }} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 15,
    height: 32,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  active: {
    backgroundColor: "#F478B8",
  },
  inative: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#fff",
  },
  labelActive: {
    fontWeight: 700,
    color: "#fff",
  },
  labelInative: {
    fontWeight: 500,
  },
});
