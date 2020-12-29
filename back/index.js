const WebSocket = require('ws')
const uniqid = require('uniqid')

const server = new WebSocket.Server({ port: 4000 }, () =>
  console.log('Server started...')
)

class Game {
  constructor(id, player_1_id) {
    this.id = id
    this.openToEnter = true
    this.player_1 = {
      id: player_1_id,
      characterId: 0
    }
    this.player_2 = {
      id: '',
      characterId: 0
    }
  }

  // calculateWinner = () => {
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6]
  //   ]
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a, b, c] = lines[i]
  //     if (
  //       this.gameProcess.squares[a] &&
  //       this.gameProcess.squares[a] === this.gameProcess.squares[b] &&
  //       this.gameProcess.squares[a] === this.gameProcess.squares[c]
  //     ) {
  //       this.gameProcess.winner = this.gameProcess.squares[a]
  //     }
  //   }
  //   const emptySquare = this.gameProcess.squares.find((item) => item === null)
  //   if (emptySquare === undefined) this.gameProcess.winner = 'friendship'
  // }
}

const games = []
const characterList = Array(28).fill({
  name: 'test'
})

server.on('connection', (ws) => {
  ws.id = uniqid()
  const response = {
    message: 'initialization',
    id: ws.id
  }
  ws.send(JSON.stringify(response))

  ws.on('message', (clientPayload) => {
    const payload = JSON.parse(clientPayload)

    if (payload.method === 'create') {
      // creating new game
      const game = new Game(uniqid(), ws.id)

      games.push(game)
      ws.send(JSON.stringify({ message: 'newGame', gameId: game.id }))
    }

    if (payload.method === 'join') {
      // join the game
      let foundSuchGame = false
      games.forEach((g) => {
        if (g.id === payload.invitationId && g.openToEnter) {
          g.player_2.id = ws.id
          g.openToEnter = false
          server.clients.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              (client.id === g.player_1.id || client.id === g.player_2.id)
            ) {
              client.send(
                JSON.stringify({
                  message: 'confirmed',
                  gameId: g.id,
                  characterList
                })
              )
              client.gameId = g.id
            }
          })
          foundSuchGame = true
        }
      })
      if (!foundSuchGame) ws.send(JSON.stringify({ message: 'noGameFound' }))
    }

    if (payload.method === 'changeCharacter') {
      // paying the game
      games.forEach((g) => {
        if (g.id === payload.gameId) {
          const player = ws.id === g.player_1.id ? 'player_1' : 'player_2'

          if (payload.action === 'next') {
            if (g[player].characterId < characterList.length - 1) {
              g[player].characterId++
            }
          }

          if (payload.action === 'previous') {
            if (g[player].characterId > 0) {
              g[player].characterId--
            }
          }
        }

        server.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            (client.id === g.player_1.id || client.id === g.player_2.id)
          ) {
            client.send(
              JSON.stringify({
                message: 'step',
                player_1: g.player_1.characterId,
                player_2: g.player_2.characterId
              })
            )
          }
        })
      })
    }

    if (payload.method === 'retry') {
      // restart the game
      games.forEach((g) => {
        if (g.id === payload.gameId) {
          if (g.gameProcess.winner) {
            g.gameProcess = {
              squares: Array(9).fill(null),
              xIsNext: true,
              winner: false
            }

            server.clients.forEach((client) => {
              if (
                client.readyState === WebSocket.OPEN &&
                (client.id === g.playerX || client.id === g.playerO)
              ) {
                client.send(JSON.stringify({ gameProcess: g.gameProcess }))
              }
            })
          }
        }
      })
    }

    if (payload.method === 'quit') {
      // quit the game
      games.forEach((g, index, array) => {
        if (g.id === payload.gameId) {
          games = array.filter((game) => game.id !== payload.gameId)

          server.clients.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              (client.id === g.playerX || client.id === g.playerO)
            ) {
              client.send(JSON.stringify({ message: 'gameOver' }))
              client.gameId = ''
            }
          })
        }
      })
    }
  })
})
