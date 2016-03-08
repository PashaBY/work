(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;
    var VISITED = root.maze.VISITED;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
     var head = 0;
     var queue = [];
    function solution(maze, x, y) {
        // var queue = [];
        function Coord(x, y , z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        window.p = 0;
        head = 0;
        queue.push(new Coord(x, y, -1));
        maze[y][x] = VISITED;
        console.log('------------------>');
        // console.log('Log: ' + queue[0] + ' _1');
        var inter = setTimeout(function ti(head, queue, maze) {
            // console.log('Log: ' + queue[head].x + ' ' + queue[head].y + ' _2');
            // console.log(p);
            if(queue[head].y === (maze.length - 1)) {
                p++;
                console.log(p);
            }
            if(p === 0) {
            var elemID = document.getElementById('ID');
            var lastNode = elemID.lastChild;
            while(lastNode && lastNode.nodeType!=1) {
                lastNode = lastNode.previousSibling;
            }
            if (lastNode) {
                lastNode.parentNode.removeChild(lastNode);
            }
            document.getElementById('ID').appendChild(
                root.maze.render(maze)
            );
            if (queue[head].y > 0) {
                if (maze[queue[head].y - 1][queue[head].x] === EMPTY) {
                    queue.push(new Coord(queue[head].x, queue[head].y - 1, head));
                    maze[queue[head].y - 1][queue[head].x] = VISITED;
                }
            }

            if (queue[head].x < maze[0].length - 1) {
                if (maze[queue[head].y][queue[head].x + 1] === EMPTY) {
                    queue.push(new Coord(queue[head].x + 1, queue[head].y, head));
                    maze[queue[head].y][queue[head].x + 1] = VISITED;
                }
            }

            if (queue[head].y < maze.length - 1) {
                if (maze[queue[head].y + 1][queue[head].x] === EMPTY) {
                    queue.push(new Coord(queue[head].x, queue[head].y + 1, head));
                    maze[queue[head].y + 1][queue[head].x] = VISITED;
                }
            }

            if (queue[head].x > 0) {
                if (maze[queue[head].y][queue[head].x - 1] === EMPTY) {
                    queue.push(new Coord(queue[head].x - 1, queue[head].y, head));
                    maze[queue[head].y][queue[head].x - 1] = VISITED;
                }
            }
            head++;
        }
            if(head < queue.length && p === 0) {
                setTimeout(ti, 1, head, queue, maze)
            }
        if(p !== 0) {
            var haha = [];
            var temp;
            while (head >= 0) {
                temp = [queue[head].x, queue[head].y];
                haha.unshift(temp);
                head = queue[head].z;
            }

            var elemID = document.getElementById('ID');
            var lastNode = elemID.lastChild;
            while(lastNode && lastNode.nodeType!=1) {
                lastNode = lastNode.previousSibling;
            }

            if (lastNode) {
                lastNode.parentNode.removeChild(lastNode);
            }
            document.getElementById('ID').appendChild(
                root.maze.render(maze, haha)
            );
        }

        }, 100, head, queue, maze);

        for (var i = 0; i<queue.length; i++) {
            console.log(queue[i].x + ' '+ queue[i].y + ' ' + queue[i].z);
        }
        // console.log("head = " + head);
        
        // for (var i=0; i<haha.length; i++) {
        //     console.log(haha[i][0], haha[i][1]);
        // }

        // return [];
        return haha;
    }

    root.maze.solution = solution;
})(this);
