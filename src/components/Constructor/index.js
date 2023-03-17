import React, { useEffect } from 'react';
import cn from 'classnames';
import Cell from '../common/Cell/Cell';
import styles from './styles.module.css';
import CreateForm from '../common/CreateForm/CreateForm';

const Constructor = (props) => {
    useEffect(() => {
        props.createFieldFromTemplate(3, 3);
    }, []);
    return (
        <div className={styles.main}>
            <div className={styles.field}>
                <div className={styles.themes}>
                    <nav>{props.themes.map((t, i) => {
                        return <Cell key={"0" + i} themeNumber={i} handlerType="changeTheme"
                            onClickHandler={props.changeTheme} content={t} />
                    })}
                    </nav>
                </div>
                {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={styles.row}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            handlerType="clickOnCell"
                            onClickHandler={props.clickOnCell}
                            content={cell.question === '' ? "Добавить вопрос за " + cell.score : cell.score} />
                    )}
                        {iR === 0 && props.fieldWidth < 6 ?
                            <Cell className={styles.addColumn} handlerType="addColumn" onClickHandler={props.addColumn} /> : ''
                        }
                    </div>
                    rows.push(row);
                    return rows;
                })}
                {props.fieldHeight < 5 ? <Cell handlerType="addRow" onClickHandler={props.addRow} /> : ""}
            </div>

            <div>
                <ul className={cn("w-full", "flex", "flex-col", "items-end", "list-none")}>
                    <Cell fieldWidth={3} fieldHeight={3} onClickHandler={props.createFieldFromTemplate}
                     handlerType="createFieldFromTemplate" content="3*3" />
                    <Cell fieldWidth={4} fieldHeight={4} onClickHandler={props.createFieldFromTemplate}
                     handlerType="createFieldFromTemplate" content="4*4" />
                    <Cell fieldWidth={6} fieldHeight={5} onClickHandler={props.createFieldFromTemplate}
                     handlerType="createFieldFromTemplate" content="6*5" />
                </ul>
            </div>
            <div className={cn(props.creatingQuestion ? styles.visible : styles.hide, "bg-indigo-800", "w-2/5", "h-full", "absolute" )}>
                <CreateForm addNewQuestion={props.addNewQuestion}
                creatingQuestionType={props.creatingQuestionType}
                changeCreatingQuestionType={props.changeCreatingQuestionType}
                currentCell={props.currentCell} />
            </div>
        </div>
    )
};

export default Constructor;