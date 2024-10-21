import React, { useEffect, useState } from 'react'
import AddFunds from '../components/AddFunds'
import WithdrawFunds from '../components/WithdrawFunds'
import TransferFunds from '../components/TransferFunds'
import History from '../components/History'
import { SERVER_ACCOUNT, SERVER_ADD_FUNDS, SERVER_TRANSFER_FUNDS, SERVER_WITHDRAW_FUNDS } from '../env'
import { DNA } from 'react-loader-spinner'

export type transactions = {
  type: 'withdraw' | 'deposite' | 'transfer',
  to: null | number,
  from: null | number,
  amount: number
}[]

type action = 'deposite' | 'withdraw' | 'transfer'


export default function Info({ id }: { id: number }) {
  const [account, setAccount] = useState<{
    funds: number,
    name: string,
    transactions: transactions
  }>();

  const [selectedAction, setSelectedAction] = useState<action | null>(null)
  const [isWithdrawed, setIsWithdrawed] = useState<boolean>()
  const [isTransfered, setIsTransfered] = useState<boolean>()

  useEffect(() => {
    fetch(SERVER_ACCOUNT + "?id=" + id).then(res => res.json()).then(data => setAccount(data))
  }, [id])


  const getLastTransactionStatus = (): boolean => {
    if (account?.transactions.length) {
      const tr = account.transactions[0];
      if (tr.type === 'deposite') return true
      if (tr.type === 'transfer' && tr.from !== id) return true
    }
    return false
  }

  const addFund = (value: number) => {
    fetch(SERVER_ADD_FUNDS, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, funds: value
      })
    }).then(data => {
      if (!data.ok || !account) {
        return
      }
      setAccount({
        ...account,
        funds: account.funds + value,
        transactions: [
          {
            amount: value,
            from: null,
            to: id,
            type: 'deposite'
          },
          ...account?.transactions,
        ]
      }
      )
    })
  }
  const withdrawFunds = (value: number) => {
    if (!account?.funds || account.funds < value) setIsWithdrawed(false)
    fetch(SERVER_WITHDRAW_FUNDS, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, funds: value })
    }).then(data => {
      if (data.ok && account) {
        setAccount({
          ...account,
          funds: account.funds - value,
          transactions: [
            {
              amount: value,
              from: null,
              to: null,
              type: 'withdraw'
            },
            ...account?.transactions,
          ]
        })
        setIsWithdrawed(true)
      }
    })
  }
  const transferFunds = (value: number, accountId: number) => {
    if (!account?.funds || account.funds < value && accountId) setIsTransfered(false)
    fetch(SERVER_TRANSFER_FUNDS, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, funds: value, transferId: accountId })
    }).then(data => {
      if (data.status === 404) {
        setIsTransfered(false)
      }
      if (data.ok && account) {
        setAccount({
          ...account,
          funds: account.funds - value,
          transactions: [
            {
              amount: value,
              from: id,
              to: accountId,
              type: 'transfer'
            },
            ...account?.transactions,
          ]
        })
        setIsTransfered(true)
      }
    })
  }

  if (!account) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <DNA />
    </div>)

  return (
    <div className='balanceInfo'>
      <div className='info'>
        <div className='amount'>
          <h1 className='amountHeader'>Баланс</h1>
          <p
            style={account.transactions.length ?
              (getLastTransactionStatus() ?
                { color: '#2aff4a' } :
                { color: 'red' })
              : {}}
            className='amountValue'>{account.funds}</p>
        </div>
        <div className='idAccount'>
          <h2 className='idHeader'>ID</h2>
          <p className='idValue'>{id}</p>
        </div>
        <div className='nameAccount'>
          <h2 className='nameHeader'>Ім`я</h2>
          <p className='nameValue'>{account.name}</p>
        </div>
      </div>
      <div className='actions'>
        <div className='actionButtons'>

          <button className='actionButton' onClick={() => setSelectedAction('deposite')}>
            Поповнити
          </button>
          <button className='actionButton' onClick={() => setSelectedAction('withdraw')}>
            Зняти
          </button>
          <button className='actionButton' onClick={() => setSelectedAction('transfer')}>
            Перевести
          </button>
        </div>
        <div className={`selectedAction ${selectedAction !== null && 'active'}`}>
          {selectedAction === "deposite" ?
            <AddFunds addFund={addFund} />
            : selectedAction === "withdraw" ?
              <WithdrawFunds withdrawFunds={withdrawFunds} isWithdrawed={isWithdrawed} />
              : selectedAction === "transfer" ?
                <TransferFunds transferFunds={transferFunds} isTransfered={isTransfered} /> : <></>
          }
        </div>
      </div>
      <div className='history'>
        <History id={id} historyItems={account.transactions} />
      </div>
    </div>
  )
}
