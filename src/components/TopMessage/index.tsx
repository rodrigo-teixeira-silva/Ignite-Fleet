import { useTheme } from 'styled-components/native';
import { IconBoxProps } from '../ButtonIcon';

//Import {IconProps} = (props: IconProps) => JSX.Element;
//type IconBoxProps = (props: IconProps) => JSX.Element;

import { Container, Title } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  icon?: IconBoxProps
  title: string;
}

export function TopMessage({title, icon: Icon}: Props) {
    const { COLORS } = useTheme();
    const insents = useSafeAreaInsets();

    const paddingTop = insents.top + 5;
     
  return (
    <Container style={{ paddingTop }}>
        {
            Icon &&
            <Icon
            size={18}
            color={COLORS.GRAY_100}
            />
        }

        <Title>
            {title}
        </Title>
    </Container>
  );
}