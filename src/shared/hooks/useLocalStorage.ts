import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface IUseLocalStorage<T> {
	key: string;
	defaultValue: T;
}

/** Хук для записи/чтения данных из localStorage */
export function useLocalStorage<T>({
	defaultValue,
	key
}: IUseLocalStorage<T>): [T, Dispatch<SetStateAction<T>>, boolean] {
	const [isLoading, setIsLoading] = useState(true);

	const isMounted = useRef(false);
	const [value, setValue] = useState<T>(defaultValue);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);

			if (item) {
				setValue(JSON.parse(item));
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}

		return () => {
			isMounted.current = false;
		};
	}, [key]);

	useEffect(() => {
		isMounted.current
			? window.localStorage.setItem(key, JSON.stringify(value))
			: (isMounted.current = true);
	}, [key, value]);

	return [value, setValue, isLoading];
}
