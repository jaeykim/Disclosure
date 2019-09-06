Code.bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return this.capture({}, {
            Splay: Splay,
            kSplayTreeSize: kSplayTreeSize,
            kSplayTreeModifications: kSplayTreeModifications,
            kSplayTreePayloadDepth: kSplayTreePayloadDepth,
            splayTree: splayTree,
            splaySampleTimeStart: splaySampleTimeStart,
            splaySamples: splaySamples,
            splaySumOfSquaredPauses: splaySumOfSquaredPauses
        });
    }).hoist(GeneratePayloadTree, Σ).hoist(GenerateKey, Σ).hoist(SplayRMS, Σ).hoist(SplayUpdateStats, Σ).hoist(InsertNewNode, Σ).hoist(SplaySetup, Σ).hoist(SplayTearDown, Σ).hoist(SplayRun, Σ).hoist(SplayTree, Σ);
    var Splay = new BenchmarkSuite('Splay', [
        81491,
        2739514
    ], [new Benchmark('Splay', true, false, 1400, SplayRun, SplaySetup, SplayTearDown, SplayRMS)]);
    var kSplayTreeSize = 8000;
    var kSplayTreeModifications = 80;
    var kSplayTreePayloadDepth = 5;
    var splayTree = null;
    var splaySampleTimeStart = 0;
    function GeneratePayloadTree(depth, tag) {
        var Σ_GeneratePayloadTree = new Σ.Scope(this, Σ, GeneratePayloadTree, function () {
            return this.capture({
                depth: depth,
                tag: tag
            }, {});
        });
        if (depth == 0) {
            return {
                array: [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9
                ],
                string: 'String for key ' + tag + ' in leaf node'
            };
        } else {
            return {
                left: GeneratePayloadTree(depth - 1, tag),
                right: GeneratePayloadTree(depth - 1, tag)
            };
        }
    }
    function GenerateKey() {
        return Math.random();
    }
    var splaySamples = 0;
    var splaySumOfSquaredPauses = 0;
    function SplayRMS() {
        return Math.round(Math.sqrt(splaySumOfSquaredPauses / splaySamples) * 10000);
    }
    function SplayUpdateStats(time) {
        var Σ_SplayUpdateStats = new Σ.Scope(this, Σ, SplayUpdateStats, function () {
            return this.capture({ time: time }, { pause: pause });
        });
        var pause = time - splaySampleTimeStart;
        splaySampleTimeStart = time;
        splaySamples++;
        splaySumOfSquaredPauses += pause * pause;
    }
    function InsertNewNode() {
        var Σ_InsertNewNode = new Σ.Scope(this, Σ, InsertNewNode, function () {
            return this.capture({}, {
                key: key,
                payload: payload
            });
        });
        var key;
        do {
            key = GenerateKey();
        } while (splayTree.find(key) != null);
        var payload = GeneratePayloadTree(kSplayTreePayloadDepth, String(key));
        splayTree.insert(key, payload);
        return key;
    }
    function SplaySetup() {
        var Σ_SplaySetup = new Σ.Scope(this, Σ, SplaySetup, function () {
            return this.capture({}, {});
        });
        if (!performance.now) {
            throw 'PerformanceNowUnsupported';
        }
        splayTree = new SplayTree();
        splaySampleTimeStart = performance.now();
        for (var i = 0; i < kSplayTreeSize; i++) {
            InsertNewNode();
            if ((i + 1) % 20 == 19) {
                SplayUpdateStats(performance.now());
            }
        }
    }
    function SplayTearDown() {
        var Σ_SplayTearDown = new Σ.Scope(this, Σ, SplayTearDown, function () {
            return this.capture({}, {
                keys: keys,
                length: length
            });
        });
        var keys = splayTree.exportKeys();
        splayTree = null;
        splaySamples = 0;
        splaySumOfSquaredPauses = 0;
        var length = keys.length;
        if (length != kSplayTreeSize) {
            throw new Error('Splay tree has wrong size');
        }
        for (var i = 0; i < length - 1; i++) {
            if (keys[i] >= keys[i + 1]) {
                throw new Error('Splay tree not sorted');
            }
        }
    }
    function SplayRun() {
        var Σ_SplayRun = new Σ.Scope(this, Σ, SplayRun, function () {
            return this.capture({}, {});
        });
        for (var i = 0; i < kSplayTreeModifications; i++) {
            var key = InsertNewNode();
            var greatest = splayTree.findGreatestLessThan(key);
            if (greatest == null) {
                splayTree.remove(key);
            } else {
                splayTree.remove(greatest.key);
            }
        }
        SplayUpdateStats(performance.now());
    }
    function SplayTree() {
    }
    ;
    SplayTree.prototype.root_ = null;
    SplayTree.prototype.isEmpty = Σ.addFunction(function αEMxx() {
        return !this.root_;
    }, Σ);
    SplayTree.prototype.insert = Σ.addFunction(function αqNs5(key, value) {
        var Σ_αqNs5 = new Σ.Scope(this, Σ, αqNs5, function () {
            return this.capture({
                key: key,
                value: value
            }, { node: node });
        });
        if (this.isEmpty()) {
            this.root_ = new SplayTree.Node(key, value);
            return;
        }
        this.splay_(key);
        if (this.root_.key == key) {
            return;
        }
        var node = new SplayTree.Node(key, value);
        if (key > this.root_.key) {
            node.left = this.root_;
            node.right = this.root_.right;
            this.root_.right = null;
        } else {
            node.right = this.root_;
            node.left = this.root_.left;
            this.root_.left = null;
        }
        this.root_ = node;
    }, Σ);
    SplayTree.prototype.remove = Σ.addFunction(function αvNlK(key) {
        var Σ_αvNlK = new Σ.Scope(this, Σ, αvNlK, function () {
            return this.capture({ key: key }, { removed: removed });
        });
        if (this.isEmpty()) {
            throw Error('Key not found: ' + key);
        }
        this.splay_(key);
        if (this.root_.key != key) {
            throw Error('Key not found: ' + key);
        }
        var removed = this.root_;
        if (!this.root_.left) {
            this.root_ = this.root_.right;
        } else {
            var right = this.root_.right;
            this.root_ = this.root_.left;
            this.splay_(key);
            this.root_.right = right;
        }
        return removed;
    }, Σ);
    SplayTree.prototype.find = Σ.addFunction(function αJTGc(key) {
        var Σ_αJTGc = new Σ.Scope(this, Σ, αJTGc, function () {
            return this.capture({ key: key }, {});
        });
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(key);
        return this.root_.key == key ? this.root_ : null;
    }, Σ);
    SplayTree.prototype.findMax = Σ.addFunction(function αTjb4(opt_startNode) {
        var Σ_αTjb4 = new Σ.Scope(this, Σ, αTjb4, function () {
            return this.capture({ opt_startNode: opt_startNode }, { current: current });
        });
        if (this.isEmpty()) {
            return null;
        }
        var current = opt_startNode || this.root_;
        while (current.right) {
            current = current.right;
        }
        return current;
    }, Σ);
    SplayTree.prototype.findGreatestLessThan = Σ.addFunction(function α2z94(key) {
        var Σ_α2z94 = new Σ.Scope(this, Σ, α2z94, function () {
            return this.capture({ key: key }, {});
        });
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(key);
        if (this.root_.key < key) {
            return this.root_;
        } else if (this.root_.left) {
            return this.findMax(this.root_.left);
        } else {
            return null;
        }
    }, Σ);
    SplayTree.prototype.exportKeys = Σ.addFunction(function αIpch() {
        var Σ_αIpch = new Σ.Scope(this, Σ, αIpch, function () {
            return this.capture({}, { result: result });
        });
        var result = [];
        if (!this.isEmpty()) {
            this.root_.traverse_(Σ_αIpch.addFunction(function αjTKd(node) {
                var Σ_αIpch_αjTKd = new Σ.Scope(this, Σ_αIpch, αjTKd, function () {
                    return this.capture({ node: node }, {});
                });
                result.push(node.key);
            }, Σ_αIpch));
        }
        return result;
    }, Σ);
    SplayTree.prototype.splay_ = Σ.addFunction(function α5DFd(key) {
        var Σ_α5DFd = new Σ.Scope(this, Σ, α5DFd, function () {
            return this.capture({ key: key }, {
                dummy: dummy,
                left: left,
                right: right,
                current: current
            });
        });
        if (this.isEmpty()) {
            return;
        }
        var dummy, left, right;
        dummy = left = right = new SplayTree.Node(null, null);
        var current = this.root_;
        while (true) {
            if (key < current.key) {
                if (!current.left) {
                    break;
                }
                if (key < current.left.key) {
                    var tmp = current.left;
                    current.left = tmp.right;
                    tmp.right = current;
                    current = tmp;
                    if (!current.left) {
                        break;
                    }
                }
                right.left = current;
                right = current;
                current = current.left;
            } else if (key > current.key) {
                if (!current.right) {
                    break;
                }
                if (key > current.right.key) {
                    var tmp = current.right;
                    current.right = tmp.left;
                    tmp.left = current;
                    current = tmp;
                    if (!current.right) {
                        break;
                    }
                }
                left.right = current;
                left = current;
                current = current.right;
            } else {
                break;
            }
        }
        left.right = current.left;
        right.left = current.right;
        current.left = dummy.right;
        current.right = dummy.left;
        this.root_ = current;
    }, Σ);
    SplayTree.Node = Σ.addFunction(function αX9jf(key, value) {
        var Σ_αX9jf = new Σ.Scope(this, Σ, αX9jf, function () {
            return this.capture({
                key: key,
                value: value
            }, {});
        });
        this.key = key;
        this.value = value;
    }, Σ);
    SplayTree.Node.prototype.left = null;
    SplayTree.Node.prototype.right = null;
    SplayTree.Node.prototype.traverse_ = Σ.addFunction(function αCQJi(f) {
        var Σ_αCQJi = new Σ.Scope(this, Σ, αCQJi, function () {
            return this.capture({ f: f }, { current: current });
        });
        var current = this;
        while (current) {
            var left = current.left;
            if (left) {
                left.traverse_(f);
            }
            f(current);
            current = current.right;
        }
    }, Σ);
}, 'mqtt://localhost', 'splay.js', {});
