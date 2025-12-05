import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, Text } from 'react-native'

import { styles } from './styles'
import { colors } from '@/theme'

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

export function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} disabled={isLoading} {...props}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <Text style={styles.title}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}
