import styles from "./styles.module.css";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";
import cn from "classnames";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useDispatch";
import { changeSettingsOpen, setTimer } from "../../redux/settings-page/settingsSlice";
import { useAppSelector } from "../../hooks/useSelector";
import { RootState } from "../../redux/store";
import Settings from "../Settings";
import theme from "../../assets/theme.mp3";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const settingsOpen = useAppSelector((state: RootState) => state.settingsPage.settingsOpen);
    const themeAudio = new Audio(theme);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((res) => dispatch(setTimer(res[0].timer)))
            .catch((err) => console.log("Oops: " + err));
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.logo} onClick={() => themeAudio.play()}>
                <img src={logo} alt="logo" />
            </div>
            {settingsOpen ? <Settings /> :
                <div className={cn("p-10", "text-5xl", "text-center")}>
                    <nav className={cn("flex", "flex-col")}>
                        <NavLink to="/game">Новая игра</NavLink>
                        <NavLink to="/custom">Пользовательская доска</NavLink>
                        <div className={cn(styles.settings, "text-white", "cursor-pointer")}
                            onClick={() => dispatch(changeSettingsOpen(true))}>Настройки</div>
                    </nav>
                </div>
            }
        </div>
    );
};

export default Home;