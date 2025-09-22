import classNames from 'classnames';
import style from './OrderStatus.module.scss';

interface IProps {
  doneList: number[],
  pendingList: number[],
  total: number,
  totalToday: number,
}

export default function OrderStatus({
  doneList, pendingList, total, totalToday
}: IProps) {
  const statuses = [
    {
      id: 'done',
      title: 'Готовы',
      list: doneList,
    },
    {
      id: 'pending',
      title: 'В работе',
      list: pendingList,
    }
  ];

  const totals = [
    {
      title: 'Выполнено за всё время',
      count: total
    },
    {
      title: 'Выполнено за сегодня',
      count: totalToday
    }
  ];

  return (
    <div className={style.orderStatus}>
      <div className={style.statusContainer}>
        {statuses.map(({ id, title, list }) => (
          <div key={id} className={style.status}>
            <h3 className={style.subtitle}>{title}:</h3>

            <ul className={style.statusList}>
              {list.map((number, index) => {
                if (index < 20) {
                  return (<li
                    key={number}
                    className={classNames(style.number, [style[id]])}
                  >
                    {number}
                  </li>)
                } else {
                  return null;
                }
              })}
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