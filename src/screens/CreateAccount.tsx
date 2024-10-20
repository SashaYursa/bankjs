import React, { useState } from 'react'
import { SERVER, SERVER_ACCOUNT } from '../env'

export default function CreateAccount({ setAccountId }: { setAccountId: (id: number) => void }) {
  const [name, setName] = useState<string>()
  const [id, setId] = useState<number>()
  const [balance, setBalance] = useState<number>(0)

  const createAccoutAction = async () => {
    if (name && id && balance) {
      const data = new FormData()
      data.append('name', name)
      data.append('id', String(id))
      data.append('balance', String(balance))
      await fetch(SERVER_ACCOUNT, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          id,
          balance
        })
      }).then(res => {
        if (res.status === 201) {
          setAccountId(id)
        }
      })
    }
  }
  return (
    <div className='createAccount'>
      <input className='createAccountInput' type='text' placeholder='Ім`я' value={name} onChange={(e) => { setName(e.target.value) }} />
      <input className='createAccountInput' type='number' placeholder='ID' name='id' onChange={(e) => { setId(Number(e.target.value)) }} />
      <input className='createAccountInput' type='number' placeholder='Початковий баланс' name='balance' onChange={(e) => { setBalance(Number(e.target.value)) }} />
      <button className='createAccountButton' onClick={(e) => {
        e.preventDefault();
        createAccoutAction()
      }}>Створити акаунт</button>
    </div>
  )
}
