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
    start.addEventListener('click', function () {
        actions[0](chain(1));
        start.style.display = 'none';
    }, false);
}
