import './App.css';
import { Api } from './Api';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/utils/Navbar/Navbar';
import { useContext, useMemo, createContext } from 'react';
import { CountriesContext } from './contexts/CountriesContext';

interface ApiContext {
	api: Api | undefined;
}

export const ApiContext = createContext<ApiContext>({ api: undefined });

function App() {
	const { countriesData } = useContext(CountriesContext);

	const api = useMemo(() => {
		if (!countriesData) {
			return undefined;
		}
		return new Api(countriesData);
	}, [countriesData, Api]); //should i pass Api too?

	return (
		<div className="App">
			<BrowserRouter>
				<header>
					<Navbar />
				</header>
				<main>
					{!api ? (
						<h1>Fetching data...</h1>
					) : (
						<ApiContext.Provider value={{ api: api }}>
							<Router />
						</ApiContext.Provider>
					)}
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
