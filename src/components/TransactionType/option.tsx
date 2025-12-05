import { TouchableOpacity, TouchableOpacityProps, Text, ColorValue } from 'react-native'
import { styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/theme'

interface OptionProps extends TouchableOpacityProps {
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  isSelected: boolean
  selectedColor: ColorValue
}

export function Option({ title, icon, isSelected, selectedColor, ...props }: OptionProps) {
  return (
    <TouchableOpacity
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      activeOpacity={0.8}
      {...props}
    >
      <MaterialIcons name={icon} size={24} color={isSelected ? colors.white : colors.gray[500]} />
      <Text style={[styles.title, isSelected && { color: colors.white }]}>{title}</Text>
    </TouchableOpacity>
  )
}
