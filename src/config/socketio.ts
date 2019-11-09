let configSocketIO = (io, passportSocketIo, cookieParser, session) => {
  io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser, // the same middleware you registrer in express
      key: process.env.APP_KEY, // the name of the cookie where express/connect stores its session_id
      secret: process.env.APP_SECRET, // the session_secret to parse the cookie
      store: session.sessionStore, // we NEED to use a sessionstore. no memorystore please
      success: (data, accept) => {
        if (!data.user.logged_in) {
          console.log("a");
          return accept("Invalid user.", false);
        }
        return accept(null, true);
      }, // *optional* callback on success - read more below
      fail: (data, message, error, accept) => {
        if (error) {
          console.log("failed connection to socket.io:", message);
          return accept(new Error(message), false);
        }
      } // *optional* callback on fail/error - read more below
    })
  );
};

export = configSocketIO;
