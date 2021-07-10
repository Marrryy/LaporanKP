'use strict';

import _ from 'lodash';
import { Company } from '../models';

const postCompany = {};

//GET
postCompany.getAll = async (req, res) => {
  try {
    const companys = await Company.findAll();
    return res.json(companys);
  } catch (err) {
    return res.send(err);
  }
}



//Create
postCompany.add = async (req, res) => {
  try {
    const keys = Object.keys(Company.rawAttributes);
    const body = _.pick(req.body, keys);
    const companys = await Company.create(body);
    return res.json(companys);
  } catch (err) {
    console.log(err)
    return res.send(err);
  }
}

postCompany.update = async (req, res) => {
  try {
    const result = await Company.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(result){
      const companys = await Company.findOne({
        where: {
          id: req.params.id
        }
      });
      return res.json(companys);
    }else{
      return res.json({
        message: "Can't update Company"
      })
    }
} catch (err) {
  return res.send(err);
}
}

export default postCompany;