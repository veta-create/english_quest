// ячейка игрового поля
import styles from './Cell.module.css';

const Cell = (props) => {
    if (props.handlerType === "changeCurrentQuestion") {
        return <div onClick={() => props.onClickHandler(props.cell)}
            className={styles.cell}>
            {props.content}
        </div>
    }

    if (props.handlerType === "none") {
        return <div
            className={styles.cell}>
            {props.content}
        </div>
    }

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