import {
    Router
  } from 'express';
  import UserController from '../controllers/user';
  const router = new Router();
  
  router.route('/')
    .get(UserController.getAll)
    .post(UserController.add);
    

  router.route('/:email')
  .get(UserController.getByEmail)
  
    router.route('/:id')
    .put(UserController.update)
    .delete(UserController.remove);
  
  export default router;