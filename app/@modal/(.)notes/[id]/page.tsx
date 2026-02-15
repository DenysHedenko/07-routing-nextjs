import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient />
        </HydrationBoundary>
    );
}