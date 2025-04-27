import { LIMIT } from "@/constants";
import { fetchWrapper } from "@/helper/fetchWrapper";

// export const getAllCars = async () => {
//   const response: any = await fetchWrapper.GET(true, "cars/all");
//   return response;
// };

export const getAllCarsByLimit = async (page = 1, search = "") => {
  const response: any = await fetchWrapper.GET(
    true,
    `cars?page=${page}&limit=${LIMIT}&search=${search}`
  );
  return response;
};

export const getModelsAndBrandsCount = async () => {
  const response: any = await fetchWrapper.GET(
    true,
    "cars/check-brands-models"
  );
  return response;
};

export const createNewCar = async (payload: any) => {
  const response: any = await fetchWrapper.POST(true, "cars", payload);
  return response;
};

export const updateCar = async (id: number, payload: any) => {
  const response: any = await fetchWrapper.PATCH(true, `cars/${id}`, payload);
  return response;
};

export const deleteCar = async (id: number) => {
  const response: any = await fetchWrapper.DELETE(true, `cars/${id}`);
  return response;
};
