import React from 'react';
import cn from 'classnames';

interface SettingsPropsTypes {
    changeFieldSize: () => ({ type: string }),
    changeSettingsOpen: (settingsOpen: boolean) => ({ type: string, settingsOpen: boolean }),
    setTimer: () => ({type: string}),
    fieldWidth: number,
    fieldHeight: number,
    timer: number
};

const Settings: React.FC<SettingsPropsTypes> = (props) => {
    return (
        <div className={cn("w-full", "text-5xl", "text-center", "text-white", "p-10")}>
            <div className={cn("cursor-pointer")} onClick={() => props.changeFieldSize()}>
                Размер поля: {props.fieldWidth} X {props.fieldHeight}
            </div>
            <div className={cn("cursor-pointer")} onClick={() => props.setTimer()}>Таймер: {props.timer / 1000}сек</div>
            <input className={cn("border-2", "border-solid", "border-white", "cursor-pointer", "rounded")}
                type="button"
                value="Сохранить"
                onClick={() => props.changeSettingsOpen(false)} />
        </div>
    )
}

export default Settings;