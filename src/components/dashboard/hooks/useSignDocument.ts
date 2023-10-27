import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosPrivate } from "../../../services/axios";


type SignDocResType = {
  filename: string,
}


export const useSignDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("formData", formData);

      try {
        const signData = await axiosPrivate.post<SignDocResType>(
          "/document/sign_document",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        return signData.data;
      } catch (error) {
        throw error as AxiosError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
