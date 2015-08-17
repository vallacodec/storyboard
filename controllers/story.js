/**
 * A very simple product editor
 */
'use strict';
var Story = require('../models/storyModel');

module.exports = function (server) {

    /**
     * Retrieve a list of all products for editing.
     */
    server.get('/story', function (req, res) {

        Story.find(function (err, prods) {
            if (err) {
                console.log(err);
            }

            var model =
            {
                stories: prods
            };
            res.render('story', model);
        });

    });


    /**
     * Add a new product to the database.
     * **** PLEASE READ THE COMMENT BELOW! ****
     */
    server.post('/story', function (req, res) {
        var name = req.body.name && req.body.name.trim();
        var creator = req.body.creator && req.body.creator.trim();
        var date = req.body.date && req.body.date.trim();
        var desc = req.body.desc && req.body.desc.trim();


        if (name === '') {
            res.redirect('/story#BadInput');
            return;
        }

        var newStory = new Story({name: name,creator: creator,date:date,desc:desc});

        //Show it in console for educational purposes...
        newStory.whatAmI();

        /*
         The call back receives two more arguments -> product/s that is/are added to the database
         and number of rows that are affected because of save, which right now are ignored.
         We only check for errors.
         */
        newStory.save(function (err) {
            if (err) {
                console.log('save error', err);
            }

            res.redirect('/story');
        });
    });

    /**
     * Delete a product.
     * @paaram: req.body.item_id Is the unique id of the product to remove.
     */
    server.delete('/story', function (req, res) {
        Story.remove({_id: req.body.item_id}, function (err) {
            if (err) {
                console.log('Remove error: ', err);
            }
            res.redirect('/story');
        });
    });


    /**
     * Edit a product.
     * Not implemented here
     */
    server.put('/story', function (req, res) {
        console.log('PUT received. Ignoring.');
        res.redirect('/story');
    });

};
