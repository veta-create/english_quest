// форма для создания вопроса
import cn from "classnames";
import styles from "./styles.module.css";
import { useInput } from "../../../hooks/useForm";
import React from "react";

interface CreateFormPropsTypes {
    createQuestion: (questionType: string, key: string, newQuestion: string, answers: [string, string, string], correctAnswer: number) =>
        ({ type: string, questionType: string, key: string, newQuestion: string, answers: [string, string, string], correctAnswer: number }),
    toggleCreatingQuestion: (creatingQuestion: boolean) => ({ type: string, creatingQuestion: boolean }),
    changeCreatingQuestionType: (creatingQuestionType: string) => ({ type: string, creatingQuestionType: string }),
    creatingQuestionType: string,
    currentCellKey: string
}

const CreateForm: React.FC<CreateFormPropsTypes> = (props) => {
    const question = useInput("", { isEmpty: true });
    const option1 = useInput("", { isEmpty: true });
    const option2 = useInput("", { isEmpty: true });
    const option3 = useInput("", { isEmpty: true });
    const correctAnswer = useInput("", { isEmpty: true, permissibleNumberValue: { min: 1, max: 3 } });
    const audio = useInput("", { isEmpty: true });
    const video = useInput("", { isEmpty: true });

    const onSubmitAnswerButton = (questionType: string): void => {
        let answers: [string, string, string] = [option1.value, option2.value, option3.value];
        if (option1.isEmpty ||
            option2.isEmpty ||
            option3.isEmpty ||
            correctAnswer.isEmpty ||
            correctAnswer.permissibleNumberValue) {
            alert("Проверьте правильность заполнения формы, пожалуйста");
        } else {
            if (props.creatingQuestionType === "text") {
                if (question.isEmpty) {
                    alert("Проверьте правильность заполнения формы, пожалуйста");
                } else {
                    props.createQuestion(questionType, props.currentCellKey, question.value, answers, +correctAnswer.value);
                    props.toggleCreatingQuestion(false);
                    question.clear();
                    option1.clear();
                    option2.clear();
                    option3.clear();
                    correctAnswer.clear();
                };
            };

            if (props.creatingQuestionType === "audio") {
                if (audio.isEmpty) {
                    alert("Загрузите аудио-вопрос");
                } else {
                    props.createQuestion(questionType, props.currentCellKey, audio.value, answers, +correctAnswer.value);
                    props.toggleCreatingQuestion(false);
                    audio.clear();
                    option1.clear();
                    option2.clear();
                    option3.clear();
                    correctAnswer.clear();
                };
            };

            if (props.creatingQuestionType === "video") {
                if (video.isEmpty) {
                    alert("Загрузите видео-вопрос");
                } else {
                    props.createQuestion(questionType, props.currentCellKey, video.value, answers, +correctAnswer.value);
                    props.toggleCreatingQuestion(false);
                    option1.clear();
                    option2.clear();
                    option3.clear();
                    correctAnswer.clear();
                    video.clear();
                };
            };
        };
    };

    return (<form className={cn("w-11/12", "h-full", "flex", "flex-col", "text-3xl", "justify-evenly")}>

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
            <p className={cn("text-white")}>*Добавьте аудио вопрос</p>
            <input name="audio" onChange={(e) => audio.onChange(e)} type="file" accept='audio/' />
        </div>

        <div className={cn(props.creatingQuestionType === "video" ? "" : styles.hide, "h-28", "flex", "flex-col", "justify-between")}>

            <p className={cn("text-white")}>*Добавьте видео вопрос</p>

            <input name="video" onChange={(e) => video.onChange(e)} type="file" accept='video/' />

        </div>

        <div className={cn(props.creatingQuestionType === "text" ? "" : styles.hide, "flex", "flex-col", "justify-between")}>
            {(props.creatingQuestionType === "text"
                && question.isVisited
                && question.isEmpty)
                && <div className={cn("text-yellow-500")}>{question.isEmptyErrorMessage}</div>}
            <input className={cn(styles.focusInput, "h-12", "rounded-2xl", "bg-gray-300", "text-3xl", "text-center")}
                value={question.value}
                onChange={(e) => question.onChange(e)}
                onBlur={() => question.onBlur()}
                id="question"
                name="question"
                placeholder="Введите вопрос" />
        </div>

        {(option1.isVisited && option1.isEmpty) && <div className={cn("text-yellow-500")}>{option1.isEmptyErrorMessage}</div>}
        <input className={cn(styles.focusInput, "h-12", "rounded-2xl", "bg-gray-300", "text-3xl", "text-center")}
            value={option1.value}
            onChange={(e) => option1.onChange(e)}
            onBlur={() => option1.onBlur()}
            id="option1"
            name="option1"
            placeholder={'Вариант ответа номер 1'} />

        {(option2.isVisited && option2.isEmpty) && <div className={cn("text-yellow-500")}>{option2.isEmptyErrorMessage}</div>}
        <input className={cn(styles.focusInput, "h-12", "rounded-2xl", "bg-gray-300", "text-3xl", "text-center")}
            value={option2.value}
            onChange={e => option2.onChange(e)}
            onBlur={() => option2.onBlur()}
            id="option2"
            name="option2"
            placeholder={'Вариант ответа номер 2'} />

        {(option3.isVisited && option3.isEmpty) && <div className={cn("text-yellow-500")}>{option3.isEmptyErrorMessage}</div>}
        <input className={cn(styles.focusInput, "h-12", "rounded-2xl", "bg-gray-300", "text-3xl", "text-center")}
            value={option3.value}
            onChange={e => option3.onChange(e)}
            onBlur={() => option3.onBlur()}
            id="option3"
            name="option3"
            placeholder={'Вариант ответа номер 3'} />

        {(correctAnswer.isVisited && correctAnswer.isEmpty)
            && <div className={cn(styles.focusInput, "text-yellow-500")}>{correctAnswer.isEmptyErrorMessage}</div>}
        {(correctAnswer.isVisited && correctAnswer.permissibleNumberValue)
            && <div className={cn("text-yellow-500")}>{correctAnswer.permissibleNumberValueErrorMessage}</div>}
        <input className={cn(styles.focusInput, "h-12", "rounded-2xl", "bg-gray-300", "text-3xl", "text-center")}
            value={correctAnswer.value}
            onChange={e => correctAnswer.onChange(e)}
            onBlur={() => correctAnswer.onBlur()}
            id="correctAnswer"
            name="correctAnswer"
            placeholder={'Номер верного ответа'} />

        <input className={cn(styles.main, "text-white", "cursor-pointer")}
            onClick={() => onSubmitAnswerButton(props.creatingQuestionType)} type="button" value="Готово" />

    </form>)
};

export default CreateForm;