
import { Container, Title, Slogan } from './styles';

import backgroundImage from '../../assets/background.png'

export default function SignIn() {
  return (
    <Container sourse ={backgroundImage} >
        <Title>
            Ignite Fleet
        </Title>

        <Slogan>
            Gestão de uso de veículos
        </Slogan>
   
    </Container>
  );
}
