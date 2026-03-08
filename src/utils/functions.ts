import { Href, router } from "expo-router";

export const goTo = (href: Href | string, params: any) => {
  router.push({ pathname: href, params });
};
