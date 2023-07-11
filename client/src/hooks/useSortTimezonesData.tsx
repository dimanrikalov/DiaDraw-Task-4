import { useFetch } from './useFetch';
import { useCallback, useEffect, useState } from 'react';
import {
	extractNegativeValues,
	extractNeutralValues,
	extractPositiveValues,
} from '../utils/getTimezoneValues';

interface SortedEntry {
	[key: string]: string[];
}

export const useSortTimezonesData = () => {
	const { data } = useFetch();
	const [isLoading, setIsLoading] = useState(true);
	const [sortedData, setSortedData] = useState<SortedEntry[]>([]);

	const sortTimeZoneData = useCallback(() => {
		data.forEach((country: any) => {
			country.timezones.forEach((timezone: string) => {
				const foundTimezone = sortedData.find(
					(sortedTimezone: any) =>
						Object.keys(sortedTimezone)[0] === timezone
				);
				//if there is no such timezone in the array add it and add the country name
				if (foundTimezone) {
					const sortedEntryKey = Object.keys(foundTimezone)[0];
					const sortedEntryValue = Object.values(foundTimezone)[0];

					if (!sortedEntryValue.includes(country.name.common)) {
						foundTimezone[sortedEntryKey] = [
							...foundTimezone[sortedEntryKey],
							country.name.common,
						];
					}
				} else {
					//if there is already such timezone just add the country name
					sortedData.push({ [timezone]: [country.name.common] });
				}
			});
		});

		const negativeValues = extractNegativeValues(sortedData);
		const positiveValues = extractPositiveValues(sortedData);
		const neutralValues = extractNeutralValues(sortedData); //fix UTC and UTC+00:00

		setSortedData([...negativeValues, ...neutralValues, ...positiveValues]);
		setIsLoading(false);
	}, [data]);

	useEffect(() => {
		sortTimeZoneData();
	}, [sortTimeZoneData]);

	return { sortedData, isLoading };
};
