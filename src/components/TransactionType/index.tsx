import { TransactionsType } from '@/utils/transactionsType'
import { View } from 'react-native'
import { Option } from './option'
import { styles } from './styles'
import { colors } from '@/theme'

interface TransactionTypeProps {
  type: TransactionsType
  onChange: (type: TransactionsType) => void
}

export function TransactionType({ type, onChange }: TransactionTypeProps) {
  return (
    <View style={styles.container}>
      <Option
        title="Income"
        icon="arrow-upward"
        isSelected={type === TransactionsType.INCOME}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionsType.INCOME)}
      />
      <Option
        title="Outcome"
        icon="arrow-downward"
        isSelected={type === TransactionsType.OUTCOME}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionsType.OUTCOME)}
      />
    </View>
  )
}
