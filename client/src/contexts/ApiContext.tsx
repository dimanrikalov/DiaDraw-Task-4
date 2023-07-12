import { Api } from '../Api';
import { createContext } from 'react';

interface ApiContext {
	api: Api | undefined;
}

export const ApiContext = createContext<ApiContext>({ api: undefined });

export const ApiContextProvider = ({
	api,
	children,
}: {
	api: Api;
	children: React.ReactElement;
}) => {
	return (
		<ApiContext.Provider value={{ api: api }}>
			{children}
		</ApiContext.Provider>
	);
};
