import React from 'react'
import { useSearchParams } from 'react-router-dom'
import CreateAccount from './CreateAccount'
import Info from './Info'



export default function Home() {
  const [params, setParams] = useSearchParams()
  const id = Number(params.get('id'))

  console.log(id)

  const setAccountId = (accountId: number) => {
    setParams({ id: String(accountId) })
  }

  if (id > 0) {
    return (
      <Info id={id} />
    )
  }
  return <CreateAccount setAccountId={setAccountId} />
}

