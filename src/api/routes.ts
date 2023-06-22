import { Router } from 'express';
import { registerRoutes } from './components';

/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */
export function initRoutes(router: Router): void {
  const prefix: string = '/api/v1';

  registerRoutes(router, prefix);
<<<<<<< HEAD
}
=======
}
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
