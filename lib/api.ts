//? ==========================================================
// Functions for making HTTP requests related to notes
//? ==========================================================

import axios from 'axios';
import Note, { NoteTag } from '../types/note';

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

type NoteId = Note['id'];

export interface FetchNotesParams {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: NoteTag;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${myKey}`;

//* ==========================================================

export async function fetchNotes(
    page: number,
    search: string,
    tag?: string
): Promise<FetchNotesResponse> {
    const { data } = await axios.get<FetchNotesResponse>('/notes', {
        params: {
            page: page,
            perPage: 9,
            search: search,
            tag: tag,
        },
    });
    return data;
}

//* ==========================================================

export type CreateNotePayload = Pick<Note, 'title' | 'content' | 'tag'>;

export const createNote = async (noteData: CreateNotePayload) => {
    const { data } = await axios.post<Note>(`/notes`, noteData);
    return data;
};

//* ==========================================================

export interface DeleteNoteResponse {
    id: NoteId;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}

export const deleteNote = async (id: NoteId) => {
    const { data } = await axios.delete<DeleteNoteResponse>(`/notes/${id}`);
    return data;
};

//* ==========================================================

export const fetchNoteById = async (id: NoteId) => {
    const { data } = await axios.get<Note>(`/notes/${id}`);
    return data;
};
