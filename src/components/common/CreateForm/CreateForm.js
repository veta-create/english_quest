// форма для создания вопроса
import React from "react";
import cn from "classnames";
import styles from './CreateForm.module.css'

const CreateForm = (props) => {
    let question = React.createRef();
    let option1Value = React.createRef();
    let option2Value = React.createRef();
    let option3Value = React.createRef();
    let correctAnswer = React.createRef();

    const onSubmitAnswerButton = (questionType) => {
        let answers = []
        answers.push(option1Value.current.value)
        answers.push(option2Value.current.value)
        answers.push(option3Value.current.value)
        props.addNewQuestion(questionType, props.currentCell.key, question.current.value, answers, correctAnswer.current.value)
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

            <input type="file" accept='audio/' />

        </div>

        <div className={cn(props.creatingQuestionType === "video" ? "" : styles.hide, "h-28", "flex", "flex-col", "justify-between")}>

            <p className={cn("text-white")}>Добавьте видео вопрос</p>

            <input type="file" accept='video/' />

        </div>

        <div className={cn(props.creatingQuestionType === "text" ? "" : styles.hide, "flex", "flex-col", "justify-between")}>
            <input ref={question} id="question" placeholder="Введите вопрос" />
        </div>


        <input ref={option1Value} id="option1" placeholder={'Вариант ответа номер 1'} />

        <input ref={option2Value} id="option2" placeholder={'Вариант ответа номер 2'} />

        <input ref={option3Value} id="option3" placeholder={'Вариант ответа номер 3'} />

        <input ref={correctAnswer} id="correctAnswer" placeholder={'Номер верного ответа'} />

        <input className={cn(styles.main, "text-white", "cursor-pointer")}
        onClick={() => onSubmitAnswerButton(props.creatingQuestionType)} type="button" value="Готово" />

    </form>)
};

export default CreateForm;