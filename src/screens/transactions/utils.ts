import { icons } from "@/src/constants/icons";
import { TransactionType } from "./models";

const pickTransactionTypeIcon = (type: TransactionType) => {
  if (type === TransactionType.DEPOSIT) {
    return icons.deposit;
  } else if (type === TransactionType.WITHDRAW) {
    return icons.withdraw;
  }

  return icons.transfer;
};

export const utils = {
  pickTransactionTypeIcon,
};
