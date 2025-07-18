let canvas;
let ctx;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);



    console.log('My charchter is', world.character);
    
    // setTimeout(function () {
    //    ctx.drawImage(character, 20, 20 , 50, 150)     
    // }, 2000);
}