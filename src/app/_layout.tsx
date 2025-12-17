import { Suspense } from 'react'
import { Stack } from 'expo-router'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import { colors } from '@/theme/colors'
import { Loading } from '@/components/Loading'
import { migrate } from '@/database/migrate'
import { SQLiteProvider } from 'expo-sqlite'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="react-native-target.db" onInit={migrate} useSuspense>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white } }} />
      </SQLiteProvider>
    </Suspense>
  )
}
