import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { Container, Title, Slogan } from './styles';

import backgroundImage from '../../assets/background.png'

import { Button } from '../../components/Button';

import {ANDROID_CLIENT_ID} from '@env'

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {

  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    scopes:['profile','email']
  });

  function handleGoogleSignIn() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== 'success'){
        setIsAuthenticating(false);
      }
    })
  }

  useEffect(()=>{

    if(response?.type === 'success'){
      if(response.authentication?.idToken){
        console.log('TOKEN DE AUTENTICAÇÃO =>', response.authentication.idToken);

    }else{
        Alert.alert('Entra','Não foi possível conectar-se a uma conta google.')
        setIsAuthenticating(false);
      } 
    }
  },[response]);

  return (

  <Container source={backgroundImage}>
    <Title>
    Code link
    </Title>    

    <Slogan>
    Gestão de uso de veículos
    </Slogan>

    <Button title="Entrar com o google"
    onPress={handleGoogleSignIn}
    isLoading={isAuthenticating}
    />

  </Container>
  );
}
