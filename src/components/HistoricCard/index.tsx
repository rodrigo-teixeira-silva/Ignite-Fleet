import {TouchableOpacityProps} from 'react-native';
import { Check, Clock, ClockClockwise } from 'phosphor-react-native'
 
import { Container, Info, LicensePlate, Departure  } from './styles';
import { useTheme } from 'styled-components';

export type HistorcCardProps ={
    id:string;
    licensePlate:string;
    created: string;
    isSync: boolean;

}

type Props = TouchableOpacityProps & {
    data: HistorcCardProps;
}

export function HistoricCard({ data, ...rest }: Props) {
    const {COLORS} = useTheme();
  return (
    <Container activeOpacity={0.7} {...rest}>
        <Info>
            <LicensePlate>
                {data.licensePlate}
            </LicensePlate>
        
        <Departure>
            {data.created}
        </Departure>
        </Info>
        
        {
            data.isSync ?
            <Check
                size={24}
                color={COLORS.BRAND_LIGHT}
            />
            :
            <ClockClockwise
            size={24}
            color={COLORS.GRAY_400}
            />
       }
    </Container>
  );
}