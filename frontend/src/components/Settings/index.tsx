import cn from 'classnames';
import { useAppDispatch } from '../../hooks/useDispatch';
import { changeSettingsOpen, setTimer } from '../../redux/settings-page/settingsSlice';
import { useAppSelector } from '../../hooks/useSelector';
import { RootState } from '../../redux/store';

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const timer = useAppSelector((state: RootState) => state.settingsPage.timer);

    const saveSettings = () => {
        const body = JSON.stringify({ timer: timer });
        fetch("/api/settings", {
            method: "POST",
            body: body,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(() => console.log("Доска успешно сохранена")).catch((err) => console.log("Oops: " + err));
    };

    return (
        <div className={cn("w-full", "text-5xl", "text-center", "text-white", "p-10")}>
            <div className={cn("cursor-pointer")} onClick={() => {
                if (timer === 60) {
                    dispatch(setTimer(15));
                } else {
                    dispatch(setTimer(timer + 15));
                };
            }}>Таймер: {timer}сек</div>
            <input className={cn("border-2", "border-solid", "border-white", "cursor-pointer", "rounded")}
                type="button"
                value="Сохранить"
                onClick={() => {
                    saveSettings();
                    dispatch(changeSettingsOpen(false));
                }} />
        </div>
    )
}

export default Settings;