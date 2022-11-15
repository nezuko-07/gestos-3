
prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camara = document.getElementById("camara");

Webcam.attach('#camara');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BTVGj8lOg/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "La primera prediccion es " + prediction_1;
  speak_data_2 = "Y la segunda prediccion es " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}


  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_gesto_name").innerHTML = results[0].label;
    document.getElementById("result_gesto_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "ok")
    {
	    document.getElementById("update_gesto").innerHTML = "&#128076;";
    }
    if(results[0].label == "like")
    {
	    document.getElementById("update_gesto").innerHTML = "&#128077;";
    }
    if(results[0].label == "v")
    {
	    document.getElementById("update_gesto").innerHTML = "&#9996;";
    }
  }
}

