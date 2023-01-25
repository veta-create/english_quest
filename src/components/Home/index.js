import styles from "./styles.module.css";
import logo from "../../assets/logo.png"

const Home = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.options}>
                <nav>
                    <div className={styles.game}>Новая игра</div>
                    <div className={styles.customBoard}>Пользовательская доска</div>
                    <div className={styles.settings}>Настройки</div>
                </nav>
            </div>
        </div>
    )
};

export default Home;