import { gameReducer, scoreCounter } from "./gameReducer"

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
    players: [{ key: "01", name: "Arut", score: 0}, { key: "02", name: "Veta", score: 0 }],
    currentPlayer: "01",
    currentQuestion: { key: "01", question: '1?', answers: ['п', 'н', 'н'], score: 200, currentAnswer: 0, correct: 0 },
    questionAnswered: 0,
    gameOver: false, 
    winner: ['', 0]
}

describe('when the answer is correct, points increase', () => {
    it('current player points must increase by the value of the cell', () => {
      const action = scoreCounter(0)

      const result = gameReducer(state, action)
  
      expect(result.players[0].score).toEqual(200)
    })
  })