import {
    Router
  } from 'express';
  import CompanyController from '../controllers/company';
  const router = new Router();
  
  router.route('/')
    .get(CompanyController.getAll)
    .post(CompanyController.add);
  
  router.route('/:id')
    .put(CompanyController.update);
  export default router;