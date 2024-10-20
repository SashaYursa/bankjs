import React, { useState } from 'react'

export default function TransferFunds() {
  const [transferId, setTransferId] = useState(0)
  const [value, setValue] = useState(0)
  return (
    <div className='transferFunds'>
      <span>Переведення</span>
      <div className='transferFundsInput'>
        <span className='ml'>ID</span>
        <input className='actionInput' type='number' value={transferId} onChange={(e) => setTransferId(Number(e.target.value))} />
      </div>
      <div className='transferFundsInput'>
        <span className='ml'>Сума</span>
        <input className='actionInput' type='number' value={value} onChange={(e) => setValue(Number(e.target.value))} />
      </div>
      <button className='transferFundsButton createActionButton'>Перевести</button>
    </div>
  )
}