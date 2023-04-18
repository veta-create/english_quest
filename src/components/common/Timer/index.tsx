import React, { Dispatch, SetStateAction } from "react";
import cn from "classnames";
import { useAppSelector } from "../../../hooks/useSelector";
import { RootState } from "../../../redux/store";

interface TimerPropsTypes {
  minutes: number,
  seconds: number, 
  setSelectDisabled: Dispatch<SetStateAction<boolean>>
}

const Timer: React.FC<TimerPropsTypes> = (props) => {
    const [over, setOver] = React.useState(false);
    const [[m, s], setTime] = React.useState([props.minutes, props.seconds]);
  
    const tick = () => {
      if(over) {
        props.setSelectDisabled(false);
      };
  
      if (m === 0 && s === 0) {
        setOver(true);
      } else if (m === 0 && s === 0) {
        setTime([59, 59]);
      } else if (s === 0) {
        setTime([m - 1, 59]);
      } else {
        setTime([m, s - 1]);
      }
    }; 

    React.useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });
  
    return (
      <div>
        <p className={cn("flex", "justify-end", "content-end")}>{`${m
          .toString()
          .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
        <div>{over ? "Время закончилось, можете выбрать другого игрока для ответа" : ''}</div>
      </div>
    );
  };

export default Timer;