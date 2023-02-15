import styles from "./styles.module.css";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";
import cn from "classnames";

const Home = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={cn(styles.options, "p-10", "text-5xl", "text-center")}>
                <nav className={cn("flex", "flex-col")}>
                    <NavLink to="/game" className={styles.game}>Новая игра</NavLink>
                    <NavLink to="/custom" className={styles.customBoard}>Пользовательская доска</NavLink>
                    <NavLink to="/settings" className={styles.settings}>Настройки</NavLink>
                </nav>
            </div>
        </div>
    )
};

export default Home;