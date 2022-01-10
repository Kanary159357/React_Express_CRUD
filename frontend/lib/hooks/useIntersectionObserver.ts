import { MutableRefObject, useEffect } from 'react';

function useIntersectionObserver(
	target: MutableRefObject<null>,
	fn: () => unknown
) {
	useEffect(() => {
		function callback(entries: IntersectionObserverEntry[]) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					fn();
				}
			});
		}
		const option = {
			threshold: 1,
		};
		const observer = new IntersectionObserver(callback, option);
		if (!target || !target.current) {
			return;
		}
		observer.observe(target && target.current);
		return () => {
			observer.disconnect();
		};
	}, [fn, target]);
}

export default useIntersectionObserver;
