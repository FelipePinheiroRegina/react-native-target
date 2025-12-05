import { View, Text, TouchableOpacity } from 'react-native'

import { styles } from './styles'
import { colors } from '@/theme'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

interface PageHeaderProps {
  title: string
  subTitle?: string
  rightButton?: {
    icon: keyof typeof MaterialIcons.glyphMap
    onPress: () => void
  }
}

export function PageHeader({ title, subTitle, rightButton }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.black} />
        </TouchableOpacity>

        {rightButton && (
          <TouchableOpacity onPress={rightButton.onPress}>
            <MaterialIcons name={rightButton.icon} size={24} color={colors.gray[500]} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  )
}
