# amaze
a simple maze generator using DFS algorithm to generate a maze and the BFS to solve.

generally a good idea to have a maze with odd number for width, height.  does not have to be square.

### usage,

```javascript

  var maze = require('amazejs');

  var m = new maze.Backtracker(33, 33);
  m.generate();

  var start = [1, 1];
  var end = [31, 31];
  var soln = m.solve(start, finish);

  ...
```

### in a browser

see demo

![a maze...](https://raw.githubusercontent.com/erniehs/amaze/master/demo/demo.png)

no, it's not particularly amazing either...
