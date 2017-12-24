(function() {
  'use strict';

  var queue = require('priorityjs');

  function Backtracker(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Uint8Array(width * height);
  }

  Array.prototype.peek = function() {
    return this.length > 0 ? this[this.length - 1] : undefined;
  };

  Backtracker.prototype.test = function(r, c) {
    return !(r <= 0 || r >= (this.height - 1) ||
        c <= 0 || c >= (this.width - 1)) &&
      !this.grid[r * this.width + c];
  };

  Backtracker.prototype.get = function(r, c) {
    return this.grid[r * this.width + c];
  };

  Backtracker.prototype.set = function(r, c, v) {
    this.grid[r * this.width + c] = v;
  };

  Backtracker.prototype.fringe = function(r, c) {
    var items = [];
    var f = [
      [-2, 0],
      [0, 2],
      [2, 0],
      [0, -2]
    ];
    for (var i = 0; i < f.length; i++) {
      if (this.test(r + f[i][0], c + f[i][1])) {
        items.push([r + f[i][0], c + f[i][1]]);
      }
    }
    return items;
  };

  Backtracker.prototype.reset = function() {
    var l = this.grid.length;
    while (l) {
      this.grid[--l] = 0;
    }
  };

  Backtracker.prototype.generate = function() {
    var stack = [];
    var cc = [1, 1];
    while (cc) {
      this.set(cc[0], cc[1], 1);
      var f = this.fringe(cc[0], cc[1]);
      if (f.length > 0) {
        var cf = f[Math.floor(Math.random() * f.length)];
        stack.push(cc);
        this.set(Math.floor((cc[0] + cf[0]) / 2),
          Math.floor((cc[1] + cf[1]) / 2), 1);
        cc = cf;
      } else {
        cc = stack.pop();
      }
    }
  };

  Backtracker.prototype.solve = function(start, end) {
    var pq = new queue.PriorityQ(function(a, b) {
      return a.score < b.score;
    });
    var visited = new Set();
    var self = this;

    var manhattan = function(a, b) {
      return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    };

    var test = function(r, c) {
      return !(r <= 0 || r >= (self.height - 1) ||
          c <= 0 || c >= (self.width - 1)) &&
        self.grid[r * self.width + c];
    };

    var fringe = function(r, c) {
      var items = [];
      var f = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
      ];
      for (var i = 0; i < f.length; i++) {
        if (test(r + f[i][0], c + f[i][1])) {
          items.push([r + f[i][0], c + f[i][1]]);
        }
      }
      return items;
    };

    var ci = {
      path: [start],
      score: manhattan(start, end)
    };
    visited.add(JSON.stringify(ci.path.peek()));
    while (ci && manhattan(ci.path.peek(), end) !== 0) {
      var fr = fringe(ci.path.peek()[0], ci.path.peek()[1]);
      for (var i = 0; i < fr.length; i++) {
        var frstr = JSON.stringify(fr[i]);
        if (!visited.has(frstr)) {
          visited.add(frstr);
          var np = ci.path.slice(0);
          np.push(fr[i]);
          pq.push({
            path: np,
            score: ci.score + manhattan(fr[i], end)
          });
        }
      }
      ci = pq.pop();
    }
    return ci ? ci.path : [];
  };

  Backtracker.prototype.toString = function() {
    var str = '';
    for (var r = 0; r < this.height; r++) {
      str += '\n';
      for (var c = 0; c < this.width; c++) {
        str += this.grid[r * this.width + c] ? ' ' : '█';
      }
    }
    return str;
  };

  module.exports.Backtracker = Backtracker;
}());
