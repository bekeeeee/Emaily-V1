const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(proxy("/api", { target: "http://localhost:5000/" }));

  app.use(proxy("/auth/google", { target: "http://localhost:5000/" }));
};

// const proxy = require("http-proxy-middleware");
// module.exports = function (app) {
//   app.use(proxy("/api/putobject", { target: "http://server1.com" })),
//     app.use(proxy("/api/getobject", { target: "http://server2.com" })),
//     app.use(proxy("/api/deleteobject", { target: "http://server3.com" }));
// };
