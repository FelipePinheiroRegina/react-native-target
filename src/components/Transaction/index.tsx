import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { formatCurrency } from '@/utils/formatCurrency'
import { TransactionsType } from '@/utils/transactionsType'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/theme'

export type TransactionData = {
  id: string
  amount: number
  createdAt: string | Date
  observation: string | null
  type: TransactionsType
}
export interface TransactionProps {
  data: TransactionData
  onRemove: VoidFunction
}

export function Transaction({ data, onRemove }: TransactionProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={data.type === TransactionsType.INCOME ? 'arrow-upward' : 'arrow-downward'}
        size={20}
        color={data.type === TransactionsType.INCOME ? colors.blue[500] : colors.red[400]}
      />

      <View style={styles.info}>
        <Text style={styles.value}>{formatCurrency(data.amount)}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.createdAt.toLocaleString()}
          {data.observation && ` • ${data.observation}`}
        </Text>
      </View>

      <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
        <MaterialIcons name="close" size={18} color={colors.red[400]} />
      </TouchableOpacity>
    </View>
  )
}
