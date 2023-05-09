import React, { useEffect } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { RootState } from '../../redux/store';
import Cell from '../common/Cell';
import styles from './styles.module.css';
import CreateForm from '../common/CreateForm';
import { createField, setNewFieldSize } from '../../redux/constructor-page/constructorSlice';

const Constructor: React.FC = () => {
    const dispatch = useAppDispatch();
    const creatingQuestion = useAppSelector((state: RootState) => state.constructorPage.creatingQuestion);
    const field = useAppSelector((state: RootState) => state.constructorPage.field);
    const fieldWidth = useAppSelector((state: RootState) => state.constructorPage.fieldWidth);
    const fieldHeight = useAppSelector((state: RootState) => state.constructorPage.fieldHeight);
    const themes = useAppSelector((state: RootState) => state.constructorPage.themes);
    
    useEffect(() => {
        dispatch(setNewFieldSize({ newFieldWidth: 3, newFieldHeight: 3 }));
        dispatch(createField());
    }, []);

    const saveField = () => {
        const body = JSON.stringify({ themes: themes, fieldWidth: fieldWidth, fieldHeight: fieldHeight, field: field });
        const validator = () => {
            let fieldCorrectness = true;
            let themesCorrectness = true;

            for (let i = 0; i < field.length; i++) {
                for (let j = 0; j < field[i].length; j++) {
                    if (field[i][j].question === "") {
                        fieldCorrectness = false;
                        break;
                    };
                };
            };

            for (let i = 0; i < themes.length; i++) {
                if (themes[i] === "") {
                    themesCorrectness = false;
                    break;
                };
            };

            return { fieldCorrectness, themesCorrectness };
        };
        // validator().fieldCorrectness && validator().themesCorrectness
        if (true) {
            fetch("/api/fields", {
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(() => console.log("Доска успешно сохранена")).catch((err) => console.log("Oops: " + err));
        } else {
            alert("Заполните доску целиком перед тем, как ее сохранить");
        };
    };

    return (
        <div className={styles.main}>
            <div className={styles.field}>
                <div className={styles.themes}>
                    <nav>{themes.map((t, i) => {
                        return <Cell key={"0" + i} themeNumber={i} cellType="changeTheme" />
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

            <div className={cn("flex", "flex-col", "align-center", "text-4xl", "text-white")}>
                <input className={cn(styles.save, "w-72", "text-center", "cursor-pointer")} type='button' value="Сохранить доску" onClick={() => saveField()} />
                <NavLink to="/" className={cn("w-72", "text-center")}>На главную</NavLink>
            </div>
        </div>
    )
};

export default Constructor;