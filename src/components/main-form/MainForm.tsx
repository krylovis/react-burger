import { FormEvent, ReactElement } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import style from './MainForm.module.scss';

interface IProps {
  type?: string,
  formTitle?: string,
  children: ReactElement | ReactElement[],
  submitText?: string,
  onSubmit?: (e: FormEvent) => void,
}

export default function MainForm({ type, children, formTitle, submitText, onSubmit }: IProps) {
  const mainFormClasses = classNames(style.mainForm, {
    [style.mainForm_type_profile]: type === 'profile',
  });

  return (
    <section className={mainFormClasses}>
      {formTitle && (<h1 className={style.mainForm__title}>{formTitle}</h1>)}
      <form
        className={style.mainForm__form}
        onSubmit={onSubmit}
        action="action"
      >
        {children}

        {submitText && (
          <div className={style.mainForm__btnContainer}>
            <Button
              htmlType="submit"
              type="primary"
            >
              {submitText}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
