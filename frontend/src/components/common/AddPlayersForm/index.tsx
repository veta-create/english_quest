import cn from "classnames";
import { useInput } from "../../../hooks/useForm";
import React, { useState } from "react";
import styles from './styles.module.css';
import { useAppDispatch } from "../../../hooks/useDispatch";
import { addNewPlayers } from "../../../redux/game-page/gameSlice";

export const AddPlayersForm: React.FC = () => {
    const playerName = useInput('', { isEmpty: true });
    const [newPLayers, setNewPlayers] = useState<Array<string>>([]);
    const [playersCount, setPlayersCount] = useState<number>(0);
    const dispatch = useAppDispatch();
    return (
        <div className={cn(styles.main, "table", "w-full", "h-full", "bg-black")}>
            <div className={cn("table-cell", "align-middle")}>
                <div
                    className={cn("flex", "flex-col", "justify-around", "w-1/3", "h-80", "ml-auto", "mr-auto", "p-6", "text-4xl", "text-white", "bg-blue-900")}>
                    <div>Игроки: {playersCount}</div>
                    <div>Добавить игрока:
                        {playerName.isVisited && playerName.isEmpty && playersCount === 0 &&
                            <div className={cn("text-yellow-500")}>{playerName.isEmptyErrorMessage}</div>}
                        <div className={cn("flex", "flex-row", "p-4")}>
                            <input
                                className={cn(styles.playerNameInput,
                                    "rounded-xl",
                                    "w-80", "h-14",
                                    "text-3xl", "text-center", "text-black",
                                    "bg-gray-300",
                                    "border-none")}
                                value={playerName.value}
                                onChange={(e) => { playerName.onChange(e) }}
                                onBlur={() => { playerName.onBlur() }}
                                id="playerName"
                                name="playerName"
                                placeholder="Имя игрока" />
                            <input
                                className={cn("cursor-pointer", "w-14", "h-14", "ml-8", "border-4", "border-solid", "border-yellow-600", "rounded-2xl")}
                                disabled={playerName.isEmpty}
                                type="button"
                                value="+"
                                onClick={() => {
                                    if (newPLayers.length === 0) {
                                        setNewPlayers([playerName.value]);
                                        setPlayersCount(playersCount + 1);
                                    } else {
                                        if (playersCount === 5) {
                                            alert("В игру нельзя ввести больше 5 игроков");
                                        } else {
                                            if (newPLayers.find(p => p === playerName.value)) {
                                                alert("Такой игрок уже существует, выберите другое имя, пожалуйста");
                                            } else {
                                                setNewPlayers([...newPLayers, playerName.value]);
                                                setPlayersCount(playersCount + 1);
                                            };
                                        };
                                    };
                                    playerName.clear();
                                }} />
                        </div>
                    </div>
                    <input
                        disabled={!playersCount}
                        onClick={() => dispatch(addNewPlayers(newPLayers))}
                        className={cn(styles.goButton, "w-28", "self-center", "cursor-pointer", "text-center")}
                        type="button"
                        value="Начать" />
                </div>
            </div>
        </div>)
};