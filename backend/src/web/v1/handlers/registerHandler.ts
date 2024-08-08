const { newUserRegister } = require('../controllers/registerController')

const newUserRegisterHandler = async (req: any, res: any): Promise<void> => {
    try {
      const body = req.body;
      const newUser = await newUserRegister(body);
      res.status(201).json(newUser);
    } catch (error) {
        res.status((error as any).status || 500).json({ error: (error as Error).message });
    }
  };
  
export default newUserRegisterHandler;