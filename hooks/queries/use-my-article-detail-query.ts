import { useQuery } from "@tanstack/react-query";

import axios from "../../helpers/axios";

type Payload = string;

type Response = {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  slug: string;
  content_preview: string;
  content: string;
  featured_image: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    picture: string;
  };
};

const action = async (payload: Payload): Promise<Response> => {
  const token = localStorage.getItem("access_token");

  const res = await axios.get(`/me/articles/${payload}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

const useMyArticleDetailQuery = (payload: Payload) => {
  return useQuery(["my-articles", payload], () => action(payload));
};

export default useMyArticleDetailQuery;
