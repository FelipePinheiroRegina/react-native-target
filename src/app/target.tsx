import { View } from 'react-native'

import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Target" subTitle="Save to reach your financial goal." />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Target name" placeholder="Ex.: House, Car, Vacation, etc." />

        <CurrencyInput label="Target amount" placeholder="Ex.: 1000.00" value={0} />

        <Button>Save</Button>
      </View>
    </View>
  )
}
