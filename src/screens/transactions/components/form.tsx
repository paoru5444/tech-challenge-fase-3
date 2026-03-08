import Input from "@/src/components/ui/input";
import Select from "@/src/components/ui/select";
import Typography from "@/src/components/ui/typography";
import { icons } from "@/src/constants/icons";
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { CategoryType, FormDataProps, TransactionFormItem } from "../models";

interface TransactionFormProps {
  fields: TransactionFormItem[];
  handleInputChange: (key: string, value: string) => void;
  headerImage: any;
  disableFields?: boolean;
  formData: FormDataProps;
  openCategoryBottomSheet: () => void;
  openCalendarBottomSheet: () => void;
}

export default function Filter({
  fields,
  handleInputChange,
  headerImage,
  disableFields,
  formData,
  openCategoryBottomSheet,
  openCalendarBottomSheet,
}: TransactionFormProps) {
  const headerComponent = () => (
    <Image source={headerImage} style={styles.headerImage} />
  );

  const renderItem = ({ item }: { item: TransactionFormItem }) => {
    const selectedItem: string | CategoryType = formData[item.key];

    const value = item.key === "category" ? selectedItem.value : selectedItem;
    return (
      <Input
        label={item.label}
        value={value}
        onChangeText={(value: string) => handleInputChange(item.key, value)}
        placeholder={item.placeholder}
        editable={!disableFields}
      />
    );
  };

  const footerComponent = () => (
    <View style={{ gap: 16 }}>
      <Select
        label={"Data"}
        value={formData["date"]}
        placeholder={"20/01/2026"}
        onPress={openCalendarBottomSheet}
      />

      <Select
        label={"Categorias"}
        value={formData["category"].value}
        placeholder={"Lazer & Entretenimento"}
        onPress={openCategoryBottomSheet}
      />

      <View style={styles.footerUploadCard}>
        <Image source={icons.upload} style={styles.footerIcon} />
        <Typography weight="500" size={12}>
          Enviar arquivo
        </Typography>
        <Typography weight="500" size={12} color="#E5E5EA">
          Imagens, PDF ou documentos
        </Typography>
      </View>
    </View>
  );

  const keyExtractor = (item: TransactionFormItem) =>
    `${item.key}-${item.label}`;

  return (
    <FlatList
      data={fields}
      ListHeaderComponent={headerComponent}
      renderItem={renderItem}
      ListFooterComponent={footerComponent}
      contentContainerStyle={styles.listContainer}
      keyExtractor={keyExtractor}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 16,
    paddingHorizontal: 24,
  },
  headerImage: {
    width: 115,
    height: 115,
    alignSelf: "center",
    resizeMode: "contain",
  },
  footerUploadCard: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#E5E5EA",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
});
