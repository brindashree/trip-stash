import { supabaseClient } from "../utility/supabaseClient";

export const createStory = async () => {
  try {
    const { data: insertedData, error } = await supabaseClient
      .from("story")
      .insert([{ title: "FirstStory", user_id: 1, destinations: [1, 2] }])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return insertedData;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};