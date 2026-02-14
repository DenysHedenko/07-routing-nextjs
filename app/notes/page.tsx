import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

const NOTES_PER_PAGE = 12;

type NotesPageProps = {
  searchParams?: Promise<{ search?: string; page?: string }>;
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const sp = (await searchParams) ?? {};
  const search = (sp.search ?? '').trim();
  const page = Number(sp.page ?? '1') || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page],
    queryFn: () =>
      fetchNotes({
        search: search || undefined,
        page,
        perPage: NOTES_PER_PAGE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialSearch={search} initialPage={page} />
    </HydrationBoundary>
  );
}
