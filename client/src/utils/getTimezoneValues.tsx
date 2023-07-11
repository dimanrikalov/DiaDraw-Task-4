interface SortedEntry {
	[key: string]: string[];
}

export const extractNeutralValues = (
	arr: SortedEntry[]
): SortedEntry => {
	const UTC = arr.find((x) => Object.keys(x)[0] === 'UTC');
	const UTC0 = arr.find((x) => Object.keys(x)[0] === 'UTC+00:00');

	if(!UTC || !UTC0) {
		return {};
	}

	return {
		[Object.keys(UTC)[0]]: [
			...Object.values(UTC)[0],
			...Object.values(UTC0)[0],
		],
	};
};

export const extractPositiveValues = (arr: { [key: string]: string[] }[]) : SortedEntry[] =>
	arr
		.filter((x) => Object.keys(x)[0].includes('+'))
		.filter((x) => Object.keys(x)[0] !== 'UTC+00:00')
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

export const extractNegativeValues = (arr: { [key: string]: string[] }[])  : SortedEntry[] =>
	arr
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
