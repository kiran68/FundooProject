import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    //console.log( "this brarerToken:" ,bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
     // bearer dfkjfffd2335545ffwejjkvjjd251
    bearerToken = bearerToken.split(' ')[1];

<<<<<<< Updated upstream
    const { user } = await jwt.verify(bearerToken, 'your-secret-key');
    res.locals.user = user;
    res.locals.token = bearerToken;
=======
    const  user  = await jwt.verify(bearerToken, process.env.JWT_SECRET);
    console.log('User object:', user);
    req.body.createdBy = user.id;
>>>>>>> Stashed changes
    next();
  } catch (error) {
    next(error);
  }
};

