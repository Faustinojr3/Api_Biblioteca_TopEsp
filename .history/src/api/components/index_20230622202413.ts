import { Router } from 'express';
//import { UserRoutes } from './user/user.routes';
import { BaseRoutes } from './base/base.routes';
import { AutorRoutes } from './autor/autor.routes';
import { EditoraRoutes } from './editora/editora.routes'
import { LivroRoutes } from './livro/livro.routes';
import { ContatoRoutes } from './contato/contato.routes';
import { EnderecoRoutes } from './endereco/endereco.routes';
import { PessoaRoutes } from './pessoa/pessoa.routes'; 
import { EmprestimoRoutes } from './emprestimo/emprestimo.routes';   


/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}`, new BaseRoutes().routes());
  router.use(`${prefix}/autor`, new AutorRoutes().routes());
  router.use(`${prefix}/editora`, new EditoraRoutes().routes());
  router.use(`${prefix}/livro`, new LivroRoutes().routes());
  router.use(`${prefix}/contato`, new ContatoRoutes().routes());
  router.use(`${prefix}/endereco`, new EnderecoRoutes().routes());
  router.use(`${prefix}/pessoa`, new PessoaRoutes().routes());
  router.use(`${prefix}/emprestimo`, new EmprestimoRoutes().routes());
}