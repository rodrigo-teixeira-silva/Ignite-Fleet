import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Realm, useApp} from '@realm/react'

import { Container, Title, Slogan } from './styles';

import backgroundImage from '../../assets/background.png'

import { Button } from '../../components/Button';

import {ANDROID_CLIENT_ID} from '@env';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const app=useApp();

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ['profile','email']
  });
  
  function handleGoogleSignIn() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== "success") {
        setIsAuthenticating(false);
      }
    })
  }

  useEffect(()=>{
    if(response?.type === 'success'){
      if(response.authentication?.idToken){
       
/*        ## para guardar os dados do lado da aplicação       
  fetch(`http://www.googleapis.com.oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`)
  .then(response => response.json())
  .then(console.log);*/

   const credentials = Realm.Credentials.jwt(response.authentication.idToken);
  
   app.logIn(credentials).catch((error) => {
    console.log(error);
    Alert.alert('Entra','Não foi possível conectar-se a uma conta google.')
    setIsAuthenticating(false);
   });

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

    <Button title = "Entrar com o google"
    onPress={handleGoogleSignIn}
    isLoading={isAuthenticating}
    />

  </Container>
  );
}
