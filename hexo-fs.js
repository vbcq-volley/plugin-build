"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../node_modules/bluebird/js/release/es5.js
var require_es5 = __commonJS({
  "../../node_modules/bluebird/js/release/es5.js"(exports2, module2) {
    var isES5 = function() {
      "use strict";
      return this === void 0;
    }();
    if (isES5) {
      module2.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5,
        propertyIsWritable: function(obj2, prop) {
          var descriptor = Object.getOwnPropertyDescriptor(obj2, prop);
          return !!(!descriptor || descriptor.writable || descriptor.set);
        }
      };
    } else {
      has = {}.hasOwnProperty;
      str = {}.toString;
      proto = {}.constructor.prototype;
      ObjectKeys = function(o) {
        var ret2 = [];
        for (var key in o) {
          if (has.call(o, key)) {
            ret2.push(key);
          }
        }
        return ret2;
      };
      ObjectGetDescriptor = function(o, key) {
        return { value: o[key] };
      };
      ObjectDefineProperty = function(o, key, desc) {
        o[key] = desc.value;
        return o;
      };
      ObjectFreeze = function(obj2) {
        return obj2;
      };
      ObjectGetPrototypeOf = function(obj2) {
        try {
          return Object(obj2).constructor.prototype;
        } catch (e) {
          return proto;
        }
      };
      ArrayIsArray = function(obj2) {
        try {
          return str.call(obj2) === "[object Array]";
        } catch (e) {
          return false;
        }
      };
      module2.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5,
        propertyIsWritable: function() {
          return true;
        }
      };
    }
    var has;
    var str;
    var proto;
    var ObjectKeys;
    var ObjectGetDescriptor;
    var ObjectDefineProperty;
    var ObjectFreeze;
    var ObjectGetPrototypeOf;
    var ArrayIsArray;
  }
});

// ../../node_modules/bluebird/js/release/util.js
var require_util = __commonJS({
  "../../node_modules/bluebird/js/release/util.js"(exports, module) {
    "use strict";
    var es5 = require_es5();
    var canEvaluate = typeof navigator == "undefined";
    var errorObj = { e: {} };
    var tryCatchTarget;
    var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : exports !== void 0 ? exports : null;
    function tryCatcher() {
      try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
      } catch (e) {
        errorObj.e = e;
        return errorObj;
      }
    }
    function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
    }
    var inherits = function(Child, Parent) {
      var hasProp = {}.hasOwnProperty;
      function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
          if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
            this[propertyName + "$"] = Parent.prototype[propertyName];
          }
        }
      }
      T.prototype = Parent.prototype;
      Child.prototype = new T();
      return Child.prototype;
    };
    function isPrimitive(val) {
      return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
    }
    function isObject(value) {
      return typeof value === "function" || typeof value === "object" && value !== null;
    }
    function maybeWrapAsError(maybeError) {
      if (!isPrimitive(maybeError)) return maybeError;
      return new Error(safeToString(maybeError));
    }
    function withAppended(target, appendee) {
      var len = target.length;
      var ret2 = new Array(len + 1);
      var i;
      for (i = 0; i < len; ++i) {
        ret2[i] = target[i];
      }
      ret2[i] = appendee;
      return ret2;
    }
    function getDataPropertyOrDefault(obj2, key, defaultValue) {
      if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj2, key);
        if (desc != null) {
          return desc.get == null && desc.set == null ? desc.value : defaultValue;
        }
      } else {
        return {}.hasOwnProperty.call(obj2, key) ? obj2[key] : void 0;
      }
    }
    function notEnumerableProp(obj2, name, value) {
      if (isPrimitive(obj2)) return obj2;
      var descriptor = {
        value,
        configurable: true,
        enumerable: false,
        writable: true
      };
      es5.defineProperty(obj2, name, descriptor);
      return obj2;
    }
    function thrower(r) {
      throw r;
    }
    var inheritedDataKeys = function() {
      var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
      ];
      var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
          if (excludedPrototypes[i] === val) {
            return true;
          }
        }
        return false;
      };
      if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj2) {
          var ret2 = [];
          var visitedKeys = /* @__PURE__ */ Object.create(null);
          while (obj2 != null && !isExcludedProto(obj2)) {
            var keys;
            try {
              keys = getKeys(obj2);
            } catch (e) {
              return ret2;
            }
            for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (visitedKeys[key]) continue;
              visitedKeys[key] = true;
              var desc = Object.getOwnPropertyDescriptor(obj2, key);
              if (desc != null && desc.get == null && desc.set == null) {
                ret2.push(key);
              }
            }
            obj2 = es5.getPrototypeOf(obj2);
          }
          return ret2;
        };
      } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj2) {
          if (isExcludedProto(obj2)) return [];
          var ret2 = [];
          enumeration: for (var key in obj2) {
            if (hasProp.call(obj2, key)) {
              ret2.push(key);
            } else {
              for (var i = 0; i < excludedPrototypes.length; ++i) {
                if (hasProp.call(excludedPrototypes[i], key)) {
                  continue enumeration;
                }
              }
              ret2.push(key);
            }
          }
          return ret2;
        };
      }
    }();
    var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
    function isClass(fn) {
      try {
        if (typeof fn === "function") {
          var keys = es5.names(fn.prototype);
          var hasMethods = es5.isES5 && keys.length > 1;
          var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
          var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;
          if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
            return true;
          }
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    function toFastProperties(obj) {
      function FakeConstructor() {
      }
      FakeConstructor.prototype = obj;
      var receiver = new FakeConstructor();
      function ic() {
        return typeof receiver.foo;
      }
      ic();
      ic();
      return obj;
      eval(obj);
    }
    var rident = /^[a-z$_][a-z$_0-9]*$/i;
    function isIdentifier(str) {
      return rident.test(str);
    }
    function filledRange(count, prefix, suffix) {
      var ret2 = new Array(count);
      for (var i = 0; i < count; ++i) {
        ret2[i] = prefix + i + suffix;
      }
      return ret2;
    }
    function safeToString(obj2) {
      try {
        return obj2 + "";
      } catch (e) {
        return "[no string representation]";
      }
    }
    function isError(obj2) {
      return obj2 instanceof Error || obj2 !== null && typeof obj2 === "object" && typeof obj2.message === "string" && typeof obj2.name === "string";
    }
    function markAsOriginatingFromRejection(e) {
      try {
        notEnumerableProp(e, "isOperational", true);
      } catch (ignore) {
      }
    }
    function originatesFromRejection(e) {
      if (e == null) return false;
      return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
    }
    function canAttachTrace(obj2) {
      return isError(obj2) && es5.propertyIsWritable(obj2, "stack");
    }
    var ensureErrorObject = function() {
      if (!("stack" in new Error())) {
        return function(value) {
          if (canAttachTrace(value)) return value;
          try {
            throw new Error(safeToString(value));
          } catch (err) {
            return err;
          }
        };
      } else {
        return function(value) {
          if (canAttachTrace(value)) return value;
          return new Error(safeToString(value));
        };
      }
    }();
    function classString(obj2) {
      return {}.toString.call(obj2);
    }
    function copyDescriptors(from, to, filter) {
      var keys = es5.names(from);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
          try {
            es5.defineProperty(to, key, es5.getDescriptor(from, key));
          } catch (ignore) {
          }
        }
      }
    }
    var asArray = function(v) {
      if (es5.isArray(v)) {
        return v;
      }
      return null;
    };
    if (typeof Symbol !== "undefined" && Symbol.iterator) {
      ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
      } : function(v) {
        var ret2 = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!(itResult = it.next()).done) {
          ret2.push(itResult.value);
        }
        return ret2;
      };
      asArray = function(v) {
        if (es5.isArray(v)) {
          return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
          return ArrayFrom(v);
        }
        return null;
      };
    }
    var ArrayFrom;
    var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";
    var hasEnvVariables = typeof process !== "undefined" && typeof process.env !== "undefined";
    function env(key) {
      return hasEnvVariables ? process.env[key] : void 0;
    }
    function getNativePromise() {
      if (typeof Promise === "function") {
        try {
          var promise = new Promise(function() {
          });
          if (classString(promise) === "[object Promise]") {
            return Promise;
          }
        } catch (e) {
        }
      }
    }
    var reflectHandler;
    function contextBind(ctx, cb) {
      if (ctx === null || typeof cb !== "function" || cb === reflectHandler) {
        return cb;
      }
      if (ctx.domain !== null) {
        cb = ctx.domain.bind(cb);
      }
      var async = ctx.async;
      if (async !== null) {
        var old = cb;
        cb = function() {
          var $_len = arguments.length + 2;
          var args = new Array($_len);
          for (var $_i = 2; $_i < $_len; ++$_i) {
            args[$_i] = arguments[$_i - 2];
          }
          ;
          args[0] = old;
          args[1] = this;
          return async.runInAsyncScope.apply(async, args);
        };
      }
      return cb;
    }
    var ret = {
      setReflectHandler: function(fn) {
        reflectHandler = fn;
      },
      isClass,
      isIdentifier,
      inheritedDataKeys,
      getDataPropertyOrDefault,
      thrower,
      isArray: es5.isArray,
      asArray,
      notEnumerableProp,
      isPrimitive,
      isObject,
      isError,
      canEvaluate,
      errorObj,
      tryCatch,
      inherits,
      withAppended,
      maybeWrapAsError,
      toFastProperties,
      filledRange,
      toString: safeToString,
      canAttachTrace,
      ensureErrorObject,
      originatesFromRejection,
      markAsOriginatingFromRejection,
      classString,
      copyDescriptors,
      isNode,
      hasEnvVariables,
      env,
      global: globalObject,
      getNativePromise,
      contextBind
    };
    ret.isRecentNode = ret.isNode && function() {
      var version;
      if (process.versions && process.versions.node) {
        version = process.versions.node.split(".").map(Number);
      } else if (process.version) {
        version = process.version.split(".").map(Number);
      }
      return version[0] === 0 && version[1] > 10 || version[0] > 0;
    }();
    ret.nodeSupportsAsyncResource = ret.isNode && function() {
      var supportsAsync = false;
      try {
        var res = require("async_hooks").AsyncResource;
        supportsAsync = typeof res.prototype.runInAsyncScope === "function";
      } catch (e) {
        supportsAsync = false;
      }
      return supportsAsync;
    }();
    if (ret.isNode) ret.toFastProperties(process);
    try {
      throw new Error();
    } catch (e) {
      ret.lastLineError = e;
    }
    module.exports = ret;
  }
});

// ../../node_modules/bluebird/js/release/schedule.js
var require_schedule = __commonJS({
  "../../node_modules/bluebird/js/release/schedule.js"(exports2, module2) {
    "use strict";
    var util = require_util();
    var schedule;
    var noAsyncScheduler = function() {
      throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
    };
    var NativePromise = util.getNativePromise();
    if (util.isNode && typeof MutationObserver === "undefined") {
      GlobalSetImmediate = global.setImmediate;
      ProcessNextTick = process.nextTick;
      schedule = util.isRecentNode ? function(fn) {
        GlobalSetImmediate.call(global, fn);
      } : function(fn) {
        ProcessNextTick.call(process, fn);
      };
    } else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
      nativePromise = NativePromise.resolve();
      schedule = function(fn) {
        nativePromise.then(fn);
      };
    } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova)) && "classList" in document.documentElement) {
      schedule = function() {
        var div = document.createElement("div");
        var opts = { attributes: true };
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
          div.classList.toggle("foo");
          toggleScheduled = false;
        });
        o2.observe(div2, opts);
        var scheduleToggle = function() {
          if (toggleScheduled) return;
          toggleScheduled = true;
          div2.classList.toggle("foo");
        };
        return function schedule2(fn) {
          var o = new MutationObserver(function() {
            o.disconnect();
            fn();
          });
          o.observe(div, opts);
          scheduleToggle();
        };
      }();
    } else if (typeof setImmediate !== "undefined") {
      schedule = function(fn) {
        setImmediate(fn);
      };
    } else if (typeof setTimeout !== "undefined") {
      schedule = function(fn) {
        setTimeout(fn, 0);
      };
    } else {
      schedule = noAsyncScheduler;
    }
    var GlobalSetImmediate;
    var ProcessNextTick;
    var nativePromise;
    module2.exports = schedule;
  }
});

// ../../node_modules/bluebird/js/release/queue.js
var require_queue = __commonJS({
  "../../node_modules/bluebird/js/release/queue.js"(exports2, module2) {
    "use strict";
    function arrayMove(src, srcIndex, dst, dstIndex, len) {
      for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
      }
    }
    function Queue(capacity) {
      this._capacity = capacity;
      this._length = 0;
      this._front = 0;
    }
    Queue.prototype._willBeOverCapacity = function(size) {
      return this._capacity < size;
    };
    Queue.prototype._pushOne = function(arg) {
      var length = this.length();
      this._checkCapacity(length + 1);
      var i = this._front + length & this._capacity - 1;
      this[i] = arg;
      this._length = length + 1;
    };
    Queue.prototype.push = function(fn, receiver2, arg) {
      var length = this.length() + 3;
      if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver2);
        this._pushOne(arg);
        return;
      }
      var j = this._front + length - 3;
      this._checkCapacity(length);
      var wrapMask = this._capacity - 1;
      this[j + 0 & wrapMask] = fn;
      this[j + 1 & wrapMask] = receiver2;
      this[j + 2 & wrapMask] = arg;
      this._length = length;
    };
    Queue.prototype.shift = function() {
      var front = this._front, ret2 = this[front];
      this[front] = void 0;
      this._front = front + 1 & this._capacity - 1;
      this._length--;
      return ret2;
    };
    Queue.prototype.length = function() {
      return this._length;
    };
    Queue.prototype._checkCapacity = function(size) {
      if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
      }
    };
    Queue.prototype._resizeTo = function(capacity) {
      var oldCapacity = this._capacity;
      this._capacity = capacity;
      var front = this._front;
      var length = this._length;
      var moveItemsCount = front + length & oldCapacity - 1;
      arrayMove(this, 0, this, oldCapacity, moveItemsCount);
    };
    module2.exports = Queue;
  }
});

// ../../node_modules/bluebird/js/release/async.js
var require_async = __commonJS({
  "../../node_modules/bluebird/js/release/async.js"(exports2, module2) {
    "use strict";
    var firstLineError;
    try {
      throw new Error();
    } catch (e) {
      firstLineError = e;
    }
    var schedule = require_schedule();
    var Queue = require_queue();
    function Async() {
      this._customScheduler = false;
      this._isTickUsed = false;
      this._lateQueue = new Queue(16);
      this._normalQueue = new Queue(16);
      this._haveDrainedQueues = false;
      var self2 = this;
      this.drainQueues = function() {
        self2._drainQueues();
      };
      this._schedule = schedule;
    }
    Async.prototype.setScheduler = function(fn) {
      var prev = this._schedule;
      this._schedule = fn;
      this._customScheduler = true;
      return prev;
    };
    Async.prototype.hasCustomScheduler = function() {
      return this._customScheduler;
    };
    Async.prototype.haveItemsQueued = function() {
      return this._isTickUsed || this._haveDrainedQueues;
    };
    Async.prototype.fatalError = function(e, isNode2) {
      if (isNode2) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
        process.exit(2);
      } else {
        this.throwLater(e);
      }
    };
    Async.prototype.throwLater = function(fn, arg) {
      if (arguments.length === 1) {
        arg = fn;
        fn = function() {
          throw arg;
        };
      }
      if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
          fn(arg);
        }, 0);
      } else try {
        this._schedule(function() {
          fn(arg);
        });
      } catch (e) {
        throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
      }
    };
    function AsyncInvokeLater(fn, receiver2, arg) {
      this._lateQueue.push(fn, receiver2, arg);
      this._queueTick();
    }
    function AsyncInvoke(fn, receiver2, arg) {
      this._normalQueue.push(fn, receiver2, arg);
      this._queueTick();
    }
    function AsyncSettlePromises(promise) {
      this._normalQueue._pushOne(promise);
      this._queueTick();
    }
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
    function _drainQueue(queue) {
      while (queue.length() > 0) {
        _drainQueueStep(queue);
      }
    }
    function _drainQueueStep(queue) {
      var fn = queue.shift();
      if (typeof fn !== "function") {
        fn._settlePromises();
      } else {
        var receiver2 = queue.shift();
        var arg = queue.shift();
        fn.call(receiver2, arg);
      }
    }
    Async.prototype._drainQueues = function() {
      _drainQueue(this._normalQueue);
      this._reset();
      this._haveDrainedQueues = true;
      _drainQueue(this._lateQueue);
    };
    Async.prototype._queueTick = function() {
      if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
      }
    };
    Async.prototype._reset = function() {
      this._isTickUsed = false;
    };
    module2.exports = Async;
    module2.exports.firstLineError = firstLineError;
  }
});

// ../../node_modules/bluebird/js/release/errors.js
var require_errors = __commonJS({
  "../../node_modules/bluebird/js/release/errors.js"(exports2, module2) {
    "use strict";
    var es52 = require_es5();
    var Objectfreeze = es52.freeze;
    var util = require_util();
    var inherits2 = util.inherits;
    var notEnumerableProp2 = util.notEnumerableProp;
    function subError(nameProperty, defaultMessage) {
      function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp2(
          this,
          "message",
          typeof message === "string" ? message : defaultMessage
        );
        notEnumerableProp2(this, "name", nameProperty);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        } else {
          Error.call(this);
        }
      }
      inherits2(SubError, Error);
      return SubError;
    }
    var _TypeError;
    var _RangeError;
    var Warning = subError("Warning", "warning");
    var CancellationError = subError("CancellationError", "cancellation error");
    var TimeoutError = subError("TimeoutError", "timeout error");
    var AggregateError = subError("AggregateError", "aggregate error");
    try {
      _TypeError = TypeError;
      _RangeError = RangeError;
    } catch (e) {
      _TypeError = subError("TypeError", "type error");
      _RangeError = subError("RangeError", "range error");
    }
    var methods = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" ");
    for (i = 0; i < methods.length; ++i) {
      if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
      }
    }
    var i;
    es52.defineProperty(AggregateError.prototype, "length", {
      value: 0,
      configurable: false,
      writable: true,
      enumerable: true
    });
    AggregateError.prototype["isOperational"] = true;
    var level = 0;
    AggregateError.prototype.toString = function() {
      var indent = Array(level * 4 + 1).join(" ");
      var ret2 = "\n" + indent + "AggregateError of:\n";
      level++;
      indent = Array(level * 4 + 1).join(" ");
      for (var i2 = 0; i2 < this.length; ++i2) {
        var str = this[i2] === this ? "[Circular AggregateError]" : this[i2] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
          lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret2 += str + "\n";
      }
      level--;
      return ret2;
    };
    function OperationalError(message) {
      if (!(this instanceof OperationalError))
        return new OperationalError(message);
      notEnumerableProp2(this, "name", "OperationalError");
      notEnumerableProp2(this, "message", message);
      this.cause = message;
      this["isOperational"] = true;
      if (message instanceof Error) {
        notEnumerableProp2(this, "message", message.message);
        notEnumerableProp2(this, "stack", message.stack);
      } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
    inherits2(OperationalError, Error);
    var errorTypes = Error["__BluebirdErrorTypes__"];
    if (!errorTypes) {
      errorTypes = Objectfreeze({
        CancellationError,
        TimeoutError,
        OperationalError,
        RejectionError: OperationalError,
        AggregateError
      });
      es52.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
    module2.exports = {
      Error,
      TypeError: _TypeError,
      RangeError: _RangeError,
      CancellationError: errorTypes.CancellationError,
      OperationalError: errorTypes.OperationalError,
      TimeoutError: errorTypes.TimeoutError,
      AggregateError: errorTypes.AggregateError,
      Warning
    };
  }
});

// ../../node_modules/bluebird/js/release/thenables.js
var require_thenables = __commonJS({
  "../../node_modules/bluebird/js/release/thenables.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL) {
      var util = require_util();
      var errorObj2 = util.errorObj;
      var isObject2 = util.isObject;
      function tryConvertToPromise(obj2, context) {
        if (isObject2(obj2)) {
          if (obj2 instanceof Promise3) return obj2;
          var then = getThen(obj2);
          if (then === errorObj2) {
            if (context) context._pushContext();
            var ret2 = Promise3.reject(then.e);
            if (context) context._popContext();
            return ret2;
          } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj2)) {
              var ret2 = new Promise3(INTERNAL);
              obj2._then(
                ret2._fulfill,
                ret2._reject,
                void 0,
                ret2,
                null
              );
              return ret2;
            }
            return doThenable(obj2, then, context);
          }
        }
        return obj2;
      }
      function doGetThen(obj2) {
        return obj2.then;
      }
      function getThen(obj2) {
        try {
          return doGetThen(obj2);
        } catch (e) {
          errorObj2.e = e;
          return errorObj2;
        }
      }
      var hasProp = {}.hasOwnProperty;
      function isAnyBluebirdPromise(obj2) {
        try {
          return hasProp.call(obj2, "_promise0");
        } catch (e) {
          return false;
        }
      }
      function doThenable(x, then, context) {
        var promise = new Promise3(INTERNAL);
        var ret2 = promise;
        if (context) context._pushContext();
        promise._captureStackTrace();
        if (context) context._popContext();
        var synchronous = true;
        var result = util.tryCatch(then).call(x, resolve, reject);
        synchronous = false;
        if (promise && result === errorObj2) {
          promise._rejectCallback(result.e, true, true);
          promise = null;
        }
        function resolve(value) {
          if (!promise) return;
          promise._resolveCallback(value);
          promise = null;
        }
        function reject(reason) {
          if (!promise) return;
          promise._rejectCallback(reason, synchronous, true);
          promise = null;
        }
        return ret2;
      }
      return tryConvertToPromise;
    };
  }
});

// ../../node_modules/bluebird/js/release/promise_array.js
var require_promise_array = __commonJS({
  "../../node_modules/bluebird/js/release/promise_array.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
      var util = require_util();
      var isArray = util.isArray;
      function toResolutionValue(val) {
        switch (val) {
          case -2:
            return [];
          case -3:
            return {};
          case -6:
            return /* @__PURE__ */ new Map();
        }
      }
      function PromiseArray(values) {
        var promise = this._promise = new Promise3(INTERNAL);
        if (values instanceof Promise3) {
          promise._propagateFrom(values, 3);
          values.suppressUnhandledRejections();
        }
        promise._setOnCancel(this);
        this._values = values;
        this._length = 0;
        this._totalResolved = 0;
        this._init(void 0, -2);
      }
      util.inherits(PromiseArray, Proxyable);
      PromiseArray.prototype.length = function() {
        return this._length;
      };
      PromiseArray.prototype.promise = function() {
        return this._promise;
      };
      PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
        var values = tryConvertToPromise(this._values, this._promise);
        if (values instanceof Promise3) {
          values = values._target();
          var bitField = values._bitField;
          ;
          this._values = values;
          if ((bitField & 50397184) === 0) {
            this._promise._setAsyncGuaranteed();
            return values._then(
              init,
              this._reject,
              void 0,
              this,
              resolveValueIfEmpty
            );
          } else if ((bitField & 33554432) !== 0) {
            values = values._value();
          } else if ((bitField & 16777216) !== 0) {
            return this._reject(values._reason());
          } else {
            return this._cancel();
          }
        }
        values = util.asArray(values);
        if (values === null) {
          var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)
          ).reason();
          this._promise._rejectCallback(err, false);
          return;
        }
        if (values.length === 0) {
          if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
          } else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
          }
          return;
        }
        this._iterate(values);
      };
      PromiseArray.prototype._iterate = function(values) {
        var len = this.getActualLength(values.length);
        this._length = len;
        this._values = this.shouldCopyValues() ? new Array(len) : this._values;
        var result = this._promise;
        var isResolved = false;
        var bitField = null;
        for (var i = 0; i < len; ++i) {
          var maybePromise = tryConvertToPromise(values[i], result);
          if (maybePromise instanceof Promise3) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
          } else {
            bitField = null;
          }
          if (isResolved) {
            if (bitField !== null) {
              maybePromise.suppressUnhandledRejections();
            }
          } else if (bitField !== null) {
            if ((bitField & 50397184) === 0) {
              maybePromise._proxy(this, i);
              this._values[i] = maybePromise;
            } else if ((bitField & 33554432) !== 0) {
              isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if ((bitField & 16777216) !== 0) {
              isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
              isResolved = this._promiseCancelled(i);
            }
          } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
          }
        }
        if (!isResolved) result._setAsyncGuaranteed();
      };
      PromiseArray.prototype._isResolved = function() {
        return this._values === null;
      };
      PromiseArray.prototype._resolve = function(value) {
        this._values = null;
        this._promise._fulfill(value);
      };
      PromiseArray.prototype._cancel = function() {
        if (this._isResolved() || !this._promise._isCancellable()) return;
        this._values = null;
        this._promise._cancel();
      };
      PromiseArray.prototype._reject = function(reason) {
        this._values = null;
        this._promise._rejectCallback(reason, false);
      };
      PromiseArray.prototype._promiseFulfilled = function(value, index) {
        this._values[index] = value;
        var totalResolved = ++this._totalResolved;
        if (totalResolved >= this._length) {
          this._resolve(this._values);
          return true;
        }
        return false;
      };
      PromiseArray.prototype._promiseCancelled = function() {
        this._cancel();
        return true;
      };
      PromiseArray.prototype._promiseRejected = function(reason) {
        this._totalResolved++;
        this._reject(reason);
        return true;
      };
      PromiseArray.prototype._resultCancelled = function() {
        if (this._isResolved()) return;
        var values = this._values;
        this._cancel();
        if (values instanceof Promise3) {
          values.cancel();
        } else {
          for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise3) {
              values[i].cancel();
            }
          }
        }
      };
      PromiseArray.prototype.shouldCopyValues = function() {
        return true;
      };
      PromiseArray.prototype.getActualLength = function(len) {
        return len;
      };
      return PromiseArray;
    };
  }
});

// ../../node_modules/bluebird/js/release/context.js
var require_context = __commonJS({
  "../../node_modules/bluebird/js/release/context.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3) {
      var longStackTraces = false;
      var contextStack = [];
      Promise3.prototype._promiseCreated = function() {
      };
      Promise3.prototype._pushContext = function() {
      };
      Promise3.prototype._popContext = function() {
        return null;
      };
      Promise3._peekContext = Promise3.prototype._peekContext = function() {
      };
      function Context() {
        this._trace = new Context.CapturedTrace(peekContext());
      }
      Context.prototype._pushContext = function() {
        if (this._trace !== void 0) {
          this._trace._promiseCreated = null;
          contextStack.push(this._trace);
        }
      };
      Context.prototype._popContext = function() {
        if (this._trace !== void 0) {
          var trace = contextStack.pop();
          var ret2 = trace._promiseCreated;
          trace._promiseCreated = null;
          return ret2;
        }
        return null;
      };
      function createContext() {
        if (longStackTraces) return new Context();
      }
      function peekContext() {
        var lastIndex = contextStack.length - 1;
        if (lastIndex >= 0) {
          return contextStack[lastIndex];
        }
        return void 0;
      }
      Context.CapturedTrace = null;
      Context.create = createContext;
      Context.deactivateLongStackTraces = function() {
      };
      Context.activateLongStackTraces = function() {
        var Promise_pushContext = Promise3.prototype._pushContext;
        var Promise_popContext = Promise3.prototype._popContext;
        var Promise_PeekContext = Promise3._peekContext;
        var Promise_peekContext = Promise3.prototype._peekContext;
        var Promise_promiseCreated = Promise3.prototype._promiseCreated;
        Context.deactivateLongStackTraces = function() {
          Promise3.prototype._pushContext = Promise_pushContext;
          Promise3.prototype._popContext = Promise_popContext;
          Promise3._peekContext = Promise_PeekContext;
          Promise3.prototype._peekContext = Promise_peekContext;
          Promise3.prototype._promiseCreated = Promise_promiseCreated;
          longStackTraces = false;
        };
        longStackTraces = true;
        Promise3.prototype._pushContext = Context.prototype._pushContext;
        Promise3.prototype._popContext = Context.prototype._popContext;
        Promise3._peekContext = Promise3.prototype._peekContext = peekContext;
        Promise3.prototype._promiseCreated = function() {
          var ctx = this._peekContext();
          if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
        };
      };
      return Context;
    };
  }
});

// ../../node_modules/bluebird/js/release/debuggability.js
var require_debuggability = __commonJS({
  "../../node_modules/bluebird/js/release/debuggability.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, Context, enableAsyncHooks, disableAsyncHooks) {
      var async = Promise3._async;
      var Warning = require_errors().Warning;
      var util = require_util();
      var es52 = require_es5();
      var canAttachTrace2 = util.canAttachTrace;
      var unhandledRejectionHandled;
      var possiblyUnhandledRejection;
      var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
      var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
      var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
      var stackFramePattern = null;
      var formatStack = null;
      var indentStackFrames = false;
      var printWarning;
      var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && (util.env("BLUEBIRD_DEBUG") || util.env("NODE_ENV") === "development"));
      var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util.env("BLUEBIRD_WARNINGS")));
      var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
      var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
      var deferUnhandledRejectionCheck;
      (function() {
        var promises = [];
        function unhandledRejectionCheck() {
          for (var i = 0; i < promises.length; ++i) {
            promises[i]._notifyUnhandledRejection();
          }
          unhandledRejectionClear();
        }
        function unhandledRejectionClear() {
          promises.length = 0;
        }
        deferUnhandledRejectionCheck = function(promise) {
          promises.push(promise);
          setTimeout(unhandledRejectionCheck, 1);
        };
        es52.defineProperty(Promise3, "_unhandledRejectionCheck", {
          value: unhandledRejectionCheck
        });
        es52.defineProperty(Promise3, "_unhandledRejectionClear", {
          value: unhandledRejectionClear
        });
      })();
      Promise3.prototype.suppressUnhandledRejections = function() {
        var target = this._target();
        target._bitField = target._bitField & ~1048576 | 524288;
      };
      Promise3.prototype._ensurePossibleRejectionHandled = function() {
        if ((this._bitField & 524288) !== 0) return;
        this._setRejectionIsUnhandled();
        deferUnhandledRejectionCheck(this);
      };
      Promise3.prototype._notifyUnhandledRejectionIsHandled = function() {
        fireRejectionEvent(
          "rejectionHandled",
          unhandledRejectionHandled,
          void 0,
          this
        );
      };
      Promise3.prototype._setReturnedNonUndefined = function() {
        this._bitField = this._bitField | 268435456;
      };
      Promise3.prototype._returnedNonUndefined = function() {
        return (this._bitField & 268435456) !== 0;
      };
      Promise3.prototype._notifyUnhandledRejection = function() {
        if (this._isRejectionUnhandled()) {
          var reason = this._settledValue();
          this._setUnhandledRejectionIsNotified();
          fireRejectionEvent(
            "unhandledRejection",
            possiblyUnhandledRejection,
            reason,
            this
          );
        }
      };
      Promise3.prototype._setUnhandledRejectionIsNotified = function() {
        this._bitField = this._bitField | 262144;
      };
      Promise3.prototype._unsetUnhandledRejectionIsNotified = function() {
        this._bitField = this._bitField & ~262144;
      };
      Promise3.prototype._isUnhandledRejectionNotified = function() {
        return (this._bitField & 262144) > 0;
      };
      Promise3.prototype._setRejectionIsUnhandled = function() {
        this._bitField = this._bitField | 1048576;
      };
      Promise3.prototype._unsetRejectionIsUnhandled = function() {
        this._bitField = this._bitField & ~1048576;
        if (this._isUnhandledRejectionNotified()) {
          this._unsetUnhandledRejectionIsNotified();
          this._notifyUnhandledRejectionIsHandled();
        }
      };
      Promise3.prototype._isRejectionUnhandled = function() {
        return (this._bitField & 1048576) > 0;
      };
      Promise3.prototype._warn = function(message, shouldUseOwnTrace, promise) {
        return warn(message, shouldUseOwnTrace, promise || this);
      };
      Promise3.onPossiblyUnhandledRejection = function(fn) {
        var context = Promise3._getContext();
        possiblyUnhandledRejection = util.contextBind(context, fn);
      };
      Promise3.onUnhandledRejectionHandled = function(fn) {
        var context = Promise3._getContext();
        unhandledRejectionHandled = util.contextBind(context, fn);
      };
      var disableLongStackTraces = function() {
      };
      Promise3.longStackTraces = function() {
        if (async.haveItemsQueued() && !config.longStackTraces) {
          throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
        }
        if (!config.longStackTraces && longStackTracesIsSupported()) {
          var Promise_captureStackTrace = Promise3.prototype._captureStackTrace;
          var Promise_attachExtraTrace = Promise3.prototype._attachExtraTrace;
          var Promise_dereferenceTrace = Promise3.prototype._dereferenceTrace;
          config.longStackTraces = true;
          disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
              throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
            }
            Promise3.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise3.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Promise3.prototype._dereferenceTrace = Promise_dereferenceTrace;
            Context.deactivateLongStackTraces();
            config.longStackTraces = false;
          };
          Promise3.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
          Promise3.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
          Promise3.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
          Context.activateLongStackTraces();
        }
      };
      Promise3.hasLongStackTraces = function() {
        return config.longStackTraces && longStackTracesIsSupported();
      };
      var legacyHandlers = {
        unhandledrejection: {
          before: function() {
            var ret2 = util.global.onunhandledrejection;
            util.global.onunhandledrejection = null;
            return ret2;
          },
          after: function(fn) {
            util.global.onunhandledrejection = fn;
          }
        },
        rejectionhandled: {
          before: function() {
            var ret2 = util.global.onrejectionhandled;
            util.global.onrejectionhandled = null;
            return ret2;
          },
          after: function(fn) {
            util.global.onrejectionhandled = fn;
          }
        }
      };
      var fireDomEvent = function() {
        var dispatch = function(legacy, e) {
          if (legacy) {
            var fn;
            try {
              fn = legacy.before();
              return !util.global.dispatchEvent(e);
            } finally {
              legacy.after(fn);
            }
          } else {
            return !util.global.dispatchEvent(e);
          }
        };
        try {
          if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event2) {
              name = name.toLowerCase();
              var eventData = {
                detail: event2,
                cancelable: true
              };
              var domEvent = new CustomEvent(name, eventData);
              es52.defineProperty(
                domEvent,
                "promise",
                { value: event2.promise }
              );
              es52.defineProperty(
                domEvent,
                "reason",
                { value: event2.reason }
              );
              return dispatch(legacyHandlers[name], domEvent);
            };
          } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event2) {
              name = name.toLowerCase();
              var domEvent = new Event(name, {
                cancelable: true
              });
              domEvent.detail = event2;
              es52.defineProperty(domEvent, "promise", { value: event2.promise });
              es52.defineProperty(domEvent, "reason", { value: event2.reason });
              return dispatch(legacyHandlers[name], domEvent);
            };
          } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event2) {
              name = name.toLowerCase();
              var domEvent = document.createEvent("CustomEvent");
              domEvent.initCustomEvent(
                name,
                false,
                true,
                event2
              );
              return dispatch(legacyHandlers[name], domEvent);
            };
          }
        } catch (e) {
        }
        return function() {
          return false;
        };
      }();
      var fireGlobalEvent = function() {
        if (util.isNode) {
          return function() {
            return process.emit.apply(process, arguments);
          };
        } else {
          if (!util.global) {
            return function() {
              return false;
            };
          }
          return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
          };
        }
      }();
      function generatePromiseLifecycleEventObject(name, promise) {
        return { promise };
      }
      var eventToObjectGenerator = {
        promiseCreated: generatePromiseLifecycleEventObject,
        promiseFulfilled: generatePromiseLifecycleEventObject,
        promiseRejected: generatePromiseLifecycleEventObject,
        promiseResolved: generatePromiseLifecycleEventObject,
        promiseCancelled: generatePromiseLifecycleEventObject,
        promiseChained: function(name, promise, child) {
          return { promise, child };
        },
        warning: function(name, warning) {
          return { warning };
        },
        unhandledRejection: function(name, reason, promise) {
          return { reason, promise };
        },
        rejectionHandled: generatePromiseLifecycleEventObject
      };
      var activeFireEvent = function(name) {
        var globalEventFired = false;
        try {
          globalEventFired = fireGlobalEvent.apply(null, arguments);
        } catch (e) {
          async.throwLater(e);
          globalEventFired = true;
        }
        var domEventFired = false;
        try {
          domEventFired = fireDomEvent(
            name,
            eventToObjectGenerator[name].apply(null, arguments)
          );
        } catch (e) {
          async.throwLater(e);
          domEventFired = true;
        }
        return domEventFired || globalEventFired;
      };
      Promise3.config = function(opts) {
        opts = Object(opts);
        if ("longStackTraces" in opts) {
          if (opts.longStackTraces) {
            Promise3.longStackTraces();
          } else if (!opts.longStackTraces && Promise3.hasLongStackTraces()) {
            disableLongStackTraces();
          }
        }
        if ("warnings" in opts) {
          var warningsOption = opts.warnings;
          config.warnings = !!warningsOption;
          wForgottenReturn = config.warnings;
          if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
              wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
          }
        }
        if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
          if (async.haveItemsQueued()) {
            throw new Error(
              "cannot enable cancellation after promises are in use"
            );
          }
          Promise3.prototype._clearCancellationData = cancellationClearCancellationData;
          Promise3.prototype._propagateFrom = cancellationPropagateFrom;
          Promise3.prototype._onCancel = cancellationOnCancel;
          Promise3.prototype._setOnCancel = cancellationSetOnCancel;
          Promise3.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
          Promise3.prototype._execute = cancellationExecute;
          propagateFromFunction = cancellationPropagateFrom;
          config.cancellation = true;
        }
        if ("monitoring" in opts) {
          if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise3.prototype._fireEvent = activeFireEvent;
          } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise3.prototype._fireEvent = defaultFireEvent;
          }
        }
        if ("asyncHooks" in opts && util.nodeSupportsAsyncResource) {
          var prev = config.asyncHooks;
          var cur = !!opts.asyncHooks;
          if (prev !== cur) {
            config.asyncHooks = cur;
            if (cur) {
              enableAsyncHooks();
            } else {
              disableAsyncHooks();
            }
          }
        }
        return Promise3;
      };
      function defaultFireEvent() {
        return false;
      }
      Promise3.prototype._fireEvent = defaultFireEvent;
      Promise3.prototype._execute = function(executor, resolve, reject) {
        try {
          executor(resolve, reject);
        } catch (e) {
          return e;
        }
      };
      Promise3.prototype._onCancel = function() {
      };
      Promise3.prototype._setOnCancel = function(handler) {
        ;
      };
      Promise3.prototype._attachCancellationCallback = function(onCancel) {
        ;
      };
      Promise3.prototype._captureStackTrace = function() {
      };
      Promise3.prototype._attachExtraTrace = function() {
      };
      Promise3.prototype._dereferenceTrace = function() {
      };
      Promise3.prototype._clearCancellationData = function() {
      };
      Promise3.prototype._propagateFrom = function(parent, flags) {
        ;
        ;
      };
      function cancellationExecute(executor, resolve, reject) {
        var promise = this;
        try {
          executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
              throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
          });
        } catch (e) {
          return e;
        }
      }
      function cancellationAttachCancellationCallback(onCancel) {
        if (!this._isCancellable()) return this;
        var previousOnCancel = this._onCancel();
        if (previousOnCancel !== void 0) {
          if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
          } else {
            this._setOnCancel([previousOnCancel, onCancel]);
          }
        } else {
          this._setOnCancel(onCancel);
        }
      }
      function cancellationOnCancel() {
        return this._onCancelField;
      }
      function cancellationSetOnCancel(onCancel) {
        this._onCancelField = onCancel;
      }
      function cancellationClearCancellationData() {
        this._cancellationParent = void 0;
        this._onCancelField = void 0;
      }
      function cancellationPropagateFrom(parent, flags) {
        if ((flags & 1) !== 0) {
          this._cancellationParent = parent;
          var branchesRemainingToCancel = parent._branchesRemainingToCancel;
          if (branchesRemainingToCancel === void 0) {
            branchesRemainingToCancel = 0;
          }
          parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
        }
        if ((flags & 2) !== 0 && parent._isBound()) {
          this._setBoundTo(parent._boundTo);
        }
      }
      function bindingPropagateFrom(parent, flags) {
        if ((flags & 2) !== 0 && parent._isBound()) {
          this._setBoundTo(parent._boundTo);
        }
      }
      var propagateFromFunction = bindingPropagateFrom;
      function boundValueFunction() {
        var ret2 = this._boundTo;
        if (ret2 !== void 0) {
          if (ret2 instanceof Promise3) {
            if (ret2.isFulfilled()) {
              return ret2.value();
            } else {
              return void 0;
            }
          }
        }
        return ret2;
      }
      function longStackTracesCaptureStackTrace() {
        this._trace = new CapturedTrace(this._peekContext());
      }
      function longStackTracesAttachExtraTrace(error, ignoreSelf) {
        if (canAttachTrace2(error)) {
          var trace = this._trace;
          if (trace !== void 0) {
            if (ignoreSelf) trace = trace._parent;
          }
          if (trace !== void 0) {
            trace.attachExtraTrace(error);
          } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(
              error,
              "stack",
              parsed.message + "\n" + parsed.stack.join("\n")
            );
            util.notEnumerableProp(error, "__stackCleaned__", true);
          }
        }
      }
      function longStackTracesDereferenceTrace() {
        this._trace = void 0;
      }
      function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
        if (returnValue === void 0 && promiseCreated !== null && wForgottenReturn) {
          if (parent !== void 0 && parent._returnedNonUndefined()) return;
          if ((promise._bitField & 65535) === 0) return;
          if (name) name = name + " ";
          var handlerLine = "";
          var creatorLine = "";
          if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
              var line = stack[i];
              if (!nodeFramePattern.test(line)) {
                var lineMatches = line.match(parseLinePattern);
                if (lineMatches) {
                  handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                }
                break;
              }
            }
            if (stack.length > 0) {
              var firstUserLine = stack[0];
              for (var i = 0; i < traceLines.length; ++i) {
                if (traceLines[i] === firstUserLine) {
                  if (i > 0) {
                    creatorLine = "\n" + traceLines[i - 1];
                  }
                  break;
                }
              }
            }
          }
          var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, see http://goo.gl/rRqMUw" + creatorLine;
          promise._warn(msg, true, promiseCreated);
        }
      }
      function deprecated(name, replacement) {
        var message = name + " is deprecated and will be removed in a future version.";
        if (replacement) message += " Use " + replacement + " instead.";
        return warn(message);
      }
      function warn(message, shouldUseOwnTrace, promise) {
        if (!config.warnings) return;
        var warning = new Warning(message);
        var ctx;
        if (shouldUseOwnTrace) {
          promise._attachExtraTrace(warning);
        } else if (config.longStackTraces && (ctx = Promise3._peekContext())) {
          ctx.attachExtraTrace(warning);
        } else {
          var parsed = parseStackAndMessage(warning);
          warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
        }
        if (!activeFireEvent("warning", warning)) {
          formatAndLogError(warning, "", true);
        }
      }
      function reconstructStack(message, stacks) {
        for (var i = 0; i < stacks.length - 1; ++i) {
          stacks[i].push("From previous event:");
          stacks[i] = stacks[i].join("\n");
        }
        if (i < stacks.length) {
          stacks[i] = stacks[i].join("\n");
        }
        return message + "\n" + stacks.join("\n");
      }
      function removeDuplicateOrEmptyJumps(stacks) {
        for (var i = 0; i < stacks.length; ++i) {
          if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
            stacks.splice(i, 1);
            i--;
          }
        }
      }
      function removeCommonRoots(stacks) {
        var current = stacks[0];
        for (var i = 1; i < stacks.length; ++i) {
          var prev = stacks[i];
          var currentLastIndex = current.length - 1;
          var currentLastLine = current[currentLastIndex];
          var commonRootMeetPoint = -1;
          for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
              commonRootMeetPoint = j;
              break;
            }
          }
          for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
              current.pop();
              currentLastIndex--;
            } else {
              break;
            }
          }
          current = prev;
        }
      }
      function cleanStack(stack) {
        var ret2 = [];
        for (var i = 0; i < stack.length; ++i) {
          var line = stack[i];
          var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
          var isInternalFrame = isTraceLine && shouldIgnore(line);
          if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
              line = "    " + line;
            }
            ret2.push(line);
          }
        }
        return ret2;
      }
      function stackFramesAsArray(error) {
        var stack = error.stack.replace(/\s+$/g, "").split("\n");
        for (var i = 0; i < stack.length; ++i) {
          var line = stack[i];
          if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
          }
        }
        if (i > 0 && error.name != "SyntaxError") {
          stack = stack.slice(i);
        }
        return stack;
      }
      function parseStackAndMessage(error) {
        var stack = error.stack;
        var message = error.toString();
        stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
        return {
          message,
          stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
        };
      }
      function formatAndLogError(error, title, isSoft) {
        if (typeof console !== "undefined") {
          var message;
          if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
          } else {
            message = title + String(error);
          }
          if (typeof printWarning === "function") {
            printWarning(message, isSoft);
          } else if (typeof console.log === "function" || typeof console.log === "object") {
            console.log(message);
          }
        }
      }
      function fireRejectionEvent(name, localHandler, reason, promise) {
        var localEventFired = false;
        try {
          if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
              localHandler(promise);
            } else {
              localHandler(reason, promise);
            }
          }
        } catch (e) {
          async.throwLater(e);
        }
        if (name === "unhandledRejection") {
          if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
          }
        } else {
          activeFireEvent(name, promise);
        }
      }
      function formatNonError(obj2) {
        var str;
        if (typeof obj2 === "function") {
          str = "[function " + (obj2.name || "anonymous") + "]";
        } else {
          str = obj2 && typeof obj2.toString === "function" ? obj2.toString() : util.toString(obj2);
          var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
          if (ruselessToString.test(str)) {
            try {
              var newStr = JSON.stringify(obj2);
              str = newStr;
            } catch (e) {
            }
          }
          if (str.length === 0) {
            str = "(empty array)";
          }
        }
        return "(<" + snip(str) + ">, no stack trace)";
      }
      function snip(str) {
        var maxChars = 41;
        if (str.length < maxChars) {
          return str;
        }
        return str.substr(0, maxChars - 3) + "...";
      }
      function longStackTracesIsSupported() {
        return typeof captureStackTrace === "function";
      }
      var shouldIgnore = function() {
        return false;
      };
      var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
      function parseLineInfo(line) {
        var matches = line.match(parseLineInfoRegex);
        if (matches) {
          return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
          };
        }
      }
      function setBounds(firstLineError, lastLineError) {
        if (!longStackTracesIsSupported()) return;
        var firstStackLines = (firstLineError.stack || "").split("\n");
        var lastStackLines = (lastLineError.stack || "").split("\n");
        var firstIndex = -1;
        var lastIndex = -1;
        var firstFileName;
        var lastFileName;
        for (var i = 0; i < firstStackLines.length; ++i) {
          var result = parseLineInfo(firstStackLines[i]);
          if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
          }
        }
        for (var i = 0; i < lastStackLines.length; ++i) {
          var result = parseLineInfo(lastStackLines[i]);
          if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
          }
        }
        if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
          return;
        }
        shouldIgnore = function(line) {
          if (bluebirdFramePattern.test(line)) return true;
          var info = parseLineInfo(line);
          if (info) {
            if (info.fileName === firstFileName && (firstIndex <= info.line && info.line <= lastIndex)) {
              return true;
            }
          }
          return false;
        };
      }
      function CapturedTrace(parent) {
        this._parent = parent;
        this._promisesCreated = 0;
        var length = this._length = 1 + (parent === void 0 ? 0 : parent._length);
        captureStackTrace(this, CapturedTrace);
        if (length > 32) this.uncycle();
      }
      util.inherits(CapturedTrace, Error);
      Context.CapturedTrace = CapturedTrace;
      CapturedTrace.prototype.uncycle = function() {
        var length = this._length;
        if (length < 2) return;
        var nodes = [];
        var stackToIndex = {};
        for (var i = 0, node = this; node !== void 0; ++i) {
          nodes.push(node);
          node = node._parent;
        }
        length = this._length = i;
        for (var i = length - 1; i >= 0; --i) {
          var stack = nodes[i].stack;
          if (stackToIndex[stack] === void 0) {
            stackToIndex[stack] = i;
          }
        }
        for (var i = 0; i < length; ++i) {
          var currentStack = nodes[i].stack;
          var index = stackToIndex[currentStack];
          if (index !== void 0 && index !== i) {
            if (index > 0) {
              nodes[index - 1]._parent = void 0;
              nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = void 0;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
            if (index < length - 1) {
              cycleEdgeNode._parent = nodes[index + 1];
              cycleEdgeNode._parent.uncycle();
              cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
            } else {
              cycleEdgeNode._parent = void 0;
              cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
              nodes[j]._length = currentChildLength;
              currentChildLength++;
            }
            return;
          }
        }
      };
      CapturedTrace.prototype.attachExtraTrace = function(error) {
        if (error.__stackCleaned__) return;
        this.uncycle();
        var parsed = parseStackAndMessage(error);
        var message = parsed.message;
        var stacks = [parsed.stack];
        var trace = this;
        while (trace !== void 0) {
          stacks.push(cleanStack(trace.stack.split("\n")));
          trace = trace._parent;
        }
        removeCommonRoots(stacks);
        removeDuplicateOrEmptyJumps(stacks);
        util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
        util.notEnumerableProp(error, "__stackCleaned__", true);
      };
      var captureStackTrace = function stackDetection() {
        var v8stackFramePattern = /^\s*at\s*/;
        var v8stackFormatter = function(stack, error) {
          if (typeof stack === "string") return stack;
          if (error.name !== void 0 && error.message !== void 0) {
            return error.toString();
          }
          return formatNonError(error);
        };
        if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
          Error.stackTraceLimit += 6;
          stackFramePattern = v8stackFramePattern;
          formatStack = v8stackFormatter;
          var captureStackTrace2 = Error.captureStackTrace;
          shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
          };
          return function(receiver2, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace2(receiver2, ignoreUntil);
            Error.stackTraceLimit -= 6;
          };
        }
        var err = new Error();
        if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
          stackFramePattern = /@/;
          formatStack = v8stackFormatter;
          indentStackFrames = true;
          return function captureStackTrace3(o) {
            o.stack = new Error().stack;
          };
        }
        var hasStackAfterThrow;
        try {
          throw new Error();
        } catch (e) {
          hasStackAfterThrow = "stack" in e;
        }
        if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
          stackFramePattern = v8stackFramePattern;
          formatStack = v8stackFormatter;
          return function captureStackTrace3(o) {
            Error.stackTraceLimit += 6;
            try {
              throw new Error();
            } catch (e) {
              o.stack = e.stack;
            }
            Error.stackTraceLimit -= 6;
          };
        }
        formatStack = function(stack, error) {
          if (typeof stack === "string") return stack;
          if ((typeof error === "object" || typeof error === "function") && error.name !== void 0 && error.message !== void 0) {
            return error.toString();
          }
          return formatNonError(error);
        };
        return null;
      }([]);
      if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
        printWarning = function(message) {
          console.warn(message);
        };
        if (util.isNode && process.stderr.isTTY) {
          printWarning = function(message, isSoft) {
            var color = isSoft ? "\x1B[33m" : "\x1B[31m";
            console.warn(color + message + "\x1B[0m\n");
          };
        } else if (!util.isNode && typeof new Error().stack === "string") {
          printWarning = function(message, isSoft) {
            console.warn(
              "%c" + message,
              isSoft ? "color: darkorange" : "color: red"
            );
          };
        }
      }
      var config = {
        warnings,
        longStackTraces: false,
        cancellation: false,
        monitoring: false,
        asyncHooks: false
      };
      if (longStackTraces) Promise3.longStackTraces();
      return {
        asyncHooks: function() {
          return config.asyncHooks;
        },
        longStackTraces: function() {
          return config.longStackTraces;
        },
        warnings: function() {
          return config.warnings;
        },
        cancellation: function() {
          return config.cancellation;
        },
        monitoring: function() {
          return config.monitoring;
        },
        propagateFromFunction: function() {
          return propagateFromFunction;
        },
        boundValueFunction: function() {
          return boundValueFunction;
        },
        checkForgottenReturns,
        setBounds,
        warn,
        deprecated,
        CapturedTrace,
        fireDomEvent,
        fireGlobalEvent
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/catch_filter.js
var require_catch_filter = __commonJS({
  "../../node_modules/bluebird/js/release/catch_filter.js"(exports2, module2) {
    "use strict";
    module2.exports = function(NEXT_FILTER) {
      var util = require_util();
      var getKeys = require_es5().keys;
      var tryCatch2 = util.tryCatch;
      var errorObj2 = util.errorObj;
      function catchFilter(instances, cb, promise) {
        return function(e) {
          var boundTo = promise._boundValue();
          predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];
            if (item === Error || item != null && item.prototype instanceof Error) {
              if (e instanceof item) {
                return tryCatch2(cb).call(boundTo, e);
              }
            } else if (typeof item === "function") {
              var matchesPredicate = tryCatch2(item).call(boundTo, e);
              if (matchesPredicate === errorObj2) {
                return matchesPredicate;
              } else if (matchesPredicate) {
                return tryCatch2(cb).call(boundTo, e);
              }
            } else if (util.isObject(e)) {
              var keys = getKeys(item);
              for (var j = 0; j < keys.length; ++j) {
                var key = keys[j];
                if (item[key] != e[key]) {
                  continue predicateLoop;
                }
              }
              return tryCatch2(cb).call(boundTo, e);
            }
          }
          return NEXT_FILTER;
        };
      }
      return catchFilter;
    };
  }
});

// ../../node_modules/bluebird/js/release/finally.js
var require_finally = __commonJS({
  "../../node_modules/bluebird/js/release/finally.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, tryConvertToPromise, NEXT_FILTER) {
      var util = require_util();
      var CancellationError = Promise3.CancellationError;
      var errorObj2 = util.errorObj;
      var catchFilter = require_catch_filter()(NEXT_FILTER);
      function PassThroughHandlerContext(promise, type, handler) {
        this.promise = promise;
        this.type = type;
        this.handler = handler;
        this.called = false;
        this.cancelPromise = null;
      }
      PassThroughHandlerContext.prototype.isFinallyHandler = function() {
        return this.type === 0;
      };
      function FinallyHandlerCancelReaction(finallyHandler2) {
        this.finallyHandler = finallyHandler2;
      }
      FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
        checkCancel(this.finallyHandler);
      };
      function checkCancel(ctx, reason) {
        if (ctx.cancelPromise != null) {
          if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
          } else {
            ctx.cancelPromise._cancel();
          }
          ctx.cancelPromise = null;
          return true;
        }
        return false;
      }
      function succeed() {
        return finallyHandler.call(this, this.promise._target()._settledValue());
      }
      function fail(reason) {
        if (checkCancel(this, reason)) return;
        errorObj2.e = reason;
        return errorObj2;
      }
      function finallyHandler(reasonOrValue) {
        var promise = this.promise;
        var handler = this.handler;
        if (!this.called) {
          this.called = true;
          var ret2 = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
          if (ret2 === NEXT_FILTER) {
            return ret2;
          } else if (ret2 !== void 0) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret2, promise);
            if (maybePromise instanceof Promise3) {
              if (this.cancelPromise != null) {
                if (maybePromise._isCancelled()) {
                  var reason = new CancellationError("late cancellation observer");
                  promise._attachExtraTrace(reason);
                  errorObj2.e = reason;
                  return errorObj2;
                } else if (maybePromise.isPending()) {
                  maybePromise._attachCancellationCallback(
                    new FinallyHandlerCancelReaction(this)
                  );
                }
              }
              return maybePromise._then(
                succeed,
                fail,
                void 0,
                this,
                void 0
              );
            }
          }
        }
        if (promise.isRejected()) {
          checkCancel(this);
          errorObj2.e = reasonOrValue;
          return errorObj2;
        } else {
          checkCancel(this);
          return reasonOrValue;
        }
      }
      Promise3.prototype._passThrough = function(handler, type, success, fail2) {
        if (typeof handler !== "function") return this.then();
        return this._then(
          success,
          fail2,
          void 0,
          new PassThroughHandlerContext(this, type, handler),
          void 0
        );
      };
      Promise3.prototype.lastly = Promise3.prototype["finally"] = function(handler) {
        return this._passThrough(
          handler,
          0,
          finallyHandler,
          finallyHandler
        );
      };
      Promise3.prototype.tap = function(handler) {
        return this._passThrough(handler, 1, finallyHandler);
      };
      Promise3.prototype.tapCatch = function(handlerOrPredicate) {
        var len = arguments.length;
        if (len === 1) {
          return this._passThrough(
            handlerOrPredicate,
            1,
            void 0,
            finallyHandler
          );
        } else {
          var catchInstances = new Array(len - 1), j = 0, i;
          for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
              catchInstances[j++] = item;
            } else {
              return Promise3.reject(new TypeError(
                "tapCatch statement predicate: expecting an object but got " + util.classString(item)
              ));
            }
          }
          catchInstances.length = j;
          var handler = arguments[i];
          return this._passThrough(
            catchFilter(catchInstances, handler, this),
            1,
            void 0,
            finallyHandler
          );
        }
      };
      return PassThroughHandlerContext;
    };
  }
});

// ../../node_modules/bluebird/js/release/nodeback.js
var require_nodeback = __commonJS({
  "../../node_modules/bluebird/js/release/nodeback.js"(exports2, module2) {
    "use strict";
    var util = require_util();
    var maybeWrapAsError2 = util.maybeWrapAsError;
    var errors = require_errors();
    var OperationalError = errors.OperationalError;
    var es52 = require_es5();
    function isUntypedError(obj2) {
      return obj2 instanceof Error && es52.getPrototypeOf(obj2) === Error.prototype;
    }
    var rErrorKey = /^(?:name|message|stack|cause)$/;
    function wrapAsOperationalError(obj2) {
      var ret2;
      if (isUntypedError(obj2)) {
        ret2 = new OperationalError(obj2);
        ret2.name = obj2.name;
        ret2.message = obj2.message;
        ret2.stack = obj2.stack;
        var keys = es52.keys(obj2);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (!rErrorKey.test(key)) {
            ret2[key] = obj2[key];
          }
        }
        return ret2;
      }
      util.markAsOriginatingFromRejection(obj2);
      return obj2;
    }
    function nodebackForPromise(promise, multiArgs) {
      return function(err, value) {
        if (promise === null) return;
        if (err) {
          var wrapped = wrapAsOperationalError(maybeWrapAsError2(err));
          promise._attachExtraTrace(wrapped);
          promise._reject(wrapped);
        } else if (!multiArgs) {
          promise._fulfill(value);
        } else {
          var $_len = arguments.length;
          var args = new Array(Math.max($_len - 1, 0));
          for (var $_i = 1; $_i < $_len; ++$_i) {
            args[$_i - 1] = arguments[$_i];
          }
          ;
          promise._fulfill(args);
        }
        promise = null;
      };
    }
    module2.exports = nodebackForPromise;
  }
});

// ../../node_modules/bluebird/js/release/method.js
var require_method = __commonJS({
  "../../node_modules/bluebird/js/release/method.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL, tryConvertToPromise, apiRejection, debug) {
      var util = require_util();
      var tryCatch2 = util.tryCatch;
      Promise3.method = function(fn) {
        if (typeof fn !== "function") {
          throw new Promise3.TypeError("expecting a function but got " + util.classString(fn));
        }
        return function() {
          var ret2 = new Promise3(INTERNAL);
          ret2._captureStackTrace();
          ret2._pushContext();
          var value = tryCatch2(fn).apply(this, arguments);
          var promiseCreated = ret2._popContext();
          debug.checkForgottenReturns(
            value,
            promiseCreated,
            "Promise.method",
            ret2
          );
          ret2._resolveFromSyncValue(value);
          return ret2;
        };
      };
      Promise3.attempt = Promise3["try"] = function(fn) {
        if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var ret2 = new Promise3(INTERNAL);
        ret2._captureStackTrace();
        ret2._pushContext();
        var value;
        if (arguments.length > 1) {
          debug.deprecated("calling Promise.try with more than 1 argument");
          var arg = arguments[1];
          var ctx = arguments[2];
          value = util.isArray(arg) ? tryCatch2(fn).apply(ctx, arg) : tryCatch2(fn).call(ctx, arg);
        } else {
          value = tryCatch2(fn)();
        }
        var promiseCreated = ret2._popContext();
        debug.checkForgottenReturns(
          value,
          promiseCreated,
          "Promise.try",
          ret2
        );
        ret2._resolveFromSyncValue(value);
        return ret2;
      };
      Promise3.prototype._resolveFromSyncValue = function(value) {
        if (value === util.errorObj) {
          this._rejectCallback(value.e, false);
        } else {
          this._resolveCallback(value, true);
        }
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/bind.js
var require_bind = __commonJS({
  "../../node_modules/bluebird/js/release/bind.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL, tryConvertToPromise, debug) {
      var calledBind = false;
      var rejectThis = function(_, e) {
        this._reject(e);
      };
      var targetRejected = function(e, context) {
        context.promiseRejectionQueued = true;
        context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
      };
      var bindingResolved = function(thisArg, context) {
        if ((this._bitField & 50397184) === 0) {
          this._resolveCallback(context.target);
        }
      };
      var bindingRejected = function(e, context) {
        if (!context.promiseRejectionQueued) this._reject(e);
      };
      Promise3.prototype.bind = function(thisArg) {
        if (!calledBind) {
          calledBind = true;
          Promise3.prototype._propagateFrom = debug.propagateFromFunction();
          Promise3.prototype._boundValue = debug.boundValueFunction();
        }
        var maybePromise = tryConvertToPromise(thisArg);
        var ret2 = new Promise3(INTERNAL);
        ret2._propagateFrom(this, 1);
        var target = this._target();
        ret2._setBoundTo(maybePromise);
        if (maybePromise instanceof Promise3) {
          var context = {
            promiseRejectionQueued: false,
            promise: ret2,
            target,
            bindingPromise: maybePromise
          };
          target._then(INTERNAL, targetRejected, void 0, ret2, context);
          maybePromise._then(
            bindingResolved,
            bindingRejected,
            void 0,
            ret2,
            context
          );
          ret2._setOnCancel(maybePromise);
        } else {
          ret2._resolveCallback(target);
        }
        return ret2;
      };
      Promise3.prototype._setBoundTo = function(obj2) {
        if (obj2 !== void 0) {
          this._bitField = this._bitField | 2097152;
          this._boundTo = obj2;
        } else {
          this._bitField = this._bitField & ~2097152;
        }
      };
      Promise3.prototype._isBound = function() {
        return (this._bitField & 2097152) === 2097152;
      };
      Promise3.bind = function(thisArg, value) {
        return Promise3.resolve(value).bind(thisArg);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/cancel.js
var require_cancel = __commonJS({
  "../../node_modules/bluebird/js/release/cancel.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, PromiseArray, apiRejection, debug) {
      var util = require_util();
      var tryCatch2 = util.tryCatch;
      var errorObj2 = util.errorObj;
      var async = Promise3._async;
      Promise3.prototype["break"] = Promise3.prototype.cancel = function() {
        if (!debug.cancellation()) return this._warn("cancellation is disabled");
        var promise = this;
        var child = promise;
        while (promise._isCancellable()) {
          if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
              child._followee().cancel();
            } else {
              child._cancelBranched();
            }
            break;
          }
          var parent = promise._cancellationParent;
          if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
              promise._followee().cancel();
            } else {
              promise._cancelBranched();
            }
            break;
          } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
          }
        }
      };
      Promise3.prototype._branchHasCancelled = function() {
        this._branchesRemainingToCancel--;
      };
      Promise3.prototype._enoughBranchesHaveCancelled = function() {
        return this._branchesRemainingToCancel === void 0 || this._branchesRemainingToCancel <= 0;
      };
      Promise3.prototype._cancelBy = function(canceller) {
        if (canceller === this) {
          this._branchesRemainingToCancel = 0;
          this._invokeOnCancel();
          return true;
        } else {
          this._branchHasCancelled();
          if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
          }
        }
        return false;
      };
      Promise3.prototype._cancelBranched = function() {
        if (this._enoughBranchesHaveCancelled()) {
          this._cancel();
        }
      };
      Promise3.prototype._cancel = function() {
        if (!this._isCancellable()) return;
        this._setCancelled();
        async.invoke(this._cancelPromises, this, void 0);
      };
      Promise3.prototype._cancelPromises = function() {
        if (this._length() > 0) this._settlePromises();
      };
      Promise3.prototype._unsetOnCancel = function() {
        this._onCancelField = void 0;
      };
      Promise3.prototype._isCancellable = function() {
        return this.isPending() && !this._isCancelled();
      };
      Promise3.prototype.isCancellable = function() {
        return this.isPending() && !this.isCancelled();
      };
      Promise3.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
        if (util.isArray(onCancelCallback)) {
          for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
          }
        } else if (onCancelCallback !== void 0) {
          if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
              var e = tryCatch2(onCancelCallback).call(this._boundValue());
              if (e === errorObj2) {
                this._attachExtraTrace(e.e);
                async.throwLater(e.e);
              }
            }
          } else {
            onCancelCallback._resultCancelled(this);
          }
        }
      };
      Promise3.prototype._invokeOnCancel = function() {
        var onCancelCallback = this._onCancel();
        this._unsetOnCancel();
        async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
      };
      Promise3.prototype._invokeInternalOnCancel = function() {
        if (this._isCancellable()) {
          this._doInvokeOnCancel(this._onCancel(), true);
          this._unsetOnCancel();
        }
      };
      Promise3.prototype._resultCancelled = function() {
        this.cancel();
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/direct_resolve.js
var require_direct_resolve = __commonJS({
  "../../node_modules/bluebird/js/release/direct_resolve.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3) {
      function returner() {
        return this.value;
      }
      function thrower2() {
        throw this.reason;
      }
      Promise3.prototype["return"] = Promise3.prototype.thenReturn = function(value) {
        if (value instanceof Promise3) value.suppressUnhandledRejections();
        return this._then(
          returner,
          void 0,
          void 0,
          { value },
          void 0
        );
      };
      Promise3.prototype["throw"] = Promise3.prototype.thenThrow = function(reason) {
        return this._then(
          thrower2,
          void 0,
          void 0,
          { reason },
          void 0
        );
      };
      Promise3.prototype.catchThrow = function(reason) {
        if (arguments.length <= 1) {
          return this._then(
            void 0,
            thrower2,
            void 0,
            { reason },
            void 0
          );
        } else {
          var _reason = arguments[1];
          var handler = function() {
            throw _reason;
          };
          return this.caught(reason, handler);
        }
      };
      Promise3.prototype.catchReturn = function(value) {
        if (arguments.length <= 1) {
          if (value instanceof Promise3) value.suppressUnhandledRejections();
          return this._then(
            void 0,
            returner,
            void 0,
            { value },
            void 0
          );
        } else {
          var _value = arguments[1];
          if (_value instanceof Promise3) _value.suppressUnhandledRejections();
          var handler = function() {
            return _value;
          };
          return this.caught(value, handler);
        }
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/synchronous_inspection.js
var require_synchronous_inspection = __commonJS({
  "../../node_modules/bluebird/js/release/synchronous_inspection.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3) {
      function PromiseInspection(promise) {
        if (promise !== void 0) {
          promise = promise._target();
          this._bitField = promise._bitField;
          this._settledValueField = promise._isFateSealed() ? promise._settledValue() : void 0;
        } else {
          this._bitField = 0;
          this._settledValueField = void 0;
        }
      }
      PromiseInspection.prototype._settledValue = function() {
        return this._settledValueField;
      };
      var value = PromiseInspection.prototype.value = function() {
        if (!this.isFulfilled()) {
          throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
        }
        return this._settledValue();
      };
      var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function() {
        if (!this.isRejected()) {
          throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
        }
        return this._settledValue();
      };
      var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
        return (this._bitField & 33554432) !== 0;
      };
      var isRejected = PromiseInspection.prototype.isRejected = function() {
        return (this._bitField & 16777216) !== 0;
      };
      var isPending = PromiseInspection.prototype.isPending = function() {
        return (this._bitField & 50397184) === 0;
      };
      var isResolved = PromiseInspection.prototype.isResolved = function() {
        return (this._bitField & 50331648) !== 0;
      };
      PromiseInspection.prototype.isCancelled = function() {
        return (this._bitField & 8454144) !== 0;
      };
      Promise3.prototype.__isCancelled = function() {
        return (this._bitField & 65536) === 65536;
      };
      Promise3.prototype._isCancelled = function() {
        return this._target().__isCancelled();
      };
      Promise3.prototype.isCancelled = function() {
        return (this._target()._bitField & 8454144) !== 0;
      };
      Promise3.prototype.isPending = function() {
        return isPending.call(this._target());
      };
      Promise3.prototype.isRejected = function() {
        return isRejected.call(this._target());
      };
      Promise3.prototype.isFulfilled = function() {
        return isFulfilled.call(this._target());
      };
      Promise3.prototype.isResolved = function() {
        return isResolved.call(this._target());
      };
      Promise3.prototype.value = function() {
        return value.call(this._target());
      };
      Promise3.prototype.reason = function() {
        var target = this._target();
        target._unsetRejectionIsUnhandled();
        return reason.call(target);
      };
      Promise3.prototype._value = function() {
        return this._settledValue();
      };
      Promise3.prototype._reason = function() {
        this._unsetRejectionIsUnhandled();
        return this._settledValue();
      };
      Promise3.PromiseInspection = PromiseInspection;
    };
  }
});

// ../../node_modules/bluebird/js/release/join.js
var require_join = __commonJS({
  "../../node_modules/bluebird/js/release/join.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, PromiseArray, tryConvertToPromise, INTERNAL, async) {
      var util = require_util();
      var canEvaluate2 = util.canEvaluate;
      var tryCatch2 = util.tryCatch;
      var errorObj2 = util.errorObj;
      var reject;
      if (true) {
        if (canEvaluate2) {
          var thenCallback = function(i2) {
            return new Function("value", "holder", "                             \n            'use strict';                                                    \n            holder.pIndex = value;                                           \n            holder.checkFulfillment(this);                                   \n            ".replace(/Index/g, i2));
          };
          var promiseSetter = function(i2) {
            return new Function("promise", "holder", "                           \n            'use strict';                                                    \n            holder.pIndex = promise;                                         \n            ".replace(/Index/g, i2));
          };
          var generateHolderClass = function(total) {
            var props = new Array(total);
            for (var i2 = 0; i2 < props.length; ++i2) {
              props[i2] = "this.p" + (i2 + 1);
            }
            var assignment = props.join(" = ") + " = null;";
            var cancellationCode = "var promise;\n" + props.map(function(prop) {
              return "                                                         \n                promise = " + prop + ";                                      \n                if (promise instanceof Promise) {                            \n                    promise.cancel();                                        \n                }                                                            \n            ";
            }).join("\n");
            var passedArguments = props.join(", ");
            var name = "Holder$" + total;
            var code = "return function(tryCatch, errorObj, Promise, async) {    \n            'use strict';                                                    \n            function [TheName](fn) {                                         \n                [TheProperties]                                              \n                this.fn = fn;                                                \n                this.asyncNeeded = true;                                     \n                this.now = 0;                                                \n            }                                                                \n                                                                             \n            [TheName].prototype._callFunction = function(promise) {          \n                promise._pushContext();                                      \n                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n                promise._popContext();                                       \n                if (ret === errorObj) {                                      \n                    promise._rejectCallback(ret.e, false);                   \n                } else {                                                     \n                    promise._resolveCallback(ret);                           \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype.checkFulfillment = function(promise) {       \n                var now = ++this.now;                                        \n                if (now === [TheTotal]) {                                    \n                    if (this.asyncNeeded) {                                  \n                        async.invoke(this._callFunction, this, promise);     \n                    } else {                                                 \n                        this._callFunction(promise);                         \n                    }                                                        \n                                                                             \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype._resultCancelled = function() {              \n                [CancellationCode]                                           \n            };                                                               \n                                                                             \n            return [TheName];                                                \n        }(tryCatch, errorObj, Promise, async);                               \n        ";
            code = code.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);
            return new Function("tryCatch", "errorObj", "Promise", "async", code)(tryCatch2, errorObj2, Promise3, async);
          };
          var holderClasses = [];
          var thenCallbacks = [];
          var promiseSetters = [];
          for (var i = 0; i < 8; ++i) {
            holderClasses.push(generateHolderClass(i + 1));
            thenCallbacks.push(thenCallback(i + 1));
            promiseSetters.push(promiseSetter(i + 1));
          }
          reject = function(reason) {
            this._reject(reason);
          };
        }
      }
      Promise3.join = function() {
        var last = arguments.length - 1;
        var fn;
        if (last > 0 && typeof arguments[last] === "function") {
          fn = arguments[last];
          if (true) {
            if (last <= 8 && canEvaluate2) {
              var ret2 = new Promise3(INTERNAL);
              ret2._captureStackTrace();
              var HolderClass = holderClasses[last - 1];
              var holder = new HolderClass(fn);
              var callbacks = thenCallbacks;
              for (var i2 = 0; i2 < last; ++i2) {
                var maybePromise = tryConvertToPromise(arguments[i2], ret2);
                if (maybePromise instanceof Promise3) {
                  maybePromise = maybePromise._target();
                  var bitField = maybePromise._bitField;
                  ;
                  if ((bitField & 50397184) === 0) {
                    maybePromise._then(
                      callbacks[i2],
                      reject,
                      void 0,
                      ret2,
                      holder
                    );
                    promiseSetters[i2](maybePromise, holder);
                    holder.asyncNeeded = false;
                  } else if ((bitField & 33554432) !== 0) {
                    callbacks[i2].call(
                      ret2,
                      maybePromise._value(),
                      holder
                    );
                  } else if ((bitField & 16777216) !== 0) {
                    ret2._reject(maybePromise._reason());
                  } else {
                    ret2._cancel();
                  }
                } else {
                  callbacks[i2].call(ret2, maybePromise, holder);
                }
              }
              if (!ret2._isFateSealed()) {
                if (holder.asyncNeeded) {
                  var context = Promise3._getContext();
                  holder.fn = util.contextBind(context, holder.fn);
                }
                ret2._setAsyncGuaranteed();
                ret2._setOnCancel(holder);
              }
              return ret2;
            }
          }
        }
        var $_len = arguments.length;
        var args = new Array($_len);
        for (var $_i = 0; $_i < $_len; ++$_i) {
          args[$_i] = arguments[$_i];
        }
        ;
        if (fn) args.pop();
        var ret2 = new PromiseArray(args).promise();
        return fn !== void 0 ? ret2.spread(fn) : ret2;
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/call_get.js
var require_call_get = __commonJS({
  "../../node_modules/bluebird/js/release/call_get.js"(exports2, module2) {
    "use strict";
    var cr = Object.create;
    if (cr) {
      callerCache = cr(null);
      getterCache = cr(null);
      callerCache[" size"] = getterCache[" size"] = 0;
    }
    var callerCache;
    var getterCache;
    module2.exports = function(Promise3) {
      var util = require_util();
      var canEvaluate2 = util.canEvaluate;
      var isIdentifier2 = util.isIdentifier;
      var getMethodCaller;
      var getGetter;
      if (true) {
        var makeMethodCaller = function(methodName) {
          return new Function("ensureMethod", "                                    \n        return function(obj) {                                               \n            'use strict'                                                     \n            var len = this.length;                                           \n            ensureMethod(obj, 'methodName');                                 \n            switch(len) {                                                    \n                case 1: return obj.methodName(this[0]);                      \n                case 2: return obj.methodName(this[0], this[1]);             \n                case 3: return obj.methodName(this[0], this[1], this[2]);    \n                case 0: return obj.methodName();                             \n                default:                                                     \n                    return obj.methodName.apply(obj, this);                  \n            }                                                                \n        };                                                                   \n        ".replace(/methodName/g, methodName))(ensureMethod);
        };
        var makeGetter = function(propertyName) {
          return new Function("obj", "                                             \n        'use strict';                                                        \n        return obj.propertyName;                                             \n        ".replace("propertyName", propertyName));
        };
        var getCompiled = function(name, compiler, cache) {
          var ret2 = cache[name];
          if (typeof ret2 !== "function") {
            if (!isIdentifier2(name)) {
              return null;
            }
            ret2 = compiler(name);
            cache[name] = ret2;
            cache[" size"]++;
            if (cache[" size"] > 512) {
              var keys = Object.keys(cache);
              for (var i = 0; i < 256; ++i) delete cache[keys[i]];
              cache[" size"] = keys.length - 256;
            }
          }
          return ret2;
        };
        getMethodCaller = function(name) {
          return getCompiled(name, makeMethodCaller, callerCache);
        };
        getGetter = function(name) {
          return getCompiled(name, makeGetter, getterCache);
        };
      }
      function ensureMethod(obj2, methodName) {
        var fn;
        if (obj2 != null) fn = obj2[methodName];
        if (typeof fn !== "function") {
          var message = "Object " + util.classString(obj2) + " has no method '" + util.toString(methodName) + "'";
          throw new Promise3.TypeError(message);
        }
        return fn;
      }
      function caller(obj2) {
        var methodName = this.pop();
        var fn = ensureMethod(obj2, methodName);
        return fn.apply(obj2, this);
      }
      Promise3.prototype.call = function(methodName) {
        var $_len = arguments.length;
        var args = new Array(Math.max($_len - 1, 0));
        for (var $_i = 1; $_i < $_len; ++$_i) {
          args[$_i - 1] = arguments[$_i];
        }
        ;
        if (true) {
          if (canEvaluate2) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
              return this._then(
                maybeCaller,
                void 0,
                void 0,
                args,
                void 0
              );
            }
          }
        }
        args.push(methodName);
        return this._then(caller, void 0, void 0, args, void 0);
      };
      function namedGetter(obj2) {
        return obj2[this];
      }
      function indexedGetter(obj2) {
        var index = +this;
        if (index < 0) index = Math.max(0, index + obj2.length);
        return obj2[index];
      }
      Promise3.prototype.get = function(propertyName) {
        var isIndex = typeof propertyName === "number";
        var getter;
        if (!isIndex) {
          if (canEvaluate2) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
          } else {
            getter = namedGetter;
          }
        } else {
          getter = indexedGetter;
        }
        return this._then(getter, void 0, void 0, propertyName, void 0);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/generators.js
var require_generators = __commonJS({
  "../../node_modules/bluebird/js/release/generators.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
      var errors = require_errors();
      var TypeError2 = errors.TypeError;
      var util = require_util();
      var errorObj2 = util.errorObj;
      var tryCatch2 = util.tryCatch;
      var yieldHandlers = [];
      function promiseFromYieldHandler(value, yieldHandlers2, traceParent) {
        for (var i = 0; i < yieldHandlers2.length; ++i) {
          traceParent._pushContext();
          var result = tryCatch2(yieldHandlers2[i])(value);
          traceParent._popContext();
          if (result === errorObj2) {
            traceParent._pushContext();
            var ret2 = Promise3.reject(errorObj2.e);
            traceParent._popContext();
            return ret2;
          }
          var maybePromise = tryConvertToPromise(result, traceParent);
          if (maybePromise instanceof Promise3) return maybePromise;
        }
        return null;
      }
      function PromiseSpawn(generatorFunction, receiver2, yieldHandler, stack) {
        if (debug.cancellation()) {
          var internal = new Promise3(INTERNAL);
          var _finallyPromise = this._finallyPromise = new Promise3(INTERNAL);
          this._promise = internal.lastly(function() {
            return _finallyPromise;
          });
          internal._captureStackTrace();
          internal._setOnCancel(this);
        } else {
          var promise = this._promise = new Promise3(INTERNAL);
          promise._captureStackTrace();
        }
        this._stack = stack;
        this._generatorFunction = generatorFunction;
        this._receiver = receiver2;
        this._generator = void 0;
        this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
        this._yieldedPromise = null;
        this._cancellationPhase = false;
      }
      util.inherits(PromiseSpawn, Proxyable);
      PromiseSpawn.prototype._isResolved = function() {
        return this._promise === null;
      };
      PromiseSpawn.prototype._cleanup = function() {
        this._promise = this._generator = null;
        if (debug.cancellation() && this._finallyPromise !== null) {
          this._finallyPromise._fulfill();
          this._finallyPromise = null;
        }
      };
      PromiseSpawn.prototype._promiseCancelled = function() {
        if (this._isResolved()) return;
        var implementsReturn = typeof this._generator["return"] !== "undefined";
        var result;
        if (!implementsReturn) {
          var reason = new Promise3.CancellationError(
            "generator .return() sentinel"
          );
          Promise3.coroutine.returnSentinel = reason;
          this._promise._attachExtraTrace(reason);
          this._promise._pushContext();
          result = tryCatch2(this._generator["throw"]).call(
            this._generator,
            reason
          );
          this._promise._popContext();
        } else {
          this._promise._pushContext();
          result = tryCatch2(this._generator["return"]).call(
            this._generator,
            void 0
          );
          this._promise._popContext();
        }
        this._cancellationPhase = true;
        this._yieldedPromise = null;
        this._continue(result);
      };
      PromiseSpawn.prototype._promiseFulfilled = function(value) {
        this._yieldedPromise = null;
        this._promise._pushContext();
        var result = tryCatch2(this._generator.next).call(this._generator, value);
        this._promise._popContext();
        this._continue(result);
      };
      PromiseSpawn.prototype._promiseRejected = function(reason) {
        this._yieldedPromise = null;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        var result = tryCatch2(this._generator["throw"]).call(this._generator, reason);
        this._promise._popContext();
        this._continue(result);
      };
      PromiseSpawn.prototype._resultCancelled = function() {
        if (this._yieldedPromise instanceof Promise3) {
          var promise = this._yieldedPromise;
          this._yieldedPromise = null;
          promise.cancel();
        }
      };
      PromiseSpawn.prototype.promise = function() {
        return this._promise;
      };
      PromiseSpawn.prototype._run = function() {
        this._generator = this._generatorFunction.call(this._receiver);
        this._receiver = this._generatorFunction = void 0;
        this._promiseFulfilled(void 0);
      };
      PromiseSpawn.prototype._continue = function(result) {
        var promise = this._promise;
        if (result === errorObj2) {
          this._cleanup();
          if (this._cancellationPhase) {
            return promise.cancel();
          } else {
            return promise._rejectCallback(result.e, false);
          }
        }
        var value = result.value;
        if (result.done === true) {
          this._cleanup();
          if (this._cancellationPhase) {
            return promise.cancel();
          } else {
            return promise._resolveCallback(value);
          }
        } else {
          var maybePromise = tryConvertToPromise(value, this._promise);
          if (!(maybePromise instanceof Promise3)) {
            maybePromise = promiseFromYieldHandler(
              maybePromise,
              this._yieldHandlers,
              this._promise
            );
            if (maybePromise === null) {
              this._promiseRejected(
                new TypeError2(
                  "A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(value)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")
                )
              );
              return;
            }
          }
          maybePromise = maybePromise._target();
          var bitField = maybePromise._bitField;
          ;
          if ((bitField & 50397184) === 0) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
          } else if ((bitField & 33554432) !== 0) {
            Promise3._async.invoke(
              this._promiseFulfilled,
              this,
              maybePromise._value()
            );
          } else if ((bitField & 16777216) !== 0) {
            Promise3._async.invoke(
              this._promiseRejected,
              this,
              maybePromise._reason()
            );
          } else {
            this._promiseCancelled();
          }
        }
      };
      Promise3.coroutine = function(generatorFunction, options) {
        if (typeof generatorFunction !== "function") {
          throw new TypeError2("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
        }
        var yieldHandler = Object(options).yieldHandler;
        var PromiseSpawn$ = PromiseSpawn;
        var stack = new Error().stack;
        return function() {
          var generator = generatorFunction.apply(this, arguments);
          var spawn = new PromiseSpawn$(
            void 0,
            void 0,
            yieldHandler,
            stack
          );
          var ret2 = spawn.promise();
          spawn._generator = generator;
          spawn._promiseFulfilled(void 0);
          return ret2;
        };
      };
      Promise3.coroutine.addYieldHandler = function(fn) {
        if (typeof fn !== "function") {
          throw new TypeError2("expecting a function but got " + util.classString(fn));
        }
        yieldHandlers.push(fn);
      };
      Promise3.spawn = function(generatorFunction) {
        debug.deprecated("Promise.spawn()", "Promise.coroutine()");
        if (typeof generatorFunction !== "function") {
          return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
        }
        var spawn = new PromiseSpawn(generatorFunction, this);
        var ret2 = spawn.promise();
        spawn._run(Promise3.spawn);
        return ret2;
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/map.js
var require_map = __commonJS({
  "../../node_modules/bluebird/js/release/map.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
      var util = require_util();
      var tryCatch2 = util.tryCatch;
      var errorObj2 = util.errorObj;
      var async = Promise3._async;
      function MappingPromiseArray(promises, fn, limit, _filter) {
        this.constructor$(promises);
        this._promise._captureStackTrace();
        var context = Promise3._getContext();
        this._callback = util.contextBind(context, fn);
        this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
        this._limit = limit;
        this._inFlight = 0;
        this._queue = [];
        async.invoke(this._asyncInit, this, void 0);
        if (util.isArray(promises)) {
          for (var i = 0; i < promises.length; ++i) {
            var maybePromise = promises[i];
            if (maybePromise instanceof Promise3) {
              maybePromise.suppressUnhandledRejections();
            }
          }
        }
      }
      util.inherits(MappingPromiseArray, PromiseArray);
      MappingPromiseArray.prototype._asyncInit = function() {
        this._init$(void 0, -2);
      };
      MappingPromiseArray.prototype._init = function() {
      };
      MappingPromiseArray.prototype._promiseFulfilled = function(value, index) {
        var values = this._values;
        var length = this.length();
        var preservedValues = this._preservedValues;
        var limit = this._limit;
        if (index < 0) {
          index = index * -1 - 1;
          values[index] = value;
          if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
          }
        } else {
          if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
          }
          if (preservedValues !== null) preservedValues[index] = value;
          var promise = this._promise;
          var callback = this._callback;
          var receiver2 = promise._boundValue();
          promise._pushContext();
          var ret2 = tryCatch2(callback).call(receiver2, value, index, length);
          var promiseCreated = promise._popContext();
          debug.checkForgottenReturns(
            ret2,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
          );
          if (ret2 === errorObj2) {
            this._reject(ret2.e);
            return true;
          }
          var maybePromise = tryConvertToPromise(ret2, this._promise);
          if (maybePromise instanceof Promise3) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if ((bitField & 50397184) === 0) {
              if (limit >= 1) this._inFlight++;
              values[index] = maybePromise;
              maybePromise._proxy(this, (index + 1) * -1);
              return false;
            } else if ((bitField & 33554432) !== 0) {
              ret2 = maybePromise._value();
            } else if ((bitField & 16777216) !== 0) {
              this._reject(maybePromise._reason());
              return true;
            } else {
              this._cancel();
              return true;
            }
          }
          values[index] = ret2;
        }
        var totalResolved = ++this._totalResolved;
        if (totalResolved >= length) {
          if (preservedValues !== null) {
            this._filter(values, preservedValues);
          } else {
            this._resolve(values);
          }
          return true;
        }
        return false;
      };
      MappingPromiseArray.prototype._drainQueue = function() {
        var queue = this._queue;
        var limit = this._limit;
        var values = this._values;
        while (queue.length > 0 && this._inFlight < limit) {
          if (this._isResolved()) return;
          var index = queue.pop();
          this._promiseFulfilled(values[index], index);
        }
      };
      MappingPromiseArray.prototype._filter = function(booleans, values) {
        var len = values.length;
        var ret2 = new Array(len);
        var j = 0;
        for (var i = 0; i < len; ++i) {
          if (booleans[i]) ret2[j++] = values[i];
        }
        ret2.length = j;
        this._resolve(ret2);
      };
      MappingPromiseArray.prototype.preservedValues = function() {
        return this._preservedValues;
      };
      function map(promises, fn, options, _filter) {
        if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var limit = 0;
        if (options !== void 0) {
          if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
              return Promise3.reject(
                new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency))
              );
            }
            limit = options.concurrency;
          } else {
            return Promise3.reject(new TypeError(
              "options argument must be an object but it is " + util.classString(options)
            ));
          }
        }
        limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
        return new MappingPromiseArray(promises, fn, limit, _filter).promise();
      }
      Promise3.prototype.map = function(fn, options) {
        return map(this, fn, options, null);
      };
      Promise3.map = function(promises, fn, options, _filter) {
        return map(promises, fn, options, _filter);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/nodeify.js
var require_nodeify = __commonJS({
  "../../node_modules/bluebird/js/release/nodeify.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3) {
      var util = require_util();
      var async = Promise3._async;
      var tryCatch2 = util.tryCatch;
      var errorObj2 = util.errorObj;
      function spreadAdapter(val, nodeback) {
        var promise = this;
        if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
        var ret2 = tryCatch2(nodeback).apply(promise._boundValue(), [null].concat(val));
        if (ret2 === errorObj2) {
          async.throwLater(ret2.e);
        }
      }
      function successAdapter(val, nodeback) {
        var promise = this;
        var receiver2 = promise._boundValue();
        var ret2 = val === void 0 ? tryCatch2(nodeback).call(receiver2, null) : tryCatch2(nodeback).call(receiver2, null, val);
        if (ret2 === errorObj2) {
          async.throwLater(ret2.e);
        }
      }
      function errorAdapter(reason, nodeback) {
        var promise = this;
        if (!reason) {
          var newReason = new Error(reason + "");
          newReason.cause = reason;
          reason = newReason;
        }
        var ret2 = tryCatch2(nodeback).call(promise._boundValue(), reason);
        if (ret2 === errorObj2) {
          async.throwLater(ret2.e);
        }
      }
      Promise3.prototype.asCallback = Promise3.prototype.nodeify = function(nodeback, options) {
        if (typeof nodeback == "function") {
          var adapter = successAdapter;
          if (options !== void 0 && Object(options).spread) {
            adapter = spreadAdapter;
          }
          this._then(
            adapter,
            errorAdapter,
            void 0,
            this,
            nodeback
          );
        }
        return this;
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/promisify.js
var require_promisify = __commonJS({
  "../../node_modules/bluebird/js/release/promisify.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL) {
      var THIS = {};
      var util = require_util();
      var nodebackForPromise = require_nodeback();
      var withAppended2 = util.withAppended;
      var maybeWrapAsError2 = util.maybeWrapAsError;
      var canEvaluate2 = util.canEvaluate;
      var TypeError2 = require_errors().TypeError;
      var defaultSuffix = "Async";
      var defaultPromisified = { __isPromisified__: true };
      var noCopyProps = [
        "arity",
        "length",
        "name",
        "arguments",
        "caller",
        "callee",
        "prototype",
        "__isPromisified__"
      ];
      var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
      var defaultFilter = function(name) {
        return util.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
      };
      function propsFilter(key) {
        return !noCopyPropsPattern.test(key);
      }
      function isPromisified(fn) {
        try {
          return fn.__isPromisified__ === true;
        } catch (e) {
          return false;
        }
      }
      function hasPromisified(obj2, key, suffix) {
        var val = util.getDataPropertyOrDefault(
          obj2,
          key + suffix,
          defaultPromisified
        );
        return val ? isPromisified(val) : false;
      }
      function checkValid(ret2, suffix, suffixRegexp) {
        for (var i = 0; i < ret2.length; i += 2) {
          var key = ret2[i];
          if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret2.length; j += 2) {
              if (ret2[j] === keyWithoutAsyncSuffix) {
                throw new TypeError2("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
              }
            }
          }
        }
      }
      function promisifiableMethods(obj2, suffix, suffixRegexp, filter) {
        var keys = util.inheritedDataKeys(obj2);
        var ret2 = [];
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var value = obj2[key];
          var passesDefaultFilter = filter === defaultFilter ? true : defaultFilter(key, value, obj2);
          if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj2, key, suffix) && filter(key, value, obj2, passesDefaultFilter)) {
            ret2.push(key, value);
          }
        }
        checkValid(ret2, suffix, suffixRegexp);
        return ret2;
      }
      var escapeIdentRegex = function(str) {
        return str.replace(/([$])/, "\\$");
      };
      var makeNodePromisifiedEval;
      if (true) {
        var switchCaseArgumentOrder = function(likelyArgumentCount) {
          var ret2 = [likelyArgumentCount];
          var min = Math.max(0, likelyArgumentCount - 1 - 3);
          for (var i = likelyArgumentCount - 1; i >= min; --i) {
            ret2.push(i);
          }
          for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
            ret2.push(i);
          }
          return ret2;
        };
        var argumentSequence = function(argumentCount) {
          return util.filledRange(argumentCount, "_arg", "");
        };
        var parameterDeclaration = function(parameterCount2) {
          return util.filledRange(
            Math.max(parameterCount2, 3),
            "_arg",
            ""
          );
        };
        var parameterCount = function(fn) {
          if (typeof fn.length === "number") {
            return Math.max(Math.min(fn.length, 1023 + 1), 0);
          }
          return 0;
        };
        makeNodePromisifiedEval = function(callback, receiver2, originalName, fn, _, multiArgs) {
          var newParameterCount = Math.max(0, parameterCount(fn) - 1);
          var argumentOrder = switchCaseArgumentOrder(newParameterCount);
          var shouldProxyThis = typeof callback === "string" || receiver2 === THIS;
          function generateCallForArgumentCount(count) {
            var args = argumentSequence(count).join(", ");
            var comma = count > 0 ? ", " : "";
            var ret2;
            if (shouldProxyThis) {
              ret2 = "ret = callback.call(this, {{args}}, nodeback); break;\n";
            } else {
              ret2 = receiver2 === void 0 ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
            }
            return ret2.replace("{{args}}", args).replace(", ", comma);
          }
          function generateArgumentSwitchCase() {
            var ret2 = "";
            for (var i = 0; i < argumentOrder.length; ++i) {
              ret2 += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
            }
            ret2 += "                                                             \n        default:                                                             \n            var args = new Array(len + 1);                                   \n            var i = 0;                                                       \n            for (var i = 0; i < len; ++i) {                                  \n               args[i] = arguments[i];                                       \n            }                                                                \n            args[i] = nodeback;                                              \n            [CodeForCall]                                                    \n            break;                                                           \n        ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
            return ret2;
          }
          var getFunctionCode = typeof callback === "string" ? "this != null ? this['" + callback + "'] : fn" : "fn";
          var body = "'use strict';                                                \n        var ret = function (Parameters) {                                    \n            'use strict';                                                    \n            var len = arguments.length;                                      \n            var promise = new Promise(INTERNAL);                             \n            promise._captureStackTrace();                                    \n            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n            var ret;                                                         \n            var callback = tryCatch([GetFunctionCode]);                      \n            switch(len) {                                                    \n                [CodeForSwitchCase]                                          \n            }                                                                \n            if (ret === errorObj) {                                          \n                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n            }                                                                \n            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n            return promise;                                                  \n        };                                                                   \n        notEnumerableProp(ret, '__isPromisified__', true);                   \n        return ret;                                                          \n    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
          body = body.replace("Parameters", parameterDeclaration(newParameterCount));
          return new Function(
            "Promise",
            "fn",
            "receiver",
            "withAppended",
            "maybeWrapAsError",
            "nodebackForPromise",
            "tryCatch",
            "errorObj",
            "notEnumerableProp",
            "INTERNAL",
            body
          )(
            Promise3,
            fn,
            receiver2,
            withAppended2,
            maybeWrapAsError2,
            nodebackForPromise,
            util.tryCatch,
            util.errorObj,
            util.notEnumerableProp,
            INTERNAL
          );
        };
      }
      function makeNodePromisifiedClosure(callback, receiver2, _, fn, __, multiArgs) {
        var defaultThis = /* @__PURE__ */ function() {
          return this;
        }();
        var method = callback;
        if (typeof method === "string") {
          callback = fn;
        }
        function promisified() {
          var _receiver = receiver2;
          if (receiver2 === THIS) _receiver = this;
          var promise = new Promise3(INTERNAL);
          promise._captureStackTrace();
          var cb = typeof method === "string" && this !== defaultThis ? this[method] : callback;
          var fn2 = nodebackForPromise(promise, multiArgs);
          try {
            cb.apply(_receiver, withAppended2(arguments, fn2));
          } catch (e) {
            promise._rejectCallback(maybeWrapAsError2(e), true, true);
          }
          if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
          return promise;
        }
        util.notEnumerableProp(promisified, "__isPromisified__", true);
        return promisified;
      }
      var makeNodePromisified = canEvaluate2 ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
      function promisifyAll(obj2, suffix, filter, promisifier, multiArgs) {
        var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
        var methods = promisifiableMethods(obj2, suffix, suffixRegexp, filter);
        for (var i = 0, len = methods.length; i < len; i += 2) {
          var key = methods[i];
          var fn = methods[i + 1];
          var promisifiedKey = key + suffix;
          if (promisifier === makeNodePromisified) {
            obj2[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
          } else {
            var promisified = promisifier(fn, function() {
              return makeNodePromisified(
                key,
                THIS,
                key,
                fn,
                suffix,
                multiArgs
              );
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj2[promisifiedKey] = promisified;
          }
        }
        util.toFastProperties(obj2);
        return obj2;
      }
      function promisify(callback, receiver2, multiArgs) {
        return makeNodePromisified(
          callback,
          receiver2,
          void 0,
          callback,
          null,
          multiArgs
        );
      }
      Promise3.promisify = function(fn, options) {
        if (typeof fn !== "function") {
          throw new TypeError2("expecting a function but got " + util.classString(fn));
        }
        if (isPromisified(fn)) {
          return fn;
        }
        options = Object(options);
        var receiver2 = options.context === void 0 ? THIS : options.context;
        var multiArgs = !!options.multiArgs;
        var ret2 = promisify(fn, receiver2, multiArgs);
        util.copyDescriptors(fn, ret2, propsFilter);
        return ret2;
      };
      Promise3.promisifyAll = function(target, options) {
        if (typeof target !== "function" && typeof target !== "object") {
          throw new TypeError2("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
        }
        options = Object(options);
        var multiArgs = !!options.multiArgs;
        var suffix = options.suffix;
        if (typeof suffix !== "string") suffix = defaultSuffix;
        var filter = options.filter;
        if (typeof filter !== "function") filter = defaultFilter;
        var promisifier = options.promisifier;
        if (typeof promisifier !== "function") promisifier = makeNodePromisified;
        if (!util.isIdentifier(suffix)) {
          throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
        }
        var keys = util.inheritedDataKeys(target);
        for (var i = 0; i < keys.length; ++i) {
          var value = target[keys[i]];
          if (keys[i] !== "constructor" && util.isClass(value)) {
            promisifyAll(
              value.prototype,
              suffix,
              filter,
              promisifier,
              multiArgs
            );
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
          }
        }
        return promisifyAll(target, suffix, filter, promisifier, multiArgs);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/props.js
var require_props = __commonJS({
  "../../node_modules/bluebird/js/release/props.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, PromiseArray, tryConvertToPromise, apiRejection) {
      var util = require_util();
      var isObject2 = util.isObject;
      var es52 = require_es5();
      var Es6Map;
      if (typeof Map === "function") Es6Map = Map;
      var mapToEntries = /* @__PURE__ */ function() {
        var index = 0;
        var size = 0;
        function extractEntry(value, key) {
          this[index] = value;
          this[index + size] = key;
          index++;
        }
        return function mapToEntries2(map) {
          size = map.size;
          index = 0;
          var ret2 = new Array(map.size * 2);
          map.forEach(extractEntry, ret2);
          return ret2;
        };
      }();
      var entriesToMap = function(entries) {
        var ret2 = new Es6Map();
        var length = entries.length / 2 | 0;
        for (var i = 0; i < length; ++i) {
          var key = entries[length + i];
          var value = entries[i];
          ret2.set(key, value);
        }
        return ret2;
      };
      function PropertiesPromiseArray(obj2) {
        var isMap = false;
        var entries;
        if (Es6Map !== void 0 && obj2 instanceof Es6Map) {
          entries = mapToEntries(obj2);
          isMap = true;
        } else {
          var keys = es52.keys(obj2);
          var len = keys.length;
          entries = new Array(len * 2);
          for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj2[key];
            entries[i + len] = key;
          }
        }
        this.constructor$(entries);
        this._isMap = isMap;
        this._init$(void 0, isMap ? -6 : -3);
      }
      util.inherits(PropertiesPromiseArray, PromiseArray);
      PropertiesPromiseArray.prototype._init = function() {
      };
      PropertiesPromiseArray.prototype._promiseFulfilled = function(value, index) {
        this._values[index] = value;
        var totalResolved = ++this._totalResolved;
        if (totalResolved >= this._length) {
          var val;
          if (this._isMap) {
            val = entriesToMap(this._values);
          } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
              val[this._values[i + keyOffset]] = this._values[i];
            }
          }
          this._resolve(val);
          return true;
        }
        return false;
      };
      PropertiesPromiseArray.prototype.shouldCopyValues = function() {
        return false;
      };
      PropertiesPromiseArray.prototype.getActualLength = function(len) {
        return len >> 1;
      };
      function props(promises) {
        var ret2;
        var castValue = tryConvertToPromise(promises);
        if (!isObject2(castValue)) {
          return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
        } else if (castValue instanceof Promise3) {
          ret2 = castValue._then(
            Promise3.props,
            void 0,
            void 0,
            void 0,
            void 0
          );
        } else {
          ret2 = new PropertiesPromiseArray(castValue).promise();
        }
        if (castValue instanceof Promise3) {
          ret2._propagateFrom(castValue, 2);
        }
        return ret2;
      }
      Promise3.prototype.props = function() {
        return props(this);
      };
      Promise3.props = function(promises) {
        return props(promises);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/race.js
var require_race = __commonJS({
  "../../node_modules/bluebird/js/release/race.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL, tryConvertToPromise, apiRejection) {
      var util = require_util();
      var raceLater = function(promise) {
        return promise.then(function(array) {
          return race(array, promise);
        });
      };
      function race(promises, parent) {
        var maybePromise = tryConvertToPromise(promises);
        if (maybePromise instanceof Promise3) {
          return raceLater(maybePromise);
        } else {
          promises = util.asArray(promises);
          if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
        }
        var ret2 = new Promise3(INTERNAL);
        if (parent !== void 0) {
          ret2._propagateFrom(parent, 3);
        }
        var fulfill = ret2._fulfill;
        var reject = ret2._reject;
        for (var i = 0, len = promises.length; i < len; ++i) {
          var val = promises[i];
          if (val === void 0 && !(i in promises)) {
            continue;
          }
          Promise3.cast(val)._then(fulfill, reject, void 0, ret2, null);
        }
        return ret2;
      }
      Promise3.race = function(promises) {
        return race(promises, void 0);
      };
      Promise3.prototype.race = function() {
        return race(this, void 0);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/reduce.js
var require_reduce = __commonJS({
  "../../node_modules/bluebird/js/release/reduce.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
      var util = require_util();
      var tryCatch2 = util.tryCatch;
      function ReductionPromiseArray(promises, fn, initialValue, _each) {
        this.constructor$(promises);
        var context = Promise3._getContext();
        this._fn = util.contextBind(context, fn);
        if (initialValue !== void 0) {
          initialValue = Promise3.resolve(initialValue);
          initialValue._attachCancellationCallback(this);
        }
        this._initialValue = initialValue;
        this._currentCancellable = null;
        if (_each === INTERNAL) {
          this._eachValues = Array(this._length);
        } else if (_each === 0) {
          this._eachValues = null;
        } else {
          this._eachValues = void 0;
        }
        this._promise._captureStackTrace();
        this._init$(void 0, -5);
      }
      util.inherits(ReductionPromiseArray, PromiseArray);
      ReductionPromiseArray.prototype._gotAccum = function(accum) {
        if (this._eachValues !== void 0 && this._eachValues !== null && accum !== INTERNAL) {
          this._eachValues.push(accum);
        }
      };
      ReductionPromiseArray.prototype._eachComplete = function(value) {
        if (this._eachValues !== null) {
          this._eachValues.push(value);
        }
        return this._eachValues;
      };
      ReductionPromiseArray.prototype._init = function() {
      };
      ReductionPromiseArray.prototype._resolveEmptyArray = function() {
        this._resolve(this._eachValues !== void 0 ? this._eachValues : this._initialValue);
      };
      ReductionPromiseArray.prototype.shouldCopyValues = function() {
        return false;
      };
      ReductionPromiseArray.prototype._resolve = function(value) {
        this._promise._resolveCallback(value);
        this._values = null;
      };
      ReductionPromiseArray.prototype._resultCancelled = function(sender) {
        if (sender === this._initialValue) return this._cancel();
        if (this._isResolved()) return;
        this._resultCancelled$();
        if (this._currentCancellable instanceof Promise3) {
          this._currentCancellable.cancel();
        }
        if (this._initialValue instanceof Promise3) {
          this._initialValue.cancel();
        }
      };
      ReductionPromiseArray.prototype._iterate = function(values) {
        this._values = values;
        var value;
        var i;
        var length = values.length;
        if (this._initialValue !== void 0) {
          value = this._initialValue;
          i = 0;
        } else {
          value = Promise3.resolve(values[0]);
          i = 1;
        }
        this._currentCancellable = value;
        for (var j = i; j < length; ++j) {
          var maybePromise = values[j];
          if (maybePromise instanceof Promise3) {
            maybePromise.suppressUnhandledRejections();
          }
        }
        if (!value.isRejected()) {
          for (; i < length; ++i) {
            var ctx = {
              accum: null,
              value: values[i],
              index: i,
              length,
              array: this
            };
            value = value._then(gotAccum, void 0, void 0, ctx, void 0);
            if ((i & 127) === 0) {
              value._setNoAsyncGuarantee();
            }
          }
        }
        if (this._eachValues !== void 0) {
          value = value._then(this._eachComplete, void 0, void 0, this, void 0);
        }
        value._then(completed, completed, void 0, value, this);
      };
      Promise3.prototype.reduce = function(fn, initialValue) {
        return reduce(this, fn, initialValue, null);
      };
      Promise3.reduce = function(promises, fn, initialValue, _each) {
        return reduce(promises, fn, initialValue, _each);
      };
      function completed(valueOrReason, array) {
        if (this.isFulfilled()) {
          array._resolve(valueOrReason);
        } else {
          array._reject(valueOrReason);
        }
      }
      function reduce(promises, fn, initialValue, _each) {
        if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
        return array.promise();
      }
      function gotAccum(accum) {
        this.accum = accum;
        this.array._gotAccum(accum);
        var value = tryConvertToPromise(this.value, this.array._promise);
        if (value instanceof Promise3) {
          this.array._currentCancellable = value;
          return value._then(gotValue, void 0, void 0, this, void 0);
        } else {
          return gotValue.call(this, value);
        }
      }
      function gotValue(value) {
        var array = this.array;
        var promise = array._promise;
        var fn = tryCatch2(array._fn);
        promise._pushContext();
        var ret2;
        if (array._eachValues !== void 0) {
          ret2 = fn.call(promise._boundValue(), value, this.index, this.length);
        } else {
          ret2 = fn.call(
            promise._boundValue(),
            this.accum,
            value,
            this.index,
            this.length
          );
        }
        if (ret2 instanceof Promise3) {
          array._currentCancellable = ret2;
        }
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
          ret2,
          promiseCreated,
          array._eachValues !== void 0 ? "Promise.each" : "Promise.reduce",
          promise
        );
        return ret2;
      }
    };
  }
});

// ../../node_modules/bluebird/js/release/settle.js
var require_settle = __commonJS({
  "../../node_modules/bluebird/js/release/settle.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, PromiseArray, debug) {
      var PromiseInspection = Promise3.PromiseInspection;
      var util = require_util();
      function SettledPromiseArray(values) {
        this.constructor$(values);
      }
      util.inherits(SettledPromiseArray, PromiseArray);
      SettledPromiseArray.prototype._promiseResolved = function(index, inspection) {
        this._values[index] = inspection;
        var totalResolved = ++this._totalResolved;
        if (totalResolved >= this._length) {
          this._resolve(this._values);
          return true;
        }
        return false;
      };
      SettledPromiseArray.prototype._promiseFulfilled = function(value, index) {
        var ret2 = new PromiseInspection();
        ret2._bitField = 33554432;
        ret2._settledValueField = value;
        return this._promiseResolved(index, ret2);
      };
      SettledPromiseArray.prototype._promiseRejected = function(reason, index) {
        var ret2 = new PromiseInspection();
        ret2._bitField = 16777216;
        ret2._settledValueField = reason;
        return this._promiseResolved(index, ret2);
      };
      Promise3.settle = function(promises) {
        debug.deprecated(".settle()", ".reflect()");
        return new SettledPromiseArray(promises).promise();
      };
      Promise3.allSettled = function(promises) {
        return new SettledPromiseArray(promises).promise();
      };
      Promise3.prototype.settle = function() {
        return Promise3.settle(this);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/some.js
var require_some = __commonJS({
  "../../node_modules/bluebird/js/release/some.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, PromiseArray, apiRejection) {
      var util = require_util();
      var RangeError2 = require_errors().RangeError;
      var AggregateError = require_errors().AggregateError;
      var isArray = util.isArray;
      var CANCELLATION = {};
      function SomePromiseArray(values) {
        this.constructor$(values);
        this._howMany = 0;
        this._unwrap = false;
        this._initialized = false;
      }
      util.inherits(SomePromiseArray, PromiseArray);
      SomePromiseArray.prototype._init = function() {
        if (!this._initialized) {
          return;
        }
        if (this._howMany === 0) {
          this._resolve([]);
          return;
        }
        this._init$(void 0, -5);
        var isArrayResolved = isArray(this._values);
        if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
          this._reject(this._getRangeError(this.length()));
        }
      };
      SomePromiseArray.prototype.init = function() {
        this._initialized = true;
        this._init();
      };
      SomePromiseArray.prototype.setUnwrap = function() {
        this._unwrap = true;
      };
      SomePromiseArray.prototype.howMany = function() {
        return this._howMany;
      };
      SomePromiseArray.prototype.setHowMany = function(count) {
        this._howMany = count;
      };
      SomePromiseArray.prototype._promiseFulfilled = function(value) {
        this._addFulfilled(value);
        if (this._fulfilled() === this.howMany()) {
          this._values.length = this.howMany();
          if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
          } else {
            this._resolve(this._values);
          }
          return true;
        }
        return false;
      };
      SomePromiseArray.prototype._promiseRejected = function(reason) {
        this._addRejected(reason);
        return this._checkOutcome();
      };
      SomePromiseArray.prototype._promiseCancelled = function() {
        if (this._values instanceof Promise3 || this._values == null) {
          return this._cancel();
        }
        this._addRejected(CANCELLATION);
        return this._checkOutcome();
      };
      SomePromiseArray.prototype._checkOutcome = function() {
        if (this.howMany() > this._canPossiblyFulfill()) {
          var e = new AggregateError();
          for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
              e.push(this._values[i]);
            }
          }
          if (e.length > 0) {
            this._reject(e);
          } else {
            this._cancel();
          }
          return true;
        }
        return false;
      };
      SomePromiseArray.prototype._fulfilled = function() {
        return this._totalResolved;
      };
      SomePromiseArray.prototype._rejected = function() {
        return this._values.length - this.length();
      };
      SomePromiseArray.prototype._addRejected = function(reason) {
        this._values.push(reason);
      };
      SomePromiseArray.prototype._addFulfilled = function(value) {
        this._values[this._totalResolved++] = value;
      };
      SomePromiseArray.prototype._canPossiblyFulfill = function() {
        return this.length() - this._rejected();
      };
      SomePromiseArray.prototype._getRangeError = function(count) {
        var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
        return new RangeError2(message);
      };
      SomePromiseArray.prototype._resolveEmptyArray = function() {
        this._reject(this._getRangeError(0));
      };
      function some(promises, howMany) {
        if ((howMany | 0) !== howMany || howMany < 0) {
          return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
        }
        var ret2 = new SomePromiseArray(promises);
        var promise = ret2.promise();
        ret2.setHowMany(howMany);
        ret2.init();
        return promise;
      }
      Promise3.some = function(promises, howMany) {
        return some(promises, howMany);
      };
      Promise3.prototype.some = function(howMany) {
        return some(this, howMany);
      };
      Promise3._SomePromiseArray = SomePromiseArray;
    };
  }
});

// ../../node_modules/bluebird/js/release/timers.js
var require_timers = __commonJS({
  "../../node_modules/bluebird/js/release/timers.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL, debug) {
      var util = require_util();
      var TimeoutError = Promise3.TimeoutError;
      function HandleWrapper(handle) {
        this.handle = handle;
      }
      HandleWrapper.prototype._resultCancelled = function() {
        clearTimeout(this.handle);
      };
      var afterValue = function(value) {
        return delay(+this).thenReturn(value);
      };
      var delay = Promise3.delay = function(ms, value) {
        var ret2;
        var handle;
        if (value !== void 0) {
          ret2 = Promise3.resolve(value)._then(afterValue, null, null, ms, void 0);
          if (debug.cancellation() && value instanceof Promise3) {
            ret2._setOnCancel(value);
          }
        } else {
          ret2 = new Promise3(INTERNAL);
          handle = setTimeout(function() {
            ret2._fulfill();
          }, +ms);
          if (debug.cancellation()) {
            ret2._setOnCancel(new HandleWrapper(handle));
          }
          ret2._captureStackTrace();
        }
        ret2._setAsyncGuaranteed();
        return ret2;
      };
      Promise3.prototype.delay = function(ms) {
        return delay(ms, this);
      };
      var afterTimeout = function(promise, message, parent) {
        var err;
        if (typeof message !== "string") {
          if (message instanceof Error) {
            err = message;
          } else {
            err = new TimeoutError("operation timed out");
          }
        } else {
          err = new TimeoutError(message);
        }
        util.markAsOriginatingFromRejection(err);
        promise._attachExtraTrace(err);
        promise._reject(err);
        if (parent != null) {
          parent.cancel();
        }
      };
      function successClear(value) {
        clearTimeout(this.handle);
        return value;
      }
      function failureClear(reason) {
        clearTimeout(this.handle);
        throw reason;
      }
      Promise3.prototype.timeout = function(ms, message) {
        ms = +ms;
        var ret2, parent;
        var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
          if (ret2.isPending()) {
            afterTimeout(ret2, message, parent);
          }
        }, ms));
        if (debug.cancellation()) {
          parent = this.then();
          ret2 = parent._then(
            successClear,
            failureClear,
            void 0,
            handleWrapper,
            void 0
          );
          ret2._setOnCancel(handleWrapper);
        } else {
          ret2 = this._then(
            successClear,
            failureClear,
            void 0,
            handleWrapper,
            void 0
          );
        }
        return ret2;
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/using.js
var require_using = __commonJS({
  "../../node_modules/bluebird/js/release/using.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
      var util = require_util();
      var TypeError2 = require_errors().TypeError;
      var inherits2 = require_util().inherits;
      var errorObj2 = util.errorObj;
      var tryCatch2 = util.tryCatch;
      var NULL = {};
      function thrower2(e) {
        setTimeout(function() {
          throw e;
        }, 0);
      }
      function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
          maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
      }
      function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret2 = new Promise3(INTERNAL);
        function iterator() {
          if (i >= len) return ret2._fulfill();
          var maybePromise = castPreservingDisposable(resources[i++]);
          if (maybePromise instanceof Promise3 && maybePromise._isDisposable()) {
            try {
              maybePromise = tryConvertToPromise(
                maybePromise._getDisposer().tryDispose(inspection),
                resources.promise
              );
            } catch (e) {
              return thrower2(e);
            }
            if (maybePromise instanceof Promise3) {
              return maybePromise._then(
                iterator,
                thrower2,
                null,
                null,
                null
              );
            }
          }
          iterator();
        }
        iterator();
        return ret2;
      }
      function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
      }
      Disposer.prototype.data = function() {
        return this._data;
      };
      Disposer.prototype.promise = function() {
        return this._promise;
      };
      Disposer.prototype.resource = function() {
        if (this.promise().isFulfilled()) {
          return this.promise().value();
        }
        return NULL;
      };
      Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== void 0) context._pushContext();
        var ret2 = resource !== NULL ? this.doDispose(resource, inspection) : null;
        if (context !== void 0) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret2;
      };
      Disposer.isDisposer = function(d) {
        return d != null && typeof d.resource === "function" && typeof d.tryDispose === "function";
      };
      function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
      }
      inherits2(FunctionDisposer, Disposer);
      FunctionDisposer.prototype.doDispose = function(resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
      };
      function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
          this.resources[this.index]._setDisposable(value);
          return value.promise();
        }
        return value;
      }
      function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length - 1] = null;
      }
      ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
          var item = this[i];
          if (item instanceof Promise3) {
            item.cancel();
          }
        }
      };
      Promise3.using = function() {
        var len = arguments.length;
        if (len < 2) return apiRejection(
          "you must pass at least 2 arguments to Promise.using"
        );
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
          input = arguments[0];
          len = input.length;
          spreadArgs = false;
        } else {
          input = arguments;
          len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
          var resource = input[i];
          if (Disposer.isDisposer(resource)) {
            var disposer = resource;
            resource = resource.promise();
            resource._setDisposable(disposer);
          } else {
            var maybePromise = tryConvertToPromise(resource);
            if (maybePromise instanceof Promise3) {
              resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
                resources,
                index: i
              }, void 0);
            }
          }
          resources[i] = resource;
        }
        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
          reflectedResources[i] = Promise3.resolve(resources[i]).reflect();
        }
        var resultPromise = Promise3.all(reflectedResources).then(function(inspections) {
          for (var i2 = 0; i2 < inspections.length; ++i2) {
            var inspection = inspections[i2];
            if (inspection.isRejected()) {
              errorObj2.e = inspection.error();
              return errorObj2;
            } else if (!inspection.isFulfilled()) {
              resultPromise.cancel();
              return;
            }
            inspections[i2] = inspection.value();
          }
          promise._pushContext();
          fn = tryCatch2(fn);
          var ret2 = spreadArgs ? fn.apply(void 0, inspections) : fn(inspections);
          var promiseCreated = promise._popContext();
          debug.checkForgottenReturns(
            ret2,
            promiseCreated,
            "Promise.using",
            promise
          );
          return ret2;
        });
        var promise = resultPromise.lastly(function() {
          var inspection = new Promise3.PromiseInspection(resultPromise);
          return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
      };
      Promise3.prototype._setDisposable = function(disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
      };
      Promise3.prototype._isDisposable = function() {
        return (this._bitField & 131072) > 0;
      };
      Promise3.prototype._getDisposer = function() {
        return this._disposer;
      };
      Promise3.prototype._unsetDisposable = function() {
        this._bitField = this._bitField & ~131072;
        this._disposer = void 0;
      };
      Promise3.prototype.disposer = function(fn) {
        if (typeof fn === "function") {
          return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError2();
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/any.js
var require_any = __commonJS({
  "../../node_modules/bluebird/js/release/any.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3) {
      var SomePromiseArray = Promise3._SomePromiseArray;
      function any(promises) {
        var ret2 = new SomePromiseArray(promises);
        var promise = ret2.promise();
        ret2.setHowMany(1);
        ret2.setUnwrap();
        ret2.init();
        return promise;
      }
      Promise3.any = function(promises) {
        return any(promises);
      };
      Promise3.prototype.any = function() {
        return any(this);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/each.js
var require_each = __commonJS({
  "../../node_modules/bluebird/js/release/each.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL) {
      var PromiseReduce = Promise3.reduce;
      var PromiseAll = Promise3.all;
      function promiseAllThis() {
        return PromiseAll(this);
      }
      function PromiseMapSeries(promises, fn) {
        return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
      }
      Promise3.prototype.each = function(fn) {
        return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, this, void 0);
      };
      Promise3.prototype.mapSeries = function(fn) {
        return PromiseReduce(this, fn, INTERNAL, INTERNAL);
      };
      Promise3.each = function(promises, fn) {
        return PromiseReduce(promises, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, promises, void 0);
      };
      Promise3.mapSeries = PromiseMapSeries;
    };
  }
});

// ../../node_modules/bluebird/js/release/filter.js
var require_filter = __commonJS({
  "../../node_modules/bluebird/js/release/filter.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Promise3, INTERNAL) {
      var PromiseMap = Promise3.map;
      Promise3.prototype.filter = function(fn, options) {
        return PromiseMap(this, fn, options, INTERNAL);
      };
      Promise3.filter = function(promises, fn, options) {
        return PromiseMap(promises, fn, options, INTERNAL);
      };
    };
  }
});

// ../../node_modules/bluebird/js/release/promise.js
var require_promise = __commonJS({
  "../../node_modules/bluebird/js/release/promise.js"(exports2, module2) {
    "use strict";
    module2.exports = function() {
      var makeSelfResolutionError = function() {
        return new TypeError2("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
      };
      var reflectHandler2 = function() {
        return new Promise3.PromiseInspection(this._target());
      };
      var apiRejection = function(msg) {
        return Promise3.reject(new TypeError2(msg));
      };
      function Proxyable() {
      }
      var UNDEFINED_BINDING = {};
      var util = require_util();
      util.setReflectHandler(reflectHandler2);
      var getDomain = function() {
        var domain = process.domain;
        if (domain === void 0) {
          return null;
        }
        return domain;
      };
      var getContextDefault = function() {
        return null;
      };
      var getContextDomain = function() {
        return {
          domain: getDomain(),
          async: null
        };
      };
      var AsyncResource = util.isNode && util.nodeSupportsAsyncResource ? require("async_hooks").AsyncResource : null;
      var getContextAsyncHooks = function() {
        return {
          domain: getDomain(),
          async: new AsyncResource("Bluebird::Promise")
        };
      };
      var getContext = util.isNode ? getContextDomain : getContextDefault;
      util.notEnumerableProp(Promise3, "_getContext", getContext);
      var enableAsyncHooks = function() {
        getContext = getContextAsyncHooks;
        util.notEnumerableProp(Promise3, "_getContext", getContextAsyncHooks);
      };
      var disableAsyncHooks = function() {
        getContext = getContextDomain;
        util.notEnumerableProp(Promise3, "_getContext", getContextDomain);
      };
      var es52 = require_es5();
      var Async = require_async();
      var async = new Async();
      es52.defineProperty(Promise3, "_async", { value: async });
      var errors = require_errors();
      var TypeError2 = Promise3.TypeError = errors.TypeError;
      Promise3.RangeError = errors.RangeError;
      var CancellationError = Promise3.CancellationError = errors.CancellationError;
      Promise3.TimeoutError = errors.TimeoutError;
      Promise3.OperationalError = errors.OperationalError;
      Promise3.RejectionError = errors.OperationalError;
      Promise3.AggregateError = errors.AggregateError;
      var INTERNAL = function() {
      };
      var APPLY = {};
      var NEXT_FILTER = {};
      var tryConvertToPromise = require_thenables()(Promise3, INTERNAL);
      var PromiseArray = require_promise_array()(
        Promise3,
        INTERNAL,
        tryConvertToPromise,
        apiRejection,
        Proxyable
      );
      var Context = require_context()(Promise3);
      var createContext = Context.create;
      var debug = require_debuggability()(
        Promise3,
        Context,
        enableAsyncHooks,
        disableAsyncHooks
      );
      var CapturedTrace = debug.CapturedTrace;
      var PassThroughHandlerContext = require_finally()(Promise3, tryConvertToPromise, NEXT_FILTER);
      var catchFilter = require_catch_filter()(NEXT_FILTER);
      var nodebackForPromise = require_nodeback();
      var errorObj2 = util.errorObj;
      var tryCatch2 = util.tryCatch;
      function check(self2, executor) {
        if (self2 == null || self2.constructor !== Promise3) {
          throw new TypeError2("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
        }
        if (typeof executor !== "function") {
          throw new TypeError2("expecting a function but got " + util.classString(executor));
        }
      }
      function Promise3(executor) {
        if (executor !== INTERNAL) {
          check(this, executor);
        }
        this._bitField = 0;
        this._fulfillmentHandler0 = void 0;
        this._rejectionHandler0 = void 0;
        this._promise0 = void 0;
        this._receiver0 = void 0;
        this._resolveFromExecutor(executor);
        this._promiseCreated();
        this._fireEvent("promiseCreated", this);
      }
      Promise3.prototype.toString = function() {
        return "[object Promise]";
      };
      Promise3.prototype.caught = Promise3.prototype["catch"] = function(fn) {
        var len = arguments.length;
        if (len > 1) {
          var catchInstances = new Array(len - 1), j = 0, i;
          for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
              catchInstances[j++] = item;
            } else {
              return apiRejection("Catch statement predicate: expecting an object but got " + util.classString(item));
            }
          }
          catchInstances.length = j;
          fn = arguments[i];
          if (typeof fn !== "function") {
            throw new TypeError2("The last argument to .catch() must be a function, got " + util.toString(fn));
          }
          return this.then(void 0, catchFilter(catchInstances, fn, this));
        }
        return this.then(void 0, fn);
      };
      Promise3.prototype.reflect = function() {
        return this._then(
          reflectHandler2,
          reflectHandler2,
          void 0,
          this,
          void 0
        );
      };
      Promise3.prototype.then = function(didFulfill, didReject) {
        if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
          var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);
          if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
          }
          this._warn(msg);
        }
        return this._then(didFulfill, didReject, void 0, void 0, void 0);
      };
      Promise3.prototype.done = function(didFulfill, didReject) {
        var promise = this._then(didFulfill, didReject, void 0, void 0, void 0);
        promise._setIsFinal();
      };
      Promise3.prototype.spread = function(fn) {
        if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util.classString(fn));
        }
        return this.all()._then(fn, void 0, void 0, APPLY, void 0);
      };
      Promise3.prototype.toJSON = function() {
        var ret2 = {
          isFulfilled: false,
          isRejected: false,
          fulfillmentValue: void 0,
          rejectionReason: void 0
        };
        if (this.isFulfilled()) {
          ret2.fulfillmentValue = this.value();
          ret2.isFulfilled = true;
        } else if (this.isRejected()) {
          ret2.rejectionReason = this.reason();
          ret2.isRejected = true;
        }
        return ret2;
      };
      Promise3.prototype.all = function() {
        if (arguments.length > 0) {
          this._warn(".all() was passed arguments but it does not take any");
        }
        return new PromiseArray(this).promise();
      };
      Promise3.prototype.error = function(fn) {
        return this.caught(util.originatesFromRejection, fn);
      };
      Promise3.getNewLibraryCopy = module2.exports;
      Promise3.is = function(val) {
        return val instanceof Promise3;
      };
      Promise3.fromNode = Promise3.fromCallback = function(fn) {
        var ret2 = new Promise3(INTERNAL);
        ret2._captureStackTrace();
        var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
        var result = tryCatch2(fn)(nodebackForPromise(ret2, multiArgs));
        if (result === errorObj2) {
          ret2._rejectCallback(result.e, true);
        }
        if (!ret2._isFateSealed()) ret2._setAsyncGuaranteed();
        return ret2;
      };
      Promise3.all = function(promises) {
        return new PromiseArray(promises).promise();
      };
      Promise3.cast = function(obj2) {
        var ret2 = tryConvertToPromise(obj2);
        if (!(ret2 instanceof Promise3)) {
          ret2 = new Promise3(INTERNAL);
          ret2._captureStackTrace();
          ret2._setFulfilled();
          ret2._rejectionHandler0 = obj2;
        }
        return ret2;
      };
      Promise3.resolve = Promise3.fulfilled = Promise3.cast;
      Promise3.reject = Promise3.rejected = function(reason) {
        var ret2 = new Promise3(INTERNAL);
        ret2._captureStackTrace();
        ret2._rejectCallback(reason, true);
        return ret2;
      };
      Promise3.setScheduler = function(fn) {
        if (typeof fn !== "function") {
          throw new TypeError2("expecting a function but got " + util.classString(fn));
        }
        return async.setScheduler(fn);
      };
      Promise3.prototype._then = function(didFulfill, didReject, _, receiver2, internalData) {
        var haveInternalData = internalData !== void 0;
        var promise = haveInternalData ? internalData : new Promise3(INTERNAL);
        var target = this._target();
        var bitField = target._bitField;
        if (!haveInternalData) {
          promise._propagateFrom(this, 3);
          promise._captureStackTrace();
          if (receiver2 === void 0 && (this._bitField & 2097152) !== 0) {
            if (!((bitField & 50397184) === 0)) {
              receiver2 = this._boundValue();
            } else {
              receiver2 = target === this ? void 0 : this._boundTo;
            }
          }
          this._fireEvent("promiseChained", this, promise);
        }
        var context = getContext();
        if (!((bitField & 50397184) === 0)) {
          var handler, value, settler = target._settlePromiseCtx;
          if ((bitField & 33554432) !== 0) {
            value = target._rejectionHandler0;
            handler = didFulfill;
          } else if ((bitField & 16777216) !== 0) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
          } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
          }
          async.invoke(settler, target, {
            handler: util.contextBind(context, handler),
            promise,
            receiver: receiver2,
            value
          });
        } else {
          target._addCallbacks(
            didFulfill,
            didReject,
            promise,
            receiver2,
            context
          );
        }
        return promise;
      };
      Promise3.prototype._length = function() {
        return this._bitField & 65535;
      };
      Promise3.prototype._isFateSealed = function() {
        return (this._bitField & 117506048) !== 0;
      };
      Promise3.prototype._isFollowing = function() {
        return (this._bitField & 67108864) === 67108864;
      };
      Promise3.prototype._setLength = function(len) {
        this._bitField = this._bitField & -65536 | len & 65535;
      };
      Promise3.prototype._setFulfilled = function() {
        this._bitField = this._bitField | 33554432;
        this._fireEvent("promiseFulfilled", this);
      };
      Promise3.prototype._setRejected = function() {
        this._bitField = this._bitField | 16777216;
        this._fireEvent("promiseRejected", this);
      };
      Promise3.prototype._setFollowing = function() {
        this._bitField = this._bitField | 67108864;
        this._fireEvent("promiseResolved", this);
      };
      Promise3.prototype._setIsFinal = function() {
        this._bitField = this._bitField | 4194304;
      };
      Promise3.prototype._isFinal = function() {
        return (this._bitField & 4194304) > 0;
      };
      Promise3.prototype._unsetCancelled = function() {
        this._bitField = this._bitField & ~65536;
      };
      Promise3.prototype._setCancelled = function() {
        this._bitField = this._bitField | 65536;
        this._fireEvent("promiseCancelled", this);
      };
      Promise3.prototype._setWillBeCancelled = function() {
        this._bitField = this._bitField | 8388608;
      };
      Promise3.prototype._setAsyncGuaranteed = function() {
        if (async.hasCustomScheduler()) return;
        var bitField = this._bitField;
        this._bitField = bitField | (bitField & 536870912) >> 2 ^ 134217728;
      };
      Promise3.prototype._setNoAsyncGuarantee = function() {
        this._bitField = (this._bitField | 536870912) & ~134217728;
      };
      Promise3.prototype._receiverAt = function(index) {
        var ret2 = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];
        if (ret2 === UNDEFINED_BINDING) {
          return void 0;
        } else if (ret2 === void 0 && this._isBound()) {
          return this._boundValue();
        }
        return ret2;
      };
      Promise3.prototype._promiseAt = function(index) {
        return this[index * 4 - 4 + 2];
      };
      Promise3.prototype._fulfillmentHandlerAt = function(index) {
        return this[index * 4 - 4 + 0];
      };
      Promise3.prototype._rejectionHandlerAt = function(index) {
        return this[index * 4 - 4 + 1];
      };
      Promise3.prototype._boundValue = function() {
      };
      Promise3.prototype._migrateCallback0 = function(follower) {
        var bitField = follower._bitField;
        var fulfill = follower._fulfillmentHandler0;
        var reject = follower._rejectionHandler0;
        var promise = follower._promise0;
        var receiver2 = follower._receiverAt(0);
        if (receiver2 === void 0) receiver2 = UNDEFINED_BINDING;
        this._addCallbacks(fulfill, reject, promise, receiver2, null);
      };
      Promise3.prototype._migrateCallbackAt = function(follower, index) {
        var fulfill = follower._fulfillmentHandlerAt(index);
        var reject = follower._rejectionHandlerAt(index);
        var promise = follower._promiseAt(index);
        var receiver2 = follower._receiverAt(index);
        if (receiver2 === void 0) receiver2 = UNDEFINED_BINDING;
        this._addCallbacks(fulfill, reject, promise, receiver2, null);
      };
      Promise3.prototype._addCallbacks = function(fulfill, reject, promise, receiver2, context) {
        var index = this._length();
        if (index >= 65535 - 4) {
          index = 0;
          this._setLength(0);
        }
        if (index === 0) {
          this._promise0 = promise;
          this._receiver0 = receiver2;
          if (typeof fulfill === "function") {
            this._fulfillmentHandler0 = util.contextBind(context, fulfill);
          }
          if (typeof reject === "function") {
            this._rejectionHandler0 = util.contextBind(context, reject);
          }
        } else {
          var base = index * 4 - 4;
          this[base + 2] = promise;
          this[base + 3] = receiver2;
          if (typeof fulfill === "function") {
            this[base + 0] = util.contextBind(context, fulfill);
          }
          if (typeof reject === "function") {
            this[base + 1] = util.contextBind(context, reject);
          }
        }
        this._setLength(index + 1);
        return index;
      };
      Promise3.prototype._proxy = function(proxyable, arg) {
        this._addCallbacks(void 0, void 0, arg, proxyable, null);
      };
      Promise3.prototype._resolveCallback = function(value, shouldBind) {
        if ((this._bitField & 117506048) !== 0) return;
        if (value === this)
          return this._rejectCallback(makeSelfResolutionError(), false);
        var maybePromise = tryConvertToPromise(value, this);
        if (!(maybePromise instanceof Promise3)) return this._fulfill(value);
        if (shouldBind) this._propagateFrom(maybePromise, 2);
        var promise = maybePromise._target();
        if (promise === this) {
          this._reject(makeSelfResolutionError());
          return;
        }
        var bitField = promise._bitField;
        if ((bitField & 50397184) === 0) {
          var len = this._length();
          if (len > 0) promise._migrateCallback0(this);
          for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
          }
          this._setFollowing();
          this._setLength(0);
          this._setFollowee(maybePromise);
        } else if ((bitField & 33554432) !== 0) {
          this._fulfill(promise._value());
        } else if ((bitField & 16777216) !== 0) {
          this._reject(promise._reason());
        } else {
          var reason = new CancellationError("late cancellation observer");
          promise._attachExtraTrace(reason);
          this._reject(reason);
        }
      };
      Promise3.prototype._rejectCallback = function(reason, synchronous, ignoreNonErrorWarnings) {
        var trace = util.ensureErrorObject(reason);
        var hasStack = trace === reason;
        if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
          var message = "a promise was rejected with a non-error: " + util.classString(reason);
          this._warn(message, true);
        }
        this._attachExtraTrace(trace, synchronous ? hasStack : false);
        this._reject(reason);
      };
      Promise3.prototype._resolveFromExecutor = function(executor) {
        if (executor === INTERNAL) return;
        var promise = this;
        this._captureStackTrace();
        this._pushContext();
        var synchronous = true;
        var r = this._execute(executor, function(value) {
          promise._resolveCallback(value);
        }, function(reason) {
          promise._rejectCallback(reason, synchronous);
        });
        synchronous = false;
        this._popContext();
        if (r !== void 0) {
          promise._rejectCallback(r, true);
        }
      };
      Promise3.prototype._settlePromiseFromHandler = function(handler, receiver2, value, promise) {
        var bitField = promise._bitField;
        if ((bitField & 65536) !== 0) return;
        promise._pushContext();
        var x;
        if (receiver2 === APPLY) {
          if (!value || typeof value.length !== "number") {
            x = errorObj2;
            x.e = new TypeError2("cannot .spread() a non-array: " + util.classString(value));
          } else {
            x = tryCatch2(handler).apply(this._boundValue(), value);
          }
        } else {
          x = tryCatch2(handler).call(receiver2, value);
        }
        var promiseCreated = promise._popContext();
        bitField = promise._bitField;
        if ((bitField & 65536) !== 0) return;
        if (x === NEXT_FILTER) {
          promise._reject(value);
        } else if (x === errorObj2) {
          promise._rejectCallback(x.e, false);
        } else {
          debug.checkForgottenReturns(x, promiseCreated, "", promise, this);
          promise._resolveCallback(x);
        }
      };
      Promise3.prototype._target = function() {
        var ret2 = this;
        while (ret2._isFollowing()) ret2 = ret2._followee();
        return ret2;
      };
      Promise3.prototype._followee = function() {
        return this._rejectionHandler0;
      };
      Promise3.prototype._setFollowee = function(promise) {
        this._rejectionHandler0 = promise;
      };
      Promise3.prototype._settlePromise = function(promise, handler, receiver2, value) {
        var isPromise = promise instanceof Promise3;
        var bitField = this._bitField;
        var asyncGuaranteed = (bitField & 134217728) !== 0;
        if ((bitField & 65536) !== 0) {
          if (isPromise) promise._invokeInternalOnCancel();
          if (receiver2 instanceof PassThroughHandlerContext && receiver2.isFinallyHandler()) {
            receiver2.cancelPromise = promise;
            if (tryCatch2(handler).call(receiver2, value) === errorObj2) {
              promise._reject(errorObj2.e);
            }
          } else if (handler === reflectHandler2) {
            promise._fulfill(reflectHandler2.call(receiver2));
          } else if (receiver2 instanceof Proxyable) {
            receiver2._promiseCancelled(promise);
          } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
          } else {
            receiver2.cancel();
          }
        } else if (typeof handler === "function") {
          if (!isPromise) {
            handler.call(receiver2, value, promise);
          } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver2, value, promise);
          }
        } else if (receiver2 instanceof Proxyable) {
          if (!receiver2._isResolved()) {
            if ((bitField & 33554432) !== 0) {
              receiver2._promiseFulfilled(value, promise);
            } else {
              receiver2._promiseRejected(value, promise);
            }
          }
        } else if (isPromise) {
          if (asyncGuaranteed) promise._setAsyncGuaranteed();
          if ((bitField & 33554432) !== 0) {
            promise._fulfill(value);
          } else {
            promise._reject(value);
          }
        }
      };
      Promise3.prototype._settlePromiseLateCancellationObserver = function(ctx) {
        var handler = ctx.handler;
        var promise = ctx.promise;
        var receiver2 = ctx.receiver;
        var value = ctx.value;
        if (typeof handler === "function") {
          if (!(promise instanceof Promise3)) {
            handler.call(receiver2, value, promise);
          } else {
            this._settlePromiseFromHandler(handler, receiver2, value, promise);
          }
        } else if (promise instanceof Promise3) {
          promise._reject(value);
        }
      };
      Promise3.prototype._settlePromiseCtx = function(ctx) {
        this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
      };
      Promise3.prototype._settlePromise0 = function(handler, value, bitField) {
        var promise = this._promise0;
        var receiver2 = this._receiverAt(0);
        this._promise0 = void 0;
        this._receiver0 = void 0;
        this._settlePromise(promise, handler, receiver2, value);
      };
      Promise3.prototype._clearCallbackDataAtIndex = function(index) {
        var base = index * 4 - 4;
        this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = void 0;
      };
      Promise3.prototype._fulfill = function(value) {
        var bitField = this._bitField;
        if ((bitField & 117506048) >>> 16) return;
        if (value === this) {
          var err = makeSelfResolutionError();
          this._attachExtraTrace(err);
          return this._reject(err);
        }
        this._setFulfilled();
        this._rejectionHandler0 = value;
        if ((bitField & 65535) > 0) {
          if ((bitField & 134217728) !== 0) {
            this._settlePromises();
          } else {
            async.settlePromises(this);
          }
          this._dereferenceTrace();
        }
      };
      Promise3.prototype._reject = function(reason) {
        var bitField = this._bitField;
        if ((bitField & 117506048) >>> 16) return;
        this._setRejected();
        this._fulfillmentHandler0 = reason;
        if (this._isFinal()) {
          return async.fatalError(reason, util.isNode);
        }
        if ((bitField & 65535) > 0) {
          async.settlePromises(this);
        } else {
          this._ensurePossibleRejectionHandled();
        }
      };
      Promise3.prototype._fulfillPromises = function(len, value) {
        for (var i = 1; i < len; i++) {
          var handler = this._fulfillmentHandlerAt(i);
          var promise = this._promiseAt(i);
          var receiver2 = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise, handler, receiver2, value);
        }
      };
      Promise3.prototype._rejectPromises = function(len, reason) {
        for (var i = 1; i < len; i++) {
          var handler = this._rejectionHandlerAt(i);
          var promise = this._promiseAt(i);
          var receiver2 = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise, handler, receiver2, reason);
        }
      };
      Promise3.prototype._settlePromises = function() {
        var bitField = this._bitField;
        var len = bitField & 65535;
        if (len > 0) {
          if ((bitField & 16842752) !== 0) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
          } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
          }
          this._setLength(0);
        }
        this._clearCancellationData();
      };
      Promise3.prototype._settledValue = function() {
        var bitField = this._bitField;
        if ((bitField & 33554432) !== 0) {
          return this._rejectionHandler0;
        } else if ((bitField & 16777216) !== 0) {
          return this._fulfillmentHandler0;
        }
      };
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        es52.defineProperty(Promise3.prototype, Symbol.toStringTag, {
          get: function() {
            return "Object";
          }
        });
      }
      function deferResolve(v) {
        this.promise._resolveCallback(v);
      }
      function deferReject(v) {
        this.promise._rejectCallback(v, false);
      }
      Promise3.defer = Promise3.pending = function() {
        debug.deprecated("Promise.defer", "new Promise");
        var promise = new Promise3(INTERNAL);
        return {
          promise,
          resolve: deferResolve,
          reject: deferReject
        };
      };
      util.notEnumerableProp(
        Promise3,
        "_makeSelfResolutionError",
        makeSelfResolutionError
      );
      require_method()(
        Promise3,
        INTERNAL,
        tryConvertToPromise,
        apiRejection,
        debug
      );
      require_bind()(Promise3, INTERNAL, tryConvertToPromise, debug);
      require_cancel()(Promise3, PromiseArray, apiRejection, debug);
      require_direct_resolve()(Promise3);
      require_synchronous_inspection()(Promise3);
      require_join()(
        Promise3,
        PromiseArray,
        tryConvertToPromise,
        INTERNAL,
        async
      );
      Promise3.Promise = Promise3;
      Promise3.version = "3.7.2";
      require_call_get()(Promise3);
      require_generators()(Promise3, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
      require_map()(Promise3, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
      require_nodeify()(Promise3);
      require_promisify()(Promise3, INTERNAL);
      require_props()(Promise3, PromiseArray, tryConvertToPromise, apiRejection);
      require_race()(Promise3, INTERNAL, tryConvertToPromise, apiRejection);
      require_reduce()(Promise3, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
      require_settle()(Promise3, PromiseArray, debug);
      require_some()(Promise3, PromiseArray, apiRejection);
      require_timers()(Promise3, INTERNAL, debug);
      require_using()(Promise3, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
      require_any()(Promise3);
      require_each()(Promise3, INTERNAL);
      require_filter()(Promise3, INTERNAL);
      util.toFastProperties(Promise3);
      util.toFastProperties(Promise3.prototype);
      function fillTypes(value) {
        var p = new Promise3(INTERNAL);
        p._fulfillmentHandler0 = value;
        p._rejectionHandler0 = value;
        p._promise0 = value;
        p._receiver0 = value;
      }
      fillTypes({ a: 1 });
      fillTypes({ b: 2 });
      fillTypes({ c: 3 });
      fillTypes(1);
      fillTypes(function() {
      });
      fillTypes(void 0);
      fillTypes(false);
      fillTypes(new Promise3(INTERNAL));
      debug.setBounds(Async.firstLineError, util.lastLineError);
      return Promise3;
    };
  }
});

// ../../node_modules/bluebird/js/release/bluebird.js
var require_bluebird = __commonJS({
  "../../node_modules/bluebird/js/release/bluebird.js"(exports2, module2) {
    "use strict";
    var old;
    if (typeof Promise !== "undefined") old = Promise;
    function noConflict() {
      try {
        if (Promise === bluebird) Promise = old;
      } catch (e) {
      }
      return bluebird;
    }
    var bluebird = require_promise()();
    bluebird.noConflict = noConflict;
    module2.exports = bluebird;
  }
});

// ../../node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "../../node_modules/graceful-fs/polyfills.js"(exports2, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs2) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs2);
      }
      if (!fs2.lutimes) {
        patchLutimes(fs2);
      }
      fs2.chown = chownFix(fs2.chown);
      fs2.fchown = chownFix(fs2.fchown);
      fs2.lchown = chownFix(fs2.lchown);
      fs2.chmod = chmodFix(fs2.chmod);
      fs2.fchmod = chmodFix(fs2.fchmod);
      fs2.lchmod = chmodFix(fs2.lchmod);
      fs2.chownSync = chownFixSync(fs2.chownSync);
      fs2.fchownSync = chownFixSync(fs2.fchownSync);
      fs2.lchownSync = chownFixSync(fs2.lchownSync);
      fs2.chmodSync = chmodFixSync(fs2.chmodSync);
      fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
      fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
      fs2.stat = statFix(fs2.stat);
      fs2.fstat = statFix(fs2.fstat);
      fs2.lstat = statFix(fs2.lstat);
      fs2.statSync = statFixSync(fs2.statSync);
      fs2.fstatSync = statFixSync(fs2.fstatSync);
      fs2.lstatSync = statFixSync(fs2.lstatSync);
      if (fs2.chmod && !fs2.lchmod) {
        fs2.lchmod = function(path, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs2.lchmodSync = function() {
        };
      }
      if (fs2.chown && !fs2.lchown) {
        fs2.lchown = function(path, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs2.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs2.rename = typeof fs2.rename !== "function" ? fs2.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs2.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb) cb(er);
            });
          }
          if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs2.rename);
      }
      fs2.read = typeof fs2.read !== "function" ? fs2.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs2.read);
      fs2.readSync = typeof fs2.readSync !== "function" ? fs2.readSync : /* @__PURE__ */ function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs2, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs2.readSync);
      function patchLchmod(fs3) {
        fs3.lchmod = function(path, mode, callback) {
          fs3.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback) callback(err);
                return;
              }
              fs3.fchmod(fd, mode, function(err2) {
                fs3.close(fd, function(err22) {
                  if (callback) callback(err2 || err22);
                });
              });
            }
          );
        };
        fs3.lchmodSync = function(path, mode) {
          var fd = fs3.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret2;
          try {
            ret2 = fs3.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs3.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs3.closeSync(fd);
            }
          }
          return ret2;
        };
      }
      function patchLutimes(fs3) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs3.futimes) {
          fs3.lutimes = function(path, at, mt, cb) {
            fs3.open(path, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb) cb(er);
                return;
              }
              fs3.futimes(fd, at, mt, function(er2) {
                fs3.close(fd, function(er22) {
                  if (cb) cb(er2 || er22);
                });
              });
            });
          };
          fs3.lutimesSync = function(path, at, mt) {
            var fd = fs3.openSync(path, constants.O_SYMLINK);
            var ret2;
            var threw = true;
            try {
              ret2 = fs3.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs3.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs3.closeSync(fd);
              }
            }
            return ret2;
          };
        } else if (fs3.futimes) {
          fs3.lutimes = function(_a, _b, _c, cb) {
            if (cb) process.nextTick(cb);
          };
          fs3.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig) return orig;
        return function(target, mode, cb) {
          return orig.call(fs2, target, mode, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig) return orig;
        return function(target, mode) {
          try {
            return orig.call(fs2, target, mode);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig) return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs2, target, uid, gid, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig) return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs2, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig) return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0) stats.uid += 4294967296;
              if (stats.gid < 0) stats.gid += 4294967296;
            }
            if (cb) cb.apply(this, arguments);
          }
          return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig) return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
          if (stats) {
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// ../../node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "../../node_modules/graceful-fs/legacy-streams.js"(exports2, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs2) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path, options);
        Stream.call(this);
        var self2 = this;
        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding) this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs2.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self2.emit("error", err);
            self2.readable = false;
            return;
          }
          self2.fd = fd;
          self2.emit("open", fd);
          self2._read();
        });
      }
      function WriteStream(path, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path, options);
        Stream.call(this);
        this.path = path;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs2.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// ../../node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "../../node_modules/graceful-fs/clone.js"(exports2, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj2) {
      return obj2.__proto__;
    };
    function clone(obj2) {
      if (obj2 === null || typeof obj2 !== "object")
        return obj2;
      if (obj2 instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj2) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj2).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj2, key));
      });
      return copy;
    }
  }
});

// ../../node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "../../node_modules/graceful-fs/graceful-fs.js"(exports2, module2) {
    var fs2 = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs2[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs2, queue);
      fs2.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs2, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs2.close);
      fs2.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs2, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs2.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs2[gracefulQueue]);
          require("assert").equal(fs2[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs2[gracefulQueue]);
    }
    module2.exports = patch(clone(fs2));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs2.__patched) {
      module2.exports = patch(fs2);
      fs2.__patched = true;
    }
    function patch(fs3) {
      polyfills(fs3);
      fs3.gracefulify = patch;
      fs3.createReadStream = createReadStream2;
      fs3.createWriteStream = createWriteStream2;
      var fs$readFile = fs3.readFile;
      fs3.readFile = readFile2;
      function readFile2(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path, options, cb);
        function go$readFile(path2, options2, cb2, startTime) {
          return fs$readFile(path2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs3.writeFile;
      fs3.writeFile = writeFile2;
      function writeFile2(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path, data, options, cb);
        function go$writeFile(path2, data2, options2, cb2, startTime) {
          return fs$writeFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs3.appendFile;
      if (fs$appendFile)
        fs3.appendFile = appendFile2;
      function appendFile2(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path, data, options, cb);
        function go$appendFile(path2, data2, options2, cb2, startTime) {
          return fs$appendFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs3.copyFile;
      if (fs$copyFile)
        fs3.copyFile = copyFile2;
      function copyFile2(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs3.readdir;
      fs3.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, options2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path, options, cb);
        function fs$readdirCallback(path2, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path2, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs3);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs3.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs3.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs3, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs3, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs3, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs3, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream2(path, options) {
        return new fs3.ReadStream(path, options);
      }
      function createWriteStream2(path, options) {
        return new fs3.WriteStream(path, options);
      }
      var fs$open = fs3.open;
      fs3.open = open;
      function open(path, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path, flags, mode, cb);
        function go$open(path2, flags2, mode2, cb2, startTime) {
          return fs$open(path2, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path2, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs3;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs2[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs2[gracefulQueue].length; ++i) {
        if (fs2[gracefulQueue][i].length > 2) {
          fs2[gracefulQueue][i][3] = now;
          fs2[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs2[gracefulQueue].length === 0)
        return;
      var elem = fs2[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs2[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// ../../node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/picomatch/lib/constants.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// ../../node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/picomatch/lib/utils.js"(exports2) {
    "use strict";
    var path = require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
    exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports2.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports2.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports2.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path.sep === "\\";
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// ../../node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "../../node_modules/picomatch/lib/scan.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// ../../node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/picomatch/lib/parse.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse;
  }
});

// ../../node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "../../node_modules/picomatch/lib/picomatch.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var scan = require_scan();
    var parse = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject2 = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject2(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// ../../node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "../../node_modules/picomatch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// ../../node_modules/readdirp/index.js
var require_readdirp = __commonJS({
  "../../node_modules/readdirp/index.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var { Readable } = require("stream");
    var sysPath = require("path");
    var { promisify } = require("util");
    var picomatch = require_picomatch2();
    var readdir = promisify(fs2.readdir);
    var stat = promisify(fs2.stat);
    var lstat = promisify(fs2.lstat);
    var realpath = promisify(fs2.realpath);
    var BANG = "!";
    var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
    var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
    var FILE_TYPE = "files";
    var DIR_TYPE = "directories";
    var FILE_DIR_TYPE = "files_directories";
    var EVERYTHING_TYPE = "all";
    var ALL_TYPES = [FILE_TYPE, DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE];
    var isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
    var [maj, min] = process.versions.node.split(".").slice(0, 2).map((n) => Number.parseInt(n, 10));
    var wantBigintFsStats = process.platform === "win32" && (maj > 10 || maj === 10 && min >= 5);
    var normalizeFilter = (filter) => {
      if (filter === void 0) return;
      if (typeof filter === "function") return filter;
      if (typeof filter === "string") {
        const glob = picomatch(filter.trim());
        return (entry) => glob(entry.basename);
      }
      if (Array.isArray(filter)) {
        const positive = [];
        const negative = [];
        for (const item of filter) {
          const trimmed = item.trim();
          if (trimmed.charAt(0) === BANG) {
            negative.push(picomatch(trimmed.slice(1)));
          } else {
            positive.push(picomatch(trimmed));
          }
        }
        if (negative.length > 0) {
          if (positive.length > 0) {
            return (entry) => positive.some((f) => f(entry.basename)) && !negative.some((f) => f(entry.basename));
          }
          return (entry) => !negative.some((f) => f(entry.basename));
        }
        return (entry) => positive.some((f) => f(entry.basename));
      }
    };
    var ReaddirpStream = class _ReaddirpStream extends Readable {
      static get defaultOptions() {
        return {
          root: ".",
          /* eslint-disable no-unused-vars */
          fileFilter: (path) => true,
          directoryFilter: (path) => true,
          /* eslint-enable no-unused-vars */
          type: FILE_TYPE,
          lstat: false,
          depth: 2147483648,
          alwaysStat: false
        };
      }
      constructor(options = {}) {
        super({
          objectMode: true,
          autoDestroy: true,
          highWaterMark: options.highWaterMark || 4096
        });
        const opts = { ..._ReaddirpStream.defaultOptions, ...options };
        const { root, type } = opts;
        this._fileFilter = normalizeFilter(opts.fileFilter);
        this._directoryFilter = normalizeFilter(opts.directoryFilter);
        const statMethod = opts.lstat ? lstat : stat;
        if (wantBigintFsStats) {
          this._stat = (path) => statMethod(path, { bigint: true });
        } else {
          this._stat = statMethod;
        }
        this._maxDepth = opts.depth;
        this._wantsDir = [DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
        this._wantsFile = [FILE_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
        this._wantsEverything = type === EVERYTHING_TYPE;
        this._root = sysPath.resolve(root);
        this._isDirent = "Dirent" in fs2 && !opts.alwaysStat;
        this._statsProp = this._isDirent ? "dirent" : "stats";
        this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
        this.parents = [this._exploreDir(root, 1)];
        this.reading = false;
        this.parent = void 0;
      }
      async _read(batch) {
        if (this.reading) return;
        this.reading = true;
        try {
          while (!this.destroyed && batch > 0) {
            const { path, depth, files = [] } = this.parent || {};
            if (files.length > 0) {
              const slice = files.splice(0, batch).map((dirent) => this._formatEntry(dirent, path));
              for (const entry of await Promise.all(slice)) {
                if (this.destroyed) return;
                const entryType = await this._getEntryType(entry);
                if (entryType === "directory" && this._directoryFilter(entry)) {
                  if (depth <= this._maxDepth) {
                    this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
                  }
                  if (this._wantsDir) {
                    this.push(entry);
                    batch--;
                  }
                } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
                  if (this._wantsFile) {
                    this.push(entry);
                    batch--;
                  }
                }
              }
            } else {
              const parent = this.parents.pop();
              if (!parent) {
                this.push(null);
                break;
              }
              this.parent = await parent;
              if (this.destroyed) return;
            }
          }
        } catch (error) {
          this.destroy(error);
        } finally {
          this.reading = false;
        }
      }
      async _exploreDir(path, depth) {
        let files;
        try {
          files = await readdir(path, this._rdOptions);
        } catch (error) {
          this._onError(error);
        }
        return { files, depth, path };
      }
      async _formatEntry(dirent, path) {
        let entry;
        try {
          const basename = this._isDirent ? dirent.name : dirent;
          const fullPath = sysPath.resolve(sysPath.join(path, basename));
          entry = { path: sysPath.relative(this._root, fullPath), fullPath, basename };
          entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
        } catch (err) {
          this._onError(err);
        }
        return entry;
      }
      _onError(err) {
        if (isNormalFlowError(err) && !this.destroyed) {
          this.emit("warn", err);
        } else {
          this.destroy(err);
        }
      }
      async _getEntryType(entry) {
        const stats = entry && entry[this._statsProp];
        if (!stats) {
          return;
        }
        if (stats.isFile()) {
          return "file";
        }
        if (stats.isDirectory()) {
          return "directory";
        }
        if (stats && stats.isSymbolicLink()) {
          const full = entry.fullPath;
          try {
            const entryRealPath = await realpath(full);
            const entryRealPathStats = await lstat(entryRealPath);
            if (entryRealPathStats.isFile()) {
              return "file";
            }
            if (entryRealPathStats.isDirectory()) {
              const len = entryRealPath.length;
              if (full.startsWith(entryRealPath) && full.substr(len, 1) === sysPath.sep) {
                const recursiveError = new Error(
                  `Circular symlink detected: "${full}" points to "${entryRealPath}"`
                );
                recursiveError.code = RECURSIVE_ERROR_CODE;
                return this._onError(recursiveError);
              }
              return "directory";
            }
          } catch (error) {
            this._onError(error);
          }
        }
      }
      _includeAsFile(entry) {
        const stats = entry && entry[this._statsProp];
        return stats && this._wantsEverything && !stats.isDirectory();
      }
    };
    var readdirp = (root, options = {}) => {
      let type = options.entryType || options.type;
      if (type === "both") type = FILE_DIR_TYPE;
      if (type) options.type = type;
      if (!root) {
        throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
      } else if (typeof root !== "string") {
        throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
      } else if (type && !ALL_TYPES.includes(type)) {
        throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
      }
      options.root = root;
      return new ReaddirpStream(options);
    };
    var readdirpPromise = (root, options = {}) => {
      return new Promise((resolve, reject) => {
        const files = [];
        readdirp(root, options).on("data", (entry) => files.push(entry)).on("end", () => resolve(files)).on("error", (error) => reject(error));
      });
    };
    readdirp.promise = readdirpPromise;
    readdirp.ReaddirpStream = ReaddirpStream;
    readdirp.default = readdirp;
    module2.exports = readdirp;
  }
});

// ../../node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "../../node_modules/normalize-path/index.js"(exports2, module2) {
    module2.exports = function(path, stripTrailing) {
      if (typeof path !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path === "\\" || path === "/") return "/";
      var len = path.length;
      if (len <= 1) return path;
      var prefix = "";
      if (len > 4 && path[3] === "\\") {
        var ch = path[2];
        if ((ch === "?" || ch === ".") && path.slice(0, 2) === "\\\\") {
          path = path.slice(2);
          prefix = "//";
        }
      }
      var segs = path.split(/[/\\]+/);
      if (stripTrailing !== false && segs[segs.length - 1] === "") {
        segs.pop();
      }
      return prefix + segs.join("/");
    };
  }
});

// ../../node_modules/anymatch/index.js
var require_anymatch = __commonJS({
  "../../node_modules/anymatch/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var picomatch = require_picomatch2();
    var normalizePath = require_normalize_path();
    var BANG = "!";
    var DEFAULT_OPTIONS = { returnIndex: false };
    var arrify = (item) => Array.isArray(item) ? item : [item];
    var createPattern = (matcher, options) => {
      if (typeof matcher === "function") {
        return matcher;
      }
      if (typeof matcher === "string") {
        const glob = picomatch(matcher, options);
        return (string) => matcher === string || glob(string);
      }
      if (matcher instanceof RegExp) {
        return (string) => matcher.test(string);
      }
      return (string) => false;
    };
    var matchPatterns = (patterns, negPatterns, args, returnIndex) => {
      const isList = Array.isArray(args);
      const _path = isList ? args[0] : args;
      if (!isList && typeof _path !== "string") {
        throw new TypeError("anymatch: second argument must be a string: got " + Object.prototype.toString.call(_path));
      }
      const path = normalizePath(_path, false);
      for (let index = 0; index < negPatterns.length; index++) {
        const nglob = negPatterns[index];
        if (nglob(path)) {
          return returnIndex ? -1 : false;
        }
      }
      const applied = isList && [path].concat(args.slice(1));
      for (let index = 0; index < patterns.length; index++) {
        const pattern = patterns[index];
        if (isList ? pattern(...applied) : pattern(path)) {
          return returnIndex ? index : true;
        }
      }
      return returnIndex ? -1 : false;
    };
    var anymatch = (matchers, testString, options = DEFAULT_OPTIONS) => {
      if (matchers == null) {
        throw new TypeError("anymatch: specify first argument");
      }
      const opts = typeof options === "boolean" ? { returnIndex: options } : options;
      const returnIndex = opts.returnIndex || false;
      const mtchers = arrify(matchers);
      const negatedGlobs = mtchers.filter((item) => typeof item === "string" && item.charAt(0) === BANG).map((item) => item.slice(1)).map((item) => picomatch(item, opts));
      const patterns = mtchers.filter((item) => typeof item !== "string" || typeof item === "string" && item.charAt(0) !== BANG).map((matcher) => createPattern(matcher, opts));
      if (testString == null) {
        return (testString2, ri = false) => {
          const returnIndex2 = typeof ri === "boolean" ? ri : false;
          return matchPatterns(patterns, negatedGlobs, testString2, returnIndex2);
        };
      }
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    };
    anymatch.default = anymatch;
    module2.exports = anymatch;
  }
});

// ../../node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "../../node_modules/is-extglob/index.js"(exports2, module2) {
    module2.exports = function isExtglob(str) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      var match;
      while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
        if (match[2]) return true;
        str = str.slice(match.index + match[0].length);
      }
      return false;
    };
  }
});

// ../../node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "../../node_modules/is-glob/index.js"(exports2, module2) {
    var isExtglob = require_is_extglob();
    var chars = { "{": "}", "(": ")", "[": "]" };
    var strictCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      var pipeIndex = -2;
      var closeSquareIndex = -2;
      var closeCurlyIndex = -2;
      var closeParenIndex = -2;
      var backSlashIndex = -2;
      while (index < str.length) {
        if (str[index] === "*") {
          return true;
        }
        if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) {
          return true;
        }
        if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf("]", index);
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
          }
        }
        if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
          closeCurlyIndex = str.indexOf("}", index);
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true;
            }
          }
        }
        if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
          closeParenIndex = str.indexOf(")", index);
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true;
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf("|", index);
          }
          if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
            closeParenIndex = str.indexOf(")", pipeIndex);
            if (closeParenIndex > pipeIndex) {
              backSlashIndex = str.indexOf("\\", pipeIndex);
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true;
              }
            }
          }
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    var relaxedCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true;
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    module2.exports = function isGlob(str, options) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      if (isExtglob(str)) {
        return true;
      }
      var check = strictCheck;
      if (options && options.strict === false) {
        check = relaxedCheck;
      }
      return check(str);
    };
  }
});

// ../../node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  "../../node_modules/glob-parent/index.js"(exports2, module2) {
    "use strict";
    var isGlob = require_is_glob();
    var pathPosixDirname = require("path").posix.dirname;
    var isWin32 = require("os").platform() === "win32";
    var slash = "/";
    var backslash = /\\/g;
    var enclosure = /[\{\[].*[\}\]]$/;
    var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
    module2.exports = function globParent(str, opts) {
      var options = Object.assign({ flipBackslashes: true }, opts);
      if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
        str = str.replace(backslash, slash);
      }
      if (enclosure.test(str)) {
        str += slash;
      }
      str += "a";
      do {
        str = pathPosixDirname(str);
      } while (isGlob(str) || globby.test(str));
      return str.replace(escaped, "$1");
    };
  }
});

// ../../node_modules/braces/lib/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/braces/lib/utils.js"(exports2) {
    "use strict";
    exports2.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports2.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports2.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false;
      if (!exports2.isInteger(min) || !exports2.isInteger(max)) return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports2.escapeNode = (block, n = 0, type) => {
      const node = block.nodes[n];
      if (!node) return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports2.encloseBrace = (node) => {
      if (node.type !== "brace") return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isInvalidBrace = (block) => {
      if (block.type !== "brace") return false;
      if (block.invalid === true || block.dollar) return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports2.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text") acc.push(node.value);
      if (node.type === "range") node.type = "text";
      return acc;
    }, []);
    exports2.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          if (ele !== void 0) {
            result.push(ele);
          }
        }
        return result;
      };
      flat(args);
      return result;
    };
  }
});

// ../../node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/braces/lib/stringify.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = (ast, options = {}) => {
      const stringify = (node, parent = {}) => {
        const invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});

// ../../node_modules/is-number/index.js
var require_is_number = __commonJS({
  "../../node_modules/is-number/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});

// ../../node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "../../node_modules/to-regex-range/index.js"(exports2, module2) {
    "use strict";
    var isNumber = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = { min, max, a, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = /* @__PURE__ */ new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj2 = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj2.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj2.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj2.string = zeros + obj2.pattern + toQuantifier(obj2.count);
        tokens.push(obj2);
        start = max2 + 1;
        prev = obj2;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        if (!intersection && !contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
        if (intersection && contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module2.exports = toRegexRange;
  }
});

// ../../node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "../../node_modules/fill-range/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var toRegexRange = require_to_regex_range();
    var isObject2 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-") value = value.slice(1);
      if (value === "0") return false;
      while (value[++index] === "0") ;
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash) input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength) input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options, maxLen) => {
      parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b) return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true) throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true) throw rangeError([start, end]);
        return [];
      }
      if (a === 0) a = 0;
      if (b === 0) b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
        return invalidRange(start, end, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a > b;
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, { transform: step });
      }
      if (isObject2(step)) {
        return fill(start, end, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true) opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber(step)) {
        if (step != null && !isObject2(step)) return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module2.exports = fill;
  }
});

// ../../node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "../../node_modules/braces/lib/compile.js"(exports2, module2) {
    "use strict";
    var fill = require_fill_range();
    var utils = require_utils2();
    var compile = (ast, options = {}) => {
      const walk = (node, parent = {}) => {
        const invalidBlock = utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        const invalid = invalidBlock === true || invalidNode === true;
        const prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          console.log("node.isClose", prefix, node.value);
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          const range = fill(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += walk(child, node);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module2.exports = compile;
  }
});

// ../../node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "../../node_modules/braces/lib/expand.js"(exports2, module2) {
    "use strict";
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils2();
    var append = (queue = "", stash = "", enclose = false) => {
      const result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length) return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (const item of queue) {
        if (Array.isArray(item)) {
          for (const value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      const walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        const enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          const child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1) queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module2.exports = expand;
  }
});

// ../../node_modules/braces/lib/constants.js
var require_constants2 = __commonJS({
  "../../node_modules/braces/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      MAX_LENGTH: 1e4,
      // Digits
      CHAR_0: "0",
      /* 0 */
      CHAR_9: "9",
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: "A",
      /* A */
      CHAR_LOWERCASE_A: "a",
      /* a */
      CHAR_UPPERCASE_Z: "Z",
      /* Z */
      CHAR_LOWERCASE_Z: "z",
      /* z */
      CHAR_LEFT_PARENTHESES: "(",
      /* ( */
      CHAR_RIGHT_PARENTHESES: ")",
      /* ) */
      CHAR_ASTERISK: "*",
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: "&",
      /* & */
      CHAR_AT: "@",
      /* @ */
      CHAR_BACKSLASH: "\\",
      /* \ */
      CHAR_BACKTICK: "`",
      /* ` */
      CHAR_CARRIAGE_RETURN: "\r",
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: "^",
      /* ^ */
      CHAR_COLON: ":",
      /* : */
      CHAR_COMMA: ",",
      /* , */
      CHAR_DOLLAR: "$",
      /* . */
      CHAR_DOT: ".",
      /* . */
      CHAR_DOUBLE_QUOTE: '"',
      /* " */
      CHAR_EQUAL: "=",
      /* = */
      CHAR_EXCLAMATION_MARK: "!",
      /* ! */
      CHAR_FORM_FEED: "\f",
      /* \f */
      CHAR_FORWARD_SLASH: "/",
      /* / */
      CHAR_HASH: "#",
      /* # */
      CHAR_HYPHEN_MINUS: "-",
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: "<",
      /* < */
      CHAR_LEFT_CURLY_BRACE: "{",
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: "[",
      /* [ */
      CHAR_LINE_FEED: "\n",
      /* \n */
      CHAR_NO_BREAK_SPACE: "\xA0",
      /* \u00A0 */
      CHAR_PERCENT: "%",
      /* % */
      CHAR_PLUS: "+",
      /* + */
      CHAR_QUESTION_MARK: "?",
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      /* > */
      CHAR_RIGHT_CURLY_BRACE: "}",
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      /* ] */
      CHAR_SEMICOLON: ";",
      /* ; */
      CHAR_SINGLE_QUOTE: "'",
      /* ' */
      CHAR_SPACE: " ",
      /*   */
      CHAR_TAB: "	",
      /* \t */
      CHAR_UNDERSCORE: "_",
      /* _ */
      CHAR_VERTICAL_LINE: "|",
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
      /* \uFEFF */
    };
  }
});

// ../../node_modules/braces/lib/parse.js
var require_parse2 = __commonJS({
  "../../node_modules/braces/lib/parse.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      /* \ */
      CHAR_BACKTICK,
      /* ` */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
      CHAR_DOUBLE_QUOTE,
      /* " */
      CHAR_SINGLE_QUOTE,
      /* ' */
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants2();
    var parse = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      const opts = options || {};
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      }
      const ast = { type: "root", input, nodes: [] };
      const stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      const length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          const open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true) value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          const brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          const type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            const open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          const siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            const before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open") node.isOpen = true;
              if (node.type === "close") node.isClose = true;
              if (!node.nodes) node.type = "text";
              node.invalid = true;
            }
          });
          const parent = stack[stack.length - 1];
          const index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module2.exports = parse;
  }
});

// ../../node_modules/braces/index.js
var require_braces = __commonJS({
  "../../node_modules/braces/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse = require_parse2();
    var braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (const pattern of input) {
          const result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module2.exports = braces;
  }
});

// ../../node_modules/binary-extensions/binary-extensions.json
var require_binary_extensions = __commonJS({
  "../../node_modules/binary-extensions/binary-extensions.json"(exports2, module2) {
    module2.exports = [
      "3dm",
      "3ds",
      "3g2",
      "3gp",
      "7z",
      "a",
      "aac",
      "adp",
      "afdesign",
      "afphoto",
      "afpub",
      "ai",
      "aif",
      "aiff",
      "alz",
      "ape",
      "apk",
      "appimage",
      "ar",
      "arj",
      "asf",
      "au",
      "avi",
      "bak",
      "baml",
      "bh",
      "bin",
      "bk",
      "bmp",
      "btif",
      "bz2",
      "bzip2",
      "cab",
      "caf",
      "cgm",
      "class",
      "cmx",
      "cpio",
      "cr2",
      "cur",
      "dat",
      "dcm",
      "deb",
      "dex",
      "djvu",
      "dll",
      "dmg",
      "dng",
      "doc",
      "docm",
      "docx",
      "dot",
      "dotm",
      "dra",
      "DS_Store",
      "dsk",
      "dts",
      "dtshd",
      "dvb",
      "dwg",
      "dxf",
      "ecelp4800",
      "ecelp7470",
      "ecelp9600",
      "egg",
      "eol",
      "eot",
      "epub",
      "exe",
      "f4v",
      "fbs",
      "fh",
      "fla",
      "flac",
      "flatpak",
      "fli",
      "flv",
      "fpx",
      "fst",
      "fvt",
      "g3",
      "gh",
      "gif",
      "graffle",
      "gz",
      "gzip",
      "h261",
      "h263",
      "h264",
      "icns",
      "ico",
      "ief",
      "img",
      "ipa",
      "iso",
      "jar",
      "jpeg",
      "jpg",
      "jpgv",
      "jpm",
      "jxr",
      "key",
      "ktx",
      "lha",
      "lib",
      "lvp",
      "lz",
      "lzh",
      "lzma",
      "lzo",
      "m3u",
      "m4a",
      "m4v",
      "mar",
      "mdi",
      "mht",
      "mid",
      "midi",
      "mj2",
      "mka",
      "mkv",
      "mmr",
      "mng",
      "mobi",
      "mov",
      "movie",
      "mp3",
      "mp4",
      "mp4a",
      "mpeg",
      "mpg",
      "mpga",
      "mxu",
      "nef",
      "npx",
      "numbers",
      "nupkg",
      "o",
      "odp",
      "ods",
      "odt",
      "oga",
      "ogg",
      "ogv",
      "otf",
      "ott",
      "pages",
      "pbm",
      "pcx",
      "pdb",
      "pdf",
      "pea",
      "pgm",
      "pic",
      "png",
      "pnm",
      "pot",
      "potm",
      "potx",
      "ppa",
      "ppam",
      "ppm",
      "pps",
      "ppsm",
      "ppsx",
      "ppt",
      "pptm",
      "pptx",
      "psd",
      "pya",
      "pyc",
      "pyo",
      "pyv",
      "qt",
      "rar",
      "ras",
      "raw",
      "resources",
      "rgb",
      "rip",
      "rlc",
      "rmf",
      "rmvb",
      "rpm",
      "rtf",
      "rz",
      "s3m",
      "s7z",
      "scpt",
      "sgi",
      "shar",
      "snap",
      "sil",
      "sketch",
      "slk",
      "smv",
      "snk",
      "so",
      "stl",
      "suo",
      "sub",
      "swf",
      "tar",
      "tbz",
      "tbz2",
      "tga",
      "tgz",
      "thmx",
      "tif",
      "tiff",
      "tlz",
      "ttc",
      "ttf",
      "txz",
      "udf",
      "uvh",
      "uvi",
      "uvm",
      "uvp",
      "uvs",
      "uvu",
      "viv",
      "vob",
      "war",
      "wav",
      "wax",
      "wbmp",
      "wdp",
      "weba",
      "webm",
      "webp",
      "whl",
      "wim",
      "wm",
      "wma",
      "wmv",
      "wmx",
      "woff",
      "woff2",
      "wrm",
      "wvx",
      "xbm",
      "xif",
      "xla",
      "xlam",
      "xls",
      "xlsb",
      "xlsm",
      "xlsx",
      "xlt",
      "xltm",
      "xltx",
      "xm",
      "xmind",
      "xpi",
      "xpm",
      "xwd",
      "xz",
      "z",
      "zip",
      "zipx"
    ];
  }
});

// ../../node_modules/binary-extensions/index.js
var require_binary_extensions2 = __commonJS({
  "../../node_modules/binary-extensions/index.js"(exports2, module2) {
    module2.exports = require_binary_extensions();
  }
});

// ../../node_modules/is-binary-path/index.js
var require_is_binary_path = __commonJS({
  "../../node_modules/is-binary-path/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var binaryExtensions = require_binary_extensions2();
    var extensions = new Set(binaryExtensions);
    module2.exports = (filePath) => extensions.has(path.extname(filePath).slice(1).toLowerCase());
  }
});

// ../../node_modules/chokidar/lib/constants.js
var require_constants3 = __commonJS({
  "../../node_modules/chokidar/lib/constants.js"(exports2) {
    "use strict";
    var { sep } = require("path");
    var { platform } = process;
    var os = require("os");
    exports2.EV_ALL = "all";
    exports2.EV_READY = "ready";
    exports2.EV_ADD = "add";
    exports2.EV_CHANGE = "change";
    exports2.EV_ADD_DIR = "addDir";
    exports2.EV_UNLINK = "unlink";
    exports2.EV_UNLINK_DIR = "unlinkDir";
    exports2.EV_RAW = "raw";
    exports2.EV_ERROR = "error";
    exports2.STR_DATA = "data";
    exports2.STR_END = "end";
    exports2.STR_CLOSE = "close";
    exports2.FSEVENT_CREATED = "created";
    exports2.FSEVENT_MODIFIED = "modified";
    exports2.FSEVENT_DELETED = "deleted";
    exports2.FSEVENT_MOVED = "moved";
    exports2.FSEVENT_CLONED = "cloned";
    exports2.FSEVENT_UNKNOWN = "unknown";
    exports2.FSEVENT_FLAG_MUST_SCAN_SUBDIRS = 1;
    exports2.FSEVENT_TYPE_FILE = "file";
    exports2.FSEVENT_TYPE_DIRECTORY = "directory";
    exports2.FSEVENT_TYPE_SYMLINK = "symlink";
    exports2.KEY_LISTENERS = "listeners";
    exports2.KEY_ERR = "errHandlers";
    exports2.KEY_RAW = "rawEmitters";
    exports2.HANDLER_KEYS = [exports2.KEY_LISTENERS, exports2.KEY_ERR, exports2.KEY_RAW];
    exports2.DOT_SLASH = `.${sep}`;
    exports2.BACK_SLASH_RE = /\\/g;
    exports2.DOUBLE_SLASH_RE = /\/\//;
    exports2.SLASH_OR_BACK_SLASH_RE = /[/\\]/;
    exports2.DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
    exports2.REPLACER_RE = /^\.[/\\]/;
    exports2.SLASH = "/";
    exports2.SLASH_SLASH = "//";
    exports2.BRACE_START = "{";
    exports2.BANG = "!";
    exports2.ONE_DOT = ".";
    exports2.TWO_DOTS = "..";
    exports2.STAR = "*";
    exports2.GLOBSTAR = "**";
    exports2.ROOT_GLOBSTAR = "/**/*";
    exports2.SLASH_GLOBSTAR = "/**";
    exports2.DIR_SUFFIX = "Dir";
    exports2.ANYMATCH_OPTS = { dot: true };
    exports2.STRING_TYPE = "string";
    exports2.FUNCTION_TYPE = "function";
    exports2.EMPTY_STR = "";
    exports2.EMPTY_FN = () => {
    };
    exports2.IDENTITY_FN = (val) => val;
    exports2.isWindows = platform === "win32";
    exports2.isMacos = platform === "darwin";
    exports2.isLinux = platform === "linux";
    exports2.isIBMi = os.type() === "OS400";
  }
});

// ../../node_modules/chokidar/lib/nodefs-handler.js
var require_nodefs_handler = __commonJS({
  "../../node_modules/chokidar/lib/nodefs-handler.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var sysPath = require("path");
    var { promisify } = require("util");
    var isBinaryPath = require_is_binary_path();
    var {
      isWindows,
      isLinux,
      EMPTY_FN,
      EMPTY_STR,
      KEY_LISTENERS,
      KEY_ERR,
      KEY_RAW,
      HANDLER_KEYS,
      EV_CHANGE,
      EV_ADD,
      EV_ADD_DIR,
      EV_ERROR,
      STR_DATA,
      STR_END,
      BRACE_START,
      STAR
    } = require_constants3();
    var THROTTLE_MODE_WATCH = "watch";
    var open = promisify(fs2.open);
    var stat = promisify(fs2.stat);
    var lstat = promisify(fs2.lstat);
    var close = promisify(fs2.close);
    var fsrealpath = promisify(fs2.realpath);
    var statMethods = { lstat, stat };
    var foreach = (val, fn) => {
      if (val instanceof Set) {
        val.forEach(fn);
      } else {
        fn(val);
      }
    };
    var addAndConvert = (main, prop, item) => {
      let container = main[prop];
      if (!(container instanceof Set)) {
        main[prop] = container = /* @__PURE__ */ new Set([container]);
      }
      container.add(item);
    };
    var clearItem = (cont) => (key) => {
      const set = cont[key];
      if (set instanceof Set) {
        set.clear();
      } else {
        delete cont[key];
      }
    };
    var delFromSet = (main, prop, item) => {
      const container = main[prop];
      if (container instanceof Set) {
        container.delete(item);
      } else if (container === item) {
        delete main[prop];
      }
    };
    var isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
    var FsWatchInstances = /* @__PURE__ */ new Map();
    function createFsWatchInstance(path, options, listener, errHandler, emitRaw) {
      const handleEvent = (rawEvent, evPath) => {
        listener(path);
        emitRaw(rawEvent, evPath, { watchedPath: path });
        if (evPath && path !== evPath) {
          fsWatchBroadcast(
            sysPath.resolve(path, evPath),
            KEY_LISTENERS,
            sysPath.join(path, evPath)
          );
        }
      };
      try {
        return fs2.watch(path, options, handleEvent);
      } catch (error) {
        errHandler(error);
      }
    }
    var fsWatchBroadcast = (fullPath, type, val1, val2, val3) => {
      const cont = FsWatchInstances.get(fullPath);
      if (!cont) return;
      foreach(cont[type], (listener) => {
        listener(val1, val2, val3);
      });
    };
    var setFsWatchListener = (path, fullPath, options, handlers) => {
      const { listener, errHandler, rawEmitter } = handlers;
      let cont = FsWatchInstances.get(fullPath);
      let watcher;
      if (!options.persistent) {
        watcher = createFsWatchInstance(
          path,
          options,
          listener,
          errHandler,
          rawEmitter
        );
        return watcher.close.bind(watcher);
      }
      if (cont) {
        addAndConvert(cont, KEY_LISTENERS, listener);
        addAndConvert(cont, KEY_ERR, errHandler);
        addAndConvert(cont, KEY_RAW, rawEmitter);
      } else {
        watcher = createFsWatchInstance(
          path,
          options,
          fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
          errHandler,
          // no need to use broadcast here
          fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
        );
        if (!watcher) return;
        watcher.on(EV_ERROR, async (error) => {
          const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
          cont.watcherUnusable = true;
          if (isWindows && error.code === "EPERM") {
            try {
              const fd = await open(path, "r");
              await close(fd);
              broadcastErr(error);
            } catch (err) {
            }
          } else {
            broadcastErr(error);
          }
        });
        cont = {
          listeners: listener,
          errHandlers: errHandler,
          rawEmitters: rawEmitter,
          watcher
        };
        FsWatchInstances.set(fullPath, cont);
      }
      return () => {
        delFromSet(cont, KEY_LISTENERS, listener);
        delFromSet(cont, KEY_ERR, errHandler);
        delFromSet(cont, KEY_RAW, rawEmitter);
        if (isEmptySet(cont.listeners)) {
          cont.watcher.close();
          FsWatchInstances.delete(fullPath);
          HANDLER_KEYS.forEach(clearItem(cont));
          cont.watcher = void 0;
          Object.freeze(cont);
        }
      };
    };
    var FsWatchFileInstances = /* @__PURE__ */ new Map();
    var setFsWatchFileListener = (path, fullPath, options, handlers) => {
      const { listener, rawEmitter } = handlers;
      let cont = FsWatchFileInstances.get(fullPath);
      let listeners = /* @__PURE__ */ new Set();
      let rawEmitters = /* @__PURE__ */ new Set();
      const copts = cont && cont.options;
      if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
        listeners = cont.listeners;
        rawEmitters = cont.rawEmitters;
        fs2.unwatchFile(fullPath);
        cont = void 0;
      }
      if (cont) {
        addAndConvert(cont, KEY_LISTENERS, listener);
        addAndConvert(cont, KEY_RAW, rawEmitter);
      } else {
        cont = {
          listeners: listener,
          rawEmitters: rawEmitter,
          options,
          watcher: fs2.watchFile(fullPath, options, (curr, prev) => {
            foreach(cont.rawEmitters, (rawEmitter2) => {
              rawEmitter2(EV_CHANGE, fullPath, { curr, prev });
            });
            const currmtime = curr.mtimeMs;
            if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
              foreach(cont.listeners, (listener2) => listener2(path, curr));
            }
          })
        };
        FsWatchFileInstances.set(fullPath, cont);
      }
      return () => {
        delFromSet(cont, KEY_LISTENERS, listener);
        delFromSet(cont, KEY_RAW, rawEmitter);
        if (isEmptySet(cont.listeners)) {
          FsWatchFileInstances.delete(fullPath);
          fs2.unwatchFile(fullPath);
          cont.options = cont.watcher = void 0;
          Object.freeze(cont);
        }
      };
    };
    var NodeFsHandler = class {
      /**
       * @param {import("../index").FSWatcher} fsW
       */
      constructor(fsW) {
        this.fsw = fsW;
        this._boundHandleError = (error) => fsW._handleError(error);
      }
      /**
       * Watch file for changes with fs_watchFile or fs_watch.
       * @param {String} path to file or dir
       * @param {Function} listener on fs change
       * @returns {Function} closer for the watcher instance
       */
      _watchWithNodeFs(path, listener) {
        const opts = this.fsw.options;
        const directory = sysPath.dirname(path);
        const basename = sysPath.basename(path);
        const parent = this.fsw._getWatchedDir(directory);
        parent.add(basename);
        const absolutePath = sysPath.resolve(path);
        const options = { persistent: opts.persistent };
        if (!listener) listener = EMPTY_FN;
        let closer;
        if (opts.usePolling) {
          options.interval = opts.enableBinaryInterval && isBinaryPath(basename) ? opts.binaryInterval : opts.interval;
          closer = setFsWatchFileListener(path, absolutePath, options, {
            listener,
            rawEmitter: this.fsw._emitRaw
          });
        } else {
          closer = setFsWatchListener(path, absolutePath, options, {
            listener,
            errHandler: this._boundHandleError,
            rawEmitter: this.fsw._emitRaw
          });
        }
        return closer;
      }
      /**
       * Watch a file and emit add event if warranted.
       * @param {Path} file Path
       * @param {fs.Stats} stats result of fs_stat
       * @param {Boolean} initialAdd was the file added at watch instantiation?
       * @returns {Function} closer for the watcher instance
       */
      _handleFile(file, stats, initialAdd) {
        if (this.fsw.closed) {
          return;
        }
        const dirname2 = sysPath.dirname(file);
        const basename = sysPath.basename(file);
        const parent = this.fsw._getWatchedDir(dirname2);
        let prevStats = stats;
        if (parent.has(basename)) return;
        const listener = async (path, newStats) => {
          if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5)) return;
          if (!newStats || newStats.mtimeMs === 0) {
            try {
              const newStats2 = await stat(file);
              if (this.fsw.closed) return;
              const at = newStats2.atimeMs;
              const mt = newStats2.mtimeMs;
              if (!at || at <= mt || mt !== prevStats.mtimeMs) {
                this.fsw._emit(EV_CHANGE, file, newStats2);
              }
              if (isLinux && prevStats.ino !== newStats2.ino) {
                this.fsw._closeFile(path);
                prevStats = newStats2;
                this.fsw._addPathCloser(path, this._watchWithNodeFs(file, listener));
              } else {
                prevStats = newStats2;
              }
            } catch (error) {
              this.fsw._remove(dirname2, basename);
            }
          } else if (parent.has(basename)) {
            const at = newStats.atimeMs;
            const mt = newStats.mtimeMs;
            if (!at || at <= mt || mt !== prevStats.mtimeMs) {
              this.fsw._emit(EV_CHANGE, file, newStats);
            }
            prevStats = newStats;
          }
        };
        const closer = this._watchWithNodeFs(file, listener);
        if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
          if (!this.fsw._throttle(EV_ADD, file, 0)) return;
          this.fsw._emit(EV_ADD, file, stats);
        }
        return closer;
      }
      /**
       * Handle symlinks encountered while reading a dir.
       * @param {Object} entry returned by readdirp
       * @param {String} directory path of dir being read
       * @param {String} path of this item
       * @param {String} item basename of this item
       * @returns {Promise<Boolean>} true if no more processing is needed for this entry.
       */
      async _handleSymlink(entry, directory, path, item) {
        if (this.fsw.closed) {
          return;
        }
        const full = entry.fullPath;
        const dir = this.fsw._getWatchedDir(directory);
        if (!this.fsw.options.followSymlinks) {
          this.fsw._incrReadyCount();
          let linkPath;
          try {
            linkPath = await fsrealpath(path);
          } catch (e) {
            this.fsw._emitReady();
            return true;
          }
          if (this.fsw.closed) return;
          if (dir.has(item)) {
            if (this.fsw._symlinkPaths.get(full) !== linkPath) {
              this.fsw._symlinkPaths.set(full, linkPath);
              this.fsw._emit(EV_CHANGE, path, entry.stats);
            }
          } else {
            dir.add(item);
            this.fsw._symlinkPaths.set(full, linkPath);
            this.fsw._emit(EV_ADD, path, entry.stats);
          }
          this.fsw._emitReady();
          return true;
        }
        if (this.fsw._symlinkPaths.has(full)) {
          return true;
        }
        this.fsw._symlinkPaths.set(full, true);
      }
      _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
        directory = sysPath.join(directory, EMPTY_STR);
        if (!wh.hasGlob) {
          throttler = this.fsw._throttle("readdir", directory, 1e3);
          if (!throttler) return;
        }
        const previous = this.fsw._getWatchedDir(wh.path);
        const current = /* @__PURE__ */ new Set();
        let stream = this.fsw._readdirp(directory, {
          fileFilter: (entry) => wh.filterPath(entry),
          directoryFilter: (entry) => wh.filterDir(entry),
          depth: 0
        }).on(STR_DATA, async (entry) => {
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          const item = entry.path;
          let path = sysPath.join(directory, item);
          current.add(item);
          if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path, item)) {
            return;
          }
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          if (item === target || !target && !previous.has(item)) {
            this.fsw._incrReadyCount();
            path = sysPath.join(dir, sysPath.relative(dir, path));
            this._addToNodeFs(path, initialAdd, wh, depth + 1);
          }
        }).on(EV_ERROR, this._boundHandleError);
        return new Promise(
          (resolve) => stream.once(STR_END, () => {
            if (this.fsw.closed) {
              stream = void 0;
              return;
            }
            const wasThrottled = throttler ? throttler.clear() : false;
            resolve();
            previous.getChildren().filter((item) => {
              return item !== directory && !current.has(item) && // in case of intersecting globs;
              // a path may have been filtered out of this readdir, but
              // shouldn't be removed because it matches a different glob
              (!wh.hasGlob || wh.filterPath({
                fullPath: sysPath.resolve(directory, item)
              }));
            }).forEach((item) => {
              this.fsw._remove(directory, item);
            });
            stream = void 0;
            if (wasThrottled) this._handleRead(directory, false, wh, target, dir, depth, throttler);
          })
        );
      }
      /**
       * Read directory to add / remove files from `@watched` list and re-read it on change.
       * @param {String} dir fs path
       * @param {fs.Stats} stats
       * @param {Boolean} initialAdd
       * @param {Number} depth relative to user-supplied path
       * @param {String} target child path targeted for watch
       * @param {Object} wh Common watch helpers for this path
       * @param {String} realpath
       * @returns {Promise<Function>} closer for the watcher instance.
       */
      async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath) {
        const parentDir = this.fsw._getWatchedDir(sysPath.dirname(dir));
        const tracked = parentDir.has(sysPath.basename(dir));
        if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
          if (!wh.hasGlob || wh.globFilter(dir)) this.fsw._emit(EV_ADD_DIR, dir, stats);
        }
        parentDir.add(sysPath.basename(dir));
        this.fsw._getWatchedDir(dir);
        let throttler;
        let closer;
        const oDepth = this.fsw.options.depth;
        if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath)) {
          if (!target) {
            await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
            if (this.fsw.closed) return;
          }
          closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
            if (stats2 && stats2.mtimeMs === 0) return;
            this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
          });
        }
        return closer;
      }
      /**
       * Handle added file, directory, or glob pattern.
       * Delegates call to _handleFile / _handleDir after checks.
       * @param {String} path to file or ir
       * @param {Boolean} initialAdd was the file added at watch instantiation?
       * @param {Object} priorWh depth relative to user-supplied path
       * @param {Number} depth Child path actually targeted for watch
       * @param {String=} target Child path actually targeted for watch
       * @returns {Promise}
       */
      async _addToNodeFs(path, initialAdd, priorWh, depth, target) {
        const ready = this.fsw._emitReady;
        if (this.fsw._isIgnored(path) || this.fsw.closed) {
          ready();
          return false;
        }
        const wh = this.fsw._getWatchHelpers(path, depth);
        if (!wh.hasGlob && priorWh) {
          wh.hasGlob = priorWh.hasGlob;
          wh.globFilter = priorWh.globFilter;
          wh.filterPath = (entry) => priorWh.filterPath(entry);
          wh.filterDir = (entry) => priorWh.filterDir(entry);
        }
        try {
          const stats = await statMethods[wh.statMethod](wh.watchPath);
          if (this.fsw.closed) return;
          if (this.fsw._isIgnored(wh.watchPath, stats)) {
            ready();
            return false;
          }
          const follow = this.fsw.options.followSymlinks && !path.includes(STAR) && !path.includes(BRACE_START);
          let closer;
          if (stats.isDirectory()) {
            const absPath = sysPath.resolve(path);
            const targetPath = follow ? await fsrealpath(path) : path;
            if (this.fsw.closed) return;
            closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
            if (this.fsw.closed) return;
            if (absPath !== targetPath && targetPath !== void 0) {
              this.fsw._symlinkPaths.set(absPath, targetPath);
            }
          } else if (stats.isSymbolicLink()) {
            const targetPath = follow ? await fsrealpath(path) : path;
            if (this.fsw.closed) return;
            const parent = sysPath.dirname(wh.watchPath);
            this.fsw._getWatchedDir(parent).add(wh.watchPath);
            this.fsw._emit(EV_ADD, wh.watchPath, stats);
            closer = await this._handleDir(parent, stats, initialAdd, depth, path, wh, targetPath);
            if (this.fsw.closed) return;
            if (targetPath !== void 0) {
              this.fsw._symlinkPaths.set(sysPath.resolve(path), targetPath);
            }
          } else {
            closer = this._handleFile(wh.watchPath, stats, initialAdd);
          }
          ready();
          this.fsw._addPathCloser(path, closer);
          return false;
        } catch (error) {
          if (this.fsw._handleError(error)) {
            ready();
            return path;
          }
        }
      }
    };
    module2.exports = NodeFsHandler;
  }
});

// ../../node_modules/chokidar/lib/fsevents-handler.js
var require_fsevents_handler = __commonJS({
  "../../node_modules/chokidar/lib/fsevents-handler.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var sysPath = require("path");
    var { promisify } = require("util");
    var fsevents;
    try {
      fsevents = require("fsevents");
    } catch (error) {
      if (process.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR) console.error(error);
    }
    if (fsevents) {
      const mtch = process.version.match(/v(\d+)\.(\d+)/);
      if (mtch && mtch[1] && mtch[2]) {
        const maj = Number.parseInt(mtch[1], 10);
        const min = Number.parseInt(mtch[2], 10);
        if (maj === 8 && min < 16) {
          fsevents = void 0;
        }
      }
    }
    var {
      EV_ADD,
      EV_CHANGE,
      EV_ADD_DIR,
      EV_UNLINK,
      EV_ERROR,
      STR_DATA,
      STR_END,
      FSEVENT_CREATED,
      FSEVENT_MODIFIED,
      FSEVENT_DELETED,
      FSEVENT_MOVED,
      // FSEVENT_CLONED,
      FSEVENT_UNKNOWN,
      FSEVENT_FLAG_MUST_SCAN_SUBDIRS,
      FSEVENT_TYPE_FILE,
      FSEVENT_TYPE_DIRECTORY,
      FSEVENT_TYPE_SYMLINK,
      ROOT_GLOBSTAR,
      DIR_SUFFIX,
      DOT_SLASH,
      FUNCTION_TYPE,
      EMPTY_FN,
      IDENTITY_FN
    } = require_constants3();
    var Depth = (value) => isNaN(value) ? {} : { depth: value };
    var stat = promisify(fs2.stat);
    var lstat = promisify(fs2.lstat);
    var realpath = promisify(fs2.realpath);
    var statMethods = { stat, lstat };
    var FSEventsWatchers = /* @__PURE__ */ new Map();
    var consolidateThreshhold = 10;
    var wrongEventFlags = /* @__PURE__ */ new Set([
      69888,
      70400,
      71424,
      72704,
      73472,
      131328,
      131840,
      262912
    ]);
    var createFSEventsInstance = (path, callback) => {
      const stop = fsevents.watch(path, callback);
      return { stop };
    };
    function setFSEventsListener(path, realPath, listener, rawEmitter) {
      let watchPath = sysPath.extname(realPath) ? sysPath.dirname(realPath) : realPath;
      const parentPath = sysPath.dirname(watchPath);
      let cont = FSEventsWatchers.get(watchPath);
      if (couldConsolidate(parentPath)) {
        watchPath = parentPath;
      }
      const resolvedPath = sysPath.resolve(path);
      const hasSymlink = resolvedPath !== realPath;
      const filteredListener = (fullPath, flags, info) => {
        if (hasSymlink) fullPath = fullPath.replace(realPath, resolvedPath);
        if (fullPath === resolvedPath || !fullPath.indexOf(resolvedPath + sysPath.sep)) listener(fullPath, flags, info);
      };
      let watchedParent = false;
      for (const watchedPath of FSEventsWatchers.keys()) {
        if (realPath.indexOf(sysPath.resolve(watchedPath) + sysPath.sep) === 0) {
          watchPath = watchedPath;
          cont = FSEventsWatchers.get(watchPath);
          watchedParent = true;
          break;
        }
      }
      if (cont || watchedParent) {
        cont.listeners.add(filteredListener);
      } else {
        cont = {
          listeners: /* @__PURE__ */ new Set([filteredListener]),
          rawEmitter,
          watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
            if (!cont.listeners.size) return;
            if (flags & FSEVENT_FLAG_MUST_SCAN_SUBDIRS) return;
            const info = fsevents.getInfo(fullPath, flags);
            cont.listeners.forEach((list) => {
              list(fullPath, flags, info);
            });
            cont.rawEmitter(info.event, fullPath, info);
          })
        };
        FSEventsWatchers.set(watchPath, cont);
      }
      return () => {
        const lst = cont.listeners;
        lst.delete(filteredListener);
        if (!lst.size) {
          FSEventsWatchers.delete(watchPath);
          if (cont.watcher) return cont.watcher.stop().then(() => {
            cont.rawEmitter = cont.watcher = void 0;
            Object.freeze(cont);
          });
        }
      };
    }
    var couldConsolidate = (path) => {
      let count = 0;
      for (const watchPath of FSEventsWatchers.keys()) {
        if (watchPath.indexOf(path) === 0) {
          count++;
          if (count >= consolidateThreshhold) {
            return true;
          }
        }
      }
      return false;
    };
    var canUse = () => fsevents && FSEventsWatchers.size < 128;
    var calcDepth = (path, root) => {
      let i = 0;
      while (!path.indexOf(root) && (path = sysPath.dirname(path)) !== root) i++;
      return i;
    };
    var sameTypes = (info, stats) => info.type === FSEVENT_TYPE_DIRECTORY && stats.isDirectory() || info.type === FSEVENT_TYPE_SYMLINK && stats.isSymbolicLink() || info.type === FSEVENT_TYPE_FILE && stats.isFile();
    var FsEventsHandler = class {
      /**
       * @param {import('../index').FSWatcher} fsw
       */
      constructor(fsw) {
        this.fsw = fsw;
      }
      checkIgnored(path, stats) {
        const ipaths = this.fsw._ignoredPaths;
        if (this.fsw._isIgnored(path, stats)) {
          ipaths.add(path);
          if (stats && stats.isDirectory()) {
            ipaths.add(path + ROOT_GLOBSTAR);
          }
          return true;
        }
        ipaths.delete(path);
        ipaths.delete(path + ROOT_GLOBSTAR);
      }
      addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts) {
        const event = watchedDir.has(item) ? EV_CHANGE : EV_ADD;
        this.handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info, opts);
      }
      async checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts) {
        try {
          const stats = await stat(path);
          if (this.fsw.closed) return;
          if (sameTypes(info, stats)) {
            this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
          } else {
            this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
          }
        } catch (error) {
          if (error.code === "EACCES") {
            this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
          } else {
            this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
          }
        }
      }
      handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info, opts) {
        if (this.fsw.closed || this.checkIgnored(path)) return;
        if (event === EV_UNLINK) {
          const isDirectory = info.type === FSEVENT_TYPE_DIRECTORY;
          if (isDirectory || watchedDir.has(item)) {
            this.fsw._remove(parent, item, isDirectory);
          }
        } else {
          if (event === EV_ADD) {
            if (info.type === FSEVENT_TYPE_DIRECTORY) this.fsw._getWatchedDir(path);
            if (info.type === FSEVENT_TYPE_SYMLINK && opts.followSymlinks) {
              const curDepth = opts.depth === void 0 ? void 0 : calcDepth(fullPath, realPath) + 1;
              return this._addToFsEvents(path, false, true, curDepth);
            }
            this.fsw._getWatchedDir(parent).add(item);
          }
          const eventName = info.type === FSEVENT_TYPE_DIRECTORY ? event + DIR_SUFFIX : event;
          this.fsw._emit(eventName, path);
          if (eventName === EV_ADD_DIR) this._addToFsEvents(path, false, true);
        }
      }
      /**
       * Handle symlinks encountered during directory scan
       * @param {String} watchPath  - file/dir path to be watched with fsevents
       * @param {String} realPath   - real path (in case of symlinks)
       * @param {Function} transform  - path transformer
       * @param {Function} globFilter - path filter in case a glob pattern was provided
       * @returns {Function} closer for the watcher instance
      */
      _watchWithFsEvents(watchPath, realPath, transform, globFilter) {
        if (this.fsw.closed || this.fsw._isIgnored(watchPath)) return;
        const opts = this.fsw.options;
        const watchCallback = async (fullPath, flags, info) => {
          if (this.fsw.closed) return;
          if (opts.depth !== void 0 && calcDepth(fullPath, realPath) > opts.depth) return;
          const path = transform(sysPath.join(
            watchPath,
            sysPath.relative(watchPath, fullPath)
          ));
          if (globFilter && !globFilter(path)) return;
          const parent = sysPath.dirname(path);
          const item = sysPath.basename(path);
          const watchedDir = this.fsw._getWatchedDir(
            info.type === FSEVENT_TYPE_DIRECTORY ? path : parent
          );
          if (wrongEventFlags.has(flags) || info.event === FSEVENT_UNKNOWN) {
            if (typeof opts.ignored === FUNCTION_TYPE) {
              let stats;
              try {
                stats = await stat(path);
              } catch (error) {
              }
              if (this.fsw.closed) return;
              if (this.checkIgnored(path, stats)) return;
              if (sameTypes(info, stats)) {
                this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
              } else {
                this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
              }
            } else {
              this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts);
            }
          } else {
            switch (info.event) {
              case FSEVENT_CREATED:
              case FSEVENT_MODIFIED:
                return this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
              case FSEVENT_DELETED:
              case FSEVENT_MOVED:
                return this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts);
            }
          }
        };
        const closer = setFSEventsListener(
          watchPath,
          realPath,
          watchCallback,
          this.fsw._emitRaw
        );
        this.fsw._emitReady();
        return closer;
      }
      /**
       * Handle symlinks encountered during directory scan
       * @param {String} linkPath path to symlink
       * @param {String} fullPath absolute path to the symlink
       * @param {Function} transform pre-existing path transformer
       * @param {Number} curDepth level of subdirectories traversed to where symlink is
       * @returns {Promise<void>}
       */
      async _handleFsEventsSymlink(linkPath, fullPath, transform, curDepth) {
        if (this.fsw.closed || this.fsw._symlinkPaths.has(fullPath)) return;
        this.fsw._symlinkPaths.set(fullPath, true);
        this.fsw._incrReadyCount();
        try {
          const linkTarget = await realpath(linkPath);
          if (this.fsw.closed) return;
          if (this.fsw._isIgnored(linkTarget)) {
            return this.fsw._emitReady();
          }
          this.fsw._incrReadyCount();
          this._addToFsEvents(linkTarget || linkPath, (path) => {
            let aliasedPath = linkPath;
            if (linkTarget && linkTarget !== DOT_SLASH) {
              aliasedPath = path.replace(linkTarget, linkPath);
            } else if (path !== DOT_SLASH) {
              aliasedPath = sysPath.join(linkPath, path);
            }
            return transform(aliasedPath);
          }, false, curDepth);
        } catch (error) {
          if (this.fsw._handleError(error)) {
            return this.fsw._emitReady();
          }
        }
      }
      /**
       *
       * @param {Path} newPath
       * @param {fs.Stats} stats
       */
      emitAdd(newPath, stats, processPath, opts, forceAdd) {
        const pp = processPath(newPath);
        const isDir = stats.isDirectory();
        const dirObj = this.fsw._getWatchedDir(sysPath.dirname(pp));
        const base = sysPath.basename(pp);
        if (isDir) this.fsw._getWatchedDir(pp);
        if (dirObj.has(base)) return;
        dirObj.add(base);
        if (!opts.ignoreInitial || forceAdd === true) {
          this.fsw._emit(isDir ? EV_ADD_DIR : EV_ADD, pp, stats);
        }
      }
      initWatch(realPath, path, wh, processPath) {
        if (this.fsw.closed) return;
        const closer = this._watchWithFsEvents(
          wh.watchPath,
          sysPath.resolve(realPath || wh.watchPath),
          processPath,
          wh.globFilter
        );
        this.fsw._addPathCloser(path, closer);
      }
      /**
       * Handle added path with fsevents
       * @param {String} path file/dir path or glob pattern
       * @param {Function|Boolean=} transform converts working path to what the user expects
       * @param {Boolean=} forceAdd ensure add is emitted
       * @param {Number=} priorDepth Level of subdirectories already traversed.
       * @returns {Promise<void>}
       */
      async _addToFsEvents(path, transform, forceAdd, priorDepth) {
        if (this.fsw.closed) {
          return;
        }
        const opts = this.fsw.options;
        const processPath = typeof transform === FUNCTION_TYPE ? transform : IDENTITY_FN;
        const wh = this.fsw._getWatchHelpers(path);
        try {
          const stats = await statMethods[wh.statMethod](wh.watchPath);
          if (this.fsw.closed) return;
          if (this.fsw._isIgnored(wh.watchPath, stats)) {
            throw null;
          }
          if (stats.isDirectory()) {
            if (!wh.globFilter) this.emitAdd(processPath(path), stats, processPath, opts, forceAdd);
            if (priorDepth && priorDepth > opts.depth) return;
            this.fsw._readdirp(wh.watchPath, {
              fileFilter: (entry) => wh.filterPath(entry),
              directoryFilter: (entry) => wh.filterDir(entry),
              ...Depth(opts.depth - (priorDepth || 0))
            }).on(STR_DATA, (entry) => {
              if (this.fsw.closed) {
                return;
              }
              if (entry.stats.isDirectory() && !wh.filterPath(entry)) return;
              const joinedPath = sysPath.join(wh.watchPath, entry.path);
              const { fullPath } = entry;
              if (wh.followSymlinks && entry.stats.isSymbolicLink()) {
                const curDepth = opts.depth === void 0 ? void 0 : calcDepth(joinedPath, sysPath.resolve(wh.watchPath)) + 1;
                this._handleFsEventsSymlink(joinedPath, fullPath, processPath, curDepth);
              } else {
                this.emitAdd(joinedPath, entry.stats, processPath, opts, forceAdd);
              }
            }).on(EV_ERROR, EMPTY_FN).on(STR_END, () => {
              this.fsw._emitReady();
            });
          } else {
            this.emitAdd(wh.watchPath, stats, processPath, opts, forceAdd);
            this.fsw._emitReady();
          }
        } catch (error) {
          if (!error || this.fsw._handleError(error)) {
            this.fsw._emitReady();
            this.fsw._emitReady();
          }
        }
        if (opts.persistent && forceAdd !== true) {
          if (typeof transform === FUNCTION_TYPE) {
            this.initWatch(void 0, path, wh, processPath);
          } else {
            let realPath;
            try {
              realPath = await realpath(wh.watchPath);
            } catch (e) {
            }
            this.initWatch(realPath, path, wh, processPath);
          }
        }
      }
    };
    module2.exports = FsEventsHandler;
    module2.exports.canUse = canUse;
  }
});

// ../../node_modules/chokidar/index.js
var require_chokidar = __commonJS({
  "../../node_modules/chokidar/index.js"(exports2) {
    "use strict";
    var { EventEmitter } = require("events");
    var fs2 = require("fs");
    var sysPath = require("path");
    var { promisify } = require("util");
    var readdirp = require_readdirp();
    var anymatch = require_anymatch().default;
    var globParent = require_glob_parent();
    var isGlob = require_is_glob();
    var braces = require_braces();
    var normalizePath = require_normalize_path();
    var NodeFsHandler = require_nodefs_handler();
    var FsEventsHandler = require_fsevents_handler();
    var {
      EV_ALL,
      EV_READY,
      EV_ADD,
      EV_CHANGE,
      EV_UNLINK,
      EV_ADD_DIR,
      EV_UNLINK_DIR,
      EV_RAW,
      EV_ERROR,
      STR_CLOSE,
      STR_END,
      BACK_SLASH_RE,
      DOUBLE_SLASH_RE,
      SLASH_OR_BACK_SLASH_RE,
      DOT_RE,
      REPLACER_RE,
      SLASH,
      SLASH_SLASH,
      BRACE_START,
      BANG,
      ONE_DOT,
      TWO_DOTS,
      GLOBSTAR,
      SLASH_GLOBSTAR,
      ANYMATCH_OPTS,
      STRING_TYPE,
      FUNCTION_TYPE,
      EMPTY_STR,
      EMPTY_FN,
      isWindows,
      isMacos,
      isIBMi
    } = require_constants3();
    var stat = promisify(fs2.stat);
    var readdir = promisify(fs2.readdir);
    var arrify = (value = []) => Array.isArray(value) ? value : [value];
    var flatten = (list, result = []) => {
      list.forEach((item) => {
        if (Array.isArray(item)) {
          flatten(item, result);
        } else {
          result.push(item);
        }
      });
      return result;
    };
    var unifyPaths = (paths_) => {
      const paths = flatten(arrify(paths_));
      if (!paths.every((p) => typeof p === STRING_TYPE)) {
        throw new TypeError(`Non-string provided as watch path: ${paths}`);
      }
      return paths.map(normalizePathToUnix);
    };
    var toUnix = (string) => {
      let str = string.replace(BACK_SLASH_RE, SLASH);
      let prepend = false;
      if (str.startsWith(SLASH_SLASH)) {
        prepend = true;
      }
      while (str.match(DOUBLE_SLASH_RE)) {
        str = str.replace(DOUBLE_SLASH_RE, SLASH);
      }
      if (prepend) {
        str = SLASH + str;
      }
      return str;
    };
    var normalizePathToUnix = (path) => toUnix(sysPath.normalize(toUnix(path)));
    var normalizeIgnored = (cwd = EMPTY_STR) => (path) => {
      if (typeof path !== STRING_TYPE) return path;
      return normalizePathToUnix(sysPath.isAbsolute(path) ? path : sysPath.join(cwd, path));
    };
    var getAbsolutePath = (path, cwd) => {
      if (sysPath.isAbsolute(path)) {
        return path;
      }
      if (path.startsWith(BANG)) {
        return BANG + sysPath.join(cwd, path.slice(1));
      }
      return sysPath.join(cwd, path);
    };
    var undef = (opts, key) => opts[key] === void 0;
    var DirEntry = class {
      /**
       * @param {Path} dir
       * @param {Function} removeWatcher
       */
      constructor(dir, removeWatcher) {
        this.path = dir;
        this._removeWatcher = removeWatcher;
        this.items = /* @__PURE__ */ new Set();
      }
      add(item) {
        const { items } = this;
        if (!items) return;
        if (item !== ONE_DOT && item !== TWO_DOTS) items.add(item);
      }
      async remove(item) {
        const { items } = this;
        if (!items) return;
        items.delete(item);
        if (items.size > 0) return;
        const dir = this.path;
        try {
          await readdir(dir);
        } catch (err) {
          if (this._removeWatcher) {
            this._removeWatcher(sysPath.dirname(dir), sysPath.basename(dir));
          }
        }
      }
      has(item) {
        const { items } = this;
        if (!items) return;
        return items.has(item);
      }
      /**
       * @returns {Array<String>}
       */
      getChildren() {
        const { items } = this;
        if (!items) return;
        return [...items.values()];
      }
      dispose() {
        this.items.clear();
        delete this.path;
        delete this._removeWatcher;
        delete this.items;
        Object.freeze(this);
      }
    };
    var STAT_METHOD_F = "stat";
    var STAT_METHOD_L = "lstat";
    var WatchHelper = class {
      constructor(path, watchPath, follow, fsw) {
        this.fsw = fsw;
        this.path = path = path.replace(REPLACER_RE, EMPTY_STR);
        this.watchPath = watchPath;
        this.fullWatchPath = sysPath.resolve(watchPath);
        this.hasGlob = watchPath !== path;
        if (path === EMPTY_STR) this.hasGlob = false;
        this.globSymlink = this.hasGlob && follow ? void 0 : false;
        this.globFilter = this.hasGlob ? anymatch(path, void 0, ANYMATCH_OPTS) : false;
        this.dirParts = this.getDirParts(path);
        this.dirParts.forEach((parts) => {
          if (parts.length > 1) parts.pop();
        });
        this.followSymlinks = follow;
        this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
      }
      checkGlobSymlink(entry) {
        if (this.globSymlink === void 0) {
          this.globSymlink = entry.fullParentDir === this.fullWatchPath ? false : { realPath: entry.fullParentDir, linkPath: this.fullWatchPath };
        }
        if (this.globSymlink) {
          return entry.fullPath.replace(this.globSymlink.realPath, this.globSymlink.linkPath);
        }
        return entry.fullPath;
      }
      entryPath(entry) {
        return sysPath.join(
          this.watchPath,
          sysPath.relative(this.watchPath, this.checkGlobSymlink(entry))
        );
      }
      filterPath(entry) {
        const { stats } = entry;
        if (stats && stats.isSymbolicLink()) return this.filterDir(entry);
        const resolvedPath = this.entryPath(entry);
        const matchesGlob = this.hasGlob && typeof this.globFilter === FUNCTION_TYPE ? this.globFilter(resolvedPath) : true;
        return matchesGlob && this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
      }
      getDirParts(path) {
        if (!this.hasGlob) return [];
        const parts = [];
        const expandedPath = path.includes(BRACE_START) ? braces.expand(path) : [path];
        expandedPath.forEach((path2) => {
          parts.push(sysPath.relative(this.watchPath, path2).split(SLASH_OR_BACK_SLASH_RE));
        });
        return parts;
      }
      filterDir(entry) {
        if (this.hasGlob) {
          const entryParts = this.getDirParts(this.checkGlobSymlink(entry));
          let globstar = false;
          this.unmatchedGlob = !this.dirParts.some((parts) => {
            return parts.every((part, i) => {
              if (part === GLOBSTAR) globstar = true;
              return globstar || !entryParts[0][i] || anymatch(part, entryParts[0][i], ANYMATCH_OPTS);
            });
          });
        }
        return !this.unmatchedGlob && this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
      }
    };
    var FSWatcher = class extends EventEmitter {
      // Not indenting methods for history sake; for now.
      constructor(_opts) {
        super();
        const opts = {};
        if (_opts) Object.assign(opts, _opts);
        this._watched = /* @__PURE__ */ new Map();
        this._closers = /* @__PURE__ */ new Map();
        this._ignoredPaths = /* @__PURE__ */ new Set();
        this._throttled = /* @__PURE__ */ new Map();
        this._symlinkPaths = /* @__PURE__ */ new Map();
        this._streams = /* @__PURE__ */ new Set();
        this.closed = false;
        if (undef(opts, "persistent")) opts.persistent = true;
        if (undef(opts, "ignoreInitial")) opts.ignoreInitial = false;
        if (undef(opts, "ignorePermissionErrors")) opts.ignorePermissionErrors = false;
        if (undef(opts, "interval")) opts.interval = 100;
        if (undef(opts, "binaryInterval")) opts.binaryInterval = 300;
        if (undef(opts, "disableGlobbing")) opts.disableGlobbing = false;
        opts.enableBinaryInterval = opts.binaryInterval !== opts.interval;
        if (undef(opts, "useFsEvents")) opts.useFsEvents = !opts.usePolling;
        const canUseFsEvents = FsEventsHandler.canUse();
        if (!canUseFsEvents) opts.useFsEvents = false;
        if (undef(opts, "usePolling") && !opts.useFsEvents) {
          opts.usePolling = isMacos;
        }
        if (isIBMi) {
          opts.usePolling = true;
        }
        const envPoll = process.env.CHOKIDAR_USEPOLLING;
        if (envPoll !== void 0) {
          const envLower = envPoll.toLowerCase();
          if (envLower === "false" || envLower === "0") {
            opts.usePolling = false;
          } else if (envLower === "true" || envLower === "1") {
            opts.usePolling = true;
          } else {
            opts.usePolling = !!envLower;
          }
        }
        const envInterval = process.env.CHOKIDAR_INTERVAL;
        if (envInterval) {
          opts.interval = Number.parseInt(envInterval, 10);
        }
        if (undef(opts, "atomic")) opts.atomic = !opts.usePolling && !opts.useFsEvents;
        if (opts.atomic) this._pendingUnlinks = /* @__PURE__ */ new Map();
        if (undef(opts, "followSymlinks")) opts.followSymlinks = true;
        if (undef(opts, "awaitWriteFinish")) opts.awaitWriteFinish = false;
        if (opts.awaitWriteFinish === true) opts.awaitWriteFinish = {};
        const awf = opts.awaitWriteFinish;
        if (awf) {
          if (!awf.stabilityThreshold) awf.stabilityThreshold = 2e3;
          if (!awf.pollInterval) awf.pollInterval = 100;
          this._pendingWrites = /* @__PURE__ */ new Map();
        }
        if (opts.ignored) opts.ignored = arrify(opts.ignored);
        let readyCalls = 0;
        this._emitReady = () => {
          readyCalls++;
          if (readyCalls >= this._readyCount) {
            this._emitReady = EMPTY_FN;
            this._readyEmitted = true;
            process.nextTick(() => this.emit(EV_READY));
          }
        };
        this._emitRaw = (...args) => this.emit(EV_RAW, ...args);
        this._readyEmitted = false;
        this.options = opts;
        if (opts.useFsEvents) {
          this._fsEventsHandler = new FsEventsHandler(this);
        } else {
          this._nodeFsHandler = new NodeFsHandler(this);
        }
        Object.freeze(opts);
      }
      // Public methods
      /**
       * Adds paths to be watched on an existing FSWatcher instance
       * @param {Path|Array<Path>} paths_
       * @param {String=} _origAdd private; for handling non-existent paths to be watched
       * @param {Boolean=} _internal private; indicates a non-user add
       * @returns {FSWatcher} for chaining
       */
      add(paths_, _origAdd, _internal) {
        const { cwd, disableGlobbing } = this.options;
        this.closed = false;
        let paths = unifyPaths(paths_);
        if (cwd) {
          paths = paths.map((path) => {
            const absPath = getAbsolutePath(path, cwd);
            if (disableGlobbing || !isGlob(path)) {
              return absPath;
            }
            return normalizePath(absPath);
          });
        }
        paths = paths.filter((path) => {
          if (path.startsWith(BANG)) {
            this._ignoredPaths.add(path.slice(1));
            return false;
          }
          this._ignoredPaths.delete(path);
          this._ignoredPaths.delete(path + SLASH_GLOBSTAR);
          this._userIgnored = void 0;
          return true;
        });
        if (this.options.useFsEvents && this._fsEventsHandler) {
          if (!this._readyCount) this._readyCount = paths.length;
          if (this.options.persistent) this._readyCount += paths.length;
          paths.forEach((path) => this._fsEventsHandler._addToFsEvents(path));
        } else {
          if (!this._readyCount) this._readyCount = 0;
          this._readyCount += paths.length;
          Promise.all(
            paths.map(async (path) => {
              const res = await this._nodeFsHandler._addToNodeFs(path, !_internal, 0, 0, _origAdd);
              if (res) this._emitReady();
              return res;
            })
          ).then((results) => {
            if (this.closed) return;
            results.filter((item) => item).forEach((item) => {
              this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
            });
          });
        }
        return this;
      }
      /**
       * Close watchers or start ignoring events from specified paths.
       * @param {Path|Array<Path>} paths_ - string or array of strings, file/directory paths and/or globs
       * @returns {FSWatcher} for chaining
      */
      unwatch(paths_) {
        if (this.closed) return this;
        const paths = unifyPaths(paths_);
        const { cwd } = this.options;
        paths.forEach((path) => {
          if (!sysPath.isAbsolute(path) && !this._closers.has(path)) {
            if (cwd) path = sysPath.join(cwd, path);
            path = sysPath.resolve(path);
          }
          this._closePath(path);
          this._ignoredPaths.add(path);
          if (this._watched.has(path)) {
            this._ignoredPaths.add(path + SLASH_GLOBSTAR);
          }
          this._userIgnored = void 0;
        });
        return this;
      }
      /**
       * Close watchers and remove all listeners from watched paths.
       * @returns {Promise<void>}.
      */
      close() {
        if (this.closed) return this._closePromise;
        this.closed = true;
        this.removeAllListeners();
        const closers = [];
        this._closers.forEach((closerList) => closerList.forEach((closer) => {
          const promise = closer();
          if (promise instanceof Promise) closers.push(promise);
        }));
        this._streams.forEach((stream) => stream.destroy());
        this._userIgnored = void 0;
        this._readyCount = 0;
        this._readyEmitted = false;
        this._watched.forEach((dirent) => dirent.dispose());
        ["closers", "watched", "streams", "symlinkPaths", "throttled"].forEach((key) => {
          this[`_${key}`].clear();
        });
        this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
        return this._closePromise;
      }
      /**
       * Expose list of watched paths
       * @returns {Object} for chaining
      */
      getWatched() {
        const watchList = {};
        this._watched.forEach((entry, dir) => {
          const key = this.options.cwd ? sysPath.relative(this.options.cwd, dir) : dir;
          watchList[key || ONE_DOT] = entry.getChildren().sort();
        });
        return watchList;
      }
      emitWithAll(event, args) {
        this.emit(...args);
        if (event !== EV_ERROR) this.emit(EV_ALL, ...args);
      }
      // Common helpers
      // --------------
      /**
       * Normalize and emit events.
       * Calling _emit DOES NOT MEAN emit() would be called!
       * @param {EventName} event Type of event
       * @param {Path} path File or directory path
       * @param {*=} val1 arguments to be passed with event
       * @param {*=} val2
       * @param {*=} val3
       * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
       */
      async _emit(event, path, val1, val2, val3) {
        if (this.closed) return;
        const opts = this.options;
        if (isWindows) path = sysPath.normalize(path);
        if (opts.cwd) path = sysPath.relative(opts.cwd, path);
        const args = [event, path];
        if (val3 !== void 0) args.push(val1, val2, val3);
        else if (val2 !== void 0) args.push(val1, val2);
        else if (val1 !== void 0) args.push(val1);
        const awf = opts.awaitWriteFinish;
        let pw;
        if (awf && (pw = this._pendingWrites.get(path))) {
          pw.lastChange = /* @__PURE__ */ new Date();
          return this;
        }
        if (opts.atomic) {
          if (event === EV_UNLINK) {
            this._pendingUnlinks.set(path, args);
            setTimeout(() => {
              this._pendingUnlinks.forEach((entry, path2) => {
                this.emit(...entry);
                this.emit(EV_ALL, ...entry);
                this._pendingUnlinks.delete(path2);
              });
            }, typeof opts.atomic === "number" ? opts.atomic : 100);
            return this;
          }
          if (event === EV_ADD && this._pendingUnlinks.has(path)) {
            event = args[0] = EV_CHANGE;
            this._pendingUnlinks.delete(path);
          }
        }
        if (awf && (event === EV_ADD || event === EV_CHANGE) && this._readyEmitted) {
          const awfEmit = (err, stats) => {
            if (err) {
              event = args[0] = EV_ERROR;
              args[1] = err;
              this.emitWithAll(event, args);
            } else if (stats) {
              if (args.length > 2) {
                args[2] = stats;
              } else {
                args.push(stats);
              }
              this.emitWithAll(event, args);
            }
          };
          this._awaitWriteFinish(path, awf.stabilityThreshold, event, awfEmit);
          return this;
        }
        if (event === EV_CHANGE) {
          const isThrottled = !this._throttle(EV_CHANGE, path, 50);
          if (isThrottled) return this;
        }
        if (opts.alwaysStat && val1 === void 0 && (event === EV_ADD || event === EV_ADD_DIR || event === EV_CHANGE)) {
          const fullPath = opts.cwd ? sysPath.join(opts.cwd, path) : path;
          let stats;
          try {
            stats = await stat(fullPath);
          } catch (err) {
          }
          if (!stats || this.closed) return;
          args.push(stats);
        }
        this.emitWithAll(event, args);
        return this;
      }
      /**
       * Common handler for errors
       * @param {Error} error
       * @returns {Error|Boolean} The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
       */
      _handleError(error) {
        const code = error && error.code;
        if (error && code !== "ENOENT" && code !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code !== "EPERM" && code !== "EACCES")) {
          this.emit(EV_ERROR, error);
        }
        return error || this.closed;
      }
      /**
       * Helper utility for throttling
       * @param {ThrottleType} actionType type being throttled
       * @param {Path} path being acted upon
       * @param {Number} timeout duration of time to suppress duplicate actions
       * @returns {Object|false} tracking object or false if action should be suppressed
       */
      _throttle(actionType, path, timeout) {
        if (!this._throttled.has(actionType)) {
          this._throttled.set(actionType, /* @__PURE__ */ new Map());
        }
        const action = this._throttled.get(actionType);
        const actionPath = action.get(path);
        if (actionPath) {
          actionPath.count++;
          return false;
        }
        let timeoutObject;
        const clear = () => {
          const item = action.get(path);
          const count = item ? item.count : 0;
          action.delete(path);
          clearTimeout(timeoutObject);
          if (item) clearTimeout(item.timeoutObject);
          return count;
        };
        timeoutObject = setTimeout(clear, timeout);
        const thr = { timeoutObject, clear, count: 0 };
        action.set(path, thr);
        return thr;
      }
      _incrReadyCount() {
        return this._readyCount++;
      }
      /**
       * Awaits write operation to finish.
       * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
       * @param {Path} path being acted upon
       * @param {Number} threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
       * @param {EventName} event
       * @param {Function} awfEmit Callback to be called when ready for event to be emitted.
       */
      _awaitWriteFinish(path, threshold, event, awfEmit) {
        let timeoutHandler;
        let fullPath = path;
        if (this.options.cwd && !sysPath.isAbsolute(path)) {
          fullPath = sysPath.join(this.options.cwd, path);
        }
        const now = /* @__PURE__ */ new Date();
        const awaitWriteFinish = (prevStat) => {
          fs2.stat(fullPath, (err, curStat) => {
            if (err || !this._pendingWrites.has(path)) {
              if (err && err.code !== "ENOENT") awfEmit(err);
              return;
            }
            const now2 = Number(/* @__PURE__ */ new Date());
            if (prevStat && curStat.size !== prevStat.size) {
              this._pendingWrites.get(path).lastChange = now2;
            }
            const pw = this._pendingWrites.get(path);
            const df = now2 - pw.lastChange;
            if (df >= threshold) {
              this._pendingWrites.delete(path);
              awfEmit(void 0, curStat);
            } else {
              timeoutHandler = setTimeout(
                awaitWriteFinish,
                this.options.awaitWriteFinish.pollInterval,
                curStat
              );
            }
          });
        };
        if (!this._pendingWrites.has(path)) {
          this._pendingWrites.set(path, {
            lastChange: now,
            cancelWait: () => {
              this._pendingWrites.delete(path);
              clearTimeout(timeoutHandler);
              return event;
            }
          });
          timeoutHandler = setTimeout(
            awaitWriteFinish,
            this.options.awaitWriteFinish.pollInterval
          );
        }
      }
      _getGlobIgnored() {
        return [...this._ignoredPaths.values()];
      }
      /**
       * Determines whether user has asked to ignore this path.
       * @param {Path} path filepath or dir
       * @param {fs.Stats=} stats result of fs.stat
       * @returns {Boolean}
       */
      _isIgnored(path, stats) {
        if (this.options.atomic && DOT_RE.test(path)) return true;
        if (!this._userIgnored) {
          const { cwd } = this.options;
          const ign = this.options.ignored;
          const ignored = ign && ign.map(normalizeIgnored(cwd));
          const paths = arrify(ignored).filter((path2) => typeof path2 === STRING_TYPE && !isGlob(path2)).map((path2) => path2 + SLASH_GLOBSTAR);
          const list = this._getGlobIgnored().map(normalizeIgnored(cwd)).concat(ignored, paths);
          this._userIgnored = anymatch(list, void 0, ANYMATCH_OPTS);
        }
        return this._userIgnored([path, stats]);
      }
      _isntIgnored(path, stat2) {
        return !this._isIgnored(path, stat2);
      }
      /**
       * Provides a set of common helpers and properties relating to symlink and glob handling.
       * @param {Path} path file, directory, or glob pattern being watched
       * @param {Number=} depth at any depth > 0, this isn't a glob
       * @returns {WatchHelper} object containing helpers for this path
       */
      _getWatchHelpers(path, depth) {
        const watchPath = depth || this.options.disableGlobbing || !isGlob(path) ? path : globParent(path);
        const follow = this.options.followSymlinks;
        return new WatchHelper(path, watchPath, follow, this);
      }
      // Directory helpers
      // -----------------
      /**
       * Provides directory tracking objects
       * @param {String} directory path of the directory
       * @returns {DirEntry} the directory's tracking object
       */
      _getWatchedDir(directory) {
        if (!this._boundRemove) this._boundRemove = this._remove.bind(this);
        const dir = sysPath.resolve(directory);
        if (!this._watched.has(dir)) this._watched.set(dir, new DirEntry(dir, this._boundRemove));
        return this._watched.get(dir);
      }
      // File helpers
      // ------------
      /**
       * Check for read permissions.
       * Based on this answer on SO: https://stackoverflow.com/a/11781404/1358405
       * @param {fs.Stats} stats - object, result of fs_stat
       * @returns {Boolean} indicates whether the file can be read
      */
      _hasReadPermissions(stats) {
        if (this.options.ignorePermissionErrors) return true;
        const md = stats && Number.parseInt(stats.mode, 10);
        const st = md & 511;
        const it = Number.parseInt(st.toString(8)[0], 10);
        return Boolean(4 & it);
      }
      /**
       * Handles emitting unlink events for
       * files and directories, and via recursion, for
       * files and directories within directories that are unlinked
       * @param {String} directory within which the following item is located
       * @param {String} item      base path of item/directory
       * @returns {void}
      */
      _remove(directory, item, isDirectory) {
        const path = sysPath.join(directory, item);
        const fullPath = sysPath.resolve(path);
        isDirectory = isDirectory != null ? isDirectory : this._watched.has(path) || this._watched.has(fullPath);
        if (!this._throttle("remove", path, 100)) return;
        if (!isDirectory && !this.options.useFsEvents && this._watched.size === 1) {
          this.add(directory, item, true);
        }
        const wp = this._getWatchedDir(path);
        const nestedDirectoryChildren = wp.getChildren();
        nestedDirectoryChildren.forEach((nested) => this._remove(path, nested));
        const parent = this._getWatchedDir(directory);
        const wasTracked = parent.has(item);
        parent.remove(item);
        if (this._symlinkPaths.has(fullPath)) {
          this._symlinkPaths.delete(fullPath);
        }
        let relPath = path;
        if (this.options.cwd) relPath = sysPath.relative(this.options.cwd, path);
        if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
          const event = this._pendingWrites.get(relPath).cancelWait();
          if (event === EV_ADD) return;
        }
        this._watched.delete(path);
        this._watched.delete(fullPath);
        const eventName = isDirectory ? EV_UNLINK_DIR : EV_UNLINK;
        if (wasTracked && !this._isIgnored(path)) this._emit(eventName, path);
        if (!this.options.useFsEvents) {
          this._closePath(path);
        }
      }
      /**
       * Closes all watchers for a path
       * @param {Path} path
       */
      _closePath(path) {
        this._closeFile(path);
        const dir = sysPath.dirname(path);
        this._getWatchedDir(dir).remove(sysPath.basename(path));
      }
      /**
       * Closes only file-specific watchers
       * @param {Path} path
       */
      _closeFile(path) {
        const closers = this._closers.get(path);
        if (!closers) return;
        closers.forEach((closer) => closer());
        this._closers.delete(path);
      }
      /**
       *
       * @param {Path} path
       * @param {Function} closer
       */
      _addPathCloser(path, closer) {
        if (!closer) return;
        let list = this._closers.get(path);
        if (!list) {
          list = [];
          this._closers.set(path, list);
        }
        list.push(closer);
      }
      _readdirp(root, opts) {
        if (this.closed) return;
        const options = { type: EV_ALL, alwaysStat: true, lstat: true, ...opts };
        let stream = readdirp(root, options);
        this._streams.add(stream);
        stream.once(STR_CLOSE, () => {
          stream = void 0;
        });
        stream.once(STR_END, () => {
          if (stream) {
            this._streams.delete(stream);
            stream = void 0;
          }
        });
        return stream;
      }
    };
    exports2.FSWatcher = FSWatcher;
    var watch2 = (paths, options) => {
      const watcher = new FSWatcher(options);
      watcher.add(paths);
      return watcher;
    };
    exports2.watch = watch2;
  }
});

// ../../node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "../../node_modules/escape-string-regexp/index.js"(exports2, module2) {
    "use strict";
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module2.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// lib/fs.js
var Promise2 = require_bluebird();
var fs = require_graceful_fs();
var pathFn = require("path");
var chokidar = require_chokidar();
var escapeRegExp = require_escape_string_regexp();
var dirname = pathFn.dirname;
var join = pathFn.join;
var rEOL = new RegExp("\\r\\n", "g");
var statAsync = Promise2.promisify(fs.stat);
var readdirAsync = Promise2.promisify(fs.readdir);
var unlinkAsync = Promise2.promisify(fs.unlink);
var mkdirAsync = Promise2.promisify(fs.mkdir);
var writeFileAsync = Promise2.promisify(fs.writeFile);
var appendFileAsync = Promise2.promisify(fs.appendFile);
var rmdirAsync = Promise2.promisify(fs.rmdir);
var readFileAsync = Promise2.promisify(fs.readFile);
var createReadStream = fs.createReadStream;
var createWriteStream = fs.createWriteStream;
var accessSync = fs.accessSync;
var accessAsync;
var exists;
var existsSync;
if (fs.access) {
  accessAsync = Promise2.promisify(fs.access);
  exists = _existsNew;
  existsSync = _existsSyncNew;
} else {
  exists = _existsOld;
  existsSync = fs.existsSync;
}
function _existsOld(path, callback) {
  if (!path) throw new TypeError("path is required!");
  return new Promise2(function(resolve, reject) {
    fs.exists(path, function(exist) {
      resolve(exist);
      if (typeof callback === "function") callback(exist);
    });
  });
}
function _existsNew(path, callback) {
  if (!path) throw new TypeError("path is required!");
  return accessAsync(path).then(function() {
    return true;
  }, function() {
    return false;
  }).then(function(exist) {
    if (typeof callback === "function") callback(exist);
    return exist;
  });
}
function _existsSyncNew(path) {
  if (!path) throw new TypeError("path is required!");
  try {
    fs.accessSync(path);
  } catch (err) {
    return false;
  }
  return true;
}
function mkdirs(path, callback) {
  if (!path) throw new TypeError("path is required!");
  var parent = dirname(path);
  return exists(parent).then(function(exist) {
    if (!exist) return mkdirs(parent);
  }).then(function() {
    return mkdirAsync(path);
  }).catch(function(err) {
    if (err.cause.code !== "EEXIST") throw err;
  }).asCallback(callback);
}
function mkdirsSync(path) {
  if (!path) throw new TypeError("path is required!");
  var parent = dirname(path);
  var exist = fs.existsSync(parent);
  if (!exist) mkdirsSync(parent);
  fs.mkdirSync(path);
}
function checkParent(path) {
  if (!path) throw new TypeError("path is required!");
  var parent = dirname(path);
  return exists(parent).then(function(exist) {
    if (!exist) return mkdirs(parent);
  });
}
function checkParentSync(path) {
  if (!path) throw new TypeError("path is required!");
  var parent = dirname(path);
  var exist = fs.existsSync(parent);
  if (exist) return;
  try {
    mkdirsSync(parent);
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}
function writeFile(path, data, options, callback) {
  if (!path) throw new TypeError("path is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  return checkParent(path).then(function() {
    return writeFileAsync(path, data, options);
  }).asCallback(callback);
}
function writeFileSync(path, data, options) {
  if (!path) throw new TypeError("path is required!");
  checkParentSync(path);
  fs.writeFileSync(path, data, options);
}
function appendFile(path, data, options, callback) {
  if (!path) throw new TypeError("path is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  return checkParent(path).then(function() {
    return appendFileAsync(path, data, options);
  }).asCallback(callback);
}
function appendFileSync(path, data, options) {
  if (!path) throw new TypeError("path is required!");
  checkParentSync(path);
  fs.appendFileSync(path, data, options);
}
var _copyFile = fs.copyFile ? Promise2.promisify(fs.copyFile) : function(src, dest) {
  return new Promise2(function(resolve, reject) {
    var rs = createReadStream(src);
    var ws = createWriteStream(dest);
    rs.pipe(ws).on("error", reject);
    ws.on("close", resolve).on("error", reject);
  });
};
function copyFile(src, dest, flags, callback) {
  if (!src) throw new TypeError("src is required!");
  if (!dest) throw new TypeError("dest is required!");
  if (typeof flags === "function") {
    callback = flags;
  }
  return checkParent(dest).then(function() {
    return _copyFile(src, dest, flags);
  }).asCallback(callback);
}
function trueFn() {
  return true;
}
function ignoreHiddenFiles(ignore) {
  if (!ignore) return trueFn;
  return function(item) {
    return item[0] !== ".";
  };
}
function ignoreFilesRegex(regex) {
  if (!regex) return trueFn;
  return function(item) {
    return !regex.test(item);
  };
}
function ignoreExcludeFiles(arr, parent) {
  if (!arr || !arr.length) return trueFn;
  var map = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    map[arr[i]] = true;
  }
  return function(item) {
    var path = join(parent, item.path);
    return !map[path];
  };
}
function reduceFiles(result, item) {
  if (Array.isArray(item)) {
    return result.concat(item);
  }
  result.push(item);
  return result;
}
function _readAndFilterDir(path, options) {
  return readdirAsync(path).filter(ignoreHiddenFiles(options.ignoreHidden == null ? true : options.ignoreHidden)).filter(ignoreFilesRegex(options.ignorePattern)).map(function(item) {
    var fullPath = join(path, item);
    return statAsync(fullPath).then(function(stats) {
      return {
        isDirectory: stats.isDirectory(),
        path: item,
        fullPath
      };
    });
  });
}
function _readAndFilterDirSync(path, options) {
  return fs.readdirSync(path).filter(ignoreHiddenFiles(options.ignoreHidden == null ? true : options.ignoreHidden)).filter(ignoreFilesRegex(options.ignorePattern)).map(function(item) {
    var fullPath = join(path, item);
    var stats = fs.statSync(fullPath);
    return {
      isDirectory: stats.isDirectory(),
      path: item,
      fullPath
    };
  });
}
function _copyDir(src, dest, options, parent) {
  options = options || {};
  parent = parent || "";
  return checkParent(dest).then(function() {
    return _readAndFilterDir(src, options);
  }).map(function(item) {
    var childSrc = item.fullPath;
    var childDest = join(dest, item.path);
    if (item.isDirectory) {
      return _copyDir(childSrc, childDest, options, join(parent, item.path));
    }
    return copyFile(childSrc, childDest, options).thenReturn(join(parent, item.path));
  }).reduce(reduceFiles, []);
}
function copyDir(src, dest, options, callback) {
  if (!src) throw new TypeError("src is required!");
  if (!dest) throw new TypeError("dest is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  return _copyDir(src, dest, options).asCallback(callback);
}
function _listDir(path, options, parent) {
  options = options || {};
  parent = parent || "";
  return _readAndFilterDir(path, options).map(function(item) {
    if (item.isDirectory) {
      return _listDir(item.fullPath, options, join(parent, item.path));
    }
    return join(parent, item.path);
  }).reduce(reduceFiles, []);
}
function listDir(path, options, callback) {
  if (!path) throw new TypeError("path is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  return _listDir(path, options).asCallback(callback);
}
function listDirSync(path, options, parent) {
  if (!path) throw new TypeError("path is required!");
  options = options || {};
  parent = parent || "";
  return _readAndFilterDirSync(path, options).map(function(item) {
    if (item.isDirectory) {
      return listDirSync(item.fullPath, options, join(parent, item.path));
    }
    return join(parent, item.path);
  }).reduce(reduceFiles, []);
}
function escapeEOL(str) {
  return str.replace(rEOL, "\n");
}
function escapeBOM(str) {
  return str.charCodeAt(0) === 65279 ? str.substring(1) : str;
}
function escapeFileContent(content) {
  return escapeBOM(escapeEOL(content));
}
function readFile(path, options, callback) {
  if (!path) throw new TypeError("path is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  options = options || {};
  if (!options.hasOwnProperty("encoding")) options.encoding = "utf8";
  return readFileAsync(path, options).then(function(content) {
    if (options.escape == null || options.escape) {
      return escapeFileContent(content);
    }
    return content;
  }).asCallback(callback);
}
function readFileSync(path, options) {
  if (!path) throw new TypeError("path is required!");
  options = options || {};
  if (!options.hasOwnProperty("encoding")) options.encoding = "utf8";
  var content = fs.readFileSync(path, options);
  if (options.escape == null || options.escape) {
    return escapeFileContent(content);
  }
  return content;
}
function _emptyDir(path, options, parent) {
  options = options || {};
  parent = parent || "";
  return _readAndFilterDir(path, options).filter(ignoreExcludeFiles(options.exclude, parent)).map(function(item) {
    var fullPath = item.fullPath;
    if (item.isDirectory) {
      return _emptyDir(fullPath, options, join(parent, item.path)).then(function(removed) {
        return readdirAsync(fullPath).then(function(files) {
          if (!files.length) return rmdirAsync(fullPath);
        }).thenReturn(removed);
      });
    }
    return unlinkAsync(fullPath).thenReturn(join(parent, item.path));
  }).reduce(reduceFiles, []);
}
function emptyDir(path, options, callback) {
  if (!path) throw new TypeError("path is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  return _emptyDir(path, options).asCallback(callback);
}
function emptyDirSync(path, options, parent) {
  if (!path) throw new TypeError("path is required!");
  options = options || {};
  parent = parent || "";
  return _readAndFilterDirSync(path, options).filter(ignoreExcludeFiles(options.exclude, parent)).map(function(item) {
    var childPath = item.fullPath;
    if (item.isDirectory) {
      var removed = emptyDirSync(childPath, options, join(parent, item.path));
      if (!fs.readdirSync(childPath).length) {
        rmdirSync(childPath);
      }
      return removed;
    }
    fs.unlinkSync(childPath);
    return join(parent, item.path);
  }).reduce(reduceFiles, []);
}
function rmdir(path, callback) {
  if (!path) throw new TypeError("path is required!");
  return readdirAsync(path).map(function(item) {
    var childPath = join(path, item);
    return statAsync(childPath).then(function(stats) {
      if (stats.isDirectory()) {
        return rmdir(childPath);
      }
      return unlinkAsync(childPath);
    });
  }).then(function() {
    return rmdirAsync(path);
  }).asCallback(callback);
}
function rmdirSync(path) {
  if (!path) throw new TypeError("path is required!");
  var files = fs.readdirSync(path);
  var childPath, stats;
  for (var i = 0, len = files.length; i < len; i++) {
    childPath = join(path, files[i]);
    stats = fs.statSync(childPath);
    if (stats.isDirectory()) {
      rmdirSync(childPath);
    } else {
      fs.unlinkSync(childPath);
    }
  }
  fs.rmdirSync(path);
}
function watch(path, options, callback) {
  if (!path) throw new TypeError("path is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  return new Promise2(function(resolve, reject) {
    var watcher = chokidar.watch(path, options);
    watcher.on("ready", function() {
      resolve(watcher);
    });
    watcher.on("error", reject);
  }).asCallback(callback);
}
function _findUnusedPath(path, files) {
  var extname = pathFn.extname(path);
  var basename = pathFn.basename(path, extname);
  var regex = new RegExp("^" + escapeRegExp(basename) + "(?:-(\\d+))?" + escapeRegExp(extname) + "$");
  var item = "";
  var num = -1;
  var match, matchNum;
  for (var i = 0, len = files.length; i < len; i++) {
    item = files[i];
    if (!regex.test(item)) continue;
    match = item.match(regex);
    matchNum = match[1] ? parseInt(match[1], 10) : 0;
    if (matchNum > num) {
      num = matchNum;
    }
  }
  return join(dirname(path), basename + "-" + (num + 1) + extname);
}
function ensurePath(path, callback) {
  if (!path) throw new TypeError("path is required!");
  return exists(path).then(function(exist) {
    if (!exist) return path;
    return readdirAsync(dirname(path)).then(function(files) {
      return _findUnusedPath(path, files);
    });
  }).asCallback(callback);
}
function ensurePathSync(path) {
  if (!path) throw new TypeError("path is required!");
  if (!fs.existsSync(path)) return path;
  var files = fs.readdirSync(dirname(path));
  return _findUnusedPath(path, files);
}
function ensureWriteStream(path, options, callback) {
  if (!path) throw new TypeError("path is required!");
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  return checkParent(path).then(function() {
    return fs.createWriteStream(path, options);
  }).asCallback(callback);
}
function ensureWriteStreamSync(path, options) {
  if (!path) throw new TypeError("path is required!");
  checkParentSync(path);
  return fs.createWriteStream(path, options);
}
if (fs.access) {
  ["F_OK", "R_OK", "W_OK", "X_OK"].forEach(function(key) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      value: (fs.constants || fs)[key],
      writable: false
    });
  });
  exports.access = accessAsync;
  exports.accessSync = accessSync;
}
exports.appendFile = appendFile;
exports.appendFileSync = appendFileSync;
exports.chmod = Promise2.promisify(fs.chmod);
exports.chmodSync = fs.chmodSync;
exports.fchmod = Promise2.promisify(fs.fchmod);
exports.fchmodSync = fs.fchmodSync;
exports.lchmod = Promise2.promisify(fs.lchmod);
exports.lchmodSync = fs.lchmodSync;
exports.chown = Promise2.promisify(fs.chown);
exports.chownSync = fs.chownSync;
exports.fchown = Promise2.promisify(fs.fchown);
exports.fchownSync = fs.fchownSync;
exports.lchown = Promise2.promisify(fs.lchown);
exports.lchownSync = fs.lchownSync;
exports.close = Promise2.promisify(fs.close);
exports.closeSync = fs.closeSync;
exports.copyDir = copyDir;
exports.copyFile = copyFile;
exports.createReadStream = createReadStream;
exports.createWriteStream = createWriteStream;
exports.emptyDir = emptyDir;
exports.emptyDirSync = emptyDirSync;
exports.ensurePath = ensurePath;
exports.ensurePathSync = ensurePathSync;
exports.ensureWriteStream = ensureWriteStream;
exports.ensureWriteStreamSync = ensureWriteStreamSync;
exports.exists = exists;
exports.existsSync = existsSync;
exports.fsync = Promise2.promisify(fs.fsync);
exports.fsyncSync = fs.fsyncSync;
exports.link = Promise2.promisify(fs.link);
exports.linkSync = fs.linkSync;
exports.listDir = listDir;
exports.listDirSync = listDirSync;
exports.mkdir = mkdirAsync;
exports.mkdirSync = fs.mkdirSync;
exports.mkdirs = mkdirs;
exports.mkdirsSync = mkdirsSync;
exports.open = Promise2.promisify(fs.open);
exports.openSync = fs.openSync;
exports.symlink = Promise2.promisify(fs.symlink);
exports.symlinkSync = fs.symlinkSync;
exports.read = Promise2.promisify(fs.read);
exports.readSync = fs.readSync;
exports.readdir = readdirAsync;
exports.readdirSync = fs.readdirSync;
exports.readFile = readFile;
exports.readFileSync = readFileSync;
exports.readlink = Promise2.promisify(fs.readlink);
exports.readlinkSync = fs.readlinkSync;
exports.realpath = Promise2.promisify(fs.realpath);
exports.realpathSync = fs.realpathSync;
exports.rename = Promise2.promisify(fs.rename);
exports.renameSync = fs.renameSync;
exports.rmdir = rmdir;
exports.rmdirSync = rmdirSync;
exports.stat = statAsync;
exports.statSync = fs.statSync;
exports.fstat = Promise2.promisify(fs.fstat);
exports.fstatSync = fs.fstatSync;
exports.lstat = Promise2.promisify(fs.lstat);
exports.lstatSync = fs.lstatSync;
exports.truncate = Promise2.promisify(fs.truncate);
exports.truncateSync = fs.truncateSync;
exports.ftruncate = Promise2.promisify(fs.ftruncate);
exports.ftruncateSync = fs.ftruncateSync;
exports.unlink = unlinkAsync;
exports.unlinkSync = fs.unlinkSync;
exports.utimes = Promise2.promisify(fs.utimes);
exports.utimesSync = fs.utimesSync;
exports.futimes = Promise2.promisify(fs.futimes);
exports.futimesSync = fs.futimesSync;
exports.watch = watch;
exports.watchFile = fs.watchFile;
exports.unwatchFile = fs.unwatchFile;
exports.write = Promise2.promisify(fs.write);
exports.writeSync = fs.writeSync;
exports.writeFile = writeFile;
exports.writeFileSync = writeFileSync;
exports.Stats = fs.Stats;
exports.ReadStream = fs.ReadStream;
exports.WriteStream = fs.WriteStream;
exports.FileReadStream = fs.FileReadStream;
exports.FileWriteStream = fs.FileWriteStream;
exports.escapeBOM = escapeBOM;
exports.escapeEOL = escapeEOL;
/*! Bundled license information:

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
