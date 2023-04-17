import styles from "./styles.module.css";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";
import cn from "classnames";
import React from "react";
import SettingsContainer from "../Settings/container";

interface HomePropsTypes {
    changeSettingsOpen: (settingsOpen: boolean) => ({ type: string, settingsOpen: boolean }),
    settingsOpen: boolean
};

const Home: React.FC<HomePropsTypes> = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            {props.settingsOpen ? <SettingsContainer /> :
                <div className={cn("p-10", "text-5xl", "text-center")}>
                    <nav className={cn("flex", "flex-col")}>
                        <NavLink to="/game">Новая игра</NavLink>
                        <NavLink to="/custom">Пользовательская доска</NavLink>
                        <div className={cn(styles.settings, "text-white", "cursor-pointer")}
                            onClick={() => {
                                console.log("click")
                                props.changeSettingsOpen(true)}}>Настройки</div>
                    </nav>
                </div>
            }
        </div>
    );
};

export default Home;