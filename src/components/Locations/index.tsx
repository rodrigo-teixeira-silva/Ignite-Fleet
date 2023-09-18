import {Car, FlagCheckered} from  'phosphor-react-native';
import { LocationInfo, LocationInfoProps} from '../locationInfo'
import { Container, Line } from './style';

type Props = {
    departure: LocationInfoProps;
    arrival?: LocationInfoProps | null;
}

export function Locations({departure, arrival = null}: Props){
    return (
        <Container>
            <LocationInfo
              icon={Car}
              label={departure.label}
              description={departure.description} 
              
            />

            {
                arrival && 
               <>
                  <Line />

            <LocationInfo
              icon={FlagCheckered}
              label={arrival.label}
              description={arrival.description} 
              
              />
         </>
      }
        </Container>
    )
}