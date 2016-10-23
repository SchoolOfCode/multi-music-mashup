/**
 * Created by Chris on 22/10/2016.
 */
var makeMusic = (function () {

    // Properties
    // from here: https://github.com/samaaron/sonic-pi/tree/master/etc/samples
    var howls = {
        abcde: new Howl({src: ['http://shrt.tf/abcdefg.mp3']}),
        beijing: new Howl({src: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Zh-Beijing.ogg']}),
        drum_bass_hard: new Howl({src: ['/audio/drum_bass_hard.wav']}),
        drum_bass_soft: new Howl({src: ['/audio/drum_bass_soft.wav']}),
        drum_cowbell: new Howl({src: ['/audio/drum_cowbell.wav']}),
        drum_cymbal_closed: new Howl({src: ['/audio/drum_cymbal_closed.wav']}),
        drum_cymbal_hard: new Howl({src: ['/audio/drum_cymbal_hard.wav']}),
        drum_cymbal_open: new Howl({src: ['/audio/drum_cymbal_open.wav']}),
        drum_cymbal_pedal: new Howl({src: ['/audio/drum_cymbal_pedal.wav']}),
        drum_cymbal_soft: new Howl({src: ['/audio/drum_cymbal_soft.wav']}),
        drum_heavy_kick: new Howl({src: ['/audio/drum_heavy_kick.wav']}),
        drum_snare_hard: new Howl({src: ['/audio/drum_snare_hard.wav']}),
        drum_snare_soft: new Howl({src: ['/audio/drum_snare_soft.wav']}),
        drum_splash_hard: new Howl({src: ['/audio/drum_splash_hard.wav']}),
        drum_splash_soft: new Howl({src: ['/audio/drum_splash_soft.wav']}),
        drum_tom_hi_hard: new Howl({src: ['/audio/drum_tom_hi_hard.wav']}),
        drum_tom_hi_soft: new Howl({src: ['/audio/drum_tom_hi_soft.wav']}),
        drum_tom_lo_hard: new Howl({src: ['/audio/drum_tom_lo_hard.wav']}),
        drum_tom_lo_soft: new Howl({src: ['/audio/drum_tom_lo_soft.wav']}),
        drum_tom_mid_hard: new Howl({src: ['/audio/drum_tom_mid_hard.wav']}),
        drum_tom_mid_soft: new Howl({src: ['/audio/drum_tom_mid_soft.wav']}),
        loop_amen: new Howl({src: ['/audio/loop_amen.wav']}),
        loop_amen_full: new Howl({src: ['/audio/loop_amen_full.wav']}),
        loop_breakbeat: new Howl({src: ['/audio/loop_breakbeat.wav']}),
        loop_compus: new Howl({src: ['/audio/loop_compus.wav']}),
        loop_garzul: new Howl({src: ['/audio/loop_garzul.wav']}),
        loop_industrial: new Howl({src: ['/audio/loop_industrial.wav']}),
        loop_mika: new Howl({src: ['/audio/loop_mika.wav']}),
        loop_rnb: new Howl({src: ['/audio/loop_rnb.wav']}),
        loop_safari: new Howl({src: ['/audio/loop_safari.wav']}),
        loop_tabla: new Howl({src: ['/audio/loop_tabla.wav']}),
        vinyl_backspin: new Howl({src: ['/audio/vinyl_backspin.wav']}),
        vinyl_hiss: new Howl({src: ['/audio/vinyl_hiss.wav']}),
        vinyl_rewind: new Howl({src: ['/audio/vinyl_rewind.wav']}),
        vinyl_scratch: new Howl({src: ['/audio/vinyl_scratch.wav']}),
        guit_e_fifths: new Howl({src: ['/audio/guit_e_fifths.wav']}),
        guit_harmonics: new Howl({src: ['/audio/guit_harmonics.wav']}),
        guit_em9: new Howl({src: ['/audio/guit_em9.wav']}),
        sn_zome: new Howl({src: ['/audio/sn_zome.wav']}),
        misc_burp: new Howl({src: ['/audio/misc_burp.wav']}),
        sn_dolf: new Howl({src: ['/audio/sn_dolf.wav']}),
        guit_e_slide: new Howl({src: ['/audio/guit_e_slide.wav']}),
        perc_snap2: new Howl({src: ['/audio/perc_snap2.wav']}),
        perc_bell: new Howl({src: ['/audio/perc_bell.wav']}),
        perc_till: new Howl({src: ['/audio/perc_till.wav']}),
        misc_crow: new Howl({src: ['/audio/misc_crow.wav']}),
        sn_dub: new Howl({src: ['/audio/sn_dub.wav']}),
        ambi_choir: new Howl({src: ['/audio/ambi_choir.wav']}),
        ambi_dark_woosh: new Howl({src: ['/audio/ambi_dark_woosh.wav']}),
        ambi_drone: new Howl({src: ['/audio/ambi_drone.wav']}),
        ambi_glass_hum: new Howl({src: ['/audio/ambi_glass_hum.wav']}),
        ambi_glass_rub: new Howl({src: ['/audio/ambi_glass_rub.wav']}),
        ambi_haunted_hum: new Howl({src: ['/audio/ambi_haunted_hum.wav']}),
        ambi_lunar_land: new Howl({src: ['/audio/ambi_lunar_land.wav']}),
        ambi_piano: new Howl({src: ['/audio/ambi_piano.wav']}),
        ambi_soft_buzz: new Howl({src: ['/audio/ambi_soft_buzz.wav']}),
        ambi_swoosh: new Howl({src: ['/audio/ambi_swoosh.wav']}),
        bass_dnb_f: new Howl({src: ['/audio/bass_dnb_f.wav']}),
        bass_drop_c: new Howl({src: ['/audio/bass_drop_c.wav']}),
        bass_hard_c: new Howl({src: ['/audio/bass_hard_c.wav']}),
        bass_thick_c: new Howl({src: ['/audio/bass_thick_c.wav']}),
        bass_trance_c: new Howl({src: ['/audio/bass_trance_c.wav']}),
        bass_voxy_c: new Howl({src: ['/audio/bass_voxy_c.wav']}),
        bass_voxy_hit_c: new Howl({src: ['/audio/bass_voxy_hit_c.wav']}),
        bass_woodsy_c: new Howl({src: ['/audio/bass_woodsy_c.wav']}),
        bd_808: new Howl({src: ['/audio/bd_808.wav']}),
        bd_ada: new Howl({src: ['/audio/bd_ada.wav']}),
        bd_boom: new Howl({src: ['/audio/bd_boom.wav']}),
        bd_fat: new Howl({src: ['/audio/bd_fat.wav']}),
        bd_gas: new Howl({src: ['/audio/bd_gas.wav']}),
        bd_haus: new Howl({src: ['/audio/bd_haus.wav']}),
        bd_klub: new Howl({src: ['/audio/bd_klub.wav']}),
        bd_pure: new Howl({src: ['/audio/bd_pure.wav']}),
        bd_sone: new Howl({src: ['/audio/bd_sone.wav']}),
        bd_tek: new Howl({src: ['/audio/bd_tek.wav']}),
        bd_zome: new Howl({src: ['/audio/bd_zome.wav']}),
        bd_zum: new Howl({src: ['/audio/bd_zum.wav']}),
        elec_beep: new Howl({src: ['/audio/elec_beep.wav']}),
        elec_bell: new Howl({src: ['/audio/elec_bell.wav']}),
        elec_blip: new Howl({src: ['/audio/elec_blip.wav']}),
        elec_blup: new Howl({src: ['/audio/elec_blup.wav']}),
        elec_blip2: new Howl({src: ['/audio/elec_blip2.wav']}),
        elec_bong: new Howl({src: ['/audio/elec_bong.wav']}),
        elec_chime: new Howl({src: ['/audio/elec_chime.wav']}),
        elec_cymbal: new Howl({src: ['/audio/elec_cymbal.wav']}),
        elec_filt_snare: new Howl({src: ['/audio/elec_filt_snare.wav']}),
        elec_flip: new Howl({src: ['/audio/elec_flip.wav']}),
        elec_fuzz_tom: new Howl({src: ['/audio/elec_fuzz_tom.wav']}),
        elec_hi_snare: new Howl({src: ['/audio/elec_hi_snare.wav']}),
        elec_hollow_kick: new Howl({src: ['/audio/elec_hollow_kick.wav']}),
        elec_lo_snare: new Howl({src: ['/audio/elec_lo_snare.wav']}),
        elec_mid_snare: new Howl({src: ['/audio/elec_mid_snare.wav']}),
        elec_ping: new Howl({src: ['/audio/elec_ping.wav']}),
        elec_plip: new Howl({src: ['/audio/elec_plip.wav']}),
        elec_pop: new Howl({src: ['/audio/elec_pop.wav']}),
        elec_snare: new Howl({src: ['/audio/elec_snare.wav']}),
        elec_soft_kick: new Howl({src: ['/audio/elec_soft_kick.wav']}),
        elec_tick: new Howl({src: ['/audio/elec_tick.wav']}),
        elec_triangle: new Howl({src: ['/audio/elec_triangle.wav']}),
        elec_twang: new Howl({src: ['/audio/elec_twang.wav']}),
        elec_twip: new Howl({src: ['/audio/elec_twip.wav']}),
        elec_wood: new Howl({src: ['/audio/elec_wood.wav']})
    };

    // if there are issues, it is most likely to do with this id... not a great thing to include
    // represents the unique instance of a sound, but cannot reliably track like this when many sounds are playing
    // possibly a more complex structure needed for state management, or get rid of all together
    var id;

    var methods = {
        start : function start(input){
            // console.log(input);
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
            // console.log(input);
            var callee = input.callee || 'drums';
            var args = input.args || [0];
            return function (fn) {
                howls[callee].play(id);
                // label.innerHTML = 'Playing';
                setTimeout(fn, args[0]);
            };
        },
        pause: function pause(input){
            // console.log(input);
            var callee = input.callee || 'drums';
            var args = input.args || [0];
            return function(fn){
                howls[callee].pause();
                // label.innerHTML = 'Paused';
                setTimeout(fn, args[0]);
            };
        },
        rate: function rate(input) {
            // console.log(input);
            var callee = input.callee || 'drums';
            var args = input.args || [0];
            return function(fn) {
                howls[callee].rate(args[0], id);
                // label.innerHTML = 'Change Rate';
                fn();
            }
        },
        fade: function fade(input) {
            // console.log(input);
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
            // console.log(input);
            var callee = input.callee || 'drums';
            var args = input.args || [true];
            return function (fn) {
                howls[callee].loop(args[0]);
                // label.innerHTML = 'Repeat';
                fn();
            }
        },
        wait: function wait(input) {
            // console.log(input);
            var callee = input.callee || 'drums';
            var args = input.args || [1000];
            return function (fn) {
                setTimeout(fn,args[0]);
            }
        },
        stop: function stop(input) {
            // console.log(input);
            var callee = input.callee || 'drums';
            return function (fn) {
                howls[callee].stop();
                fn();
            }
        }
    };

    // Private Methods

    var walkAST = function walkAST(node) {

        var children = [];
        var ops = {};
        var type = node.type;
        if (node.body && node.body.length > 0) {
            children = node.body.map(function (prop) {
                return walkAST(prop);
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
    };

    var convertToMusic = function convertToMusic(ast) {
        var js = [];
        if (!ast) {
            return [];
        }
        if (ast.children && ast.children.length > 0) {
            js = (ast.children.map(function (child) {
                return convertToMusic(child);
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
    };

    // Public Methods
    var playTheMusic = function playTheMusic(input, cb) {
        var actions = convertToMusic(walkAST(esprima.parse(input)));
        var chain = function (i) {
            return function () {
                if (actions[i]) {
                    actions[i](chain(++i));
                } else {
                    // console.log('completed playing the music :)');
                    cb && cb();
                }
            };
        };
        actions[0](chain(1));
    };

    var stopMusic = function () {
        for (var key in howls) {
            // skip loop if the property is from prototype
            if (!howls.hasOwnProperty(key)) continue;

            howls[key].stop();
        }
        console.log('stopped music')
    };

    var hookupViz = function hookupViz(canvasParams) {
        var canvasCtx = canvasParams.context;
        var WIDTH = canvasParams.width;
        var HEIGHT = canvasParams.height;

        console.log('Hook in audio analyser for viz');
        // Create an analyser node in the Howler WebAudio context
        var analyser = Howler.ctx.createAnalyser();
        // Connect the masterGain -> analyser (disconnecting masterGain -> destination)
        //TODO: If we can hook in to the different tracks then we can plot each individually
        Howler.masterGain.connect(analyser);
        // Connect the analyser -> destination
        analyser.connect(Howler.ctx.destination);

        //Create array to hold audio data
        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        let step = 3;
        let white = 100;
        let incrementing = true;
        // let green = 0;
        // let blue = 0;

        function draw() {
            drawVisual = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.fillStyle = '#171717';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            canvas.width = 830;
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = `rgb(${white}, ${white}, ${white})`;
            if (incrementing)
                white = white + step;
            else
                white = white - step;
            if (white <= 100) incrementing = true;
            if (white >= 257) incrementing = false;

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
            // console.log('Canvas width: ' + canvas.width);
            canvasCtx.lineTo(canvas.width, canvas.height/2);
            canvasCtx.stroke();
        }

        draw();
    };

    // Reveal public methods
    return {
        playTheMusic: playTheMusic,
        stopMusic: stopMusic,
        hookupViz: hookupViz
    };

})();