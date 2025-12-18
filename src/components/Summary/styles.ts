import { colors, fontFamily } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
  amount: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },

  left: {
    justifyContent: 'flex-start',
  },

  right: {
    justifyContent: 'flex-end',
  },
})
