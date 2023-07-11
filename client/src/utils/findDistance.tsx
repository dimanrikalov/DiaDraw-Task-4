export const findDistance = (countryOne: any, countryTwo: any) => {
	const earthRadius = 6371;

	if (!countryOne) {
		return 'Invalid 3-digit code for country one!';
	}
	if (!countryTwo) {
		return 'Invalid 3-digit code for country two!';
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
	const distance = earthRadius * c;

	return distance.toFixed(2);
};
