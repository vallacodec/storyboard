'use strict';

var mongoose = require('mongoose');

var storyModel = function () {

    //Define a super simple schema for our stories.
    var storySchema = mongoose.Schema({
        name: String,
        creator: String,
        date: String,
        desc:String
    });

    /**
     * Verbose toString method
     */
    storySchema.methods.whatAmI = function () {
        var greeting = this.name ?
        'Hello, I\'m a ' + this.name
            : 'I don\'t have a name :(';
        console.log(greeting);
    };

    /**
     * Format the price of the product to show a dollar sign, and two decimal places
     */

    return mongoose.model('Story', storySchema);

};

module.exports = new storyModel();
