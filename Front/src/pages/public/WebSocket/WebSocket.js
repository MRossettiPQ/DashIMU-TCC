import { Component, Prop, Vue } from "vue-property-decorator";

export default {
  name: "App",
  // data: function () {
  //   return {
  //     connection: null,
  //   };
  // },
  // methods: {
  //   sendMessage: function (message) {
  //     console.log("Hello");
  //     console.log(this.connection);
  //     this.connection.send(message);
  //   },
  // },
  // created: function () {
  //   console.log("Starting connection to WebSocket Server");
  //   this.connection = new WebSocket("ws://192.168.16.104:9000/socket");
  //
  //   this.connection.onmessage = function (event) {
  //     console.log(event);
  //   };
  //
  //   this.connection.onopen = function (event) {
  //     console.log(event);
  //     console.log("Successfully connected to the echo websocket server...");
  //   };
  // },
  created: () => {
    const WebSocketServer = require("websocket").server;
    const http = require("http");

    const server = http.createServer(function (request, response) {
      console.log(new Date() + " Received request for " + request.url);
      response.writeHead(404);
      response.end();
    });
    server.listen(8080, function () {
      console.log(new Date() + " Server is listening on port 8080");
    });

    let wsServer = new WebSocketServer({
      httpServer: server,
      // You should not use autoAcceptConnections for production
      // applications, as it defeats all standard cross-origin protection
      // facilities built into the protocol and the browser.  You should
      // *always* verify the connection's origin and decide whether or not
      // to accept it.
      autoAcceptConnections: false,
    });

    // wss.on("connection", function connection(ws) {
    //   ws.on("message", function incoming(message) {
    //     console.log("received: %s", message);
    //   });
    //
    //   ws.send("something");
    // });
  },
};

// @Component({
//   name: "Sensor",
// })
// class WebSocket extends Vue {
//   connection = null;
//
//   created() {
//     console.log("Starting connection to WebSocket Server");
//     this.connection = new WebSocket("wss://192.168.16.104:9000/api/socket");
//
//     this.connection.onmessage = function (event) {
//       console.log(event);
//     };
//
//     this.connection.onopen = function (event) {
//       console.log(event);
//       console.log("Successfully connected to the echo websocket server...");
//     };
//   }
//
//   sendMessage(message) {
//     console.log(this.connection);
//     this.connection.send(message);
//   }
// }
//
// export default WebSocket;
