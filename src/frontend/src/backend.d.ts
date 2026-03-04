import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Bouquet {
    timestamp: Time;
    flowers: Array<string>;
}
export type Time = bigint;
export interface ProposalResponse {
    timestamp: Time;
    accepted: boolean;
}
export interface backendInterface {
    getBouquet(): Promise<Bouquet>;
    getProposalResponse(): Promise<ProposalResponse | null>;
    saveBouquet(flowers: Array<string>): Promise<void>;
    saveProposalResponse(accepted: boolean): Promise<void>;
}
