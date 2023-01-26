import styles from "./styles.module.css";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";

const Home = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.options}>
                <nav>
                    <NavLink to="/game" className={styles.game}>Новая игра</NavLink>
                    <NavLink to="/custom" className={styles.customBoard}>Пользовательская доска</NavLink>
                    <NavLink to="/settings" className={styles.settings}>Настройки</NavLink>
                </nav>
            </div>
        </div>
    )
};

export default Home;