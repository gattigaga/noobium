import { useMutation } from "@tanstack/react-query";

import axios from "../../helpers/axios";

type Payload = {
  name: string;
  picture?: File | null;
};

type Response = {
  name: string;
  email: string;
  picture: string;
};

const action = async (payload: Payload): Promise<Response> => {
  const token = localStorage.getItem("access_token");

  const form = new FormData();
  form.append("_method", "PUT");
  form.append("name", payload.name);

  if (payload.picture) {
    form.append("picture", payload.picture);
  }

  const res = await axios.post("/me/profile", form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};

const useEditProfileMutation = () => {
  return useMutation(action);
};

export default useEditProfileMutation;
