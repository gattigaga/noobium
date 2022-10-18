import { useQuery } from "@tanstack/react-query";

import axios from "../../helpers/axios";

type Response = {
  email: string;
  name: string;
  picture: string;
};

const action = async (): Promise<Response> => {
  const token = localStorage.getItem("access_token");

  const res = await axios.get("/me/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

const useUserQuery = () => {
  return useQuery(["user"], action);
};

export default useUserQuery;
