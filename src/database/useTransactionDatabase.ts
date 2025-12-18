import { useSQLiteContext } from 'expo-sqlite'
import { TransactionsType } from '@/utils/transactionsType'

export type TransactionCreate = {
  targetId: number
  type: TransactionsType
  amount: number
  observation?: string
}

export type TypeTransaction = {
  id: number
  type: TransactionsType
  amount: number
  observation: string | null
  created_at: Date
  updated_at: Date
}

export type Summary = {
  total: number
  income: number
  outcome: number
}

export function useTransactionDatabase() {
  const database = useSQLiteContext()

  async function createTransactionDatabase(data: TransactionCreate) {
    const statement = await database.prepareAsync(`
        INSERT INTO transactions (target_id, type, amount, observation) VALUES ($target_id, $type, $amount, $observation);
    `)

    statement.executeAsync({
      $target_id: data.targetId,
      $type: data.type,
      $amount: data.amount,
      $observation: data.observation ?? null,
    })
  }

  async function listTransactions({ targetId }: { targetId: number }): Promise<TypeTransaction[]> {
    return database.getAllAsync(`
        SELECT 
            transactions.id,
            transactions.type,
            transactions.amount,
            transactions.observation,
            transactions.created_at,
            transactions.updated_at
        FROM transactions
        WHERE transactions.target_id = ${targetId}
        ORDER BY transactions.created_at DESC
    `)
  }

  async function deleteTransactionDatabase(id: number) {
    await database.runAsync(`DELETE FROM transactions WHERE id = ${id};`)
  }

  async function getSummary(): Promise<Summary> {
    return (
      (await database.getFirstAsync(`
        SELECT 
            COALESCE(
              SUM(CASE WHEN type = 'income' THEN amount
              WHEN type = 'outcome' THEN -amount
              ELSE 0
              END), 0) AS total,
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS income,
            COALESCE(SUM(CASE WHEN type = 'outcome' THEN amount ELSE 0 END), 0) AS outcome
        FROM transactions
    `)) ?? ({ total: 0, income: 0, outcome: 0 } as Summary)
    )
  }

  return { createTransactionDatabase, listTransactions, deleteTransactionDatabase, getSummary }
}
