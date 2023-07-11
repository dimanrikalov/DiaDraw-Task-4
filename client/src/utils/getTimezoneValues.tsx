export const extractNeutralValues = (arr: { [key: string]: string[] }[]) =>
	arr.filter(
		(x) =>
			!Object.keys(x)[0].includes('+') && !Object.keys(x)[0].includes('-')
	);

export const extractPositiveValues = (arr: { [key: string]: string[] }[]) =>
	arr
		.filter((x) => Object.keys(x)[0].includes('+'))
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

export const extractNegativeValues = (arr: { [key: string]: string[] }[]) =>
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
