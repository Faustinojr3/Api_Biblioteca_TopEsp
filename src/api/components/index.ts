import { Router } from 'express';
import { BaseRoutes } from './base/base.routes';
import { AutorRoutes } from './autor/autor.routes';
import { LivroRoutes } from './livro/livro.routes';
import { PessoaRoutes } from './pessoa/pessoa.routes'; 

router.use(`${prefix}`, new BaseRoutes().routes());
router.use(`${prefix}/autor`, new AutorRoutes().routes());
router.use(`${prefix}/livro`, new LivroRoutes().routes());
router.use(`${prefix}/pessoa`, new PessoaRoutes().routes());