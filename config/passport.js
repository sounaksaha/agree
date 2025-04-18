import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import Auth from '../model/auth.js';
dotenv.config();

const passportConfig = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const auth = await Auth.findById(jwt_payload.id).select('-password');
        if (auth) return done(null, auth);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

export default passportConfig;
