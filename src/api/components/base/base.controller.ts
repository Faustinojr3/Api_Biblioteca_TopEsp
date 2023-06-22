<<<<<<< HEAD

=======
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
import { Request, Response } from 'express';

export class BaseController {
  
  public index(req: Request, res: Response) {
    res.status(200).json({ message: 'Api running....' });
  }

  public info(req: Request, res: Response) {
    res.status(200).json({
<<<<<<< HEAD
      name: 'API REST  - Biblioteca Online',
=======
      name: 'API REST - BibliotecaFP',
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
      mode: 'development',
      version: '1.0.0',
    });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
