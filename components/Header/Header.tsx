import Link from 'next/link';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">Home</Link>
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href={`/notes/filter/all`}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
