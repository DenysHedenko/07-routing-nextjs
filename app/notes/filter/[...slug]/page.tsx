import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {

  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, "", tag],
    queryFn: () =>
      fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
