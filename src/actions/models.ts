import { LIMIT } from "@/constants";
import { fetchWrapper } from "@/helper/fetchWrapper";

export const getAllModels = async () => {
  const response: any = await fetchWrapper.GET(true, "models/all");
  return response;
};

export const getModelsByBrand = async (brandId: number) => {
  const response: any = await fetchWrapper.GET(
    true,
    `models/by-brand/${brandId}`
  );
  return response;
};

export const getAllModelsByLimit = async (page = 1) => {
  const response: any = await fetchWrapper.GET(
    true,
    `models?page=${page}&limit=${LIMIT}`
  );
  return response;
};

export const createNewModel = async (payload: any) => {
  const response: any = await fetchWrapper.POST(true, "models", payload);
  return response;
};

export const updateModel = async (id: number, payload: any) => {
  const response: any = await fetchWrapper.PATCH(true, `models/${id}`, payload);
  return response;
};
