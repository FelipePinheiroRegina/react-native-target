import { Alert, View } from 'react-native'

import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import { StatusBar } from 'expo-status-bar'

export default function Target() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)

  const params = useLocalSearchParams<{ id: string }>()
  const { createTargetDatabase, findById, updateTargetDatabase, deleteTargetDatabase } = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert('Error', 'Please fill in all fields')
    }

    setIsLoading(true)

    if (params.id) {
      return updateTargetDatabase(Number(params.id), { name, amount }).then(() => {
        router.back()
      })
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

  async function fetchTargetById() {
    try {
      const target = await findById(Number(params.id))
      setName(target?.name ?? '')
      setAmount(target?.amount ?? 0)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchTargetById()
    }
  }, [params.id])

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar style="dark" />
      <PageHeader
        title="Target"
        subTitle="Save to reach your financial goal."
        {...(params.id && {
          rightButton: {
            icon: 'delete',
            onPress: () =>
              Alert.alert('Delete target', 'Are you sure you want to delete this target?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  onPress: () => deleteTargetDatabase(Number(params.id)).then(() => router.replace('/')),
                },
              ]),
          },
        })}
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Target name" placeholder="Ex.: House, Car, Vacation, etc." onChangeText={setName} value={name} />

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
