import RadioForm from '../common/RadioForm';
import styles from './styles.module.css';
import cn from 'classnames';
import Cell from '../common/Cell/Cell';

const Game = (props) => {
    if(props.gameOver) {
        return <div>
            <h1>GAME OVER</h1>
            {props.winner[0] === 'Все' ? <p>Ничья со счетом: {props.winner[1]}</p> 
            : <p>Победил игрок: {props.winner[0]} со счетом {props.winner[1]}</p>} 
        </div>
    }
    return (
        <div className={styles.main}>
            <div className={styles.field}>
                <div className={styles.themes}>
                    <nav>{props.themes.map((t, i) => {
                        return <Cell key={"0" + i} handlerType="none" content={t} />
                    })}
                    </nav>
                </div>
                {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={styles.row}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            onClickHandler={props.changeCurrentQuestion}
                            handlerType="changeCurrentQuestion"
                            content={cell.close ? 'X' : cell.score} />
                    )}
                    </div>
                    rows.push(row);
                    return rows;
                })}
            </div>
            <div className={styles.sidebar}>
                <div className={styles.players}>
                    {props.players.map(p => <div key={p.key}
                        className={cn(styles.player, p.key === props.currentPlayer ? styles.currentPlayer : "")}>
                        <div className={styles.name}>{p.name}</div>
                        <div className={styles.score}>{p.score}</div>
                    </div>)}
                </div>
            </div>
            <div className={styles.question}>
                <RadioForm
                    question={props.currentQuestion.question}
                    answers={props.currentQuestion.answers}
                    questionNumber={props.currentQuestion.key}
                    currentAnswer={props.currentAnswer}
                    changeCurrentAnswer={props.changeCurrentAnswer}
                    questionAnswered={props.questionAnswered}
                    submitAnswerButton={props.submitAnswerButton}
                />
            </div>
        </div>
    )
};

export default Game;