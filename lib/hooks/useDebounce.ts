import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 200) => {
	const [dValue, setDValue] = useState(value);
	const [debounceLoading, setDebounceLoading] = useState(false);
	useEffect(() => {
		setDebounceLoading(true);
		const handler = setTimeout(() => {
			setDValue(value);
			setDebounceLoading(false);
		}, 1000);
		return () => {
			clearTimeout(handler);
		};
	}, [delay, value]);

	return { dValue, debounceLoading };
};
