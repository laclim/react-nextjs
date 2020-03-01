import axios from "axios";
import { AuthToken } from "../utility/cookies";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/login", {
      email,
      password
    });
    if (response.status == 200) {
      console.log(response.data);
      await AuthToken.storeToken(response.data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;

      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};
