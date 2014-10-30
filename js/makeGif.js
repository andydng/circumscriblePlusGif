// This post was very helpful!
// http://antimatter15.com/wp/2010/07/javascript-to-animated-gif/

function datGif() { // give external JS 1 second of time to load

    console.log('Starting');

    var canvas = document.getElementById("screen");
    var context = canvas.getContext('2d');
    var shots  = [];
    var grabLimit = 10;  // Number of screenshots to take
    var grabRate  = 10; // Miliseconds. 500 = half a second, was 100
    var count     = 0;

    function showResults() {
        console.log('Finishing');
        encoder.finish();
        var binary_gif = encoder.stream().getData();
        var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
        //document.write('<img src="' +data_url + '"/>\n');
        
        var newwindow=window.open();
        var newdocument=newwindow.document;
        newdocument.write('<img src="' +data_url + '"/>\n');
    }

    var encoder = new GIFEncoder();
    encoder.setRepeat(0);  //0  -> loop forever, 1+ -> loop n times then stop
    encoder.setDelay(50); //go to next frame every n milliseconds 500
    encoder.start();

    var grabber = setInterval(function(){
      console.log('Grabbing '+count);
      count++;

      if (count>grabLimit) {
        clearInterval(grabber);
        showResults();
      }

      var imdata = context.getImageData(0,0,canvas.width,canvas.height);
      encoder.addFrame(context);

    }, grabRate);

}

function ini(){
	
	var makeGif = document.getElementById('clickme');
	makeGif.addEventListener('click',datGif,false);
	
	
}
window.addEventListener('load',ini,false);