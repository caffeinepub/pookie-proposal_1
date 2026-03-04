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
export interface Letter {
    id: bigint;
    content: string;
    author: string;
    timestamp: Time;
}
export type Time = bigint;
export interface WeddingCertificate {
    weddingDate: string;
    bishalSigned: boolean;
    bishalSignedAt?: Time;
    aasthaSignedAt?: Time;
    aasthaSigned: boolean;
}
export interface Note {
    id: bigint;
    imageData: string;
    author: string;
    timestamp: Time;
    caption: string;
}
export interface backendInterface {
    addFlowersForAastha(flowers: Array<string>): Promise<void>;
    addFlowersForBishal(flowers: Array<string>): Promise<void>;
    addHandwrittenNote(author: string, imageData: string, caption: string): Promise<bigint>;
    addLetter(author: string, content: string): Promise<bigint>;
    deleteHandwrittenNote(id: bigint): Promise<boolean>;
    deleteLetter(id: bigint): Promise<boolean>;
    getAllHandwrittenNotes(): Promise<Array<Note>>;
    getAllLetters(): Promise<Array<Letter>>;
    getBouquetForAastha(): Promise<Bouquet>;
    getBouquetForBishal(): Promise<Bouquet>;
    getWeddingCertificate(): Promise<WeddingCertificate>;
    setWeddingDate(date: string): Promise<void>;
    signWeddingCertificateAsAastha(): Promise<void>;
    signWeddingCertificateAsBishal(): Promise<void>;
}
