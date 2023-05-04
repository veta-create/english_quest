import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { setField } from "../../../redux/game-page/gameSlice";
import stuk from "../../../assets/stuk.mp3";
import { FieldsApi } from "../../../../types";
import preloader from "../../../assets/preloader.png";

export const FieldSelection: React.FC = () => {
    const dispatch = useAppDispatch();
    const [fields, setFields] = useState<FieldsApi[]>([]);
    const [allFiledSizes, setAllFieldSizes] = useState<string[]>([]);
    // all or any size
    const [filter, setFilter] = useState<string>("all");
    const stukAudio = new Audio(stuk);

    useEffect(() => {
        fetch("/api/fields")
            .then((res) => res.json())
            .then((res) => {
                setFields(res);
                const fieldSizes = [];
                for (let i = 0; i < res.length; i++) {
                    if (fieldSizes.indexOf(`${res[i].fieldWidth}${res[i].fieldHeight}`) === -1) {
                        fieldSizes.push(`${res[i].fieldWidth}${res[i].fieldHeight}`);
                    };
                };
                setAllFieldSizes(fieldSizes);
            })
            .catch((err) => console.log("Oops: " + err));
    }, []);

    return (
        <div className={cn(styles.main, "w-full", "h-full", "text-3xl", "text-white", "bg-black")}>

            <h1 className={cn("pt-10", "text-center")}>Выберите доску для игры:</h1>

            {fields.length === 0 || allFiledSizes.length === 0 ? <div className={cn("w-full", "mt-60")}><img className={cn(styles.preloaderAnimation, "ml-auto", "mr-auto")}
                src={preloader} alt="preloader" /> </div> : <div className={cn("flex", "flex-row", "justify-center")}>

                <ul className={cn("fixed", "text-center", "left-5")}>
                    <li className={cn(filter === "all" ? "text-yellow-500" : "", "cursor-pointer")}
                        onClick={() => setFilter("all")}>Все доски</li>
                    {allFiledSizes.map((s, i) => <li onClick={() => setFilter(s)}
                        className={cn(filter === s ? "text-yellow-500" : "", "cursor-pointer")} key={"0" + i}>{s[0] + " X " + s[1]}</li>)}
                </ul>

                <div className={cn("flex", "justify-around", "w-9/12", "flex-wrap")}>

                    {fields.filter(f => {
                        if (filter === "all") {
                            return f;
                        } else if (`${f.fieldWidth}${f.fieldHeight}` === filter) {
                            return f;
                        };
                    }).map((f) => <div onMouseOver={() => stukAudio.play()}
                        onClick={() =>
                            dispatch(setField({ field: f.field, themes: f.themes, fieldWidth: f.fieldWidth, fieldHeight: f.fieldHeight }))}
                        className={cn("hover:scale-110", "w-80", "p-4", "m-5", "bg-blue-900", "cursor-pointer")}>
                        <p className="text-yellow-500">Список тем:</p>
                        <ul className={cn("flex", "flex-col")}>
                            {f.themes.map((t: string) => <li className={cn("pl-4")}>{t}</li>)}
                        </ul>
                        <p className="text-yellow-500">Размер поля:</p>
                        <p className={cn("pl-4")}>{f.fieldWidth} X {Number(f.fieldHeight)}</p>
                    </div>)}

                </div>
            </div>}
        </div>
    )
};