(function (root) {
    var submit = document.getElementById('submit');

    submit.onclick = function() {
        var map = root.maze[document.querySelector('.controls__filter').value];
        var submit = document.getElementById('submit');
        var path = root.maze.solution(map, 1, 0);
    }


    // document.getElementById('myQuestion').appendChild(
    //     root.maze.render(map, path)
    // );
})(this);
