import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Input } from '@/components/Input'
import { PageHeader } from '@/components/PageHeader'
import { TransactionType } from '@/components/TransactionType'
import { useTransactionDatabase } from '@/database/useTransactionDatabase'
import { TransactionsType } from '@/utils/transactionsType'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Alert, View } from 'react-native'

export default function Transaction() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [transaction, setTransaction] = useState({
    targetId: Number(id),
    type: TransactionsType.INCOME as TransactionsType,
    amount: 0,
    observation: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const { createTransactionDatabase } = useTransactionDatabase()

  async function handleCreateTransaction() {
    if (!transaction.amount || transaction.amount <= 0) {
      return Alert.alert('Error', 'Please fill in the amount')
    }

    setIsLoading(true)
    try {
      await createTransactionDatabase(transaction)
      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <StatusBar style="dark" />
      <PageHeader
        title="New Transaction"
        subTitle="With each savings you make, you get closer to your goal. Make an effort to save and avoid withdrawing."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType type={transaction.type} onChange={(type) => setTransaction({ ...transaction, type })} />
        <CurrencyInput
          value={transaction.amount}
          label="Amount (R$)"
          onChangeValue={(amount) => setTransaction({ ...transaction, amount: amount ?? 0 })}
        />
        <Input
          label="Reason (Optional)"
          placeholder="Ex.: Salary, Rent, etc."
          onChangeText={(text) => setTransaction({ ...transaction, observation: text })}
          value={transaction.observation}
        />
        <Button onPress={handleCreateTransaction} isLoading={isLoading} disabled={isLoading}>
          Save
        </Button>
      </View>
    </View>
  )
}
