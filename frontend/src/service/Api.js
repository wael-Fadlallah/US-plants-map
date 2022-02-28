import axios from "axios";

export const getPlants = async (number = 100) => {
  const response = await axios.get(
    `https://backend-dot-us-plants-342415.el.r.appspot.com/top/${number}`
  );
  if (response.status == 200) return response.data;
  else return false;
};

export const getStates = async () => {
  const response = await axios.get(
    `https://backend-dot-us-plants-342415.el.r.appspot.com/states`
  );
  if (response.status == 200) return response.data;
  else return false;
};
