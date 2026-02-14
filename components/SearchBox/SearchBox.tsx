import css from './SearchBox.module.css';

interface SearchBoxProps {
  text: string;
  onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ text, onSearch }: SearchBoxProps) {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => onSearch(ev.target.value);

  return (
    <input
      defaultValue={text}
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
