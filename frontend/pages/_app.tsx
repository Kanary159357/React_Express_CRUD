import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from '../lib/styles/GlobalStyle';
import AppLayout from '../Layout/AppLayout';
import { store, wrapper } from '../lib/store';
import { Hydrate } from 'react-query/hydration';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { injectStoreToInterceptor } from '../lib/utils/serverLessAPI';

injectStoreToInterceptor(store);

interface PageProps {
	dehydratedState: unknown;
}

interface MyAppProps extends AppProps<PageProps> {
	pageProps: PageProps;
}
const MyApp = ({ Component, pageProps }: MyAppProps) => {
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
