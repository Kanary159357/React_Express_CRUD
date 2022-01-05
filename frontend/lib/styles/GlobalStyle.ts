import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`

    html body{
        margin: 0;
        padding :0;
        height: 100%;
        width:100%;
    }

    #__next{
        height: 100%;
        width:100%;
        line-height: normal;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';

    }

    @font-face {
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';
        src: url('./fonts/SpoqaHanSansNeo-Medium.woff2') format('woff2'),
        url('./fonts/SpoqaHanSansNeo-Medium.woff') format('woff');
    }
    a{
        &,&:focus, &:active, &:visited{
            color: #333;
            text-decoration:none;
        }
    }
`;

export default GlobalStyle;
