Code.bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return this.capture({}, {
            NavierStokes: NavierStokes,
            solver: solver,
            nsFrameCounter: nsFrameCounter,
            framesTillAddingPoints: framesTillAddingPoints,
            framesBetweenAddingPoints: framesBetweenAddingPoints
        });
    }).hoist(runNavierStokes, Σ).hoist(checkResult, Σ).hoist(setupNavierStokes, Σ).hoist(tearDownNavierStokes, Σ).hoist(addPoints, Σ).hoist(prepareFrame, Σ).hoist(FluidField, Σ);
    var NavierStokes = new BenchmarkSuite('NavierStokes', [1484000], [new Benchmark('NavierStokes', true, false, 180, runNavierStokes, setupNavierStokes, tearDownNavierStokes, null, 16)]);
    var solver = null;
    var nsFrameCounter = 0;
    function runNavierStokes() {
        solver.update();
        nsFrameCounter++;
        if (nsFrameCounter == 15) {
            checkResult(solver.getDens());
        }
    }
    function checkResult(dens) {
        var Σ_checkResult = new Σ.Scope(this, Σ, checkResult, function () {
            return this.capture({ dens: dens }, {});
        });
        this.result = 0;
        for (var i = 7000; i < 7100; i++) {
            this.result += ~~(dens[i] * 10);
        }
        if (this.result != 77) {
            throw new Error('checksum failed');
        }
    }
    function setupNavierStokes() {
        var Σ_setupNavierStokes = new Σ.Scope(this, Σ, setupNavierStokes, function () {
            return this.capture({}, {});
        });
        solver = new FluidField(null);
        solver.setResolution(128, 128);
        solver.setIterations(20);
        solver.setDisplayFunction(Σ_setupNavierStokes.addFunction(function αHmzn() {
        }, Σ_setupNavierStokes));
        solver.setUICallback(prepareFrame);
        solver.reset();
    }
    function tearDownNavierStokes() {
        solver = null;
    }
    function addPoints(field) {
        var Σ_addPoints = new Σ.Scope(this, Σ, addPoints, function () {
            return this.capture({ field: field }, { n: n });
        });
        var n = 64;
        for (var i = 1; i <= n; i++) {
            field.setVelocity(i, i, n, n);
            field.setDensity(i, i, 5);
            field.setVelocity(i, n - i, -n, -n);
            field.setDensity(i, n - i, 20);
            field.setVelocity(128 - i, n + i, -n, -n);
            field.setDensity(128 - i, n + i, 30);
        }
    }
    var framesTillAddingPoints = 0;
    var framesBetweenAddingPoints = 5;
    function prepareFrame(field) {
        var Σ_prepareFrame = new Σ.Scope(this, Σ, prepareFrame, function () {
            return this.capture({ field: field }, {});
        });
        if (framesTillAddingPoints == 0) {
            addPoints(field);
            framesTillAddingPoints = framesBetweenAddingPoints;
            framesBetweenAddingPoints++;
        } else {
            framesTillAddingPoints--;
        }
    }
    function FluidField(canvas) {
        var Σ_FluidField = new Σ.Scope(this, Σ, FluidField, function () {
            return this.capture({ canvas: canvas }, {
                uiCallback: uiCallback,
                iterations: iterations,
                visc: visc,
                dt: dt,
                dens: dens,
                dens_prev: dens_prev,
                u: u,
                u_prev: u_prev,
                v: v,
                v_prev: v_prev,
                width: width,
                height: height,
                rowSize: rowSize,
                size: size,
                displayFunc: displayFunc
            });
        }).hoist(addFields, Σ_FluidField).hoist(set_bnd, Σ_FluidField).hoist(lin_solve, Σ_FluidField).hoist(diffuse, Σ_FluidField).hoist(lin_solve2, Σ_FluidField).hoist(diffuse2, Σ_FluidField).hoist(advect, Σ_FluidField).hoist(project, Σ_FluidField).hoist(dens_step, Σ_FluidField).hoist(vel_step, Σ_FluidField).hoist(Field, Σ_FluidField).hoist(queryUI, Σ_FluidField).hoist(reset, Σ_FluidField);
        function addFields(x, s, dt) {
            var Σ_FluidField_addFields = new Σ.Scope(this, Σ_FluidField, addFields, function () {
                return this.capture({
                    x: x,
                    s: s,
                    dt: dt
                }, {});
            });
            for (var i = 0; i < size; i++) {
                x[i] += dt * s[i];
            }
        }
        function set_bnd(b, x) {
            var Σ_FluidField_set_bnd = new Σ.Scope(this, Σ_FluidField, set_bnd, function () {
                return this.capture({
                    b: b,
                    x: x
                }, { maxEdge: maxEdge });
            });
            if (b === 1) {
                for (var i = 1; i <= width; i++) {
                    x[i] = x[i + rowSize];
                    x[i + (height + 1) * rowSize] = x[i + height * rowSize];
                }
                for (var j = 1; j <= height; j++) {
                    x[j * rowSize] = -x[1 + j * rowSize];
                    x[width + 1 + j * rowSize] = -x[width + j * rowSize];
                }
            } else if (b === 2) {
                for (var i = 1; i <= width; i++) {
                    x[i] = -x[i + rowSize];
                    x[i + (height + 1) * rowSize] = -x[i + height * rowSize];
                }
                for (var j = 1; j <= height; j++) {
                    x[j * rowSize] = x[1 + j * rowSize];
                    x[width + 1 + j * rowSize] = x[width + j * rowSize];
                }
            } else {
                for (var i = 1; i <= width; i++) {
                    x[i] = x[i + rowSize];
                    x[i + (height + 1) * rowSize] = x[i + height * rowSize];
                }
                for (var j = 1; j <= height; j++) {
                    x[j * rowSize] = x[1 + j * rowSize];
                    x[width + 1 + j * rowSize] = x[width + j * rowSize];
                }
            }
            var maxEdge = (height + 1) * rowSize;
            x[0] = 0.5 * (x[1] + x[rowSize]);
            x[maxEdge] = 0.5 * (x[1 + maxEdge] + x[height * rowSize]);
            x[width + 1] = 0.5 * (x[width] + x[width + 1 + rowSize]);
            x[width + 1 + maxEdge] = 0.5 * (x[width + maxEdge] + x[width + 1 + height * rowSize]);
        }
        function lin_solve(b, x, x0, a, c) {
            var Σ_FluidField_lin_solve = new Σ.Scope(this, Σ_FluidField, lin_solve, function () {
                return this.capture({
                    b: b,
                    x: x,
                    x0: x0,
                    a: a,
                    c: c
                }, {});
            });
            if (a === 0 && c === 1) {
                for (var j = 1; j <= height; j++) {
                    var currentRow = j * rowSize;
                    ++currentRow;
                    for (var i = 0; i < width; i++) {
                        x[currentRow] = x0[currentRow];
                        ++currentRow;
                    }
                }
                set_bnd(b, x);
            } else {
                var invC = 1 / c;
                for (var k = 0; k < iterations; k++) {
                    for (var j = 1; j <= height; j++) {
                        var lastRow = (j - 1) * rowSize;
                        var currentRow = j * rowSize;
                        var nextRow = (j + 1) * rowSize;
                        var lastX = x[currentRow];
                        ++currentRow;
                        for (var i = 1; i <= width; i++) {
                            lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[++currentRow] + x[++lastRow] + x[++nextRow])) * invC;
                        }
                    }
                    set_bnd(b, x);
                }
            }
        }
        function diffuse(b, x, x0, dt) {
            var Σ_FluidField_diffuse = new Σ.Scope(this, Σ_FluidField, diffuse, function () {
                return this.capture({
                    b: b,
                    x: x,
                    x0: x0,
                    dt: dt
                }, { a: a });
            });
            var a = 0;
            lin_solve(b, x, x0, a, 1 + 4 * a);
        }
        function lin_solve2(x, x0, y, y0, a, c) {
            var Σ_FluidField_lin_solve2 = new Σ.Scope(this, Σ_FluidField, lin_solve2, function () {
                return this.capture({
                    x: x,
                    x0: x0,
                    y: y,
                    y0: y0,
                    a: a,
                    c: c
                }, {});
            });
            if (a === 0 && c === 1) {
                for (var j = 1; j <= height; j++) {
                    var currentRow = j * rowSize;
                    ++currentRow;
                    for (var i = 0; i < width; i++) {
                        x[currentRow] = x0[currentRow];
                        y[currentRow] = y0[currentRow];
                        ++currentRow;
                    }
                }
                set_bnd(1, x);
                set_bnd(2, y);
            } else {
                var invC = 1 / c;
                for (var k = 0; k < iterations; k++) {
                    for (var j = 1; j <= height; j++) {
                        var lastRow = (j - 1) * rowSize;
                        var currentRow = j * rowSize;
                        var nextRow = (j + 1) * rowSize;
                        var lastX = x[currentRow];
                        var lastY = y[currentRow];
                        ++currentRow;
                        for (var i = 1; i <= width; i++) {
                            lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[currentRow] + x[lastRow] + x[nextRow])) * invC;
                            lastY = y[currentRow] = (y0[currentRow] + a * (lastY + y[++currentRow] + y[++lastRow] + y[++nextRow])) * invC;
                        }
                    }
                    set_bnd(1, x);
                    set_bnd(2, y);
                }
            }
        }
        function diffuse2(x, x0, y, y0, dt) {
            var Σ_FluidField_diffuse2 = new Σ.Scope(this, Σ_FluidField, diffuse2, function () {
                return this.capture({
                    x: x,
                    x0: x0,
                    y: y,
                    y0: y0,
                    dt: dt
                }, { a: a });
            });
            var a = 0;
            lin_solve2(x, x0, y, y0, a, 1 + 4 * a);
        }
        function advect(b, d, d0, u, v, dt) {
            var Σ_FluidField_advect = new Σ.Scope(this, Σ_FluidField, advect, function () {
                return this.capture({
                    b: b,
                    d: d,
                    d0: d0,
                    u: u,
                    v: v,
                    dt: dt
                }, {
                    Wdt0: Wdt0,
                    Hdt0: Hdt0,
                    Wp5: Wp5,
                    Hp5: Hp5
                });
            });
            var Wdt0 = dt * width;
            var Hdt0 = dt * height;
            var Wp5 = width + 0.5;
            var Hp5 = height + 0.5;
            for (var j = 1; j <= height; j++) {
                var pos = j * rowSize;
                for (var i = 1; i <= width; i++) {
                    var x = i - Wdt0 * u[++pos];
                    var y = j - Hdt0 * v[pos];
                    if (x < 0.5) {
                        x = 0.5;
                    } else if (x > Wp5) {
                        x = Wp5;
                    }
                    var i0 = x | 0;
                    var i1 = i0 + 1;
                    if (y < 0.5) {
                        y = 0.5;
                    } else if (y > Hp5) {
                        y = Hp5;
                    }
                    var j0 = y | 0;
                    var j1 = j0 + 1;
                    var s1 = x - i0;
                    var s0 = 1 - s1;
                    var t1 = y - j0;
                    var t0 = 1 - t1;
                    var row1 = j0 * rowSize;
                    var row2 = j1 * rowSize;
                    d[pos] = s0 * (t0 * d0[i0 + row1] + t1 * d0[i0 + row2]) + s1 * (t0 * d0[i1 + row1] + t1 * d0[i1 + row2]);
                }
            }
            set_bnd(b, d);
        }
        function project(u, v, p, div) {
            var Σ_FluidField_project = new Σ.Scope(this, Σ_FluidField, project, function () {
                return this.capture({
                    u: u,
                    v: v,
                    p: p,
                    div: div
                }, {
                    h: h,
                    wScale: wScale,
                    hScale: hScale
                });
            });
            var h = -0.5 / Math.sqrt(width * height);
            for (var j = 1; j <= height; j++) {
                var row = j * rowSize;
                var previousRow = (j - 1) * rowSize;
                var prevValue = row - 1;
                var currentRow = row;
                var nextValue = row + 1;
                var nextRow = (j + 1) * rowSize;
                for (var i = 1; i <= width; i++) {
                    div[++currentRow] = h * (u[++nextValue] - u[++prevValue] + v[++nextRow] - v[++previousRow]);
                    p[currentRow] = 0;
                }
            }
            set_bnd(0, div);
            set_bnd(0, p);
            lin_solve(0, p, div, 1, 4);
            var wScale = 0.5 * width;
            var hScale = 0.5 * height;
            for (var j = 1; j <= height; j++) {
                var prevPos = j * rowSize - 1;
                var currentPos = j * rowSize;
                var nextPos = j * rowSize + 1;
                var prevRow = (j - 1) * rowSize;
                var currentRow = j * rowSize;
                var nextRow = (j + 1) * rowSize;
                for (var i = 1; i <= width; i++) {
                    u[++currentPos] -= wScale * (p[++nextPos] - p[++prevPos]);
                    v[currentPos] -= hScale * (p[++nextRow] - p[++prevRow]);
                }
            }
            set_bnd(1, u);
            set_bnd(2, v);
        }
        function dens_step(x, x0, u, v, dt) {
            var Σ_FluidField_dens_step = new Σ.Scope(this, Σ_FluidField, dens_step, function () {
                return this.capture({
                    x: x,
                    x0: x0,
                    u: u,
                    v: v,
                    dt: dt
                }, {});
            });
            addFields(x, x0, dt);
            diffuse(0, x0, x, dt);
            advect(0, x, x0, u, v, dt);
        }
        function vel_step(u, v, u0, v0, dt) {
            var Σ_FluidField_vel_step = new Σ.Scope(this, Σ_FluidField, vel_step, function () {
                return this.capture({
                    u: u,
                    v: v,
                    u0: u0,
                    v0: v0,
                    dt: dt
                }, { temp: temp });
            });
            addFields(u, u0, dt);
            addFields(v, v0, dt);
            var temp = u0;
            u0 = u;
            u = temp;
            var temp = v0;
            v0 = v;
            v = temp;
            diffuse2(u, u0, v, v0, dt);
            project(u, v, u0, v0);
            var temp = u0;
            u0 = u;
            u = temp;
            var temp = v0;
            v0 = v;
            v = temp;
            advect(1, u, u0, u0, v0, dt);
            advect(2, v, v0, u0, v0, dt);
            project(u, v, u0, v0);
        }
        var uiCallback = Σ_FluidField.addFunction(function αFiAF(d, u, v) {
            var Σ_FluidField_αFiAF = new Σ.Scope(this, Σ_FluidField, αFiAF, function () {
                return this.capture({
                    d: d,
                    u: u,
                    v: v
                }, {});
            });
        }, Σ_FluidField);
        function Field(dens, u, v) {
            var Σ_FluidField_Field = new Σ.Scope(this, Σ_FluidField, Field, function () {
                return this.capture({
                    dens: dens,
                    u: u,
                    v: v
                }, {});
            });
            this.setDensity = Σ_FluidField_Field.addFunction(function αtdpr(x, y, d) {
                var Σ_FluidField_Field_αtdpr = new Σ.Scope(this, Σ_FluidField_Field, αtdpr, function () {
                    return this.capture({
                        x: x,
                        y: y,
                        d: d
                    }, {});
                });
                dens[x + 1 + (y + 1) * rowSize] = d;
            }, Σ_FluidField_Field);
            this.getDensity = Σ_FluidField_Field.addFunction(function αldbL(x, y) {
                var Σ_FluidField_Field_αldbL = new Σ.Scope(this, Σ_FluidField_Field, αldbL, function () {
                    return this.capture({
                        x: x,
                        y: y
                    }, {});
                });
                return dens[x + 1 + (y + 1) * rowSize];
            }, Σ_FluidField_Field);
            this.setVelocity = Σ_FluidField_Field.addFunction(function α9DGX(x, y, xv, yv) {
                var Σ_FluidField_Field_α9DGX = new Σ.Scope(this, Σ_FluidField_Field, α9DGX, function () {
                    return this.capture({
                        x: x,
                        y: y,
                        xv: xv,
                        yv: yv
                    }, {});
                });
                u[x + 1 + (y + 1) * rowSize] = xv;
                v[x + 1 + (y + 1) * rowSize] = yv;
            }, Σ_FluidField_Field);
            this.getXVelocity = Σ_FluidField_Field.addFunction(function αORyg(x, y) {
                var Σ_FluidField_Field_αORyg = new Σ.Scope(this, Σ_FluidField_Field, αORyg, function () {
                    return this.capture({
                        x: x,
                        y: y
                    }, {});
                });
                return u[x + 1 + (y + 1) * rowSize];
            }, Σ_FluidField_Field);
            this.getYVelocity = Σ_FluidField_Field.addFunction(function αni3w(x, y) {
                var Σ_FluidField_Field_αni3w = new Σ.Scope(this, Σ_FluidField_Field, αni3w, function () {
                    return this.capture({
                        x: x,
                        y: y
                    }, {});
                });
                return v[x + 1 + (y + 1) * rowSize];
            }, Σ_FluidField_Field);
            this.width = Σ_FluidField_Field.addFunction(function αGBV2() {
                return width;
            }, Σ_FluidField_Field);
            this.height = Σ_FluidField_Field.addFunction(function αNPxA() {
                return height;
            }, Σ_FluidField_Field);
        }
        function queryUI(d, u, v) {
            var Σ_FluidField_queryUI = new Σ.Scope(this, Σ_FluidField, queryUI, function () {
                return this.capture({
                    d: d,
                    u: u,
                    v: v
                }, {});
            });
            for (var i = 0; i < size; i++) {
                u[i] = v[i] = d[i] = 0;
            }
            uiCallback(new Field(d, u, v));
        }
        this.update = Σ_FluidField.addFunction(function αIqCH() {
            queryUI(dens_prev, u_prev, v_prev);
            vel_step(u, v, u_prev, v_prev, dt);
            dens_step(dens, dens_prev, u, v, dt);
            displayFunc(new Field(dens, u, v));
        }, Σ_FluidField);
        this.setDisplayFunction = Σ_FluidField.addFunction(function αz8j8(func) {
            var Σ_FluidField_αz8j8 = new Σ.Scope(this, Σ_FluidField, αz8j8, function () {
                return this.capture({ func: func }, {});
            });
            displayFunc = func;
        }, Σ_FluidField);
        this.iterations = Σ_FluidField.addFunction(function α3S1L() {
            return iterations;
        }, Σ_FluidField);
        this.setIterations = Σ_FluidField.addFunction(function αpO4p(iters) {
            var Σ_FluidField_αpO4p = new Σ.Scope(this, Σ_FluidField, αpO4p, function () {
                return this.capture({ iters: iters }, {});
            });
            if (iters > 0 && iters <= 100) {
                iterations = iters;
            }
        }, Σ_FluidField);
        this.setUICallback = Σ_FluidField.addFunction(function α2qs0(callback) {
            var Σ_FluidField_α2qs0 = new Σ.Scope(this, Σ_FluidField, α2qs0, function () {
                return this.capture({ callback: callback }, {});
            });
            uiCallback = callback;
        }, Σ_FluidField);
        var iterations = 10;
        var visc = 0.5;
        var dt = 0.1;
        var dens;
        var dens_prev;
        var u;
        var u_prev;
        var v;
        var v_prev;
        var width;
        var height;
        var rowSize;
        var size;
        var displayFunc;
        function reset() {
            var Σ_FluidField_reset = new Σ.Scope(this, Σ_FluidField, reset, function () {
                return this.capture({}, {});
            });
            rowSize = width + 2;
            size = (width + 2) * (height + 2);
            dens = new Array(size);
            dens_prev = new Array(size);
            u = new Array(size);
            u_prev = new Array(size);
            v = new Array(size);
            v_prev = new Array(size);
            for (var i = 0; i < size; i++) {
                dens_prev[i] = u_prev[i] = v_prev[i] = dens[i] = u[i] = v[i] = 0;
            }
        }
        this.reset = reset;
        this.getDens = Σ_FluidField.addFunction(function αtixm() {
            return dens;
        }, Σ_FluidField);
        this.setResolution = Σ_FluidField.addFunction(function αK24w(hRes, wRes) {
            var Σ_FluidField_αK24w = new Σ.Scope(this, Σ_FluidField, αK24w, function () {
                return this.capture({
                    hRes: hRes,
                    wRes: wRes
                }, { res: res });
            });
            var res = wRes * hRes;
            if (res > 0 && res < 1000000 && (wRes != width || hRes != height)) {
                width = wRes;
                height = hRes;
                reset();
                return true;
            }
            return false;
        }, Σ_FluidField);
        this.setResolution(64, 64);
    }
}, 'mqtt://localhost', 'navier-stokes.js', {});
