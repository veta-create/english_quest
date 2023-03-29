// форма для с вопросами для ответа
import styles from "./RadioForm.module.css";
import Timer from "../Timer";
import cn from "classnames";

const RadioForm = (props) => {
    return (<form className={cn(styles.main)}>

        <div className={cn("text-center")}>{props.question}</div>

        <div className={cn("pt-8")}>
            {props.answers.map((a, i) => {
                if (i === props.currentQuestion.currentAnswer) {
                    return <div key={"i" + i}>
                        <input className={cn(styles.answerRadio, "absolute", "opacity-0")} type="radio" checked onChange={() => props.changeCurrentAnswer(i)} name="answer" id={i} />
                        <label htmlFor={i} className={"cursor-pointer"}>{a}</label>
                    </div>
                } else {
                    return <div key={"i" + i}>
                        <input className={cn(styles.answerRadio, "absolute", "opacity-0")} type="radio" onChange={() => props.changeCurrentAnswer(i)} name="answer" id={i} />
                        <label  htmlFor={i} className={"cursor-pointer"}>{a}</label>
                    </div>
                };
            })}
        </div>

        <div className={cn("pt-6", "flex", "justify-center")}>
            <input type="button" className={cn(styles.answerButton, "cursor-pointer")}
                onClick={() => props.submitAnswerButton(props.currentQuestion.currentAnswer, props.questionNumber, props.questionAnswered, props.currentQuestion)} value="ответить" />
        </div>

        <div className={cn("pt-6", "pl-6")}>
            <select className={cn("bg-indigo-800", "text-white")}>
                {props.players.map(p => <option className={cn("bg-white", "text-black")}>{p.name}</option>)}
            </select>
        </div>

        <div>
            <Timer minutes={0} seconds={30} timeIsOver={props.timeIsOver}/>
        </div>
    </form>)
};

export default RadioForm;