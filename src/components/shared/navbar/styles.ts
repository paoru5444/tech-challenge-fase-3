import { colors } from "@/src/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    height: 70,
  },
  navbar__image: {
    width: 46,
    height: 46,
  },
  navbar_greetings: {
    color: colors.light_gray,
    fontSize: 14,
  },
  navbar_username: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.black,
  },
});
