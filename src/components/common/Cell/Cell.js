// ячейка игрового поля
import React from 'react';
import styles from './Cell.module.css';

const Cell = (props) => {
    let newTheme = React.createRef();
    if (props.handlerType === "changeCurrentQuestion") {
        return <div onClick={() => props.onClickHandler(props.cell)}
            className={styles.cell}>
            {props.content}
        </div>
    }

    if (props.handlerType === "changeTheme") {
        return <div
            className={styles.cell}>
                <input ref={newTheme} id="question" placeholder={props.content} />
                <input type="button" value="✓" 
                onClick={() => props.onClickHandler(props.themeNumber, newTheme.current.value)}/>
        </div>
    };

    if (props.handlerType === "clickOnCell") {
        return <div onClick={() => props.onClickHandler(props.cell.key)}
            className={styles.cell}>
            {props.content}
        </div>
    }

    if (props.handlerType === "addColumn") {
        return <div onClick={() => props.onClickHandler()}
            className={styles.cell}>
            {props.content}
        </div>
    }

    if (props.handlerType === "addRow") {
        return <div onClick={() => props.onClickHandler()}
            className={styles.cell}>
            {props.content}
        </div>
    }
}

export default Cell;