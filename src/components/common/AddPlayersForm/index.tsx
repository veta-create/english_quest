
import cn from "classNames";

const AddPlayersForm = (props) => {
    return (<>
        {<div>Игроки: {props.playersCount}</div>}
        {<div>Добавить игрока:
            {playerName.isVisited && playerName.isEmpty &&
                <div>{playerName.isEmptyErrorMessage}</div>}
            <div className={cn("flex", "flex-row")}>
                <input
                    className={cn("rounded-lg")}
                    value={playerName.value}
                    onChange={(e) => { playerName.onChange(e) }}
                    onBlur={() => { playerName.onBlur() }}
                    id="playerName"
                    name="playerName"
                    placeholder="Имя игрока" />
                <input className={cn("cursor-pointer")}
                    disabled={playerName.isEmpty}
                    type="button"
                    value="+"
                    onClick={() => {
                        props.addNewPlayer(playerName.value);
                        props.changePlayersCount();
                    }} />
            </div>
        </div>}
    </>)
};