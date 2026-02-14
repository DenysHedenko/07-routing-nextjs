'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import css from './page.module.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';

const NOTES_PER_PAGE = 9;

type Props = {
  initialSearch: string;
  initialPage: number;
};

export default function NotesClient({ initialSearch, initialPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [inputValue, setInputValue] = useState(initialSearch);

  const [text, setText] = useState(initialSearch);

  const [currentPage, setCurrentPage] = useState(initialPage);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setUrlParams = (next: { search?: string; page?: number }) => {
    const params = new URLSearchParams(sp.toString());

    if (typeof next.search === 'string') {
      const val = next.search.trim();
      if (val) params.set('search', val);
      else params.delete('search');
    }

    if (typeof next.page === 'number') {
      params.set('page', String(next.page));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedApplySearch = useDebouncedCallback((value: string) => {
    const val = value.trim();
    setText(val);
    setCurrentPage(1);
    setUrlParams({ search: val, page: 1 });
  }, 400);

  const handleSearch = (value: string) => {
    setInputValue(value);
    debouncedApplySearch(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setUrlParams({ page });
  };

  const { data, isLoading, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', text, currentPage],
    queryFn: () =>
      fetchNotes({
        search: text || undefined,
        page: currentPage,
        perPage: NOTES_PER_PAGE,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={inputValue} onSearch={handleSearch} />

        {!!data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {(isLoading || isFetching) && <strong>Loading tasks ...</strong>}

      {!isLoading && data && <NoteList notes={data.notes ?? []} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
