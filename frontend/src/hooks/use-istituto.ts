import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** Elimina l'istituto dell'utente autenticato. L'id è preso dal token lato backend. */
export function useDeleteIstituto(onShowDialog: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const response = await api.delete<{ message: string; id: string }>('/istituti/delete-istituto');
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['istituti'] });
            onShowDialog();
        },
    })
}

