import { images } from "@/src/constants";

export const INPUT_FIELDS = [
  {
    key: "amount",
    label: "Valor",
    placeholder: "R$100,00",
  },
  {
    key: "description",
    label: "Descrição",
    placeholder: "Sua descrição aqui",
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
    navbarLabel: "Entrada 🤑",
    actionLabel: "Create Deposit",
    type: "deposit",
  },
  transfer: {
    image: images.transfer,
    navbarLabel: "Transferência 🤝",
    actionLabel: "Create Transfer",
    type: "transfer",
  },
  withdraw: {
    image: images.withdraw,
    navbarLabel: "Saída 💸",
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

export const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const barChartTypes = {
  all: "Todos",
  deposit: "Entradas",
  withdraw: "Saídas",
  transfer: "Transferências",
};

export const TRANSACTIONS_PER_PAGE = 6;
