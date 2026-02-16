import { useMutation, useQueryClient } from '@tanstack/react-query';
import type Note from '../../types/note';
import Link from 'next/link';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError() {
      console.log('EROR');
    },
  });

  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <Link
              className={css.link}
              href={`/notes/${note.id}`}
              aria-label="View details"
            >
              View details
            </Link>

            <button className={css.button} onClick={() => mutate(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
