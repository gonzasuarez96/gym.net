const { userLogin } = require('../controllers/authController')

const userLoginHandler = async (req: any, res: any): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await userLogin(email, password);
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); // httpOnly not available for JavaScript & maxAge = 1 day
      res.status(200).json({ accessToken, user });
    } catch (error) {
        const statusCode = (error as any).status || 500;
        res.status(statusCode).json({ error: (error as Error).message });
    }
  };
  
export default userLoginHandler;