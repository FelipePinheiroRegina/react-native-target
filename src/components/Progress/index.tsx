import { Text, View } from 'react-native'
import { styles } from './styles'
import { formatCurrency } from '@/utils/formatCurrency'

interface ProgressProps {
  current: number
  target: number
  percentage: number
}

export function Progress({ current, target, percentage }: ProgressProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Progress</Text>

      <View style={styles.status}>
        <Text style={styles.value}>
          {formatCurrency(current)} <Text style={styles.target}>de {formatCurrency(target)}</Text>
        </Text>

        <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
      </View>

      <View style={styles.progress}>
        <View style={[styles.currentProgress, { width: `${percentage}%` }]} />
      </View>
    </View>
  )
}
