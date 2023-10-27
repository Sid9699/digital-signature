import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosPrivate } from "../../services/axios";
import { LoginType } from "../../types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (values: LoginType) => {
      try {
        const res = await axiosPrivate.post("/auth/login", values);
        localStorage.setItem("access_token", res.data.access_token);
        return res.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err;
      }
    },
  });
};
