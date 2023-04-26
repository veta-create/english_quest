import React from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks/useDispatch';
import { changeFieldSize, changeSettingsOpen, setTimer } from '../../redux/settings-page/settingsSlice';
import { useAppSelector } from '../../hooks/useSelector';
import { RootState } from '../../redux/store';

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const fieldWidth = useAppSelector((state: RootState) => state.settingsPage.fieldWidth);
    const fieldHeight = useAppSelector((state: RootState) => state.settingsPage.fieldHeight);
    const timer = useAppSelector((state: RootState) => state.settingsPage.timer);
    return (
        <div className={cn("w-full", "text-5xl", "text-center", "text-white", "p-10")}>
            <div className={cn("cursor-pointer")} onClick={() => dispatch(changeFieldSize())}>
                Размер поля: {fieldWidth} X {fieldHeight}
            </div>
            <div className={cn("cursor-pointer")} onClick={() => dispatch(setTimer())}>Таймер: {timer / 1000}сек</div>
            <input className={cn("border-2", "border-solid", "border-white", "cursor-pointer", "rounded")}
                type="button"
                value="Сохранить"
                onClick={() => dispatch(changeSettingsOpen(false))} />
        </div>
    )
}

export default Settings;