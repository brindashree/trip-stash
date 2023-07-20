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

export const getActivityColor = (activity: string): string => {
  const colors: Record<string, string> = {
    TRANSPORT: "blackAlpha",
    STAY: "gray",
    FLIGHT: "red",
    ADVENTURE: "orange",
    WELLNESS: "yellow",
    "SCENIC DRIVE": "green",
    "HISTORICAL SITE": "teal",
    SIGHTSEEING: "blue",
    TREKKING: "cyan",
    DINING: "purple",
    SHOPPING: "pink",
    NIGHTLIFE: "linkedin",
    BEACH: "facebook",
    ASTRONOMY: "messenger",
    CASINO: "whatsapp",
    MUSEUM: "twitter",
    SAFARI: "telegram",
    "THEME PARK": "blackAlpha",
    CONCERT: "gray",
    SCUBA: "red",
    SPORTS: "orange",
    BOATING: "yellow",
    "RELIGIOUS SITE": "green",
    "WINE TASTING": "teal",
    "LOCAL MARKET": "blue",
  };

  return colors[activity.toUpperCase()] || "gray";
}

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
