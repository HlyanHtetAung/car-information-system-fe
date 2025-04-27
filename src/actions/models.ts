import { fetchWrapper } from "@/helper/fetchWrapper";

export const getAllModels = async () => {
  const response: any = await fetchWrapper.GET(true, "models");
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
