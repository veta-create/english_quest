import styles from './styles.module.css'

const Constructor = (props) => {
    let rows = [];
    let row = [];
    for(let i = 0; i < props.fieldHeight; i++) {
        for(let j = 0; j < props.fieldWidth; i++) {
            row.push(i)
        }
        rows.push(row)
        row = []
    }
    return (
        <div className={styles.main}>
            <div className={styles.fiels}>
            </div>
        </div>
    )
};

export default Constructor;