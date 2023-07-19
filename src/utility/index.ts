import { PROJECT_STATUS } from "./constants";

export * from "./supabaseClient";

export const getProjectStatusColor = (status: any) => {
  switch (status) {
    case PROJECT_STATUS.PLANNING:
      return "yellow";
    case PROJECT_STATUS.COMPLETED:
      return "green";
  }
};
const colorsArray = [
  "blackAlpha",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "linkedin",
  "facebook",
  "messenger",
  "whatsapp",
  "twitter",
  "telegram",
];
export const getRandomTagColor = () => {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
};
