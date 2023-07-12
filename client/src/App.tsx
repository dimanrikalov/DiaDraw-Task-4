import './App.css';
import { Api } from './Api';
import { Router } from './Router';
import { useContext, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/utils/Navbar/Navbar';
import { ApiContextProvider } from './contexts/ApiContext';
import { CountriesContext } from './contexts/CountriesContext';

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
						<ApiContextProvider api={api}>
							<Router />
						</ApiContextProvider>
					)}
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
