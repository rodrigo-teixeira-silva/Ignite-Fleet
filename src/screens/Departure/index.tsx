import { useRef } from 'react';
import { TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { LicenseplateInput } from '../../components/LicenseplateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import { Container, Content } from './styles';

const keyBoardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position'; 

export function Departure() {

  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister(){
  console.log("OK!");
  }

  return (
    <Container>
      <Header title="Saída"/>
      <KeyboardAvoidingView behavior={ keyBoardAvoidingViewBehavior }>
      <ScrollView>
        <Content>
          <LicenseplateInput
              label="Placa do veículo"
              placeholder='BRA1234'
              onSubmitEditing={()=>descriptionRef.current?.focus()}
              returnKeyType='next'
              />
              
          <TextAreaInput 
            ref={descriptionRef}
            label='Finalidade'
            placeholder='Vou utilizar o veículo para...'
            onSubmitEditing={handleDepartureRegister}
            returnKeyType='send'
            blurOnSubmit
          /> 

          <Button
            title='Registrar saída'
          />
        </Content>
      </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}