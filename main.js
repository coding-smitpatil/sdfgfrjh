objects = [];
status = "";

function preload(){
video = createVideo("video.mp4");
}

function setup(){
canvas = createCanvas(480,380);
canvas.center();
video.hide();
}

function start(){
objectdetector = ml5.objectDetector("cocossd",modalloaded);
getElementById("status").innerHTML = "status=detecting objects";
}

function modalloaded(){
console.log("modal is loaded");
status = true;
video.loop();
video.speed(1);
video.volume(0);
}

function getresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
      objectdetector.detect(video,getresult);
    
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML = "status=objectdetected";
        document.getElementById("numberofobjects").innerHTML = " number of object detected are = "+objects.length;
        fill("lightgreen");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y.15);
        noFill();
        stroke("goldenrod");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
     }
    }
}