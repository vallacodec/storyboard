/**
 * A very simple product editor
 */
'use strict';
var Project = require('../models/projectModel');

module.exports = function (server) {

    /**
     * Retrieve a list of all products for editing.
     */
    server.get('/project', function (req, res) {


        Project.find(function (err, prods) {
            if (err) {
                console.log(err);
            }

            var model =
            {
                projects: prods
            };
            res.render('project', model);
        });

    });


    /**
     * Add a new product to the database.
     * **** PLEASE READ THE COMMENT BELOW! ****
     */
    server.post('/project', function (req, res) {
        var projectname = req.body.projectname && req.body.projectname.trim();
        var projectno = req.body.projectno && req.body.projectno.trim();
        var assignedteam = req.body.assignedteam && req.body.assignedteam.trim();
        var date1 = req.body.date1 && req.body.date1.trim();
        var date2 = req.body.date2 && req.body.date2.trim();
        var date3 = req.body.date3 && req.body.date3.trim();


        if (projectname === '') {
            res.redirect('/project#BadInput');
            return;
        }

        var newProject = new Project({projectname: projectname,projectno: projectno,assignedteam: assignedteam,date1: date1,date2: date2,date3: date3});

        //Show it in console for educational purposes...
        newProject.whatAmI();

        /*
         The call back receives two more arguments -> product/s that is/are added to the database
         and number of rows that are affected because of save, which right now are ignored.
         We only check for errors.
         */
        newProject.save(function (err) {
            if (err) {
                console.log('save error', err);
            }

            res.redirect('/project');
        });
    });

    /**
     * Delete a product.
     * @paaram: req.body.item_id Is the unique id of the product to remove.
     */
    server.delete('/project', function (req, res) {
        Project.remove({_id: req.body.item_id}, function (err) {
            if (err) {
                console.log('Remove error: ', err);
            }
            res.redirect('/project');
        });
    });


    /**
     * Edit a product.
     * Not implemented here
     */
    server.put('/project', function (req, res) {
        console.log('PUT received. Ignoring.');
        res.redirect('/project');
    });

};
