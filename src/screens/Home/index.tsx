import { useEffect, useState, } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useQuery } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import dayjs from 'dayjs'

import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { HistorcCardProps, HistoricCard, HistoricCards } from '../../components/HistoricCard';

import { Container, Content, Title, Label } from './styles';
import {Alert, FlatList} from 'react-native';
import { useRealm } from '../../libs/realm';



export function Home() {
  const [ vehicleInUse, setVeicleInUse ] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric ] = useState<HistorcCardProps[]>([]);

  const { navigate } = useNavigation();

  const historic = useQuery(Historic);
  const realm =useRealm();

    function handleRegisterMoviment(){
      if( vehicleInUse?._id ) {
        return navigate('arrival', { id: vehicleInUse?._id.toString()});
      } else {
        navigate('departure');
      }
    }

    function fetchVehicleInUse() {
      try{
        const vehicle = historic.filtered("status = 'departure'")[0];
        setVeicleInUse(vehicle);
      } catch(error){
        Alert.alert('Veículo em uso', 'Nãofoi possível carregar o veículo em uso.')
       console.log(error);
      }
    }

    function fetchHistoric(id: string) {
      try{
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");
      const formattedHistoric = response.map((item) => {
        return({
          id: item._id!.toString(),
          LicensePlate:item.license_plate,
          isSiync: false,
          created: dayjs(item.created_at).format('[ Saída em ] DD/MM/YYYY [ás] HH:mm')

        });
      });
      setVehicleHistoric(formattedHistoric);
    }catch(error){
      console.log(error);
      Alert.alert('Historico', 'Não foi possível carregar o histórico.')
        
    }
  
  }

  function handleHistoricDetails (id: string) {
    navigate('arrival',{id} )

  }

    useEffect(() => {
      fetchVehicleInUse();
    },[]);

    useEffect(()=>{
        realm.addListener('change',() => fetchVehicleInUse());

        return() => {
          if(realm && !realm.isClosed) {
          realm.removeListener('change', fetchVehicleInUse);
          }
        }
    }, []);

    useEffect(() => {
      fetchHistoric();
    }, [historic]);

  return (
    <Container>
       <HomeHeader />

         <Content>
            <CarStatus
             licensePlate={vehicleInUse?.license_plate}
             onPress={handleRegisterMoviment}
            />

            <Title>
              Historico
            </Title>

            <FlatList
              data={vehicleHistoric}
              keyExtractor={item => item.id}
              renderItem={({item })=>(
                <HistoricCard
                  data={item}
                  onPress={()=> handleHistoricDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100 }}
            ListEmptyComponent={(
              <Label>
                Nenhum registro de utilização de veículo
              </Label>
            )}
          />

         </Content>       
         
    </Container>
  );
}