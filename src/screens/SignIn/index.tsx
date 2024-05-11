import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Realm, useApp} from '@realm/react'
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID,} from '@env';

import { Container, Title, Slogan } from './styles';
import backgroundImage from '../../assets/background.png'
import { Button } from '../../components/Button';

//import {ANDROID_CLIENT_ID} from '@env';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID

})

//WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isAutenticating, setIsAuthenticanting] = useState(false)
  const app = useApp()

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticanting(true)

      const { idToken } = await GoogleSignin.signIn()

      if(idToken) {
        const credentials = Realm.Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        Alert.alert('Entrar', "Não foi possível conectar-se a sua conta google.")
        setIsAuthenticanting(false)  
      }

    } catch (error) {
      console.log(error)
      Alert.alert('Entrar', "Não foi possível conectar-se a sua conta google.")
      setIsAuthenticanting(false)
    }
  }

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
      isLoading={isAutenticating}
    />

  </Container>
  );
}
