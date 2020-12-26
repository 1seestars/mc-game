const sendToServer = (value) => {
  this.ws.send(JSON.stringify(value))
}
