import styles from './Navbar.module.css';
import { ROUTES } from '../../../Router';
import { Button } from '../Button/Button';

export const Navbar = () => {
	return (
		<div>
			<nav>
				<ul className={styles.navContainer}>
					<li>
						<Button message={'Home'} url={ROUTES.HOME} />
					</li>
					<li>
						<Button
							message={'Get Distance Between 2 Countries'}
							url={ROUTES.FIND_DISTANCE}
						/>
					</li>
					<li>
						<Button
							message={'Get Closest Non-neighbouring Country'}
							url={ROUTES.FIND_CLOSEST_NON_NEIGHBOURING}
						/>
					</li>
					<li>
						<Button
							message={'Get All Countries Within 2 Timezones'}
							url={ROUTES.FIND_COUNTRIES_WITHIN_TIMEZONES}
						/>
					</li>
					<li>
						<Button
							message={'Get Countries By Characters'}
							url={ROUTES.SEARCH_COUNTRIES_BY_CHARS}
						/>
					</li>
				</ul>
			</nav>
		</div>
	);
};
