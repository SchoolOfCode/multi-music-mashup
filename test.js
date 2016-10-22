/**
 * Created by Chris on 22/10/2016.
 */
var label = document.getElementById('label');
var start = document.getElementById('start');
var howls = {
    abcde: new Howl({src: ['http://shrt.tf/abcdefg.mp3']}),
    beijing: new Howl({src: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Zh-Beijing.ogg']}),
    drums: new Howl({src: ['./rnb_drum.wav']})
};

howls.drums.once('load', function () {
    start.removeAttribute('disabled');
    start.innerHTML = 'BEGIN CORE TESTS';
});
var id;
var current;

var methods = {
    start : function start({callee = 'drums'}){
        console.log(callee);
        return function (fn) {
            howls[callee].once('play', function () {
                label.innerHTML = 'PLAYING';
                //setTimeout(fn, 2000);
                fn();
            });
            id = howls[callee].play();
        }
    },
    play: function play({callee = 'drums', args = 0}){
        return function (fn) {
            howls[callee].play(id);
            label.innerHTML = 'Playing';
            setTimeout(fn, args);
        };
    },
    pause: function pause({callee = 'drums', args = 0}){
        return function(fn){
            howls[callee].pause(id);
            label.innerHTML = 'Paused';
            setTimeout(fn, args);
        };
    },
    rate: function rate({callee = 'drums', args = 0}) {
        return function(fn) {
            howls[callee].rate(args, id);
            label.innerHTML = 'Change Rate';
            fn();
        }
    },
    fade: function fade({callee = 'drums', args = [0,1,1000]}) {
        return function (fn) {
            howls[callee].fade(args[0], args[1], args[2]);
            label.innerHTML = 'FADE';
            howls[callee].once('fade', function () {
                if (howls[callee]._onfade.length === 0) {
                    fn();
                }
            });
        }
    },
    loop: function loop({callee = 'drums', args = true}) {
        return function (fn) {
            howls[callee].loop(args);
            label.innerHTML = 'Repeat';
            fn();
        }
    }
//     : ({callee = 'character', args = [], iter = 1}) => {
//         const defaultArgs = ['5px'];
//         for (let i = 0; i < defaultArgs.length; i++) {
//             if(typeof args[i] === 'undefined') {
//                 args[i] = defaultArgs[i];
//             }
//             if (i===0) {
//                 if(args[0][0] === '-') {
//                     args[0] = args[0].slice(1);
//                 } else {
//                     args[0] = `-${args[0]}`;
//                 }
//             }
//         }
//         const selector = isSpecialWord(callee) ? `#${callee}` : `.${callee}`;
//         return `
// ${selector} {
//   animation: jump-${callee} 1s 0.5s ${iter};
//   animation-timing-function: ease-in-out;
//   transform-origin: center center;
// }
// @keyframes jump-${callee} {
//   0% {
//     -webkit-transform: translateY(0);
//     transform: translateY(0);
//   }
//   20% {
//     -webkit-transform: rotate(0deg) translateY(${args[0]});
//     transform: rotate(0deg) translateY(${args[0]});
//   }
//   33% {
//     -webkit-transform: rotate(-10deg) translateY(${args[0]});
//     transform: rotate(-10deg) translateY(${args[0]});
//   }
//   66% {
//     -webkit-transform: rotate(10deg) translateY(${args[0]});
//     transform: rotate(10deg) translateY(${args[0]});
//   }
//   90% {
//     -webkit-transform: rotate(0deg) translateY(${args[0]});
//     transform: rotate(0deg) translateY(${args[0]});
//   }
//   100% {
//     -webkit-transform: translateY(0);
//     transform: translateY(0);
//   }
// }`;
//     }
}
// var makeStart = function(sound){
//     return function (fn) {
//         sound.once('play', function () {
//             label.innerHTML = 'PLAYING';
//             //setTimeout(fn, 2000);
//             fn();
//         });
//         id = sound.play();
//         current = sound;
//     }
// };
//
// var chooseSound = function(sound) {
//     return function(fn) {
//         current = sound;
//         fn();
//     }
// };
//
// var makePlay = function(time){
//     return function (fn) {
//         current.play(id);
//         label.innerHTML = 'Playing';
//         setTimeout(fn, time);
//     };
// };
//
// var makePause = function(time){
//     return function(fn){
//         current.pause(id);
//         label.innerHTML = 'Paused';
//         setTimeout(fn, time);
//     };
// };
//
// var makeRate = function(rate) {
//     return function(fn) {
//         current.rate(rate, id);
//         label.innerHTML = 'Change Rate';
//         fn();
//     }
// };
//
// var makeFade = function(from, to, time) {
//     return function (fn) {
//         current.fade(from, to, time);
//         label.innerHTML = 'FADE';
//         current.once('fade', function () {
//             if (current._onfade.length === 0) {
//                 fn();
//             }
//         });
//     }
// };
//
// var makeLoop = function(loop) {
//     return function (fn) {
//         current.loop(loop);
//         label.innerHTML = 'Repeat';
//         fn();
//     }
// };

// var actions = [methods.start(rnbdrum),methods.rate(3),methods.loop(true),methods.start(beijing), methods.rate(2), methods.loop(true),methods.start(abcde)];
//
// actions.push(methods.pause(2000));
// actions.push(methods.play(0));
// actions.push(methods.rate(1.5));
// actions.push(methods.fade(1,0,2000));
// actions.push(methods.sound(rnbdrum));
// actions.push(methods.rate(1));
// actions.push(methods.loop(false));
// actions.push(methods.sound(beijing));
// actions.push(methods.loop(false));

// var actions = makeMusic(walkAST(esprima.parse("drums.start();drums.rate(2);beijing.start();beijing.rate(2);beijing.loop(true);abcde.start();")));
var actions = makeMusic(walkAST(esprima.parse("drums.start();beijing.start();abcde.start();")));

console.log(actions);

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


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function walkAST(node) {
    var _this = this;

    var children = [];
    var ops = {};
    var type = node.type;
    if (node.body && node.body.length > 0) {
        children = node.body.map(function (prop) {
            return _this.walkAST(prop);
        });
    }
    switch (type) {
        case 'Program':
            break;
        case 'ExpressionStatement':
            ops = walkAST(node.expression);
            break;
        case 'CallExpression':
            var method = {};
            method.type = 'call';
            if (node.callee.type === 'MemberExpression') {
                method.callee = node.callee.object.name;
                method.name = node.callee.property.name;
            } else {
                method.name = node.callee.name;
            }
            method.args = node.arguments.map(function (arg) {
                return arg.value;
            });
            ops = method;
            break;
        case 'WhileStatement':
            //TODO: finish
            var loop = {};
            loop.type = 'while';
            loop.test = walkAST(node.test);
            loop.block = walkAST(node.body);
            ops = loop;
            break;
        case 'BlockStatement':
            break;
        case "BinaryExpression":
            ops = { type: "binary", arg: node.left.name, val: node.right.value, check: node.operator };
            break;
        case "UpdateExpression":
            ops = { type: "update", arg: node.argument.name, operator: node.operator };
            break;
        case "AssignmentExpression":
            ops = { type: "assignment", arg: node.left.name, operator: node.operator, val: walkAST(node.right) };
            break;
        default:
            ops = node;
            ops.type = type;
    }

    if (children.length > 0) {
        ops.children = children;
    }

    return ops;
}

function makeMusic(ast) {

    var passProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var js = [];
    if (!ast) {
        return [];
    }
    if (ast.children && ast.children.length > 0) {
        js = (ast.children.map(function (child) {
            return makeMusic(child, passProperties);
        }));
    }
    switch (ast.type) {
        case 'call':
            var method = methods[ast.name];
            if (method) {
                js = method({ast, passProperties});
            }
            break;
    }
    return js;
}