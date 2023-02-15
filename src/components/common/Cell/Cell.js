// ячейка игрового поля
import cn from 'classnames';
import React from 'react';
import styles from './Cell.module.css';
import score200 from '../../../assets/200.png'
import score400 from '../../../assets/400.png'
import score600 from '../../../assets/600.png'
import score800 from '../../../assets/800.png'
import score1000 from '../../../assets/1000.png'
import closeCell from '../../../assets/close-cell.png'

const Cell = (props) => {
    const defineScorePicture = () => {
        if(props.cell.score === 200) {
            return score200;
        };
        if(props.cell.score === 400) {
            return score400;
        };
        if(props.cell.score === 600) {
            return score600;
        };
        if(props.cell.score === 800) {
            return score800;
        };
        if(props.cell.score === 1000) {
            return score1000;
        };
    };

    let cellStyles = cn(styles.cell, "w-1/6", "max-w-xs", "h-28", "flex", "justify-center", "items-center", "cursor-pointer", "text-3xl", "bg-blue-900", "border-solid", "border-4", "border-black");

    let newTheme = React.createRef();
    
    if (props.handlerType === "clickOnCell") {
        return <div onClick={() => props.onClickHandler(props.cell)}
            className={cellStyles}>
            {props.cell.close ? <img src={closeCell} /> : <img src={defineScorePicture()} />}
        </div>
    }

    if (props.handlerType === "changeTheme") {
        return <div
            className={cellStyles}>
            <input ref={newTheme} id="question" placeholder={props.content} />
            <input type="button" value="✓"
                onClick={() => props.onClickHandler(props.themeNumber, newTheme.current.value)} />
        </div>
    };

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

    if (props.handlerType === "none") {
        return <div className={cellStyles}>
            {props.content}
        </div>
    }
}

export default Cell;