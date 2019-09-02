var NavierStokes = new BenchmarkSuite('NavierStokes', [1484000], [new Benchmark('NavierStokes', true, false, 180, runNavierStokes, setupNavierStokes, tearDownNavierStokes, null, 16)]);
var solver = null;
var nsFrameCounter = 0;
function runNavierStokes() {
    solver.update();
    nsFrameCounter++;
    if (nsFrameCounter == 15)
        checkResult(solver.getDens());
}
function checkResult(dens) {
    this.result = 0;
    for (var i = 7000; i < 7100; i++) {
        this.result += ~~(dens[i] * 10);
    }
    if (this.result != 77) {
        throw new Error('checksum failed');
    }
}
function setupNavierStokes() {
    solver = new FluidField(null);
    solver.setResolution(128, 128);
    solver.setIterations(20);
    solver.setDisplayFunction(function () {
    });
    solver.setUICallback(prepareFrame);
    solver.reset();
}
function tearDownNavierStokes() {
    solver = null;
}
function addPoints(field) {
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
    if (framesTillAddingPoints == 0) {
        addPoints(field);
        framesTillAddingPoints = framesBetweenAddingPoints;
        framesBetweenAddingPoints++;
    } else {
        framesTillAddingPoints--;
    }
}
function FluidField(canvas) {
    var $disclosure15 = $disclosure.create(arguments);
    this.$disclosure_index = [
        15,
        $disclosure15.$ref_index
    ];
    $disclosure15.$scopes.$disclosure15 = $disclosure15.$ref_index;
    $disclosure15.canvas = canvas;
    $disclosure15.addFields = function addFields(x, s, dt) {
        for (var i = 0; i < $disclosure15.size; i++)
            x[i] += dt * s[i];
    };
    $disclosure15.set_bnd = function set_bnd(b, x) {
        if (b === 1) {
            for (var i = 1; i <= $disclosure15.width; i++) {
                x[i] = x[i + $disclosure15.rowSize];
                x[i + ($disclosure15.height + 1) * $disclosure15.rowSize] = x[i + $disclosure15.height * $disclosure15.rowSize];
            }
            for (var j = 1; j <= $disclosure15.height; j++) {
                x[j * $disclosure15.rowSize] = -x[1 + j * $disclosure15.rowSize];
                x[$disclosure15.width + 1 + j * $disclosure15.rowSize] = -x[$disclosure15.width + j * $disclosure15.rowSize];
            }
        } else if (b === 2) {
            for (var i = 1; i <= $disclosure15.width; i++) {
                x[i] = -x[i + $disclosure15.rowSize];
                x[i + ($disclosure15.height + 1) * $disclosure15.rowSize] = -x[i + $disclosure15.height * $disclosure15.rowSize];
            }
            for (var j = 1; j <= $disclosure15.height; j++) {
                x[j * $disclosure15.rowSize] = x[1 + j * $disclosure15.rowSize];
                x[$disclosure15.width + 1 + j * $disclosure15.rowSize] = x[$disclosure15.width + j * $disclosure15.rowSize];
            }
        } else {
            for (var i = 1; i <= $disclosure15.width; i++) {
                x[i] = x[i + $disclosure15.rowSize];
                x[i + ($disclosure15.height + 1) * $disclosure15.rowSize] = x[i + $disclosure15.height * $disclosure15.rowSize];
            }
            for (var j = 1; j <= $disclosure15.height; j++) {
                x[j * $disclosure15.rowSize] = x[1 + j * $disclosure15.rowSize];
                x[$disclosure15.width + 1 + j * $disclosure15.rowSize] = x[$disclosure15.width + j * $disclosure15.rowSize];
            }
        }
        var maxEdge = ($disclosure15.height + 1) * $disclosure15.rowSize;
        x[0] = 0.5 * (x[1] + x[$disclosure15.rowSize]);
        x[maxEdge] = 0.5 * (x[1 + maxEdge] + x[$disclosure15.height * $disclosure15.rowSize]);
        x[$disclosure15.width + 1] = 0.5 * (x[$disclosure15.width] + x[$disclosure15.width + 1 + $disclosure15.rowSize]);
        x[$disclosure15.width + 1 + maxEdge] = 0.5 * (x[$disclosure15.width + maxEdge] + x[$disclosure15.width + 1 + $disclosure15.height * $disclosure15.rowSize]);
    };
    $disclosure15.lin_solve = function lin_solve(b, x, x0, a, c) {
        if (a === 0 && c === 1) {
            for (var j = 1; j <= $disclosure15.height; j++) {
                var currentRow = j * $disclosure15.rowSize;
                ++currentRow;
                for (var i = 0; i < $disclosure15.width; i++) {
                    x[currentRow] = x0[currentRow];
                    ++currentRow;
                }
            }
            $disclosure15.set_bnd(b, x);
        } else {
            var invC = 1 / c;
            for (var k = 0; k < $disclosure15.iterations; k++) {
                for (var j = 1; j <= $disclosure15.height; j++) {
                    var lastRow = (j - 1) * $disclosure15.rowSize;
                    var currentRow = j * $disclosure15.rowSize;
                    var nextRow = (j + 1) * $disclosure15.rowSize;
                    var lastX = x[currentRow];
                    ++currentRow;
                    for (var i = 1; i <= $disclosure15.width; i++)
                        lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[++currentRow] + x[++lastRow] + x[++nextRow])) * invC;
                }
                $disclosure15.set_bnd(b, x);
            }
        }
    };
    $disclosure15.diffuse = function diffuse(b, x, x0, dt) {
        var a = 0;
        $disclosure15.lin_solve(b, x, x0, a, 1 + 4 * a);
    };
    $disclosure15.lin_solve2 = function lin_solve2(x, x0, y, y0, a, c) {
        if (a === 0 && c === 1) {
            for (var j = 1; j <= $disclosure15.height; j++) {
                var currentRow = j * $disclosure15.rowSize;
                ++currentRow;
                for (var i = 0; i < $disclosure15.width; i++) {
                    x[currentRow] = x0[currentRow];
                    y[currentRow] = y0[currentRow];
                    ++currentRow;
                }
            }
            $disclosure15.set_bnd(1, x);
            $disclosure15.set_bnd(2, y);
        } else {
            var invC = 1 / c;
            for (var k = 0; k < $disclosure15.iterations; k++) {
                for (var j = 1; j <= $disclosure15.height; j++) {
                    var lastRow = (j - 1) * $disclosure15.rowSize;
                    var currentRow = j * $disclosure15.rowSize;
                    var nextRow = (j + 1) * $disclosure15.rowSize;
                    var lastX = x[currentRow];
                    var lastY = y[currentRow];
                    ++currentRow;
                    for (var i = 1; i <= $disclosure15.width; i++) {
                        lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[currentRow] + x[lastRow] + x[nextRow])) * invC;
                        lastY = y[currentRow] = (y0[currentRow] + a * (lastY + y[++currentRow] + y[++lastRow] + y[++nextRow])) * invC;
                    }
                }
                $disclosure15.set_bnd(1, x);
                $disclosure15.set_bnd(2, y);
            }
        }
    };
    $disclosure15.diffuse2 = function diffuse2(x, x0, y, y0, dt) {
        var a = 0;
        $disclosure15.lin_solve2(x, x0, y, y0, a, 1 + 4 * a);
    };
    $disclosure15.advect = function advect(b, d, d0, u, v, dt) {
        var Wdt0 = dt * $disclosure15.width;
        var Hdt0 = dt * $disclosure15.height;
        var Wp5 = $disclosure15.width + 0.5;
        var Hp5 = $disclosure15.height + 0.5;
        for (var j = 1; j <= $disclosure15.height; j++) {
            var pos = j * $disclosure15.rowSize;
            for (var i = 1; i <= $disclosure15.width; i++) {
                var x = i - Wdt0 * u[++pos];
                var y = j - Hdt0 * v[pos];
                if (x < 0.5)
                    x = 0.5;
                else if (x > Wp5)
                    x = Wp5;
                var i0 = x | 0;
                var i1 = i0 + 1;
                if (y < 0.5)
                    y = 0.5;
                else if (y > Hp5)
                    y = Hp5;
                var j0 = y | 0;
                var j1 = j0 + 1;
                var s1 = x - i0;
                var s0 = 1 - s1;
                var t1 = y - j0;
                var t0 = 1 - t1;
                var row1 = j0 * $disclosure15.rowSize;
                var row2 = j1 * $disclosure15.rowSize;
                d[pos] = s0 * (t0 * d0[i0 + row1] + t1 * d0[i0 + row2]) + s1 * (t0 * d0[i1 + row1] + t1 * d0[i1 + row2]);
            }
        }
        $disclosure15.set_bnd(b, d);
    };
    $disclosure15.project = function project(u, v, p, div) {
        var h = -0.5 / Math.sqrt($disclosure15.width * $disclosure15.height);
        for (var j = 1; j <= $disclosure15.height; j++) {
            var row = j * $disclosure15.rowSize;
            var previousRow = (j - 1) * $disclosure15.rowSize;
            var prevValue = row - 1;
            var currentRow = row;
            var nextValue = row + 1;
            var nextRow = (j + 1) * $disclosure15.rowSize;
            for (var i = 1; i <= $disclosure15.width; i++) {
                div[++currentRow] = h * (u[++nextValue] - u[++prevValue] + v[++nextRow] - v[++previousRow]);
                p[currentRow] = 0;
            }
        }
        $disclosure15.set_bnd(0, div);
        $disclosure15.set_bnd(0, p);
        $disclosure15.lin_solve(0, p, div, 1, 4);
        var wScale = 0.5 * $disclosure15.width;
        var hScale = 0.5 * $disclosure15.height;
        for (var j = 1; j <= $disclosure15.height; j++) {
            var prevPos = j * $disclosure15.rowSize - 1;
            var currentPos = j * $disclosure15.rowSize;
            var nextPos = j * $disclosure15.rowSize + 1;
            var prevRow = (j - 1) * $disclosure15.rowSize;
            var currentRow = j * $disclosure15.rowSize;
            var nextRow = (j + 1) * $disclosure15.rowSize;
            for (var i = 1; i <= $disclosure15.width; i++) {
                u[++currentPos] -= wScale * (p[++nextPos] - p[++prevPos]);
                v[currentPos] -= hScale * (p[++nextRow] - p[++prevRow]);
            }
        }
        $disclosure15.set_bnd(1, u);
        $disclosure15.set_bnd(2, v);
    };
    $disclosure15.dens_step = function dens_step(x, x0, u, v, dt) {
        $disclosure15.addFields(x, x0, dt);
        $disclosure15.diffuse(0, x0, x, dt);
        $disclosure15.advect(0, x, x0, u, v, dt);
    };
    $disclosure15.vel_step = function vel_step(u, v, u0, v0, dt) {
        $disclosure15.addFields(u, u0, dt);
        $disclosure15.addFields(v, v0, dt);
        var temp = u0;
        u0 = u;
        u = temp;
        var temp = v0;
        v0 = v;
        v = temp;
        $disclosure15.diffuse2(u, u0, v, v0, dt);
        $disclosure15.project(u, v, u0, v0);
        var temp = u0;
        u0 = u;
        u = temp;
        var temp = v0;
        v0 = v;
        v = temp;
        $disclosure15.advect(1, u, u0, u0, v0, dt);
        $disclosure15.advect(2, v, v0, u0, v0, dt);
        $disclosure15.project(u, v, u0, v0);
    };
    $disclosure15.uiCallback = function (d, u, v) {
    };
    $disclosure15.Field = function Field(dens, u, v) {
        var $disclosure39 = $disclosure.create(arguments);
        this.$disclosure_index = [
            39,
            $disclosure39.$ref_index
        ];
        $disclosure39.$scopes.$disclosure39 = $disclosure39.$ref_index;
        $disclosure39.$scopes.$disclosure15 = $disclosure15.$ref_index;
        $disclosure39.dens = dens;
        $disclosure39.u = u;
        $disclosure39.v = v;
        this.setDensity = function (x, y, d) {
            $disclosure39.dens[x + 1 + (y + 1) * $disclosure15.rowSize] = d;
        };
        this.getDensity = function (x, y) {
            return $disclosure39.dens[x + 1 + (y + 1) * $disclosure15.rowSize];
        };
        this.setVelocity = function (x, y, xv, yv) {
            $disclosure39.u[x + 1 + (y + 1) * $disclosure15.rowSize] = xv;
            $disclosure39.v[x + 1 + (y + 1) * $disclosure15.rowSize] = yv;
        };
        this.getXVelocity = function (x, y) {
            return $disclosure39.u[x + 1 + (y + 1) * $disclosure15.rowSize];
        };
        this.getYVelocity = function (x, y) {
            return $disclosure39.v[x + 1 + (y + 1) * $disclosure15.rowSize];
        };
        this.width = function () {
            return $disclosure15.width;
        };
        this.height = function () {
            return $disclosure15.height;
        };
    };
    $disclosure15.queryUI = function queryUI(d, u, v) {
        for (var i = 0; i < $disclosure15.size; i++)
            u[i] = v[i] = d[i] = 0;
        $disclosure15.uiCallback(new $disclosure15.Field(d, u, v));
    };
    this.update = function () {
        $disclosure15.queryUI($disclosure15.dens_prev, $disclosure15.u_prev, $disclosure15.v_prev);
        $disclosure15.vel_step($disclosure15.u, $disclosure15.v, $disclosure15.u_prev, $disclosure15.v_prev, $disclosure15.dt);
        $disclosure15.dens_step($disclosure15.dens, $disclosure15.dens_prev, $disclosure15.u, $disclosure15.v, $disclosure15.dt);
        $disclosure15.displayFunc(new $disclosure15.Field($disclosure15.dens, $disclosure15.u, $disclosure15.v));
    };
    this.setDisplayFunction = function (func) {
        $disclosure15.displayFunc = func;
    };
    this.iterations = function () {
        return $disclosure15.iterations;
    };
    this.setIterations = function (iters) {
        if (iters > 0 && iters <= 100)
            $disclosure15.iterations = iters;
    };
    this.setUICallback = function (callback) {
        $disclosure15.uiCallback = callback;
    };
    $disclosure15.iterations = 10;
    $disclosure15.visc = 0.5;
    $disclosure15.dt = 0.1;
    $disclosure15.dens = undefined;
    $disclosure15.dens_prev = undefined;
    $disclosure15.u = undefined;
    $disclosure15.u_prev = undefined;
    $disclosure15.v = undefined;
    $disclosure15.v_prev = undefined;
    $disclosure15.width = undefined;
    $disclosure15.height = undefined;
    $disclosure15.rowSize = undefined;
    $disclosure15.size = undefined;
    $disclosure15.displayFunc = undefined;
    $disclosure15.reset = function reset() {
        $disclosure15.rowSize = $disclosure15.width + 2;
        $disclosure15.size = ($disclosure15.width + 2) * ($disclosure15.height + 2);
        $disclosure15.dens = new Array($disclosure15.size);
        $disclosure15.dens_prev = new Array($disclosure15.size);
        $disclosure15.u = new Array($disclosure15.size);
        $disclosure15.u_prev = new Array($disclosure15.size);
        $disclosure15.v = new Array($disclosure15.size);
        $disclosure15.v_prev = new Array($disclosure15.size);
        for (var i = 0; i < $disclosure15.size; i++)
            $disclosure15.dens_prev[i] = $disclosure15.u_prev[i] = $disclosure15.v_prev[i] = $disclosure15.dens[i] = $disclosure15.u[i] = $disclosure15.v[i] = 0;
    };
    this.reset = $disclosure15.reset;
    this.getDens = function () {
        return $disclosure15.dens;
    };
    this.setResolution = function (hRes, wRes) {
        var res = wRes * hRes;
        if (res > 0 && res < 1000000 && (wRes != $disclosure15.width || hRes != $disclosure15.height)) {
            $disclosure15.width = wRes;
            $disclosure15.height = hRes;
            $disclosure15.reset();
            return true;
        }
        return false;
    };
    this.setResolution(64, 64);
}