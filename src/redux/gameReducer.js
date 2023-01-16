const CHANGE_CURRENT_QUESTION = "CHANGE_CURRENT_QUESTION";
const CHANGE_CURRENT_ANSWER = "CHANGE_CURRENT_ANSWER";

let initialState = {
    field: [
      [{score: 200, question: '1?', answers: ['+', '-', '!'], correct: 0}, {score: 200, question: '2?', answers: ['-', '+', '!'], correct: 1}, {score: 200, question: '3?', answers: ['+', '-', '!'], correct: 2}],
      [{score: 400, question: '4?', answers: ['+', '-', '!'], correct: 2}, {score: 400, question: '5?', answers: ['+', '-', '!'], correct: 0}, {score: 400, question: '6?', answers: ['+', '-', '!'], correct: 0}],
      [{score: 600, question: '7?', answers: ['+', '-', '!'], correct: 1}, {score: 600, question: '8?', answers: ['+', '-', '!'], correct: 1}, {score: 600, question: '9?', answers: ['+', '-', '!'], correct: 1}]
    ], 
    players: [{key: "01", name: "Arut", score: 1000}, {key: "02", name: "Veta", score: 900}],
    currentPlayer: "01",
    currentQuestion: {question: '?', answers: ['----', '++++', '!!!!'], currentAnswer: 0, correct: 1}
}

export const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_CURRENT_QUESTION:
            return {
                ...state, 
                currentQuestion: {
                    ...state.currentQuestion,
                    question: action.newQuestion,
                    answers: action.newAnswers
                },
            };
        case CHANGE_CURRENT_ANSWER:
            return {
                ...state,
                currentQuestion: {
                    ...state.currentQuestion,
                    currentAnswer: action.currentAnswer
                } 
            }
        default: 
            return state;
    }
};

export const changeCurrentQuestion = (newQuestion, newAnswers) => ({
    type: CHANGE_CURRENT_QUESTION,
    newQuestion, 
    newAnswers
 });

export const changeCurrentAnswer = (currentAnswer) => ({
    type: CHANGE_CURRENT_ANSWER,
    currentAnswer
});