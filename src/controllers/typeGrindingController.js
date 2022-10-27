const db = require('../../database/models');
const path = require('path');
const { validationResult } = require("express-validator");


let typeGrindingController = {
    //listado de moliendas
    index: function(_req,res){
        db.TypeGrinding.findAll({ attributes: ['id', 'name'] }).then(
            (allTypeGrinding) => {
                res.render(path.resolve(__dirname,"../views/typeGrinding/list.ejs"), {
                  allTypeGrinding: allTypeGrinding
                });
            }
        );
    },

    
    // muestra vista creacion
    create: function(_req,res){
        res.render(path.resolve(__dirname,"../views/typeGrinding/create.ejs"))
    },


    //el que crea el registro
    store: function(req,res){

        let errors = validationResult(req);
        console.log(req.body)
        console.log(req.body.nameGrinding)

        if (!errors.isEmpty()) { console.log(errors)
          return res.render(path.resolve(__dirname, "../views/typeGrinding/create.ejs"), {
            errorMessage: errors.mapped(),
            oldData: req.body,
          });
          
        } else {
          db.TypeGrinding.create({
            name: req.body.nameGrinding,

          }).then(() => { console.log('aqui lo logre')
            res.redirect("/type-grinding/list");
          });
        }
    },


    //muestra vista edicion
    edit: function(req,res){

    let id =  req.params.id;
    db.TypeGrinding.findByPk(id).then((foundGrinding) => {
        res.render(path.resolve(__dirname,"../views/typeGrinding/edit.ejs"), {
          typeGrinding: foundGrinding,
        });
    });
        
    },
    //actualiza registro
    update: function(req,res){
        let id = req.params.id;
        let nameGrinding = req.body.nameTypeGrinding;
        console.log(nameGrinding)
        console.log(id)

        let errors = validationResult(req);

        if (!errors.isEmpty()) { console.log(errors)
          db.TypeGrinding.findByPk(id).then((foundGrinding) => {
            return res.render(
              path.resolve(__dirname,"../views/typeGrinding/edit.ejs"),
              {
                errorMessage: errors.mapped(),
                oldData: req.body,
                typeGrinding: foundGrinding,
              }
            );
          });
        } else { console.log('no hay errorres')
            db.TypeGrinding.findOne({ where: { id: id } }).then(() => {
                db.TypeGrinding.update({
                    name: nameGrinding
                },
                { where: { id: id } }
                ).then(() => { console.log('aqui lo lograste')
                    res.redirect("/type-grinding/list")
                })
            })
          }
        }        
    }

module.exports = typeGrindingController;
