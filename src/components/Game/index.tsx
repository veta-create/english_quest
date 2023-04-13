import RadioForm from '../common/RadioForm';
import cn from 'classnames';
import Cell from '../common/Cell';
import { CellType } from '../../../types';
import React from 'react';
import RadioFormContainer from '../common/RadioForm/container';
import AddPlayersFormContainer from '../common/AddPlayersForm/container';

interface GamePropsTypes {
    changeCurrentAnswer: (currentAnswer: number) => ({ type: string, currentAnswer: number }),
    changeCurrentQuestion: (cell: CellType) => ({ type: string, cell: CellType }),
    setQuestionIsClosed: (questionIsClosed: boolean) => ({ type: string, questionIsClosed: boolean }),
    setGameOver: () => ({ type: string }),
    changeQuestionAnswered: () => ({ type: string }),
    currentPlayer: string,
    field: CellType[][] | [],
    gameOver: boolean,
    players: { key: string, name: string, score: number }[],
    questionAnswered: number,
    questionIsClosed: boolean,
    fieldWidth: number,
    fieldHeight: number,
    themes: string[],
    winner: [string, number]
};

const Game: React.FC<GamePropsTypes> = (props) => {

    if (!props.players.length) {
        return <AddPlayersFormContainer />;
    };

    if (props.gameOver) {
        return <div>
            <h1>GAME OVER</h1>
            {props.winner[0] === 'Все' ? <p>Ничья со счетом: {props.winner[1]}</p>
                : <p>Победил игрок: {props.winner[0]} со счетом {props.winner[1]}</p>}
        </div>
    };

    return (
        <div className={cn("h-full", "grid", "grid-cols-[8fr_2fr]", "bg-black")}>
            <div>
                <div>
                    <nav className={cn("flex", "flex-row", "text-white", "font-bold", "text-center")}>{props.themes.map((t, i) => {
                        return <Cell key={"0" + i} cellType="none" content={t} />
                    })}
                    </nav>
                </div>
                {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={cn("flex", "flex-row")}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            changeCurrentQuestion={props.changeCurrentQuestion}
                            setQuestionIsClosed={props.setQuestionIsClosed}
                            setGameOver={props.setGameOver}
                            changeQuestionAnswered={props.changeQuestionAnswered}
                            fieldWidth={props.fieldWidth}
                            fieldHeight={props.fieldHeight}
                            questionAnswered={props.questionAnswered}
                            cellType="playCell" />
                    )}
                    </div>
                    rows.push(row);
                    return rows;
                })}
            </div>
            <div className={cn("flex", "col-span-1")}>
                <div className={cn("h-4/6", "flex", "flex-col", "justify-around", "text-5xl", "font-bold", "text-yellow-600")}>
                    {props.players.map(p => <div key={p.key}
                        className={p.key === props.currentPlayer ? cn("text-white")  : ""}>
                        <div>{p.name} {p.key === props.currentPlayer ? "#" : ""}</div>
                        <div>{p.score}</div>
                    </div>)}
                </div>
            </div>
            {props.questionIsClosed ? '' : <div className={cn("w-2/5", "p-8", "bg-indigo-800", "text-white", "text-4xl", "absolute", "inset-0")} >
                <RadioFormContainer />
            </div>}

        </div>
    )
};

export default Game;