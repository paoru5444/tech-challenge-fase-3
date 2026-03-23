import { Href, router } from "expo-router";

export const goTo = (href: Href | string, params: any) => {
  router.push({ pathname: href, params });
};

// 15 June, 2024

const months = [
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
export const dateFormatter = (date: string) => {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = parsedDate.getMonth();
  const year = parsedDate.getFullYear();

  return `${day} de ${months[month]}, ${year}`;
};
