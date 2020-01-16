var level = 0;
var isGameOver = true;
var tiles = [];
var currentTile = 0;

writeMaxLevel(localStorage.getItem("max-level"));

$(document).click(function(e) {
    var isBtn = false;
    if(e.target.id !== "" && e.target.id !== undefined && $("#" + e.target.id).attr("class") !== undefined)
        isBtn = $("#" + e.target.id).attr("class").includes("btn");

    if(isGameOver && !isBtn) {
        play();
    }
});

$(document).keydown(function(e) {
    if(isGameOver) {
        play();
    }
    else {
        switch (e.key) {
            case "u":
                $("#green").trigger("click");
                break;
            case "o":
                $("#red").trigger("click");
                break;
            case "j":
                $("#yellow").trigger("click");
                break;
            case "l":
                $("#blue").trigger("click");
                break;
        
            default:
                break;
        }
    }
});


$(".btn").click(function (e) {
    if(!isGameOver) {
        activateTile(e.target.id);

        if(tiles[currentTile] == e.target.id){
            currentTile++;
        }
        else {   
            gameOver();
        }
        if(!isGameOver){
            var generateNext = false;
            
            if(currentTile == tiles.length) {
                generateNext = true;
                $("body").addClass("correct");
                setTimeout(function() {
                    $("body").removeClass("correct");
                }, 800);
            }

            if(generateNext){
                setTimeout(function (){
                    play();
                }, 1000);
            }
        }
    }
});


function play() {
    isGameOver = false;

    $("#level-title").text("Level " + ++level);

    if(level > localStorage.getItem("max-level")){
        writeMaxLevel(level);
        localStorage.setItem("max-level", level);
    }
    else
        writeMaxLevel(localStorage.getItem("max-level"));

    currentTile = 0;
    var nextTile = pickRandomTile();
    var id;
    switch (nextTile) {
        case 1:
            id = "green";
            break;
        case 2:
            id = "red";
            break;
        case 3:
            id ="yellow";
            break;
        case 4:
            id = "blue";
            break;
    }

    tiles.push(id);

    var i = 0;
    var activateAllTiles = setInterval(function () {
        activateTile(tiles[i]);
        i++;
        if(i == tiles.length){
            clearInterval(activateAllTiles);
        }
    }, 500);

}

function gameOver () {   
    new Audio("sounds/wrong.mp3").play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    isGameOver = true; 
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 700);
    
    level = 0;
    tiles = [];
    currentTile = 0
}

function activateTile(id) {
    id = "#" + id;

    $(id).addClass("pressed");
    setTimeout(function() {
        $(id).removeClass("pressed");
    }, 200);

    var audio = new Audio("sounds/" + id.slice(1) + ".mp3"); 
    audio.play();

}

function writeMaxLevel(l) {
    $("#max-level").text("Your max level is: " + l);
}

function pickRandomTile() {
    return Math.floor(Math.random() * 4 + 1);
}