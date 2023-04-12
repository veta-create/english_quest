import cn from "classnames";
import { useInput } from "../../../hooks/useForm";
import React, { useState } from "react";
import styles from './styles.module.css';

interface AddPlayersFormPropsTypes {
    addNewPlayers: (newPlayers: Array<string>) => ({ type: string, newPlayers: Array<string> }),
    playersCount: number
};

export const AddPlayersForm: React.FC<AddPlayersFormPropsTypes> = (props) => {
    const playerName = useInput('', { isEmpty: true });
    const [newPLayers, setNewPlayers] = useState<Array<string>>([]);
    const [playersCount, setPlayersCount] = useState<number>(0);
    return (
        <div className={cn(styles.main, "table", "w-full", "h-full", "bg-black")}>
            <div className={cn("table-cell", "align-middle")}>
                <div
                    className={cn("flex", "flex-col", "justify-around", "w-1/3", "h-80", "ml-auto", "mr-auto", "p-6", "text-4xl", "text-white", "bg-blue-900")}>
                    <div>Игроки: {playersCount}</div>
                    <div>Добавить игрока:
                        {playerName.isVisited && playerName.isEmpty && playersCount === 0 &&
                            <div>{playerName.isEmptyErrorMessage}</div>}
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
                                        setNewPlayers([playerName.value])
                                    } else {
                                        setNewPlayers([...newPLayers, playerName.value])
                                    };
                                    setPlayersCount(playersCount + 1);
                                    playerName.clear();
                                }} />
                        </div>
                    </div>
                    <input
                        disabled={!playersCount}
                        onClick={() => props.addNewPlayers(newPLayers)}
                        className={cn(styles.goButton, "w-28", "self-center", "cursor-pointer", "text-center")}
                        type="button"
                        value="Начать" />
                </div>
            </div>
        </div>)
};