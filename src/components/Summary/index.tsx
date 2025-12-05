import { Text, View } from 'react-native'
import { styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { ColorValue } from 'react-native'
import { formatCurrency } from '@/utils/formatCurrency'

interface SummaryProps {
  label: string
  value: number
  icon: {
    name: keyof typeof MaterialIcons.glyphMap
    color: ColorValue
  }
  placement?: 'left' | 'right'
}

export function Summary({ label, value, icon, placement = 'left' }: SummaryProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles[placement]]}>
        <MaterialIcons name={icon.name} color={icon.color} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text style={styles.value}>{formatCurrency(value)}</Text>
    </View>
  )
}
