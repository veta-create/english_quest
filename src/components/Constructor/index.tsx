import React, { useEffect } from 'react';
import cn from 'classnames';
import Cell from '../common/Cell';
import styles from './styles.module.css';
import { CellType } from '../../../types';
import CreateFormContainer from '../common/CreateForm/container';

interface ConstructorPropsTypes {
    addColumn: () => ({ type: string }),
    addRow: () => ({ type: string }),
    changeTheme: (themeNumber: number, newTheme: string) => ({ type: string, themeNumber: number, newTheme: string }),
    toggleCreatingQuestion: (creatingQuestion: boolean) => ({ type: string, creatingQuestion: boolean }),
    setCurrentCell: (currentCellKey: string) => ({ type: string, currentCellKey: string }),
    setNewFieldSize: (newFieldWidth: number, newFieldHeight: number) => ({ type: string, newFieldWidth: number, newFieldHeight: number }),
    createField: () => ({ type: string }),
    creatingQuestion: boolean,
    field: CellType[][] | [],
    fieldHeight: number,
    fieldWidth: number,
    themes: Array<string>
}

const Constructor: React.FC<ConstructorPropsTypes> = (props) => {
    useEffect(() => {
        props.setNewFieldSize(3, 3);
        props.createField();
    }, []);
    return (
        <div className={styles.main}>
            <div className={styles.field}>
                <div className={styles.themes}>
                    <nav>{props.themes.map((t, i) => {
                        return <Cell key={"0" + i} themeNumber={i} cellType="changeTheme"
                            changeTheme={props.changeTheme} content={`${t}`} />
                    })}
                    </nav>
                </div>
                {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={styles.row}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            cellType="constructorCell"
                            toggleCreatingQuestion={props.toggleCreatingQuestion}
                            setCurrentCell={props.setCurrentCell}
                            content={cell.question === '' ? "Добавить вопрос за " + cell.score : `${cell.score}`} />
                    )}
                        {iR === 0 && props.fieldWidth < 6 ?
                            <Cell className={styles.addColumn} cellType="addColumn" addColumn={props.addColumn} /> : ''
                        }
                    </div>
                    rows.push(row);
                    return rows;
                })}
                {props.fieldHeight < 5 ? <Cell cellType="addRow" addRow={props.addRow} /> : ""}
            </div>

            <div>
                <ul className={cn("w-full", "flex", "flex-col", "items-end", "list-none")}>
                    <Cell fieldWidth={3} fieldHeight={3} setNewFieldSize={props.setNewFieldSize} createField={props.createField}
                        cellType="createFieldFromTemplate" content="3*3" />
                    <Cell fieldWidth={4} fieldHeight={4} setNewFieldSize={props.setNewFieldSize} createField={props.createField}
                        cellType="createFieldFromTemplate" content="4*4" />
                    <Cell fieldWidth={6} fieldHeight={5} setNewFieldSize={props.setNewFieldSize} createField={props.createField}
                        cellType="createFieldFromTemplate" content="6*5" />
                </ul>
            </div>
            <div className={cn(props.creatingQuestion ? styles.visible : styles.hide, "bg-indigo-800", "w-2/5", "h-full", "absolute")}>
                <CreateFormContainer />
            </div>
        </div>
    )
};

export default Constructor;