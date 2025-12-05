import { styles } from './styles'
import { ColorValue, View } from 'react-native'

export function Divider({ color }: { color: ColorValue }) {
  return <View style={[styles.container, { backgroundColor: color }]} />
}
