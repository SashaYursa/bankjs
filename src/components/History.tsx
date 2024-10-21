import React from 'react'
import { transactions } from '../screens/Info'

export default function History({ historyItems, id }: { historyItems: transactions, id: number }) {
  return (
    <div className='historyWrapper'>
      {historyItems ? historyItems.map((item, index) => {
        const isIncrease = item.type === "deposite" ? true : item.type === "transfer" ? item.from === id ? false : true : false
        return (
          <div key={index} className={`historyItem ${index % 2 === 0 ? 'hhh' : ''}`}>
            <div className='historyAmount' style={{ color: `${isIncrease ? "#2aff4a" : 'red'}` }}>
              {`${isIncrease ? "+" : "-"}${item.amount}`}
            </div>
            <div className='historyTransfer'>
              {
                item.type === "transfer" ?
                  <span>{item.from !== id ? `Отримано від ${item.from}` : `Надіслано до ${item.to}`}</span> : <></>
              }
            </div>
            <div className='historyKind'>
              <span>
                {item.type === "deposite" ? "Поповненя" : item.type === "transfer" ? "Перевод" : "Зняття"}
              </span>
            </div>
          </div>
        )
      }
      ) : <div>Історії ще немає</div>}

    </div>
  )
}
