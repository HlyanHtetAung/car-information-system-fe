import axios from "axios";

export const fetchWrapper = {
  POST: post,
  PATCH: patch,
  DELETE: del,
  GET: get,
};

let config = {
  "Content-Type": "application/json",
};

async function get(isPublic: boolean, subUrl: string, body: any = null) {
  const url = process.env.NEXT_PUBLIC_API_URL + subUrl;
  if (!isPublic) {
    // handle unpublic logic here
  }
  const response = await axios.get(url, body);
  return response;
}

async function post(isPublic: boolean, subUrl: string, body: any = null) {
  const url = process.env.NEXT_PUBLIC_API_URL + subUrl;

  if (!isPublic) {
    // handle unpublic logic here
  }

  const response = await axios.post(url, body, {
    headers: config,
  });

  return response;
}

async function patch(isPublic: boolean, subUrl: string, body: any = null) {
  const url = process.env.NEXT_PUBLIC_API_URL + subUrl;

  if (!isPublic) {
    // handle unpublic logic here
  }

  const response = await axios.patch(url, body, {
    headers: config,
  });

  return response;
}

async function del(isPublic: boolean, subUrl: string) {
  const url = process.env.NEXT_PUBLIC_API_URL + subUrl;

  if (!isPublic) {
    // handle unpublic logic here
  }

  const response = await axios.delete(url, {
    headers: config,
  });

  return response;
}
