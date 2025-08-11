import style from './Container.module.scss';
import { ReactElement } from 'react';

interface IProps {
  children: ReactElement;
}
export default function Container({ children }: IProps) {
  return (
    <main className={style.container}>
      {children}
    </main>
  );
}
