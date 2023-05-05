// форма для создания вопроса
import cn from "classnames";
import styles from "./styles.module.css";
import { useInput } from "../../../hooks/useForm";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { changeCreatingQuestionType, createQuestion, toggleCreatingQuestion } from "../../../redux/constructor-page/constructorSlice";
import { useAppSelector } from "../../../hooks/useSelector";
import { RootState } from "../../../redux/store";

const CreateForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentCellKey = useAppSelector((state: RootState) => state.constructorPage.currentCellKey);
    const creatingQuestionType = useAppSelector((state: RootState) => state.constructorPage.creatingQuestionType);
    const question = useInput("", { isEmpty: true });
    const option1 = useInput("", { isEmpty: true });
    const option2 = useInput("", { isEmpty: true });
    const option3 = useInput("", { isEmpty: true });
    const correctAnswer = useInput("", { isEmpty: true, permissibleNumberValue: { min: 1, max: 3 } });
    const audio = useInput("", { isEmpty: true });
    const video = useInput("", { isEmpty: true });
    const audioPicker = useRef<HTMLInputElement>(null);
    const [audioFile, setAudioFile] = useState<Blob>();
    const [audioKey, setAudioKey] = useState<string>();

    useEffect(() => {
        fetch("/api/audioKeys")
            .then(res => res.json())
            .then(res => setAudioKey(res[res.length - 1].key))
            .catch(err => console.log("Oops: " + err));
    }, [currentCellKey]);

    const getKey = (lastKey: string) => {
        return ("0" + (Number(lastKey) + 1));
    };

    const audioHandle = () => {
        if (audioPicker.current) {
            audioPicker.current.click();
        };
    };

    const onSubmitAnswerButton = async (questionType: string): Promise<void> => {
        let answers: string[] = [option1.value, option2.value, option3.value];

        if (option1.isEmpty ||
            option2.isEmpty ||
            option3.isEmpty ||
            correctAnswer.isEmpty ||
            correctAnswer.permissibleNumberValue) {
            alert("Проверьте правильность заполнения формы, пожалуйста");
        } else {
            if (creatingQuestionType === "text") {
                if (question.isEmpty) {
                    alert("Проверьте правильность заполнения формы, пожалуйста");
                } else {
                    dispatch(createQuestion({
                        questionType: questionType,
                        key: currentCellKey,
                        newQuestion: question.value,
                        answers: answers,
                        correctAnswer: +correctAnswer.value,
                        type: "text"
                    }));
                    dispatch(toggleCreatingQuestion(false));
                    question.clear();
                    option1.clear();
                    option2.clear();
                    option3.clear();
                    correctAnswer.clear();
                };
            };

            if (creatingQuestionType === "audio") {
                if (audio.isEmpty) {
                    alert("Загрузите аудио-вопрос");
                } else {
                    dispatch(toggleCreatingQuestion(false));
                    option1.clear();
                    option2.clear();
                    option3.clear();
                    correctAnswer.clear();

                    const audioData = new FormData();
                    let key = '';

                    if (audioKey) {
                        key = getKey(audioKey);
                    };

                    if (audioFile) {
                        audioData.append("audio", audioFile);
                        audioData.append("key", JSON.stringify({ key: key }));
                    };

                    console.log(audioFile)

                    if (audioFile) {
                        dispatch(createQuestion({
                            questionType: questionType,
                            key: currentCellKey,
                            newQuestion: key + `.${audioFile.name.substring(audioFile.name.length - 3)}`,
                            answers: answers,
                            correctAnswer: +correctAnswer.value,
                            type: "audio"
                        }));
                    }

                    await fetch("/api/audios", { method: "POST", body: audioData })
                        .then(() => console.log("Аудио загружены"))
                        .catch((err) => console.log("Oops: " + err));

                    audio.clear();
                };
            };

            if (creatingQuestionType === "video") {
                if (video.isEmpty) {
                    alert("Загрузите видео-вопрос");
                } else {
                    dispatch(createQuestion({
                        questionType: questionType,
                        key: currentCellKey,
                        newQuestion: question.value,
                        answers: answers,
                        correctAnswer: +correctAnswer.value,
                        type: "video"
                    }));
                    dispatch(toggleCreatingQuestion(false));
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

                <li className={cn(creatingQuestionType === "text" ? "text-white" : '', "cursor-pointer")}
                    onClick={() => dispatch(changeCreatingQuestionType("text"))}>
                    Текстовый
                </li>

                <li className={cn(creatingQuestionType === "audio" ? "text-white" : '', "cursor-pointer")}
                    onClick={() => dispatch(changeCreatingQuestionType("audio"))}>
                    Аудио
                </li>

                <li className={cn(creatingQuestionType === "video" ? "text-white" : '', "cursor-pointer")}
                    onClick={() => dispatch(changeCreatingQuestionType("video"))}>
                    Видео
                </li>

            </ul>

        </div>

        <div className={cn(creatingQuestionType === "audio" ? "" : styles.hide, "h-28", "flex", "flex-col", "justify-between")}>

            <p className={cn("text-white")}>*Добавьте аудио вопрос</p>

            <input className={cn(styles.hidden)} name="audio" ref={audioPicker}
                onChange={(e) => {
                    audio.onChange(e);
                    if (e.target.files) {
                        setAudioFile(e.target.files[0])
                    };
                }} type="file" accept='.mp3,.mp4' />

            <input type="button" className={cn(styles.download, "text-white", "border-4", "border-dashed", "border-yellow-500", "cursor-pointer")}
                value="Загрузить аудио"
                onClick={audioHandle} />

        </div>

        <div className={cn(creatingQuestionType === "video" ? "" : styles.hide, "h-28", "flex", "flex-col", "justify-between")}>

            <p className={cn("text-white")}>*Добавьте видео вопрос</p>

            <input className={cn(styles.hidden)} name="video" onChange={(e) => video.onChange(e)} type="file" accept='video/*' />

            <button className={cn(styles.download, "text-white", "border-4", "border-dashed", "border-yellow-500")}>Загрузить видео</button>

        </div>

        <div className={cn(creatingQuestionType === "text" ? "" : styles.hide, "flex", "flex-col", "justify-between")}>
            {(creatingQuestionType === "text"
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
            onClick={() => onSubmitAnswerButton(creatingQuestionType)} type="button" value="Готово" />

    </form>)
};

export default CreateForm;