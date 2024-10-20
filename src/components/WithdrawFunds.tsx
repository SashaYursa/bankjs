import React, { useState } from 'react'

export default function WithdrawFunds() {
  const [value, setValue] = useState<number>(0)
  return (
    <div className='withdrawFunds'>
      <span>До виведення</span>
      <input className='actionInput' type='number' value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <button className='withdrawFundsButton createActionButton'>Зняти</button>
    </div>
  )
}