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
  created_at: Date
  updated_at: Date
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
            COALESCE (
              SUM(CASE 
                WHEN transactions.type = 'income' THEN transactions.amount 
                WHEN transactions.type = 'outcome' THEN -transactions.amount 
                ELSE 0 
              END),
              0
            ) AS current,
            COALESCE ((
              SUM(CASE 
                WHEN transactions.type = 'income' THEN transactions.amount 
                WHEN transactions.type = 'outcome' THEN -transactions.amount 
                ELSE 0 
              END) / targets.amount
            ) * 100, 0) AS percentage,
            targets.created_at,
            targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        GROUP BY targets.id, targets.name, targets.amount
        ORDER BY percentage DESC
    `)
  }

  async function findById(id: number): Promise<TypeTarget | null> {
    return database.getFirstAsync(`
        SELECT 
            targets.id,
            targets.name,
            targets.amount,
            COALESCE (
              SUM(CASE 
                WHEN transactions.type = 'income' THEN transactions.amount 
                WHEN transactions.type = 'outcome' THEN -transactions.amount 
                ELSE 0 
              END),
              0
            ) AS current,
            COALESCE ((
              SUM(CASE 
                WHEN transactions.type = 'income' THEN transactions.amount 
                WHEN transactions.type = 'outcome' THEN -transactions.amount 
                ELSE 0 
              END) / targets.amount
            ) * 100, 0) AS percentage,
            targets.created_at,
            targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        WHERE targets.id = ${id}
    `)
  }

  async function updateTargetDatabase(id: number, data: Pick<TypeTarget, 'name' | 'amount'>) {
    const statement = await database.prepareAsync(`
        UPDATE targets SET 
        name = $name, 
        amount = $amount,
        updated_at = current_timestamp
        WHERE id = $id;
    `)

    statement.executeAsync({
      $id: id,
      $name: data.name,
      $amount: data.amount,
    })
  }

  async function deleteTargetDatabase(id: number) {
    await database.runAsync(`DELETE FROM targets WHERE id = ${id};`)
  }

  return { createTargetDatabase, listTargets, findById, updateTargetDatabase, deleteTargetDatabase }
}
