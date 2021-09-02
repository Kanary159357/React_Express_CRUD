import 'antd/dist/antd.css';
import GlobalStyle from '../lib/styles/GlobalStyle';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			{' '}
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
