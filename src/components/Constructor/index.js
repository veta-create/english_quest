import Cell from '../common/Cell/Cell';
import styles from './styles.module.css'

const Constructor = (props) => {
    if (props.field.length === 0) {
        props.createField()
    }

    return (
        <div className={styles.main}>
            <div className={styles.field}>
                <div className={styles.themes}>
                    <nav>{props.themes.map((t, i) => {
                        return <Cell key={"0" + i} content={t} />
                    })}
                    </nav>
                </div>

                {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={styles.row}>{r.map((cell, iC) =>
                        <Cell key={"r" + iR + "c" + iC}
                            cell={cell}
                            content={"Добавить вопрос за " + cell.score} />
                    )}
                    </div>
                    rows.push(row);
                    return rows;
                })}

            </div>

            <div className={styles.fieldVariations}>
                <ul>
                    <li onClick={() => {
                        props.setNewFieldSize(3, 3);
                        props.createField();
                    }}>
                        3 Х 3
                    </li>
                    <li onClick={() => {
                        props.setNewFieldSize(4, 4)
                        props.createField();
                    }}>
                        4 Х 4
                    </li>
                    <li onClick={() => {
                        props.setNewFieldSize(6, 5);
                        props.createField();
                    }}>
                        6 Х 5
                    </li>

                </ul>
            </div>
        </div>
    )
};

export default Constructor;