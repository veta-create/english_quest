// ячейки
import cn from 'classnames';
import React, { useRef } from 'react';
import styles from './styles.module.css';
import score200 from '../../../assets/200.png';
import score400 from '../../../assets/400.png';
import score600 from '../../../assets/600.png';
import score800 from '../../../assets/800.png';
import score1000 from '../../../assets/1000.png';
import closeCell from '../../../assets/close-cell.png';
import plus from '../../../assets/plus.png';
import minFieldSize from '../../../assets/minFieldSize.png';
import midFieldSize from '../../../assets/midFieldSize.png';
import maxFieldSize from '../../../assets/maxFieldSize.png';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { changeCurrentQuestion, setQuestionIsClosed } from '../../../redux/game-page/gameSlice';
import { addColumn, addRow, changeTheme, createField, setCurrentCell, setNewFieldSize, toggleCreatingQuestion } from '../../../redux/constructor-page/constructorSlice';
import { useInput } from '../../../hooks/useForm';

interface CellPropsTypes {
    themeNumber?: number,
    cellType: string,
    cell?: { key: string, answers: string[], close: boolean, correct: number, question: string, score: number },
    content?: string,
    className?: string,
};

const Cell: React.FC<CellPropsTypes> = (props) => {
    const dispatch = useAppDispatch();
    const newTheme = useInput("", { isEmpty: true })
    const defineScorePicture = () => {
        if (props.cell && props.cell.score === 200) {
            return score200;
        };
        if (props.cell && props.cell.score === 400) {
            return score400;
        };
        if (props.cell && props.cell.score === 600) {
            return score600;
        };
        if (props.cell && props.cell.score === 800) {
            return score800;
        };
        if (props.cell && props.cell.score === 1000) {
            return score1000;
        };
    };

    const defineTemplateField = (size: string) => {
        if (size === "3*3") {
            return minFieldSize;
        };
        if (size === "4*4") {
            return midFieldSize;
        };
        if (size === "6*5") {
            return maxFieldSize;
        };
    };

    let cellStyles = cn(styles.cell, "w-1/6", "max-w-xs", "h-28", "flex", "justify-center", "items-center", "cursor-pointer", "text-3xl", "bg-blue-900");

    if (props.cellType === "playCell" && props.cell) {
        return <div onClick={() => {
            if (props.cell) {
                if (!props.cell.close) {
                    dispatch(changeCurrentQuestion(props.cell));
                    dispatch(setQuestionIsClosed(false));
                } else {
                    alert('Ячейка уже использована, пожалуйста, выберите другую')
                };
            };
        }}
            className={cn(cellStyles, "border-solid", "border-4", "border-black")}>
            {props.cell.close ? <img src={closeCell} alt="Закрытая клетка" /> : <img src={defineScorePicture()} alt="Открытая клетка" />}
        </div>
    };

    if (props.cellType === "constructorCell") {
        return <div className={cn(cellStyles, "border-solid", "border-4", "border-black", "text-white", "text-center")}
            onClick={() => {
                if (props.cell) {
                    dispatch(toggleCreatingQuestion(true));
                    dispatch(setCurrentCell(props.cell.key));
                };
            }} >
            {props.content}
        </div>
    };

    if (props.cellType === "changeTheme") {
        return <div
            className={cn(cellStyles, "border-solid", "border-4", "border-black")}>
            <input onChange={(e) => newTheme.onChange(e)} id="question" placeholder="Тематика" />
            <input type="button" value="✓"
                onClick={() => {
                    dispatch(changeTheme({ themeNumber: props.themeNumber, newTheme: newTheme.value }))
                }} />
        </div>
    };

    if (props.cellType === "addColumn" || props.cellType === "addRow") {
        return <div onClick={() => {
            if (props.cellType === "addColumn") {
                dispatch(addColumn());
            }
            if (props.cellType === "addRow") {
                dispatch(addRow());
            };
        }}
            className={cn(cellStyles, "border-2", "border-dashed", "divide-white")}>
            <img src={plus} alt="Знак плюс" />
        </div>
    };

    if (props.cellType === "createFieldFromTemplate" && props.content) {
        return <div className={cn("w-2/6", "border-solid", "border-4", "border-black", cellStyles)} onClick={() => {
            props.content === "3*3" && dispatch(setNewFieldSize({ newFieldWidth: 3, newFieldHeight: 3 }));
            props.content === "4*4" && dispatch(setNewFieldSize({ newFieldWidth: 4, newFieldHeight: 4 }));
            props.content === "6*5" && dispatch(setNewFieldSize({ newFieldWidth: 6, newFieldHeight: 5 }));
            dispatch(createField());
        }}>
            <img src={defineTemplateField(props.content)} alt='Шаблон поля' />
        </div>
    };

    if (props.cellType === "none") {
        return <div className={cn(cellStyles, "border-solid", "border-4", "border-black")}>
            {props.content}
        </div>
    };

    return <></>;
};

export default Cell;