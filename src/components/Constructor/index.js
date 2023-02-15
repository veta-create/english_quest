import React, { useEffect } from 'react';
import cn from 'classnames';
import Cell from '../common/Cell/Cell';
import styles from './styles.module.css';

const Constructor = (props) => {
    let question = React.createRef();
    let option1Value = React.createRef();
    let option2Value = React.createRef();
    let option3Value = React.createRef();
    let correctAnswer = React.createRef();
    const onSubmitAnswerButton = () => {
        let answers = []
        answers.push(option1Value.current.value)
        answers.push(option2Value.current.value)
        answers.push(option3Value.current.value)
        props.addNewQuestion(props.currentCell, question.current.value, answers, correctAnswer.current.value)
      };

    useEffect(() => {
        props.createFieldFromTemplate(3, 3);
    }, []);
    return (
        <div className={styles.main}>
            <div className={styles.field}>
                <div className={styles.themes}>
                    <nav>{props.themes.map((t, i) => {
                        return <Cell key={"0" + i} themeNumber={i} handlerType="changeTheme"
                         onClickHandler={props.changeTheme} content={t}/>
                    })}
                    </nav>
                </div>
                <Cell content="+" className={styles.addColumn} handlerType="addColumn" onClickHandler={props.addColumn} />
                {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={styles.row}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            handlerType="clickOnCell"
                            onClickHandler={props.clickOnCell}
                            content={cell.question === '' ? "Добавить вопрос за " + cell.score : cell.score} />
                    )}
                    </div>
                    rows.push(row);
                    return rows;
                })}
                <Cell content="+" handlerType="addRow" onClickHandler={props.addRow} />
            </div>

            <div className={styles.fieldVariations}>
                <ul>
                    <li onClick={() => props.createFieldFromTemplate(3, 3)} >
                        3 Х 3
                    </li>
                    <li onClick={() => props.createFieldFromTemplate(4, 4)} >
                        4 Х 4
                    </li>
                    <li onClick={() => props.createFieldFromTemplate(6, 5)} >
                        6 Х 5
                    </li>
                </ul>
            </div>

            <div className={cn(styles.createQuestion, props.creatingQuestion ? styles.visible : styles.hide)}>
                <form>
                    <input ref={question} id="question" placeholder="Введите вопрос" />
                    <p>Добавьте аудио вопрос</p>
                    <input type="file" accept='audio/'/>
                    <p>Добавьте видео вопрос</p>
                    <input type="file" accep='video/'/>
                    <input ref={option1Value} id="option1" placeholder={'Вариант ответа номер 1'} />
                    <input ref={option2Value} id="option2" placeholder={'Вариант ответа номер 2'} />
                    <input ref={option3Value} id="option3" placeholder={'Вариант ответа номер 3'} />
                    <input ref={correctAnswer} id="correctAnswer" placeholder={'Номер верного ответа'} />
                    <input onClick={() => onSubmitAnswerButton()} type="button" value="Готово" />
                </form>
            </div>
        </div>
    )
};

export default Constructor;