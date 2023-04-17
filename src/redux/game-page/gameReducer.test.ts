import lodash from 'lodash';
import {
  cellClosure,
  changeCurrentQuestion,
  determineWinner,
  setGameOver,
  gameReducer,
  playerChange,
  scoreCounter,
  setQuestionIsClosed,
  ChangeCurrentQuestion,
  ScoreCounter,
  PlayerChange,
  CellClosure,
  SetGameOver,
  DetermineWinner,
  SetQuestionIsClosed,
  changeQuestionAnswered,
  ChangeQuestionAnswered,
  addNewPlayers,
  AddNewPlayers,
  setCurrentPlayer
} from "./gameReducer";
import { GameState } from '../../../types';

let state: GameState = {
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
  playersCount: 0,
  players: [{ key: "01", name: "Arut", score: 100 }, { key: "02", name: "Veta", score: 0 }],
  currentPlayer: "01",
  currentQuestion: { key: "01", question: '1?', answers: ['п', 'н', 'н'], score: 200, currentAnswer: 0, correct: 0 },
  questionIsClosed: true,
  questionAnswered: 0,
  gameOver: false,
  winner: ['', 0]
}

describe('the number of player points must change', () => {

  it('the answer is correct, the points of the current player must be equal to 300', () => {
    const action: ScoreCounter = scoreCounter(0);

    const result = gameReducer(state, action);

    expect(result.players[0].score).toBe(300);
  });

  it('the answer is incorrect, the points of the current player must be equal to 0', () => {
    const action: ScoreCounter = scoreCounter(2);

    const result = gameReducer(state, action);

    expect(result.players[0].score).toBe(0);
  });

});

describe('current question must change', () => {
  const action: ChangeCurrentQuestion = changeCurrentQuestion({
    key: '02',
    score: 200,
    question: '2?',
    answers: ['п', 'н', 'н'],
    correct: 0,
    close: false
  });
  const result = gameReducer(state, action);

  it('key must be "02"', () => {
    expect(result.currentQuestion.key).toBe('02');
  });

  it('score must be 200', () => {
    expect(result.currentQuestion.score).toBe(200);
  });

  it('question must be "2?"', () => {
    expect(result.currentQuestion.question).toBe('2?');
  });

  it('answers must be equal ["п", "н", "н"]', () => {
    expect(result.currentQuestion.answers).toEqual(['п', 'н', 'н']);
  });

  it('correct must be 0', () => {
    expect(result.currentQuestion.correct).toBe(0);
  });

  it('current answer must be 0', () => {
    expect(result.currentQuestion.currentAnswer).toBe(0);
  });
});

describe('the current player must change', () => {
  it('current player must be "02"', () => {
    const action: PlayerChange = playerChange();

    const result = gameReducer(state, action);

    expect(result.currentPlayer).toBe("02");
  });

  it('current player must be "01"', () => {
    const action: PlayerChange = playerChange();

    const newState = lodash.cloneDeep(state);

    newState.currentPlayer = newState.players[newState.players.length - 1].key;

    const result = gameReducer(newState, action);

    expect(result.currentPlayer).toBe("01");
  })
});

describe('game cell must be closed', () => {
  it('the close field of the cell with the key "01" must be true', () => {
    const action: CellClosure = cellClosure("01");

    const result = gameReducer(state, action);

    expect(result.field[0][0].close).toBe(true);
  });
});

describe('game over must be change', () => {
  it('game over must be true', () => {
    const action: SetGameOver = setGameOver();

    const result = gameReducer(state, action);

    expect(result.gameOver).toBe(true);
  });
});

describe('the winner must change', () => {
  it('the winner must be ["Arut", 100]', () => {
    const action: DetermineWinner = determineWinner();

    const result = gameReducer(state, action);

    expect(result.winner).toEqual(["Arut", 100]);
  });

  it('the winner must be ["Все", 100](dead heat)', () => {
    const action: DetermineWinner = determineWinner();

    const newState = lodash.cloneDeep(state);

    newState.players[1].score = 100;

    let result = gameReducer(newState, action);

    expect(result.winner).toEqual(['Все', 100]);
  });
});

describe('question is closed must change', () => {
  it('question is closed must be true', () => {
    const action: SetQuestionIsClosed = setQuestionIsClosed(true);

    const result = gameReducer(state, action);

    expect(result.questionIsClosed).toBe(true);
  });

  it('question is closed must be false', () => {
    const action: SetQuestionIsClosed = setQuestionIsClosed(false);

    const result = gameReducer(state, action);

    expect(result.questionIsClosed).toBe(false);
  });
});

describe('question is answered must change', () => {
  it('question is closed must be 1', () => {
    const action: ChangeQuestionAnswered = changeQuestionAnswered();

    const result = gameReducer(state, action);

    expect(result.questionAnswered).toBe(1);
  });
});

describe('players must change', () => {
  it('a new player should be added to the player("Danil")', () => {
    const action: AddNewPlayers = addNewPlayers(["Danil"]);

    let stateCopy = state;

    stateCopy.players = [];

    const result = gameReducer(stateCopy, action);

    expect(result.players).toEqual(
      [{ key: "01", name: "Danil", score: 0 }]
    );
  });
});

describe('current player must change', () => {
  it('current player must be "03"', () => {
    const action = setCurrentPlayer("03");

    const result = gameReducer(state, action);

    expect(result.currentPlayer).toBe("03");
  });
});