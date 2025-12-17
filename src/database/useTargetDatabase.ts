import { useSQLiteContext } from 'expo-sqlite'

export type TargetCreate = {
  name: string
  amount: number
}

export type TypeTarget = {
  id: number
  name: string
  amount: number
  current: number
  percentage: number
  createdAt: Date
  updatedAt: Date
}

export function useTargetDatabase() {
  const database = useSQLiteContext()

  async function createTargetDatabase(data: TargetCreate) {
    const statement = await database.prepareAsync(`
        INSERT INTO targets (name, amount) VALUES ($name, $amount);
    `)

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    })
  }

  async function listTargets(): Promise<TypeTarget[]> {
    return database.getAllAsync(`
        SELECT 
            targets.id,
            targets.name,
            targets.amount,
            COALESCE (SUM(transactions.amount), 0) AS current,
            COALESCE ((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
            targets.created_at,
            targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        GROUP BY targets.id, targets.name, targets.amount
        ORDER BY current DESC
    `)
  }

  async function findById(id: number): Promise<TypeTarget | null> {
    return database.getFirstAsync(`
        SELECT 
            targets.id,
            targets.name,
            targets.amount,
            COALESCE (SUM(transactions.amount), 0) AS current,
            COALESCE ((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
            targets.created_at,
            targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        WHERE targets.id = ${id}
    `)
  }

  return { createTargetDatabase, listTargets, findById }
}
