"use client";

import { useQuery } from "@tanstack/react-query";
import css from './NotePreview.module.css'
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    const handleCloseModal = () => {
        router.back();
    };

    return (
        <Modal onClose={handleCloseModal}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data?.title}</h2>
                    </div>
                    <p className={css.tag}>{data?.tag}</p>
                    <p className={css.content}>{data?.content}</p>
                    <p className={css.date}>{data?.createdAt}</p>
                    <button onClick={handleCloseModal} className={css.backBtn}>
                        Go back
                    </button>
                </div>
                {isLoading && <p className={css.content}>Loading, please wait...</p>}
                {error && !data && <p className={css.content}>Something went wrong.</p>}
            </div>
        </Modal>
    );
}