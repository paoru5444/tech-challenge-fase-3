import { formInSchema } from "@/src/schemas/transaction-form-schema";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import * as z from "zod";
import { FORM_TYPES } from "./constants";

export type TransactionFormLocalSearchParams = {
  actionLabel?: string;
  image?: string;
  navbarLabel?: string;
  type?: keyof typeof FORM_TYPES;
  id?: string;
  amount?: string;
  date?: string;
  description?: string;
  mode?: string;
  fileName?: string;
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
  key: "amount" | "description";
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
export type File = {
  __collector: any;
  blobId: string;
  name: string;
  offset: number;
  size: number;
  type: string;
};

export interface TransactionFormProps {
  localSearchParams?: TransactionFormLocalSearchParams;
  onCreate: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  formType: FormTypeProps;
  openCategoryBottomSheet: () => void;
  openCalendarBottomSheet: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  control: Control<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  handleGetFile: () => void;
  isSubmitting: boolean;
  pageTitle: string;
  file: File | null;
  isReadOnly: boolean;
  setValue: UseFormSetValue<FormDataProps>;
}

export type Transaction = {
  amount: string;
  category: CategoryType;
  date: string;
  description: string;
  id: string;
  type: TransactionType;
};

export type FormData = z.infer<typeof formInSchema>;

export type TransactionMode = "create" | "update" | "view";

export type TransactionFormScreenLocalSearchParams = {
  actionLabel?: string;
  image?: any;
  mode?: "create" | "update" | "view";
  navbarLabel?: string;
  type?: "deposit" | "withdraw" | "transfer";
  amount?: string;
  categoryKey?: string;
  categoryValue?: string;
  date?: string;
  description?: string;
  id?: string;
};

export interface onCreateTransaction {
  amount: string;
  category: { key: string; value: string };
  date: string;
  description: string;
}

export interface onUpdateTransaction {
  amount: string;
  category: { key: string; value: string };
  date: string;
  description: string;
}
