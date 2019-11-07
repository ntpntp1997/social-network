import passPort from "passport";
import passPortLocal from "passport-local";
import { transErrors, transSuccess, transMail } from "./../../lang/vi";
import { UserBusiness } from "../../business/userBusiness";

interface Greeter {
  (message: string): void;
}
class PassPortInit {
  constructor() {}

  sayHi(greeter: Greeter) {
    greeter("Hello!");
  }

  async checkUser(user, password, done) {
    let userBusiness = new UserBusiness();
    if (!user) {
      return done(null, false, transErrors.login_failed);
    }
    let checkPassword = await userBusiness.comparePassword(
      password,
      user.password
    );
    if (!checkPassword) {
      return done(null, false, transErrors.login_failed);
    }

    //return done(null, user, req.flash("success", transSuccess.login_success(user.username)))
    return done(null, user);
  }

  public initPassPortLocal() {
    let LocalStrategy = passPortLocal.Strategy;
    passPort.use(
      new LocalStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true
        },
        async (req, username, password, done) => {
          try {
            let userBusiness = new UserBusiness();
            let user;
            user = await userBusiness.findBy(
              "username",
              username,
              async (err, result) => {
                if (err) {
                  console.log(err);
                  return done(null, false, transErrors.server_error);
                } else {
                  user = result;
                  this.checkUser(user, password, done);
                }
              }
            );
          } catch (error) {
            console.log(error);
            return done(null, false, transErrors.server_error);
          }
        }
      )
    );

    // save userId to session
    passPort.serializeUser((user, done) => {
      done(null, user._id);
    });

    passPort.deserializeUser((id, done) => {
      let userBusiness = new UserBusiness();
      userBusiness.findById(id, (err, user) => {
        if (err) {
          return done(err, null);
        }
        return done(null, user);
      });
    });
  }
}
export = PassPortInit;
