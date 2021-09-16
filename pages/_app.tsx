import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '../lib/styles/GlobalStyle';
import { Provider } from 'react-redux';
import AppLayout from '../Layout/AppLayout';
import { store } from '../lib/store';
import { Hydrate } from 'react-query/hydration';
import { useState } from 'react';

const MyApp = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Provider store={store}>
					{' '}
					<GlobalStyle />
					<AppLayout>
						<Component {...pageProps} />
					</AppLayout>
				</Provider>
			</Hydrate>
		</QueryClientProvider>
	);
};

export default MyApp;
