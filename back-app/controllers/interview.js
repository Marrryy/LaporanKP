'use strict';

import _ from 'lodash';
import { Interview } from '../models';

const postInterview = {};

//GET
postInterview.getAll = async (req, res) => {
  try {
    const interviews = await Interview.findAll();
    return res.json(interviews);
  } catch (err) {
    return res.send(err);
  }
}


//Create
postInterview.add = async (req, res) => {
  try {
    const keys = Object.keys(Interview.rawAttributes);
    const body = _.pick(req.body, keys);
    const interviews = await Interview.create(body);
    return res.json(interviews);
  } catch (err) {
    console.log(err)
    return res.send(err);
  }
}

//Update
postInterview.update = async (req, res) => {
  try {
      const result = await Interview.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if(result){
        const interviews = await Interview.findOne({
          where: {
            id: req.params.id
          }
        });
        return res.json(interviews);
      }else{
        return res.json({
          message: "Can't update Interview"
        })
      }
  } catch (err) {
    return res.send(err);
  }
}
    
//remove post
postInterview.remove = async (req, res) => {
  try {
    const interviews = await Interview.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: "Interview has been deleted"
    })
  } catch (err) {
    return res.send(err);
  }
}

export default postInterview;