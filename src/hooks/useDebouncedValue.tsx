import { useEffect, useState } from 'react';

export const useDebouncedValue = (inputValue: string) => {
	const [debouncedValue, setDebouncedValue] = useState(inputValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(inputValue);
		}, 700);

		return () => {
			clearTimeout(handler);
		};
	}, [inputValue]);

	return debouncedValue;
};
