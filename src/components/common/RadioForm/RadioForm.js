// форма для с вопросами для ответа
import Timer from "../Timer";

const RadioForm = (props) => {
    return (<form>
        <div>{props.question}</div>
        {props.answers.map((a, i) => {
            if (i === props.currentAnswer) {
                return <div key={"i" + i}>
                    <input type="radio" onChange={() => props.changeCurrentAnswer(i)} checked name="answer" id={i} />
                    <label htmlFor={i}>{a}</label>
                </div>
            } else {
                return <div key={"i" + i}>
                    <input type="radio" onChange={() => props.changeCurrentAnswer(i)} name="answer" id={i} />
                    <label htmlFor={i}>{a}</label>
                </div>
            };
        }
        )
        }
        <input type="button" 
        onClick={() => props.submitAnswerButton(props.currentAnswer, props.questionNumber, props.questionAnswered)} value="ответить" />
        <div>
            <Timer minutes={0} seconds={30} timeIsOver={props.timeIsOver}/>
        </div>
    </form>)
};

export default RadioForm;