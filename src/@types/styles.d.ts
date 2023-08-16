import 'styled-components';
import theme from '../theme';

declare module 'style-components'{
    type ThemeType = typeof theme;

    export interface defaultTheme extends ThemeType{}
}