import React from 'react';
import styles from './styles.module.css';

interface SettingsPropsTypes {
    changeFieldSize: () => ({type: string}),
    changePlayersCount: () => ({type: string}),
    fieldWidth: number,
    fieldHeight: number,
    playersCount: number
}

const Settings: React.FC<SettingsPropsTypes> = (props) => {
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