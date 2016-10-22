/**
 * Created by Chris on 22/10/2016.
 */
var label = document.getElementById('label');
var start = document.getElementById('start');
var abcde = new Howl({src: ['http://shrt.tf/abcdefg.mp3']});
var beijing = new Howl({src: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Zh-Beijing.ogg']});
var rnbdrum = new Howl({src: ['./rnb_drum.wav']});

abcde.once('load', function () {
    start.removeAttribute('disabled');
    start.innerHTML = 'BEGIN CORE TESTS';
});
var id;
var current;
var makeStart = function(sound){
    return function (fn) {
        sound.once('play', function () {
            label.innerHTML = 'PLAYING';
            //setTimeout(fn, 2000);
            fn();
        });
        id = sound.play();
        current = sound;
    }
};

var chooseSound = function(sound) {
    return function(fn) {
        current = sound;
        fn();
    }
};

var makePlay = function(time){
    return function (fn) {
        current.play(id);
        label.innerHTML = 'Playing';
        setTimeout(fn, time);
    };
};

var makePause = function(time){
    return function(fn){
        current.pause(id);
        label.innerHTML = 'Paused';
        setTimeout(fn, time);
    };
};

var makeRate = function(rate) {
    return function(fn) {
        current.rate(rate, id);
        label.innerHTML = 'Change Rate';
        fn();
    }
};

var makeFade = function(from, to, time) {
    return function (fn) {
        current.fade(from, to, time);
        label.innerHTML = 'FADE';
        current.once('fade', function () {
            if (current._onfade.length === 0) {
                fn();
            }
        });
    }
};

var makeLoop = function(loop) {
    return function (fn) {
        current.loop(loop);
        label.innerHTML = 'Repeat';
        fn();
    }
};

var actions = [makeStart(rnbdrum),makeRate(3),makeLoop(true),makeStart(beijing), makeRate(2), makeLoop(true),makeStart(abcde)];

actions.push(makePause(2000));
actions.push(makePlay(0));
actions.push(makeRate(1.5));
actions.push(makeFade(1,0,2000));
actions.push(chooseSound(rnbdrum));
actions.push(makeRate(1));
actions.push(chooseSound(beijing));
actions.push(makeLoop(false));

var chain = function (i) {
    return function () {
        if (actions[i]) {
            actions[i](chain(++i));
        } else {
            label.innerHTML = 'COMPLETE!';
            label.style.color = '#74b074';
        }
    };
};

if (Howler.usingWebAudio) {

    console.log('start analyser')
    // Create an analyser node in the Howler WebAudio context
    var analyser = Howler.ctx.createAnalyser();

    // Connect the masterGain -> analyser (disconnecting masterGain -> destination)
    Howler.masterGain.connect(analyser);

    // Connect the analyser -> destination
    analyser.connect(Howler.ctx.destination);

    //get data
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = 400;
    var HEIGHT = 400;
    var cv = document.getElementById('canvas');
    var canvasCtx = cv.getContext('2d');
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    let step = 3;
    let red = 0;
    let incrementing = true;
    // let green = 0;
    // let blue = 0;

    function draw() {
        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = `rgb(${red}, 0, 0)`;
        if (incrementing)
            red = red + step;
        else
            red = red - step;
        if (red <= 0) incrementing = true;
        if (red >= 257) incrementing = false;

        canvasCtx.beginPath();
        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;
        for(var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
    }

    draw();

    console.log('start click')

    start.addEventListener('click', function () {
        actions[0](chain(1));
        start.style.display = 'none';
    }, false);
}
