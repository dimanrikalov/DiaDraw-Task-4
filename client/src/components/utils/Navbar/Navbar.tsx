import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { ROUTES } from '../../../Router';

export const Navbar = () => {
	const navigate = useNavigate();
	return (
		<div>
			<nav>
				<ul className={styles.navContainer}>
					<li>
						<button onClick={() => navigate(ROUTES.HOME)}>
							Home
						</button>
					</li>
					<li>
						<button onClick={() => navigate(ROUTES.FIND_DISTANCE)}>
							Get Distance Between 2 Countries
						</button>
					</li>
					<li>
						<button
							onClick={() =>
								navigate(ROUTES.FIND_CLOSEST_NON_NEIGHBOURING)
							}
						>
							Get Closest Non-neighbouring Country
						</button>
					</li>
					<li>
						<button
							onClick={() =>
								navigate(ROUTES.FIND_COUNTRIES_WITHIN_TIMEZONES)
							}
						>
							Get All Countries Within 2 Timezones
						</button>
					</li>
					<li>
						<button
							onClick={() =>
								navigate(ROUTES.SEARCH_COUNTRIES_BY_CHARS)
							}
						>
							Get Countries By Characters
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};
