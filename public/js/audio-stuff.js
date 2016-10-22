/**
 * Created by Chris on 22/10/2016.
 */
var label = document.getElementById('label');
var start = document.getElementById('start');
var howls = {
    abcde: new Howl({src: ['http://shrt.tf/abcdefg.mp3']}),
    beijing: new Howl({src: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Zh-Beijing.ogg']}),
    drums: new Howl({src: ['/audio/rnb_drum.wav']})
};

// howls.drums.once('load', function () {
//     start.innerHTML = 'BEGIN';
// });
var id;

var methods = {
    start : function start(input){
        //console.log(input);
        var callee = input.callee;
        return function (fn) {
            howls[callee].once('play', function () {
                // label.innerHTML = 'PLAYING';
                //setTimeout(fn, 2000);
                fn();
            });
            id = howls[callee].play();
        }
    },
    play: function play(input){
        //console.log(input);
        var callee = input.callee || 'drums';
        var args = input.args || [0];
        return function (fn) {
            howls[callee].play(id);
            // label.innerHTML = 'Playing';
            setTimeout(fn, args[0]);
        };
    },
    pause: function pause(input){
        //console.log(input);
        var callee = input.callee || 'drums';
        var args = input.args || [0];
        return function(fn){
            howls[callee].pause(id);
            // label.innerHTML = 'Paused';
            setTimeout(fn, args[0]);
        };
    },
    rate: function rate(input) {
        //console.log(input);
        var callee = input.callee || 'drums';
        var args = input.args || [0];
        return function(fn) {
            howls[callee].rate(args[0], id);
            // label.innerHTML = 'Change Rate';
            fn();
        }
    },
    fade: function fade(input) {
        //console.log(input);
        var callee = input.callee || 'drums';
        var args = input.args || [0,1,1000];
        return function (fn) {
            howls[callee].fade(args[0], args[1], args[2]);
            // label.innerHTML = 'FADE';
            howls[callee].once('fade', function () {
                if (howls[callee]._onfade.length === 0) {
                    fn();
                }
            });
        }
    },
    loop: function loop(input) {
        //console.log(input);
        var callee = input.callee || 'drums';
        var args = input.args || [true];
        return function (fn) {
            howls[callee].loop(args[0]);
            // label.innerHTML = 'Repeat';
            fn();
        }
    }
};

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
    var js = [];
    if (!ast) {
        return [];
    }
    if (ast.children && ast.children.length > 0) {
        js = (ast.children.map(function (child) {
            return makeMusic(child);
        }));
    }
    switch (ast.type) {
        case 'call':
            var method = methods[ast.name];
            if (method) {
                js = method(ast);
            }
            break;
    }
    return js;
}

var chain = function (i, actions) {
    return function () {
        if (actions[i]) {
            actions[i](chain(++i, actions));
        } else {
            console.log('finished playing user code')
        }
    };
};

if (Howler.usingWebAudio) {

    //TODO: This is to kick it off
    //we want this to be done on the play button

}