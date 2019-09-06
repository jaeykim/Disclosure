Code.bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return this.capture({}, {
            gameboy: gameboy,
            gbRunInterval: gbRunInterval,
            settings: settings,
            gameboy_rom: gameboy_rom
        });
    }).hoist(GameBoyCore, Σ).hoist(start, Σ).hoist(run, Σ).hoist(pause, Σ).hoist(clearLastEmulation, Σ).hoist(save, Σ).hoist(saveSRAM, Σ).hoist(saveRTC, Σ).hoist(autoSave, Σ).hoist(openSRAM, Σ).hoist(openRTC, Σ).hoist(openState, Σ).hoist(import_save, Σ).hoist(generateBlob, Σ).hoist(generateMultiBlob, Σ).hoist(decodeBlob, Σ).hoist(matchKey, Σ).hoist(GameBoyEmulatorInitialized, Σ).hoist(GameBoyEmulatorPlaying, Σ).hoist(GameBoyKeyDown, Σ).hoist(GameBoyKeyUp, Σ).hoist(GameBoyGyroSignalHandler, Σ).hoist(initNewCanvas, Σ).hoist(initNewCanvasSize, Σ);
    'use strict';
    function GameBoyCore(canvas, ROMImage) {
        var Σ_GameBoyCore = new Σ.Scope(this, Σ, GameBoyCore, function () {
            return this.capture({
                canvas: canvas,
                ROMImage: ROMImage
            }, { dateVar: dateVar });
        });
        this.canvas = canvas;
        this.drawContext = null;
        this.ROMImage = ROMImage;
        this.registerA = 1;
        this.FZero = true;
        this.FSubtract = false;
        this.FHalfCarry = true;
        this.FCarry = true;
        this.registerB = 0;
        this.registerC = 19;
        this.registerD = 0;
        this.registerE = 216;
        this.registersHL = 333;
        this.stackPointer = 65534;
        this.programCounter = 256;
        this.CPUCyclesTotal = 0;
        this.CPUCyclesTotalBase = 0;
        this.CPUCyclesTotalCurrent = 0;
        this.CPUCyclesTotalRoundoff = 0;
        this.baseCPUCyclesPerIteration = 0;
        this.remainingClocks = 0;
        this.inBootstrap = true;
        this.usedBootROM = false;
        this.usedGBCBootROM = false;
        this.halt = false;
        this.skipPCIncrement = false;
        this.stopEmulator = 3;
        this.IME = true;
        this.IRQLineMatched = 0;
        this.interruptsRequested = 0;
        this.interruptsEnabled = 0;
        this.hdmaRunning = false;
        this.CPUTicks = 0;
        this.doubleSpeedShifter = 0;
        this.JoyPad = 255;
        this.CPUStopped = false;
        this.memoryReader = [];
        this.memoryWriter = [];
        this.memoryHighReader = [];
        this.memoryHighWriter = [];
        this.ROM = [];
        this.memory = [];
        this.MBCRam = [];
        this.VRAM = [];
        this.GBCMemory = [];
        this.MBC1Mode = false;
        this.MBCRAMBanksEnabled = false;
        this.currMBCRAMBank = 0;
        this.currMBCRAMBankPosition = -40960;
        this.cGBC = false;
        this.gbcRamBank = 1;
        this.gbcRamBankPosition = -53248;
        this.gbcRamBankPositionECHO = -61440;
        this.RAMBanks = [
            0,
            1,
            2,
            4,
            16
        ];
        this.ROMBank1offs = 0;
        this.currentROMBank = 0;
        this.cartridgeType = 0;
        this.name = '';
        this.gameCode = '';
        this.fromSaveState = false;
        this.savedStateFileName = '';
        this.STATTracker = 0;
        this.modeSTAT = 0;
        this.spriteCount = 252;
        this.LYCMatchTriggerSTAT = false;
        this.mode2TriggerSTAT = false;
        this.mode1TriggerSTAT = false;
        this.mode0TriggerSTAT = false;
        this.LCDisOn = false;
        this.LINECONTROL = [];
        this.DISPLAYOFFCONTROL = [Σ_GameBoyCore.addFunction(function αDrWz(parentObj) {
                var Σ_GameBoyCore_αDrWz = new Σ.Scope(this, Σ_GameBoyCore, αDrWz, function () {
                    return this.capture({ parentObj: parentObj }, {});
                });
            }, Σ_GameBoyCore)];
        this.LCDCONTROL = null;
        this.initializeLCDController();
        this.RTCisLatched = false;
        this.latchedSeconds = 0;
        this.latchedMinutes = 0;
        this.latchedHours = 0;
        this.latchedLDays = 0;
        this.latchedHDays = 0;
        this.RTCSeconds = 0;
        this.RTCMinutes = 0;
        this.RTCHours = 0;
        this.RTCDays = 0;
        this.RTCDayOverFlow = false;
        this.RTCHALT = false;
        this.highX = 127;
        this.lowX = 127;
        this.highY = 127;
        this.lowY = 127;
        this.audioHandle = null;
        this.numSamplesTotal = 0;
        this.sampleSize = 0;
        this.dutyLookup = [
            [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                true
            ],
            [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                true
            ],
            [
                true,
                false,
                false,
                false,
                false,
                true,
                true,
                true
            ],
            [
                false,
                true,
                true,
                true,
                true,
                true,
                true,
                false
            ]
        ];
        this.currentBuffer = [];
        this.bufferContainAmount = 0;
        this.LSFR15Table = null;
        this.LSFR7Table = null;
        this.noiseSampleTable = null;
        this.initializeAudioStartState();
        this.soundMasterEnabled = false;
        this.channel3PCM = null;
        this.VinLeftChannelMasterVolume = 8;
        this.VinRightChannelMasterVolume = 8;
        this.leftChannel1 = false;
        this.leftChannel2 = false;
        this.leftChannel3 = false;
        this.leftChannel4 = false;
        this.rightChannel1 = false;
        this.rightChannel2 = false;
        this.rightChannel3 = false;
        this.rightChannel4 = false;
        this.channel1currentSampleLeft = 0;
        this.channel1currentSampleRight = 0;
        this.channel2currentSampleLeft = 0;
        this.channel2currentSampleRight = 0;
        this.channel3currentSampleLeft = 0;
        this.channel3currentSampleRight = 0;
        this.channel4currentSampleLeft = 0;
        this.channel4currentSampleRight = 0;
        this.channel1currentSampleLeftSecondary = 0;
        this.channel1currentSampleRightSecondary = 0;
        this.channel2currentSampleLeftSecondary = 0;
        this.channel2currentSampleRightSecondary = 0;
        this.channel3currentSampleLeftSecondary = 0;
        this.channel3currentSampleRightSecondary = 0;
        this.channel4currentSampleLeftSecondary = 0;
        this.channel4currentSampleRightSecondary = 0;
        this.channel1currentSampleLeftTrimary = 0;
        this.channel1currentSampleRightTrimary = 0;
        this.channel2currentSampleLeftTrimary = 0;
        this.channel2currentSampleRightTrimary = 0;
        this.mixerOutputCache = 0;
        this.initializeTiming();
        this.machineOut = 0;
        this.audioTicks = 0;
        this.audioIndex = 0;
        this.rollover = 0;
        this.emulatorTicks = 0;
        this.DIVTicks = 56;
        this.LCDTicks = 60;
        this.timerTicks = 0;
        this.TIMAEnabled = false;
        this.TACClocker = 1024;
        this.serialTimer = 0;
        this.serialShiftTimer = 0;
        this.serialShiftTimerAllocated = 0;
        this.IRQEnableDelay = 0;
        var dateVar = new_Date();
        this.lastIteration = dateVar.getTime();
        dateVar = new_Date();
        this.firstIteration = dateVar.getTime();
        this.iterations = 0;
        this.actualScanLine = 0;
        this.lastUnrenderedLine = 0;
        this.queuedScanLines = 0;
        this.totalLinesPassed = 0;
        this.haltPostClocks = 0;
        this.cMBC1 = false;
        this.cMBC2 = false;
        this.cMBC3 = false;
        this.cMBC5 = false;
        this.cMBC7 = false;
        this.cSRAM = false;
        this.cMMMO1 = false;
        this.cRUMBLE = false;
        this.cCamera = false;
        this.cTAMA5 = false;
        this.cHuC3 = false;
        this.cHuC1 = false;
        this.cTIMER = false;
        this.ROMBanks = [
            2,
            4,
            8,
            16,
            32,
            64,
            128,
            256,
            512
        ];
        this.ROMBanks[82] = 72;
        this.ROMBanks[83] = 80;
        this.ROMBanks[84] = 96;
        this.numRAMBanks = 0;
        this.currVRAMBank = 0;
        this.backgroundX = 0;
        this.backgroundY = 0;
        this.gfxWindowDisplay = false;
        this.gfxSpriteShow = false;
        this.gfxSpriteNormalHeight = true;
        this.bgEnabled = true;
        this.BGPriorityEnabled = true;
        this.gfxWindowCHRBankPosition = 0;
        this.gfxBackgroundCHRBankPosition = 0;
        this.gfxBackgroundBankOffset = 128;
        this.windowY = 0;
        this.windowX = 0;
        this.drewBlank = 0;
        this.drewFrame = false;
        this.midScanlineOffset = -1;
        this.pixelEnd = 0;
        this.currentX = 0;
        this.BGCHRBank1 = null;
        this.BGCHRBank2 = null;
        this.BGCHRCurrentBank = null;
        this.tileCache = null;
        this.colors = [
            15728606,
            11392916,
            5411443,
            1586242
        ];
        this.OBJPalette = null;
        this.BGPalette = null;
        this.gbcOBJRawPalette = null;
        this.gbcBGRawPalette = null;
        this.gbOBJPalette = null;
        this.gbBGPalette = null;
        this.gbcOBJPalette = null;
        this.gbcBGPalette = null;
        this.gbBGColorizedPalette = null;
        this.gbOBJColorizedPalette = null;
        this.cachedBGPaletteConversion = null;
        this.cachedOBJPaletteConversion = null;
        this.updateGBBGPalette = this.updateGBRegularBGPalette;
        this.updateGBOBJPalette = this.updateGBRegularOBJPalette;
        this.colorizedGBPalettes = false;
        this.BGLayerRender = null;
        this.WindowLayerRender = null;
        this.SpriteLayerRender = null;
        this.frameBuffer = [];
        this.swizzledFrame = null;
        this.canvasBuffer = null;
        this.pixelStart = 0;
        this.onscreenWidth = this.offscreenWidth = 160;
        this.onscreenHeight = this.offScreenheight = 144;
        this.offscreenRGBCount = this.onscreenWidth * this.onscreenHeight * 4;
        this.intializeWhiteNoise();
    }
    GameBoyCore.prototype.GBBOOTROM = [];
    GameBoyCore.prototype.GBCBOOTROM = [];
    GameBoyCore.prototype.ffxxDump = [
        15,
        0,
        124,
        255,
        0,
        0,
        0,
        248,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        1,
        128,
        191,
        243,
        255,
        191,
        255,
        63,
        0,
        255,
        191,
        127,
        255,
        159,
        255,
        191,
        255,
        255,
        0,
        0,
        191,
        119,
        243,
        241,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        145,
        128,
        0,
        0,
        0,
        0,
        0,
        252,
        0,
        0,
        0,
        0,
        255,
        126,
        255,
        254,
        255,
        255,
        255,
        255,
        255,
        255,
        62,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        192,
        255,
        193,
        0,
        254,
        255,
        255,
        255,
        248,
        255,
        0,
        0,
        0,
        143,
        0,
        0,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        255,
        206,
        237,
        102,
        102,
        204,
        13,
        0,
        11,
        3,
        115,
        0,
        131,
        0,
        12,
        0,
        13,
        0,
        8,
        17,
        31,
        136,
        137,
        0,
        14,
        220,
        204,
        110,
        230,
        221,
        221,
        217,
        153,
        187,
        187,
        103,
        99,
        110,
        14,
        236,
        204,
        221,
        220,
        153,
        159,
        187,
        185,
        51,
        62,
        69,
        236,
        82,
        250,
        8,
        183,
        7,
        93,
        1,
        253,
        192,
        255,
        8,
        252,
        0,
        229,
        11,
        248,
        194,
        206,
        244,
        249,
        15,
        127,
        69,
        109,
        61,
        254,
        70,
        151,
        51,
        94,
        8,
        239,
        241,
        255,
        134,
        131,
        36,
        116,
        18,
        252,
        0,
        159,
        180,
        183,
        6,
        213,
        208,
        122,
        0,
        158,
        4,
        95,
        65,
        47,
        29,
        119,
        54,
        117,
        129,
        170,
        112,
        58,
        152,
        209,
        113,
        2,
        77,
        1,
        193,
        255,
        13,
        0,
        211,
        5,
        249,
        0,
        11,
        0
    ];
    GameBoyCore.prototype.OPCODE = [
        Σ.addFunction(function αernp(parentObj) {
            var Σ_αernp = new Σ.Scope(this, Σ, αernp, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function α6MRX(parentObj) {
            var Σ_α6MRX = new Σ.Scope(this, Σ, α6MRX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.registerB = parentObj.memoryRead(parentObj.programCounter + 1 & 65535);
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αCgNH(parentObj) {
            var Σ_αCgNH = new Σ.Scope(this, Σ, αCgNH, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWrite(parentObj.registerB << 8 | parentObj.registerC, parentObj.registerA);
        }, Σ),
        Σ.addFunction(function αLaV1(parentObj) {
            var Σ_αLaV1 = new Σ.Scope(this, Σ, αLaV1, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = (parentObj.registerB << 8 | parentObj.registerC) + 1;
            parentObj.registerB = temp_var >> 8 & 255;
            parentObj.registerC = temp_var & 255;
        }, Σ),
        Σ.addFunction(function αtylL(parentObj) {
            var Σ_αtylL = new Σ.Scope(this, Σ, αtylL, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registerB + 1 & 255;
            parentObj.FZero = parentObj.registerB == 0;
            parentObj.FHalfCarry = (parentObj.registerB & 15) == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function α0OIo(parentObj) {
            var Σ_α0OIo = new Σ.Scope(this, Σ, α0OIo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registerB - 1 & 255;
            parentObj.FZero = parentObj.registerB == 0;
            parentObj.FHalfCarry = (parentObj.registerB & 15) == 15;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αe4r3(parentObj) {
            var Σ_αe4r3 = new Σ.Scope(this, Σ, αe4r3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αwS5k(parentObj) {
            var Σ_αwS5k = new Σ.Scope(this, Σ, αwS5k, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerA > 127;
            parentObj.registerA = parentObj.registerA << 1 & 255 | parentObj.registerA >> 7;
            parentObj.FZero = parentObj.FSubtract = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αnukD(parentObj) {
            var Σ_αnukD = new Σ.Scope(this, Σ, αnukD, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            parentObj.memoryWrite(temp_var, parentObj.stackPointer & 255);
            parentObj.memoryWrite(temp_var + 1 & 65535, parentObj.stackPointer >> 8);
        }, Σ),
        Σ.addFunction(function αqeEs(parentObj) {
            var Σ_αqeEs = new Σ.Scope(this, Σ, αqeEs, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registersHL + (parentObj.registerB << 8 | parentObj.registerC);
            parentObj.FHalfCarry = (parentObj.registersHL & 4095) > (dirtySum & 4095);
            parentObj.FCarry = dirtySum > 65535;
            parentObj.registersHL = dirtySum & 65535;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function α9lnz(parentObj) {
            var Σ_α9lnz = new Σ.Scope(this, Σ, α9lnz, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryRead(parentObj.registerB << 8 | parentObj.registerC);
        }, Σ),
        Σ.addFunction(function αjvMB(parentObj) {
            var Σ_αjvMB = new Σ.Scope(this, Σ, αjvMB, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = (parentObj.registerB << 8 | parentObj.registerC) - 1 & 65535;
            parentObj.registerB = temp_var >> 8;
            parentObj.registerC = temp_var & 255;
        }, Σ),
        Σ.addFunction(function αCrA2(parentObj) {
            var Σ_αCrA2 = new Σ.Scope(this, Σ, αCrA2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registerC + 1 & 255;
            parentObj.FZero = parentObj.registerC == 0;
            parentObj.FHalfCarry = (parentObj.registerC & 15) == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αxJyV(parentObj) {
            var Σ_αxJyV = new Σ.Scope(this, Σ, αxJyV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registerC - 1 & 255;
            parentObj.FZero = parentObj.registerC == 0;
            parentObj.FHalfCarry = (parentObj.registerC & 15) == 15;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αVUfW(parentObj) {
            var Σ_αVUfW = new Σ.Scope(this, Σ, αVUfW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αUg1z(parentObj) {
            var Σ_αUg1z = new Σ.Scope(this, Σ, αUg1z, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registerA >> 1 | (parentObj.registerA & 1) << 7;
            parentObj.FCarry = parentObj.registerA > 127;
            parentObj.FZero = parentObj.FSubtract = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αABKu(parentObj) {
            var Σ_αABKu = new Σ.Scope(this, Σ, αABKu, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.cGBC) {
                if ((parentObj.memory[65357] & 1) == 1) {
                    if (parentObj.memory[65357] > 127) {
                        cout('Going into single clock speed mode.', 0);
                        parentObj.doubleSpeedShifter = 0;
                        parentObj.memory[65357] &= 127;
                    } else {
                        cout('Going into double clock speed mode.', 0);
                        parentObj.doubleSpeedShifter = 1;
                        parentObj.memory[65357] |= 128;
                    }
                    parentObj.memory[65357] &= 254;
                } else {
                    parentObj.handleSTOP();
                }
            } else {
                parentObj.handleSTOP();
            }
        }, Σ),
        Σ.addFunction(function αo0Ty(parentObj) {
            var Σ_αo0Ty = new Σ.Scope(this, Σ, αo0Ty, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.registerD = parentObj.memoryRead(parentObj.programCounter + 1 & 65535);
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αY8EA(parentObj) {
            var Σ_αY8EA = new Σ.Scope(this, Σ, αY8EA, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWrite(parentObj.registerD << 8 | parentObj.registerE, parentObj.registerA);
        }, Σ),
        Σ.addFunction(function α6H7H(parentObj) {
            var Σ_α6H7H = new Σ.Scope(this, Σ, α6H7H, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = (parentObj.registerD << 8 | parentObj.registerE) + 1;
            parentObj.registerD = temp_var >> 8 & 255;
            parentObj.registerE = temp_var & 255;
        }, Σ),
        Σ.addFunction(function αqT3Z(parentObj) {
            var Σ_αqT3Z = new Σ.Scope(this, Σ, αqT3Z, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registerD + 1 & 255;
            parentObj.FZero = parentObj.registerD == 0;
            parentObj.FHalfCarry = (parentObj.registerD & 15) == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αsQSp(parentObj) {
            var Σ_αsQSp = new Σ.Scope(this, Σ, αsQSp, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registerD - 1 & 255;
            parentObj.FZero = parentObj.registerD == 0;
            parentObj.FHalfCarry = (parentObj.registerD & 15) == 15;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αRhkN(parentObj) {
            var Σ_αRhkN = new Σ.Scope(this, Σ, αRhkN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αdZW8(parentObj) {
            var Σ_αdZW8 = new Σ.Scope(this, Σ, αdZW8, function () {
                return this.capture({ parentObj: parentObj }, { carry_flag: carry_flag });
            });
            var carry_flag = parentObj.FCarry ? 1 : 0;
            parentObj.FCarry = parentObj.registerA > 127;
            parentObj.registerA = parentObj.registerA << 1 & 255 | carry_flag;
            parentObj.FZero = parentObj.FSubtract = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function α4NkL(parentObj) {
            var Σ_α4NkL = new Σ.Scope(this, Σ, α4NkL, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.programCounter = parentObj.programCounter + (parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 24 >> 24) + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αWkmX(parentObj) {
            var Σ_αWkmX = new Σ.Scope(this, Σ, αWkmX, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registersHL + (parentObj.registerD << 8 | parentObj.registerE);
            parentObj.FHalfCarry = (parentObj.registersHL & 4095) > (dirtySum & 4095);
            parentObj.FCarry = dirtySum > 65535;
            parentObj.registersHL = dirtySum & 65535;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αttmr(parentObj) {
            var Σ_αttmr = new Σ.Scope(this, Σ, αttmr, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryRead(parentObj.registerD << 8 | parentObj.registerE);
        }, Σ),
        Σ.addFunction(function αP9hH(parentObj) {
            var Σ_αP9hH = new Σ.Scope(this, Σ, αP9hH, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = (parentObj.registerD << 8 | parentObj.registerE) - 1 & 65535;
            parentObj.registerD = temp_var >> 8;
            parentObj.registerE = temp_var & 255;
        }, Σ),
        Σ.addFunction(function αM3Ap(parentObj) {
            var Σ_αM3Ap = new Σ.Scope(this, Σ, αM3Ap, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registerE + 1 & 255;
            parentObj.FZero = parentObj.registerE == 0;
            parentObj.FHalfCarry = (parentObj.registerE & 15) == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αUgq9(parentObj) {
            var Σ_αUgq9 = new Σ.Scope(this, Σ, αUgq9, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registerE - 1 & 255;
            parentObj.FZero = parentObj.registerE == 0;
            parentObj.FHalfCarry = (parentObj.registerE & 15) == 15;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function α2GW2(parentObj) {
            var Σ_α2GW2 = new Σ.Scope(this, Σ, α2GW2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αhCqj(parentObj) {
            var Σ_αhCqj = new Σ.Scope(this, Σ, αhCqj, function () {
                return this.capture({ parentObj: parentObj }, { carry_flag: carry_flag });
            });
            var carry_flag = parentObj.FCarry ? 128 : 0;
            parentObj.FCarry = (parentObj.registerA & 1) == 1;
            parentObj.registerA = parentObj.registerA >> 1 | carry_flag;
            parentObj.FZero = parentObj.FSubtract = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αWv5X(parentObj) {
            var Σ_αWv5X = new Σ.Scope(this, Σ, αWv5X, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FZero) {
                parentObj.programCounter = parentObj.programCounter + (parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 24 >> 24) + 1 & 65535;
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αcScm(parentObj) {
            var Σ_αcScm = new Σ.Scope(this, Σ, αcScm, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
        }, Σ),
        Σ.addFunction(function α0NFn(parentObj) {
            var Σ_α0NFn = new Σ.Scope(this, Σ, α0NFn, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registerA);
            parentObj.registersHL = parentObj.registersHL + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αL78m(parentObj) {
            var Σ_αL78m = new Σ.Scope(this, Σ, αL78m, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αTiyk(parentObj) {
            var Σ_αTiyk = new Σ.Scope(this, Σ, αTiyk, function () {
                return this.capture({ parentObj: parentObj }, { H: H });
            });
            var H = (parentObj.registersHL >> 8) + 1 & 255;
            parentObj.FZero = H == 0;
            parentObj.FHalfCarry = (H & 15) == 0;
            parentObj.FSubtract = false;
            parentObj.registersHL = H << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αkjid(parentObj) {
            var Σ_αkjid = new Σ.Scope(this, Σ, αkjid, function () {
                return this.capture({ parentObj: parentObj }, { H: H });
            });
            var H = (parentObj.registersHL >> 8) - 1 & 255;
            parentObj.FZero = H == 0;
            parentObj.FHalfCarry = (H & 15) == 15;
            parentObj.FSubtract = true;
            parentObj.registersHL = H << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αbqlI(parentObj) {
            var Σ_αbqlI = new Σ.Scope(this, Σ, αbqlI, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 8 | parentObj.registersHL & 255;
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αrQOD(parentObj) {
            var Σ_αrQOD = new Σ.Scope(this, Σ, αrQOD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FSubtract) {
                if (parentObj.FCarry || parentObj.registerA > 153) {
                    parentObj.registerA = parentObj.registerA + 96 & 255;
                    parentObj.FCarry = true;
                }
                if (parentObj.FHalfCarry || (parentObj.registerA & 15) > 9) {
                    parentObj.registerA = parentObj.registerA + 6 & 255;
                    parentObj.FHalfCarry = false;
                }
            } else if (parentObj.FCarry && parentObj.FHalfCarry) {
                parentObj.registerA = parentObj.registerA + 154 & 255;
                parentObj.FHalfCarry = false;
            } else if (parentObj.FCarry) {
                parentObj.registerA = parentObj.registerA + 160 & 255;
            } else if (parentObj.FHalfCarry) {
                parentObj.registerA = parentObj.registerA + 250 & 255;
                parentObj.FHalfCarry = false;
            }
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function αjtlS(parentObj) {
            var Σ_αjtlS = new Σ.Scope(this, Σ, αjtlS, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FZero) {
                parentObj.programCounter = parentObj.programCounter + (parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 24 >> 24) + 1 & 65535;
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αnask(parentObj) {
            var Σ_αnask = new Σ.Scope(this, Σ, αnask, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = (parentObj.registersHL & 4095) > 2047;
            parentObj.FCarry = parentObj.registersHL > 32767;
            parentObj.registersHL = parentObj.registersHL << 1 & 65535;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function α8IGm(parentObj) {
            var Σ_α8IGm = new Σ.Scope(this, Σ, α8IGm, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.registersHL = parentObj.registersHL + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αsBUq(parentObj) {
            var Σ_αsBUq = new Σ.Scope(this, Σ, αsBUq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL - 1 & 65535;
        }, Σ),
        Σ.addFunction(function αJpih(parentObj) {
            var Σ_αJpih = new Σ.Scope(this, Σ, αJpih, function () {
                return this.capture({ parentObj: parentObj }, { L: L });
            });
            var L = parentObj.registersHL + 1 & 255;
            parentObj.FZero = L == 0;
            parentObj.FHalfCarry = (L & 15) == 0;
            parentObj.FSubtract = false;
            parentObj.registersHL = parentObj.registersHL & 65280 | L;
        }, Σ),
        Σ.addFunction(function αgKN5(parentObj) {
            var Σ_αgKN5 = new Σ.Scope(this, Σ, αgKN5, function () {
                return this.capture({ parentObj: parentObj }, { L: L });
            });
            var L = parentObj.registersHL - 1 & 255;
            parentObj.FZero = L == 0;
            parentObj.FHalfCarry = (L & 15) == 15;
            parentObj.FSubtract = true;
            parentObj.registersHL = parentObj.registersHL & 65280 | L;
        }, Σ),
        Σ.addFunction(function α4QB1(parentObj) {
            var Σ_α4QB1 = new Σ.Scope(this, Σ, α4QB1, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function α0qTA(parentObj) {
            var Σ_α0qTA = new Σ.Scope(this, Σ, α0qTA, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= 255;
            parentObj.FSubtract = parentObj.FHalfCarry = true;
        }, Σ),
        Σ.addFunction(function α3P7m(parentObj) {
            var Σ_α3P7m = new Σ.Scope(this, Σ, α3P7m, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FCarry) {
                parentObj.programCounter = parentObj.programCounter + (parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 24 >> 24) + 1 & 65535;
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αKt8p(parentObj) {
            var Σ_αKt8p = new Σ.Scope(this, Σ, αKt8p, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αqf9v(parentObj) {
            var Σ_αqf9v = new Σ.Scope(this, Σ, αqf9v, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registerA);
            parentObj.registersHL = parentObj.registersHL - 1 & 65535;
        }, Σ),
        Σ.addFunction(function αajJE(parentObj) {
            var Σ_αajJE = new Σ.Scope(this, Σ, αajJE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αMPzb(parentObj) {
            var Σ_αMPzb = new Σ.Scope(this, Σ, αMPzb, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) + 1 & 255;
            parentObj.FZero = temp_var == 0;
            parentObj.FHalfCarry = (temp_var & 15) == 0;
            parentObj.FSubtract = false;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
        }, Σ),
        Σ.addFunction(function αWiCn(parentObj) {
            var Σ_αWiCn = new Σ.Scope(this, Σ, αWiCn, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) - 1 & 255;
            parentObj.FZero = temp_var == 0;
            parentObj.FHalfCarry = (temp_var & 15) == 15;
            parentObj.FSubtract = true;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
        }, Σ),
        Σ.addFunction(function αWHl9(parentObj) {
            var Σ_αWHl9 = new Σ.Scope(this, Σ, αWHl9, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter));
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αl32k(parentObj) {
            var Σ_αl32k = new Σ.Scope(this, Σ, αl32k, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = true;
            parentObj.FSubtract = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αo6ur(parentObj) {
            var Σ_αo6ur = new Σ.Scope(this, Σ, αo6ur, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FCarry) {
                parentObj.programCounter = parentObj.programCounter + (parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 24 >> 24) + 1 & 65535;
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αNo4i(parentObj) {
            var Σ_αNo4i = new Σ.Scope(this, Σ, αNo4i, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registersHL + parentObj.stackPointer;
            parentObj.FHalfCarry = (parentObj.registersHL & 4095) > (dirtySum & 4095);
            parentObj.FCarry = dirtySum > 65535;
            parentObj.registersHL = dirtySum & 65535;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αr5Xs(parentObj) {
            var Σ_αr5Xs = new Σ.Scope(this, Σ, αr5Xs, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.registersHL = parentObj.registersHL - 1 & 65535;
        }, Σ),
        Σ.addFunction(function αAMPj(parentObj) {
            var Σ_αAMPj = new Σ.Scope(this, Σ, αAMPj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
        }, Σ),
        Σ.addFunction(function αR0VF(parentObj) {
            var Σ_αR0VF = new Σ.Scope(this, Σ, αR0VF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registerA + 1 & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = (parentObj.registerA & 15) == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αUD9k(parentObj) {
            var Σ_αUD9k = new Σ.Scope(this, Σ, αUD9k, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registerA - 1 & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = (parentObj.registerA & 15) == 15;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αbBWP(parentObj) {
            var Σ_αbBWP = new Σ.Scope(this, Σ, αbBWP, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αsv9a(parentObj) {
            var Σ_αsv9a = new Σ.Scope(this, Σ, αsv9a, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = !parentObj.FCarry;
            parentObj.FSubtract = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αvuQG(parentObj) {
            var Σ_αvuQG = new Σ.Scope(this, Σ, αvuQG, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function αspVr(parentObj) {
            var Σ_αspVr = new Σ.Scope(this, Σ, αspVr, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registerC;
        }, Σ),
        Σ.addFunction(function αc2bM(parentObj) {
            var Σ_αc2bM = new Σ.Scope(this, Σ, αc2bM, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registerD;
        }, Σ),
        Σ.addFunction(function αE0UK(parentObj) {
            var Σ_αE0UK = new Σ.Scope(this, Σ, αE0UK, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registerE;
        }, Σ),
        Σ.addFunction(function αlNON(parentObj) {
            var Σ_αlNON = new Σ.Scope(this, Σ, αlNON, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registersHL >> 8;
        }, Σ),
        Σ.addFunction(function α2fg5(parentObj) {
            var Σ_α2fg5 = new Σ.Scope(this, Σ, α2fg5, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αBio8(parentObj) {
            var Σ_αBio8 = new Σ.Scope(this, Σ, αBio8, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
        }, Σ),
        Σ.addFunction(function αw05U(parentObj) {
            var Σ_αw05U = new Σ.Scope(this, Σ, αw05U, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = parentObj.registerA;
        }, Σ),
        Σ.addFunction(function αD0vk(parentObj) {
            var Σ_αD0vk = new Σ.Scope(this, Σ, αD0vk, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registerB;
        }, Σ),
        Σ.addFunction(function αewuW(parentObj) {
            var Σ_αewuW = new Σ.Scope(this, Σ, αewuW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function α7sg5(parentObj) {
            var Σ_α7sg5 = new Σ.Scope(this, Σ, α7sg5, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registerD;
        }, Σ),
        Σ.addFunction(function αT1Mi(parentObj) {
            var Σ_αT1Mi = new Σ.Scope(this, Σ, αT1Mi, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registerE;
        }, Σ),
        Σ.addFunction(function αKWLU(parentObj) {
            var Σ_αKWLU = new Σ.Scope(this, Σ, αKWLU, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registersHL >> 8;
        }, Σ),
        Σ.addFunction(function αgNdN(parentObj) {
            var Σ_αgNdN = new Σ.Scope(this, Σ, αgNdN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αbQsQ(parentObj) {
            var Σ_αbQsQ = new Σ.Scope(this, Σ, αbQsQ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
        }, Σ),
        Σ.addFunction(function αKHCZ(parentObj) {
            var Σ_αKHCZ = new Σ.Scope(this, Σ, αKHCZ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.registerA;
        }, Σ),
        Σ.addFunction(function αExGO(parentObj) {
            var Σ_αExGO = new Σ.Scope(this, Σ, αExGO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registerB;
        }, Σ),
        Σ.addFunction(function αQoGE(parentObj) {
            var Σ_αQoGE = new Σ.Scope(this, Σ, αQoGE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registerC;
        }, Σ),
        Σ.addFunction(function αh6Gi(parentObj) {
            var Σ_αh6Gi = new Σ.Scope(this, Σ, αh6Gi, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function αOEuO(parentObj) {
            var Σ_αOEuO = new Σ.Scope(this, Σ, αOEuO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registerE;
        }, Σ),
        Σ.addFunction(function αoqYb(parentObj) {
            var Σ_αoqYb = new Σ.Scope(this, Σ, αoqYb, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registersHL >> 8;
        }, Σ),
        Σ.addFunction(function α1DTV(parentObj) {
            var Σ_α1DTV = new Σ.Scope(this, Σ, α1DTV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αzIzC(parentObj) {
            var Σ_αzIzC = new Σ.Scope(this, Σ, αzIzC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
        }, Σ),
        Σ.addFunction(function αCaAD(parentObj) {
            var Σ_αCaAD = new Σ.Scope(this, Σ, αCaAD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = parentObj.registerA;
        }, Σ),
        Σ.addFunction(function αsUic(parentObj) {
            var Σ_αsUic = new Σ.Scope(this, Σ, αsUic, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registerB;
        }, Σ),
        Σ.addFunction(function αpCPW(parentObj) {
            var Σ_αpCPW = new Σ.Scope(this, Σ, αpCPW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registerC;
        }, Σ),
        Σ.addFunction(function αPPid(parentObj) {
            var Σ_αPPid = new Σ.Scope(this, Σ, αPPid, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registerD;
        }, Σ),
        Σ.addFunction(function αGfcF(parentObj) {
            var Σ_αGfcF = new Σ.Scope(this, Σ, αGfcF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function αq412(parentObj) {
            var Σ_αq412 = new Σ.Scope(this, Σ, αq412, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registersHL >> 8;
        }, Σ),
        Σ.addFunction(function αTcRA(parentObj) {
            var Σ_αTcRA = new Σ.Scope(this, Σ, αTcRA, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function α1FJH(parentObj) {
            var Σ_α1FJH = new Σ.Scope(this, Σ, α1FJH, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
        }, Σ),
        Σ.addFunction(function αQc7Y(parentObj) {
            var Σ_αQc7Y = new Σ.Scope(this, Σ, αQc7Y, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.registerA;
        }, Σ),
        Σ.addFunction(function αaRUm(parentObj) {
            var Σ_αaRUm = new Σ.Scope(this, Σ, αaRUm, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registerB << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αCzqk(parentObj) {
            var Σ_αCzqk = new Σ.Scope(this, Σ, αCzqk, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registerC << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function α8xSj(parentObj) {
            var Σ_α8xSj = new Σ.Scope(this, Σ, α8xSj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registerD << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αLS4K(parentObj) {
            var Σ_αLS4K = new Σ.Scope(this, Σ, αLS4K, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registerE << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function α0L5k(parentObj) {
            var Σ_α0L5k = new Σ.Scope(this, Σ, α0L5k, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function αL4u9(parentObj) {
            var Σ_αL4u9 = new Σ.Scope(this, Σ, αL4u9, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = (parentObj.registersHL & 255) * 257;
        }, Σ),
        Σ.addFunction(function αPjqX(parentObj) {
            var Σ_αPjqX = new Σ.Scope(this, Σ, αPjqX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αM8bt(parentObj) {
            var Σ_αM8bt = new Σ.Scope(this, Σ, αM8bt, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registerA << 8 | parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αjG9U(parentObj) {
            var Σ_αjG9U = new Σ.Scope(this, Σ, αjG9U, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registerB;
        }, Σ),
        Σ.addFunction(function αIco4(parentObj) {
            var Σ_αIco4 = new Σ.Scope(this, Σ, αIco4, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registerC;
        }, Σ),
        Σ.addFunction(function αbGdC(parentObj) {
            var Σ_αbGdC = new Σ.Scope(this, Σ, αbGdC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registerD;
        }, Σ),
        Σ.addFunction(function αlUeS(parentObj) {
            var Σ_αlUeS = new Σ.Scope(this, Σ, αlUeS, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registerE;
        }, Σ),
        Σ.addFunction(function αd5J2(parentObj) {
            var Σ_αd5J2 = new Σ.Scope(this, Σ, αd5J2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registersHL >> 8;
        }, Σ),
        Σ.addFunction(function αFYES(parentObj) {
            var Σ_αFYES = new Σ.Scope(this, Σ, αFYES, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function αevEO(parentObj) {
            var Σ_αevEO = new Σ.Scope(this, Σ, αevEO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
        }, Σ),
        Σ.addFunction(function α9k8x(parentObj) {
            var Σ_α9k8x = new Σ.Scope(this, Σ, α9k8x, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registerA;
        }, Σ),
        Σ.addFunction(function αKVNj(parentObj) {
            var Σ_αKVNj = new Σ.Scope(this, Σ, αKVNj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registerB);
        }, Σ),
        Σ.addFunction(function αmktm(parentObj) {
            var Σ_αmktm = new Σ.Scope(this, Σ, αmktm, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registerC);
        }, Σ),
        Σ.addFunction(function αNbwR(parentObj) {
            var Σ_αNbwR = new Σ.Scope(this, Σ, αNbwR, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registerD);
        }, Σ),
        Σ.addFunction(function αDPBF(parentObj) {
            var Σ_αDPBF = new Σ.Scope(this, Σ, αDPBF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registerE);
        }, Σ),
        Σ.addFunction(function αOXCM(parentObj) {
            var Σ_αOXCM = new Σ.Scope(this, Σ, αOXCM, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registersHL >> 8);
        }, Σ),
        Σ.addFunction(function αvHYw(parentObj) {
            var Σ_αvHYw = new Σ.Scope(this, Σ, αvHYw, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registersHL & 255);
        }, Σ),
        Σ.addFunction(function α79fC(parentObj) {
            var Σ_α79fC = new Σ.Scope(this, Σ, α79fC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if ((parentObj.interruptsEnabled & parentObj.interruptsRequested & 31) > 0) {
                if (!parentObj.cGBC && !parentObj.usedBootROM) {
                    parentObj.skipPCIncrement = true;
                } else {
                    parentObj.CPUTicks += 4;
                }
            } else {
                parentObj.calculateHALTPeriod();
            }
        }, Σ),
        Σ.addFunction(function α9sAl(parentObj) {
            var Σ_α9sAl = new Σ.Scope(this, Σ, α9sAl, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.registerA);
        }, Σ),
        Σ.addFunction(function αW0l4(parentObj) {
            var Σ_αW0l4 = new Σ.Scope(this, Σ, αW0l4, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registerB;
        }, Σ),
        Σ.addFunction(function αxi0q(parentObj) {
            var Σ_αxi0q = new Σ.Scope(this, Σ, αxi0q, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registerC;
        }, Σ),
        Σ.addFunction(function αZ7Bd(parentObj) {
            var Σ_αZ7Bd = new Σ.Scope(this, Σ, αZ7Bd, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registerD;
        }, Σ),
        Σ.addFunction(function αtn7U(parentObj) {
            var Σ_αtn7U = new Σ.Scope(this, Σ, αtn7U, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registerE;
        }, Σ),
        Σ.addFunction(function αv6To(parentObj) {
            var Σ_αv6To = new Σ.Scope(this, Σ, αv6To, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registersHL >> 8;
        }, Σ),
        Σ.addFunction(function αIlMq(parentObj) {
            var Σ_αIlMq = new Σ.Scope(this, Σ, αIlMq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.registersHL & 255;
        }, Σ),
        Σ.addFunction(function αHzjS(parentObj) {
            var Σ_αHzjS = new Σ.Scope(this, Σ, αHzjS, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
        }, Σ),
        Σ.addFunction(function α1OdT(parentObj) {
            var Σ_α1OdT = new Σ.Scope(this, Σ, α1OdT, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
        }, Σ),
        Σ.addFunction(function αVbtA(parentObj) {
            var Σ_αVbtA = new Σ.Scope(this, Σ, αVbtA, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerB;
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αP8Sx(parentObj) {
            var Σ_αP8Sx = new Σ.Scope(this, Σ, αP8Sx, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerC;
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αT929(parentObj) {
            var Σ_αT929 = new Σ.Scope(this, Σ, αT929, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerD;
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αfOnQ(parentObj) {
            var Σ_αfOnQ = new Σ.Scope(this, Σ, αfOnQ, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerE;
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function α3ZPz(parentObj) {
            var Σ_α3ZPz = new Σ.Scope(this, Σ, α3ZPz, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + (parentObj.registersHL >> 8);
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αEguB(parentObj) {
            var Σ_αEguB = new Σ.Scope(this, Σ, αEguB, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + (parentObj.registersHL & 255);
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αYnUj(parentObj) {
            var Σ_αYnUj = new Σ.Scope(this, Σ, αYnUj, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αFkKR(parentObj) {
            var Σ_αFkKR = new Σ.Scope(this, Σ, αFkKR, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = (parentObj.registerA & 8) == 8;
            parentObj.FCarry = parentObj.registerA > 127;
            parentObj.registerA = parentObj.registerA << 1 & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αgh8O(parentObj) {
            var Σ_αgh8O = new Σ.Scope(this, Σ, αgh8O, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerB + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (parentObj.registerB & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αlgam(parentObj) {
            var Σ_αlgam = new Σ.Scope(this, Σ, αlgam, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerC + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (parentObj.registerC & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αufbI(parentObj) {
            var Σ_αufbI = new Σ.Scope(this, Σ, αufbI, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerD + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (parentObj.registerD & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αxA59(parentObj) {
            var Σ_αxA59 = new Σ.Scope(this, Σ, αxA59, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.registerE + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (parentObj.registerE & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αnf8u(parentObj) {
            var Σ_αnf8u = new Σ.Scope(this, Σ, αnf8u, function () {
                return this.capture({ parentObj: parentObj }, {
                    tempValue: tempValue,
                    dirtySum: dirtySum
                });
            });
            var tempValue = parentObj.registersHL >> 8;
            var dirtySum = parentObj.registerA + tempValue + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (tempValue & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function α84W0(parentObj) {
            var Σ_α84W0 = new Σ.Scope(this, Σ, α84W0, function () {
                return this.capture({ parentObj: parentObj }, {
                    tempValue: tempValue,
                    dirtySum: dirtySum
                });
            });
            var tempValue = parentObj.registersHL & 255;
            var dirtySum = parentObj.registerA + tempValue + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (tempValue & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αfq9l(parentObj) {
            var Σ_αfq9l = new Σ.Scope(this, Σ, αfq9l, function () {
                return this.capture({ parentObj: parentObj }, {
                    tempValue: tempValue,
                    dirtySum: dirtySum
                });
            });
            var tempValue = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            var dirtySum = parentObj.registerA + tempValue + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (tempValue & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function α5f5J(parentObj) {
            var Σ_α5f5J = new Σ.Scope(this, Σ, α5f5J, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA << 1 | (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA << 1 & 30 | (parentObj.FCarry ? 1 : 0)) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αGLMy(parentObj) {
            var Σ_αGLMy = new Σ.Scope(this, Σ, αGLMy, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerB;
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αOrCo(parentObj) {
            var Σ_αOrCo = new Σ.Scope(this, Σ, αOrCo, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerC;
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αoRqO(parentObj) {
            var Σ_αoRqO = new Σ.Scope(this, Σ, αoRqO, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerD;
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αmxw7(parentObj) {
            var Σ_αmxw7 = new Σ.Scope(this, Σ, αmxw7, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerE;
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αavCq(parentObj) {
            var Σ_αavCq = new Σ.Scope(this, Σ, αavCq, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - (parentObj.registersHL >> 8);
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αXS87(parentObj) {
            var Σ_αXS87 = new Σ.Scope(this, Σ, αXS87, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - (parentObj.registersHL & 255);
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αcO5l(parentObj) {
            var Σ_αcO5l = new Σ.Scope(this, Σ, αcO5l, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αt5ij(parentObj) {
            var Σ_αt5ij = new Σ.Scope(this, Σ, αt5ij, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = 0;
            parentObj.FHalfCarry = parentObj.FCarry = false;
            parentObj.FZero = parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function α1nep(parentObj) {
            var Σ_α1nep = new Σ.Scope(this, Σ, α1nep, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerB - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (parentObj.registerB & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αstrv(parentObj) {
            var Σ_αstrv = new Σ.Scope(this, Σ, αstrv, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerC - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (parentObj.registerC & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function α6gHH(parentObj) {
            var Σ_α6gHH = new Σ.Scope(this, Σ, α6gHH, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerD - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (parentObj.registerD & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αp9Gy(parentObj) {
            var Σ_αp9Gy = new Σ.Scope(this, Σ, αp9Gy, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerE - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (parentObj.registerE & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αiaOQ(parentObj) {
            var Σ_αiaOQ = new Σ.Scope(this, Σ, αiaOQ, function () {
                return this.capture({ parentObj: parentObj }, {
                    temp_var: temp_var,
                    dirtySum: dirtySum
                });
            });
            var temp_var = parentObj.registersHL >> 8;
            var dirtySum = parentObj.registerA - temp_var - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (temp_var & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αasIC(parentObj) {
            var Σ_αasIC = new Σ.Scope(this, Σ, αasIC, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - (parentObj.registersHL & 255) - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (parentObj.registersHL & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αxTWn(parentObj) {
            var Σ_αxTWn = new Σ.Scope(this, Σ, αxTWn, function () {
                return this.capture({ parentObj: parentObj }, {
                    temp_var: temp_var,
                    dirtySum: dirtySum
                });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            var dirtySum = parentObj.registerA - temp_var - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (temp_var & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αtKEF(parentObj) {
            var Σ_αtKEF = new Σ.Scope(this, Σ, αtKEF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FCarry) {
                parentObj.FZero = false;
                parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = true;
                parentObj.registerA = 255;
            } else {
                parentObj.FHalfCarry = parentObj.FCarry = false;
                parentObj.FSubtract = parentObj.FZero = true;
                parentObj.registerA = 0;
            }
        }, Σ),
        Σ.addFunction(function αvxdG(parentObj) {
            var Σ_αvxdG = new Σ.Scope(this, Σ, αvxdG, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.registerB;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αVS6t(parentObj) {
            var Σ_αVS6t = new Σ.Scope(this, Σ, αVS6t, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.registerC;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αesce(parentObj) {
            var Σ_αesce = new Σ.Scope(this, Σ, αesce, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.registerD;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function α8JKN(parentObj) {
            var Σ_α8JKN = new Σ.Scope(this, Σ, α8JKN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.registerE;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αtyoC(parentObj) {
            var Σ_αtyoC = new Σ.Scope(this, Σ, αtyoC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.registersHL >> 8;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αANnD(parentObj) {
            var Σ_αANnD = new Σ.Scope(this, Σ, αANnD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.registersHL;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αK0mI(parentObj) {
            var Σ_αK0mI = new Σ.Scope(this, Σ, αK0mI, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αMy8S(parentObj) {
            var Σ_αMy8S = new Σ.Scope(this, Σ, αMy8S, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function α5icD(parentObj) {
            var Σ_α5icD = new Σ.Scope(this, Σ, α5icD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.registerB;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αwT24(parentObj) {
            var Σ_αwT24 = new Σ.Scope(this, Σ, αwT24, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.registerC;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αowy6(parentObj) {
            var Σ_αowy6 = new Σ.Scope(this, Σ, αowy6, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.registerD;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αlvdY(parentObj) {
            var Σ_αlvdY = new Σ.Scope(this, Σ, αlvdY, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.registerE;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αByno(parentObj) {
            var Σ_αByno = new Σ.Scope(this, Σ, αByno, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.registersHL >> 8;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αIKj5(parentObj) {
            var Σ_αIKj5 = new Σ.Scope(this, Σ, αIKj5, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.registersHL & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αJ0bU(parentObj) {
            var Σ_αJ0bU = new Σ.Scope(this, Σ, αJ0bU, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αgKoq(parentObj) {
            var Σ_αgKoq = new Σ.Scope(this, Σ, αgKoq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = 0;
            parentObj.FZero = true;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αZzuv(parentObj) {
            var Σ_αZzuv = new Σ.Scope(this, Σ, αZzuv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.registerB;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αUehv(parentObj) {
            var Σ_αUehv = new Σ.Scope(this, Σ, αUehv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.registerC;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αQSik(parentObj) {
            var Σ_αQSik = new Σ.Scope(this, Σ, αQSik, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.registerD;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αhqeG(parentObj) {
            var Σ_αhqeG = new Σ.Scope(this, Σ, αhqeG, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.registerE;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αjQLW(parentObj) {
            var Σ_αjQLW = new Σ.Scope(this, Σ, αjQLW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.registersHL >> 8;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αBgOj(parentObj) {
            var Σ_αBgOj = new Σ.Scope(this, Σ, αBgOj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.registersHL & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αDaCC(parentObj) {
            var Σ_αDaCC = new Σ.Scope(this, Σ, αDaCC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αe3b9(parentObj) {
            var Σ_αe3b9 = new Σ.Scope(this, Σ, αe3b9, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function αZeF8(parentObj) {
            var Σ_αZeF8 = new Σ.Scope(this, Σ, αZeF8, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerB;
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αz9jD(parentObj) {
            var Σ_αz9jD = new Σ.Scope(this, Σ, αz9jD, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerC;
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function α6OBk(parentObj) {
            var Σ_α6OBk = new Σ.Scope(this, Σ, α6OBk, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerD;
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αUame(parentObj) {
            var Σ_αUame = new Σ.Scope(this, Σ, αUame, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.registerE;
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αRn6s(parentObj) {
            var Σ_αRn6s = new Σ.Scope(this, Σ, αRn6s, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - (parentObj.registersHL >> 8);
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αsCK0(parentObj) {
            var Σ_αsCK0 = new Σ.Scope(this, Σ, αsCK0, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - (parentObj.registersHL & 255);
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αHp2G(parentObj) {
            var Σ_αHp2G = new Σ.Scope(this, Σ, αHp2G, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function α4gjU(parentObj) {
            var Σ_α4gjU = new Σ.Scope(this, Σ, α4gjU, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = parentObj.FCarry = false;
            parentObj.FZero = parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αtU0f(parentObj) {
            var Σ_αtU0f = new Σ.Scope(this, Σ, αtU0f, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FZero) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
                parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
                parentObj.CPUTicks += 12;
            }
        }, Σ),
        Σ.addFunction(function αiIs2(parentObj) {
            var Σ_αiIs2 = new Σ.Scope(this, Σ, αiIs2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
            parentObj.registerB = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535);
            parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αnPVT(parentObj) {
            var Σ_αnPVT = new Σ.Scope(this, Σ, αnPVT, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FZero) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αbSBX(parentObj) {
            var Σ_αbSBX = new Σ.Scope(this, Σ, αbSBX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.programCounter = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
        }, Σ),
        Σ.addFunction(function αntEO(parentObj) {
            var Σ_αntEO = new Σ.Scope(this, Σ, αntEO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FZero) {
                var temp_pc = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
                parentObj.programCounter = temp_pc;
                parentObj.CPUTicks += 12;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αqlgb(parentObj) {
            var Σ_αqlgb = new Σ.Scope(this, Σ, αqlgb, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.registerB);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.registerC);
        }, Σ),
        Σ.addFunction(function αh3WW(parentObj) {
            var Σ_αh3WW = new Σ.Scope(this, Σ, αh3WW, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA + parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.FHalfCarry = (dirtySum & 15) < (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αEYHF(parentObj) {
            var Σ_αEYHF = new Σ.Scope(this, Σ, αEYHF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 0;
        }, Σ),
        Σ.addFunction(function αASkT(parentObj) {
            var Σ_αASkT = new Σ.Scope(this, Σ, αASkT, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FZero) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
                parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
                parentObj.CPUTicks += 12;
            }
        }, Σ),
        Σ.addFunction(function α0iL9(parentObj) {
            var Σ_α0iL9 = new Σ.Scope(this, Σ, α0iL9, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.programCounter = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
            parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αu5QO(parentObj) {
            var Σ_αu5QO = new Σ.Scope(this, Σ, αu5QO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FZero) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αBere(parentObj) {
            var Σ_αBere = new Σ.Scope(this, Σ, αBere, function () {
                return this.capture({ parentObj: parentObj }, { opcode: opcode });
            });
            var opcode = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.CPUTicks += parentObj.SecondaryTICKTable[opcode];
            parentObj.CBOPCODE[opcode](parentObj);
        }, Σ),
        Σ.addFunction(function αK6rm(parentObj) {
            var Σ_αK6rm = new Σ.Scope(this, Σ, αK6rm, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FZero) {
                var temp_pc = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
                parentObj.programCounter = temp_pc;
                parentObj.CPUTicks += 12;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αL4cw(parentObj) {
            var Σ_αL4cw = new Σ.Scope(this, Σ, αL4cw, function () {
                return this.capture({ parentObj: parentObj }, { temp_pc: temp_pc });
            });
            var temp_pc = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = temp_pc;
        }, Σ),
        Σ.addFunction(function αGzOT(parentObj) {
            var Σ_αGzOT = new Σ.Scope(this, Σ, αGzOT, function () {
                return this.capture({ parentObj: parentObj }, {
                    tempValue: tempValue,
                    dirtySum: dirtySum
                });
            });
            var tempValue = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            var dirtySum = parentObj.registerA + tempValue + (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) + (tempValue & 15) + (parentObj.FCarry ? 1 : 0) > 15;
            parentObj.FCarry = dirtySum > 255;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αvkM6(parentObj) {
            var Σ_αvkM6 = new Σ.Scope(this, Σ, αvkM6, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 8;
        }, Σ),
        Σ.addFunction(function αfxxW(parentObj) {
            var Σ_αfxxW = new Σ.Scope(this, Σ, αfxxW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FCarry) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
                parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
                parentObj.CPUTicks += 12;
            }
        }, Σ),
        Σ.addFunction(function αpeyb(parentObj) {
            var Σ_αpeyb = new Σ.Scope(this, Σ, αpeyb, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
            parentObj.registerD = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535);
            parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αrRi4(parentObj) {
            var Σ_αrRi4 = new Σ.Scope(this, Σ, αrRi4, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FCarry) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αwzmw(parentObj) {
            var Σ_αwzmw = new Σ.Scope(this, Σ, αwzmw, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xD3 called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αOQg3(parentObj) {
            var Σ_αOQg3 = new Σ.Scope(this, Σ, αOQg3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (!parentObj.FCarry) {
                var temp_pc = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
                parentObj.programCounter = temp_pc;
                parentObj.CPUTicks += 12;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αderD(parentObj) {
            var Σ_αderD = new Σ.Scope(this, Σ, αderD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.registerD);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.registerE);
        }, Σ),
        Σ.addFunction(function αT7oj(parentObj) {
            var Σ_αT7oj = new Σ.Scope(this, Σ, αT7oj, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.FHalfCarry = (parentObj.registerA & 15) < (dirtySum & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αL09w(parentObj) {
            var Σ_αL09w = new Σ.Scope(this, Σ, αL09w, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 16;
        }, Σ),
        Σ.addFunction(function αB70G(parentObj) {
            var Σ_αB70G = new Σ.Scope(this, Σ, αB70G, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FCarry) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
                parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
                parentObj.CPUTicks += 12;
            }
        }, Σ),
        Σ.addFunction(function αcUF8(parentObj) {
            var Σ_αcUF8 = new Σ.Scope(this, Σ, αcUF8, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.programCounter = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
            parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
            parentObj.IRQEnableDelay = parentObj.IRQEnableDelay == 2 || parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) == 118 ? 1 : 2;
        }, Σ),
        Σ.addFunction(function αsGrK(parentObj) {
            var Σ_αsGrK = new Σ.Scope(this, Σ, αsGrK, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FCarry) {
                parentObj.programCounter = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.CPUTicks += 4;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αPP35(parentObj) {
            var Σ_αPP35 = new Σ.Scope(this, Σ, αPP35, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xDB called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function α57OD(parentObj) {
            var Σ_α57OD = new Σ.Scope(this, Σ, α57OD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            if (parentObj.FCarry) {
                var temp_pc = parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
                parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
                parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
                parentObj.programCounter = temp_pc;
                parentObj.CPUTicks += 12;
            } else {
                parentObj.programCounter = parentObj.programCounter + 2 & 65535;
            }
        }, Σ),
        Σ.addFunction(function αJRWF(parentObj) {
            var Σ_αJRWF = new Σ.Scope(this, Σ, αJRWF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xDD called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αHz6O(parentObj) {
            var Σ_αHz6O = new Σ.Scope(this, Σ, αHz6O, function () {
                return this.capture({ parentObj: parentObj }, {
                    temp_var: temp_var,
                    dirtySum: dirtySum
                });
            });
            var temp_var = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            var dirtySum = parentObj.registerA - temp_var - (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = (parentObj.registerA & 15) - (temp_var & 15) - (parentObj.FCarry ? 1 : 0) < 0;
            parentObj.FCarry = dirtySum < 0;
            parentObj.registerA = dirtySum & 255;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αE5Nn(parentObj) {
            var Σ_αE5Nn = new Σ.Scope(this, Σ, αE5Nn, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 24;
        }, Σ),
        Σ.addFunction(function α6KNv(parentObj) {
            var Σ_α6KNv = new Σ.Scope(this, Σ, α6KNv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryHighWrite(parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter), parentObj.registerA);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αZhHG(parentObj) {
            var Σ_αZhHG = new Σ.Scope(this, Σ, αZhHG, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
            parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αC6kp(parentObj) {
            var Σ_αC6kp = new Σ.Scope(this, Σ, αC6kp, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryHighWriter[parentObj.registerC](parentObj, parentObj.registerC, parentObj.registerA);
        }, Σ),
        Σ.addFunction(function αovw3(parentObj) {
            var Σ_αovw3 = new Σ.Scope(this, Σ, αovw3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xE3 called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αDwZJ(parentObj) {
            var Σ_αDwZJ = new Σ.Scope(this, Σ, αDwZJ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xE4 called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αvqvM(parentObj) {
            var Σ_αvqvM = new Σ.Scope(this, Σ, αvqvM, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.registersHL >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.registersHL & 255);
        }, Σ),
        Σ.addFunction(function αK7M9(parentObj) {
            var Σ_αK7M9 = new Σ.Scope(this, Σ, αK7M9, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function α3oza(parentObj) {
            var Σ_α3oza = new Σ.Scope(this, Σ, α3oza, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 32;
        }, Σ),
        Σ.addFunction(function αNz1a(parentObj) {
            var Σ_αNz1a = new Σ.Scope(this, Σ, αNz1a, function () {
                return this.capture({ parentObj: parentObj }, {
                    temp_value2: temp_value2,
                    temp_value: temp_value
                });
            });
            var temp_value2 = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 24 >> 24;
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            var temp_value = parentObj.stackPointer + temp_value2 & 65535;
            temp_value2 = parentObj.stackPointer ^ temp_value2 ^ temp_value;
            parentObj.stackPointer = temp_value;
            parentObj.FCarry = (temp_value2 & 256) == 256;
            parentObj.FHalfCarry = (temp_value2 & 16) == 16;
            parentObj.FZero = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αVGA2(parentObj) {
            var Σ_αVGA2 = new Σ.Scope(this, Σ, αVGA2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.programCounter = parentObj.registersHL;
        }, Σ),
        Σ.addFunction(function αZF9L(parentObj) {
            var Σ_αZF9L = new Σ.Scope(this, Σ, αZF9L, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWrite(parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter), parentObj.registerA);
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αNfAS(parentObj) {
            var Σ_αNfAS = new Σ.Scope(this, Σ, αNfAS, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xEB called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αxuam(parentObj) {
            var Σ_αxuam = new Σ.Scope(this, Σ, αxuam, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xEC called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αLohy(parentObj) {
            var Σ_αLohy = new Σ.Scope(this, Σ, αLohy, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xED called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αdyaZ(parentObj) {
            var Σ_αdyaZ = new Σ.Scope(this, Σ, αdyaZ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA ^= parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FSubtract = parentObj.FHalfCarry = parentObj.FCarry = false;
        }, Σ),
        Σ.addFunction(function αtgGv(parentObj) {
            var Σ_αtgGv = new Σ.Scope(this, Σ, αtgGv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 40;
        }, Σ),
        Σ.addFunction(function αrMrS(parentObj) {
            var Σ_αrMrS = new Σ.Scope(this, Σ, αrMrS, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryHighRead(parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter));
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
        }, Σ),
        Σ.addFunction(function αUqhn(parentObj) {
            var Σ_αUqhn = new Σ.Scope(this, Σ, αUqhn, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.stackPointer](parentObj, parentObj.stackPointer);
            parentObj.FZero = temp_var > 127;
            parentObj.FSubtract = (temp_var & 64) == 64;
            parentObj.FHalfCarry = (temp_var & 32) == 32;
            parentObj.FCarry = (temp_var & 16) == 16;
            parentObj.registerA = parentObj.memoryRead(parentObj.stackPointer + 1 & 65535);
            parentObj.stackPointer = parentObj.stackPointer + 2 & 65535;
        }, Σ),
        Σ.addFunction(function αqxwl(parentObj) {
            var Σ_αqxwl = new Σ.Scope(this, Σ, αqxwl, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryHighReader[parentObj.registerC](parentObj, parentObj.registerC);
        }, Σ),
        Σ.addFunction(function αKooC(parentObj) {
            var Σ_αKooC = new Σ.Scope(this, Σ, αKooC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.IME = false;
            parentObj.IRQEnableDelay = 0;
        }, Σ),
        Σ.addFunction(function αizmj(parentObj) {
            var Σ_αizmj = new Σ.Scope(this, Σ, αizmj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xF4 called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αdZeq(parentObj) {
            var Σ_αdZeq = new Σ.Scope(this, Σ, αdZeq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.registerA);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, (parentObj.FZero ? 128 : 0) | (parentObj.FSubtract ? 64 : 0) | (parentObj.FHalfCarry ? 32 : 0) | (parentObj.FCarry ? 16 : 0));
        }, Σ),
        Σ.addFunction(function αct3n(parentObj) {
            var Σ_αct3n = new Σ.Scope(this, Σ, αct3n, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.FSubtract = parentObj.FCarry = parentObj.FHalfCarry = false;
        }, Σ),
        Σ.addFunction(function α6aAF(parentObj) {
            var Σ_α6aAF = new Σ.Scope(this, Σ, α6aAF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 48;
        }, Σ),
        Σ.addFunction(function αuKnX(parentObj) {
            var Σ_αuKnX = new Σ.Scope(this, Σ, αuKnX, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) << 24 >> 24;
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.registersHL = parentObj.stackPointer + temp_var & 65535;
            temp_var = parentObj.stackPointer ^ temp_var ^ parentObj.registersHL;
            parentObj.FCarry = (temp_var & 256) == 256;
            parentObj.FHalfCarry = (temp_var & 16) == 16;
            parentObj.FZero = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αArGl(parentObj) {
            var Σ_αArGl = new Σ.Scope(this, Σ, αArGl, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.registersHL;
        }, Σ),
        Σ.addFunction(function αtvfq(parentObj) {
            var Σ_αtvfq = new Σ.Scope(this, Σ, αtvfq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = parentObj.memoryRead(parentObj.memoryRead(parentObj.programCounter + 1 & 65535) << 8 | parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter));
            parentObj.programCounter = parentObj.programCounter + 2 & 65535;
        }, Σ),
        Σ.addFunction(function α8ayB(parentObj) {
            var Σ_α8ayB = new Σ.Scope(this, Σ, α8ayB, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.IRQEnableDelay = parentObj.IRQEnableDelay == 2 || parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter) == 118 ? 1 : 2;
        }, Σ),
        Σ.addFunction(function αIFBn(parentObj) {
            var Σ_αIFBn = new Σ.Scope(this, Σ, αIFBn, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xFC called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function α7NVN(parentObj) {
            var Σ_α7NVN = new Σ.Scope(this, Σ, α7NVN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            cout('Illegal op code 0xFD called, pausing emulation.', 2);
            pause();
        }, Σ),
        Σ.addFunction(function αUqox(parentObj) {
            var Σ_αUqox = new Σ.Scope(this, Σ, αUqox, function () {
                return this.capture({ parentObj: parentObj }, { dirtySum: dirtySum });
            });
            var dirtySum = parentObj.registerA - parentObj.memoryReader[parentObj.programCounter](parentObj, parentObj.programCounter);
            parentObj.programCounter = parentObj.programCounter + 1 & 65535;
            parentObj.FHalfCarry = (dirtySum & 15) > (parentObj.registerA & 15);
            parentObj.FCarry = dirtySum < 0;
            parentObj.FZero = dirtySum == 0;
            parentObj.FSubtract = true;
        }, Σ),
        Σ.addFunction(function αSBa1(parentObj) {
            var Σ_αSBa1 = new Σ.Scope(this, Σ, αSBa1, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter >> 8);
            parentObj.stackPointer = parentObj.stackPointer - 1 & 65535;
            parentObj.memoryWriter[parentObj.stackPointer](parentObj, parentObj.stackPointer, parentObj.programCounter & 255);
            parentObj.programCounter = 56;
        }, Σ)
    ];
    GameBoyCore.prototype.CBOPCODE = [
        Σ.addFunction(function α0FSR(parentObj) {
            var Σ_α0FSR = new Σ.Scope(this, Σ, α0FSR, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerB > 127;
            parentObj.registerB = parentObj.registerB << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerB == 0;
        }, Σ),
        Σ.addFunction(function αIiuz(parentObj) {
            var Σ_αIiuz = new Σ.Scope(this, Σ, αIiuz, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerC > 127;
            parentObj.registerC = parentObj.registerC << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerC == 0;
        }, Σ),
        Σ.addFunction(function αpoj5(parentObj) {
            var Σ_αpoj5 = new Σ.Scope(this, Σ, αpoj5, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerD > 127;
            parentObj.registerD = parentObj.registerD << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerD == 0;
        }, Σ),
        Σ.addFunction(function αSmni(parentObj) {
            var Σ_αSmni = new Σ.Scope(this, Σ, αSmni, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerE > 127;
            parentObj.registerE = parentObj.registerE << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerE == 0;
        }, Σ),
        Σ.addFunction(function αq2VI(parentObj) {
            var Σ_αq2VI = new Σ.Scope(this, Σ, αq2VI, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registersHL > 32767;
            parentObj.registersHL = parentObj.registersHL << 1 & 65024 | (parentObj.FCarry ? 256 : 0) | parentObj.registersHL & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registersHL < 256;
        }, Σ),
        Σ.addFunction(function αM1qQ(parentObj) {
            var Σ_αM1qQ = new Σ.Scope(this, Σ, αM1qQ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 128) == 128;
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registersHL << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
        }, Σ),
        Σ.addFunction(function αYmfS(parentObj) {
            var Σ_αYmfS = new Σ.Scope(this, Σ, αYmfS, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FCarry = temp_var > 127;
            temp_var = temp_var << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = temp_var == 0;
        }, Σ),
        Σ.addFunction(function αihJV(parentObj) {
            var Σ_αihJV = new Σ.Scope(this, Σ, αihJV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerA > 127;
            parentObj.registerA = parentObj.registerA << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function α2jEm(parentObj) {
            var Σ_α2jEm = new Σ.Scope(this, Σ, α2jEm, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerB & 1) == 1;
            parentObj.registerB = (parentObj.FCarry ? 128 : 0) | parentObj.registerB >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerB == 0;
        }, Σ),
        Σ.addFunction(function αzh6g(parentObj) {
            var Σ_αzh6g = new Σ.Scope(this, Σ, αzh6g, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerC & 1) == 1;
            parentObj.registerC = (parentObj.FCarry ? 128 : 0) | parentObj.registerC >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerC == 0;
        }, Σ),
        Σ.addFunction(function αNKzE(parentObj) {
            var Σ_αNKzE = new Σ.Scope(this, Σ, αNKzE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerD & 1) == 1;
            parentObj.registerD = (parentObj.FCarry ? 128 : 0) | parentObj.registerD >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerD == 0;
        }, Σ),
        Σ.addFunction(function αGAgM(parentObj) {
            var Σ_αGAgM = new Σ.Scope(this, Σ, αGAgM, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerE & 1) == 1;
            parentObj.registerE = (parentObj.FCarry ? 128 : 0) | parentObj.registerE >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerE == 0;
        }, Σ),
        Σ.addFunction(function α51RF(parentObj) {
            var Σ_α51RF = new Σ.Scope(this, Σ, α51RF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 256) == 256;
            parentObj.registersHL = (parentObj.FCarry ? 32768 : 0) | parentObj.registersHL >> 1 & 65280 | parentObj.registersHL & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registersHL < 256;
        }, Σ),
        Σ.addFunction(function αQrOv(parentObj) {
            var Σ_αQrOv = new Σ.Scope(this, Σ, αQrOv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 1) == 1;
            parentObj.registersHL = parentObj.registersHL & 65280 | (parentObj.FCarry ? 128 : 0) | (parentObj.registersHL & 255) >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
        }, Σ),
        Σ.addFunction(function α4lKR(parentObj) {
            var Σ_α4lKR = new Σ.Scope(this, Σ, α4lKR, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FCarry = (temp_var & 1) == 1;
            temp_var = (parentObj.FCarry ? 128 : 0) | temp_var >> 1;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = temp_var == 0;
        }, Σ),
        Σ.addFunction(function αauzq(parentObj) {
            var Σ_αauzq = new Σ.Scope(this, Σ, αauzq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerA & 1) == 1;
            parentObj.registerA = (parentObj.FCarry ? 128 : 0) | parentObj.registerA >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function αsREP(parentObj) {
            var Σ_αsREP = new Σ.Scope(this, Σ, αsREP, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = parentObj.registerB > 127;
            parentObj.registerB = parentObj.registerB << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerB == 0;
        }, Σ),
        Σ.addFunction(function αVry7(parentObj) {
            var Σ_αVry7 = new Σ.Scope(this, Σ, αVry7, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = parentObj.registerC > 127;
            parentObj.registerC = parentObj.registerC << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerC == 0;
        }, Σ),
        Σ.addFunction(function αCLQK(parentObj) {
            var Σ_αCLQK = new Σ.Scope(this, Σ, αCLQK, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = parentObj.registerD > 127;
            parentObj.registerD = parentObj.registerD << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerD == 0;
        }, Σ),
        Σ.addFunction(function αInhm(parentObj) {
            var Σ_αInhm = new Σ.Scope(this, Σ, αInhm, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = parentObj.registerE > 127;
            parentObj.registerE = parentObj.registerE << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerE == 0;
        }, Σ),
        Σ.addFunction(function αlJVE(parentObj) {
            var Σ_αlJVE = new Σ.Scope(this, Σ, αlJVE, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = parentObj.registersHL > 32767;
            parentObj.registersHL = parentObj.registersHL << 1 & 65024 | (parentObj.FCarry ? 256 : 0) | parentObj.registersHL & 255;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registersHL < 256;
        }, Σ),
        Σ.addFunction(function αYOeM(parentObj) {
            var Σ_αYOeM = new Σ.Scope(this, Σ, αYOeM, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registersHL & 128) == 128;
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registersHL << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
        }, Σ),
        Σ.addFunction(function αlUwu(parentObj) {
            var Σ_αlUwu = new Σ.Scope(this, Σ, αlUwu, function () {
                return this.capture({ parentObj: parentObj }, {
                    temp_var: temp_var,
                    newFCarry: newFCarry
                });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            var newFCarry = temp_var > 127;
            temp_var = temp_var << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FCarry = newFCarry;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = temp_var == 0;
        }, Σ),
        Σ.addFunction(function αnvfT(parentObj) {
            var Σ_αnvfT = new Σ.Scope(this, Σ, αnvfT, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = parentObj.registerA > 127;
            parentObj.registerA = parentObj.registerA << 1 & 255 | (parentObj.FCarry ? 1 : 0);
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function αA1ll(parentObj) {
            var Σ_αA1ll = new Σ.Scope(this, Σ, αA1ll, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registerB & 1) == 1;
            parentObj.registerB = (parentObj.FCarry ? 128 : 0) | parentObj.registerB >> 1;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerB == 0;
        }, Σ),
        Σ.addFunction(function αSqvV(parentObj) {
            var Σ_αSqvV = new Σ.Scope(this, Σ, αSqvV, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registerC & 1) == 1;
            parentObj.registerC = (parentObj.FCarry ? 128 : 0) | parentObj.registerC >> 1;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerC == 0;
        }, Σ),
        Σ.addFunction(function αf6U0(parentObj) {
            var Σ_αf6U0 = new Σ.Scope(this, Σ, αf6U0, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registerD & 1) == 1;
            parentObj.registerD = (parentObj.FCarry ? 128 : 0) | parentObj.registerD >> 1;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerD == 0;
        }, Σ),
        Σ.addFunction(function αMkJj(parentObj) {
            var Σ_αMkJj = new Σ.Scope(this, Σ, αMkJj, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registerE & 1) == 1;
            parentObj.registerE = (parentObj.FCarry ? 128 : 0) | parentObj.registerE >> 1;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerE == 0;
        }, Σ),
        Σ.addFunction(function αT1oV(parentObj) {
            var Σ_αT1oV = new Σ.Scope(this, Σ, αT1oV, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registersHL & 256) == 256;
            parentObj.registersHL = (parentObj.FCarry ? 32768 : 0) | parentObj.registersHL >> 1 & 65280 | parentObj.registersHL & 255;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registersHL < 256;
        }, Σ),
        Σ.addFunction(function αWwn8(parentObj) {
            var Σ_αWwn8 = new Σ.Scope(this, Σ, αWwn8, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registersHL & 1) == 1;
            parentObj.registersHL = parentObj.registersHL & 65280 | (parentObj.FCarry ? 128 : 0) | (parentObj.registersHL & 255) >> 1;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
        }, Σ),
        Σ.addFunction(function αahOK(parentObj) {
            var Σ_αahOK = new Σ.Scope(this, Σ, αahOK, function () {
                return this.capture({ parentObj: parentObj }, {
                    temp_var: temp_var,
                    newFCarry: newFCarry
                });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            var newFCarry = (temp_var & 1) == 1;
            temp_var = (parentObj.FCarry ? 128 : 0) | temp_var >> 1;
            parentObj.FCarry = newFCarry;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = temp_var == 0;
        }, Σ),
        Σ.addFunction(function αkWqU(parentObj) {
            var Σ_αkWqU = new Σ.Scope(this, Σ, αkWqU, function () {
                return this.capture({ parentObj: parentObj }, { newFCarry: newFCarry });
            });
            var newFCarry = (parentObj.registerA & 1) == 1;
            parentObj.registerA = (parentObj.FCarry ? 128 : 0) | parentObj.registerA >> 1;
            parentObj.FCarry = newFCarry;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function α4Lo7(parentObj) {
            var Σ_α4Lo7 = new Σ.Scope(this, Σ, α4Lo7, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerB > 127;
            parentObj.registerB = parentObj.registerB << 1 & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerB == 0;
        }, Σ),
        Σ.addFunction(function αjKw7(parentObj) {
            var Σ_αjKw7 = new Σ.Scope(this, Σ, αjKw7, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerC > 127;
            parentObj.registerC = parentObj.registerC << 1 & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerC == 0;
        }, Σ),
        Σ.addFunction(function αfrnx(parentObj) {
            var Σ_αfrnx = new Σ.Scope(this, Σ, αfrnx, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerD > 127;
            parentObj.registerD = parentObj.registerD << 1 & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerD == 0;
        }, Σ),
        Σ.addFunction(function α2p3m(parentObj) {
            var Σ_α2p3m = new Σ.Scope(this, Σ, α2p3m, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerE > 127;
            parentObj.registerE = parentObj.registerE << 1 & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerE == 0;
        }, Σ),
        Σ.addFunction(function αCwiX(parentObj) {
            var Σ_αCwiX = new Σ.Scope(this, Σ, αCwiX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registersHL > 32767;
            parentObj.registersHL = parentObj.registersHL << 1 & 65024 | parentObj.registersHL & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registersHL < 256;
        }, Σ),
        Σ.addFunction(function αo6Qe(parentObj) {
            var Σ_αo6Qe = new Σ.Scope(this, Σ, αo6Qe, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 128) == 128;
            parentObj.registersHL = parentObj.registersHL & 65280 | parentObj.registersHL << 1 & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
        }, Σ),
        Σ.addFunction(function αh2FX(parentObj) {
            var Σ_αh2FX = new Σ.Scope(this, Σ, αh2FX, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FCarry = temp_var > 127;
            temp_var = temp_var << 1 & 255;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = temp_var == 0;
        }, Σ),
        Σ.addFunction(function αS4ls(parentObj) {
            var Σ_αS4ls = new Σ.Scope(this, Σ, αS4ls, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = parentObj.registerA > 127;
            parentObj.registerA = parentObj.registerA << 1 & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function α2doV(parentObj) {
            var Σ_α2doV = new Σ.Scope(this, Σ, α2doV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerB & 1) == 1;
            parentObj.registerB = parentObj.registerB & 128 | parentObj.registerB >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerB == 0;
        }, Σ),
        Σ.addFunction(function αXC60(parentObj) {
            var Σ_αXC60 = new Σ.Scope(this, Σ, αXC60, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerC & 1) == 1;
            parentObj.registerC = parentObj.registerC & 128 | parentObj.registerC >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerC == 0;
        }, Σ),
        Σ.addFunction(function αYa93(parentObj) {
            var Σ_αYa93 = new Σ.Scope(this, Σ, αYa93, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerD & 1) == 1;
            parentObj.registerD = parentObj.registerD & 128 | parentObj.registerD >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerD == 0;
        }, Σ),
        Σ.addFunction(function αlFwP(parentObj) {
            var Σ_αlFwP = new Σ.Scope(this, Σ, αlFwP, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerE & 1) == 1;
            parentObj.registerE = parentObj.registerE & 128 | parentObj.registerE >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerE == 0;
        }, Σ),
        Σ.addFunction(function αBwUP(parentObj) {
            var Σ_αBwUP = new Σ.Scope(this, Σ, αBwUP, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 256) == 256;
            parentObj.registersHL = parentObj.registersHL >> 1 & 65280 | parentObj.registersHL & 33023;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registersHL < 256;
        }, Σ),
        Σ.addFunction(function α0Ekj(parentObj) {
            var Σ_α0Ekj = new Σ.Scope(this, Σ, α0Ekj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 1) == 1;
            parentObj.registersHL = parentObj.registersHL & 65408 | (parentObj.registersHL & 255) >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
        }, Σ),
        Σ.addFunction(function α1GyR(parentObj) {
            var Σ_α1GyR = new Σ.Scope(this, Σ, α1GyR, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FCarry = (temp_var & 1) == 1;
            temp_var = temp_var & 128 | temp_var >> 1;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = temp_var == 0;
        }, Σ),
        Σ.addFunction(function αwSLx(parentObj) {
            var Σ_αwSLx = new Σ.Scope(this, Σ, αwSLx, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerA & 1) == 1;
            parentObj.registerA = parentObj.registerA & 128 | parentObj.registerA >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function αZSLP(parentObj) {
            var Σ_αZSLP = new Σ.Scope(this, Σ, αZSLP, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB = (parentObj.registerB & 15) << 4 | parentObj.registerB >> 4;
            parentObj.FZero = parentObj.registerB == 0;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αPZTQ(parentObj) {
            var Σ_αPZTQ = new Σ.Scope(this, Σ, αPZTQ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC = (parentObj.registerC & 15) << 4 | parentObj.registerC >> 4;
            parentObj.FZero = parentObj.registerC == 0;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αrraN(parentObj) {
            var Σ_αrraN = new Σ.Scope(this, Σ, αrraN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD = (parentObj.registerD & 15) << 4 | parentObj.registerD >> 4;
            parentObj.FZero = parentObj.registerD == 0;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αVK3N(parentObj) {
            var Σ_αVK3N = new Σ.Scope(this, Σ, αVK3N, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE = (parentObj.registerE & 15) << 4 | parentObj.registerE >> 4;
            parentObj.FZero = parentObj.registerE == 0;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αAujA(parentObj) {
            var Σ_αAujA = new Σ.Scope(this, Σ, αAujA, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = (parentObj.registersHL & 3840) << 4 | (parentObj.registersHL & 61440) >> 4 | parentObj.registersHL & 255;
            parentObj.FZero = parentObj.registersHL < 256;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αSv6r(parentObj) {
            var Σ_αSv6r = new Σ.Scope(this, Σ, αSv6r, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL = parentObj.registersHL & 65280 | (parentObj.registersHL & 15) << 4 | (parentObj.registersHL & 240) >> 4;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αTeiS(parentObj) {
            var Σ_αTeiS = new Σ.Scope(this, Σ, αTeiS, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            temp_var = (temp_var & 15) << 4 | temp_var >> 4;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var);
            parentObj.FZero = temp_var == 0;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function αsoZF(parentObj) {
            var Σ_αsoZF = new Σ.Scope(this, Σ, αsoZF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA = (parentObj.registerA & 15) << 4 | parentObj.registerA >> 4;
            parentObj.FZero = parentObj.registerA == 0;
            parentObj.FCarry = parentObj.FHalfCarry = parentObj.FSubtract = false;
        }, Σ),
        Σ.addFunction(function α6Q5d(parentObj) {
            var Σ_α6Q5d = new Σ.Scope(this, Σ, α6Q5d, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerB & 1) == 1;
            parentObj.registerB >>= 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerB == 0;
        }, Σ),
        Σ.addFunction(function αToDU(parentObj) {
            var Σ_αToDU = new Σ.Scope(this, Σ, αToDU, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerC & 1) == 1;
            parentObj.registerC >>= 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerC == 0;
        }, Σ),
        Σ.addFunction(function αhg7T(parentObj) {
            var Σ_αhg7T = new Σ.Scope(this, Σ, αhg7T, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerD & 1) == 1;
            parentObj.registerD >>= 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerD == 0;
        }, Σ),
        Σ.addFunction(function αBq7Q(parentObj) {
            var Σ_αBq7Q = new Σ.Scope(this, Σ, αBq7Q, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerE & 1) == 1;
            parentObj.registerE >>= 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerE == 0;
        }, Σ),
        Σ.addFunction(function αluLQ(parentObj) {
            var Σ_αluLQ = new Σ.Scope(this, Σ, αluLQ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 256) == 256;
            parentObj.registersHL = parentObj.registersHL >> 1 & 65280 | parentObj.registersHL & 255;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registersHL < 256;
        }, Σ),
        Σ.addFunction(function αCMaC(parentObj) {
            var Σ_αCMaC = new Σ.Scope(this, Σ, αCMaC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registersHL & 1) == 1;
            parentObj.registersHL = parentObj.registersHL & 65280 | (parentObj.registersHL & 255) >> 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 255) == 0;
        }, Σ),
        Σ.addFunction(function αtXyZ(parentObj) {
            var Σ_αtXyZ = new Σ.Scope(this, Σ, αtXyZ, function () {
                return this.capture({ parentObj: parentObj }, { temp_var: temp_var });
            });
            var temp_var = parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL);
            parentObj.FCarry = (temp_var & 1) == 1;
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, temp_var >> 1);
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = temp_var < 2;
        }, Σ),
        Σ.addFunction(function α4JmE(parentObj) {
            var Σ_α4JmE = new Σ.Scope(this, Σ, α4JmE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FCarry = (parentObj.registerA & 1) == 1;
            parentObj.registerA >>= 1;
            parentObj.FHalfCarry = parentObj.FSubtract = false;
            parentObj.FZero = parentObj.registerA == 0;
        }, Σ),
        Σ.addFunction(function αCnIQ(parentObj) {
            var Σ_αCnIQ = new Σ.Scope(this, Σ, αCnIQ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 1) == 0;
        }, Σ),
        Σ.addFunction(function αU9cV(parentObj) {
            var Σ_αU9cV = new Σ.Scope(this, Σ, αU9cV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 1) == 0;
        }, Σ),
        Σ.addFunction(function αFOsq(parentObj) {
            var Σ_αFOsq = new Σ.Scope(this, Σ, αFOsq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 1) == 0;
        }, Σ),
        Σ.addFunction(function αaJun(parentObj) {
            var Σ_αaJun = new Σ.Scope(this, Σ, αaJun, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 1) == 0;
        }, Σ),
        Σ.addFunction(function α8l8e(parentObj) {
            var Σ_α8l8e = new Σ.Scope(this, Σ, α8l8e, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 256) == 0;
        }, Σ),
        Σ.addFunction(function αXm1D(parentObj) {
            var Σ_αXm1D = new Σ.Scope(this, Σ, αXm1D, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 1) == 0;
        }, Σ),
        Σ.addFunction(function αne0x(parentObj) {
            var Σ_αne0x = new Σ.Scope(this, Σ, αne0x, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 1) == 0;
        }, Σ),
        Σ.addFunction(function αOxAC(parentObj) {
            var Σ_αOxAC = new Σ.Scope(this, Σ, αOxAC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 1) == 0;
        }, Σ),
        Σ.addFunction(function αVJkH(parentObj) {
            var Σ_αVJkH = new Σ.Scope(this, Σ, αVJkH, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 2) == 0;
        }, Σ),
        Σ.addFunction(function αG8Bu(parentObj) {
            var Σ_αG8Bu = new Σ.Scope(this, Σ, αG8Bu, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 2) == 0;
        }, Σ),
        Σ.addFunction(function α6X2v(parentObj) {
            var Σ_α6X2v = new Σ.Scope(this, Σ, α6X2v, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 2) == 0;
        }, Σ),
        Σ.addFunction(function αqWeR(parentObj) {
            var Σ_αqWeR = new Σ.Scope(this, Σ, αqWeR, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 2) == 0;
        }, Σ),
        Σ.addFunction(function αtCmC(parentObj) {
            var Σ_αtCmC = new Σ.Scope(this, Σ, αtCmC, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 512) == 0;
        }, Σ),
        Σ.addFunction(function αdeDW(parentObj) {
            var Σ_αdeDW = new Σ.Scope(this, Σ, αdeDW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 2) == 0;
        }, Σ),
        Σ.addFunction(function αaRSu(parentObj) {
            var Σ_αaRSu = new Σ.Scope(this, Σ, αaRSu, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 2) == 0;
        }, Σ),
        Σ.addFunction(function α64FU(parentObj) {
            var Σ_α64FU = new Σ.Scope(this, Σ, α64FU, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 2) == 0;
        }, Σ),
        Σ.addFunction(function αaGio(parentObj) {
            var Σ_αaGio = new Σ.Scope(this, Σ, αaGio, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 4) == 0;
        }, Σ),
        Σ.addFunction(function αUZZE(parentObj) {
            var Σ_αUZZE = new Σ.Scope(this, Σ, αUZZE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 4) == 0;
        }, Σ),
        Σ.addFunction(function αj3qH(parentObj) {
            var Σ_αj3qH = new Σ.Scope(this, Σ, αj3qH, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 4) == 0;
        }, Σ),
        Σ.addFunction(function αbnT5(parentObj) {
            var Σ_αbnT5 = new Σ.Scope(this, Σ, αbnT5, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 4) == 0;
        }, Σ),
        Σ.addFunction(function α4QPG(parentObj) {
            var Σ_α4QPG = new Σ.Scope(this, Σ, α4QPG, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 1024) == 0;
        }, Σ),
        Σ.addFunction(function αlxQ3(parentObj) {
            var Σ_αlxQ3 = new Σ.Scope(this, Σ, αlxQ3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 4) == 0;
        }, Σ),
        Σ.addFunction(function α4LO9(parentObj) {
            var Σ_α4LO9 = new Σ.Scope(this, Σ, α4LO9, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 4) == 0;
        }, Σ),
        Σ.addFunction(function αdn5M(parentObj) {
            var Σ_αdn5M = new Σ.Scope(this, Σ, αdn5M, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 4) == 0;
        }, Σ),
        Σ.addFunction(function αBnkg(parentObj) {
            var Σ_αBnkg = new Σ.Scope(this, Σ, αBnkg, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 8) == 0;
        }, Σ),
        Σ.addFunction(function αeLeV(parentObj) {
            var Σ_αeLeV = new Σ.Scope(this, Σ, αeLeV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 8) == 0;
        }, Σ),
        Σ.addFunction(function αCiHl(parentObj) {
            var Σ_αCiHl = new Σ.Scope(this, Σ, αCiHl, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 8) == 0;
        }, Σ),
        Σ.addFunction(function αQMv6(parentObj) {
            var Σ_αQMv6 = new Σ.Scope(this, Σ, αQMv6, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 8) == 0;
        }, Σ),
        Σ.addFunction(function αRWeQ(parentObj) {
            var Σ_αRWeQ = new Σ.Scope(this, Σ, αRWeQ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 2048) == 0;
        }, Σ),
        Σ.addFunction(function αwaKK(parentObj) {
            var Σ_αwaKK = new Σ.Scope(this, Σ, αwaKK, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 8) == 0;
        }, Σ),
        Σ.addFunction(function α7KqS(parentObj) {
            var Σ_α7KqS = new Σ.Scope(this, Σ, α7KqS, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 8) == 0;
        }, Σ),
        Σ.addFunction(function αxb7G(parentObj) {
            var Σ_αxb7G = new Σ.Scope(this, Σ, αxb7G, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 8) == 0;
        }, Σ),
        Σ.addFunction(function αRpKi(parentObj) {
            var Σ_αRpKi = new Σ.Scope(this, Σ, αRpKi, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 16) == 0;
        }, Σ),
        Σ.addFunction(function αPqeo(parentObj) {
            var Σ_αPqeo = new Σ.Scope(this, Σ, αPqeo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 16) == 0;
        }, Σ),
        Σ.addFunction(function αJpay(parentObj) {
            var Σ_αJpay = new Σ.Scope(this, Σ, αJpay, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 16) == 0;
        }, Σ),
        Σ.addFunction(function αgaz8(parentObj) {
            var Σ_αgaz8 = new Σ.Scope(this, Σ, αgaz8, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 16) == 0;
        }, Σ),
        Σ.addFunction(function αstAo(parentObj) {
            var Σ_αstAo = new Σ.Scope(this, Σ, αstAo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 4096) == 0;
        }, Σ),
        Σ.addFunction(function α5Tfo(parentObj) {
            var Σ_α5Tfo = new Σ.Scope(this, Σ, α5Tfo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 16) == 0;
        }, Σ),
        Σ.addFunction(function αiwiE(parentObj) {
            var Σ_αiwiE = new Σ.Scope(this, Σ, αiwiE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 16) == 0;
        }, Σ),
        Σ.addFunction(function α5ibt(parentObj) {
            var Σ_α5ibt = new Σ.Scope(this, Σ, α5ibt, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 16) == 0;
        }, Σ),
        Σ.addFunction(function α8RAo(parentObj) {
            var Σ_α8RAo = new Σ.Scope(this, Σ, α8RAo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 32) == 0;
        }, Σ),
        Σ.addFunction(function αuWVX(parentObj) {
            var Σ_αuWVX = new Σ.Scope(this, Σ, αuWVX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 32) == 0;
        }, Σ),
        Σ.addFunction(function α8FyI(parentObj) {
            var Σ_α8FyI = new Σ.Scope(this, Σ, α8FyI, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 32) == 0;
        }, Σ),
        Σ.addFunction(function αdpcX(parentObj) {
            var Σ_αdpcX = new Σ.Scope(this, Σ, αdpcX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 32) == 0;
        }, Σ),
        Σ.addFunction(function αjJPp(parentObj) {
            var Σ_αjJPp = new Σ.Scope(this, Σ, αjJPp, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 8192) == 0;
        }, Σ),
        Σ.addFunction(function αXYZy(parentObj) {
            var Σ_αXYZy = new Σ.Scope(this, Σ, αXYZy, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 32) == 0;
        }, Σ),
        Σ.addFunction(function αg5Mo(parentObj) {
            var Σ_αg5Mo = new Σ.Scope(this, Σ, αg5Mo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 32) == 0;
        }, Σ),
        Σ.addFunction(function αXl0f(parentObj) {
            var Σ_αXl0f = new Σ.Scope(this, Σ, αXl0f, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 32) == 0;
        }, Σ),
        Σ.addFunction(function αNwnr(parentObj) {
            var Σ_αNwnr = new Σ.Scope(this, Σ, αNwnr, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 64) == 0;
        }, Σ),
        Σ.addFunction(function αevmk(parentObj) {
            var Σ_αevmk = new Σ.Scope(this, Σ, αevmk, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 64) == 0;
        }, Σ),
        Σ.addFunction(function αe92B(parentObj) {
            var Σ_αe92B = new Σ.Scope(this, Σ, αe92B, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 64) == 0;
        }, Σ),
        Σ.addFunction(function αek5p(parentObj) {
            var Σ_αek5p = new Σ.Scope(this, Σ, αek5p, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 64) == 0;
        }, Σ),
        Σ.addFunction(function α7Fz3(parentObj) {
            var Σ_α7Fz3 = new Σ.Scope(this, Σ, α7Fz3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 16384) == 0;
        }, Σ),
        Σ.addFunction(function αmHRU(parentObj) {
            var Σ_αmHRU = new Σ.Scope(this, Σ, αmHRU, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 64) == 0;
        }, Σ),
        Σ.addFunction(function αZnn5(parentObj) {
            var Σ_αZnn5 = new Σ.Scope(this, Σ, αZnn5, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 64) == 0;
        }, Σ),
        Σ.addFunction(function αK5LX(parentObj) {
            var Σ_αK5LX = new Σ.Scope(this, Σ, αK5LX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 64) == 0;
        }, Σ),
        Σ.addFunction(function αf4tc(parentObj) {
            var Σ_αf4tc = new Σ.Scope(this, Σ, αf4tc, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerB & 128) == 0;
        }, Σ),
        Σ.addFunction(function αjq1b(parentObj) {
            var Σ_αjq1b = new Σ.Scope(this, Σ, αjq1b, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerC & 128) == 0;
        }, Σ),
        Σ.addFunction(function αopgv(parentObj) {
            var Σ_αopgv = new Σ.Scope(this, Σ, αopgv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerD & 128) == 0;
        }, Σ),
        Σ.addFunction(function αvj3z(parentObj) {
            var Σ_αvj3z = new Σ.Scope(this, Σ, αvj3z, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerE & 128) == 0;
        }, Σ),
        Σ.addFunction(function αlKpt(parentObj) {
            var Σ_αlKpt = new Σ.Scope(this, Σ, αlKpt, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 32768) == 0;
        }, Σ),
        Σ.addFunction(function α2rNE(parentObj) {
            var Σ_α2rNE = new Σ.Scope(this, Σ, α2rNE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registersHL & 128) == 0;
        }, Σ),
        Σ.addFunction(function αFWRX(parentObj) {
            var Σ_αFWRX = new Σ.Scope(this, Σ, αFWRX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 128) == 0;
        }, Σ),
        Σ.addFunction(function αYm50(parentObj) {
            var Σ_αYm50 = new Σ.Scope(this, Σ, αYm50, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.FHalfCarry = true;
            parentObj.FSubtract = false;
            parentObj.FZero = (parentObj.registerA & 128) == 0;
        }, Σ),
        Σ.addFunction(function αi79Y(parentObj) {
            var Σ_αi79Y = new Σ.Scope(this, Σ, αi79Y, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 254;
        }, Σ),
        Σ.addFunction(function αv3Yk(parentObj) {
            var Σ_αv3Yk = new Σ.Scope(this, Σ, αv3Yk, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 254;
        }, Σ),
        Σ.addFunction(function α66J3(parentObj) {
            var Σ_α66J3 = new Σ.Scope(this, Σ, α66J3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 254;
        }, Σ),
        Σ.addFunction(function αqhcb(parentObj) {
            var Σ_αqhcb = new Σ.Scope(this, Σ, αqhcb, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 254;
        }, Σ),
        Σ.addFunction(function αUNfb(parentObj) {
            var Σ_αUNfb = new Σ.Scope(this, Σ, αUNfb, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65279;
        }, Σ),
        Σ.addFunction(function αK35M(parentObj) {
            var Σ_αK35M = new Σ.Scope(this, Σ, αK35M, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65534;
        }, Σ),
        Σ.addFunction(function αB5Ra(parentObj) {
            var Σ_αB5Ra = new Σ.Scope(this, Σ, αB5Ra, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 254);
        }, Σ),
        Σ.addFunction(function αS9WY(parentObj) {
            var Σ_αS9WY = new Σ.Scope(this, Σ, αS9WY, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 254;
        }, Σ),
        Σ.addFunction(function αkDbT(parentObj) {
            var Σ_αkDbT = new Σ.Scope(this, Σ, αkDbT, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 253;
        }, Σ),
        Σ.addFunction(function αGK28(parentObj) {
            var Σ_αGK28 = new Σ.Scope(this, Σ, αGK28, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 253;
        }, Σ),
        Σ.addFunction(function αE9NO(parentObj) {
            var Σ_αE9NO = new Σ.Scope(this, Σ, αE9NO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 253;
        }, Σ),
        Σ.addFunction(function αze2J(parentObj) {
            var Σ_αze2J = new Σ.Scope(this, Σ, αze2J, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 253;
        }, Σ),
        Σ.addFunction(function αT980(parentObj) {
            var Σ_αT980 = new Σ.Scope(this, Σ, αT980, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65023;
        }, Σ),
        Σ.addFunction(function αRW0D(parentObj) {
            var Σ_αRW0D = new Σ.Scope(this, Σ, αRW0D, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65533;
        }, Σ),
        Σ.addFunction(function αeKs6(parentObj) {
            var Σ_αeKs6 = new Σ.Scope(this, Σ, αeKs6, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 253);
        }, Σ),
        Σ.addFunction(function αnW9m(parentObj) {
            var Σ_αnW9m = new Σ.Scope(this, Σ, αnW9m, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 253;
        }, Σ),
        Σ.addFunction(function αMs3w(parentObj) {
            var Σ_αMs3w = new Σ.Scope(this, Σ, αMs3w, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 251;
        }, Σ),
        Σ.addFunction(function α8eLV(parentObj) {
            var Σ_α8eLV = new Σ.Scope(this, Σ, α8eLV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 251;
        }, Σ),
        Σ.addFunction(function αAQw0(parentObj) {
            var Σ_αAQw0 = new Σ.Scope(this, Σ, αAQw0, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 251;
        }, Σ),
        Σ.addFunction(function αJQnL(parentObj) {
            var Σ_αJQnL = new Σ.Scope(this, Σ, αJQnL, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 251;
        }, Σ),
        Σ.addFunction(function αplnv(parentObj) {
            var Σ_αplnv = new Σ.Scope(this, Σ, αplnv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 64511;
        }, Σ),
        Σ.addFunction(function αlkSD(parentObj) {
            var Σ_αlkSD = new Σ.Scope(this, Σ, αlkSD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65531;
        }, Σ),
        Σ.addFunction(function αA39v(parentObj) {
            var Σ_αA39v = new Σ.Scope(this, Σ, αA39v, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 251);
        }, Σ),
        Σ.addFunction(function αWUYW(parentObj) {
            var Σ_αWUYW = new Σ.Scope(this, Σ, αWUYW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 251;
        }, Σ),
        Σ.addFunction(function α8eKb(parentObj) {
            var Σ_α8eKb = new Σ.Scope(this, Σ, α8eKb, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 247;
        }, Σ),
        Σ.addFunction(function αx62O(parentObj) {
            var Σ_αx62O = new Σ.Scope(this, Σ, αx62O, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 247;
        }, Σ),
        Σ.addFunction(function αDZQp(parentObj) {
            var Σ_αDZQp = new Σ.Scope(this, Σ, αDZQp, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 247;
        }, Σ),
        Σ.addFunction(function αioRW(parentObj) {
            var Σ_αioRW = new Σ.Scope(this, Σ, αioRW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 247;
        }, Σ),
        Σ.addFunction(function αWc2D(parentObj) {
            var Σ_αWc2D = new Σ.Scope(this, Σ, αWc2D, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 63487;
        }, Σ),
        Σ.addFunction(function αSTOI(parentObj) {
            var Σ_αSTOI = new Σ.Scope(this, Σ, αSTOI, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65527;
        }, Σ),
        Σ.addFunction(function αP0Xy(parentObj) {
            var Σ_αP0Xy = new Σ.Scope(this, Σ, αP0Xy, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 247);
        }, Σ),
        Σ.addFunction(function αeEMc(parentObj) {
            var Σ_αeEMc = new Σ.Scope(this, Σ, αeEMc, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 247;
        }, Σ),
        Σ.addFunction(function α4dLV(parentObj) {
            var Σ_α4dLV = new Σ.Scope(this, Σ, α4dLV, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 239;
        }, Σ),
        Σ.addFunction(function αrPj0(parentObj) {
            var Σ_αrPj0 = new Σ.Scope(this, Σ, αrPj0, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 239;
        }, Σ),
        Σ.addFunction(function αaFDm(parentObj) {
            var Σ_αaFDm = new Σ.Scope(this, Σ, αaFDm, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 239;
        }, Σ),
        Σ.addFunction(function αyl7g(parentObj) {
            var Σ_αyl7g = new Σ.Scope(this, Σ, αyl7g, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 239;
        }, Σ),
        Σ.addFunction(function αc7Ky(parentObj) {
            var Σ_αc7Ky = new Σ.Scope(this, Σ, αc7Ky, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 61439;
        }, Σ),
        Σ.addFunction(function αXCnD(parentObj) {
            var Σ_αXCnD = new Σ.Scope(this, Σ, αXCnD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65519;
        }, Σ),
        Σ.addFunction(function αmvx2(parentObj) {
            var Σ_αmvx2 = new Σ.Scope(this, Σ, αmvx2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 239);
        }, Σ),
        Σ.addFunction(function α9XhJ(parentObj) {
            var Σ_α9XhJ = new Σ.Scope(this, Σ, α9XhJ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 239;
        }, Σ),
        Σ.addFunction(function αtntM(parentObj) {
            var Σ_αtntM = new Σ.Scope(this, Σ, αtntM, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 223;
        }, Σ),
        Σ.addFunction(function αw4zy(parentObj) {
            var Σ_αw4zy = new Σ.Scope(this, Σ, αw4zy, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 223;
        }, Σ),
        Σ.addFunction(function αvK86(parentObj) {
            var Σ_αvK86 = new Σ.Scope(this, Σ, αvK86, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 223;
        }, Σ),
        Σ.addFunction(function α9kCy(parentObj) {
            var Σ_α9kCy = new Σ.Scope(this, Σ, α9kCy, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 223;
        }, Σ),
        Σ.addFunction(function αfEbw(parentObj) {
            var Σ_αfEbw = new Σ.Scope(this, Σ, αfEbw, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 57343;
        }, Σ),
        Σ.addFunction(function αscYB(parentObj) {
            var Σ_αscYB = new Σ.Scope(this, Σ, αscYB, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65503;
        }, Σ),
        Σ.addFunction(function αQCMY(parentObj) {
            var Σ_αQCMY = new Σ.Scope(this, Σ, αQCMY, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 223);
        }, Σ),
        Σ.addFunction(function αVz8G(parentObj) {
            var Σ_αVz8G = new Σ.Scope(this, Σ, αVz8G, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 223;
        }, Σ),
        Σ.addFunction(function αk5n3(parentObj) {
            var Σ_αk5n3 = new Σ.Scope(this, Σ, αk5n3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 191;
        }, Σ),
        Σ.addFunction(function αgET2(parentObj) {
            var Σ_αgET2 = new Σ.Scope(this, Σ, αgET2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 191;
        }, Σ),
        Σ.addFunction(function α1Xsr(parentObj) {
            var Σ_α1Xsr = new Σ.Scope(this, Σ, α1Xsr, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 191;
        }, Σ),
        Σ.addFunction(function αiGAO(parentObj) {
            var Σ_αiGAO = new Σ.Scope(this, Σ, αiGAO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 191;
        }, Σ),
        Σ.addFunction(function αgjRf(parentObj) {
            var Σ_αgjRf = new Σ.Scope(this, Σ, αgjRf, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 49151;
        }, Σ),
        Σ.addFunction(function αa4GA(parentObj) {
            var Σ_αa4GA = new Σ.Scope(this, Σ, αa4GA, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65471;
        }, Σ),
        Σ.addFunction(function αMEFq(parentObj) {
            var Σ_αMEFq = new Σ.Scope(this, Σ, αMEFq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 191);
        }, Σ),
        Σ.addFunction(function α4yW2(parentObj) {
            var Σ_α4yW2 = new Σ.Scope(this, Σ, α4yW2, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 191;
        }, Σ),
        Σ.addFunction(function αm4DB(parentObj) {
            var Σ_αm4DB = new Σ.Scope(this, Σ, αm4DB, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB &= 127;
        }, Σ),
        Σ.addFunction(function αLkfN(parentObj) {
            var Σ_αLkfN = new Σ.Scope(this, Σ, αLkfN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC &= 127;
        }, Σ),
        Σ.addFunction(function αwhJ8(parentObj) {
            var Σ_αwhJ8 = new Σ.Scope(this, Σ, αwhJ8, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD &= 127;
        }, Σ),
        Σ.addFunction(function αcXP1(parentObj) {
            var Σ_αcXP1 = new Σ.Scope(this, Σ, αcXP1, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE &= 127;
        }, Σ),
        Σ.addFunction(function αTonP(parentObj) {
            var Σ_αTonP = new Σ.Scope(this, Σ, αTonP, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 32767;
        }, Σ),
        Σ.addFunction(function α0rDq(parentObj) {
            var Σ_α0rDq = new Σ.Scope(this, Σ, α0rDq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL &= 65407;
        }, Σ),
        Σ.addFunction(function αjEMx(parentObj) {
            var Σ_αjEMx = new Σ.Scope(this, Σ, αjEMx, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) & 127);
        }, Σ),
        Σ.addFunction(function αqHBe(parentObj) {
            var Σ_αqHBe = new Σ.Scope(this, Σ, αqHBe, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA &= 127;
        }, Σ),
        Σ.addFunction(function αCGEi(parentObj) {
            var Σ_αCGEi = new Σ.Scope(this, Σ, αCGEi, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 1;
        }, Σ),
        Σ.addFunction(function αICRk(parentObj) {
            var Σ_αICRk = new Σ.Scope(this, Σ, αICRk, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 1;
        }, Σ),
        Σ.addFunction(function αzbuw(parentObj) {
            var Σ_αzbuw = new Σ.Scope(this, Σ, αzbuw, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 1;
        }, Σ),
        Σ.addFunction(function αYlxj(parentObj) {
            var Σ_αYlxj = new Σ.Scope(this, Σ, αYlxj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 1;
        }, Σ),
        Σ.addFunction(function αHPMF(parentObj) {
            var Σ_αHPMF = new Σ.Scope(this, Σ, αHPMF, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 256;
        }, Σ),
        Σ.addFunction(function α6oQK(parentObj) {
            var Σ_α6oQK = new Σ.Scope(this, Σ, α6oQK, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 1;
        }, Σ),
        Σ.addFunction(function αHMxS(parentObj) {
            var Σ_αHMxS = new Σ.Scope(this, Σ, αHMxS, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 1);
        }, Σ),
        Σ.addFunction(function αGoxT(parentObj) {
            var Σ_αGoxT = new Σ.Scope(this, Σ, αGoxT, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 1;
        }, Σ),
        Σ.addFunction(function αVnNo(parentObj) {
            var Σ_αVnNo = new Σ.Scope(this, Σ, αVnNo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 2;
        }, Σ),
        Σ.addFunction(function αKXIX(parentObj) {
            var Σ_αKXIX = new Σ.Scope(this, Σ, αKXIX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 2;
        }, Σ),
        Σ.addFunction(function αGaYW(parentObj) {
            var Σ_αGaYW = new Σ.Scope(this, Σ, αGaYW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 2;
        }, Σ),
        Σ.addFunction(function αPN9s(parentObj) {
            var Σ_αPN9s = new Σ.Scope(this, Σ, αPN9s, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 2;
        }, Σ),
        Σ.addFunction(function αsGgW(parentObj) {
            var Σ_αsGgW = new Σ.Scope(this, Σ, αsGgW, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 512;
        }, Σ),
        Σ.addFunction(function α0SJQ(parentObj) {
            var Σ_α0SJQ = new Σ.Scope(this, Σ, α0SJQ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 2;
        }, Σ),
        Σ.addFunction(function αOlVd(parentObj) {
            var Σ_αOlVd = new Σ.Scope(this, Σ, αOlVd, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 2);
        }, Σ),
        Σ.addFunction(function αIriy(parentObj) {
            var Σ_αIriy = new Σ.Scope(this, Σ, αIriy, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 2;
        }, Σ),
        Σ.addFunction(function αXVB3(parentObj) {
            var Σ_αXVB3 = new Σ.Scope(this, Σ, αXVB3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 4;
        }, Σ),
        Σ.addFunction(function αvEXZ(parentObj) {
            var Σ_αvEXZ = new Σ.Scope(this, Σ, αvEXZ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 4;
        }, Σ),
        Σ.addFunction(function αxNO6(parentObj) {
            var Σ_αxNO6 = new Σ.Scope(this, Σ, αxNO6, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 4;
        }, Σ),
        Σ.addFunction(function αawCf(parentObj) {
            var Σ_αawCf = new Σ.Scope(this, Σ, αawCf, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 4;
        }, Σ),
        Σ.addFunction(function αJsdN(parentObj) {
            var Σ_αJsdN = new Σ.Scope(this, Σ, αJsdN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 1024;
        }, Σ),
        Σ.addFunction(function αSRzM(parentObj) {
            var Σ_αSRzM = new Σ.Scope(this, Σ, αSRzM, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 4;
        }, Σ),
        Σ.addFunction(function αILpB(parentObj) {
            var Σ_αILpB = new Σ.Scope(this, Σ, αILpB, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 4);
        }, Σ),
        Σ.addFunction(function αk3BZ(parentObj) {
            var Σ_αk3BZ = new Σ.Scope(this, Σ, αk3BZ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 4;
        }, Σ),
        Σ.addFunction(function αxTtG(parentObj) {
            var Σ_αxTtG = new Σ.Scope(this, Σ, αxTtG, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 8;
        }, Σ),
        Σ.addFunction(function α7tBZ(parentObj) {
            var Σ_α7tBZ = new Σ.Scope(this, Σ, α7tBZ, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 8;
        }, Σ),
        Σ.addFunction(function αwQcX(parentObj) {
            var Σ_αwQcX = new Σ.Scope(this, Σ, αwQcX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 8;
        }, Σ),
        Σ.addFunction(function αvfmr(parentObj) {
            var Σ_αvfmr = new Σ.Scope(this, Σ, αvfmr, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 8;
        }, Σ),
        Σ.addFunction(function α5os7(parentObj) {
            var Σ_α5os7 = new Σ.Scope(this, Σ, α5os7, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 2048;
        }, Σ),
        Σ.addFunction(function α8j46(parentObj) {
            var Σ_α8j46 = new Σ.Scope(this, Σ, α8j46, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 8;
        }, Σ),
        Σ.addFunction(function αCh1W(parentObj) {
            var Σ_αCh1W = new Σ.Scope(this, Σ, αCh1W, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 8);
        }, Σ),
        Σ.addFunction(function αaT4J(parentObj) {
            var Σ_αaT4J = new Σ.Scope(this, Σ, αaT4J, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 8;
        }, Σ),
        Σ.addFunction(function α4aWO(parentObj) {
            var Σ_α4aWO = new Σ.Scope(this, Σ, α4aWO, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 16;
        }, Σ),
        Σ.addFunction(function αQ8Ca(parentObj) {
            var Σ_αQ8Ca = new Σ.Scope(this, Σ, αQ8Ca, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 16;
        }, Σ),
        Σ.addFunction(function αdXnX(parentObj) {
            var Σ_αdXnX = new Σ.Scope(this, Σ, αdXnX, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 16;
        }, Σ),
        Σ.addFunction(function αO71i(parentObj) {
            var Σ_αO71i = new Σ.Scope(this, Σ, αO71i, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 16;
        }, Σ),
        Σ.addFunction(function αz6ww(parentObj) {
            var Σ_αz6ww = new Σ.Scope(this, Σ, αz6ww, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 4096;
        }, Σ),
        Σ.addFunction(function αODQR(parentObj) {
            var Σ_αODQR = new Σ.Scope(this, Σ, αODQR, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 16;
        }, Σ),
        Σ.addFunction(function αnTsx(parentObj) {
            var Σ_αnTsx = new Σ.Scope(this, Σ, αnTsx, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 16);
        }, Σ),
        Σ.addFunction(function α1pxE(parentObj) {
            var Σ_α1pxE = new Σ.Scope(this, Σ, α1pxE, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 16;
        }, Σ),
        Σ.addFunction(function αLlCj(parentObj) {
            var Σ_αLlCj = new Σ.Scope(this, Σ, αLlCj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 32;
        }, Σ),
        Σ.addFunction(function αneLo(parentObj) {
            var Σ_αneLo = new Σ.Scope(this, Σ, αneLo, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 32;
        }, Σ),
        Σ.addFunction(function αj5hg(parentObj) {
            var Σ_αj5hg = new Σ.Scope(this, Σ, αj5hg, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 32;
        }, Σ),
        Σ.addFunction(function αIY71(parentObj) {
            var Σ_αIY71 = new Σ.Scope(this, Σ, αIY71, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 32;
        }, Σ),
        Σ.addFunction(function αgDm8(parentObj) {
            var Σ_αgDm8 = new Σ.Scope(this, Σ, αgDm8, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 8192;
        }, Σ),
        Σ.addFunction(function αTmJ4(parentObj) {
            var Σ_αTmJ4 = new Σ.Scope(this, Σ, αTmJ4, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 32;
        }, Σ),
        Σ.addFunction(function α5iIr(parentObj) {
            var Σ_α5iIr = new Σ.Scope(this, Σ, α5iIr, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 32);
        }, Σ),
        Σ.addFunction(function αtT6A(parentObj) {
            var Σ_αtT6A = new Σ.Scope(this, Σ, αtT6A, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 32;
        }, Σ),
        Σ.addFunction(function α8VrA(parentObj) {
            var Σ_α8VrA = new Σ.Scope(this, Σ, α8VrA, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 64;
        }, Σ),
        Σ.addFunction(function αXz6C(parentObj) {
            var Σ_αXz6C = new Σ.Scope(this, Σ, αXz6C, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 64;
        }, Σ),
        Σ.addFunction(function αPWXq(parentObj) {
            var Σ_αPWXq = new Σ.Scope(this, Σ, αPWXq, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 64;
        }, Σ),
        Σ.addFunction(function αaPSU(parentObj) {
            var Σ_αaPSU = new Σ.Scope(this, Σ, αaPSU, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 64;
        }, Σ),
        Σ.addFunction(function αBQTg(parentObj) {
            var Σ_αBQTg = new Σ.Scope(this, Σ, αBQTg, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 16384;
        }, Σ),
        Σ.addFunction(function αxGCT(parentObj) {
            var Σ_αxGCT = new Σ.Scope(this, Σ, αxGCT, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 64;
        }, Σ),
        Σ.addFunction(function αzQgj(parentObj) {
            var Σ_αzQgj = new Σ.Scope(this, Σ, αzQgj, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 64);
        }, Σ),
        Σ.addFunction(function αg0Fx(parentObj) {
            var Σ_αg0Fx = new Σ.Scope(this, Σ, αg0Fx, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 64;
        }, Σ),
        Σ.addFunction(function αIHOu(parentObj) {
            var Σ_αIHOu = new Σ.Scope(this, Σ, αIHOu, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerB |= 128;
        }, Σ),
        Σ.addFunction(function αtsrD(parentObj) {
            var Σ_αtsrD = new Σ.Scope(this, Σ, αtsrD, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerC |= 128;
        }, Σ),
        Σ.addFunction(function αTKJw(parentObj) {
            var Σ_αTKJw = new Σ.Scope(this, Σ, αTKJw, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerD |= 128;
        }, Σ),
        Σ.addFunction(function αmPfv(parentObj) {
            var Σ_αmPfv = new Σ.Scope(this, Σ, αmPfv, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerE |= 128;
        }, Σ),
        Σ.addFunction(function α1tJG(parentObj) {
            var Σ_α1tJG = new Σ.Scope(this, Σ, α1tJG, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 32768;
        }, Σ),
        Σ.addFunction(function αor3Y(parentObj) {
            var Σ_αor3Y = new Σ.Scope(this, Σ, αor3Y, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registersHL |= 128;
        }, Σ),
        Σ.addFunction(function αGXtN(parentObj) {
            var Σ_αGXtN = new Σ.Scope(this, Σ, αGXtN, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.memoryWriter[parentObj.registersHL](parentObj, parentObj.registersHL, parentObj.memoryReader[parentObj.registersHL](parentObj, parentObj.registersHL) | 128);
        }, Σ),
        Σ.addFunction(function αySh3(parentObj) {
            var Σ_αySh3 = new Σ.Scope(this, Σ, αySh3, function () {
                return this.capture({ parentObj: parentObj }, {});
            });
            parentObj.registerA |= 128;
        }, Σ)
    ];
    GameBoyCore.prototype.TICKTable = [
        4,
        12,
        8,
        8,
        4,
        4,
        8,
        4,
        20,
        8,
        8,
        8,
        4,
        4,
        8,
        4,
        4,
        12,
        8,
        8,
        4,
        4,
        8,
        4,
        12,
        8,
        8,
        8,
        4,
        4,
        8,
        4,
        8,
        12,
        8,
        8,
        4,
        4,
        8,
        4,
        8,
        8,
        8,
        8,
        4,
        4,
        8,
        4,
        8,
        12,
        8,
        8,
        12,
        12,
        12,
        4,
        8,
        8,
        8,
        8,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        8,
        8,
        8,
        8,
        8,
        8,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        4,
        8,
        12,
        12,
        16,
        12,
        16,
        8,
        16,
        8,
        16,
        12,
        0,
        12,
        24,
        8,
        16,
        8,
        12,
        12,
        4,
        12,
        16,
        8,
        16,
        8,
        16,
        12,
        4,
        12,
        4,
        8,
        16,
        12,
        12,
        8,
        4,
        4,
        16,
        8,
        16,
        16,
        4,
        16,
        4,
        4,
        4,
        8,
        16,
        12,
        12,
        8,
        4,
        4,
        16,
        8,
        16,
        12,
        8,
        16,
        4,
        0,
        4,
        8,
        16
    ];
    GameBoyCore.prototype.SecondaryTICKTable = [
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        12,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        8
    ];
    GameBoyCore.prototype.saveSRAMState = Σ.addFunction(function αaV8g() {
        if (!this.cBATT || this.MBCRam.length == 0) {
            return [];
        } else {
            return this.fromTypedArray(this.MBCRam);
        }
    }, Σ);
    GameBoyCore.prototype.saveRTCState = Σ.addFunction(function αmfo6() {
        if (!this.cTIMER) {
            return [];
        } else {
            return [
                this.lastIteration,
                this.RTCisLatched,
                this.latchedSeconds,
                this.latchedMinutes,
                this.latchedHours,
                this.latchedLDays,
                this.latchedHDays,
                this.RTCSeconds,
                this.RTCMinutes,
                this.RTCHours,
                this.RTCDays,
                this.RTCDayOverFlow,
                this.RTCHALT
            ];
        }
    }, Σ);
    GameBoyCore.prototype.saveState = Σ.addFunction(function αJVTi() {
        return [
            this.fromTypedArray(this.ROM),
            this.inBootstrap,
            this.registerA,
            this.FZero,
            this.FSubtract,
            this.FHalfCarry,
            this.FCarry,
            this.registerB,
            this.registerC,
            this.registerD,
            this.registerE,
            this.registersHL,
            this.stackPointer,
            this.programCounter,
            this.halt,
            this.IME,
            this.hdmaRunning,
            this.CPUTicks,
            this.doubleSpeedShifter,
            this.fromTypedArray(this.memory),
            this.fromTypedArray(this.MBCRam),
            this.fromTypedArray(this.VRAM),
            this.currVRAMBank,
            this.fromTypedArray(this.GBCMemory),
            this.MBC1Mode,
            this.MBCRAMBanksEnabled,
            this.currMBCRAMBank,
            this.currMBCRAMBankPosition,
            this.cGBC,
            this.gbcRamBank,
            this.gbcRamBankPosition,
            this.ROMBank1offs,
            this.currentROMBank,
            this.cartridgeType,
            this.name,
            this.gameCode,
            this.modeSTAT,
            this.LYCMatchTriggerSTAT,
            this.mode2TriggerSTAT,
            this.mode1TriggerSTAT,
            this.mode0TriggerSTAT,
            this.LCDisOn,
            this.gfxWindowCHRBankPosition,
            this.gfxWindowDisplay,
            this.gfxSpriteShow,
            this.gfxSpriteNormalHeight,
            this.gfxBackgroundCHRBankPosition,
            this.gfxBackgroundBankOffset,
            this.TIMAEnabled,
            this.DIVTicks,
            this.LCDTicks,
            this.timerTicks,
            this.TACClocker,
            this.serialTimer,
            this.serialShiftTimer,
            this.serialShiftTimerAllocated,
            this.IRQEnableDelay,
            this.lastIteration,
            this.cMBC1,
            this.cMBC2,
            this.cMBC3,
            this.cMBC5,
            this.cMBC7,
            this.cSRAM,
            this.cMMMO1,
            this.cRUMBLE,
            this.cCamera,
            this.cTAMA5,
            this.cHuC3,
            this.cHuC1,
            this.drewBlank,
            this.fromTypedArray(this.frameBuffer),
            this.bgEnabled,
            this.BGPriorityEnabled,
            this.channel1FrequencyTracker,
            this.channel1FrequencyCounter,
            this.channel1totalLength,
            this.channel1envelopeVolume,
            this.channel1envelopeType,
            this.channel1envelopeSweeps,
            this.channel1envelopeSweepsLast,
            this.channel1consecutive,
            this.channel1frequency,
            this.channel1SweepFault,
            this.channel1ShadowFrequency,
            this.channel1timeSweep,
            this.channel1lastTimeSweep,
            this.channel1numSweep,
            this.channel1frequencySweepDivider,
            this.channel1decreaseSweep,
            this.channel2FrequencyTracker,
            this.channel2FrequencyCounter,
            this.channel2totalLength,
            this.channel2envelopeVolume,
            this.channel2envelopeType,
            this.channel2envelopeSweeps,
            this.channel2envelopeSweepsLast,
            this.channel2consecutive,
            this.channel2frequency,
            this.channel3canPlay,
            this.channel3totalLength,
            this.channel3patternType,
            this.channel3frequency,
            this.channel3consecutive,
            this.fromTypedArray(this.channel3PCM),
            this.channel4FrequencyPeriod,
            this.channel4lastSampleLookup,
            this.channel4totalLength,
            this.channel4envelopeVolume,
            this.channel4currentVolume,
            this.channel4envelopeType,
            this.channel4envelopeSweeps,
            this.channel4envelopeSweepsLast,
            this.channel4consecutive,
            this.channel4BitRange,
            this.soundMasterEnabled,
            this.VinLeftChannelMasterVolume,
            this.VinRightChannelMasterVolume,
            this.leftChannel1,
            this.leftChannel2,
            this.leftChannel3,
            this.leftChannel4,
            this.rightChannel1,
            this.rightChannel2,
            this.rightChannel3,
            this.rightChannel4,
            this.channel1currentSampleLeft,
            this.channel1currentSampleRight,
            this.channel2currentSampleLeft,
            this.channel2currentSampleRight,
            this.channel3currentSampleLeft,
            this.channel3currentSampleRight,
            this.channel4currentSampleLeft,
            this.channel4currentSampleRight,
            this.channel1currentSampleLeftSecondary,
            this.channel1currentSampleRightSecondary,
            this.channel2currentSampleLeftSecondary,
            this.channel2currentSampleRightSecondary,
            this.channel3currentSampleLeftSecondary,
            this.channel3currentSampleRightSecondary,
            this.channel4currentSampleLeftSecondary,
            this.channel4currentSampleRightSecondary,
            this.channel1currentSampleLeftTrimary,
            this.channel1currentSampleRightTrimary,
            this.channel2currentSampleLeftTrimary,
            this.channel2currentSampleRightTrimary,
            this.mixerOutputCache,
            this.channel1DutyTracker,
            this.channel1CachedDuty,
            this.channel2DutyTracker,
            this.channel2CachedDuty,
            this.channel1Enabled,
            this.channel2Enabled,
            this.channel3Enabled,
            this.channel4Enabled,
            this.sequencerClocks,
            this.sequencePosition,
            this.channel3Counter,
            this.channel4Counter,
            this.cachedChannel3Sample,
            this.cachedChannel4Sample,
            this.channel3FrequencyPeriod,
            this.channel3lastSampleLookup,
            this.actualScanLine,
            this.lastUnrenderedLine,
            this.queuedScanLines,
            this.RTCisLatched,
            this.latchedSeconds,
            this.latchedMinutes,
            this.latchedHours,
            this.latchedLDays,
            this.latchedHDays,
            this.RTCSeconds,
            this.RTCMinutes,
            this.RTCHours,
            this.RTCDays,
            this.RTCDayOverFlow,
            this.RTCHALT,
            this.usedBootROM,
            this.skipPCIncrement,
            this.STATTracker,
            this.gbcRamBankPositionECHO,
            this.numRAMBanks,
            this.windowY,
            this.windowX,
            this.fromTypedArray(this.gbcOBJRawPalette),
            this.fromTypedArray(this.gbcBGRawPalette),
            this.fromTypedArray(this.gbOBJPalette),
            this.fromTypedArray(this.gbBGPalette),
            this.fromTypedArray(this.gbcOBJPalette),
            this.fromTypedArray(this.gbcBGPalette),
            this.fromTypedArray(this.gbBGColorizedPalette),
            this.fromTypedArray(this.gbOBJColorizedPalette),
            this.fromTypedArray(this.cachedBGPaletteConversion),
            this.fromTypedArray(this.cachedOBJPaletteConversion),
            this.fromTypedArray(this.BGCHRBank1),
            this.fromTypedArray(this.BGCHRBank2),
            this.haltPostClocks,
            this.interruptsRequested,
            this.interruptsEnabled,
            this.remainingClocks,
            this.colorizedGBPalettes,
            this.backgroundY,
            this.backgroundX,
            this.CPUStopped
        ];
    }, Σ);
    GameBoyCore.prototype.returnFromState = Σ.addFunction(function αDOyH(returnedFrom) {
        var Σ_αDOyH = new Σ.Scope(this, Σ, αDOyH, function () {
            return this.capture({ returnedFrom: returnedFrom }, {
                index: index,
                state: state
            });
        });
        var index = 0;
        var state = returnedFrom.slice(0);
        this.ROM = this.toTypedArray(state[index++], 'uint8');
        this.ROMBankEdge = Math.floor(this.ROM.length / 16384);
        this.inBootstrap = state[index++];
        this.registerA = state[index++];
        this.FZero = state[index++];
        this.FSubtract = state[index++];
        this.FHalfCarry = state[index++];
        this.FCarry = state[index++];
        this.registerB = state[index++];
        this.registerC = state[index++];
        this.registerD = state[index++];
        this.registerE = state[index++];
        this.registersHL = state[index++];
        this.stackPointer = state[index++];
        this.programCounter = state[index++];
        this.halt = state[index++];
        this.IME = state[index++];
        this.hdmaRunning = state[index++];
        this.CPUTicks = state[index++];
        this.doubleSpeedShifter = state[index++];
        this.memory = this.toTypedArray(state[index++], 'uint8');
        this.MBCRam = this.toTypedArray(state[index++], 'uint8');
        this.VRAM = this.toTypedArray(state[index++], 'uint8');
        this.currVRAMBank = state[index++];
        this.GBCMemory = this.toTypedArray(state[index++], 'uint8');
        this.MBC1Mode = state[index++];
        this.MBCRAMBanksEnabled = state[index++];
        this.currMBCRAMBank = state[index++];
        this.currMBCRAMBankPosition = state[index++];
        this.cGBC = state[index++];
        this.gbcRamBank = state[index++];
        this.gbcRamBankPosition = state[index++];
        this.ROMBank1offs = state[index++];
        this.currentROMBank = state[index++];
        this.cartridgeType = state[index++];
        this.name = state[index++];
        this.gameCode = state[index++];
        this.modeSTAT = state[index++];
        this.LYCMatchTriggerSTAT = state[index++];
        this.mode2TriggerSTAT = state[index++];
        this.mode1TriggerSTAT = state[index++];
        this.mode0TriggerSTAT = state[index++];
        this.LCDisOn = state[index++];
        this.gfxWindowCHRBankPosition = state[index++];
        this.gfxWindowDisplay = state[index++];
        this.gfxSpriteShow = state[index++];
        this.gfxSpriteNormalHeight = state[index++];
        this.gfxBackgroundCHRBankPosition = state[index++];
        this.gfxBackgroundBankOffset = state[index++];
        this.TIMAEnabled = state[index++];
        this.DIVTicks = state[index++];
        this.LCDTicks = state[index++];
        this.timerTicks = state[index++];
        this.TACClocker = state[index++];
        this.serialTimer = state[index++];
        this.serialShiftTimer = state[index++];
        this.serialShiftTimerAllocated = state[index++];
        this.IRQEnableDelay = state[index++];
        this.lastIteration = state[index++];
        this.cMBC1 = state[index++];
        this.cMBC2 = state[index++];
        this.cMBC3 = state[index++];
        this.cMBC5 = state[index++];
        this.cMBC7 = state[index++];
        this.cSRAM = state[index++];
        this.cMMMO1 = state[index++];
        this.cRUMBLE = state[index++];
        this.cCamera = state[index++];
        this.cTAMA5 = state[index++];
        this.cHuC3 = state[index++];
        this.cHuC1 = state[index++];
        this.drewBlank = state[index++];
        this.frameBuffer = this.toTypedArray(state[index++], 'int32');
        this.bgEnabled = state[index++];
        this.BGPriorityEnabled = state[index++];
        this.channel1FrequencyTracker = state[index++];
        this.channel1FrequencyCounter = state[index++];
        this.channel1totalLength = state[index++];
        this.channel1envelopeVolume = state[index++];
        this.channel1envelopeType = state[index++];
        this.channel1envelopeSweeps = state[index++];
        this.channel1envelopeSweepsLast = state[index++];
        this.channel1consecutive = state[index++];
        this.channel1frequency = state[index++];
        this.channel1SweepFault = state[index++];
        this.channel1ShadowFrequency = state[index++];
        this.channel1timeSweep = state[index++];
        this.channel1lastTimeSweep = state[index++];
        this.channel1numSweep = state[index++];
        this.channel1frequencySweepDivider = state[index++];
        this.channel1decreaseSweep = state[index++];
        this.channel2FrequencyTracker = state[index++];
        this.channel2FrequencyCounter = state[index++];
        this.channel2totalLength = state[index++];
        this.channel2envelopeVolume = state[index++];
        this.channel2envelopeType = state[index++];
        this.channel2envelopeSweeps = state[index++];
        this.channel2envelopeSweepsLast = state[index++];
        this.channel2consecutive = state[index++];
        this.channel2frequency = state[index++];
        this.channel3canPlay = state[index++];
        this.channel3totalLength = state[index++];
        this.channel3patternType = state[index++];
        this.channel3frequency = state[index++];
        this.channel3consecutive = state[index++];
        this.channel3PCM = this.toTypedArray(state[index++], 'int8');
        this.channel4FrequencyPeriod = state[index++];
        this.channel4lastSampleLookup = state[index++];
        this.channel4totalLength = state[index++];
        this.channel4envelopeVolume = state[index++];
        this.channel4currentVolume = state[index++];
        this.channel4envelopeType = state[index++];
        this.channel4envelopeSweeps = state[index++];
        this.channel4envelopeSweepsLast = state[index++];
        this.channel4consecutive = state[index++];
        this.channel4BitRange = state[index++];
        this.soundMasterEnabled = state[index++];
        this.VinLeftChannelMasterVolume = state[index++];
        this.VinRightChannelMasterVolume = state[index++];
        this.leftChannel1 = state[index++];
        this.leftChannel2 = state[index++];
        this.leftChannel3 = state[index++];
        this.leftChannel4 = state[index++];
        this.rightChannel1 = state[index++];
        this.rightChannel2 = state[index++];
        this.rightChannel3 = state[index++];
        this.rightChannel4 = state[index++];
        this.channel1currentSampleLeft = state[index++];
        this.channel1currentSampleRight = state[index++];
        this.channel2currentSampleLeft = state[index++];
        this.channel2currentSampleRight = state[index++];
        this.channel3currentSampleLeft = state[index++];
        this.channel3currentSampleRight = state[index++];
        this.channel4currentSampleLeft = state[index++];
        this.channel4currentSampleRight = state[index++];
        this.channel1currentSampleLeftSecondary = state[index++];
        this.channel1currentSampleRightSecondary = state[index++];
        this.channel2currentSampleLeftSecondary = state[index++];
        this.channel2currentSampleRightSecondary = state[index++];
        this.channel3currentSampleLeftSecondary = state[index++];
        this.channel3currentSampleRightSecondary = state[index++];
        this.channel4currentSampleLeftSecondary = state[index++];
        this.channel4currentSampleRightSecondary = state[index++];
        this.channel1currentSampleLeftTrimary = state[index++];
        this.channel1currentSampleRightTrimary = state[index++];
        this.channel2currentSampleLeftTrimary = state[index++];
        this.channel2currentSampleRightTrimary = state[index++];
        this.mixerOutputCache = state[index++];
        this.channel1DutyTracker = state[index++];
        this.channel1CachedDuty = state[index++];
        this.channel2DutyTracker = state[index++];
        this.channel2CachedDuty = state[index++];
        this.channel1Enabled = state[index++];
        this.channel2Enabled = state[index++];
        this.channel3Enabled = state[index++];
        this.channel4Enabled = state[index++];
        this.sequencerClocks = state[index++];
        this.sequencePosition = state[index++];
        this.channel3Counter = state[index++];
        this.channel4Counter = state[index++];
        this.cachedChannel3Sample = state[index++];
        this.cachedChannel4Sample = state[index++];
        this.channel3FrequencyPeriod = state[index++];
        this.channel3lastSampleLookup = state[index++];
        this.actualScanLine = state[index++];
        this.lastUnrenderedLine = state[index++];
        this.queuedScanLines = state[index++];
        this.RTCisLatched = state[index++];
        this.latchedSeconds = state[index++];
        this.latchedMinutes = state[index++];
        this.latchedHours = state[index++];
        this.latchedLDays = state[index++];
        this.latchedHDays = state[index++];
        this.RTCSeconds = state[index++];
        this.RTCMinutes = state[index++];
        this.RTCHours = state[index++];
        this.RTCDays = state[index++];
        this.RTCDayOverFlow = state[index++];
        this.RTCHALT = state[index++];
        this.usedBootROM = state[index++];
        this.skipPCIncrement = state[index++];
        this.STATTracker = state[index++];
        this.gbcRamBankPositionECHO = state[index++];
        this.numRAMBanks = state[index++];
        this.windowY = state[index++];
        this.windowX = state[index++];
        this.gbcOBJRawPalette = this.toTypedArray(state[index++], 'uint8');
        this.gbcBGRawPalette = this.toTypedArray(state[index++], 'uint8');
        this.gbOBJPalette = this.toTypedArray(state[index++], 'int32');
        this.gbBGPalette = this.toTypedArray(state[index++], 'int32');
        this.gbcOBJPalette = this.toTypedArray(state[index++], 'int32');
        this.gbcBGPalette = this.toTypedArray(state[index++], 'int32');
        this.gbBGColorizedPalette = this.toTypedArray(state[index++], 'int32');
        this.gbOBJColorizedPalette = this.toTypedArray(state[index++], 'int32');
        this.cachedBGPaletteConversion = this.toTypedArray(state[index++], 'int32');
        this.cachedOBJPaletteConversion = this.toTypedArray(state[index++], 'int32');
        this.BGCHRBank1 = this.toTypedArray(state[index++], 'uint8');
        this.BGCHRBank2 = this.toTypedArray(state[index++], 'uint8');
        this.haltPostClocks = state[index++];
        this.interruptsRequested = state[index++];
        this.interruptsEnabled = state[index++];
        this.checkIRQMatching();
        this.remainingClocks = state[index++];
        this.colorizedGBPalettes = state[index++];
        this.backgroundY = state[index++];
        this.backgroundX = state[index++];
        this.CPUStopped = state[index];
        this.fromSaveState = true;
        this.TICKTable = this.toTypedArray(this.TICKTable, 'uint8');
        this.SecondaryTICKTable = this.toTypedArray(this.SecondaryTICKTable, 'uint8');
        this.initializeReferencesFromSaveState();
        this.memoryReadJumpCompile();
        this.memoryWriteJumpCompile();
        this.initLCD();
        this.initSound();
        this.noiseSampleTable = this.channel4BitRange == 32767 ? this.LSFR15Table : this.LSFR7Table;
        this.channel4VolumeShifter = this.channel4BitRange == 32767 ? 15 : 7;
    }, Σ);
    GameBoyCore.prototype.returnFromRTCState = Σ.addFunction(function αuoTl() {
        var Σ_αuoTl = new Σ.Scope(this, Σ, αuoTl, function () {
            return this.capture({}, {});
        });
        if (typeof this.openRTC == 'function' && this.cTIMER) {
            var rtcData = this.openRTC(this.name);
            var index = 0;
            this.lastIteration = rtcData[index++];
            this.RTCisLatched = rtcData[index++];
            this.latchedSeconds = rtcData[index++];
            this.latchedMinutes = rtcData[index++];
            this.latchedHours = rtcData[index++];
            this.latchedLDays = rtcData[index++];
            this.latchedHDays = rtcData[index++];
            this.RTCSeconds = rtcData[index++];
            this.RTCMinutes = rtcData[index++];
            this.RTCHours = rtcData[index++];
            this.RTCDays = rtcData[index++];
            this.RTCDayOverFlow = rtcData[index++];
            this.RTCHALT = rtcData[index];
        }
    }, Σ);
    GameBoyCore.prototype.start = Σ.addFunction(function αBawg() {
        this.initMemory();
        this.ROMLoad();
        this.initLCD();
        this.initSound();
        this.run();
    }, Σ);
    GameBoyCore.prototype.initMemory = Σ.addFunction(function α4ST9() {
        this.memory = this.getTypedArray(65536, 0, 'uint8');
        this.frameBuffer = this.getTypedArray(23040, 16316664, 'int32');
        this.BGCHRBank1 = this.getTypedArray(2048, 0, 'uint8');
        this.TICKTable = this.toTypedArray(this.TICKTable, 'uint8');
        this.SecondaryTICKTable = this.toTypedArray(this.SecondaryTICKTable, 'uint8');
        this.channel3PCM = this.getTypedArray(32, 0, 'int8');
    }, Σ);
    GameBoyCore.prototype.generateCacheArray = Σ.addFunction(function αgSKJ(tileAmount) {
        var Σ_αgSKJ = new Σ.Scope(this, Σ, αgSKJ, function () {
            return this.capture({ tileAmount: tileAmount }, {
                tileArray: tileArray,
                tileNumber: tileNumber
            });
        });
        var tileArray = [];
        var tileNumber = 0;
        while (tileNumber < tileAmount) {
            tileArray[tileNumber++] = this.getTypedArray(64, 0, 'uint8');
        }
        return tileArray;
    }, Σ);
    GameBoyCore.prototype.initSkipBootstrap = Σ.addFunction(function αbI7I() {
        var Σ_αbI7I = new Σ.Scope(this, Σ, αbI7I, function () {
            return this.capture({}, { index: index });
        });
        var index = 255;
        while (index >= 0) {
            if (index >= 48 && index < 64) {
                this.memoryWrite(65280 | index, this.ffxxDump[index]);
            } else {
                switch (index) {
                case 0:
                case 1:
                case 2:
                case 5:
                case 7:
                case 15:
                case 255:
                    this.memoryWrite(65280 | index, this.ffxxDump[index]);
                    break;
                default:
                    this.memory[65280 | index] = this.ffxxDump[index];
                }
            }
            --index;
        }
        if (this.cGBC) {
            this.memory[65388] = 254;
            this.memory[65396] = 254;
        } else {
            this.memory[65352] = 255;
            this.memory[65353] = 255;
            this.memory[65388] = 255;
            this.memory[65396] = 255;
        }
        cout('Starting without the GBC boot ROM.', 0);
        this.registerA = this.cGBC ? 17 : 1;
        this.registerB = 0;
        this.registerC = 19;
        this.registerD = 0;
        this.registerE = 216;
        this.FZero = true;
        this.FSubtract = false;
        this.FHalfCarry = true;
        this.FCarry = true;
        this.registersHL = 333;
        this.LCDCONTROL = this.LINECONTROL;
        this.IME = false;
        this.IRQLineMatched = 0;
        this.interruptsRequested = 225;
        this.interruptsEnabled = 0;
        this.hdmaRunning = false;
        this.CPUTicks = 12;
        this.STATTracker = 0;
        this.modeSTAT = 1;
        this.spriteCount = 252;
        this.LYCMatchTriggerSTAT = false;
        this.mode2TriggerSTAT = false;
        this.mode1TriggerSTAT = false;
        this.mode0TriggerSTAT = false;
        this.LCDisOn = true;
        this.channel1FrequencyTracker = 8192;
        this.channel1DutyTracker = 0;
        this.channel1CachedDuty = this.dutyLookup[2];
        this.channel1totalLength = 0;
        this.channel1envelopeVolume = 0;
        this.channel1envelopeType = false;
        this.channel1envelopeSweeps = 0;
        this.channel1envelopeSweepsLast = 0;
        this.channel1consecutive = true;
        this.channel1frequency = 1985;
        this.channel1SweepFault = true;
        this.channel1ShadowFrequency = 1985;
        this.channel1timeSweep = 1;
        this.channel1lastTimeSweep = 0;
        this.channel1numSweep = 0;
        this.channel1frequencySweepDivider = 0;
        this.channel1decreaseSweep = false;
        this.channel2FrequencyTracker = 8192;
        this.channel2DutyTracker = 0;
        this.channel2CachedDuty = this.dutyLookup[2];
        this.channel2totalLength = 0;
        this.channel2envelopeVolume = 0;
        this.channel2envelopeType = false;
        this.channel2envelopeSweeps = 0;
        this.channel2envelopeSweepsLast = 0;
        this.channel2consecutive = true;
        this.channel2frequency = 0;
        this.channel3canPlay = false;
        this.channel3totalLength = 0;
        this.channel3patternType = 4;
        this.channel3frequency = 0;
        this.channel3consecutive = true;
        this.channel3Counter = 1048;
        this.channel4FrequencyPeriod = 8;
        this.channel4totalLength = 0;
        this.channel4envelopeVolume = 0;
        this.channel4currentVolume = 0;
        this.channel4envelopeType = false;
        this.channel4envelopeSweeps = 0;
        this.channel4envelopeSweepsLast = 0;
        this.channel4consecutive = true;
        this.channel4BitRange = 32767;
        this.channel4VolumeShifter = 15;
        this.channel1FrequencyCounter = 512;
        this.channel2FrequencyCounter = 512;
        this.channel3Counter = 2048;
        this.channel3FrequencyPeriod = 2048;
        this.channel3lastSampleLookup = 0;
        this.channel4lastSampleLookup = 0;
        this.VinLeftChannelMasterVolume = 1;
        this.VinRightChannelMasterVolume = 1;
        this.soundMasterEnabled = true;
        this.leftChannel1 = true;
        this.leftChannel2 = true;
        this.leftChannel3 = true;
        this.leftChannel4 = true;
        this.rightChannel1 = true;
        this.rightChannel2 = true;
        this.rightChannel3 = false;
        this.rightChannel4 = false;
        this.DIVTicks = 27044;
        this.LCDTicks = 160;
        this.timerTicks = 0;
        this.TIMAEnabled = false;
        this.TACClocker = 1024;
        this.serialTimer = 0;
        this.serialShiftTimer = 0;
        this.serialShiftTimerAllocated = 0;
        this.IRQEnableDelay = 0;
        this.actualScanLine = 144;
        this.lastUnrenderedLine = 0;
        this.gfxWindowDisplay = false;
        this.gfxSpriteShow = false;
        this.gfxSpriteNormalHeight = true;
        this.bgEnabled = true;
        this.BGPriorityEnabled = true;
        this.gfxWindowCHRBankPosition = 0;
        this.gfxBackgroundCHRBankPosition = 0;
        this.gfxBackgroundBankOffset = 0;
        this.windowY = 0;
        this.windowX = 0;
        this.drewBlank = 0;
        this.midScanlineOffset = -1;
        this.currentX = 0;
    }, Σ);
    GameBoyCore.prototype.initBootstrap = Σ.addFunction(function αdd4G() {
        cout('Starting the selected boot ROM.', 0);
        this.programCounter = 0;
        this.stackPointer = 0;
        this.IME = false;
        this.LCDTicks = 0;
        this.DIVTicks = 0;
        this.registerA = 0;
        this.registerB = 0;
        this.registerC = 0;
        this.registerD = 0;
        this.registerE = 0;
        this.FZero = this.FSubtract = this.FHalfCarry = this.FCarry = false;
        this.registersHL = 0;
        this.leftChannel1 = false;
        this.leftChannel2 = false;
        this.leftChannel3 = false;
        this.leftChannel4 = false;
        this.rightChannel1 = false;
        this.rightChannel2 = false;
        this.rightChannel3 = false;
        this.rightChannel4 = false;
        this.channel2frequency = this.channel1frequency = 0;
        this.channel4consecutive = this.channel2consecutive = this.channel1consecutive = false;
        this.VinLeftChannelMasterVolume = 8;
        this.VinRightChannelMasterVolume = 8;
        this.memory[65280] = 15;
    }, Σ);
    GameBoyCore.prototype.ROMLoad = Σ.addFunction(function αs06X() {
        var Σ_αs06X = new Σ.Scope(this, Σ, αs06X, function () {
            return this.capture({}, {
                maxLength: maxLength,
                romIndex: romIndex
            });
        });
        this.ROM = [];
        this.usedBootROM = settings[1];
        var maxLength = this.ROMImage.length;
        if (maxLength < 16384) {
            throw new Error('ROM image size too small.');
        }
        this.ROM = this.getTypedArray(maxLength, 0, 'uint8');
        var romIndex = 0;
        if (this.usedBootROM) {
            if (!settings[11]) {
                for (; romIndex < 256; ++romIndex) {
                    this.memory[romIndex] = this.GBCBOOTROM[romIndex];
                    this.ROM[romIndex] = this.ROMImage.charCodeAt(romIndex) & 255;
                }
                for (; romIndex < 512; ++romIndex) {
                    this.memory[romIndex] = this.ROM[romIndex] = this.ROMImage.charCodeAt(romIndex) & 255;
                }
                for (; romIndex < 2304; ++romIndex) {
                    this.memory[romIndex] = this.GBCBOOTROM[romIndex - 256];
                    this.ROM[romIndex] = this.ROMImage.charCodeAt(romIndex) & 255;
                }
                this.usedGBCBootROM = true;
            } else {
                for (; romIndex < 256; ++romIndex) {
                    this.memory[romIndex] = this.GBBOOTROM[romIndex];
                    this.ROM[romIndex] = this.ROMImage.charCodeAt(romIndex) & 255;
                }
            }
            for (; romIndex < 16384; ++romIndex) {
                this.memory[romIndex] = this.ROM[romIndex] = this.ROMImage.charCodeAt(romIndex) & 255;
            }
        } else {
            for (; romIndex < 16384; ++romIndex) {
                this.memory[romIndex] = this.ROM[romIndex] = this.ROMImage.charCodeAt(romIndex) & 255;
            }
        }
        for (; romIndex < maxLength; ++romIndex) {
            this.ROM[romIndex] = this.ROMImage.charCodeAt(romIndex) & 255;
        }
        this.ROMBankEdge = Math.floor(this.ROM.length / 16384);
        this.interpretCartridge();
        this.checkIRQMatching();
    }, Σ);
    GameBoyCore.prototype.getROMImage = Σ.addFunction(function αJlNm() {
        var Σ_αJlNm = new Σ.Scope(this, Σ, αJlNm, function () {
            return this.capture({}, { length: length });
        });
        if (this.ROMImage.length > 0) {
            return this.ROMImage.length;
        }
        var length = this.ROM.length;
        for (var index = 0; index < length; index++) {
            this.ROMImage += String.fromCharCode(this.ROM[index]);
        }
        return this.ROMImage;
    }, Σ);
    GameBoyCore.prototype.interpretCartridge = Σ.addFunction(function αp2cl() {
        var Σ_αp2cl = new Σ.Scope(this, Σ, αp2cl, function () {
            return this.capture({}, {
                MBCType: MBCType,
                cOldLicense: cOldLicense,
                cNewLicense: cNewLicense
            });
        });
        for (var index = 308; index < 319; index++) {
            if (this.ROMImage.charCodeAt(index) > 0) {
                this.name += this.ROMImage[index];
            }
        }
        for (var index = 319; index < 323; index++) {
            if (this.ROMImage.charCodeAt(index) > 0) {
                this.gameCode += this.ROMImage[index];
            }
        }
        cout('Game Title: ' + this.name + '[' + this.gameCode + '][' + this.ROMImage[323] + ']', 0);
        cout('Game Code: ' + this.gameCode, 0);
        this.cartridgeType = this.ROM[327];
        cout('Cartridge type #' + this.cartridgeType, 0);
        var MBCType = '';
        switch (this.cartridgeType) {
        case 0:
            if (!settings[9]) {
                MBCType = 'ROM';
                break;
            }
        case 1:
            this.cMBC1 = true;
            MBCType = 'MBC1';
            break;
        case 2:
            this.cMBC1 = true;
            this.cSRAM = true;
            MBCType = 'MBC1 + SRAM';
            break;
        case 3:
            this.cMBC1 = true;
            this.cSRAM = true;
            this.cBATT = true;
            MBCType = 'MBC1 + SRAM + BATT';
            break;
        case 5:
            this.cMBC2 = true;
            MBCType = 'MBC2';
            break;
        case 6:
            this.cMBC2 = true;
            this.cBATT = true;
            MBCType = 'MBC2 + BATT';
            break;
        case 8:
            this.cSRAM = true;
            MBCType = 'ROM + SRAM';
            break;
        case 9:
            this.cSRAM = true;
            this.cBATT = true;
            MBCType = 'ROM + SRAM + BATT';
            break;
        case 11:
            this.cMMMO1 = true;
            MBCType = 'MMMO1';
            break;
        case 12:
            this.cMMMO1 = true;
            this.cSRAM = true;
            MBCType = 'MMMO1 + SRAM';
            break;
        case 13:
            this.cMMMO1 = true;
            this.cSRAM = true;
            this.cBATT = true;
            MBCType = 'MMMO1 + SRAM + BATT';
            break;
        case 15:
            this.cMBC3 = true;
            this.cTIMER = true;
            this.cBATT = true;
            MBCType = 'MBC3 + TIMER + BATT';
            break;
        case 16:
            this.cMBC3 = true;
            this.cTIMER = true;
            this.cBATT = true;
            this.cSRAM = true;
            MBCType = 'MBC3 + TIMER + BATT + SRAM';
            break;
        case 17:
            this.cMBC3 = true;
            MBCType = 'MBC3';
            break;
        case 18:
            this.cMBC3 = true;
            this.cSRAM = true;
            MBCType = 'MBC3 + SRAM';
            break;
        case 19:
            this.cMBC3 = true;
            this.cSRAM = true;
            this.cBATT = true;
            MBCType = 'MBC3 + SRAM + BATT';
            break;
        case 25:
            this.cMBC5 = true;
            MBCType = 'MBC5';
            break;
        case 26:
            this.cMBC5 = true;
            this.cSRAM = true;
            MBCType = 'MBC5 + SRAM';
            break;
        case 27:
            this.cMBC5 = true;
            this.cSRAM = true;
            this.cBATT = true;
            MBCType = 'MBC5 + SRAM + BATT';
            break;
        case 28:
            this.cRUMBLE = true;
            MBCType = 'RUMBLE';
            break;
        case 29:
            this.cRUMBLE = true;
            this.cSRAM = true;
            MBCType = 'RUMBLE + SRAM';
            break;
        case 30:
            this.cRUMBLE = true;
            this.cSRAM = true;
            this.cBATT = true;
            MBCType = 'RUMBLE + SRAM + BATT';
            break;
        case 31:
            this.cCamera = true;
            MBCType = 'GameBoy Camera';
            break;
        case 34:
            this.cMBC7 = true;
            this.cSRAM = true;
            this.cBATT = true;
            MBCType = 'MBC7 + SRAM + BATT';
            break;
        case 253:
            this.cTAMA5 = true;
            MBCType = 'TAMA5';
            break;
        case 254:
            this.cHuC3 = true;
            MBCType = 'HuC3';
            break;
        case 255:
            this.cHuC1 = true;
            MBCType = 'HuC1';
            break;
        default:
            MBCType = 'Unknown';
            cout('Cartridge type is unknown.', 2);
            pause();
        }
        cout('Cartridge Type: ' + MBCType + '.', 0);
        this.numROMBanks = this.ROMBanks[this.ROM[328]];
        cout(this.numROMBanks + ' ROM banks.', 0);
        switch (this.RAMBanks[this.ROM[329]]) {
        case 0:
            cout('No RAM banking requested for allocation or MBC is of type 2.', 0);
            break;
        case 2:
            cout('1 RAM bank requested for allocation.', 0);
            break;
        case 3:
            cout('4 RAM banks requested for allocation.', 0);
            break;
        case 4:
            cout('16 RAM banks requested for allocation.', 0);
            break;
        default:
            cout('RAM bank amount requested is unknown, will use maximum allowed by specified MBC type.', 0);
        }
        if (!this.usedBootROM) {
            switch (this.ROM[323]) {
            case 0:
                this.cGBC = false;
                cout('Only GB mode detected.', 0);
                break;
            case 50:
                if (!settings[2] && this.name + this.gameCode + this.ROM[323] == 'Game and Watch 50') {
                    this.cGBC = true;
                    cout('Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge).', 1);
                } else {
                    this.cGBC = false;
                }
                break;
            case 128:
                this.cGBC = !settings[2];
                cout('GB and GBC mode detected.', 0);
                break;
            case 192:
                this.cGBC = true;
                cout('Only GBC mode detected.', 0);
                break;
            default:
                this.cGBC = false;
                cout('Unknown GameBoy game type code #' + this.ROM[323] + ', defaulting to GB mode (Old games don\'t have a type code).', 1);
            }
            this.inBootstrap = false;
            this.setupRAM();
            this.initSkipBootstrap();
            this.initializeAudioStartState();
        } else {
            this.cGBC = this.usedGBCBootROM;
            this.setupRAM();
            this.initBootstrap();
        }
        this.initializeModeSpecificArrays();
        var cOldLicense = this.ROM[331];
        var cNewLicense = this.ROM[324] & 65280 | this.ROM[325] & 255;
        if (cOldLicense != 51) {
            cout('Old style license code: ' + cOldLicense, 0);
        } else {
            cout('New style license code: ' + cNewLicense, 0);
        }
        this.ROMImage = '';
    }, Σ);
    GameBoyCore.prototype.disableBootROM = Σ.addFunction(function αXcS7() {
        var Σ_αXcS7 = new Σ.Scope(this, Σ, αXcS7, function () {
            return this.capture({}, {});
        });
        for (var index = 0; index < 256; ++index) {
            this.memory[index] = this.ROM[index];
        }
        if (this.usedGBCBootROM) {
            for (index = 512; index < 2304; ++index) {
                this.memory[index] = this.ROM[index];
            }
            if (!this.cGBC) {
                this.GBCtoGBModeAdjust();
            } else {
                this.recompileBootIOWriteHandling();
            }
        } else {
            this.recompileBootIOWriteHandling();
        }
    }, Σ);
    GameBoyCore.prototype.initializeTiming = Σ.addFunction(function αo4KG() {
        this.baseCPUCyclesPerIteration = 524288 / 125 * settings[6];
        this.CPUCyclesTotalRoundoff = this.baseCPUCyclesPerIteration % 4;
        this.CPUCyclesTotalBase = this.CPUCyclesTotal = this.baseCPUCyclesPerIteration - this.CPUCyclesTotalRoundoff | 0;
        this.CPUCyclesTotalCurrent = 0;
    }, Σ);
    GameBoyCore.prototype.setupRAM = Σ.addFunction(function αUUGL() {
        var Σ_αUUGL = new Σ.Scope(this, Σ, αUUGL, function () {
            return this.capture({}, {});
        });
        if (this.cMBC2) {
            this.numRAMBanks = 1 / 16;
        } else if (this.cMBC1 || this.cRUMBLE || this.cMBC3 || this.cHuC3) {
            this.numRAMBanks = 4;
        } else if (this.cMBC5) {
            this.numRAMBanks = 16;
        } else if (this.cSRAM) {
            this.numRAMBanks = 1;
        }
        if (this.numRAMBanks > 0) {
            if (!this.MBCRAMUtilized()) {
                this.MBCRAMBanksEnabled = true;
            }
            var MBCRam = typeof this.openMBC == 'function' ? this.openMBC(this.name) : [];
            if (MBCRam.length > 0) {
                this.MBCRam = this.toTypedArray(MBCRam, 'uint8');
            } else {
                this.MBCRam = this.getTypedArray(this.numRAMBanks * 8192, 0, 'uint8');
            }
        }
        cout('Actual bytes of MBC RAM allocated: ' + this.numRAMBanks * 8192, 0);
        this.returnFromRTCState();
        if (this.cGBC) {
            this.VRAM = this.getTypedArray(8192, 0, 'uint8');
            this.GBCMemory = this.getTypedArray(28672, 0, 'uint8');
        }
        this.memoryReadJumpCompile();
        this.memoryWriteJumpCompile();
    }, Σ);
    GameBoyCore.prototype.MBCRAMUtilized = Σ.addFunction(function α5RGq() {
        return this.cMBC1 || this.cMBC2 || this.cMBC3 || this.cMBC5 || this.cMBC7 || this.cRUMBLE;
    }, Σ);
    GameBoyCore.prototype.recomputeDimension = Σ.addFunction(function αys4P() {
        initNewCanvas();
        this.onscreenWidth = this.canvas.width;
        this.onscreenHeight = this.canvas.height;
        if (GameBoyWindow && GameBoyWindow.mozRequestAnimationFrame) {
            this.canvas.width = this.onscreenWidth = !settings[12] ? 160 : this.canvas.width;
            this.canvas.height = this.onscreenHeight = !settings[12] ? 144 : this.canvas.height;
        } else {
            this.onscreenWidth = this.canvas.width;
            this.onscreenHeight = this.canvas.height;
        }
        this.offscreenWidth = !settings[12] ? 160 : this.canvas.width;
        this.offscreenHeight = !settings[12] ? 144 : this.canvas.height;
        this.offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 4;
    }, Σ);
    GameBoyCore.prototype.initLCD = Σ.addFunction(function αsK9Q() {
        this.recomputeDimension();
        if (this.offscreenRGBCount != 92160) {
            this.compileResizeFrameBufferFunction();
        } else {
            this.resizer = null;
        }
        try {
            this.canvasOffscreen = new GameBoyCanvas();
            this.canvasOffscreen.width = this.offscreenWidth;
            this.canvasOffscreen.height = this.offscreenHeight;
            this.drawContextOffscreen = this.canvasOffscreen.getContext('2d');
            this.drawContextOnscreen = this.canvas.getContext('2d');
            try {
                this.canvasBuffer = this.drawContextOffscreen.createImageData(this.offscreenWidth, this.offscreenHeight);
            } catch (error) {
                cout('Falling back to the getImageData initialization (Error "' + error.message + '").', 1);
                this.canvasBuffer = this.drawContextOffscreen.getImageData(0, 0, this.offscreenWidth, this.offscreenHeight);
            }
            var index = this.offscreenRGBCount;
            while (index > 0) {
                this.canvasBuffer.data[index -= 4] = 248;
                this.canvasBuffer.data[index + 1] = 248;
                this.canvasBuffer.data[index + 2] = 248;
                this.canvasBuffer.data[index + 3] = 255;
            }
            this.graphicsBlit();
            this.canvas.style.visibility = 'visible';
            if (this.swizzledFrame == null) {
                this.swizzledFrame = this.getTypedArray(69120, 255, 'uint8');
            }
            this.drewFrame = true;
            this.requestDraw();
        } catch (error) {
            throw new Error('HTML5 Canvas support required: ' + error.message + 'file: ' + error.fileName + ', line: ' + error.lineNumber);
        }
    }, Σ);
    GameBoyCore.prototype.graphicsBlit = Σ.addFunction(function αXAFM() {
        if (this.offscreenWidth == this.onscreenWidth && this.offscreenHeight == this.onscreenHeight) {
            this.drawContextOnscreen.putImageData(this.canvasBuffer, 0, 0);
        } else {
            this.drawContextOffscreen.putImageData(this.canvasBuffer, 0, 0);
            this.drawContextOnscreen.drawImage(this.canvasOffscreen, 0, 0, this.onscreenWidth, this.onscreenHeight);
        }
    }, Σ);
    GameBoyCore.prototype.JoyPadEvent = Σ.addFunction(function α2K6U(key, down) {
        var Σ_α2K6U = new Σ.Scope(this, Σ, α2K6U, function () {
            return this.capture({
                key: key,
                down: down
            }, {});
        });
        if (down) {
            this.JoyPad &= 255 ^ 1 << key;
            if (!this.cGBC && (!this.usedBootROM || !this.usedGBCBootROM)) {
                this.interruptsRequested |= 16;
                this.remainingClocks = 0;
                this.checkIRQMatching();
            }
        } else {
            this.JoyPad |= 1 << key;
        }
        this.memory[65280] = (this.memory[65280] & 48) + (((this.memory[65280] & 32) == 0 ? this.JoyPad >> 4 : 15) & ((this.memory[65280] & 16) == 0 ? this.JoyPad & 15 : 15));
        this.CPUStopped = false;
    }, Σ);
    GameBoyCore.prototype.GyroEvent = Σ.addFunction(function αduJz(x, y) {
        var Σ_αduJz = new Σ.Scope(this, Σ, αduJz, function () {
            return this.capture({
                x: x,
                y: y
            }, {});
        });
        x *= -100;
        x += 2047;
        this.highX = x >> 8;
        this.lowX = x & 255;
        y *= -100;
        y += 2047;
        this.highY = y >> 8;
        this.lowY = y & 255;
    }, Σ);
    GameBoyCore.prototype.initSound = Σ.addFunction(function α6eQp() {
        this.sampleSize = 4194304 / 1000 * settings[6];
        this.machineOut = settings[13];
        if (settings[0]) {
            try {
                var parentObj = this;
                this.audioHandle = new XAudioServer(2, 4194304 / settings[13], 0, Math.max(this.sampleSize * settings[8] / settings[13], 8192) << 1, null, settings[14]);
                this.initAudioBuffer();
            } catch (error) {
                cout('Audio system cannot run: ' + error.message, 2);
                settings[0] = false;
            }
        } else if (this.audioHandle) {
            try {
                this.audioHandle.changeVolume(0);
            } catch (error) {
            }
        }
    }, Σ);
    GameBoyCore.prototype.changeVolume = Σ.addFunction(function αUyAu() {
        if (settings[0] && this.audioHandle) {
            try {
                this.audioHandle.changeVolume(settings[14]);
            } catch (error) {
            }
        }
    }, Σ);
    GameBoyCore.prototype.initAudioBuffer = Σ.addFunction(function αxOe4() {
        this.audioIndex = 0;
        this.bufferContainAmount = Math.max(this.sampleSize * settings[7] / settings[13], 4096) << 1;
        this.numSamplesTotal = this.sampleSize - this.sampleSize % settings[13] | 0;
        this.currentBuffer = this.getTypedArray(this.numSamplesTotal, 61680, 'int32');
        this.secondaryBuffer = this.getTypedArray((this.numSamplesTotal << 1) / settings[13], 0, 'float32');
    }, Σ);
    GameBoyCore.prototype.intializeWhiteNoise = Σ.addFunction(function αJpBy() {
        var Σ_αJpBy = new Σ.Scope(this, Σ, αJpBy, function () {
            return this.capture({}, {
                randomFactor: randomFactor,
                LSFR: LSFR,
                LSFRShifted: LSFRShifted
            });
        });
        var randomFactor = 1;
        this.LSFR15Table = this.getTypedArray(524288, 0, 'int8');
        var LSFR = 32767;
        var LSFRShifted = 16383;
        for (var index = 0; index < 32768; ++index) {
            randomFactor = 1 - (LSFR & 1);
            this.LSFR15Table[32768 | index] = randomFactor;
            this.LSFR15Table[65536 | index] = randomFactor * 2;
            this.LSFR15Table[98304 | index] = randomFactor * 3;
            this.LSFR15Table[131072 | index] = randomFactor * 4;
            this.LSFR15Table[163840 | index] = randomFactor * 5;
            this.LSFR15Table[196608 | index] = randomFactor * 6;
            this.LSFR15Table[229376 | index] = randomFactor * 7;
            this.LSFR15Table[262144 | index] = randomFactor * 8;
            this.LSFR15Table[294912 | index] = randomFactor * 9;
            this.LSFR15Table[327680 | index] = randomFactor * 10;
            this.LSFR15Table[360448 | index] = randomFactor * 11;
            this.LSFR15Table[393216 | index] = randomFactor * 12;
            this.LSFR15Table[425984 | index] = randomFactor * 13;
            this.LSFR15Table[458752 | index] = randomFactor * 14;
            this.LSFR15Table[491520 | index] = randomFactor * 15;
            LSFRShifted = LSFR >> 1;
            LSFR = LSFRShifted | ((LSFRShifted ^ LSFR) & 1) << 14;
        }
        this.LSFR7Table = this.getTypedArray(2048, 0, 'int8');
        LSFR = 127;
        for (index = 0; index < 128; ++index) {
            randomFactor = 1 - (LSFR & 1);
            this.LSFR7Table[128 | index] = randomFactor;
            this.LSFR7Table[256 | index] = randomFactor * 2;
            this.LSFR7Table[384 | index] = randomFactor * 3;
            this.LSFR7Table[512 | index] = randomFactor * 4;
            this.LSFR7Table[640 | index] = randomFactor * 5;
            this.LSFR7Table[768 | index] = randomFactor * 6;
            this.LSFR7Table[896 | index] = randomFactor * 7;
            this.LSFR7Table[1024 | index] = randomFactor * 8;
            this.LSFR7Table[1152 | index] = randomFactor * 9;
            this.LSFR7Table[1280 | index] = randomFactor * 10;
            this.LSFR7Table[1408 | index] = randomFactor * 11;
            this.LSFR7Table[1536 | index] = randomFactor * 12;
            this.LSFR7Table[1664 | index] = randomFactor * 13;
            this.LSFR7Table[1792 | index] = randomFactor * 14;
            this.LSFR7Table[1920 | index] = randomFactor * 15;
            LSFRShifted = LSFR >> 1;
            LSFR = LSFRShifted | ((LSFRShifted ^ LSFR) & 1) << 6;
        }
        if (!this.noiseSampleTable && this.memory.length == 65536) {
            this.noiseSampleTable = (this.memory[65314] & 8) == 8 ? this.LSFR7Table : this.LSFR15Table;
        }
    }, Σ);
    GameBoyCore.prototype.audioUnderrunAdjustment = Σ.addFunction(function αJRvw() {
        var Σ_αJRvw = new Σ.Scope(this, Σ, αJRvw, function () {
            return this.capture({}, {});
        });
        if (settings[0]) {
            var underrunAmount = this.bufferContainAmount - this.audioHandle.remainingBuffer();
            if (underrunAmount > 0) {
                this.CPUCyclesTotalCurrent += (underrunAmount >> 1) * this.machineOut;
                this.recalculateIterationClockLimit();
            }
        }
    }, Σ);
    GameBoyCore.prototype.initializeAudioStartState = Σ.addFunction(function αrkUU() {
        this.channel1FrequencyTracker = 8192;
        this.channel1DutyTracker = 0;
        this.channel1CachedDuty = this.dutyLookup[2];
        this.channel1totalLength = 0;
        this.channel1envelopeVolume = 0;
        this.channel1envelopeType = false;
        this.channel1envelopeSweeps = 0;
        this.channel1envelopeSweepsLast = 0;
        this.channel1consecutive = true;
        this.channel1frequency = 0;
        this.channel1SweepFault = false;
        this.channel1ShadowFrequency = 0;
        this.channel1timeSweep = 1;
        this.channel1lastTimeSweep = 0;
        this.channel1numSweep = 0;
        this.channel1frequencySweepDivider = 0;
        this.channel1decreaseSweep = false;
        this.channel2FrequencyTracker = 8192;
        this.channel2DutyTracker = 0;
        this.channel2CachedDuty = this.dutyLookup[2];
        this.channel2totalLength = 0;
        this.channel2envelopeVolume = 0;
        this.channel2envelopeType = false;
        this.channel2envelopeSweeps = 0;
        this.channel2envelopeSweepsLast = 0;
        this.channel2consecutive = true;
        this.channel2frequency = 0;
        this.channel3canPlay = false;
        this.channel3totalLength = 0;
        this.channel3patternType = 4;
        this.channel3frequency = 0;
        this.channel3consecutive = true;
        this.channel3Counter = 2048;
        this.channel4FrequencyPeriod = 8;
        this.channel4totalLength = 0;
        this.channel4envelopeVolume = 0;
        this.channel4currentVolume = 0;
        this.channel4envelopeType = false;
        this.channel4envelopeSweeps = 0;
        this.channel4envelopeSweepsLast = 0;
        this.channel4consecutive = true;
        this.channel4BitRange = 32767;
        this.noiseSampleTable = this.LSFR15Table;
        this.channel4VolumeShifter = 15;
        this.channel1FrequencyCounter = 8192;
        this.channel2FrequencyCounter = 8192;
        this.channel3Counter = 2048;
        this.channel3FrequencyPeriod = 2048;
        this.channel3lastSampleLookup = 0;
        this.channel4lastSampleLookup = 0;
        this.VinLeftChannelMasterVolume = 8;
        this.VinRightChannelMasterVolume = 8;
        this.mixerOutputCache = 0;
        this.sequencerClocks = 8192;
        this.sequencePosition = 0;
        this.channel4FrequencyPeriod = 8;
        this.channel4Counter = 8;
        this.cachedChannel3Sample = 0;
        this.cachedChannel4Sample = 0;
        this.channel1Enabled = false;
        this.channel2Enabled = false;
        this.channel3Enabled = false;
        this.channel4Enabled = false;
        this.channel1canPlay = false;
        this.channel2canPlay = false;
        this.channel4canPlay = false;
        this.channel1OutputLevelCache();
        this.channel2OutputLevelCache();
        this.channel3OutputLevelCache();
        this.channel4OutputLevelCache();
    }, Σ);
    GameBoyCore.prototype.outputAudio = Σ.addFunction(function αaCsI() {
        var Σ_αaCsI = new Σ.Scope(this, Σ, αaCsI, function () {
            return this.capture({}, {
                sampleFactor: sampleFactor,
                dirtySample: dirtySample,
                averageL: averageL,
                averageR: averageR,
                destinationPosition: destinationPosition,
                divisor1: divisor1,
                divisor2: divisor2
            });
        });
        var sampleFactor = 0;
        var dirtySample = 0;
        var averageL = 0;
        var averageR = 0;
        var destinationPosition = 0;
        var divisor1 = settings[13];
        var divisor2 = divisor1 * 240;
        for (var sourcePosition = 0; sourcePosition < this.numSamplesTotal;) {
            for (sampleFactor = averageL = averageR = 0; sampleFactor < divisor1; ++sampleFactor) {
                dirtySample = this.currentBuffer[sourcePosition++];
                averageL += dirtySample >> 9;
                averageR += dirtySample & 511;
            }
            this.secondaryBuffer[destinationPosition++] = averageL / divisor2 - 1;
            this.secondaryBuffer[destinationPosition++] = averageR / divisor2 - 1;
        }
        this.audioHandle.writeAudioNoCallback(this.secondaryBuffer);
    }, Σ);
    GameBoyCore.prototype.generateAudio = Σ.addFunction(function αT3CH(numSamples) {
        var Σ_αT3CH = new Σ.Scope(this, Σ, αT3CH, function () {
            return this.capture({ numSamples: numSamples }, {});
        });
        if (this.soundMasterEnabled && !this.CPUStopped) {
            for (var samplesToGenerate = 0; numSamples > 0;) {
                samplesToGenerate = numSamples < this.sequencerClocks ? numSamples : this.sequencerClocks;
                this.sequencerClocks -= samplesToGenerate;
                numSamples -= samplesToGenerate;
                while (--samplesToGenerate > -1) {
                    this.computeAudioChannels();
                    this.currentBuffer[this.audioIndex++] = this.mixerOutputCache;
                    if (this.audioIndex == this.numSamplesTotal) {
                        this.audioIndex = 0;
                        this.outputAudio();
                    }
                }
                if (this.sequencerClocks == 0) {
                    this.audioComputeSequencer();
                    this.sequencerClocks = 8192;
                }
            }
        } else {
            while (--numSamples > -1) {
                this.currentBuffer[this.audioIndex++] = 61680;
                if (this.audioIndex == this.numSamplesTotal) {
                    this.audioIndex = 0;
                    this.outputAudio();
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.generateAudioFake = Σ.addFunction(function αYcS6(numSamples) {
        var Σ_αYcS6 = new Σ.Scope(this, Σ, αYcS6, function () {
            return this.capture({ numSamples: numSamples }, {});
        });
        if (this.soundMasterEnabled && !this.CPUStopped) {
            while (--numSamples > -1) {
                this.computeAudioChannels();
                if (--this.sequencerClocks == 0) {
                    this.audioComputeSequencer();
                    this.sequencerClocks = 8192;
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.audioJIT = Σ.addFunction(function αBIRd() {
        if (settings[0]) {
            this.generateAudio(this.audioTicks);
        } else {
            this.generateAudioFake(this.audioTicks);
        }
        this.audioTicks = 0;
    }, Σ);
    GameBoyCore.prototype.audioComputeSequencer = Σ.addFunction(function αGBTV() {
        switch (this.sequencePosition++) {
        case 0:
            this.clockAudioLength();
            break;
        case 2:
            this.clockAudioLength();
            this.clockAudioSweep();
            break;
        case 4:
            this.clockAudioLength();
            break;
        case 6:
            this.clockAudioLength();
            this.clockAudioSweep();
            break;
        case 7:
            this.clockAudioEnvelope();
            this.sequencePosition = 0;
        }
    }, Σ);
    GameBoyCore.prototype.clockAudioLength = Σ.addFunction(function αcpqw() {
        if (this.channel1totalLength > 1) {
            --this.channel1totalLength;
        } else if (this.channel1totalLength == 1) {
            this.channel1totalLength = 0;
            this.channel1EnableCheck();
            this.memory[65318] &= 254;
        }
        if (this.channel2totalLength > 1) {
            --this.channel2totalLength;
        } else if (this.channel2totalLength == 1) {
            this.channel2totalLength = 0;
            this.channel2EnableCheck();
            this.memory[65318] &= 253;
        }
        if (this.channel3totalLength > 1) {
            --this.channel3totalLength;
        } else if (this.channel3totalLength == 1) {
            this.channel3totalLength = 0;
            this.channel3EnableCheck();
            this.memory[65318] &= 251;
        }
        if (this.channel4totalLength > 1) {
            --this.channel4totalLength;
        } else if (this.channel4totalLength == 1) {
            this.channel4totalLength = 0;
            this.channel4EnableCheck();
            this.memory[65318] &= 247;
        }
    }, Σ);
    GameBoyCore.prototype.clockAudioSweep = Σ.addFunction(function αndsK() {
        if (!this.channel1SweepFault && this.channel1timeSweep > 0) {
            if (--this.channel1timeSweep == 0) {
                this.runAudioSweep();
            }
        }
    }, Σ);
    GameBoyCore.prototype.runAudioSweep = Σ.addFunction(function αqJ8J() {
        if (this.channel1lastTimeSweep > 0) {
            if (this.channel1frequencySweepDivider > 0) {
                if (this.channel1numSweep > 0) {
                    --this.channel1numSweep;
                    if (this.channel1decreaseSweep) {
                        this.channel1ShadowFrequency -= this.channel1ShadowFrequency >> this.channel1frequencySweepDivider;
                        this.channel1frequency = this.channel1ShadowFrequency & 2047;
                        this.channel1FrequencyTracker = 2048 - this.channel1frequency << 2;
                    } else {
                        this.channel1ShadowFrequency += this.channel1ShadowFrequency >> this.channel1frequencySweepDivider;
                        this.channel1frequency = this.channel1ShadowFrequency;
                        if (this.channel1ShadowFrequency <= 2047) {
                            this.channel1FrequencyTracker = 2048 - this.channel1frequency << 2;
                            if (this.channel1ShadowFrequency + (this.channel1ShadowFrequency >> this.channel1frequencySweepDivider) > 2047) {
                                this.channel1SweepFault = true;
                                this.channel1EnableCheck();
                                this.memory[65318] &= 254;
                            }
                        } else {
                            this.channel1frequency &= 2047;
                            this.channel1SweepFault = true;
                            this.channel1EnableCheck();
                            this.memory[65318] &= 254;
                        }
                    }
                }
                this.channel1timeSweep = this.channel1lastTimeSweep;
            } else {
                this.channel1SweepFault = true;
                this.channel1EnableCheck();
            }
        }
    }, Σ);
    GameBoyCore.prototype.clockAudioEnvelope = Σ.addFunction(function αMhaz() {
        if (this.channel1envelopeSweepsLast > -1) {
            if (this.channel1envelopeSweeps > 0) {
                --this.channel1envelopeSweeps;
            } else {
                if (!this.channel1envelopeType) {
                    if (this.channel1envelopeVolume > 0) {
                        --this.channel1envelopeVolume;
                        this.channel1envelopeSweeps = this.channel1envelopeSweepsLast;
                        this.channel1OutputLevelCache();
                    } else {
                        this.channel1envelopeSweepsLast = -1;
                    }
                } else if (this.channel1envelopeVolume < 15) {
                    ++this.channel1envelopeVolume;
                    this.channel1envelopeSweeps = this.channel1envelopeSweepsLast;
                    this.channel1OutputLevelCache();
                } else {
                    this.channel1envelopeSweepsLast = -1;
                }
            }
        }
        if (this.channel2envelopeSweepsLast > -1) {
            if (this.channel2envelopeSweeps > 0) {
                --this.channel2envelopeSweeps;
            } else {
                if (!this.channel2envelopeType) {
                    if (this.channel2envelopeVolume > 0) {
                        --this.channel2envelopeVolume;
                        this.channel2envelopeSweeps = this.channel2envelopeSweepsLast;
                        this.channel2OutputLevelCache();
                    } else {
                        this.channel2envelopeSweepsLast = -1;
                    }
                } else if (this.channel2envelopeVolume < 15) {
                    ++this.channel2envelopeVolume;
                    this.channel2envelopeSweeps = this.channel2envelopeSweepsLast;
                    this.channel2OutputLevelCache();
                } else {
                    this.channel2envelopeSweepsLast = -1;
                }
            }
        }
        if (this.channel4envelopeSweepsLast > -1) {
            if (this.channel4envelopeSweeps > 0) {
                --this.channel4envelopeSweeps;
            } else {
                if (!this.channel4envelopeType) {
                    if (this.channel4envelopeVolume > 0) {
                        this.channel4currentVolume = --this.channel4envelopeVolume << this.channel4VolumeShifter;
                        this.channel4envelopeSweeps = this.channel4envelopeSweepsLast;
                        this.channel4UpdateCache();
                    } else {
                        this.channel4envelopeSweepsLast = -1;
                    }
                } else if (this.channel4envelopeVolume < 15) {
                    this.channel4currentVolume = ++this.channel4envelopeVolume << this.channel4VolumeShifter;
                    this.channel4envelopeSweeps = this.channel4envelopeSweepsLast;
                    this.channel4UpdateCache();
                } else {
                    this.channel4envelopeSweepsLast = -1;
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.computeAudioChannels = Σ.addFunction(function αIVz2() {
        if (--this.channel1FrequencyCounter == 0) {
            this.channel1FrequencyCounter = this.channel1FrequencyTracker;
            this.channel1DutyTracker = this.channel1DutyTracker + 1 & 7;
            this.channel1OutputLevelTrimaryCache();
        }
        if (--this.channel2FrequencyCounter == 0) {
            this.channel2FrequencyCounter = this.channel2FrequencyTracker;
            this.channel2DutyTracker = this.channel2DutyTracker + 1 & 7;
            this.channel2OutputLevelTrimaryCache();
        }
        if (--this.channel3Counter == 0) {
            if (this.channel3canPlay) {
                this.channel3lastSampleLookup = this.channel3lastSampleLookup + 1 & 31;
            }
            this.channel3Counter = this.channel3FrequencyPeriod;
            this.channel3UpdateCache();
        }
        if (--this.channel4Counter == 0) {
            this.channel4lastSampleLookup = this.channel4lastSampleLookup + 1 & this.channel4BitRange;
            this.channel4Counter = this.channel4FrequencyPeriod;
            this.channel4UpdateCache();
        }
    }, Σ);
    GameBoyCore.prototype.channel1EnableCheck = Σ.addFunction(function αYLtQ() {
        this.channel1Enabled = (this.channel1consecutive || this.channel1totalLength > 0) && !this.channel1SweepFault && this.channel1canPlay;
        this.channel1OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel1VolumeEnableCheck = Σ.addFunction(function αAvbc() {
        this.channel1canPlay = this.memory[65298] > 7;
        this.channel1EnableCheck();
        this.channel1OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel1OutputLevelCache = Σ.addFunction(function α3oHx() {
        this.channel1currentSampleLeft = this.leftChannel1 ? this.channel1envelopeVolume : 0;
        this.channel1currentSampleRight = this.rightChannel1 ? this.channel1envelopeVolume : 0;
        this.channel1OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel1OutputLevelSecondaryCache = Σ.addFunction(function αClbo() {
        if (this.channel1Enabled) {
            this.channel1currentSampleLeftSecondary = this.channel1currentSampleLeft;
            this.channel1currentSampleRightSecondary = this.channel1currentSampleRight;
        } else {
            this.channel1currentSampleLeftSecondary = 0;
            this.channel1currentSampleRightSecondary = 0;
        }
        this.channel1OutputLevelTrimaryCache();
    }, Σ);
    GameBoyCore.prototype.channel1OutputLevelTrimaryCache = Σ.addFunction(function αrbOX() {
        if (this.channel1CachedDuty[this.channel1DutyTracker]) {
            this.channel1currentSampleLeftTrimary = this.channel1currentSampleLeftSecondary;
            this.channel1currentSampleRightTrimary = this.channel1currentSampleRightSecondary;
        } else {
            this.channel1currentSampleLeftTrimary = 0;
            this.channel1currentSampleRightTrimary = 0;
        }
        this.mixerOutputLevelCache();
    }, Σ);
    GameBoyCore.prototype.channel2EnableCheck = Σ.addFunction(function αt2kD() {
        this.channel2Enabled = (this.channel2consecutive || this.channel2totalLength > 0) && this.channel2canPlay;
        this.channel2OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel2VolumeEnableCheck = Σ.addFunction(function αyczM() {
        this.channel2canPlay = this.memory[65303] > 7;
        this.channel2EnableCheck();
        this.channel2OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel2OutputLevelCache = Σ.addFunction(function αA5Rx() {
        this.channel2currentSampleLeft = this.leftChannel2 ? this.channel2envelopeVolume : 0;
        this.channel2currentSampleRight = this.rightChannel2 ? this.channel2envelopeVolume : 0;
        this.channel2OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel2OutputLevelSecondaryCache = Σ.addFunction(function αt9bV() {
        if (this.channel2Enabled) {
            this.channel2currentSampleLeftSecondary = this.channel2currentSampleLeft;
            this.channel2currentSampleRightSecondary = this.channel2currentSampleRight;
        } else {
            this.channel2currentSampleLeftSecondary = 0;
            this.channel2currentSampleRightSecondary = 0;
        }
        this.channel2OutputLevelTrimaryCache();
    }, Σ);
    GameBoyCore.prototype.channel2OutputLevelTrimaryCache = Σ.addFunction(function αMEO1() {
        if (this.channel2CachedDuty[this.channel2DutyTracker]) {
            this.channel2currentSampleLeftTrimary = this.channel2currentSampleLeftSecondary;
            this.channel2currentSampleRightTrimary = this.channel2currentSampleRightSecondary;
        } else {
            this.channel2currentSampleLeftTrimary = 0;
            this.channel2currentSampleRightTrimary = 0;
        }
        this.mixerOutputLevelCache();
    }, Σ);
    GameBoyCore.prototype.channel3EnableCheck = Σ.addFunction(function αwaJS() {
        this.channel3Enabled = this.channel3consecutive || this.channel3totalLength > 0;
        this.channel3OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel3OutputLevelCache = Σ.addFunction(function αQWP7() {
        this.channel3currentSampleLeft = this.leftChannel3 ? this.cachedChannel3Sample : 0;
        this.channel3currentSampleRight = this.rightChannel3 ? this.cachedChannel3Sample : 0;
        this.channel3OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel3OutputLevelSecondaryCache = Σ.addFunction(function αvHiN() {
        if (this.channel3Enabled) {
            this.channel3currentSampleLeftSecondary = this.channel3currentSampleLeft;
            this.channel3currentSampleRightSecondary = this.channel3currentSampleRight;
        } else {
            this.channel3currentSampleLeftSecondary = 0;
            this.channel3currentSampleRightSecondary = 0;
        }
        this.mixerOutputLevelCache();
    }, Σ);
    GameBoyCore.prototype.channel4EnableCheck = Σ.addFunction(function α19Vg() {
        this.channel4Enabled = (this.channel4consecutive || this.channel4totalLength > 0) && this.channel4canPlay;
        this.channel4OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel4VolumeEnableCheck = Σ.addFunction(function αuips() {
        this.channel4canPlay = this.memory[65313] > 7;
        this.channel4EnableCheck();
        this.channel4OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel4OutputLevelCache = Σ.addFunction(function αPPk9() {
        this.channel4currentSampleLeft = this.leftChannel4 ? this.cachedChannel4Sample : 0;
        this.channel4currentSampleRight = this.rightChannel4 ? this.cachedChannel4Sample : 0;
        this.channel4OutputLevelSecondaryCache();
    }, Σ);
    GameBoyCore.prototype.channel4OutputLevelSecondaryCache = Σ.addFunction(function αr2WI() {
        if (this.channel4Enabled) {
            this.channel4currentSampleLeftSecondary = this.channel4currentSampleLeft;
            this.channel4currentSampleRightSecondary = this.channel4currentSampleRight;
        } else {
            this.channel4currentSampleLeftSecondary = 0;
            this.channel4currentSampleRightSecondary = 0;
        }
        this.mixerOutputLevelCache();
    }, Σ);
    GameBoyCore.prototype.mixerOutputLevelCache = Σ.addFunction(function αeixD() {
        this.mixerOutputCache = ((this.channel1currentSampleLeftTrimary + this.channel2currentSampleLeftTrimary + this.channel3currentSampleLeftSecondary + this.channel4currentSampleLeftSecondary) * this.VinLeftChannelMasterVolume << 9) + (this.channel1currentSampleRightTrimary + this.channel2currentSampleRightTrimary + this.channel3currentSampleRightSecondary + this.channel4currentSampleRightSecondary) * this.VinRightChannelMasterVolume;
    }, Σ);
    GameBoyCore.prototype.channel3UpdateCache = Σ.addFunction(function αY28V() {
        this.cachedChannel3Sample = this.channel3PCM[this.channel3lastSampleLookup] >> this.channel3patternType;
        this.channel3OutputLevelCache();
    }, Σ);
    GameBoyCore.prototype.channel3WriteRAM = Σ.addFunction(function αx1mC(address, data) {
        var Σ_αx1mC = new Σ.Scope(this, Σ, αx1mC, function () {
            return this.capture({
                address: address,
                data: data
            }, {});
        });
        if (this.channel3canPlay) {
            this.audioJIT();
        }
        this.memory[65328 | address] = data;
        address <<= 1;
        this.channel3PCM[address] = data >> 4;
        this.channel3PCM[address | 1] = data & 15;
    }, Σ);
    GameBoyCore.prototype.channel4UpdateCache = Σ.addFunction(function αGJuW() {
        this.cachedChannel4Sample = this.noiseSampleTable[this.channel4currentVolume | this.channel4lastSampleLookup];
        this.channel4OutputLevelCache();
    }, Σ);
    GameBoyCore.prototype.run = Σ.addFunction(function αJIK6() {
        if ((this.stopEmulator & 2) == 0) {
            if ((this.stopEmulator & 1) == 1) {
                if (!this.CPUStopped) {
                    this.stopEmulator = 0;
                    this.drewFrame = false;
                    this.audioUnderrunAdjustment();
                    this.clockUpdate();
                    if (!this.halt) {
                        this.executeIteration();
                    } else {
                        this.CPUTicks = 0;
                        this.calculateHALTPeriod();
                        if (this.halt) {
                            this.updateCoreFull();
                        } else {
                            this.executeIteration();
                        }
                    }
                    this.requestDraw();
                } else {
                    this.audioUnderrunAdjustment();
                    this.audioTicks += this.CPUCyclesTotal;
                    this.audioJIT();
                    this.stopEmulator |= 1;
                }
            } else {
                cout('Iterator restarted a faulted core.', 2);
                pause();
            }
        }
    }, Σ);
    GameBoyCore.prototype.executeIteration = Σ.addFunction(function αSM2h() {
        var Σ_αSM2h = new Σ.Scope(this, Σ, αSM2h, function () {
            return this.capture({}, {
                opcodeToExecute: opcodeToExecute,
                timedTicks: timedTicks
            });
        });
        var opcodeToExecute = 0;
        var timedTicks = 0;
        while (this.stopEmulator == 0) {
            switch (this.IRQEnableDelay) {
            case 1:
                this.IME = true;
                this.checkIRQMatching();
            case 2:
                --this.IRQEnableDelay;
            }
            if (this.IRQLineMatched > 0) {
                this.launchIRQ();
            }
            opcodeToExecute = this.memoryReader[this.programCounter](this, this.programCounter);
            this.programCounter = this.programCounter + 1 & 65535;
            if (this.skipPCIncrement) {
                this.programCounter = this.programCounter - 1 & 65535;
                this.skipPCIncrement = false;
            }
            this.CPUTicks = this.TICKTable[opcodeToExecute];
            this.OPCODE[opcodeToExecute](this);
            this.LCDTicks += this.CPUTicks >> this.doubleSpeedShifter;
            this.LCDCONTROL[this.actualScanLine](this);
            timedTicks = this.CPUTicks >> this.doubleSpeedShifter;
            this.audioTicks += timedTicks;
            this.emulatorTicks += timedTicks;
            this.DIVTicks += this.CPUTicks;
            if (this.TIMAEnabled) {
                this.timerTicks += this.CPUTicks;
                while (this.timerTicks >= this.TACClocker) {
                    this.timerTicks -= this.TACClocker;
                    if (++this.memory[65285] == 256) {
                        this.memory[65285] = this.memory[65286];
                        this.interruptsRequested |= 4;
                        this.checkIRQMatching();
                    }
                }
            }
            if (this.serialTimer > 0) {
                this.serialTimer -= this.CPUTicks;
                if (this.serialTimer <= 0) {
                    this.interruptsRequested |= 8;
                    this.checkIRQMatching();
                }
                this.serialShiftTimer -= this.CPUTicks;
                if (this.serialShiftTimer <= 0) {
                    this.serialShiftTimer = this.serialShiftTimerAllocated;
                    this.memory[65281] = this.memory[65281] << 1 & 254 | 1;
                }
            }
            if (this.emulatorTicks >= this.CPUCyclesTotal) {
                this.iterationEndRoutine();
            }
            this.instructions += 1;
            if (this.instructions > this.totalInstructions) {
                this.iterationEndRoutine();
                this.stopEmulator |= 2;
                checkFinalState();
            }
        }
    }, Σ);
    GameBoyCore.prototype.iterationEndRoutine = Σ.addFunction(function αmClv() {
        if ((this.stopEmulator & 1) == 0) {
            this.audioJIT();
            this.memory[65284] = this.memory[65284] + (this.DIVTicks >> 8) & 255;
            this.DIVTicks &= 255;
            this.stopEmulator |= 1;
            this.emulatorTicks -= this.CPUCyclesTotal;
            this.CPUCyclesTotalCurrent += this.CPUCyclesTotalRoundoff;
            this.recalculateIterationClockLimit();
        }
    }, Σ);
    GameBoyCore.prototype.handleSTOP = Σ.addFunction(function αoLDU() {
        this.CPUStopped = true;
        this.iterationEndRoutine();
        if (this.emulatorTicks < 0) {
            this.audioTicks -= this.emulatorTicks;
            this.audioJIT();
        }
    }, Σ);
    GameBoyCore.prototype.recalculateIterationClockLimit = Σ.addFunction(function αZpbC() {
        var Σ_αZpbC = new Σ.Scope(this, Σ, αZpbC, function () {
            return this.capture({}, { endModulus: endModulus });
        });
        var endModulus = this.CPUCyclesTotalCurrent % 4;
        this.CPUCyclesTotal = this.CPUCyclesTotalBase + this.CPUCyclesTotalCurrent - endModulus;
        this.CPUCyclesTotalCurrent = endModulus;
    }, Σ);
    GameBoyCore.prototype.scanLineMode2 = Σ.addFunction(function α9j1E() {
        if (this.STATTracker != 1) {
            if (this.mode2TriggerSTAT) {
                this.interruptsRequested |= 2;
                this.checkIRQMatching();
            }
            this.STATTracker = 1;
            this.modeSTAT = 2;
        }
    }, Σ);
    GameBoyCore.prototype.scanLineMode3 = Σ.addFunction(function αM4KO() {
        if (this.modeSTAT != 3) {
            if (this.STATTracker == 0 && this.mode2TriggerSTAT) {
                this.interruptsRequested |= 2;
                this.checkIRQMatching();
            }
            this.STATTracker = 1;
            this.modeSTAT = 3;
        }
    }, Σ);
    GameBoyCore.prototype.scanLineMode0 = Σ.addFunction(function αvNY6() {
        if (this.modeSTAT != 0) {
            if (this.STATTracker != 2) {
                if (this.STATTracker == 0) {
                    if (this.mode2TriggerSTAT) {
                        this.interruptsRequested |= 2;
                        this.checkIRQMatching();
                    }
                    this.modeSTAT = 3;
                }
                this.incrementScanLineQueue();
                this.updateSpriteCount(this.actualScanLine);
                this.STATTracker = 2;
            }
            if (this.LCDTicks >= this.spriteCount) {
                if (this.hdmaRunning) {
                    this.executeHDMA();
                }
                if (this.mode0TriggerSTAT) {
                    this.interruptsRequested |= 2;
                    this.checkIRQMatching();
                }
                this.STATTracker = 3;
                this.modeSTAT = 0;
            }
        }
    }, Σ);
    GameBoyCore.prototype.clocksUntilLYCMatch = Σ.addFunction(function α8OUy() {
        if (this.memory[65349] != 0) {
            if (this.memory[65349] > this.actualScanLine) {
                return 456 * (this.memory[65349] - this.actualScanLine);
            }
            return 456 * (154 - this.actualScanLine + this.memory[65349]);
        }
        return 456 * (this.actualScanLine == 153 && this.memory[65348] == 0 ? 154 : 153 - this.actualScanLine) + 8;
    }, Σ);
    GameBoyCore.prototype.clocksUntilMode0 = Σ.addFunction(function αVhy0() {
        switch (this.modeSTAT) {
        case 0:
            if (this.actualScanLine == 143) {
                this.updateSpriteCount(0);
                return this.spriteCount + 5016;
            }
            this.updateSpriteCount(this.actualScanLine + 1);
            return this.spriteCount + 456;
        case 2:
        case 3:
            this.updateSpriteCount(this.actualScanLine);
            return this.spriteCount;
        case 1:
            this.updateSpriteCount(0);
            return this.spriteCount + 456 * (154 - this.actualScanLine);
        }
    }, Σ);
    GameBoyCore.prototype.updateSpriteCount = Σ.addFunction(function αiFOB(line) {
        var Σ_αiFOB = new Σ.Scope(this, Σ, αiFOB, function () {
            return this.capture({ line: line }, {});
        });
        this.spriteCount = 252;
        if (this.cGBC && this.gfxSpriteShow) {
            var lineAdjusted = line + 16;
            var yoffset = 0;
            var yCap = this.gfxSpriteNormalHeight ? 8 : 16;
            for (var OAMAddress = 65024; OAMAddress < 65184 && this.spriteCount < 312; OAMAddress += 4) {
                yoffset = lineAdjusted - this.memory[OAMAddress];
                if (yoffset > -1 && yoffset < yCap) {
                    this.spriteCount += 6;
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.matchLYC = Σ.addFunction(function αhPdT() {
        if (this.memory[65348] == this.memory[65349]) {
            this.memory[65345] |= 4;
            if (this.LYCMatchTriggerSTAT) {
                this.interruptsRequested |= 2;
                this.checkIRQMatching();
            }
        } else {
            this.memory[65345] &= 123;
        }
    }, Σ);
    GameBoyCore.prototype.updateCore = Σ.addFunction(function αtWLk() {
        var Σ_αtWLk = new Σ.Scope(this, Σ, αtWLk, function () {
            return this.capture({}, { timedTicks: timedTicks });
        });
        this.LCDTicks += this.CPUTicks >> this.doubleSpeedShifter;
        this.LCDCONTROL[this.actualScanLine](this);
        var timedTicks = this.CPUTicks >> this.doubleSpeedShifter;
        this.audioTicks += timedTicks;
        this.emulatorTicks += timedTicks;
        this.DIVTicks += this.CPUTicks;
        if (this.TIMAEnabled) {
            this.timerTicks += this.CPUTicks;
            while (this.timerTicks >= this.TACClocker) {
                this.timerTicks -= this.TACClocker;
                if (++this.memory[65285] == 256) {
                    this.memory[65285] = this.memory[65286];
                    this.interruptsRequested |= 4;
                    this.checkIRQMatching();
                }
            }
        }
        if (this.serialTimer > 0) {
            this.serialTimer -= this.CPUTicks;
            if (this.serialTimer <= 0) {
                this.interruptsRequested |= 8;
                this.checkIRQMatching();
            }
            this.serialShiftTimer -= this.CPUTicks;
            if (this.serialShiftTimer <= 0) {
                this.serialShiftTimer = this.serialShiftTimerAllocated;
                this.memory[65281] = this.memory[65281] << 1 & 254 | 1;
            }
        }
    }, Σ);
    GameBoyCore.prototype.updateCoreFull = Σ.addFunction(function αGUWA() {
        this.updateCore();
        if (this.emulatorTicks >= this.CPUCyclesTotal) {
            this.iterationEndRoutine();
        }
    }, Σ);
    GameBoyCore.prototype.initializeLCDController = Σ.addFunction(function αpuSr() {
        var Σ_αpuSr = new Σ.Scope(this, Σ, αpuSr, function () {
            return this.capture({}, { line: line });
        });
        var line = 0;
        while (line < 154) {
            if (line < 143) {
                this.LINECONTROL[line] = Σ_αpuSr.addFunction(function αUGCg(parentObj) {
                    var Σ_αpuSr_αUGCg = new Σ.Scope(this, Σ_αpuSr, αUGCg, function () {
                        return this.capture({ parentObj: parentObj }, {});
                    });
                    if (parentObj.LCDTicks < 80) {
                        parentObj.scanLineMode2();
                    } else if (parentObj.LCDTicks < 252) {
                        parentObj.scanLineMode3();
                    } else if (parentObj.LCDTicks < 456) {
                        parentObj.scanLineMode0();
                    } else {
                        parentObj.LCDTicks -= 456;
                        if (parentObj.STATTracker != 3) {
                            if (parentObj.STATTracker != 2) {
                                if (parentObj.STATTracker == 0 && parentObj.mode2TriggerSTAT) {
                                    parentObj.interruptsRequested |= 2;
                                }
                                parentObj.incrementScanLineQueue();
                            }
                            if (parentObj.hdmaRunning) {
                                parentObj.executeHDMA();
                            }
                            if (parentObj.mode0TriggerSTAT) {
                                parentObj.interruptsRequested |= 2;
                            }
                        }
                        parentObj.actualScanLine = ++parentObj.memory[65348];
                        if (parentObj.actualScanLine == parentObj.memory[65349]) {
                            parentObj.memory[65345] |= 4;
                            if (parentObj.LYCMatchTriggerSTAT) {
                                parentObj.interruptsRequested |= 2;
                            }
                        } else {
                            parentObj.memory[65345] &= 123;
                        }
                        parentObj.checkIRQMatching();
                        parentObj.STATTracker = 0;
                        parentObj.modeSTAT = 2;
                        parentObj.LINECONTROL[parentObj.actualScanLine](parentObj);
                    }
                }, Σ_αpuSr);
            } else if (line == 143) {
                this.LINECONTROL[143] = Σ_αpuSr.addFunction(function αhoJp(parentObj) {
                    var Σ_αpuSr_αhoJp = new Σ.Scope(this, Σ_αpuSr, αhoJp, function () {
                        return this.capture({ parentObj: parentObj }, {});
                    });
                    if (parentObj.LCDTicks < 80) {
                        parentObj.scanLineMode2();
                    } else if (parentObj.LCDTicks < 252) {
                        parentObj.scanLineMode3();
                    } else if (parentObj.LCDTicks < 456) {
                        parentObj.scanLineMode0();
                    } else {
                        parentObj.LCDTicks -= 456;
                        if (parentObj.STATTracker != 3) {
                            if (parentObj.STATTracker != 2) {
                                if (parentObj.STATTracker == 0 && parentObj.mode2TriggerSTAT) {
                                    parentObj.interruptsRequested |= 2;
                                }
                                parentObj.incrementScanLineQueue();
                            }
                            if (parentObj.hdmaRunning) {
                                parentObj.executeHDMA();
                            }
                            if (parentObj.mode0TriggerSTAT) {
                                parentObj.interruptsRequested |= 2;
                            }
                        }
                        parentObj.actualScanLine = parentObj.memory[65348] = 144;
                        if (parentObj.memory[65349] == 144) {
                            parentObj.memory[65345] |= 4;
                            if (parentObj.LYCMatchTriggerSTAT) {
                                parentObj.interruptsRequested |= 2;
                            }
                        } else {
                            parentObj.memory[65345] &= 123;
                        }
                        parentObj.STATTracker = 0;
                        parentObj.modeSTAT = 1;
                        parentObj.interruptsRequested |= parentObj.mode1TriggerSTAT ? 3 : 1;
                        parentObj.checkIRQMatching();
                        if (parentObj.drewBlank == 0) {
                            if (parentObj.totalLinesPassed < 144 || parentObj.totalLinesPassed == 144 && parentObj.midScanlineOffset > -1) {
                                parentObj.graphicsJITVBlank();
                                parentObj.prepareFrame();
                            }
                        } else {
                            --parentObj.drewBlank;
                        }
                        parentObj.LINECONTROL[144](parentObj);
                    }
                }, Σ_αpuSr);
            } else if (line < 153) {
                this.LINECONTROL[line] = Σ_αpuSr.addFunction(function αwsc9(parentObj) {
                    var Σ_αpuSr_αwsc9 = new Σ.Scope(this, Σ_αpuSr, αwsc9, function () {
                        return this.capture({ parentObj: parentObj }, {});
                    });
                    if (parentObj.LCDTicks >= 456) {
                        parentObj.LCDTicks -= 456;
                        parentObj.actualScanLine = ++parentObj.memory[65348];
                        if (parentObj.actualScanLine == parentObj.memory[65349]) {
                            parentObj.memory[65345] |= 4;
                            if (parentObj.LYCMatchTriggerSTAT) {
                                parentObj.interruptsRequested |= 2;
                                parentObj.checkIRQMatching();
                            }
                        } else {
                            parentObj.memory[65345] &= 123;
                        }
                        parentObj.LINECONTROL[parentObj.actualScanLine](parentObj);
                    }
                }, Σ_αpuSr);
            } else {
                this.LINECONTROL[153] = Σ_αpuSr.addFunction(function αGgJD(parentObj) {
                    var Σ_αpuSr_αGgJD = new Σ.Scope(this, Σ_αpuSr, αGgJD, function () {
                        return this.capture({ parentObj: parentObj }, {});
                    });
                    if (parentObj.LCDTicks >= 8) {
                        if (parentObj.STATTracker != 4 && parentObj.memory[65348] == 153) {
                            parentObj.memory[65348] = 0;
                            if (parentObj.memory[65349] == 0) {
                                parentObj.memory[65345] |= 4;
                                if (parentObj.LYCMatchTriggerSTAT) {
                                    parentObj.interruptsRequested |= 2;
                                    parentObj.checkIRQMatching();
                                }
                            } else {
                                parentObj.memory[65345] &= 123;
                            }
                            parentObj.STATTracker = 4;
                        }
                        if (parentObj.LCDTicks >= 456) {
                            parentObj.LCDTicks -= 456;
                            parentObj.STATTracker = parentObj.actualScanLine = 0;
                            parentObj.LINECONTROL[0](parentObj);
                        }
                    }
                }, Σ_αpuSr);
            }
            ++line;
        }
    }, Σ);
    GameBoyCore.prototype.DisplayShowOff = Σ.addFunction(function αbaWA() {
        if (this.drewBlank == 0) {
            this.clearFrameBuffer();
            this.drewFrame = true;
        }
        this.drewBlank = 2;
    }, Σ);
    GameBoyCore.prototype.executeHDMA = Σ.addFunction(function α58ei() {
        this.DMAWrite(1);
        if (this.halt) {
            if (this.LCDTicks - this.spriteCount < (4 >> this.doubleSpeedShifter | 32)) {
                this.CPUTicks = 4 + (32 + this.spriteCount << this.doubleSpeedShifter);
                this.LCDTicks = this.spriteCount + (4 >> this.doubleSpeedShifter | 32);
            }
        } else {
            this.LCDTicks += 4 >> this.doubleSpeedShifter | 32;
        }
        if (this.memory[65365] == 0) {
            this.hdmaRunning = false;
            this.memory[65365] = 255;
        } else {
            --this.memory[65365];
        }
    }, Σ);
    GameBoyCore.prototype.clockUpdate = Σ.addFunction(function αlJ8O() {
        var Σ_αlJ8O = new Σ.Scope(this, Σ, αlJ8O, function () {
            return this.capture({}, {});
        });
        if (this.cTIMER) {
            var dateObj = new_Date();
            var newTime = dateObj.getTime();
            var timeElapsed = newTime - this.lastIteration;
            this.lastIteration = newTime;
            if (this.cTIMER && !this.RTCHALT) {
                this.RTCSeconds += timeElapsed / 1000;
                while (this.RTCSeconds >= 60) {
                    this.RTCSeconds -= 60;
                    ++this.RTCMinutes;
                    if (this.RTCMinutes >= 60) {
                        this.RTCMinutes -= 60;
                        ++this.RTCHours;
                        if (this.RTCHours >= 24) {
                            this.RTCHours -= 24;
                            ++this.RTCDays;
                            if (this.RTCDays >= 512) {
                                this.RTCDays -= 512;
                                this.RTCDayOverFlow = true;
                            }
                        }
                    }
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.prepareFrame = Σ.addFunction(function αuWiu() {
        this.swizzleFrameBuffer();
        this.drewFrame = true;
    }, Σ);
    GameBoyCore.prototype.requestDraw = Σ.addFunction(function α34dh() {
        if (this.drewFrame) {
            this.dispatchDraw();
        }
    }, Σ);
    GameBoyCore.prototype.dispatchDraw = Σ.addFunction(function αZt1v() {
        var Σ_αZt1v = new Σ.Scope(this, Σ, αZt1v, function () {
            return this.capture({}, { canvasRGBALength: canvasRGBALength });
        });
        var canvasRGBALength = this.offscreenRGBCount;
        if (canvasRGBALength > 0) {
            var frameBuffer = canvasRGBALength == 92160 ? this.swizzledFrame : this.resizeFrameBuffer();
            var canvasData = this.canvasBuffer.data;
            var bufferIndex = 0;
            for (var canvasIndex = 0; canvasIndex < canvasRGBALength; ++canvasIndex) {
                canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
                canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
                canvasData[canvasIndex++] = frameBuffer[bufferIndex++];
            }
            this.graphicsBlit();
        }
    }, Σ);
    GameBoyCore.prototype.swizzleFrameBuffer = Σ.addFunction(function αBMH6() {
        var Σ_αBMH6 = new Σ.Scope(this, Σ, αBMH6, function () {
            return this.capture({}, {
                frameBuffer: frameBuffer,
                swizzledFrame: swizzledFrame,
                bufferIndex: bufferIndex
            });
        });
        var frameBuffer = this.frameBuffer;
        var swizzledFrame = this.swizzledFrame;
        var bufferIndex = 0;
        for (var canvasIndex = 0; canvasIndex < 69120;) {
            swizzledFrame[canvasIndex++] = frameBuffer[bufferIndex] >> 16 & 255;
            swizzledFrame[canvasIndex++] = frameBuffer[bufferIndex] >> 8 & 255;
            swizzledFrame[canvasIndex++] = frameBuffer[bufferIndex++] & 255;
        }
    }, Σ);
    GameBoyCore.prototype.clearFrameBuffer = Σ.addFunction(function αGPNU() {
        var Σ_αGPNU = new Σ.Scope(this, Σ, αGPNU, function () {
            return this.capture({}, {
                bufferIndex: bufferIndex,
                frameBuffer: frameBuffer
            });
        });
        var bufferIndex = 0;
        var frameBuffer = this.swizzledFrame;
        if (this.cGBC || this.colorizedGBPalettes) {
            while (bufferIndex < 69120) {
                frameBuffer[bufferIndex++] = 248;
            }
        } else {
            while (bufferIndex < 69120) {
                frameBuffer[bufferIndex++] = 239;
                frameBuffer[bufferIndex++] = 255;
                frameBuffer[bufferIndex++] = 222;
            }
        }
    }, Σ);
    GameBoyCore.prototype.resizeFrameBuffer = Σ.addFunction(function αi3KM() {
        return this.resizer.resize(this.swizzledFrame);
    }, Σ);
    GameBoyCore.prototype.compileResizeFrameBufferFunction = Σ.addFunction(function αLwpz() {
        if (this.offscreenRGBCount > 0) {
            this.resizer = new Resize(160, 144, this.offscreenWidth, this.offscreenHeight, false, true);
        }
    }, Σ);
    GameBoyCore.prototype.renderScanLine = Σ.addFunction(function αcv20(scanlineToRender) {
        var Σ_αcv20 = new Σ.Scope(this, Σ, αcv20, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {});
        });
        this.pixelStart = scanlineToRender * 160;
        if (this.bgEnabled) {
            this.pixelEnd = 160;
            this.BGLayerRender(scanlineToRender);
            this.WindowLayerRender(scanlineToRender);
        } else {
            var pixelLine = (scanlineToRender + 1) * 160;
            var defaultColor = this.cGBC || this.colorizedGBPalettes ? 16316664 : 15728606;
            for (var pixelPosition = scanlineToRender * 160 + this.currentX; pixelPosition < pixelLine; pixelPosition++) {
                this.frameBuffer[pixelPosition] = defaultColor;
            }
        }
        this.SpriteLayerRender(scanlineToRender);
        this.currentX = 0;
        this.midScanlineOffset = -1;
    }, Σ);
    GameBoyCore.prototype.renderMidScanLine = Σ.addFunction(function α9OPz() {
        var Σ_α9OPz = new Σ.Scope(this, Σ, α9OPz, function () {
            return this.capture({}, {});
        });
        if (this.actualScanLine < 144 && this.modeSTAT == 3) {
            if (this.midScanlineOffset == -1) {
                this.midScanlineOffset = this.backgroundX & 7;
            }
            if (this.LCDTicks >= 82) {
                this.pixelEnd = this.LCDTicks - 74;
                this.pixelEnd = Math.min(this.pixelEnd - this.midScanlineOffset - this.pixelEnd % 8, 160);
                if (this.bgEnabled) {
                    this.pixelStart = this.lastUnrenderedLine * 160;
                    this.BGLayerRender(this.lastUnrenderedLine);
                    this.WindowLayerRender(this.lastUnrenderedLine);
                } else {
                    var pixelLine = this.lastUnrenderedLine * 160 + this.pixelEnd;
                    var defaultColor = this.cGBC || this.colorizedGBPalettes ? 16316664 : 15728606;
                    for (var pixelPosition = this.lastUnrenderedLine * 160 + this.currentX; pixelPosition < pixelLine; pixelPosition++) {
                        this.frameBuffer[pixelPosition] = defaultColor;
                    }
                }
                this.currentX = this.pixelEnd;
            }
        }
    }, Σ);
    GameBoyCore.prototype.initializeModeSpecificArrays = Σ.addFunction(function αjneb() {
        this.LCDCONTROL = this.LCDisOn ? this.LINECONTROL : this.DISPLAYOFFCONTROL;
        if (this.cGBC) {
            this.gbcOBJRawPalette = this.getTypedArray(64, 0, 'uint8');
            this.gbcBGRawPalette = this.getTypedArray(64, 0, 'uint8');
            this.gbcOBJPalette = this.getTypedArray(32, 16777216, 'int32');
            this.gbcBGPalette = this.getTypedArray(64, 0, 'int32');
            this.BGCHRBank2 = this.getTypedArray(2048, 0, 'uint8');
            this.BGCHRCurrentBank = this.currVRAMBank > 0 ? this.BGCHRBank2 : this.BGCHRBank1;
            this.tileCache = this.generateCacheArray(3968);
        } else {
            this.gbOBJPalette = this.getTypedArray(8, 0, 'int32');
            this.gbBGPalette = this.getTypedArray(4, 0, 'int32');
            this.BGPalette = this.gbBGPalette;
            this.OBJPalette = this.gbOBJPalette;
            this.tileCache = this.generateCacheArray(1792);
            this.sortBuffer = this.getTypedArray(256, 0, 'uint8');
            this.OAMAddressCache = this.getTypedArray(10, 0, 'int32');
        }
        this.renderPathBuild();
    }, Σ);
    GameBoyCore.prototype.GBCtoGBModeAdjust = Σ.addFunction(function αdy4g() {
        cout('Stepping down from GBC mode.', 0);
        this.VRAM = this.GBCMemory = this.BGCHRCurrentBank = this.BGCHRBank2 = null;
        this.tileCache.length = 1792;
        if (settings[4]) {
            this.gbBGColorizedPalette = this.getTypedArray(4, 0, 'int32');
            this.gbOBJColorizedPalette = this.getTypedArray(8, 0, 'int32');
            this.cachedBGPaletteConversion = this.getTypedArray(4, 0, 'int32');
            this.cachedOBJPaletteConversion = this.getTypedArray(8, 0, 'int32');
            this.BGPalette = this.gbBGColorizedPalette;
            this.OBJPalette = this.gbOBJColorizedPalette;
            this.gbOBJPalette = this.gbBGPalette = null;
            this.getGBCColor();
        } else {
            this.gbOBJPalette = this.getTypedArray(8, 0, 'int32');
            this.gbBGPalette = this.getTypedArray(4, 0, 'int32');
            this.BGPalette = this.gbBGPalette;
            this.OBJPalette = this.gbOBJPalette;
        }
        this.sortBuffer = this.getTypedArray(256, 0, 'uint8');
        this.OAMAddressCache = this.getTypedArray(10, 0, 'int32');
        this.renderPathBuild();
        this.memoryReadJumpCompile();
        this.memoryWriteJumpCompile();
    }, Σ);
    GameBoyCore.prototype.renderPathBuild = Σ.addFunction(function αNFM5() {
        if (!this.cGBC) {
            this.BGLayerRender = this.BGGBLayerRender;
            this.WindowLayerRender = this.WindowGBLayerRender;
            this.SpriteLayerRender = this.SpriteGBLayerRender;
        } else {
            this.priorityFlaggingPathRebuild();
            this.SpriteLayerRender = this.SpriteGBCLayerRender;
        }
    }, Σ);
    GameBoyCore.prototype.priorityFlaggingPathRebuild = Σ.addFunction(function αAXTS() {
        if (this.BGPriorityEnabled) {
            this.BGLayerRender = this.BGGBCLayerRender;
            this.WindowLayerRender = this.WindowGBCLayerRender;
        } else {
            this.BGLayerRender = this.BGGBCLayerRenderNoPriorityFlagging;
            this.WindowLayerRender = this.WindowGBCLayerRenderNoPriorityFlagging;
        }
    }, Σ);
    GameBoyCore.prototype.initializeReferencesFromSaveState = Σ.addFunction(function α8Dze() {
        var Σ_α8Dze = new Σ.Scope(this, Σ, α8Dze, function () {
            return this.capture({}, { tileIndex: tileIndex });
        });
        this.LCDCONTROL = this.LCDisOn ? this.LINECONTROL : this.DISPLAYOFFCONTROL;
        var tileIndex = 0;
        if (!this.cGBC) {
            if (this.colorizedGBPalettes) {
                this.BGPalette = this.gbBGColorizedPalette;
                this.OBJPalette = this.gbOBJColorizedPalette;
                this.updateGBBGPalette = this.updateGBColorizedBGPalette;
                this.updateGBOBJPalette = this.updateGBColorizedOBJPalette;
            } else {
                this.BGPalette = this.gbBGPalette;
                this.OBJPalette = this.gbOBJPalette;
            }
            this.tileCache = this.generateCacheArray(1792);
            for (tileIndex = 32768; tileIndex < 36864; tileIndex += 2) {
                this.generateGBOAMTileLine(tileIndex);
            }
            for (tileIndex = 36864; tileIndex < 38912; tileIndex += 2) {
                this.generateGBTileLine(tileIndex);
            }
            this.sortBuffer = this.getTypedArray(256, 0, 'uint8');
            this.OAMAddressCache = this.getTypedArray(10, 0, 'int32');
        } else {
            this.BGCHRCurrentBank = this.currVRAMBank > 0 ? this.BGCHRBank2 : this.BGCHRBank1;
            this.tileCache = this.generateCacheArray(3968);
            for (; tileIndex < 6144; tileIndex += 16) {
                this.generateGBCTileBank1(tileIndex);
                this.generateGBCTileBank2(tileIndex);
            }
        }
        this.renderPathBuild();
    }, Σ);
    GameBoyCore.prototype.RGBTint = Σ.addFunction(function αHz77(value) {
        var Σ_αHz77 = new Σ.Scope(this, Σ, αHz77, function () {
            return this.capture({ value: value }, {
                r: r,
                g: g,
                b: b
            });
        });
        var r = value & 31;
        var g = value >> 5 & 31;
        var b = value >> 10 & 31;
        return r * 13 + g * 2 + b >> 1 << 16 | g * 3 + b << 9 | r * 3 + g * 2 + b * 11 >> 1;
    }, Σ);
    GameBoyCore.prototype.getGBCColor = Σ.addFunction(function α70yp() {
        var Σ_α70yp = new Σ.Scope(this, Σ, α70yp, function () {
            return this.capture({}, {});
        });
        for (var counter = 0; counter < 4; counter++) {
            var adjustedIndex = counter << 1;
            this.cachedBGPaletteConversion[counter] = this.RGBTint(this.gbcBGRawPalette[adjustedIndex | 1] << 8 | this.gbcBGRawPalette[adjustedIndex]);
            this.cachedOBJPaletteConversion[counter] = this.RGBTint(this.gbcOBJRawPalette[adjustedIndex | 1] << 8 | this.gbcOBJRawPalette[adjustedIndex]);
        }
        for (counter = 4; counter < 8; counter++) {
            adjustedIndex = counter << 1;
            this.cachedOBJPaletteConversion[counter] = this.RGBTint(this.gbcOBJRawPalette[adjustedIndex | 1] << 8 | this.gbcOBJRawPalette[adjustedIndex]);
        }
        this.updateGBBGPalette = this.updateGBColorizedBGPalette;
        this.updateGBOBJPalette = this.updateGBColorizedOBJPalette;
        this.updateGBBGPalette(this.memory[65351]);
        this.updateGBOBJPalette(0, this.memory[65352]);
        this.updateGBOBJPalette(1, this.memory[65353]);
        this.colorizedGBPalettes = true;
    }, Σ);
    GameBoyCore.prototype.updateGBRegularBGPalette = Σ.addFunction(function α9JrT(data) {
        var Σ_α9JrT = new Σ.Scope(this, Σ, α9JrT, function () {
            return this.capture({ data: data }, {});
        });
        this.gbBGPalette[0] = this.colors[data & 3] | 33554432;
        this.gbBGPalette[1] = this.colors[data >> 2 & 3];
        this.gbBGPalette[2] = this.colors[data >> 4 & 3];
        this.gbBGPalette[3] = this.colors[data >> 6];
    }, Σ);
    GameBoyCore.prototype.updateGBColorizedBGPalette = Σ.addFunction(function αS1e8(data) {
        var Σ_αS1e8 = new Σ.Scope(this, Σ, αS1e8, function () {
            return this.capture({ data: data }, {});
        });
        this.gbBGColorizedPalette[0] = this.cachedBGPaletteConversion[data & 3] | 33554432;
        this.gbBGColorizedPalette[1] = this.cachedBGPaletteConversion[data >> 2 & 3];
        this.gbBGColorizedPalette[2] = this.cachedBGPaletteConversion[data >> 4 & 3];
        this.gbBGColorizedPalette[3] = this.cachedBGPaletteConversion[data >> 6];
    }, Σ);
    GameBoyCore.prototype.updateGBRegularOBJPalette = Σ.addFunction(function αqpSN(index, data) {
        var Σ_αqpSN = new Σ.Scope(this, Σ, αqpSN, function () {
            return this.capture({
                index: index,
                data: data
            }, {});
        });
        this.gbOBJPalette[index | 1] = this.colors[data >> 2 & 3];
        this.gbOBJPalette[index | 2] = this.colors[data >> 4 & 3];
        this.gbOBJPalette[index | 3] = this.colors[data >> 6];
    }, Σ);
    GameBoyCore.prototype.updateGBColorizedOBJPalette = Σ.addFunction(function αEiX0(index, data) {
        var Σ_αEiX0 = new Σ.Scope(this, Σ, αEiX0, function () {
            return this.capture({
                index: index,
                data: data
            }, {});
        });
        this.gbOBJColorizedPalette[index | 1] = this.cachedOBJPaletteConversion[index | data >> 2 & 3];
        this.gbOBJColorizedPalette[index | 2] = this.cachedOBJPaletteConversion[index | data >> 4 & 3];
        this.gbOBJColorizedPalette[index | 3] = this.cachedOBJPaletteConversion[index | data >> 6];
    }, Σ);
    GameBoyCore.prototype.updateGBCBGPalette = Σ.addFunction(function αnJeM(index, data) {
        var Σ_αnJeM = new Σ.Scope(this, Σ, αnJeM, function () {
            return this.capture({
                index: index,
                data: data
            }, {});
        });
        if (this.gbcBGRawPalette[index] != data) {
            this.midScanLineJIT();
            this.gbcBGRawPalette[index] = data;
            if ((index & 6) == 0) {
                data = 33554432 | this.RGBTint(this.gbcBGRawPalette[index | 1] << 8 | this.gbcBGRawPalette[index & 62]);
                index >>= 1;
                this.gbcBGPalette[index] = data;
                this.gbcBGPalette[32 | index] = 16777216 | data;
            } else {
                data = this.RGBTint(this.gbcBGRawPalette[index | 1] << 8 | this.gbcBGRawPalette[index & 62]);
                index >>= 1;
                this.gbcBGPalette[index] = data;
                this.gbcBGPalette[32 | index] = 16777216 | data;
            }
        }
    }, Σ);
    GameBoyCore.prototype.updateGBCOBJPalette = Σ.addFunction(function αM5OI(index, data) {
        var Σ_αM5OI = new Σ.Scope(this, Σ, αM5OI, function () {
            return this.capture({
                index: index,
                data: data
            }, {});
        });
        if (this.gbcOBJRawPalette[index] != data) {
            this.gbcOBJRawPalette[index] = data;
            if ((index & 6) > 0) {
                this.midScanLineJIT();
                this.gbcOBJPalette[index >> 1] = 16777216 | this.RGBTint(this.gbcOBJRawPalette[index | 1] << 8 | this.gbcOBJRawPalette[index & 62]);
            }
        }
    }, Σ);
    GameBoyCore.prototype.BGGBLayerRender = Σ.addFunction(function αo3PH(scanlineToRender) {
        var Σ_αo3PH = new Σ.Scope(this, Σ, αo3PH, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {
                scrollYAdjusted: scrollYAdjusted,
                tileYLine: tileYLine,
                tileYDown: tileYDown,
                scrollXAdjusted: scrollXAdjusted,
                pixelPosition: pixelPosition,
                pixelPositionEnd: pixelPositionEnd,
                tileNumber: tileNumber,
                chrCode: chrCode,
                tile: tile,
                scrollXAdjustedAligned: scrollXAdjustedAligned
            });
        });
        var scrollYAdjusted = this.backgroundY + scanlineToRender & 255;
        var tileYLine = (scrollYAdjusted & 7) << 3;
        var tileYDown = this.gfxBackgroundCHRBankPosition | (scrollYAdjusted & 248) << 2;
        var scrollXAdjusted = this.backgroundX + this.currentX & 255;
        var pixelPosition = this.pixelStart + this.currentX;
        var pixelPositionEnd = this.pixelStart + (this.gfxWindowDisplay && scanlineToRender - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd);
        var tileNumber = tileYDown + (scrollXAdjusted >> 3);
        var chrCode = this.BGCHRBank1[tileNumber];
        if (chrCode < this.gfxBackgroundBankOffset) {
            chrCode |= 256;
        }
        var tile = this.tileCache[chrCode];
        for (var texel = scrollXAdjusted & 7; texel < 8 && pixelPosition < pixelPositionEnd && scrollXAdjusted < 256; ++scrollXAdjusted) {
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[tileYLine | texel++]];
        }
        var scrollXAdjustedAligned = Math.min(pixelPositionEnd - pixelPosition, 256 - scrollXAdjusted) >> 3;
        scrollXAdjusted += scrollXAdjustedAligned << 3;
        scrollXAdjustedAligned += tileNumber;
        while (tileNumber < scrollXAdjustedAligned) {
            chrCode = this.BGCHRBank1[++tileNumber];
            if (chrCode < this.gfxBackgroundBankOffset) {
                chrCode |= 256;
            }
            tile = this.tileCache[chrCode];
            texel = tileYLine;
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel]];
        }
        if (pixelPosition < pixelPositionEnd) {
            if (scrollXAdjusted < 256) {
                chrCode = this.BGCHRBank1[++tileNumber];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                tile = this.tileCache[chrCode];
                for (texel = tileYLine - 1; pixelPosition < pixelPositionEnd && scrollXAdjusted < 256; ++scrollXAdjusted) {
                    this.frameBuffer[pixelPosition++] = this.BGPalette[tile[++texel]];
                }
            }
            scrollXAdjustedAligned = (pixelPositionEnd - pixelPosition >> 3) + tileYDown;
            while (tileYDown < scrollXAdjustedAligned) {
                chrCode = this.BGCHRBank1[tileYDown++];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                tile = this.tileCache[chrCode];
                texel = tileYLine;
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel]];
            }
            if (pixelPosition < pixelPositionEnd) {
                chrCode = this.BGCHRBank1[tileYDown];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                tile = this.tileCache[chrCode];
                switch (pixelPositionEnd - pixelPosition) {
                case 7:
                    this.frameBuffer[pixelPosition + 6] = this.BGPalette[tile[tileYLine | 6]];
                case 6:
                    this.frameBuffer[pixelPosition + 5] = this.BGPalette[tile[tileYLine | 5]];
                case 5:
                    this.frameBuffer[pixelPosition + 4] = this.BGPalette[tile[tileYLine | 4]];
                case 4:
                    this.frameBuffer[pixelPosition + 3] = this.BGPalette[tile[tileYLine | 3]];
                case 3:
                    this.frameBuffer[pixelPosition + 2] = this.BGPalette[tile[tileYLine | 2]];
                case 2:
                    this.frameBuffer[pixelPosition + 1] = this.BGPalette[tile[tileYLine | 1]];
                case 1:
                    this.frameBuffer[pixelPosition] = this.BGPalette[tile[tileYLine]];
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.BGGBCLayerRender = Σ.addFunction(function αdD2f(scanlineToRender) {
        var Σ_αdD2f = new Σ.Scope(this, Σ, αdD2f, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {
                scrollYAdjusted: scrollYAdjusted,
                tileYLine: tileYLine,
                tileYDown: tileYDown,
                scrollXAdjusted: scrollXAdjusted,
                pixelPosition: pixelPosition,
                pixelPositionEnd: pixelPositionEnd,
                tileNumber: tileNumber,
                chrCode: chrCode,
                attrCode: attrCode,
                tile: tile,
                palette: palette,
                scrollXAdjustedAligned: scrollXAdjustedAligned
            });
        });
        var scrollYAdjusted = this.backgroundY + scanlineToRender & 255;
        var tileYLine = (scrollYAdjusted & 7) << 3;
        var tileYDown = this.gfxBackgroundCHRBankPosition | (scrollYAdjusted & 248) << 2;
        var scrollXAdjusted = this.backgroundX + this.currentX & 255;
        var pixelPosition = this.pixelStart + this.currentX;
        var pixelPositionEnd = this.pixelStart + (this.gfxWindowDisplay && scanlineToRender - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd);
        var tileNumber = tileYDown + (scrollXAdjusted >> 3);
        var chrCode = this.BGCHRBank1[tileNumber];
        if (chrCode < this.gfxBackgroundBankOffset) {
            chrCode |= 256;
        }
        var attrCode = this.BGCHRBank2[tileNumber];
        var tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
        var palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
        for (var texel = scrollXAdjusted & 7; texel < 8 && pixelPosition < pixelPositionEnd && scrollXAdjusted < 256; ++scrollXAdjusted) {
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[tileYLine | texel++]];
        }
        var scrollXAdjustedAligned = Math.min(pixelPositionEnd - pixelPosition, 256 - scrollXAdjusted) >> 3;
        scrollXAdjusted += scrollXAdjustedAligned << 3;
        scrollXAdjustedAligned += tileNumber;
        while (tileNumber < scrollXAdjustedAligned) {
            chrCode = this.BGCHRBank1[++tileNumber];
            if (chrCode < this.gfxBackgroundBankOffset) {
                chrCode |= 256;
            }
            attrCode = this.BGCHRBank2[tileNumber];
            tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
            palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
            texel = tileYLine;
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel]];
        }
        if (pixelPosition < pixelPositionEnd) {
            if (scrollXAdjusted < 256) {
                chrCode = this.BGCHRBank1[++tileNumber];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                attrCode = this.BGCHRBank2[tileNumber];
                tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
                for (texel = tileYLine - 1; pixelPosition < pixelPositionEnd && scrollXAdjusted < 256; ++scrollXAdjusted) {
                    this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[++texel]];
                }
            }
            scrollXAdjustedAligned = (pixelPositionEnd - pixelPosition >> 3) + tileYDown;
            while (tileYDown < scrollXAdjustedAligned) {
                chrCode = this.BGCHRBank1[tileYDown];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                attrCode = this.BGCHRBank2[tileYDown++];
                tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
                texel = tileYLine;
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel]];
            }
            if (pixelPosition < pixelPositionEnd) {
                chrCode = this.BGCHRBank1[tileYDown];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                attrCode = this.BGCHRBank2[tileYDown];
                tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
                switch (pixelPositionEnd - pixelPosition) {
                case 7:
                    this.frameBuffer[pixelPosition + 6] = this.gbcBGPalette[palette | tile[tileYLine | 6]];
                case 6:
                    this.frameBuffer[pixelPosition + 5] = this.gbcBGPalette[palette | tile[tileYLine | 5]];
                case 5:
                    this.frameBuffer[pixelPosition + 4] = this.gbcBGPalette[palette | tile[tileYLine | 4]];
                case 4:
                    this.frameBuffer[pixelPosition + 3] = this.gbcBGPalette[palette | tile[tileYLine | 3]];
                case 3:
                    this.frameBuffer[pixelPosition + 2] = this.gbcBGPalette[palette | tile[tileYLine | 2]];
                case 2:
                    this.frameBuffer[pixelPosition + 1] = this.gbcBGPalette[palette | tile[tileYLine | 1]];
                case 1:
                    this.frameBuffer[pixelPosition] = this.gbcBGPalette[palette | tile[tileYLine]];
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.BGGBCLayerRenderNoPriorityFlagging = Σ.addFunction(function αgXBl(scanlineToRender) {
        var Σ_αgXBl = new Σ.Scope(this, Σ, αgXBl, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {
                scrollYAdjusted: scrollYAdjusted,
                tileYLine: tileYLine,
                tileYDown: tileYDown,
                scrollXAdjusted: scrollXAdjusted,
                pixelPosition: pixelPosition,
                pixelPositionEnd: pixelPositionEnd,
                tileNumber: tileNumber,
                chrCode: chrCode,
                attrCode: attrCode,
                tile: tile,
                palette: palette,
                scrollXAdjustedAligned: scrollXAdjustedAligned
            });
        });
        var scrollYAdjusted = this.backgroundY + scanlineToRender & 255;
        var tileYLine = (scrollYAdjusted & 7) << 3;
        var tileYDown = this.gfxBackgroundCHRBankPosition | (scrollYAdjusted & 248) << 2;
        var scrollXAdjusted = this.backgroundX + this.currentX & 255;
        var pixelPosition = this.pixelStart + this.currentX;
        var pixelPositionEnd = this.pixelStart + (this.gfxWindowDisplay && scanlineToRender - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd);
        var tileNumber = tileYDown + (scrollXAdjusted >> 3);
        var chrCode = this.BGCHRBank1[tileNumber];
        if (chrCode < this.gfxBackgroundBankOffset) {
            chrCode |= 256;
        }
        var attrCode = this.BGCHRBank2[tileNumber];
        var tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
        var palette = (attrCode & 7) << 2;
        for (var texel = scrollXAdjusted & 7; texel < 8 && pixelPosition < pixelPositionEnd && scrollXAdjusted < 256; ++scrollXAdjusted) {
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[tileYLine | texel++]];
        }
        var scrollXAdjustedAligned = Math.min(pixelPositionEnd - pixelPosition, 256 - scrollXAdjusted) >> 3;
        scrollXAdjusted += scrollXAdjustedAligned << 3;
        scrollXAdjustedAligned += tileNumber;
        while (tileNumber < scrollXAdjustedAligned) {
            chrCode = this.BGCHRBank1[++tileNumber];
            if (chrCode < this.gfxBackgroundBankOffset) {
                chrCode |= 256;
            }
            attrCode = this.BGCHRBank2[tileNumber];
            tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
            palette = (attrCode & 7) << 2;
            texel = tileYLine;
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
            this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel]];
        }
        if (pixelPosition < pixelPositionEnd) {
            if (scrollXAdjusted < 256) {
                chrCode = this.BGCHRBank1[++tileNumber];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                attrCode = this.BGCHRBank2[tileNumber];
                tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                palette = (attrCode & 7) << 2;
                for (texel = tileYLine - 1; pixelPosition < pixelPositionEnd && scrollXAdjusted < 256; ++scrollXAdjusted) {
                    this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[++texel]];
                }
            }
            scrollXAdjustedAligned = (pixelPositionEnd - pixelPosition >> 3) + tileYDown;
            while (tileYDown < scrollXAdjustedAligned) {
                chrCode = this.BGCHRBank1[tileYDown];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                attrCode = this.BGCHRBank2[tileYDown++];
                tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                palette = (attrCode & 7) << 2;
                texel = tileYLine;
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel]];
            }
            if (pixelPosition < pixelPositionEnd) {
                chrCode = this.BGCHRBank1[tileYDown];
                if (chrCode < this.gfxBackgroundBankOffset) {
                    chrCode |= 256;
                }
                attrCode = this.BGCHRBank2[tileYDown];
                tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                palette = (attrCode & 7) << 2;
                switch (pixelPositionEnd - pixelPosition) {
                case 7:
                    this.frameBuffer[pixelPosition + 6] = this.gbcBGPalette[palette | tile[tileYLine | 6]];
                case 6:
                    this.frameBuffer[pixelPosition + 5] = this.gbcBGPalette[palette | tile[tileYLine | 5]];
                case 5:
                    this.frameBuffer[pixelPosition + 4] = this.gbcBGPalette[palette | tile[tileYLine | 4]];
                case 4:
                    this.frameBuffer[pixelPosition + 3] = this.gbcBGPalette[palette | tile[tileYLine | 3]];
                case 3:
                    this.frameBuffer[pixelPosition + 2] = this.gbcBGPalette[palette | tile[tileYLine | 2]];
                case 2:
                    this.frameBuffer[pixelPosition + 1] = this.gbcBGPalette[palette | tile[tileYLine | 1]];
                case 1:
                    this.frameBuffer[pixelPosition] = this.gbcBGPalette[palette | tile[tileYLine]];
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.WindowGBLayerRender = Σ.addFunction(function αbjV0(scanlineToRender) {
        var Σ_αbjV0 = new Σ.Scope(this, Σ, αbjV0, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {});
        });
        if (this.gfxWindowDisplay) {
            var scrollYAdjusted = scanlineToRender - this.windowY;
            if (scrollYAdjusted >= 0) {
                var scrollXRangeAdjusted = this.windowX > 0 ? this.windowX + this.currentX : this.currentX;
                var pixelPosition = this.pixelStart + scrollXRangeAdjusted;
                var pixelPositionEnd = this.pixelStart + this.pixelEnd;
                if (pixelPosition < pixelPositionEnd) {
                    var tileYLine = (scrollYAdjusted & 7) << 3;
                    var tileNumber = (this.gfxWindowCHRBankPosition | (scrollYAdjusted & 248) << 2) + (this.currentX >> 3);
                    var chrCode = this.BGCHRBank1[tileNumber];
                    if (chrCode < this.gfxBackgroundBankOffset) {
                        chrCode |= 256;
                    }
                    var tile = this.tileCache[chrCode];
                    var texel = scrollXRangeAdjusted - this.windowX & 7;
                    scrollXRangeAdjusted = Math.min(8, texel + pixelPositionEnd - pixelPosition);
                    while (texel < scrollXRangeAdjusted) {
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[tileYLine | texel++]];
                    }
                    scrollXRangeAdjusted = tileNumber + (pixelPositionEnd - pixelPosition >> 3);
                    while (tileNumber < scrollXRangeAdjusted) {
                        chrCode = this.BGCHRBank1[++tileNumber];
                        if (chrCode < this.gfxBackgroundBankOffset) {
                            chrCode |= 256;
                        }
                        tile = this.tileCache[chrCode];
                        texel = tileYLine;
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.BGPalette[tile[texel]];
                    }
                    if (pixelPosition < pixelPositionEnd) {
                        chrCode = this.BGCHRBank1[++tileNumber];
                        if (chrCode < this.gfxBackgroundBankOffset) {
                            chrCode |= 256;
                        }
                        tile = this.tileCache[chrCode];
                        switch (pixelPositionEnd - pixelPosition) {
                        case 7:
                            this.frameBuffer[pixelPosition + 6] = this.BGPalette[tile[tileYLine | 6]];
                        case 6:
                            this.frameBuffer[pixelPosition + 5] = this.BGPalette[tile[tileYLine | 5]];
                        case 5:
                            this.frameBuffer[pixelPosition + 4] = this.BGPalette[tile[tileYLine | 4]];
                        case 4:
                            this.frameBuffer[pixelPosition + 3] = this.BGPalette[tile[tileYLine | 3]];
                        case 3:
                            this.frameBuffer[pixelPosition + 2] = this.BGPalette[tile[tileYLine | 2]];
                        case 2:
                            this.frameBuffer[pixelPosition + 1] = this.BGPalette[tile[tileYLine | 1]];
                        case 1:
                            this.frameBuffer[pixelPosition] = this.BGPalette[tile[tileYLine]];
                        }
                    }
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.WindowGBCLayerRender = Σ.addFunction(function αhwTY(scanlineToRender) {
        var Σ_αhwTY = new Σ.Scope(this, Σ, αhwTY, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {});
        });
        if (this.gfxWindowDisplay) {
            var scrollYAdjusted = scanlineToRender - this.windowY;
            if (scrollYAdjusted >= 0) {
                var scrollXRangeAdjusted = this.windowX > 0 ? this.windowX + this.currentX : this.currentX;
                var pixelPosition = this.pixelStart + scrollXRangeAdjusted;
                var pixelPositionEnd = this.pixelStart + this.pixelEnd;
                if (pixelPosition < pixelPositionEnd) {
                    var tileYLine = (scrollYAdjusted & 7) << 3;
                    var tileNumber = (this.gfxWindowCHRBankPosition | (scrollYAdjusted & 248) << 2) + (this.currentX >> 3);
                    var chrCode = this.BGCHRBank1[tileNumber];
                    if (chrCode < this.gfxBackgroundBankOffset) {
                        chrCode |= 256;
                    }
                    var attrCode = this.BGCHRBank2[tileNumber];
                    var tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                    var palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
                    var texel = scrollXRangeAdjusted - this.windowX & 7;
                    scrollXRangeAdjusted = Math.min(8, texel + pixelPositionEnd - pixelPosition);
                    while (texel < scrollXRangeAdjusted) {
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[tileYLine | texel++]];
                    }
                    scrollXRangeAdjusted = tileNumber + (pixelPositionEnd - pixelPosition >> 3);
                    while (tileNumber < scrollXRangeAdjusted) {
                        chrCode = this.BGCHRBank1[++tileNumber];
                        if (chrCode < this.gfxBackgroundBankOffset) {
                            chrCode |= 256;
                        }
                        attrCode = this.BGCHRBank2[tileNumber];
                        tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                        palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
                        texel = tileYLine;
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel]];
                    }
                    if (pixelPosition < pixelPositionEnd) {
                        chrCode = this.BGCHRBank1[++tileNumber];
                        if (chrCode < this.gfxBackgroundBankOffset) {
                            chrCode |= 256;
                        }
                        attrCode = this.BGCHRBank2[tileNumber];
                        tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                        palette = (attrCode & 7) << 2 | (attrCode & 128) >> 2;
                        switch (pixelPositionEnd - pixelPosition) {
                        case 7:
                            this.frameBuffer[pixelPosition + 6] = this.gbcBGPalette[palette | tile[tileYLine | 6]];
                        case 6:
                            this.frameBuffer[pixelPosition + 5] = this.gbcBGPalette[palette | tile[tileYLine | 5]];
                        case 5:
                            this.frameBuffer[pixelPosition + 4] = this.gbcBGPalette[palette | tile[tileYLine | 4]];
                        case 4:
                            this.frameBuffer[pixelPosition + 3] = this.gbcBGPalette[palette | tile[tileYLine | 3]];
                        case 3:
                            this.frameBuffer[pixelPosition + 2] = this.gbcBGPalette[palette | tile[tileYLine | 2]];
                        case 2:
                            this.frameBuffer[pixelPosition + 1] = this.gbcBGPalette[palette | tile[tileYLine | 1]];
                        case 1:
                            this.frameBuffer[pixelPosition] = this.gbcBGPalette[palette | tile[tileYLine]];
                        }
                    }
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.WindowGBCLayerRenderNoPriorityFlagging = Σ.addFunction(function αfSbe(scanlineToRender) {
        var Σ_αfSbe = new Σ.Scope(this, Σ, αfSbe, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {});
        });
        if (this.gfxWindowDisplay) {
            var scrollYAdjusted = scanlineToRender - this.windowY;
            if (scrollYAdjusted >= 0) {
                var scrollXRangeAdjusted = this.windowX > 0 ? this.windowX + this.currentX : this.currentX;
                var pixelPosition = this.pixelStart + scrollXRangeAdjusted;
                var pixelPositionEnd = this.pixelStart + this.pixelEnd;
                if (pixelPosition < pixelPositionEnd) {
                    var tileYLine = (scrollYAdjusted & 7) << 3;
                    var tileNumber = (this.gfxWindowCHRBankPosition | (scrollYAdjusted & 248) << 2) + (this.currentX >> 3);
                    var chrCode = this.BGCHRBank1[tileNumber];
                    if (chrCode < this.gfxBackgroundBankOffset) {
                        chrCode |= 256;
                    }
                    var attrCode = this.BGCHRBank2[tileNumber];
                    var tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                    var palette = (attrCode & 7) << 2;
                    var texel = scrollXRangeAdjusted - this.windowX & 7;
                    scrollXRangeAdjusted = Math.min(8, texel + pixelPositionEnd - pixelPosition);
                    while (texel < scrollXRangeAdjusted) {
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[tileYLine | texel++]];
                    }
                    scrollXRangeAdjusted = tileNumber + (pixelPositionEnd - pixelPosition >> 3);
                    while (tileNumber < scrollXRangeAdjusted) {
                        chrCode = this.BGCHRBank1[++tileNumber];
                        if (chrCode < this.gfxBackgroundBankOffset) {
                            chrCode |= 256;
                        }
                        attrCode = this.BGCHRBank2[tileNumber];
                        tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                        palette = (attrCode & 7) << 2;
                        texel = tileYLine;
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel++]];
                        this.frameBuffer[pixelPosition++] = this.gbcBGPalette[palette | tile[texel]];
                    }
                    if (pixelPosition < pixelPositionEnd) {
                        chrCode = this.BGCHRBank1[++tileNumber];
                        if (chrCode < this.gfxBackgroundBankOffset) {
                            chrCode |= 256;
                        }
                        attrCode = this.BGCHRBank2[tileNumber];
                        tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | chrCode];
                        palette = (attrCode & 7) << 2;
                        switch (pixelPositionEnd - pixelPosition) {
                        case 7:
                            this.frameBuffer[pixelPosition + 6] = this.gbcBGPalette[palette | tile[tileYLine | 6]];
                        case 6:
                            this.frameBuffer[pixelPosition + 5] = this.gbcBGPalette[palette | tile[tileYLine | 5]];
                        case 5:
                            this.frameBuffer[pixelPosition + 4] = this.gbcBGPalette[palette | tile[tileYLine | 4]];
                        case 4:
                            this.frameBuffer[pixelPosition + 3] = this.gbcBGPalette[palette | tile[tileYLine | 3]];
                        case 3:
                            this.frameBuffer[pixelPosition + 2] = this.gbcBGPalette[palette | tile[tileYLine | 2]];
                        case 2:
                            this.frameBuffer[pixelPosition + 1] = this.gbcBGPalette[palette | tile[tileYLine | 1]];
                        case 1:
                            this.frameBuffer[pixelPosition] = this.gbcBGPalette[palette | tile[tileYLine]];
                        }
                    }
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.SpriteGBLayerRender = Σ.addFunction(function αJPdG(scanlineToRender) {
        var Σ_αJPdG = new Σ.Scope(this, Σ, αJPdG, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {});
        });
        if (this.gfxSpriteShow) {
            var lineAdjusted = scanlineToRender + 16;
            var OAMAddress = 65024;
            var yoffset = 0;
            var xcoord = 1;
            var xCoordStart = 0;
            var xCoordEnd = 0;
            var attrCode = 0;
            var palette = 0;
            var tile = null;
            var data = 0;
            var spriteCount = 0;
            var length = 0;
            var currentPixel = 0;
            var linePixel = 0;
            while (xcoord < 168) {
                this.sortBuffer[xcoord++] = 255;
            }
            if (this.gfxSpriteNormalHeight) {
                for (var length = this.findLowestSpriteDrawable(lineAdjusted, 7); spriteCount < length; ++spriteCount) {
                    OAMAddress = this.OAMAddressCache[spriteCount];
                    yoffset = lineAdjusted - this.memory[OAMAddress] << 3;
                    attrCode = this.memory[OAMAddress | 3];
                    palette = (attrCode & 16) >> 2;
                    tile = this.tileCache[(attrCode & 96) << 4 | this.memory[OAMAddress | 2]];
                    linePixel = xCoordStart = this.memory[OAMAddress | 1];
                    xCoordEnd = Math.min(168 - linePixel, 8);
                    xcoord = linePixel > 7 ? 0 : 8 - linePixel;
                    for (currentPixel = this.pixelStart + (linePixel > 8 ? linePixel - 8 : 0); xcoord < xCoordEnd; ++xcoord, ++currentPixel, ++linePixel) {
                        if (this.sortBuffer[linePixel] > xCoordStart) {
                            if (this.frameBuffer[currentPixel] >= 33554432) {
                                data = tile[yoffset | xcoord];
                                if (data > 0) {
                                    this.frameBuffer[currentPixel] = this.OBJPalette[palette | data];
                                    this.sortBuffer[linePixel] = xCoordStart;
                                }
                            } else if (this.frameBuffer[currentPixel] < 16777216) {
                                data = tile[yoffset | xcoord];
                                if (data > 0 && attrCode < 128) {
                                    this.frameBuffer[currentPixel] = this.OBJPalette[palette | data];
                                    this.sortBuffer[linePixel] = xCoordStart;
                                }
                            }
                        }
                    }
                }
            } else {
                for (var length = this.findLowestSpriteDrawable(lineAdjusted, 15); spriteCount < length; ++spriteCount) {
                    OAMAddress = this.OAMAddressCache[spriteCount];
                    yoffset = lineAdjusted - this.memory[OAMAddress] << 3;
                    attrCode = this.memory[OAMAddress | 3];
                    palette = (attrCode & 16) >> 2;
                    if ((attrCode & 64) == (64 & yoffset)) {
                        tile = this.tileCache[(attrCode & 96) << 4 | this.memory[OAMAddress | 2] & 254];
                    } else {
                        tile = this.tileCache[(attrCode & 96) << 4 | this.memory[OAMAddress | 2] | 1];
                    }
                    yoffset &= 63;
                    linePixel = xCoordStart = this.memory[OAMAddress | 1];
                    xCoordEnd = Math.min(168 - linePixel, 8);
                    xcoord = linePixel > 7 ? 0 : 8 - linePixel;
                    for (currentPixel = this.pixelStart + (linePixel > 8 ? linePixel - 8 : 0); xcoord < xCoordEnd; ++xcoord, ++currentPixel, ++linePixel) {
                        if (this.sortBuffer[linePixel] > xCoordStart) {
                            if (this.frameBuffer[currentPixel] >= 33554432) {
                                data = tile[yoffset | xcoord];
                                if (data > 0) {
                                    this.frameBuffer[currentPixel] = this.OBJPalette[palette | data];
                                    this.sortBuffer[linePixel] = xCoordStart;
                                }
                            } else if (this.frameBuffer[currentPixel] < 16777216) {
                                data = tile[yoffset | xcoord];
                                if (data > 0 && attrCode < 128) {
                                    this.frameBuffer[currentPixel] = this.OBJPalette[palette | data];
                                    this.sortBuffer[linePixel] = xCoordStart;
                                }
                            }
                        }
                    }
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.findLowestSpriteDrawable = Σ.addFunction(function αfRLq(scanlineToRender, drawableRange) {
        var Σ_αfRLq = new Σ.Scope(this, Σ, αfRLq, function () {
            return this.capture({
                scanlineToRender: scanlineToRender,
                drawableRange: drawableRange
            }, {
                address: address,
                spriteCount: spriteCount,
                diff: diff
            });
        });
        var address = 65024;
        var spriteCount = 0;
        var diff = 0;
        while (address < 65184 && spriteCount < 10) {
            diff = scanlineToRender - this.memory[address];
            if ((diff & drawableRange) == diff) {
                this.OAMAddressCache[spriteCount++] = address;
            }
            address += 4;
        }
        return spriteCount;
    }, Σ);
    GameBoyCore.prototype.SpriteGBCLayerRender = Σ.addFunction(function α5GkP(scanlineToRender) {
        var Σ_α5GkP = new Σ.Scope(this, Σ, α5GkP, function () {
            return this.capture({ scanlineToRender: scanlineToRender }, {});
        });
        if (this.gfxSpriteShow) {
            var OAMAddress = 65024;
            var lineAdjusted = scanlineToRender + 16;
            var yoffset = 0;
            var xcoord = 0;
            var endX = 0;
            var xCounter = 0;
            var attrCode = 0;
            var palette = 0;
            var tile = null;
            var data = 0;
            var currentPixel = 0;
            var spriteCount = 0;
            if (this.gfxSpriteNormalHeight) {
                for (; OAMAddress < 65184 && spriteCount < 10; OAMAddress += 4) {
                    yoffset = lineAdjusted - this.memory[OAMAddress];
                    if ((yoffset & 7) == yoffset) {
                        xcoord = this.memory[OAMAddress | 1] - 8;
                        endX = Math.min(160, xcoord + 8);
                        attrCode = this.memory[OAMAddress | 3];
                        palette = (attrCode & 7) << 2;
                        tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | this.memory[OAMAddress | 2]];
                        xCounter = xcoord > 0 ? xcoord : 0;
                        xcoord -= yoffset << 3;
                        for (currentPixel = this.pixelStart + xCounter; xCounter < endX; ++xCounter, ++currentPixel) {
                            if (this.frameBuffer[currentPixel] >= 33554432) {
                                data = tile[xCounter - xcoord];
                                if (data > 0) {
                                    this.frameBuffer[currentPixel] = this.gbcOBJPalette[palette | data];
                                }
                            } else if (this.frameBuffer[currentPixel] < 16777216) {
                                data = tile[xCounter - xcoord];
                                if (data > 0 && attrCode < 128) {
                                    this.frameBuffer[currentPixel] = this.gbcOBJPalette[palette | data];
                                }
                            }
                        }
                        ++spriteCount;
                    }
                }
            } else {
                for (; OAMAddress < 65184 && spriteCount < 10; OAMAddress += 4) {
                    yoffset = lineAdjusted - this.memory[OAMAddress];
                    if ((yoffset & 15) == yoffset) {
                        xcoord = this.memory[OAMAddress | 1] - 8;
                        endX = Math.min(160, xcoord + 8);
                        attrCode = this.memory[OAMAddress | 3];
                        palette = (attrCode & 7) << 2;
                        if ((attrCode & 64) == (64 & yoffset << 3)) {
                            tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | this.memory[OAMAddress | 2] & 254];
                        } else {
                            tile = this.tileCache[(attrCode & 8) << 8 | (attrCode & 96) << 4 | this.memory[OAMAddress | 2] | 1];
                        }
                        xCounter = xcoord > 0 ? xcoord : 0;
                        xcoord -= (yoffset & 7) << 3;
                        for (currentPixel = this.pixelStart + xCounter; xCounter < endX; ++xCounter, ++currentPixel) {
                            if (this.frameBuffer[currentPixel] >= 33554432) {
                                data = tile[xCounter - xcoord];
                                if (data > 0) {
                                    this.frameBuffer[currentPixel] = this.gbcOBJPalette[palette | data];
                                }
                            } else if (this.frameBuffer[currentPixel] < 16777216) {
                                data = tile[xCounter - xcoord];
                                if (data > 0 && attrCode < 128) {
                                    this.frameBuffer[currentPixel] = this.gbcOBJPalette[palette | data];
                                }
                            }
                        }
                        ++spriteCount;
                    }
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.generateGBTileLine = Σ.addFunction(function αotJN(address) {
        var Σ_αotJN = new Σ.Scope(this, Σ, αotJN, function () {
            return this.capture({ address: address }, {
                lineCopy: lineCopy,
                tileBlock: tileBlock
            });
        });
        var lineCopy = this.memory[1 | address] << 8 | this.memory[40958 & address];
        var tileBlock = this.tileCache[(address & 8176) >> 4];
        address = (address & 14) << 2;
        tileBlock[address | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
        tileBlock[address | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
        tileBlock[address | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
        tileBlock[address | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
        tileBlock[address | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
        tileBlock[address | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
        tileBlock[address | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
        tileBlock[address] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
    }, Σ);
    GameBoyCore.prototype.generateGBCTileLineBank1 = Σ.addFunction(function αn8jE(address) {
        var Σ_αn8jE = new Σ.Scope(this, Σ, αn8jE, function () {
            return this.capture({ address: address }, {
                lineCopy: lineCopy,
                tileBlock1: tileBlock1,
                tileBlock2: tileBlock2,
                tileBlock3: tileBlock3,
                tileBlock4: tileBlock4,
                addressFlipped: addressFlipped
            });
        });
        var lineCopy = this.memory[1 | address] << 8 | this.memory[40958 & address];
        address &= 8190;
        var tileBlock1 = this.tileCache[address >> 4];
        var tileBlock2 = this.tileCache[512 | address >> 4];
        var tileBlock3 = this.tileCache[1024 | address >> 4];
        var tileBlock4 = this.tileCache[1536 | address >> 4];
        address = (address & 14) << 2;
        var addressFlipped = 56 - address;
        tileBlock4[addressFlipped] = tileBlock2[address] = tileBlock3[addressFlipped | 7] = tileBlock1[address | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
        tileBlock4[addressFlipped | 1] = tileBlock2[address | 1] = tileBlock3[addressFlipped | 6] = tileBlock1[address | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
        tileBlock4[addressFlipped | 2] = tileBlock2[address | 2] = tileBlock3[addressFlipped | 5] = tileBlock1[address | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
        tileBlock4[addressFlipped | 3] = tileBlock2[address | 3] = tileBlock3[addressFlipped | 4] = tileBlock1[address | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
        tileBlock4[addressFlipped | 4] = tileBlock2[address | 4] = tileBlock3[addressFlipped | 3] = tileBlock1[address | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
        tileBlock4[addressFlipped | 5] = tileBlock2[address | 5] = tileBlock3[addressFlipped | 2] = tileBlock1[address | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
        tileBlock4[addressFlipped | 6] = tileBlock2[address | 6] = tileBlock3[addressFlipped | 1] = tileBlock1[address | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
        tileBlock4[addressFlipped | 7] = tileBlock2[address | 7] = tileBlock3[addressFlipped] = tileBlock1[address] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
    }, Σ);
    GameBoyCore.prototype.generateGBCTileBank1 = Σ.addFunction(function α3CUb(vramAddress) {
        var Σ_α3CUb = new Σ.Scope(this, Σ, α3CUb, function () {
            return this.capture({ vramAddress: vramAddress }, {
                address: address,
                tileBlock1: tileBlock1,
                tileBlock2: tileBlock2,
                tileBlock3: tileBlock3,
                tileBlock4: tileBlock4,
                lineCopy: lineCopy,
                addressFlipped: addressFlipped
            });
        });
        var address = vramAddress >> 4;
        var tileBlock1 = this.tileCache[address];
        var tileBlock2 = this.tileCache[512 | address];
        var tileBlock3 = this.tileCache[1024 | address];
        var tileBlock4 = this.tileCache[1536 | address];
        var lineCopy = 0;
        vramAddress |= 32768;
        address = 0;
        var addressFlipped = 56;
        do {
            lineCopy = this.memory[1 | vramAddress] << 8 | this.memory[vramAddress];
            tileBlock4[addressFlipped] = tileBlock2[address] = tileBlock3[addressFlipped | 7] = tileBlock1[address | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
            tileBlock4[addressFlipped | 1] = tileBlock2[address | 1] = tileBlock3[addressFlipped | 6] = tileBlock1[address | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
            tileBlock4[addressFlipped | 2] = tileBlock2[address | 2] = tileBlock3[addressFlipped | 5] = tileBlock1[address | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
            tileBlock4[addressFlipped | 3] = tileBlock2[address | 3] = tileBlock3[addressFlipped | 4] = tileBlock1[address | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
            tileBlock4[addressFlipped | 4] = tileBlock2[address | 4] = tileBlock3[addressFlipped | 3] = tileBlock1[address | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
            tileBlock4[addressFlipped | 5] = tileBlock2[address | 5] = tileBlock3[addressFlipped | 2] = tileBlock1[address | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
            tileBlock4[addressFlipped | 6] = tileBlock2[address | 6] = tileBlock3[addressFlipped | 1] = tileBlock1[address | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
            tileBlock4[addressFlipped | 7] = tileBlock2[address | 7] = tileBlock3[addressFlipped] = tileBlock1[address] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
            address += 8;
            addressFlipped -= 8;
            vramAddress += 2;
        } while (addressFlipped > -1);
    }, Σ);
    GameBoyCore.prototype.generateGBCTileLineBank2 = Σ.addFunction(function αQmQQ(address) {
        var Σ_αQmQQ = new Σ.Scope(this, Σ, αQmQQ, function () {
            return this.capture({ address: address }, {
                lineCopy: lineCopy,
                tileBlock1: tileBlock1,
                tileBlock2: tileBlock2,
                tileBlock3: tileBlock3,
                tileBlock4: tileBlock4,
                addressFlipped: addressFlipped
            });
        });
        var lineCopy = this.VRAM[1 | address] << 8 | this.VRAM[8190 & address];
        var tileBlock1 = this.tileCache[2048 | address >> 4];
        var tileBlock2 = this.tileCache[2560 | address >> 4];
        var tileBlock3 = this.tileCache[3072 | address >> 4];
        var tileBlock4 = this.tileCache[3584 | address >> 4];
        address = (address & 14) << 2;
        var addressFlipped = 56 - address;
        tileBlock4[addressFlipped] = tileBlock2[address] = tileBlock3[addressFlipped | 7] = tileBlock1[address | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
        tileBlock4[addressFlipped | 1] = tileBlock2[address | 1] = tileBlock3[addressFlipped | 6] = tileBlock1[address | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
        tileBlock4[addressFlipped | 2] = tileBlock2[address | 2] = tileBlock3[addressFlipped | 5] = tileBlock1[address | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
        tileBlock4[addressFlipped | 3] = tileBlock2[address | 3] = tileBlock3[addressFlipped | 4] = tileBlock1[address | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
        tileBlock4[addressFlipped | 4] = tileBlock2[address | 4] = tileBlock3[addressFlipped | 3] = tileBlock1[address | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
        tileBlock4[addressFlipped | 5] = tileBlock2[address | 5] = tileBlock3[addressFlipped | 2] = tileBlock1[address | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
        tileBlock4[addressFlipped | 6] = tileBlock2[address | 6] = tileBlock3[addressFlipped | 1] = tileBlock1[address | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
        tileBlock4[addressFlipped | 7] = tileBlock2[address | 7] = tileBlock3[addressFlipped] = tileBlock1[address] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
    }, Σ);
    GameBoyCore.prototype.generateGBCTileBank2 = Σ.addFunction(function αRvly(vramAddress) {
        var Σ_αRvly = new Σ.Scope(this, Σ, αRvly, function () {
            return this.capture({ vramAddress: vramAddress }, {
                address: address,
                tileBlock1: tileBlock1,
                tileBlock2: tileBlock2,
                tileBlock3: tileBlock3,
                tileBlock4: tileBlock4,
                lineCopy: lineCopy,
                addressFlipped: addressFlipped
            });
        });
        var address = vramAddress >> 4;
        var tileBlock1 = this.tileCache[2048 | address];
        var tileBlock2 = this.tileCache[2560 | address];
        var tileBlock3 = this.tileCache[3072 | address];
        var tileBlock4 = this.tileCache[3584 | address];
        var lineCopy = 0;
        address = 0;
        var addressFlipped = 56;
        do {
            lineCopy = this.VRAM[1 | vramAddress] << 8 | this.VRAM[vramAddress];
            tileBlock4[addressFlipped] = tileBlock2[address] = tileBlock3[addressFlipped | 7] = tileBlock1[address | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
            tileBlock4[addressFlipped | 1] = tileBlock2[address | 1] = tileBlock3[addressFlipped | 6] = tileBlock1[address | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
            tileBlock4[addressFlipped | 2] = tileBlock2[address | 2] = tileBlock3[addressFlipped | 5] = tileBlock1[address | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
            tileBlock4[addressFlipped | 3] = tileBlock2[address | 3] = tileBlock3[addressFlipped | 4] = tileBlock1[address | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
            tileBlock4[addressFlipped | 4] = tileBlock2[address | 4] = tileBlock3[addressFlipped | 3] = tileBlock1[address | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
            tileBlock4[addressFlipped | 5] = tileBlock2[address | 5] = tileBlock3[addressFlipped | 2] = tileBlock1[address | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
            tileBlock4[addressFlipped | 6] = tileBlock2[address | 6] = tileBlock3[addressFlipped | 1] = tileBlock1[address | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
            tileBlock4[addressFlipped | 7] = tileBlock2[address | 7] = tileBlock3[addressFlipped] = tileBlock1[address] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
            address += 8;
            addressFlipped -= 8;
            vramAddress += 2;
        } while (addressFlipped > -1);
    }, Σ);
    GameBoyCore.prototype.generateGBOAMTileLine = Σ.addFunction(function αGuN4(address) {
        var Σ_αGuN4 = new Σ.Scope(this, Σ, αGuN4, function () {
            return this.capture({ address: address }, {
                lineCopy: lineCopy,
                tileBlock1: tileBlock1,
                tileBlock2: tileBlock2,
                tileBlock3: tileBlock3,
                tileBlock4: tileBlock4,
                addressFlipped: addressFlipped
            });
        });
        var lineCopy = this.memory[1 | address] << 8 | this.memory[40958 & address];
        address &= 8190;
        var tileBlock1 = this.tileCache[address >> 4];
        var tileBlock2 = this.tileCache[512 | address >> 4];
        var tileBlock3 = this.tileCache[1024 | address >> 4];
        var tileBlock4 = this.tileCache[1536 | address >> 4];
        address = (address & 14) << 2;
        var addressFlipped = 56 - address;
        tileBlock4[addressFlipped] = tileBlock2[address] = tileBlock3[addressFlipped | 7] = tileBlock1[address | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
        tileBlock4[addressFlipped | 1] = tileBlock2[address | 1] = tileBlock3[addressFlipped | 6] = tileBlock1[address | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
        tileBlock4[addressFlipped | 2] = tileBlock2[address | 2] = tileBlock3[addressFlipped | 5] = tileBlock1[address | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
        tileBlock4[addressFlipped | 3] = tileBlock2[address | 3] = tileBlock3[addressFlipped | 4] = tileBlock1[address | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
        tileBlock4[addressFlipped | 4] = tileBlock2[address | 4] = tileBlock3[addressFlipped | 3] = tileBlock1[address | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
        tileBlock4[addressFlipped | 5] = tileBlock2[address | 5] = tileBlock3[addressFlipped | 2] = tileBlock1[address | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
        tileBlock4[addressFlipped | 6] = tileBlock2[address | 6] = tileBlock3[addressFlipped | 1] = tileBlock1[address | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
        tileBlock4[addressFlipped | 7] = tileBlock2[address | 7] = tileBlock3[addressFlipped] = tileBlock1[address] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
    }, Σ);
    GameBoyCore.prototype.graphicsJIT = Σ.addFunction(function αzUm5() {
        if (this.LCDisOn) {
            this.totalLinesPassed = 0;
            this.graphicsJITScanlineGroup();
        }
    }, Σ);
    GameBoyCore.prototype.graphicsJITVBlank = Σ.addFunction(function αZ0hL() {
        this.totalLinesPassed += this.queuedScanLines;
        this.graphicsJITScanlineGroup();
    }, Σ);
    GameBoyCore.prototype.graphicsJITScanlineGroup = Σ.addFunction(function αR7xl() {
        while (this.queuedScanLines > 0) {
            this.renderScanLine(this.lastUnrenderedLine);
            if (this.lastUnrenderedLine < 143) {
                ++this.lastUnrenderedLine;
            } else {
                this.lastUnrenderedLine = 0;
            }
            --this.queuedScanLines;
        }
    }, Σ);
    GameBoyCore.prototype.incrementScanLineQueue = Σ.addFunction(function αAzH6() {
        if (this.queuedScanLines < 144) {
            ++this.queuedScanLines;
        } else {
            this.currentX = 0;
            this.midScanlineOffset = -1;
            if (this.lastUnrenderedLine < 143) {
                ++this.lastUnrenderedLine;
            } else {
                this.lastUnrenderedLine = 0;
            }
        }
    }, Σ);
    GameBoyCore.prototype.midScanLineJIT = Σ.addFunction(function αbEI7() {
        this.graphicsJIT();
        this.renderMidScanLine();
    }, Σ);
    GameBoyCore.prototype.launchIRQ = Σ.addFunction(function αpFnI() {
        var Σ_αpFnI = new Σ.Scope(this, Σ, αpFnI, function () {
            return this.capture({}, {
                bitShift: bitShift,
                testbit: testbit
            });
        });
        var bitShift = 0;
        var testbit = 1;
        do {
            if ((testbit & this.IRQLineMatched) == testbit) {
                this.IME = false;
                this.interruptsRequested -= testbit;
                this.IRQLineMatched = 0;
                this.CPUTicks = 20;
                this.stackPointer = this.stackPointer - 1 & 65535;
                this.memoryWriter[this.stackPointer](this, this.stackPointer, this.programCounter >> 8);
                this.stackPointer = this.stackPointer - 1 & 65535;
                this.memoryWriter[this.stackPointer](this, this.stackPointer, this.programCounter & 255);
                this.programCounter = 64 | bitShift << 3;
                this.updateCore();
                return;
            }
            testbit = 1 << ++bitShift;
        } while (bitShift < 5);
    }, Σ);
    GameBoyCore.prototype.checkIRQMatching = Σ.addFunction(function αFRdE() {
        if (this.IME) {
            this.IRQLineMatched = this.interruptsEnabled & this.interruptsRequested & 31;
        }
    }, Σ);
    GameBoyCore.prototype.calculateHALTPeriod = Σ.addFunction(function αxQib() {
        var Σ_αxQib = new Σ.Scope(this, Σ, αxQib, function () {
            return this.capture({}, { maxClocks: maxClocks });
        });
        if (!this.halt) {
            this.halt = true;
            var currentClocks = -1;
            var temp_var = 0;
            if (this.LCDisOn) {
                if ((this.interruptsEnabled & 1) == 1) {
                    currentClocks = 456 * ((this.modeSTAT == 1 ? 298 : 144) - this.actualScanLine) - this.LCDTicks << this.doubleSpeedShifter;
                }
                if ((this.interruptsEnabled & 2) == 2) {
                    if (this.mode0TriggerSTAT) {
                        temp_var = this.clocksUntilMode0() - this.LCDTicks << this.doubleSpeedShifter;
                        if (temp_var <= currentClocks || currentClocks == -1) {
                            currentClocks = temp_var;
                        }
                    }
                    if (this.mode1TriggerSTAT && (this.interruptsEnabled & 1) == 0) {
                        temp_var = 456 * ((this.modeSTAT == 1 ? 298 : 144) - this.actualScanLine) - this.LCDTicks << this.doubleSpeedShifter;
                        if (temp_var <= currentClocks || currentClocks == -1) {
                            currentClocks = temp_var;
                        }
                    }
                    if (this.mode2TriggerSTAT) {
                        temp_var = (this.actualScanLine >= 143 ? 456 * (154 - this.actualScanLine) : 456) - this.LCDTicks << this.doubleSpeedShifter;
                        if (temp_var <= currentClocks || currentClocks == -1) {
                            currentClocks = temp_var;
                        }
                    }
                    if (this.LYCMatchTriggerSTAT && this.memory[65349] <= 153) {
                        temp_var = this.clocksUntilLYCMatch() - this.LCDTicks << this.doubleSpeedShifter;
                        if (temp_var <= currentClocks || currentClocks == -1) {
                            currentClocks = temp_var;
                        }
                    }
                }
            }
            if (this.TIMAEnabled && (this.interruptsEnabled & 4) == 4) {
                temp_var = (256 - this.memory[65285]) * this.TACClocker - this.timerTicks;
                if (temp_var <= currentClocks || currentClocks == -1) {
                    currentClocks = temp_var;
                }
            }
            if (this.serialTimer > 0 && (this.interruptsEnabled & 8) == 8) {
                if (this.serialTimer <= currentClocks || currentClocks == -1) {
                    currentClocks = this.serialTimer;
                }
            }
        } else {
            var currentClocks = this.remainingClocks;
        }
        var maxClocks = this.CPUCyclesTotal - this.emulatorTicks << this.doubleSpeedShifter;
        if (currentClocks >= 0) {
            if (currentClocks <= maxClocks) {
                this.CPUTicks = Math.max(currentClocks, this.CPUTicks);
                this.updateCoreFull();
                this.halt = false;
                this.CPUTicks = 0;
            } else {
                this.CPUTicks = Math.max(maxClocks, this.CPUTicks);
                this.remainingClocks = currentClocks - this.CPUTicks;
            }
        } else {
            this.CPUTicks += maxClocks;
        }
    }, Σ);
    GameBoyCore.prototype.memoryRead = Σ.addFunction(function αCe1Q(address) {
        var Σ_αCe1Q = new Σ.Scope(this, Σ, αCe1Q, function () {
            return this.capture({ address: address }, {});
        });
        return this.memoryReader[address](this, address);
    }, Σ);
    GameBoyCore.prototype.memoryHighRead = Σ.addFunction(function αeGnC(address) {
        var Σ_αeGnC = new Σ.Scope(this, Σ, αeGnC, function () {
            return this.capture({ address: address }, {});
        });
        return this.memoryHighReader[address](this, address);
    }, Σ);
    GameBoyCore.prototype.memoryReadJumpCompile = Σ.addFunction(function αuXlA() {
        var Σ_αuXlA = new Σ.Scope(this, Σ, αuXlA, function () {
            return this.capture({}, {});
        });
        for (var index = 0; index <= 65535; index++) {
            if (index < 16384) {
                this.memoryReader[index] = this.memoryReadNormal;
            } else if (index < 32768) {
                this.memoryReader[index] = this.memoryReadROM;
            } else if (index < 38912) {
                this.memoryReader[index] = this.cGBC ? this.VRAMDATAReadCGBCPU : this.VRAMDATAReadDMGCPU;
            } else if (index < 40960) {
                this.memoryReader[index] = this.cGBC ? this.VRAMCHRReadCGBCPU : this.VRAMCHRReadDMGCPU;
            } else if (index >= 40960 && index < 49152) {
                if (this.numRAMBanks == 1 / 16 && index < 41472 || this.numRAMBanks >= 1) {
                    if (this.cMBC7) {
                        this.memoryReader[index] = this.memoryReadMBC7;
                    } else if (!this.cMBC3) {
                        this.memoryReader[index] = this.memoryReadMBC;
                    } else {
                        this.memoryReader[index] = this.memoryReadMBC3;
                    }
                } else {
                    this.memoryReader[index] = this.memoryReadBAD;
                }
            } else if (index >= 49152 && index < 57344) {
                if (!this.cGBC || index < 53248) {
                    this.memoryReader[index] = this.memoryReadNormal;
                } else {
                    this.memoryReader[index] = this.memoryReadGBCMemory;
                }
            } else if (index >= 57344 && index < 65024) {
                if (!this.cGBC || index < 61440) {
                    this.memoryReader[index] = this.memoryReadECHONormal;
                } else {
                    this.memoryReader[index] = this.memoryReadECHOGBCMemory;
                }
            } else if (index < 65184) {
                this.memoryReader[index] = this.memoryReadOAM;
            } else if (this.cGBC && index >= 65184 && index < 65280) {
                this.memoryReader[index] = this.memoryReadNormal;
            } else if (index >= 65280) {
                switch (index) {
                case 65280:
                    this.memoryHighReader[0] = this.memoryReader[65280] = function (parentObj, address) {
                        return 192 | parentObj.memory[65280];
                    };
                    break;
                case 65281:
                    this.memoryHighReader[1] = this.memoryReader[65281] = function (parentObj, address) {
                        return parentObj.memory[65282] < 128 ? parentObj.memory[65281] : 255;
                    };
                    break;
                case 65282:
                    if (this.cGBC) {
                        this.memoryHighReader[2] = this.memoryReader[65282] = function (parentObj, address) {
                            return (parentObj.serialTimer <= 0 ? 124 : 252) | parentObj.memory[65282];
                        };
                    } else {
                        this.memoryHighReader[2] = this.memoryReader[65282] = function (parentObj, address) {
                            return (parentObj.serialTimer <= 0 ? 126 : 254) | parentObj.memory[65282];
                        };
                    }
                    break;
                case 65284:
                    this.memoryHighReader[4] = this.memoryReader[65284] = function (parentObj, address) {
                        parentObj.memory[65284] = parentObj.memory[65284] + (parentObj.DIVTicks >> 8) & 255;
                        parentObj.DIVTicks &= 255;
                        return parentObj.memory[65284];
                    };
                    break;
                case 65287:
                    this.memoryHighReader[7] = this.memoryReader[65287] = function (parentObj, address) {
                        return 248 | parentObj.memory[65287];
                    };
                    break;
                case 65295:
                    this.memoryHighReader[15] = this.memoryReader[65295] = function (parentObj, address) {
                        return 224 | parentObj.interruptsRequested;
                    };
                    break;
                case 65296:
                    this.memoryHighReader[16] = this.memoryReader[65296] = function (parentObj, address) {
                        return 128 | parentObj.memory[65296];
                    };
                    break;
                case 65297:
                    this.memoryHighReader[17] = this.memoryReader[65297] = function (parentObj, address) {
                        return 63 | parentObj.memory[65297];
                    };
                    break;
                case 65299:
                    this.memoryHighReader[19] = this.memoryReader[65299] = this.memoryReadBAD;
                    break;
                case 65300:
                    this.memoryHighReader[20] = this.memoryReader[65300] = function (parentObj, address) {
                        return 191 | parentObj.memory[65300];
                    };
                    break;
                case 65302:
                    this.memoryHighReader[22] = this.memoryReader[65302] = function (parentObj, address) {
                        return 63 | parentObj.memory[65302];
                    };
                    break;
                case 65304:
                    this.memoryHighReader[24] = this.memoryReader[65304] = this.memoryReadBAD;
                    break;
                case 65305:
                    this.memoryHighReader[25] = this.memoryReader[65305] = function (parentObj, address) {
                        return 191 | parentObj.memory[65305];
                    };
                    break;
                case 65306:
                    this.memoryHighReader[26] = this.memoryReader[65306] = function (parentObj, address) {
                        return 127 | parentObj.memory[65306];
                    };
                    break;
                case 65307:
                    this.memoryHighReader[27] = this.memoryReader[65307] = this.memoryReadBAD;
                    break;
                case 65308:
                    this.memoryHighReader[28] = this.memoryReader[65308] = function (parentObj, address) {
                        return 159 | parentObj.memory[65308];
                    };
                    break;
                case 65309:
                    this.memoryHighReader[29] = this.memoryReader[65309] = function (parentObj, address) {
                        return 255;
                    };
                    break;
                case 65310:
                    this.memoryHighReader[30] = this.memoryReader[65310] = function (parentObj, address) {
                        return 191 | parentObj.memory[65310];
                    };
                    break;
                case 65311:
                case 65312:
                    this.memoryHighReader[index & 255] = this.memoryReader[index] = this.memoryReadBAD;
                    break;
                case 65315:
                    this.memoryHighReader[35] = this.memoryReader[65315] = function (parentObj, address) {
                        return 191 | parentObj.memory[65315];
                    };
                    break;
                case 65318:
                    this.memoryHighReader[38] = this.memoryReader[65318] = function (parentObj, address) {
                        parentObj.audioJIT();
                        return 112 | parentObj.memory[65318];
                    };
                    break;
                case 65319:
                case 65320:
                case 65321:
                case 65322:
                case 65323:
                case 65324:
                case 65325:
                case 65326:
                case 65327:
                    this.memoryHighReader[index & 255] = this.memoryReader[index] = this.memoryReadBAD;
                    break;
                case 65328:
                case 65329:
                case 65330:
                case 65331:
                case 65332:
                case 65333:
                case 65334:
                case 65335:
                case 65336:
                case 65337:
                case 65338:
                case 65339:
                case 65340:
                case 65341:
                case 65342:
                case 65343:
                    this.memoryReader[index] = function (parentObj, address) {
                        return parentObj.channel3canPlay ? parentObj.memory[65280 | parentObj.channel3lastSampleLookup >> 1] : parentObj.memory[address];
                    };
                    this.memoryHighReader[index & 255] = function (parentObj, address) {
                        return parentObj.channel3canPlay ? parentObj.memory[65280 | parentObj.channel3lastSampleLookup >> 1] : parentObj.memory[65280 | address];
                    };
                    break;
                case 65345:
                    this.memoryHighReader[65] = this.memoryReader[65345] = function (parentObj, address) {
                        return 128 | parentObj.memory[65345] | parentObj.modeSTAT;
                    };
                    break;
                case 65346:
                    this.memoryHighReader[66] = this.memoryReader[65346] = function (parentObj, address) {
                        return parentObj.backgroundY;
                    };
                    break;
                case 65347:
                    this.memoryHighReader[67] = this.memoryReader[65347] = function (parentObj, address) {
                        return parentObj.backgroundX;
                    };
                    break;
                case 65348:
                    this.memoryHighReader[68] = this.memoryReader[65348] = function (parentObj, address) {
                        return parentObj.LCDisOn ? parentObj.memory[65348] : 0;
                    };
                    break;
                case 65354:
                    this.memoryHighReader[74] = this.memoryReader[65354] = function (parentObj, address) {
                        return parentObj.windowY;
                    };
                    break;
                case 65359:
                    this.memoryHighReader[79] = this.memoryReader[65359] = function (parentObj, address) {
                        return parentObj.currVRAMBank;
                    };
                    break;
                case 65365:
                    if (this.cGBC) {
                        this.memoryHighReader[85] = this.memoryReader[65365] = function (parentObj, address) {
                            if (!parentObj.LCDisOn && parentObj.hdmaRunning) {
                                parentObj.DMAWrite((parentObj.memory[65365] & 127) + 1);
                                parentObj.memory[65365] = 255;
                                parentObj.hdmaRunning = false;
                            }
                            return parentObj.memory[65365];
                        };
                    } else {
                        this.memoryReader[65365] = this.memoryReadNormal;
                        this.memoryHighReader[85] = this.memoryHighReadNormal;
                    }
                    break;
                case 65366:
                    if (this.cGBC) {
                        this.memoryHighReader[86] = this.memoryReader[65366] = function (parentObj, address) {
                            return 60 | (parentObj.memory[65366] >= 192 ? 2 | parentObj.memory[65366] & 193 : parentObj.memory[65366] & 195);
                        };
                    } else {
                        this.memoryReader[65366] = this.memoryReadNormal;
                        this.memoryHighReader[86] = this.memoryHighReadNormal;
                    }
                    break;
                case 65388:
                    if (this.cGBC) {
                        this.memoryHighReader[108] = this.memoryReader[65388] = function (parentObj, address) {
                            return 254 | parentObj.memory[65388];
                        };
                    } else {
                        this.memoryHighReader[108] = this.memoryReader[65388] = this.memoryReadBAD;
                    }
                    break;
                case 65392:
                    if (this.cGBC) {
                        this.memoryHighReader[112] = this.memoryReader[65392] = function (parentObj, address) {
                            return 64 | parentObj.memory[65392];
                        };
                    } else {
                        this.memoryHighReader[112] = this.memoryReader[65392] = this.memoryReadBAD;
                    }
                    break;
                case 65397:
                    this.memoryHighReader[117] = this.memoryReader[65397] = function (parentObj, address) {
                        return 143 | parentObj.memory[65397];
                    };
                    break;
                case 65398:
                case 65399:
                    this.memoryHighReader[index & 255] = this.memoryReader[index] = function (parentObj, address) {
                        return 0;
                    };
                    break;
                case 65535:
                    this.memoryHighReader[255] = this.memoryReader[65535] = function (parentObj, address) {
                        return parentObj.interruptsEnabled;
                    };
                    break;
                default:
                    this.memoryReader[index] = this.memoryReadNormal;
                    this.memoryHighReader[index & 255] = this.memoryHighReadNormal;
                }
            } else {
                this.memoryReader[index] = this.memoryReadBAD;
            }
        }
    }, Σ);
    GameBoyCore.prototype.memoryReadNormal = Σ.addFunction(function α4mwt(parentObj, address) {
        var Σ_α4mwt = new Σ.Scope(this, Σ, α4mwt, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.memory[address];
    }, Σ);
    GameBoyCore.prototype.memoryHighReadNormal = Σ.addFunction(function αlImm(parentObj, address) {
        var Σ_αlImm = new Σ.Scope(this, Σ, αlImm, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.memory[65280 | address];
    }, Σ);
    GameBoyCore.prototype.memoryReadROM = Σ.addFunction(function αzo7T(parentObj, address) {
        var Σ_αzo7T = new Σ.Scope(this, Σ, αzo7T, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.ROM[parentObj.currentROMBank + address];
    }, Σ);
    GameBoyCore.prototype.memoryReadMBC = Σ.addFunction(function αa97f(parentObj, address) {
        var Σ_αa97f = new Σ.Scope(this, Σ, αa97f, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        if (parentObj.MBCRAMBanksEnabled || settings[10]) {
            return parentObj.MBCRam[address + parentObj.currMBCRAMBankPosition];
        }
        return 255;
    }, Σ);
    GameBoyCore.prototype.memoryReadMBC7 = Σ.addFunction(function αVRHW(parentObj, address) {
        var Σ_αVRHW = new Σ.Scope(this, Σ, αVRHW, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        if (parentObj.MBCRAMBanksEnabled || settings[10]) {
            switch (address) {
            case 40960:
            case 41056:
            case 41072:
                return 0;
            case 41088:
                return 0;
            case 41040:
                return parentObj.highY;
            case 41024:
                return parentObj.lowY;
            case 41008:
                return parentObj.highX;
            case 40992:
                return parentObj.lowX;
            default:
                return parentObj.MBCRam[address + parentObj.currMBCRAMBankPosition];
            }
        }
        return 255;
    }, Σ);
    GameBoyCore.prototype.memoryReadMBC3 = Σ.addFunction(function αTa8Y(parentObj, address) {
        var Σ_αTa8Y = new Σ.Scope(this, Σ, αTa8Y, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        if (parentObj.MBCRAMBanksEnabled || settings[10]) {
            switch (parentObj.currMBCRAMBank) {
            case 0:
            case 1:
            case 2:
            case 3:
                return parentObj.MBCRam[address + parentObj.currMBCRAMBankPosition];
                break;
            case 8:
                return parentObj.latchedSeconds;
                break;
            case 9:
                return parentObj.latchedMinutes;
                break;
            case 10:
                return parentObj.latchedHours;
                break;
            case 11:
                return parentObj.latchedLDays;
                break;
            case 12:
                return (parentObj.RTCDayOverFlow ? 128 : 0) + (parentObj.RTCHALT ? 64 : 0) + parentObj.latchedHDays;
            }
        }
        return 255;
    }, Σ);
    GameBoyCore.prototype.memoryReadGBCMemory = Σ.addFunction(function αw0dL(parentObj, address) {
        var Σ_αw0dL = new Σ.Scope(this, Σ, αw0dL, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.GBCMemory[address + parentObj.gbcRamBankPosition];
    }, Σ);
    GameBoyCore.prototype.memoryReadOAM = Σ.addFunction(function αVQP6(parentObj, address) {
        var Σ_αVQP6 = new Σ.Scope(this, Σ, αVQP6, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.modeSTAT > 1 ? 255 : parentObj.memory[address];
    }, Σ);
    GameBoyCore.prototype.memoryReadECHOGBCMemory = Σ.addFunction(function αo8xW(parentObj, address) {
        var Σ_αo8xW = new Σ.Scope(this, Σ, αo8xW, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.GBCMemory[address + parentObj.gbcRamBankPositionECHO];
    }, Σ);
    GameBoyCore.prototype.memoryReadECHONormal = Σ.addFunction(function αzyf3(parentObj, address) {
        var Σ_αzyf3 = new Σ.Scope(this, Σ, αzyf3, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.memory[address - 8192];
    }, Σ);
    GameBoyCore.prototype.memoryReadBAD = Σ.addFunction(function αW4S4(parentObj, address) {
        var Σ_αW4S4 = new Σ.Scope(this, Σ, αW4S4, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return 255;
    }, Σ);
    GameBoyCore.prototype.VRAMDATAReadCGBCPU = Σ.addFunction(function α182G(parentObj, address) {
        var Σ_α182G = new Σ.Scope(this, Σ, α182G, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.modeSTAT > 2 ? 255 : parentObj.currVRAMBank == 0 ? parentObj.memory[address] : parentObj.VRAM[address & 8191];
    }, Σ);
    GameBoyCore.prototype.VRAMDATAReadDMGCPU = Σ.addFunction(function α6nWt(parentObj, address) {
        var Σ_α6nWt = new Σ.Scope(this, Σ, α6nWt, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.modeSTAT > 2 ? 255 : parentObj.memory[address];
    }, Σ);
    GameBoyCore.prototype.VRAMCHRReadCGBCPU = Σ.addFunction(function αcA54(parentObj, address) {
        var Σ_αcA54 = new Σ.Scope(this, Σ, αcA54, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.modeSTAT > 2 ? 255 : parentObj.BGCHRCurrentBank[address & 2047];
    }, Σ);
    GameBoyCore.prototype.VRAMCHRReadDMGCPU = Σ.addFunction(function αjjsR(parentObj, address) {
        var Σ_αjjsR = new Σ.Scope(this, Σ, αjjsR, function () {
            return this.capture({
                parentObj: parentObj,
                address: address
            }, {});
        });
        return parentObj.modeSTAT > 2 ? 255 : parentObj.BGCHRBank1[address & 2047];
    }, Σ);
    GameBoyCore.prototype.setCurrentMBC1ROMBank = Σ.addFunction(function αU1PE() {
        switch (this.ROMBank1offs) {
        case 0:
        case 32:
        case 64:
        case 96:
            this.currentROMBank = this.ROMBank1offs % this.ROMBankEdge << 14;
            break;
        default:
            this.currentROMBank = this.ROMBank1offs % this.ROMBankEdge - 1 << 14;
        }
    }, Σ);
    GameBoyCore.prototype.setCurrentMBC2AND3ROMBank = Σ.addFunction(function αlQcO() {
        this.currentROMBank = Math.max(this.ROMBank1offs % this.ROMBankEdge - 1, 0) << 14;
    }, Σ);
    GameBoyCore.prototype.setCurrentMBC5ROMBank = Σ.addFunction(function α8EGs() {
        this.currentROMBank = this.ROMBank1offs % this.ROMBankEdge - 1 << 14;
    }, Σ);
    GameBoyCore.prototype.memoryWrite = Σ.addFunction(function αUgux(address, data) {
        var Σ_αUgux = new Σ.Scope(this, Σ, αUgux, function () {
            return this.capture({
                address: address,
                data: data
            }, {});
        });
        this.memoryWriter[address](this, address, data);
    }, Σ);
    GameBoyCore.prototype.memoryHighWrite = Σ.addFunction(function αqBFs(address, data) {
        var Σ_αqBFs = new Σ.Scope(this, Σ, αqBFs, function () {
            return this.capture({
                address: address,
                data: data
            }, {});
        });
        this.memoryHighWriter[address](this, address, data);
    }, Σ);
    GameBoyCore.prototype.memoryWriteJumpCompile = Σ.addFunction(function αnEYh() {
        var Σ_αnEYh = new Σ.Scope(this, Σ, αnEYh, function () {
            return this.capture({}, {});
        });
        for (var index = 0; index <= 65535; index++) {
            if (index < 32768) {
                if (this.cMBC1) {
                    if (index < 8192) {
                        this.memoryWriter[index] = this.MBCWriteEnable;
                    } else if (index < 16384) {
                        this.memoryWriter[index] = this.MBC1WriteROMBank;
                    } else if (index < 24576) {
                        this.memoryWriter[index] = this.MBC1WriteRAMBank;
                    } else {
                        this.memoryWriter[index] = this.MBC1WriteType;
                    }
                } else if (this.cMBC2) {
                    if (index < 4096) {
                        this.memoryWriter[index] = this.MBCWriteEnable;
                    } else if (index >= 8448 && index < 8704) {
                        this.memoryWriter[index] = this.MBC2WriteROMBank;
                    } else {
                        this.memoryWriter[index] = this.cartIgnoreWrite;
                    }
                } else if (this.cMBC3) {
                    if (index < 8192) {
                        this.memoryWriter[index] = this.MBCWriteEnable;
                    } else if (index < 16384) {
                        this.memoryWriter[index] = this.MBC3WriteROMBank;
                    } else if (index < 24576) {
                        this.memoryWriter[index] = this.MBC3WriteRAMBank;
                    } else {
                        this.memoryWriter[index] = this.MBC3WriteRTCLatch;
                    }
                } else if (this.cMBC5 || this.cRUMBLE || this.cMBC7) {
                    if (index < 8192) {
                        this.memoryWriter[index] = this.MBCWriteEnable;
                    } else if (index < 12288) {
                        this.memoryWriter[index] = this.MBC5WriteROMBankLow;
                    } else if (index < 16384) {
                        this.memoryWriter[index] = this.MBC5WriteROMBankHigh;
                    } else if (index < 24576) {
                        this.memoryWriter[index] = this.cRUMBLE ? this.RUMBLEWriteRAMBank : this.MBC5WriteRAMBank;
                    } else {
                        this.memoryWriter[index] = this.cartIgnoreWrite;
                    }
                } else if (this.cHuC3) {
                    if (index < 8192) {
                        this.memoryWriter[index] = this.MBCWriteEnable;
                    } else if (index < 16384) {
                        this.memoryWriter[index] = this.MBC3WriteROMBank;
                    } else if (index < 24576) {
                        this.memoryWriter[index] = this.HuC3WriteRAMBank;
                    } else {
                        this.memoryWriter[index] = this.cartIgnoreWrite;
                    }
                } else {
                    this.memoryWriter[index] = this.cartIgnoreWrite;
                }
            } else if (index < 36864) {
                this.memoryWriter[index] = this.cGBC ? this.VRAMGBCDATAWrite : this.VRAMGBDATAWrite;
            } else if (index < 38912) {
                this.memoryWriter[index] = this.cGBC ? this.VRAMGBCDATAWrite : this.VRAMGBDATAUpperWrite;
            } else if (index < 40960) {
                this.memoryWriter[index] = this.cGBC ? this.VRAMGBCCHRMAPWrite : this.VRAMGBCHRMAPWrite;
            } else if (index < 49152) {
                if (this.numRAMBanks == 1 / 16 && index < 41472 || this.numRAMBanks >= 1) {
                    if (!this.cMBC3) {
                        this.memoryWriter[index] = this.memoryWriteMBCRAM;
                    } else {
                        this.memoryWriter[index] = this.memoryWriteMBC3RAM;
                    }
                } else {
                    this.memoryWriter[index] = this.cartIgnoreWrite;
                }
            } else if (index < 57344) {
                if (this.cGBC && index >= 53248) {
                    this.memoryWriter[index] = this.memoryWriteGBCRAM;
                } else {
                    this.memoryWriter[index] = this.memoryWriteNormal;
                }
            } else if (index < 65024) {
                if (this.cGBC && index >= 61440) {
                    this.memoryWriter[index] = this.memoryWriteECHOGBCRAM;
                } else {
                    this.memoryWriter[index] = this.memoryWriteECHONormal;
                }
            } else if (index <= 65184) {
                this.memoryWriter[index] = this.memoryWriteOAMRAM;
            } else if (index < 65280) {
                if (this.cGBC) {
                    this.memoryWriter[index] = this.memoryWriteNormal;
                } else {
                    this.memoryWriter[index] = this.cartIgnoreWrite;
                }
            } else {
                this.memoryWriter[index] = this.memoryWriteNormal;
                this.memoryHighWriter[index & 255] = this.memoryHighWriteNormal;
            }
        }
        this.registerWriteJumpCompile();
    }, Σ);
    GameBoyCore.prototype.MBCWriteEnable = Σ.addFunction(function αA2se(parentObj, address, data) {
        var Σ_αA2se = new Σ.Scope(this, Σ, αA2se, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.MBCRAMBanksEnabled = (data & 15) == 10;
    }, Σ);
    GameBoyCore.prototype.MBC1WriteROMBank = Σ.addFunction(function α4Yot(parentObj, address, data) {
        var Σ_α4Yot = new Σ.Scope(this, Σ, α4Yot, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.ROMBank1offs = parentObj.ROMBank1offs & 96 | data & 31;
        parentObj.setCurrentMBC1ROMBank();
    }, Σ);
    GameBoyCore.prototype.MBC1WriteRAMBank = Σ.addFunction(function αuYsx(parentObj, address, data) {
        var Σ_αuYsx = new Σ.Scope(this, Σ, αuYsx, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.MBC1Mode) {
            parentObj.currMBCRAMBank = data & 3;
            parentObj.currMBCRAMBankPosition = (parentObj.currMBCRAMBank << 13) - 40960;
        } else {
            parentObj.ROMBank1offs = (data & 3) << 5 | parentObj.ROMBank1offs & 31;
            parentObj.setCurrentMBC1ROMBank();
        }
    }, Σ);
    GameBoyCore.prototype.MBC1WriteType = Σ.addFunction(function αyVDG(parentObj, address, data) {
        var Σ_αyVDG = new Σ.Scope(this, Σ, αyVDG, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.MBC1Mode = (data & 1) == 1;
        if (parentObj.MBC1Mode) {
            parentObj.ROMBank1offs &= 31;
            parentObj.setCurrentMBC1ROMBank();
        } else {
            parentObj.currMBCRAMBank = 0;
            parentObj.currMBCRAMBankPosition = -40960;
        }
    }, Σ);
    GameBoyCore.prototype.MBC2WriteROMBank = Σ.addFunction(function αXr5K(parentObj, address, data) {
        var Σ_αXr5K = new Σ.Scope(this, Σ, αXr5K, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.ROMBank1offs = data & 15;
        parentObj.setCurrentMBC2AND3ROMBank();
    }, Σ);
    GameBoyCore.prototype.MBC3WriteROMBank = Σ.addFunction(function αX3ch(parentObj, address, data) {
        var Σ_αX3ch = new Σ.Scope(this, Σ, αX3ch, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.ROMBank1offs = data & 127;
        parentObj.setCurrentMBC2AND3ROMBank();
    }, Σ);
    GameBoyCore.prototype.MBC3WriteRAMBank = Σ.addFunction(function αZY0y(parentObj, address, data) {
        var Σ_αZY0y = new Σ.Scope(this, Σ, αZY0y, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.currMBCRAMBank = data;
        if (data < 4) {
            parentObj.currMBCRAMBankPosition = (parentObj.currMBCRAMBank << 13) - 40960;
        }
    }, Σ);
    GameBoyCore.prototype.MBC3WriteRTCLatch = Σ.addFunction(function αFd99(parentObj, address, data) {
        var Σ_αFd99 = new Σ.Scope(this, Σ, αFd99, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (data == 0) {
            parentObj.RTCisLatched = false;
        } else if (!parentObj.RTCisLatched) {
            parentObj.RTCisLatched = true;
            parentObj.latchedSeconds = parentObj.RTCSeconds | 0;
            parentObj.latchedMinutes = parentObj.RTCMinutes;
            parentObj.latchedHours = parentObj.RTCHours;
            parentObj.latchedLDays = parentObj.RTCDays & 255;
            parentObj.latchedHDays = parentObj.RTCDays >> 8;
        }
    }, Σ);
    GameBoyCore.prototype.MBC5WriteROMBankLow = Σ.addFunction(function αOfN6(parentObj, address, data) {
        var Σ_αOfN6 = new Σ.Scope(this, Σ, αOfN6, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.ROMBank1offs = parentObj.ROMBank1offs & 256 | data;
        parentObj.setCurrentMBC5ROMBank();
    }, Σ);
    GameBoyCore.prototype.MBC5WriteROMBankHigh = Σ.addFunction(function αtbq1(parentObj, address, data) {
        var Σ_αtbq1 = new Σ.Scope(this, Σ, αtbq1, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.ROMBank1offs = (data & 1) << 8 | parentObj.ROMBank1offs & 255;
        parentObj.setCurrentMBC5ROMBank();
    }, Σ);
    GameBoyCore.prototype.MBC5WriteRAMBank = Σ.addFunction(function αGfiV(parentObj, address, data) {
        var Σ_αGfiV = new Σ.Scope(this, Σ, αGfiV, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.currMBCRAMBank = data & 15;
        parentObj.currMBCRAMBankPosition = (parentObj.currMBCRAMBank << 13) - 40960;
    }, Σ);
    GameBoyCore.prototype.RUMBLEWriteRAMBank = Σ.addFunction(function αFSgm(parentObj, address, data) {
        var Σ_αFSgm = new Σ.Scope(this, Σ, αFSgm, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.currMBCRAMBank = data & 3;
        parentObj.currMBCRAMBankPosition = (parentObj.currMBCRAMBank << 13) - 40960;
    }, Σ);
    GameBoyCore.prototype.HuC3WriteRAMBank = Σ.addFunction(function αrxrt(parentObj, address, data) {
        var Σ_αrxrt = new Σ.Scope(this, Σ, αrxrt, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.currMBCRAMBank = data & 3;
        parentObj.currMBCRAMBankPosition = (parentObj.currMBCRAMBank << 13) - 40960;
    }, Σ);
    GameBoyCore.prototype.cartIgnoreWrite = Σ.addFunction(function αMDxg(parentObj, address, data) {
        var Σ_αMDxg = new Σ.Scope(this, Σ, αMDxg, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
    }, Σ);
    GameBoyCore.prototype.memoryWriteNormal = Σ.addFunction(function αk9cq(parentObj, address, data) {
        var Σ_αk9cq = new Σ.Scope(this, Σ, αk9cq, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.memory[address] = data;
    }, Σ);
    GameBoyCore.prototype.memoryHighWriteNormal = Σ.addFunction(function αkEJr(parentObj, address, data) {
        var Σ_αkEJr = new Σ.Scope(this, Σ, αkEJr, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.memory[65280 | address] = data;
    }, Σ);
    GameBoyCore.prototype.memoryWriteMBCRAM = Σ.addFunction(function αvYmp(parentObj, address, data) {
        var Σ_αvYmp = new Σ.Scope(this, Σ, αvYmp, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.MBCRAMBanksEnabled || settings[10]) {
            parentObj.MBCRam[address + parentObj.currMBCRAMBankPosition] = data;
        }
    }, Σ);
    GameBoyCore.prototype.memoryWriteMBC3RAM = Σ.addFunction(function α8Bpu(parentObj, address, data) {
        var Σ_α8Bpu = new Σ.Scope(this, Σ, α8Bpu, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.MBCRAMBanksEnabled || settings[10]) {
            switch (parentObj.currMBCRAMBank) {
            case 0:
            case 1:
            case 2:
            case 3:
                parentObj.MBCRam[address + parentObj.currMBCRAMBankPosition] = data;
                break;
            case 8:
                if (data < 60) {
                    parentObj.RTCSeconds = data;
                } else {
                    cout('(Bank #' + parentObj.currMBCRAMBank + ') RTC write out of range: ' + data, 1);
                }
                break;
            case 9:
                if (data < 60) {
                    parentObj.RTCMinutes = data;
                } else {
                    cout('(Bank #' + parentObj.currMBCRAMBank + ') RTC write out of range: ' + data, 1);
                }
                break;
            case 10:
                if (data < 24) {
                    parentObj.RTCHours = data;
                } else {
                    cout('(Bank #' + parentObj.currMBCRAMBank + ') RTC write out of range: ' + data, 1);
                }
                break;
            case 11:
                parentObj.RTCDays = data & 255 | parentObj.RTCDays & 256;
                break;
            case 12:
                parentObj.RTCDayOverFlow = data > 127;
                parentObj.RTCHalt = (data & 64) == 64;
                parentObj.RTCDays = (data & 1) << 8 | parentObj.RTCDays & 255;
                break;
            default:
                cout('Invalid MBC3 bank address selected: ' + parentObj.currMBCRAMBank, 0);
            }
        }
    }, Σ);
    GameBoyCore.prototype.memoryWriteGBCRAM = Σ.addFunction(function α44vv(parentObj, address, data) {
        var Σ_α44vv = new Σ.Scope(this, Σ, α44vv, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.GBCMemory[address + parentObj.gbcRamBankPosition] = data;
    }, Σ);
    GameBoyCore.prototype.memoryWriteOAMRAM = Σ.addFunction(function αCwKq(parentObj, address, data) {
        var Σ_αCwKq = new Σ.Scope(this, Σ, αCwKq, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.modeSTAT < 2) {
            if (parentObj.memory[address] != data) {
                parentObj.graphicsJIT();
                parentObj.memory[address] = data;
            }
        }
    }, Σ);
    GameBoyCore.prototype.memoryWriteECHOGBCRAM = Σ.addFunction(function αsIhw(parentObj, address, data) {
        var Σ_αsIhw = new Σ.Scope(this, Σ, αsIhw, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.GBCMemory[address + parentObj.gbcRamBankPositionECHO] = data;
    }, Σ);
    GameBoyCore.prototype.memoryWriteECHONormal = Σ.addFunction(function αsN9w(parentObj, address, data) {
        var Σ_αsN9w = new Σ.Scope(this, Σ, αsN9w, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        parentObj.memory[address - 8192] = data;
    }, Σ);
    GameBoyCore.prototype.VRAMGBDATAWrite = Σ.addFunction(function αuysS(parentObj, address, data) {
        var Σ_αuysS = new Σ.Scope(this, Σ, αuysS, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.modeSTAT < 3) {
            if (parentObj.memory[address] != data) {
                parentObj.graphicsJIT();
                parentObj.memory[address] = data;
                parentObj.generateGBOAMTileLine(address);
            }
        }
    }, Σ);
    GameBoyCore.prototype.VRAMGBDATAUpperWrite = Σ.addFunction(function αgKv5(parentObj, address, data) {
        var Σ_αgKv5 = new Σ.Scope(this, Σ, αgKv5, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.modeSTAT < 3) {
            if (parentObj.memory[address] != data) {
                parentObj.graphicsJIT();
                parentObj.memory[address] = data;
                parentObj.generateGBTileLine(address);
            }
        }
    }, Σ);
    GameBoyCore.prototype.VRAMGBCDATAWrite = Σ.addFunction(function αO3Jd(parentObj, address, data) {
        var Σ_αO3Jd = new Σ.Scope(this, Σ, αO3Jd, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.modeSTAT < 3) {
            if (parentObj.currVRAMBank == 0) {
                if (parentObj.memory[address] != data) {
                    parentObj.graphicsJIT();
                    parentObj.memory[address] = data;
                    parentObj.generateGBCTileLineBank1(address);
                }
            } else {
                address &= 8191;
                if (parentObj.VRAM[address] != data) {
                    parentObj.graphicsJIT();
                    parentObj.VRAM[address] = data;
                    parentObj.generateGBCTileLineBank2(address);
                }
            }
        }
    }, Σ);
    GameBoyCore.prototype.VRAMGBCHRMAPWrite = Σ.addFunction(function αRgTn(parentObj, address, data) {
        var Σ_αRgTn = new Σ.Scope(this, Σ, αRgTn, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.modeSTAT < 3) {
            address &= 2047;
            if (parentObj.BGCHRBank1[address] != data) {
                parentObj.graphicsJIT();
                parentObj.BGCHRBank1[address] = data;
            }
        }
    }, Σ);
    GameBoyCore.prototype.VRAMGBCCHRMAPWrite = Σ.addFunction(function αtJsu(parentObj, address, data) {
        var Σ_αtJsu = new Σ.Scope(this, Σ, αtJsu, function () {
            return this.capture({
                parentObj: parentObj,
                address: address,
                data: data
            }, {});
        });
        if (parentObj.modeSTAT < 3) {
            address &= 2047;
            if (parentObj.BGCHRCurrentBank[address] != data) {
                parentObj.graphicsJIT();
                parentObj.BGCHRCurrentBank[address] = data;
            }
        }
    }, Σ);
    GameBoyCore.prototype.DMAWrite = Σ.addFunction(function αXF0J(tilesToTransfer) {
        var Σ_αXF0J = new Σ.Scope(this, Σ, αXF0J, function () {
            return this.capture({ tilesToTransfer: tilesToTransfer }, {
                source: source,
                destination: destination,
                memoryReader: memoryReader,
                memory: memory
            });
        });
        if (!this.halt) {
            this.CPUTicks += 4 | tilesToTransfer << 5 << this.doubleSpeedShifter;
        }
        var source = this.memory[65361] << 8 | this.memory[65362];
        var destination = this.memory[65363] << 8 | this.memory[65364];
        var memoryReader = this.memoryReader;
        this.graphicsJIT();
        var memory = this.memory;
        if (this.currVRAMBank == 0) {
            do {
                if (destination < 6144) {
                    memory[32768 | destination] = memoryReader[source](this, source++);
                    memory[32769 | destination] = memoryReader[source](this, source++);
                    memory[32770 | destination] = memoryReader[source](this, source++);
                    memory[32771 | destination] = memoryReader[source](this, source++);
                    memory[32772 | destination] = memoryReader[source](this, source++);
                    memory[32773 | destination] = memoryReader[source](this, source++);
                    memory[32774 | destination] = memoryReader[source](this, source++);
                    memory[32775 | destination] = memoryReader[source](this, source++);
                    memory[32776 | destination] = memoryReader[source](this, source++);
                    memory[32777 | destination] = memoryReader[source](this, source++);
                    memory[32778 | destination] = memoryReader[source](this, source++);
                    memory[32779 | destination] = memoryReader[source](this, source++);
                    memory[32780 | destination] = memoryReader[source](this, source++);
                    memory[32781 | destination] = memoryReader[source](this, source++);
                    memory[32782 | destination] = memoryReader[source](this, source++);
                    memory[32783 | destination] = memoryReader[source](this, source++);
                    this.generateGBCTileBank1(destination);
                    destination += 16;
                } else {
                    destination &= 2032;
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank1[destination++] = memoryReader[source](this, source++);
                    destination = destination + 6144 & 8176;
                }
                source &= 65520;
                --tilesToTransfer;
            } while (tilesToTransfer > 0);
        } else {
            var VRAM = this.VRAM;
            do {
                if (destination < 6144) {
                    VRAM[destination] = memoryReader[source](this, source++);
                    VRAM[destination | 1] = memoryReader[source](this, source++);
                    VRAM[destination | 2] = memoryReader[source](this, source++);
                    VRAM[destination | 3] = memoryReader[source](this, source++);
                    VRAM[destination | 4] = memoryReader[source](this, source++);
                    VRAM[destination | 5] = memoryReader[source](this, source++);
                    VRAM[destination | 6] = memoryReader[source](this, source++);
                    VRAM[destination | 7] = memoryReader[source](this, source++);
                    VRAM[destination | 8] = memoryReader[source](this, source++);
                    VRAM[destination | 9] = memoryReader[source](this, source++);
                    VRAM[destination | 10] = memoryReader[source](this, source++);
                    VRAM[destination | 11] = memoryReader[source](this, source++);
                    VRAM[destination | 12] = memoryReader[source](this, source++);
                    VRAM[destination | 13] = memoryReader[source](this, source++);
                    VRAM[destination | 14] = memoryReader[source](this, source++);
                    VRAM[destination | 15] = memoryReader[source](this, source++);
                    this.generateGBCTileBank2(destination);
                    destination += 16;
                } else {
                    destination &= 2032;
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    this.BGCHRBank2[destination++] = memoryReader[source](this, source++);
                    destination = destination + 6144 & 8176;
                }
                source &= 65520;
                --tilesToTransfer;
            } while (tilesToTransfer > 0);
        }
        memory[65361] = source >> 8;
        memory[65362] = source & 240;
        memory[65363] = destination >> 8;
        memory[65364] = destination & 240;
    }, Σ);
    GameBoyCore.prototype.registerWriteJumpCompile = Σ.addFunction(function αf3af() {
        var Σ_αf3af = new Σ.Scope(this, Σ, αf3af, function () {
            return this.capture({}, {});
        });
        this.memoryHighWriter[0] = this.memoryWriter[65280] = Σ_αf3af.addFunction(function αSpDv(parentObj, address, data) {
            var Σ_αf3af_αSpDv = new Σ.Scope(this, Σ_αf3af, αSpDv, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.memory[65280] = data & 48 | ((data & 32) == 0 ? parentObj.JoyPad >> 4 : 15) & ((data & 16) == 0 ? parentObj.JoyPad & 15 : 15);
        }, Σ_αf3af);
        this.memoryHighWriter[1] = this.memoryWriter[65281] = Σ_αf3af.addFunction(function α0ZRm(parentObj, address, data) {
            var Σ_αf3af_α0ZRm = new Σ.Scope(this, Σ_αf3af, α0ZRm, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.memory[65282] < 128) {
                parentObj.memory[65281] = data;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[4] = this.memoryWriter[65284] = Σ_αf3af.addFunction(function αBte3(parentObj, address, data) {
            var Σ_αf3af_αBte3 = new Σ.Scope(this, Σ_αf3af, αBte3, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.DIVTicks &= 255;
            parentObj.memory[65284] = 0;
        }, Σ_αf3af);
        this.memoryHighWriter[5] = this.memoryWriter[65285] = Σ_αf3af.addFunction(function αkivk(parentObj, address, data) {
            var Σ_αf3af_αkivk = new Σ.Scope(this, Σ_αf3af, αkivk, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.memory[65285] = data;
        }, Σ_αf3af);
        this.memoryHighWriter[6] = this.memoryWriter[65286] = Σ_αf3af.addFunction(function αe73Q(parentObj, address, data) {
            var Σ_αf3af_αe73Q = new Σ.Scope(this, Σ_αf3af, αe73Q, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.memory[65286] = data;
        }, Σ_αf3af);
        this.memoryHighWriter[7] = this.memoryWriter[65287] = Σ_αf3af.addFunction(function αoGdq(parentObj, address, data) {
            var Σ_αf3af_αoGdq = new Σ.Scope(this, Σ_αf3af, αoGdq, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.memory[65287] = data & 7;
            parentObj.TIMAEnabled = (data & 4) == 4;
            parentObj.TACClocker = Math.pow(4, (data & 3) != 0 ? data & 3 : 4) << 2;
        }, Σ_αf3af);
        this.memoryHighWriter[15] = this.memoryWriter[65295] = Σ_αf3af.addFunction(function αbT9R(parentObj, address, data) {
            var Σ_αf3af_αbT9R = new Σ.Scope(this, Σ_αf3af, αbT9R, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.interruptsRequested = data;
            parentObj.checkIRQMatching();
        }, Σ_αf3af);
        this.memoryHighWriter[16] = this.memoryWriter[65296] = Σ_αf3af.addFunction(function αFJSY(parentObj, address, data) {
            var Σ_αf3af_αFJSY = new Σ.Scope(this, Σ_αf3af, αFJSY, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                if (parentObj.channel1decreaseSweep && (data & 8) == 0) {
                    if (parentObj.channel1numSweep != parentObj.channel1frequencySweepDivider) {
                        parentObj.channel1SweepFault = true;
                    }
                }
                parentObj.channel1lastTimeSweep = (data & 112) >> 4;
                parentObj.channel1frequencySweepDivider = data & 7;
                parentObj.channel1decreaseSweep = (data & 8) == 8;
                parentObj.memory[65296] = data;
                parentObj.channel1EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[17] = this.memoryWriter[65297] = Σ_αf3af.addFunction(function αnXge(parentObj, address, data) {
            var Σ_αf3af_αnXge = new Σ.Scope(this, Σ_αf3af, αnXge, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled || !parentObj.cGBC) {
                if (parentObj.soundMasterEnabled) {
                    parentObj.audioJIT();
                } else {
                    data &= 63;
                }
                parentObj.channel1CachedDuty = parentObj.dutyLookup[data >> 6];
                parentObj.channel1totalLength = 64 - (data & 63);
                parentObj.memory[65297] = data & 192;
                parentObj.channel1EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[18] = this.memoryWriter[65298] = Σ_αf3af.addFunction(function αYZdc(parentObj, address, data) {
            var Σ_αf3af_αYZdc = new Σ.Scope(this, Σ_αf3af, αYZdc, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                if (parentObj.channel1Enabled && parentObj.channel1envelopeSweeps == 0) {
                    if (((parentObj.memory[65298] ^ data) & 8) == 8) {
                        if ((parentObj.memory[65298] & 8) == 0) {
                            if ((parentObj.memory[65298] & 7) == 7) {
                                parentObj.channel1envelopeVolume += 2;
                            } else {
                                ++parentObj.channel1envelopeVolume;
                            }
                        }
                        parentObj.channel1envelopeVolume = 16 - parentObj.channel1envelopeVolume & 15;
                    } else if ((parentObj.memory[65298] & 15) == 8) {
                        parentObj.channel1envelopeVolume = 1 + parentObj.channel1envelopeVolume & 15;
                    }
                    parentObj.channel1OutputLevelCache();
                }
                parentObj.channel1envelopeType = (data & 8) == 8;
                parentObj.memory[65298] = data;
                parentObj.channel1VolumeEnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[19] = this.memoryWriter[65299] = Σ_αf3af.addFunction(function αPMg9(parentObj, address, data) {
            var Σ_αf3af_αPMg9 = new Σ.Scope(this, Σ_αf3af, αPMg9, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                parentObj.channel1frequency = parentObj.channel1frequency & 1792 | data;
                parentObj.channel1FrequencyTracker = 2048 - parentObj.channel1frequency << 2;
                parentObj.memory[65299] = data;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[20] = this.memoryWriter[65300] = Σ_αf3af.addFunction(function αOfXS(parentObj, address, data) {
            var Σ_αf3af_αOfXS = new Σ.Scope(this, Σ_αf3af, αOfXS, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                parentObj.channel1consecutive = (data & 64) == 0;
                parentObj.channel1frequency = (data & 7) << 8 | parentObj.channel1frequency & 255;
                parentObj.channel1FrequencyTracker = 2048 - parentObj.channel1frequency << 2;
                if (data > 127) {
                    parentObj.channel1timeSweep = parentObj.channel1lastTimeSweep;
                    parentObj.channel1numSweep = parentObj.channel1frequencySweepDivider;
                    var nr12 = parentObj.memory[65298];
                    parentObj.channel1envelopeVolume = nr12 >> 4;
                    parentObj.channel1OutputLevelCache();
                    parentObj.channel1envelopeSweepsLast = (nr12 & 7) - 1;
                    if (parentObj.channel1totalLength == 0) {
                        parentObj.channel1totalLength = 64;
                    }
                    if (parentObj.channel1lastTimeSweep > 0 || parentObj.channel1frequencySweepDivider > 0) {
                        parentObj.memory[65318] |= 1;
                    } else {
                        parentObj.memory[65318] &= 254;
                    }
                    if ((data & 64) == 64) {
                        parentObj.memory[65318] |= 1;
                    }
                    parentObj.channel1ShadowFrequency = parentObj.channel1frequency;
                    parentObj.channel1SweepFault = false;
                    parentObj.runAudioSweep();
                }
                parentObj.channel1EnableCheck();
                parentObj.memory[65300] = data & 64;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[22] = this.memoryWriter[65302] = Σ_αf3af.addFunction(function αtuwo(parentObj, address, data) {
            var Σ_αf3af_αtuwo = new Σ.Scope(this, Σ_αf3af, αtuwo, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled || !parentObj.cGBC) {
                if (parentObj.soundMasterEnabled) {
                    parentObj.audioJIT();
                } else {
                    data &= 63;
                }
                parentObj.channel2CachedDuty = parentObj.dutyLookup[data >> 6];
                parentObj.channel2totalLength = 64 - (data & 63);
                parentObj.memory[65302] = data & 192;
                parentObj.channel2EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[23] = this.memoryWriter[65303] = Σ_αf3af.addFunction(function αuYML(parentObj, address, data) {
            var Σ_αf3af_αuYML = new Σ.Scope(this, Σ_αf3af, αuYML, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                if (parentObj.channel2Enabled && parentObj.channel2envelopeSweeps == 0) {
                    if (((parentObj.memory[65303] ^ data) & 8) == 8) {
                        if ((parentObj.memory[65303] & 8) == 0) {
                            if ((parentObj.memory[65303] & 7) == 7) {
                                parentObj.channel2envelopeVolume += 2;
                            } else {
                                ++parentObj.channel2envelopeVolume;
                            }
                        }
                        parentObj.channel2envelopeVolume = 16 - parentObj.channel2envelopeVolume & 15;
                    } else if ((parentObj.memory[65303] & 15) == 8) {
                        parentObj.channel2envelopeVolume = 1 + parentObj.channel2envelopeVolume & 15;
                    }
                    parentObj.channel2OutputLevelCache();
                }
                parentObj.channel2envelopeType = (data & 8) == 8;
                parentObj.memory[65303] = data;
                parentObj.channel2VolumeEnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[24] = this.memoryWriter[65304] = Σ_αf3af.addFunction(function α8SRX(parentObj, address, data) {
            var Σ_αf3af_α8SRX = new Σ.Scope(this, Σ_αf3af, α8SRX, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                parentObj.channel2frequency = parentObj.channel2frequency & 1792 | data;
                parentObj.channel2FrequencyTracker = 2048 - parentObj.channel2frequency << 2;
                parentObj.memory[65304] = data;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[25] = this.memoryWriter[65305] = Σ_αf3af.addFunction(function αy3Xu(parentObj, address, data) {
            var Σ_αf3af_αy3Xu = new Σ.Scope(this, Σ_αf3af, αy3Xu, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                if (data > 127) {
                    var nr22 = parentObj.memory[65303];
                    parentObj.channel2envelopeVolume = nr22 >> 4;
                    parentObj.channel2OutputLevelCache();
                    parentObj.channel2envelopeSweepsLast = (nr22 & 7) - 1;
                    if (parentObj.channel2totalLength == 0) {
                        parentObj.channel2totalLength = 64;
                    }
                    if ((data & 64) == 64) {
                        parentObj.memory[65318] |= 2;
                    }
                }
                parentObj.channel2consecutive = (data & 64) == 0;
                parentObj.channel2frequency = (data & 7) << 8 | parentObj.channel2frequency & 255;
                parentObj.channel2FrequencyTracker = 2048 - parentObj.channel2frequency << 2;
                parentObj.memory[65305] = data & 64;
                parentObj.channel2EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[26] = this.memoryWriter[65306] = Σ_αf3af.addFunction(function αrd6Z(parentObj, address, data) {
            var Σ_αf3af_αrd6Z = new Σ.Scope(this, Σ_αf3af, αrd6Z, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                if (!parentObj.channel3canPlay && data >= 128) {
                    parentObj.channel3lastSampleLookup = 0;
                    parentObj.channel3UpdateCache();
                }
                parentObj.channel3canPlay = data > 127;
                if (parentObj.channel3canPlay && parentObj.memory[65306] > 127 && !parentObj.channel3consecutive) {
                    parentObj.memory[65318] |= 4;
                }
                parentObj.memory[65306] = data & 128;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[27] = this.memoryWriter[65307] = Σ_αf3af.addFunction(function α2IFy(parentObj, address, data) {
            var Σ_αf3af_α2IFy = new Σ.Scope(this, Σ_αf3af, α2IFy, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled || !parentObj.cGBC) {
                if (parentObj.soundMasterEnabled) {
                    parentObj.audioJIT();
                }
                parentObj.channel3totalLength = 256 - data;
                parentObj.memory[65307] = data;
                parentObj.channel3EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[28] = this.memoryWriter[65308] = Σ_αf3af.addFunction(function αkQo2(parentObj, address, data) {
            var Σ_αf3af_αkQo2 = new Σ.Scope(this, Σ_αf3af, αkQo2, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                data &= 96;
                parentObj.memory[65308] = data;
                parentObj.channel3patternType = data == 0 ? 4 : (data >> 5) - 1;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[29] = this.memoryWriter[65309] = Σ_αf3af.addFunction(function αa32z(parentObj, address, data) {
            var Σ_αf3af_αa32z = new Σ.Scope(this, Σ_αf3af, αa32z, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                parentObj.channel3frequency = parentObj.channel3frequency & 1792 | data;
                parentObj.channel3FrequencyPeriod = 2048 - parentObj.channel3frequency << 1;
                parentObj.memory[65309] = data;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[30] = this.memoryWriter[65310] = Σ_αf3af.addFunction(function αMJ4y(parentObj, address, data) {
            var Σ_αf3af_αMJ4y = new Σ.Scope(this, Σ_αf3af, αMJ4y, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                if (data > 127) {
                    if (parentObj.channel3totalLength == 0) {
                        parentObj.channel3totalLength = 256;
                    }
                    parentObj.channel3lastSampleLookup = 0;
                    if ((data & 64) == 64) {
                        parentObj.memory[65318] |= 4;
                    }
                }
                parentObj.channel3consecutive = (data & 64) == 0;
                parentObj.channel3frequency = (data & 7) << 8 | parentObj.channel3frequency & 255;
                parentObj.channel3FrequencyPeriod = 2048 - parentObj.channel3frequency << 1;
                parentObj.memory[65310] = data & 64;
                parentObj.channel3EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[32] = this.memoryWriter[65312] = Σ_αf3af.addFunction(function αNmP6(parentObj, address, data) {
            var Σ_αf3af_αNmP6 = new Σ.Scope(this, Σ_αf3af, αNmP6, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled || !parentObj.cGBC) {
                if (parentObj.soundMasterEnabled) {
                    parentObj.audioJIT();
                }
                parentObj.channel4totalLength = 64 - (data & 63);
                parentObj.memory[65312] = data | 192;
                parentObj.channel4EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[33] = this.memoryWriter[65313] = Σ_αf3af.addFunction(function αOMc9(parentObj, address, data) {
            var Σ_αf3af_αOMc9 = new Σ.Scope(this, Σ_αf3af, αOMc9, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                if (parentObj.channel4Enabled && parentObj.channel4envelopeSweeps == 0) {
                    if (((parentObj.memory[65313] ^ data) & 8) == 8) {
                        if ((parentObj.memory[65313] & 8) == 0) {
                            if ((parentObj.memory[65313] & 7) == 7) {
                                parentObj.channel4envelopeVolume += 2;
                            } else {
                                ++parentObj.channel4envelopeVolume;
                            }
                        }
                        parentObj.channel4envelopeVolume = 16 - parentObj.channel4envelopeVolume & 15;
                    } else if ((parentObj.memory[65313] & 15) == 8) {
                        parentObj.channel4envelopeVolume = 1 + parentObj.channel4envelopeVolume & 15;
                    }
                    parentObj.channel4currentVolume = parentObj.channel4envelopeVolume << parentObj.channel4VolumeShifter;
                }
                parentObj.channel4envelopeType = (data & 8) == 8;
                parentObj.memory[65313] = data;
                parentObj.channel4UpdateCache();
                parentObj.channel4VolumeEnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[34] = this.memoryWriter[65314] = Σ_αf3af.addFunction(function αLREi(parentObj, address, data) {
            var Σ_αf3af_αLREi = new Σ.Scope(this, Σ_αf3af, αLREi, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                parentObj.channel4FrequencyPeriod = Math.max((data & 7) << 4, 8) << (data >> 4);
                var bitWidth = data & 8;
                if (bitWidth == 8 && parentObj.channel4BitRange == 32767 || bitWidth == 0 && parentObj.channel4BitRange == 127) {
                    parentObj.channel4lastSampleLookup = 0;
                    parentObj.channel4BitRange = bitWidth == 8 ? 127 : 32767;
                    parentObj.channel4VolumeShifter = bitWidth == 8 ? 7 : 15;
                    parentObj.channel4currentVolume = parentObj.channel4envelopeVolume << parentObj.channel4VolumeShifter;
                    parentObj.noiseSampleTable = bitWidth == 8 ? parentObj.LSFR7Table : parentObj.LSFR15Table;
                }
                parentObj.memory[65314] = data;
                parentObj.channel4UpdateCache();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[35] = this.memoryWriter[65315] = Σ_αf3af.addFunction(function αJTXz(parentObj, address, data) {
            var Σ_αf3af_αJTXz = new Σ.Scope(this, Σ_αf3af, αJTXz, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled) {
                parentObj.audioJIT();
                parentObj.memory[65315] = data;
                parentObj.channel4consecutive = (data & 64) == 0;
                if (data > 127) {
                    var nr42 = parentObj.memory[65313];
                    parentObj.channel4envelopeVolume = nr42 >> 4;
                    parentObj.channel4currentVolume = parentObj.channel4envelopeVolume << parentObj.channel4VolumeShifter;
                    parentObj.channel4envelopeSweepsLast = (nr42 & 7) - 1;
                    if (parentObj.channel4totalLength == 0) {
                        parentObj.channel4totalLength = 64;
                    }
                    if ((data & 64) == 64) {
                        parentObj.memory[65318] |= 8;
                    }
                }
                parentObj.channel4EnableCheck();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[36] = this.memoryWriter[65316] = Σ_αf3af.addFunction(function α1OE6(parentObj, address, data) {
            var Σ_αf3af_α1OE6 = new Σ.Scope(this, Σ_αf3af, α1OE6, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled && parentObj.memory[65316] != data) {
                parentObj.audioJIT();
                parentObj.memory[65316] = data;
                parentObj.VinLeftChannelMasterVolume = (data >> 4 & 7) + 1;
                parentObj.VinRightChannelMasterVolume = (data & 7) + 1;
                parentObj.mixerOutputLevelCache();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[37] = this.memoryWriter[65317] = Σ_αf3af.addFunction(function α4Jsw(parentObj, address, data) {
            var Σ_αf3af_α4Jsw = new Σ.Scope(this, Σ_αf3af, α4Jsw, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.soundMasterEnabled && parentObj.memory[65317] != data) {
                parentObj.audioJIT();
                parentObj.memory[65317] = data;
                parentObj.rightChannel1 = (data & 1) == 1;
                parentObj.rightChannel2 = (data & 2) == 2;
                parentObj.rightChannel3 = (data & 4) == 4;
                parentObj.rightChannel4 = (data & 8) == 8;
                parentObj.leftChannel1 = (data & 16) == 16;
                parentObj.leftChannel2 = (data & 32) == 32;
                parentObj.leftChannel3 = (data & 64) == 64;
                parentObj.leftChannel4 = data > 127;
                parentObj.channel1OutputLevelCache();
                parentObj.channel2OutputLevelCache();
                parentObj.channel3OutputLevelCache();
                parentObj.channel4OutputLevelCache();
            }
        }, Σ_αf3af);
        this.memoryHighWriter[38] = this.memoryWriter[65318] = Σ_αf3af.addFunction(function αZzoQ(parentObj, address, data) {
            var Σ_αf3af_αZzoQ = new Σ.Scope(this, Σ_αf3af, αZzoQ, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.audioJIT();
            if (!parentObj.soundMasterEnabled && data > 127) {
                parentObj.memory[65318] = 128;
                parentObj.soundMasterEnabled = true;
                parentObj.initializeAudioStartState();
            } else if (parentObj.soundMasterEnabled && data < 128) {
                parentObj.memory[65318] = 0;
                parentObj.soundMasterEnabled = false;
                for (var index = 65296; index < 65318; index++) {
                    parentObj.memoryWriter[index](parentObj, index, 0);
                }
            }
        }, Σ_αf3af);
        this.memoryHighWriter[39] = this.memoryWriter[65319] = this.cartIgnoreWrite;
        this.memoryHighWriter[40] = this.memoryWriter[65320] = this.cartIgnoreWrite;
        this.memoryHighWriter[41] = this.memoryWriter[65321] = this.cartIgnoreWrite;
        this.memoryHighWriter[42] = this.memoryWriter[65322] = this.cartIgnoreWrite;
        this.memoryHighWriter[43] = this.memoryWriter[65323] = this.cartIgnoreWrite;
        this.memoryHighWriter[44] = this.memoryWriter[65324] = this.cartIgnoreWrite;
        this.memoryHighWriter[45] = this.memoryWriter[65325] = this.cartIgnoreWrite;
        this.memoryHighWriter[46] = this.memoryWriter[65326] = this.cartIgnoreWrite;
        this.memoryHighWriter[47] = this.memoryWriter[65327] = this.cartIgnoreWrite;
        this.memoryHighWriter[48] = this.memoryWriter[65328] = Σ_αf3af.addFunction(function α6eFB(parentObj, address, data) {
            var Σ_αf3af_α6eFB = new Σ.Scope(this, Σ_αf3af, α6eFB, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(0, data);
        }, Σ_αf3af);
        this.memoryHighWriter[49] = this.memoryWriter[65329] = Σ_αf3af.addFunction(function αavcP(parentObj, address, data) {
            var Σ_αf3af_αavcP = new Σ.Scope(this, Σ_αf3af, αavcP, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(1, data);
        }, Σ_αf3af);
        this.memoryHighWriter[50] = this.memoryWriter[65330] = Σ_αf3af.addFunction(function αWaN8(parentObj, address, data) {
            var Σ_αf3af_αWaN8 = new Σ.Scope(this, Σ_αf3af, αWaN8, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(2, data);
        }, Σ_αf3af);
        this.memoryHighWriter[51] = this.memoryWriter[65331] = Σ_αf3af.addFunction(function αl6Al(parentObj, address, data) {
            var Σ_αf3af_αl6Al = new Σ.Scope(this, Σ_αf3af, αl6Al, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(3, data);
        }, Σ_αf3af);
        this.memoryHighWriter[52] = this.memoryWriter[65332] = Σ_αf3af.addFunction(function α81nX(parentObj, address, data) {
            var Σ_αf3af_α81nX = new Σ.Scope(this, Σ_αf3af, α81nX, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(4, data);
        }, Σ_αf3af);
        this.memoryHighWriter[53] = this.memoryWriter[65333] = Σ_αf3af.addFunction(function αIGFW(parentObj, address, data) {
            var Σ_αf3af_αIGFW = new Σ.Scope(this, Σ_αf3af, αIGFW, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(5, data);
        }, Σ_αf3af);
        this.memoryHighWriter[54] = this.memoryWriter[65334] = Σ_αf3af.addFunction(function α2lMv(parentObj, address, data) {
            var Σ_αf3af_α2lMv = new Σ.Scope(this, Σ_αf3af, α2lMv, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(6, data);
        }, Σ_αf3af);
        this.memoryHighWriter[55] = this.memoryWriter[65335] = Σ_αf3af.addFunction(function αycl6(parentObj, address, data) {
            var Σ_αf3af_αycl6 = new Σ.Scope(this, Σ_αf3af, αycl6, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(7, data);
        }, Σ_αf3af);
        this.memoryHighWriter[56] = this.memoryWriter[65336] = Σ_αf3af.addFunction(function αKzlk(parentObj, address, data) {
            var Σ_αf3af_αKzlk = new Σ.Scope(this, Σ_αf3af, αKzlk, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(8, data);
        }, Σ_αf3af);
        this.memoryHighWriter[57] = this.memoryWriter[65337] = Σ_αf3af.addFunction(function αbguq(parentObj, address, data) {
            var Σ_αf3af_αbguq = new Σ.Scope(this, Σ_αf3af, αbguq, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(9, data);
        }, Σ_αf3af);
        this.memoryHighWriter[58] = this.memoryWriter[65338] = Σ_αf3af.addFunction(function αLLNF(parentObj, address, data) {
            var Σ_αf3af_αLLNF = new Σ.Scope(this, Σ_αf3af, αLLNF, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(10, data);
        }, Σ_αf3af);
        this.memoryHighWriter[59] = this.memoryWriter[65339] = Σ_αf3af.addFunction(function αxKGQ(parentObj, address, data) {
            var Σ_αf3af_αxKGQ = new Σ.Scope(this, Σ_αf3af, αxKGQ, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(11, data);
        }, Σ_αf3af);
        this.memoryHighWriter[60] = this.memoryWriter[65340] = Σ_αf3af.addFunction(function αHNlv(parentObj, address, data) {
            var Σ_αf3af_αHNlv = new Σ.Scope(this, Σ_αf3af, αHNlv, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(12, data);
        }, Σ_αf3af);
        this.memoryHighWriter[61] = this.memoryWriter[65341] = Σ_αf3af.addFunction(function αGiuc(parentObj, address, data) {
            var Σ_αf3af_αGiuc = new Σ.Scope(this, Σ_αf3af, αGiuc, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(13, data);
        }, Σ_αf3af);
        this.memoryHighWriter[62] = this.memoryWriter[65342] = Σ_αf3af.addFunction(function αZ9x5(parentObj, address, data) {
            var Σ_αf3af_αZ9x5 = new Σ.Scope(this, Σ_αf3af, αZ9x5, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(14, data);
        }, Σ_αf3af);
        this.memoryHighWriter[63] = this.memoryWriter[65343] = Σ_αf3af.addFunction(function αvIPA(parentObj, address, data) {
            var Σ_αf3af_αvIPA = new Σ.Scope(this, Σ_αf3af, αvIPA, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.channel3WriteRAM(15, data);
        }, Σ_αf3af);
        this.memoryHighWriter[66] = this.memoryWriter[65346] = Σ_αf3af.addFunction(function αWWzL(parentObj, address, data) {
            var Σ_αf3af_αWWzL = new Σ.Scope(this, Σ_αf3af, αWWzL, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.backgroundY != data) {
                parentObj.midScanLineJIT();
                parentObj.backgroundY = data;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[67] = this.memoryWriter[65347] = Σ_αf3af.addFunction(function αhKHN(parentObj, address, data) {
            var Σ_αf3af_αhKHN = new Σ.Scope(this, Σ_αf3af, αhKHN, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.backgroundX != data) {
                parentObj.midScanLineJIT();
                parentObj.backgroundX = data;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[68] = this.memoryWriter[65348] = Σ_αf3af.addFunction(function αVeaM(parentObj, address, data) {
            var Σ_αf3af_αVeaM = new Σ.Scope(this, Σ_αf3af, αVeaM, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.LCDisOn) {
                parentObj.modeSTAT = 2;
                parentObj.midScanlineOffset = -1;
                parentObj.totalLinesPassed = parentObj.currentX = parentObj.queuedScanLines = parentObj.lastUnrenderedLine = parentObj.LCDTicks = parentObj.STATTracker = parentObj.actualScanLine = parentObj.memory[65348] = 0;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[69] = this.memoryWriter[65349] = Σ_αf3af.addFunction(function αOs6J(parentObj, address, data) {
            var Σ_αf3af_αOs6J = new Σ.Scope(this, Σ_αf3af, αOs6J, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.memory[65349] != data) {
                parentObj.memory[65349] = data;
                if (parentObj.LCDisOn) {
                    parentObj.matchLYC();
                }
            }
        }, Σ_αf3af);
        this.memoryHighWriter[74] = this.memoryWriter[65354] = Σ_αf3af.addFunction(function αlrfo(parentObj, address, data) {
            var Σ_αf3af_αlrfo = new Σ.Scope(this, Σ_αf3af, αlrfo, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.windowY != data) {
                parentObj.midScanLineJIT();
                parentObj.windowY = data;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[75] = this.memoryWriter[65355] = Σ_αf3af.addFunction(function α87E3(parentObj, address, data) {
            var Σ_αf3af_α87E3 = new Σ.Scope(this, Σ_αf3af, α87E3, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            if (parentObj.memory[65355] != data) {
                parentObj.midScanLineJIT();
                parentObj.memory[65355] = data;
                parentObj.windowX = data - 7;
            }
        }, Σ_αf3af);
        this.memoryHighWriter[114] = this.memoryWriter[65394] = Σ_αf3af.addFunction(function αPy3q(parentObj, address, data) {
            var Σ_αf3af_αPy3q = new Σ.Scope(this, Σ_αf3af, αPy3q, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.memory[65394] = data;
        }, Σ_αf3af);
        this.memoryHighWriter[115] = this.memoryWriter[65395] = Σ_αf3af.addFunction(function αv0km(parentObj, address, data) {
            var Σ_αf3af_αv0km = new Σ.Scope(this, Σ_αf3af, αv0km, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.memory[65395] = data;
        }, Σ_αf3af);
        this.memoryHighWriter[117] = this.memoryWriter[65397] = Σ_αf3af.addFunction(function αsbWp(parentObj, address, data) {
            var Σ_αf3af_αsbWp = new Σ.Scope(this, Σ_αf3af, αsbWp, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.memory[65397] = data;
        }, Σ_αf3af);
        this.memoryHighWriter[118] = this.memoryWriter[65398] = this.cartIgnoreWrite;
        this.memoryHighWriter[119] = this.memoryWriter[65399] = this.cartIgnoreWrite;
        this.memoryHighWriter[255] = this.memoryWriter[65535] = Σ_αf3af.addFunction(function αZUD4(parentObj, address, data) {
            var Σ_αf3af_αZUD4 = new Σ.Scope(this, Σ_αf3af, αZUD4, function () {
                return this.capture({
                    parentObj: parentObj,
                    address: address,
                    data: data
                }, {});
            });
            parentObj.interruptsEnabled = data;
            parentObj.checkIRQMatching();
        }, Σ_αf3af);
        this.recompileModelSpecificIOWriteHandling();
        this.recompileBootIOWriteHandling();
    }, Σ);
    GameBoyCore.prototype.recompileModelSpecificIOWriteHandling = Σ.addFunction(function αnLes() {
        var Σ_αnLes = new Σ.Scope(this, Σ, αnLes, function () {
            return this.capture({}, {});
        });
        if (this.cGBC) {
            this.memoryHighWriter[2] = this.memoryWriter[65282] = Σ_αnLes.addFunction(function αgmf7(parentObj, address, data) {
                var Σ_αnLes_αgmf7 = new Σ.Scope(this, Σ_αnLes, αgmf7, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if ((data & 1) == 1) {
                    parentObj.memory[65282] = data & 127;
                    parentObj.serialTimer = (data & 2) == 0 ? 4096 : 128;
                    parentObj.serialShiftTimer = parentObj.serialShiftTimerAllocated = (data & 2) == 0 ? 512 : 16;
                } else {
                    parentObj.memory[65282] = data;
                    parentObj.serialShiftTimer = parentObj.serialShiftTimerAllocated = parentObj.serialTimer = 0;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[64] = this.memoryWriter[65344] = Σ_αnLes.addFunction(function αbelo(parentObj, address, data) {
                var Σ_αnLes_αbelo = new Σ.Scope(this, Σ_αnLes, αbelo, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (parentObj.memory[65344] != data) {
                    parentObj.midScanLineJIT();
                    var temp_var = data > 127;
                    if (temp_var != parentObj.LCDisOn) {
                        parentObj.LCDisOn = temp_var;
                        parentObj.memory[65345] &= 120;
                        parentObj.midScanlineOffset = -1;
                        parentObj.totalLinesPassed = parentObj.currentX = parentObj.queuedScanLines = parentObj.lastUnrenderedLine = parentObj.STATTracker = parentObj.LCDTicks = parentObj.actualScanLine = parentObj.memory[65348] = 0;
                        if (parentObj.LCDisOn) {
                            parentObj.modeSTAT = 2;
                            parentObj.matchLYC();
                            parentObj.LCDCONTROL = parentObj.LINECONTROL;
                        } else {
                            parentObj.modeSTAT = 0;
                            parentObj.LCDCONTROL = parentObj.DISPLAYOFFCONTROL;
                            parentObj.DisplayShowOff();
                        }
                        parentObj.interruptsRequested &= 253;
                    }
                    parentObj.gfxWindowCHRBankPosition = (data & 64) == 64 ? 1024 : 0;
                    parentObj.gfxWindowDisplay = (data & 32) == 32;
                    parentObj.gfxBackgroundBankOffset = (data & 16) == 16 ? 0 : 128;
                    parentObj.gfxBackgroundCHRBankPosition = (data & 8) == 8 ? 1024 : 0;
                    parentObj.gfxSpriteNormalHeight = (data & 4) == 0;
                    parentObj.gfxSpriteShow = (data & 2) == 2;
                    parentObj.BGPriorityEnabled = (data & 1) == 1;
                    parentObj.priorityFlaggingPathRebuild();
                    parentObj.memory[65344] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[65] = this.memoryWriter[65345] = Σ_αnLes.addFunction(function α49WN(parentObj, address, data) {
                var Σ_αnLes_α49WN = new Σ.Scope(this, Σ_αnLes, α49WN, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.LYCMatchTriggerSTAT = (data & 64) == 64;
                parentObj.mode2TriggerSTAT = (data & 32) == 32;
                parentObj.mode1TriggerSTAT = (data & 16) == 16;
                parentObj.mode0TriggerSTAT = (data & 8) == 8;
                parentObj.memory[65345] = data & 120;
            }, Σ_αnLes);
            this.memoryHighWriter[70] = this.memoryWriter[65350] = Σ_αnLes.addFunction(function αNgBB(parentObj, address, data) {
                var Σ_αnLes_αNgBB = new Σ.Scope(this, Σ_αnLes, αNgBB, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.memory[65350] = data;
                if (data < 224) {
                    data <<= 8;
                    address = 65024;
                    var stat = parentObj.modeSTAT;
                    parentObj.modeSTAT = 0;
                    var newData = 0;
                    do {
                        newData = parentObj.memoryReader[data](parentObj, data++);
                        if (newData != parentObj.memory[address]) {
                            parentObj.modeSTAT = stat;
                            parentObj.graphicsJIT();
                            parentObj.modeSTAT = 0;
                            parentObj.memory[address++] = newData;
                            break;
                        }
                    } while (++address < 65184);
                    if (address < 65184) {
                        do {
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                        } while (address < 65184);
                    }
                    parentObj.modeSTAT = stat;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[77] = this.memoryWriter[65357] = Σ_αnLes.addFunction(function αMViC(parentObj, address, data) {
                var Σ_αnLes_αMViC = new Σ.Scope(this, Σ_αnLes, αMViC, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.memory[65357] = data & 127 | parentObj.memory[65357] & 128;
            }, Σ_αnLes);
            this.memoryHighWriter[79] = this.memoryWriter[65359] = Σ_αnLes.addFunction(function αWQC0(parentObj, address, data) {
                var Σ_αnLes_αWQC0 = new Σ.Scope(this, Σ_αnLes, αWQC0, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.currVRAMBank = data & 1;
                if (parentObj.currVRAMBank > 0) {
                    parentObj.BGCHRCurrentBank = parentObj.BGCHRBank2;
                } else {
                    parentObj.BGCHRCurrentBank = parentObj.BGCHRBank1;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[81] = this.memoryWriter[65361] = Σ_αnLes.addFunction(function αoJQu(parentObj, address, data) {
                var Σ_αnLes_αoJQu = new Σ.Scope(this, Σ_αnLes, αoJQu, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (!parentObj.hdmaRunning) {
                    parentObj.memory[65361] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[82] = this.memoryWriter[65362] = Σ_αnLes.addFunction(function αR8dc(parentObj, address, data) {
                var Σ_αnLes_αR8dc = new Σ.Scope(this, Σ_αnLes, αR8dc, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (!parentObj.hdmaRunning) {
                    parentObj.memory[65362] = data & 240;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[83] = this.memoryWriter[65363] = Σ_αnLes.addFunction(function αSawz(parentObj, address, data) {
                var Σ_αnLes_αSawz = new Σ.Scope(this, Σ_αnLes, αSawz, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (!parentObj.hdmaRunning) {
                    parentObj.memory[65363] = data & 31;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[84] = this.memoryWriter[65364] = Σ_αnLes.addFunction(function αxh0c(parentObj, address, data) {
                var Σ_αnLes_αxh0c = new Σ.Scope(this, Σ_αnLes, αxh0c, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (!parentObj.hdmaRunning) {
                    parentObj.memory[65364] = data & 240;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[85] = this.memoryWriter[65365] = Σ_αnLes.addFunction(function α9IQz(parentObj, address, data) {
                var Σ_αnLes_α9IQz = new Σ.Scope(this, Σ_αnLes, α9IQz, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (!parentObj.hdmaRunning) {
                    if ((data & 128) == 0) {
                        parentObj.DMAWrite((data & 127) + 1);
                        parentObj.memory[65365] = 255;
                    } else {
                        parentObj.hdmaRunning = true;
                        parentObj.memory[65365] = data & 127;
                    }
                } else if ((data & 128) == 0) {
                    parentObj.hdmaRunning = false;
                    parentObj.memory[65365] |= 128;
                } else {
                    parentObj.memory[65365] = data & 127;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[104] = this.memoryWriter[65384] = Σ_αnLes.addFunction(function α49oC(parentObj, address, data) {
                var Σ_αnLes_α49oC = new Σ.Scope(this, Σ_αnLes, α49oC, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.memory[65385] = parentObj.gbcBGRawPalette[data & 63];
                parentObj.memory[65384] = data;
            }, Σ_αnLes);
            this.memoryHighWriter[105] = this.memoryWriter[65385] = Σ_αnLes.addFunction(function α7jXX(parentObj, address, data) {
                var Σ_αnLes_α7jXX = new Σ.Scope(this, Σ_αnLes, α7jXX, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.updateGBCBGPalette(parentObj.memory[65384] & 63, data);
                if (parentObj.memory[65384] > 127) {
                    var next = parentObj.memory[65384] + 1 & 63;
                    parentObj.memory[65384] = next | 128;
                    parentObj.memory[65385] = parentObj.gbcBGRawPalette[next];
                } else {
                    parentObj.memory[65385] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[106] = this.memoryWriter[65386] = Σ_αnLes.addFunction(function αMiNN(parentObj, address, data) {
                var Σ_αnLes_αMiNN = new Σ.Scope(this, Σ_αnLes, αMiNN, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.memory[65387] = parentObj.gbcOBJRawPalette[data & 63];
                parentObj.memory[65386] = data;
            }, Σ_αnLes);
            this.memoryHighWriter[107] = this.memoryWriter[65387] = Σ_αnLes.addFunction(function αiyOe(parentObj, address, data) {
                var Σ_αnLes_αiyOe = new Σ.Scope(this, Σ_αnLes, αiyOe, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.updateGBCOBJPalette(parentObj.memory[65386] & 63, data);
                if (parentObj.memory[65386] > 127) {
                    var next = parentObj.memory[65386] + 1 & 63;
                    parentObj.memory[65386] = next | 128;
                    parentObj.memory[65387] = parentObj.gbcOBJRawPalette[next];
                } else {
                    parentObj.memory[65387] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[112] = this.memoryWriter[65392] = Σ_αnLes.addFunction(function αDkvS(parentObj, address, data) {
                var Σ_αnLes_αDkvS = new Σ.Scope(this, Σ_αnLes, αDkvS, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, { addressCheck: addressCheck });
                });
                var addressCheck = parentObj.memory[65361] << 8 | parentObj.memory[65362];
                if (!parentObj.hdmaRunning || addressCheck < 53248 || addressCheck >= 57344) {
                    parentObj.gbcRamBank = Math.max(data & 7, 1);
                    parentObj.gbcRamBankPosition = (parentObj.gbcRamBank - 1 << 12) - 53248;
                    parentObj.gbcRamBankPositionECHO = parentObj.gbcRamBankPosition - 8192;
                }
                parentObj.memory[65392] = data;
            }, Σ_αnLes);
            this.memoryHighWriter[116] = this.memoryWriter[65396] = Σ_αnLes.addFunction(function αr5SM(parentObj, address, data) {
                var Σ_αnLes_αr5SM = new Σ.Scope(this, Σ_αnLes, αr5SM, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.memory[65396] = data;
            }, Σ_αnLes);
        } else {
            this.memoryHighWriter[2] = this.memoryWriter[65282] = Σ_αnLes.addFunction(function αIZEd(parentObj, address, data) {
                var Σ_αnLes_αIZEd = new Σ.Scope(this, Σ_αnLes, αIZEd, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if ((data & 1) == 1) {
                    parentObj.memory[65282] = data & 127;
                    parentObj.serialTimer = 4096;
                    parentObj.serialShiftTimer = parentObj.serialShiftTimerAllocated = 512;
                } else {
                    parentObj.memory[65282] = data;
                    parentObj.serialShiftTimer = parentObj.serialShiftTimerAllocated = parentObj.serialTimer = 0;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[64] = this.memoryWriter[65344] = Σ_αnLes.addFunction(function αEACm(parentObj, address, data) {
                var Σ_αnLes_αEACm = new Σ.Scope(this, Σ_αnLes, αEACm, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (parentObj.memory[65344] != data) {
                    parentObj.midScanLineJIT();
                    var temp_var = data > 127;
                    if (temp_var != parentObj.LCDisOn) {
                        parentObj.LCDisOn = temp_var;
                        parentObj.memory[65345] &= 120;
                        parentObj.midScanlineOffset = -1;
                        parentObj.totalLinesPassed = parentObj.currentX = parentObj.queuedScanLines = parentObj.lastUnrenderedLine = parentObj.STATTracker = parentObj.LCDTicks = parentObj.actualScanLine = parentObj.memory[65348] = 0;
                        if (parentObj.LCDisOn) {
                            parentObj.modeSTAT = 2;
                            parentObj.matchLYC();
                            parentObj.LCDCONTROL = parentObj.LINECONTROL;
                        } else {
                            parentObj.modeSTAT = 0;
                            parentObj.LCDCONTROL = parentObj.DISPLAYOFFCONTROL;
                            parentObj.DisplayShowOff();
                        }
                        parentObj.interruptsRequested &= 253;
                    }
                    parentObj.gfxWindowCHRBankPosition = (data & 64) == 64 ? 1024 : 0;
                    parentObj.gfxWindowDisplay = (data & 32) == 32;
                    parentObj.gfxBackgroundBankOffset = (data & 16) == 16 ? 0 : 128;
                    parentObj.gfxBackgroundCHRBankPosition = (data & 8) == 8 ? 1024 : 0;
                    parentObj.gfxSpriteNormalHeight = (data & 4) == 0;
                    parentObj.gfxSpriteShow = (data & 2) == 2;
                    parentObj.bgEnabled = (data & 1) == 1;
                    parentObj.memory[65344] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[65] = this.memoryWriter[65345] = Σ_αnLes.addFunction(function αKWP9(parentObj, address, data) {
                var Σ_αnLes_αKWP9 = new Σ.Scope(this, Σ_αnLes, αKWP9, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.LYCMatchTriggerSTAT = (data & 64) == 64;
                parentObj.mode2TriggerSTAT = (data & 32) == 32;
                parentObj.mode1TriggerSTAT = (data & 16) == 16;
                parentObj.mode0TriggerSTAT = (data & 8) == 8;
                parentObj.memory[65345] = data & 120;
                if ((!parentObj.usedBootROM || !parentObj.usedGBCBootROM) && parentObj.LCDisOn && parentObj.modeSTAT < 2) {
                    parentObj.interruptsRequested |= 2;
                    parentObj.checkIRQMatching();
                }
            }, Σ_αnLes);
            this.memoryHighWriter[70] = this.memoryWriter[65350] = Σ_αnLes.addFunction(function αf0nb(parentObj, address, data) {
                var Σ_αnLes_αf0nb = new Σ.Scope(this, Σ_αnLes, αf0nb, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.memory[65350] = data;
                if (data > 127 && data < 224) {
                    data <<= 8;
                    address = 65024;
                    var stat = parentObj.modeSTAT;
                    parentObj.modeSTAT = 0;
                    var newData = 0;
                    do {
                        newData = parentObj.memoryReader[data](parentObj, data++);
                        if (newData != parentObj.memory[address]) {
                            parentObj.modeSTAT = stat;
                            parentObj.graphicsJIT();
                            parentObj.modeSTAT = 0;
                            parentObj.memory[address++] = newData;
                            break;
                        }
                    } while (++address < 65184);
                    if (address < 65184) {
                        do {
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                            parentObj.memory[address++] = parentObj.memoryReader[data](parentObj, data++);
                        } while (address < 65184);
                    }
                    parentObj.modeSTAT = stat;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[71] = this.memoryWriter[65351] = Σ_αnLes.addFunction(function αgOyu(parentObj, address, data) {
                var Σ_αnLes_αgOyu = new Σ.Scope(this, Σ_αnLes, αgOyu, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (parentObj.memory[65351] != data) {
                    parentObj.midScanLineJIT();
                    parentObj.updateGBBGPalette(data);
                    parentObj.memory[65351] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[72] = this.memoryWriter[65352] = Σ_αnLes.addFunction(function αb8RF(parentObj, address, data) {
                var Σ_αnLes_αb8RF = new Σ.Scope(this, Σ_αnLes, αb8RF, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (parentObj.memory[65352] != data) {
                    parentObj.midScanLineJIT();
                    parentObj.updateGBOBJPalette(0, data);
                    parentObj.memory[65352] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[73] = this.memoryWriter[65353] = Σ_αnLes.addFunction(function α6VES(parentObj, address, data) {
                var Σ_αnLes_α6VES = new Σ.Scope(this, Σ_αnLes, α6VES, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                if (parentObj.memory[65353] != data) {
                    parentObj.midScanLineJIT();
                    parentObj.updateGBOBJPalette(4, data);
                    parentObj.memory[65353] = data;
                }
            }, Σ_αnLes);
            this.memoryHighWriter[77] = this.memoryWriter[65357] = Σ_αnLes.addFunction(function α67y7(parentObj, address, data) {
                var Σ_αnLes_α67y7 = new Σ.Scope(this, Σ_αnLes, α67y7, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                parentObj.memory[65357] = data;
            }, Σ_αnLes);
            this.memoryHighWriter[79] = this.memoryWriter[65359] = this.cartIgnoreWrite;
            this.memoryHighWriter[85] = this.memoryWriter[65365] = this.cartIgnoreWrite;
            this.memoryHighWriter[104] = this.memoryWriter[65384] = this.cartIgnoreWrite;
            this.memoryHighWriter[105] = this.memoryWriter[65385] = this.cartIgnoreWrite;
            this.memoryHighWriter[106] = this.memoryWriter[65386] = this.cartIgnoreWrite;
            this.memoryHighWriter[107] = this.memoryWriter[65387] = this.cartIgnoreWrite;
            this.memoryHighWriter[108] = this.memoryWriter[65388] = this.cartIgnoreWrite;
            this.memoryHighWriter[112] = this.memoryWriter[65392] = this.cartIgnoreWrite;
            this.memoryHighWriter[116] = this.memoryWriter[65396] = this.cartIgnoreWrite;
        }
    }, Σ);
    GameBoyCore.prototype.recompileBootIOWriteHandling = Σ.addFunction(function αFRI8() {
        var Σ_αFRI8 = new Σ.Scope(this, Σ, αFRI8, function () {
            return this.capture({}, {});
        });
        if (this.inBootstrap) {
            this.memoryHighWriter[80] = this.memoryWriter[65360] = Σ_αFRI8.addFunction(function αClR6(parentObj, address, data) {
                var Σ_αFRI8_αClR6 = new Σ.Scope(this, Σ_αFRI8, αClR6, function () {
                    return this.capture({
                        parentObj: parentObj,
                        address: address,
                        data: data
                    }, {});
                });
                cout('Boot ROM reads blocked: Bootstrap process has ended.', 0);
                parentObj.inBootstrap = false;
                parentObj.disableBootROM();
                parentObj.memory[65360] = data;
            }, Σ_αFRI8);
            if (this.cGBC) {
                this.memoryHighWriter[108] = this.memoryWriter[65388] = Σ_αFRI8.addFunction(function αcnHi(parentObj, address, data) {
                    var Σ_αFRI8_αcnHi = new Σ.Scope(this, Σ_αFRI8, αcnHi, function () {
                        return this.capture({
                            parentObj: parentObj,
                            address: address,
                            data: data
                        }, {});
                    });
                    if (parentObj.inBootstrap) {
                        parentObj.cGBC = (data & 1) == 0;
                        if (parentObj.name + parentObj.gameCode + parentObj.ROM[323] == 'Game and Watch 50') {
                            parentObj.cGBC = true;
                            cout('Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge).', 1);
                        }
                        cout('Booted to GBC Mode: ' + parentObj.cGBC, 0);
                    }
                    parentObj.memory[65388] = data;
                }, Σ_αFRI8);
            }
        } else {
            this.memoryHighWriter[80] = this.memoryWriter[65360] = this.cartIgnoreWrite;
        }
    }, Σ);
    GameBoyCore.prototype.toTypedArray = Σ.addFunction(function αEzNg(baseArray, memtype) {
        var Σ_αEzNg = new Σ.Scope(this, Σ, αEzNg, function () {
            return this.capture({
                baseArray: baseArray,
                memtype: memtype
            }, {});
        });
        try {
            if (settings[5] || memtype != 'float32' && GameBoyWindow.opera && this.checkForOperaMathBug()) {
                return baseArray;
            }
            if (!baseArray || !baseArray.length) {
                return [];
            }
            var length = baseArray.length;
            switch (memtype) {
            case 'uint8':
                var typedArrayTemp = new Uint8Array(length);
                break;
            case 'int8':
                var typedArrayTemp = new Int8Array(length);
                break;
            case 'int32':
                var typedArrayTemp = new Int32Array(length);
                break;
            case 'float32':
                var typedArrayTemp = new Float32Array(length);
            }
            for (var index = 0; index < length; index++) {
                typedArrayTemp[index] = baseArray[index];
            }
            return typedArrayTemp;
        } catch (error) {
            cout('Could not convert an array to a typed array: ' + error.message, 1);
            return baseArray;
        }
    }, Σ);
    GameBoyCore.prototype.fromTypedArray = Σ.addFunction(function αS7nf(baseArray) {
        var Σ_αS7nf = new Σ.Scope(this, Σ, αS7nf, function () {
            return this.capture({ baseArray: baseArray }, {});
        });
        try {
            if (!baseArray || !baseArray.length) {
                return [];
            }
            var arrayTemp = [];
            for (var index = 0; index < baseArray.length; ++index) {
                arrayTemp[index] = baseArray[index];
            }
            return arrayTemp;
        } catch (error) {
            cout('Conversion from a typed array failed: ' + error.message, 1);
            return baseArray;
        }
    }, Σ);
    GameBoyCore.prototype.getTypedArray = Σ.addFunction(function αdsZK(length, defaultValue, numberType) {
        var Σ_αdsZK = new Σ.Scope(this, Σ, αdsZK, function () {
            return this.capture({
                length: length,
                defaultValue: defaultValue,
                numberType: numberType
            }, {});
        });
        try {
            if (settings[5]) {
                throw new Error('');
            }
            if (numberType != 'float32' && GameBoyWindow.opera && this.checkForOperaMathBug()) {
                throw new Error('');
            }
            switch (numberType) {
            case 'int8':
                var arrayHandle = new Int8Array(length);
                break;
            case 'uint8':
                var arrayHandle = new Uint8Array(length);
                break;
            case 'int32':
                var arrayHandle = new Int32Array(length);
                break;
            case 'float32':
                var arrayHandle = new Float32Array(length);
            }
            if (defaultValue != 0) {
                var index = 0;
                while (index < length) {
                    arrayHandle[index++] = defaultValue;
                }
            }
        } catch (error) {
            cout('Could not convert an array to a typed array: ' + error.message, 1);
            var arrayHandle = [];
            var index = 0;
            while (index < length) {
                arrayHandle[index++] = defaultValue;
            }
        }
        return arrayHandle;
    }, Σ);
    GameBoyCore.prototype.checkForOperaMathBug = Σ.addFunction(function α25iR() {
        var Σ_α25iR = new Σ.Scope(this, Σ, α25iR, function () {
            return this.capture({}, { testTypedArray: testTypedArray });
        });
        var testTypedArray = new Uint8Array(1);
        testTypedArray[0] = -1;
        testTypedArray[0] >>= 0;
        if (testTypedArray[0] != 255) {
            cout('Detected faulty math by your browser.', 2);
            return true;
        } else {
            return false;
        }
    }, Σ);
    'use strict';
    var gameboy = null;
    var gbRunInterval = null;
    var settings = [
        true,
        false,
        false,
        [
            39,
            37,
            38,
            40,
            88,
            90,
            16,
            13
        ],
        true,
        false,
        4,
        15,
        30,
        false,
        false,
        false,
        false,
        16,
        1
    ];
    function start(canvas, ROM) {
        var Σ_start = new Σ.Scope(this, Σ, start, function () {
            return this.capture({
                canvas: canvas,
                ROM: ROM
            }, {});
        });
        clearLastEmulation();
        autoSave();
        gameboy = new GameBoyCore(canvas, ROM);
        gameboy.openMBC = openSRAM;
        gameboy.openRTC = openRTC;
        gameboy.start();
        run();
    }
    function run() {
        var Σ_run = new Σ.Scope(this, Σ, run, function () {
            return this.capture({}, {});
        });
        if (GameBoyEmulatorInitialized()) {
            if (!GameBoyEmulatorPlaying()) {
                gameboy.stopEmulator &= 1;
                cout('Starting the iterator.', 0);
                var dateObj = new_Date();
                gameboy.firstIteration = dateObj.getTime();
                gameboy.iterations = 0;
            } else {
                cout('The GameBoy core is already running.', 1);
            }
        } else {
            cout('GameBoy core cannot run while it has not been initialized.', 1);
        }
    }
    function pause() {
        if (GameBoyEmulatorInitialized()) {
            if (GameBoyEmulatorPlaying()) {
                clearLastEmulation();
            } else {
                cout('GameBoy core has already been paused.', 1);
            }
        } else {
            cout('GameBoy core cannot be paused while it has not been initialized.', 1);
        }
    }
    function clearLastEmulation() {
        if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
            Σ.clearInterval(gbRunInterval);
            gameboy.stopEmulator |= 2;
            cout('The previous emulation has been cleared.', 0);
        } else {
            cout('No previous emulation was found to be cleared.', 0);
        }
    }
    function save() {
        if (GameBoyEmulatorInitialized()) {
            try {
                var state_suffix = 0;
                while (findValue('FREEZE_' + gameboy.name + '_' + state_suffix) != null) {
                    state_suffix++;
                }
                setValue('FREEZE_' + gameboy.name + '_' + state_suffix, gameboy.saveState());
                cout('Saved the current state as: FREEZE_' + gameboy.name + '_' + state_suffix, 0);
            } catch (error) {
                cout('Could not save the current emulation state("' + error.message + '").', 2);
            }
        } else {
            cout('GameBoy core cannot be saved while it has not been initialized.', 1);
        }
    }
    function saveSRAM() {
        if (GameBoyEmulatorInitialized()) {
            if (gameboy.cBATT) {
                try {
                    var sram = gameboy.saveSRAMState();
                    if (sram.length > 0) {
                        cout('Saving the SRAM...', 0);
                        if (findValue('SRAM_' + gameboy.name) != null) {
                            cout('Deleting the old SRAM save due to outdated format.', 0);
                            deleteValue('SRAM_' + gameboy.name);
                        }
                        setValue('B64_SRAM_' + gameboy.name, arrayToBase64(sram));
                    } else {
                        cout('SRAM could not be saved because it was empty.', 1);
                    }
                } catch (error) {
                    cout('Could not save the current emulation state("' + error.message + '").', 2);
                }
            } else {
                cout('Cannot save a game that does not have battery backed SRAM specified.', 1);
            }
            saveRTC();
        } else {
            cout('GameBoy core cannot be saved while it has not been initialized.', 1);
        }
    }
    function saveRTC() {
        if (GameBoyEmulatorInitialized()) {
            if (gameboy.cTIMER) {
                try {
                    cout('Saving the RTC...', 0);
                    setValue('RTC_' + gameboy.name, gameboy.saveRTCState());
                } catch (error) {
                    cout('Could not save the RTC of the current emulation state("' + error.message + '").', 2);
                }
            }
        } else {
            cout('GameBoy core cannot be saved while it has not been initialized.', 1);
        }
    }
    function autoSave() {
        if (GameBoyEmulatorInitialized()) {
            cout('Automatically saving the SRAM.', 0);
            saveSRAM();
            saveRTC();
        }
    }
    function openSRAM(filename) {
        var Σ_openSRAM = new Σ.Scope(this, Σ, openSRAM, function () {
            return this.capture({ filename: filename }, {});
        });
        try {
            if (findValue('B64_SRAM_' + filename) != null) {
                cout('Found a previous SRAM state (Will attempt to load).', 0);
                return base64ToArray(findValue('B64_SRAM_' + filename));
            } else if (findValue('SRAM_' + filename) != null) {
                cout('Found a previous SRAM state (Will attempt to load).', 0);
                return findValue('SRAM_' + filename);
            } else {
                cout('Could not find any previous SRAM copy for the current ROM.', 0);
            }
        } catch (error) {
            cout('Could not open the  SRAM of the saved emulation state.', 2);
        }
        return [];
    }
    function openRTC(filename) {
        var Σ_openRTC = new Σ.Scope(this, Σ, openRTC, function () {
            return this.capture({ filename: filename }, {});
        });
        try {
            if (findValue('RTC_' + filename) != null) {
                cout('Found a previous RTC state (Will attempt to load).', 0);
                return findValue('RTC_' + filename);
            } else {
                cout('Could not find any previous RTC copy for the current ROM.', 0);
            }
        } catch (error) {
            cout('Could not open the RTC data of the saved emulation state.', 2);
        }
        return [];
    }
    function openState(filename, canvas) {
        var Σ_openState = new Σ.Scope(this, Σ, openState, function () {
            return this.capture({
                filename: filename,
                canvas: canvas
            }, {});
        });
        try {
            if (findValue(filename) != null) {
                try {
                    clearLastEmulation();
                    cout('Attempting to run a saved emulation state.', 0);
                    gameboy = new GameBoyCore(canvas, '');
                    gameboy.savedStateFileName = filename;
                    gameboy.returnFromState(findValue(filename));
                    run();
                } catch (error) {
                    alert(error.message + ' file: ' + error.fileName + ' line: ' + error.lineNumber);
                }
            } else {
                cout('Could not find the save state ' + filename + '".', 2);
            }
        } catch (error) {
            cout('Could not open the saved emulation state.', 2);
        }
    }
    function import_save(blobData) {
        var Σ_import_save = new Σ.Scope(this, Σ, import_save, function () {
            return this.capture({ blobData: blobData }, {});
        });
        blobData = decodeBlob(blobData);
        if (blobData && blobData.blobs) {
            if (blobData.blobs.length > 0) {
                for (var index = 0; index < blobData.blobs.length; ++index) {
                    cout('Importing blob "' + blobData.blobs[index].blobID + '"', 0);
                    if (blobData.blobs[index].blobContent) {
                        if (blobData.blobs[index].blobID.substring(0, 5) == 'SRAM_') {
                            setValue('B64_' + blobData.blobs[index].blobID, base64(blobData.blobs[index].blobContent));
                        } else {
                            setValue(blobData.blobs[index].blobID, JSON.parse(blobData.blobs[index].blobContent));
                        }
                    } else if (blobData.blobs[index].blobID) {
                        cout('Save file imported had blob "' + blobData.blobs[index].blobID + '" with no blob data interpretable.', 2);
                    } else {
                        cout('Blob chunk information missing completely.', 2);
                    }
                }
            } else {
                cout('Could not decode the imported file.', 2);
            }
        } else {
            cout('Could not decode the imported file.', 2);
        }
    }
    function generateBlob(keyName, encodedData) {
        var Σ_generateBlob = new Σ.Scope(this, Σ, generateBlob, function () {
            return this.capture({
                keyName: keyName,
                encodedData: encodedData
            }, {
                saveString: saveString,
                consoleID: consoleID,
                totalLength: totalLength
            });
        });
        var saveString = 'EMULATOR_DATA';
        var consoleID = 'GameBoy';
        var totalLength = saveString.length + 4 + (1 + consoleID.length) + (1 + keyName.length + (4 + encodedData.length));
        saveString += to_little_endian_dword(totalLength);
        saveString += to_byte(consoleID.length);
        saveString += consoleID;
        saveString += to_byte(keyName.length);
        saveString += keyName;
        saveString += to_little_endian_dword(encodedData.length);
        saveString += encodedData;
        return saveString;
    }
    function generateMultiBlob(blobPairs) {
        var Σ_generateMultiBlob = new Σ.Scope(this, Σ, generateMultiBlob, function () {
            return this.capture({ blobPairs: blobPairs }, {
                consoleID: consoleID,
                totalLength: totalLength,
                saveString: saveString,
                keyName: keyName,
                encodedData: encodedData
            });
        });
        var consoleID = 'GameBoy';
        var totalLength = 13 + 4 + 1 + consoleID.length;
        var saveString = to_byte(consoleID.length);
        saveString += consoleID;
        var keyName = '';
        var encodedData = '';
        for (var index = 0; index < blobPairs.length; ++index) {
            keyName = blobPairs[index][0];
            encodedData = blobPairs[index][1];
            saveString += to_byte(keyName.length);
            saveString += keyName;
            saveString += to_little_endian_dword(encodedData.length);
            saveString += encodedData;
            totalLength += 1 + keyName.length + 4 + encodedData.length;
        }
        saveString = 'EMULATOR_DATA' + to_little_endian_dword(totalLength) + saveString;
        return saveString;
    }
    function decodeBlob(blobData) {
        var Σ_decodeBlob = new Σ.Scope(this, Σ, decodeBlob, function () {
            return this.capture({ blobData: blobData }, {
                length: length,
                blobProperties: blobProperties,
                blobsCount: blobsCount
            });
        });
        var length = blobData.length;
        var blobProperties = {};
        blobProperties.consoleID = null;
        var blobsCount = -1;
        blobProperties.blobs = [];
        if (length > 17) {
            if (blobData.substring(0, 13) == 'EMULATOR_DATA') {
                var length = Math.min((blobData.charCodeAt(16) & 255) << 24 | (blobData.charCodeAt(15) & 255) << 16 | (blobData.charCodeAt(14) & 255) << 8 | blobData.charCodeAt(13) & 255, length);
                var consoleIDLength = blobData.charCodeAt(17) & 255;
                if (length > 17 + consoleIDLength) {
                    blobProperties.consoleID = blobData.substring(18, 18 + consoleIDLength);
                    var blobIDLength = 0;
                    var blobLength = 0;
                    for (var index = 18 + consoleIDLength; index < length;) {
                        blobIDLength = blobData.charCodeAt(index++) & 255;
                        if (index + blobIDLength < length) {
                            blobProperties.blobs[++blobsCount] = {};
                            blobProperties.blobs[blobsCount].blobID = blobData.substring(index, index + blobIDLength);
                            index += blobIDLength;
                            if (index + 4 < length) {
                                blobLength = (blobData.charCodeAt(index + 3) & 255) << 24 | (blobData.charCodeAt(index + 2) & 255) << 16 | (blobData.charCodeAt(index + 1) & 255) << 8 | blobData.charCodeAt(index) & 255;
                                index += 4;
                                if (index + blobLength <= length) {
                                    blobProperties.blobs[blobsCount].blobContent = blobData.substring(index, index + blobLength);
                                    index += blobLength;
                                } else {
                                    cout('Blob length check failed, blob determined to be incomplete.', 2);
                                    break;
                                }
                            } else {
                                cout('Blob was incomplete, bailing out.', 2);
                                break;
                            }
                        } else {
                            cout('Blob was incomplete, bailing out.', 2);
                            break;
                        }
                    }
                }
            }
        }
        return blobProperties;
    }
    function matchKey(key) {
        var Σ_matchKey = new Σ.Scope(this, Σ, matchKey, function () {
            return this.capture({ key: key }, {});
        });
        for (var index = 0; index < settings[3].length; index++) {
            if (settings[3][index] == key) {
                return index;
            }
        }
        return -1;
    }
    function GameBoyEmulatorInitialized() {
        return typeof gameboy == 'object' && gameboy != null;
    }
    function GameBoyEmulatorPlaying() {
        return (gameboy.stopEmulator & 2) == 0;
    }
    function GameBoyKeyDown(e) {
        var Σ_GameBoyKeyDown = new Σ.Scope(this, Σ, GameBoyKeyDown, function () {
            return this.capture({ e: e }, {});
        });
        if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
            var keycode = matchKey(e.keyCode);
            if (keycode >= 0 && keycode < 8) {
                gameboy.JoyPadEvent(keycode, true);
                try {
                    e.preventDefault();
                } catch (error) {
                }
            }
        }
    }
    function GameBoyKeyUp(e) {
        var Σ_GameBoyKeyUp = new Σ.Scope(this, Σ, GameBoyKeyUp, function () {
            return this.capture({ e: e }, {});
        });
        if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
            var keycode = matchKey(e.keyCode);
            if (keycode >= 0 && keycode < 8) {
                gameboy.JoyPadEvent(keycode, false);
                try {
                    e.preventDefault();
                } catch (error) {
                }
            }
        }
    }
    function GameBoyGyroSignalHandler(e) {
        var Σ_GameBoyGyroSignalHandler = new Σ.Scope(this, Σ, GameBoyGyroSignalHandler, function () {
            return this.capture({ e: e }, {});
        });
        if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
            if (e.gamma || e.beta) {
                gameboy.GyroEvent(e.gamma * Math.PI / 180, e.beta * Math.PI / 180);
            } else {
                gameboy.GyroEvent(e.x, e.y);
            }
            try {
                e.preventDefault();
            } catch (error) {
            }
        }
    }
    function initNewCanvas() {
        if (GameBoyEmulatorInitialized()) {
            gameboy.canvas.width = gameboy.canvas.clientWidth;
            gameboy.canvas.height = gameboy.canvas.clientHeight;
        }
    }
    function initNewCanvasSize() {
        if (GameBoyEmulatorInitialized()) {
            if (!settings[12]) {
                if (gameboy.onscreenWidth != 160 || gameboy.onscreenHeight != 144) {
                    gameboy.initLCD();
                }
            } else {
                if (gameboy.onscreenWidth != gameboy.canvas.clientWidth || gameboy.onscreenHeight != gameboy.canvas.clientHeight) {
                    gameboy.initLCD();
                }
            }
        }
    }
    var gameboy_rom = 'r+BPyZiEZwA+AeBPySAobeEq6gAgKlYj5WJv6SRmZjjhKuXqACDJ/////////////////////////////////xgHZwCYhGcA2fX6/3/1xdXlIRPKNgHN9f/h0cHx6gAg+hLKtyAC8cnwgLcoF/CC7hjgUT6Q4FOv4FLgVOCAPv/gVfHZ8IG3IALx2fBA7gjgQA8PD+YB7gHgT/CC4FHuEOCCPojgU6/gUuBU4IE+/uBV4ID6NMs86jTL8dkKCgoKbWFkZSBieSBhZ28uIGVtYWlsOmdvYnV6b3ZAeWFob28uY29tCnVybDogc3BlY2N5LmRhLnJ1CgoKCv///////wDDSgnO7WZmzA0ACwNzAIMADAANAAgRH4iJAA7czG7m3d3Zmbu7Z2NuDuzM3dyZn7u5Mz5BR08nUyBSRUFMVElNRSCAAAAAAgEDADMBSTQeIUD/y37I8P/1y4fg//BE/pEg+su+8eD/yT7A4EY+KD0g/cnF1eWvEQPK1RITEhMGAyEAyuXFTgYAIWAMCQkqEhMqEhPB4SMFIOrhrwYIzYsU4dHByf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAgMFBggJCwwOEBETFBYXGBobHR4fISIjJSYnKSorLC0uLzAxMjM0NTY3ODg5Ojo7PDw9PT4+Pj8/Pz9AQEBAQEBAQEBAPz8/Pz4+PT08PDs7Ojk5ODc2NTU0MzIxMC8uLCsqKSgmJSQjISAfHRwaGRcWFRMSEA8NCwoIBwUEAgH//fz6+ff29PPx8O7t6+ro5+Xk4uHg3t3c2tnY19bU09LR0M/OzczLysnJyMfGxsXFxMPDw8LCwcHBwcDAwMDAwMDAwMDBwcHBwsLDw8PExcXGxsfIycnKy8zNzs/Q0dLT1NXX2Nna3N3e4OHi5OXn6Onr7O7v8fL09vf5+vz9AAEECRAZJDFAUWR5kKnE4QAhRGmQueQRQHGk2RBJhMEAQYTJEFmk8UCR5DmQ6UShAGHEKZD5ZNFAsSSZEIkEgQCBBIkQmSSxQNFk+ZApxGEAoUTpkDnkkUDxpFkQyYRBAMGESRDZpHFAEeS5kGlEIQDhxKmQeWRRQDEkGRAJBAEAAQQJEBkkMUBRZHmQqcThACFEaZC55BFAcaTZEEmEwQBBhMkQWaTxQJHkOZDpRKEAYcQpkPlk0UCxJJkQiQSBAIEEiRCZJLFA0WT5kCnEYQChROmQOeSRQPGkWRDJhEEAwYRJENmkcUAR5LmQaUQhAOHEqZB5ZFFAMSQZEAkEAQAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAgICAgIDAwMDBAQEBAUFBQUGBgYHBwcICAkJCQoKCgsLDAwNDQ4ODw8QEBEREhITExQUFRUWFxcYGRkaGhscHB0eHh8gISEiIyQkJSYnJygpKisrLC0uLzAxMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1FSU1RVVldZWltcXV9gYWJkZWZnaWprbG5vcHJzdHZ3eXp7fX5/gYKEhYeIiouNjpCRk5SWl5manJ2foKKkpaepqqytr7GytLa3ubu9vsDCxMXHycvMztDS1NXX2dvd3+Hi5Obo6uzu8PL09vj6/P4A//z38Ofcz8CvnIdwVzwfAN+8l3BHHO/Aj1wn8Ld8PwC/fDfwp1wPwG8cx3AXvF8AnzzXcAecL8BP3Gfwd/x/AH/8d/Bn3E/AL5wHcNc8nwBfvBdwxxxvwA9cp/A3fL8AP3y38Cdcj8DvHEdwl7zfAB88V3CHnK/Az9zn8Pf8/wD//Pfw59zPwK+ch3BXPB8A37yXcEcc78CPXCfwt3w/AL98N/CnXA/AbxzHcBe8XwCfPNdwB5wvwE/cZ/B3/H8Af/x38GfcT8AvnAdw1zyfAF+8F3DHHG/AD1yn8Dd8vwA/fLfwJ1yPwO8cR3CXvN8AHzxXcIecr8DP3Ofw9/z/AP/////////////////////+/v7+/v79/f39/fz8/Pz8+/v7+vr6+vn5+fj4+Pf39/b29fX19PTz8/Ly8fHw8PDv7u7t7ezs6+vq6uno6Ofn5uXl5OPj4uHh4N/e3t3c3Nva2djY19bV1NTT0tHQz8/OzczLysnIx8bFxMPCwcDAvr28u7q5uLe2tbSzsrGwr62sq6qpqKalpKOioJ+enZyamZiWlZSTkZCPjYyLiYiHhYSCgYB+fXt6eHd1dHJxcG5sa2loZmVjYmBfXVtaWFdVU1JQTk1LSUhGREJBPz08Ojg2NDMxLy0rKigmJCIgHx0bGRcVExEPDQsJBwUDAf9/Px8PBwMBgEAgEAgEAgEAAQEBAQEBAQEBAQEA//////////////+AEAcAAQABAAEBAAEBAAEA/wD//wD//wD/AP+AKwcBAAEAAQD/AP8A/wD/AP8A/wABAAEAAQCARgcBAQEBAQD//////////////wABAQEBAQGAYQf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AwODw+Pz+/xEAwAGxwj4E9cU+BfUKbwMKZ37+gCALI34LAiN+AwILGOsahhIDHBwcHPE9IN7BIRAAGVRdPgX1Cm8DCmcalhIjfAILfQIDAx0dHR3xPSDnIRgAGVRd8T0grskRAcAB6cI+BPUKbwMKZ37+gCALI34LAiN+AwILGOs+CvUahhIcHBwc8T0g9CN8Agt9AgMD8T0g0MkgIEZJTExFRCAgIFBPTFlHT05TIEhFTElDT1BURVJJTiBBQ1RJT04gIQDADgpwLHQsGhPWICI2ACwNIPE+oOoQyngBCQDlYmsJVF3hDMYKR3AsdCwaG9YgIjYALA0g8a/qEcrJ+hDK/jDI1gTqEMpHPqCQ/lA4Aj5QDgAM1ggw+3ghAcARBAB3xggZDSD5+hHKg+oRykf+UDgCPlAOAAzWCDD7eC4td9YIGQ0g+ckh9grzMf/PzVABr+Am4P/gD+BD4EL2SOBFPkDgQT4E4AfN9RM+CuoAAA4HeeBwJqCvIstsKPsNIPIh/v8yy30g+wEKABH1/yFpAc3kE+cCAVYAEQDBIVt2zeQTrwYYIWsOzYsUIYsOzaQUxwGwAxEAgCGhF8XlzeQT4cERAIjN5BMhAJgRAwABYMDHcc9yIwUg+BQdIPHN9RMhuxUGAc2WE82JEz5E4EGv4EU+A+D/+z4B6hLK4E0QAAB4zccTBSD6zZATxwEACFkhAIhzIwt4sSD5IQDHPv9FdyRwJCJ3JXclcCwg8x5/IQCYx3PPNgDL1DYIx3PLlCPLVCjuPoABDxARIAAhIpjF5XfL1HfLlDwZDSD1POEswQUg7D486jPLr+o0yz3qL8s+oOCCPgLqG8vNiRM+ROBBr+BFPgPg/68+ACEXyyI+CiI+IHev6h7L4ITgluodyz4B6h/L6g/D6g3KBlARnAjNxAjNcwsBLAHFzTsLzQAJwQt4sSDzzZATxwEACFkhAIhzIwt4sSD5zfUTeQYQIYMOzYsUPv/qKcsGgBGwCM3ECM2JEwEsAcXNbAzNAAnBC3ixIPOv6hLKzZATPpDgU/PHAbADEQCIIaEXzeQTzfUTIQIWBgHNlhPNiRM+ROBBr+BFPgPg//sY/j4D6gAgzcRGBgMhF8t+gCJ+gDwifoB3zckP+jDLb/oxy2fNtgs+AeCB8IG3IPv6Dcq3KAPNcwHJ+h3LBgARTg2Hb2AZKmZvTgkq4ItfKjzgjD1PKuCNe4eHg0cRAMUqEhwFIPp5h4eBRxEAxCoSHAUg+n3qMMt86jHLyfCL4I7wjOCP8I3gkBEAw9XlzcoQ4dHwpeaAEhwBAwAJ8JA94JAg6CEAxQYPKk+gXxq3IB95yzegXxq3IBYqT6BfGrcgD3nLN6BfGrcgBiwsLBhHLOXNyhDwlrcoKwYB8KXGP0/LfygBBcXwpMY/Vx4AzZMOe8H18KPGP1ceAM2TDsHhJCJwGAzhJPCjxj8i8KTGPyIsJRbDBg/wjj3gjsLiCz4C6gAgw1JhfBjcHwAL7mpIYL9vBgMhF8t+gCJ+gDwifoB3zckPIcsNEQDGzf4MI+U+A+oAICEgy83+DPocy9YIb+ocy82vYAYDESDLIWIOxeXVzcoQ4fCjxhQi8KQiNg8jVF3hIyMjwQUg5M3ERsE+AeoAIAr+/ygiEQDGbyYAKRnlAwoDbyYAKRleI1bhKmZvxc0xHMwAQMEY2T4B4IHwgbcg+8l+PMjl1c3KEAYB8KVPy38oAQXF8KTLf/UoAi88Vx4AzZMO8XsgAi88xn/B9fCjy3/1KAIvPFceAM2TDvF7KAIvPMZ/wdESE3gSE+EjIyMYsFANAgAIDAYCRCgoFANEKAAUE0QAABQSRAAoFAJVKCjsA1UoAOwTVQAA7BJVACjsAAAEBQAAAAEFAAEBAwIGAQEDBwYCAgAHAwICAAcEAwMBAgYDAwEFBgQEAAECBAQAAwIFBQQFBgUFBAcGMgAAzgAAADIAAM4AAAAyAADOKAAAHhEAChEAAAAACu8AHu8AFAAKFAD2FAAPCgAF6AAC4gAQ3gAQ4gD+CgD74g4C3Q4C4QAC4vIC3fIC4AAM4PsM4PsQ4/sJ3fsJ/wABAQICAwMEBAUFAAAGAQYCBgMGBAYFBgAHAQcCBwMHBAcFBwYICQoKCwsMDA0NDgoPDxAQEQoSEhMTERQVFRYVFxUYCBkIGggb/yAAD/AbD/DlD/9//3+XEQAAAGD/f5cRAAAYAP9/lxEAAIB8lxH/f/9/QHz/f18IAADLI8sSeC9HeS9PAyEAAH2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEssoyxkJ0BPJ+hfLJgJvfuCcLzzgnn3GQG9+4Jvgn6/gmOCZ4JrgneChPkDgl/oYy29OfcZAb0bFeOCgeeCizdMQ8KPgpvCk4KnwpeCsr+Cg4KI+QOChzdMQ8KPgp/Ck4KrwpeCtwXkvPOCgr+CheOCizdMQ8KPgmfCk4JzwpeCf8Kbgl/Cp4JrwrOCd8KfgmPCq4JvwreCe+hnLJgJvTn3GQG9GxXjgoHkvPOChr+CizdMQ8KPgpvCk4KnwpeCswXngoHjgoa/gos3TEPCj4KfwpOCq8KXgra/goOChPkDgos3TEPCj4JnwpOCc8KXgn/Cm4JfwqeCa8KzgnfCn4JjwquCb8K3gnskq4KAq4KEq4KLwl1/woCYGV8t6ICDLe3soJy88X3qTMAIvPG96g1YlXiVvfiVuZxl8LzwYH3ovPFfLeyjhey88X5IwAi88b3qDViVeJW9+JW5nGXxH8Jhf8KEmBlfLeiAgy3t7KCcvPF96kzACLzxveoNWJV4lb34lbmcZfC88GB96LzxXy3so4XsvPF+SMAIvPG96g1YlXiVvfiVuZxl8T/CZX/CiJgZXy3ogIMt7eygnLzxfepMwAi88b3qDViVeJW9+JW5nGXwvPBgfei88V8t7KOF7LzxfkjACLzxveoNWJV4lb34lbmcZfICB4KPwml/woCYGV8t6ICDLe3soJy88X3qTMAIvPG96g1YlXiVvfiVuZxl8LzwYH3ovPFfLeyjhey88X5IwAi88b3qDViVeJW9+JW5nGXxH8Jtf8KEmBlfLeiAgy3t7KCcvPF96kzACLzxveoNWJV4lb34lbmcZfC88GB96LzxXy3so4XsvPF+SMAIvPG96g1YlXiVvfiVuZxl8T/CcX/CiJgZXy3ogIMt7eygnLzxfepMwAi88b3qDViVeJW9+JW5nGXwvPBgfei88V8t7KOF7LzxfkjACLzxveoNWJV4lb34lbmcZfICB4KTwnV/woCYGV8t6ICDLe3soJy88X3qTMAIvPG96g1YlXiVvfiVuZxl8LzwYH3ovPFfLeyjhey88X5IwAi88b3qDViVeJW9+JW5nGXxH8J5f8KEmBlfLeiAgy3t7KCcvPF96kzACLzxveoNWJV4lb34lbmcZfC88GB96LzxXy3so4XsvPF+SMAIvPG96g1YlXiVvfiVuZxl8T/CfX/CiJgZXy3ogIMt7eygnLzxfepMwAi88b3qDViVeJW9+JW5nGXwvPBgfei88V8t7KOF7LzxfkjACLzxveoNWJV4lb34lbmcZfICB4KXJ9T6D4EDxyfWv4EDxyfXF1eXHKv7/KFD+FiAaTiMqh4eHVF1vJgApKXgGmAlHelRne11vGNzGYBLPeBIcGNN2ACETyjQ1KPc1yfvFBmR2AAUg+8HJ+3YABSD7yfXF1eUqEhMLeLEg+OHRwfHJxeUBAKAhAMDNAxThwcnF5XEjBSD74cHJxdXlAQCAIZXKzQMU4dHBycXV5a/qFcuwIAwaEyIaEzIEDXjqFcvlxRq+EyAPIxq+IAkTIw0gCMHhGBkrGyMjBSDmecFPBBoTIhoTIiEVyzThDSDS+hXL4dHBydVfzXIUuzD60cnF9cH6FMrLD6mAR/CLkR+AR/AFqOoUysHJ9cXltxcXF/aA4Ggq4GkFIPo+5OBH4cHxyfXF5bcXFxf2gOBqKuBrBSD6PuTgSOBJ4cHxyT4Q4ADwAC/LN+bwRz4g4ADwAC/mD7DqFsvJzyEAgK8GIE8+CCINIPwFIPnHIQCABiBPIg0g/AUg+cnFzQMVSs0eFcHJxc0RFUjNGRVLzSMVwcnFBgHNKxXBycUGABj2xQYDGPHFBgLNKxXByfXlh4eAJsBvceHxyfXlh4cmwG9GI04jXiNW4fHJ9cXV5eCDKjzK8BPWIF/wg835FF95xghPezwY6PXF1eXF1c13FdHBex4FIS3LGNUBKssR8NjNlRURGPzNlRURnP/NlRUR9v/NlRUR//8+LzwZOPwCA3ovV3svXxMZyTAwRlBT/zAwUE5UU/8wMExJTkVT/xYFB1dFTENPTUUgVE8WBQgtUkVBTFRJTUUtFgAJREVNTyBNQURFIEVTUEVDSUFMTFkWAQpGT1IgTENQJzIwMDAgUEFSVFn/FgAAR1JFRVRJTlg6ICAgICAgICAgICAWAAFEU0MsUEFOLFNBQixGQVRBTElUWRYAAkpFRkYgRlJPSFdFSU4sSUNBUlVTFgADRE9YLFFVQU5HLEFCWVNTICAgICAWAAQgICAgICAgICAgICAgICAgICAgIBYABUNSRURJVFM6ICAgICAgICAgICAgFgAGQUxMIEdGWCZDT0RFIEJZIEFHTyAWAAdIRUxJQ09QVEVSIDNEIE1PREVMIBYACENSRUFURUQgQlkgQlVTWSAgICAgFgAJICAgICAgICAgICAgICAgICAgICAWAApVU0VEIFNPRlRXQVJFOiAgICAgIBYAC1JHQkRTLE5PJENBU0gsRkFSICAgFgAMICAgICAgICAgICAgICAgICAgICAWAA1DT05UQUNUOiAgICAgICAgICAgIBYADkdPQlVaT1ZAWUFIT08uQ09NICAgFgAPSFRUUDovL1NQRUNDWS5EQS5SVSAWABAgICAgICAgICAgICAgICAgICAgIBYAEVNFRSBZT1UgT04gR0JERVYyMDAw/wAAAAAAAAAAAAAAAAAAAAAICBwUHBQ4KDgoMDBwUCAgKCh8VHxUKCgAAAAAAAAAABQUPip/QT4qfFT+gnxUKCgICDw0fkL8rP6Cfmr8hHhYJCR+Wn5SPCR4SPyU/LRISBgYPCR+Wjwkflr8tH5KNDQQEDgocFAgIAAAAAAAAAAABAQOChwUOCg4KDgoHBQICBAQOCgcFBwUHBQ4KHBQICAAABQUPio8NH5CPCx8VCgoAAAICBwUPDR+QjwsOCgQEAAAAAAAAAAAEBA4KHBQcFAAAAAAAAB8fP6CfHwAAAAAAAAAAAAAAAAwMHhIeEgwMAQEDgoeEjwkeEjwkOCgQEAYGDwkflr+qv6q/LR4SDAwGBg8JHxUPDQ4KHxs/oJ8fBwcPiJ+Wjw0eEj8vP6CfHwcHD4iflo8NE5K/LR4SDAwJCR+Wn5afFT8tP6CfGwQEBwcPiJ8XPyEfnr8tHhIMDAYGDwkeFj8pP66/LR4SDAwPDx+Qv66XFQ4KHBQcFAgIBwcPiJ+Wjwkflr8tPiIcHAcHD4iflr+sn5KfHT4iHBwAAAAAAgIHBQICBAQOCgQEAAACAgcFAgIEBA4KDgocFAAAAAAHBQ4KHBQcFA4KAAAAAAAADw8fkJ8fPyEeHgAAAAAAAA4KBwUHBQ4KHBQAAAYGDwkflr8tHhoEBA4KBAQHBw+In5a/rL8pPi4+IhwcBwcPiJ+Wv66/oL+uvy0SEg4OHxEflr8pP6a/LT4iHBwHBw+In5a5qbgoP6y/IxwcDAweEh8VH5a7qr+uvyEeHgcHD4ifFx8RHhY/Lz+gnx8HBw+Inxc/IT4uOCg4KBAQBwcPiJ+Wvy8/qL+uvyEeHgkJH5a/rr+gv66/LT8tEhIPDx+QjwsOChwUHhY/IR4eDw8fkI+Og4KXFT8tHhIMDAkJH5afFR+Qv66/LT8tEhIICBwUHBQ4KDkpP66fEQ4OCgofFR+Qv6q/rr8tPy0SEgkJH5a/pr+qv6y7qr8tEhIHBw+In5a7qruqvy0+IhwcBwcPiJ+Wv66/IT4uOCgQEAcHD4iflr+uv6q/LT+inZ2HBw+In5a/LT4iPy0/LRISBwcPiJ8XP6Cfnr8tPiIcHB8fP6CfGw4KHBQcFBwUCAgJCR+Wn5a7qruqvy0eEgwMERE7qruqnxUfFR4SHBQICAkJH5aflr+uv6q/KR8VCgoJCR+WnxUOCg8JH5a/LRISCQkflr8tPy0eEhwUHBQICA8PH5C/LT46Dwsflr8hHh4HBw+IjwsOChwUHhYfEQ4OEBA4KDwkHhIPCQeEg4KBAQ4OHxEPDQcFDgoeGj4iHBwGBg8JH5a7qpERAAAAAAAAAAAAAAAAAAAAAB8fP6CfHx81rdPfJJne5X1MAIvPEevyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxnLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEeRcvT/F5MAIvPIVvJrcBAAA+t7zLEbrLED6/vcsRu8sQPj+8P8sRuj/LEL0/yxG7P8sQeLHIeKHAebcgB3xiV31rX3jLH9L/HD5AlU97lW96lPUwAi88R6/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYV5Fy9P8XkwAi88hGcuQMMxHMsf0pcdPkCUT3qUZ3uV9TACLzxHr8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhHkXL0/xeTACLzyFbyZAwzEcyx/SoRt91r9PfZNvepT1MAIvPEevyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxnLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFeRcvT/F5MAIvPIRnLr/DMRz//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3q8MAVUZ3tdb3u90pdAfZNPepRfkTA+V3nLPy88g+CDPn+R5YdPbyYARCkpKQkBkVIJweV41kAXb3nWQB8fH+YPZ/CChGd55gcGB/YITwpP8INHLMl5S1+RV3nLPy88g+CDPneR5YdPbyYARCkpKQkBklsJweV41kAXb3nWQB8fH+YPZ/CChGd55gcGB/YITwpP8INHLMmVT3qUX5EwPld5yz8vPIPggz5/keWHT28mAEQpKSkJAR9BCcHleNZAF2951kAfHx/mD2fwgoRneeYHBgf2CE8KT/CDRyzJeUtfkVd5yz8vPIPggz53keWHT28mAEQpKSkJASBKCcHleNZAF2951kAfHx/mD2fwgoRneeYHBgf2CE8KT/CDRyzJfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkyX6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALMl+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASXJfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsyf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wHRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyIxDsrh+eEWwxgNIf3Er+oLyuoMyiwsLPCPPcjgj14sGrcqKPDGeeCT+g3Ktygm+gvKPP4DIAI+AeoLyiAH+gzKPOoMyvoMyl8WyvCT1nkSe8bH4JMqTypHKuUmxl+Hh4M8PG8qX1Z5h4eBPDxveE4sh4eARjw8bypmb3y6OAViV31rX3y4OAVgR31pT3q4OAVQR3tZT3iU4JR8h+CV5dXFr+CSzUpifeCS0eHVzUpi0eE+AeCSzUpi8JRfPniTZy5Hr8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdxkBnCA7KMQDC5fCVb8l7vTBVfZNPepRfkTAkV3nLPy88Rz5/kU3Fh09vJgBEKSkJAfdiCcHlJsLwkm94BoDJeUtfkVd5yz8vPEc+d5FNxYdPbyYARCkpCQH4ZwnB5SbC8JJveAaAyZVPepRfkTAkV3nLPy88Rz5/kU3Fh09vJgBEKSkJAalsCcHlJsLwkm94BoDJeUtfkVd5yz8vPEc+d5FNxYdPbyYARCkpCQGqcQnB5SbC8JJveAaAyYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNyXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDcmDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDMlxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggzJxg+Hh+oawXovpl96obMiei+mX3qgszIkeRgAInAtJCJwLSQicC0kInAtJCJwLSQicC0kInAtJCJwLSQicC0kInAtJCJwLSQicC0kInAtJCJwLSQW/8n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+qqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINnMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBCqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlUC4XIscAl7InAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJcixwCXsicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCXIscAl7InAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJcixwCXsicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCXIscAl7InAJInAJInAJInAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAkicAkicAkicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJInAJInAJInAJcixwCXsicAkicAkicAkicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCXIscAl7InAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAkicAkicAkicAkicAkicAkicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJcixwCXsicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCXIscAl7InAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAlyLHAJeyJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJcixwCXsicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCXIscAl7LCwly2XIJGjJycnJydE+t5LI4IXmB8RSRPCFHx8focjlzTJE4XkicCwicCwicCwicCwicCwicCwicCwicCzJ+ABUXWhHeZAfyx1nATNZCfCCMQCv/qAoAzEAvwH/AOlHPgeQVF1HDjOvyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxlHIbRXCeViaz7/AQ8Ayfoay2/6G8uFZ/4UIAU+/y0YBtbsIAU8LOoby3zqGsvNr2AhlEbNyhDwpMagV/Cjxn9f1SGXRs3KEPCkxqBn8KPGf2/RzTEcKAsf2hhZH9oYWcPERny6OAViV31rX+XNmkbh1Xu90sxFe9ZA4Ih9k0884Il6lF/ghjzgij2RMGvgh3nLPy88g+CF8IIBDwBvVHzWQBfLN6GFZ3rmBxdvGAjwij3KAETgivCJX/CGV/CFGASCHSgLy38g+Ffwh4LghR3NYkUY2nvgifCIg1/l5gf2CG8mB1Z7aB8fHx/LHR/LHeYDxkBnrx7/6XnghpPgh3vLPy88geCF8IIBDwBvVHzWQBfLN6GFZ3rmBxdv8Ilf8IZX8IXLfyAHV/CHgh0YAYLghc1iRfCKPcoAROCKGN171kDgiHuVTzzgiXqUX+CGPOCKPZEwa+CHecs/LzyD4IXwggEPAG9UfNZAF8s3oYVneuYHF28YCPCKPcoAROCK8Ilf8IZX8IUYBIIdKAvLfyD4V/CHguCFHc0qRhjae+CJ8IiTX+XmB/YQbyYHVntoHx8fH8sdH8sd5gPGQGc+/1jpeeCGk+CHe8s/LzyB4IXwggEPAG9UfNZAF8s3oYVneuYHF2/wiV/whlfwhct/IAdX8IeCHRgBguCFzSpG8Io9ygBE4IoY3UYAALoAAHzWQMhPHx8f5h9HeeYHKAsE/gUwBvUhylblBT4PkCHJRoRn5fCCZ69vyfCCZ69vIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIsnxAQ8APcqEVz0odj0oOj0idwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwksLCXLZSgCJGgidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwksLCXLZSgCJGgidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwksLCXLZSgCJGgidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkid8kicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAloyfgAVF3wgjEAr/6gKAMxAL8B/wDFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcVia/nJJgJ+4JovPOCYfcZAb37gl+Cbr+CZ4JzgneCePkDgn8n/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Aw==';
}, 'mqtt://localhost', 'gbemu-part2.js', {});
