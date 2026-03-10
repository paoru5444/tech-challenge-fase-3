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
  control,
  errors,
  fields,
  handleInputChange,
  headerImage,
  disableFields,
  formData,
  pageTitle,
  openCategoryBottomSheet,
  openCalendarBottomSheet,
  isEditing,
}: TransactionFormProps) {
  const headerComponent = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
      }}
    >
      {/* <Image source={images.transfer} style={styles.headerImage} /> */}
      <Typography size={24} weight="800">
        {pageTitle}
      </Typography>
    </View>
  );

  const renderItem = ({ item }: { item: TransactionFormItem }) => {
    const selectedItem: string | CategoryType = formData[item.key];

    const value = item.key === "category" ? selectedItem.value : selectedItem;
    return (
      <Input
        control={control}
        label={item.label}
        value={value}
        onChangeText={(value: string) => handleInputChange(item.key, value)}
        placeholder={item.placeholder}
        editable={!disableFields}
        name={item.key}
        error={errors[item.key]}
      />
    );
  };

  const footerComponent = () => (
    <View style={{ gap: 16 }}>
      <Select
        label={"Data"}
        placeholder={"20/01/2026"}
        onPress={openCalendarBottomSheet}
        error={errors.date}
        name="date"
        control={control}
        disableFields={disableFields}
      />

      <Select
        label={"Categorias"}
        placeholder={"Lazer & Entretenimento"}
        onPress={openCategoryBottomSheet}
        error={errors.category?.key}
        name="category"
        control={control}
        disableFields={disableFields}
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
      ListHeaderComponentStyle={{ marginBottom: 16 }}
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
  },
  headerImage: {
    width: 40,
    height: 40,
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
