import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import { formatError } from '@/lib/utils.js';

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
        onError: (err) => {
            toast.error(formatError(err, "Errore durante l'eliminazione dell'istituto."));
        },
    })
}

