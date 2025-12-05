import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { formatCurrency } from '@/utils/formatCurrency'
import { TransactionsType } from '@/utils/transactionsType'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/theme'

interface TransactionProps {
  id: string
  value: number
  date: string | Date
  description?: string
  type: TransactionsType
  onRemove: VoidFunction
}

export function Transaction({ id, value, description, type, onRemove, date }: TransactionProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={type === TransactionsType.INCOME ? 'arrow-upward' : 'arrow-downward'}
        size={20}
        color={type === TransactionsType.INCOME ? colors.blue[500] : colors.red[400]}
      />

      <View style={styles.info}>
        <Text style={styles.value}>{formatCurrency(value)}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {date.toLocaleString()}
          {description && ` • ${description}`}
        </Text>
      </View>

      <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
        <MaterialIcons name="close" size={18} color={colors.red[400]} />
      </TouchableOpacity>
    </View>
  )
}
