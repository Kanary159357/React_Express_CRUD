import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 200) => {
	const [dValue, setDValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDValue(value);
		}, 1000);
		return () => {
			clearTimeout(handler);
		};
	}, [delay, value]);

	return dValue;
};
