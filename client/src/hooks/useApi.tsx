import { useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';

export const useApi = () => {
	const { api } = useContext(ApiContext);
	if (!api) {
		throw new Error('API must be defined!');
	}

	return { api };
};
