import React from 'react';
import { useAppSelector } from '../../../hooks/useSelector';
import { RootState } from '../../../redux/store';
import cn from 'classnames';

const GameOver: React.FC = () => {
    const winner = useAppSelector((state: RootState) => state.gamePage.winner);
    return (<div className={cn("table", "w-full", "h-full", "min-h-screen", "bg-black")}>
        <div className={cn("table-cell", "align-middle")}>
            <div className={cn("flex", "flex-col", "justify-around", "items-center", "w-1/3", "h-80", "ml-auto", "mr-auto", "p-6", "text-4xl", "text-white", "bg-blue-900")}>
                <h1 className={"text-yellow-500"}>GAME OVER</h1>
                {winner[0] === 'Все' ? <p className={"text-center"}>Ничья со счетом: {winner[1]}</p>
                    : <p className={"text-center"}>Победил игрок: {winner[0]} со счетом {winner[1]}</p>}
                <a href="/" className={cn("ml-auto", "mr-auto", "text-4xl")}>На главную</a>
            </div>
        </div>
    </div>)
}

export default GameOver;