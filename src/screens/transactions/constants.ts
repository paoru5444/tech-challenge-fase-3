import { images } from "@/src/constants";

export const INPUT_FIELDS = [
  {
    key: "amount",
    label: "Valor",
    placeholder: "$200,00",
  },
  {
    key: "description",
    label: "Descrição",
    placeholder: "Phone billpayment",
  },
];

export const FORM_INITIAL_VALUES = {
  amount: "",
  description: "",
  date: "",
  category: "",
};

export const FORM_TYPES = {
  deposit: {
    image: images.deposit,
    navbarLabel: "Deposit",
    actionLabel: "Create Deposit",
    type: "deposit",
  },
  transfer: {
    image: images.transfer,
    navbarLabel: "Transfer",
    actionLabel: "Create Transfer",
    type: "transfer",
  },
  withdraw: {
    image: images.withdraw,
    navbarLabel: "Withdraw",
    actionLabel: "Create Withdraw",
    type: "withdraw",
  },
};

export const monthNamesInPortuguese = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
