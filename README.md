# amaze
a simple maze generator using DFS algorithm to generate a maze and the BFS to solve.

generally a good idea to have a maze with odd number for width, height.  does not have to be square.

### usage,

```javascript

  var maze = require('maze');

  var m = new maze.Backtracker(33, 33);
  m.generate();

  var start = [1, 1];
  var end = [31, 31];
  var soln = m.solve(start, finish);

  ...
```

### in a browser

<p>
    <canvas id="maze" style="background-color: black;"></canvas>
</p>
<p>
    <button id="generate" onclick="doGenerate();">Generate</button>
    <button id="solve" onclick="doSolve();">Solve</button>
</p>
<script>
    var sz = 4;
    var maze = require('maze');
    var m = new maze.Backtracker(97, 97);

    function doGenerate() {
        var c = document.getElementById('maze');
        c.width = m.width * sz;
        c.height = m.height * sz;
        var ctx = c.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        m.reset();
        m.generate();
        for (var r = 0; r < m.height; r++) {
            for (var c = 0; c < m.width; c++) {
                if (m.get(r, c)) {
                    ctx.fillRect(c * sz, r * sz, sz, sz);
                }
            }
        }
    };

    function doSolve() {
        var c = document.getElementById('maze');
        var sln = m.solve([1, 1], [m.height - 2, m.width - 2]);
        var ctx = c.getContext('2d');
        ctx.fillStyle = 'cornflowerblue';
        for (var i = 0; i < sln.length; i++) {
            ctx.fillRect(sln[i][1] * sz, sln[i][0] * sz, sz, sz);
        }
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(sz, sz, sz, sz);
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(sz * (m.width - 2), sz * (m.height - 2), sz, sz);
    };

    doGenerate();
</script>

no, it's not particularly amazing either...
