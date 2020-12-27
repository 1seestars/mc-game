export const ws = new WebSocket('ws://localhost:4000')

export const sendToServer = (value) => {
  ws.send(JSON.stringify(value))
}
