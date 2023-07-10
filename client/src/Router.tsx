import { useRoutes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { FindDistance } from './components/FindDistance/FindDistance';
import { FindByTimezones } from './components/FindByTimezones/FindByTimezones';
import { SearchByCharacters } from './components/SearchByCharacters/SearchByCharacters';
import { ClosestNonNeighbouring } from './components/ClosestNonNeighbouring/ClosestNonNeighbouring';

export enum ROUTES {
	HOME = '/',
	FIND_DISTANCE = '/find-distance',
	SEARCH_COUNTRIES_BY_CHARS = '/search-countries-by-chars',
	FIND_COUNTRIES_WITHIN_TIMEZONES = '/find-countries-within-timezones',
	FIND_CLOSEST_NON_NEIGHBOURING = '/find-closest-non-neighbouring-country',
}

export const Router = () => {
	const router = useRoutes([
		{
			path: ROUTES.HOME,
			element: <Home />,
		},
		{
			path: ROUTES.FIND_DISTANCE,
			element: <FindDistance />,
		},
		{
			path: ROUTES.FIND_CLOSEST_NON_NEIGHBOURING,
			element: <ClosestNonNeighbouring />,
		},
		{
			path: ROUTES.FIND_COUNTRIES_WITHIN_TIMEZONES,
			element: <FindByTimezones />,
		},
		{
			path: ROUTES.SEARCH_COUNTRIES_BY_CHARS,
			element: <SearchByCharacters />,
		},
	]);

	return router;
};
