import './App.css';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/utils/Navbar/Navbar';

function App() {
	return (
		<div className="App">
			<header>
				<Navbar />
			</header>
			<main>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</main>
		</div>
	);
}

export default App;
