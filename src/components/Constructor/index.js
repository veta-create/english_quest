import Cell from '../common/Cell/Cell';
import styles from './styles.module.css'

const Constructor = (props) => {
    if (props.field === []) {
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
                }  
                )}



            </div>

            <div className={styles.fieldVariations}>
                <ul>
                    <li>
                        3 Х 3
                    </li>
                    <li>
                        4 Х 4
                    </li>
                    <li>
                        6 Х 5
                    </li>

                </ul>
            </div>
        </div>
    )
};

export default Constructor;