const RadioForm = (props) => {
    return (<form>
        <div>{props.question}</div>
        {props.answers.map((a, i) => {
            if (i === props.currentAnswer) {
                return <div>
                    <input type="radio" onClick={() => props.changeCurrentAnswer(i)} checked name="answer" id={i} />
                    <label for={i}>{a}</label>
                </div>
            } else {
                return <div>
                    <input type="radio" onClick={() => props.changeCurrentAnswer(i)} name="answer" id={i} />
                    <label for={i}>{a}</label>
                </div>
            };
        }
        )
        }
        <input type="button" value="ответить" />
    </form>)
};

export default RadioForm;