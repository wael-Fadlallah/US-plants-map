import axios from "axios";

export const getPlants = async (number = 100) => {
  const response = await axios.get(`http://localhost:3000/top/${number}`);
  if (response.status == 200) return response.data;
  else return false;
};

export const getStates = async () => {
  const response = await axios.get(`http://localhost:3000/states`);
  if (response.status == 200) return response.data;
  else return false;
};
