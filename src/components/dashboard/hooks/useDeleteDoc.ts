import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosPrivate } from "../../../services/axios";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";


const useDeleteDoc = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            try {
                const res = await axiosPrivate.delete(`/document/delete_document/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                return res.data;
            } catch (error) {
                throw error as AxiosError;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            notifications.show({
                title: "Document deleted",
                message: "Document deleted successfully",
                color: "red",
            })
        },
    })
}


export default useDeleteDoc;