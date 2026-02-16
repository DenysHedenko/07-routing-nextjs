'use client';

import css from './NotesPage.module.css'

interface Props {
    error: Error;
};

const Error = ({ error }: Props) => {
    return <p className={css.description}>
        Could not fetch the list of notes. {error.message}
    </p>;
};

export default Error;
