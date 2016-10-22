/**
 * Created by Chris on 22/10/2016.
 */
var label = document.getElementById('label');
var start = document.getElementById('start');
var abcde = new Howl({src: ['http://shrt.tf/abcdefg.mp3']});
var beijing = new Howl({src: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Zh-Beijing.ogg']});
var rnbdrum = new Howl({src: ['He needs some milk sound effect.mp3']});

var labelNew = document.getElementById('label');
var startNew = document.getElementById('start');
var abcdeNew = new Howl({src: ['http://shrt.tf/abcdefg.mp3']});
var beijingNew = new Howl({src: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Zh-Beijing.ogg']});
var rnbdrumNew = new Howl({src: ['He needs some milk sound effect.mp3']});

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

//new functions
//the same as old functions, 'make' is replaced with 'do'

var idNew;
var currentNew;
var doStart = function(sound){
    return function (fn) {
        sound.once('play', function () {
            labelNew.innerHTML = 'PLAYING';
            //setTimeout(fn, 2000);
            fn();
        });
        idNew = sound.play();
        currentNew = sound;
    }
};

var doSound = function(sound) {
    return function(fn) {
        currentNew = sound;
        fn();
    }
};

var doPlay = function(time){
    return function (fn) {
        currentNew.play(idNew);
        label.innerHTML = 'Playing';
        setTimeout(fn, time);
    };
};

var doPause = function(time){
    return function(fn){
        currentNew.pause(idNew);
        label.innerHTML = 'Paused';
        setTimeout(fn, time);
    };
};

var doRate = function(rate) {
    return function(fn) {
        currentNew.rate(rate, idNew);
        label.innerHTML = 'Change Rate';
        fn();
    }
};

var doFade = function(from, to, time) {
    return function (fn) {
        currentNew.fade(from, to, time);
        label.innerHTML = 'FADE';
        currentNew.once('fade', function () {
            if (currentNew._onfade.length === 0) {
                fn();
            }
        });
    }
};

var doLoop = function(loop) {
    return function (fn) {
        currentNew.loop(loop);
        label.innerHTML = 'Repeat';
        fn();
    }
};



var actions = [makeStart(rnbdrum),makeRate(3),makeLoop(true),makeStart(beijing), makeRate(2), makeLoop(true),makeStart(abcde)];

//second player array
var otherActions = [doStart(abcdeNew),doRate(3),doLoop(true),doStart(rnbdrumNew), doRate(2), doLoop(true),doStart(beijingNew)];

actions.push(makePause(2000));
actions.push(makePlay(0));
actions.push(makeRate(1.5));
actions.push(makeFade(1,0,2000));
actions.push(chooseSound(rnbdrum));
actions.push(makeRate(1));
actions.push(makeLoop(false));
actions.push(chooseSound(beijing));
actions.push(makeLoop(false));

otherActions.push(doPause(2000));
otherActions.push(doPlay(0));
otherActions.push(doRate(1.5));
otherActions.push(doFade(1,0,2000));
otherActions.push(doSound(rnbdrumNew));
otherActions.push(doRate(1));
otherActions.push(doLoop(false));
otherActions.push(doSound(beijingNew));
otherActions.push(doLoop(false));

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

var chainNew = function (i) {
    return function () {
        if (otherActions[i]) {//
            otherActions[i](chainNew(++i));
        } else {
            labelNew.innerHTML = 'COMPLETE!';
            labelNew.style.color = '#74b074';
        }
    };
};

if (Howler.usingWebAudio) {
    start.addEventListener('click', function () {
        otherActions[0](chainNew(1));
        start.style.display = 'none';
    }, false);
}
