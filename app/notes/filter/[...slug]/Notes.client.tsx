'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import css from './NotesPage.module.css'

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const normalizedTag = tag === 'all' ? undefined : tag;

  // Search state
  const [inputValue, setInputValue] = useState('');
  const [text, setText] = useState('');

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);

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

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  // debounce 
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

  const { data, isFetching, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, text, normalizedTag],
    queryFn: () => fetchNotes(currentPage, text, normalizedTag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox text={inputValue} onSearch={handleSearch} />

          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}

          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
      </div>

      {(isLoading || isFetching) && <strong>Loading tasks ...</strong>}

      {notes.length > 0 && !isLoading && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}