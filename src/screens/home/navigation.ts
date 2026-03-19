import { router } from "expo-router";
import { FORM_TYPES } from "../transactions/constants";
import { FORM_MODE } from "../transactions/models";

const openTypesBottomSheet = () => {
  router.push("/types-bottom-sheet");
};

const goToTransactionsForm = (type: keyof typeof FORM_TYPES) => {
  router.push({
    pathname: "/(app)/transaction-form",
    params: { ...FORM_TYPES[type], mode: FORM_MODE.CREATE },
  });
};

export { goToTransactionsForm, openTypesBottomSheet };
