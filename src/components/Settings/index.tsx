import React from 'react';
import { useInput } from '../../hooks/useForm';
import cn from 'classnames';

interface SettingsPropsTypes {
    changeFieldSize: () => ({ type: string }),
    changePlayersCount: () => ({ type: string }),
    addNewPlayer: (newPlayerName: string) => ({type: string, newPlayerName: string}),
    fieldWidth: number,
    fieldHeight: number,
    playersCount: number
}

const Settings: React.FC<SettingsPropsTypes> = (props) => {
    const playerName = useInput('', { isEmpty: true });

    return (
        <div className={cn("w-full", "h-full")}>
            <div></div>
            <div>
                <div className={cn("cursor-pointer")} onClick={() => props.changeFieldSize()}>
                    Размер поля: {props.fieldWidth} X {props.fieldHeight}
                </div>
                <div>
                    Игроки: {props.playersCount}
                    {playerName.isVisited && playerName.isEmpty &&
                        <div>{playerName.isEmptyErrorMessage}</div>}

                    <div className={cn("flex", "flex-row")}>
                        <input
                            value={playerName.value}
                            onChange={(e) => { playerName.onChange(e) }}
                            onBlur={() => { playerName.onBlur() }}
                            id="playerName"
                            name="playerName"
                            placeholder="Имя игрока" />
                        <input className={cn("cursor-pointer")}
                            disabled={playerName.isEmpty}
                            type="button"
                            value="Добавить игрока"
                            onClick={() => {
                                props.addNewPlayer(playerName.value);
                                props.changePlayersCount();
                            }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;