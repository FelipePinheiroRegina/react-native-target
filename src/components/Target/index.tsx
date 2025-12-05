import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { styles } from './styles'
import { formatCurrency } from '@/utils/formatCurrency'
import { MaterialIcons } from '@expo/vector-icons'

interface TargetProps extends TouchableOpacityProps {
  id?: string
  name: string
  percentage: number
  current: number
  target: number
}

export function Target({ id, name, percentage, current, target, ...props }: TargetProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.status}>
          {percentage}% • {formatCurrency(current)} de {formatCurrency(target)}
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={20} />
    </TouchableOpacity>
  )
}
