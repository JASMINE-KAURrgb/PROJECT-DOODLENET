function setup(){
    canvas= createCanvas(280,280);
    canvas.position(575,350);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function clearcanvas(){
    background("white");
}
function draw(){
    strokeWeight(13);
    stroke('#ff00aa');
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML='My Guess:'+results[0].label;
    document.getElementById('accuracy').innerHTML='Accuracy: '+Math.round(results[0].confidence*100)+'%';
    utterThis= new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}