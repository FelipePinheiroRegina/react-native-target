import { FlatList, FlatListProps, StyleProp, Text, View, ViewStyle } from 'react-native'

import { styles } from './styles'
import { colors } from '@/theme'
import { Divider } from '../Divider'

interface ListProps<ItemT> extends FlatListProps<ItemT> {
  title: string
  emptyMessage?: string
  containerStyle?: StyleProp<ViewStyle>
}

export function List<ItemT>({ title, emptyMessage, containerStyle, ...props }: ListProps<ItemT>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        {...props}
        ItemSeparatorComponent={() => <Divider color={colors.gray[200]} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text style={styles.emptyList}>{emptyMessage}</Text>}
      />
    </View>
  )
}
