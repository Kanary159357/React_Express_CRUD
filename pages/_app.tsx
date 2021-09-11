import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '../lib/styles/GlobalStyle';
import { Provider } from 'react-redux';
import AppLayout from '../Layout/AppLayout';
import { store } from '../lib/store';
const MyApp = ({ Component, pageProps }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				{' '}
				<GlobalStyle />
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</Provider>
		</QueryClientProvider>
	);
};

export default MyApp;
