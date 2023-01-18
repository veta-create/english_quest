// ячейка игрового поля
import styles from './Cell.module.css';

const Cell = (props) => {
    return <div onClick={props.onClickHandler ? () => props.onClickHandler(props.cell) : ''}
     className={styles.cell}>
        {props.content}
    </div>
}

export default Cell;