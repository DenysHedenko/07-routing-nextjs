import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Denys Hedenko</p>
          <p>
            Contact us:
            <a href="mailto:denyshedenko@gmail.com">denyshedenko@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
