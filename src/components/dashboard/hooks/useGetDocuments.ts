import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../../services/axios";

export const useGetDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/document", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      return res.data;
    },
  });
};
