import React, { useState } from 'react'

export default function WithdrawFunds({ withdrawFunds, isWithdrawed }: { withdrawFunds: (value: number) => void, isWithdrawed: boolean | undefined }) {
  const [value, setValue] = useState<number>(0)
  return (
    <div className='withdrawFunds'>
      <span>До виведення</span>
      <input className='actionInput' type='number' value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <button className='withdrawFundsButton createActionButton' onClick={() => withdrawFunds(value)}>Зняти</button>
      <span style={isWithdrawed ? { color: 'green' } : { color: 'red' }}>{isWithdrawed ? "Успішно" : isWithdrawed === false ? "Не виведено" : ""}</span>
    </div>
  )
}