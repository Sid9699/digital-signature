import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosPrivate } from "../../services/axios";
import { RegisterType } from "../../types/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (values: RegisterType) => {
      try {
        const res = await axiosPrivate.post("/auth/register", values);
        localStorage.setItem("access_token", res.data.access_token);
        return res.data;
      } catch (error) {
        const err = error as AxiosError;
        throw err;
      }
    },
  });
};
