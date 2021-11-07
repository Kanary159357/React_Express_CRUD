import { useState, useEffect, useRef } from 'react';

export const useDebounce = (value: any, delay = 200) => {
	const [dValue, setDValue] = useState(value);
	const [debounceLoading, setDebounceLoading] = useState(false);
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) {
			setDebounceLoading(true);
			const handler = setTimeout(() => {
				setDValue(value);
				setDebounceLoading(false);
			}, 1000);
			return () => {
				clearTimeout(handler);
			};
		} else {
			didMount.current = true;
		}
	}, [delay, value]);

	return { dValue, debounceLoading };
};
