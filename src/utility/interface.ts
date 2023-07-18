import { BaseKey } from "@refinedev/core";

export interface IUser {
  id: String;
  email: String;
}

export interface IProject {
  title: String;
  start_date: string | number | Date | null;
  end_date: string | number | Date | null;
  destination: String;
  description: String;
  id: BaseKey | number | string | undefined;
  status: String;
  user_id: String;
}
export interface IItinerary {
  date: string | number | Date | null;
  title: string;
  location: string;
  type_of_activity: String;
  votes: string[];
  status: string;
  id: BaseKey | number | string | undefined;
}