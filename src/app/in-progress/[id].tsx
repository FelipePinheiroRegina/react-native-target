import { Button } from '@/components/Button'
import { List } from '@/components/List'
import { Loading } from '@/components/Loading'
import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/Progress'
import { Transaction } from '@/components/Transaction'
import { TypeTarget, useTargetDatabase } from '@/database/useTargetDatabase'
import { TransactionsType } from '@/utils/transactionsType'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { View } from 'react-native'

export default function InProgress() {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useLocalSearchParams<{ id: string }>()
  const [target, setTarget] = useState<TypeTarget | null>(null)

  const { findById } = useTargetDatabase()

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

  async function fetchData() {
    const [target] = await Promise.all([fetchTargetById()])

    if (!target) {
      return router.back()
    }

    setTarget(target)
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
      <PageHeader
        title={target?.name ?? ''}
        subTitle="Track your progress towards your financial goals."
        rightButton={{ icon: 'edit', onPress: () => console.log('edit') }}
      />

      <Progress current={target?.current ?? 0} target={target?.amount ?? 0} percentage={target?.percentage ?? 0} />

      <List
        title="Transactions"
        data={[
          {
            id: '1',
            description: 'Description 1',
            value: 100,
            date: new Date(),
            type: TransactionsType.INCOME,
            onRemove: () => console.log('remove'),
          },
          {
            id: '2',
            description: 'Description 2',
            value: 200,
            date: new Date(),
            type: TransactionsType.OUTCOME,
            onRemove: () => console.log('remove'),
          },
        ]}
        renderItem={({ item }) => <Transaction {...item} />}
        keyExtractor={(item) => item.id}
        emptyMessage="No transactions found. Add a new transaction to get started."
      />

      <Button onPress={() => router.navigate(`/transaction/${id}`)}>Add Transaction</Button>
    </View>
  )
}
