import { HomeHeader } from '@/components/HomeHeader'
import { View } from 'react-native'
import { Target } from '../components/Target'
import { List } from '@/components/List'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const targets = [
  { id: '1', name: 'Target 1', percentage: 50, current: 1000, target: 2000 },
  { id: '2', name: 'Target 2', percentage: 50, current: 1000, target: 2000 },
  { id: '3', name: 'Target 3', percentage: 50, current: 1000, target: 2000 },
]

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <HomeHeader total={2680} income={6184} outcome={883} />
      <List
        title="Targets"
        data={targets}
        keyExtractor={(item) => item.id}
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
