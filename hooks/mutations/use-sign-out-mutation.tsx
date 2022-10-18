import { useMutation } from "@tanstack/react-query";

import axios from "../../helpers/axios";

type Response = any

const action = async (): Promise<Response> => {
  const token = localStorage.getItem("access_token");

  const res = await axios.post("/sign-out", undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

const useSignOutMutation = () => {
  return useMutation(action);
};

export default useSignOutMutation;
