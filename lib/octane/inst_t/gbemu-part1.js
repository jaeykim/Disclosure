Code.bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return this.capture({}, {
            GameboyBenchmark: GameboyBenchmark,
            decoded_gameboy_rom: decoded_gameboy_rom,
            expectedGameboyStateStr: expectedGameboyStateStr,
            GameBoyWindow: GameBoyWindow,
            GameBoyAudioNode: GameBoyAudioNode,
            mock_date_time_counter: mock_date_time_counter,
            toBase64: toBase64,
            fromBase64: fromBase64,
            samplesPerCallback: samplesPerCallback,
            outputConvert: outputConvert,
            audioContextHandle: audioContextHandle,
            audioNode: audioNode,
            audioSource: audioSource,
            launchedContext: launchedContext,
            audioContextSampleBuffer: audioContextSampleBuffer,
            resampled: resampled,
            webAudioMinBufferSize: webAudioMinBufferSize,
            webAudioMaxBufferSize: webAudioMaxBufferSize,
            webAudioActualSampleRate: webAudioActualSampleRate,
            XAudioJSSampleRate: XAudioJSSampleRate,
            webAudioMono: webAudioMono,
            XAudioJSVolume: XAudioJSVolume,
            resampleControl: resampleControl,
            audioBufferSize: audioBufferSize,
            resampleBufferStart: resampleBufferStart,
            resampleBufferEnd: resampleBufferEnd,
            resampleBufferSize: resampleBufferSize
        });
    }).hoist(setupGameboy, Σ).hoist(runGameboy, Σ).hoist(tearDownGameboy, Σ).hoist(GameBoyContext, Σ).hoist(GameBoyCanvas, Σ).hoist(cout, Σ).hoist(clear_terminal, Σ).hoist(GameBoyAudioContext, Σ).hoist(new_Date, Σ).hoist(checkFinalState, Σ).hoist(resetGlobalVariables, Σ).hoist(base64, Σ).hoist(base64_decode, Σ).hoist(to_little_endian_dword, Σ).hoist(to_little_endian_word, Σ).hoist(to_byte, Σ).hoist(arrayToBase64, Σ).hoist(base64ToArray, Σ).hoist(Resampler, Σ).hoist(XAudioServer, Σ).hoist(getFloat32, Σ).hoist(getFloat32Flat, Σ).hoist(audioOutputFlashEvent, Σ).hoist(generateFlashStereoString, Σ).hoist(generateFlashMonoString, Σ).hoist(audioOutputEvent, Σ).hoist(resampleRefill, Σ).hoist(resampledSamplesLeft, Σ).hoist(getBufferSamples, Σ).hoist(resetCallbackAPIAudioBuffer, Σ).hoist(Resize, Σ);
    var GameboyBenchmark = new BenchmarkSuite('Gameboy', [26288412], [new Benchmark('Gameboy', false, false, 20, runGameboy, setupGameboy, tearDownGameboy, null, 4)]);
    var decoded_gameboy_rom = null;
    function setupGameboy() {
        if (!(typeof Uint8Array != 'undefined' && typeof Int8Array != 'undefined' && typeof Float32Array != 'undefined' && typeof Int32Array != 'undefined')) {
            throw 'TypedArrayUnsupported';
        }
        decoded_gameboy_rom = base64_decode(gameboy_rom);
        rom = null;
    }
    function runGameboy() {
        start(new GameBoyCanvas(), decoded_gameboy_rom);
        gameboy.instructions = 0;
        gameboy.totalInstructions = 250000;
        while (gameboy.instructions <= gameboy.totalInstructions) {
            gameboy.run();
            GameBoyAudioNode.run();
        }
        resetGlobalVariables();
    }
    function tearDownGameboy() {
        decoded_gameboy_rom = null;
        expectedGameboyStateStr = null;
    }
    var expectedGameboyStateStr = '{"registerA":160,"registerB":255,"registerC":255,"registerE":11,' + '"registersHL":51600,"programCounter":24309,"stackPointer":49706,' + '"sumROM":10171578,"sumMemory":3435856,"sumMBCRam":234598,"sumVRam":0}';
    var GameBoyWindow = {};
    function GameBoyContext() {
        var Σ_GameBoyContext = new Σ.Scope(this, Σ, GameBoyContext, function () {
            return this.capture({}, {});
        });
        this.createBuffer = Σ_GameBoyContext.addFunction(function αIviw() {
            return new Buffer();
        }, Σ_GameBoyContext);
        this.createImageData = Σ_GameBoyContext.addFunction(function α4D6B(w, h) {
            var Σ_GameBoyContext_α4D6B = new Σ.Scope(this, Σ_GameBoyContext, α4D6B, function () {
                return this.capture({
                    w: w,
                    h: h
                }, { result: result });
            });
            var result = {};
            result.data = new Uint8Array(w * h * 4);
            return result;
        }, Σ_GameBoyContext);
        this.putImageData = Σ_GameBoyContext.addFunction(function αuWUH(buffer, x, y) {
            var Σ_GameBoyContext_αuWUH = new Σ.Scope(this, Σ_GameBoyContext, αuWUH, function () {
                return this.capture({
                    buffer: buffer,
                    x: x,
                    y: y
                }, { sum: sum });
            });
            var sum = 0;
            for (var i = 0; i < buffer.data.length; i++) {
                sum += i * buffer.data[i];
                sum = sum % 1000;
            }
        }, Σ_GameBoyContext);
        this.drawImage = Σ_GameBoyContext.addFunction(function αcZKb() {
        }, Σ_GameBoyContext);
    }
    ;
    function GameBoyCanvas() {
        var Σ_GameBoyCanvas = new Σ.Scope(this, Σ, GameBoyCanvas, function () {
            return this.capture({}, {});
        });
        this.getContext = Σ_GameBoyCanvas.addFunction(function αpudN() {
            return new GameBoyContext();
        }, Σ_GameBoyCanvas);
        this.width = 160;
        this.height = 144;
        this.style = { visibility: 'visibile' };
    }
    function cout(message, colorIndex) {
        var Σ_cout = new Σ.Scope(this, Σ, cout, function () {
            return this.capture({
                message: message,
                colorIndex: colorIndex
            }, {});
        });
    }
    function clear_terminal() {
    }
    var GameBoyAudioNode = {
        bufferSize: 0,
        onaudioprocess: null,
        connect: Σ.addFunction(function αGB67() {
        }, Σ),
        run: Σ.addFunction(function αWPHY() {
            var Σ_αWPHY = new Σ.Scope(this, Σ, αWPHY, function () {
                return this.capture({}, { event: event });
            });
            var event = { outputBuffer: this.outputBuffer };
            this.onaudioprocess(event);
        }, Σ)
    };
    function GameBoyAudioContext() {
        var Σ_GameBoyAudioContext = new Σ.Scope(this, Σ, GameBoyAudioContext, function () {
            return this.capture({}, {});
        });
        this.createBufferSource = Σ_GameBoyAudioContext.addFunction(function αnqlH() {
            var Σ_GameBoyAudioContext_αnqlH = new Σ.Scope(this, Σ_GameBoyAudioContext, αnqlH, function () {
                return this.capture({}, {});
            });
            return {
                noteOn: Σ_GameBoyAudioContext_αnqlH.addFunction(function α7WsQ() {
                }, Σ_GameBoyAudioContext_αnqlH),
                connect: Σ_GameBoyAudioContext_αnqlH.addFunction(function αMESV() {
                }, Σ_GameBoyAudioContext_αnqlH)
            };
        }, Σ_GameBoyAudioContext);
        this.sampleRate = 48000;
        this.destination = {};
        this.createBuffer = Σ_GameBoyAudioContext.addFunction(function αUpnR(channels, len, sampleRate) {
            var Σ_GameBoyAudioContext_αUpnR = new Σ.Scope(this, Σ_GameBoyAudioContext, αUpnR, function () {
                return this.capture({
                    channels: channels,
                    len: len,
                    sampleRate: sampleRate
                }, {});
            });
            return {
                gain: 1,
                numberOfChannels: 1,
                length: 1,
                duration: 0.000020833333110203966,
                sampleRate: 48000
            };
        }, Σ_GameBoyAudioContext);
        this.createJavaScriptNode = Σ_GameBoyAudioContext.addFunction(function α5wnz(bufferSize, inputChannels, outputChannels) {
            var Σ_GameBoyAudioContext_α5wnz = new Σ.Scope(this, Σ_GameBoyAudioContext, α5wnz, function () {
                return this.capture({
                    bufferSize: bufferSize,
                    inputChannels: inputChannels,
                    outputChannels: outputChannels
                }, {});
            });
            GameBoyAudioNode.bufferSize = bufferSize;
            GameBoyAudioNode.outputBuffer = {
                getChannelData: Σ_GameBoyAudioContext_α5wnz.addFunction(function αymNd(i) {
                    var Σ_GameBoyAudioContext_α5wnz_αymNd = new Σ.Scope(this, Σ_GameBoyAudioContext_α5wnz, αymNd, function () {
                        return this.capture({ i: i }, {});
                    });
                    return this.channelData[i];
                }, Σ_GameBoyAudioContext_α5wnz),
                channelData: []
            };
            for (var i = 0; i < outputChannels; i++) {
                GameBoyAudioNode.outputBuffer.channelData[i] = new Float32Array(bufferSize);
            }
            return GameBoyAudioNode;
        }, Σ_GameBoyAudioContext);
    }
    var mock_date_time_counter = 0;
    function new_Date() {
        var Σ_new_Date = new Σ.Scope(this, Σ, new_Date, function () {
            return this.capture({}, {});
        });
        return {
            getTime: Σ_new_Date.addFunction(function αcdXE() {
                mock_date_time_counter += 16;
                return mock_date_time_counter;
            }, Σ_new_Date)
        };
    }
    function checkFinalState() {
        var Σ_checkFinalState = new Σ.Scope(this, Σ, checkFinalState, function () {
            return this.capture({}, {
                state: state,
                stateStr: stateStr
            });
        }).hoist(sum, Σ_checkFinalState);
        function sum(a) {
            var Σ_checkFinalState_sum = new Σ.Scope(this, Σ_checkFinalState, sum, function () {
                return this.capture({ a: a }, { result: result });
            });
            var result = 0;
            for (var i = 0; i < a.length; i++) {
                result += a[i];
            }
            return result;
        }
        var state = {
            registerA: gameboy.registerA,
            registerB: gameboy.registerB,
            registerC: gameboy.registerC,
            registerE: gameboy.registerE,
            registerF: gameboy.registerF,
            registersHL: gameboy.registersHL,
            programCounter: gameboy.programCounter,
            stackPointer: gameboy.stackPointer,
            sumROM: sum(gameboy.fromTypedArray(gameboy.ROM)),
            sumMemory: sum(gameboy.fromTypedArray(gameboy.memory)),
            sumMBCRam: sum(gameboy.fromTypedArray(gameboy.MBCRam)),
            sumVRam: sum(gameboy.fromTypedArray(gameboy.VRam))
        };
        var stateStr = JSON.stringify(state);
        if (typeof expectedGameboyStateStr != 'undefined') {
            if (stateStr != expectedGameboyStateStr) {
                alert('Incorrect final state of processor:\n' + ' actual   ' + stateStr + '\n' + ' expected ' + expectedGameboyStateStr);
            }
        } else {
            alert(stateStr);
        }
    }
    function resetGlobalVariables() {
        audioContextHandle = null;
        audioNode = null;
        audioSource = null;
        launchedContext = false;
        audioContextSampleBuffer = [];
        resampled = [];
        webAudioMinBufferSize = 15000;
        webAudioMaxBufferSize = 25000;
        webAudioActualSampleRate = 44100;
        XAudioJSSampleRate = 0;
        webAudioMono = false;
        XAudioJSVolume = 1;
        resampleControl = null;
        audioBufferSize = 0;
        resampleBufferStart = 0;
        resampleBufferEnd = 0;
        resampleBufferSize = 2;
        gameboy = null;
        gbRunInterval = null;
    }
    var toBase64 = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '+',
        '/',
        '='
    ];
    var fromBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    function base64(data) {
        var Σ_base64 = new Σ.Scope(this, Σ, base64, function () {
            return this.capture({ data: data }, {});
        });
        try {
            var base64 = GameBoyWindow.btoa(data);
        } catch (error) {
            var base64 = '';
            var dataLength = data.length;
            if (dataLength > 0) {
                var bytes = [
                    0,
                    0,
                    0
                ];
                var index = 0;
                var remainder = dataLength % 3;
                while (data.length % 3 > 0) {
                    data[data.length] = ' ';
                }
                while (index < dataLength) {
                    bytes = [
                        data.charCodeAt(index++) & 255,
                        data.charCodeAt(index++) & 255,
                        data.charCodeAt(index++) & 255
                    ];
                    base64 += toBase64[bytes[0] >> 2] + toBase64[(bytes[0] & 3) << 4 | bytes[1] >> 4] + toBase64[(bytes[1] & 15) << 2 | bytes[2] >> 6] + toBase64[bytes[2] & 63];
                }
                if (remainder > 0) {
                    base64[base64.length - 1] = '=';
                    if (remainder == 2) {
                        base64[base64.length - 2] = '=';
                        base64[base64.length - 3] = toBase64[(bytes[0] & 3) << 4];
                    } else {
                        base64[base64.length - 2] = toBase64[(bytes[1] & 15) << 2];
                    }
                }
            }
        }
        return base64;
    }
    function base64_decode(data) {
        var Σ_base64_decode = new Σ.Scope(this, Σ, base64_decode, function () {
            return this.capture({ data: data }, {});
        });
        try {
            var decode64 = GameBoyWindow.atob(data);
        } catch (error) {
            var decode64 = '';
            var dataLength = data.length;
            if (dataLength > 3 && dataLength % 4 == 0) {
                var sixbits = [
                    0,
                    0,
                    0,
                    0
                ];
                var index = 0;
                while (index < dataLength) {
                    sixbits = [
                        fromBase64.indexOf(data.charAt(index++)),
                        fromBase64.indexOf(data.charAt(index++)),
                        fromBase64.indexOf(data.charAt(index++)),
                        fromBase64.indexOf(data.charAt(index++))
                    ];
                    decode64 += String.fromCharCode(sixbits[0] << 2 | sixbits[1] >> 4) + String.fromCharCode((sixbits[1] & 15) << 4 | sixbits[2] >> 2) + String.fromCharCode((sixbits[2] & 3) << 6 | sixbits[3]);
                }
                if (sixbits[3] >= 64) {
                    decode64.length -= 1;
                    if (sixbits[2] >= 64) {
                        decode64.length -= 1;
                    }
                }
            }
        }
        return decode64;
    }
    function to_little_endian_dword(str) {
        var Σ_to_little_endian_dword = new Σ.Scope(this, Σ, to_little_endian_dword, function () {
            return this.capture({ str: str }, {});
        });
        return to_little_endian_word(str) + String.fromCharCode(str >> 16 & 255, str >> 24 & 255);
    }
    function to_little_endian_word(str) {
        var Σ_to_little_endian_word = new Σ.Scope(this, Σ, to_little_endian_word, function () {
            return this.capture({ str: str }, {});
        });
        return to_byte(str) + String.fromCharCode(str >> 8 & 255);
    }
    function to_byte(str) {
        var Σ_to_byte = new Σ.Scope(this, Σ, to_byte, function () {
            return this.capture({ str: str }, {});
        });
        return String.fromCharCode(str & 255);
    }
    function arrayToBase64(arrayIn) {
        var Σ_arrayToBase64 = new Σ.Scope(this, Σ, arrayToBase64, function () {
            return this.capture({ arrayIn: arrayIn }, {
                binString: binString,
                length: length
            });
        });
        var binString = '';
        var length = arrayIn.length;
        for (var index = 0; index < length; ++index) {
            if (typeof arrayIn[index] == 'number') {
                binString += String.fromCharCode(arrayIn[index]);
            }
        }
        return base64(binString);
    }
    function base64ToArray(b64String) {
        var Σ_base64ToArray = new Σ.Scope(this, Σ, base64ToArray, function () {
            return this.capture({ b64String: b64String }, {
                binString: binString,
                outArray: outArray,
                length: length
            });
        });
        var binString = base64_decode(b64String);
        var outArray = [];
        var length = binString.length;
        for (var index = 0; index < length;) {
            outArray.push(binString.charCodeAt(index++) & 255);
        }
        return outArray;
    }
    function Resampler(fromSampleRate, toSampleRate, channels, outputBufferSize, noReturn) {
        var Σ_Resampler = new Σ.Scope(this, Σ, Resampler, function () {
            return this.capture({
                fromSampleRate: fromSampleRate,
                toSampleRate: toSampleRate,
                channels: channels,
                outputBufferSize: outputBufferSize,
                noReturn: noReturn
            }, {});
        });
        this.fromSampleRate = fromSampleRate;
        this.toSampleRate = toSampleRate;
        this.channels = channels | 0;
        this.outputBufferSize = outputBufferSize;
        this.noReturn = !!noReturn;
        this.initialize();
    }
    Resampler.prototype.initialize = Σ.addFunction(function αzM0r() {
        if (this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0) {
            if (this.fromSampleRate == this.toSampleRate) {
                this.resampler = this.bypassResampler;
                this.ratioWeight = 1;
            } else {
                this.compileInterpolationFunction();
                this.resampler = this.interpolate;
                this.ratioWeight = this.fromSampleRate / this.toSampleRate;
                this.tailExists = false;
                this.lastWeight = 0;
                this.initializeBuffers();
            }
        } else {
            throw new Error('Invalid settings specified for the resampler.');
        }
    }, Σ);
    Resampler.prototype.compileInterpolationFunction = Σ.addFunction(function αrQEO() {
        var Σ_αrQEO = new Σ.Scope(this, Σ, αrQEO, function () {
            return this.capture({}, { toCompile: toCompile });
        });
        var toCompile = 'var bufferLength = Math.min(buffer.length, this.outputBufferSize);  if ((bufferLength % ' + this.channels + ') == 0) {    if (bufferLength > 0) {      var ratioWeight = this.ratioWeight;      var weight = 0;';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'var output' + channel + ' = 0;';
        }
        toCompile += 'var actualPosition = 0;      var amountToNext = 0;      var alreadyProcessedTail = !this.tailExists;      this.tailExists = false;      var outputBuffer = this.outputBuffer;      var outputOffset = 0;      var currentPosition = 0;      do {        if (alreadyProcessedTail) {          weight = ratioWeight;';
        for (channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' = 0;';
        }
        toCompile += '}        else {          weight = this.lastWeight;';
        for (channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' = this.lastOutput[' + channel + '];';
        }
        toCompile += 'alreadyProcessedTail = true;        }        while (weight > 0 && actualPosition < bufferLength) {          amountToNext = 1 + actualPosition - currentPosition;          if (weight >= amountToNext) {';
        for (channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' += buffer[actualPosition++] * amountToNext;';
        }
        toCompile += 'currentPosition = actualPosition;            weight -= amountToNext;          }          else {';
        for (channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' += buffer[actualPosition' + (channel > 0 ? ' + ' + channel : '') + '] * weight;';
        }
        toCompile += 'currentPosition += weight;            weight = 0;            break;          }        }        if (weight == 0) {';
        for (channel = 0; channel < this.channels; ++channel) {
            toCompile += 'outputBuffer[outputOffset++] = output' + channel + ' / ratioWeight;';
        }
        toCompile += '}        else {          this.lastWeight = weight;';
        for (channel = 0; channel < this.channels; ++channel) {
            toCompile += 'this.lastOutput[' + channel + '] = output' + channel + ';';
        }
        toCompile += 'this.tailExists = true;          break;        }      } while (actualPosition < bufferLength);      return this.bufferSlice(outputOffset);    }    else {      return (this.noReturn) ? 0 : [];    }  }  else {    throw(new Error("Buffer was of incorrect sample length."));  }';
        this.interpolate = Function('buffer', toCompile);
    }, Σ);
    Resampler.prototype.bypassResampler = Σ.addFunction(function αQUm1(buffer) {
        var Σ_αQUm1 = new Σ.Scope(this, Σ, αQUm1, function () {
            return this.capture({ buffer: buffer }, {});
        });
        if (this.noReturn) {
            this.outputBuffer = buffer;
            return buffer.length;
        } else {
            return buffer;
        }
    }, Σ);
    Resampler.prototype.bufferSlice = Σ.addFunction(function αDV1i(sliceAmount) {
        var Σ_αDV1i = new Σ.Scope(this, Σ, αDV1i, function () {
            return this.capture({ sliceAmount: sliceAmount }, {});
        });
        if (this.noReturn) {
            return sliceAmount;
        } else {
            try {
                return this.outputBuffer.subarray(0, sliceAmount);
            } catch (error) {
                try {
                    this.outputBuffer.length = sliceAmount;
                    return this.outputBuffer;
                } catch (error) {
                    return this.outputBuffer.slice(0, sliceAmount);
                }
            }
        }
    }, Σ);
    Resampler.prototype.initializeBuffers = Σ.addFunction(function αObnX() {
        try {
            this.outputBuffer = new Float32Array(this.outputBufferSize);
            this.lastOutput = new Float32Array(this.channels);
        } catch (error) {
            this.outputBuffer = [];
            this.lastOutput = [];
        }
    }, Σ);
    function XAudioServer(channels, sampleRate, minBufferSize, maxBufferSize, underRunCallback, volume) {
        var Σ_XAudioServer = new Σ.Scope(this, Σ, XAudioServer, function () {
            return this.capture({
                channels: channels,
                sampleRate: sampleRate,
                minBufferSize: minBufferSize,
                maxBufferSize: maxBufferSize,
                underRunCallback: underRunCallback,
                volume: volume
            }, {});
        });
        this.audioChannels = channels == 2 ? 2 : 1;
        webAudioMono = this.audioChannels == 1;
        XAudioJSSampleRate = sampleRate > 0 && sampleRate <= 16777215 ? sampleRate : 44100;
        webAudioMinBufferSize = minBufferSize >= samplesPerCallback << 1 && minBufferSize < maxBufferSize ? minBufferSize & (webAudioMono ? 4294967295 : 4294967294) : samplesPerCallback << 1;
        webAudioMaxBufferSize = Math.floor(maxBufferSize) > webAudioMinBufferSize + this.audioChannels ? maxBufferSize & (webAudioMono ? 4294967295 : 4294967294) : minBufferSize << 1;
        this.underRunCallback = typeof underRunCallback == 'function' ? underRunCallback : Σ_XAudioServer.addFunction(function αv43v() {
        }, Σ_XAudioServer);
        XAudioJSVolume = volume >= 0 && volume <= 1 ? volume : 1;
        this.audioType = -1;
        this.mozAudioTail = [];
        this.audioHandleMoz = null;
        this.audioHandleFlash = null;
        this.flashInitialized = false;
        this.mozAudioFound = false;
        this.initializeAudio();
    }
    XAudioServer.prototype.MOZWriteAudio = Σ.addFunction(function αkzQ8(buffer) {
        var Σ_αkzQ8 = new Σ.Scope(this, Σ, αkzQ8, function () {
            return this.capture({ buffer: buffer }, {});
        });
        this.MOZWriteAudioNoCallback(buffer);
        this.MOZExecuteCallback();
    }, Σ);
    XAudioServer.prototype.MOZWriteAudioNoCallback = Σ.addFunction(function αa3yI(buffer) {
        var Σ_αa3yI = new Σ.Scope(this, Σ, αa3yI, function () {
            return this.capture({ buffer: buffer }, {});
        });
        this.writeMozAudio(buffer);
    }, Σ);
    XAudioServer.prototype.callbackBasedWriteAudio = Σ.addFunction(function αd1k6(buffer) {
        var Σ_αd1k6 = new Σ.Scope(this, Σ, αd1k6, function () {
            return this.capture({ buffer: buffer }, {});
        });
        this.callbackBasedWriteAudioNoCallback(buffer);
        this.callbackBasedExecuteCallback();
    }, Σ);
    XAudioServer.prototype.callbackBasedWriteAudioNoCallback = Σ.addFunction(function αoEgj(buffer) {
        var Σ_αoEgj = new Σ.Scope(this, Σ, αoEgj, function () {
            return this.capture({ buffer: buffer }, { length: length });
        });
        var length = buffer.length;
        for (var bufferCounter = 0; bufferCounter < length && audioBufferSize < webAudioMaxBufferSize;) {
            audioContextSampleBuffer[audioBufferSize++] = buffer[bufferCounter++];
        }
    }, Σ);
    XAudioServer.prototype.writeAudio = Σ.addFunction(function α0P7I(buffer) {
        var Σ_α0P7I = new Σ.Scope(this, Σ, α0P7I, function () {
            return this.capture({ buffer: buffer }, {});
        });
        if (this.audioType == 0) {
            this.MOZWriteAudio(buffer);
        } else if (this.audioType == 1) {
            this.callbackBasedWriteAudio(buffer);
        } else if (this.audioType == 2) {
            if (this.checkFlashInit() || launchedContext) {
                this.callbackBasedWriteAudio(buffer);
            } else if (this.mozAudioFound) {
                this.MOZWriteAudio(buffer);
            }
        }
    }, Σ);
    XAudioServer.prototype.writeAudioNoCallback = Σ.addFunction(function αm8Io(buffer) {
        var Σ_αm8Io = new Σ.Scope(this, Σ, αm8Io, function () {
            return this.capture({ buffer: buffer }, {});
        });
        if (this.audioType == 0) {
            this.MOZWriteAudioNoCallback(buffer);
        } else if (this.audioType == 1) {
            this.callbackBasedWriteAudioNoCallback(buffer);
        } else if (this.audioType == 2) {
            if (this.checkFlashInit() || launchedContext) {
                this.callbackBasedWriteAudioNoCallback(buffer);
            } else if (this.mozAudioFound) {
                this.MOZWriteAudioNoCallback(buffer);
            }
        }
    }, Σ);
    XAudioServer.prototype.remainingBuffer = Σ.addFunction(function α1ImC() {
        if (this.audioType == 0) {
            return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
        } else if (this.audioType == 1) {
            return (resampledSamplesLeft() * resampleControl.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + audioBufferSize;
        } else if (this.audioType == 2) {
            if (this.checkFlashInit() || launchedContext) {
                return (resampledSamplesLeft() * resampleControl.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + audioBufferSize;
            } else if (this.mozAudioFound) {
                return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
            }
        }
        return 0;
    }, Σ);
    XAudioServer.prototype.MOZExecuteCallback = Σ.addFunction(function αQoiq() {
        var Σ_αQoiq = new Σ.Scope(this, Σ, αQoiq, function () {
            return this.capture({}, { samplesRequested: samplesRequested });
        });
        var samplesRequested = webAudioMinBufferSize - this.remainingBuffer();
        if (samplesRequested > 0) {
            this.writeMozAudio(this.underRunCallback(samplesRequested));
        }
    }, Σ);
    XAudioServer.prototype.callbackBasedExecuteCallback = Σ.addFunction(function α2qzS() {
        var Σ_α2qzS = new Σ.Scope(this, Σ, α2qzS, function () {
            return this.capture({}, { samplesRequested: samplesRequested });
        });
        var samplesRequested = webAudioMinBufferSize - this.remainingBuffer();
        if (samplesRequested > 0) {
            this.callbackBasedWriteAudioNoCallback(this.underRunCallback(samplesRequested));
        }
    }, Σ);
    XAudioServer.prototype.executeCallback = Σ.addFunction(function αF97u() {
        if (this.audioType == 0) {
            this.MOZExecuteCallback();
        } else if (this.audioType == 1) {
            this.callbackBasedExecuteCallback();
        } else if (this.audioType == 2) {
            if (this.checkFlashInit() || launchedContext) {
                this.callbackBasedExecuteCallback();
            } else if (this.mozAudioFound) {
                this.MOZExecuteCallback();
            }
        }
    }, Σ);
    XAudioServer.prototype.initializeAudio = Σ.addFunction(function αOepF() {
        try {
            throw new Error('Select initializeWebAudio case');
            this.preInitializeMozAudio();
            if (navigator.platform == 'Linux i686') {
                throw new Error('');
            }
            this.initializeMozAudio();
        } catch (error) {
            try {
                this.initializeWebAudio();
            } catch (error) {
                try {
                    this.initializeFlashAudio();
                } catch (error) {
                    throw new Error('Browser does not support real time audio output.');
                }
            }
        }
    }, Σ);
    XAudioServer.prototype.preInitializeMozAudio = Σ.addFunction(function α36Yc() {
        var Σ_α36Yc = new Σ.Scope(this, Σ, α36Yc, function () {
            return this.capture({}, {
                emptySampleFrame: emptySampleFrame,
                prebufferAmount: prebufferAmount
            });
        });
        this.audioHandleMoz = new Audio();
        this.audioHandleMoz.mozSetup(this.audioChannels, XAudioJSSampleRate);
        this.samplesAlreadyWritten = 0;
        var emptySampleFrame = this.audioChannels == 2 ? [
            0,
            0
        ] : [0];
        var prebufferAmount = 0;
        if (navigator.platform != 'MacIntel' && navigator.platform != 'MacPPC') {
            while (this.audioHandleMoz.mozCurrentSampleOffset() == 0) {
                prebufferAmount += this.audioHandleMoz.mozWriteAudio(emptySampleFrame);
            }
            var samplesToDoubleBuffer = prebufferAmount / this.audioChannels;
            for (var index = 0; index < samplesToDoubleBuffer; index++) {
                this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(emptySampleFrame);
            }
        }
        this.samplesAlreadyWritten += prebufferAmount;
        webAudioMinBufferSize += this.samplesAlreadyWritten;
        this.mozAudioFound = true;
    }, Σ);
    XAudioServer.prototype.initializeMozAudio = Σ.addFunction(function α3mUc() {
        this.writeMozAudio(getFloat32(webAudioMinBufferSize));
        this.audioType = 0;
    }, Σ);
    XAudioServer.prototype.initializeWebAudio = Σ.addFunction(function αQtFm() {
        if (launchedContext) {
            resetCallbackAPIAudioBuffer(webAudioActualSampleRate, samplesPerCallback);
            this.audioType = 1;
        } else {
            throw new Error('');
        }
    }, Σ);
    XAudioServer.prototype.initializeFlashAudio = Σ.addFunction(function αhHfN() {
        var Σ_αhHfN = new Σ.Scope(this, Σ, αhHfN, function () {
            return this.capture({}, { existingFlashload: existingFlashload });
        });
        var existingFlashload = document.getElementById('XAudioJS');
        if (existingFlashload == null) {
            var thisObj = this;
            var mainContainerNode = document.createElement('div');
            mainContainerNode.setAttribute('style', 'position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ');
            var containerNode = document.createElement('div');
            containerNode.setAttribute('style', 'position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;');
            containerNode.setAttribute('id', 'XAudioJS');
            mainContainerNode.appendChild(containerNode);
            document.getElementsByTagName('body')[0].appendChild(mainContainerNode);
            swfobject.embedSWF('XAudioJS.swf', 'XAudioJS', '8', '8', '9.0.0', '', {}, { 'allowscriptaccess': 'always' }, { 'style': 'position: static; visibility: hidden; margin: 8px; padding: 0px; border: none' }, Σ_αhHfN.addFunction(function αSaqO(event) {
                var Σ_αhHfN_αSaqO = new Σ.Scope(this, Σ_αhHfN, αSaqO, function () {
                    return this.capture({ event: event }, {});
                });
                if (event.success) {
                    thisObj.audioHandleFlash = event.ref;
                } else {
                    thisObj.audioType = 1;
                }
            }, Σ_αhHfN));
        } else {
            this.audioHandleFlash = existingFlashload;
        }
        this.audioType = 2;
    }, Σ);
    XAudioServer.prototype.changeVolume = Σ.addFunction(function αVNxc(newVolume) {
        var Σ_αVNxc = new Σ.Scope(this, Σ, αVNxc, function () {
            return this.capture({ newVolume: newVolume }, {});
        });
        if (newVolume >= 0 && newVolume <= 1) {
            XAudioJSVolume = newVolume;
            if (this.checkFlashInit()) {
                this.audioHandleFlash.changeVolume(XAudioJSVolume);
            }
            if (this.mozAudioFound) {
                this.audioHandleMoz.volume = XAudioJSVolume;
            }
        }
    }, Σ);
    XAudioServer.prototype.writeMozAudio = Σ.addFunction(function αapRb(buffer) {
        var Σ_αapRb = new Σ.Scope(this, Σ, αapRb, function () {
            return this.capture({ buffer: buffer }, {
                length: length,
                samplesAccepted: samplesAccepted
            });
        });
        var length = this.mozAudioTail.length;
        if (length > 0) {
            var samplesAccepted = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);
            this.samplesAlreadyWritten += samplesAccepted;
            this.mozAudioTail.splice(0, samplesAccepted);
        }
        length = Math.min(buffer.length, webAudioMaxBufferSize - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());
        var samplesAccepted = this.audioHandleMoz.mozWriteAudio(buffer);
        this.samplesAlreadyWritten += samplesAccepted;
        for (var index = 0; length > samplesAccepted; --length) {
            this.mozAudioTail.push(buffer[index++]);
        }
    }, Σ);
    XAudioServer.prototype.checkFlashInit = Σ.addFunction(function α5QNN() {
        if (!this.flashInitialized && this.audioHandleFlash && this.audioHandleFlash.initialize) {
            this.flashInitialized = true;
            this.audioHandleFlash.initialize(this.audioChannels, XAudioJSVolume);
            resetCallbackAPIAudioBuffer(44100, samplesPerCallback);
        }
        return this.flashInitialized;
    }, Σ);
    function getFloat32(size) {
        var Σ_getFloat32 = new Σ.Scope(this, Σ, getFloat32, function () {
            return this.capture({ size: size }, {});
        });
        try {
            return new Float32Array(size);
        } catch (error) {
            return new Array(size);
        }
    }
    function getFloat32Flat(size) {
        var Σ_getFloat32Flat = new Σ.Scope(this, Σ, getFloat32Flat, function () {
            return this.capture({ size: size }, {});
        });
        try {
            var newBuffer = new Float32Array(size);
        } catch (error) {
            var newBuffer = new Array(size);
            var audioSampleIndice = 0;
            do {
                newBuffer[audioSampleIndice] = 0;
            } while (++audioSampleIndice < size);
        }
        return newBuffer;
    }
    var samplesPerCallback = 2048;
    var outputConvert = null;
    function audioOutputFlashEvent() {
        resampleRefill();
        return outputConvert();
    }
    function generateFlashStereoString() {
        var Σ_generateFlashStereoString = new Σ.Scope(this, Σ, generateFlashStereoString, function () {
            return this.capture({}, {
                copyBinaryStringLeft: copyBinaryStringLeft,
                copyBinaryStringRight: copyBinaryStringRight
            });
        });
        var copyBinaryStringLeft = '';
        var copyBinaryStringRight = '';
        for (var index = 0; index < samplesPerCallback && resampleBufferStart != resampleBufferEnd; ++index) {
            copyBinaryStringLeft += String.fromCharCode((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 16383 | 0) + 12288);
            copyBinaryStringRight += String.fromCharCode((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 16383 | 0) + 12288);
            if (resampleBufferStart == resampleBufferSize) {
                resampleBufferStart = 0;
            }
        }
        return copyBinaryStringLeft + copyBinaryStringRight;
    }
    function generateFlashMonoString() {
        var Σ_generateFlashMonoString = new Σ.Scope(this, Σ, generateFlashMonoString, function () {
            return this.capture({}, { copyBinaryString: copyBinaryString });
        });
        var copyBinaryString = '';
        for (var index = 0; index < samplesPerCallback && resampleBufferStart != resampleBufferEnd; ++index) {
            copyBinaryString += String.fromCharCode((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 16383 | 0) + 12288);
            if (resampleBufferStart == resampleBufferSize) {
                resampleBufferStart = 0;
            }
        }
        return copyBinaryString;
    }
    var audioContextHandle = null;
    var audioNode = null;
    var audioSource = null;
    var launchedContext = false;
    var audioContextSampleBuffer = [];
    var resampled = [];
    var webAudioMinBufferSize = 15000;
    var webAudioMaxBufferSize = 25000;
    var webAudioActualSampleRate = 44100;
    var XAudioJSSampleRate = 0;
    var webAudioMono = false;
    var XAudioJSVolume = 1;
    var resampleControl = null;
    var audioBufferSize = 0;
    var resampleBufferStart = 0;
    var resampleBufferEnd = 0;
    var resampleBufferSize = 2;
    function audioOutputEvent(event) {
        var Σ_audioOutputEvent = new Σ.Scope(this, Σ, audioOutputEvent, function () {
            return this.capture({ event: event }, {
                index: index,
                buffer1: buffer1,
                buffer2: buffer2
            });
        });
        var index = 0;
        var buffer1 = event.outputBuffer.getChannelData(0);
        var buffer2 = event.outputBuffer.getChannelData(1);
        resampleRefill();
        if (!webAudioMono) {
            while (index < samplesPerCallback && resampleBufferStart != resampleBufferEnd) {
                buffer1[index] = resampled[resampleBufferStart++] * XAudioJSVolume;
                buffer2[index++] = resampled[resampleBufferStart++] * XAudioJSVolume;
                if (resampleBufferStart == resampleBufferSize) {
                    resampleBufferStart = 0;
                }
            }
        } else {
            while (index < samplesPerCallback && resampleBufferStart != resampleBufferEnd) {
                buffer2[index] = buffer1[index] = resampled[resampleBufferStart++] * XAudioJSVolume;
                ++index;
                if (resampleBufferStart == resampleBufferSize) {
                    resampleBufferStart = 0;
                }
            }
        }
        while (index < samplesPerCallback) {
            buffer2[index] = buffer1[index] = 0;
            ++index;
        }
    }
    function resampleRefill() {
        var Σ_resampleRefill = new Σ.Scope(this, Σ, resampleRefill, function () {
            return this.capture({}, {});
        });
        if (audioBufferSize > 0) {
            var resampleLength = resampleControl.resampler(getBufferSamples());
            var resampledResult = resampleControl.outputBuffer;
            for (var index2 = 0; index2 < resampleLength; ++index2) {
                resampled[resampleBufferEnd++] = resampledResult[index2];
                if (resampleBufferEnd == resampleBufferSize) {
                    resampleBufferEnd = 0;
                }
                if (resampleBufferStart == resampleBufferEnd) {
                    ++resampleBufferStart;
                    if (resampleBufferStart == resampleBufferSize) {
                        resampleBufferStart = 0;
                    }
                }
            }
            audioBufferSize = 0;
        }
    }
    function resampledSamplesLeft() {
        return (resampleBufferStart <= resampleBufferEnd ? 0 : resampleBufferSize) + resampleBufferEnd - resampleBufferStart;
    }
    function getBufferSamples() {
        try {
            return audioContextSampleBuffer.subarray(0, audioBufferSize);
        } catch (error) {
            try {
                audioContextSampleBuffer.length = audioBufferSize;
                return audioContextSampleBuffer;
            } catch (error) {
                return audioContextSampleBuffer.slice(0, audioBufferSize);
            }
        }
    }
    function resetCallbackAPIAudioBuffer(APISampleRate, bufferAlloc) {
        var Σ_resetCallbackAPIAudioBuffer = new Σ.Scope(this, Σ, resetCallbackAPIAudioBuffer, function () {
            return this.capture({
                APISampleRate: APISampleRate,
                bufferAlloc: bufferAlloc
            }, {});
        });
        audioContextSampleBuffer = getFloat32(webAudioMaxBufferSize);
        audioBufferSize = webAudioMaxBufferSize;
        resampleBufferStart = 0;
        resampleBufferEnd = 0;
        resampleBufferSize = Math.max(webAudioMaxBufferSize * Math.ceil(XAudioJSSampleRate / APISampleRate), samplesPerCallback) << 1;
        if (webAudioMono) {
            resampled = getFloat32Flat(resampleBufferSize);
            resampleControl = new Resampler(XAudioJSSampleRate, APISampleRate, 1, resampleBufferSize, true);
            outputConvert = generateFlashMonoString;
        } else {
            resampleBufferSize <<= 1;
            resampled = getFloat32Flat(resampleBufferSize);
            resampleControl = new Resampler(XAudioJSSampleRate, APISampleRate, 2, resampleBufferSize, true);
            outputConvert = generateFlashStereoString;
        }
    }
    Σ.addFunction(function α0xAi() {
        if (!launchedContext) {
            try {
                audioContextHandle = new GameBoyAudioContext();
            } catch (error) {
                try {
                    audioContextHandle = new AudioContext();
                } catch (error) {
                    return;
                }
            }
            try {
                audioSource = audioContextHandle.createBufferSource();
                audioSource.loop = false;
                XAudioJSSampleRate = webAudioActualSampleRate = audioContextHandle.sampleRate;
                audioSource.buffer = audioContextHandle.createBuffer(1, 1, webAudioActualSampleRate);
                audioNode = audioContextHandle.createJavaScriptNode(samplesPerCallback, 1, 2);
                audioNode.onaudioprocess = audioOutputEvent;
                audioSource.connect(audioNode);
                audioNode.connect(audioContextHandle.destination);
                audioSource.noteOn(0);
            } catch (error) {
                return;
            }
            launchedContext = true;
        }
    }, Σ)();
    function Resize(widthOriginal, heightOriginal, targetWidth, targetHeight, blendAlpha, interpolationPass) {
        var Σ_Resize = new Σ.Scope(this, Σ, Resize, function () {
            return this.capture({
                widthOriginal: widthOriginal,
                heightOriginal: heightOriginal,
                targetWidth: targetWidth,
                targetHeight: targetHeight,
                blendAlpha: blendAlpha,
                interpolationPass: interpolationPass
            }, {});
        });
        this.widthOriginal = Math.abs(parseInt(widthOriginal) || 0);
        this.heightOriginal = Math.abs(parseInt(heightOriginal) || 0);
        this.targetWidth = Math.abs(parseInt(targetWidth) || 0);
        this.targetHeight = Math.abs(parseInt(targetHeight) || 0);
        this.colorChannels = !!blendAlpha ? 4 : 3;
        this.interpolationPass = !!interpolationPass;
        this.targetWidthMultipliedByChannels = this.targetWidth * this.colorChannels;
        this.originalWidthMultipliedByChannels = this.widthOriginal * this.colorChannels;
        this.originalHeightMultipliedByChannels = this.heightOriginal * this.colorChannels;
        this.widthPassResultSize = this.targetWidthMultipliedByChannels * this.heightOriginal;
        this.finalResultSize = this.targetWidthMultipliedByChannels * this.targetHeight;
        this.initialize();
    }
    Resize.prototype.initialize = Σ.addFunction(function αgNaW() {
        if (this.widthOriginal > 0 && this.heightOriginal > 0 && this.targetWidth > 0 && this.targetHeight > 0) {
            if (this.widthOriginal == this.targetWidth) {
                this.resizeWidth = this.bypassResizer;
            } else {
                this.ratioWeightWidthPass = this.widthOriginal / this.targetWidth;
                if (this.ratioWeightWidthPass < 1 && this.interpolationPass) {
                    this.initializeFirstPassBuffers(true);
                    this.resizeWidth = this.colorChannels == 4 ? this.resizeWidthInterpolatedRGBA : this.resizeWidthInterpolatedRGB;
                } else {
                    this.initializeFirstPassBuffers(false);
                    this.resizeWidth = this.colorChannels == 4 ? this.resizeWidthRGBA : this.resizeWidthRGB;
                }
            }
            if (this.heightOriginal == this.targetHeight) {
                this.resizeHeight = this.bypassResizer;
            } else {
                this.ratioWeightHeightPass = this.heightOriginal / this.targetHeight;
                if (this.ratioWeightHeightPass < 1 && this.interpolationPass) {
                    this.initializeSecondPassBuffers(true);
                    this.resizeHeight = this.resizeHeightInterpolated;
                } else {
                    this.initializeSecondPassBuffers(false);
                    this.resizeHeight = this.colorChannels == 4 ? this.resizeHeightRGBA : this.resizeHeightRGB;
                }
            }
        } else {
            throw new Error('Invalid settings specified for the resizer.');
        }
    }, Σ);
    Resize.prototype.resizeWidthRGB = Σ.addFunction(function αTon2(buffer) {
        var Σ_αTon2 = new Σ.Scope(this, Σ, αTon2, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                amountToNext: amountToNext,
                actualPosition: actualPosition,
                currentPosition: currentPosition,
                line: line,
                pixelOffset: pixelOffset,
                outputOffset: outputOffset,
                nextLineOffsetOriginalWidth: nextLineOffsetOriginalWidth,
                nextLineOffsetTargetWidth: nextLineOffsetTargetWidth,
                output: output,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = this.ratioWeightWidthPass;
        var weight = 0;
        var amountToNext = 0;
        var actualPosition = 0;
        var currentPosition = 0;
        var line = 0;
        var pixelOffset = 0;
        var outputOffset = 0;
        var nextLineOffsetOriginalWidth = this.originalWidthMultipliedByChannels - 2;
        var nextLineOffsetTargetWidth = this.targetWidthMultipliedByChannels - 2;
        var output = this.outputWidthWorkBench;
        var outputBuffer = this.widthBuffer;
        do {
            for (line = 0; line < this.originalHeightMultipliedByChannels;) {
                output[line++] = 0;
                output[line++] = 0;
                output[line++] = 0;
            }
            weight = ratioWeight;
            do {
                amountToNext = 1 + actualPosition - currentPosition;
                if (weight >= amountToNext) {
                    for (line = 0, pixelOffset = actualPosition; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetOriginalWidth) {
                        output[line++] += buffer[pixelOffset++] * amountToNext;
                        output[line++] += buffer[pixelOffset++] * amountToNext;
                        output[line++] += buffer[pixelOffset] * amountToNext;
                    }
                    currentPosition = actualPosition = actualPosition + 3;
                    weight -= amountToNext;
                } else {
                    for (line = 0, pixelOffset = actualPosition; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetOriginalWidth) {
                        output[line++] += buffer[pixelOffset++] * weight;
                        output[line++] += buffer[pixelOffset++] * weight;
                        output[line++] += buffer[pixelOffset] * weight;
                    }
                    currentPosition += weight;
                    break;
                }
            } while (weight > 0 && actualPosition < this.originalWidthMultipliedByChannels);
            for (line = 0, pixelOffset = outputOffset; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetTargetWidth) {
                outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
                outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
                outputBuffer[pixelOffset] = output[line++] / ratioWeight;
            }
            outputOffset += 3;
        } while (outputOffset < this.targetWidthMultipliedByChannels);
        return outputBuffer;
    }, Σ);
    Resize.prototype.resizeWidthInterpolatedRGB = Σ.addFunction(function αf3B0(buffer) {
        var Σ_αf3B0 = new Σ.Scope(this, Σ, αf3B0, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                finalOffset: finalOffset,
                pixelOffset: pixelOffset,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = (this.widthOriginal - 1) / this.targetWidth;
        var weight = 0;
        var finalOffset = 0;
        var pixelOffset = 0;
        var outputBuffer = this.widthBuffer;
        for (var targetPosition = 0; targetPosition < this.targetWidthMultipliedByChannels; targetPosition += 3, weight += ratioWeight) {
            secondWeight = weight % 1;
            firstWeight = 1 - secondWeight;
            for (finalOffset = targetPosition, pixelOffset = Math.floor(weight) * 3; finalOffset < this.widthPassResultSize; pixelOffset += this.originalWidthMultipliedByChannels, finalOffset += this.targetWidthMultipliedByChannels) {
                outputBuffer[finalOffset] = buffer[pixelOffset] * firstWeight + buffer[pixelOffset + 3] * secondWeight;
                outputBuffer[finalOffset + 1] = buffer[pixelOffset + 1] * firstWeight + buffer[pixelOffset + 4] * secondWeight;
                outputBuffer[finalOffset + 2] = buffer[pixelOffset + 2] * firstWeight + buffer[pixelOffset + 5] * secondWeight;
            }
        }
        return outputBuffer;
    }, Σ);
    Resize.prototype.resizeWidthRGBA = Σ.addFunction(function αWIFq(buffer) {
        var Σ_αWIFq = new Σ.Scope(this, Σ, αWIFq, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                amountToNext: amountToNext,
                actualPosition: actualPosition,
                currentPosition: currentPosition,
                line: line,
                pixelOffset: pixelOffset,
                outputOffset: outputOffset,
                nextLineOffsetOriginalWidth: nextLineOffsetOriginalWidth,
                nextLineOffsetTargetWidth: nextLineOffsetTargetWidth,
                output: output,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = this.ratioWeightWidthPass;
        var weight = 0;
        var amountToNext = 0;
        var actualPosition = 0;
        var currentPosition = 0;
        var line = 0;
        var pixelOffset = 0;
        var outputOffset = 0;
        var nextLineOffsetOriginalWidth = this.originalWidthMultipliedByChannels - 3;
        var nextLineOffsetTargetWidth = this.targetWidthMultipliedByChannels - 3;
        var output = this.outputWidthWorkBench;
        var outputBuffer = this.widthBuffer;
        do {
            for (line = 0; line < this.originalHeightMultipliedByChannels;) {
                output[line++] = 0;
                output[line++] = 0;
                output[line++] = 0;
                output[line++] = 0;
            }
            weight = ratioWeight;
            do {
                amountToNext = 1 + actualPosition - currentPosition;
                if (weight >= amountToNext) {
                    for (line = 0, pixelOffset = actualPosition; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetOriginalWidth) {
                        output[line++] += buffer[pixelOffset++] * amountToNext;
                        output[line++] += buffer[pixelOffset++] * amountToNext;
                        output[line++] += buffer[pixelOffset++] * amountToNext;
                        output[line++] += buffer[pixelOffset] * amountToNext;
                    }
                    currentPosition = actualPosition = actualPosition + 4;
                    weight -= amountToNext;
                } else {
                    for (line = 0, pixelOffset = actualPosition; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetOriginalWidth) {
                        output[line++] += buffer[pixelOffset++] * weight;
                        output[line++] += buffer[pixelOffset++] * weight;
                        output[line++] += buffer[pixelOffset++] * weight;
                        output[line++] += buffer[pixelOffset] * weight;
                    }
                    currentPosition += weight;
                    break;
                }
            } while (weight > 0 && actualPosition < this.originalWidthMultipliedByChannels);
            for (line = 0, pixelOffset = outputOffset; line < this.originalHeightMultipliedByChannels; pixelOffset += nextLineOffsetTargetWidth) {
                outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
                outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
                outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
                outputBuffer[pixelOffset] = output[line++] / ratioWeight;
            }
            outputOffset += 4;
        } while (outputOffset < this.targetWidthMultipliedByChannels);
        return outputBuffer;
    }, Σ);
    Resize.prototype.resizeWidthInterpolatedRGBA = Σ.addFunction(function αPmle(buffer) {
        var Σ_αPmle = new Σ.Scope(this, Σ, αPmle, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                finalOffset: finalOffset,
                pixelOffset: pixelOffset,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = (this.widthOriginal - 1) / this.targetWidth;
        var weight = 0;
        var finalOffset = 0;
        var pixelOffset = 0;
        var outputBuffer = this.widthBuffer;
        for (var targetPosition = 0; targetPosition < this.targetWidthMultipliedByChannels; targetPosition += 4, weight += ratioWeight) {
            secondWeight = weight % 1;
            firstWeight = 1 - secondWeight;
            for (finalOffset = targetPosition, pixelOffset = Math.floor(weight) * 4; finalOffset < this.widthPassResultSize; pixelOffset += this.originalWidthMultipliedByChannels, finalOffset += this.targetWidthMultipliedByChannels) {
                outputBuffer[finalOffset] = buffer[pixelOffset] * firstWeight + buffer[pixelOffset + 4] * secondWeight;
                outputBuffer[finalOffset + 1] = buffer[pixelOffset + 1] * firstWeight + buffer[pixelOffset + 5] * secondWeight;
                outputBuffer[finalOffset + 2] = buffer[pixelOffset + 2] * firstWeight + buffer[pixelOffset + 6] * secondWeight;
                outputBuffer[finalOffset + 3] = buffer[pixelOffset + 3] * firstWeight + buffer[pixelOffset + 7] * secondWeight;
            }
        }
        return outputBuffer;
    }, Σ);
    Resize.prototype.resizeHeightRGB = Σ.addFunction(function αX0ek(buffer) {
        var Σ_αX0ek = new Σ.Scope(this, Σ, αX0ek, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                amountToNext: amountToNext,
                actualPosition: actualPosition,
                currentPosition: currentPosition,
                pixelOffset: pixelOffset,
                outputOffset: outputOffset,
                output: output,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = this.ratioWeightHeightPass;
        var weight = 0;
        var amountToNext = 0;
        var actualPosition = 0;
        var currentPosition = 0;
        var pixelOffset = 0;
        var outputOffset = 0;
        var output = this.outputHeightWorkBench;
        var outputBuffer = this.heightBuffer;
        do {
            for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
                output[pixelOffset++] = 0;
                output[pixelOffset++] = 0;
                output[pixelOffset++] = 0;
            }
            weight = ratioWeight;
            do {
                amountToNext = 1 + actualPosition - currentPosition;
                if (weight >= amountToNext) {
                    for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
                        output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                        output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                        output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                    }
                    currentPosition = actualPosition;
                    weight -= amountToNext;
                } else {
                    for (pixelOffset = 0, amountToNext = actualPosition; pixelOffset < this.targetWidthMultipliedByChannels;) {
                        output[pixelOffset++] += buffer[amountToNext++] * weight;
                        output[pixelOffset++] += buffer[amountToNext++] * weight;
                        output[pixelOffset++] += buffer[amountToNext++] * weight;
                    }
                    currentPosition += weight;
                    break;
                }
            } while (weight > 0 && actualPosition < this.widthPassResultSize);
            for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
                outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / ratioWeight);
                outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / ratioWeight);
                outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / ratioWeight);
            }
        } while (outputOffset < this.finalResultSize);
        return outputBuffer;
    }, Σ);
    Resize.prototype.resizeHeightInterpolated = Σ.addFunction(function αMWfl(buffer) {
        var Σ_αMWfl = new Σ.Scope(this, Σ, αMWfl, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                finalOffset: finalOffset,
                pixelOffset: pixelOffset,
                pixelOffsetAccumulated: pixelOffsetAccumulated,
                pixelOffsetAccumulated2: pixelOffsetAccumulated2,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = (this.heightOriginal - 1) / this.targetHeight;
        var weight = 0;
        var finalOffset = 0;
        var pixelOffset = 0;
        var pixelOffsetAccumulated = 0;
        var pixelOffsetAccumulated2 = 0;
        var outputBuffer = this.heightBuffer;
        do {
            secondWeight = weight % 1;
            firstWeight = 1 - secondWeight;
            pixelOffsetAccumulated = Math.floor(weight) * this.targetWidthMultipliedByChannels;
            pixelOffsetAccumulated2 = pixelOffsetAccumulated + this.targetWidthMultipliedByChannels;
            for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels; ++pixelOffset) {
                outputBuffer[finalOffset++] = buffer[pixelOffsetAccumulated + pixelOffset] * firstWeight + buffer[pixelOffsetAccumulated2 + pixelOffset] * secondWeight;
            }
            weight += ratioWeight;
        } while (finalOffset < this.finalResultSize);
        return outputBuffer;
    }, Σ);
    Resize.prototype.resizeHeightRGBA = Σ.addFunction(function α95nF(buffer) {
        var Σ_α95nF = new Σ.Scope(this, Σ, α95nF, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                amountToNext: amountToNext,
                actualPosition: actualPosition,
                currentPosition: currentPosition,
                pixelOffset: pixelOffset,
                outputOffset: outputOffset,
                output: output,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = this.ratioWeightHeightPass;
        var weight = 0;
        var amountToNext = 0;
        var actualPosition = 0;
        var currentPosition = 0;
        var pixelOffset = 0;
        var outputOffset = 0;
        var output = this.outputHeightWorkBench;
        var outputBuffer = this.heightBuffer;
        do {
            for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
                output[pixelOffset++] = 0;
                output[pixelOffset++] = 0;
                output[pixelOffset++] = 0;
                output[pixelOffset++] = 0;
            }
            weight = ratioWeight;
            do {
                amountToNext = 1 + actualPosition - currentPosition;
                if (weight >= amountToNext) {
                    for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
                        output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                        output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                        output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                        output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                    }
                    currentPosition = actualPosition;
                    weight -= amountToNext;
                } else {
                    for (pixelOffset = 0, amountToNext = actualPosition; pixelOffset < this.targetWidthMultipliedByChannels;) {
                        output[pixelOffset++] += buffer[amountToNext++] * weight;
                        output[pixelOffset++] += buffer[amountToNext++] * weight;
                        output[pixelOffset++] += buffer[amountToNext++] * weight;
                        output[pixelOffset++] += buffer[amountToNext++] * weight;
                    }
                    currentPosition += weight;
                    break;
                }
            } while (weight > 0 && actualPosition < this.widthPassResultSize);
            for (pixelOffset = 0; pixelOffset < this.targetWidthMultipliedByChannels;) {
                outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / ratioWeight);
                outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / ratioWeight);
                outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / ratioWeight);
                outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / ratioWeight);
            }
        } while (outputOffset < this.finalResultSize);
        return outputBuffer;
    }, Σ);
    Resize.prototype.resizeHeightInterpolatedRGBA = Σ.addFunction(function αP04x(buffer) {
        var Σ_αP04x = new Σ.Scope(this, Σ, αP04x, function () {
            return this.capture({ buffer: buffer }, {
                ratioWeight: ratioWeight,
                weight: weight,
                finalOffset: finalOffset,
                pixelOffset: pixelOffset,
                outputBuffer: outputBuffer
            });
        });
        var ratioWeight = (this.heightOriginal - 1) / this.targetHeight;
        var weight = 0;
        var finalOffset = 0;
        var pixelOffset = 0;
        var outputBuffer = this.heightBuffer;
        while (pixelOffset < this.finalResultSize) {
            secondWeight = weight % 1;
            firstWeight = 1 - secondWeight;
            for (pixelOffset = Math.floor(weight) * 4; pixelOffset < this.targetWidthMultipliedByChannels; pixelOffset += 4) {
                outputBuffer[finalOffset++] = buffer[pixelOffset] * firstWeight + buffer[pixelOffset + 4] * secondWeight;
                outputBuffer[finalOffset++] = buffer[pixelOffset + 1] * firstWeight + buffer[pixelOffset + 5] * secondWeight;
                outputBuffer[finalOffset++] = buffer[pixelOffset + 2] * firstWeight + buffer[pixelOffset + 6] * secondWeight;
                outputBuffer[finalOffset++] = buffer[pixelOffset + 3] * firstWeight + buffer[pixelOffset + 7] * secondWeight;
            }
            weight += ratioWeight;
        }
        return outputBuffer;
    }, Σ);
    Resize.prototype.resize = Σ.addFunction(function αHB6K(buffer) {
        var Σ_αHB6K = new Σ.Scope(this, Σ, αHB6K, function () {
            return this.capture({ buffer: buffer }, {});
        });
        return this.resizeHeight(this.resizeWidth(buffer));
    }, Σ);
    Resize.prototype.bypassResizer = Σ.addFunction(function α4yGF(buffer) {
        var Σ_α4yGF = new Σ.Scope(this, Σ, α4yGF, function () {
            return this.capture({ buffer: buffer }, {});
        });
        return buffer;
    }, Σ);
    Resize.prototype.initializeFirstPassBuffers = Σ.addFunction(function αworO(BILINEARAlgo) {
        var Σ_αworO = new Σ.Scope(this, Σ, αworO, function () {
            return this.capture({ BILINEARAlgo: BILINEARAlgo }, {});
        });
        this.widthBuffer = this.generateFloatBuffer(this.widthPassResultSize);
        if (!BILINEARAlgo) {
            this.outputWidthWorkBench = this.generateFloatBuffer(this.originalHeightMultipliedByChannels);
        }
    }, Σ);
    Resize.prototype.initializeSecondPassBuffers = Σ.addFunction(function α4BfA(BILINEARAlgo) {
        var Σ_α4BfA = new Σ.Scope(this, Σ, α4BfA, function () {
            return this.capture({ BILINEARAlgo: BILINEARAlgo }, {});
        });
        this.heightBuffer = this.generateUint8Buffer(this.finalResultSize);
        if (!BILINEARAlgo) {
            this.outputHeightWorkBench = this.generateFloatBuffer(this.targetWidthMultipliedByChannels);
        }
    }, Σ);
    Resize.prototype.generateFloatBuffer = Σ.addFunction(function αjLSe(bufferLength) {
        var Σ_αjLSe = new Σ.Scope(this, Σ, αjLSe, function () {
            return this.capture({ bufferLength: bufferLength }, {});
        });
        try {
            return new Float32Array(bufferLength);
        } catch (error) {
            return [];
        }
    }, Σ);
    Resize.prototype.generateUint8Buffer = Σ.addFunction(function αv5r4(bufferLength) {
        var Σ_αv5r4 = new Σ.Scope(this, Σ, αv5r4, function () {
            return this.capture({ bufferLength: bufferLength }, {});
        });
        try {
            return this.checkForOperaMathBug(new Uint8Array(bufferLength));
        } catch (error) {
            return [];
        }
    }, Σ);
    Resize.prototype.checkForOperaMathBug = Σ.addFunction(function αHMry(typedArray) {
        var Σ_αHMry = new Σ.Scope(this, Σ, αHMry, function () {
            return this.capture({ typedArray: typedArray }, {});
        });
        typedArray[0] = -1;
        typedArray[0] >>= 0;
        if (typedArray[0] != 255) {
            return [];
        } else {
            return typedArray;
        }
    }, Σ);
}, 'mqtt://localhost', 'gbemu-part1.js', {});
