import { LIMIT } from "@/constants";
import { fetchWrapper } from "@/helper/fetchWrapper";

export const getAllBrands = async (page = 1) => {
  const response: any = await fetchWrapper.GET(true, `brands/all`);
  return response;
};

export const getAllBrandsByLimit = async (page = 1) => {
  const response: any = await fetchWrapper.GET(
    true,
    `brands?page=${page}&limit=${LIMIT}`
  );
  return response;
};

export const updateBrand = async (id: number, payload: any) => {
  const response: any = await fetchWrapper.PATCH(true, `brands/${id}`, payload);
  return response;
};

export const createBrand = async (payload: any) => {
  const response: any = await fetchWrapper.POST(true, `brands`, payload);
  return response;
};
