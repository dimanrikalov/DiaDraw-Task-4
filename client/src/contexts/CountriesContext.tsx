import { Country } from '../Api';
import { createContext } from 'react';
import { useEffect, useState } from 'react';

const URL = 'https://restcountries.com/v3.1/all';

interface CountriesContext {
	countriesData: Country[] | undefined;
}

export const CountriesContext = createContext<CountriesContext>({
	countriesData: undefined,
});

export const CountriesProvider = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const [countriesData, setCountriesData] = useState<Country[]>([]);

	useEffect(() => {
		fetch(URL)
			.then((res) => res.json())
			.then((data) => {
				setCountriesData(data);
			});
	}, [setCountriesData]);

	return (
		<CountriesContext.Provider value={{ countriesData: countriesData }}>
			{children}
		</CountriesContext.Provider>
	);
};
