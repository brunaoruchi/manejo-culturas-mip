import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Dashboard from '../pages/dashboard/Dashboard'
import UrDetails from '../pages/urDetails/UrDetails'
import MipDetails from '../pages/mipDetails/MipDetails'
import Mips from '../pages/mips/Mips'
import FormMip from '../pages/formMip/FormMip'
import FormSampleData from '../pages/formSampleData/FormSampleData'

export type RootStackParamList = {
  Dashboard: undefined
  UrDetails: { id: string }
  MipDetails: { id: string }
  Mips: { id: string }
  FormMip: { mipId: string, id?: string }
  FormSampleData: { urId?: string, id?: string, mipId?: string }
}
const Stack = createNativeStackNavigator<RootStackParamList>()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UrDetails" component={UrDetails} />
        <Stack.Screen name="Mips" component={Mips} />
        <Stack.Screen name="FormMip" component={FormMip} />
        <Stack.Screen name="MipDetails" component={MipDetails} />
        <Stack.Screen name="FormSampleData" component={FormSampleData} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes
