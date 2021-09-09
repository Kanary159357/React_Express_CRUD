import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../Layout/MainLayout';
const Wrapper = styled.div`
	min-height: 800px;
`;

const Editor = dynamic(() => import('../component/RichEditor'), {
	ssr: false,
});
const Write = () => {
	return (
		<MainLayout>
			<Wrapper>
				<Editor />
			</Wrapper>
		</MainLayout>
	);
};

export default Write;
