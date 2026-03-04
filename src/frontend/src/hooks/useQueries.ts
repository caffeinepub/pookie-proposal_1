import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSaveBouquet() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flowers: string[]) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.saveBouquet(flowers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bouquet"] });
    },
  });
}

export function useSaveProposalResponse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accepted: boolean) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.saveProposalResponse(accepted);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposalResponse"] });
    },
  });
}
