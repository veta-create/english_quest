import styles from './styles.module.css';

const Settings = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.logo}></div>
            <div className={styles.settings}>
                <div className={styles.fieldSize} onClick={() => props.changeFieldSize()}>
                    Размер поля: {props.fieldWidth} Х {props.fieldHeight}
                </div>
                <div className={styles.playersCount} onClick={() => props.changePlayersCount()}>
                    Игроки: {props.playersCount}
                </div>
            </div>
        </div>
    )
}

export default Settings;