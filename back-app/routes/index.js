import express from 'express';

import UserRoute from './user';
import CompanyRoute from './company';
import JobRoute from './job';
import EmployeeRoute from './employee';
import InterviewRoute from './interview';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => res.send('Hello World!'));

router.use("/user", UserRoute);
router.use("/company", CompanyRoute);
router.use("/job", JobRoute);
router.use("/employee", EmployeeRoute);
router.use("/interview", InterviewRoute);


//module.exports(router)
export default router;
