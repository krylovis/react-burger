import { FormEvent, ReactElement } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './MainForm.module.scss';

interface IProps {
  formTitle?: string,
  children: ReactElement | ReactElement[],
  submitText?: string,
  onSubmit?: (e: FormEvent) => void,
}

export default function MainForm({ children, formTitle, submitText, onSubmit }: IProps) {
  return (
    <section className={style.mainForm}>
      <h1 className={style.mainForm__title}>{formTitle}</h1>

      <form className={style.mainForm__form} action="action">
        {children}

        <div className={style.mainForm__btnContainer}>
          <Button
            htmlType="submit"
            type="primary"
            onClick={onSubmit}>
            {submitText}
          </Button>
        </div>
      </form>
    </section>
  );
}
