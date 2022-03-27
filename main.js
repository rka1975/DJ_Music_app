left_wrist_X = 0;
left_wrist_Y = 0;
right_wrist_X = 0;
right_wrist_Y = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_1="";
song_2="";
song_1_status = "";
song_2_status = "";

function preload()
{
	song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");

}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(550,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
    
}

function draw(){
    image(video,0,0,400,400);
    song_1_status = song_1.isPlaying()
    song_2_status = song_2.isPlaying()

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(left_wrist_X,left_wrist_Y,20);
        song_2.stop();
        if(song_1_status == false){
            song_1.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan song"
    }
    }

    if(scoreRightWrist > 0.2){
        circle(right_wrist_X,right_wrist_Y,20);
        song_1.stop();
        if(song_2_status == false){
            song_2.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter theme song"
        }
    }

    



   
}

function play(){
    song.play();
    song.volume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
       
        left_wrist_X = results[0].pose.leftWrist.x;
        left_wrist_Y = results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+left_wrist_X+" Left wrist y = "+left_wrist_Y);
        
        right_wrist_X = results[0].pose.rightWrist.x;
        right_wrist_Y = results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+right_wrist_X+" Right wrist y = "+right_wrist_Y);
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist is " +scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of right wrist is " +scoreRightWrist);



    }
}