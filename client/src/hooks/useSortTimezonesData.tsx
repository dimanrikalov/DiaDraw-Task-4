import { useFetch } from './useFetch';
import { useMemo, useState } from 'react';
import {
	extractNegativeValues,
	extractNeutralValues,
	extractPositiveValues,
} from '../utils/getTimezoneValues';

interface SortedEntry {
	[key: string]: string[];
}

export const useSortTimezonesData = () => {
	const { data, isLoading } = useFetch();

	const sortedData = useMemo(() => {
		if(isLoading) {
			return [];
		}

		const dataToBeSorted: SortedEntry[] = [];

		data.forEach((country: any) => {
			country.timezones.forEach((timezone: string) => {
				const foundTimezone = dataToBeSorted.find(
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
					dataToBeSorted.push({ [timezone]: [country.name.common] });
				}
			});
		});

		const negativeValues = extractNegativeValues(dataToBeSorted);
		const positiveValues = extractPositiveValues(dataToBeSorted);
		const neutralValues = extractNeutralValues(dataToBeSorted);

		return [...negativeValues, neutralValues, ...positiveValues];
	}, [data, isLoading]);

	return { sortedData, isLoading };
};
