import { useMutation } from "@tanstack/react-query";

import axios from "../../helpers/axios";

type Payload = {
  id: number;
  title: string;
  content: string;
  category_id: number;
  featured_image?: File | null;
};

type Response = any;

const action = async (payload: Payload): Promise<Response> => {
  const token = localStorage.getItem("access_token");

  const form = new FormData();
  form.append("_method", "PUT");
  form.append("title", payload.title);
  form.append("content", payload.content);
  form.append("category_id", payload.category_id);

  if (payload.featured_image) {
    form.append("featured_image", payload.featured_image);
  }

  const res = await axios.post(`/me/articles/${payload.id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};

const useEditArticleMutation = () => {
  return useMutation(action);
};

export default useEditArticleMutation;
