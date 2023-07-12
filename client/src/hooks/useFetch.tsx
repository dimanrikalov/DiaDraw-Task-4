import { useEffect, useState } from 'react';

const URL = 'https://restcountries.com/v3.1/all';

export const useFetch = () => {
	const [data, setData] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(URL)
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				setData(data);
			});
	}, []);

	return { data, isLoading };
};
