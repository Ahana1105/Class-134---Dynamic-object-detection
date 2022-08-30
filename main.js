var img = "";
var object_status = "";
var objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}


function modelLoaded() {
    console.log("model is loaded");

    object_status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {

    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}



function draw() {
    image(video, 0, 0, 380, 380);

    if (object_status != "") {

        r = random(255);
        g = random(255);
        b = random(255);

        for (var i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            textSize(15);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}