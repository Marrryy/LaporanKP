'use strict';

import _ from 'lodash';
import { Job, Company, JobSkill, Skill, Interview} from '../models';

const postJob = {};

//GET
postJob.getAll = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    
    var jobSkill;
    for(let i=0;i<jobs.length;i++){
      //Get the JobSkill on each jobs 
      jobSkill = await JobSkill.findAll({
        where: {
            idJob:jobs[i].dataValues.id
          },
        include : 'Skills'
      });
      var jobSpecNames= [];

      //Take out the Skill name on each jobskill
      for(let j=0;j<jobSkill.length;j++){
        jobSpecNames.push(jobSkill[j].dataValues.Skills.name)
      }
      // push to jobspec
      jobs[i].dataValues.jobSpec =jobSpecNames; 
      }
    return res.json(jobs);
  } catch (err) {
    return res.send(err);
  }
}



//Create
postJob.add = async (req, res) => {
  try {
    const keys = Object.keys(Job.rawAttributes);
    const body = _.pick(req.body, keys);

    const jobs = await Job.create(body);


    const jobSpec=req.body.jobSpec;
    const skills = await Skill.findAll();
    
    let skill;
    var bulkJS=[];
    for(let i=0;i<jobSpec.length;i++){      
      let skillId="";

      skill = skills.find((x)=> x.dataValues.name ==jobSpec[i]);

      if(skill){
        skillId = skill.dataValues.id;
      }else{
        //If no skill yet, create
        let newSkills = await Skill.create({"name":jobSpec[i]});
        skillId = newSkills.id;
      }
      bulkJS.push({"idJob":jobs.dataValues.id, "idSkill":skillId});
    }
    //create bulk
    await JobSkill.bulkCreate(bulkJS);

    return res.json(jobs);
  } catch (err) {
    console.log(err)
    return res.send(err);
  }
}

//Update
postJob.update = async (req, res) => {
  try {
      const result = await Job.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if(!result){
        return res.json({
          message: "Can't update Job"
        })
      }

      if(req.body.jobSpec){  
        //Get the old JobSkill
        const jobSkill = await JobSkill.findAll({
          where: {
              idJob:req.params.id
            },
          include : 'Skills'
        });

        var oldjobSpecNames= [];
        //Take out the Skill name on each jobskill
        for(let j=0;j<jobSkill.length;j++){
          oldjobSpecNames.push({name:jobSkill[j].dataValues.Skills.name, skillId:jobSkill[j].dataValues.Skills.id })
        }
        // oldjobSpecNames = [{name:"asa", id:2}, {name:"saa",id:1} ]
        // newjobSpecNames =  ["asa", "sa"]
        // delete saa and add sa
        const newjobSpecNames=req.body.jobSpec;

        // delete all that doesnt need
        var finaldelete = oldjobSpecNames.filter(function(item) {
          return !newjobSpecNames.includes(item.name);
        })
        for(let i=0;i<finaldelete.length;i++){
          await JobSkill.destroy({
            where: {
              idSkill: finaldelete[i].skillId,
              idJob:req.params.id
            }
          });
        }


        // get all add item that haven't 
        var finaladd = newjobSpecNames.filter(function(n){
          return !oldjobSpecNames.some(function(o){
            return n === o.name;
          });
        })

        const skills = await Skill.findAll();
        let skill;
        var bulkJS=[];

        for(let i=0;i<finaladd.length;i++){      
          let skillId="";

          skill = skills.find((x)=> x.dataValues.name ==finaladd[i]);
        
          if(skill){
            skillId = skill.dataValues.id;
          }else{
            //If no skill yet, create
            let newSkills = await Skill.create({"name":finaladd[i]});
            skillId = newSkills.id;
          }

          bulkJS.push({"idJob":req.params.id, "idSkill":skillId});
        }
        //create bulk
        await JobSkill.bulkCreate(bulkJS);

        return res.json({
          message: "Update"
        })  
      }else{
        return res.json({
          message: "Nothing to update Job"
        })     
      }
  } catch (err) {
    return res.send(err);
  }
}
    
//remove post
postJob.remove = async (req, res) => {
  try {
    await Job.destroy({
      where: {
        id: req.params.id
      }
    });
    await JobSkill.destroy({
      where: {
          idJob:req.params.id
        }
    });
    await Interview.destroy({
      where: {
        idJob:req.params.id
      }
    })
    return res.json({
      message: "Job has been deleted"
    })
  } catch (err) {
    return res.send(err);
  }
}

export default postJob;