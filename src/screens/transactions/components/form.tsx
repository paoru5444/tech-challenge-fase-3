import Input from "@/src/components/ui/input";
import Select from "@/src/components/ui/select";
import Typography from "@/src/components/ui/typography";
import { icons } from "@/src/constants/icons";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  File,
  FormDataProps,
  TransactionFormItem,
  TransactionFormLocalSearchParams,
} from "../models";

interface FormProps {
  fields: TransactionFormItem[];
  headerImage: any;
  disableFields?: boolean;
  openCategoryBottomSheet: () => void;
  openCalendarBottomSheet: () => void;
  control: Control<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  pageTitle: string;
  handleGetFile: () => void;
  file: File | null;
  isReadOnly: boolean;
  localSearchParams?: TransactionFormLocalSearchParams;
}

export default function Form({
  control,
  errors,
  fields,
  disableFields,
  pageTitle,
  openCategoryBottomSheet,
  openCalendarBottomSheet,
  handleGetFile,
  file,
  isReadOnly,
  localSearchParams,
}: FormProps) {
  const headerComponent = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography size={24} weight="600">
        {pageTitle}
      </Typography>
    </View>
  );

  const renderItem = ({ item }: { item: TransactionFormItem }) => (
    <Input
      control={control}
      label={item.label}
      placeholder={item.placeholder}
      editable={!disableFields}
      name={item.key}
      error={errors[item?.key]}
      keyboardType={item?.key === "amount" ? "numeric" : "default"}
    />
  );

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

      <TouchableOpacity
        onPress={handleGetFile}
        style={[
          styles.footerUploadCard,
          {
            borderColor: file?.name ? "#09CF35" : "#E5E5EA",
            backgroundColor: file?.name ? "#E5FAEA" : "#fff",
          },
        ]}
      >
        {isReadOnly ? (
          <>
            <Image source={icons.fileDownload} style={styles.footerIcon} />

            <View>
              <Typography weight="500" size={12}>
                {"Fazer download arquivo"}
              </Typography>

              <Typography weight="500" size={12}>
                {localSearchParams?.fileName}
              </Typography>
            </View>
          </>
        ) : (
          <>
            <Image source={icons.fileUpload} style={styles.footerIcon} />

            <View>
              <Typography weight="500" size={12}>
                {file?.name ?? "Enviar arquivo"}
              </Typography>

              {!file?.name && (
                <Typography weight="500" size={12} color="#E5E5EA">
                  Imagens, PDF ou documentos
                </Typography>
              )}
            </View>
          </>
        )}
      </TouchableOpacity>
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
    height: 70,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    flexDirection: "row",
    padding: 16,
    gap: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});
