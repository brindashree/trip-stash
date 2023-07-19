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


export const groupByDate = (itinerariesData: IItinerary[] | undefined): IItinerary[][] => {
  if (!itinerariesData) return [];
  const groupedData: { [date: string]: IItinerary[] } = {};
  itinerariesData.forEach((itinerary: IItinerary) => {
    const { date } = itinerary;
    const modifiedDate = dayjs(date).format('DD-MM-YYYY')
    if (groupedData[modifiedDate]) {
      groupedData[modifiedDate].push(itinerary);
    } else {
      groupedData[modifiedDate] = [itinerary];
    }
  });
  const result: IItinerary[][] = Object.values(groupedData);

  return result;
}
