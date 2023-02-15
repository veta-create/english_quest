import React from "react";
import cn from "classnames";

const Timer = (props) => {
    const [over, setOver] = React.useState(false);
    const [[m, s], setTime] = React.useState([props.minutes, props.seconds]);
  
    const tick = () => {
      if (over) {
        props.timeIsOver(-1);
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
        <div>{over ? "Время закончилось" : ''}</div>
      </div>
    );
  };

export default Timer;