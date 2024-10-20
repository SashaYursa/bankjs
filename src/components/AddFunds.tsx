import React, { useState } from 'react'

export default function AddFunds({ addFund }: { addFund: (amount: number) => void }) {
  const [value, setValue] = useState(0)

  return (
    <div className='addFunds'>
      <span>До поповненя</span>
      <input className='actionInput' type='number' value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <button className='addFundsButton createActionButton' onClick={() => addFund(value)}>Поповнити</button>
    </div>
  )
}
