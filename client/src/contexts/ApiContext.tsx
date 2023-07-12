import { createContext } from 'react';
import { Api } from '../Api';

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
