import axios from "axios";

export const getRegistratedPlayers = async () => {
  try {
    const players = await axios.get("http://localhost:5000/registrations");
    return players.data;
  } catch (error) {
    console.log("Error retrieving players from the backend : ", error);
  }
};