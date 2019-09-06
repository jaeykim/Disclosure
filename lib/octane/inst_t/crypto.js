Code.bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return this.capture({}, {
            Crypto: Crypto,
            dbits: dbits,
            BI_DB: BI_DB,
            BI_DM: BI_DM,
            BI_DV: BI_DV,
            BI_FP: BI_FP,
            BI_FV: BI_FV,
            BI_F1: BI_F1,
            BI_F2: BI_F2,
            canary: canary,
            j_lm: j_lm,
            BI_RM: BI_RM,
            BI_RC: BI_RC,
            rr: rr,
            vv: vv,
            lowprimes: lowprimes,
            lplim: lplim,
            rng_psize: rng_psize,
            rng_state: rng_state,
            rng_pool: rng_pool,
            rng_pptr: rng_pptr,
            TEXT: TEXT,
            encrypted: encrypted
        });
    }).hoist(BigInteger, Σ).hoist(nbi, Σ).hoist(am1, Σ).hoist(am2, Σ).hoist(am3, Σ).hoist(am4, Σ).hoist(int2char, Σ).hoist(intAt, Σ).hoist(bnpCopyTo, Σ).hoist(bnpFromInt, Σ).hoist(nbv, Σ).hoist(bnpFromString, Σ).hoist(bnpClamp, Σ).hoist(bnToString, Σ).hoist(bnNegate, Σ).hoist(bnAbs, Σ).hoist(bnCompareTo, Σ).hoist(nbits, Σ).hoist(bnBitLength, Σ).hoist(bnpDLShiftTo, Σ).hoist(bnpDRShiftTo, Σ).hoist(bnpLShiftTo, Σ).hoist(bnpRShiftTo, Σ).hoist(bnpSubTo, Σ).hoist(bnpMultiplyTo, Σ).hoist(bnpSquareTo, Σ).hoist(bnpDivRemTo, Σ).hoist(bnMod, Σ).hoist(Classic, Σ).hoist(cConvert, Σ).hoist(cRevert, Σ).hoist(cReduce, Σ).hoist(cMulTo, Σ).hoist(cSqrTo, Σ).hoist(bnpInvDigit, Σ).hoist(Montgomery, Σ).hoist(montConvert, Σ).hoist(montRevert, Σ).hoist(montReduce, Σ).hoist(montSqrTo, Σ).hoist(montMulTo, Σ).hoist(bnpIsEven, Σ).hoist(bnpExp, Σ).hoist(bnModPowInt, Σ).hoist(bnClone, Σ).hoist(bnIntValue, Σ).hoist(bnByteValue, Σ).hoist(bnShortValue, Σ).hoist(bnpChunkSize, Σ).hoist(bnSigNum, Σ).hoist(bnpToRadix, Σ).hoist(bnpFromRadix, Σ).hoist(bnpFromNumber, Σ).hoist(bnToByteArray, Σ).hoist(bnEquals, Σ).hoist(bnMin, Σ).hoist(bnMax, Σ).hoist(bnpBitwiseTo, Σ).hoist(op_and, Σ).hoist(bnAnd, Σ).hoist(op_or, Σ).hoist(bnOr, Σ).hoist(op_xor, Σ).hoist(bnXor, Σ).hoist(op_andnot, Σ).hoist(bnAndNot, Σ).hoist(bnNot, Σ).hoist(bnShiftLeft, Σ).hoist(bnShiftRight, Σ).hoist(lbit, Σ).hoist(bnGetLowestSetBit, Σ).hoist(cbit, Σ).hoist(bnBitCount, Σ).hoist(bnTestBit, Σ).hoist(bnpChangeBit, Σ).hoist(bnSetBit, Σ).hoist(bnClearBit, Σ).hoist(bnFlipBit, Σ).hoist(bnpAddTo, Σ).hoist(bnAdd, Σ).hoist(bnSubtract, Σ).hoist(bnMultiply, Σ).hoist(bnDivide, Σ).hoist(bnRemainder, Σ).hoist(bnDivideAndRemainder, Σ).hoist(bnpDMultiply, Σ).hoist(bnpDAddOffset, Σ).hoist(NullExp, Σ).hoist(nNop, Σ).hoist(nMulTo, Σ).hoist(nSqrTo, Σ).hoist(bnPow, Σ).hoist(bnpMultiplyLowerTo, Σ).hoist(bnpMultiplyUpperTo, Σ).hoist(Barrett, Σ).hoist(barrettConvert, Σ).hoist(barrettRevert, Σ).hoist(barrettReduce, Σ).hoist(barrettSqrTo, Σ).hoist(barrettMulTo, Σ).hoist(bnModPow, Σ).hoist(bnGCD, Σ).hoist(bnpModInt, Σ).hoist(bnModInverse, Σ).hoist(bnIsProbablePrime, Σ).hoist(bnpMillerRabin, Σ).hoist(Arcfour, Σ).hoist(ARC4init, Σ).hoist(ARC4next, Σ).hoist(prng_newstate, Σ).hoist(rng_seed_int, Σ).hoist(rng_seed_time, Σ).hoist(rng_get_byte, Σ).hoist(rng_get_bytes, Σ).hoist(SecureRandom, Σ).hoist(parseBigInt, Σ).hoist(linebrk, Σ).hoist(byte2Hex, Σ).hoist(pkcs1pad2, Σ).hoist(RSAKey, Σ).hoist(RSASetPublic, Σ).hoist(RSADoPublic, Σ).hoist(RSAEncrypt, Σ).hoist(pkcs1unpad2, Σ).hoist(RSASetPrivate, Σ).hoist(RSASetPrivateEx, Σ).hoist(RSAGenerate, Σ).hoist(RSADoPrivate, Σ).hoist(RSADecrypt, Σ).hoist(encrypt, Σ).hoist(decrypt, Σ);
    var Crypto = new BenchmarkSuite('Crypto', [266181], [
        new Benchmark('Encrypt', true, false, 3900, encrypt),
        new Benchmark('Decrypt', true, false, 220, decrypt)
    ]);
    var dbits;
    var BI_DB;
    var BI_DM;
    var BI_DV;
    var BI_FP;
    var BI_FV;
    var BI_F1;
    var BI_F2;
    var canary = 244837814094590;
    var j_lm = (canary & 16777215) == 15715070;
    function BigInteger(a, b, c) {
        var Σ_BigInteger = new Σ.Scope(this, Σ, BigInteger, function () {
            return this.capture({
                a: a,
                b: b,
                c: c
            }, {});
        });
        this.array = new Array();
        if (a != null) {
            if ('number' == typeof a) {
                this.fromNumber(a, b, c);
            } else if (b == null && 'string' != typeof a) {
                this.fromString(a, 256);
            } else {
                this.fromString(a, b);
            }
        }
    }
    function nbi() {
        return new BigInteger(null);
    }
    function am1(i, x, w, j, c, n) {
        var Σ_am1 = new Σ.Scope(this, Σ, am1, function () {
            return this.capture({
                i: i,
                x: x,
                w: w,
                j: j,
                c: c,
                n: n
            }, {
                this_array: this_array,
                w_array: w_array
            });
        });
        var this_array = this.array;
        var w_array = w.array;
        while (--n >= 0) {
            var v = x * this_array[i++] + w_array[j] + c;
            c = Math.floor(v / 67108864);
            w_array[j++] = v & 67108863;
        }
        return c;
    }
    function am2(i, x, w, j, c, n) {
        var Σ_am2 = new Σ.Scope(this, Σ, am2, function () {
            return this.capture({
                i: i,
                x: x,
                w: w,
                j: j,
                c: c,
                n: n
            }, {
                this_array: this_array,
                w_array: w_array,
                xl: xl,
                xh: xh
            });
        });
        var this_array = this.array;
        var w_array = w.array;
        var xl = x & 32767, xh = x >> 15;
        while (--n >= 0) {
            var l = this_array[i] & 32767;
            var h = this_array[i++] >> 15;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 32767) << 15) + w_array[j] + (c & 1073741823);
            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
            w_array[j++] = l & 1073741823;
        }
        return c;
    }
    function am3(i, x, w, j, c, n) {
        var Σ_am3 = new Σ.Scope(this, Σ, am3, function () {
            return this.capture({
                i: i,
                x: x,
                w: w,
                j: j,
                c: c,
                n: n
            }, {
                this_array: this_array,
                w_array: w_array,
                xl: xl,
                xh: xh
            });
        });
        var this_array = this.array;
        var w_array = w.array;
        var xl = x & 16383, xh = x >> 14;
        while (--n >= 0) {
            var l = this_array[i] & 16383;
            var h = this_array[i++] >> 14;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 16383) << 14) + w_array[j] + c;
            c = (l >> 28) + (m >> 14) + xh * h;
            w_array[j++] = l & 268435455;
        }
        return c;
    }
    function am4(i, x, w, j, c, n) {
        var Σ_am4 = new Σ.Scope(this, Σ, am4, function () {
            return this.capture({
                i: i,
                x: x,
                w: w,
                j: j,
                c: c,
                n: n
            }, {
                this_array: this_array,
                w_array: w_array,
                xl: xl,
                xh: xh
            });
        });
        var this_array = this.array;
        var w_array = w.array;
        var xl = x & 8191, xh = x >> 13;
        while (--n >= 0) {
            var l = this_array[i] & 8191;
            var h = this_array[i++] >> 13;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 8191) << 13) + w_array[j] + c;
            c = (l >> 26) + (m >> 13) + xh * h;
            w_array[j++] = l & 67108863;
        }
        return c;
    }
    setupEngine = Σ.addFunction(function αofHd(fn, bits) {
        var Σ_αofHd = new Σ.Scope(this, Σ, αofHd, function () {
            return this.capture({
                fn: fn,
                bits: bits
            }, {});
        });
        BigInteger.prototype.am = fn;
        dbits = bits;
        BI_DB = dbits;
        BI_DM = (1 << dbits) - 1;
        BI_DV = 1 << dbits;
        BI_FP = 52;
        BI_FV = Math.pow(2, BI_FP);
        BI_F1 = BI_FP - dbits;
        BI_F2 = 2 * dbits - BI_FP;
    }, Σ);
    var BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
    var BI_RC = new Array();
    var rr, vv;
    rr = '0'.charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv) {
        BI_RC[rr++] = vv;
    }
    rr = 'a'.charCodeAt(0);
    for (vv = 10; vv < 36; ++vv) {
        BI_RC[rr++] = vv;
    }
    rr = 'A'.charCodeAt(0);
    for (vv = 10; vv < 36; ++vv) {
        BI_RC[rr++] = vv;
    }
    function int2char(n) {
        var Σ_int2char = new Σ.Scope(this, Σ, int2char, function () {
            return this.capture({ n: n }, {});
        });
        return BI_RM.charAt(n);
    }
    function intAt(s, i) {
        var Σ_intAt = new Σ.Scope(this, Σ, intAt, function () {
            return this.capture({
                s: s,
                i: i
            }, { c: c });
        });
        var c = BI_RC[s.charCodeAt(i)];
        return c == null ? -1 : c;
    }
    function bnpCopyTo(r) {
        var Σ_bnpCopyTo = new Σ.Scope(this, Σ, bnpCopyTo, function () {
            return this.capture({ r: r }, {
                this_array: this_array,
                r_array: r_array
            });
        });
        var this_array = this.array;
        var r_array = r.array;
        for (var i = this.t - 1; i >= 0; --i) {
            r_array[i] = this_array[i];
        }
        r.t = this.t;
        r.s = this.s;
    }
    function bnpFromInt(x) {
        var Σ_bnpFromInt = new Σ.Scope(this, Σ, bnpFromInt, function () {
            return this.capture({ x: x }, { this_array: this_array });
        });
        var this_array = this.array;
        this.t = 1;
        this.s = x < 0 ? -1 : 0;
        if (x > 0) {
            this_array[0] = x;
        } else if (x < -1) {
            this_array[0] = x + DV;
        } else {
            this.t = 0;
        }
    }
    function nbv(i) {
        var Σ_nbv = new Σ.Scope(this, Σ, nbv, function () {
            return this.capture({ i: i }, { r: r });
        });
        var r = nbi();
        r.fromInt(i);
        return r;
    }
    function bnpFromString(s, b) {
        var Σ_bnpFromString = new Σ.Scope(this, Σ, bnpFromString, function () {
            return this.capture({
                s: s,
                b: b
            }, {
                this_array: this_array,
                k: k,
                i: i,
                mi: mi,
                sh: sh
            });
        });
        var this_array = this.array;
        var k;
        if (b == 16) {
            k = 4;
        } else if (b == 8) {
            k = 3;
        } else if (b == 256) {
            k = 8;
        } else if (b == 2) {
            k = 1;
        } else if (b == 32) {
            k = 5;
        } else if (b == 4) {
            k = 2;
        } else {
            this.fromRadix(s, b);
            return;
        }
        this.t = 0;
        this.s = 0;
        var i = s.length, mi = false, sh = 0;
        while (--i >= 0) {
            var x = k == 8 ? s[i] & 255 : intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == '-') {
                    mi = true;
                }
                continue;
            }
            mi = false;
            if (sh == 0) {
                this_array[this.t++] = x;
            } else if (sh + k > BI_DB) {
                this_array[this.t - 1] |= (x & (1 << BI_DB - sh) - 1) << sh;
                this_array[this.t++] = x >> BI_DB - sh;
            } else {
                this_array[this.t - 1] |= x << sh;
            }
            sh += k;
            if (sh >= BI_DB) {
                sh -= BI_DB;
            }
        }
        if (k == 8 && (s[0] & 128) != 0) {
            this.s = -1;
            if (sh > 0) {
                this_array[this.t - 1] |= (1 << BI_DB - sh) - 1 << sh;
            }
        }
        this.clamp();
        if (mi) {
            BigInteger.ZERO.subTo(this, this);
        }
    }
    function bnpClamp() {
        var Σ_bnpClamp = new Σ.Scope(this, Σ, bnpClamp, function () {
            return this.capture({}, {
                this_array: this_array,
                c: c
            });
        });
        var this_array = this.array;
        var c = this.s & BI_DM;
        while (this.t > 0 && this_array[this.t - 1] == c) {
            --this.t;
        }
    }
    function bnToString(b) {
        var Σ_bnToString = new Σ.Scope(this, Σ, bnToString, function () {
            return this.capture({ b: b }, {
                this_array: this_array,
                k: k,
                km: km,
                d: d,
                m: m,
                r: r,
                i: i,
                p: p
            });
        });
        var this_array = this.array;
        if (this.s < 0) {
            return '-' + this.negate().toString(b);
        }
        var k;
        if (b == 16) {
            k = 4;
        } else if (b == 8) {
            k = 3;
        } else if (b == 2) {
            k = 1;
        } else if (b == 32) {
            k = 5;
        } else if (b == 4) {
            k = 2;
        } else {
            return this.toRadix(b);
        }
        var km = (1 << k) - 1, d, m = false, r = '', i = this.t;
        var p = BI_DB - i * BI_DB % k;
        if (i-- > 0) {
            if (p < BI_DB && (d = this_array[i] >> p) > 0) {
                m = true;
                r = int2char(d);
            }
            while (i >= 0) {
                if (p < k) {
                    d = (this_array[i] & (1 << p) - 1) << k - p;
                    d |= this_array[--i] >> (p += BI_DB - k);
                } else {
                    d = this_array[i] >> (p -= k) & km;
                    if (p <= 0) {
                        p += BI_DB;
                        --i;
                    }
                }
                if (d > 0) {
                    m = true;
                }
                if (m) {
                    r += int2char(d);
                }
            }
        }
        return m ? r : '0';
    }
    function bnNegate() {
        var Σ_bnNegate = new Σ.Scope(this, Σ, bnNegate, function () {
            return this.capture({}, { r: r });
        });
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r;
    }
    function bnAbs() {
        return this.s < 0 ? this.negate() : this;
    }
    function bnCompareTo(a) {
        var Σ_bnCompareTo = new Σ.Scope(this, Σ, bnCompareTo, function () {
            return this.capture({ a: a }, {
                this_array: this_array,
                a_array: a_array,
                r: r,
                i: i
            });
        });
        var this_array = this.array;
        var a_array = a.array;
        var r = this.s - a.s;
        if (r != 0) {
            return r;
        }
        var i = this.t;
        r = i - a.t;
        if (r != 0) {
            return r;
        }
        while (--i >= 0) {
            if ((r = this_array[i] - a_array[i]) != 0) {
                return r;
            }
        }
        return 0;
    }
    function nbits(x) {
        var Σ_nbits = new Σ.Scope(this, Σ, nbits, function () {
            return this.capture({ x: x }, {
                r: r,
                t: t
            });
        });
        var r = 1, t;
        if ((t = x >>> 16) != 0) {
            x = t;
            r += 16;
        }
        if ((t = x >> 8) != 0) {
            x = t;
            r += 8;
        }
        if ((t = x >> 4) != 0) {
            x = t;
            r += 4;
        }
        if ((t = x >> 2) != 0) {
            x = t;
            r += 2;
        }
        if ((t = x >> 1) != 0) {
            x = t;
            r += 1;
        }
        return r;
    }
    function bnBitLength() {
        var Σ_bnBitLength = new Σ.Scope(this, Σ, bnBitLength, function () {
            return this.capture({}, { this_array: this_array });
        });
        var this_array = this.array;
        if (this.t <= 0) {
            return 0;
        }
        return BI_DB * (this.t - 1) + nbits(this_array[this.t - 1] ^ this.s & BI_DM);
    }
    function bnpDLShiftTo(n, r) {
        var Σ_bnpDLShiftTo = new Σ.Scope(this, Σ, bnpDLShiftTo, function () {
            return this.capture({
                n: n,
                r: r
            }, {
                this_array: this_array,
                r_array: r_array,
                i: i
            });
        });
        var this_array = this.array;
        var r_array = r.array;
        var i;
        for (i = this.t - 1; i >= 0; --i) {
            r_array[i + n] = this_array[i];
        }
        for (i = n - 1; i >= 0; --i) {
            r_array[i] = 0;
        }
        r.t = this.t + n;
        r.s = this.s;
    }
    function bnpDRShiftTo(n, r) {
        var Σ_bnpDRShiftTo = new Σ.Scope(this, Σ, bnpDRShiftTo, function () {
            return this.capture({
                n: n,
                r: r
            }, {
                this_array: this_array,
                r_array: r_array
            });
        });
        var this_array = this.array;
        var r_array = r.array;
        for (var i = n; i < this.t; ++i) {
            r_array[i - n] = this_array[i];
        }
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
    }
    function bnpLShiftTo(n, r) {
        var Σ_bnpLShiftTo = new Σ.Scope(this, Σ, bnpLShiftTo, function () {
            return this.capture({
                n: n,
                r: r
            }, {
                this_array: this_array,
                r_array: r_array,
                bs: bs,
                cbs: cbs,
                bm: bm,
                ds: ds,
                c: c,
                i: i
            });
        });
        var this_array = this.array;
        var r_array = r.array;
        var bs = n % BI_DB;
        var cbs = BI_DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / BI_DB), c = this.s << bs & BI_DM, i;
        for (i = this.t - 1; i >= 0; --i) {
            r_array[i + ds + 1] = this_array[i] >> cbs | c;
            c = (this_array[i] & bm) << bs;
        }
        for (i = ds - 1; i >= 0; --i) {
            r_array[i] = 0;
        }
        r_array[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
    }
    function bnpRShiftTo(n, r) {
        var Σ_bnpRShiftTo = new Σ.Scope(this, Σ, bnpRShiftTo, function () {
            return this.capture({
                n: n,
                r: r
            }, {
                this_array: this_array,
                r_array: r_array,
                ds: ds,
                bs: bs,
                cbs: cbs,
                bm: bm
            });
        });
        var this_array = this.array;
        var r_array = r.array;
        r.s = this.s;
        var ds = Math.floor(n / BI_DB);
        if (ds >= this.t) {
            r.t = 0;
            return;
        }
        var bs = n % BI_DB;
        var cbs = BI_DB - bs;
        var bm = (1 << bs) - 1;
        r_array[0] = this_array[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
            r_array[i - ds - 1] |= (this_array[i] & bm) << cbs;
            r_array[i - ds] = this_array[i] >> bs;
        }
        if (bs > 0) {
            r_array[this.t - ds - 1] |= (this.s & bm) << cbs;
        }
        r.t = this.t - ds;
        r.clamp();
    }
    function bnpSubTo(a, r) {
        var Σ_bnpSubTo = new Σ.Scope(this, Σ, bnpSubTo, function () {
            return this.capture({
                a: a,
                r: r
            }, {
                this_array: this_array,
                r_array: r_array,
                a_array: a_array,
                i: i,
                c: c,
                m: m
            });
        });
        var this_array = this.array;
        var r_array = r.array;
        var a_array = a.array;
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
            c += this_array[i] - a_array[i];
            r_array[i++] = c & BI_DM;
            c >>= BI_DB;
        }
        if (a.t < this.t) {
            c -= a.s;
            while (i < this.t) {
                c += this_array[i];
                r_array[i++] = c & BI_DM;
                c >>= BI_DB;
            }
            c += this.s;
        } else {
            c += this.s;
            while (i < a.t) {
                c -= a_array[i];
                r_array[i++] = c & BI_DM;
                c >>= BI_DB;
            }
            c -= a.s;
        }
        r.s = c < 0 ? -1 : 0;
        if (c < -1) {
            r_array[i++] = BI_DV + c;
        } else if (c > 0) {
            r_array[i++] = c;
        }
        r.t = i;
        r.clamp();
    }
    function bnpMultiplyTo(a, r) {
        var Σ_bnpMultiplyTo = new Σ.Scope(this, Σ, bnpMultiplyTo, function () {
            return this.capture({
                a: a,
                r: r
            }, {
                this_array: this_array,
                r_array: r_array,
                x: x,
                y: y,
                y_array: y_array,
                i: i
            });
        });
        var this_array = this.array;
        var r_array = r.array;
        var x = this.abs(), y = a.abs();
        var y_array = y.array;
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) {
            r_array[i] = 0;
        }
        for (i = 0; i < y.t; ++i) {
            r_array[i + x.t] = x.am(0, y_array[i], r, i, 0, x.t);
        }
        r.s = 0;
        r.clamp();
        if (this.s != a.s) {
            BigInteger.ZERO.subTo(r, r);
        }
    }
    function bnpSquareTo(r) {
        var Σ_bnpSquareTo = new Σ.Scope(this, Σ, bnpSquareTo, function () {
            return this.capture({ r: r }, {
                x: x,
                x_array: x_array,
                r_array: r_array,
                i: i
            });
        });
        var x = this.abs();
        var x_array = x.array;
        var r_array = r.array;
        var i = r.t = 2 * x.t;
        while (--i >= 0) {
            r_array[i] = 0;
        }
        for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x_array[i], r, 2 * i, 0, 1);
            if ((r_array[i + x.t] += x.am(i + 1, 2 * x_array[i], r, 2 * i + 1, c, x.t - i - 1)) >= BI_DV) {
                r_array[i + x.t] -= BI_DV;
                r_array[i + x.t + 1] = 1;
            }
        }
        if (r.t > 0) {
            r_array[r.t - 1] += x.am(i, x_array[i], r, 2 * i, 0, 1);
        }
        r.s = 0;
        r.clamp();
    }
    function bnpDivRemTo(m, q, r) {
        var Σ_bnpDivRemTo = new Σ.Scope(this, Σ, bnpDivRemTo, function () {
            return this.capture({
                m: m,
                q: q,
                r: r
            }, {
                pm: pm,
                pt: pt,
                y: y,
                ts: ts,
                ms: ms,
                pm_array: pm_array,
                nsh: nsh,
                ys: ys,
                y_array: y_array,
                y0: y0,
                yt: yt,
                d1: d1,
                d2: d2,
                e: e,
                i: i,
                j: j,
                t: t,
                r_array: r_array
            });
        });
        var pm = m.abs();
        if (pm.t <= 0) {
            return;
        }
        var pt = this.abs();
        if (pt.t < pm.t) {
            if (q != null) {
                q.fromInt(0);
            }
            if (r != null) {
                this.copyTo(r);
            }
            return;
        }
        if (r == null) {
            r = nbi();
        }
        var y = nbi(), ts = this.s, ms = m.s;
        var pm_array = pm.array;
        var nsh = BI_DB - nbits(pm_array[pm.t - 1]);
        if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r);
        } else {
            pm.copyTo(y);
            pt.copyTo(r);
        }
        var ys = y.t;
        var y_array = y.array;
        var y0 = y_array[ys - 1];
        if (y0 == 0) {
            return;
        }
        var yt = y0 * (1 << BI_F1) + (ys > 1 ? y_array[ys - 2] >> BI_F2 : 0);
        var d1 = BI_FV / yt, d2 = (1 << BI_F1) / yt, e = 1 << BI_F2;
        var i = r.t, j = i - ys, t = q == null ? nbi() : q;
        y.dlShiftTo(j, t);
        var r_array = r.array;
        if (r.compareTo(t) >= 0) {
            r_array[r.t++] = 1;
            r.subTo(t, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y);
        while (y.t < ys) {
            y_array[y.t++] = 0;
        }
        while (--j >= 0) {
            var qd = r_array[--i] == y0 ? BI_DM : Math.floor(r_array[i] * d1 + (r_array[i - 1] + e) * d2);
            if ((r_array[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
                y.dlShiftTo(j, t);
                r.subTo(t, r);
                while (r_array[i] < --qd) {
                    r.subTo(t, r);
                }
            }
        }
        if (q != null) {
            r.drShiftTo(ys, q);
            if (ts != ms) {
                BigInteger.ZERO.subTo(q, q);
            }
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) {
            r.rShiftTo(nsh, r);
        }
        if (ts < 0) {
            BigInteger.ZERO.subTo(r, r);
        }
    }
    function bnMod(a) {
        var Σ_bnMod = new Σ.Scope(this, Σ, bnMod, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            a.subTo(r, r);
        }
        return r;
    }
    function Classic(m) {
        var Σ_Classic = new Σ.Scope(this, Σ, Classic, function () {
            return this.capture({ m: m }, {});
        });
        this.m = m;
    }
    function cConvert(x) {
        var Σ_cConvert = new Σ.Scope(this, Σ, cConvert, function () {
            return this.capture({ x: x }, {});
        });
        if (x.s < 0 || x.compareTo(this.m) >= 0) {
            return x.mod(this.m);
        } else {
            return x;
        }
    }
    function cRevert(x) {
        var Σ_cRevert = new Σ.Scope(this, Σ, cRevert, function () {
            return this.capture({ x: x }, {});
        });
        return x;
    }
    function cReduce(x) {
        var Σ_cReduce = new Σ.Scope(this, Σ, cReduce, function () {
            return this.capture({ x: x }, {});
        });
        x.divRemTo(this.m, null, x);
    }
    function cMulTo(x, y, r) {
        var Σ_cMulTo = new Σ.Scope(this, Σ, cMulTo, function () {
            return this.capture({
                x: x,
                y: y,
                r: r
            }, {});
        });
        x.multiplyTo(y, r);
        this.reduce(r);
    }
    function cSqrTo(x, r) {
        var Σ_cSqrTo = new Σ.Scope(this, Σ, cSqrTo, function () {
            return this.capture({
                x: x,
                r: r
            }, {});
        });
        x.squareTo(r);
        this.reduce(r);
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
        var Σ_bnpInvDigit = new Σ.Scope(this, Σ, bnpInvDigit, function () {
            return this.capture({}, {
                this_array: this_array,
                x: x,
                y: y
            });
        });
        var this_array = this.array;
        if (this.t < 1) {
            return 0;
        }
        var x = this_array[0];
        if ((x & 1) == 0) {
            return 0;
        }
        var y = x & 3;
        y = y * (2 - (x & 15) * y) & 15;
        y = y * (2 - (x & 255) * y) & 255;
        y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
        y = y * (2 - x * y % BI_DV) % BI_DV;
        return y > 0 ? BI_DV - y : -y;
    }
    function Montgomery(m) {
        var Σ_Montgomery = new Σ.Scope(this, Σ, Montgomery, function () {
            return this.capture({ m: m }, {});
        });
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << BI_DB - 15) - 1;
        this.mt2 = 2 * m.t;
    }
    function montConvert(x) {
        var Σ_montConvert = new Σ.Scope(this, Σ, montConvert, function () {
            return this.capture({ x: x }, { r: r });
        });
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            this.m.subTo(r, r);
        }
        return r;
    }
    function montRevert(x) {
        var Σ_montRevert = new Σ.Scope(this, Σ, montRevert, function () {
            return this.capture({ x: x }, { r: r });
        });
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
    }
    function montReduce(x) {
        var Σ_montReduce = new Σ.Scope(this, Σ, montReduce, function () {
            return this.capture({ x: x }, { x_array: x_array });
        });
        var x_array = x.array;
        while (x.t <= this.mt2) {
            x_array[x.t++] = 0;
        }
        for (var i = 0; i < this.m.t; ++i) {
            var j = x_array[i] & 32767;
            var u0 = j * this.mpl + ((j * this.mph + (x_array[i] >> 15) * this.mpl & this.um) << 15) & BI_DM;
            j = i + this.m.t;
            x_array[j] += this.m.am(0, u0, x, i, 0, this.m.t);
            while (x_array[j] >= BI_DV) {
                x_array[j] -= BI_DV;
                x_array[++j]++;
            }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
        }
    }
    function montSqrTo(x, r) {
        var Σ_montSqrTo = new Σ.Scope(this, Σ, montSqrTo, function () {
            return this.capture({
                x: x,
                r: r
            }, {});
        });
        x.squareTo(r);
        this.reduce(r);
    }
    function montMulTo(x, y, r) {
        var Σ_montMulTo = new Σ.Scope(this, Σ, montMulTo, function () {
            return this.capture({
                x: x,
                y: y,
                r: r
            }, {});
        });
        x.multiplyTo(y, r);
        this.reduce(r);
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() {
        var Σ_bnpIsEven = new Σ.Scope(this, Σ, bnpIsEven, function () {
            return this.capture({}, { this_array: this_array });
        });
        var this_array = this.array;
        return (this.t > 0 ? this_array[0] & 1 : this.s) == 0;
    }
    function bnpExp(e, z) {
        var Σ_bnpExp = new Σ.Scope(this, Σ, bnpExp, function () {
            return this.capture({
                e: e,
                z: z
            }, {
                r: r,
                r2: r2,
                g: g,
                i: i
            });
        });
        if (e > 4294967295 || e < 1) {
            return BigInteger.ONE;
        }
        var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
            z.sqrTo(r, r2);
            if ((e & 1 << i) > 0) {
                z.mulTo(r2, g, r);
            } else {
                var t = r;
                r = r2;
                r2 = t;
            }
        }
        return z.revert(r);
    }
    function bnModPowInt(e, m) {
        var Σ_bnModPowInt = new Σ.Scope(this, Σ, bnModPowInt, function () {
            return this.capture({
                e: e,
                m: m
            }, { z: z });
        });
        var z;
        if (e < 256 || m.isEven()) {
            z = new Classic(m);
        } else {
            z = new Montgomery(m);
        }
        return this.exp(e, z);
    }
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);
    function bnClone() {
        var Σ_bnClone = new Σ.Scope(this, Σ, bnClone, function () {
            return this.capture({}, { r: r });
        });
        var r = nbi();
        this.copyTo(r);
        return r;
    }
    function bnIntValue() {
        var Σ_bnIntValue = new Σ.Scope(this, Σ, bnIntValue, function () {
            return this.capture({}, { this_array: this_array });
        });
        var this_array = this.array;
        if (this.s < 0) {
            if (this.t == 1) {
                return this_array[0] - BI_DV;
            } else if (this.t == 0) {
                return -1;
            }
        } else if (this.t == 1) {
            return this_array[0];
        } else if (this.t == 0) {
            return 0;
        }
        return (this_array[1] & (1 << 32 - BI_DB) - 1) << BI_DB | this_array[0];
    }
    function bnByteValue() {
        var Σ_bnByteValue = new Σ.Scope(this, Σ, bnByteValue, function () {
            return this.capture({}, { this_array: this_array });
        });
        var this_array = this.array;
        return this.t == 0 ? this.s : this_array[0] << 24 >> 24;
    }
    function bnShortValue() {
        var Σ_bnShortValue = new Σ.Scope(this, Σ, bnShortValue, function () {
            return this.capture({}, { this_array: this_array });
        });
        var this_array = this.array;
        return this.t == 0 ? this.s : this_array[0] << 16 >> 16;
    }
    function bnpChunkSize(r) {
        var Σ_bnpChunkSize = new Σ.Scope(this, Σ, bnpChunkSize, function () {
            return this.capture({ r: r }, {});
        });
        return Math.floor(Math.LN2 * BI_DB / Math.log(r));
    }
    function bnSigNum() {
        var Σ_bnSigNum = new Σ.Scope(this, Σ, bnSigNum, function () {
            return this.capture({}, { this_array: this_array });
        });
        var this_array = this.array;
        if (this.s < 0) {
            return -1;
        } else if (this.t <= 0 || this.t == 1 && this_array[0] <= 0) {
            return 0;
        } else {
            return 1;
        }
    }
    function bnpToRadix(b) {
        var Σ_bnpToRadix = new Σ.Scope(this, Σ, bnpToRadix, function () {
            return this.capture({ b: b }, {
                cs: cs,
                a: a,
                d: d,
                y: y,
                z: z,
                r: r
            });
        });
        if (b == null) {
            b = 10;
        }
        if (this.signum() == 0 || b < 2 || b > 36) {
            return '0';
        }
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a), y = nbi(), z = nbi(), r = '';
        this.divRemTo(d, y, z);
        while (y.signum() > 0) {
            r = (a + z.intValue()).toString(b).substr(1) + r;
            y.divRemTo(d, y, z);
        }
        return z.intValue().toString(b) + r;
    }
    function bnpFromRadix(s, b) {
        var Σ_bnpFromRadix = new Σ.Scope(this, Σ, bnpFromRadix, function () {
            return this.capture({
                s: s,
                b: b
            }, {
                cs: cs,
                d: d,
                mi: mi,
                j: j,
                w: w
            });
        });
        this.fromInt(0);
        if (b == null) {
            b = 10;
        }
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
        for (var i = 0; i < s.length; ++i) {
            var x = intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == '-' && this.signum() == 0) {
                    mi = true;
                }
                continue;
            }
            w = b * w + x;
            if (++j >= cs) {
                this.dMultiply(d);
                this.dAddOffset(w, 0);
                j = 0;
                w = 0;
            }
        }
        if (j > 0) {
            this.dMultiply(Math.pow(b, j));
            this.dAddOffset(w, 0);
        }
        if (mi) {
            BigInteger.ZERO.subTo(this, this);
        }
    }
    function bnpFromNumber(a, b, c) {
        var Σ_bnpFromNumber = new Σ.Scope(this, Σ, bnpFromNumber, function () {
            return this.capture({
                a: a,
                b: b,
                c: c
            }, {});
        });
        if ('number' == typeof b) {
            if (a < 2) {
                this.fromInt(1);
            } else {
                this.fromNumber(a, c);
                if (!this.testBit(a - 1)) {
                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                }
                if (this.isEven()) {
                    this.dAddOffset(1, 0);
                }
                while (!this.isProbablePrime(b)) {
                    this.dAddOffset(2, 0);
                    if (this.bitLength() > a) {
                        this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                    }
                }
            }
        } else {
            var x = new Array(), t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);
            if (t > 0) {
                x[0] &= (1 << t) - 1;
            } else {
                x[0] = 0;
            }
            this.fromString(x, 256);
        }
    }
    function bnToByteArray() {
        var Σ_bnToByteArray = new Σ.Scope(this, Σ, bnToByteArray, function () {
            return this.capture({}, {
                this_array: this_array,
                i: i,
                r: r,
                p: p,
                d: d,
                k: k
            });
        });
        var this_array = this.array;
        var i = this.t, r = new Array();
        r[0] = this.s;
        var p = BI_DB - i * BI_DB % 8, d, k = 0;
        if (i-- > 0) {
            if (p < BI_DB && (d = this_array[i] >> p) != (this.s & BI_DM) >> p) {
                r[k++] = d | this.s << BI_DB - p;
            }
            while (i >= 0) {
                if (p < 8) {
                    d = (this_array[i] & (1 << p) - 1) << 8 - p;
                    d |= this_array[--i] >> (p += BI_DB - 8);
                } else {
                    d = this_array[i] >> (p -= 8) & 255;
                    if (p <= 0) {
                        p += BI_DB;
                        --i;
                    }
                }
                if ((d & 128) != 0) {
                    d |= -256;
                }
                if (k == 0 && (this.s & 128) != (d & 128)) {
                    ++k;
                }
                if (k > 0 || d != this.s) {
                    r[k++] = d;
                }
            }
        }
        return r;
    }
    function bnEquals(a) {
        var Σ_bnEquals = new Σ.Scope(this, Σ, bnEquals, function () {
            return this.capture({ a: a }, {});
        });
        return this.compareTo(a) == 0;
    }
    function bnMin(a) {
        var Σ_bnMin = new Σ.Scope(this, Σ, bnMin, function () {
            return this.capture({ a: a }, {});
        });
        return this.compareTo(a) < 0 ? this : a;
    }
    function bnMax(a) {
        var Σ_bnMax = new Σ.Scope(this, Σ, bnMax, function () {
            return this.capture({ a: a }, {});
        });
        return this.compareTo(a) > 0 ? this : a;
    }
    function bnpBitwiseTo(a, op, r) {
        var Σ_bnpBitwiseTo = new Σ.Scope(this, Σ, bnpBitwiseTo, function () {
            return this.capture({
                a: a,
                op: op,
                r: r
            }, {
                this_array: this_array,
                a_array: a_array,
                r_array: r_array,
                i: i,
                f: f,
                m: m
            });
        });
        var this_array = this.array;
        var a_array = a.array;
        var r_array = r.array;
        var i, f, m = Math.min(a.t, this.t);
        for (i = 0; i < m; ++i) {
            r_array[i] = op(this_array[i], a_array[i]);
        }
        if (a.t < this.t) {
            f = a.s & BI_DM;
            for (i = m; i < this.t; ++i) {
                r_array[i] = op(this_array[i], f);
            }
            r.t = this.t;
        } else {
            f = this.s & BI_DM;
            for (i = m; i < a.t; ++i) {
                r_array[i] = op(f, a_array[i]);
            }
            r.t = a.t;
        }
        r.s = op(this.s, a.s);
        r.clamp();
    }
    function op_and(x, y) {
        var Σ_op_and = new Σ.Scope(this, Σ, op_and, function () {
            return this.capture({
                x: x,
                y: y
            }, {});
        });
        return x & y;
    }
    function bnAnd(a) {
        var Σ_bnAnd = new Σ.Scope(this, Σ, bnAnd, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.bitwiseTo(a, op_and, r);
        return r;
    }
    function op_or(x, y) {
        var Σ_op_or = new Σ.Scope(this, Σ, op_or, function () {
            return this.capture({
                x: x,
                y: y
            }, {});
        });
        return x | y;
    }
    function bnOr(a) {
        var Σ_bnOr = new Σ.Scope(this, Σ, bnOr, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.bitwiseTo(a, op_or, r);
        return r;
    }
    function op_xor(x, y) {
        var Σ_op_xor = new Σ.Scope(this, Σ, op_xor, function () {
            return this.capture({
                x: x,
                y: y
            }, {});
        });
        return x ^ y;
    }
    function bnXor(a) {
        var Σ_bnXor = new Σ.Scope(this, Σ, bnXor, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.bitwiseTo(a, op_xor, r);
        return r;
    }
    function op_andnot(x, y) {
        var Σ_op_andnot = new Σ.Scope(this, Σ, op_andnot, function () {
            return this.capture({
                x: x,
                y: y
            }, {});
        });
        return x & ~y;
    }
    function bnAndNot(a) {
        var Σ_bnAndNot = new Σ.Scope(this, Σ, bnAndNot, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.bitwiseTo(a, op_andnot, r);
        return r;
    }
    function bnNot() {
        var Σ_bnNot = new Σ.Scope(this, Σ, bnNot, function () {
            return this.capture({}, {
                this_array: this_array,
                r: r,
                r_array: r_array
            });
        });
        var this_array = this.array;
        var r = nbi();
        var r_array = r.array;
        for (var i = 0; i < this.t; ++i) {
            r_array[i] = BI_DM & ~this_array[i];
        }
        r.t = this.t;
        r.s = ~this.s;
        return r;
    }
    function bnShiftLeft(n) {
        var Σ_bnShiftLeft = new Σ.Scope(this, Σ, bnShiftLeft, function () {
            return this.capture({ n: n }, { r: r });
        });
        var r = nbi();
        if (n < 0) {
            this.rShiftTo(-n, r);
        } else {
            this.lShiftTo(n, r);
        }
        return r;
    }
    function bnShiftRight(n) {
        var Σ_bnShiftRight = new Σ.Scope(this, Σ, bnShiftRight, function () {
            return this.capture({ n: n }, { r: r });
        });
        var r = nbi();
        if (n < 0) {
            this.lShiftTo(-n, r);
        } else {
            this.rShiftTo(n, r);
        }
        return r;
    }
    function lbit(x) {
        var Σ_lbit = new Σ.Scope(this, Σ, lbit, function () {
            return this.capture({ x: x }, { r: r });
        });
        if (x == 0) {
            return -1;
        }
        var r = 0;
        if ((x & 65535) == 0) {
            x >>= 16;
            r += 16;
        }
        if ((x & 255) == 0) {
            x >>= 8;
            r += 8;
        }
        if ((x & 15) == 0) {
            x >>= 4;
            r += 4;
        }
        if ((x & 3) == 0) {
            x >>= 2;
            r += 2;
        }
        if ((x & 1) == 0) {
            ++r;
        }
        return r;
    }
    function bnGetLowestSetBit() {
        var Σ_bnGetLowestSetBit = new Σ.Scope(this, Σ, bnGetLowestSetBit, function () {
            return this.capture({}, { this_array: this_array });
        });
        var this_array = this.array;
        for (var i = 0; i < this.t; ++i) {
            if (this_array[i] != 0) {
                return i * BI_DB + lbit(this_array[i]);
            }
        }
        if (this.s < 0) {
            return this.t * BI_DB;
        }
        return -1;
    }
    function cbit(x) {
        var Σ_cbit = new Σ.Scope(this, Σ, cbit, function () {
            return this.capture({ x: x }, { r: r });
        });
        var r = 0;
        while (x != 0) {
            x &= x - 1;
            ++r;
        }
        return r;
    }
    function bnBitCount() {
        var Σ_bnBitCount = new Σ.Scope(this, Σ, bnBitCount, function () {
            return this.capture({}, {
                r: r,
                x: x
            });
        });
        var r = 0, x = this.s & BI_DM;
        for (var i = 0; i < this.t; ++i) {
            r += cbit(this_array[i] ^ x);
        }
        return r;
    }
    function bnTestBit(n) {
        var Σ_bnTestBit = new Σ.Scope(this, Σ, bnTestBit, function () {
            return this.capture({ n: n }, {
                this_array: this_array,
                j: j
            });
        });
        var this_array = this.array;
        var j = Math.floor(n / BI_DB);
        if (j >= this.t) {
            return this.s != 0;
        }
        return (this_array[j] & 1 << n % BI_DB) != 0;
    }
    function bnpChangeBit(n, op) {
        var Σ_bnpChangeBit = new Σ.Scope(this, Σ, bnpChangeBit, function () {
            return this.capture({
                n: n,
                op: op
            }, { r: r });
        });
        var r = BigInteger.ONE.shiftLeft(n);
        this.bitwiseTo(r, op, r);
        return r;
    }
    function bnSetBit(n) {
        var Σ_bnSetBit = new Σ.Scope(this, Σ, bnSetBit, function () {
            return this.capture({ n: n }, {});
        });
        return this.changeBit(n, op_or);
    }
    function bnClearBit(n) {
        var Σ_bnClearBit = new Σ.Scope(this, Σ, bnClearBit, function () {
            return this.capture({ n: n }, {});
        });
        return this.changeBit(n, op_andnot);
    }
    function bnFlipBit(n) {
        var Σ_bnFlipBit = new Σ.Scope(this, Σ, bnFlipBit, function () {
            return this.capture({ n: n }, {});
        });
        return this.changeBit(n, op_xor);
    }
    function bnpAddTo(a, r) {
        var Σ_bnpAddTo = new Σ.Scope(this, Σ, bnpAddTo, function () {
            return this.capture({
                a: a,
                r: r
            }, {
                this_array: this_array,
                a_array: a_array,
                r_array: r_array,
                i: i,
                c: c,
                m: m
            });
        });
        var this_array = this.array;
        var a_array = a.array;
        var r_array = r.array;
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
            c += this_array[i] + a_array[i];
            r_array[i++] = c & BI_DM;
            c >>= BI_DB;
        }
        if (a.t < this.t) {
            c += a.s;
            while (i < this.t) {
                c += this_array[i];
                r_array[i++] = c & BI_DM;
                c >>= BI_DB;
            }
            c += this.s;
        } else {
            c += this.s;
            while (i < a.t) {
                c += a_array[i];
                r_array[i++] = c & BI_DM;
                c >>= BI_DB;
            }
            c += a.s;
        }
        r.s = c < 0 ? -1 : 0;
        if (c > 0) {
            r_array[i++] = c;
        } else if (c < -1) {
            r_array[i++] = BI_DV + c;
        }
        r.t = i;
        r.clamp();
    }
    function bnAdd(a) {
        var Σ_bnAdd = new Σ.Scope(this, Σ, bnAdd, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.addTo(a, r);
        return r;
    }
    function bnSubtract(a) {
        var Σ_bnSubtract = new Σ.Scope(this, Σ, bnSubtract, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.subTo(a, r);
        return r;
    }
    function bnMultiply(a) {
        var Σ_bnMultiply = new Σ.Scope(this, Σ, bnMultiply, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.multiplyTo(a, r);
        return r;
    }
    function bnDivide(a) {
        var Σ_bnDivide = new Σ.Scope(this, Σ, bnDivide, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.divRemTo(a, r, null);
        return r;
    }
    function bnRemainder(a) {
        var Σ_bnRemainder = new Σ.Scope(this, Σ, bnRemainder, function () {
            return this.capture({ a: a }, { r: r });
        });
        var r = nbi();
        this.divRemTo(a, null, r);
        return r;
    }
    function bnDivideAndRemainder(a) {
        var Σ_bnDivideAndRemainder = new Σ.Scope(this, Σ, bnDivideAndRemainder, function () {
            return this.capture({ a: a }, {
                q: q,
                r: r
            });
        });
        var q = nbi(), r = nbi();
        this.divRemTo(a, q, r);
        return new Array(q, r);
    }
    function bnpDMultiply(n) {
        var Σ_bnpDMultiply = new Σ.Scope(this, Σ, bnpDMultiply, function () {
            return this.capture({ n: n }, { this_array: this_array });
        });
        var this_array = this.array;
        this_array[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
    }
    function bnpDAddOffset(n, w) {
        var Σ_bnpDAddOffset = new Σ.Scope(this, Σ, bnpDAddOffset, function () {
            return this.capture({
                n: n,
                w: w
            }, { this_array: this_array });
        });
        var this_array = this.array;
        while (this.t <= w) {
            this_array[this.t++] = 0;
        }
        this_array[w] += n;
        while (this_array[w] >= BI_DV) {
            this_array[w] -= BI_DV;
            if (++w >= this.t) {
                this_array[this.t++] = 0;
            }
            ++this_array[w];
        }
    }
    function NullExp() {
    }
    function nNop(x) {
        var Σ_nNop = new Σ.Scope(this, Σ, nNop, function () {
            return this.capture({ x: x }, {});
        });
        return x;
    }
    function nMulTo(x, y, r) {
        var Σ_nMulTo = new Σ.Scope(this, Σ, nMulTo, function () {
            return this.capture({
                x: x,
                y: y,
                r: r
            }, {});
        });
        x.multiplyTo(y, r);
    }
    function nSqrTo(x, r) {
        var Σ_nSqrTo = new Σ.Scope(this, Σ, nSqrTo, function () {
            return this.capture({
                x: x,
                r: r
            }, {});
        });
        x.squareTo(r);
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(e) {
        var Σ_bnPow = new Σ.Scope(this, Σ, bnPow, function () {
            return this.capture({ e: e }, {});
        });
        return this.exp(e, new NullExp());
    }
    function bnpMultiplyLowerTo(a, n, r) {
        var Σ_bnpMultiplyLowerTo = new Σ.Scope(this, Σ, bnpMultiplyLowerTo, function () {
            return this.capture({
                a: a,
                n: n,
                r: r
            }, {
                r_array: r_array,
                a_array: a_array,
                i: i,
                j: j
            });
        });
        var r_array = r.array;
        var a_array = a.array;
        var i = Math.min(this.t + a.t, n);
        r.s = 0;
        r.t = i;
        while (i > 0) {
            r_array[--i] = 0;
        }
        var j;
        for (j = r.t - this.t; i < j; ++i) {
            r_array[i + this.t] = this.am(0, a_array[i], r, i, 0, this.t);
        }
        for (j = Math.min(a.t, n); i < j; ++i) {
            this.am(0, a_array[i], r, i, 0, n - i);
        }
        r.clamp();
    }
    function bnpMultiplyUpperTo(a, n, r) {
        var Σ_bnpMultiplyUpperTo = new Σ.Scope(this, Σ, bnpMultiplyUpperTo, function () {
            return this.capture({
                a: a,
                n: n,
                r: r
            }, {
                r_array: r_array,
                a_array: a_array,
                i: i
            });
        });
        var r_array = r.array;
        var a_array = a.array;
        --n;
        var i = r.t = this.t + a.t - n;
        r.s = 0;
        while (--i >= 0) {
            r_array[i] = 0;
        }
        for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
            r_array[this.t + i - n] = this.am(n - i, a_array[i], r, 0, 0, this.t + i - n);
        }
        r.clamp();
        r.drShiftTo(1, r);
    }
    function Barrett(m) {
        var Σ_Barrett = new Σ.Scope(this, Σ, Barrett, function () {
            return this.capture({ m: m }, {});
        });
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
        this.m = m;
    }
    function barrettConvert(x) {
        var Σ_barrettConvert = new Σ.Scope(this, Σ, barrettConvert, function () {
            return this.capture({ x: x }, {});
        });
        if (x.s < 0 || x.t > 2 * this.m.t) {
            return x.mod(this.m);
        } else if (x.compareTo(this.m) < 0) {
            return x;
        } else {
            var r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
        }
    }
    function barrettRevert(x) {
        var Σ_barrettRevert = new Σ.Scope(this, Σ, barrettRevert, function () {
            return this.capture({ x: x }, {});
        });
        return x;
    }
    function barrettReduce(x) {
        var Σ_barrettReduce = new Σ.Scope(this, Σ, barrettReduce, function () {
            return this.capture({ x: x }, {});
        });
        x.drShiftTo(this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
            x.t = this.m.t + 1;
            x.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x.compareTo(this.r2) < 0) {
            x.dAddOffset(1, this.m.t + 1);
        }
        x.subTo(this.r2, x);
        while (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
        }
    }
    function barrettSqrTo(x, r) {
        var Σ_barrettSqrTo = new Σ.Scope(this, Σ, barrettSqrTo, function () {
            return this.capture({
                x: x,
                r: r
            }, {});
        });
        x.squareTo(r);
        this.reduce(r);
    }
    function barrettMulTo(x, y, r) {
        var Σ_barrettMulTo = new Σ.Scope(this, Σ, barrettMulTo, function () {
            return this.capture({
                x: x,
                y: y,
                r: r
            }, {});
        });
        x.multiplyTo(y, r);
        this.reduce(r);
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(e, m) {
        var Σ_bnModPow = new Σ.Scope(this, Σ, bnModPow, function () {
            return this.capture({
                e: e,
                m: m
            }, {
                e_array: e_array,
                i: i,
                k: k,
                r: r,
                z: z,
                g: g,
                n: n,
                k1: k1,
                km: km,
                j: j,
                w: w,
                is1: is1,
                r2: r2,
                t: t
            });
        });
        var e_array = e.array;
        var i = e.bitLength(), k, r = nbv(1), z;
        if (i <= 0) {
            return r;
        } else if (i < 18) {
            k = 1;
        } else if (i < 48) {
            k = 3;
        } else if (i < 144) {
            k = 4;
        } else if (i < 768) {
            k = 5;
        } else {
            k = 6;
        }
        if (i < 8) {
            z = new Classic(m);
        } else if (m.isEven()) {
            z = new Barrett(m);
        } else {
            z = new Montgomery(m);
        }
        var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
        g[1] = z.convert(this);
        if (k > 1) {
            var g2 = nbi();
            z.sqrTo(g[1], g2);
            while (n <= km) {
                g[n] = nbi();
                z.mulTo(g2, g[n - 2], g[n]);
                n += 2;
            }
        }
        var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
        i = nbits(e_array[j]) - 1;
        while (j >= 0) {
            if (i >= k1) {
                w = e_array[j] >> i - k1 & km;
            } else {
                w = (e_array[j] & (1 << i + 1) - 1) << k1 - i;
                if (j > 0) {
                    w |= e_array[j - 1] >> BI_DB + i - k1;
                }
            }
            n = k;
            while ((w & 1) == 0) {
                w >>= 1;
                --n;
            }
            if ((i -= n) < 0) {
                i += BI_DB;
                --j;
            }
            if (is1) {
                g[w].copyTo(r);
                is1 = false;
            } else {
                while (n > 1) {
                    z.sqrTo(r, r2);
                    z.sqrTo(r2, r);
                    n -= 2;
                }
                if (n > 0) {
                    z.sqrTo(r, r2);
                } else {
                    t = r;
                    r = r2;
                    r2 = t;
                }
                z.mulTo(r2, g[w], r);
            }
            while (j >= 0 && (e_array[j] & 1 << i) == 0) {
                z.sqrTo(r, r2);
                t = r;
                r = r2;
                r2 = t;
                if (--i < 0) {
                    i = BI_DB - 1;
                    --j;
                }
            }
        }
        return z.revert(r);
    }
    function bnGCD(a) {
        var Σ_bnGCD = new Σ.Scope(this, Σ, bnGCD, function () {
            return this.capture({ a: a }, {
                x: x,
                y: y,
                i: i,
                g: g
            });
        });
        var x = this.s < 0 ? this.negate() : this.clone();
        var y = a.s < 0 ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
            var t = x;
            x = y;
            y = t;
        }
        var i = x.getLowestSetBit(), g = y.getLowestSetBit();
        if (g < 0) {
            return x;
        }
        if (i < g) {
            g = i;
        }
        if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y);
        }
        while (x.signum() > 0) {
            if ((i = x.getLowestSetBit()) > 0) {
                x.rShiftTo(i, x);
            }
            if ((i = y.getLowestSetBit()) > 0) {
                y.rShiftTo(i, y);
            }
            if (x.compareTo(y) >= 0) {
                x.subTo(y, x);
                x.rShiftTo(1, x);
            } else {
                y.subTo(x, y);
                y.rShiftTo(1, y);
            }
        }
        if (g > 0) {
            y.lShiftTo(g, y);
        }
        return y;
    }
    function bnpModInt(n) {
        var Σ_bnpModInt = new Σ.Scope(this, Σ, bnpModInt, function () {
            return this.capture({ n: n }, {
                this_array: this_array,
                d: d,
                r: r
            });
        });
        var this_array = this.array;
        if (n <= 0) {
            return 0;
        }
        var d = BI_DV % n, r = this.s < 0 ? n - 1 : 0;
        if (this.t > 0) {
            if (d == 0) {
                r = this_array[0] % n;
            } else {
                for (var i = this.t - 1; i >= 0; --i) {
                    r = (d * r + this_array[i]) % n;
                }
            }
        }
        return r;
    }
    function bnModInverse(m) {
        var Σ_bnModInverse = new Σ.Scope(this, Σ, bnModInverse, function () {
            return this.capture({ m: m }, {
                ac: ac,
                u: u,
                v: v,
                a: a,
                b: b,
                c: c,
                d: d
            });
        });
        var ac = m.isEven();
        if (this.isEven() && ac || m.signum() == 0) {
            return BigInteger.ZERO;
        }
        var u = m.clone(), v = this.clone();
        var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
        while (u.signum() != 0) {
            while (u.isEven()) {
                u.rShiftTo(1, u);
                if (ac) {
                    if (!a.isEven() || !b.isEven()) {
                        a.addTo(this, a);
                        b.subTo(m, b);
                    }
                    a.rShiftTo(1, a);
                } else if (!b.isEven()) {
                    b.subTo(m, b);
                }
                b.rShiftTo(1, b);
            }
            while (v.isEven()) {
                v.rShiftTo(1, v);
                if (ac) {
                    if (!c.isEven() || !d.isEven()) {
                        c.addTo(this, c);
                        d.subTo(m, d);
                    }
                    c.rShiftTo(1, c);
                } else if (!d.isEven()) {
                    d.subTo(m, d);
                }
                d.rShiftTo(1, d);
            }
            if (u.compareTo(v) >= 0) {
                u.subTo(v, u);
                if (ac) {
                    a.subTo(c, a);
                }
                b.subTo(d, b);
            } else {
                v.subTo(u, v);
                if (ac) {
                    c.subTo(a, c);
                }
                d.subTo(b, d);
            }
        }
        if (v.compareTo(BigInteger.ONE) != 0) {
            return BigInteger.ZERO;
        }
        if (d.compareTo(m) >= 0) {
            return d.subtract(m);
        }
        if (d.signum() < 0) {
            d.addTo(m, d);
        } else {
            return d;
        }
        if (d.signum() < 0) {
            return d.add(m);
        } else {
            return d;
        }
    }
    var lowprimes = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
        101,
        103,
        107,
        109,
        113,
        127,
        131,
        137,
        139,
        149,
        151,
        157,
        163,
        167,
        173,
        179,
        181,
        191,
        193,
        197,
        199,
        211,
        223,
        227,
        229,
        233,
        239,
        241,
        251,
        257,
        263,
        269,
        271,
        277,
        281,
        283,
        293,
        307,
        311,
        313,
        317,
        331,
        337,
        347,
        349,
        353,
        359,
        367,
        373,
        379,
        383,
        389,
        397,
        401,
        409,
        419,
        421,
        431,
        433,
        439,
        443,
        449,
        457,
        461,
        463,
        467,
        479,
        487,
        491,
        499,
        503,
        509
    ];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(t) {
        var Σ_bnIsProbablePrime = new Σ.Scope(this, Σ, bnIsProbablePrime, function () {
            return this.capture({ t: t }, {
                i: i,
                x: x,
                x_array: x_array
            });
        });
        var i, x = this.abs();
        var x_array = x.array;
        if (x.t == 1 && x_array[0] <= lowprimes[lowprimes.length - 1]) {
            for (i = 0; i < lowprimes.length; ++i) {
                if (x_array[0] == lowprimes[i]) {
                    return true;
                }
            }
            return false;
        }
        if (x.isEven()) {
            return false;
        }
        i = 1;
        while (i < lowprimes.length) {
            var m = lowprimes[i], j = i + 1;
            while (j < lowprimes.length && m < lplim) {
                m *= lowprimes[j++];
            }
            m = x.modInt(m);
            while (i < j) {
                if (m % lowprimes[i++] == 0) {
                    return false;
                }
            }
        }
        return x.millerRabin(t);
    }
    function bnpMillerRabin(t) {
        var Σ_bnpMillerRabin = new Σ.Scope(this, Σ, bnpMillerRabin, function () {
            return this.capture({ t: t }, {
                n1: n1,
                k: k,
                r: r,
                a: a
            });
        });
        var n1 = this.subtract(BigInteger.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0) {
            return false;
        }
        var r = n1.shiftRight(k);
        t = t + 1 >> 1;
        if (t > lowprimes.length) {
            t = lowprimes.length;
        }
        var a = nbi();
        for (var i = 0; i < t; ++i) {
            a.fromInt(lowprimes[i]);
            var y = a.modPow(r, this);
            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
                var j = 1;
                while (j++ < k && y.compareTo(n1) != 0) {
                    y = y.modPowInt(2, this);
                    if (y.compareTo(BigInteger.ONE) == 0) {
                        return false;
                    }
                }
                if (y.compareTo(n1) != 0) {
                    return false;
                }
            }
        }
        return true;
    }
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    function Arcfour() {
        this.i = 0;
        this.j = 0;
        this.S = new Array();
    }
    function ARC4init(key) {
        var Σ_ARC4init = new Σ.Scope(this, Σ, ARC4init, function () {
            return this.capture({ key: key }, {
                i: i,
                j: j,
                t: t
            });
        });
        var i, j, t;
        for (i = 0; i < 256; ++i) {
            this.S[i] = i;
        }
        j = 0;
        for (i = 0; i < 256; ++i) {
            j = j + this.S[i] + key[i % key.length] & 255;
            t = this.S[i];
            this.S[i] = this.S[j];
            this.S[j] = t;
        }
        this.i = 0;
        this.j = 0;
    }
    function ARC4next() {
        var Σ_ARC4next = new Σ.Scope(this, Σ, ARC4next, function () {
            return this.capture({}, { t: t });
        });
        var t;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        t = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t;
        return this.S[t + this.S[this.i] & 255];
    }
    Arcfour.prototype.init = ARC4init;
    Arcfour.prototype.next = ARC4next;
    function prng_newstate() {
        return new Arcfour();
    }
    var rng_psize = 256;
    var rng_state;
    var rng_pool;
    var rng_pptr;
    function rng_seed_int(x) {
        var Σ_rng_seed_int = new Σ.Scope(this, Σ, rng_seed_int, function () {
            return this.capture({ x: x }, {});
        });
        rng_pool[rng_pptr++] ^= x & 255;
        rng_pool[rng_pptr++] ^= x >> 8 & 255;
        rng_pool[rng_pptr++] ^= x >> 16 & 255;
        rng_pool[rng_pptr++] ^= x >> 24 & 255;
        if (rng_pptr >= rng_psize) {
            rng_pptr -= rng_psize;
        }
    }
    function rng_seed_time() {
        rng_seed_int(1122926989487);
    }
    if (rng_pool == null) {
        rng_pool = new Array();
        rng_pptr = 0;
        var t;
        while (rng_pptr < rng_psize) {
            t = Math.floor(65536 * Math.random());
            rng_pool[rng_pptr++] = t >>> 8;
            rng_pool[rng_pptr++] = t & 255;
        }
        rng_pptr = 0;
        rng_seed_time();
    }
    function rng_get_byte() {
        if (rng_state == null) {
            rng_seed_time();
            rng_state = prng_newstate();
            rng_state.init(rng_pool);
            for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
                rng_pool[rng_pptr] = 0;
            }
            rng_pptr = 0;
        }
        return rng_state.next();
    }
    function rng_get_bytes(ba) {
        var Σ_rng_get_bytes = new Σ.Scope(this, Σ, rng_get_bytes, function () {
            return this.capture({ ba: ba }, { i: i });
        });
        var i;
        for (i = 0; i < ba.length; ++i) {
            ba[i] = rng_get_byte();
        }
    }
    function SecureRandom() {
    }
    SecureRandom.prototype.nextBytes = rng_get_bytes;
    function parseBigInt(str, r) {
        var Σ_parseBigInt = new Σ.Scope(this, Σ, parseBigInt, function () {
            return this.capture({
                str: str,
                r: r
            }, {});
        });
        return new BigInteger(str, r);
    }
    function linebrk(s, n) {
        var Σ_linebrk = new Σ.Scope(this, Σ, linebrk, function () {
            return this.capture({
                s: s,
                n: n
            }, {
                ret: ret,
                i: i
            });
        });
        var ret = '';
        var i = 0;
        while (i + n < s.length) {
            ret += s.substring(i, i + n) + '\n';
            i += n;
        }
        return ret + s.substring(i, s.length);
    }
    function byte2Hex(b) {
        var Σ_byte2Hex = new Σ.Scope(this, Σ, byte2Hex, function () {
            return this.capture({ b: b }, {});
        });
        if (b < 16) {
            return '0' + b.toString(16);
        } else {
            return b.toString(16);
        }
    }
    function pkcs1pad2(s, n) {
        var Σ_pkcs1pad2 = new Σ.Scope(this, Σ, pkcs1pad2, function () {
            return this.capture({
                s: s,
                n: n
            }, {
                ba: ba,
                i: i,
                rng: rng,
                x: x
            });
        });
        if (n < s.length + 11) {
            alert('Message too long for RSA');
            return null;
        }
        var ba = new Array();
        var i = s.length - 1;
        while (i >= 0 && n > 0) {
            ba[--n] = s.charCodeAt(i--);
        }
        ba[--n] = 0;
        var rng = new SecureRandom();
        var x = new Array();
        while (n > 2) {
            x[0] = 0;
            while (x[0] == 0) {
                rng.nextBytes(x);
            }
            ba[--n] = x[0];
        }
        ba[--n] = 2;
        ba[--n] = 0;
        return new BigInteger(ba);
    }
    function RSAKey() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
    }
    function RSASetPublic(N, E) {
        var Σ_RSASetPublic = new Σ.Scope(this, Σ, RSASetPublic, function () {
            return this.capture({
                N: N,
                E: E
            }, {});
        });
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
        } else {
            alert('Invalid RSA public key');
        }
    }
    function RSADoPublic(x) {
        var Σ_RSADoPublic = new Σ.Scope(this, Σ, RSADoPublic, function () {
            return this.capture({ x: x }, {});
        });
        return x.modPowInt(this.e, this.n);
    }
    function RSAEncrypt(text) {
        var Σ_RSAEncrypt = new Σ.Scope(this, Σ, RSAEncrypt, function () {
            return this.capture({ text: text }, {
                m: m,
                c: c,
                h: h
            });
        });
        var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
        if (m == null) {
            return null;
        }
        var c = this.doPublic(m);
        if (c == null) {
            return null;
        }
        var h = c.toString(16);
        if ((h.length & 1) == 0) {
            return h;
        } else {
            return '0' + h;
        }
    }
    RSAKey.prototype.doPublic = RSADoPublic;
    RSAKey.prototype.setPublic = RSASetPublic;
    RSAKey.prototype.encrypt = RSAEncrypt;
    function pkcs1unpad2(d, n) {
        var Σ_pkcs1unpad2 = new Σ.Scope(this, Σ, pkcs1unpad2, function () {
            return this.capture({
                d: d,
                n: n
            }, {
                b: b,
                i: i,
                ret: ret
            });
        });
        var b = d.toByteArray();
        var i = 0;
        while (i < b.length && b[i] == 0) {
            ++i;
        }
        if (b.length - i != n - 1 || b[i] != 2) {
            return null;
        }
        ++i;
        while (b[i] != 0) {
            if (++i >= b.length) {
                return null;
            }
        }
        var ret = '';
        while (++i < b.length) {
            ret += String.fromCharCode(b[i]);
        }
        return ret;
    }
    function RSASetPrivate(N, E, D) {
        var Σ_RSASetPrivate = new Σ.Scope(this, Σ, RSASetPrivate, function () {
            return this.capture({
                N: N,
                E: E,
                D: D
            }, {});
        });
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
        } else {
            alert('Invalid RSA private key');
        }
    }
    function RSASetPrivateEx(N, E, D, P, Q, DP, DQ, C) {
        var Σ_RSASetPrivateEx = new Σ.Scope(this, Σ, RSASetPrivateEx, function () {
            return this.capture({
                N: N,
                E: E,
                D: D,
                P: P,
                Q: Q,
                DP: DP,
                DQ: DQ,
                C: C
            }, {});
        });
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
            this.p = parseBigInt(P, 16);
            this.q = parseBigInt(Q, 16);
            this.dmp1 = parseBigInt(DP, 16);
            this.dmq1 = parseBigInt(DQ, 16);
            this.coeff = parseBigInt(C, 16);
        } else {
            alert('Invalid RSA private key');
        }
    }
    function RSAGenerate(B, E) {
        var Σ_RSAGenerate = new Σ.Scope(this, Σ, RSAGenerate, function () {
            return this.capture({
                B: B,
                E: E
            }, {
                rng: rng,
                qs: qs,
                ee: ee
            });
        });
        var rng = new SecureRandom();
        var qs = B >> 1;
        this.e = parseInt(E, 16);
        var ee = new BigInteger(E, 16);
        for (;;) {
            for (;;) {
                this.p = new BigInteger(B - qs, 1, rng);
                if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                    break;
                }
            }
            for (;;) {
                this.q = new BigInteger(qs, 1, rng);
                if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                    break;
                }
            }
            if (this.p.compareTo(this.q) <= 0) {
                var t = this.p;
                this.p = this.q;
                this.q = t;
            }
            var p1 = this.p.subtract(BigInteger.ONE);
            var q1 = this.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = ee.modInverse(phi);
                this.dmp1 = this.d.mod(p1);
                this.dmq1 = this.d.mod(q1);
                this.coeff = this.q.modInverse(this.p);
                break;
            }
        }
    }
    function RSADoPrivate(x) {
        var Σ_RSADoPrivate = new Σ.Scope(this, Σ, RSADoPrivate, function () {
            return this.capture({ x: x }, {
                xp: xp,
                xq: xq
            });
        });
        if (this.p == null || this.q == null) {
            return x.modPow(this.d, this.n);
        }
        var xp = x.mod(this.p).modPow(this.dmp1, this.p);
        var xq = x.mod(this.q).modPow(this.dmq1, this.q);
        while (xp.compareTo(xq) < 0) {
            xp = xp.add(this.p);
        }
        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    }
    function RSADecrypt(ctext) {
        var Σ_RSADecrypt = new Σ.Scope(this, Σ, RSADecrypt, function () {
            return this.capture({ ctext: ctext }, {
                c: c,
                m: m
            });
        });
        var c = parseBigInt(ctext, 16);
        var m = this.doPrivate(c);
        if (m == null) {
            return null;
        }
        return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
    }
    RSAKey.prototype.doPrivate = RSADoPrivate;
    RSAKey.prototype.setPrivate = RSASetPrivate;
    RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
    RSAKey.prototype.generate = RSAGenerate;
    RSAKey.prototype.decrypt = RSADecrypt;
    nValue = 'a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3';
    eValue = '10001';
    dValue = '8e9912f6d3645894e8d38cb58c0db81ff516cf4c7e5a14c7f1eddb1459d2cded4d8d293fc97aee6aefb861859c8b6a3d1dfe710463e1f9ddc72048c09751971c4a580aa51eb523357a3cc48d31cfad1d4a165066ed92d4748fb6571211da5cb14bc11b6e2df7c1a559e6d5ac1cd5c94703a22891464fba23d0d965086277a161';
    pValue = 'd090ce58a92c75233a6486cb0a9209bf3583b64f540c76f5294bb97d285eed33aec220bde14b2417951178ac152ceab6da7090905b478195498b352048f15e7d';
    qValue = 'cab575dc652bb66df15a0359609d51d1db184750c00c6698b90ef3465c99655103edbf0d54c56aec0ce3c4d22592338092a126a0cc49f65a4a30d222b411e58f';
    dmp1Value = '1a24bca8e273df2f0e47c199bbf678604e7df7215480c77c8db39f49b000ce2cf7500038acfff5433b7d582a01f1826e6f4d42e1c57f5e1fef7b12aabc59fd25';
    dmq1Value = '3d06982efbbe47339e1f6d36b1216b8a741d410b0c662f54f7118b27b9a4ec9d914337eb39841d8666f3034408cf94f5b62f11c402fc994fe15a05493150d9fd';
    coeffValue = '3a3e731acd8960b7ff9eb81a7ff93bd1cfa74cbd56987db58b4594fb09c09084db1734c8143f98b602b981aaa9243ca28deb69b5b280ee8dcee0fd2625e53250';
    setupEngine(am3, 28);
    var TEXT = 'The quick brown fox jumped over the extremely lazy frog! ' + 'Now is the time for all good men to come to the party.';
    var encrypted;
    function encrypt() {
        var Σ_encrypt = new Σ.Scope(this, Σ, encrypt, function () {
            return this.capture({}, { RSA: RSA });
        });
        var RSA = new RSAKey();
        RSA.setPublic(nValue, eValue);
        RSA.setPrivateEx(nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue);
        encrypted = RSA.encrypt(TEXT);
    }
    function decrypt() {
        var Σ_decrypt = new Σ.Scope(this, Σ, decrypt, function () {
            return this.capture({}, {
                RSA: RSA,
                decrypted: decrypted
            });
        });
        var RSA = new RSAKey();
        RSA.setPublic(nValue, eValue);
        RSA.setPrivateEx(nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue);
        var decrypted = RSA.decrypt(encrypted);
        if (decrypted != TEXT) {
            throw new Error('Crypto operation failed');
        }
    }
}, 'mqtt://localhost', 'crypto.js', {});
