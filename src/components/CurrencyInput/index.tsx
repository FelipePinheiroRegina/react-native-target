import { TextInput, TextInputProps, View, Text } from 'react-native'
import Input, { CurrencyInputProps } from 'react-native-currency-input'
import { styles } from './styles'
import { colors } from '@/theme'

interface InputProps extends CurrencyInputProps {
  label: string
}

export function CurrencyInput({ label, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...props}
      />
    </View>
  )
}
