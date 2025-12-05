import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Input } from '@/components/Input'
import { PageHeader } from '@/components/PageHeader'
import { TransactionType } from '@/components/TransactionType'
import { TransactionsType } from '@/utils/transactionsType'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'

export default function Transaction() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [type, setType] = useState<TransactionsType>(TransactionsType.INCOME)
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <PageHeader
        title="New Transaction"
        subTitle="With each savings you make, you get closer to your goal. Make an effort to save and avoid withdrawing."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType type={type} onChange={setType} />
        <CurrencyInput value={0} label="Amount (R$)" />
        <Input label="Reason (Optional)" placeholder="Ex.: Salary, Rent, etc." />
        <Button>Save</Button>
      </View>
    </View>
  )
}
