import { FORM_TYPES } from "./constants";

export type CurrentForm = {
  actionLabel: string;
  image: string;
  navbarLabel: string;
  type: keyof typeof FORM_TYPES;
  id: string;
  amount?: string;
  category?: CategoryType;
  date?: string;
  description?: string;
  mode?: string;
};

export enum TransactionType {
  "ALL" = "all",
  "DEPOSIT" = "deposit",
  "WITHDRAW" = "withdraw",
  "TRANSFER" = "transfer",
}

export type CategoryType = { key: string; value: string };

export interface TransactionsListProps {
  search: string;
  handleSearchChange: (value: string) => void;
  transactions: Transaction[];
  handleActiveTransactionFilter: (value: TransactionType) => void;
  onPressTransaction: (item: Transaction) => void;
  onEndReached: () => void;
  type: TransactionType;
  onRefresh: () => void;
  refreshing: boolean;
  loading: boolean;
}

export enum FORM_MODE {
  "CREATE" = "create",
  "VIEW" = "view",
  "UPDATE" = "update",
}

export type TransactionFormItem = {
  label: string;
  placeholder: string;
  // key: string;
  key: "amount" | "description" | "date" | "category";
};

export type FormDataProps = {
  amount: string;
  description: string;
  date: string;
  category: CategoryType;
};

export type FormTypeProps = {
  image: any;
  navbarLabel: string;
  actionLabel: string;
  type: string;
};

export interface TransactionFormProps {
  handleInputChange: (key: string, value: string) => void;
  currentForm: CurrentForm;
  formData: FormDataProps;
  onCreate: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  formType: FormTypeProps;
  openCategoryBottomSheet: () => void;
  openCalendarBottomSheet: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export type Transaction = {
  amount: string;
  category: CategoryType;
  date: string;
  description: string;
  id: string;
  type: TransactionType;
};
