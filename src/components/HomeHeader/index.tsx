import { colors } from '@/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles'
import { Text, View } from 'react-native'
import { formatCurrency } from '@/utils/formatCurrency'
import { Divider } from '../Divider'
import { Summary } from '../Summary'

interface HomeHeaderProps {
  total: number
  income: number
  outcome: number
}

export function HomeHeader({ total = 0, income = 0, outcome = 0 }: HomeHeaderProps) {
  return (
    <LinearGradient colors={[colors.blue[500], colors.blue[800]]} style={styles.container}>
      <View>
        <Text style={styles.label}>Total you have</Text>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
      </View>

      <Divider color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary label="Income" value={income} icon={{ name: 'arrow-upward', color: colors.green[500] }} />
        <Summary
          label="Outcome"
          value={outcome}
          icon={{ name: 'arrow-downward', color: colors.red[400] }}
          placement="right"
        />
      </View>
    </LinearGradient>
  )
}
