import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Arrival } from '../screens/Arrival';
import { Departure } from '../screens/Departure';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen
            name="home"
            component={Home}
            />

            <Screen
            name="departure"
            component={Departure}
            />

            <Screen
            name="arrival"
            component={Arrival}
            />
        </Navigator>

    );

}