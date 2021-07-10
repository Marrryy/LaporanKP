'use strict';

import _ from 'lodash';
import { User, Company, Employee } from '../models/';
import bcrypt from 'bcrypt';
const postUser = {};

// GET
postUser.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id','name','rank','email']
    });
    return res.json(users);
    
  } catch (err) {
    return res.send(err);
  }
}


//GETBYEMAIL
postUser.getByEmail = async (req, res) => {
  try {
    const users = await User.findOne({
      where: {
        email: req.params.email
      }
    });
    if(!users){
      return res.status(404).send("This user is never exist") 
    }
    const check = await bcrypt.compare(req.headers.password, users.dataValues.password);
    //const check = users.dataValues.password === req.headers.password;
    console.log(check)
    if(check){
      const returnn = {id:users.dataValues.id , name:users.dataValues.name, rank:users.dataValues.rank}; 
      return res.json(returnn);
    }
    return res.status(400).send('Wrong Password');
    
  } catch (err) {
    return res.send(err);
  }
}

//Create
postUser.add = async (req, res) => {
  try {
    const keys = Object.keys(User.rawAttributes);
    const body = _.pick(req.body, keys);

    const check = await User.findOne({
      where: {
        email: body.email
      }
    });
    if(check){
      return res.status(404).send("This email already signed") 
    }
    body.password = await bcrypt.hash(body.password, 8);
    const users = await User.create(body);
    const returnn = {id:users.dataValues.id , name:users.dataValues.name, rank:users.dataValues.rank}; 

    if(users.dataValues.rank == 1) {
      //if Company
      await Company.create({name:users.dataValues.name,postBy:users.dataValues.id});
    }else if(users.dataValues.rank == 2){
      //if Employee
      await Employee.create({name:users.dataValues.name,postBy:users.dataValues.id,status:0})
    }

    return res.json(returnn);
  } catch (err) {
    console.log(err)
    return res.send(err);
  }
}

// //Update
postUser.update = async (req, res) => {
  try {
      const keys = Object.keys(User.rawAttributes);
      const body = _.pick(req.body, keys);
      body.password = await bcrypt.hash(body.password, 8);

      const result = await User.update(body, {
        where: {
          id: req.params.id
        }
      });
      if(result){
        const users = await User.findOne({
          where: {
            id: req.params.id
          }
        });
        return res.json(users);
      }else{
        return res.json({
          message: "Can't update User"
        })
      }
  } catch (err) {
    return res.send(err);
  }
}
    
//remove post
postUser.remove = async (req, res) => {
  try {
    const users = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: "User has been deleted"
    })
  } catch (err) {
    return res.send(err);
  }
}

export default postUser;