import { Alert, View } from 'react-native'

import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useTargetDatabase } from '@/database/useTargetDatabase'

export default function Target() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)

  const params = useLocalSearchParams<{ id: string }>()
  const { createTargetDatabase } = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert('Error', 'Please fill in all fields')
    }

    setIsLoading(true)

    if (params.id) {
      return console.log('updateTarget')
    }

    createTarget()
  }

  async function createTarget() {
    try {
      await createTargetDatabase({ name, amount })
      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Target" subTitle="Save to reach your financial goal." />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Target name" placeholder="Ex.: House, Car, Vacation, etc." onChangeText={setName} />

        <CurrencyInput
          label="Target amount"
          placeholder="Ex.: 1000.00"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />

        <Button onPress={handleSave} isLoading={isLoading} disabled={isLoading}>
          Save
        </Button>
      </View>
    </View>
  )
}
