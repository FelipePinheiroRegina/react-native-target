import { Button } from '@/components/Button'
import { List } from '@/components/List'
import { Loading } from '@/components/Loading'
import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/Progress'
import { Transaction, TransactionData } from '@/components/Transaction'
import { TypeTarget, useTargetDatabase } from '@/database/useTargetDatabase'
import { useTransactionDatabase } from '@/database/useTransactionDatabase'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useState } from 'react'
import { Alert, View } from 'react-native'

export default function InProgress() {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useLocalSearchParams<{ id: string }>()
  const [target, setTarget] = useState<TypeTarget | null>(null)
  const [transactions, setTransactions] = useState<TransactionData[]>([])

  const { findById } = useTargetDatabase()
  const { listTransactions, deleteTransactionDatabase } = useTransactionDatabase()

  async function fetchTargetById(): Promise<TypeTarget | null> {
    try {
      const target = await findById(Number(id))

      if (!target) {
        return null
      }

      return target
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async function fetchTransactions(): Promise<TransactionData[]> {
    try {
      const transactions = await listTransactions({ targetId: Number(id) })

      if (!transactions) {
        return []
      }

      return transactions.map((transaction) => ({
        id: transaction.id.toString(),
        amount: transaction.amount,
        createdAt: transaction.created_at,
        observation: transaction.observation,
        type: transaction.type,
      }))
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function fetchData() {
    const [target, transactions] = await Promise.all([fetchTargetById(), fetchTransactions()])

    if (!target) {
      return router.back()
    }

    setTarget(target)
    setTransactions(transactions)
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, []),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <StatusBar style="dark" />
      <PageHeader
        title={target?.name ?? ''}
        subTitle="Track your progress towards your financial goals."
        rightButton={{ icon: 'edit', onPress: () => router.navigate(`/target?id=${id}`) }}
      />

      <Progress current={target?.current ?? 0} target={target?.amount ?? 0} percentage={target?.percentage ?? 0} />

      <List
        title="Transactions"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() =>
              Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  onPress: () => deleteTransactionDatabase(Number(item.id)).then(() => fetchData()),
                },
              ])
            }
          />
        )}
        emptyMessage="No transactions found. Add a new transaction to get started."
      />

      <Button onPress={() => router.navigate(`/transaction/${id}`)}>Add Transaction</Button>
    </View>
  )
}
