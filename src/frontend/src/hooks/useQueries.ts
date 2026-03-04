import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Bouquet,
  Letter,
  Note,
  WeddingCertificate,
} from "../backend.d.ts";
import { useActor } from "./useActor";

// ─── Bouquet Queries ────────────────────────────────────────────────────────

export function useGetBouquetForAastha() {
  const { actor, isFetching } = useActor();
  return useQuery<Bouquet | null>({
    queryKey: ["bouquetAastha"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBouquetForAastha();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBouquetForBishal() {
  const { actor, isFetching } = useActor();
  return useQuery<Bouquet | null>({
    queryKey: ["bouquetBishal"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBouquetForBishal();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFlowersForAastha() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (flowers: string[]) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addFlowersForAastha(flowers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bouquetAastha"] });
    },
  });
}

export function useAddFlowersForBishal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (flowers: string[]) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addFlowersForBishal(flowers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bouquetBishal"] });
    },
  });
}

// ─── Letters Queries ────────────────────────────────────────────────────────

export function useGetAllLetters() {
  const { actor, isFetching } = useActor();
  return useQuery<Letter[]>({
    queryKey: ["letters"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLetters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddLetter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      author,
      content,
    }: { author: string; content: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addLetter(author, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });
}

export function useDeleteLetter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteLetter(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });
}

// ─── Handwritten Notes Queries ──────────────────────────────────────────────

export function useGetAllHandwrittenNotes() {
  const { actor, isFetching } = useActor();
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHandwrittenNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddHandwrittenNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      author,
      imageData,
      caption,
    }: {
      author: string;
      imageData: string;
      caption: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addHandwrittenNote(author, imageData, caption);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useDeleteHandwrittenNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteHandwrittenNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

// ─── Wedding Certificate Queries ─────────────────────────────────────────────

export function useGetWeddingCertificate() {
  const { actor, isFetching } = useActor();
  return useQuery<WeddingCertificate | null>({
    queryKey: ["weddingCertificate"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWeddingCertificate();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetWeddingDate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (date: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.setWeddingDate(date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddingCertificate"] });
    },
  });
}

export function useSignWeddingCertificateAsBishal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.signWeddingCertificateAsBishal();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddingCertificate"] });
    },
  });
}

export function useSignWeddingCertificateAsAastha() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.signWeddingCertificateAsAastha();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddingCertificate"] });
    },
  });
}

// ─── Legacy exports (kept for compatibility) ─────────────────────────────────

export function useSaveBouquet() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (flowers: string[]) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addFlowersForAastha(flowers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bouquetAastha"] });
    },
  });
}

export function useSaveProposalResponse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_accepted: boolean) => {
      // no-op: proposal response no longer used
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposalResponse"] });
    },
  });
}
