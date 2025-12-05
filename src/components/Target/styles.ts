import { colors, fontFamily } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    gap: 7,
  },
  name: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  status: {
    fontSize: 10,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
})
