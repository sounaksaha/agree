import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import Admin from '../model/admin.js';
dotenv.config();

const passportConfig = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const admin = await Admin.findById(jwt_payload.id).select('-password');
        if (admin) return done(null, admin);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

export default passportConfig;
