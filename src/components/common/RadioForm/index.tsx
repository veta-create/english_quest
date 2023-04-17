// форма для с вопросами для ответа
import styles from "./styles.module.css";
import Timer from "../Timer";
import cn from "classnames";
import React, { useState } from "react";

interface RadioFormPropsTypes {
    scoreCounter: (answerId: number) => ({ type: string, answerId: number }),
    cellClosure: (key: string) => ({ type: string, key: string }),
    playerChange: () => ({ type: string }),
    setQuestionIsClosed: (questionIsClosed: boolean) => ({ type: string, questionIsClosed: boolean }),
    determineWinner: () => ({ type: string }),
    setGameOver: () => ({ type: string }),
    changeCurrentAnswer: (currentAnswer: number) => ({ type: string, currentAnswer: number }),
    setCurrentPlayer: (key: string) => ({type: string, key: string}),
    currentQuestion: { answers: [string, string, string], correct: number, currentAnswer: number, key: string, score: number, question: string },
    questionAnswered: number,
    players: { key: string, name: string, score: number }[],
    fieldWidth: number,
    fieldHeight: number,
    currentPlayer: string
};

const RadioForm: React.FC<RadioFormPropsTypes> = (props) => {
    const [currentPlayer, setCurrentPlayer] = useState(props.currentPlayer)
    return (<form>

        <div className={cn("text-center")}>{props.currentQuestion.question}</div>

        <div className={cn("pt-8")}>
            {props.currentQuestion.answers.map((a, i) => {
                if (i === props.currentQuestion.currentAnswer) {
                    return <div key={"i" + i}>
                        <input className={cn(styles.answerRadio, "absolute", "opacity-0")}
                            type="radio"
                            checked onChange={() => props.changeCurrentAnswer(i)}
                            name="answer"
                            id={`${i}`} />
                        <label htmlFor={`${i}`} className={"cursor-pointer"}>{a}</label>
                    </div>
                } else {
                    return <div key={"i" + i}>
                        <input className={cn(styles.answerRadio, "absolute", "opacity-0")}
                            type="radio"
                            onChange={() => props.changeCurrentAnswer(i)}
                            name="answer"
                            id={`${i}`} />
                        <label htmlFor={`${i}`} className={"cursor-pointer"}>{a}</label>
                    </div>
                };
            })}
        </div>

        <div className={cn("pt-6", "flex", "justify-center")}>
            <input type="button" className={cn(styles.answerButton, "cursor-pointer")}
                onClick={() => {
                    props.scoreCounter(props.currentQuestion.currentAnswer);
                    props.cellClosure(props.currentQuestion.key);
                    props.playerChange();
                    props.setQuestionIsClosed(true);
                    if (props.questionAnswered === props.fieldWidth * props.fieldHeight - 1) {
                        props.determineWinner();
                        props.setGameOver();
                    }
                }} value="ответить" />
        </div>

        <div className={cn("pt-6", "pl-6")}>
            <select className={cn("bg-indigo-800", "text-white")}>
                {props.players.map(p => <option className={cn("bg-white", "text-black")}>{p.name}</option>)}
            </select>
        </div>

        <div>
            <Timer
                minutes={0}
                seconds={30}
                currentQuestion={props.currentQuestion}
                scoreCounter={props.scoreCounter}
                setQuestionIsClosed={props.setQuestionIsClosed}
                playerChange={props.playerChange} />
        </div>
    </form>)
};

export default RadioForm;