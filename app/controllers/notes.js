'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Note = mongoose.model('Note'),
    _ = require('lodash');

/**
 * Find note by id
 */
exports.note = function(req, res, next, id) {
    Note.load(id, function(err, note) {
        if (err) return next(err);
        if (!note) return next(new Error('Failed to load note ' + id));
        req.note = note;
        next();
    });
};

/**
 * Create a notes
 */
exports.create = function(req, res) {
    var note = new Note(req.body);
    note.destinationID = req.destination._id;

    note.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                note: note
            });
        } else {
            req.destination.noteIDs.push(note._id);
            req.destination.save(function (err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors
                    });
                }
                res.jsonp(note);
            });
        }
    });
};

/**
 * Update a note
 */
exports.update = function(req, res) {
    var note = req.note;

    note = _.extend(note, req.body);

    note.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                note: note
            });
        } else {
            res.jsonp(note);
        }
    });
};

/**
 * Delete an note
 */
exports.destroy = function(req, res) {
    var note = req.note;

    note.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                note: note
            });
        } else {
            res.jsonp(note);
        }
    });
};

/**
 * Show a notes
 */
exports.show = function(req, res) {
    res.jsonp(req.note);
};

/**
 * List of Notess
 */
exports.all = function(req, res) {
    Note.find({ destinationID: req.destination._id }).sort('-created').exec(function(err, notes) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(notes);
        }
    });
};