import { useMemo } from 'react';
import { useFetch } from './useFetch';

interface SortedEntry {
	[key: string]: string[];
}

export const useSortDataAlphabetically = () => {
	const { data, isLoading } = useFetch();

	const sortedData = useMemo(() => {
		if(isLoading) {
			return [];
		}

		const updatedResults: SortedEntry[] = [];

		data.forEach((x) => {
			const stringArr = x.name.common.toLowerCase().split('');

			stringArr.forEach((letter: string) => {
				const found = updatedResults.find(
					(x) => Object.keys(x)[0] === letter
				);

				if (found) {
					const key = Object.keys(found)[0];
					if (!found[key].includes(x.name.common)) {
						found[key] = [...found[key], x.name.common];
					}
				} else {
					updatedResults.push({
						[letter]: [x.name.common],
					});
				}
			});
		});

		return updatedResults;
	}, [data, isLoading]);

	return { sortedData, isLoading };
};
