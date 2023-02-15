import RadioForm from '../common/RadioForm/RadioForm';
import cn from 'classnames';
import Cell from '../common/Cell/Cell';

const Game = (props) => {
    if (props.gameOver) {
        return <div>
            <h1>GAME OVER</h1>
            {props.winner[0] === 'Все' ? <p>Ничья со счетом: {props.winner[1]}</p>
                : <p>Победил игрок: {props.winner[0]} со счетом {props.winner[1]}</p>}
        </div>
    }
    return (
        <div className={cn("h-full", "grid", "grid-cols-[8fr_2fr]", "bg-black")}>
            <div>
                <div>
                    <nav className={cn("flex", "flex-row", "text-white", "font-bold", "text-center")}>{props.themes.map((t, i) => {
                        return <Cell key={"0" + i} handlerType="none" content={t} />
                    })}
                    </nav>
                </div>
                {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={cn("flex", "flex-row")}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            onClickHandler={props.clickOnCell}
                            handlerType="clickOnCell" />
                    )}
                    </div>
                    rows.push(row);
                    return rows;
                })}
            </div>
            <div className={cn("flex", "col-span-1")}>
                <div className={cn("text-5xl", "font-bold", "text-yellow-600")}>
                    {props.players.map(p => <div key={p.key}
                        className={cn(p.key === props.currentPlayer ? "text-white" : "")}>
                        <div>{p.name}</div>
                        <div>{p.score}</div>
                    </div>)}
                </div>
            </div>
            {props.questionIsClosed ? '' : <div className={cn("w-2/5", "p-8", "bg-indigo-800", "text-white", "text-4xl", "absolute", "inset-0")} >
                <RadioForm
                    question={props.currentQuestion.question}
                    answers={props.currentQuestion.answers}
                    questionNumber={props.currentQuestion.key}
                    currentAnswer={props.currentAnswer}
                    changeCurrentAnswer={props.changeCurrentAnswer}
                    questionAnswered={props.questionAnswered}
                    submitAnswerButton={props.submitAnswerButton}
                    timeIsOver={props.timeIsOver}
                    players={props.players}
                />
            </div>
            }
        </div>
    )
};

export default Game;