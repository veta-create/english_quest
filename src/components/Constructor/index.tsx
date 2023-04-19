import React, { useEffect } from 'react';
import cn from 'classnames';
import Cell from '../common/Cell';
import styles from './styles.module.css';
import { CellType } from '../../../types';
import { NavLink } from 'react-router-dom';
import CreateForm from '../common/CreateForm';
import { useAppDispatch } from '../../hooks/useDispatch';
import { createField, setNewFieldSize } from '../../redux/constructor-page/constructorSlice';
import { useAppSelector } from '../../hooks/useSelector';
import { RootState } from '../../redux/store';

const Constructor: React.FC = () => {
    const dispatch = useAppDispatch();
    const creatingQuestion = useAppSelector((state: RootState) => state.constructorPage.creatingQuestion);
    const field = useAppSelector((state: RootState) => state.constructorPage.field);
    const fieldWidth = useAppSelector((state: RootState) => state.constructorPage.fieldWidth);
    const fieldHeight = useAppSelector((state: RootState) => state.constructorPage.fieldHeight);
    const themes = useAppSelector((state: RootState) => state.constructorPage.themes);
    useEffect(() => {
        dispatch(setNewFieldSize({newFieldWidth: 3, newFieldHeight: 3}));
        dispatch(createField());
    }, []);
    return (
        <div className={styles.main}>
            <div className={styles.field}>
                <div className={styles.themes}>
                    <nav>{themes.map((t, i) => {
                        return <Cell key={"0" + i} themeNumber={i} cellType="changeTheme" content={`${t}`} />
                    })}
                    </nav>
                </div>
                {field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={styles.row}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            cellType="constructorCell"
                            content={cell.question === '' ? "Добавить вопрос за " + cell.score : `${cell.score}`} />
                    )}
                        {iR === 0 && fieldWidth < 6 ?
                            <Cell className={styles.addColumn} cellType="addColumn" /> : ''
                        }
                    </div>
                    rows.push(row);
                    return rows;
                })}
                {fieldHeight < 5 ? <Cell cellType="addRow" /> : ""}
                <NavLink to="/" className={cn("text-4xl")}>На главную</NavLink>
            </div>

            <div>
                <ul className={cn("w-full", "flex", "flex-col", "items-end", "list-none")}>
                    <Cell cellType="createFieldFromTemplate" content="3*3" />
                    <Cell cellType="createFieldFromTemplate" content="4*4" />
                    <Cell cellType="createFieldFromTemplate" content="6*5" />
                </ul>
            </div>
            <div className={cn(creatingQuestion ? styles.visible : styles.hide, "bg-indigo-800", "w-2/5", "h-full", "absolute")}>
                <CreateForm />
            </div>
        </div>
    )
};

export default Constructor;