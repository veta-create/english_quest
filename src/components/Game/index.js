import styles from './styles.module.css';

const Game = (props) => {
    console.log(props)
    return (
        <div className={styles.main}>
            <div className={styles.field}>
                {props.field.map(r => {
                    let rows = [];
                    let row = <div className={styles.row}>{r.map(cell =>
                         <div key="0" 
                           onClick={() => props.changeCurrentQuestion(cell.question, cell.answers)} 
                           className={styles.cell}>{cell.score}</div>)}
                         </div>;
                    rows.push(row);
                    return rows;
                })}
            </div>
            <div className={styles.sidebar}>
                <div className={styles.players}> 
                {props.players.map(p => <div key={p.key} className={styles.player}>
                    <div className={styles.name}>{ p.name }</div>
                    <div className={styles.score}>{ p.score }</div>
                </div>)}
                </div>
            </div>
            <div className={styles.question}>
                <form>
                    <div className={styles.question}>{props.currentQuestion.question}</div>
                    {props.currentQuestion.answers.map((a, i) => <div>
                        <input type="radio" name="answer" 
                         id={i} />
                        <label for={i}>{a}</label>
                        </div>)}
                    <input type="button" value="ответить"/>
                </form>
            </div>
        </div>
    )
};

export default Game;