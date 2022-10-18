import { useMutation } from "@tanstack/react-query";

import axios from "../../helpers/axios";

type Payload = {
  email: string;
  password: string;
};

type Response = {
  user: {
    name: string;
    email: string;
    picture: string;
  };
  access_token: {
    token: string;
    type: string;
    expires_in: number;
  };
};

const action = async (payload: Payload): Promise<Response> => {
  const res = await axios.post("/sign-in", payload);

  return res.data.data;
};

const useSignInMutation = () => {
  return useMutation(action);
};

export default useSignInMutation;
