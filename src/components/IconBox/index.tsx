import { IconProps } from 'phosphor-react-native'; 
import { useTheme } from 'styled-components';

import { Container, SizeProps } from './styles';


export type IconBoxProps = ( props:IconProps ) => JSX.Element;

type Props = {
    size?: SizeProps;
    icon: IconBoxProps;
}

export function IconBox({ size = 'NORMAL', icon: Icon}: Props) {
  const { COLORS } = useTheme();
  const iconSize = size === 'NORMAL' ? 24 : 16;

  return (
  <Container Size={size}>
    <Icon
      size={ iconSize }
      color={ COLORS.BRAND_LIGHT }
    />
  </Container>
  );
}