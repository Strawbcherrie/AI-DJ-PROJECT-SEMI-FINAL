song1 = "";
song2 = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
left_wrist_score = 0;
right_wrist_score = 0;
song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
    // the song links are loaded through the variables mentioned above so that we don't have to write loadSound("song1.mp3"); and loadSound("song2.mp3"); again and again
}
function setup () {
    
    canvas = createCanvas(600, 400);
    //canvas = createCanvas(width, height);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    //explanation
    posenet.on('pose', gotPoses);
    // why not posenet.on("poses", gotPoses); or why not posenet.on(poses, gotPoses);
    // why not posenet = ml5.posenet()! because it is written such in the hints section
    // in this setup function we make or setup the canvas and put the posenet 
}


function modelLoaded(){
    console.log("Posenet is initialized");
}

function gotPoses(results){
    
    if(results.length > 0){
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x.toFixed(0) - 170;
        leftwristy = results[0].pose.leftWrist.y.toFixed(0) - 140;
        rightwristx = results[0].pose.rightWrist.x.toFixed(0);
        rightwristy = results[0].pose.rightWrist.y.toFixed(0) - 140;
        console.log("Left wrist : x = " + leftwristx + " y = " + leftwristy);
        console.log("Right wrist : x = " + rightwristx + " y = " + rightwristy);
        left_wrist_score = results[0].pose.keypoints[9].score;
        right_wrist_score = results[0].pose.keypoints[10].score;
        console.log("leftwristscore = " + left_wrist_score);
        console.log("rightwristscore = " + right_wrist_score);
    }
}

function draw(){
    image(video, 0, 0, 600, 400);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
// !!!!!! why can't we write something like this -----> if(song1.isPlaying(true)){}
    fill("#FFFFFF");
    stroke("#061626");
    console.log( song1_status);
    console.log(song2_status);
    if(left_wrist_score > 0.2){
        circle(leftwristx, leftwristy, 30);
        song2.stop();
    
        if(song1_status == false){
            song1.play();
            
            document.getElementById("status").innerHTML = "Playing Harry Potter Theme song";
        
        }
       
    }

    if(right_wrist_score > 0.2){
        
        circle(rightwristx, rightwristy, 30);
        song1.stop();
        
        if(song2_status == false){
            song2.play();

            document.getElementById("status").innerHTML = "Playing Peter Pan song";
        }
       
    }
    
}

function play(){
    console.log("checking play function code");
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    gotPoses;

}