const network = require('network')

module.exports = new (class WebSocketService {
  getIP() {
    return new Promise((resolve) => {
      network.get_private_ip((err, ip) => {
        resolve(ip || '0.0.0.0')
      })
    })
  }
})()
