const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // const json_token = req.handshake.query.Token;
  if (!json_token) { return res.status(404).send({ message: 'Not access token' }); }
  jwt.verify(json_token, 'secretkey', (err, decoded) => {
    console.log(err);
    // if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }); }
    req.user = decoded;
    console.log('jwt', decoded);
    next();
  });
};

//   io.use((req, next) => {
//     const json_token = socket.handshake.query.token;

//     // verify token
//     jwt.verify(json_token, 'secretkey', (err, decoded) => {
//       if (err) return next(err);
//       // set the user’s mongodb _id to the socket for future use
//       req.user = decoded;
//       next();
//     });
//   });
// };
