export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export default interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: NoteTag;
}