import { router } from "expo-router";
import { FORM_MODE, Transaction } from "./models";

const goToTransactionsForm = (item: Transaction) => {
  router.push({
    pathname: "/(app)/transaction-form",
    params: {
      ...item,
      categoryKey: item.category.key,
      categoryValue: item.category.value,
      mode: FORM_MODE.VIEW,
    },
  });
};

export const navigation = {
  goToTransactionsForm,
};
