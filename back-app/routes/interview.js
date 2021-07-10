
import {
    Router
  } from 'express';
  import InterviewController from '../controllers/interview';
  const router = new Router();
  
  router.route('/')
    .get(InterviewController.getAll)
    .post(InterviewController.add);
  
  router.route('/:id')
    .put(InterviewController.update)
    .delete(InterviewController.remove);

  export default router;