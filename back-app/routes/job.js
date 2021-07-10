import {
    Router
  } from 'express';
  import JobController from '../controllers/job';
  const router = new Router();
  
  router.route('/')
    .get(JobController.getAll)
    .post(JobController.add);

    router.route('/:id')
    .put(JobController.update)
    .delete(JobController.remove);
  
  export default router;