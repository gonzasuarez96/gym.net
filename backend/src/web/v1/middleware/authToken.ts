import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender Request localmente
interface CustomRequest extends Request {
  userId?: string;
  userRole?: string;
}

// Middleware para autenticar y verificar el rol
export const authenticateAndAuthorize = (allowedRoles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log('allowedRoles:',allowedRoles)
    const authHeader = req.headers.authorization;
    console.log('authHeader:',req.headers)

    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
      
      // Almacenar la información del usuario en req
      req.userId = decoded.id;
      req.userRole = decoded.role;
      console.log('req.userRole:',req.userRole)
      console.log('decoded:',decoded)

      // Verificar el rol del usuario
      if (!allowedRoles.includes(req.userRole)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Continúa con la siguiente función middleware o ruta
      return next(); // Asegúrate de usar `return` para que TypeScript sepa que esta es una salida final.
    } catch (error) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
};
