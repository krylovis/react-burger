import classNames from 'classnames';
import style from './OrderStatus.module.scss';

export default function OrderStatus() {
  const statuses = [
    {
      id: 'done',
      title: 'Готовы',
      list: [],
    },
    {
      id: 'pending',
      title: 'В работе',
      list: [],
    }
  ];

  const totals = [
    {
      title: 'Выполнено за всё время',
      count: 0
    },
    {
      title: 'Выполнено за сегодня',
      count: 0
    }
  ];

  return (
    <div className={style.orderStatus}>
      <div className={style.statusContainer}>
        {statuses.map(({ id, title, list }) => (
          <div className={style.status}>
            <h3 className={style.subtitle}>{title}:</h3>

            <ul className={style.statusList}>
              {list.map((number) => (
                <li
                  key={id}
                  className={classNames(style.number, [style[id]])}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={style.totalContainer}>
        {totals.map(({ title, count }) => (
          <div key={title} className={style.total}>
            <h3 className={style.subtitle}>{title}:</h3>

            <span className={style.count}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}