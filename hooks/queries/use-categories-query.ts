import { useQuery } from "@tanstack/react-query";

import axios from "../../helpers/axios";

type Response = {
  id: number;
  name: string;
  slug: string;
}[];

const action = async (): Promise<Response> => {
  const res = await axios.get("/categories");

  return res.data.data;
};

const useCategoriesQuery = () => {
  return useQuery(["categories"], action);
};

export default useCategoriesQuery;
