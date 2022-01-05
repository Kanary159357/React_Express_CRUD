import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '../lib/styles/GlobalStyle';
import AppLayout from '../Layout/AppLayout';
import { store, wrapper } from '../lib/store';
import { Hydrate } from 'react-query/hydration';
import { useState } from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { injectStoreToInterceptor } from '../lib/utils/serverLessAPI';

injectStoreToInterceptor(store);

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				{' '}
				<GlobalStyle />
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</Hydrate>
		</QueryClientProvider>
	);
};

export default wrapper.withRedux(MyApp);
