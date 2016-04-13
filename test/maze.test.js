var assert = require('assert');
var expect = require('expect');
var maze = require('../lib/maze');

describe('maze', function() {
    describe('construction', function() {
        it('when you initialise a maze, blah!', function() {
            var m = new maze.Backtracker(33, 33);
            m.generate();
            console.log(m.toString());
        });
    });
});
