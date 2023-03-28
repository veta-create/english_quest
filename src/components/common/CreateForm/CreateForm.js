// форма для создания вопроса
import React, { useState } from "react";
import cn from "classnames";
import styles from './CreateForm.module.css'


const CreateForm = (props) => {
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [questionVisited, setQuestionVisited] = useState(false);
    const [option1Visited, setOption1Visited] = useState(false);
    const [option2Visited, setOption2Visited] = useState(false);
    const [option3Visited, setOption3Visited] = useState(false);
    const [correctAnswerVisited, setCorrectAnswerVisited] = useState(false);
    const [questionError, setQuestionError] = useState("Поле вопроса не может быть пустым");
    const [option1Error, setOption1Error] = useState("Поле ответа 1 не может быть пустым");
    const [option2Error, setOption2Error] = useState("Поле ответа 2 не может быть пустым");
    const [option3Error, setOption3Error] = useState("Поле ответа 3 не может быть пустым");
    const [correctAnswerError, setCorrectAnswerError] = useState("Поле верного ответа не может быть пустым");
    const [audioError, setAudioError] = useState("В аудио вопросе обязательно загрузите файл");
    const [videoError, setVideoError] = useState("В видео вопросе обязательно загрузите файл");

    const onBlurHandler = (e) => {
        switch(e.target.name) {
            case "question": {
                setQuestionVisited(true);
                break;
            };
            case "option1": {
                setOption1Visited(true);
                break;
            };
            case "option2": {
                setOption2Visited(true);
                break;
            };
            case "option3": {
                setOption3Visited(true);
                break;
            };
            case "correctAnswer": {
                setCorrectAnswerVisited(true);
                break;
            };
        };
    };

    const onChangeHandler = (e) => {
        switch(e.target.name) {
            case "question": {
                setQuestion(e.target.value);
                if(e.target.value === "") {
                    setQuestionError("Поле вопроса не может быть пустым");
                } else {
                    setQuestionError("");
                }
                break;
            };
            case "option1": {
                setOption1(e.target.value);
                if(e.target.value === "") {
                    setOption1Error("Поле ответа 1 не может быть пустым");
                } else {
                    setOption1Error("");
                };
                break;
            };
            case "option2": {
                setOption2(e.target.value);
                if(e.target.value === "") {
                    setOption2Error("Поле ответа 2 не может быть пустым");
                } else {
                    setOption2Error("");
                };
                break;
            };
            case "option3": {
                setOption3(e.target.value);
                if(e.target.value === "") {
                    setOption3Error("Поле ответа 3 не может быть пустым");
                } else {
                    setOption3Error("");
                };
                break;
            };
            case "correctAnswer": {
                setCorrectAnswer(e.target.value);
                if(e.target.value === "") {
                    setCorrectAnswerError("Поле верного ответа не может быть пустым");
                } else if (Number(e.target.value) === NaN || Number(e.target.value) >= 4 || Number(e.target.value) < 1) {
                    setCorrectAnswerError("Корректный ответ должен быть числом от 1 до 3");
                } else {
                    setCorrectAnswerError("");
                }
                break;
            };
            case "audio": {
            }
        };
    };

    const onSubmitAnswerButton = (questionType) => {
        let answers = [option1, option2, option3];
        if(option1Error || option2Error || option3Error || questionError || correctAnswerError) {
            alert("Проверьте правильность заполнения формы, пожалуйста");
        } else {
            props.addNewQuestion(questionType, props.currentCell.key, question, answers, correctAnswer);
        };
    };

    return (<form className={cn(styles.main, "w-11/12", "h-full", "flex", "flex-col", "text-3xl", "justify-evenly")}>

        <div className={cn("h-44", "flex", "flex-col", "justify-between")}>

            <p className={cn("text-white")}>Какой вопрос хотите добавить?</p>

            <ul className={cn("h-24", "flex", "text-gray-300", "flex-row", "justify-evenly")}>

                <li className={cn(props.creatingQuestionType === "text" ? "text-white" : '', "cursor-pointer")}
                    onClick={() => props.changeCreatingQuestionType("text")}>
                    Текстовый
                </li>

                <li className={cn(props.creatingQuestionType === "audio" ? "text-white" : '', "cursor-pointer")}
                    onClick={() => props.changeCreatingQuestionType("audio")}>
                    Аудио
                </li>

                <li className={cn(props.creatingQuestionType === "video" ? "text-white" : '', "cursor-pointer")}
                    onClick={() => props.changeCreatingQuestionType("video")}>
                    Видео
                </li>

            </ul>

        </div>

        <div className={cn(props.creatingQuestionType === "audio" ? "" : styles.hide, "h-28", "flex", "flex-col", "justify-between")}>

            <p className={cn("text-white")}>Добавьте аудио вопрос</p>

            <input name="audio" type="file" accept='audio/' />

        </div>

        <div className={cn(props.creatingQuestionType === "video" ? "" : styles.hide, "h-28", "flex", "flex-col", "justify-between")}>

            <p className={cn("text-white")}>Добавьте видео вопрос</p>

            <input name="video" type="file" accept='video/' />

        </div>

        {(questionVisited && questionError) && <div className={cn("text-red-800")}>{ questionError }</div>}
        <div className={cn(props.creatingQuestionType === "text" ? "" : styles.hide, "flex", "flex-col", "justify-between")}>
            <input value={question} onChange={e => onChangeHandler(e)} onBlur={e => onBlurHandler(e)} id="question" name="question" placeholder="Введите вопрос" />
        </div>

        {(option1Visited && option1Error) && <div className={cn("text-red-800")}>{ option1Error }</div>}
        <input value={option1} onChange={e => onChangeHandler(e)} onBlur={e => onBlurHandler(e)} id="option1" name="option1" placeholder={'Вариант ответа номер 1'} />

        {(option2Visited && option2Error) && <div className={cn("text-red-800")}>{ option2Error }</div>}
        <input value={option2} onChange={e => onChangeHandler(e)} onBlur={e => onBlurHandler(e)} id="option2" name="option2" placeholder={'Вариант ответа номер 2'} />

        {(option3Visited && option3Error) && <div className={cn("text-red-800")}>{ option3Error }</div>}
        <input value={option3} onChange={e => onChangeHandler(e)} onBlur={e => onBlurHandler(e)} id="option3" name="option3" placeholder={'Вариант ответа номер 3'} />

        {(correctAnswerVisited && correctAnswerError) && <div className={cn("text-red-800")}>{ correctAnswerError }</div>}
        <input value={correctAnswer} onChange={e => onChangeHandler(e)} onBlur={e => onBlurHandler(e)} id="correctAnswer" name="correctAnswer" placeholder={'Номер верного ответа'} />

        <input className={cn(styles.main, "text-white", "cursor-pointer")}
        onClick={() => onSubmitAnswerButton(props.creatingQuestionType)} type="button" value="Готово" />

    </form>)
};

export default CreateForm;