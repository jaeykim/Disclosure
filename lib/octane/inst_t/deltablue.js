Code.bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return this.capture({}, {
            DeltaBlue: DeltaBlue,
            Direction: Direction,
            planner: planner
        });
    }).hoist(OrderedCollection, Σ).hoist(Strength, Σ).hoist(Constraint, Σ).hoist(UnaryConstraint, Σ).hoist(StayConstraint, Σ).hoist(EditConstraint, Σ).hoist(BinaryConstraint, Σ).hoist(ScaleConstraint, Σ).hoist(EqualityConstraint, Σ).hoist(Variable, Σ).hoist(Planner, Σ).hoist(Plan, Σ).hoist(chainTest, Σ).hoist(projectionTest, Σ).hoist(change, Σ).hoist(deltaBlue, Σ);
    var DeltaBlue = new BenchmarkSuite('DeltaBlue', [66118], [new Benchmark('DeltaBlue', true, false, 4400, deltaBlue)]);
    Object.defineProperty(Object.prototype, 'inheritsFrom', {
        value: Σ.addFunction(function αZyCA(shuper) {
            var Σ_αZyCA = new Σ.Scope(this, Σ, αZyCA, function () {
                return this.capture({ shuper: shuper }, {});
            }).hoist(Inheriter, Σ_αZyCA);
            function Inheriter() {
            }
            Inheriter.prototype = shuper.prototype;
            this.prototype = new Inheriter();
            this.superConstructor = shuper;
        }, Σ)
    });
    function OrderedCollection() {
        this.elms = new Array();
    }
    OrderedCollection.prototype.add = Σ.addFunction(function α1pzB(elm) {
        var Σ_α1pzB = new Σ.Scope(this, Σ, α1pzB, function () {
            return this.capture({ elm: elm }, {});
        });
        this.elms.push(elm);
    }, Σ);
    OrderedCollection.prototype.at = Σ.addFunction(function αaLbv(index) {
        var Σ_αaLbv = new Σ.Scope(this, Σ, αaLbv, function () {
            return this.capture({ index: index }, {});
        });
        return this.elms[index];
    }, Σ);
    OrderedCollection.prototype.size = Σ.addFunction(function αk3YB() {
        return this.elms.length;
    }, Σ);
    OrderedCollection.prototype.removeFirst = Σ.addFunction(function αs0OF() {
        return this.elms.pop();
    }, Σ);
    OrderedCollection.prototype.remove = Σ.addFunction(function αX9fr(elm) {
        var Σ_αX9fr = new Σ.Scope(this, Σ, αX9fr, function () {
            return this.capture({ elm: elm }, {
                index: index,
                skipped: skipped
            });
        });
        var index = 0, skipped = 0;
        for (var i = 0; i < this.elms.length; i++) {
            var value = this.elms[i];
            if (value != elm) {
                this.elms[index] = value;
                index++;
            } else {
                skipped++;
            }
        }
        for (var i = 0; i < skipped; i++) {
            this.elms.pop();
        }
    }, Σ);
    function Strength(strengthValue, name) {
        var Σ_Strength = new Σ.Scope(this, Σ, Strength, function () {
            return this.capture({
                strengthValue: strengthValue,
                name: name
            }, {});
        });
        this.strengthValue = strengthValue;
        this.name = name;
    }
    Strength.stronger = Σ.addFunction(function αhGXm(s1, s2) {
        var Σ_αhGXm = new Σ.Scope(this, Σ, αhGXm, function () {
            return this.capture({
                s1: s1,
                s2: s2
            }, {});
        });
        return s1.strengthValue < s2.strengthValue;
    }, Σ);
    Strength.weaker = Σ.addFunction(function αvjtk(s1, s2) {
        var Σ_αvjtk = new Σ.Scope(this, Σ, αvjtk, function () {
            return this.capture({
                s1: s1,
                s2: s2
            }, {});
        });
        return s1.strengthValue > s2.strengthValue;
    }, Σ);
    Strength.weakestOf = Σ.addFunction(function α5dPf(s1, s2) {
        var Σ_α5dPf = new Σ.Scope(this, Σ, α5dPf, function () {
            return this.capture({
                s1: s1,
                s2: s2
            }, {});
        });
        return this.weaker(s1, s2) ? s1 : s2;
    }, Σ);
    Strength.strongest = Σ.addFunction(function αEWbU(s1, s2) {
        var Σ_αEWbU = new Σ.Scope(this, Σ, αEWbU, function () {
            return this.capture({
                s1: s1,
                s2: s2
            }, {});
        });
        return this.stronger(s1, s2) ? s1 : s2;
    }, Σ);
    Strength.prototype.nextWeaker = Σ.addFunction(function αtwlq() {
        switch (this.strengthValue) {
        case 0:
            return Strength.WEAKEST;
        case 1:
            return Strength.WEAK_DEFAULT;
        case 2:
            return Strength.NORMAL;
        case 3:
            return Strength.STRONG_DEFAULT;
        case 4:
            return Strength.PREFERRED;
        case 5:
            return Strength.REQUIRED;
        }
    }, Σ);
    Strength.REQUIRED = new Strength(0, 'required');
    Strength.STONG_PREFERRED = new Strength(1, 'strongPreferred');
    Strength.PREFERRED = new Strength(2, 'preferred');
    Strength.STRONG_DEFAULT = new Strength(3, 'strongDefault');
    Strength.NORMAL = new Strength(4, 'normal');
    Strength.WEAK_DEFAULT = new Strength(5, 'weakDefault');
    Strength.WEAKEST = new Strength(6, 'weakest');
    function Constraint(strength) {
        var Σ_Constraint = new Σ.Scope(this, Σ, Constraint, function () {
            return this.capture({ strength: strength }, {});
        });
        this.strength = strength;
    }
    Constraint.prototype.addConstraint = Σ.addFunction(function αdbTo() {
        this.addToGraph();
        planner.incrementalAdd(this);
    }, Σ);
    Constraint.prototype.satisfy = Σ.addFunction(function αSKU5(mark) {
        var Σ_αSKU5 = new Σ.Scope(this, Σ, αSKU5, function () {
            return this.capture({ mark: mark }, {
                out: out,
                overridden: overridden
            });
        });
        this.chooseMethod(mark);
        if (!this.isSatisfied()) {
            if (this.strength == Strength.REQUIRED) {
                alert('Could not satisfy a required constraint!');
            }
            return null;
        }
        this.markInputs(mark);
        var out = this.output();
        var overridden = out.determinedBy;
        if (overridden != null) {
            overridden.markUnsatisfied();
        }
        out.determinedBy = this;
        if (!planner.addPropagate(this, mark)) {
            alert('Cycle encountered');
        }
        out.mark = mark;
        return overridden;
    }, Σ);
    Constraint.prototype.destroyConstraint = Σ.addFunction(function αPHPM() {
        if (this.isSatisfied()) {
            planner.incrementalRemove(this);
        } else {
            this.removeFromGraph();
        }
    }, Σ);
    Constraint.prototype.isInput = Σ.addFunction(function αbHoj() {
        return false;
    }, Σ);
    function UnaryConstraint(v, strength) {
        var Σ_UnaryConstraint = new Σ.Scope(this, Σ, UnaryConstraint, function () {
            return this.capture({
                v: v,
                strength: strength
            }, {});
        });
        UnaryConstraint.superConstructor.call(this, strength);
        this.myOutput = v;
        this.satisfied = false;
        this.addConstraint();
    }
    UnaryConstraint.inheritsFrom(Constraint);
    UnaryConstraint.prototype.addToGraph = Σ.addFunction(function αYvCO() {
        this.myOutput.addConstraint(this);
        this.satisfied = false;
    }, Σ);
    UnaryConstraint.prototype.chooseMethod = Σ.addFunction(function αf2pM(mark) {
        var Σ_αf2pM = new Σ.Scope(this, Σ, αf2pM, function () {
            return this.capture({ mark: mark }, {});
        });
        this.satisfied = this.myOutput.mark != mark && Strength.stronger(this.strength, this.myOutput.walkStrength);
    }, Σ);
    UnaryConstraint.prototype.isSatisfied = Σ.addFunction(function αXi9t() {
        return this.satisfied;
    }, Σ);
    UnaryConstraint.prototype.markInputs = Σ.addFunction(function αqLr7(mark) {
        var Σ_αqLr7 = new Σ.Scope(this, Σ, αqLr7, function () {
            return this.capture({ mark: mark }, {});
        });
    }, Σ);
    UnaryConstraint.prototype.output = Σ.addFunction(function αMmub() {
        return this.myOutput;
    }, Σ);
    UnaryConstraint.prototype.recalculate = Σ.addFunction(function αRsgk() {
        this.myOutput.walkStrength = this.strength;
        this.myOutput.stay = !this.isInput();
        if (this.myOutput.stay) {
            this.execute();
        }
    }, Σ);
    UnaryConstraint.prototype.markUnsatisfied = Σ.addFunction(function αXjXu() {
        this.satisfied = false;
    }, Σ);
    UnaryConstraint.prototype.inputsKnown = Σ.addFunction(function αJbxh() {
        return true;
    }, Σ);
    UnaryConstraint.prototype.removeFromGraph = Σ.addFunction(function αhtKV() {
        if (this.myOutput != null) {
            this.myOutput.removeConstraint(this);
        }
        this.satisfied = false;
    }, Σ);
    function StayConstraint(v, str) {
        var Σ_StayConstraint = new Σ.Scope(this, Σ, StayConstraint, function () {
            return this.capture({
                v: v,
                str: str
            }, {});
        });
        StayConstraint.superConstructor.call(this, v, str);
    }
    StayConstraint.inheritsFrom(UnaryConstraint);
    StayConstraint.prototype.execute = Σ.addFunction(function α7OLK() {
    }, Σ);
    function EditConstraint(v, str) {
        var Σ_EditConstraint = new Σ.Scope(this, Σ, EditConstraint, function () {
            return this.capture({
                v: v,
                str: str
            }, {});
        });
        EditConstraint.superConstructor.call(this, v, str);
    }
    EditConstraint.inheritsFrom(UnaryConstraint);
    EditConstraint.prototype.isInput = Σ.addFunction(function αJtGS() {
        return true;
    }, Σ);
    EditConstraint.prototype.execute = Σ.addFunction(function αjHLo() {
    }, Σ);
    var Direction = new Object();
    Direction.NONE = 0;
    Direction.FORWARD = 1;
    Direction.BACKWARD = -1;
    function BinaryConstraint(var1, var2, strength) {
        var Σ_BinaryConstraint = new Σ.Scope(this, Σ, BinaryConstraint, function () {
            return this.capture({
                var1: var1,
                var2: var2,
                strength: strength
            }, {});
        });
        BinaryConstraint.superConstructor.call(this, strength);
        this.v1 = var1;
        this.v2 = var2;
        this.direction = Direction.NONE;
        this.addConstraint();
    }
    BinaryConstraint.inheritsFrom(Constraint);
    BinaryConstraint.prototype.chooseMethod = Σ.addFunction(function αwwIs(mark) {
        var Σ_αwwIs = new Σ.Scope(this, Σ, αwwIs, function () {
            return this.capture({ mark: mark }, {});
        });
        if (this.v1.mark == mark) {
            this.direction = this.v2.mark != mark && Strength.stronger(this.strength, this.v2.walkStrength) ? Direction.FORWARD : Direction.NONE;
        }
        if (this.v2.mark == mark) {
            this.direction = this.v1.mark != mark && Strength.stronger(this.strength, this.v1.walkStrength) ? Direction.BACKWARD : Direction.NONE;
        }
        if (Strength.weaker(this.v1.walkStrength, this.v2.walkStrength)) {
            this.direction = Strength.stronger(this.strength, this.v1.walkStrength) ? Direction.BACKWARD : Direction.NONE;
        } else {
            this.direction = Strength.stronger(this.strength, this.v2.walkStrength) ? Direction.FORWARD : Direction.BACKWARD;
        }
    }, Σ);
    BinaryConstraint.prototype.addToGraph = Σ.addFunction(function α5TCg() {
        this.v1.addConstraint(this);
        this.v2.addConstraint(this);
        this.direction = Direction.NONE;
    }, Σ);
    BinaryConstraint.prototype.isSatisfied = Σ.addFunction(function α6G0A() {
        return this.direction != Direction.NONE;
    }, Σ);
    BinaryConstraint.prototype.markInputs = Σ.addFunction(function αbVzI(mark) {
        var Σ_αbVzI = new Σ.Scope(this, Σ, αbVzI, function () {
            return this.capture({ mark: mark }, {});
        });
        this.input().mark = mark;
    }, Σ);
    BinaryConstraint.prototype.input = Σ.addFunction(function αwTgU() {
        return this.direction == Direction.FORWARD ? this.v1 : this.v2;
    }, Σ);
    BinaryConstraint.prototype.output = Σ.addFunction(function α5fOF() {
        return this.direction == Direction.FORWARD ? this.v2 : this.v1;
    }, Σ);
    BinaryConstraint.prototype.recalculate = Σ.addFunction(function α4Zkn() {
        var Σ_α4Zkn = new Σ.Scope(this, Σ, α4Zkn, function () {
            return this.capture({}, {
                ihn: ihn,
                out: out
            });
        });
        var ihn = this.input(), out = this.output();
        out.walkStrength = Strength.weakestOf(this.strength, ihn.walkStrength);
        out.stay = ihn.stay;
        if (out.stay) {
            this.execute();
        }
    }, Σ);
    BinaryConstraint.prototype.markUnsatisfied = Σ.addFunction(function αfdlw() {
        this.direction = Direction.NONE;
    }, Σ);
    BinaryConstraint.prototype.inputsKnown = Σ.addFunction(function αoOaB(mark) {
        var Σ_αoOaB = new Σ.Scope(this, Σ, αoOaB, function () {
            return this.capture({ mark: mark }, { i: i });
        });
        var i = this.input();
        return i.mark == mark || i.stay || i.determinedBy == null;
    }, Σ);
    BinaryConstraint.prototype.removeFromGraph = Σ.addFunction(function αj8xe() {
        if (this.v1 != null) {
            this.v1.removeConstraint(this);
        }
        if (this.v2 != null) {
            this.v2.removeConstraint(this);
        }
        this.direction = Direction.NONE;
    }, Σ);
    function ScaleConstraint(src, scale, offset, dest, strength) {
        var Σ_ScaleConstraint = new Σ.Scope(this, Σ, ScaleConstraint, function () {
            return this.capture({
                src: src,
                scale: scale,
                offset: offset,
                dest: dest,
                strength: strength
            }, {});
        });
        this.direction = Direction.NONE;
        this.scale = scale;
        this.offset = offset;
        ScaleConstraint.superConstructor.call(this, src, dest, strength);
    }
    ScaleConstraint.inheritsFrom(BinaryConstraint);
    ScaleConstraint.prototype.addToGraph = Σ.addFunction(function αHaaC() {
        ScaleConstraint.superConstructor.prototype.addToGraph.call(this);
        this.scale.addConstraint(this);
        this.offset.addConstraint(this);
    }, Σ);
    ScaleConstraint.prototype.removeFromGraph = Σ.addFunction(function αPlg2() {
        ScaleConstraint.superConstructor.prototype.removeFromGraph.call(this);
        if (this.scale != null) {
            this.scale.removeConstraint(this);
        }
        if (this.offset != null) {
            this.offset.removeConstraint(this);
        }
    }, Σ);
    ScaleConstraint.prototype.markInputs = Σ.addFunction(function αqMuN(mark) {
        var Σ_αqMuN = new Σ.Scope(this, Σ, αqMuN, function () {
            return this.capture({ mark: mark }, {});
        });
        ScaleConstraint.superConstructor.prototype.markInputs.call(this, mark);
        this.scale.mark = this.offset.mark = mark;
    }, Σ);
    ScaleConstraint.prototype.execute = Σ.addFunction(function αK5VP() {
        if (this.direction == Direction.FORWARD) {
            this.v2.value = this.v1.value * this.scale.value + this.offset.value;
        } else {
            this.v1.value = (this.v2.value - this.offset.value) / this.scale.value;
        }
    }, Σ);
    ScaleConstraint.prototype.recalculate = Σ.addFunction(function αAMZO() {
        var Σ_αAMZO = new Σ.Scope(this, Σ, αAMZO, function () {
            return this.capture({}, {
                ihn: ihn,
                out: out
            });
        });
        var ihn = this.input(), out = this.output();
        out.walkStrength = Strength.weakestOf(this.strength, ihn.walkStrength);
        out.stay = ihn.stay && this.scale.stay && this.offset.stay;
        if (out.stay) {
            this.execute();
        }
    }, Σ);
    function EqualityConstraint(var1, var2, strength) {
        var Σ_EqualityConstraint = new Σ.Scope(this, Σ, EqualityConstraint, function () {
            return this.capture({
                var1: var1,
                var2: var2,
                strength: strength
            }, {});
        });
        EqualityConstraint.superConstructor.call(this, var1, var2, strength);
    }
    EqualityConstraint.inheritsFrom(BinaryConstraint);
    EqualityConstraint.prototype.execute = Σ.addFunction(function αriGn() {
        this.output().value = this.input().value;
    }, Σ);
    function Variable(name, initialValue) {
        var Σ_Variable = new Σ.Scope(this, Σ, Variable, function () {
            return this.capture({
                name: name,
                initialValue: initialValue
            }, {});
        });
        this.value = initialValue || 0;
        this.constraints = new OrderedCollection();
        this.determinedBy = null;
        this.mark = 0;
        this.walkStrength = Strength.WEAKEST;
        this.stay = true;
        this.name = name;
    }
    Variable.prototype.addConstraint = Σ.addFunction(function αUVNB(c) {
        var Σ_αUVNB = new Σ.Scope(this, Σ, αUVNB, function () {
            return this.capture({ c: c }, {});
        });
        this.constraints.add(c);
    }, Σ);
    Variable.prototype.removeConstraint = Σ.addFunction(function αvlzg(c) {
        var Σ_αvlzg = new Σ.Scope(this, Σ, αvlzg, function () {
            return this.capture({ c: c }, {});
        });
        this.constraints.remove(c);
        if (this.determinedBy == c) {
            this.determinedBy = null;
        }
    }, Σ);
    function Planner() {
        this.currentMark = 0;
    }
    Planner.prototype.incrementalAdd = Σ.addFunction(function αxV83(c) {
        var Σ_αxV83 = new Σ.Scope(this, Σ, αxV83, function () {
            return this.capture({ c: c }, {
                mark: mark,
                overridden: overridden
            });
        });
        var mark = this.newMark();
        var overridden = c.satisfy(mark);
        while (overridden != null) {
            overridden = overridden.satisfy(mark);
        }
    }, Σ);
    Planner.prototype.incrementalRemove = Σ.addFunction(function αW9Yy(c) {
        var Σ_αW9Yy = new Σ.Scope(this, Σ, αW9Yy, function () {
            return this.capture({ c: c }, {
                out: out,
                unsatisfied: unsatisfied,
                strength: strength
            });
        });
        var out = c.output();
        c.markUnsatisfied();
        c.removeFromGraph();
        var unsatisfied = this.removePropagateFrom(out);
        var strength = Strength.REQUIRED;
        do {
            for (var i = 0; i < unsatisfied.size(); i++) {
                var u = unsatisfied.at(i);
                if (u.strength == strength) {
                    this.incrementalAdd(u);
                }
            }
            strength = strength.nextWeaker();
        } while (strength != Strength.WEAKEST);
    }, Σ);
    Planner.prototype.newMark = Σ.addFunction(function αMLfF() {
        return ++this.currentMark;
    }, Σ);
    Planner.prototype.makePlan = Σ.addFunction(function αhZIY(sources) {
        var Σ_αhZIY = new Σ.Scope(this, Σ, αhZIY, function () {
            return this.capture({ sources: sources }, {
                mark: mark,
                plan: plan,
                todo: todo
            });
        });
        var mark = this.newMark();
        var plan = new Plan();
        var todo = sources;
        while (todo.size() > 0) {
            var c = todo.removeFirst();
            if (c.output().mark != mark && c.inputsKnown(mark)) {
                plan.addConstraint(c);
                c.output().mark = mark;
                this.addConstraintsConsumingTo(c.output(), todo);
            }
        }
        return plan;
    }, Σ);
    Planner.prototype.extractPlanFromConstraints = Σ.addFunction(function αCJSC(constraints) {
        var Σ_αCJSC = new Σ.Scope(this, Σ, αCJSC, function () {
            return this.capture({ constraints: constraints }, { sources: sources });
        });
        var sources = new OrderedCollection();
        for (var i = 0; i < constraints.size(); i++) {
            var c = constraints.at(i);
            if (c.isInput() && c.isSatisfied()) {
                sources.add(c);
            }
        }
        return this.makePlan(sources);
    }, Σ);
    Planner.prototype.addPropagate = Σ.addFunction(function α7bss(c, mark) {
        var Σ_α7bss = new Σ.Scope(this, Σ, α7bss, function () {
            return this.capture({
                c: c,
                mark: mark
            }, { todo: todo });
        });
        var todo = new OrderedCollection();
        todo.add(c);
        while (todo.size() > 0) {
            var d = todo.removeFirst();
            if (d.output().mark == mark) {
                this.incrementalRemove(c);
                return false;
            }
            d.recalculate();
            this.addConstraintsConsumingTo(d.output(), todo);
        }
        return true;
    }, Σ);
    Planner.prototype.removePropagateFrom = Σ.addFunction(function α9Bco(out) {
        var Σ_α9Bco = new Σ.Scope(this, Σ, α9Bco, function () {
            return this.capture({ out: out }, {
                unsatisfied: unsatisfied,
                todo: todo
            });
        });
        out.determinedBy = null;
        out.walkStrength = Strength.WEAKEST;
        out.stay = true;
        var unsatisfied = new OrderedCollection();
        var todo = new OrderedCollection();
        todo.add(out);
        while (todo.size() > 0) {
            var v = todo.removeFirst();
            for (var i = 0; i < v.constraints.size(); i++) {
                var c = v.constraints.at(i);
                if (!c.isSatisfied()) {
                    unsatisfied.add(c);
                }
            }
            var determining = v.determinedBy;
            for (var i = 0; i < v.constraints.size(); i++) {
                var next = v.constraints.at(i);
                if (next != determining && next.isSatisfied()) {
                    next.recalculate();
                    todo.add(next.output());
                }
            }
        }
        return unsatisfied;
    }, Σ);
    Planner.prototype.addConstraintsConsumingTo = Σ.addFunction(function αxxHO(v, coll) {
        var Σ_αxxHO = new Σ.Scope(this, Σ, αxxHO, function () {
            return this.capture({
                v: v,
                coll: coll
            }, {
                determining: determining,
                cc: cc
            });
        });
        var determining = v.determinedBy;
        var cc = v.constraints;
        for (var i = 0; i < cc.size(); i++) {
            var c = cc.at(i);
            if (c != determining && c.isSatisfied()) {
                coll.add(c);
            }
        }
    }, Σ);
    function Plan() {
        this.v = new OrderedCollection();
    }
    Plan.prototype.addConstraint = Σ.addFunction(function αwJSE(c) {
        var Σ_αwJSE = new Σ.Scope(this, Σ, αwJSE, function () {
            return this.capture({ c: c }, {});
        });
        this.v.add(c);
    }, Σ);
    Plan.prototype.size = Σ.addFunction(function αL7za() {
        return this.v.size();
    }, Σ);
    Plan.prototype.constraintAt = Σ.addFunction(function αsSz0(index) {
        var Σ_αsSz0 = new Σ.Scope(this, Σ, αsSz0, function () {
            return this.capture({ index: index }, {});
        });
        return this.v.at(index);
    }, Σ);
    Plan.prototype.execute = Σ.addFunction(function α1hRW() {
        var Σ_α1hRW = new Σ.Scope(this, Σ, α1hRW, function () {
            return this.capture({}, {});
        });
        for (var i = 0; i < this.size(); i++) {
            var c = this.constraintAt(i);
            c.execute();
        }
    }, Σ);
    function chainTest(n) {
        var Σ_chainTest = new Σ.Scope(this, Σ, chainTest, function () {
            return this.capture({ n: n }, {
                prev: prev,
                first: first,
                last: last,
                edit: edit,
                edits: edits,
                plan: plan
            });
        });
        planner = new Planner();
        var prev = null, first = null, last = null;
        for (var i = 0; i <= n; i++) {
            var name = 'v' + i;
            var v = new Variable(name);
            if (prev != null) {
                new EqualityConstraint(prev, v, Strength.REQUIRED);
            }
            if (i == 0) {
                first = v;
            }
            if (i == n) {
                last = v;
            }
            prev = v;
        }
        new StayConstraint(last, Strength.STRONG_DEFAULT);
        var edit = new EditConstraint(first, Strength.PREFERRED);
        var edits = new OrderedCollection();
        edits.add(edit);
        var plan = planner.extractPlanFromConstraints(edits);
        for (var i = 0; i < 100; i++) {
            first.value = i;
            plan.execute();
            if (last.value != i) {
                alert('Chain test failed.');
            }
        }
    }
    function projectionTest(n) {
        var Σ_projectionTest = new Σ.Scope(this, Σ, projectionTest, function () {
            return this.capture({ n: n }, {
                scale: scale,
                offset: offset,
                src: src,
                dst: dst,
                dests: dests
            });
        });
        planner = new Planner();
        var scale = new Variable('scale', 10);
        var offset = new Variable('offset', 1000);
        var src = null, dst = null;
        var dests = new OrderedCollection();
        for (var i = 0; i < n; i++) {
            src = new Variable('src' + i, i);
            dst = new Variable('dst' + i, i);
            dests.add(dst);
            new StayConstraint(src, Strength.NORMAL);
            new ScaleConstraint(src, scale, offset, dst, Strength.REQUIRED);
        }
        change(src, 17);
        if (dst.value != 1170) {
            alert('Projection 1 failed');
        }
        change(dst, 1050);
        if (src.value != 5) {
            alert('Projection 2 failed');
        }
        change(scale, 5);
        for (var i = 0; i < n - 1; i++) {
            if (dests.at(i).value != i * 5 + 1000) {
                alert('Projection 3 failed');
            }
        }
        change(offset, 2000);
        for (var i = 0; i < n - 1; i++) {
            if (dests.at(i).value != i * 5 + 2000) {
                alert('Projection 4 failed');
            }
        }
    }
    function change(v, newValue) {
        var Σ_change = new Σ.Scope(this, Σ, change, function () {
            return this.capture({
                v: v,
                newValue: newValue
            }, {
                edit: edit,
                edits: edits,
                plan: plan
            });
        });
        var edit = new EditConstraint(v, Strength.PREFERRED);
        var edits = new OrderedCollection();
        edits.add(edit);
        var plan = planner.extractPlanFromConstraints(edits);
        for (var i = 0; i < 10; i++) {
            v.value = newValue;
            plan.execute();
        }
        edit.destroyConstraint();
    }
    var planner = null;
    function deltaBlue() {
        chainTest(100);
        projectionTest(100);
    }
}, 'mqtt://localhost', 'deltablue.js', {});
