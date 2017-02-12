const startValues = {
  APPL: [119.2500],
  GOOGL: [829.5300],
  FB: [126.6200],
  MSFT: [62.6100]
}

class Market {
  constructor () {
    this.history = startValues
  }

  startNewDay () {
    Object.keys(this.history).forEach((ticker) => {
      this.history[ticker] = [this.getLastPrice[ticker]]
    })
  }

  generateMarketEvents () {
    let changes = {}
    Object.keys(this.history).forEach((ticker) => {
      const chance = Math.random()
      if (chance < 0.5) {
        return this.history[ticker].push(this.getLastPrice(ticker))
      }

      if (chance < 0.85) {
        changes[ticker] = parseInt(Math.random() * 25000) / 10000
        return this.history[ticker].push(this.getLastPrice(ticker) + changes[ticker])
      }

      changes[ticker] = -parseInt(Math.random() * 20000) / 10000
      this.history[ticker].push(this.getLastPrice(ticker) + changes[ticker])
    })

    return changes
  }

  getLastPrice (ticker) {
    return this.history[ticker][this.history[ticker].length - 1]
  }
}

module.exports = Market
