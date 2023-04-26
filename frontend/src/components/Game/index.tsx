import cn from 'classnames';
import Cell from '../common/Cell';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AddPlayersForm } from '../common/AddPlayersForm';
import RadioForm from '../common/RadioForm';
import { useAppSelector } from '../../hooks/useSelector';
import { RootState } from '../../redux/store';
import GameOver from '../common/GameOver';
import { FieldSelection } from '../common/FieldSelection';

const Game: React.FC = () => {
    const currentPlayer = useAppSelector((state: RootState) => state.gamePage.currentPlayer);
    const gameOver = useAppSelector((state: RootState) => state.gamePage.gameOver);
    const field = useAppSelector((state: RootState) => state.gamePage.field);
    const players = useAppSelector((state: RootState) => state.gamePage.players);
    const questionIsClosed = useAppSelector((state: RootState) => state.gamePage.questionIsClosed);
    const themes = useAppSelector((state: RootState) => state.gamePage.themes);

    if (players[0].key === "test") {
        return <AddPlayersForm />;
    };

    if(field.length === 0) {
        return <FieldSelection />
    }

    if (gameOver) {
        return <GameOver />;
    };

    return (
        <div className={cn("h-full", "grid", "grid-cols-[8fr_2fr]", "bg-black")}>
            <div>
                <div>
                    <nav className={cn("flex", "flex-row", "text-white", "font-bold", "text-center")}>{themes.map((t, i) => {
                        return <Cell key={"0" + i} cellType="none" content={t} />
                    })}
                    </nav>
                </div>
                {field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={cn("flex", "flex-row")}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            cellType="playCell" />
                    )}
                    </div>
                    rows.push(row);
                    return rows;
                })}
            </div>
            <div className={cn("flex", "col-span-1")}>
                <div className={cn("h-4/6", "flex", "flex-col", "justify-around", "text-5xl", "font-bold", "text-yellow-600")}>
                    {players.map(p => <div key={p.key}
                        className={p.key === currentPlayer ? cn("text-white") : ""}>
                        <div>{p.name} {p.key === currentPlayer ? "#" : ""}</div>
                        <div>{p.score}</div>
                    </div>)}
                    <NavLink to="/" className={cn("ml-auto", "mr-auto", "text-4xl")}>На главную</NavLink>
                </div>
            </div>
            {questionIsClosed ? '' : <div className={cn("w-2/5", "p-8", "bg-indigo-800", "text-white", "text-4xl", "absolute", "inset-0")} >
                <RadioForm />
            </div>}
        </div>
    )
};

export default Game;