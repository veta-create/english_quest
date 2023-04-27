import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.css"
import { useAppDispatch } from "../../../hooks/useDispatch";
import { setField } from "../../../redux/game-page/gameSlice";
import stuk from "../../../assets/stuk.mp3";

export const FieldSelection: React.FC = () => {
    const dispatch = useAppDispatch();
    const [fields, setFields] = useState([]);
    const stukAudio = new Audio(stuk);

    useEffect(() => {
        fetch("/api/fields")
            .then((res) => res.json())
            .then((res) => setFields(res))
            .catch((err) => console.log("Oops: " + err));
    }, []);

    if (fields.length === 0) {
        return (<p className={cn("text-black")}>Loading...</p>)
    };

    return (
        <div className={cn(styles.main, "w-full", "h-full", "text-3xl", "text-white", "bg-black")}>
            <h1 className={cn("pt-10", "text-center")}>Выберите доску для игры:</h1>
            <div className={cn("flex", "justify-around")}>
                {fields.map((f) => <div onMouseOver={() => stukAudio.play()}
                    onClick={() =>
                        dispatch(setField({ field: f.field, themes: f.themes, fieldWidth: f.fieldWidth, fieldHeight: f.fieldHeight }))}
                    className={cn("hover:scale-110", "w-80", "p-4", "h-60", "m-5", "bg-blue-900", "cursor-pointer")}>
                    <p className="text-yellow-500">Список тем:</p>
                    <ul className={cn("flex", "flex-col")}>
                        {f.themes.map((t: string) => <li className={cn("pl-4")}>{t}</li>)}
                    </ul>
                    <p className="text-yellow-500">Размер поля:</p>
                    <p className={cn("pl-4")}>{f.fieldWidth} X {f.fieldHeight}</p>
                </div>)}
            </div>
        </div>
    )
};