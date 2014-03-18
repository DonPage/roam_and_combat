/**
 * Created by donpage on 3/17/14.
 * Based on iLEL's Tile based Game
 */
(function () {


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


    var inCombat = false;
//  going to try to put this code in the object player.
//    var playerStr = ~~(Math.random() * (5 - 4 +1)) +4;
//    var playerArm = ~~(Math.random() * (5 - 4 +1)) +4;
//    var playerHP = 100;

    var mobArray =
        [    //name     hp  str arm
            ["Skeleton",100,5,3],
            ["Knight",110,4,7],
            ["Dragon",100,7,5],
            ["Merman",100,5,4]
        ];
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
    var Dmob = new tile("http://opengameart.org/sites/default/files/imp%20death_blue.gif", 0, 0, tileW,tileH);

    var player = new rect(0,0, tileW, tileH); //makes new player (which is a rectangle).

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
    function ranNumber(){

        return ~~(Math.random() * (10 - 1 +1)) +1;
    }


    function update(){

        delta = clock.getDelta() *1000;
        document.querySelector('#fps').innerHTML = " " + 1000 / delta;
        var column = (map.width - player.x) /tileW;
        var row = (map.height - player.y) /tileH;

//        var standing = mapArray[tile.x,tile.y];
        document.querySelector('#loc').innerHTML = " x: "+ column +" y: "+ row +" standing: ";

        wallIsct(player);
    }

    document.onkeydown = function(evt){
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode); //returns keydown as a string.
//        console.log(charStr);
        var MobPercentage=3;
        var KnightPercentage=2;
        var MermanPercentage=1;
        var playerX = player.x;
        var playerY = player.y;


        key = charStr; //keydown is now = key

        if (key === "A")
        {
            player.x -= tileW;
            if (ranNumber()<MobPercentage){
                startFight();
            } else{
                console.log("you find nothing")}

        }

        if (key === "D")
        {
            player.x += tileW;
            if (ranNumber()<MobPercentage){
                startFight();
            } else{
                console.log("you find nothing")}

        }

        if (key === "W")
        {
            player.y -= tileH;
            if (ranNumber()<MobPercentage){
                startFight();
            } else{
                console.log("you find nothing")}
        }

        if (key === "S")
        {
            player.y += tileH;
            if (ranNumber()<MobPercentage){
                startFight();
            } else{
                console.log("you find nothing")}

        }
        if (key === "F")
        {
            console.log(player);
            actionButton();
        }
    };

    document.onkeyup = function(){ //everytime a key is released it resets the variable 'key'.
        key = "";
    };

    function actionButton(){
        console.log("action function");
    }

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
        this.weapon = 0;
        this.plate = 0;
        this.shield = 0;
        this.hp = 100;
        this.str = Math.floor(Math.random() * (5 - 4 +1)) +4;
        this.arm = Math.floor(Math.random() * (2 - 1 +1)) +1;

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



    function startFight(){
        inCombat = true;
        var pickRandomMonster = ~~(Math.random()*mobArray.length);
        console.log(mobArray[pickRandomMonster]);
        var mobName = mobArray[pickRandomMonster][0];
        var mobHP = mobArray[pickRandomMonster][1];
        var mobStr = mobArray[pickRandomMonster][2];
        var mobArm = mobArray[pickRandomMonster][3];

        var getPlayerStr = player.weapon + player.str;
        var getPlayerArm = player.shield + player.plate + player.arm;



        while(inCombat){
            var mobDamageMulti = ~~(Math.random()*3)+1;
            var playerDamageMulti = ~~(Math.random()*3)+1;

            var playerDefaultDamage = ~~(Math.random()*(5-1))+1 + playerDamageMulti;
            var mobDefaultDamage = ~~(Math.random()*(5-1))+1 + mobDamageMulti;

            var playerDamageOutput = (getPlayerStr * playerDefaultDamage - mobArm);
            var mobDamageOutput = (mobStr * mobDefaultDamage - getPlayerArm);

            if (playerDamageOutput < 0){
                playerDamageOutput = 0;
            }
            if (mobDamageOutput < 0){
                mobDamageOutput = 0;
            }

            var currentMobHealth = mobHP - playerDamageOutput;
            var currentPlayerHealth = player.hp - mobDamageOutput;

            console.log("you hit the",mobName," for",playerDamageOutput,"and bring his health down to:"+currentMobHealth);
            console.log("the mob hits you for",mobDamageOutput,"and brings your health down to:"+currentPlayerHealth);

            if (currentMobHealth <= 0 || currentPlayerHealth <=0){
                inCombat = false;
                console.log("combat over");
            } else {
                mobDamageMulti = '';//resets vars so the hits are different and more random.
                playerDamageMulti = '';
                playerDefaultDamage = '';
                mobDefaultDamage = '';
                inCombat = true;
            }

            mobHP = currentMobHealth;
            player.hp = currentPlayerHealth;
            console.log(mobName+":"+currentMobHealth,"vs",currentPlayerHealth+":Rect")


        }








    }

})();
