import { changeCurrentQuestion, gameReducer, scoreCounter } from "./gameReducer";

let state = {
  fieldWidth: 3,
  fieldHeight: 3,
  themes: ["BTS", "Minecraft", "Олимпийские игры"],
  field: [
    [{ key: "01", score: 200, question: '1?', answers: ['п', 'н', 'н'], correct: 0, close: false },
    { key: "02", score: 200, question: '2?', answers: ['п', 'н', 'н'], correct: 0, close: false },
    { key: "03", score: 200, question: '3?', answers: ['н', 'н', 'п'], correct: 2, close: false }],
    [{ key: "04", score: 400, question: '4?', answers: ['н', 'н', 'п'], correct: 2, close: false },
    { key: "05", score: 400, question: '5?', answers: ['н', 'п', 'н'], correct: 1, close: false },
    { key: "06", score: 400, question: '6?', answers: ['п', 'н', 'н'], correct: 0, close: false }],
    [{ key: "07", score: 600, question: '7?', answers: ['н', 'п', 'н'], correct: 1, close: false },
    { key: "08", score: 600, question: '8?', answers: ['н', 'п', 'н'], correct: 1, close: false },
    { key: "09", score: 600, question: '9?', answers: ['н', 'п', 'н'], correct: 1, close: false }]
  ],
  players: [{ key: "01", name: "Arut", score: 200 }, { key: "02", name: "Veta", score: 0 }],
  currentPlayer: "01",
  currentQuestion: { key: "01", question: '1?', answers: ['п', 'н', 'н'], score: 200, currentAnswer: 0, correct: 0 },
  questionAnswered: 0,
  gameOver: false,
  winner: ['', 0]
}

describe('the number of player points should change', () => {

  it('the answer is correct, the points of the current player must be equal to 200', () => {
    const action = scoreCounter(0);

    const result = gameReducer(state, action);

    expect(result.players[0].score).toBe(400);
  });

  it('the answer is incorrect, the points of the current player must be equal to 0', () => {
    const action = scoreCounter(2);

    const result = gameReducer(state, action);

    expect(result.players[0].score).toBe(0);
  });
});

describe('current question should change', () => {
  const action = changeCurrentQuestion({ key: "02", score: 200, question: '2?', answers: ['п', 'н', 'н'], correct: 0, close: false });
  const result = gameReducer(state, action);

  it('key must be 02', () => {
    expect(result.currentQuestion.key).toBe('02');
  });

  it('score must be 200', () => {
    expect(result.currentQuestion.score).toBe(200);
  });

  it('question must be 2?', () => {
    expect(result.currentQuestion.question).toBe('2?');
  });

  it('answers must be equal [п, н, н]', () => {
    expect(result.currentQuestion.answers).toEqual(['п', 'н', 'н']);
  });

  it('correct must be 0', () => {
    expect(result.currentQuestion.correct).toBe(0);
  });

  it('current answer must be 0', () => {
    expect(result.currentQuestion.currentAnswer).toBe(0);
  });
});