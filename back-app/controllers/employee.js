'use strict';

import _ from 'lodash';
import { Employee, EmployeeSkill, Skill, Interview } from '../models';

const postEmployee = {};

//GET
postEmployee.getAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();

    var employeeSkill;
    for(let i=0;i<employees.length;i++){
      //Get the employeeSkill on each employees 
      employeeSkill = await EmployeeSkill.findAll({
        where: {
          idEmployee:employees[i].dataValues.id
          },
        include : 'Skills'
      });
      var empoSkillNames= [];

      //Take out the Skill name on each employeeskill
      for(let j=0;j<employeeSkill.length;j++){
        empoSkillNames.push({name:employeeSkill[j].dataValues.Skills.name, lvl:employeeSkill[j].dataValues.lvl})
      }
      // push to skill
      employees[i].dataValues.skill =empoSkillNames; 
      }
    return res.json(employees);
  } catch (err) {
    return res.send(err);
  }
}



//Create
postEmployee.add = async (req, res) => {
  try {
    const keys = Object.keys(Employee.rawAttributes);
    var body = _.pick(req.body, keys);
    // body.photo = Buffer.from(body.photo,"base64");
    const employees = await Employee.create(body);

    const empoSkill=req.body.skill;
    const skills = await Skill.findAll();
    
    let skill;
    var bulkES=[];
    for(let i=0;i<empoSkill.length;i++){      
      let skillId="";

      skill = skills.find((x)=> x.dataValues.name ==empoSkill[i].name);

      if(skill){
        skillId = skill.dataValues.id;
      }else{
        //If no skill yet, create
        let newSkills = await Skill.create({"name":empoSkill[i].name});
        skillId = newSkills.id;
      }
      bulkES.push({"idEmployee":employees.dataValues.id, "idSkill":skillId, "lvl":empoSkill[i].lvl});
    }
    //create bulk
    await EmployeeSkill.bulkCreate(bulkES);
 
    return res.json(employees);
  } catch (err) {
    console.log(err)
    return res.send(err);
  }
}

//Update
postEmployee.update = async (req, res) => {
  try {
      const result = await Employee.update(req.body, {
        where: {
          id: req.params.id
        }
      });

      if(!result){
        return res.json({
          message: "Can't update Job"
        })
      }

      if(req.body.skill){
        //Get the old JobSkill
        const employeeSkill = await EmployeeSkill.findAll({
          where: {
            idEmployee:req.params.id
            },
          include : 'Skills'
        });

        var oldempoSkillNames= [];
        //Take out the Skill name on each employeeSkill
        for(let j=0;j<employeeSkill.length;j++){
          oldempoSkillNames.push({name:employeeSkill[j].dataValues.Skills.name, skillId:employeeSkill[j].dataValues.Skills.id , lvl:employeeSkill[j].dataValues.lvl})
        }

        // oldempoSkillNames = [{name:"asa", id:2, lvl:2}, {name:"saa",id:1, lvl:2} ]
        // newempoSkillNames =  [{name:"asa", lvl:2}, {name:"sa", lvl:2}]
        // delete saa and add sa
        const newempoSkillNames=req.body.skill;

        // delete all that doesnt need
        var finaldelete = oldempoSkillNames.filter(function(n) {
          return !newempoSkillNames.some(function(o){
            return n.name === o.name;
          });
        })
        for(let i=0;i<finaldelete.length;i++){
          await EmployeeSkill.destroy({
            where: {
              idSkill: finaldelete[i].skillId,
              idEmployee:req.params.id
            }
          });
        }

        // get all add item that haven't 
        var finaladd = newempoSkillNames.filter(function(n){
          return !oldempoSkillNames.some(function(o){
            return n.name === o.name;
          });
        })

        const skills = await Skill.findAll();
        let skill;
        var bulkES=[];

        for(let i=0;i<finaladd.length;i++){      
          let skillId="";

          skill = skills.find((x)=> x.dataValues.name ==finaladd[i].name);
        
          if(skill){
            skillId = skill.dataValues.id;
          }else{
            //If no skill yet, create
            let newSkills = await Skill.create({"name":finaladd[i].name});
            skillId = newSkills.id;
          }

          bulkES.push({"idEmployee":req.params.id, "idSkill":skillId, "lvl":finaladd[i].lvl});
        }

        //create bulk
        await EmployeeSkill.bulkCreate(bulkES);



        //Update LVL
        // var match = newempoSkillNames.filter(function(n) {
        //   return oldempoSkillNames.some(function(o){
        //     return n.name === o.name && n.lvl != o.lvl;
        //   });
        // })
        // for(let i=0;i<match.length;i++){
        //   await EmployeeSkill.update({lvl:match[i].lvl}, {
        //     where: {
        //       idSkill: match[i].id,
        //       idEmployee: req.params.id
        //     }
        //   });
        // }


        // let match = [];

        for(let i=0;i<newempoSkillNames.length;i++){
          for(let j=0;j<oldempoSkillNames.length;j++){
            if(newempoSkillNames[i].name === oldempoSkillNames[j].name && newempoSkillNames[i].lvl != oldempoSkillNames[j].lvl){
                await EmployeeSkill.update({lvl:newempoSkillNames[i].lvl}, {
                  where: {
                    idSkill: oldempoSkillNames[j].skillId,
                    idEmployee: req.params.id
                  }
                });
            }
          }
        }
        console.log("finish")

        return res.json({
          message: "Update"
        })  
      }else{
        return res.json({
          message: "Can't update Employee"
        })
      }
  } catch (err) {
    return res.send(err);
  }
}
    
//remove post
postEmployee.remove = async (req, res) => {
  try {
    await Employee.destroy({
      where: {
        id: req.params.id
      }
    });
    await EmployeeSkill.destroy({
      where: {
        idEmployee:req.params.id
      }
    })
    await Interview.destroy({
      where: {
        idEmployee:req.params.id
      }
    })
    // await User.destroy({
    //   where: {
    //     id:req.params.userid
    //   }
    // })
    return res.json({
      message: "Employee has been deleted"
    })
  } catch (err) {
    return res.send(err);
  }
}

export default postEmployee;