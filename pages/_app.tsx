import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '../lib/styles/GlobalStyle';
import { Provider } from 'react-redux';
import AppLayout from '../Layout/AppLayout';
const MyApp = ({ Component, pageProps }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{' '}
			<GlobalStyle />
			<AppLayout>
				<Component {...pageProps} />
			</AppLayout>
		</QueryClientProvider>
	);
};

export default MyApp;
