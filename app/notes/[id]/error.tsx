'use client';

import css from './noteDetails.module.css'

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return <p className={css.content}>Could not fetch note details. {error.message}</p>;
};

export default Error;
