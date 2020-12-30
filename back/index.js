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
      characterId: 0,
      isReady: false
    }
    this.player_2 = {
      id: '',
      characterId: 0,
      isReady: false
    }
    this.icons = [
      {
        keyCode: 81,
        isShown: false
      },
      {
        keyCode: 87,
        isShown: false
      },
      {
        keyCode: 69,
        isShown: false
      },
      {
        keyCode: 82,
        isShown: false
      },
      {
        keyCode: 84,
        isShown: false
      },
      {
        keyCode: 89,
        isShown: false
      }
    ]
  }
}

const games = []
const characterList = Array(28).fill('')

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

          if (g[player].isReady) return

          if (payload.id) {
            g[player].characterId = payload.id
          }

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

    if (payload.method === 'ready') {
      // set ready
      games.forEach((g) => {
        if (g.id === payload.gameId) {
          const player = ws.id === g.player_1.id ? 'player_1' : 'player_2'
          g[player].isReady = !g[player].isReady

          server.clients.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              (client.id === g.player_1.id || client.id === g.player_2.id)
            ) {
              if (g.player_1.isReady && g.player_2.isReady) {
                client.send(
                  JSON.stringify({
                    message: 'nextPage'
                  })
                )
              } else {
                client.send(
                  JSON.stringify({
                    message: 'ready',
                    player_1: g.player_1.isReady,
                    player_2: g.player_2.isReady
                  })
                )
              }
            }
          })
        }
      })
    }

    if (payload.method === 'getVsScreenIcons') {
      games.forEach((g) => {
        if (g.id === payload.gameId) {
          server.clients.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              (client.id === g.player_1.id || client.id === g.player_2.id)
            ) {
              client.send(
                JSON.stringify({
                  message: 'setVsScreenIcons',
                  icons: g.icons
                })
              )
            }
          })
        }
      })
    }

    if (payload.method === 'changeVsScreenIcon') {
      games.forEach((g) => {
        if (g.id === payload.gameId) {
          g.icons = g.icons.map((icon) => {
            if (icon.keyCode === payload.keyCode) {
              icon.isShown = !icon.isShown
            }
            return icon
          })

          server.clients.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              (client.id === g.player_1.id || client.id === g.player_2.id)
            ) {
              client.send(
                JSON.stringify({
                  message: 'changedIcon',
                  icons: g.icons
                })
              )
            }
          })
        }
      })
    }
  })
})
