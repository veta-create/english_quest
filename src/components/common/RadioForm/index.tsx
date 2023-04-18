// форма для с вопросами для ответа
import styles from "./styles.module.css";
import Timer from "../Timer";
import cn from "classnames";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { cellClosure, changeCurrentAnswer, changeQuestionAnswered, determineWinner, playerChange, scoreCounter, setGameOver, setQuestionIsClosed } from "../../../redux/game-page/gameSlice";
import { useAppSelector } from "../../../hooks/useSelector";
import { RootState } from "../../../redux/store";

const RadioForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentQuestion = useAppSelector((state: RootState) => state.gamePage.currentQuestion);
    const questionAnswered = useAppSelector((state: RootState) => state.gamePage.questionAnswered);
    const fieldWidth = useAppSelector((state: RootState) => state.gamePage.fieldWidth);
    const fieldHeight = useAppSelector((state: RootState) => state.gamePage.fieldHeight);
    const players = useAppSelector((state: RootState) => state.gamePage.players);
    const stateCurrentPlayer = useAppSelector((state: RootState) => state.gamePage.currentPlayer);
    const [selectDisabled, setSelectDisabled] = useState<boolean>(true);
    const [currentPlayer, setCurrentPlayer] = useState<string>(stateCurrentPlayer);

    return (<form>

        <div className={cn("text-center")}>{currentQuestion.question}</div>

        <div className={cn("pt-8")}>
            {currentQuestion.answers.map((a, i) => {
                if (i === currentQuestion.currentAnswer) {
                    return <div key={"i" + i}>
                        <input className={cn(styles.answerRadio, "absolute", "opacity-0")}
                            type="radio"
                            checked onChange={() =>
                                dispatch(changeCurrentAnswer(i))
                            }
                            name="answer"
                            id={`${i}`} />
                        <label htmlFor={`${i}`} className={"cursor-pointer"}>{a}</label>
                    </div>
                } else {
                    return <div key={"i" + i}>
                        <input className={cn(styles.answerRadio, "absolute", "opacity-0")}
                            type="radio"
                            onChange={() =>
                                dispatch(changeCurrentAnswer(i))
                            }
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
                    dispatch(scoreCounter({ playerKey: currentPlayer, answerId: currentQuestion.currentAnswer }));
                    dispatch(cellClosure(currentQuestion.key));
                    dispatch(playerChange());
                    dispatch(setQuestionIsClosed(true));
                    dispatch(changeQuestionAnswered());
                    if (questionAnswered === fieldWidth * fieldHeight - 1) {
                        dispatch(determineWinner());
                        dispatch(setGameOver());
                    }
                }} value="ответить" />
        </div>

        <div className={cn("pt-6", "pl-6")}>
            <select disabled={selectDisabled} className={cn("bg-indigo-800", "text-white")} onChange={(e) => {
                let playerName: string = e.target.value;
                let playerKey: string | undefined = players.find(p => p.name === playerName)?.key;
                if (playerKey) {
                    setCurrentPlayer(playerKey);
                };
            }}>
                {players.filter(p => p.key !== stateCurrentPlayer)
                    .map(p => <option key={p.key} className={cn("bg-white", "text-black")}>{p.name}</option>)}
            </select>
        </div>

        <div>
            <Timer
                minutes={0}
                seconds={30}
                setSelectDisabled={setSelectDisabled} />
        </div>
    </form>)
};

export default RadioForm;