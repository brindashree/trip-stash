import dayjs from "dayjs";
import { PROJECT_STATUS } from "./constants";
import { IItinerary } from "./interface";

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

function formatDateWithoutTime(dateStr: string): string {
  return dateStr.split("T")[0];
}

export const groupByDate = (arr: IItinerary[]): IItinerary[][] => {
  const groupedByDate: { [date: string]: IItinerary[] } = {};

  arr.forEach((obj: IItinerary) => {
    const date = formatDateWithoutTime(obj.date);
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(obj);
  });

  return Object.values(groupedByDate);
};
