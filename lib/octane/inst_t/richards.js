Code.bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return this.capture({}, {
            Richards: Richards,
            COUNT: COUNT,
            EXPECTED_QUEUE_COUNT: EXPECTED_QUEUE_COUNT,
            EXPECTED_HOLD_COUNT: EXPECTED_HOLD_COUNT,
            ID_IDLE: ID_IDLE,
            ID_WORKER: ID_WORKER,
            ID_HANDLER_A: ID_HANDLER_A,
            ID_HANDLER_B: ID_HANDLER_B,
            ID_DEVICE_A: ID_DEVICE_A,
            ID_DEVICE_B: ID_DEVICE_B,
            NUMBER_OF_IDS: NUMBER_OF_IDS,
            KIND_DEVICE: KIND_DEVICE,
            KIND_WORK: KIND_WORK,
            STATE_RUNNING: STATE_RUNNING,
            STATE_RUNNABLE: STATE_RUNNABLE,
            STATE_SUSPENDED: STATE_SUSPENDED,
            STATE_HELD: STATE_HELD,
            STATE_SUSPENDED_RUNNABLE: STATE_SUSPENDED_RUNNABLE,
            STATE_NOT_HELD: STATE_NOT_HELD,
            DATA_SIZE: DATA_SIZE
        });
    }).hoist(runRichards, Σ).hoist(Scheduler, Σ).hoist(TaskControlBlock, Σ).hoist(IdleTask, Σ).hoist(DeviceTask, Σ).hoist(WorkerTask, Σ).hoist(HandlerTask, Σ).hoist(Packet, Σ);
    var Richards = new BenchmarkSuite('Richards', [35302], [new Benchmark('Richards', true, false, 8200, runRichards)]);
    function runRichards() {
        var Σ_runRichards = new Σ.Scope(this, Σ, runRichards, function () {
            return this.capture({}, {
                scheduler: scheduler,
                queue: queue
            });
        });
        var scheduler = new Scheduler();
        scheduler.addIdleTask(ID_IDLE, 0, null, COUNT);
        var queue = new Packet(null, ID_WORKER, KIND_WORK);
        queue = new Packet(queue, ID_WORKER, KIND_WORK);
        scheduler.addWorkerTask(ID_WORKER, 1000, queue);
        queue = new Packet(null, ID_DEVICE_A, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
        scheduler.addHandlerTask(ID_HANDLER_A, 2000, queue);
        queue = new Packet(null, ID_DEVICE_B, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
        scheduler.addHandlerTask(ID_HANDLER_B, 3000, queue);
        scheduler.addDeviceTask(ID_DEVICE_A, 4000, null);
        scheduler.addDeviceTask(ID_DEVICE_B, 5000, null);
        scheduler.schedule();
        if (scheduler.queueCount != EXPECTED_QUEUE_COUNT || scheduler.holdCount != EXPECTED_HOLD_COUNT) {
            var msg = 'Error during execution: queueCount = ' + scheduler.queueCount + ', holdCount = ' + scheduler.holdCount + '.';
            throw new Error(msg);
        }
    }
    var COUNT = 1000;
    var EXPECTED_QUEUE_COUNT = 2322;
    var EXPECTED_HOLD_COUNT = 928;
    function Scheduler() {
        this.queueCount = 0;
        this.holdCount = 0;
        this.blocks = new Array(NUMBER_OF_IDS);
        this.list = null;
        this.currentTcb = null;
        this.currentId = null;
    }
    var ID_IDLE = 0;
    var ID_WORKER = 1;
    var ID_HANDLER_A = 2;
    var ID_HANDLER_B = 3;
    var ID_DEVICE_A = 4;
    var ID_DEVICE_B = 5;
    var NUMBER_OF_IDS = 6;
    var KIND_DEVICE = 0;
    var KIND_WORK = 1;
    Scheduler.prototype.addIdleTask = Σ.addFunction(function α4fyq(id, priority, queue, count) {
        var Σ_α4fyq = new Σ.Scope(this, Σ, α4fyq, function () {
            return this.capture({
                id: id,
                priority: priority,
                queue: queue,
                count: count
            }, {});
        });
        this.addRunningTask(id, priority, queue, new IdleTask(this, 1, count));
    }, Σ);
    Scheduler.prototype.addWorkerTask = Σ.addFunction(function αIrYf(id, priority, queue) {
        var Σ_αIrYf = new Σ.Scope(this, Σ, αIrYf, function () {
            return this.capture({
                id: id,
                priority: priority,
                queue: queue
            }, {});
        });
        this.addTask(id, priority, queue, new WorkerTask(this, ID_HANDLER_A, 0));
    }, Σ);
    Scheduler.prototype.addHandlerTask = Σ.addFunction(function α3Rao(id, priority, queue) {
        var Σ_α3Rao = new Σ.Scope(this, Σ, α3Rao, function () {
            return this.capture({
                id: id,
                priority: priority,
                queue: queue
            }, {});
        });
        this.addTask(id, priority, queue, new HandlerTask(this));
    }, Σ);
    Scheduler.prototype.addDeviceTask = Σ.addFunction(function αyApJ(id, priority, queue) {
        var Σ_αyApJ = new Σ.Scope(this, Σ, αyApJ, function () {
            return this.capture({
                id: id,
                priority: priority,
                queue: queue
            }, {});
        });
        this.addTask(id, priority, queue, new DeviceTask(this));
    }, Σ);
    Scheduler.prototype.addRunningTask = Σ.addFunction(function αKjLg(id, priority, queue, task) {
        var Σ_αKjLg = new Σ.Scope(this, Σ, αKjLg, function () {
            return this.capture({
                id: id,
                priority: priority,
                queue: queue,
                task: task
            }, {});
        });
        this.addTask(id, priority, queue, task);
        this.currentTcb.setRunning();
    }, Σ);
    Scheduler.prototype.addTask = Σ.addFunction(function α861J(id, priority, queue, task) {
        var Σ_α861J = new Σ.Scope(this, Σ, α861J, function () {
            return this.capture({
                id: id,
                priority: priority,
                queue: queue,
                task: task
            }, {});
        });
        this.currentTcb = new TaskControlBlock(this.list, id, priority, queue, task);
        this.list = this.currentTcb;
        this.blocks[id] = this.currentTcb;
    }, Σ);
    Scheduler.prototype.schedule = Σ.addFunction(function αvA0j() {
        this.currentTcb = this.list;
        while (this.currentTcb != null) {
            if (this.currentTcb.isHeldOrSuspended()) {
                this.currentTcb = this.currentTcb.link;
            } else {
                this.currentId = this.currentTcb.id;
                this.currentTcb = this.currentTcb.run();
            }
        }
    }, Σ);
    Scheduler.prototype.release = Σ.addFunction(function α1aAC(id) {
        var Σ_α1aAC = new Σ.Scope(this, Σ, α1aAC, function () {
            return this.capture({ id: id }, { tcb: tcb });
        });
        var tcb = this.blocks[id];
        if (tcb == null) {
            return tcb;
        }
        tcb.markAsNotHeld();
        if (tcb.priority > this.currentTcb.priority) {
            return tcb;
        } else {
            return this.currentTcb;
        }
    }, Σ);
    Scheduler.prototype.holdCurrent = Σ.addFunction(function αifmH() {
        this.holdCount++;
        this.currentTcb.markAsHeld();
        return this.currentTcb.link;
    }, Σ);
    Scheduler.prototype.suspendCurrent = Σ.addFunction(function α0G6K() {
        this.currentTcb.markAsSuspended();
        return this.currentTcb;
    }, Σ);
    Scheduler.prototype.queue = Σ.addFunction(function αcRYT(packet) {
        var Σ_αcRYT = new Σ.Scope(this, Σ, αcRYT, function () {
            return this.capture({ packet: packet }, { t: t });
        });
        var t = this.blocks[packet.id];
        if (t == null) {
            return t;
        }
        this.queueCount++;
        packet.link = null;
        packet.id = this.currentId;
        return t.checkPriorityAdd(this.currentTcb, packet);
    }, Σ);
    function TaskControlBlock(link, id, priority, queue, task) {
        var Σ_TaskControlBlock = new Σ.Scope(this, Σ, TaskControlBlock, function () {
            return this.capture({
                link: link,
                id: id,
                priority: priority,
                queue: queue,
                task: task
            }, {});
        });
        this.link = link;
        this.id = id;
        this.priority = priority;
        this.queue = queue;
        this.task = task;
        if (queue == null) {
            this.state = STATE_SUSPENDED;
        } else {
            this.state = STATE_SUSPENDED_RUNNABLE;
        }
    }
    var STATE_RUNNING = 0;
    var STATE_RUNNABLE = 1;
    var STATE_SUSPENDED = 2;
    var STATE_HELD = 4;
    var STATE_SUSPENDED_RUNNABLE = STATE_SUSPENDED | STATE_RUNNABLE;
    var STATE_NOT_HELD = ~STATE_HELD;
    TaskControlBlock.prototype.setRunning = Σ.addFunction(function αlA3Z() {
        this.state = STATE_RUNNING;
    }, Σ);
    TaskControlBlock.prototype.markAsNotHeld = Σ.addFunction(function α0j3Q() {
        this.state = this.state & STATE_NOT_HELD;
    }, Σ);
    TaskControlBlock.prototype.markAsHeld = Σ.addFunction(function αzp0z() {
        this.state = this.state | STATE_HELD;
    }, Σ);
    TaskControlBlock.prototype.isHeldOrSuspended = Σ.addFunction(function αybgO() {
        return (this.state & STATE_HELD) != 0 || this.state == STATE_SUSPENDED;
    }, Σ);
    TaskControlBlock.prototype.markAsSuspended = Σ.addFunction(function αypeL() {
        this.state = this.state | STATE_SUSPENDED;
    }, Σ);
    TaskControlBlock.prototype.markAsRunnable = Σ.addFunction(function αQLLP() {
        this.state = this.state | STATE_RUNNABLE;
    }, Σ);
    TaskControlBlock.prototype.run = Σ.addFunction(function αIdNv() {
        var Σ_αIdNv = new Σ.Scope(this, Σ, αIdNv, function () {
            return this.capture({}, { packet: packet });
        });
        var packet;
        if (this.state == STATE_SUSPENDED_RUNNABLE) {
            packet = this.queue;
            this.queue = packet.link;
            if (this.queue == null) {
                this.state = STATE_RUNNING;
            } else {
                this.state = STATE_RUNNABLE;
            }
        } else {
            packet = null;
        }
        return this.task.run(packet);
    }, Σ);
    TaskControlBlock.prototype.checkPriorityAdd = Σ.addFunction(function αz8lq(task, packet) {
        var Σ_αz8lq = new Σ.Scope(this, Σ, αz8lq, function () {
            return this.capture({
                task: task,
                packet: packet
            }, {});
        });
        if (this.queue == null) {
            this.queue = packet;
            this.markAsRunnable();
            if (this.priority > task.priority) {
                return this;
            }
        } else {
            this.queue = packet.addTo(this.queue);
        }
        return task;
    }, Σ);
    TaskControlBlock.prototype.toString = Σ.addFunction(function αTOos() {
        return 'tcb { ' + this.task + '@' + this.state + ' }';
    }, Σ);
    function IdleTask(scheduler, v1, count) {
        var Σ_IdleTask = new Σ.Scope(this, Σ, IdleTask, function () {
            return this.capture({
                scheduler: scheduler,
                v1: v1,
                count: count
            }, {});
        });
        this.scheduler = scheduler;
        this.v1 = v1;
        this.count = count;
    }
    IdleTask.prototype.run = Σ.addFunction(function αUACv(packet) {
        var Σ_αUACv = new Σ.Scope(this, Σ, αUACv, function () {
            return this.capture({ packet: packet }, {});
        });
        this.count--;
        if (this.count == 0) {
            return this.scheduler.holdCurrent();
        }
        if ((this.v1 & 1) == 0) {
            this.v1 = this.v1 >> 1;
            return this.scheduler.release(ID_DEVICE_A);
        } else {
            this.v1 = this.v1 >> 1 ^ 53256;
            return this.scheduler.release(ID_DEVICE_B);
        }
    }, Σ);
    IdleTask.prototype.toString = Σ.addFunction(function αuxrO() {
        return 'IdleTask';
    }, Σ);
    function DeviceTask(scheduler) {
        var Σ_DeviceTask = new Σ.Scope(this, Σ, DeviceTask, function () {
            return this.capture({ scheduler: scheduler }, {});
        });
        this.scheduler = scheduler;
        this.v1 = null;
    }
    DeviceTask.prototype.run = Σ.addFunction(function αXQty(packet) {
        var Σ_αXQty = new Σ.Scope(this, Σ, αXQty, function () {
            return this.capture({ packet: packet }, {});
        });
        if (packet == null) {
            if (this.v1 == null) {
                return this.scheduler.suspendCurrent();
            }
            var v = this.v1;
            this.v1 = null;
            return this.scheduler.queue(v);
        } else {
            this.v1 = packet;
            return this.scheduler.holdCurrent();
        }
    }, Σ);
    DeviceTask.prototype.toString = Σ.addFunction(function α0c3i() {
        return 'DeviceTask';
    }, Σ);
    function WorkerTask(scheduler, v1, v2) {
        var Σ_WorkerTask = new Σ.Scope(this, Σ, WorkerTask, function () {
            return this.capture({
                scheduler: scheduler,
                v1: v1,
                v2: v2
            }, {});
        });
        this.scheduler = scheduler;
        this.v1 = v1;
        this.v2 = v2;
    }
    WorkerTask.prototype.run = Σ.addFunction(function αf4Vu(packet) {
        var Σ_αf4Vu = new Σ.Scope(this, Σ, αf4Vu, function () {
            return this.capture({ packet: packet }, {});
        });
        if (packet == null) {
            return this.scheduler.suspendCurrent();
        } else {
            if (this.v1 == ID_HANDLER_A) {
                this.v1 = ID_HANDLER_B;
            } else {
                this.v1 = ID_HANDLER_A;
            }
            packet.id = this.v1;
            packet.a1 = 0;
            for (var i = 0; i < DATA_SIZE; i++) {
                this.v2++;
                if (this.v2 > 26) {
                    this.v2 = 1;
                }
                packet.a2[i] = this.v2;
            }
            return this.scheduler.queue(packet);
        }
    }, Σ);
    WorkerTask.prototype.toString = Σ.addFunction(function αUBQ7() {
        return 'WorkerTask';
    }, Σ);
    function HandlerTask(scheduler) {
        var Σ_HandlerTask = new Σ.Scope(this, Σ, HandlerTask, function () {
            return this.capture({ scheduler: scheduler }, {});
        });
        this.scheduler = scheduler;
        this.v1 = null;
        this.v2 = null;
    }
    HandlerTask.prototype.run = Σ.addFunction(function αNL2Z(packet) {
        var Σ_αNL2Z = new Σ.Scope(this, Σ, αNL2Z, function () {
            return this.capture({ packet: packet }, {});
        });
        if (packet != null) {
            if (packet.kind == KIND_WORK) {
                this.v1 = packet.addTo(this.v1);
            } else {
                this.v2 = packet.addTo(this.v2);
            }
        }
        if (this.v1 != null) {
            var count = this.v1.a1;
            var v;
            if (count < DATA_SIZE) {
                if (this.v2 != null) {
                    v = this.v2;
                    this.v2 = this.v2.link;
                    v.a1 = this.v1.a2[count];
                    this.v1.a1 = count + 1;
                    return this.scheduler.queue(v);
                }
            } else {
                v = this.v1;
                this.v1 = this.v1.link;
                return this.scheduler.queue(v);
            }
        }
        return this.scheduler.suspendCurrent();
    }, Σ);
    HandlerTask.prototype.toString = Σ.addFunction(function αN8Li() {
        return 'HandlerTask';
    }, Σ);
    var DATA_SIZE = 4;
    function Packet(link, id, kind) {
        var Σ_Packet = new Σ.Scope(this, Σ, Packet, function () {
            return this.capture({
                link: link,
                id: id,
                kind: kind
            }, {});
        });
        this.link = link;
        this.id = id;
        this.kind = kind;
        this.a1 = 0;
        this.a2 = new Array(DATA_SIZE);
    }
    Packet.prototype.addTo = Σ.addFunction(function αex0h(queue) {
        var Σ_αex0h = new Σ.Scope(this, Σ, αex0h, function () {
            return this.capture({ queue: queue }, {
                peek: peek,
                next: next
            });
        });
        this.link = null;
        if (queue == null) {
            return this;
        }
        var peek, next = queue;
        while ((peek = next.link) != null) {
            next = peek;
        }
        next.link = this;
        return queue;
    }, Σ);
    Packet.prototype.toString = Σ.addFunction(function αd83w() {
        return 'Packet';
    }, Σ);
}, 'mqtt://localhost', 'richards.js', {});
