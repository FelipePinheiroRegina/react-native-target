import { colors, fontFamily } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: 42,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 8,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[500],
  },
})
