export interface Country {
	name: { common: string };
	borders?: string[];
	timezones: string[];
	cca3: string;
	latlng: [number, number];
}

interface SortedEntry {
	[key: string]: string[];
}

export interface ClosestNonNeighbouringCountry {
	distance: string;
	country: string;
}

export class Api {
	private earthRadius = 6371;
	readonly countries: Country[];

	constructor(data: Country[]) {
		this.countries = data;
	}

	findDistance(
		countryOne: Country | undefined,
		countryTwo: Country | undefined
	) {
		if (!countryOne) {
			throw new Error('Invalid 3-digit code for country one');
		}
		if (!countryTwo) {
			throw new Error('Invalid 3-digit code for country two');
		}

		const lat1 = countryOne.latlng[0];
		const lng1 = countryOne.latlng[1];
		const lat2 = countryTwo.latlng[0];
		const lng2 = countryTwo.latlng[1];

		const toRadians = (angle: number) => angle * (Math.PI / 180);

		const dLat = toRadians(lat2 - lat1);
		const dLng = toRadians(lng2 - lng1);

		//Haversine formula (calculating distance between 2 points on a sphere)

		//square of half the chord length between two points on a sphere
		const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos(toRadians(lat1)) *
				Math.cos(toRadians(lat2)) *
				Math.sin(dLng / 2) ** 2;

		//angular distance between two points on a sphere
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = this.earthRadius * c;

		return distance.toFixed(2);
	}

	findClosestNonNeighbouringCountry(
		countryName: string
	): ClosestNonNeighbouringCountry {
		const country = this.countries.find(
			(x) => x.name.common === countryName
		);
		if (!country) {
			throw new Error('Country not found!');
		}
		let smallestDistance: string | null = null;
		let closestCountry: string | null = null;

		this.countries
			.filter((x) => {
				if (
					!x.borders?.includes(country.cca3) &&
					x.name.common !== country.name.common
				) {
					return x;
				}
			})
			.forEach((x) => {
				const currDistance = this.findDistance(country, x);
				if (
					!smallestDistance ||
					Number(currDistance) < Number(smallestDistance)
				) {
					smallestDistance = currDistance;
					closestCountry = x.name.common;
				}
			});

		if (!smallestDistance || !closestCountry) {
			throw new Error('No country found!');
		}

		return { distance: smallestDistance, country: closestCountry };
	}

	sortCountriesByCharacters(): SortedEntry[] {
		const countriesAlphabeticMap: SortedEntry[] = [];

		this.countries.forEach((x) => {
			const stringArr = x.name.common.toLowerCase().split('');

			stringArr.forEach((letter: string) => {
				const found = countriesAlphabeticMap.find(
					(x) => Object.keys(x)[0] === letter
				);

				if (found) {
					const key = Object.keys(found)[0];
					if (!found[key].includes(x.name.common)) {
						found[key].push(x.name.common);
					}
				} else {
					countriesAlphabeticMap.push({
						[letter]: [x.name.common],
					});
				}
			});
		});

		return countriesAlphabeticMap;
	}

	findCountriesByCharacters(input: string): string[] {
		const alphabeticallySortedCountries = this.sortCountriesByCharacters();

		const matchingEntry = alphabeticallySortedCountries.find(
			(x) => input[0] === Object.keys(x)[0]
		);
		if (matchingEntry) {
			if (input.length > 1) {
				const matchingCountries = Object.values(
					matchingEntry
				)[0].filter((x: string) => {
					return x.toLowerCase().includes(input.toLowerCase());
				});

				return matchingCountries;
			}

			return matchingEntry[input[0]];
		}
		throw new Error('No countries fit the requirement!');
	}

	findCountriesByTimezones(
		inputTimezoneOne: string,
		inputTimezoneTwo: string
	): string[] {
		const countriesSortedByTimezones = this.sortCountriesByTimezones();

		const indexOne = countriesSortedByTimezones.findIndex(
			(x: SortedEntry) => Object.keys(x)[0] === inputTimezoneOne
		);
		const indexTwo = countriesSortedByTimezones.findIndex(
			(x: SortedEntry) => Object.keys(x)[0] === inputTimezoneTwo
		);
		if (indexOne === -1 || indexTwo === -1) {
			throw new Error('Enter valid timezones!');
		}

		return Array.from(
			new Set(
				countriesSortedByTimezones
					.slice(
						Math.min(indexOne, indexTwo),
						Math.max(indexOne, indexTwo) + 1
					)
					.flatMap((x) => Object.values(x)[0])
			)
		);
	}

	private sortCountriesByTimezones(): SortedEntry[] {
		const dataToBeSorted: SortedEntry[] = [];

		this.countries.forEach((country: any) => {
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

		const negativeValues = this.extractNegativeValues(dataToBeSorted);
		const positiveValues = this.extractPositiveValues(dataToBeSorted);
		const neutralValues = this.extractNeutralValues(dataToBeSorted);

		return [...negativeValues, neutralValues, ...positiveValues];
	}

	private extractNeutralValues(arr: SortedEntry[]): SortedEntry {
		const UTC = arr.find((x) => Object.keys(x)[0] === 'UTC');
		const UTC0 = arr.find((x) => Object.keys(x)[0] === 'UTC+00:00');

		if (!UTC || !UTC0) {
			return {};
		}

		return {
			[Object.keys(UTC)[0]]: [
				...Object.values(UTC)[0],
				...Object.values(UTC0)[0],
			],
		};
	}

	private extractPositiveValues(arr: SortedEntry[]): SortedEntry[] {
		return arr
			.filter(
				(x) =>
					Object.keys(x)[0].includes('+') &&
					Object.keys(x)[0] !== 'UTC+00:00'
			)
			.sort((a, b) => {
				const utcA = Object.keys(a)[0];
				const utcB = Object.keys(b)[0];

				if (utcA > utcB) {
					return 1;
				} else if (utcA < utcB) {
					return -1;
				}
				return 0;
			});
	}

	private extractNegativeValues(arr: SortedEntry[]): SortedEntry[] {
		return arr
			.filter((x) => Object.keys(x)[0].includes('-'))
			.sort((a, b) => {
				const utcA = Object.keys(a)[0];
				const utcB = Object.keys(b)[0];

				if (utcA < utcB) {
					return 1;
				} else if (utcA > utcB) {
					return -1;
				}
				return 0;
			});
	}
}
