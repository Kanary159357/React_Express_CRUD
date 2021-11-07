import { MutableRefObject, useEffect } from 'react';
import { useRef } from 'react';

function useIntersectionObserver(target: MutableRefObject<any>, fn: Function) {
	useEffect(() => {
		function callback(
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver
		) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					fn();
				}
			});
		}
		let option = {
			threshold: 1,
		};
		let observer = new IntersectionObserver(callback, option);
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
