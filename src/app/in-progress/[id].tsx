import { Button } from '@/components/Button'
import { List } from '@/components/List'
import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/Progress'
import { Transaction } from '@/components/Transaction'
import { TransactionsType } from '@/utils/transactionsType'
import { router, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Target 1"
        subTitle="Track your progress towards your financial goals."
        rightButton={{ icon: 'edit', onPress: () => console.log('edit') }}
      />

      <Progress current={1000} target={2000} percentage={50} />

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
