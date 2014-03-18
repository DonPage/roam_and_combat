/**
 * Created by donpage on 3/17/14.
 *
 */
(function () {

console.log("map loading...");
//    window.requestAnimFrame = (function(){
//        return  window.requestAnimationFrame       ||
//            window.webkitRequestAnimationFrame ||
//            window.mozRequestAnimationFrame    ||
//            function(callback){
//                window.setTimeout(callback, 1000 / 60);
//            };
//    })();

    //Making map canvas
    var map = document.createElement('canvas');
    var ctx = map.getContext('2d');

    map.width = 500;
    map.height = 500;

    document.body.appendChild(map);

    var clock = new THREE.Clock(); //this code if from the imported script
    var time = clock.getElapsedTime();
    var delta = clock.getDelta() * 1000;

    var key = "";

    var tileW = 10;
    var tileH = 10;

    //map array taken from iLEL on codepen
    var mapArray =
        [
            ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","c","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","c","c","c","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","c","c","c","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","c","c","c","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","c","c","c","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","c","c","c","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","m","c","c","c","m","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","c","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","m","c","c","c","c","c","m","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","g"],
            ["g","c","c","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","m","c","w","w","w","w","w","c","m","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","c","c","g"],
            ["g","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","w","w","w","w","w","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","g"],
            ["g","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","w","w","w","w","w","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","g"],
            ["g","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","w","w","w","w","w","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","g"],
            ["g","c","c","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","m","c","w","w","w","w","w","c","m","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","c","c","g"],
            ["g","c","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","m","c","c","c","c","c","m","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","m","c","c","c","m","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","m","c","c","c","m","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","m","c","c","c","m","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","m","c","c","c","m","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","m","c","c","c","m","m","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","m","c","c","c","m","c","d","d","d","d","d","d","d","d","d","h","h","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","c","c","d","d","d","d","d","d","d","d","d","d","h","h","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","c","c","c","c","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","g"],
            ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"]
        ];

    var dirt = new tile("http://hailclinic.com/wp-content/uploads/2013/05/Dirt-00-seamless-300x300.jpg", 0, 0, tileW, tileH);
    var grass = new tile("http://img.photobucket.com/albums/v207/worg121/Maps/grass_tile2_600x600.png", 0, 0, tileW, tileH);
    var cobble = new tile("http://i.imgur.com/qRaMK.png", 0, 0, tileW, tileH);
    var marble = new tile("http://t3.gstatic.com/images?q=tbn:ANd9GcQxsaJ2M2uI_dBA0vd1IHmT_uFO4Js7iIWqI_Fv3QplUeLUqhK5pA", 0, 0, tileW, tileH);
    var water = new tile("http://opengameart.org/sites/default/files/brushwalker437.png", 0, 0, tileW, tileH);
    var hole = new tile("http://opengameart.org/sites/default/files/Airlock_0.png", 0, 0, tileW,tileH);

    var player = new rect(0,0, tileW, tileH);

    (function animLoop(){
        requestAnimationFrame(animLoop);

        render();
        update();
    })();

    function render(){
        ctx.clearRect(0, 0, map.width, map.height);
        drawMap();
        drawRect(player);
    }

    function drawMap(){
        for (var i=0;i<mapArray.length;i++){ //loop inside of loop to get to read the x and y map array.
            for (var j=0;j<mapArray[i].length;j++){
                dirt.x = j * tileW;
                dirt.y = i * tileH;
                grass.x = j * tileW;
                grass.y = i * tileH;
                cobble.x = j * tileW;
                cobble.y = i * tileH;
                marble.x = j * tileW;
                marble.y = i * tileH;
                water.x = j * tileW;
                water.y = i * tileH;
                hole.x = j * tileW;
                hole.y = i * tileH;


                if (mapArray[i][j] === "d")
                {
                    drawTile(dirt);
                }

                if (mapArray[i][j] === "g")
                {
                    drawTile(grass);
                }

                if (mapArray[i][j] === "c")
                {
                    drawTile(cobble);
                }

                if (mapArray[i][j] === "m")
                {
                    drawTile(marble);
                }

                if (mapArray[i][j] === "w")
                {
                    drawTile(water);
                }

                if (mapArray[i][j] === "h")
                {
                    drawTile(hole);
                }
            }
        }

    }



    function update(){
        delta = clock.getDelta() *1000;

        document.querySelector('#fps').innerHTML = " " + 1000 / delta;

        var column = (map.width - player.x) /tileW;
        var row = (map.height - player.y) /tileH;
        document.querySelector('#loc').innerHTML = "x: "+ column +" y: "+ row +"";

        wallIsct(player);
    }

    document.onkeydown = function(evt){
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode); //returns keydown as a string.
        console.log(charStr);

        key = charStr; //charStr is now = key

        if (key === "A")
        {
            player.x -= tileW;
        }

        if (key === "D")
        {
            player.x += tileW;
        }

        if (key === "W")
        {
            player.y -= tileH;
        }

        if (key === "S")
        {
            player.y += tileH;
        }
    };

    document.onkeyup = function(){ //everytime a key is released it resets the variable 'key'.
        key = "";
    };

    function tile(src, x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = src;
    }

    function drawTile(object){
        ctx.drawImage(object.image, object.x, object.y, object.width, object.height);
    }

    function rect(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    function drawRect(object){
        ctx.beginPath();
        ctx.rect(object.x, object.y ,object.width, object.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    function wallIsct(object){
        object.x = clamp(object.x, 0, map.width - object.width);
        object.y = clamp(object.y, 0, map.height - object.height);
    }

    function clamp(i, min, max){
        return Math.max(Math.min(i, max),min);
    }

})();
