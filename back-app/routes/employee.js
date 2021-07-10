
import {
    Router
  } from 'express';
  import EmployeeController from '../controllers/employee';
  const router = new Router();
  
  router.route('/')
    .get(EmployeeController.getAll)
    .post(EmployeeController.add);
  
  router.route('/:id')
    .put(EmployeeController.update)
    .delete(EmployeeController.remove);

  export default router;