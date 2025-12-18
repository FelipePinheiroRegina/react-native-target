import { HomeHeader } from '@/components/HomeHeader'
import { View } from 'react-native'
import { Target, TargetProps } from '../components/Target'
import { List } from '@/components/List'
import { Button } from '@/components/Button'
import { router, useFocusEffect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useTargetDatabase } from '@/database/useTargetDatabase'
import { useCallback, useState } from 'react'
import { Loading } from '@/components/Loading'
import { useTransactionDatabase } from '@/database/useTransactionDatabase'

export default function Index() {
  const { listTargets } = useTargetDatabase()
  const { getSummary } = useTransactionDatabase()
  const [targets, setTargets] = useState<TargetProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [summary, setSummary] = useState({ total: 0, income: 0, outcome: 0 })

  async function fetchTarget(): Promise<TargetProps[]> {
    try {
      const targets = await listTargets()
      return targets.map((target) => ({
        id: target.id.toString(),
        name: target.name,
        percentage: target.percentage,
        current: target.current,
        target: target.amount,
      }))
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function fetchSummary() {
    try {
      return await getSummary()
    } catch {
      return { total: 0, income: 0, outcome: 0 }
    }
  }

  async function fetchData() {
    const [targets, summary] = await Promise.all([fetchTarget(), fetchSummary()])
    setTargets(targets)
    setSummary(summary)
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
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <HomeHeader total={summary.total} income={summary.income} outcome={summary.outcome} />
      <List
        title="Targets"
        data={targets}
        keyExtractor={(item) => item.id ?? ''}
        renderItem={({ item }) => <Target {...item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />}
        emptyMessage="No targets found. Add a new target to get started."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button onPress={() => router.navigate('/target')}>Add Target</Button>
      </View>
    </View>
  )
}
