import './App.css';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/utils/Navbar/Navbar';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<header>
					<Navbar />
				</header>
				<main>
					<Router />
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
