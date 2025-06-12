var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/.pnpm/utils-merge@1.0.1/node_modules/utils-merge/index.js
var require_utils_merge = __commonJS({
  "node_modules/.pnpm/utils-merge@1.0.1/node_modules/utils-merge/index.js"(exports2, module2) {
    exports2 = module2.exports = function(a, b) {
      if (a && b) {
        for (var key in b) {
          a[key] = b[key];
        }
      }
      return a;
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/lib.js
var require_lib = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/lib.js"(exports2, module2) {
    "use strict";
    var ArrayProto = Array.prototype;
    var ObjProto = Object.prototype;
    var escapeMap = {
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
      "<": "&lt;",
      ">": "&gt;",
      "\\": "&#92;"
    };
    var escapeRegex = /[&"'<>\\]/g;
    var _exports = module2.exports = {};
    function hasOwnProp(obj, k) {
      return ObjProto.hasOwnProperty.call(obj, k);
    }
    _exports.hasOwnProp = hasOwnProp;
    function lookupEscape(ch) {
      return escapeMap[ch];
    }
    function _prettifyError(path, withInternals, err) {
      if (!err.Update) {
        err = new _exports.TemplateError(err);
      }
      err.Update(path);
      if (!withInternals) {
        var old = err;
        err = new Error(old.message);
        err.name = old.name;
      }
      return err;
    }
    _exports._prettifyError = _prettifyError;
    function TemplateError(message, lineno, colno) {
      var err;
      var cause;
      if (message instanceof Error) {
        cause = message;
        message = cause.name + ": " + cause.message;
      }
      if (Object.setPrototypeOf) {
        err = new Error(message);
        Object.setPrototypeOf(err, TemplateError.prototype);
      } else {
        err = this;
        Object.defineProperty(err, "message", {
          enumerable: false,
          writable: true,
          value: message
        });
      }
      Object.defineProperty(err, "name", {
        value: "Template render error"
      });
      if (Error.captureStackTrace) {
        Error.captureStackTrace(err, this.constructor);
      }
      var getStack;
      if (cause) {
        var stackDescriptor = Object.getOwnPropertyDescriptor(cause, "stack");
        getStack = stackDescriptor && (stackDescriptor.get || function() {
          return stackDescriptor.value;
        });
        if (!getStack) {
          getStack = function getStack2() {
            return cause.stack;
          };
        }
      } else {
        var stack = new Error(message).stack;
        getStack = function getStack2() {
          return stack;
        };
      }
      Object.defineProperty(err, "stack", {
        get: function get() {
          return getStack.call(err);
        }
      });
      Object.defineProperty(err, "cause", {
        value: cause
      });
      err.lineno = lineno;
      err.colno = colno;
      err.firstUpdate = true;
      err.Update = function Update(path) {
        var msg = "(" + (path || "unknown path") + ")";
        if (this.firstUpdate) {
          if (this.lineno && this.colno) {
            msg += " [Line " + this.lineno + ", Column " + this.colno + "]";
          } else if (this.lineno) {
            msg += " [Line " + this.lineno + "]";
          }
        }
        msg += "\n ";
        if (this.firstUpdate) {
          msg += " ";
        }
        this.message = msg + (this.message || "");
        this.firstUpdate = false;
        return this;
      };
      return err;
    }
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(TemplateError.prototype, Error.prototype);
    } else {
      TemplateError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: TemplateError
        }
      });
    }
    _exports.TemplateError = TemplateError;
    function escape(val) {
      return val.replace(escapeRegex, lookupEscape);
    }
    _exports.escape = escape;
    function isFunction(obj) {
      return ObjProto.toString.call(obj) === "[object Function]";
    }
    _exports.isFunction = isFunction;
    function isArray(obj) {
      return ObjProto.toString.call(obj) === "[object Array]";
    }
    _exports.isArray = isArray;
    function isString(obj) {
      return ObjProto.toString.call(obj) === "[object String]";
    }
    _exports.isString = isString;
    function isObject(obj) {
      return ObjProto.toString.call(obj) === "[object Object]";
    }
    _exports.isObject = isObject;
    function _prepareAttributeParts(attr) {
      if (!attr) {
        return [];
      }
      if (typeof attr === "string") {
        return attr.split(".");
      }
      return [attr];
    }
    function getAttrGetter(attribute) {
      var parts = _prepareAttributeParts(attribute);
      return function attrGetter(item) {
        var _item = item;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          if (hasOwnProp(_item, part)) {
            _item = _item[part];
          } else {
            return void 0;
          }
        }
        return _item;
      };
    }
    _exports.getAttrGetter = getAttrGetter;
    function groupBy(obj, val, throwOnUndefined) {
      var result = {};
      var iterator = isFunction(val) ? val : getAttrGetter(val);
      for (var i = 0; i < obj.length; i++) {
        var value = obj[i];
        var key = iterator(value, i);
        if (key === void 0 && throwOnUndefined === true) {
          throw new TypeError('groupby: attribute "' + val + '" resolved to undefined');
        }
        (result[key] || (result[key] = [])).push(value);
      }
      return result;
    }
    _exports.groupBy = groupBy;
    function toArray(obj) {
      return Array.prototype.slice.call(obj);
    }
    _exports.toArray = toArray;
    function without(array) {
      var result = [];
      if (!array) {
        return result;
      }
      var length = array.length;
      var contains = toArray(arguments).slice(1);
      var index = -1;
      while (++index < length) {
        if (indexOf(contains, array[index]) === -1) {
          result.push(array[index]);
        }
      }
      return result;
    }
    _exports.without = without;
    function repeat(char_, n) {
      var str = "";
      for (var i = 0; i < n; i++) {
        str += char_;
      }
      return str;
    }
    _exports.repeat = repeat;
    function each(obj, func, context) {
      if (obj == null) {
        return;
      }
      if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
        obj.forEach(func, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          func.call(context, obj[i], i, obj);
        }
      }
    }
    _exports.each = each;
    function map(obj, func) {
      var results = [];
      if (obj == null) {
        return results;
      }
      if (ArrayProto.map && obj.map === ArrayProto.map) {
        return obj.map(func);
      }
      for (var i = 0; i < obj.length; i++) {
        results[results.length] = func(obj[i], i);
      }
      if (obj.length === +obj.length) {
        results.length = obj.length;
      }
      return results;
    }
    _exports.map = map;
    function asyncIter(arr, iter, cb) {
      var i = -1;
      function next() {
        i++;
        if (i < arr.length) {
          iter(arr[i], i, next, cb);
        } else {
          cb();
        }
      }
      next();
    }
    _exports.asyncIter = asyncIter;
    function asyncFor(obj, iter, cb) {
      var keys = keys_(obj || {});
      var len = keys.length;
      var i = -1;
      function next() {
        i++;
        var k = keys[i];
        if (i < len) {
          iter(k, obj[k], i, len, next);
        } else {
          cb();
        }
      }
      next();
    }
    _exports.asyncFor = asyncFor;
    function indexOf(arr, searchElement, fromIndex) {
      return Array.prototype.indexOf.call(arr || [], searchElement, fromIndex);
    }
    _exports.indexOf = indexOf;
    function keys_(obj) {
      var arr = [];
      for (var k in obj) {
        if (hasOwnProp(obj, k)) {
          arr.push(k);
        }
      }
      return arr;
    }
    _exports.keys = keys_;
    function _entries(obj) {
      return keys_(obj).map(function(k) {
        return [k, obj[k]];
      });
    }
    _exports._entries = _entries;
    function _values(obj) {
      return keys_(obj).map(function(k) {
        return obj[k];
      });
    }
    _exports._values = _values;
    function extend(obj1, obj2) {
      obj1 = obj1 || {};
      keys_(obj2).forEach(function(k) {
        obj1[k] = obj2[k];
      });
      return obj1;
    }
    _exports._assign = _exports.extend = extend;
    function inOperator(key, val) {
      if (isArray(val) || isString(val)) {
        return val.indexOf(key) !== -1;
      } else if (isObject(val)) {
        return key in val;
      }
      throw new Error('Cannot use "in" operator to search for "' + key + '" in unexpected types.');
    }
    _exports.inOperator = inOperator;
  }
});

// node_modules/.pnpm/asap@2.0.6/node_modules/asap/raw.js
var require_raw = __commonJS({
  "node_modules/.pnpm/asap@2.0.6/node_modules/asap/raw.js"(exports2, module2) {
    "use strict";
    var domain;
    var hasSetImmediate = typeof setImmediate === "function";
    module2.exports = rawAsap;
    function rawAsap(task) {
      if (!queue.length) {
        requestFlush();
        flushing = true;
      }
      queue[queue.length] = task;
    }
    var queue = [];
    var flushing = false;
    var index = 0;
    var capacity = 1024;
    function flush() {
      while (index < queue.length) {
        var currentIndex = index;
        index = index + 1;
        queue[currentIndex].call();
        if (index > capacity) {
          for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
            queue[scan] = queue[scan + index];
          }
          queue.length -= index;
          index = 0;
        }
      }
      queue.length = 0;
      index = 0;
      flushing = false;
    }
    rawAsap.requestFlush = requestFlush;
    function requestFlush() {
      var parentDomain = process.domain;
      if (parentDomain) {
        if (!domain) {
          domain = require("domain");
        }
        domain.active = process.domain = null;
      }
      if (flushing && hasSetImmediate) {
        setImmediate(flush);
      } else {
        process.nextTick(flush);
      }
      if (parentDomain) {
        domain.active = process.domain = parentDomain;
      }
    }
  }
});

// node_modules/.pnpm/asap@2.0.6/node_modules/asap/asap.js
var require_asap = __commonJS({
  "node_modules/.pnpm/asap@2.0.6/node_modules/asap/asap.js"(exports2, module2) {
    "use strict";
    var rawAsap = require_raw();
    var freeTasks = [];
    module2.exports = asap;
    function asap(task) {
      var rawTask;
      if (freeTasks.length) {
        rawTask = freeTasks.pop();
      } else {
        rawTask = new RawTask();
      }
      rawTask.task = task;
      rawTask.domain = process.domain;
      rawAsap(rawTask);
    }
    function RawTask() {
      this.task = null;
      this.domain = null;
    }
    RawTask.prototype.call = function() {
      if (this.domain) {
        this.domain.enter();
      }
      var threw = true;
      try {
        this.task.call();
        threw = false;
        if (this.domain) {
          this.domain.exit();
        }
      } finally {
        if (threw) {
          rawAsap.requestFlush();
        }
        this.task = null;
        this.domain = null;
        freeTasks.push(this);
      }
    };
  }
});

// node_modules/.pnpm/a-sync-waterfall@1.0.1/node_modules/a-sync-waterfall/index.js
var require_a_sync_waterfall = __commonJS({
  "node_modules/.pnpm/a-sync-waterfall@1.0.1/node_modules/a-sync-waterfall/index.js"(exports2, module2) {
    (function(globals) {
      "use strict";
      var executeSync = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "function") {
          args[0].apply(null, args.splice(1));
        }
      };
      var executeAsync = function(fn) {
        if (typeof setImmediate === "function") {
          setImmediate(fn);
        } else if (typeof process !== "undefined" && process.nextTick) {
          process.nextTick(fn);
        } else {
          setTimeout(fn, 0);
        }
      };
      var makeIterator = function(tasks) {
        var makeCallback = function(index) {
          var fn = function() {
            if (tasks.length) {
              tasks[index].apply(null, arguments);
            }
            return fn.next();
          };
          fn.next = function() {
            return index < tasks.length - 1 ? makeCallback(index + 1) : null;
          };
          return fn;
        };
        return makeCallback(0);
      };
      var _isArray = Array.isArray || function(maybeArray) {
        return Object.prototype.toString.call(maybeArray) === "[object Array]";
      };
      var waterfall = function(tasks, callback, forceAsync) {
        var nextTick = forceAsync ? executeAsync : executeSync;
        callback = callback || function() {
        };
        if (!_isArray(tasks)) {
          var err = new Error("First argument to waterfall must be an array of functions");
          return callback(err);
        }
        if (!tasks.length) {
          return callback();
        }
        var wrapIterator = function(iterator) {
          return function(err2) {
            if (err2) {
              callback.apply(null, arguments);
              callback = function() {
              };
            } else {
              var args = Array.prototype.slice.call(arguments, 1);
              var next = iterator.next();
              if (next) {
                args.push(wrapIterator(next));
              } else {
                args.push(callback);
              }
              nextTick(function() {
                iterator.apply(null, args);
              });
            }
          };
        };
        wrapIterator(makeIterator(tasks))();
      };
      if (typeof define !== "undefined" && define.amd) {
        define([], function() {
          return waterfall;
        });
      } else if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = waterfall;
      } else {
        globals.waterfall = waterfall;
      }
    })(exports2);
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/lexer.js
var require_lexer = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/lexer.js"(exports2, module2) {
    "use strict";
    var lib = require_lib();
    var whitespaceChars = " \n	\r\xA0";
    var delimChars = "()[]{}%*-+~/#,:|.<>=!";
    var intChars = "0123456789";
    var BLOCK_START = "{%";
    var BLOCK_END = "%}";
    var VARIABLE_START = "{{";
    var VARIABLE_END = "}}";
    var COMMENT_START = "{#";
    var COMMENT_END = "#}";
    var TOKEN_STRING = "string";
    var TOKEN_WHITESPACE = "whitespace";
    var TOKEN_DATA = "data";
    var TOKEN_BLOCK_START = "block-start";
    var TOKEN_BLOCK_END = "block-end";
    var TOKEN_VARIABLE_START = "variable-start";
    var TOKEN_VARIABLE_END = "variable-end";
    var TOKEN_COMMENT = "comment";
    var TOKEN_LEFT_PAREN = "left-paren";
    var TOKEN_RIGHT_PAREN = "right-paren";
    var TOKEN_LEFT_BRACKET = "left-bracket";
    var TOKEN_RIGHT_BRACKET = "right-bracket";
    var TOKEN_LEFT_CURLY = "left-curly";
    var TOKEN_RIGHT_CURLY = "right-curly";
    var TOKEN_OPERATOR = "operator";
    var TOKEN_COMMA = "comma";
    var TOKEN_COLON = "colon";
    var TOKEN_TILDE = "tilde";
    var TOKEN_PIPE = "pipe";
    var TOKEN_INT = "int";
    var TOKEN_FLOAT = "float";
    var TOKEN_BOOLEAN = "boolean";
    var TOKEN_NONE = "none";
    var TOKEN_SYMBOL = "symbol";
    var TOKEN_SPECIAL = "special";
    var TOKEN_REGEX = "regex";
    function token(type, value, lineno, colno) {
      return {
        type,
        value,
        lineno,
        colno
      };
    }
    var Tokenizer = /* @__PURE__ */ function() {
      function Tokenizer2(str, opts) {
        this.str = str;
        this.index = 0;
        this.len = str.length;
        this.lineno = 0;
        this.colno = 0;
        this.in_code = false;
        opts = opts || {};
        var tags = opts.tags || {};
        this.tags = {
          BLOCK_START: tags.blockStart || BLOCK_START,
          BLOCK_END: tags.blockEnd || BLOCK_END,
          VARIABLE_START: tags.variableStart || VARIABLE_START,
          VARIABLE_END: tags.variableEnd || VARIABLE_END,
          COMMENT_START: tags.commentStart || COMMENT_START,
          COMMENT_END: tags.commentEnd || COMMENT_END
        };
        this.trimBlocks = !!opts.trimBlocks;
        this.lstripBlocks = !!opts.lstripBlocks;
      }
      var _proto = Tokenizer2.prototype;
      _proto.nextToken = function nextToken() {
        var lineno = this.lineno;
        var colno = this.colno;
        var tok;
        if (this.in_code) {
          var cur = this.current();
          if (this.isFinished()) {
            return null;
          } else if (cur === '"' || cur === "'") {
            return token(TOKEN_STRING, this._parseString(cur), lineno, colno);
          } else if (tok = this._extract(whitespaceChars)) {
            return token(TOKEN_WHITESPACE, tok, lineno, colno);
          } else if ((tok = this._extractString(this.tags.BLOCK_END)) || (tok = this._extractString("-" + this.tags.BLOCK_END))) {
            this.in_code = false;
            if (this.trimBlocks) {
              cur = this.current();
              if (cur === "\n") {
                this.forward();
              } else if (cur === "\r") {
                this.forward();
                cur = this.current();
                if (cur === "\n") {
                  this.forward();
                } else {
                  this.back();
                }
              }
            }
            return token(TOKEN_BLOCK_END, tok, lineno, colno);
          } else if ((tok = this._extractString(this.tags.VARIABLE_END)) || (tok = this._extractString("-" + this.tags.VARIABLE_END))) {
            this.in_code = false;
            return token(TOKEN_VARIABLE_END, tok, lineno, colno);
          } else if (cur === "r" && this.str.charAt(this.index + 1) === "/") {
            this.forwardN(2);
            var regexBody = "";
            while (!this.isFinished()) {
              if (this.current() === "/" && this.previous() !== "\\") {
                this.forward();
                break;
              } else {
                regexBody += this.current();
                this.forward();
              }
            }
            var POSSIBLE_FLAGS = ["g", "i", "m", "y"];
            var regexFlags = "";
            while (!this.isFinished()) {
              var isCurrentAFlag = POSSIBLE_FLAGS.indexOf(this.current()) !== -1;
              if (isCurrentAFlag) {
                regexFlags += this.current();
                this.forward();
              } else {
                break;
              }
            }
            return token(TOKEN_REGEX, {
              body: regexBody,
              flags: regexFlags
            }, lineno, colno);
          } else if (delimChars.indexOf(cur) !== -1) {
            this.forward();
            var complexOps = ["==", "===", "!=", "!==", "<=", ">=", "//", "**"];
            var curComplex = cur + this.current();
            var type;
            if (lib.indexOf(complexOps, curComplex) !== -1) {
              this.forward();
              cur = curComplex;
              if (lib.indexOf(complexOps, curComplex + this.current()) !== -1) {
                cur = curComplex + this.current();
                this.forward();
              }
            }
            switch (cur) {
              case "(":
                type = TOKEN_LEFT_PAREN;
                break;
              case ")":
                type = TOKEN_RIGHT_PAREN;
                break;
              case "[":
                type = TOKEN_LEFT_BRACKET;
                break;
              case "]":
                type = TOKEN_RIGHT_BRACKET;
                break;
              case "{":
                type = TOKEN_LEFT_CURLY;
                break;
              case "}":
                type = TOKEN_RIGHT_CURLY;
                break;
              case ",":
                type = TOKEN_COMMA;
                break;
              case ":":
                type = TOKEN_COLON;
                break;
              case "~":
                type = TOKEN_TILDE;
                break;
              case "|":
                type = TOKEN_PIPE;
                break;
              default:
                type = TOKEN_OPERATOR;
            }
            return token(type, cur, lineno, colno);
          } else {
            tok = this._extractUntil(whitespaceChars + delimChars);
            if (tok.match(/^[-+]?[0-9]+$/)) {
              if (this.current() === ".") {
                this.forward();
                var dec = this._extract(intChars);
                return token(TOKEN_FLOAT, tok + "." + dec, lineno, colno);
              } else {
                return token(TOKEN_INT, tok, lineno, colno);
              }
            } else if (tok.match(/^(true|false)$/)) {
              return token(TOKEN_BOOLEAN, tok, lineno, colno);
            } else if (tok === "none") {
              return token(TOKEN_NONE, tok, lineno, colno);
            } else if (tok === "null") {
              return token(TOKEN_NONE, tok, lineno, colno);
            } else if (tok) {
              return token(TOKEN_SYMBOL, tok, lineno, colno);
            } else {
              throw new Error("Unexpected value while parsing: " + tok);
            }
          }
        } else {
          var beginChars = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);
          if (this.isFinished()) {
            return null;
          } else if ((tok = this._extractString(this.tags.BLOCK_START + "-")) || (tok = this._extractString(this.tags.BLOCK_START))) {
            this.in_code = true;
            return token(TOKEN_BLOCK_START, tok, lineno, colno);
          } else if ((tok = this._extractString(this.tags.VARIABLE_START + "-")) || (tok = this._extractString(this.tags.VARIABLE_START))) {
            this.in_code = true;
            return token(TOKEN_VARIABLE_START, tok, lineno, colno);
          } else {
            tok = "";
            var data;
            var inComment = false;
            if (this._matches(this.tags.COMMENT_START)) {
              inComment = true;
              tok = this._extractString(this.tags.COMMENT_START);
            }
            while ((data = this._extractUntil(beginChars)) !== null) {
              tok += data;
              if ((this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !inComment) {
                if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= tok.length) {
                  var lastLine = tok.slice(-this.colno);
                  if (/^\s+$/.test(lastLine)) {
                    tok = tok.slice(0, -this.colno);
                    if (!tok.length) {
                      return this.nextToken();
                    }
                  }
                }
                break;
              } else if (this._matches(this.tags.COMMENT_END)) {
                if (!inComment) {
                  throw new Error("unexpected end of comment");
                }
                tok += this._extractString(this.tags.COMMENT_END);
                break;
              } else {
                tok += this.current();
                this.forward();
              }
            }
            if (data === null && inComment) {
              throw new Error("expected end of comment, got end of file");
            }
            return token(inComment ? TOKEN_COMMENT : TOKEN_DATA, tok, lineno, colno);
          }
        }
      };
      _proto._parseString = function _parseString(delimiter) {
        this.forward();
        var str = "";
        while (!this.isFinished() && this.current() !== delimiter) {
          var cur = this.current();
          if (cur === "\\") {
            this.forward();
            switch (this.current()) {
              case "n":
                str += "\n";
                break;
              case "t":
                str += "	";
                break;
              case "r":
                str += "\r";
                break;
              default:
                str += this.current();
            }
            this.forward();
          } else {
            str += cur;
            this.forward();
          }
        }
        this.forward();
        return str;
      };
      _proto._matches = function _matches(str) {
        if (this.index + str.length > this.len) {
          return null;
        }
        var m = this.str.slice(this.index, this.index + str.length);
        return m === str;
      };
      _proto._extractString = function _extractString(str) {
        if (this._matches(str)) {
          this.forwardN(str.length);
          return str;
        }
        return null;
      };
      _proto._extractUntil = function _extractUntil(charString) {
        return this._extractMatching(true, charString || "");
      };
      _proto._extract = function _extract(charString) {
        return this._extractMatching(false, charString);
      };
      _proto._extractMatching = function _extractMatching(breakOnMatch, charString) {
        if (this.isFinished()) {
          return null;
        }
        var first = charString.indexOf(this.current());
        if (breakOnMatch && first === -1 || !breakOnMatch && first !== -1) {
          var t = this.current();
          this.forward();
          var idx = charString.indexOf(this.current());
          while ((breakOnMatch && idx === -1 || !breakOnMatch && idx !== -1) && !this.isFinished()) {
            t += this.current();
            this.forward();
            idx = charString.indexOf(this.current());
          }
          return t;
        }
        return "";
      };
      _proto._extractRegex = function _extractRegex(regex) {
        var matches = this.currentStr().match(regex);
        if (!matches) {
          return null;
        }
        this.forwardN(matches[0].length);
        return matches;
      };
      _proto.isFinished = function isFinished() {
        return this.index >= this.len;
      };
      _proto.forwardN = function forwardN(n) {
        for (var i = 0; i < n; i++) {
          this.forward();
        }
      };
      _proto.forward = function forward() {
        this.index++;
        if (this.previous() === "\n") {
          this.lineno++;
          this.colno = 0;
        } else {
          this.colno++;
        }
      };
      _proto.backN = function backN(n) {
        for (var i = 0; i < n; i++) {
          this.back();
        }
      };
      _proto.back = function back() {
        this.index--;
        if (this.current() === "\n") {
          this.lineno--;
          var idx = this.src.lastIndexOf("\n", this.index - 1);
          if (idx === -1) {
            this.colno = this.index;
          } else {
            this.colno = this.index - idx;
          }
        } else {
          this.colno--;
        }
      };
      _proto.current = function current() {
        if (!this.isFinished()) {
          return this.str.charAt(this.index);
        }
        return "";
      };
      _proto.currentStr = function currentStr() {
        if (!this.isFinished()) {
          return this.str.substr(this.index);
        }
        return "";
      };
      _proto.previous = function previous() {
        return this.str.charAt(this.index - 1);
      };
      return Tokenizer2;
    }();
    module2.exports = {
      lex: function lex(src, opts) {
        return new Tokenizer(src, opts);
      },
      TOKEN_STRING,
      TOKEN_WHITESPACE,
      TOKEN_DATA,
      TOKEN_BLOCK_START,
      TOKEN_BLOCK_END,
      TOKEN_VARIABLE_START,
      TOKEN_VARIABLE_END,
      TOKEN_COMMENT,
      TOKEN_LEFT_PAREN,
      TOKEN_RIGHT_PAREN,
      TOKEN_LEFT_BRACKET,
      TOKEN_RIGHT_BRACKET,
      TOKEN_LEFT_CURLY,
      TOKEN_RIGHT_CURLY,
      TOKEN_OPERATOR,
      TOKEN_COMMA,
      TOKEN_COLON,
      TOKEN_TILDE,
      TOKEN_PIPE,
      TOKEN_INT,
      TOKEN_FLOAT,
      TOKEN_BOOLEAN,
      TOKEN_NONE,
      TOKEN_SYMBOL,
      TOKEN_SPECIAL,
      TOKEN_REGEX
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/object.js
var require_object = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/object.js"(exports2, module2) {
    "use strict";
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var EventEmitter = require("events");
    var lib = require_lib();
    function parentWrap(parent, prop) {
      if (typeof parent !== "function" || typeof prop !== "function") {
        return prop;
      }
      return function wrap() {
        var tmp = this.parent;
        this.parent = parent;
        var res = prop.apply(this, arguments);
        this.parent = tmp;
        return res;
      };
    }
    function extendClass(cls, name, props) {
      props = props || {};
      lib.keys(props).forEach(function(k) {
        props[k] = parentWrap(cls.prototype[k], props[k]);
      });
      var subclass = /* @__PURE__ */ function(_cls) {
        _inheritsLoose(subclass2, _cls);
        function subclass2() {
          return _cls.apply(this, arguments) || this;
        }
        _createClass(subclass2, [{
          key: "typename",
          get: function get() {
            return name;
          }
        }]);
        return subclass2;
      }(cls);
      lib._assign(subclass.prototype, props);
      return subclass;
    }
    var Obj = /* @__PURE__ */ function() {
      function Obj2() {
        this.init.apply(this, arguments);
      }
      var _proto = Obj2.prototype;
      _proto.init = function init() {
      };
      Obj2.extend = function extend(name, props) {
        if (typeof name === "object") {
          props = name;
          name = "anonymous";
        }
        return extendClass(this, name, props);
      };
      _createClass(Obj2, [{
        key: "typename",
        get: function get() {
          return this.constructor.name;
        }
      }]);
      return Obj2;
    }();
    var EmitterObj = /* @__PURE__ */ function(_EventEmitter) {
      _inheritsLoose(EmitterObj2, _EventEmitter);
      function EmitterObj2() {
        var _this2;
        var _this;
        _this = _EventEmitter.call(this) || this;
        (_this2 = _this).init.apply(_this2, arguments);
        return _this;
      }
      var _proto2 = EmitterObj2.prototype;
      _proto2.init = function init() {
      };
      EmitterObj2.extend = function extend(name, props) {
        if (typeof name === "object") {
          props = name;
          name = "anonymous";
        }
        return extendClass(this, name, props);
      };
      _createClass(EmitterObj2, [{
        key: "typename",
        get: function get() {
          return this.constructor.name;
        }
      }]);
      return EmitterObj2;
    }(EventEmitter);
    module2.exports = {
      Obj,
      EmitterObj
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/nodes.js
var require_nodes = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/nodes.js"(exports2, module2) {
    "use strict";
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var _require = require_object();
    var Obj = _require.Obj;
    function traverseAndCheck(obj, type, results) {
      if (obj instanceof type) {
        results.push(obj);
      }
      if (obj instanceof Node) {
        obj.findAll(type, results);
      }
    }
    var Node = /* @__PURE__ */ function(_Obj) {
      _inheritsLoose(Node2, _Obj);
      function Node2() {
        return _Obj.apply(this, arguments) || this;
      }
      var _proto = Node2.prototype;
      _proto.init = function init(lineno, colno) {
        var _arguments = arguments, _this = this;
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        this.lineno = lineno;
        this.colno = colno;
        this.fields.forEach(function(field, i) {
          var val = _arguments[i + 2];
          if (val === void 0) {
            val = null;
          }
          _this[field] = val;
        });
      };
      _proto.findAll = function findAll(type, results) {
        var _this2 = this;
        results = results || [];
        if (this instanceof NodeList) {
          this.children.forEach(function(child) {
            return traverseAndCheck(child, type, results);
          });
        } else {
          this.fields.forEach(function(field) {
            return traverseAndCheck(_this2[field], type, results);
          });
        }
        return results;
      };
      _proto.iterFields = function iterFields(func) {
        var _this3 = this;
        this.fields.forEach(function(field) {
          func(_this3[field], field);
        });
      };
      return Node2;
    }(Obj);
    var Value = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Value2, _Node);
      function Value2() {
        return _Node.apply(this, arguments) || this;
      }
      _createClass(Value2, [{
        key: "typename",
        get: function get() {
          return "Value";
        }
      }, {
        key: "fields",
        get: function get() {
          return ["value"];
        }
      }]);
      return Value2;
    }(Node);
    var NodeList = /* @__PURE__ */ function(_Node2) {
      _inheritsLoose(NodeList2, _Node2);
      function NodeList2() {
        return _Node2.apply(this, arguments) || this;
      }
      var _proto2 = NodeList2.prototype;
      _proto2.init = function init(lineno, colno, nodes) {
        _Node2.prototype.init.call(this, lineno, colno, nodes || []);
      };
      _proto2.addChild = function addChild(node) {
        this.children.push(node);
      };
      _createClass(NodeList2, [{
        key: "typename",
        get: function get() {
          return "NodeList";
        }
      }, {
        key: "fields",
        get: function get() {
          return ["children"];
        }
      }]);
      return NodeList2;
    }(Node);
    var Root = NodeList.extend("Root");
    var Literal = Value.extend("Literal");
    var _Symbol = Value.extend("Symbol");
    var Group = NodeList.extend("Group");
    var ArrayNode = NodeList.extend("Array");
    var Pair = Node.extend("Pair", {
      fields: ["key", "value"]
    });
    var Dict = NodeList.extend("Dict");
    var LookupVal = Node.extend("LookupVal", {
      fields: ["target", "val"]
    });
    var If = Node.extend("If", {
      fields: ["cond", "body", "else_"]
    });
    var IfAsync = If.extend("IfAsync");
    var InlineIf = Node.extend("InlineIf", {
      fields: ["cond", "body", "else_"]
    });
    var For = Node.extend("For", {
      fields: ["arr", "name", "body", "else_"]
    });
    var AsyncEach = For.extend("AsyncEach");
    var AsyncAll = For.extend("AsyncAll");
    var Macro = Node.extend("Macro", {
      fields: ["name", "args", "body"]
    });
    var Caller = Macro.extend("Caller");
    var Import = Node.extend("Import", {
      fields: ["template", "target", "withContext"]
    });
    var FromImport = /* @__PURE__ */ function(_Node3) {
      _inheritsLoose(FromImport2, _Node3);
      function FromImport2() {
        return _Node3.apply(this, arguments) || this;
      }
      var _proto3 = FromImport2.prototype;
      _proto3.init = function init(lineno, colno, template, names, withContext) {
        _Node3.prototype.init.call(this, lineno, colno, template, names || new NodeList(), withContext);
      };
      _createClass(FromImport2, [{
        key: "typename",
        get: function get() {
          return "FromImport";
        }
      }, {
        key: "fields",
        get: function get() {
          return ["template", "names", "withContext"];
        }
      }]);
      return FromImport2;
    }(Node);
    var FunCall = Node.extend("FunCall", {
      fields: ["name", "args"]
    });
    var Filter = FunCall.extend("Filter");
    var FilterAsync = Filter.extend("FilterAsync", {
      fields: ["name", "args", "symbol"]
    });
    var KeywordArgs = Dict.extend("KeywordArgs");
    var Block = Node.extend("Block", {
      fields: ["name", "body"]
    });
    var Super = Node.extend("Super", {
      fields: ["blockName", "symbol"]
    });
    var TemplateRef = Node.extend("TemplateRef", {
      fields: ["template"]
    });
    var Extends = TemplateRef.extend("Extends");
    var Include = Node.extend("Include", {
      fields: ["template", "ignoreMissing"]
    });
    var Set2 = Node.extend("Set", {
      fields: ["targets", "value"]
    });
    var Switch = Node.extend("Switch", {
      fields: ["expr", "cases", "default"]
    });
    var Case = Node.extend("Case", {
      fields: ["cond", "body"]
    });
    var Output = NodeList.extend("Output");
    var Capture = Node.extend("Capture", {
      fields: ["body"]
    });
    var TemplateData = Literal.extend("TemplateData");
    var UnaryOp = Node.extend("UnaryOp", {
      fields: ["target"]
    });
    var BinOp = Node.extend("BinOp", {
      fields: ["left", "right"]
    });
    var In = BinOp.extend("In");
    var Is = BinOp.extend("Is");
    var Or = BinOp.extend("Or");
    var And = BinOp.extend("And");
    var Not = UnaryOp.extend("Not");
    var Add = BinOp.extend("Add");
    var Concat = BinOp.extend("Concat");
    var Sub = BinOp.extend("Sub");
    var Mul = BinOp.extend("Mul");
    var Div = BinOp.extend("Div");
    var FloorDiv = BinOp.extend("FloorDiv");
    var Mod = BinOp.extend("Mod");
    var Pow = BinOp.extend("Pow");
    var Neg = UnaryOp.extend("Neg");
    var Pos = UnaryOp.extend("Pos");
    var Compare = Node.extend("Compare", {
      fields: ["expr", "ops"]
    });
    var CompareOperand = Node.extend("CompareOperand", {
      fields: ["expr", "type"]
    });
    var CallExtension = Node.extend("CallExtension", {
      init: function init(ext, prop, args, contentArgs) {
        this.parent();
        this.extName = ext.__name || ext;
        this.prop = prop;
        this.args = args || new NodeList();
        this.contentArgs = contentArgs || [];
        this.autoescape = ext.autoescape;
      },
      fields: ["extName", "prop", "args", "contentArgs"]
    });
    var CallExtensionAsync = CallExtension.extend("CallExtensionAsync");
    function print(str, indent, inline) {
      var lines = str.split("\n");
      lines.forEach(function(line, i) {
        if (line && (inline && i > 0 || !inline)) {
          process.stdout.write(" ".repeat(indent));
        }
        var nl = i === lines.length - 1 ? "" : "\n";
        process.stdout.write("" + line + nl);
      });
    }
    function printNodes(node, indent) {
      indent = indent || 0;
      print(node.typename + ": ", indent);
      if (node instanceof NodeList) {
        print("\n");
        node.children.forEach(function(n) {
          printNodes(n, indent + 2);
        });
      } else if (node instanceof CallExtension) {
        print(node.extName + "." + node.prop + "\n");
        if (node.args) {
          printNodes(node.args, indent + 2);
        }
        if (node.contentArgs) {
          node.contentArgs.forEach(function(n) {
            printNodes(n, indent + 2);
          });
        }
      } else {
        var nodes = [];
        var props = null;
        node.iterFields(function(val, fieldName) {
          if (val instanceof Node) {
            nodes.push([fieldName, val]);
          } else {
            props = props || {};
            props[fieldName] = val;
          }
        });
        if (props) {
          print(JSON.stringify(props, null, 2) + "\n", null, true);
        } else {
          print("\n");
        }
        nodes.forEach(function(_ref) {
          var fieldName = _ref[0], n = _ref[1];
          print("[" + fieldName + "] =>", indent + 2);
          printNodes(n, indent + 4);
        });
      }
    }
    module2.exports = {
      Node,
      Root,
      NodeList,
      Value,
      Literal,
      Symbol: _Symbol,
      Group,
      Array: ArrayNode,
      Pair,
      Dict,
      Output,
      Capture,
      TemplateData,
      If,
      IfAsync,
      InlineIf,
      For,
      AsyncEach,
      AsyncAll,
      Macro,
      Caller,
      Import,
      FromImport,
      FunCall,
      Filter,
      FilterAsync,
      KeywordArgs,
      Block,
      Super,
      Extends,
      Include,
      Set: Set2,
      Switch,
      Case,
      LookupVal,
      BinOp,
      In,
      Is,
      Or,
      And,
      Not,
      Add,
      Concat,
      Sub,
      Mul,
      Div,
      FloorDiv,
      Mod,
      Pow,
      Neg,
      Pos,
      Compare,
      CompareOperand,
      CallExtension,
      CallExtensionAsync,
      printNodes
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/parser.js"(exports2, module2) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var lexer = require_lexer();
    var nodes = require_nodes();
    var Obj = require_object().Obj;
    var lib = require_lib();
    var Parser = /* @__PURE__ */ function(_Obj) {
      _inheritsLoose(Parser2, _Obj);
      function Parser2() {
        return _Obj.apply(this, arguments) || this;
      }
      var _proto = Parser2.prototype;
      _proto.init = function init(tokens) {
        this.tokens = tokens;
        this.peeked = null;
        this.breakOnBlocks = null;
        this.dropLeadingWhitespace = false;
        this.extensions = [];
      };
      _proto.nextToken = function nextToken(withWhitespace) {
        var tok;
        if (this.peeked) {
          if (!withWhitespace && this.peeked.type === lexer.TOKEN_WHITESPACE) {
            this.peeked = null;
          } else {
            tok = this.peeked;
            this.peeked = null;
            return tok;
          }
        }
        tok = this.tokens.nextToken();
        if (!withWhitespace) {
          while (tok && tok.type === lexer.TOKEN_WHITESPACE) {
            tok = this.tokens.nextToken();
          }
        }
        return tok;
      };
      _proto.peekToken = function peekToken() {
        this.peeked = this.peeked || this.nextToken();
        return this.peeked;
      };
      _proto.pushToken = function pushToken(tok) {
        if (this.peeked) {
          throw new Error("pushToken: can only push one token on between reads");
        }
        this.peeked = tok;
      };
      _proto.error = function error(msg, lineno, colno) {
        if (lineno === void 0 || colno === void 0) {
          var tok = this.peekToken() || {};
          lineno = tok.lineno;
          colno = tok.colno;
        }
        if (lineno !== void 0) {
          lineno += 1;
        }
        if (colno !== void 0) {
          colno += 1;
        }
        return new lib.TemplateError(msg, lineno, colno);
      };
      _proto.fail = function fail(msg, lineno, colno) {
        throw this.error(msg, lineno, colno);
      };
      _proto.skip = function skip(type) {
        var tok = this.nextToken();
        if (!tok || tok.type !== type) {
          this.pushToken(tok);
          return false;
        }
        return true;
      };
      _proto.expect = function expect(type) {
        var tok = this.nextToken();
        if (tok.type !== type) {
          this.fail("expected " + type + ", got " + tok.type, tok.lineno, tok.colno);
        }
        return tok;
      };
      _proto.skipValue = function skipValue(type, val) {
        var tok = this.nextToken();
        if (!tok || tok.type !== type || tok.value !== val) {
          this.pushToken(tok);
          return false;
        }
        return true;
      };
      _proto.skipSymbol = function skipSymbol(val) {
        return this.skipValue(lexer.TOKEN_SYMBOL, val);
      };
      _proto.advanceAfterBlockEnd = function advanceAfterBlockEnd(name) {
        var tok;
        if (!name) {
          tok = this.peekToken();
          if (!tok) {
            this.fail("unexpected end of file");
          }
          if (tok.type !== lexer.TOKEN_SYMBOL) {
            this.fail("advanceAfterBlockEnd: expected symbol token or explicit name to be passed");
          }
          name = this.nextToken().value;
        }
        tok = this.nextToken();
        if (tok && tok.type === lexer.TOKEN_BLOCK_END) {
          if (tok.value.charAt(0) === "-") {
            this.dropLeadingWhitespace = true;
          }
        } else {
          this.fail("expected block end in " + name + " statement");
        }
        return tok;
      };
      _proto.advanceAfterVariableEnd = function advanceAfterVariableEnd() {
        var tok = this.nextToken();
        if (tok && tok.type === lexer.TOKEN_VARIABLE_END) {
          this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.VARIABLE_END.length - 1) === "-";
        } else {
          this.pushToken(tok);
          this.fail("expected variable end");
        }
      };
      _proto.parseFor = function parseFor() {
        var forTok = this.peekToken();
        var node;
        var endBlock;
        if (this.skipSymbol("for")) {
          node = new nodes.For(forTok.lineno, forTok.colno);
          endBlock = "endfor";
        } else if (this.skipSymbol("asyncEach")) {
          node = new nodes.AsyncEach(forTok.lineno, forTok.colno);
          endBlock = "endeach";
        } else if (this.skipSymbol("asyncAll")) {
          node = new nodes.AsyncAll(forTok.lineno, forTok.colno);
          endBlock = "endall";
        } else {
          this.fail("parseFor: expected for{Async}", forTok.lineno, forTok.colno);
        }
        node.name = this.parsePrimary();
        if (!(node.name instanceof nodes.Symbol)) {
          this.fail("parseFor: variable name expected for loop");
        }
        var type = this.peekToken().type;
        if (type === lexer.TOKEN_COMMA) {
          var key = node.name;
          node.name = new nodes.Array(key.lineno, key.colno);
          node.name.addChild(key);
          while (this.skip(lexer.TOKEN_COMMA)) {
            var prim = this.parsePrimary();
            node.name.addChild(prim);
          }
        }
        if (!this.skipSymbol("in")) {
          this.fail('parseFor: expected "in" keyword for loop', forTok.lineno, forTok.colno);
        }
        node.arr = this.parseExpression();
        this.advanceAfterBlockEnd(forTok.value);
        node.body = this.parseUntilBlocks(endBlock, "else");
        if (this.skipSymbol("else")) {
          this.advanceAfterBlockEnd("else");
          node.else_ = this.parseUntilBlocks(endBlock);
        }
        this.advanceAfterBlockEnd();
        return node;
      };
      _proto.parseMacro = function parseMacro() {
        var macroTok = this.peekToken();
        if (!this.skipSymbol("macro")) {
          this.fail("expected macro");
        }
        var name = this.parsePrimary(true);
        var args = this.parseSignature();
        var node = new nodes.Macro(macroTok.lineno, macroTok.colno, name, args);
        this.advanceAfterBlockEnd(macroTok.value);
        node.body = this.parseUntilBlocks("endmacro");
        this.advanceAfterBlockEnd();
        return node;
      };
      _proto.parseCall = function parseCall() {
        var callTok = this.peekToken();
        if (!this.skipSymbol("call")) {
          this.fail("expected call");
        }
        var callerArgs = this.parseSignature(true) || new nodes.NodeList();
        var macroCall = this.parsePrimary();
        this.advanceAfterBlockEnd(callTok.value);
        var body = this.parseUntilBlocks("endcall");
        this.advanceAfterBlockEnd();
        var callerName = new nodes.Symbol(callTok.lineno, callTok.colno, "caller");
        var callerNode = new nodes.Caller(callTok.lineno, callTok.colno, callerName, callerArgs, body);
        var args = macroCall.args.children;
        if (!(args[args.length - 1] instanceof nodes.KeywordArgs)) {
          args.push(new nodes.KeywordArgs());
        }
        var kwargs = args[args.length - 1];
        kwargs.addChild(new nodes.Pair(callTok.lineno, callTok.colno, callerName, callerNode));
        return new nodes.Output(callTok.lineno, callTok.colno, [macroCall]);
      };
      _proto.parseWithContext = function parseWithContext() {
        var tok = this.peekToken();
        var withContext = null;
        if (this.skipSymbol("with")) {
          withContext = true;
        } else if (this.skipSymbol("without")) {
          withContext = false;
        }
        if (withContext !== null) {
          if (!this.skipSymbol("context")) {
            this.fail("parseFrom: expected context after with/without", tok.lineno, tok.colno);
          }
        }
        return withContext;
      };
      _proto.parseImport = function parseImport() {
        var importTok = this.peekToken();
        if (!this.skipSymbol("import")) {
          this.fail("parseImport: expected import", importTok.lineno, importTok.colno);
        }
        var template = this.parseExpression();
        if (!this.skipSymbol("as")) {
          this.fail('parseImport: expected "as" keyword', importTok.lineno, importTok.colno);
        }
        var target = this.parseExpression();
        var withContext = this.parseWithContext();
        var node = new nodes.Import(importTok.lineno, importTok.colno, template, target, withContext);
        this.advanceAfterBlockEnd(importTok.value);
        return node;
      };
      _proto.parseFrom = function parseFrom() {
        var fromTok = this.peekToken();
        if (!this.skipSymbol("from")) {
          this.fail("parseFrom: expected from");
        }
        var template = this.parseExpression();
        if (!this.skipSymbol("import")) {
          this.fail("parseFrom: expected import", fromTok.lineno, fromTok.colno);
        }
        var names = new nodes.NodeList();
        var withContext;
        while (1) {
          var nextTok = this.peekToken();
          if (nextTok.type === lexer.TOKEN_BLOCK_END) {
            if (!names.children.length) {
              this.fail("parseFrom: Expected at least one import name", fromTok.lineno, fromTok.colno);
            }
            if (nextTok.value.charAt(0) === "-") {
              this.dropLeadingWhitespace = true;
            }
            this.nextToken();
            break;
          }
          if (names.children.length > 0 && !this.skip(lexer.TOKEN_COMMA)) {
            this.fail("parseFrom: expected comma", fromTok.lineno, fromTok.colno);
          }
          var name = this.parsePrimary();
          if (name.value.charAt(0) === "_") {
            this.fail("parseFrom: names starting with an underscore cannot be imported", name.lineno, name.colno);
          }
          if (this.skipSymbol("as")) {
            var alias = this.parsePrimary();
            names.addChild(new nodes.Pair(name.lineno, name.colno, name, alias));
          } else {
            names.addChild(name);
          }
          withContext = this.parseWithContext();
        }
        return new nodes.FromImport(fromTok.lineno, fromTok.colno, template, names, withContext);
      };
      _proto.parseBlock = function parseBlock() {
        var tag = this.peekToken();
        if (!this.skipSymbol("block")) {
          this.fail("parseBlock: expected block", tag.lineno, tag.colno);
        }
        var node = new nodes.Block(tag.lineno, tag.colno);
        node.name = this.parsePrimary();
        if (!(node.name instanceof nodes.Symbol)) {
          this.fail("parseBlock: variable name expected", tag.lineno, tag.colno);
        }
        this.advanceAfterBlockEnd(tag.value);
        node.body = this.parseUntilBlocks("endblock");
        this.skipSymbol("endblock");
        this.skipSymbol(node.name.value);
        var tok = this.peekToken();
        if (!tok) {
          this.fail("parseBlock: expected endblock, got end of file");
        }
        this.advanceAfterBlockEnd(tok.value);
        return node;
      };
      _proto.parseExtends = function parseExtends() {
        var tagName = "extends";
        var tag = this.peekToken();
        if (!this.skipSymbol(tagName)) {
          this.fail("parseTemplateRef: expected " + tagName);
        }
        var node = new nodes.Extends(tag.lineno, tag.colno);
        node.template = this.parseExpression();
        this.advanceAfterBlockEnd(tag.value);
        return node;
      };
      _proto.parseInclude = function parseInclude() {
        var tagName = "include";
        var tag = this.peekToken();
        if (!this.skipSymbol(tagName)) {
          this.fail("parseInclude: expected " + tagName);
        }
        var node = new nodes.Include(tag.lineno, tag.colno);
        node.template = this.parseExpression();
        if (this.skipSymbol("ignore") && this.skipSymbol("missing")) {
          node.ignoreMissing = true;
        }
        this.advanceAfterBlockEnd(tag.value);
        return node;
      };
      _proto.parseIf = function parseIf() {
        var tag = this.peekToken();
        var node;
        if (this.skipSymbol("if") || this.skipSymbol("elif") || this.skipSymbol("elseif")) {
          node = new nodes.If(tag.lineno, tag.colno);
        } else if (this.skipSymbol("ifAsync")) {
          node = new nodes.IfAsync(tag.lineno, tag.colno);
        } else {
          this.fail("parseIf: expected if, elif, or elseif", tag.lineno, tag.colno);
        }
        node.cond = this.parseExpression();
        this.advanceAfterBlockEnd(tag.value);
        node.body = this.parseUntilBlocks("elif", "elseif", "else", "endif");
        var tok = this.peekToken();
        switch (tok && tok.value) {
          case "elseif":
          case "elif":
            node.else_ = this.parseIf();
            break;
          case "else":
            this.advanceAfterBlockEnd();
            node.else_ = this.parseUntilBlocks("endif");
            this.advanceAfterBlockEnd();
            break;
          case "endif":
            node.else_ = null;
            this.advanceAfterBlockEnd();
            break;
          default:
            this.fail("parseIf: expected elif, else, or endif, got end of file");
        }
        return node;
      };
      _proto.parseSet = function parseSet() {
        var tag = this.peekToken();
        if (!this.skipSymbol("set")) {
          this.fail("parseSet: expected set", tag.lineno, tag.colno);
        }
        var node = new nodes.Set(tag.lineno, tag.colno, []);
        var target;
        while (target = this.parsePrimary()) {
          node.targets.push(target);
          if (!this.skip(lexer.TOKEN_COMMA)) {
            break;
          }
        }
        if (!this.skipValue(lexer.TOKEN_OPERATOR, "=")) {
          if (!this.skip(lexer.TOKEN_BLOCK_END)) {
            this.fail("parseSet: expected = or block end in set tag", tag.lineno, tag.colno);
          } else {
            node.body = new nodes.Capture(tag.lineno, tag.colno, this.parseUntilBlocks("endset"));
            node.value = null;
            this.advanceAfterBlockEnd();
          }
        } else {
          node.value = this.parseExpression();
          this.advanceAfterBlockEnd(tag.value);
        }
        return node;
      };
      _proto.parseSwitch = function parseSwitch() {
        var switchStart = "switch";
        var switchEnd = "endswitch";
        var caseStart = "case";
        var caseDefault = "default";
        var tag = this.peekToken();
        if (!this.skipSymbol(switchStart) && !this.skipSymbol(caseStart) && !this.skipSymbol(caseDefault)) {
          this.fail('parseSwitch: expected "switch," "case" or "default"', tag.lineno, tag.colno);
        }
        var expr = this.parseExpression();
        this.advanceAfterBlockEnd(switchStart);
        this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
        var tok = this.peekToken();
        var cases = [];
        var defaultCase;
        do {
          this.skipSymbol(caseStart);
          var cond = this.parseExpression();
          this.advanceAfterBlockEnd(switchStart);
          var body = this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
          cases.push(new nodes.Case(tok.line, tok.col, cond, body));
          tok = this.peekToken();
        } while (tok && tok.value === caseStart);
        switch (tok.value) {
          case caseDefault:
            this.advanceAfterBlockEnd();
            defaultCase = this.parseUntilBlocks(switchEnd);
            this.advanceAfterBlockEnd();
            break;
          case switchEnd:
            this.advanceAfterBlockEnd();
            break;
          default:
            this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.');
        }
        return new nodes.Switch(tag.lineno, tag.colno, expr, cases, defaultCase);
      };
      _proto.parseStatement = function parseStatement() {
        var tok = this.peekToken();
        var node;
        if (tok.type !== lexer.TOKEN_SYMBOL) {
          this.fail("tag name expected", tok.lineno, tok.colno);
        }
        if (this.breakOnBlocks && lib.indexOf(this.breakOnBlocks, tok.value) !== -1) {
          return null;
        }
        switch (tok.value) {
          case "raw":
            return this.parseRaw();
          case "verbatim":
            return this.parseRaw("verbatim");
          case "if":
          case "ifAsync":
            return this.parseIf();
          case "for":
          case "asyncEach":
          case "asyncAll":
            return this.parseFor();
          case "block":
            return this.parseBlock();
          case "extends":
            return this.parseExtends();
          case "include":
            return this.parseInclude();
          case "set":
            return this.parseSet();
          case "macro":
            return this.parseMacro();
          case "call":
            return this.parseCall();
          case "import":
            return this.parseImport();
          case "from":
            return this.parseFrom();
          case "filter":
            return this.parseFilterStatement();
          case "switch":
            return this.parseSwitch();
          default:
            if (this.extensions.length) {
              for (var i = 0; i < this.extensions.length; i++) {
                var ext = this.extensions[i];
                if (lib.indexOf(ext.tags || [], tok.value) !== -1) {
                  return ext.parse(this, nodes, lexer);
                }
              }
            }
            this.fail("unknown block tag: " + tok.value, tok.lineno, tok.colno);
        }
        return node;
      };
      _proto.parseRaw = function parseRaw(tagName) {
        tagName = tagName || "raw";
        var endTagName = "end" + tagName;
        var rawBlockRegex = new RegExp("([\\s\\S]*?){%\\s*(" + tagName + "|" + endTagName + ")\\s*(?=%})%}");
        var rawLevel = 1;
        var str = "";
        var matches = null;
        var begun = this.advanceAfterBlockEnd();
        while ((matches = this.tokens._extractRegex(rawBlockRegex)) && rawLevel > 0) {
          var all = matches[0];
          var pre = matches[1];
          var blockName = matches[2];
          if (blockName === tagName) {
            rawLevel += 1;
          } else if (blockName === endTagName) {
            rawLevel -= 1;
          }
          if (rawLevel === 0) {
            str += pre;
            this.tokens.backN(all.length - pre.length);
          } else {
            str += all;
          }
        }
        return new nodes.Output(begun.lineno, begun.colno, [new nodes.TemplateData(begun.lineno, begun.colno, str)]);
      };
      _proto.parsePostfix = function parsePostfix(node) {
        var lookup;
        var tok = this.peekToken();
        while (tok) {
          if (tok.type === lexer.TOKEN_LEFT_PAREN) {
            node = new nodes.FunCall(tok.lineno, tok.colno, node, this.parseSignature());
          } else if (tok.type === lexer.TOKEN_LEFT_BRACKET) {
            lookup = this.parseAggregate();
            if (lookup.children.length > 1) {
              this.fail("invalid index");
            }
            node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup.children[0]);
          } else if (tok.type === lexer.TOKEN_OPERATOR && tok.value === ".") {
            this.nextToken();
            var val = this.nextToken();
            if (val.type !== lexer.TOKEN_SYMBOL) {
              this.fail("expected name as lookup value, got " + val.value, val.lineno, val.colno);
            }
            lookup = new nodes.Literal(val.lineno, val.colno, val.value);
            node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup);
          } else {
            break;
          }
          tok = this.peekToken();
        }
        return node;
      };
      _proto.parseExpression = function parseExpression() {
        var node = this.parseInlineIf();
        return node;
      };
      _proto.parseInlineIf = function parseInlineIf() {
        var node = this.parseOr();
        if (this.skipSymbol("if")) {
          var condNode = this.parseOr();
          var bodyNode = node;
          node = new nodes.InlineIf(node.lineno, node.colno);
          node.body = bodyNode;
          node.cond = condNode;
          if (this.skipSymbol("else")) {
            node.else_ = this.parseOr();
          } else {
            node.else_ = null;
          }
        }
        return node;
      };
      _proto.parseOr = function parseOr() {
        var node = this.parseAnd();
        while (this.skipSymbol("or")) {
          var node2 = this.parseAnd();
          node = new nodes.Or(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseAnd = function parseAnd() {
        var node = this.parseNot();
        while (this.skipSymbol("and")) {
          var node2 = this.parseNot();
          node = new nodes.And(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseNot = function parseNot() {
        var tok = this.peekToken();
        if (this.skipSymbol("not")) {
          return new nodes.Not(tok.lineno, tok.colno, this.parseNot());
        }
        return this.parseIn();
      };
      _proto.parseIn = function parseIn() {
        var node = this.parseIs();
        while (1) {
          var tok = this.nextToken();
          if (!tok) {
            break;
          }
          var invert = tok.type === lexer.TOKEN_SYMBOL && tok.value === "not";
          if (!invert) {
            this.pushToken(tok);
          }
          if (this.skipSymbol("in")) {
            var node2 = this.parseIs();
            node = new nodes.In(node.lineno, node.colno, node, node2);
            if (invert) {
              node = new nodes.Not(node.lineno, node.colno, node);
            }
          } else {
            if (invert) {
              this.pushToken(tok);
            }
            break;
          }
        }
        return node;
      };
      _proto.parseIs = function parseIs() {
        var node = this.parseCompare();
        if (this.skipSymbol("is")) {
          var not = this.skipSymbol("not");
          var node2 = this.parseCompare();
          node = new nodes.Is(node.lineno, node.colno, node, node2);
          if (not) {
            node = new nodes.Not(node.lineno, node.colno, node);
          }
        }
        return node;
      };
      _proto.parseCompare = function parseCompare() {
        var compareOps = ["==", "===", "!=", "!==", "<", ">", "<=", ">="];
        var expr = this.parseConcat();
        var ops = [];
        while (1) {
          var tok = this.nextToken();
          if (!tok) {
            break;
          } else if (compareOps.indexOf(tok.value) !== -1) {
            ops.push(new nodes.CompareOperand(tok.lineno, tok.colno, this.parseConcat(), tok.value));
          } else {
            this.pushToken(tok);
            break;
          }
        }
        if (ops.length) {
          return new nodes.Compare(ops[0].lineno, ops[0].colno, expr, ops);
        } else {
          return expr;
        }
      };
      _proto.parseConcat = function parseConcat() {
        var node = this.parseAdd();
        while (this.skipValue(lexer.TOKEN_TILDE, "~")) {
          var node2 = this.parseAdd();
          node = new nodes.Concat(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseAdd = function parseAdd() {
        var node = this.parseSub();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "+")) {
          var node2 = this.parseSub();
          node = new nodes.Add(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseSub = function parseSub() {
        var node = this.parseMul();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "-")) {
          var node2 = this.parseMul();
          node = new nodes.Sub(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseMul = function parseMul() {
        var node = this.parseDiv();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "*")) {
          var node2 = this.parseDiv();
          node = new nodes.Mul(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseDiv = function parseDiv() {
        var node = this.parseFloorDiv();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "/")) {
          var node2 = this.parseFloorDiv();
          node = new nodes.Div(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseFloorDiv = function parseFloorDiv() {
        var node = this.parseMod();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "//")) {
          var node2 = this.parseMod();
          node = new nodes.FloorDiv(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseMod = function parseMod() {
        var node = this.parsePow();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "%")) {
          var node2 = this.parsePow();
          node = new nodes.Mod(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parsePow = function parsePow() {
        var node = this.parseUnary();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "**")) {
          var node2 = this.parseUnary();
          node = new nodes.Pow(node.lineno, node.colno, node, node2);
        }
        return node;
      };
      _proto.parseUnary = function parseUnary(noFilters) {
        var tok = this.peekToken();
        var node;
        if (this.skipValue(lexer.TOKEN_OPERATOR, "-")) {
          node = new nodes.Neg(tok.lineno, tok.colno, this.parseUnary(true));
        } else if (this.skipValue(lexer.TOKEN_OPERATOR, "+")) {
          node = new nodes.Pos(tok.lineno, tok.colno, this.parseUnary(true));
        } else {
          node = this.parsePrimary();
        }
        if (!noFilters) {
          node = this.parseFilter(node);
        }
        return node;
      };
      _proto.parsePrimary = function parsePrimary(noPostfix) {
        var tok = this.nextToken();
        var val;
        var node = null;
        if (!tok) {
          this.fail("expected expression, got end of file");
        } else if (tok.type === lexer.TOKEN_STRING) {
          val = tok.value;
        } else if (tok.type === lexer.TOKEN_INT) {
          val = parseInt(tok.value, 10);
        } else if (tok.type === lexer.TOKEN_FLOAT) {
          val = parseFloat(tok.value);
        } else if (tok.type === lexer.TOKEN_BOOLEAN) {
          if (tok.value === "true") {
            val = true;
          } else if (tok.value === "false") {
            val = false;
          } else {
            this.fail("invalid boolean: " + tok.value, tok.lineno, tok.colno);
          }
        } else if (tok.type === lexer.TOKEN_NONE) {
          val = null;
        } else if (tok.type === lexer.TOKEN_REGEX) {
          val = new RegExp(tok.value.body, tok.value.flags);
        }
        if (val !== void 0) {
          node = new nodes.Literal(tok.lineno, tok.colno, val);
        } else if (tok.type === lexer.TOKEN_SYMBOL) {
          node = new nodes.Symbol(tok.lineno, tok.colno, tok.value);
        } else {
          this.pushToken(tok);
          node = this.parseAggregate();
        }
        if (!noPostfix) {
          node = this.parsePostfix(node);
        }
        if (node) {
          return node;
        } else {
          throw this.error("unexpected token: " + tok.value, tok.lineno, tok.colno);
        }
      };
      _proto.parseFilterName = function parseFilterName() {
        var tok = this.expect(lexer.TOKEN_SYMBOL);
        var name = tok.value;
        while (this.skipValue(lexer.TOKEN_OPERATOR, ".")) {
          name += "." + this.expect(lexer.TOKEN_SYMBOL).value;
        }
        return new nodes.Symbol(tok.lineno, tok.colno, name);
      };
      _proto.parseFilterArgs = function parseFilterArgs(node) {
        if (this.peekToken().type === lexer.TOKEN_LEFT_PAREN) {
          var call = this.parsePostfix(node);
          return call.args.children;
        }
        return [];
      };
      _proto.parseFilter = function parseFilter(node) {
        while (this.skip(lexer.TOKEN_PIPE)) {
          var name = this.parseFilterName();
          node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [node].concat(this.parseFilterArgs(node))));
        }
        return node;
      };
      _proto.parseFilterStatement = function parseFilterStatement() {
        var filterTok = this.peekToken();
        if (!this.skipSymbol("filter")) {
          this.fail("parseFilterStatement: expected filter");
        }
        var name = this.parseFilterName();
        var args = this.parseFilterArgs(name);
        this.advanceAfterBlockEnd(filterTok.value);
        var body = new nodes.Capture(name.lineno, name.colno, this.parseUntilBlocks("endfilter"));
        this.advanceAfterBlockEnd();
        var node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [body].concat(args)));
        return new nodes.Output(name.lineno, name.colno, [node]);
      };
      _proto.parseAggregate = function parseAggregate() {
        var tok = this.nextToken();
        var node;
        switch (tok.type) {
          case lexer.TOKEN_LEFT_PAREN:
            node = new nodes.Group(tok.lineno, tok.colno);
            break;
          case lexer.TOKEN_LEFT_BRACKET:
            node = new nodes.Array(tok.lineno, tok.colno);
            break;
          case lexer.TOKEN_LEFT_CURLY:
            node = new nodes.Dict(tok.lineno, tok.colno);
            break;
          default:
            return null;
        }
        while (1) {
          var type = this.peekToken().type;
          if (type === lexer.TOKEN_RIGHT_PAREN || type === lexer.TOKEN_RIGHT_BRACKET || type === lexer.TOKEN_RIGHT_CURLY) {
            this.nextToken();
            break;
          }
          if (node.children.length > 0) {
            if (!this.skip(lexer.TOKEN_COMMA)) {
              this.fail("parseAggregate: expected comma after expression", tok.lineno, tok.colno);
            }
          }
          if (node instanceof nodes.Dict) {
            var key = this.parsePrimary();
            if (!this.skip(lexer.TOKEN_COLON)) {
              this.fail("parseAggregate: expected colon after dict key", tok.lineno, tok.colno);
            }
            var value = this.parseExpression();
            node.addChild(new nodes.Pair(key.lineno, key.colno, key, value));
          } else {
            var expr = this.parseExpression();
            node.addChild(expr);
          }
        }
        return node;
      };
      _proto.parseSignature = function parseSignature(tolerant, noParens) {
        var tok = this.peekToken();
        if (!noParens && tok.type !== lexer.TOKEN_LEFT_PAREN) {
          if (tolerant) {
            return null;
          } else {
            this.fail("expected arguments", tok.lineno, tok.colno);
          }
        }
        if (tok.type === lexer.TOKEN_LEFT_PAREN) {
          tok = this.nextToken();
        }
        var args = new nodes.NodeList(tok.lineno, tok.colno);
        var kwargs = new nodes.KeywordArgs(tok.lineno, tok.colno);
        var checkComma = false;
        while (1) {
          tok = this.peekToken();
          if (!noParens && tok.type === lexer.TOKEN_RIGHT_PAREN) {
            this.nextToken();
            break;
          } else if (noParens && tok.type === lexer.TOKEN_BLOCK_END) {
            break;
          }
          if (checkComma && !this.skip(lexer.TOKEN_COMMA)) {
            this.fail("parseSignature: expected comma after expression", tok.lineno, tok.colno);
          } else {
            var arg = this.parseExpression();
            if (this.skipValue(lexer.TOKEN_OPERATOR, "=")) {
              kwargs.addChild(new nodes.Pair(arg.lineno, arg.colno, arg, this.parseExpression()));
            } else {
              args.addChild(arg);
            }
          }
          checkComma = true;
        }
        if (kwargs.children.length) {
          args.addChild(kwargs);
        }
        return args;
      };
      _proto.parseUntilBlocks = function parseUntilBlocks() {
        var prev = this.breakOnBlocks;
        for (var _len = arguments.length, blockNames = new Array(_len), _key = 0; _key < _len; _key++) {
          blockNames[_key] = arguments[_key];
        }
        this.breakOnBlocks = blockNames;
        var ret = this.parse();
        this.breakOnBlocks = prev;
        return ret;
      };
      _proto.parseNodes = function parseNodes() {
        var tok;
        var buf = [];
        while (tok = this.nextToken()) {
          if (tok.type === lexer.TOKEN_DATA) {
            var data = tok.value;
            var nextToken = this.peekToken();
            var nextVal = nextToken && nextToken.value;
            if (this.dropLeadingWhitespace) {
              data = data.replace(/^\s*/, "");
              this.dropLeadingWhitespace = false;
            }
            if (nextToken && (nextToken.type === lexer.TOKEN_BLOCK_START && nextVal.charAt(nextVal.length - 1) === "-" || nextToken.type === lexer.TOKEN_VARIABLE_START && nextVal.charAt(this.tokens.tags.VARIABLE_START.length) === "-" || nextToken.type === lexer.TOKEN_COMMENT && nextVal.charAt(this.tokens.tags.COMMENT_START.length) === "-")) {
              data = data.replace(/\s*$/, "");
            }
            buf.push(new nodes.Output(tok.lineno, tok.colno, [new nodes.TemplateData(tok.lineno, tok.colno, data)]));
          } else if (tok.type === lexer.TOKEN_BLOCK_START) {
            this.dropLeadingWhitespace = false;
            var n = this.parseStatement();
            if (!n) {
              break;
            }
            buf.push(n);
          } else if (tok.type === lexer.TOKEN_VARIABLE_START) {
            var e = this.parseExpression();
            this.dropLeadingWhitespace = false;
            this.advanceAfterVariableEnd();
            buf.push(new nodes.Output(tok.lineno, tok.colno, [e]));
          } else if (tok.type === lexer.TOKEN_COMMENT) {
            this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.COMMENT_END.length - 1) === "-";
          } else {
            this.fail("Unexpected token at top-level: " + tok.type, tok.lineno, tok.colno);
          }
        }
        return buf;
      };
      _proto.parse = function parse() {
        return new nodes.NodeList(0, 0, this.parseNodes());
      };
      _proto.parseAsRoot = function parseAsRoot() {
        return new nodes.Root(0, 0, this.parseNodes());
      };
      return Parser2;
    }(Obj);
    module2.exports = {
      parse: function parse(src, extensions, opts) {
        var p = new Parser(lexer.lex(src, opts));
        if (extensions !== void 0) {
          p.extensions = extensions;
        }
        return p.parseAsRoot();
      },
      Parser
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/transformer.js
var require_transformer = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/transformer.js"(exports2, module2) {
    "use strict";
    var nodes = require_nodes();
    var lib = require_lib();
    var sym = 0;
    function gensym() {
      return "hole_" + sym++;
    }
    function mapCOW(arr, func) {
      var res = null;
      for (var i = 0; i < arr.length; i++) {
        var item = func(arr[i]);
        if (item !== arr[i]) {
          if (!res) {
            res = arr.slice();
          }
          res[i] = item;
        }
      }
      return res || arr;
    }
    function walk(ast, func, depthFirst) {
      if (!(ast instanceof nodes.Node)) {
        return ast;
      }
      if (!depthFirst) {
        var astT = func(ast);
        if (astT && astT !== ast) {
          return astT;
        }
      }
      if (ast instanceof nodes.NodeList) {
        var children = mapCOW(ast.children, function(node) {
          return walk(node, func, depthFirst);
        });
        if (children !== ast.children) {
          ast = new nodes[ast.typename](ast.lineno, ast.colno, children);
        }
      } else if (ast instanceof nodes.CallExtension) {
        var args = walk(ast.args, func, depthFirst);
        var contentArgs = mapCOW(ast.contentArgs, function(node) {
          return walk(node, func, depthFirst);
        });
        if (args !== ast.args || contentArgs !== ast.contentArgs) {
          ast = new nodes[ast.typename](ast.extName, ast.prop, args, contentArgs);
        }
      } else {
        var props = ast.fields.map(function(field) {
          return ast[field];
        });
        var propsT = mapCOW(props, function(prop) {
          return walk(prop, func, depthFirst);
        });
        if (propsT !== props) {
          ast = new nodes[ast.typename](ast.lineno, ast.colno);
          propsT.forEach(function(prop, i) {
            ast[ast.fields[i]] = prop;
          });
        }
      }
      return depthFirst ? func(ast) || ast : ast;
    }
    function depthWalk(ast, func) {
      return walk(ast, func, true);
    }
    function _liftFilters(node, asyncFilters, prop) {
      var children = [];
      var walked = depthWalk(prop ? node[prop] : node, function(descNode) {
        var symbol;
        if (descNode instanceof nodes.Block) {
          return descNode;
        } else if (descNode instanceof nodes.Filter && lib.indexOf(asyncFilters, descNode.name.value) !== -1 || descNode instanceof nodes.CallExtensionAsync) {
          symbol = new nodes.Symbol(descNode.lineno, descNode.colno, gensym());
          children.push(new nodes.FilterAsync(descNode.lineno, descNode.colno, descNode.name, descNode.args, symbol));
        }
        return symbol;
      });
      if (prop) {
        node[prop] = walked;
      } else {
        node = walked;
      }
      if (children.length) {
        children.push(node);
        return new nodes.NodeList(node.lineno, node.colno, children);
      } else {
        return node;
      }
    }
    function liftFilters(ast, asyncFilters) {
      return depthWalk(ast, function(node) {
        if (node instanceof nodes.Output) {
          return _liftFilters(node, asyncFilters);
        } else if (node instanceof nodes.Set) {
          return _liftFilters(node, asyncFilters, "value");
        } else if (node instanceof nodes.For) {
          return _liftFilters(node, asyncFilters, "arr");
        } else if (node instanceof nodes.If) {
          return _liftFilters(node, asyncFilters, "cond");
        } else if (node instanceof nodes.CallExtension) {
          return _liftFilters(node, asyncFilters, "args");
        } else {
          return void 0;
        }
      });
    }
    function liftSuper(ast) {
      return walk(ast, function(blockNode) {
        if (!(blockNode instanceof nodes.Block)) {
          return;
        }
        var hasSuper = false;
        var symbol = gensym();
        blockNode.body = walk(blockNode.body, function(node) {
          if (node instanceof nodes.FunCall && node.name.value === "super") {
            hasSuper = true;
            return new nodes.Symbol(node.lineno, node.colno, symbol);
          }
        });
        if (hasSuper) {
          blockNode.body.children.unshift(new nodes.Super(0, 0, blockNode.name, new nodes.Symbol(0, 0, symbol)));
        }
      });
    }
    function convertStatements(ast) {
      return depthWalk(ast, function(node) {
        if (!(node instanceof nodes.If) && !(node instanceof nodes.For)) {
          return void 0;
        }
        var async = false;
        walk(node, function(child) {
          if (child instanceof nodes.FilterAsync || child instanceof nodes.IfAsync || child instanceof nodes.AsyncEach || child instanceof nodes.AsyncAll || child instanceof nodes.CallExtensionAsync) {
            async = true;
            return child;
          }
          return void 0;
        });
        if (async) {
          if (node instanceof nodes.If) {
            return new nodes.IfAsync(node.lineno, node.colno, node.cond, node.body, node.else_);
          } else if (node instanceof nodes.For && !(node instanceof nodes.AsyncAll)) {
            return new nodes.AsyncEach(node.lineno, node.colno, node.arr, node.name, node.body, node.else_);
          }
        }
        return void 0;
      });
    }
    function cps(ast, asyncFilters) {
      return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
    }
    function transform(ast, asyncFilters) {
      return cps(ast, asyncFilters || []);
    }
    module2.exports = {
      transform
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/runtime.js
var require_runtime = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/runtime.js"(exports2, module2) {
    "use strict";
    var lib = require_lib();
    var arrayFrom = Array.from;
    var supportsIterators = typeof Symbol === "function" && Symbol.iterator && typeof arrayFrom === "function";
    var Frame = /* @__PURE__ */ function() {
      function Frame2(parent, isolateWrites) {
        this.variables = /* @__PURE__ */ Object.create(null);
        this.parent = parent;
        this.topLevel = false;
        this.isolateWrites = isolateWrites;
      }
      var _proto = Frame2.prototype;
      _proto.set = function set(name, val, resolveUp) {
        var parts = name.split(".");
        var obj = this.variables;
        var frame = this;
        if (resolveUp) {
          if (frame = this.resolve(parts[0], true)) {
            frame.set(name, val);
            return;
          }
        }
        for (var i = 0; i < parts.length - 1; i++) {
          var id = parts[i];
          if (!obj[id]) {
            obj[id] = {};
          }
          obj = obj[id];
        }
        obj[parts[parts.length - 1]] = val;
      };
      _proto.get = function get(name) {
        var val = this.variables[name];
        if (val !== void 0) {
          return val;
        }
        return null;
      };
      _proto.lookup = function lookup(name) {
        var p = this.parent;
        var val = this.variables[name];
        if (val !== void 0) {
          return val;
        }
        return p && p.lookup(name);
      };
      _proto.resolve = function resolve(name, forWrite) {
        var p = forWrite && this.isolateWrites ? void 0 : this.parent;
        var val = this.variables[name];
        if (val !== void 0) {
          return this;
        }
        return p && p.resolve(name);
      };
      _proto.push = function push(isolateWrites) {
        return new Frame2(this, isolateWrites);
      };
      _proto.pop = function pop() {
        return this.parent;
      };
      return Frame2;
    }();
    function makeMacro(argNames, kwargNames, func) {
      return function macro() {
        for (var _len = arguments.length, macroArgs = new Array(_len), _key = 0; _key < _len; _key++) {
          macroArgs[_key] = arguments[_key];
        }
        var argCount = numArgs(macroArgs);
        var args;
        var kwargs = getKeywordArgs(macroArgs);
        if (argCount > argNames.length) {
          args = macroArgs.slice(0, argNames.length);
          macroArgs.slice(args.length, argCount).forEach(function(val, i2) {
            if (i2 < kwargNames.length) {
              kwargs[kwargNames[i2]] = val;
            }
          });
          args.push(kwargs);
        } else if (argCount < argNames.length) {
          args = macroArgs.slice(0, argCount);
          for (var i = argCount; i < argNames.length; i++) {
            var arg = argNames[i];
            args.push(kwargs[arg]);
            delete kwargs[arg];
          }
          args.push(kwargs);
        } else {
          args = macroArgs;
        }
        return func.apply(this, args);
      };
    }
    function makeKeywordArgs(obj) {
      obj.__keywords = true;
      return obj;
    }
    function isKeywordArgs(obj) {
      return obj && Object.prototype.hasOwnProperty.call(obj, "__keywords");
    }
    function getKeywordArgs(args) {
      var len = args.length;
      if (len) {
        var lastArg = args[len - 1];
        if (isKeywordArgs(lastArg)) {
          return lastArg;
        }
      }
      return {};
    }
    function numArgs(args) {
      var len = args.length;
      if (len === 0) {
        return 0;
      }
      var lastArg = args[len - 1];
      if (isKeywordArgs(lastArg)) {
        return len - 1;
      } else {
        return len;
      }
    }
    function SafeString(val) {
      if (typeof val !== "string") {
        return val;
      }
      this.val = val;
      this.length = val.length;
    }
    SafeString.prototype = Object.create(String.prototype, {
      length: {
        writable: true,
        configurable: true,
        value: 0
      }
    });
    SafeString.prototype.valueOf = function valueOf() {
      return this.val;
    };
    SafeString.prototype.toString = function toString() {
      return this.val;
    };
    function copySafeness(dest, target) {
      if (dest instanceof SafeString) {
        return new SafeString(target);
      }
      return target.toString();
    }
    function markSafe(val) {
      var type = typeof val;
      if (type === "string") {
        return new SafeString(val);
      } else if (type !== "function") {
        return val;
      } else {
        return function wrapSafe(args) {
          var ret = val.apply(this, arguments);
          if (typeof ret === "string") {
            return new SafeString(ret);
          }
          return ret;
        };
      }
    }
    function suppressValue(val, autoescape) {
      val = val !== void 0 && val !== null ? val : "";
      if (autoescape && !(val instanceof SafeString)) {
        val = lib.escape(val.toString());
      }
      return val;
    }
    function ensureDefined(val, lineno, colno) {
      if (val === null || val === void 0) {
        throw new lib.TemplateError("attempted to output null or undefined value", lineno + 1, colno + 1);
      }
      return val;
    }
    function memberLookup(obj, val) {
      if (obj === void 0 || obj === null) {
        return void 0;
      }
      if (typeof obj[val] === "function") {
        return function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return obj[val].apply(obj, args);
        };
      }
      return obj[val];
    }
    function callWrap(obj, name, context, args) {
      if (!obj) {
        throw new Error("Unable to call `" + name + "`, which is undefined or falsey");
      } else if (typeof obj !== "function") {
        throw new Error("Unable to call `" + name + "`, which is not a function");
      }
      return obj.apply(context, args);
    }
    function contextOrFrameLookup(context, frame, name) {
      var val = frame.lookup(name);
      return val !== void 0 ? val : context.lookup(name);
    }
    function handleError(error, lineno, colno) {
      if (error.lineno) {
        return error;
      } else {
        return new lib.TemplateError(error, lineno, colno);
      }
    }
    function asyncEach(arr, dimen, iter, cb) {
      if (lib.isArray(arr)) {
        var len = arr.length;
        lib.asyncIter(arr, function iterCallback(item, i, next) {
          switch (dimen) {
            case 1:
              iter(item, i, len, next);
              break;
            case 2:
              iter(item[0], item[1], i, len, next);
              break;
            case 3:
              iter(item[0], item[1], item[2], i, len, next);
              break;
            default:
              item.push(i, len, next);
              iter.apply(this, item);
          }
        }, cb);
      } else {
        lib.asyncFor(arr, function iterCallback(key, val, i, len2, next) {
          iter(key, val, i, len2, next);
        }, cb);
      }
    }
    function asyncAll(arr, dimen, func, cb) {
      var finished = 0;
      var len;
      var outputArr;
      function done(i2, output) {
        finished++;
        outputArr[i2] = output;
        if (finished === len) {
          cb(null, outputArr.join(""));
        }
      }
      if (lib.isArray(arr)) {
        len = arr.length;
        outputArr = new Array(len);
        if (len === 0) {
          cb(null, "");
        } else {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            switch (dimen) {
              case 1:
                func(item, i, len, done);
                break;
              case 2:
                func(item[0], item[1], i, len, done);
                break;
              case 3:
                func(item[0], item[1], item[2], i, len, done);
                break;
              default:
                item.push(i, len, done);
                func.apply(this, item);
            }
          }
        }
      } else {
        var keys = lib.keys(arr || {});
        len = keys.length;
        outputArr = new Array(len);
        if (len === 0) {
          cb(null, "");
        } else {
          for (var _i = 0; _i < keys.length; _i++) {
            var k = keys[_i];
            func(k, arr[k], _i, len, done);
          }
        }
      }
    }
    function fromIterator(arr) {
      if (typeof arr !== "object" || arr === null || lib.isArray(arr)) {
        return arr;
      } else if (supportsIterators && Symbol.iterator in arr) {
        return arrayFrom(arr);
      } else {
        return arr;
      }
    }
    module2.exports = {
      Frame,
      makeMacro,
      makeKeywordArgs,
      numArgs,
      suppressValue,
      ensureDefined,
      memberLookup,
      contextOrFrameLookup,
      callWrap,
      handleError,
      isArray: lib.isArray,
      keys: lib.keys,
      SafeString,
      copySafeness,
      markSafe,
      asyncEach,
      asyncAll,
      inOperator: lib.inOperator,
      fromIterator
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/compiler.js
var require_compiler = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/compiler.js"(exports2, module2) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var parser = require_parser();
    var transformer = require_transformer();
    var nodes = require_nodes();
    var _require = require_lib();
    var TemplateError = _require.TemplateError;
    var _require2 = require_runtime();
    var Frame = _require2.Frame;
    var _require3 = require_object();
    var Obj = _require3.Obj;
    var compareOps = {
      "==": "==",
      "===": "===",
      "!=": "!=",
      "!==": "!==",
      "<": "<",
      ">": ">",
      "<=": "<=",
      ">=": ">="
    };
    var Compiler = /* @__PURE__ */ function(_Obj) {
      _inheritsLoose(Compiler2, _Obj);
      function Compiler2() {
        return _Obj.apply(this, arguments) || this;
      }
      var _proto = Compiler2.prototype;
      _proto.init = function init(templateName, throwOnUndefined) {
        this.templateName = templateName;
        this.codebuf = [];
        this.lastId = 0;
        this.buffer = null;
        this.bufferStack = [];
        this._scopeClosers = "";
        this.inBlock = false;
        this.throwOnUndefined = throwOnUndefined;
      };
      _proto.fail = function fail(msg, lineno, colno) {
        if (lineno !== void 0) {
          lineno += 1;
        }
        if (colno !== void 0) {
          colno += 1;
        }
        throw new TemplateError(msg, lineno, colno);
      };
      _proto._pushBuffer = function _pushBuffer() {
        var id = this._tmpid();
        this.bufferStack.push(this.buffer);
        this.buffer = id;
        this._emit("var " + this.buffer + ' = "";');
        return id;
      };
      _proto._popBuffer = function _popBuffer() {
        this.buffer = this.bufferStack.pop();
      };
      _proto._emit = function _emit(code) {
        this.codebuf.push(code);
      };
      _proto._emitLine = function _emitLine(code) {
        this._emit(code + "\n");
      };
      _proto._emitLines = function _emitLines() {
        var _this = this;
        for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
          lines[_key] = arguments[_key];
        }
        lines.forEach(function(line) {
          return _this._emitLine(line);
        });
      };
      _proto._emitFuncBegin = function _emitFuncBegin(node, name) {
        this.buffer = "output";
        this._scopeClosers = "";
        this._emitLine("function " + name + "(env, context, frame, runtime, cb) {");
        this._emitLine("var lineno = " + node.lineno + ";");
        this._emitLine("var colno = " + node.colno + ";");
        this._emitLine("var " + this.buffer + ' = "";');
        this._emitLine("try {");
      };
      _proto._emitFuncEnd = function _emitFuncEnd(noReturn) {
        if (!noReturn) {
          this._emitLine("cb(null, " + this.buffer + ");");
        }
        this._closeScopeLevels();
        this._emitLine("} catch (e) {");
        this._emitLine("  cb(runtime.handleError(e, lineno, colno));");
        this._emitLine("}");
        this._emitLine("}");
        this.buffer = null;
      };
      _proto._addScopeLevel = function _addScopeLevel() {
        this._scopeClosers += "})";
      };
      _proto._closeScopeLevels = function _closeScopeLevels() {
        this._emitLine(this._scopeClosers + ";");
        this._scopeClosers = "";
      };
      _proto._withScopedSyntax = function _withScopedSyntax(func) {
        var _scopeClosers = this._scopeClosers;
        this._scopeClosers = "";
        func.call(this);
        this._closeScopeLevels();
        this._scopeClosers = _scopeClosers;
      };
      _proto._makeCallback = function _makeCallback(res) {
        var err = this._tmpid();
        return "function(" + err + (res ? "," + res : "") + ") {\nif(" + err + ") { cb(" + err + "); return; }";
      };
      _proto._tmpid = function _tmpid() {
        this.lastId++;
        return "t_" + this.lastId;
      };
      _proto._templateName = function _templateName() {
        return this.templateName == null ? "undefined" : JSON.stringify(this.templateName);
      };
      _proto._compileChildren = function _compileChildren(node, frame) {
        var _this2 = this;
        node.children.forEach(function(child) {
          _this2.compile(child, frame);
        });
      };
      _proto._compileAggregate = function _compileAggregate(node, frame, startChar, endChar) {
        var _this3 = this;
        if (startChar) {
          this._emit(startChar);
        }
        node.children.forEach(function(child, i) {
          if (i > 0) {
            _this3._emit(",");
          }
          _this3.compile(child, frame);
        });
        if (endChar) {
          this._emit(endChar);
        }
      };
      _proto._compileExpression = function _compileExpression(node, frame) {
        this.assertType(node, nodes.Literal, nodes.Symbol, nodes.Group, nodes.Array, nodes.Dict, nodes.FunCall, nodes.Caller, nodes.Filter, nodes.LookupVal, nodes.Compare, nodes.InlineIf, nodes.In, nodes.Is, nodes.And, nodes.Or, nodes.Not, nodes.Add, nodes.Concat, nodes.Sub, nodes.Mul, nodes.Div, nodes.FloorDiv, nodes.Mod, nodes.Pow, nodes.Neg, nodes.Pos, nodes.Compare, nodes.NodeList);
        this.compile(node, frame);
      };
      _proto.assertType = function assertType(node) {
        for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          types[_key2 - 1] = arguments[_key2];
        }
        if (!types.some(function(t) {
          return node instanceof t;
        })) {
          this.fail("assertType: invalid type: " + node.typename, node.lineno, node.colno);
        }
      };
      _proto.compileCallExtension = function compileCallExtension(node, frame, async) {
        var _this4 = this;
        var args = node.args;
        var contentArgs = node.contentArgs;
        var autoescape = typeof node.autoescape === "boolean" ? node.autoescape : true;
        if (!async) {
          this._emit(this.buffer + " += runtime.suppressValue(");
        }
        this._emit('env.getExtension("' + node.extName + '")["' + node.prop + '"](');
        this._emit("context");
        if (args || contentArgs) {
          this._emit(",");
        }
        if (args) {
          if (!(args instanceof nodes.NodeList)) {
            this.fail("compileCallExtension: arguments must be a NodeList, use `parser.parseSignature`");
          }
          args.children.forEach(function(arg, i) {
            _this4._compileExpression(arg, frame);
            if (i !== args.children.length - 1 || contentArgs.length) {
              _this4._emit(",");
            }
          });
        }
        if (contentArgs.length) {
          contentArgs.forEach(function(arg, i) {
            if (i > 0) {
              _this4._emit(",");
            }
            if (arg) {
              _this4._emitLine("function(cb) {");
              _this4._emitLine("if(!cb) { cb = function(err) { if(err) { throw err; }}}");
              var id = _this4._pushBuffer();
              _this4._withScopedSyntax(function() {
                _this4.compile(arg, frame);
                _this4._emitLine("cb(null, " + id + ");");
              });
              _this4._popBuffer();
              _this4._emitLine("return " + id + ";");
              _this4._emitLine("}");
            } else {
              _this4._emit("null");
            }
          });
        }
        if (async) {
          var res = this._tmpid();
          this._emitLine(", " + this._makeCallback(res));
          this._emitLine(this.buffer + " += runtime.suppressValue(" + res + ", " + autoescape + " && env.opts.autoescape);");
          this._addScopeLevel();
        } else {
          this._emit(")");
          this._emit(", " + autoescape + " && env.opts.autoescape);\n");
        }
      };
      _proto.compileCallExtensionAsync = function compileCallExtensionAsync(node, frame) {
        this.compileCallExtension(node, frame, true);
      };
      _proto.compileNodeList = function compileNodeList(node, frame) {
        this._compileChildren(node, frame);
      };
      _proto.compileLiteral = function compileLiteral(node) {
        if (typeof node.value === "string") {
          var val = node.value.replace(/\\/g, "\\\\");
          val = val.replace(/"/g, '\\"');
          val = val.replace(/\n/g, "\\n");
          val = val.replace(/\r/g, "\\r");
          val = val.replace(/\t/g, "\\t");
          val = val.replace(/\u2028/g, "\\u2028");
          this._emit('"' + val + '"');
        } else if (node.value === null) {
          this._emit("null");
        } else {
          this._emit(node.value.toString());
        }
      };
      _proto.compileSymbol = function compileSymbol(node, frame) {
        var name = node.value;
        var v = frame.lookup(name);
        if (v) {
          this._emit(v);
        } else {
          this._emit('runtime.contextOrFrameLookup(context, frame, "' + name + '")');
        }
      };
      _proto.compileGroup = function compileGroup(node, frame) {
        this._compileAggregate(node, frame, "(", ")");
      };
      _proto.compileArray = function compileArray(node, frame) {
        this._compileAggregate(node, frame, "[", "]");
      };
      _proto.compileDict = function compileDict(node, frame) {
        this._compileAggregate(node, frame, "{", "}");
      };
      _proto.compilePair = function compilePair(node, frame) {
        var key = node.key;
        var val = node.value;
        if (key instanceof nodes.Symbol) {
          key = new nodes.Literal(key.lineno, key.colno, key.value);
        } else if (!(key instanceof nodes.Literal && typeof key.value === "string")) {
          this.fail("compilePair: Dict keys must be strings or names", key.lineno, key.colno);
        }
        this.compile(key, frame);
        this._emit(": ");
        this._compileExpression(val, frame);
      };
      _proto.compileInlineIf = function compileInlineIf(node, frame) {
        this._emit("(");
        this.compile(node.cond, frame);
        this._emit("?");
        this.compile(node.body, frame);
        this._emit(":");
        if (node.else_ !== null) {
          this.compile(node.else_, frame);
        } else {
          this._emit('""');
        }
        this._emit(")");
      };
      _proto.compileIn = function compileIn(node, frame) {
        this._emit("runtime.inOperator(");
        this.compile(node.left, frame);
        this._emit(",");
        this.compile(node.right, frame);
        this._emit(")");
      };
      _proto.compileIs = function compileIs(node, frame) {
        var right = node.right.name ? node.right.name.value : node.right.value;
        this._emit('env.getTest("' + right + '").call(context, ');
        this.compile(node.left, frame);
        if (node.right.args) {
          this._emit(",");
          this.compile(node.right.args, frame);
        }
        this._emit(") === true");
      };
      _proto._binOpEmitter = function _binOpEmitter(node, frame, str) {
        this.compile(node.left, frame);
        this._emit(str);
        this.compile(node.right, frame);
      };
      _proto.compileOr = function compileOr(node, frame) {
        return this._binOpEmitter(node, frame, " || ");
      };
      _proto.compileAnd = function compileAnd(node, frame) {
        return this._binOpEmitter(node, frame, " && ");
      };
      _proto.compileAdd = function compileAdd(node, frame) {
        return this._binOpEmitter(node, frame, " + ");
      };
      _proto.compileConcat = function compileConcat(node, frame) {
        return this._binOpEmitter(node, frame, ' + "" + ');
      };
      _proto.compileSub = function compileSub(node, frame) {
        return this._binOpEmitter(node, frame, " - ");
      };
      _proto.compileMul = function compileMul(node, frame) {
        return this._binOpEmitter(node, frame, " * ");
      };
      _proto.compileDiv = function compileDiv(node, frame) {
        return this._binOpEmitter(node, frame, " / ");
      };
      _proto.compileMod = function compileMod(node, frame) {
        return this._binOpEmitter(node, frame, " % ");
      };
      _proto.compileNot = function compileNot(node, frame) {
        this._emit("!");
        this.compile(node.target, frame);
      };
      _proto.compileFloorDiv = function compileFloorDiv(node, frame) {
        this._emit("Math.floor(");
        this.compile(node.left, frame);
        this._emit(" / ");
        this.compile(node.right, frame);
        this._emit(")");
      };
      _proto.compilePow = function compilePow(node, frame) {
        this._emit("Math.pow(");
        this.compile(node.left, frame);
        this._emit(", ");
        this.compile(node.right, frame);
        this._emit(")");
      };
      _proto.compileNeg = function compileNeg(node, frame) {
        this._emit("-");
        this.compile(node.target, frame);
      };
      _proto.compilePos = function compilePos(node, frame) {
        this._emit("+");
        this.compile(node.target, frame);
      };
      _proto.compileCompare = function compileCompare(node, frame) {
        var _this5 = this;
        this.compile(node.expr, frame);
        node.ops.forEach(function(op) {
          _this5._emit(" " + compareOps[op.type] + " ");
          _this5.compile(op.expr, frame);
        });
      };
      _proto.compileLookupVal = function compileLookupVal(node, frame) {
        this._emit("runtime.memberLookup((");
        this._compileExpression(node.target, frame);
        this._emit("),");
        this._compileExpression(node.val, frame);
        this._emit(")");
      };
      _proto._getNodeName = function _getNodeName(node) {
        switch (node.typename) {
          case "Symbol":
            return node.value;
          case "FunCall":
            return "the return value of (" + this._getNodeName(node.name) + ")";
          case "LookupVal":
            return this._getNodeName(node.target) + '["' + this._getNodeName(node.val) + '"]';
          case "Literal":
            return node.value.toString();
          default:
            return "--expression--";
        }
      };
      _proto.compileFunCall = function compileFunCall(node, frame) {
        this._emit("(lineno = " + node.lineno + ", colno = " + node.colno + ", ");
        this._emit("runtime.callWrap(");
        this._compileExpression(node.name, frame);
        this._emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", context, ');
        this._compileAggregate(node.args, frame, "[", "])");
        this._emit(")");
      };
      _proto.compileFilter = function compileFilter(node, frame) {
        var name = node.name;
        this.assertType(name, nodes.Symbol);
        this._emit('env.getFilter("' + name.value + '").call(context, ');
        this._compileAggregate(node.args, frame);
        this._emit(")");
      };
      _proto.compileFilterAsync = function compileFilterAsync(node, frame) {
        var name = node.name;
        var symbol = node.symbol.value;
        this.assertType(name, nodes.Symbol);
        frame.set(symbol, symbol);
        this._emit('env.getFilter("' + name.value + '").call(context, ');
        this._compileAggregate(node.args, frame);
        this._emitLine(", " + this._makeCallback(symbol));
        this._addScopeLevel();
      };
      _proto.compileKeywordArgs = function compileKeywordArgs(node, frame) {
        this._emit("runtime.makeKeywordArgs(");
        this.compileDict(node, frame);
        this._emit(")");
      };
      _proto.compileSet = function compileSet(node, frame) {
        var _this6 = this;
        var ids = [];
        node.targets.forEach(function(target) {
          var name = target.value;
          var id = frame.lookup(name);
          if (id === null || id === void 0) {
            id = _this6._tmpid();
            _this6._emitLine("var " + id + ";");
          }
          ids.push(id);
        });
        if (node.value) {
          this._emit(ids.join(" = ") + " = ");
          this._compileExpression(node.value, frame);
          this._emitLine(";");
        } else {
          this._emit(ids.join(" = ") + " = ");
          this.compile(node.body, frame);
          this._emitLine(";");
        }
        node.targets.forEach(function(target, i) {
          var id = ids[i];
          var name = target.value;
          _this6._emitLine('frame.set("' + name + '", ' + id + ", true);");
          _this6._emitLine("if(frame.topLevel) {");
          _this6._emitLine('context.setVariable("' + name + '", ' + id + ");");
          _this6._emitLine("}");
          if (name.charAt(0) !== "_") {
            _this6._emitLine("if(frame.topLevel) {");
            _this6._emitLine('context.addExport("' + name + '", ' + id + ");");
            _this6._emitLine("}");
          }
        });
      };
      _proto.compileSwitch = function compileSwitch(node, frame) {
        var _this7 = this;
        this._emit("switch (");
        this.compile(node.expr, frame);
        this._emit(") {");
        node.cases.forEach(function(c, i) {
          _this7._emit("case ");
          _this7.compile(c.cond, frame);
          _this7._emit(": ");
          _this7.compile(c.body, frame);
          if (c.body.children.length) {
            _this7._emitLine("break;");
          }
        });
        if (node.default) {
          this._emit("default:");
          this.compile(node.default, frame);
        }
        this._emit("}");
      };
      _proto.compileIf = function compileIf(node, frame, async) {
        var _this8 = this;
        this._emit("if(");
        this._compileExpression(node.cond, frame);
        this._emitLine(") {");
        this._withScopedSyntax(function() {
          _this8.compile(node.body, frame);
          if (async) {
            _this8._emit("cb()");
          }
        });
        if (node.else_) {
          this._emitLine("}\nelse {");
          this._withScopedSyntax(function() {
            _this8.compile(node.else_, frame);
            if (async) {
              _this8._emit("cb()");
            }
          });
        } else if (async) {
          this._emitLine("}\nelse {");
          this._emit("cb()");
        }
        this._emitLine("}");
      };
      _proto.compileIfAsync = function compileIfAsync(node, frame) {
        this._emit("(function(cb) {");
        this.compileIf(node, frame, true);
        this._emit("})(" + this._makeCallback());
        this._addScopeLevel();
      };
      _proto._emitLoopBindings = function _emitLoopBindings(node, arr, i, len) {
        var _this9 = this;
        var bindings = [{
          name: "index",
          val: i + " + 1"
        }, {
          name: "index0",
          val: i
        }, {
          name: "revindex",
          val: len + " - " + i
        }, {
          name: "revindex0",
          val: len + " - " + i + " - 1"
        }, {
          name: "first",
          val: i + " === 0"
        }, {
          name: "last",
          val: i + " === " + len + " - 1"
        }, {
          name: "length",
          val: len
        }];
        bindings.forEach(function(b) {
          _this9._emitLine('frame.set("loop.' + b.name + '", ' + b.val + ");");
        });
      };
      _proto.compileFor = function compileFor(node, frame) {
        var _this10 = this;
        var i = this._tmpid();
        var len = this._tmpid();
        var arr = this._tmpid();
        frame = frame.push();
        this._emitLine("frame = frame.push();");
        this._emit("var " + arr + " = ");
        this._compileExpression(node.arr, frame);
        this._emitLine(";");
        this._emit("if(" + arr + ") {");
        this._emitLine(arr + " = runtime.fromIterator(" + arr + ");");
        if (node.name instanceof nodes.Array) {
          this._emitLine("var " + i + ";");
          this._emitLine("if(runtime.isArray(" + arr + ")) {");
          this._emitLine("var " + len + " = " + arr + ".length;");
          this._emitLine("for(" + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
          node.name.children.forEach(function(child, u) {
            var tid = _this10._tmpid();
            _this10._emitLine("var " + tid + " = " + arr + "[" + i + "][" + u + "];");
            _this10._emitLine('frame.set("' + child + '", ' + arr + "[" + i + "][" + u + "]);");
            frame.set(node.name.children[u].value, tid);
          });
          this._emitLoopBindings(node, arr, i, len);
          this._withScopedSyntax(function() {
            _this10.compile(node.body, frame);
          });
          this._emitLine("}");
          this._emitLine("} else {");
          var _node$name$children = node.name.children, key = _node$name$children[0], val = _node$name$children[1];
          var k = this._tmpid();
          var v = this._tmpid();
          frame.set(key.value, k);
          frame.set(val.value, v);
          this._emitLine(i + " = -1;");
          this._emitLine("var " + len + " = runtime.keys(" + arr + ").length;");
          this._emitLine("for(var " + k + " in " + arr + ") {");
          this._emitLine(i + "++;");
          this._emitLine("var " + v + " = " + arr + "[" + k + "];");
          this._emitLine('frame.set("' + key.value + '", ' + k + ");");
          this._emitLine('frame.set("' + val.value + '", ' + v + ");");
          this._emitLoopBindings(node, arr, i, len);
          this._withScopedSyntax(function() {
            _this10.compile(node.body, frame);
          });
          this._emitLine("}");
          this._emitLine("}");
        } else {
          var _v = this._tmpid();
          frame.set(node.name.value, _v);
          this._emitLine("var " + len + " = " + arr + ".length;");
          this._emitLine("for(var " + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
          this._emitLine("var " + _v + " = " + arr + "[" + i + "];");
          this._emitLine('frame.set("' + node.name.value + '", ' + _v + ");");
          this._emitLoopBindings(node, arr, i, len);
          this._withScopedSyntax(function() {
            _this10.compile(node.body, frame);
          });
          this._emitLine("}");
        }
        this._emitLine("}");
        if (node.else_) {
          this._emitLine("if (!" + len + ") {");
          this.compile(node.else_, frame);
          this._emitLine("}");
        }
        this._emitLine("frame = frame.pop();");
      };
      _proto._compileAsyncLoop = function _compileAsyncLoop(node, frame, parallel) {
        var _this11 = this;
        var i = this._tmpid();
        var len = this._tmpid();
        var arr = this._tmpid();
        var asyncMethod = parallel ? "asyncAll" : "asyncEach";
        frame = frame.push();
        this._emitLine("frame = frame.push();");
        this._emit("var " + arr + " = runtime.fromIterator(");
        this._compileExpression(node.arr, frame);
        this._emitLine(");");
        if (node.name instanceof nodes.Array) {
          var arrayLen = node.name.children.length;
          this._emit("runtime." + asyncMethod + "(" + arr + ", " + arrayLen + ", function(");
          node.name.children.forEach(function(name) {
            _this11._emit(name.value + ",");
          });
          this._emit(i + "," + len + ",next) {");
          node.name.children.forEach(function(name) {
            var id2 = name.value;
            frame.set(id2, id2);
            _this11._emitLine('frame.set("' + id2 + '", ' + id2 + ");");
          });
        } else {
          var id = node.name.value;
          this._emitLine("runtime." + asyncMethod + "(" + arr + ", 1, function(" + id + ", " + i + ", " + len + ",next) {");
          this._emitLine('frame.set("' + id + '", ' + id + ");");
          frame.set(id, id);
        }
        this._emitLoopBindings(node, arr, i, len);
        this._withScopedSyntax(function() {
          var buf;
          if (parallel) {
            buf = _this11._pushBuffer();
          }
          _this11.compile(node.body, frame);
          _this11._emitLine("next(" + i + (buf ? "," + buf : "") + ");");
          if (parallel) {
            _this11._popBuffer();
          }
        });
        var output = this._tmpid();
        this._emitLine("}, " + this._makeCallback(output));
        this._addScopeLevel();
        if (parallel) {
          this._emitLine(this.buffer + " += " + output + ";");
        }
        if (node.else_) {
          this._emitLine("if (!" + arr + ".length) {");
          this.compile(node.else_, frame);
          this._emitLine("}");
        }
        this._emitLine("frame = frame.pop();");
      };
      _proto.compileAsyncEach = function compileAsyncEach(node, frame) {
        this._compileAsyncLoop(node, frame);
      };
      _proto.compileAsyncAll = function compileAsyncAll(node, frame) {
        this._compileAsyncLoop(node, frame, true);
      };
      _proto._compileMacro = function _compileMacro(node, frame) {
        var _this12 = this;
        var args = [];
        var kwargs = null;
        var funcId = "macro_" + this._tmpid();
        var keepFrame = frame !== void 0;
        node.args.children.forEach(function(arg, i) {
          if (i === node.args.children.length - 1 && arg instanceof nodes.Dict) {
            kwargs = arg;
          } else {
            _this12.assertType(arg, nodes.Symbol);
            args.push(arg);
          }
        });
        var realNames = [].concat(args.map(function(n) {
          return "l_" + n.value;
        }), ["kwargs"]);
        var argNames = args.map(function(n) {
          return '"' + n.value + '"';
        });
        var kwargNames = (kwargs && kwargs.children || []).map(function(n) {
          return '"' + n.key.value + '"';
        });
        var currFrame;
        if (keepFrame) {
          currFrame = frame.push(true);
        } else {
          currFrame = new Frame();
        }
        this._emitLines("var " + funcId + " = runtime.makeMacro(", "[" + argNames.join(", ") + "], ", "[" + kwargNames.join(", ") + "], ", "function (" + realNames.join(", ") + ") {", "var callerFrame = frame;", "frame = " + (keepFrame ? "frame.push(true);" : "new runtime.Frame();"), "kwargs = kwargs || {};", 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }');
        args.forEach(function(arg) {
          _this12._emitLine('frame.set("' + arg.value + '", l_' + arg.value + ");");
          currFrame.set(arg.value, "l_" + arg.value);
        });
        if (kwargs) {
          kwargs.children.forEach(function(pair) {
            var name = pair.key.value;
            _this12._emit('frame.set("' + name + '", ');
            _this12._emit('Object.prototype.hasOwnProperty.call(kwargs, "' + name + '")');
            _this12._emit(' ? kwargs["' + name + '"] : ');
            _this12._compileExpression(pair.value, currFrame);
            _this12._emit(");");
          });
        }
        var bufferId = this._pushBuffer();
        this._withScopedSyntax(function() {
          _this12.compile(node.body, currFrame);
        });
        this._emitLine("frame = " + (keepFrame ? "frame.pop();" : "callerFrame;"));
        this._emitLine("return new runtime.SafeString(" + bufferId + ");");
        this._emitLine("});");
        this._popBuffer();
        return funcId;
      };
      _proto.compileMacro = function compileMacro(node, frame) {
        var funcId = this._compileMacro(node);
        var name = node.name.value;
        frame.set(name, funcId);
        if (frame.parent) {
          this._emitLine('frame.set("' + name + '", ' + funcId + ");");
        } else {
          if (node.name.value.charAt(0) !== "_") {
            this._emitLine('context.addExport("' + name + '");');
          }
          this._emitLine('context.setVariable("' + name + '", ' + funcId + ");");
        }
      };
      _proto.compileCaller = function compileCaller(node, frame) {
        this._emit("(function (){");
        var funcId = this._compileMacro(node, frame);
        this._emit("return " + funcId + ";})()");
      };
      _proto._compileGetTemplate = function _compileGetTemplate(node, frame, eagerCompile, ignoreMissing) {
        var parentTemplateId = this._tmpid();
        var parentName = this._templateName();
        var cb = this._makeCallback(parentTemplateId);
        var eagerCompileArg = eagerCompile ? "true" : "false";
        var ignoreMissingArg = ignoreMissing ? "true" : "false";
        this._emit("env.getTemplate(");
        this._compileExpression(node.template, frame);
        this._emitLine(", " + eagerCompileArg + ", " + parentName + ", " + ignoreMissingArg + ", " + cb);
        return parentTemplateId;
      };
      _proto.compileImport = function compileImport(node, frame) {
        var target = node.target.value;
        var id = this._compileGetTemplate(node, frame, false, false);
        this._addScopeLevel();
        this._emitLine(id + ".getExported(" + (node.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(id));
        this._addScopeLevel();
        frame.set(target, id);
        if (frame.parent) {
          this._emitLine('frame.set("' + target + '", ' + id + ");");
        } else {
          this._emitLine('context.setVariable("' + target + '", ' + id + ");");
        }
      };
      _proto.compileFromImport = function compileFromImport(node, frame) {
        var _this13 = this;
        var importedId = this._compileGetTemplate(node, frame, false, false);
        this._addScopeLevel();
        this._emitLine(importedId + ".getExported(" + (node.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(importedId));
        this._addScopeLevel();
        node.names.children.forEach(function(nameNode) {
          var name;
          var alias;
          var id = _this13._tmpid();
          if (nameNode instanceof nodes.Pair) {
            name = nameNode.key.value;
            alias = nameNode.value.value;
          } else {
            name = nameNode.value;
            alias = name;
          }
          _this13._emitLine("if(Object.prototype.hasOwnProperty.call(" + importedId + ', "' + name + '")) {');
          _this13._emitLine("var " + id + " = " + importedId + "." + name + ";");
          _this13._emitLine("} else {");
          _this13._emitLine(`cb(new Error("cannot import '` + name + `'")); return;`);
          _this13._emitLine("}");
          frame.set(alias, id);
          if (frame.parent) {
            _this13._emitLine('frame.set("' + alias + '", ' + id + ");");
          } else {
            _this13._emitLine('context.setVariable("' + alias + '", ' + id + ");");
          }
        });
      };
      _proto.compileBlock = function compileBlock(node) {
        var id = this._tmpid();
        if (!this.inBlock) {
          this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : ');
        }
        this._emit('context.getBlock("' + node.name.value + '")');
        if (!this.inBlock) {
          this._emit(")");
        }
        this._emitLine("(env, context, frame, runtime, " + this._makeCallback(id));
        this._emitLine(this.buffer + " += " + id + ";");
        this._addScopeLevel();
      };
      _proto.compileSuper = function compileSuper(node, frame) {
        var name = node.blockName.value;
        var id = node.symbol.value;
        var cb = this._makeCallback(id);
        this._emitLine('context.getSuper(env, "' + name + '", b_' + name + ", frame, runtime, " + cb);
        this._emitLine(id + " = runtime.markSafe(" + id + ");");
        this._addScopeLevel();
        frame.set(id, id);
      };
      _proto.compileExtends = function compileExtends(node, frame) {
        var k = this._tmpid();
        var parentTemplateId = this._compileGetTemplate(node, frame, true, false);
        this._emitLine("parentTemplate = " + parentTemplateId);
        this._emitLine("for(var " + k + " in parentTemplate.blocks) {");
        this._emitLine("context.addBlock(" + k + ", parentTemplate.blocks[" + k + "]);");
        this._emitLine("}");
        this._addScopeLevel();
      };
      _proto.compileInclude = function compileInclude(node, frame) {
        this._emitLine("var tasks = [];");
        this._emitLine("tasks.push(");
        this._emitLine("function(callback) {");
        var id = this._compileGetTemplate(node, frame, false, node.ignoreMissing);
        this._emitLine("callback(null," + id + ");});");
        this._emitLine("});");
        var id2 = this._tmpid();
        this._emitLine("tasks.push(");
        this._emitLine("function(template, callback){");
        this._emitLine("template.render(context.getVariables(), frame, " + this._makeCallback(id2));
        this._emitLine("callback(null," + id2 + ");});");
        this._emitLine("});");
        this._emitLine("tasks.push(");
        this._emitLine("function(result, callback){");
        this._emitLine(this.buffer + " += result;");
        this._emitLine("callback(null);");
        this._emitLine("});");
        this._emitLine("env.waterfall(tasks, function(){");
        this._addScopeLevel();
      };
      _proto.compileTemplateData = function compileTemplateData(node, frame) {
        this.compileLiteral(node, frame);
      };
      _proto.compileCapture = function compileCapture(node, frame) {
        var _this14 = this;
        var buffer = this.buffer;
        this.buffer = "output";
        this._emitLine("(function() {");
        this._emitLine('var output = "";');
        this._withScopedSyntax(function() {
          _this14.compile(node.body, frame);
        });
        this._emitLine("return output;");
        this._emitLine("})()");
        this.buffer = buffer;
      };
      _proto.compileOutput = function compileOutput(node, frame) {
        var _this15 = this;
        var children = node.children;
        children.forEach(function(child) {
          if (child instanceof nodes.TemplateData) {
            if (child.value) {
              _this15._emit(_this15.buffer + " += ");
              _this15.compileLiteral(child, frame);
              _this15._emitLine(";");
            }
          } else {
            _this15._emit(_this15.buffer + " += runtime.suppressValue(");
            if (_this15.throwOnUndefined) {
              _this15._emit("runtime.ensureDefined(");
            }
            _this15.compile(child, frame);
            if (_this15.throwOnUndefined) {
              _this15._emit("," + node.lineno + "," + node.colno + ")");
            }
            _this15._emit(", env.opts.autoescape);\n");
          }
        });
      };
      _proto.compileRoot = function compileRoot(node, frame) {
        var _this16 = this;
        if (frame) {
          this.fail("compileRoot: root node can't have frame");
        }
        frame = new Frame();
        this._emitFuncBegin(node, "root");
        this._emitLine("var parentTemplate = null;");
        this._compileChildren(node, frame);
        this._emitLine("if(parentTemplate) {");
        this._emitLine("parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);");
        this._emitLine("} else {");
        this._emitLine("cb(null, " + this.buffer + ");");
        this._emitLine("}");
        this._emitFuncEnd(true);
        this.inBlock = true;
        var blockNames = [];
        var blocks = node.findAll(nodes.Block);
        blocks.forEach(function(block, i) {
          var name = block.name.value;
          if (blockNames.indexOf(name) !== -1) {
            throw new Error('Block "' + name + '" defined more than once.');
          }
          blockNames.push(name);
          _this16._emitFuncBegin(block, "b_" + name);
          var tmpFrame = new Frame();
          _this16._emitLine("var frame = frame.push(true);");
          _this16.compile(block.body, tmpFrame);
          _this16._emitFuncEnd();
        });
        this._emitLine("return {");
        blocks.forEach(function(block, i) {
          var blockName = "b_" + block.name.value;
          _this16._emitLine(blockName + ": " + blockName + ",");
        });
        this._emitLine("root: root\n};");
      };
      _proto.compile = function compile(node, frame) {
        var _compile = this["compile" + node.typename];
        if (_compile) {
          _compile.call(this, node, frame);
        } else {
          this.fail("compile: Cannot compile node: " + node.typename, node.lineno, node.colno);
        }
      };
      _proto.getCode = function getCode() {
        return this.codebuf.join("");
      };
      return Compiler2;
    }(Obj);
    module2.exports = {
      compile: function compile(src, asyncFilters, extensions, name, opts) {
        if (opts === void 0) {
          opts = {};
        }
        var c = new Compiler(name, opts.throwOnUndefined);
        var preprocessors = (extensions || []).map(function(ext) {
          return ext.preprocess;
        }).filter(function(f) {
          return !!f;
        });
        var processedSrc = preprocessors.reduce(function(s, processor) {
          return processor(s);
        }, src);
        c.compile(transformer.transform(parser.parse(processedSrc, extensions, opts), asyncFilters, name));
        return c.getCode();
      },
      Compiler
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/filters.js
var require_filters = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/filters.js"(exports2, module2) {
    "use strict";
    var lib = require_lib();
    var r = require_runtime();
    var _exports = module2.exports = {};
    function normalize(value, defaultValue) {
      if (value === null || value === void 0 || value === false) {
        return defaultValue;
      }
      return value;
    }
    _exports.abs = Math.abs;
    function isNaN2(num) {
      return num !== num;
    }
    function batch(arr, linecount, fillWith) {
      var i;
      var res = [];
      var tmp = [];
      for (i = 0; i < arr.length; i++) {
        if (i % linecount === 0 && tmp.length) {
          res.push(tmp);
          tmp = [];
        }
        tmp.push(arr[i]);
      }
      if (tmp.length) {
        if (fillWith) {
          for (i = tmp.length; i < linecount; i++) {
            tmp.push(fillWith);
          }
        }
        res.push(tmp);
      }
      return res;
    }
    _exports.batch = batch;
    function capitalize(str) {
      str = normalize(str, "");
      var ret = str.toLowerCase();
      return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
    }
    _exports.capitalize = capitalize;
    function center(str, width) {
      str = normalize(str, "");
      width = width || 80;
      if (str.length >= width) {
        return str;
      }
      var spaces = width - str.length;
      var pre = lib.repeat(" ", spaces / 2 - spaces % 2);
      var post = lib.repeat(" ", spaces / 2);
      return r.copySafeness(str, pre + str + post);
    }
    _exports.center = center;
    function default_(val, def, bool) {
      if (bool) {
        return val || def;
      } else {
        return val !== void 0 ? val : def;
      }
    }
    _exports["default"] = default_;
    function dictsort(val, caseSensitive, by) {
      if (!lib.isObject(val)) {
        throw new lib.TemplateError("dictsort filter: val must be an object");
      }
      var array = [];
      for (var k in val) {
        array.push([k, val[k]]);
      }
      var si;
      if (by === void 0 || by === "key") {
        si = 0;
      } else if (by === "value") {
        si = 1;
      } else {
        throw new lib.TemplateError("dictsort filter: You can only sort by either key or value");
      }
      array.sort(function(t1, t2) {
        var a = t1[si];
        var b = t2[si];
        if (!caseSensitive) {
          if (lib.isString(a)) {
            a = a.toUpperCase();
          }
          if (lib.isString(b)) {
            b = b.toUpperCase();
          }
        }
        return a > b ? 1 : a === b ? 0 : -1;
      });
      return array;
    }
    _exports.dictsort = dictsort;
    function dump(obj, spaces) {
      return JSON.stringify(obj, null, spaces);
    }
    _exports.dump = dump;
    function escape(str) {
      if (str instanceof r.SafeString) {
        return str;
      }
      str = str === null || str === void 0 ? "" : str;
      return r.markSafe(lib.escape(str.toString()));
    }
    _exports.escape = escape;
    function safe(str) {
      if (str instanceof r.SafeString) {
        return str;
      }
      str = str === null || str === void 0 ? "" : str;
      return r.markSafe(str.toString());
    }
    _exports.safe = safe;
    function first(arr) {
      return arr[0];
    }
    _exports.first = first;
    function forceescape(str) {
      str = str === null || str === void 0 ? "" : str;
      return r.markSafe(lib.escape(str.toString()));
    }
    _exports.forceescape = forceescape;
    function groupby(arr, attr) {
      return lib.groupBy(arr, attr, this.env.opts.throwOnUndefined);
    }
    _exports.groupby = groupby;
    function indent(str, width, indentfirst) {
      str = normalize(str, "");
      if (str === "") {
        return "";
      }
      width = width || 4;
      var lines = str.split("\n");
      var sp = lib.repeat(" ", width);
      var res = lines.map(function(l, i) {
        return i === 0 && !indentfirst ? l : "" + sp + l;
      }).join("\n");
      return r.copySafeness(str, res);
    }
    _exports.indent = indent;
    function join(arr, del, attr) {
      del = del || "";
      if (attr) {
        arr = lib.map(arr, function(v) {
          return v[attr];
        });
      }
      return arr.join(del);
    }
    _exports.join = join;
    function last(arr) {
      return arr[arr.length - 1];
    }
    _exports.last = last;
    function lengthFilter(val) {
      var value = normalize(val, "");
      if (value !== void 0) {
        if (typeof Map === "function" && value instanceof Map || typeof Set === "function" && value instanceof Set) {
          return value.size;
        }
        if (lib.isObject(value) && !(value instanceof r.SafeString)) {
          return lib.keys(value).length;
        }
        return value.length;
      }
      return 0;
    }
    _exports.length = lengthFilter;
    function list(val) {
      if (lib.isString(val)) {
        return val.split("");
      } else if (lib.isObject(val)) {
        return lib._entries(val || {}).map(function(_ref) {
          var key = _ref[0], value = _ref[1];
          return {
            key,
            value
          };
        });
      } else if (lib.isArray(val)) {
        return val;
      } else {
        throw new lib.TemplateError("list filter: type not iterable");
      }
    }
    _exports.list = list;
    function lower(str) {
      str = normalize(str, "");
      return str.toLowerCase();
    }
    _exports.lower = lower;
    function nl2br(str) {
      if (str === null || str === void 0) {
        return "";
      }
      return r.copySafeness(str, str.replace(/\r\n|\n/g, "<br />\n"));
    }
    _exports.nl2br = nl2br;
    function random(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    _exports.random = random;
    function getSelectOrReject(expectedTestResult) {
      function filter(arr, testName, secondArg) {
        if (testName === void 0) {
          testName = "truthy";
        }
        var context = this;
        var test = context.env.getTest(testName);
        return lib.toArray(arr).filter(function examineTestResult(item) {
          return test.call(context, item, secondArg) === expectedTestResult;
        });
      }
      return filter;
    }
    _exports.reject = getSelectOrReject(false);
    function rejectattr(arr, attr) {
      return arr.filter(function(item) {
        return !item[attr];
      });
    }
    _exports.rejectattr = rejectattr;
    _exports.select = getSelectOrReject(true);
    function selectattr(arr, attr) {
      return arr.filter(function(item) {
        return !!item[attr];
      });
    }
    _exports.selectattr = selectattr;
    function replace(str, old, new_, maxCount) {
      var originalStr = str;
      if (old instanceof RegExp) {
        return str.replace(old, new_);
      }
      if (typeof maxCount === "undefined") {
        maxCount = -1;
      }
      var res = "";
      if (typeof old === "number") {
        old = "" + old;
      } else if (typeof old !== "string") {
        return str;
      }
      if (typeof str === "number") {
        str = "" + str;
      }
      if (typeof str !== "string" && !(str instanceof r.SafeString)) {
        return str;
      }
      if (old === "") {
        res = new_ + str.split("").join(new_) + new_;
        return r.copySafeness(str, res);
      }
      var nextIndex = str.indexOf(old);
      if (maxCount === 0 || nextIndex === -1) {
        return str;
      }
      var pos = 0;
      var count = 0;
      while (nextIndex > -1 && (maxCount === -1 || count < maxCount)) {
        res += str.substring(pos, nextIndex) + new_;
        pos = nextIndex + old.length;
        count++;
        nextIndex = str.indexOf(old, pos);
      }
      if (pos < str.length) {
        res += str.substring(pos);
      }
      return r.copySafeness(originalStr, res);
    }
    _exports.replace = replace;
    function reverse(val) {
      var arr;
      if (lib.isString(val)) {
        arr = list(val);
      } else {
        arr = lib.map(val, function(v) {
          return v;
        });
      }
      arr.reverse();
      if (lib.isString(val)) {
        return r.copySafeness(val, arr.join(""));
      }
      return arr;
    }
    _exports.reverse = reverse;
    function round(val, precision, method) {
      precision = precision || 0;
      var factor = Math.pow(10, precision);
      var rounder;
      if (method === "ceil") {
        rounder = Math.ceil;
      } else if (method === "floor") {
        rounder = Math.floor;
      } else {
        rounder = Math.round;
      }
      return rounder(val * factor) / factor;
    }
    _exports.round = round;
    function slice(arr, slices, fillWith) {
      var sliceLength = Math.floor(arr.length / slices);
      var extra = arr.length % slices;
      var res = [];
      var offset = 0;
      for (var i = 0; i < slices; i++) {
        var start = offset + i * sliceLength;
        if (i < extra) {
          offset++;
        }
        var end = offset + (i + 1) * sliceLength;
        var currSlice = arr.slice(start, end);
        if (fillWith && i >= extra) {
          currSlice.push(fillWith);
        }
        res.push(currSlice);
      }
      return res;
    }
    _exports.slice = slice;
    function sum(arr, attr, start) {
      if (start === void 0) {
        start = 0;
      }
      if (attr) {
        arr = lib.map(arr, function(v) {
          return v[attr];
        });
      }
      return start + arr.reduce(function(a, b) {
        return a + b;
      }, 0);
    }
    _exports.sum = sum;
    _exports.sort = r.makeMacro(["value", "reverse", "case_sensitive", "attribute"], [], function sortFilter(arr, reversed, caseSens, attr) {
      var _this = this;
      var array = lib.map(arr, function(v) {
        return v;
      });
      var getAttribute = lib.getAttrGetter(attr);
      array.sort(function(a, b) {
        var x = attr ? getAttribute(a) : a;
        var y = attr ? getAttribute(b) : b;
        if (_this.env.opts.throwOnUndefined && attr && (x === void 0 || y === void 0)) {
          throw new TypeError('sort: attribute "' + attr + '" resolved to undefined');
        }
        if (!caseSens && lib.isString(x) && lib.isString(y)) {
          x = x.toLowerCase();
          y = y.toLowerCase();
        }
        if (x < y) {
          return reversed ? 1 : -1;
        } else if (x > y) {
          return reversed ? -1 : 1;
        } else {
          return 0;
        }
      });
      return array;
    });
    function string(obj) {
      return r.copySafeness(obj, obj);
    }
    _exports.string = string;
    function striptags(input, preserveLinebreaks) {
      input = normalize(input, "");
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
      var trimmedInput = trim(input.replace(tags, ""));
      var res = "";
      if (preserveLinebreaks) {
        res = trimmedInput.replace(/^ +| +$/gm, "").replace(/ +/g, " ").replace(/(\r\n)/g, "\n").replace(/\n\n\n+/g, "\n\n");
      } else {
        res = trimmedInput.replace(/\s+/gi, " ");
      }
      return r.copySafeness(input, res);
    }
    _exports.striptags = striptags;
    function title(str) {
      str = normalize(str, "");
      var words = str.split(" ").map(function(word) {
        return capitalize(word);
      });
      return r.copySafeness(str, words.join(" "));
    }
    _exports.title = title;
    function trim(str) {
      return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ""));
    }
    _exports.trim = trim;
    function truncate(input, length, killwords, end) {
      var orig = input;
      input = normalize(input, "");
      length = length || 255;
      if (input.length <= length) {
        return input;
      }
      if (killwords) {
        input = input.substring(0, length);
      } else {
        var idx = input.lastIndexOf(" ", length);
        if (idx === -1) {
          idx = length;
        }
        input = input.substring(0, idx);
      }
      input += end !== void 0 && end !== null ? end : "...";
      return r.copySafeness(orig, input);
    }
    _exports.truncate = truncate;
    function upper(str) {
      str = normalize(str, "");
      return str.toUpperCase();
    }
    _exports.upper = upper;
    function urlencode(obj) {
      var enc = encodeURIComponent;
      if (lib.isString(obj)) {
        return enc(obj);
      } else {
        var keyvals = lib.isArray(obj) ? obj : lib._entries(obj);
        return keyvals.map(function(_ref2) {
          var k = _ref2[0], v = _ref2[1];
          return enc(k) + "=" + enc(v);
        }).join("&");
      }
    }
    _exports.urlencode = urlencode;
    var puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
    var emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
    var httpHttpsRe = /^https?:\/\/.*$/;
    var wwwRe = /^www\./;
    var tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;
    function urlize(str, length, nofollow) {
      if (isNaN2(length)) {
        length = Infinity;
      }
      var noFollowAttr = nofollow === true ? ' rel="nofollow"' : "";
      var words = str.split(/(\s+)/).filter(function(word) {
        return word && word.length;
      }).map(function(word) {
        var matches = word.match(puncRe);
        var possibleUrl = matches ? matches[1] : word;
        var shortUrl = possibleUrl.substr(0, length);
        if (httpHttpsRe.test(possibleUrl)) {
          return '<a href="' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
        }
        if (wwwRe.test(possibleUrl)) {
          return '<a href="http://' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
        }
        if (emailRe.test(possibleUrl)) {
          return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + "</a>";
        }
        if (tldRe.test(possibleUrl)) {
          return '<a href="http://' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
        }
        return word;
      });
      return words.join("");
    }
    _exports.urlize = urlize;
    function wordcount(str) {
      str = normalize(str, "");
      var words = str ? str.match(/\w+/g) : null;
      return words ? words.length : null;
    }
    _exports.wordcount = wordcount;
    function float(val, def) {
      var res = parseFloat(val);
      return isNaN2(res) ? def : res;
    }
    _exports.float = float;
    var intFilter = r.makeMacro(["value", "default", "base"], [], function doInt(value, defaultValue, base) {
      if (base === void 0) {
        base = 10;
      }
      var res = parseInt(value, base);
      return isNaN2(res) ? defaultValue : res;
    });
    _exports.int = intFilter;
    _exports.d = _exports.default;
    _exports.e = _exports.escape;
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/loader.js
var require_loader = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/loader.js"(exports2, module2) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var path = require("path");
    var _require = require_object();
    var EmitterObj = _require.EmitterObj;
    module2.exports = /* @__PURE__ */ function(_EmitterObj) {
      _inheritsLoose(Loader, _EmitterObj);
      function Loader() {
        return _EmitterObj.apply(this, arguments) || this;
      }
      var _proto = Loader.prototype;
      _proto.resolve = function resolve(from, to) {
        return path.resolve(path.dirname(from), to);
      };
      _proto.isRelative = function isRelative(filename) {
        return filename.indexOf("./") === 0 || filename.indexOf("../") === 0;
      };
      return Loader;
    }(EmitterObj);
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/precompiled-loader.js
var require_precompiled_loader = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/precompiled-loader.js"(exports2, module2) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Loader = require_loader();
    var PrecompiledLoader = /* @__PURE__ */ function(_Loader) {
      _inheritsLoose(PrecompiledLoader2, _Loader);
      function PrecompiledLoader2(compiledTemplates) {
        var _this;
        _this = _Loader.call(this) || this;
        _this.precompiled = compiledTemplates || {};
        return _this;
      }
      var _proto = PrecompiledLoader2.prototype;
      _proto.getSource = function getSource(name) {
        if (this.precompiled[name]) {
          return {
            src: {
              type: "code",
              obj: this.precompiled[name]
            },
            path: name
          };
        }
        return null;
      };
      return PrecompiledLoader2;
    }(Loader);
    module2.exports = {
      PrecompiledLoader
    };
  }
});

// ../../node_modules/.pnpm/async-each@1.0.6/node_modules/async-each/index.js
var require_async_each = __commonJS({
  "../../node_modules/.pnpm/async-each@1.0.6/node_modules/async-each/index.js"(exports2, module2) {
    (function(globals) {
      "use strict";
      var each = function(items, next, callback) {
        if (!Array.isArray(items)) throw new TypeError("each() expects array as first argument");
        if (typeof next !== "function")
          throw new TypeError("each() expects function as second argument");
        if (typeof callback !== "function") callback = Function.prototype;
        var total = items.length;
        if (total === 0) return callback(void 0, items);
        var transformed = new Array(total);
        var transformedCount = 0;
        var returned = false;
        items.forEach(function(item, index) {
          next(item, function(error, transformedItem) {
            if (returned) return;
            if (error) {
              returned = true;
              return callback(error);
            }
            transformed[index] = transformedItem;
            transformedCount += 1;
            if (transformedCount === total) return callback(void 0, transformed);
          });
        });
      };
      if (typeof define !== "undefined" && define.amd) {
        define([], function() {
          return each;
        });
      } else if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = each;
      } else {
        globals.asyncEach = each;
      }
    })(exports2);
  }
});

// ../../node_modules/.pnpm/filename-regex@2.0.1/node_modules/filename-regex/index.js
var require_filename_regex = __commonJS({
  "../../node_modules/.pnpm/filename-regex@2.0.1/node_modules/filename-regex/index.js"(exports2, module2) {
    module2.exports = function filenameRegex() {
      return /([^\\\/]+)$/;
    };
  }
});

// ../../node_modules/.pnpm/arr-flatten@1.1.0/node_modules/arr-flatten/index.js
var require_arr_flatten = __commonJS({
  "../../node_modules/.pnpm/arr-flatten@1.1.0/node_modules/arr-flatten/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(arr) {
      return flat(arr, []);
    };
    function flat(arr, res) {
      var i = 0, cur;
      var len = arr.length;
      for (; i < len; i++) {
        cur = arr[i];
        Array.isArray(cur) ? flat(cur, res) : res.push(cur);
      }
      return res;
    }
  }
});

// ../../node_modules/.pnpm/arr-diff@2.0.0/node_modules/arr-diff/index.js
var require_arr_diff = __commonJS({
  "../../node_modules/.pnpm/arr-diff@2.0.0/node_modules/arr-diff/index.js"(exports2, module2) {
    "use strict";
    var flatten = require_arr_flatten();
    var slice = [].slice;
    function diff(arr, arrays) {
      var argsLen = arguments.length;
      var len = arr.length, i = -1;
      var res = [], arrays;
      if (argsLen === 1) {
        return arr;
      }
      if (argsLen > 2) {
        arrays = flatten(slice.call(arguments, 1));
      }
      while (++i < len) {
        if (!~arrays.indexOf(arr[i])) {
          res.push(arr[i]);
        }
      }
      return res;
    }
    module2.exports = diff;
  }
});

// ../../node_modules/.pnpm/array-unique@0.2.1/node_modules/array-unique/index.js
var require_array_unique = __commonJS({
  "../../node_modules/.pnpm/array-unique@0.2.1/node_modules/array-unique/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function unique(arr) {
      if (!Array.isArray(arr)) {
        throw new TypeError("array-unique expects an array.");
      }
      var len = arr.length;
      var i = -1;
      while (i++ < len) {
        var j = i + 1;
        for (; j < arr.length; ++j) {
          if (arr[i] === arr[j]) {
            arr.splice(j--, 1);
          }
        }
      }
      return arr;
    };
  }
});

// ../../node_modules/.pnpm/isarray@1.0.0/node_modules/isarray/index.js
var require_isarray = __commonJS({
  "../../node_modules/.pnpm/isarray@1.0.0/node_modules/isarray/index.js"(exports2, module2) {
    var toString = {}.toString;
    module2.exports = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
  }
});

// ../../node_modules/.pnpm/isobject@2.1.0/node_modules/isobject/index.js
var require_isobject = __commonJS({
  "../../node_modules/.pnpm/isobject@2.1.0/node_modules/isobject/index.js"(exports2, module2) {
    "use strict";
    var isArray = require_isarray();
    module2.exports = function isObject(val) {
      return val != null && typeof val === "object" && isArray(val) === false;
    };
  }
});

// ../../node_modules/.pnpm/is-buffer@1.1.6/node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "../../node_modules/.pnpm/is-buffer@1.1.6/node_modules/is-buffer/index.js"(exports2, module2) {
    module2.exports = function(obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
    };
    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
    }
  }
});

// ../../node_modules/.pnpm/kind-of@3.2.2/node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "../../node_modules/.pnpm/kind-of@3.2.2/node_modules/kind-of/index.js"(exports2, module2) {
    var isBuffer = require_is_buffer();
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (typeof val === "undefined") {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      if (val === true || val === false || val instanceof Boolean) {
        return "boolean";
      }
      if (typeof val === "string" || val instanceof String) {
        return "string";
      }
      if (typeof val === "number" || val instanceof Number) {
        return "number";
      }
      if (typeof val === "function" || val instanceof Function) {
        return "function";
      }
      if (typeof Array.isArray !== "undefined" && Array.isArray(val)) {
        return "array";
      }
      if (val instanceof RegExp) {
        return "regexp";
      }
      if (val instanceof Date) {
        return "date";
      }
      var type = toString.call(val);
      if (type === "[object RegExp]") {
        return "regexp";
      }
      if (type === "[object Date]") {
        return "date";
      }
      if (type === "[object Arguments]") {
        return "arguments";
      }
      if (type === "[object Error]") {
        return "error";
      }
      if (isBuffer(val)) {
        return "buffer";
      }
      if (type === "[object Set]") {
        return "set";
      }
      if (type === "[object WeakSet]") {
        return "weakset";
      }
      if (type === "[object Map]") {
        return "map";
      }
      if (type === "[object WeakMap]") {
        return "weakmap";
      }
      if (type === "[object Symbol]") {
        return "symbol";
      }
      if (type === "[object Int8Array]") {
        return "int8array";
      }
      if (type === "[object Uint8Array]") {
        return "uint8array";
      }
      if (type === "[object Uint8ClampedArray]") {
        return "uint8clampedarray";
      }
      if (type === "[object Int16Array]") {
        return "int16array";
      }
      if (type === "[object Uint16Array]") {
        return "uint16array";
      }
      if (type === "[object Int32Array]") {
        return "int32array";
      }
      if (type === "[object Uint32Array]") {
        return "uint32array";
      }
      if (type === "[object Float32Array]") {
        return "float32array";
      }
      if (type === "[object Float64Array]") {
        return "float64array";
      }
      return "object";
    };
  }
});

// ../../node_modules/.pnpm/is-number@2.1.0/node_modules/is-number/index.js
var require_is_number = __commonJS({
  "../../node_modules/.pnpm/is-number@2.1.0/node_modules/is-number/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    module2.exports = function isNumber(num) {
      var type = typeOf(num);
      if (type !== "number" && type !== "string") {
        return false;
      }
      var n = +num;
      return n - n + 1 >= 0 && num !== "";
    };
  }
});

// ../../node_modules/.pnpm/is-number@4.0.0/node_modules/is-number/index.js
var require_is_number2 = __commonJS({
  "../../node_modules/.pnpm/is-number@4.0.0/node_modules/is-number/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isNumber(num) {
      var type = typeof num;
      if (type === "string" || num instanceof String) {
        if (!num.trim()) return false;
      } else if (type !== "number" && !(num instanceof Number)) {
        return false;
      }
      return num - num + 1 >= 0;
    };
  }
});

// ../../node_modules/.pnpm/kind-of@6.0.3/node_modules/kind-of/index.js
var require_kind_of2 = __commonJS({
  "../../node_modules/.pnpm/kind-of@6.0.3/node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0) return "undefined";
      if (val === null) return "null";
      var type = typeof val;
      if (type === "boolean") return "boolean";
      if (type === "string") return "string";
      if (type === "number") return "number";
      if (type === "symbol") return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val)) return "array";
      if (isBuffer(val)) return "buffer";
      if (isArguments(val)) return "arguments";
      if (isDate(val)) return "date";
      if (isError(val)) return "error";
      if (isRegexp(val)) return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        // Set, Map, WeakSet, WeakMap
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        // 8-bit typed arrays
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        // 16-bit typed arrays
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        // 32-bit typed arrays
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        // iterators
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray) return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date) return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp) return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// ../../node_modules/.pnpm/math-random@1.0.4/node_modules/math-random/node.js
var require_node = __commonJS({
  "../../node_modules/.pnpm/math-random@1.0.4/node_modules/math-random/node.js"(exports2, module2) {
    var crypto = require("crypto");
    var max = Math.pow(2, 32);
    module2.exports = random;
    module2.exports.cryptographic = true;
    function random() {
      var buf = crypto.randomBytes(4).readUInt32BE(0);
      return buf / max;
    }
  }
});

// ../../node_modules/.pnpm/randomatic@3.1.1/node_modules/randomatic/index.js
var require_randomatic = __commonJS({
  "../../node_modules/.pnpm/randomatic@3.1.1/node_modules/randomatic/index.js"(exports2, module2) {
    "use strict";
    var isNumber = require_is_number2();
    var typeOf = require_kind_of2();
    var mathRandom = require_node();
    module2.exports = randomatic;
    module2.exports.isCrypto = !!mathRandom.cryptographic;
    var type = {
      lower: "abcdefghijklmnopqrstuvwxyz",
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      number: "0123456789",
      special: "~!@#$%^&()_+-={}[];',."
    };
    type.all = type.lower + type.upper + type.number + type.special;
    function randomatic(pattern, length, options) {
      if (typeof pattern === "undefined") {
        throw new Error("randomatic expects a string or number.");
      }
      var custom = false;
      if (arguments.length === 1) {
        if (typeof pattern === "string") {
          length = pattern.length;
        } else if (isNumber(pattern)) {
          options = {};
          length = pattern;
          pattern = "*";
        }
      }
      if (typeOf(length) === "object" && length.hasOwnProperty("chars")) {
        options = length;
        pattern = options.chars;
        length = pattern.length;
        custom = true;
      }
      var opts = options || {};
      var mask = "";
      var res = "";
      if (pattern.indexOf("?") !== -1) mask += opts.chars;
      if (pattern.indexOf("a") !== -1) mask += type.lower;
      if (pattern.indexOf("A") !== -1) mask += type.upper;
      if (pattern.indexOf("0") !== -1) mask += type.number;
      if (pattern.indexOf("!") !== -1) mask += type.special;
      if (pattern.indexOf("*") !== -1) mask += type.all;
      if (custom) mask += pattern;
      if (opts.exclude) {
        var exclude = typeOf(opts.exclude) === "string" ? opts.exclude : opts.exclude.join("");
        exclude = exclude.replace(new RegExp("[\\]]+", "g"), "");
        mask = mask.replace(new RegExp("[" + exclude + "]+", "g"), "");
        if (opts.exclude.indexOf("]") !== -1) mask = mask.replace(new RegExp("[\\]]+", "g"), "");
      }
      while (length--) {
        res += mask.charAt(parseInt(mathRandom() * mask.length, 10));
      }
      return res;
    }
  }
});

// ../../node_modules/.pnpm/repeat-string@1.6.1/node_modules/repeat-string/index.js
var require_repeat_string = __commonJS({
  "../../node_modules/.pnpm/repeat-string@1.6.1/node_modules/repeat-string/index.js"(exports2, module2) {
    "use strict";
    var res = "";
    var cache;
    module2.exports = repeat;
    function repeat(str, num) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (num === 1) return str;
      if (num === 2) return str + str;
      var max = str.length * num;
      if (cache !== str || typeof cache === "undefined") {
        cache = str;
        res = "";
      } else if (res.length >= max) {
        return res.substr(0, max);
      }
      while (max > res.length && num > 1) {
        if (num & 1) {
          res += str;
        }
        num >>= 1;
        str += str;
      }
      res += str;
      res = res.substr(0, max);
      return res;
    }
  }
});

// ../../node_modules/.pnpm/repeat-element@1.1.4/node_modules/repeat-element/index.js
var require_repeat_element = __commonJS({
  "../../node_modules/.pnpm/repeat-element@1.1.4/node_modules/repeat-element/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function repeat(ele, num) {
      if (Array.prototype.fill) {
        return new Array(num).fill(ele);
      }
      var arr = new Array(num);
      for (var i = 0; i < num; i++) {
        arr[i] = ele;
      }
      return arr;
    };
  }
});

// ../../node_modules/.pnpm/fill-range@2.2.4/node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "../../node_modules/.pnpm/fill-range@2.2.4/node_modules/fill-range/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject();
    var isNumber = require_is_number();
    var randomize = require_randomatic();
    var repeatStr = require_repeat_string();
    var repeat = require_repeat_element();
    module2.exports = fillRange;
    function fillRange(a, b, step, options, fn) {
      if (a == null || b == null) {
        throw new Error("fill-range expects the first and second args to be strings.");
      }
      if (typeof step === "function") {
        fn = step;
        options = {};
        step = null;
      }
      if (typeof options === "function") {
        fn = options;
        options = {};
      }
      if (isObject(step)) {
        options = step;
        step = "";
      }
      var expand, regex = false, sep = "";
      var opts = options || {};
      if (typeof opts.silent === "undefined") {
        opts.silent = true;
      }
      step = step || opts.step;
      var origA = a, origB = b;
      b = b.toString() === "-0" ? 0 : b;
      if (opts.optimize || opts.makeRe) {
        step = step ? step += "~" : step;
        expand = true;
        regex = true;
        sep = "~";
      }
      if (typeof step === "string") {
        var match = stepRe().exec(step);
        if (match) {
          var i = match.index;
          var m = match[0];
          if (m === "+") {
            return repeat(a, b);
          } else if (m === "?") {
            return [randomize(a, b)];
          } else if (m === ">") {
            step = step.substr(0, i) + step.substr(i + 1);
            expand = true;
          } else if (m === "|") {
            step = step.substr(0, i) + step.substr(i + 1);
            expand = true;
            regex = true;
            sep = m;
          } else if (m === "~") {
            step = step.substr(0, i) + step.substr(i + 1);
            expand = true;
            regex = true;
            sep = m;
          }
        } else if (!isNumber(step)) {
          if (!opts.silent) {
            throw new TypeError("fill-range: invalid step.");
          }
          return null;
        }
      }
      if (/[.&*()[\]^%$#@!]/.test(a) || /[.&*()[\]^%$#@!]/.test(b)) {
        if (!opts.silent) {
          throw new RangeError("fill-range: invalid range arguments.");
        }
        return null;
      }
      if (!noAlphaNum(a) || !noAlphaNum(b) || hasBoth(a) || hasBoth(b)) {
        if (!opts.silent) {
          throw new RangeError("fill-range: invalid range arguments.");
        }
        return null;
      }
      var isNumA = isNumber(zeros(a));
      var isNumB = isNumber(zeros(b));
      if (!isNumA && isNumB || isNumA && !isNumB) {
        if (!opts.silent) {
          throw new TypeError("fill-range: first range argument is incompatible with second.");
        }
        return null;
      }
      var isNum = isNumA;
      var num = formatStep(step);
      if (isNum) {
        a = +a;
        b = +b;
      } else {
        a = a.charCodeAt(0);
        b = b.charCodeAt(0);
      }
      var isDescending = a > b;
      if (a < 0 || b < 0) {
        expand = false;
        regex = false;
      }
      var padding = isPadded(origA, origB);
      var res, pad, arr = [];
      var ii = 0;
      if (regex) {
        if (shouldExpand(a, b, num, isNum, padding, opts)) {
          if (sep === "|" || sep === "~") {
            sep = detectSeparator(a, b, num, isNum, isDescending);
          }
          return wrap([origA, origB], sep, opts);
        }
      }
      while (isDescending ? a >= b : a <= b) {
        if (padding && isNum) {
          pad = padding(a);
        }
        if (typeof fn === "function") {
          res = fn(a, isNum, pad, ii++);
        } else if (!isNum) {
          if (regex && isInvalidChar(a)) {
            res = null;
          } else {
            res = String.fromCharCode(a);
          }
        } else {
          res = formatPadding(a, pad);
        }
        if (res !== null) arr.push(res);
        if (isDescending) {
          a -= num;
        } else {
          a += num;
        }
      }
      if ((regex || expand) && !opts.noexpand) {
        if (sep === "|" || sep === "~") {
          sep = detectSeparator(a, b, num, isNum, isDescending);
        }
        if (arr.length === 1 || a < 0 || b < 0) {
          return arr;
        }
        return wrap(arr, sep, opts);
      }
      return arr;
    }
    function wrap(arr, sep, opts) {
      if (sep === "~") {
        sep = "-";
      }
      var str = arr.join(sep);
      var pre = opts && opts.regexPrefix;
      if (sep === "|") {
        str = pre ? pre + str : str;
        str = "(" + str + ")";
      }
      if (sep === "-") {
        str = pre && pre === "^" ? pre + str : str;
        str = "[" + str + "]";
      }
      return [str];
    }
    function isCharClass(a, b, step, isNum, isDescending) {
      if (isDescending) {
        return false;
      }
      if (isNum) {
        return a <= 9 && b <= 9;
      }
      if (a < b) {
        return step === 1;
      }
      return false;
    }
    function shouldExpand(a, b, num, isNum, padding, opts) {
      if (isNum && (a > 9 || b > 9)) {
        return false;
      }
      return !padding && num === 1 && a < b;
    }
    function detectSeparator(a, b, step, isNum, isDescending) {
      var isChar = isCharClass(a, b, step, isNum, isDescending);
      if (!isChar) {
        return "|";
      }
      return "~";
    }
    function formatStep(step) {
      return Math.abs(step >> 0) || 1;
    }
    function formatPadding(ch, pad) {
      var res = pad ? pad + ch : ch;
      if (pad && ch.toString().charAt(0) === "-") {
        res = "-" + pad + ch.toString().substr(1);
      }
      return res.toString();
    }
    function isInvalidChar(str) {
      var ch = toStr(str);
      return ch === "\\" || ch === "[" || ch === "]" || ch === "^" || ch === "(" || ch === ")" || ch === "`";
    }
    function toStr(ch) {
      return String.fromCharCode(ch);
    }
    function stepRe() {
      return /\?|>|\||\+|\~/g;
    }
    function noAlphaNum(val) {
      return /[a-z0-9]/i.test(val);
    }
    function hasBoth(val) {
      return /[a-z][0-9]|[0-9][a-z]/i.test(val);
    }
    function zeros(val) {
      if (/^-*0+$/.test(val.toString())) {
        return "0";
      }
      return val;
    }
    function hasZeros(val) {
      return /[^.]\.|^-*0+[0-9]/.test(val);
    }
    function isPadded(origA, origB) {
      if (hasZeros(origA) || hasZeros(origB)) {
        var alen = length(origA);
        var blen = length(origB);
        var len = alen >= blen ? alen : blen;
        return function(a) {
          return repeatStr("0", len - length(a));
        };
      }
      return false;
    }
    function length(val) {
      return val.toString().length;
    }
  }
});

// ../../node_modules/.pnpm/expand-range@1.8.2/node_modules/expand-range/index.js
var require_expand_range = __commonJS({
  "../../node_modules/.pnpm/expand-range@1.8.2/node_modules/expand-range/index.js"(exports2, module2) {
    "use strict";
    var fill = require_fill_range();
    module2.exports = function expandRange(str, options, fn) {
      if (typeof str !== "string") {
        throw new TypeError("expand-range expects a string.");
      }
      if (typeof options === "function") {
        fn = options;
        options = {};
      }
      if (typeof options === "boolean") {
        options = {};
        options.makeRe = true;
      }
      var opts = options || {};
      var args = str.split("..");
      var len = args.length;
      if (len > 3) {
        return str;
      }
      if (len === 1) {
        return args;
      }
      if (typeof fn === "boolean" && fn === true) {
        opts.makeRe = true;
      }
      args.push(opts);
      return fill.apply(null, args.concat(fn));
    };
  }
});

// ../../node_modules/.pnpm/preserve@0.2.0/node_modules/preserve/index.js
var require_preserve = __commonJS({
  "../../node_modules/.pnpm/preserve@0.2.0/node_modules/preserve/index.js"(exports2) {
    "use strict";
    exports2.before = function before(str, re) {
      return str.replace(re, function(match) {
        var id = randomize();
        cache[id] = match;
        return "__ID" + id + "__";
      });
    };
    exports2.after = function after(str) {
      return str.replace(/__ID(.{5})__/g, function(_, id) {
        return cache[id];
      });
    };
    function randomize() {
      return Math.random().toString().slice(2, 7);
    }
    var cache = {};
  }
});

// ../../node_modules/.pnpm/braces@1.8.5/node_modules/braces/index.js
var require_braces = __commonJS({
  "../../node_modules/.pnpm/braces@1.8.5/node_modules/braces/index.js"(exports2, module2) {
    "use strict";
    var expand = require_expand_range();
    var repeat = require_repeat_element();
    var tokens = require_preserve();
    module2.exports = function(str, options) {
      if (typeof str !== "string") {
        throw new Error("braces expects a string");
      }
      return braces(str, options);
    };
    function braces(str, arr, options) {
      if (str === "") {
        return [];
      }
      if (!Array.isArray(arr)) {
        options = arr;
        arr = [];
      }
      var opts = options || {};
      arr = arr || [];
      if (typeof opts.nodupes === "undefined") {
        opts.nodupes = true;
      }
      var fn = opts.fn;
      var es6;
      if (typeof opts === "function") {
        fn = opts;
        opts = {};
      }
      if (!(patternRe instanceof RegExp)) {
        patternRe = patternRegex();
      }
      var matches = str.match(patternRe) || [];
      var m = matches[0];
      switch (m) {
        case "\\,":
          return escapeCommas(str, arr, opts);
        case "\\.":
          return escapeDots(str, arr, opts);
        case "/.":
          return escapePaths(str, arr, opts);
        case " ":
          return splitWhitespace(str);
        case "{,}":
          return exponential(str, opts, braces);
        case "{}":
          return emptyBraces(str, arr, opts);
        case "\\{":
        case "\\}":
          return escapeBraces(str, arr, opts);
        case "${":
          if (!/\{[^{]+\{/.test(str)) {
            return arr.concat(str);
          } else {
            es6 = true;
            str = tokens.before(str, es6Regex());
          }
      }
      if (!(braceRe instanceof RegExp)) {
        braceRe = braceRegex();
      }
      var match = braceRe.exec(str);
      if (match == null) {
        return [str];
      }
      var outter = match[1];
      var inner = match[2];
      if (inner === "") {
        return [str];
      }
      var segs, segsLength;
      if (inner.indexOf("..") !== -1) {
        segs = expand(inner, opts, fn) || inner.split(",");
        segsLength = segs.length;
      } else if (inner[0] === '"' || inner[0] === "'") {
        return arr.concat(str.split(/['"]/).join(""));
      } else {
        segs = inner.split(",");
        if (opts.makeRe) {
          return braces(str.replace(outter, wrap(segs, "|")), opts);
        }
        segsLength = segs.length;
        if (segsLength === 1 && opts.bash) {
          segs[0] = wrap(segs[0], "\\");
        }
      }
      var len = segs.length;
      var i = 0, val;
      while (len--) {
        var path = segs[i++];
        if (/(\.[^.\/])/.test(path)) {
          if (segsLength > 1) {
            return segs;
          } else {
            return [str];
          }
        }
        val = splice(str, outter, path);
        if (/\{[^{}]+?\}/.test(val)) {
          arr = braces(val, arr, opts);
        } else if (val !== "") {
          if (opts.nodupes && arr.indexOf(val) !== -1) {
            continue;
          }
          arr.push(es6 ? tokens.after(val) : val);
        }
      }
      if (opts.strict) {
        return filter(arr, filterEmpty);
      }
      return arr;
    }
    function exponential(str, options, fn) {
      if (typeof options === "function") {
        fn = options;
        options = null;
      }
      var opts = options || {};
      var esc = "__ESC_EXP__";
      var exp = 0;
      var res;
      var parts = str.split("{,}");
      if (opts.nodupes) {
        return fn(parts.join(""), opts);
      }
      exp = parts.length - 1;
      res = fn(parts.join(esc), opts);
      var len = res.length;
      var arr = [];
      var i = 0;
      while (len--) {
        var ele = res[i++];
        var idx = ele.indexOf(esc);
        if (idx === -1) {
          arr.push(ele);
        } else {
          ele = ele.split("__ESC_EXP__").join("");
          if (!!ele && opts.nodupes !== false) {
            arr.push(ele);
          } else {
            var num = Math.pow(2, exp);
            arr.push.apply(arr, repeat(ele, num));
          }
        }
      }
      return arr;
    }
    function wrap(val, ch) {
      if (ch === "|") {
        return "(" + val.join(ch) + ")";
      }
      if (ch === ",") {
        return "{" + val.join(ch) + "}";
      }
      if (ch === "-") {
        return "[" + val.join(ch) + "]";
      }
      if (ch === "\\") {
        return "\\{" + val + "\\}";
      }
    }
    function emptyBraces(str, arr, opts) {
      return braces(str.split("{}").join("\\{\\}"), arr, opts);
    }
    function filterEmpty(ele) {
      return !!ele && ele !== "\\";
    }
    function splitWhitespace(str) {
      var segs = str.split(" ");
      var len = segs.length;
      var res = [];
      var i = 0;
      while (len--) {
        res.push.apply(res, braces(segs[i++]));
      }
      return res;
    }
    function escapeBraces(str, arr, opts) {
      if (!/\{[^{]+\{/.test(str)) {
        return arr.concat(str.split("\\").join(""));
      } else {
        str = str.split("\\{").join("__LT_BRACE__");
        str = str.split("\\}").join("__RT_BRACE__");
        return map(braces(str, arr, opts), function(ele) {
          ele = ele.split("__LT_BRACE__").join("{");
          return ele.split("__RT_BRACE__").join("}");
        });
      }
    }
    function escapeDots(str, arr, opts) {
      if (!/[^\\]\..+\\\./.test(str)) {
        return arr.concat(str.split("\\").join(""));
      } else {
        str = str.split("\\.").join("__ESC_DOT__");
        return map(braces(str, arr, opts), function(ele) {
          return ele.split("__ESC_DOT__").join(".");
        });
      }
    }
    function escapePaths(str, arr, opts) {
      str = str.split("/.").join("__ESC_PATH__");
      return map(braces(str, arr, opts), function(ele) {
        return ele.split("__ESC_PATH__").join("/.");
      });
    }
    function escapeCommas(str, arr, opts) {
      if (!/\w,/.test(str)) {
        return arr.concat(str.split("\\").join(""));
      } else {
        str = str.split("\\,").join("__ESC_COMMA__");
        return map(braces(str, arr, opts), function(ele) {
          return ele.split("__ESC_COMMA__").join(",");
        });
      }
    }
    function patternRegex() {
      return /\${|( (?=[{,}])|(?=[{,}]) )|{}|{,}|\\,(?=.*[{}])|\/\.(?=.*[{}])|\\\.(?={)|\\{|\\}/;
    }
    function braceRegex() {
      return /.*(\\?\{([^}]+)\})/;
    }
    function es6Regex() {
      return /\$\{([^}]+)\}/;
    }
    var braceRe;
    var patternRe;
    function splice(str, token, replacement) {
      var i = str.indexOf(token);
      return str.substr(0, i) + replacement + str.substr(i + token.length);
    }
    function map(arr, fn) {
      if (arr == null) {
        return [];
      }
      var len = arr.length;
      var res = new Array(len);
      var i = -1;
      while (++i < len) {
        res[i] = fn(arr[i], i, arr);
      }
      return res;
    }
    function filter(arr, cb) {
      if (arr == null) return [];
      if (typeof cb !== "function") {
        throw new TypeError("braces: filter expects a callback function.");
      }
      var len = arr.length;
      var res = arr.slice();
      var i = 0;
      while (len--) {
        if (!cb(arr[len], i++)) {
          res.splice(len, 1);
        }
      }
      return res;
    }
  }
});

// ../../node_modules/.pnpm/is-posix-bracket@0.1.1/node_modules/is-posix-bracket/index.js
var require_is_posix_bracket = __commonJS({
  "../../node_modules/.pnpm/is-posix-bracket@0.1.1/node_modules/is-posix-bracket/index.js"(exports2, module2) {
    module2.exports = function isPosixBracket(str) {
      return typeof str === "string" && /\[([:.=+])(?:[^\[\]]|)+\1\]/.test(str);
    };
  }
});

// ../../node_modules/.pnpm/expand-brackets@0.1.5/node_modules/expand-brackets/index.js
var require_expand_brackets = __commonJS({
  "../../node_modules/.pnpm/expand-brackets@0.1.5/node_modules/expand-brackets/index.js"(exports2, module2) {
    "use strict";
    var isPosixBracket = require_is_posix_bracket();
    var POSIX = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E",
      punct: "-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = brackets;
    function brackets(str) {
      if (!isPosixBracket(str)) {
        return str;
      }
      var negated = false;
      if (str.indexOf("[^") !== -1) {
        negated = true;
        str = str.split("[^").join("[");
      }
      if (str.indexOf("[!") !== -1) {
        negated = true;
        str = str.split("[!").join("[");
      }
      var a = str.split("[");
      var b = str.split("]");
      var imbalanced = a.length !== b.length;
      var parts = str.split(/(?::\]\[:|\[?\[:|:\]\]?)/);
      var len = parts.length, i = 0;
      var end = "", beg = "";
      var res = [];
      while (len--) {
        var inner = parts[i++];
        if (inner === "^[!" || inner === "[!") {
          inner = "";
          negated = true;
        }
        var prefix = negated ? "^" : "";
        var ch = POSIX[inner];
        if (ch) {
          res.push("[" + prefix + ch + "]");
        } else if (inner) {
          if (/^\[?\w-\w\]?$/.test(inner)) {
            if (i === parts.length) {
              res.push("[" + prefix + inner);
            } else if (i === 1) {
              res.push(prefix + inner + "]");
            } else {
              res.push(prefix + inner);
            }
          } else {
            if (i === 1) {
              beg += inner;
            } else if (i === parts.length) {
              end += inner;
            } else {
              res.push("[" + prefix + inner + "]");
            }
          }
        }
      }
      var result = res.join("|");
      var rlen = res.length || 1;
      if (rlen > 1) {
        result = "(?:" + result + ")";
        rlen = 1;
      }
      if (beg) {
        rlen++;
        if (beg.charAt(0) === "[") {
          if (imbalanced) {
            beg = "\\[" + beg.slice(1);
          } else {
            beg += "]";
          }
        }
        result = beg + result;
      }
      if (end) {
        rlen++;
        if (end.slice(-1) === "]") {
          if (imbalanced) {
            end = end.slice(0, end.length - 1) + "\\]";
          } else {
            end = "[" + end;
          }
        }
        result += end;
      }
      if (rlen > 1) {
        result = result.split("][").join("]|[");
        if (result.indexOf("|") !== -1 && !/\(\?/.test(result)) {
          result = "(?:" + result + ")";
        }
      }
      result = result.replace(/\[+=|=\]+/g, "\\b");
      return result;
    }
    brackets.makeRe = function(pattern) {
      try {
        return new RegExp(brackets(pattern));
      } catch (err) {
      }
    };
    brackets.isMatch = function(str, pattern) {
      try {
        return brackets.makeRe(pattern).test(str);
      } catch (err) {
        return false;
      }
    };
    brackets.match = function(arr, pattern) {
      var len = arr.length, i = 0;
      var res = arr.slice();
      var re = brackets.makeRe(pattern);
      while (i < len) {
        var ele = arr[i++];
        if (!re.test(ele)) {
          continue;
        }
        res.splice(i, 1);
      }
      return res;
    };
  }
});

// ../../node_modules/.pnpm/is-extglob@1.0.0/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "../../node_modules/.pnpm/is-extglob@1.0.0/node_modules/is-extglob/index.js"(exports2, module2) {
    module2.exports = function isExtglob(str) {
      return typeof str === "string" && /[@?!+*]\(/.test(str);
    };
  }
});

// ../../node_modules/.pnpm/extglob@0.3.2/node_modules/extglob/index.js
var require_extglob = __commonJS({
  "../../node_modules/.pnpm/extglob@0.3.2/node_modules/extglob/index.js"(exports2, module2) {
    "use strict";
    var isExtglob = require_is_extglob();
    var re;
    var cache = {};
    module2.exports = extglob;
    function extglob(str, opts) {
      opts = opts || {};
      var o = {}, i = 0;
      str = str.replace(/!\(([^\w*()])/g, "$1!(");
      str = str.replace(/([*\/])\.!\([*]\)/g, function(m2, ch) {
        if (ch === "/") {
          return escape("\\/[^.]+");
        }
        return escape("[^.]+");
      });
      var key = str + String(!!opts.regex) + String(!!opts.contains) + String(!!opts.escape);
      if (cache.hasOwnProperty(key)) {
        return cache[key];
      }
      if (!(re instanceof RegExp)) {
        re = regex();
      }
      opts.negate = false;
      var m;
      while (m = re.exec(str)) {
        var prefix = m[1];
        var inner = m[3];
        if (prefix === "!") {
          opts.negate = true;
        }
        var id = "__EXTGLOB_" + i++ + "__";
        o[id] = wrap(inner, prefix, opts.escape);
        str = str.split(m[0]).join(id);
      }
      var keys = Object.keys(o);
      var len = keys.length;
      while (len--) {
        var prop = keys[len];
        str = str.split(prop).join(o[prop]);
      }
      var result = opts.regex ? toRegex(str, opts.contains, opts.negate) : str;
      result = result.split(".").join("\\.");
      return cache[key] = result;
    }
    function wrap(inner, prefix, esc) {
      if (esc) inner = escape(inner);
      switch (prefix) {
        case "!":
          return "(?!" + inner + ")[^/]" + (esc ? "%%%~" : "*?");
        case "@":
          return "(?:" + inner + ")";
        case "+":
          return "(?:" + inner + ")+";
        case "*":
          return "(?:" + inner + ")" + (esc ? "%%" : "*");
        case "?":
          return "(?:" + inner + "|)";
        default:
          return inner;
      }
    }
    function escape(str) {
      str = str.split("*").join("[^/]%%%~");
      str = str.split(".").join("\\.");
      return str;
    }
    function regex() {
      return /(\\?[@?!+*$]\\?)(\(([^()]*?)\))/;
    }
    function negate(str) {
      return "(?!^" + str + ").*$";
    }
    function toRegex(pattern, contains, isNegated) {
      var prefix = contains ? "^" : "";
      var after = contains ? "$" : "";
      pattern = "(?:" + pattern + ")" + after;
      if (isNegated) {
        pattern = prefix + negate(pattern);
      }
      return new RegExp(prefix + pattern);
    }
  }
});

// ../../node_modules/.pnpm/is-glob@2.0.1/node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "../../node_modules/.pnpm/is-glob@2.0.1/node_modules/is-glob/index.js"(exports2, module2) {
    var isExtglob = require_is_extglob();
    module2.exports = function isGlob(str) {
      return typeof str === "string" && (/[*!?{}(|)[\]]/.test(str) || isExtglob(str));
    };
  }
});

// ../../node_modules/.pnpm/remove-trailing-separator@1.1.0/node_modules/remove-trailing-separator/index.js
var require_remove_trailing_separator = __commonJS({
  "../../node_modules/.pnpm/remove-trailing-separator@1.1.0/node_modules/remove-trailing-separator/index.js"(exports2, module2) {
    var isWin = process.platform === "win32";
    module2.exports = function(str) {
      var i = str.length - 1;
      if (i < 2) {
        return str;
      }
      while (isSeparator(str, i)) {
        i--;
      }
      return str.substr(0, i + 1);
    };
    function isSeparator(str, i) {
      var char = str[i];
      return i > 0 && (char === "/" || isWin && char === "\\");
    }
  }
});

// ../../node_modules/.pnpm/normalize-path@2.1.1/node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "../../node_modules/.pnpm/normalize-path@2.1.1/node_modules/normalize-path/index.js"(exports2, module2) {
    var removeTrailingSeparator = require_remove_trailing_separator();
    module2.exports = function normalizePath(str, stripTrailing) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      str = str.replace(/[\\\/]+/g, "/");
      if (stripTrailing !== false) {
        str = removeTrailingSeparator(str);
      }
      return str;
    };
  }
});

// ../../node_modules/.pnpm/is-extendable@0.1.1/node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "../../node_modules/.pnpm/is-extendable@0.1.1/node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// ../../node_modules/.pnpm/for-in@1.0.2/node_modules/for-in/index.js
var require_for_in = __commonJS({
  "../../node_modules/.pnpm/for-in@1.0.2/node_modules/for-in/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function forIn(obj, fn, thisArg) {
      for (var key in obj) {
        if (fn.call(thisArg, obj[key], key, obj) === false) {
          break;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/for-own@0.1.5/node_modules/for-own/index.js
var require_for_own = __commonJS({
  "../../node_modules/.pnpm/for-own@0.1.5/node_modules/for-own/index.js"(exports2, module2) {
    "use strict";
    var forIn = require_for_in();
    var hasOwn = Object.prototype.hasOwnProperty;
    module2.exports = function forOwn(obj, fn, thisArg) {
      forIn(obj, function(val, key) {
        if (hasOwn.call(obj, key)) {
          return fn.call(thisArg, obj[key], key, obj);
        }
      });
    };
  }
});

// ../../node_modules/.pnpm/object.omit@2.0.1/node_modules/object.omit/index.js
var require_object2 = __commonJS({
  "../../node_modules/.pnpm/object.omit@2.0.1/node_modules/object.omit/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    var forOwn = require_for_own();
    module2.exports = function omit(obj, keys) {
      if (!isObject(obj)) return {};
      keys = [].concat.apply([], [].slice.call(arguments, 1));
      var last = keys[keys.length - 1];
      var res = {}, fn;
      if (typeof last === "function") {
        fn = keys.pop();
      }
      var isFunction = typeof fn === "function";
      if (!keys.length && !isFunction) {
        return obj;
      }
      forOwn(obj, function(value, key) {
        if (keys.indexOf(key) === -1) {
          if (!isFunction) {
            res[key] = value;
          } else if (fn(value, key, obj)) {
            res[key] = value;
          }
        }
      });
      return res;
    };
  }
});

// ../../node_modules/.pnpm/glob-parent@2.0.0/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  "../../node_modules/.pnpm/glob-parent@2.0.0/node_modules/glob-parent/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var isglob = require_is_glob();
    module2.exports = function globParent(str) {
      str += "a";
      do {
        str = path.dirname(str);
      } while (isglob(str));
      return str;
    };
  }
});

// ../../node_modules/.pnpm/glob-base@0.3.0/node_modules/glob-base/index.js
var require_glob_base = __commonJS({
  "../../node_modules/.pnpm/glob-base@0.3.0/node_modules/glob-base/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var parent = require_glob_parent();
    var isGlob = require_is_glob();
    module2.exports = function globBase(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("glob-base expects a string.");
      }
      var res = {};
      res.base = parent(pattern);
      res.isGlob = isGlob(pattern);
      if (res.base !== ".") {
        res.glob = pattern.substr(res.base.length);
        if (res.glob.charAt(0) === "/") {
          res.glob = res.glob.substr(1);
        }
      } else {
        res.glob = pattern;
      }
      if (!res.isGlob) {
        res.base = dirname(pattern);
        res.glob = res.base !== "." ? pattern.substr(res.base.length) : pattern;
      }
      if (res.glob.substr(0, 2) === "./") {
        res.glob = res.glob.substr(2);
      }
      if (res.glob.charAt(0) === "/") {
        res.glob = res.glob.substr(1);
      }
      return res;
    };
    function dirname(glob) {
      if (glob.slice(-1) === "/") return glob;
      return path.dirname(glob);
    }
  }
});

// ../../node_modules/.pnpm/is-dotfile@1.0.3/node_modules/is-dotfile/index.js
var require_is_dotfile = __commonJS({
  "../../node_modules/.pnpm/is-dotfile@1.0.3/node_modules/is-dotfile/index.js"(exports2, module2) {
    module2.exports = function(str) {
      if (str.charCodeAt(0) === 46 && str.indexOf("/", 1) === -1) {
        return true;
      }
      var slash = str.lastIndexOf("/");
      return slash !== -1 ? str.charCodeAt(slash + 1) === 46 : false;
    };
  }
});

// ../../node_modules/.pnpm/parse-glob@3.0.4/node_modules/parse-glob/index.js
var require_parse_glob = __commonJS({
  "../../node_modules/.pnpm/parse-glob@3.0.4/node_modules/parse-glob/index.js"(exports2, module2) {
    "use strict";
    var isGlob = require_is_glob();
    var findBase = require_glob_base();
    var extglob = require_is_extglob();
    var dotfile = require_is_dotfile();
    var cache = module2.exports.cache = {};
    module2.exports = function parseGlob(glob) {
      if (cache.hasOwnProperty(glob)) {
        return cache[glob];
      }
      var tok = {};
      tok.orig = glob;
      tok.is = {};
      glob = escape(glob);
      var parsed = findBase(glob);
      tok.is.glob = parsed.isGlob;
      tok.glob = parsed.glob;
      tok.base = parsed.base;
      var segs = /([^\/]*)$/.exec(glob);
      tok.path = {};
      tok.path.dirname = "";
      tok.path.basename = segs[1] || "";
      tok.path.dirname = glob.split(tok.path.basename).join("") || "";
      var basename = (tok.path.basename || "").split(".") || "";
      tok.path.filename = basename[0] || "";
      tok.path.extname = basename.slice(1).join(".") || "";
      tok.path.ext = "";
      if (isGlob(tok.path.dirname) && !tok.path.basename) {
        if (!/\/$/.test(tok.glob)) {
          tok.path.basename = tok.glob;
        }
        tok.path.dirname = tok.base;
      }
      if (glob.indexOf("/") === -1 && !tok.is.globstar) {
        tok.path.dirname = "";
        tok.path.basename = tok.orig;
      }
      var dot = tok.path.basename.indexOf(".");
      if (dot !== -1) {
        tok.path.filename = tok.path.basename.slice(0, dot);
        tok.path.extname = tok.path.basename.slice(dot);
      }
      if (tok.path.extname.charAt(0) === ".") {
        var exts = tok.path.extname.split(".");
        tok.path.ext = exts[exts.length - 1];
      }
      tok.glob = unescape(tok.glob);
      tok.path.dirname = unescape(tok.path.dirname);
      tok.path.basename = unescape(tok.path.basename);
      tok.path.filename = unescape(tok.path.filename);
      tok.path.extname = unescape(tok.path.extname);
      var is = glob && tok.is.glob;
      tok.is.negated = glob && glob.charAt(0) === "!";
      tok.is.extglob = glob && extglob(glob);
      tok.is.braces = has(is, glob, "{");
      tok.is.brackets = has(is, glob, "[:");
      tok.is.globstar = has(is, glob, "**");
      tok.is.dotfile = dotfile(tok.path.basename) || dotfile(tok.path.filename);
      tok.is.dotdir = dotdir(tok.path.dirname);
      return cache[glob] = tok;
    };
    function dotdir(base) {
      if (base.indexOf("/.") !== -1) {
        return true;
      }
      if (base.charAt(0) === "." && base.charAt(1) !== "/") {
        return true;
      }
      return false;
    }
    function has(is, glob, ch) {
      return is && glob.indexOf(ch) !== -1;
    }
    function escape(str) {
      var re = /\{([^{}]*?)}|\(([^()]*?)\)|\[([^\[\]]*?)\]/g;
      return str.replace(re, function(outter, braces, parens, brackets) {
        var inner = braces || parens || brackets;
        if (!inner) {
          return outter;
        }
        return outter.split(inner).join(esc(inner));
      });
    }
    function esc(str) {
      str = str.split("/").join("__SLASH__");
      str = str.split(".").join("__DOT__");
      return str;
    }
    function unescape(str) {
      str = str.split("__SLASH__").join("/");
      str = str.split("__DOT__").join(".");
      return str;
    }
  }
});

// ../../node_modules/.pnpm/is-primitive@2.0.0/node_modules/is-primitive/index.js
var require_is_primitive = __commonJS({
  "../../node_modules/.pnpm/is-primitive@2.0.0/node_modules/is-primitive/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isPrimitive(value) {
      return value == null || typeof value !== "function" && typeof value !== "object";
    };
  }
});

// ../../node_modules/.pnpm/is-equal-shallow@0.1.3/node_modules/is-equal-shallow/index.js
var require_is_equal_shallow = __commonJS({
  "../../node_modules/.pnpm/is-equal-shallow@0.1.3/node_modules/is-equal-shallow/index.js"(exports2, module2) {
    "use strict";
    var isPrimitive = require_is_primitive();
    module2.exports = function isEqual(a, b) {
      if (!a && !b) {
        return true;
      }
      if (!a && b || a && !b) {
        return false;
      }
      var numKeysA = 0, numKeysB = 0, key;
      for (key in b) {
        numKeysB++;
        if (!isPrimitive(b[key]) || !a.hasOwnProperty(key) || a[key] !== b[key]) {
          return false;
        }
      }
      for (key in a) {
        numKeysA++;
      }
      return numKeysA === numKeysB;
    };
  }
});

// ../../node_modules/.pnpm/regex-cache@0.4.4/node_modules/regex-cache/index.js
var require_regex_cache = __commonJS({
  "../../node_modules/.pnpm/regex-cache@0.4.4/node_modules/regex-cache/index.js"(exports2, module2) {
    "use strict";
    var equal = require_is_equal_shallow();
    var basic = {};
    var cache = {};
    module2.exports = regexCache;
    function regexCache(fn, str, opts) {
      var key = "_default_", regex, cached;
      if (!str && !opts) {
        if (typeof fn !== "function") {
          return fn;
        }
        return basic[key] || (basic[key] = fn(str));
      }
      var isString = typeof str === "string";
      if (isString) {
        if (!opts) {
          return basic[str] || (basic[str] = fn(str));
        }
        key = str;
      } else {
        opts = str;
      }
      cached = cache[key];
      if (cached && equal(cached.opts, opts)) {
        return cached.regex;
      }
      memo(key, opts, regex = fn(str, opts));
      return regex;
    }
    function memo(key, opts, regex) {
      cache[key] = { regex, opts };
    }
    module2.exports.cache = cache;
    module2.exports.basic = basic;
  }
});

// ../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/utils.js"(exports2, module2) {
    "use strict";
    var win32 = process && process.platform === "win32";
    var path = require("path");
    var fileRe = require_filename_regex();
    var utils = module2.exports;
    utils.diff = require_arr_diff();
    utils.unique = require_array_unique();
    utils.braces = require_braces();
    utils.brackets = require_expand_brackets();
    utils.extglob = require_extglob();
    utils.isExtglob = require_is_extglob();
    utils.isGlob = require_is_glob();
    utils.typeOf = require_kind_of();
    utils.normalize = require_normalize_path();
    utils.omit = require_object2();
    utils.parseGlob = require_parse_glob();
    utils.cache = require_regex_cache();
    utils.filename = function filename(fp) {
      var seg = fp.match(fileRe());
      return seg && seg[0];
    };
    utils.isPath = function isPath(pattern, opts) {
      opts = opts || {};
      return function(fp) {
        var unixified = utils.unixify(fp, opts);
        if (opts.nocase) {
          return pattern.toLowerCase() === unixified.toLowerCase();
        }
        return pattern === unixified;
      };
    };
    utils.hasPath = function hasPath(pattern, opts) {
      return function(fp) {
        return utils.unixify(pattern, opts).indexOf(fp) !== -1;
      };
    };
    utils.matchPath = function matchPath(pattern, opts) {
      var fn = opts && opts.contains ? utils.hasPath(pattern, opts) : utils.isPath(pattern, opts);
      return fn;
    };
    utils.hasFilename = function hasFilename(re) {
      return function(fp) {
        var name = utils.filename(fp);
        return name && re.test(name);
      };
    };
    utils.arrayify = function arrayify(val) {
      return !Array.isArray(val) ? [val] : val;
    };
    utils.unixify = function unixify(fp, opts) {
      if (opts && opts.unixify === false) return fp;
      if (opts && opts.unixify === true || win32 || path.sep === "\\") {
        return utils.normalize(fp, false);
      }
      if (opts && opts.unescape === true) {
        return fp ? fp.toString().replace(/\\(\w)/g, "$1") : "";
      }
      return fp;
    };
    utils.escapePath = function escapePath(fp) {
      return fp.replace(/[\\.]/g, "\\$&");
    };
    utils.unescapeGlob = function unescapeGlob(fp) {
      return fp.replace(/[\\"']/g, "");
    };
    utils.escapeRe = function escapeRe(str) {
      return str.replace(/[-[\\$*+?.#^\s{}(|)\]]/g, "\\$&");
    };
    module2.exports = utils;
  }
});

// ../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/chars.js
var require_chars = __commonJS({
  "../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/chars.js"(exports2, module2) {
    "use strict";
    var chars = {};
    var unesc;
    var temp;
    function reverse(object, prepender) {
      return Object.keys(object).reduce(function(reversed, key) {
        var newKey = prepender ? prepender + key : key;
        reversed[object[key]] = newKey;
        return reversed;
      }, {});
    }
    chars.escapeRegex = {
      "?": /\?/g,
      "@": /\@/g,
      "!": /\!/g,
      "+": /\+/g,
      "*": /\*/g,
      "(": /\(/g,
      ")": /\)/g,
      "[": /\[/g,
      "]": /\]/g
    };
    chars.ESC = {
      "?": "__UNESC_QMRK__",
      "@": "__UNESC_AMPE__",
      "!": "__UNESC_EXCL__",
      "+": "__UNESC_PLUS__",
      "*": "__UNESC_STAR__",
      ",": "__UNESC_COMMA__",
      "(": "__UNESC_LTPAREN__",
      ")": "__UNESC_RTPAREN__",
      "[": "__UNESC_LTBRACK__",
      "]": "__UNESC_RTBRACK__"
    };
    chars.UNESC = unesc || (unesc = reverse(chars.ESC, "\\"));
    chars.ESC_TEMP = {
      "?": "__TEMP_QMRK__",
      "@": "__TEMP_AMPE__",
      "!": "__TEMP_EXCL__",
      "*": "__TEMP_STAR__",
      "+": "__TEMP_PLUS__",
      ",": "__TEMP_COMMA__",
      "(": "__TEMP_LTPAREN__",
      ")": "__TEMP_RTPAREN__",
      "[": "__TEMP_LTBRACK__",
      "]": "__TEMP_RTBRACK__"
    };
    chars.TEMP = temp || (temp = reverse(chars.ESC_TEMP));
    module2.exports = chars;
  }
});

// ../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/glob.js
var require_glob = __commonJS({
  "../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/glob.js"(exports2, module2) {
    "use strict";
    var chars = require_chars();
    var utils = require_utils();
    var Glob = module2.exports = function Glob2(pattern, options) {
      if (!(this instanceof Glob2)) {
        return new Glob2(pattern, options);
      }
      this.options = options || {};
      this.pattern = pattern;
      this.history = [];
      this.tokens = {};
      this.init(pattern);
    };
    Glob.prototype.init = function(pattern) {
      this.orig = pattern;
      this.negated = this.isNegated();
      this.options.track = this.options.track || false;
      this.options.makeRe = true;
    };
    Glob.prototype.track = function(msg) {
      if (this.options.track) {
        this.history.push({ msg, pattern: this.pattern });
      }
    };
    Glob.prototype.isNegated = function() {
      if (this.pattern.charCodeAt(0) === 33) {
        this.pattern = this.pattern.slice(1);
        return true;
      }
      return false;
    };
    Glob.prototype.braces = function() {
      if (this.options.nobraces !== true && this.options.nobrace !== true) {
        var a = this.pattern.match(/[\{\(\[]/g);
        var b = this.pattern.match(/[\}\)\]]/g);
        if (a && b && a.length !== b.length) {
          this.options.makeRe = false;
        }
        var expanded = utils.braces(this.pattern, this.options);
        this.pattern = expanded.join("|");
      }
    };
    Glob.prototype.brackets = function() {
      if (this.options.nobrackets !== true) {
        this.pattern = utils.brackets(this.pattern);
      }
    };
    Glob.prototype.extglob = function() {
      if (this.options.noextglob === true) return;
      if (utils.isExtglob(this.pattern)) {
        this.pattern = utils.extglob(this.pattern, { escape: true });
      }
    };
    Glob.prototype.parse = function(pattern) {
      this.tokens = utils.parseGlob(pattern || this.pattern, true);
      return this.tokens;
    };
    Glob.prototype._replace = function(a, b, escape) {
      this.track('before (find): "' + a + '" (replace with): "' + b + '"');
      if (escape) b = esc(b);
      if (a && b && typeof a === "string") {
        this.pattern = this.pattern.split(a).join(b);
      } else {
        this.pattern = this.pattern.replace(a, b);
      }
      this.track("after");
    };
    Glob.prototype.escape = function(str) {
      this.track("before escape: ");
      var re = /["\\](['"]?[^"'\\]['"]?)/g;
      this.pattern = str.replace(re, function($0, $1) {
        var o = chars.ESC;
        var ch = o && o[$1];
        if (ch) {
          return ch;
        }
        if (/[a-z]/i.test($0)) {
          return $0.split("\\").join("");
        }
        return $0;
      });
      this.track("after escape: ");
    };
    Glob.prototype.unescape = function(str) {
      var re = /__([A-Z]+)_([A-Z]+)__/g;
      this.pattern = str.replace(re, function($0, $1) {
        return chars[$1][$0];
      });
      this.pattern = unesc(this.pattern);
    };
    function esc(str) {
      str = str.split("?").join("%~");
      str = str.split("*").join("%%");
      return str;
    }
    function unesc(str) {
      str = str.split("%~").join("?");
      str = str.split("%%").join("*");
      return str;
    }
  }
});

// ../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/expand.js
var require_expand = __commonJS({
  "../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/lib/expand.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var Glob = require_glob();
    module2.exports = expand;
    function expand(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("micromatch.expand(): argument should be a string.");
      }
      var glob = new Glob(pattern, options || {});
      var opts = glob.options;
      if (!utils.isGlob(pattern)) {
        glob.pattern = glob.pattern.replace(/([\/.])/g, "\\$1");
        return glob;
      }
      glob.pattern = glob.pattern.replace(/(\+)(?!\()/g, "\\$1");
      glob.pattern = glob.pattern.split("$").join("\\$");
      if (typeof opts.braces !== "boolean" && typeof opts.nobraces !== "boolean") {
        opts.braces = true;
      }
      if (glob.pattern === ".*") {
        return {
          pattern: "\\." + star,
          tokens: tok,
          options: opts
        };
      }
      if (glob.pattern === "*") {
        return {
          pattern: oneStar(opts.dot),
          tokens: tok,
          options: opts
        };
      }
      glob.parse();
      var tok = glob.tokens;
      tok.is.negated = opts.negated;
      if ((opts.dotfiles === true || tok.is.dotfile) && opts.dot !== false) {
        opts.dotfiles = true;
        opts.dot = true;
      }
      if ((opts.dotdirs === true || tok.is.dotdir) && opts.dot !== false) {
        opts.dotdirs = true;
        opts.dot = true;
      }
      if (/[{,]\./.test(glob.pattern)) {
        opts.makeRe = false;
        opts.dot = true;
      }
      if (opts.nonegate !== true) {
        opts.negated = glob.negated;
      }
      if (glob.pattern.charAt(0) === "." && glob.pattern.charAt(1) !== "/") {
        glob.pattern = "\\" + glob.pattern;
      }
      glob.track("before braces");
      if (tok.is.braces) {
        glob.braces();
      }
      glob.track("after braces");
      glob.track("before extglob");
      if (tok.is.extglob) {
        glob.extglob();
      }
      glob.track("after extglob");
      glob.track("before brackets");
      if (tok.is.brackets) {
        glob.brackets();
      }
      glob.track("after brackets");
      glob._replace("[!", "[^");
      glob._replace("(?", "(%~");
      glob._replace(/\[\]/, "\\[\\]");
      glob._replace("/[", "/" + (opts.dot ? dotfiles : nodot) + "[", true);
      glob._replace("/?", "/" + (opts.dot ? dotfiles : nodot) + "[^/]", true);
      glob._replace("/.", "/(?=.)\\.", true);
      glob._replace(/^(\w):([\\\/]+?)/gi, "(?=.)$1:$2", true);
      if (glob.pattern.indexOf("[^") !== -1) {
        glob.pattern = negateSlash(glob.pattern);
      }
      if (opts.globstar !== false && glob.pattern === "**") {
        glob.pattern = globstar(opts.dot);
      } else {
        glob.pattern = balance(glob.pattern, "[", "]");
        glob.escape(glob.pattern);
        if (tok.is.globstar) {
          glob.pattern = collapse(glob.pattern, "/**");
          glob.pattern = collapse(glob.pattern, "**/");
          glob._replace("/**/", "(?:/" + globstar(opts.dot) + "/|/)", true);
          glob._replace(/\*{2,}/g, "**");
          glob._replace(/(\w+)\*(?!\/)/g, "$1[^/]*?", true);
          glob._replace(/\*\*\/\*(\w)/g, globstar(opts.dot) + "\\/" + (opts.dot ? dotfiles : nodot) + "[^/]*?$1", true);
          if (opts.dot !== true) {
            glob._replace(/\*\*\/(.)/g, "(?:**\\/|)$1");
          }
          if (tok.path.dirname !== "" || /,\*\*|\*\*,/.test(glob.orig)) {
            glob._replace("**", globstar(opts.dot), true);
          }
        }
        glob._replace(/\/\*$/, "\\/" + oneStar(opts.dot), true);
        glob._replace(/(?!\/)\*$/, star, true);
        glob._replace(/([^\/]+)\*/, "$1" + oneStar(true), true);
        glob._replace("*", oneStar(opts.dot), true);
        glob._replace("?.", "?\\.", true);
        glob._replace("?:", "?:", true);
        glob._replace(/\?+/g, function(match) {
          var len = match.length;
          if (len === 1) {
            return qmark;
          }
          return qmark + "{" + len + "}";
        });
        glob._replace(/\.([*\w]+)/g, "\\.$1");
        glob._replace(/\[\^[\\\/]+\]/g, qmark);
        glob._replace(/\/+/g, "\\/");
        glob._replace(/\\{2,}/g, "\\");
      }
      glob.unescape(glob.pattern);
      glob._replace("__UNESC_STAR__", "*");
      glob._replace("?.", "?\\.");
      glob._replace("[^\\/]", qmark);
      if (glob.pattern.length > 1) {
        if (/^[\[?*]/.test(glob.pattern)) {
          glob.pattern = (opts.dot ? dotfiles : nodot) + glob.pattern;
        }
      }
      return glob;
    }
    function collapse(str, ch) {
      var res = str.split(ch);
      var isFirst = res[0] === "";
      var isLast = res[res.length - 1] === "";
      res = res.filter(Boolean);
      if (isFirst) res.unshift("");
      if (isLast) res.push("");
      return res.join(ch);
    }
    function negateSlash(str) {
      return str.replace(/\[\^([^\]]*?)\]/g, function(match, inner) {
        if (inner.indexOf("/") === -1) {
          inner = "\\/" + inner;
        }
        return "[^" + inner + "]";
      });
    }
    function balance(str, a, b) {
      var aarr = str.split(a);
      var alen = aarr.join("").length;
      var blen = str.split(b).join("").length;
      if (alen !== blen) {
        str = aarr.join("\\" + a);
        return str.split(b).join("\\" + b);
      }
      return str;
    }
    var qmark = "[^/]";
    var star = qmark + "*?";
    var nodot = "(?!\\.)(?=.)";
    var dotfileGlob = "(?:\\/|^)\\.{1,2}($|\\/)";
    var dotfiles = "(?!" + dotfileGlob + ")(?=.)";
    var twoStarDot = "(?:(?!" + dotfileGlob + ").)*?";
    function oneStar(dotfile) {
      return dotfile ? "(?!" + dotfileGlob + ")(?=.)" + star : nodot + star;
    }
    function globstar(dotfile) {
      if (dotfile) {
        return twoStarDot;
      }
      return "(?:(?!(?:\\/|^)\\.).)*?";
    }
  }
});

// ../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  "../../node_modules/.pnpm/micromatch@2.3.11/node_modules/micromatch/index.js"(exports2, module2) {
    "use strict";
    var expand = require_expand();
    var utils = require_utils();
    function micromatch(files, patterns, opts) {
      if (!files || !patterns) return [];
      opts = opts || {};
      if (typeof opts.cache === "undefined") {
        opts.cache = true;
      }
      if (!Array.isArray(patterns)) {
        return match(files, patterns, opts);
      }
      var len = patterns.length, i = 0;
      var omit = [], keep = [];
      while (len--) {
        var glob = patterns[i++];
        if (typeof glob === "string" && glob.charCodeAt(0) === 33) {
          omit.push.apply(omit, match(files, glob.slice(1), opts));
        } else {
          keep.push.apply(keep, match(files, glob, opts));
        }
      }
      return utils.diff(keep, omit);
    }
    function match(files, pattern, opts) {
      if (utils.typeOf(files) !== "string" && !Array.isArray(files)) {
        throw new Error(msg("match", "files", "a string or array"));
      }
      files = utils.arrayify(files);
      opts = opts || {};
      var negate = opts.negate || false;
      var orig = pattern;
      if (typeof pattern === "string") {
        negate = pattern.charAt(0) === "!";
        if (negate) {
          pattern = pattern.slice(1);
        }
        if (opts.nonegate === true) {
          negate = false;
        }
      }
      var _isMatch = matcher(pattern, opts);
      var len = files.length, i = 0;
      var res = [];
      while (i < len) {
        var file = files[i++];
        var fp = utils.unixify(file, opts);
        if (!_isMatch(fp)) {
          continue;
        }
        res.push(fp);
      }
      if (res.length === 0) {
        if (opts.failglob === true) {
          throw new Error('micromatch.match() found no matches for: "' + orig + '".');
        }
        if (opts.nonull || opts.nullglob) {
          res.push(utils.unescapeGlob(orig));
        }
      }
      if (negate) {
        res = utils.diff(files, res);
      }
      if (opts.ignore && opts.ignore.length) {
        pattern = opts.ignore;
        opts = utils.omit(opts, ["ignore"]);
        res = utils.diff(res, micromatch(res, pattern, opts));
      }
      if (opts.nodupes) {
        return utils.unique(res);
      }
      return res;
    }
    function filter(patterns, opts) {
      if (!Array.isArray(patterns) && typeof patterns !== "string") {
        throw new TypeError(msg("filter", "patterns", "a string or array"));
      }
      patterns = utils.arrayify(patterns);
      var len = patterns.length, i = 0;
      var patternMatchers = Array(len);
      while (i < len) {
        patternMatchers[i] = matcher(patterns[i++], opts);
      }
      return function(fp) {
        if (fp == null) return [];
        var len2 = patternMatchers.length, i2 = 0;
        var res = true;
        fp = utils.unixify(fp, opts);
        while (i2 < len2) {
          var fn = patternMatchers[i2++];
          if (!fn(fp)) {
            res = false;
            break;
          }
        }
        return res;
      };
    }
    function isMatch(fp, pattern, opts) {
      if (typeof fp !== "string") {
        throw new TypeError(msg("isMatch", "filepath", "a string"));
      }
      fp = utils.unixify(fp, opts);
      if (utils.typeOf(pattern) === "object") {
        return matcher(fp, pattern);
      }
      return matcher(pattern, opts)(fp);
    }
    function contains(fp, pattern, opts) {
      if (typeof fp !== "string") {
        throw new TypeError(msg("contains", "pattern", "a string"));
      }
      opts = opts || {};
      opts.contains = pattern !== "";
      fp = utils.unixify(fp, opts);
      if (opts.contains && !utils.isGlob(pattern)) {
        return fp.indexOf(pattern) !== -1;
      }
      return matcher(pattern, opts)(fp);
    }
    function any(fp, patterns, opts) {
      if (!Array.isArray(patterns) && typeof patterns !== "string") {
        throw new TypeError(msg("any", "patterns", "a string or array"));
      }
      patterns = utils.arrayify(patterns);
      var len = patterns.length;
      fp = utils.unixify(fp, opts);
      while (len--) {
        var isMatch2 = matcher(patterns[len], opts);
        if (isMatch2(fp)) {
          return true;
        }
      }
      return false;
    }
    function matchKeys(obj, glob, options) {
      if (utils.typeOf(obj) !== "object") {
        throw new TypeError(msg("matchKeys", "first argument", "an object"));
      }
      var fn = matcher(glob, options);
      var res = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && fn(key)) {
          res[key] = obj[key];
        }
      }
      return res;
    }
    function matcher(pattern, opts) {
      if (typeof pattern === "function") {
        return pattern;
      }
      if (pattern instanceof RegExp) {
        return function(fp) {
          return pattern.test(fp);
        };
      }
      if (typeof pattern !== "string") {
        throw new TypeError(msg("matcher", "pattern", "a string, regex, or function"));
      }
      pattern = utils.unixify(pattern, opts);
      if (!utils.isGlob(pattern)) {
        return utils.matchPath(pattern, opts);
      }
      var re = makeRe(pattern, opts);
      if (opts && opts.matchBase) {
        return utils.hasFilename(re, opts);
      }
      return function(fp) {
        fp = utils.unixify(fp, opts);
        return re.test(fp);
      };
    }
    function toRegex(glob, options) {
      var opts = Object.create(options || {});
      var flags = opts.flags || "";
      if (opts.nocase && flags.indexOf("i") === -1) {
        flags += "i";
      }
      var parsed = expand(glob, opts);
      opts.negated = opts.negated || parsed.negated;
      opts.negate = opts.negated;
      glob = wrapGlob(parsed.pattern, opts);
      var re;
      try {
        re = new RegExp(glob, flags);
        return re;
      } catch (err) {
        err.reason = "micromatch invalid regex: (" + re + ")";
        if (opts.strict) throw new SyntaxError(err);
      }
      return /$^/;
    }
    function wrapGlob(glob, opts) {
      var prefix = opts && !opts.contains ? "^" : "";
      var after = opts && !opts.contains ? "$" : "";
      glob = "(?:" + glob + ")" + after;
      if (opts && opts.negate) {
        return prefix + ("(?!^" + glob + ").*$");
      }
      return prefix + glob;
    }
    function makeRe(glob, opts) {
      if (utils.typeOf(glob) !== "string") {
        throw new Error(msg("makeRe", "glob", "a string"));
      }
      return utils.cache(toRegex, glob, opts);
    }
    function msg(method, what, type) {
      return "micromatch." + method + "(): " + what + " should be " + type + ".";
    }
    micromatch.any = any;
    micromatch.braces = micromatch.braceExpand = utils.braces;
    micromatch.contains = contains;
    micromatch.expand = expand;
    micromatch.filter = filter;
    micromatch.isMatch = isMatch;
    micromatch.makeRe = makeRe;
    micromatch.match = match;
    micromatch.matcher = matcher;
    micromatch.matchKeys = matchKeys;
    module2.exports = micromatch;
  }
});

// ../../node_modules/.pnpm/anymatch@1.3.2/node_modules/anymatch/index.js
var require_anymatch = __commonJS({
  "../../node_modules/.pnpm/anymatch@1.3.2/node_modules/anymatch/index.js"(exports2, module2) {
    "use strict";
    var micromatch = require_micromatch();
    var normalize = require_normalize_path();
    var path = require("path");
    var arrify = function(a) {
      return a == null ? [] : Array.isArray(a) ? a : [a];
    };
    var anymatch = function(criteria, value, returnIndex, startIndex, endIndex) {
      criteria = arrify(criteria);
      value = arrify(value);
      if (arguments.length === 1) {
        return anymatch.bind(null, criteria.map(function(criterion) {
          return typeof criterion === "string" && criterion[0] !== "!" ? micromatch.matcher(criterion) : criterion;
        }));
      }
      startIndex = startIndex || 0;
      var string = value[0];
      var altString, altValue;
      var matched = false;
      var matchIndex = -1;
      function testCriteria(criterion, index) {
        var result;
        switch (Object.prototype.toString.call(criterion)) {
          case "[object String]":
            result = string === criterion || altString && altString === criterion;
            result = result || micromatch.isMatch(string, criterion);
            break;
          case "[object RegExp]":
            result = criterion.test(string) || altString && criterion.test(altString);
            break;
          case "[object Function]":
            result = criterion.apply(null, value);
            result = result || altValue && criterion.apply(null, altValue);
            break;
          default:
            result = false;
        }
        if (result) {
          matchIndex = index + startIndex;
        }
        return result;
      }
      var crit = criteria;
      var negGlobs = crit.reduce(function(arr, criterion, index) {
        if (typeof criterion === "string" && criterion[0] === "!") {
          if (crit === criteria) {
            crit = crit.slice();
          }
          crit[index] = null;
          arr.push(criterion.substr(1));
        }
        return arr;
      }, []);
      if (!negGlobs.length || !micromatch.any(string, negGlobs)) {
        if (path.sep === "\\" && typeof string === "string") {
          altString = normalize(string);
          altString = altString === string ? null : altString;
          if (altString) altValue = [altString].concat(value.slice(1));
        }
        matched = crit.slice(startIndex, endIndex).some(testCriteria);
      }
      return returnIndex === true ? matchIndex : matched;
    };
    module2.exports = anymatch;
  }
});

// ../../node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "../../node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js"(exports2, module2) {
    "use strict";
    function posix(path) {
      return path.charAt(0) === "/";
    }
    function win32(path) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module2.exports = process.platform === "win32" ? win32 : posix;
    module2.exports.posix = posix;
    module2.exports.win32 = win32;
  }
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function") throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js"(exports2, module2) {
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
    function patch(fs) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs);
      }
      if (!fs.lutimes) {
        patchLutimes(fs);
      }
      fs.chown = chownFix(fs.chown);
      fs.fchown = chownFix(fs.fchown);
      fs.lchown = chownFix(fs.lchown);
      fs.chmod = chmodFix(fs.chmod);
      fs.fchmod = chmodFix(fs.fchmod);
      fs.lchmod = chmodFix(fs.lchmod);
      fs.chownSync = chownFixSync(fs.chownSync);
      fs.fchownSync = chownFixSync(fs.fchownSync);
      fs.lchownSync = chownFixSync(fs.lchownSync);
      fs.chmodSync = chmodFixSync(fs.chmodSync);
      fs.fchmodSync = chmodFixSync(fs.fchmodSync);
      fs.lchmodSync = chmodFixSync(fs.lchmodSync);
      fs.stat = statFix(fs.stat);
      fs.fstat = statFix(fs.fstat);
      fs.lstat = statFix(fs.lstat);
      fs.statSync = statFixSync(fs.statSync);
      fs.fstatSync = statFixSync(fs.fstatSync);
      fs.lstatSync = statFixSync(fs.lstatSync);
      if (fs.chmod && !fs.lchmod) {
        fs.lchmod = function(path, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchmodSync = function() {
        };
      }
      if (fs.chown && !fs.lchown) {
        fs.lchown = function(path, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs.rename = typeof fs.rename !== "function" ? fs.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs.stat(to, function(stater, st) {
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
        }(fs.rename);
      }
      fs.read = typeof fs.read !== "function" ? fs.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs.read);
      fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : /* @__PURE__ */ function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path, mode, callback) {
          fs2.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback) callback(err);
                return;
              }
              fs2.fchmod(fd, mode, function(err2) {
                fs2.close(fd, function(err22) {
                  if (callback) callback(err2 || err22);
                });
              });
            }
          );
        };
        fs2.lchmodSync = function(path, mode) {
          var fd = fs2.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs2.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs2.futimes) {
          fs2.lutimes = function(path, at, mt, cb) {
            fs2.open(path, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb) cb(er);
                return;
              }
              fs2.futimes(fd, at, mt, function(er2) {
                fs2.close(fd, function(er22) {
                  if (cb) cb(er2 || er22);
                });
              });
            });
          };
          fs2.lutimesSync = function(path, at, mt) {
            var fd = fs2.openSync(path, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs2.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs2.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs2.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs2.futimes) {
          fs2.lutimes = function(_a, _b, _c, cb) {
            if (cb) process.nextTick(cb);
          };
          fs2.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig) return orig;
        return function(target, mode, cb) {
          return orig.call(fs, target, mode, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig) return orig;
        return function(target, mode) {
          try {
            return orig.call(fs, target, mode);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig) return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig) return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid);
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
          return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig) return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
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

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js"(exports2, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs) {
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
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
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
          this._open = fs.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js"(exports2, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js"(exports2, module2) {
    var fs = require("fs");
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
    if (!fs[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs, queue);
      fs.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs, fd, function(err) {
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
      }(fs.close);
      fs.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs[gracefulQueue]);
          require("assert").equal(fs[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs[gracefulQueue]);
    }
    module2.exports = patch(clone(fs));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
      module2.exports = patch(fs);
      fs.__patched = true;
    }
    function patch(fs2) {
      polyfills(fs2);
      fs2.gracefulify = patch;
      fs2.createReadStream = createReadStream;
      fs2.createWriteStream = createWriteStream;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile;
      function readFile(path, options, cb) {
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
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile;
      function writeFile(path, data, options, cb) {
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
      var fs$appendFile = fs2.appendFile;
      if (fs$appendFile)
        fs2.appendFile = appendFile;
      function appendFile(path, data, options, cb) {
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
      var fs$copyFile = fs2.copyFile;
      if (fs$copyFile)
        fs2.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
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
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir;
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
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs2.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs2, "WriteStream", {
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
      Object.defineProperty(fs2, "FileReadStream", {
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
      Object.defineProperty(fs2, "FileWriteStream", {
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
      function createReadStream(path, options) {
        return new fs2.ReadStream(path, options);
      }
      function createWriteStream(path, options) {
        return new fs2.WriteStream(path, options);
      }
      var fs$open = fs2.open;
      fs2.open = open;
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
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs[gracefulQueue].length; ++i) {
        if (fs[gracefulQueue][i].length > 2) {
          fs[gracefulQueue][i][3] = now;
          fs[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs[gracefulQueue].length === 0)
        return;
      var elem = fs[gracefulQueue].shift();
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
          fs[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// ../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/types.js
var require_types = __commonJS({
  "../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/types.js"(exports2, module2) {
    module2.exports = {
      ROOT: 0,
      GROUP: 1,
      POSITION: 2,
      SET: 3,
      RANGE: 4,
      REPETITION: 5,
      REFERENCE: 6,
      CHAR: 7
    };
  }
});

// ../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/sets.js
var require_sets = __commonJS({
  "../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/sets.js"(exports2) {
    var types = require_types();
    var INTS = function() {
      return [{ type: types.RANGE, from: 48, to: 57 }];
    };
    var WORDS = function() {
      return [
        { type: types.CHAR, value: 95 },
        { type: types.RANGE, from: 97, to: 122 },
        { type: types.RANGE, from: 65, to: 90 }
      ].concat(INTS());
    };
    var WHITESPACE = function() {
      return [
        { type: types.CHAR, value: 9 },
        { type: types.CHAR, value: 10 },
        { type: types.CHAR, value: 11 },
        { type: types.CHAR, value: 12 },
        { type: types.CHAR, value: 13 },
        { type: types.CHAR, value: 32 },
        { type: types.CHAR, value: 160 },
        { type: types.CHAR, value: 5760 },
        { type: types.CHAR, value: 6158 },
        { type: types.CHAR, value: 8192 },
        { type: types.CHAR, value: 8193 },
        { type: types.CHAR, value: 8194 },
        { type: types.CHAR, value: 8195 },
        { type: types.CHAR, value: 8196 },
        { type: types.CHAR, value: 8197 },
        { type: types.CHAR, value: 8198 },
        { type: types.CHAR, value: 8199 },
        { type: types.CHAR, value: 8200 },
        { type: types.CHAR, value: 8201 },
        { type: types.CHAR, value: 8202 },
        { type: types.CHAR, value: 8232 },
        { type: types.CHAR, value: 8233 },
        { type: types.CHAR, value: 8239 },
        { type: types.CHAR, value: 8287 },
        { type: types.CHAR, value: 12288 },
        { type: types.CHAR, value: 65279 }
      ];
    };
    var NOTANYCHAR = function() {
      return [
        { type: types.CHAR, value: 10 },
        { type: types.CHAR, value: 13 },
        { type: types.CHAR, value: 8232 },
        { type: types.CHAR, value: 8233 }
      ];
    };
    exports2.words = function() {
      return { type: types.SET, set: WORDS(), not: false };
    };
    exports2.notWords = function() {
      return { type: types.SET, set: WORDS(), not: true };
    };
    exports2.ints = function() {
      return { type: types.SET, set: INTS(), not: false };
    };
    exports2.notInts = function() {
      return { type: types.SET, set: INTS(), not: true };
    };
    exports2.whitespace = function() {
      return { type: types.SET, set: WHITESPACE(), not: false };
    };
    exports2.notWhitespace = function() {
      return { type: types.SET, set: WHITESPACE(), not: true };
    };
    exports2.anyChar = function() {
      return { type: types.SET, set: NOTANYCHAR(), not: true };
    };
  }
});

// ../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/util.js
var require_util = __commonJS({
  "../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/util.js"(exports2) {
    var types = require_types();
    var sets = require_sets();
    var CTRL = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?";
    var SLSH = { "0": 0, "t": 9, "n": 10, "v": 11, "f": 12, "r": 13 };
    exports2.strToChars = function(str) {
      var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
      str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
        if (lbs) {
          return s;
        }
        var code = b ? 8 : a16 ? parseInt(a16, 16) : b16 ? parseInt(b16, 16) : c8 ? parseInt(c8, 8) : dctrl ? CTRL.indexOf(dctrl) : SLSH[eslsh];
        var c = String.fromCharCode(code);
        if (/[\[\]{}\^$.|?*+()]/.test(c)) {
          c = "\\" + c;
        }
        return c;
      });
      return str;
    };
    exports2.tokenizeClass = function(str, regexpStr) {
      var tokens = [];
      var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g;
      var rs, c;
      while ((rs = regexp.exec(str)) != null) {
        if (rs[1]) {
          tokens.push(sets.words());
        } else if (rs[2]) {
          tokens.push(sets.ints());
        } else if (rs[3]) {
          tokens.push(sets.whitespace());
        } else if (rs[4]) {
          tokens.push(sets.notWords());
        } else if (rs[5]) {
          tokens.push(sets.notInts());
        } else if (rs[6]) {
          tokens.push(sets.notWhitespace());
        } else if (rs[7]) {
          tokens.push({
            type: types.RANGE,
            from: (rs[8] || rs[9]).charCodeAt(0),
            to: rs[10].charCodeAt(0)
          });
        } else if (c = rs[12]) {
          tokens.push({
            type: types.CHAR,
            value: c.charCodeAt(0)
          });
        } else {
          return [tokens, regexp.lastIndex];
        }
      }
      exports2.error(regexpStr, "Unterminated character class");
    };
    exports2.error = function(regexp, msg) {
      throw new SyntaxError("Invalid regular expression: /" + regexp + "/: " + msg);
    };
  }
});

// ../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/positions.js
var require_positions = __commonJS({
  "../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/positions.js"(exports2) {
    var types = require_types();
    exports2.wordBoundary = function() {
      return { type: types.POSITION, value: "b" };
    };
    exports2.nonWordBoundary = function() {
      return { type: types.POSITION, value: "B" };
    };
    exports2.begin = function() {
      return { type: types.POSITION, value: "^" };
    };
    exports2.end = function() {
      return { type: types.POSITION, value: "$" };
    };
  }
});

// ../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/.pnpm/ret@0.1.15/node_modules/ret/lib/index.js"(exports2, module2) {
    var util = require_util();
    var types = require_types();
    var sets = require_sets();
    var positions = require_positions();
    module2.exports = function(regexpStr) {
      var i = 0, l, c, start = { type: types.ROOT, stack: [] }, lastGroup = start, last = start.stack, groupStack = [];
      var repeatErr = function(i2) {
        util.error(regexpStr, "Nothing to repeat at column " + (i2 - 1));
      };
      var str = util.strToChars(regexpStr);
      l = str.length;
      while (i < l) {
        c = str[i++];
        switch (c) {
          // Handle escaped characters, inclues a few sets.
          case "\\":
            c = str[i++];
            switch (c) {
              case "b":
                last.push(positions.wordBoundary());
                break;
              case "B":
                last.push(positions.nonWordBoundary());
                break;
              case "w":
                last.push(sets.words());
                break;
              case "W":
                last.push(sets.notWords());
                break;
              case "d":
                last.push(sets.ints());
                break;
              case "D":
                last.push(sets.notInts());
                break;
              case "s":
                last.push(sets.whitespace());
                break;
              case "S":
                last.push(sets.notWhitespace());
                break;
              default:
                if (/\d/.test(c)) {
                  last.push({ type: types.REFERENCE, value: parseInt(c, 10) });
                } else {
                  last.push({ type: types.CHAR, value: c.charCodeAt(0) });
                }
            }
            break;
          // Positionals.
          case "^":
            last.push(positions.begin());
            break;
          case "$":
            last.push(positions.end());
            break;
          // Handle custom sets.
          case "[":
            var not;
            if (str[i] === "^") {
              not = true;
              i++;
            } else {
              not = false;
            }
            var classTokens = util.tokenizeClass(str.slice(i), regexpStr);
            i += classTokens[1];
            last.push({
              type: types.SET,
              set: classTokens[0],
              not
            });
            break;
          // Class of any character except \n.
          case ".":
            last.push(sets.anyChar());
            break;
          // Push group onto stack.
          case "(":
            var group = {
              type: types.GROUP,
              stack: [],
              remember: true
            };
            c = str[i];
            if (c === "?") {
              c = str[i + 1];
              i += 2;
              if (c === "=") {
                group.followedBy = true;
              } else if (c === "!") {
                group.notFollowedBy = true;
              } else if (c !== ":") {
                util.error(
                  regexpStr,
                  "Invalid group, character '" + c + "' after '?' at column " + (i - 1)
                );
              }
              group.remember = false;
            }
            last.push(group);
            groupStack.push(lastGroup);
            lastGroup = group;
            last = group.stack;
            break;
          // Pop group out of stack.
          case ")":
            if (groupStack.length === 0) {
              util.error(regexpStr, "Unmatched ) at column " + (i - 1));
            }
            lastGroup = groupStack.pop();
            last = lastGroup.options ? lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
            break;
          // Use pipe character to give more choices.
          case "|":
            if (!lastGroup.options) {
              lastGroup.options = [lastGroup.stack];
              delete lastGroup.stack;
            }
            var stack = [];
            lastGroup.options.push(stack);
            last = stack;
            break;
          // Repetition.
          // For every repetition, remove last element from last stack
          // then insert back a RANGE object.
          // This design is chosen because there could be more than
          // one repetition symbols in a regex i.e. `a?+{2,3}`.
          case "{":
            var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
            if (rs !== null) {
              if (last.length === 0) {
                repeatErr(i);
              }
              min = parseInt(rs[1], 10);
              max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
              i += rs[0].length;
              last.push({
                type: types.REPETITION,
                min,
                max,
                value: last.pop()
              });
            } else {
              last.push({
                type: types.CHAR,
                value: 123
              });
            }
            break;
          case "?":
            if (last.length === 0) {
              repeatErr(i);
            }
            last.push({
              type: types.REPETITION,
              min: 0,
              max: 1,
              value: last.pop()
            });
            break;
          case "+":
            if (last.length === 0) {
              repeatErr(i);
            }
            last.push({
              type: types.REPETITION,
              min: 1,
              max: Infinity,
              value: last.pop()
            });
            break;
          case "*":
            if (last.length === 0) {
              repeatErr(i);
            }
            last.push({
              type: types.REPETITION,
              min: 0,
              max: Infinity,
              value: last.pop()
            });
            break;
          // Default is a character that is not `\[](){}?+*^$`.
          default:
            last.push({
              type: types.CHAR,
              value: c.charCodeAt(0)
            });
        }
      }
      if (groupStack.length !== 0) {
        util.error(regexpStr, "Unterminated group");
      }
      return start;
    };
    module2.exports.types = types;
  }
});

// ../../node_modules/.pnpm/safe-regex@1.1.0/node_modules/safe-regex/index.js
var require_safe_regex = __commonJS({
  "../../node_modules/.pnpm/safe-regex@1.1.0/node_modules/safe-regex/index.js"(exports2, module2) {
    var parse = require_lib2();
    var types = parse.types;
    module2.exports = function(re, opts) {
      if (!opts) opts = {};
      var replimit = opts.limit === void 0 ? 25 : opts.limit;
      if (isRegExp(re)) re = re.source;
      else if (typeof re !== "string") re = String(re);
      try {
        re = parse(re);
      } catch (err) {
        return false;
      }
      var reps = 0;
      return function walk(node, starHeight) {
        if (node.type === types.REPETITION) {
          starHeight++;
          reps++;
          if (starHeight > 1) return false;
          if (reps > replimit) return false;
        }
        if (node.options) {
          for (var i = 0, len = node.options.length; i < len; i++) {
            var ok = walk({ stack: node.options[i] }, starHeight);
            if (!ok) return false;
          }
        }
        var stack = node.stack || node.value && node.value.stack;
        if (!stack) return true;
        for (var i = 0; i < stack.length; i++) {
          var ok = walk(stack[i], starHeight);
          if (!ok) return false;
        }
        return true;
      }(re, 0);
    };
    function isRegExp(x) {
      return {}.toString.call(x) === "[object RegExp]";
    }
  }
});

// ../../node_modules/.pnpm/isobject@3.0.1/node_modules/isobject/index.js
var require_isobject2 = __commonJS({
  "../../node_modules/.pnpm/isobject@3.0.1/node_modules/isobject/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isObject(val) {
      return val != null && typeof val === "object" && Array.isArray(val) === false;
    };
  }
});

// ../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// ../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// ../../node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js
var require_hasown = __commonJS({
  "../../node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// ../../node_modules/.pnpm/is-accessor-descriptor@1.0.1/node_modules/is-accessor-descriptor/index.js
var require_is_accessor_descriptor = __commonJS({
  "../../node_modules/.pnpm/is-accessor-descriptor@1.0.1/node_modules/is-accessor-descriptor/index.js"(exports2, module2) {
    "use strict";
    var hasOwn = require_hasown();
    var accessor = {
      __proto__: null,
      configurable: "boolean",
      enumerable: "boolean",
      get: "function",
      set: "function"
    };
    module2.exports = function isAccessorDescriptor(obj, prop) {
      if (typeof prop === "string") {
        var val = Object.getOwnPropertyDescriptor(obj, prop);
        return typeof val !== "undefined";
      }
      if (!obj || typeof obj !== "object") {
        return false;
      }
      if (hasOwn(obj, "value") || hasOwn(obj, "writable")) {
        return false;
      }
      if ((!hasOwn(obj, "get") || typeof obj.get !== "function") && (!hasOwn(obj, "set") || typeof obj.set !== "function")) {
        return false;
      }
      if (hasOwn(obj, "get") && typeof obj.get !== "function" && typeof obj.get !== "undefined" || hasOwn(obj, "set") && typeof obj.set !== "function" && typeof obj.set !== "undefined") {
        return false;
      }
      for (var key in obj) {
        if (hasOwn(obj, key) && hasOwn(accessor, key) && typeof obj[key] !== accessor[key] && typeof obj[key] !== "undefined") {
          return false;
        }
      }
      return true;
    };
  }
});

// ../../node_modules/.pnpm/is-data-descriptor@1.0.1/node_modules/is-data-descriptor/index.js
var require_is_data_descriptor = __commonJS({
  "../../node_modules/.pnpm/is-data-descriptor@1.0.1/node_modules/is-data-descriptor/index.js"(exports2, module2) {
    "use strict";
    var hasOwn = require_hasown();
    var data = {
      __proto__: null,
      configurable: "boolean",
      enumerable: "boolean",
      writable: "boolean"
    };
    module2.exports = function isDataDescriptor(obj, prop) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      if (typeof prop === "string") {
        var val = Object.getOwnPropertyDescriptor(obj, prop);
        return typeof val !== "undefined";
      }
      if (!("value" in obj) && !("writable" in obj) || "get" in obj || "set" in obj) {
        return false;
      }
      for (var key in obj) {
        if (key !== "value" && hasOwn(obj, key) && hasOwn(data, key) && typeof obj[key] !== data[key] && typeof obj[key] !== "undefined") {
          return false;
        }
      }
      return true;
    };
  }
});

// ../../node_modules/.pnpm/is-descriptor@1.0.3/node_modules/is-descriptor/index.js
var require_is_descriptor = __commonJS({
  "../../node_modules/.pnpm/is-descriptor@1.0.3/node_modules/is-descriptor/index.js"(exports2, module2) {
    "use strict";
    var isAccessor = require_is_accessor_descriptor();
    var isData = require_is_data_descriptor();
    module2.exports = function isDescriptor(obj, key) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        return false;
      }
      if ("get" in obj || "set" in obj) {
        return isAccessor(obj, key);
      }
      return isData(obj, key);
    };
  }
});

// ../../node_modules/.pnpm/define-property@2.0.2/node_modules/define-property/index.js
var require_define_property = __commonJS({
  "../../node_modules/.pnpm/define-property@2.0.2/node_modules/define-property/index.js"(exports2, module2) {
    "use strict";
    var isobject = require_isobject2();
    var isDescriptor = require_is_descriptor();
    var define2 = typeof Reflect !== "undefined" && Reflect.defineProperty ? Reflect.defineProperty : Object.defineProperty;
    module2.exports = function defineProperty(obj, key, val) {
      if (!isobject(obj) && typeof obj !== "function" && !Array.isArray(obj)) {
        throw new TypeError("expected an object, function, or array");
      }
      if (typeof key !== "string") {
        throw new TypeError('expected "key" to be a string');
      }
      if (isDescriptor(val)) {
        define2(obj, key, val);
        return obj;
      }
      define2(obj, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: val
      });
      return obj;
    };
  }
});

// ../../node_modules/.pnpm/is-plain-object@2.0.4/node_modules/is-plain-object/index.js
var require_is_plain_object = __commonJS({
  "../../node_modules/.pnpm/is-plain-object@2.0.4/node_modules/is-plain-object/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject2();
    function isObjectObject(o) {
      return isObject(o) === true && Object.prototype.toString.call(o) === "[object Object]";
    }
    module2.exports = function isPlainObject(o) {
      var ctor, prot;
      if (isObjectObject(o) === false) return false;
      ctor = o.constructor;
      if (typeof ctor !== "function") return false;
      prot = ctor.prototype;
      if (isObjectObject(prot) === false) return false;
      if (prot.hasOwnProperty("isPrototypeOf") === false) {
        return false;
      }
      return true;
    };
  }
});

// ../../node_modules/.pnpm/is-extendable@1.0.1/node_modules/is-extendable/index.js
var require_is_extendable2 = __commonJS({
  "../../node_modules/.pnpm/is-extendable@1.0.1/node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    var isPlainObject = require_is_plain_object();
    module2.exports = function isExtendable(val) {
      return isPlainObject(val) || typeof val === "function" || Array.isArray(val);
    };
  }
});

// ../../node_modules/.pnpm/assign-symbols@1.0.0/node_modules/assign-symbols/index.js
var require_assign_symbols = __commonJS({
  "../../node_modules/.pnpm/assign-symbols@1.0.0/node_modules/assign-symbols/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(receiver, objects) {
      if (receiver === null || typeof receiver === "undefined") {
        throw new TypeError("expected first argument to be an object.");
      }
      if (typeof objects === "undefined" || typeof Symbol === "undefined") {
        return receiver;
      }
      if (typeof Object.getOwnPropertySymbols !== "function") {
        return receiver;
      }
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var target = Object(receiver);
      var len = arguments.length, i = 0;
      while (++i < len) {
        var provider = Object(arguments[i]);
        var names = Object.getOwnPropertySymbols(provider);
        for (var j = 0; j < names.length; j++) {
          var key = names[j];
          if (isEnumerable.call(provider, key)) {
            target[key] = provider[key];
          }
        }
      }
      return target;
    };
  }
});

// ../../node_modules/.pnpm/extend-shallow@3.0.2/node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "../../node_modules/.pnpm/extend-shallow@3.0.2/node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isExtendable = require_is_extendable2();
    var assignSymbols = require_assign_symbols();
    module2.exports = Object.assign || function(obj) {
      if (obj === null || typeof obj === "undefined") {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      if (!isObject(obj)) {
        obj = {};
      }
      for (var i = 1; i < arguments.length; i++) {
        var val = arguments[i];
        if (isString(val)) {
          val = toObject(val);
        }
        if (isObject(val)) {
          assign(obj, val);
          assignSymbols(obj, val);
        }
      }
      return obj;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function isString(val) {
      return val && typeof val === "string";
    }
    function toObject(str) {
      var obj = {};
      for (var i in str) {
        obj[i] = str[i];
      }
      return obj;
    }
    function isObject(val) {
      return val && typeof val === "object" || isExtendable(val);
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// ../../node_modules/.pnpm/regex-not@1.0.2/node_modules/regex-not/index.js
var require_regex_not = __commonJS({
  "../../node_modules/.pnpm/regex-not@1.0.2/node_modules/regex-not/index.js"(exports2, module2) {
    "use strict";
    var extend = require_extend_shallow();
    var safe = require_safe_regex();
    function toRegex(pattern, options) {
      return new RegExp(toRegex.create(pattern, options));
    }
    toRegex.create = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected a string");
      }
      var opts = extend({}, options);
      if (opts.contains === true) {
        opts.strictNegate = false;
      }
      var open = opts.strictOpen !== false ? "^" : "";
      var close = opts.strictClose !== false ? "$" : "";
      var endChar = opts.endChar ? opts.endChar : "+";
      var str = pattern;
      if (opts.strictNegate === false) {
        str = "(?:(?!(?:" + pattern + ")).)" + endChar;
      } else {
        str = "(?:(?!^(?:" + pattern + ")$).)" + endChar;
      }
      var res = open + str + close;
      if (opts.safe === true && safe(res) === false) {
        throw new Error("potentially unsafe regular expression: " + res);
      }
      return res;
    };
    module2.exports = toRegex;
  }
});

// ../../node_modules/.pnpm/to-regex@3.0.2/node_modules/to-regex/index.js
var require_to_regex = __commonJS({
  "../../node_modules/.pnpm/to-regex@3.0.2/node_modules/to-regex/index.js"(exports2, module2) {
    "use strict";
    var safe = require_safe_regex();
    var define2 = require_define_property();
    var extend = require_extend_shallow();
    var not = require_regex_not();
    var MAX_LENGTH = 1024 * 64;
    var cache = {};
    module2.exports = function(patterns, options) {
      if (!Array.isArray(patterns)) {
        return makeRe(patterns, options);
      }
      return makeRe(patterns.join("|"), options);
    };
    function makeRe(pattern, options) {
      if (pattern instanceof RegExp) {
        return pattern;
      }
      if (typeof pattern !== "string") {
        throw new TypeError("expected a string");
      }
      if (pattern.length > MAX_LENGTH) {
        throw new Error("expected pattern to be less than " + MAX_LENGTH + " characters");
      }
      var key = pattern;
      if (!options || options && options.cache !== false) {
        key = createKey(pattern, options);
        if (cache.hasOwnProperty(key)) {
          return cache[key];
        }
      }
      var opts = extend({}, options);
      if (opts.contains === true) {
        if (opts.negate === true) {
          opts.strictNegate = false;
        } else {
          opts.strict = false;
        }
      }
      if (opts.strict === false) {
        opts.strictOpen = false;
        opts.strictClose = false;
      }
      var open = opts.strictOpen !== false ? "^" : "";
      var close = opts.strictClose !== false ? "$" : "";
      var flags = opts.flags || "";
      var regex;
      if (opts.nocase === true && !/i/.test(flags)) {
        flags += "i";
      }
      try {
        if (opts.negate || typeof opts.strictNegate === "boolean") {
          pattern = not.create(pattern, opts);
        }
        var str = open + "(?:" + pattern + ")" + close;
        regex = new RegExp(str, flags);
        if (opts.safe === true && safe(regex) === false) {
          throw new Error("potentially unsafe regular expression: " + regex.source);
        }
      } catch (err) {
        if (opts.strictErrors === true || opts.safe === true) {
          err.key = key;
          err.pattern = pattern;
          err.originalOptions = options;
          err.createdOptions = opts;
          throw err;
        }
        try {
          regex = new RegExp("^" + pattern.replace(/(\W)/g, "\\$1") + "$");
        } catch (err2) {
          regex = /.^/;
        }
      }
      if (opts.cache !== false) {
        memoize(regex, key, pattern, opts);
      }
      return regex;
    }
    function memoize(regex, key, pattern, options) {
      define2(regex, "cached", true);
      define2(regex, "pattern", pattern);
      define2(regex, "options", options);
      define2(regex, "key", key);
      cache[key] = regex;
    }
    function createKey(pattern, options) {
      if (!options) return pattern;
      var key = pattern;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          key += ";" + prop + "=" + String(options[prop]);
        }
      }
      return key;
    }
    module2.exports.makeRe = makeRe;
  }
});

// ../../node_modules/.pnpm/array-unique@0.3.2/node_modules/array-unique/index.js
var require_array_unique2 = __commonJS({
  "../../node_modules/.pnpm/array-unique@0.3.2/node_modules/array-unique/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function unique(arr) {
      if (!Array.isArray(arr)) {
        throw new TypeError("array-unique expects an array.");
      }
      var len = arr.length;
      var i = -1;
      while (i++ < len) {
        var j = i + 1;
        for (; j < arr.length; ++j) {
          if (arr[i] === arr[j]) {
            arr.splice(j--, 1);
          }
        }
      }
      return arr;
    };
    module2.exports.immutable = function uniqueImmutable(arr) {
      if (!Array.isArray(arr)) {
        throw new TypeError("array-unique expects an array.");
      }
      var arrLen = arr.length;
      var newArr = new Array(arrLen);
      for (var i = 0; i < arrLen; i++) {
        newArr[i] = arr[i];
      }
      return module2.exports(newArr);
    };
  }
});

// ../../node_modules/.pnpm/extend-shallow@2.0.1/node_modules/extend-shallow/index.js
var require_extend_shallow2 = __commonJS({
  "../../node_modules/.pnpm/extend-shallow@2.0.1/node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o) {
      if (!isObject(o)) {
        o = {};
      }
      var len = arguments.length;
      for (var i = 1; i < len; i++) {
        var obj = arguments[i];
        if (isObject(obj)) {
          assign(o, obj);
        }
      }
      return o;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// ../../node_modules/.pnpm/split-string@3.1.0/node_modules/split-string/index.js
var require_split_string = __commonJS({
  "../../node_modules/.pnpm/split-string@3.1.0/node_modules/split-string/index.js"(exports2, module2) {
    "use strict";
    var extend = require_extend_shallow();
    module2.exports = function(str, options, fn) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (typeof options === "function") {
        fn = options;
        options = null;
      }
      if (typeof options === "string") {
        options = { sep: options };
      }
      var opts = extend({ sep: "." }, options);
      var quotes = opts.quotes || ['"', "'", "`"];
      var brackets;
      if (opts.brackets === true) {
        brackets = {
          "<": ">",
          "(": ")",
          "[": "]",
          "{": "}"
        };
      } else if (opts.brackets) {
        brackets = opts.brackets;
      }
      var tokens = [];
      var stack = [];
      var arr = [""];
      var sep = opts.sep;
      var len = str.length;
      var idx = -1;
      var closeIdx;
      function expected() {
        if (brackets && stack.length) {
          return brackets[stack[stack.length - 1]];
        }
      }
      while (++idx < len) {
        var ch = str[idx];
        var next = str[idx + 1];
        var tok = { val: ch, idx, arr, str };
        tokens.push(tok);
        if (ch === "\\") {
          tok.val = keepEscaping(opts, str, idx) === true ? ch + next : next;
          tok.escaped = true;
          if (typeof fn === "function") {
            fn(tok);
          }
          arr[arr.length - 1] += tok.val;
          idx++;
          continue;
        }
        if (brackets && brackets[ch]) {
          stack.push(ch);
          var e = expected();
          var i = idx + 1;
          if (str.indexOf(e, i + 1) !== -1) {
            while (stack.length && i < len) {
              var s = str[++i];
              if (s === "\\") {
                s++;
                continue;
              }
              if (quotes.indexOf(s) !== -1) {
                i = getClosingQuote(str, s, i + 1);
                continue;
              }
              e = expected();
              if (stack.length && str.indexOf(e, i + 1) === -1) {
                break;
              }
              if (brackets[s]) {
                stack.push(s);
                continue;
              }
              if (e === s) {
                stack.pop();
              }
            }
          }
          closeIdx = i;
          if (closeIdx === -1) {
            arr[arr.length - 1] += ch;
            continue;
          }
          ch = str.slice(idx, closeIdx + 1);
          tok.val = ch;
          tok.idx = idx = closeIdx;
        }
        if (quotes.indexOf(ch) !== -1) {
          closeIdx = getClosingQuote(str, ch, idx + 1);
          if (closeIdx === -1) {
            arr[arr.length - 1] += ch;
            continue;
          }
          if (keepQuotes(ch, opts) === true) {
            ch = str.slice(idx, closeIdx + 1);
          } else {
            ch = str.slice(idx + 1, closeIdx);
          }
          tok.val = ch;
          tok.idx = idx = closeIdx;
        }
        if (typeof fn === "function") {
          fn(tok, tokens);
          ch = tok.val;
          idx = tok.idx;
        }
        if (tok.val === sep && tok.split !== false) {
          arr.push("");
          continue;
        }
        arr[arr.length - 1] += tok.val;
      }
      return arr;
    };
    function getClosingQuote(str, ch, i, brackets) {
      var idx = str.indexOf(ch, i);
      if (str.charAt(idx - 1) === "\\") {
        return getClosingQuote(str, ch, idx + 1);
      }
      return idx;
    }
    function keepQuotes(ch, opts) {
      if (opts.keepDoubleQuotes === true && ch === '"') return true;
      if (opts.keepSingleQuotes === true && ch === "'") return true;
      return opts.keepQuotes;
    }
    function keepEscaping(opts, str, idx) {
      if (typeof opts.keepEscaping === "function") {
        return opts.keepEscaping(str, idx);
      }
      return opts.keepEscaping === true || str[idx + 1] === "\\";
    }
  }
});

// ../../node_modules/.pnpm/is-number@3.0.0/node_modules/is-number/index.js
var require_is_number3 = __commonJS({
  "../../node_modules/.pnpm/is-number@3.0.0/node_modules/is-number/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    module2.exports = function isNumber(num) {
      var type = typeOf(num);
      if (type === "string") {
        if (!num.trim()) return false;
      } else if (type !== "number") {
        return false;
      }
      return num - num + 1 >= 0;
    };
  }
});

// ../../node_modules/.pnpm/to-regex-range@2.1.1/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "../../node_modules/.pnpm/to-regex-range@2.1.1/node_modules/to-regex-range/index.js"(exports2, module2) {
    "use strict";
    var repeat = require_repeat_string();
    var isNumber = require_is_number3();
    var cache = {};
    function toRegexRange(min, max, options) {
      if (isNumber(min) === false) {
        throw new RangeError("toRegexRange: first argument is invalid.");
      }
      if (typeof max === "undefined" || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
        throw new RangeError("toRegexRange: second argument is invalid.");
      }
      options = options || {};
      var relax = String(options.relaxZeros);
      var shorthand = String(options.shorthand);
      var capture = String(options.capture);
      var key = min + ":" + max + "=" + relax + shorthand + capture;
      if (cache.hasOwnProperty(key)) {
        return cache[key].result;
      }
      var a = Math.min(min, max);
      var b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        var result = min + "|" + max;
        if (options.capture) {
          return "(" + result + ")";
        }
        return result;
      }
      var isPadded = padding(min) || padding(max);
      var positives = [];
      var negatives = [];
      var tok = { min, max, a, b };
      if (isPadded) {
        tok.isPadded = isPadded;
        tok.maxLen = String(tok.max).length;
      }
      if (a < 0) {
        var newMin = b < 0 ? Math.abs(b) : 1;
        var newMax = Math.abs(a);
        negatives = splitToPatterns(newMin, newMax, tok, options);
        a = tok.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, tok, options);
      }
      tok.negatives = negatives;
      tok.positives = positives;
      tok.result = siftPatterns(negatives, positives, options);
      if (options.capture && positives.length + negatives.length > 1) {
        tok.result = "(" + tok.result + ")";
      }
      cache[key] = tok;
      return tok.result;
    }
    function siftPatterns(neg, pos, options) {
      var onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      var onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      var intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      var subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      min = Number(min);
      max = Number(max);
      var nines = 1;
      var stops = [max];
      var stop = +countNines(min, nines);
      while (min <= stop && stop <= max) {
        stops = push(stops, stop);
        nines += 1;
        stop = +countNines(min, nines);
      }
      var zeros = 1;
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops = push(stops, stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: String(start), digits: [] };
      }
      var zipped = zip(String(start), String(stop));
      var len = zipped.length, i = -1;
      var pattern = "";
      var digits = 0;
      while (++i < len) {
        var numbers = zipped[i];
        var startDigit = numbers[0];
        var stopDigit = numbers[1];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit);
        } else {
          digits += 1;
        }
      }
      if (digits) {
        pattern += options.shorthand ? "\\d" : "[0-9]";
      }
      return { pattern, digits: [digits] };
    }
    function splitToPatterns(min, max, tok, options) {
      var ranges = splitToRanges(min, max);
      var len = ranges.length;
      var idx = -1;
      var tokens = [];
      var start = min;
      var prev;
      while (++idx < len) {
        var range = ranges[idx];
        var obj = rangeToPattern(start, range, options);
        var zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.digits.length > 1) {
            prev.digits.pop();
          }
          prev.digits.push(obj.digits[0]);
          prev.string = prev.pattern + toQuantifier(prev.digits);
          start = range + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(range, tok);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.digits);
        tokens.push(obj);
        start = range + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      var res = [];
      for (var i = 0; i < arr.length; i++) {
        var tok = arr[i];
        var ele = tok.string;
        if (options.relaxZeros !== false) {
          if (prefix === "-" && ele.charAt(0) === "0") {
            if (ele.charAt(1) === "{") {
              ele = "0*" + ele.replace(/^0\{\d+\}/, "");
            } else {
              ele = "0*" + ele.slice(1);
            }
          }
        }
        if (!intersection && !contains(comparison, "string", ele)) {
          res.push(prefix + ele);
        }
        if (intersection && contains(comparison, "string", ele)) {
          res.push(prefix + ele);
        }
      }
      return res;
    }
    function zip(a, b) {
      var arr = [];
      for (var ch in a) arr.push([a[ch], b[ch]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function push(arr, ele) {
      if (arr.indexOf(ele) === -1) arr.push(ele);
      return arr;
    }
    function contains(arr, key, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) {
          return true;
        }
      }
      return false;
    }
    function countNines(min, len) {
      return String(min).slice(0, -len) + repeat("9", len);
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      var start = digits[0];
      var stop = digits[1] ? "," + digits[1] : "";
      if (!stop && (!start || start === 1)) {
        return "";
      }
      return "{" + start + stop + "}";
    }
    function toCharacterClass(a, b) {
      return "[" + a + (b - a === 1 ? "" : "-") + b + "]";
    }
    function padding(str) {
      return /^-?(0+)\d/.exec(str);
    }
    function padZeros(val, tok) {
      if (tok.isPadded) {
        var diff = Math.abs(tok.maxLen - String(val).length);
        switch (diff) {
          case 0:
            return "";
          case 1:
            return "0";
          default: {
            return "0{" + diff + "}";
          }
        }
      }
      return val;
    }
    module2.exports = toRegexRange;
  }
});

// ../../node_modules/.pnpm/fill-range@4.0.0/node_modules/fill-range/index.js
var require_fill_range2 = __commonJS({
  "../../node_modules/.pnpm/fill-range@4.0.0/node_modules/fill-range/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var isNumber = require_is_number3();
    var extend = require_extend_shallow2();
    var repeat = require_repeat_string();
    var toRegex = require_to_regex_range();
    function fillRange(start, stop, step, options) {
      if (typeof start === "undefined") {
        return [];
      }
      if (typeof stop === "undefined" || start === stop) {
        var isString = typeof start === "string";
        if (isNumber(start) && !toNumber(start)) {
          return [isString ? "0" : 0];
        }
        return [start];
      }
      if (typeof step !== "number" && typeof step !== "string") {
        options = step;
        step = void 0;
      }
      if (typeof options === "function") {
        options = { transform: options };
      }
      var opts = extend({ step }, options);
      if (opts.step && !isValidNumber(opts.step)) {
        if (opts.strictRanges === true) {
          throw new TypeError("expected options.step to be a number");
        }
        return [];
      }
      opts.isNumber = isValidNumber(start) && isValidNumber(stop);
      if (!opts.isNumber && !isValid(start, stop)) {
        if (opts.strictRanges === true) {
          throw new RangeError("invalid range arguments: " + util.inspect([start, stop]));
        }
        return [];
      }
      opts.isPadded = isPadded(start) || isPadded(stop);
      opts.toString = opts.stringify || typeof opts.step === "string" || typeof start === "string" || typeof stop === "string" || !opts.isNumber;
      if (opts.isPadded) {
        opts.maxLength = Math.max(String(start).length, String(stop).length);
      }
      if (typeof opts.optimize === "boolean") opts.toRegex = opts.optimize;
      if (typeof opts.makeRe === "boolean") opts.toRegex = opts.makeRe;
      return expand(start, stop, opts);
    }
    function expand(start, stop, options) {
      var a = options.isNumber ? toNumber(start) : start.charCodeAt(0);
      var b = options.isNumber ? toNumber(stop) : stop.charCodeAt(0);
      var step = Math.abs(toNumber(options.step)) || 1;
      if (options.toRegex && step === 1) {
        return toRange(a, b, start, stop, options);
      }
      var zero = { greater: [], lesser: [] };
      var asc = a < b;
      var arr = new Array(Math.round((asc ? b - a : a - b) / step));
      var idx = 0;
      while (asc ? a <= b : a >= b) {
        var val = options.isNumber ? a : String.fromCharCode(a);
        if (options.toRegex && (val >= 0 || !options.isNumber)) {
          zero.greater.push(val);
        } else {
          zero.lesser.push(Math.abs(val));
        }
        if (options.isPadded) {
          val = zeros(val, options);
        }
        if (options.toString) {
          val = String(val);
        }
        if (typeof options.transform === "function") {
          arr[idx++] = options.transform(val, a, b, step, idx, arr, options);
        } else {
          arr[idx++] = val;
        }
        if (asc) {
          a += step;
        } else {
          a -= step;
        }
      }
      if (options.toRegex === true) {
        return toSequence(arr, zero, options);
      }
      return arr;
    }
    function toRange(a, b, start, stop, options) {
      if (options.isPadded) {
        return toRegex(start, stop, options);
      }
      if (options.isNumber) {
        return toRegex(Math.min(a, b), Math.max(a, b), options);
      }
      var start = String.fromCharCode(Math.min(a, b));
      var stop = String.fromCharCode(Math.max(a, b));
      return "[" + start + "-" + stop + "]";
    }
    function toSequence(arr, zeros2, options) {
      var greater = "", lesser = "";
      if (zeros2.greater.length) {
        greater = zeros2.greater.join("|");
      }
      if (zeros2.lesser.length) {
        lesser = "-(" + zeros2.lesser.join("|") + ")";
      }
      var res = greater && lesser ? greater + "|" + lesser : greater || lesser;
      if (options.capture) {
        return "(" + res + ")";
      }
      return res;
    }
    function zeros(val, options) {
      if (options.isPadded) {
        var str = String(val);
        var len = str.length;
        var dash = "";
        if (str.charAt(0) === "-") {
          dash = "-";
          str = str.slice(1);
        }
        var diff = options.maxLength - len;
        var pad = repeat("0", diff);
        val = dash + pad + str;
      }
      if (options.stringify) {
        return String(val);
      }
      return val;
    }
    function toNumber(val) {
      return Number(val) || 0;
    }
    function isPadded(str) {
      return /^-?0\d/.test(str);
    }
    function isValid(min, max) {
      return (isValidNumber(min) || isValidLetter(min)) && (isValidNumber(max) || isValidLetter(max));
    }
    function isValidLetter(ch) {
      return typeof ch === "string" && ch.length === 1 && /^\w+$/.test(ch);
    }
    function isValidNumber(n) {
      return isNumber(n) && !/\./.test(n);
    }
    module2.exports = fillRange;
  }
});

// ../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/utils.js"(exports2, module2) {
    "use strict";
    var splitString = require_split_string();
    var utils = module2.exports;
    utils.extend = require_extend_shallow2();
    utils.flatten = require_arr_flatten();
    utils.isObject = require_isobject2();
    utils.fillRange = require_fill_range2();
    utils.repeat = require_repeat_element();
    utils.unique = require_array_unique2();
    utils.define = function(obj, key, val) {
      Object.defineProperty(obj, key, {
        writable: true,
        configurable: true,
        enumerable: false,
        value: val
      });
    };
    utils.isEmptySets = function(str) {
      return /^(?:\{,\})+$/.test(str);
    };
    utils.isQuotedString = function(str) {
      var open = str.charAt(0);
      if (open === "'" || open === '"' || open === "`") {
        return str.slice(-1) === open;
      }
      return false;
    };
    utils.createKey = function(pattern, options) {
      var id = pattern;
      if (typeof options === "undefined") {
        return id;
      }
      var keys = Object.keys(options);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        id += ";" + key + "=" + String(options[key]);
      }
      return id;
    };
    utils.createOptions = function(options) {
      var opts = utils.extend.apply(null, arguments);
      if (typeof opts.expand === "boolean") {
        opts.optimize = !opts.expand;
      }
      if (typeof opts.optimize === "boolean") {
        opts.expand = !opts.optimize;
      }
      if (opts.optimize === true) {
        opts.makeRe = true;
      }
      return opts;
    };
    utils.join = function(a, b, options) {
      options = options || {};
      a = utils.arrayify(a);
      b = utils.arrayify(b);
      if (!a.length) return b;
      if (!b.length) return a;
      var len = a.length;
      var idx = -1;
      var arr = [];
      while (++idx < len) {
        var val = a[idx];
        if (Array.isArray(val)) {
          for (var i = 0; i < val.length; i++) {
            val[i] = utils.join(val[i], b, options);
          }
          arr.push(val);
          continue;
        }
        for (var j = 0; j < b.length; j++) {
          var bval = b[j];
          if (Array.isArray(bval)) {
            arr.push(utils.join(val, bval, options));
          } else {
            arr.push(val + bval);
          }
        }
      }
      return arr;
    };
    utils.split = function(str, options) {
      var opts = utils.extend({ sep: "," }, options);
      if (typeof opts.keepQuotes !== "boolean") {
        opts.keepQuotes = true;
      }
      if (opts.unescape === false) {
        opts.keepEscaping = true;
      }
      return splitString(str, opts, utils.escapeBrackets(opts));
    };
    utils.expand = function(str, options) {
      var opts = utils.extend({ rangeLimit: 1e4 }, options);
      var segs = utils.split(str, opts);
      var tok = { segs };
      if (utils.isQuotedString(str)) {
        return tok;
      }
      if (opts.rangeLimit === true) {
        opts.rangeLimit = 1e4;
      }
      if (segs.length > 1) {
        if (opts.optimize === false) {
          tok.val = segs[0];
          return tok;
        }
        tok.segs = utils.stringifyArray(tok.segs);
      } else if (segs.length === 1) {
        var arr = str.split("..");
        if (arr.length === 1) {
          tok.val = tok.segs[tok.segs.length - 1] || tok.val || str;
          tok.segs = [];
          return tok;
        }
        if (arr.length === 2 && arr[0] === arr[1]) {
          tok.escaped = true;
          tok.val = arr[0];
          tok.segs = [];
          return tok;
        }
        if (arr.length > 1) {
          if (opts.optimize !== false) {
            opts.optimize = true;
            delete opts.expand;
          }
          if (opts.optimize !== true) {
            var min = Math.min(arr[0], arr[1]);
            var max = Math.max(arr[0], arr[1]);
            var step = arr[2] || 1;
            if (opts.rangeLimit !== false && (max - min) / step >= opts.rangeLimit) {
              throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
            }
          }
          arr.push(opts);
          tok.segs = utils.fillRange.apply(null, arr);
          if (!tok.segs.length) {
            tok.escaped = true;
            tok.val = str;
            return tok;
          }
          if (opts.optimize === true) {
            tok.segs = utils.stringifyArray(tok.segs);
          }
          if (tok.segs === "") {
            tok.val = str;
          } else {
            tok.val = tok.segs[0];
          }
          return tok;
        }
      } else {
        tok.val = str;
      }
      return tok;
    };
    utils.escapeBrackets = function(options) {
      return function(tok) {
        if (tok.escaped && tok.val === "b") {
          tok.val = "\\b";
          return;
        }
        if (tok.val !== "(" && tok.val !== "[") return;
        var opts = utils.extend({}, options);
        var brackets = [];
        var parens = [];
        var stack = [];
        var val = tok.val;
        var str = tok.str;
        var i = tok.idx - 1;
        while (++i < str.length) {
          var ch = str[i];
          if (ch === "\\") {
            val += (opts.keepEscaping === false ? "" : ch) + str[++i];
            continue;
          }
          if (ch === "(") {
            parens.push(ch);
            stack.push(ch);
          }
          if (ch === "[") {
            brackets.push(ch);
            stack.push(ch);
          }
          if (ch === ")") {
            parens.pop();
            stack.pop();
            if (!stack.length) {
              val += ch;
              break;
            }
          }
          if (ch === "]") {
            brackets.pop();
            stack.pop();
            if (!stack.length) {
              val += ch;
              break;
            }
          }
          val += ch;
        }
        tok.split = false;
        tok.val = val.slice(1);
        tok.idx = i;
      };
    };
    utils.isQuantifier = function(str) {
      return /^(?:[0-9]?,[0-9]|[0-9],)$/.test(str);
    };
    utils.stringifyArray = function(arr) {
      return [utils.arrayify(arr).join("|")];
    };
    utils.arrayify = function(arr) {
      if (typeof arr === "undefined") {
        return [];
      }
      if (typeof arr === "string") {
        return [arr];
      }
      return arr;
    };
    utils.isString = function(str) {
      return str != null && typeof str === "string";
    };
    utils.last = function(arr, n) {
      return arr[arr.length - (n || 1)];
    };
    utils.escapeRegex = function(str) {
      return str.replace(/\\?([!^*?()[\]{}+?/])/g, "\\$1");
    };
  }
});

// ../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/compilers.js
var require_compilers = __commonJS({
  "../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/compilers.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = function(braces, options) {
      braces.compiler.set("bos", function() {
        if (this.output) return;
        this.ast.queue = isEscaped(this.ast) ? [this.ast.val] : [];
        this.ast.count = 1;
      }).set("bracket", function(node) {
        var close = node.close;
        var open = !node.escaped ? "[" : "\\[";
        var negated = node.negated;
        var inner = node.inner;
        inner = inner.replace(/\\(?=[\\\w]|$)/g, "\\\\");
        if (inner === "]-") {
          inner = "\\]\\-";
        }
        if (negated && inner.indexOf(".") === -1) {
          inner += ".";
        }
        if (negated && inner.indexOf("/") === -1) {
          inner += "/";
        }
        var val = open + negated + inner + close;
        var queue = node.parent.queue;
        var last = utils.arrayify(queue.pop());
        queue.push(utils.join(last, val));
        queue.push.apply(queue, []);
      }).set("brace", function(node) {
        node.queue = isEscaped(node) ? [node.val] : [];
        node.count = 1;
        return this.mapVisit(node.nodes);
      }).set("brace.open", function(node) {
        node.parent.open = node.val;
      }).set("text", function(node) {
        var queue = node.parent.queue;
        var escaped = node.escaped;
        var segs = [node.val];
        if (node.optimize === false) {
          options = utils.extend({}, options, { optimize: false });
        }
        if (node.multiplier > 1) {
          node.parent.count *= node.multiplier;
        }
        if (options.quantifiers === true && utils.isQuantifier(node.val)) {
          escaped = true;
        } else if (node.val.length > 1) {
          if (isType(node.parent, "brace") && !isEscaped(node)) {
            var expanded = utils.expand(node.val, options);
            segs = expanded.segs;
            if (expanded.isOptimized) {
              node.parent.isOptimized = true;
            }
            if (!segs.length) {
              var val = expanded.val || node.val;
              if (options.unescape !== false) {
                val = val.replace(/\\([,.])/g, "$1");
                val = val.replace(/["'`]/g, "");
              }
              segs = [val];
              escaped = true;
            }
          }
        } else if (node.val === ",") {
          if (options.expand) {
            node.parent.queue.push([""]);
            segs = [""];
          } else {
            segs = ["|"];
          }
        } else {
          escaped = true;
        }
        if (escaped && isType(node.parent, "brace")) {
          if (node.parent.nodes.length <= 4 && node.parent.count === 1) {
            node.parent.escaped = true;
          } else if (node.parent.length <= 3) {
            node.parent.escaped = true;
          }
        }
        if (!hasQueue(node.parent)) {
          node.parent.queue = segs;
          return;
        }
        var last = utils.arrayify(queue.pop());
        if (node.parent.count > 1 && options.expand) {
          last = multiply(last, node.parent.count);
          node.parent.count = 1;
        }
        queue.push(utils.join(utils.flatten(last), segs.shift()));
        queue.push.apply(queue, segs);
      }).set("brace.close", function(node) {
        var queue = node.parent.queue;
        var prev = node.parent.parent;
        var last = prev.queue.pop();
        var open = node.parent.open;
        var close = node.val;
        if (open && close && isOptimized(node, options)) {
          open = "(";
          close = ")";
        }
        var ele = utils.last(queue);
        if (node.parent.count > 1 && options.expand) {
          ele = multiply(queue.pop(), node.parent.count);
          node.parent.count = 1;
          queue.push(ele);
        }
        if (close && typeof ele === "string" && ele.length === 1) {
          open = "";
          close = "";
        }
        if ((isLiteralBrace(node, options) || noInner(node)) && !node.parent.hasEmpty) {
          queue.push(utils.join(open, queue.pop() || ""));
          queue = utils.flatten(utils.join(queue, close));
        }
        if (typeof last === "undefined") {
          prev.queue = [queue];
        } else {
          prev.queue.push(utils.flatten(utils.join(last, queue)));
        }
      }).set("eos", function(node) {
        if (this.input) return;
        if (options.optimize !== false) {
          this.output = utils.last(utils.flatten(this.ast.queue));
        } else if (Array.isArray(utils.last(this.ast.queue))) {
          this.output = utils.flatten(this.ast.queue.pop());
        } else {
          this.output = utils.flatten(this.ast.queue);
        }
        if (node.parent.count > 1 && options.expand) {
          this.output = multiply(this.output, node.parent.count);
        }
        this.output = utils.arrayify(this.output);
        this.ast.queue = [];
      });
    };
    function multiply(queue, n, options) {
      return utils.flatten(utils.repeat(utils.arrayify(queue), n));
    }
    function isEscaped(node) {
      return node.escaped === true;
    }
    function isOptimized(node, options) {
      if (node.parent.isOptimized) return true;
      return isType(node.parent, "brace") && !isEscaped(node.parent) && options.expand !== true;
    }
    function isLiteralBrace(node, options) {
      return isEscaped(node.parent) || options.optimize !== false;
    }
    function noInner(node, type) {
      if (node.parent.queue.length === 1) {
        return true;
      }
      var nodes = node.parent.nodes;
      return nodes.length === 3 && isType(nodes[0], "brace.open") && !isType(nodes[1], "text") && isType(nodes[2], "brace.close");
    }
    function isType(node, type) {
      return typeof node !== "undefined" && node.type === type;
    }
    function hasQueue(node) {
      return Array.isArray(node.queue) && node.queue.length;
    }
  }
});

// ../../node_modules/.pnpm/define-property@1.0.0/node_modules/define-property/index.js
var require_define_property2 = __commonJS({
  "../../node_modules/.pnpm/define-property@1.0.0/node_modules/define-property/index.js"(exports2, module2) {
    "use strict";
    var isDescriptor = require_is_descriptor();
    module2.exports = function defineProperty(obj, prop, val) {
      if (typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("expected an object or function.");
      }
      if (typeof prop !== "string") {
        throw new TypeError("expected `prop` to be a string.");
      }
      if (isDescriptor(val) && ("set" in val || "get" in val)) {
        return Object.defineProperty(obj, prop, val);
      }
      return Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: val
      });
    };
  }
});

// ../../node_modules/.pnpm/snapdragon-util@3.0.1/node_modules/snapdragon-util/index.js
var require_snapdragon_util = __commonJS({
  "../../node_modules/.pnpm/snapdragon-util@3.0.1/node_modules/snapdragon-util/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var utils = module2.exports;
    utils.isNode = function(node) {
      return typeOf(node) === "object" && node.isNode === true;
    };
    utils.noop = function(node) {
      append(this, "", node);
    };
    utils.identity = function(node) {
      append(this, node.val, node);
    };
    utils.append = function(val) {
      return function(node) {
        append(this, val, node);
      };
    };
    utils.toNoop = function(node, nodes) {
      if (nodes) {
        node.nodes = nodes;
      } else {
        delete node.nodes;
        node.type = "text";
        node.val = "";
      }
    };
    utils.visit = function(node, fn) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isFunction(fn), "expected a visitor function");
      fn(node);
      return node.nodes ? utils.mapVisit(node, fn) : node;
    };
    utils.mapVisit = function(node, fn) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isArray(node.nodes), "expected node.nodes to be an array");
      assert(isFunction(fn), "expected a visitor function");
      for (var i = 0; i < node.nodes.length; i++) {
        utils.visit(node.nodes[i], fn);
      }
      return node;
    };
    utils.addOpen = function(node, Node, val, filter) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isFunction(Node), "expected Node to be a constructor function");
      if (typeof val === "function") {
        filter = val;
        val = "";
      }
      if (typeof filter === "function" && !filter(node)) return;
      var open = new Node({ type: node.type + ".open", val });
      var unshift = node.unshift || node.unshiftNode;
      if (typeof unshift === "function") {
        unshift.call(node, open);
      } else {
        utils.unshiftNode(node, open);
      }
      return open;
    };
    utils.addClose = function(node, Node, val, filter) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isFunction(Node), "expected Node to be a constructor function");
      if (typeof val === "function") {
        filter = val;
        val = "";
      }
      if (typeof filter === "function" && !filter(node)) return;
      var close = new Node({ type: node.type + ".close", val });
      var push = node.push || node.pushNode;
      if (typeof push === "function") {
        push.call(node, close);
      } else {
        utils.pushNode(node, close);
      }
      return close;
    };
    utils.wrapNodes = function(node, Node, filter) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isFunction(Node), "expected Node to be a constructor function");
      utils.addOpen(node, Node, filter);
      utils.addClose(node, Node, filter);
      return node;
    };
    utils.pushNode = function(parent, node) {
      assert(utils.isNode(parent), "expected parent node to be an instance of Node");
      assert(utils.isNode(node), "expected node to be an instance of Node");
      node.define("parent", parent);
      parent.nodes = parent.nodes || [];
      parent.nodes.push(node);
      return node;
    };
    utils.unshiftNode = function(parent, node) {
      assert(utils.isNode(parent), "expected parent node to be an instance of Node");
      assert(utils.isNode(node), "expected node to be an instance of Node");
      node.define("parent", parent);
      parent.nodes = parent.nodes || [];
      parent.nodes.unshift(node);
    };
    utils.popNode = function(node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      if (typeof node.pop === "function") {
        return node.pop();
      }
      return node.nodes && node.nodes.pop();
    };
    utils.shiftNode = function(node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      if (typeof node.shift === "function") {
        return node.shift();
      }
      return node.nodes && node.nodes.shift();
    };
    utils.removeNode = function(parent, node) {
      assert(utils.isNode(parent), "expected parent.node to be an instance of Node");
      assert(utils.isNode(node), "expected node to be an instance of Node");
      if (!parent.nodes) {
        return null;
      }
      if (typeof parent.remove === "function") {
        return parent.remove(node);
      }
      var idx = parent.nodes.indexOf(node);
      if (idx !== -1) {
        return parent.nodes.splice(idx, 1);
      }
    };
    utils.isType = function(node, type) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      switch (typeOf(type)) {
        case "array":
          var types = type.slice();
          for (var i = 0; i < types.length; i++) {
            if (utils.isType(node, types[i])) {
              return true;
            }
          }
          return false;
        case "string":
          return node.type === type;
        case "regexp":
          return type.test(node.type);
        default: {
          throw new TypeError('expected "type" to be an array, string or regexp');
        }
      }
    };
    utils.hasType = function(node, type) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      if (!Array.isArray(node.nodes)) return false;
      for (var i = 0; i < node.nodes.length; i++) {
        if (utils.isType(node.nodes[i], type)) {
          return true;
        }
      }
      return false;
    };
    utils.firstOfType = function(nodes, type) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (utils.isType(node, type)) {
          return node;
        }
      }
    };
    utils.findNode = function(nodes, type) {
      if (!Array.isArray(nodes)) {
        return null;
      }
      if (typeof type === "number") {
        return nodes[type];
      }
      return utils.firstOfType(nodes, type);
    };
    utils.isOpen = function(node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      return node.type.slice(-5) === ".open";
    };
    utils.isClose = function(node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      return node.type.slice(-6) === ".close";
    };
    utils.hasOpen = function(node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      var first = node.first || node.nodes ? node.nodes[0] : null;
      if (utils.isNode(first)) {
        return first.type === node.type + ".open";
      }
      return false;
    };
    utils.hasClose = function(node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      var last = node.last || node.nodes ? node.nodes[node.nodes.length - 1] : null;
      if (utils.isNode(last)) {
        return last.type === node.type + ".close";
      }
      return false;
    };
    utils.hasOpenAndClose = function(node) {
      return utils.hasOpen(node) && utils.hasClose(node);
    };
    utils.addType = function(state, node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isObject(state), "expected state to be an object");
      var type = node.parent ? node.parent.type : node.type.replace(/\.open$/, "");
      if (!state.hasOwnProperty("inside")) {
        state.inside = {};
      }
      if (!state.inside.hasOwnProperty(type)) {
        state.inside[type] = [];
      }
      var arr = state.inside[type];
      arr.push(node);
      return arr;
    };
    utils.removeType = function(state, node) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isObject(state), "expected state to be an object");
      var type = node.parent ? node.parent.type : node.type.replace(/\.close$/, "");
      if (state.inside.hasOwnProperty(type)) {
        return state.inside[type].pop();
      }
    };
    utils.isEmpty = function(node, fn) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      if (!Array.isArray(node.nodes)) {
        if (node.type !== "text") {
          return true;
        }
        if (typeof fn === "function") {
          return fn(node, node.parent);
        }
        return !utils.trim(node.val);
      }
      for (var i = 0; i < node.nodes.length; i++) {
        var child = node.nodes[i];
        if (utils.isOpen(child) || utils.isClose(child)) {
          continue;
        }
        if (!utils.isEmpty(child, fn)) {
          return false;
        }
      }
      return true;
    };
    utils.isInsideType = function(state, type) {
      assert(isObject(state), "expected state to be an object");
      assert(isString(type), "expected type to be a string");
      if (!state.hasOwnProperty("inside")) {
        return false;
      }
      if (!state.inside.hasOwnProperty(type)) {
        return false;
      }
      return state.inside[type].length > 0;
    };
    utils.isInside = function(state, node, type) {
      assert(utils.isNode(node), "expected node to be an instance of Node");
      assert(isObject(state), "expected state to be an object");
      if (Array.isArray(type)) {
        for (var i = 0; i < type.length; i++) {
          if (utils.isInside(state, node, type[i])) {
            return true;
          }
        }
        return false;
      }
      var parent = node.parent;
      if (typeof type === "string") {
        return parent && parent.type === type || utils.isInsideType(state, type);
      }
      if (typeOf(type) === "regexp") {
        if (parent && parent.type && type.test(parent.type)) {
          return true;
        }
        var keys = Object.keys(state.inside);
        var len = keys.length;
        var idx = -1;
        while (++idx < len) {
          var key = keys[idx];
          var val = state.inside[key];
          if (Array.isArray(val) && val.length !== 0 && type.test(key)) {
            return true;
          }
        }
      }
      return false;
    };
    utils.last = function(arr, n) {
      return arr[arr.length - (n || 1)];
    };
    utils.arrayify = function(val) {
      if (typeof val === "string" && val !== "") {
        return [val];
      }
      if (!Array.isArray(val)) {
        return [];
      }
      return val;
    };
    utils.stringify = function(val) {
      return utils.arrayify(val).join(",");
    };
    utils.trim = function(str) {
      return typeof str === "string" ? str.trim() : "";
    };
    function isObject(val) {
      return typeOf(val) === "object";
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isFunction(val) {
      return typeof val === "function";
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function append(compiler, val, node) {
      if (typeof compiler.append !== "function") {
        return compiler.emit(val, node);
      }
      return compiler.append(val, node);
    }
    function assert(val, message) {
      if (!val) throw new Error(message);
    }
  }
});

// ../../node_modules/.pnpm/snapdragon-node@2.1.1/node_modules/snapdragon-node/index.js
var require_snapdragon_node = __commonJS({
  "../../node_modules/.pnpm/snapdragon-node@2.1.1/node_modules/snapdragon-node/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject2();
    var define2 = require_define_property2();
    var utils = require_snapdragon_util();
    var ownNames;
    function Node(val, type, parent) {
      if (typeof type !== "string") {
        parent = type;
        type = null;
      }
      define2(this, "parent", parent);
      define2(this, "isNode", true);
      define2(this, "expect", null);
      if (typeof type !== "string" && isObject(val)) {
        lazyKeys();
        var keys = Object.keys(val);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (ownNames.indexOf(key) === -1) {
            this[key] = val[key];
          }
        }
      } else {
        this.type = type;
        this.val = val;
      }
    }
    Node.isNode = function(node) {
      return utils.isNode(node);
    };
    Node.prototype.define = function(name, val) {
      define2(this, name, val);
      return this;
    };
    Node.prototype.isEmpty = function(fn) {
      return utils.isEmpty(this, fn);
    };
    Node.prototype.push = function(node) {
      assert(Node.isNode(node), "expected node to be an instance of Node");
      define2(node, "parent", this);
      this.nodes = this.nodes || [];
      return this.nodes.push(node);
    };
    Node.prototype.unshift = function(node) {
      assert(Node.isNode(node), "expected node to be an instance of Node");
      define2(node, "parent", this);
      this.nodes = this.nodes || [];
      return this.nodes.unshift(node);
    };
    Node.prototype.pop = function() {
      return this.nodes && this.nodes.pop();
    };
    Node.prototype.shift = function() {
      return this.nodes && this.nodes.shift();
    };
    Node.prototype.remove = function(node) {
      assert(Node.isNode(node), "expected node to be an instance of Node");
      this.nodes = this.nodes || [];
      var idx = node.index;
      if (idx !== -1) {
        node.index = -1;
        return this.nodes.splice(idx, 1);
      }
      return null;
    };
    Node.prototype.find = function(type) {
      return utils.findNode(this.nodes, type);
    };
    Node.prototype.isType = function(type) {
      return utils.isType(this, type);
    };
    Node.prototype.hasType = function(type) {
      return utils.hasType(this, type);
    };
    Object.defineProperty(Node.prototype, "siblings", {
      set: function() {
        throw new Error("node.siblings is a getter and cannot be defined");
      },
      get: function() {
        return this.parent ? this.parent.nodes : null;
      }
    });
    Object.defineProperty(Node.prototype, "index", {
      set: function(index) {
        define2(this, "idx", index);
      },
      get: function() {
        if (!Array.isArray(this.siblings)) {
          return -1;
        }
        var tok = this.idx !== -1 ? this.siblings[this.idx] : null;
        if (tok !== this) {
          this.idx = this.siblings.indexOf(this);
        }
        return this.idx;
      }
    });
    Object.defineProperty(Node.prototype, "prev", {
      set: function() {
        throw new Error("node.prev is a getter and cannot be defined");
      },
      get: function() {
        if (Array.isArray(this.siblings)) {
          return this.siblings[this.index - 1] || this.parent.prev;
        }
        return null;
      }
    });
    Object.defineProperty(Node.prototype, "next", {
      set: function() {
        throw new Error("node.next is a getter and cannot be defined");
      },
      get: function() {
        if (Array.isArray(this.siblings)) {
          return this.siblings[this.index + 1] || this.parent.next;
        }
        return null;
      }
    });
    Object.defineProperty(Node.prototype, "first", {
      get: function() {
        return this.nodes ? this.nodes[0] : null;
      }
    });
    Object.defineProperty(Node.prototype, "last", {
      get: function() {
        return this.nodes ? utils.last(this.nodes) : null;
      }
    });
    Object.defineProperty(Node.prototype, "scope", {
      get: function() {
        if (this.isScope !== true) {
          return this.parent ? this.parent.scope : this;
        }
        return this;
      }
    });
    function lazyKeys() {
      if (!ownNames) {
        ownNames = Object.getOwnPropertyNames(Node.prototype);
      }
    }
    function assert(val, message) {
      if (!val) throw new Error(message);
    }
    exports2 = module2.exports = Node;
  }
});

// ../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/parsers.js
var require_parsers = __commonJS({
  "../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/parsers.js"(exports2, module2) {
    "use strict";
    var Node = require_snapdragon_node();
    var utils = require_utils2();
    module2.exports = function(braces, options) {
      braces.parser.set("bos", function() {
        if (!this.parsed) {
          this.ast = this.nodes[0] = new Node(this.ast);
        }
      }).set("escape", function() {
        var pos = this.position();
        var m = this.match(/^(?:\\(.)|\$\{)/);
        if (!m) return;
        var prev = this.prev();
        var last = utils.last(prev.nodes);
        var node = pos(new Node({
          type: "text",
          multiplier: 1,
          val: m[0]
        }));
        if (node.val === "\\\\") {
          return node;
        }
        if (node.val === "${") {
          var str = this.input;
          var idx = -1;
          var ch;
          while (ch = str[++idx]) {
            this.consume(1);
            node.val += ch;
            if (ch === "\\") {
              node.val += str[++idx];
              continue;
            }
            if (ch === "}") {
              break;
            }
          }
        }
        if (this.options.unescape !== false) {
          node.val = node.val.replace(/\\([{}])/g, "$1");
        }
        if (last.val === '"' && this.input.charAt(0) === '"') {
          last.val = node.val;
          this.consume(1);
          return;
        }
        return concatNodes.call(this, pos, node, prev, options);
      }).set("bracket", function() {
        var isInside = this.isInside("brace");
        var pos = this.position();
        var m = this.match(/^(?:\[([!^]?)([^\]]{2,}|\]-)(\]|[^*+?]+)|\[)/);
        if (!m) return;
        var prev = this.prev();
        var val = m[0];
        var negated = m[1] ? "^" : "";
        var inner = m[2] || "";
        var close = m[3] || "";
        if (isInside && prev.type === "brace") {
          prev.text = prev.text || "";
          prev.text += val;
        }
        var esc = this.input.slice(0, 2);
        if (inner === "" && esc === "\\]") {
          inner += esc;
          this.consume(2);
          var str = this.input;
          var idx = -1;
          var ch;
          while (ch = str[++idx]) {
            this.consume(1);
            if (ch === "]") {
              close = ch;
              break;
            }
            inner += ch;
          }
        }
        return pos(new Node({
          type: "bracket",
          val,
          escaped: close !== "]",
          negated,
          inner,
          close
        }));
      }).set("multiplier", function() {
        var isInside = this.isInside("brace");
        var pos = this.position();
        var m = this.match(/^\{((?:,|\{,+\})+)\}/);
        if (!m) return;
        this.multiplier = true;
        var prev = this.prev();
        var val = m[0];
        if (isInside && prev.type === "brace") {
          prev.text = prev.text || "";
          prev.text += val;
        }
        var node = pos(new Node({
          type: "text",
          multiplier: 1,
          match: m,
          val
        }));
        return concatNodes.call(this, pos, node, prev, options);
      }).set("brace.open", function() {
        var pos = this.position();
        var m = this.match(/^\{(?!(?:[^\\}]?|,+)\})/);
        if (!m) return;
        var prev = this.prev();
        var last = utils.last(prev.nodes);
        if (last && last.val && isExtglobChar(last.val.slice(-1))) {
          last.optimize = false;
        }
        var open = pos(new Node({
          type: "brace.open",
          val: m[0]
        }));
        var node = pos(new Node({
          type: "brace",
          nodes: []
        }));
        node.push(open);
        prev.push(node);
        this.push("brace", node);
      }).set("brace.close", function() {
        var pos = this.position();
        var m = this.match(/^\}/);
        if (!m || !m[0]) return;
        var brace = this.pop("brace");
        var node = pos(new Node({
          type: "brace.close",
          val: m[0]
        }));
        if (!this.isType(brace, "brace")) {
          if (this.options.strict) {
            throw new Error('missing opening "{"');
          }
          node.type = "text";
          node.multiplier = 0;
          node.escaped = true;
          return node;
        }
        var prev = this.prev();
        var last = utils.last(prev.nodes);
        if (last.text) {
          var lastNode = utils.last(last.nodes);
          if (lastNode.val === ")" && /[!@*?+]\(/.test(last.text)) {
            var open = last.nodes[0];
            var text = last.nodes[1];
            if (open.type === "brace.open" && text && text.type === "text") {
              text.optimize = false;
            }
          }
        }
        if (brace.nodes.length > 2) {
          var first = brace.nodes[1];
          if (first.type === "text" && first.val === ",") {
            brace.nodes.splice(1, 1);
            brace.nodes.push(first);
          }
        }
        brace.push(node);
      }).set("boundary", function() {
        var pos = this.position();
        var m = this.match(/^[$^](?!\{)/);
        if (!m) return;
        return pos(new Node({
          type: "text",
          val: m[0]
        }));
      }).set("nobrace", function() {
        var isInside = this.isInside("brace");
        var pos = this.position();
        var m = this.match(/^\{[^,]?\}/);
        if (!m) return;
        var prev = this.prev();
        var val = m[0];
        if (isInside && prev.type === "brace") {
          prev.text = prev.text || "";
          prev.text += val;
        }
        return pos(new Node({
          type: "text",
          multiplier: 0,
          val
        }));
      }).set("text", function() {
        var isInside = this.isInside("brace");
        var pos = this.position();
        var m = this.match(/^((?!\\)[^${}[\]])+/);
        if (!m) return;
        var prev = this.prev();
        var val = m[0];
        if (isInside && prev.type === "brace") {
          prev.text = prev.text || "";
          prev.text += val;
        }
        var node = pos(new Node({
          type: "text",
          multiplier: 1,
          val
        }));
        return concatNodes.call(this, pos, node, prev, options);
      });
    };
    function isExtglobChar(ch) {
      return ch === "!" || ch === "@" || ch === "*" || ch === "?" || ch === "+";
    }
    function concatNodes(pos, node, parent, options) {
      node.orig = node.val;
      var prev = this.prev();
      var last = utils.last(prev.nodes);
      var isEscaped = false;
      if (node.val.length > 1) {
        var a = node.val.charAt(0);
        var b = node.val.slice(-1);
        isEscaped = a === '"' && b === '"' || a === "'" && b === "'" || a === "`" && b === "`";
      }
      if (isEscaped && options.unescape !== false) {
        node.val = node.val.slice(1, node.val.length - 1);
        node.escaped = true;
      }
      if (node.match) {
        var match = node.match[1];
        if (!match || match.indexOf("}") === -1) {
          match = node.match[0];
        }
        var val = match.replace(/\{/g, ",").replace(/\}/g, "");
        node.multiplier *= val.length;
        node.val = "";
      }
      var simpleText = last.type === "text" && last.multiplier === 1 && node.multiplier === 1 && node.val;
      if (simpleText) {
        last.val += node.val;
        return;
      }
      prev.push(node);
    }
  }
});

// ../../node_modules/.pnpm/component-emitter@1.3.1/node_modules/component-emitter/index.js
var require_component_emitter = __commonJS({
  "../../node_modules/.pnpm/component-emitter@1.3.1/node_modules/component-emitter/index.js"(exports2, module2) {
    if (typeof module2 !== "undefined") {
      module2.exports = Emitter;
    }
    function Emitter(obj) {
      if (obj) return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
      return this;
    };
    Emitter.prototype.once = function(event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks["$" + event];
      if (!callbacks) return this;
      if (1 == arguments.length) {
        delete this._callbacks["$" + event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      if (callbacks.length === 0) {
        delete this._callbacks["$" + event];
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks["$" + event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
  }
});

// ../../node_modules/.pnpm/object-visit@1.0.1/node_modules/object-visit/index.js
var require_object_visit = __commonJS({
  "../../node_modules/.pnpm/object-visit@1.0.1/node_modules/object-visit/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject2();
    module2.exports = function visit(thisArg, method, target, val) {
      if (!isObject(thisArg) && typeof thisArg !== "function") {
        throw new Error("object-visit expects `thisArg` to be an object.");
      }
      if (typeof method !== "string") {
        throw new Error("object-visit expects `method` name to be a string");
      }
      if (typeof thisArg[method] !== "function") {
        return thisArg;
      }
      var args = [].slice.call(arguments, 3);
      target = target || {};
      for (var key in target) {
        var arr = [key, target[key]].concat(args);
        thisArg[method].apply(thisArg, arr);
      }
      return thisArg;
    };
  }
});

// ../../node_modules/.pnpm/map-visit@1.0.0/node_modules/map-visit/index.js
var require_map_visit = __commonJS({
  "../../node_modules/.pnpm/map-visit@1.0.0/node_modules/map-visit/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var visit = require_object_visit();
    module2.exports = function mapVisit(collection, method, val) {
      if (isObject(val)) {
        return visit.apply(null, arguments);
      }
      if (!Array.isArray(val)) {
        throw new TypeError("expected an array: " + util.inspect(val));
      }
      var args = [].slice.call(arguments, 3);
      for (var i = 0; i < val.length; i++) {
        var ele = val[i];
        if (isObject(ele)) {
          visit.apply(null, [collection, method, ele].concat(args));
        } else {
          collection[method].apply(collection, [ele].concat(args));
        }
      }
    };
    function isObject(val) {
      return val && (typeof val === "function" || !Array.isArray(val) && typeof val === "object");
    }
  }
});

// ../../node_modules/.pnpm/collection-visit@1.0.0/node_modules/collection-visit/index.js
var require_collection_visit = __commonJS({
  "../../node_modules/.pnpm/collection-visit@1.0.0/node_modules/collection-visit/index.js"(exports2, module2) {
    "use strict";
    var visit = require_object_visit();
    var mapVisit = require_map_visit();
    module2.exports = function(collection, method, val) {
      var result;
      if (typeof val === "string" && method in collection) {
        var args = [].slice.call(arguments, 2);
        result = collection[method].apply(collection, args);
      } else if (Array.isArray(val)) {
        result = mapVisit.apply(null, arguments);
      } else {
        result = visit.apply(null, arguments);
      }
      if (typeof result !== "undefined") {
        return result;
      }
      return collection;
    };
  }
});

// ../../node_modules/.pnpm/to-object-path@0.3.0/node_modules/to-object-path/index.js
var require_to_object_path = __commonJS({
  "../../node_modules/.pnpm/to-object-path@0.3.0/node_modules/to-object-path/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    module2.exports = function toPath(args) {
      if (typeOf(args) !== "arguments") {
        args = arguments;
      }
      return filter(args).join(".");
    };
    function filter(arr) {
      var len = arr.length;
      var idx = -1;
      var res = [];
      while (++idx < len) {
        var ele = arr[idx];
        if (typeOf(ele) === "arguments" || Array.isArray(ele)) {
          res.push.apply(res, filter(ele));
        } else if (typeof ele === "string") {
          res.push(ele);
        }
      }
      return res;
    }
  }
});

// ../../node_modules/.pnpm/arr-union@3.1.0/node_modules/arr-union/index.js
var require_arr_union = __commonJS({
  "../../node_modules/.pnpm/arr-union@3.1.0/node_modules/arr-union/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function union(init) {
      if (!Array.isArray(init)) {
        throw new TypeError("arr-union expects the first argument to be an array.");
      }
      var len = arguments.length;
      var i = 0;
      while (++i < len) {
        var arg = arguments[i];
        if (!arg) continue;
        if (!Array.isArray(arg)) {
          arg = [arg];
        }
        for (var j = 0; j < arg.length; j++) {
          var ele = arg[j];
          if (init.indexOf(ele) >= 0) {
            continue;
          }
          init.push(ele);
        }
      }
      return init;
    };
  }
});

// ../../node_modules/.pnpm/get-value@2.0.6/node_modules/get-value/index.js
var require_get_value = __commonJS({
  "../../node_modules/.pnpm/get-value@2.0.6/node_modules/get-value/index.js"(exports2, module2) {
    module2.exports = function(obj, prop, a, b, c) {
      if (!isObject(obj) || !prop) {
        return obj;
      }
      prop = toString(prop);
      if (a) prop += "." + toString(a);
      if (b) prop += "." + toString(b);
      if (c) prop += "." + toString(c);
      if (prop in obj) {
        return obj[prop];
      }
      var segs = prop.split(".");
      var len = segs.length;
      var i = -1;
      while (obj && ++i < len) {
        var key = segs[i];
        while (key[key.length - 1] === "\\") {
          key = key.slice(0, -1) + "." + segs[++i];
        }
        obj = obj[key];
      }
      return obj;
    };
    function isObject(val) {
      return val !== null && (typeof val === "object" || typeof val === "function");
    }
    function toString(val) {
      if (!val) return "";
      if (Array.isArray(val)) {
        return val.join(".");
      }
      return val;
    }
  }
});

// ../../node_modules/.pnpm/set-value@2.0.1/node_modules/set-value/index.js
var require_set_value = __commonJS({
  "../../node_modules/.pnpm/set-value@2.0.1/node_modules/set-value/index.js"(exports2, module2) {
    "use strict";
    var split = require_split_string();
    var extend = require_extend_shallow2();
    var isPlainObject = require_is_plain_object();
    var isObject = require_is_extendable();
    module2.exports = function(obj, prop, val) {
      if (!isObject(obj)) {
        return obj;
      }
      if (Array.isArray(prop)) {
        prop = [].concat.apply([], prop).join(".");
      }
      if (typeof prop !== "string") {
        return obj;
      }
      var keys = split(prop, { sep: ".", brackets: true }).filter(isValidKey);
      var len = keys.length;
      var idx = -1;
      var current = obj;
      while (++idx < len) {
        var key = keys[idx];
        if (idx !== len - 1) {
          if (!isObject(current[key])) {
            current[key] = {};
          }
          current = current[key];
          continue;
        }
        if (isPlainObject(current[key]) && isPlainObject(val)) {
          current[key] = extend({}, current[key], val);
        } else {
          current[key] = val;
        }
      }
      return obj;
    };
    function isValidKey(key) {
      return key !== "__proto__" && key !== "constructor" && key !== "prototype";
    }
  }
});

// ../../node_modules/.pnpm/union-value@1.0.1/node_modules/union-value/index.js
var require_union_value = __commonJS({
  "../../node_modules/.pnpm/union-value@1.0.1/node_modules/union-value/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    var union = require_arr_union();
    var get = require_get_value();
    var set = require_set_value();
    module2.exports = function unionValue(obj, prop, value) {
      if (!isObject(obj)) {
        throw new TypeError("union-value expects the first argument to be an object.");
      }
      if (typeof prop !== "string") {
        throw new TypeError("union-value expects `prop` to be a string.");
      }
      var arr = arrayify(get(obj, prop));
      set(obj, prop, union(arr, arrayify(value)));
      return obj;
    };
    function arrayify(val) {
      if (val === null || typeof val === "undefined") {
        return [];
      }
      if (Array.isArray(val)) {
        return val;
      }
      return [val];
    }
  }
});

// ../../node_modules/.pnpm/has-values@0.1.4/node_modules/has-values/index.js
var require_has_values = __commonJS({
  "../../node_modules/.pnpm/has-values@0.1.4/node_modules/has-values/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasValue(o, noZero) {
      if (o === null || o === void 0) {
        return false;
      }
      if (typeof o === "boolean") {
        return true;
      }
      if (typeof o === "number") {
        if (o === 0 && noZero === true) {
          return false;
        }
        return true;
      }
      if (o.length !== void 0) {
        return o.length !== 0;
      }
      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          return true;
        }
      }
      return false;
    };
  }
});

// ../../node_modules/.pnpm/has-value@0.3.1/node_modules/has-value/index.js
var require_has_value = __commonJS({
  "../../node_modules/.pnpm/has-value@0.3.1/node_modules/has-value/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject();
    var hasValues = require_has_values();
    var get = require_get_value();
    module2.exports = function(obj, prop, noZero) {
      if (isObject(obj)) {
        return hasValues(get(obj, prop), noZero);
      }
      return hasValues(obj, prop);
    };
  }
});

// ../../node_modules/.pnpm/unset-value@1.0.0/node_modules/unset-value/index.js
var require_unset_value = __commonJS({
  "../../node_modules/.pnpm/unset-value@1.0.0/node_modules/unset-value/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject2();
    var has = require_has_value();
    module2.exports = function unset(obj, prop) {
      if (!isObject(obj)) {
        throw new TypeError("expected an object.");
      }
      if (obj.hasOwnProperty(prop)) {
        delete obj[prop];
        return true;
      }
      if (has(obj, prop)) {
        var segs = prop.split(".");
        var last = segs.pop();
        while (segs.length && segs[segs.length - 1].slice(-1) === "\\") {
          last = segs.pop().slice(0, -1) + "." + last;
        }
        while (segs.length) obj = obj[prop = segs.shift()];
        return delete obj[last];
      }
      return true;
    };
  }
});

// ../../node_modules/.pnpm/kind-of@4.0.0/node_modules/kind-of/index.js
var require_kind_of3 = __commonJS({
  "../../node_modules/.pnpm/kind-of@4.0.0/node_modules/kind-of/index.js"(exports2, module2) {
    var isBuffer = require_is_buffer();
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (typeof val === "undefined") {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      if (val === true || val === false || val instanceof Boolean) {
        return "boolean";
      }
      if (typeof val === "string" || val instanceof String) {
        return "string";
      }
      if (typeof val === "number" || val instanceof Number) {
        return "number";
      }
      if (typeof val === "function" || val instanceof Function) {
        return "function";
      }
      if (typeof Array.isArray !== "undefined" && Array.isArray(val)) {
        return "array";
      }
      if (val instanceof RegExp) {
        return "regexp";
      }
      if (val instanceof Date) {
        return "date";
      }
      var type = toString.call(val);
      if (type === "[object RegExp]") {
        return "regexp";
      }
      if (type === "[object Date]") {
        return "date";
      }
      if (type === "[object Arguments]") {
        return "arguments";
      }
      if (type === "[object Error]") {
        return "error";
      }
      if (type === "[object Promise]") {
        return "promise";
      }
      if (isBuffer(val)) {
        return "buffer";
      }
      if (type === "[object Set]") {
        return "set";
      }
      if (type === "[object WeakSet]") {
        return "weakset";
      }
      if (type === "[object Map]") {
        return "map";
      }
      if (type === "[object WeakMap]") {
        return "weakmap";
      }
      if (type === "[object Symbol]") {
        return "symbol";
      }
      if (type === "[object Int8Array]") {
        return "int8array";
      }
      if (type === "[object Uint8Array]") {
        return "uint8array";
      }
      if (type === "[object Uint8ClampedArray]") {
        return "uint8clampedarray";
      }
      if (type === "[object Int16Array]") {
        return "int16array";
      }
      if (type === "[object Uint16Array]") {
        return "uint16array";
      }
      if (type === "[object Int32Array]") {
        return "int32array";
      }
      if (type === "[object Uint32Array]") {
        return "uint32array";
      }
      if (type === "[object Float32Array]") {
        return "float32array";
      }
      if (type === "[object Float64Array]") {
        return "float64array";
      }
      return "object";
    };
  }
});

// ../../node_modules/.pnpm/has-values@1.0.0/node_modules/has-values/index.js
var require_has_values2 = __commonJS({
  "../../node_modules/.pnpm/has-values@1.0.0/node_modules/has-values/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of3();
    var isNumber = require_is_number3();
    module2.exports = function hasValue(val) {
      if (isNumber(val)) {
        return true;
      }
      switch (typeOf(val)) {
        case "null":
        case "boolean":
        case "function":
          return true;
        case "string":
        case "arguments":
          return val.length !== 0;
        case "error":
          return val.message !== "";
        case "array":
          var len = val.length;
          if (len === 0) {
            return false;
          }
          for (var i = 0; i < len; i++) {
            if (hasValue(val[i])) {
              return true;
            }
          }
          return false;
        case "file":
        case "map":
        case "set":
          return val.size !== 0;
        case "object":
          var keys = Object.keys(val);
          if (keys.length === 0) {
            return false;
          }
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (hasValue(val[key])) {
              return true;
            }
          }
          return false;
        default: {
          return false;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/has-value@1.0.0/node_modules/has-value/index.js
var require_has_value2 = __commonJS({
  "../../node_modules/.pnpm/has-value@1.0.0/node_modules/has-value/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject2();
    var hasValues = require_has_values2();
    var get = require_get_value();
    module2.exports = function(val, prop) {
      return hasValues(isObject(val) && prop ? get(val, prop) : val);
    };
  }
});

// ../../node_modules/.pnpm/cache-base@1.0.1/node_modules/cache-base/index.js
var require_cache_base = __commonJS({
  "../../node_modules/.pnpm/cache-base@1.0.1/node_modules/cache-base/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject2();
    var Emitter = require_component_emitter();
    var visit = require_collection_visit();
    var toPath = require_to_object_path();
    var union = require_union_value();
    var del = require_unset_value();
    var get = require_get_value();
    var has = require_has_value2();
    var set = require_set_value();
    function namespace(prop) {
      function Cache(cache) {
        if (prop) {
          this[prop] = {};
        }
        if (cache) {
          this.set(cache);
        }
      }
      Emitter(Cache.prototype);
      Cache.prototype.set = function(key, val) {
        if (Array.isArray(key) && arguments.length === 2) {
          key = toPath(key);
        }
        if (isObject(key) || Array.isArray(key)) {
          this.visit("set", key);
        } else {
          set(prop ? this[prop] : this, key, val);
          this.emit("set", key, val);
        }
        return this;
      };
      Cache.prototype.union = function(key, val) {
        if (Array.isArray(key) && arguments.length === 2) {
          key = toPath(key);
        }
        var ctx = prop ? this[prop] : this;
        union(ctx, key, arrayify(val));
        this.emit("union", val);
        return this;
      };
      Cache.prototype.get = function(key) {
        key = toPath(arguments);
        var ctx = prop ? this[prop] : this;
        var val = get(ctx, key);
        this.emit("get", key, val);
        return val;
      };
      Cache.prototype.has = function(key) {
        key = toPath(arguments);
        var ctx = prop ? this[prop] : this;
        var val = get(ctx, key);
        var has2 = typeof val !== "undefined";
        this.emit("has", key, has2);
        return has2;
      };
      Cache.prototype.del = function(key) {
        if (Array.isArray(key)) {
          this.visit("del", key);
        } else {
          del(prop ? this[prop] : this, key);
          this.emit("del", key);
        }
        return this;
      };
      Cache.prototype.clear = function() {
        if (prop) {
          this[prop] = {};
        }
      };
      Cache.prototype.visit = function(method, val) {
        visit(this, method, val);
        return this;
      };
      return Cache;
    }
    function arrayify(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    }
    module2.exports = namespace();
    module2.exports.namespace = namespace;
  }
});

// ../../node_modules/.pnpm/mixin-deep@1.3.2/node_modules/mixin-deep/index.js
var require_mixin_deep = __commonJS({
  "../../node_modules/.pnpm/mixin-deep@1.3.2/node_modules/mixin-deep/index.js"(exports2, module2) {
    "use strict";
    var isExtendable = require_is_extendable2();
    var forIn = require_for_in();
    function mixinDeep(target, objects) {
      var len = arguments.length, i = 0;
      while (++i < len) {
        var obj = arguments[i];
        if (isObject(obj)) {
          forIn(obj, copy, target);
        }
      }
      return target;
    }
    function copy(val, key) {
      if (!isValidKey(key)) {
        return;
      }
      var obj = this[key];
      if (isObject(val) && isObject(obj)) {
        mixinDeep(obj, val);
      } else {
        this[key] = val;
      }
    }
    function isObject(val) {
      return isExtendable(val) && !Array.isArray(val);
    }
    function isValidKey(key) {
      return key !== "__proto__" && key !== "constructor" && key !== "prototype";
    }
    module2.exports = mixinDeep;
  }
});

// ../../node_modules/.pnpm/pascalcase@0.1.1/node_modules/pascalcase/index.js
var require_pascalcase = __commonJS({
  "../../node_modules/.pnpm/pascalcase@0.1.1/node_modules/pascalcase/index.js"(exports2, module2) {
    function pascalcase(str) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string.");
      }
      str = str.replace(/([A-Z])/g, " $1");
      if (str.length === 1) {
        return str.toUpperCase();
      }
      str = str.replace(/^[\W_]+|[\W_]+$/g, "").toLowerCase();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      return str.replace(/[\W_]+(\w|$)/g, function(_, ch) {
        return ch.toUpperCase();
      });
    }
    module2.exports = pascalcase;
  }
});

// ../../node_modules/.pnpm/is-descriptor@0.1.7/node_modules/is-descriptor/index.js
var require_is_descriptor2 = __commonJS({
  "../../node_modules/.pnpm/is-descriptor@0.1.7/node_modules/is-descriptor/index.js"(exports2, module2) {
    "use strict";
    var isAccessor = require_is_accessor_descriptor();
    var isData = require_is_data_descriptor();
    module2.exports = function isDescriptor(obj, key) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        return false;
      }
      if ("get" in obj || "set" in obj) {
        return isAccessor(obj, key);
      }
      return isData(obj, key);
    };
  }
});

// ../../node_modules/.pnpm/define-property@0.2.5/node_modules/define-property/index.js
var require_define_property3 = __commonJS({
  "../../node_modules/.pnpm/define-property@0.2.5/node_modules/define-property/index.js"(exports2, module2) {
    "use strict";
    var isDescriptor = require_is_descriptor2();
    module2.exports = function defineProperty(obj, prop, val) {
      if (typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("expected an object or function.");
      }
      if (typeof prop !== "string") {
        throw new TypeError("expected `prop` to be a string.");
      }
      if (isDescriptor(val) && ("set" in val || "get" in val)) {
        return Object.defineProperty(obj, prop, val);
      }
      return Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: val
      });
    };
  }
});

// ../../node_modules/.pnpm/copy-descriptor@0.1.1/node_modules/copy-descriptor/index.js
var require_copy_descriptor = __commonJS({
  "../../node_modules/.pnpm/copy-descriptor@0.1.1/node_modules/copy-descriptor/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function copyDescriptor(receiver, provider, from, to) {
      if (!isObject(provider) && typeof provider !== "function") {
        to = from;
        from = provider;
        provider = receiver;
      }
      if (!isObject(receiver) && typeof receiver !== "function") {
        throw new TypeError("expected the first argument to be an object");
      }
      if (!isObject(provider) && typeof provider !== "function") {
        throw new TypeError("expected provider to be an object");
      }
      if (typeof to !== "string") {
        to = from;
      }
      if (typeof from !== "string") {
        throw new TypeError("expected key to be a string");
      }
      if (!(from in provider)) {
        throw new Error('property "' + from + '" does not exist');
      }
      var val = Object.getOwnPropertyDescriptor(provider, from);
      if (val) Object.defineProperty(receiver, to, val);
    };
    function isObject(val) {
      return {}.toString.call(val) === "[object Object]";
    }
  }
});

// ../../node_modules/.pnpm/object-copy@0.1.0/node_modules/object-copy/index.js
var require_object_copy = __commonJS({
  "../../node_modules/.pnpm/object-copy@0.1.0/node_modules/object-copy/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var copyDescriptor = require_copy_descriptor();
    var define2 = require_define_property3();
    function copy(receiver, provider, omit) {
      if (!isObject(receiver)) {
        throw new TypeError("expected receiving object to be an object.");
      }
      if (!isObject(provider)) {
        throw new TypeError("expected providing object to be an object.");
      }
      var props = nativeKeys(provider);
      var keys = Object.keys(provider);
      var len = props.length;
      omit = arrayify(omit);
      while (len--) {
        var key = props[len];
        if (has(keys, key)) {
          define2(receiver, key, provider[key]);
        } else if (!(key in receiver) && !has(omit, key)) {
          copyDescriptor(receiver, provider, key);
        }
      }
    }
    function isObject(val) {
      return typeOf(val) === "object" || typeof val === "function";
    }
    function has(obj, val) {
      val = arrayify(val);
      var len = val.length;
      if (isObject(obj)) {
        for (var key in obj) {
          if (val.indexOf(key) > -1) {
            return true;
          }
        }
        var keys = nativeKeys(obj);
        return has(keys, val);
      }
      if (Array.isArray(obj)) {
        var arr = obj;
        while (len--) {
          if (arr.indexOf(val[len]) > -1) {
            return true;
          }
        }
        return false;
      }
      throw new TypeError("expected an array or object.");
    }
    function arrayify(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    }
    function hasConstructor(val) {
      return isObject(val) && typeof val.constructor !== "undefined";
    }
    function nativeKeys(val) {
      if (!hasConstructor(val)) return [];
      return Object.getOwnPropertyNames(val);
    }
    module2.exports = copy;
    module2.exports.has = has;
  }
});

// ../../node_modules/.pnpm/static-extend@0.1.2/node_modules/static-extend/index.js
var require_static_extend = __commonJS({
  "../../node_modules/.pnpm/static-extend@0.1.2/node_modules/static-extend/index.js"(exports2, module2) {
    "use strict";
    var copy = require_object_copy();
    var define2 = require_define_property3();
    var util = require("util");
    function extend(Parent, extendFn) {
      if (typeof Parent !== "function") {
        throw new TypeError("expected Parent to be a function.");
      }
      return function(Ctor, proto) {
        if (typeof Ctor !== "function") {
          throw new TypeError("expected Ctor to be a function.");
        }
        util.inherits(Ctor, Parent);
        copy(Ctor, Parent);
        if (typeof proto === "object") {
          var obj = Object.create(proto);
          for (var k in obj) {
            Ctor.prototype[k] = obj[k];
          }
        }
        define2(Ctor.prototype, "_parent_", {
          configurable: true,
          set: function() {
          },
          get: function() {
            return Parent.prototype;
          }
        });
        if (typeof extendFn === "function") {
          extendFn(Ctor, Parent);
        }
        Ctor.extend = extend(Ctor, extendFn);
      };
    }
    module2.exports = extend;
  }
});

// ../../node_modules/.pnpm/class-utils@0.3.6/node_modules/class-utils/index.js
var require_class_utils = __commonJS({
  "../../node_modules/.pnpm/class-utils@0.3.6/node_modules/class-utils/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var union = require_arr_union();
    var define2 = require_define_property3();
    var staticExtend = require_static_extend();
    var isObj = require_isobject2();
    var cu = module2.exports;
    cu.isObject = function isObject(val) {
      return isObj(val) || typeof val === "function";
    };
    cu.has = function has(obj, val) {
      val = cu.arrayify(val);
      var len = val.length;
      if (cu.isObject(obj)) {
        for (var key in obj) {
          if (val.indexOf(key) > -1) {
            return true;
          }
        }
        var keys = cu.nativeKeys(obj);
        return cu.has(keys, val);
      }
      if (Array.isArray(obj)) {
        var arr = obj;
        while (len--) {
          if (arr.indexOf(val[len]) > -1) {
            return true;
          }
        }
        return false;
      }
      throw new TypeError("expected an array or object.");
    };
    cu.hasAll = function hasAll(val, values) {
      values = cu.arrayify(values);
      var len = values.length;
      while (len--) {
        if (!cu.has(val, values[len])) {
          return false;
        }
      }
      return true;
    };
    cu.arrayify = function arrayify(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    cu.noop = function noop() {
      return;
    };
    cu.identity = function identity(val) {
      return val;
    };
    cu.hasConstructor = function hasConstructor(val) {
      return cu.isObject(val) && typeof val.constructor !== "undefined";
    };
    cu.nativeKeys = function nativeKeys(val) {
      if (!cu.hasConstructor(val)) return [];
      var keys = Object.getOwnPropertyNames(val);
      if ("caller" in val) keys.push("caller");
      return keys;
    };
    cu.getDescriptor = function getDescriptor(obj, key) {
      if (!cu.isObject(obj)) {
        throw new TypeError("expected an object.");
      }
      if (typeof key !== "string") {
        throw new TypeError("expected key to be a string.");
      }
      return Object.getOwnPropertyDescriptor(obj, key);
    };
    cu.copyDescriptor = function copyDescriptor(receiver, provider, name) {
      if (!cu.isObject(receiver)) {
        throw new TypeError("expected receiving object to be an object.");
      }
      if (!cu.isObject(provider)) {
        throw new TypeError("expected providing object to be an object.");
      }
      if (typeof name !== "string") {
        throw new TypeError("expected name to be a string.");
      }
      var val = cu.getDescriptor(provider, name);
      if (val) Object.defineProperty(receiver, name, val);
    };
    cu.copy = function copy(receiver, provider, omit) {
      if (!cu.isObject(receiver)) {
        throw new TypeError("expected receiving object to be an object.");
      }
      if (!cu.isObject(provider)) {
        throw new TypeError("expected providing object to be an object.");
      }
      var props = Object.getOwnPropertyNames(provider);
      var keys = Object.keys(provider);
      var len = props.length, key;
      omit = cu.arrayify(omit);
      while (len--) {
        key = props[len];
        if (cu.has(keys, key)) {
          define2(receiver, key, provider[key]);
        } else if (!(key in receiver) && !cu.has(omit, key)) {
          cu.copyDescriptor(receiver, provider, key);
        }
      }
    };
    cu.inherit = function inherit(receiver, provider, omit) {
      if (!cu.isObject(receiver)) {
        throw new TypeError("expected receiving object to be an object.");
      }
      if (!cu.isObject(provider)) {
        throw new TypeError("expected providing object to be an object.");
      }
      var keys = [];
      for (var key in provider) {
        keys.push(key);
        receiver[key] = provider[key];
      }
      keys = keys.concat(cu.arrayify(omit));
      var a = provider.prototype || provider;
      var b = receiver.prototype || receiver;
      cu.copy(b, a, keys);
    };
    cu.extend = function() {
      return staticExtend.apply(null, arguments);
    };
    cu.bubble = function(Parent, events) {
      events = events || [];
      Parent.bubble = function(Child, arr) {
        if (Array.isArray(arr)) {
          events = union([], events, arr);
        }
        var len = events.length;
        var idx = -1;
        while (++idx < len) {
          var name = events[idx];
          Parent.on(name, Child.emit.bind(Child, name));
        }
        cu.bubble(Child, events);
      };
    };
  }
});

// ../../node_modules/.pnpm/base@0.11.2/node_modules/base/index.js
var require_base = __commonJS({
  "../../node_modules/.pnpm/base@0.11.2/node_modules/base/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var define2 = require_define_property2();
    var CacheBase = require_cache_base();
    var Emitter = require_component_emitter();
    var isObject = require_isobject2();
    var merge2 = require_mixin_deep();
    var pascal = require_pascalcase();
    var cu = require_class_utils();
    function namespace(name) {
      var Cache = name ? CacheBase.namespace(name) : CacheBase;
      var fns = [];
      function Base(config2, options) {
        if (!(this instanceof Base)) {
          return new Base(config2, options);
        }
        Cache.call(this, config2);
        this.is("base");
        this.initBase(config2, options);
      }
      util.inherits(Base, Cache);
      Emitter(Base);
      Base.prototype.initBase = function(config2, options) {
        this.options = merge2({}, this.options, options);
        this.cache = this.cache || {};
        this.define("registered", {});
        if (name) this[name] = {};
        this.define("_callbacks", this._callbacks);
        if (isObject(config2)) {
          this.visit("set", config2);
        }
        Base.run(this, "use", fns);
      };
      Base.prototype.is = function(name2) {
        if (typeof name2 !== "string") {
          throw new TypeError("expected name to be a string");
        }
        this.define("is" + pascal(name2), true);
        this.define("_name", name2);
        this.define("_appname", name2);
        return this;
      };
      Base.prototype.isRegistered = function(name2, register) {
        if (this.registered.hasOwnProperty(name2)) {
          return true;
        }
        if (register !== false) {
          this.registered[name2] = true;
          this.emit("plugin", name2);
        }
        return false;
      };
      Base.prototype.use = function(fn) {
        fn.call(this, this);
        return this;
      };
      Base.prototype.define = function(key, val) {
        if (isObject(key)) {
          return this.visit("define", key);
        }
        define2(this, key, val);
        return this;
      };
      Base.prototype.mixin = function(key, val) {
        Base.prototype[key] = val;
        return this;
      };
      Base.prototype.mixins = Base.prototype.mixins || [];
      Object.defineProperty(Base.prototype, "base", {
        configurable: true,
        get: function() {
          return this.parent ? this.parent.base : this;
        }
      });
      define2(Base, "use", function(fn) {
        fns.push(fn);
        return Base;
      });
      define2(Base, "run", function(obj, prop, arr) {
        var len = arr.length, i = 0;
        while (len--) {
          obj[prop](arr[i++]);
        }
        return Base;
      });
      define2(Base, "extend", cu.extend(Base, function(Ctor, Parent) {
        Ctor.prototype.mixins = Ctor.prototype.mixins || [];
        define2(Ctor, "mixin", function(fn) {
          var mixin = fn(Ctor.prototype, Ctor);
          if (typeof mixin === "function") {
            Ctor.prototype.mixins.push(mixin);
          }
          return Ctor;
        });
        define2(Ctor, "mixins", function(Child) {
          Base.run(Child, "mixin", Ctor.prototype.mixins);
          return Ctor;
        });
        Ctor.prototype.mixin = function(key, value) {
          Ctor.prototype[key] = value;
          return this;
        };
        return Base;
      }));
      define2(Base, "mixin", function(fn) {
        var mixin = fn(Base.prototype, Base);
        if (typeof mixin === "function") {
          Base.prototype.mixins.push(mixin);
        }
        return Base;
      });
      define2(Base, "mixins", function(Child) {
        Base.run(Child, "mixin", Base.prototype.mixins);
        return Base;
      });
      define2(Base, "inherit", cu.inherit);
      define2(Base, "bubble", cu.bubble);
      return Base;
    }
    module2.exports = namespace();
    module2.exports.namespace = namespace;
  }
});

// ../../node_modules/.pnpm/use@3.1.1/node_modules/use/index.js
var require_use = __commonJS({
  "../../node_modules/.pnpm/use@3.1.1/node_modules/use/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function base(app, options) {
      if (!isObject(app) && typeof app !== "function") {
        throw new TypeError("expected an object or function");
      }
      var opts = isObject(options) ? options : {};
      var prop = typeof opts.prop === "string" ? opts.prop : "fns";
      if (!Array.isArray(app[prop])) {
        define2(app, prop, []);
      }
      define2(app, "use", use);
      define2(app, "run", function(val) {
        if (!isObject(val)) return;
        if (!val.use || !val.run) {
          define2(val, prop, val[prop] || []);
          define2(val, "use", use);
        }
        if (!val[prop] || val[prop].indexOf(base) === -1) {
          val.use(base);
        }
        var self2 = this || app;
        var fns = self2[prop];
        var len = fns.length;
        var idx = -1;
        while (++idx < len) {
          val.use(fns[idx]);
        }
        return val;
      });
      function use(type, fn, options2) {
        var offset = 1;
        if (typeof type === "string" || Array.isArray(type)) {
          fn = wrap(type, fn);
          offset++;
        } else {
          options2 = fn;
          fn = type;
        }
        if (typeof fn !== "function") {
          throw new TypeError("expected a function");
        }
        var self2 = this || app;
        var fns = self2[prop];
        var args = [].slice.call(arguments, offset);
        args.unshift(self2);
        if (typeof opts.hook === "function") {
          opts.hook.apply(self2, args);
        }
        var val = fn.apply(self2, args);
        if (typeof val === "function" && fns.indexOf(val) === -1) {
          fns.push(val);
        }
        return self2;
      }
      function wrap(type, fn) {
        return function plugin() {
          return this.type === type ? fn.apply(this, arguments) : plugin;
        };
      }
      return app;
    };
    function isObject(val) {
      return val && typeof val === "object" && !Array.isArray(val);
    }
    function define2(obj, key, val) {
      Object.defineProperty(obj, key, {
        configurable: true,
        writable: true,
        value: val
      });
    }
  }
});

// ../../node_modules/.pnpm/ms@2.0.0/node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/.pnpm/ms@2.0.0/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/debug.js"(exports2, module2) {
    exports2 = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports2.coerce = coerce;
    exports2.disable = disable;
    exports2.enable = enable;
    exports2.enabled = enabled;
    exports2.humanize = require_ms();
    exports2.names = [];
    exports2.skips = [];
    exports2.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports2.colors[Math.abs(hash) % exports2.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return;
        var self2 = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports2.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports2.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports2.formatArgs.call(self2, args);
        var logFn = debug.log || exports2.log || console.log.bind(console);
        logFn.apply(self2, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports2.enabled(namespace);
      debug.useColors = exports2.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports2.init) {
        exports2.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports2.save(namespaces);
      exports2.names = [];
      exports2.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports2.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports2.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports2.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports2.skips.length; i < len; i++) {
        if (exports2.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports2.names.length; i < len; i++) {
        if (exports2.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/browser.js"(exports2, module2) {
    exports2 = module2.exports = require_debug();
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports2.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports2.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports2.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports2.storage.removeItem("debug");
        } else {
          exports2.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports2.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports2.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/node.js
var require_node2 = __commonJS({
  "../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2 = module2.exports = require_debug();
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.colors = [6, 2, 3, 4, 5, 1];
    exports2.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(fd);
    }
    exports2.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports2.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports2.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs = require("fs");
          stream2 = new fs.SyncWriteStream(fd2, { autoClose: false });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = require("net");
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports2.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    exports2.enable(load());
  }
});

// ../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process !== "undefined" && process.type === "renderer") {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node2();
    }
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/base64.js
var require_base64 = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/base64.js"(exports2) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports2.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports2.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/base64-vlq.js"(exports2) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports2.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports2.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/util.js
var require_util2 = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/util.js"(exports2) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports2.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports2.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports2.urlGenerate = urlGenerate;
    function normalize(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path = url.path;
      }
      var isAbsolute = exports2.isAbsolute(path);
      var parts = path.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path = parts.join("/");
      if (path === "") {
        path = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path;
        return urlGenerate(url);
      }
      return path;
    }
    exports2.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports2.join = join;
    exports2.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || !!aPath.match(urlRegexp);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports2.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports2.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports2.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = mappingA.source - mappingB.source;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return mappingA.name - mappingB.name;
    }
    exports2.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = mappingA.source - mappingB.source;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return mappingA.name - mappingB.name;
    }
    exports2.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/array-set.js
var require_array_set = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/array-set.js"(exports2) {
    var util = require_util2();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports2.ArraySet = ArraySet;
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/mapping-list.js"(exports2) {
    var util = require_util2();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports2.MappingList = MappingList;
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/source-map-generator.js"(exports2) {
    var base64VLQ = require_base64_vlq();
    var util = require_util2();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports2.SourceMapGenerator = SourceMapGenerator;
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/binary-search.js
var require_binary_search = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/binary-search.js"(exports2) {
    exports2.GREATEST_LOWER_BOUND = 1;
    exports2.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports2.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports2.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/quick-sort.js"(exports2) {
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp;
    }
    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low));
    }
    function doQuickSort(ary, comparator, p, r) {
      if (p < r) {
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        for (var j = p; j < r; j++) {
          if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            swap(ary, i, j);
          }
        }
        swap(ary, i + 1, j);
        var q = i + 1;
        doQuickSort(ary, comparator, p, q - 1);
        doQuickSort(ary, comparator, q + 1, r);
      }
    }
    exports2.quickSort = function(ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1);
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/source-map-consumer.js"(exports2) {
    var util = require_util2();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer(aSourceMap) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ""));
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
    }
    SourceMapConsumer.fromSourceMap = function(aSourceMap) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        if (source != null && sourceRoot != null) {
          source = util.join(sourceRoot, source);
        }
        return {
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }
      if (!this._sources.has(needle.source)) {
        return [];
      }
      needle.source = this._sources.indexOf(needle.source);
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    };
    exports2.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ""));
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._sources.toArray().map(function(s) {
          return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
        }, this);
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }
            if (segment.length === 2) {
              throw new Error("Found a source, but no line and column");
            }
            if (segment.length === 3) {
              throw new Error("Found a source and line, but no column");
            }
            cachedSegments[str] = segment;
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            originalMappings.push(mapping);
          }
        }
      }
      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;
      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            if (this.sourceRoot != null) {
              source = util.join(this.sourceRoot, source);
            }
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      if (this.sourceRoot != null) {
        aSource = util.relative(this.sourceRoot, aSource);
      }
      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      if (this.sourceRoot != null) {
        source = util.relative(this.sourceRoot, source);
      }
      if (!this._sources.has(source)) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      source = this._sources.indexOf(source);
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports2.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ""));
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"))
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer.sources.indexOf(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          if (section.consumer.sourceRoot !== null) {
            source = util.join(section.consumer.sourceRoot, source);
          }
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };
    exports2.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/source-node.js
var require_source_node = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/lib/source-node.js"(exports2) {
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util = require_util2();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex];
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex];
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports2.SourceNode = SourceNode;
  }
});

// ../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/source-map.js
var require_source_map = __commonJS({
  "../../node_modules/.pnpm/source-map@0.5.7/node_modules/source-map/source-map.js"(exports2) {
    exports2.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports2.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports2.SourceNode = require_source_node().SourceNode;
  }
});

// ../../node_modules/.pnpm/source-map-url@0.4.1/node_modules/source-map-url/source-map-url.js
var require_source_map_url = __commonJS({
  "../../node_modules/.pnpm/source-map-url@0.4.1/node_modules/source-map-url/source-map-url.js"(exports2, module2) {
    void function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports2 === "object") {
        module2.exports = factory();
      } else {
        root.sourceMappingURL = factory();
      }
    }(exports2, function() {
      var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/;
      var regex = RegExp(
        "(?:/\\*(?:\\s*\r?\n(?://)?)?(?:" + innerRegex.source + ")\\s*\\*/|//(?:" + innerRegex.source + "))\\s*"
      );
      return {
        regex,
        _innerRegex: innerRegex,
        getFrom: function(code) {
          var match = code.match(regex);
          return match ? match[1] || match[2] || "" : null;
        },
        existsIn: function(code) {
          return regex.test(code);
        },
        removeFrom: function(code) {
          return code.replace(regex, "");
        },
        insertBefore: function(code, string) {
          var match = code.match(regex);
          if (match) {
            return code.slice(0, match.index) + string + code.slice(match.index);
          } else {
            return code + string;
          }
        }
      };
    });
  }
});

// ../../node_modules/.pnpm/source-map-resolve@0.5.3/node_modules/source-map-resolve/lib/resolve-url.js
var require_resolve_url = __commonJS({
  "../../node_modules/.pnpm/source-map-resolve@0.5.3/node_modules/source-map-resolve/lib/resolve-url.js"(exports2, module2) {
    var url = require("url");
    function resolveUrl() {
      return Array.prototype.reduce.call(arguments, function(resolved, nextUrl) {
        return url.resolve(resolved, nextUrl);
      });
    }
    module2.exports = resolveUrl;
  }
});

// ../../node_modules/.pnpm/decode-uri-component@0.2.2/node_modules/decode-uri-component/index.js
var require_decode_uri_component = __commonJS({
  "../../node_modules/.pnpm/decode-uri-component@0.2.2/node_modules/decode-uri-component/index.js"(exports2, module2) {
    "use strict";
    var token = "%[a-f0-9]{2}";
    var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
    var multiMatcher = new RegExp("(" + token + ")+", "gi");
    function decodeComponents(components, split) {
      try {
        return [decodeURIComponent(components.join(""))];
      } catch (err) {
      }
      if (components.length === 1) {
        return components;
      }
      split = split || 1;
      var left = components.slice(0, split);
      var right = components.slice(split);
      return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
    }
    function decode(input) {
      try {
        return decodeURIComponent(input);
      } catch (err) {
        var tokens = input.match(singleMatcher) || [];
        for (var i = 1; i < tokens.length; i++) {
          input = decodeComponents(tokens, i).join("");
          tokens = input.match(singleMatcher) || [];
        }
        return input;
      }
    }
    function customDecodeURIComponent(input) {
      var replaceMap = {
        "%FE%FF": "\uFFFD\uFFFD",
        "%FF%FE": "\uFFFD\uFFFD"
      };
      var match = multiMatcher.exec(input);
      while (match) {
        try {
          replaceMap[match[0]] = decodeURIComponent(match[0]);
        } catch (err) {
          var result = decode(match[0]);
          if (result !== match[0]) {
            replaceMap[match[0]] = result;
          }
        }
        match = multiMatcher.exec(input);
      }
      replaceMap["%C2"] = "\uFFFD";
      var entries = Object.keys(replaceMap);
      for (var i = 0; i < entries.length; i++) {
        var key = entries[i];
        input = input.replace(new RegExp(key, "g"), replaceMap[key]);
      }
      return input;
    }
    module2.exports = function(encodedURI) {
      if (typeof encodedURI !== "string") {
        throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
      }
      try {
        encodedURI = encodedURI.replace(/\+/g, " ");
        return decodeURIComponent(encodedURI);
      } catch (err) {
        return customDecodeURIComponent(encodedURI);
      }
    };
  }
});

// ../../node_modules/.pnpm/source-map-resolve@0.5.3/node_modules/source-map-resolve/lib/decode-uri-component.js
var require_decode_uri_component2 = __commonJS({
  "../../node_modules/.pnpm/source-map-resolve@0.5.3/node_modules/source-map-resolve/lib/decode-uri-component.js"(exports2, module2) {
    var decodeUriComponent = require_decode_uri_component();
    function customDecodeUriComponent(string) {
      return decodeUriComponent(string.replace(/\+/g, "%2B"));
    }
    module2.exports = customDecodeUriComponent;
  }
});

// ../../node_modules/.pnpm/urix@0.1.0/node_modules/urix/index.js
var require_urix = __commonJS({
  "../../node_modules/.pnpm/urix@0.1.0/node_modules/urix/index.js"(exports2, module2) {
    var path = require("path");
    function urix(aPath) {
      if (path.sep === "\\") {
        return aPath.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/");
      }
      return aPath;
    }
    module2.exports = urix;
  }
});

// ../../node_modules/.pnpm/atob@2.1.2/node_modules/atob/node-atob.js
var require_node_atob = __commonJS({
  "../../node_modules/.pnpm/atob@2.1.2/node_modules/atob/node-atob.js"(exports2, module2) {
    "use strict";
    function atob(str) {
      return Buffer.from(str, "base64").toString("binary");
    }
    module2.exports = atob.atob = atob;
  }
});

// ../../node_modules/.pnpm/source-map-resolve@0.5.3/node_modules/source-map-resolve/lib/source-map-resolve-node.js
var require_source_map_resolve_node = __commonJS({
  "../../node_modules/.pnpm/source-map-resolve@0.5.3/node_modules/source-map-resolve/lib/source-map-resolve-node.js"(exports2, module2) {
    var sourceMappingURL = require_source_map_url();
    var resolveUrl = require_resolve_url();
    var decodeUriComponent = require_decode_uri_component2();
    var urix = require_urix();
    var atob = require_node_atob();
    function callbackAsync(callback, error, result) {
      setImmediate(function() {
        callback(error, result);
      });
    }
    function parseMapToJSON(string, data) {
      try {
        return JSON.parse(string.replace(/^\)\]\}'/, ""));
      } catch (error) {
        error.sourceMapData = data;
        throw error;
      }
    }
    function readSync(read, url, data) {
      var readUrl = decodeUriComponent(url);
      try {
        return String(read(readUrl));
      } catch (error) {
        error.sourceMapData = data;
        throw error;
      }
    }
    function resolveSourceMap(code, codeUrl, read, callback) {
      var mapData;
      try {
        mapData = resolveSourceMapHelper(code, codeUrl);
      } catch (error) {
        return callbackAsync(callback, error);
      }
      if (!mapData || mapData.map) {
        return callbackAsync(callback, null, mapData);
      }
      var readUrl = decodeUriComponent(mapData.url);
      read(readUrl, function(error, result) {
        if (error) {
          error.sourceMapData = mapData;
          return callback(error);
        }
        mapData.map = String(result);
        try {
          mapData.map = parseMapToJSON(mapData.map, mapData);
        } catch (error2) {
          return callback(error2);
        }
        callback(null, mapData);
      });
    }
    function resolveSourceMapSync(code, codeUrl, read) {
      var mapData = resolveSourceMapHelper(code, codeUrl);
      if (!mapData || mapData.map) {
        return mapData;
      }
      mapData.map = readSync(read, mapData.url, mapData);
      mapData.map = parseMapToJSON(mapData.map, mapData);
      return mapData;
    }
    var dataUriRegex = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/;
    var jsonMimeTypeRegex = /^(?:application|text)\/json$/;
    var jsonCharacterEncoding = "utf-8";
    function base64ToBuf(b64) {
      var binStr = atob(b64);
      var len = binStr.length;
      var arr = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      return arr;
    }
    function decodeBase64String(b64) {
      if (typeof TextDecoder === "undefined" || typeof Uint8Array === "undefined") {
        return atob(b64);
      }
      var buf = base64ToBuf(b64);
      var decoder = new TextDecoder(jsonCharacterEncoding, { fatal: true });
      return decoder.decode(buf);
    }
    function resolveSourceMapHelper(code, codeUrl) {
      codeUrl = urix(codeUrl);
      var url = sourceMappingURL.getFrom(code);
      if (!url) {
        return null;
      }
      var dataUri = url.match(dataUriRegex);
      if (dataUri) {
        var mimeType = dataUri[1] || "text/plain";
        var lastParameter = dataUri[2] || "";
        var encoded = dataUri[3] || "";
        var data = {
          sourceMappingURL: url,
          url: null,
          sourcesRelativeTo: codeUrl,
          map: encoded
        };
        if (!jsonMimeTypeRegex.test(mimeType)) {
          var error = new Error("Unuseful data uri mime type: " + mimeType);
          error.sourceMapData = data;
          throw error;
        }
        try {
          data.map = parseMapToJSON(
            lastParameter === ";base64" ? decodeBase64String(encoded) : decodeURIComponent(encoded),
            data
          );
        } catch (error2) {
          error2.sourceMapData = data;
          throw error2;
        }
        return data;
      }
      var mapUrl = resolveUrl(codeUrl, url);
      return {
        sourceMappingURL: url,
        url: mapUrl,
        sourcesRelativeTo: mapUrl,
        map: null
      };
    }
    function resolveSources(map, mapUrl, read, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      var pending = map.sources ? map.sources.length : 0;
      var result = {
        sourcesResolved: [],
        sourcesContent: []
      };
      if (pending === 0) {
        callbackAsync(callback, null, result);
        return;
      }
      var done = function() {
        pending--;
        if (pending === 0) {
          callback(null, result);
        }
      };
      resolveSourcesHelper(map, mapUrl, options, function(fullUrl, sourceContent, index) {
        result.sourcesResolved[index] = fullUrl;
        if (typeof sourceContent === "string") {
          result.sourcesContent[index] = sourceContent;
          callbackAsync(done, null);
        } else {
          var readUrl = decodeUriComponent(fullUrl);
          read(readUrl, function(error, source) {
            result.sourcesContent[index] = error ? error : String(source);
            done();
          });
        }
      });
    }
    function resolveSourcesSync(map, mapUrl, read, options) {
      var result = {
        sourcesResolved: [],
        sourcesContent: []
      };
      if (!map.sources || map.sources.length === 0) {
        return result;
      }
      resolveSourcesHelper(map, mapUrl, options, function(fullUrl, sourceContent, index) {
        result.sourcesResolved[index] = fullUrl;
        if (read !== null) {
          if (typeof sourceContent === "string") {
            result.sourcesContent[index] = sourceContent;
          } else {
            var readUrl = decodeUriComponent(fullUrl);
            try {
              result.sourcesContent[index] = String(read(readUrl));
            } catch (error) {
              result.sourcesContent[index] = error;
            }
          }
        }
      });
      return result;
    }
    var endingSlash = /\/?$/;
    function resolveSourcesHelper(map, mapUrl, options, fn) {
      options = options || {};
      mapUrl = urix(mapUrl);
      var fullUrl;
      var sourceContent;
      var sourceRoot;
      for (var index = 0, len = map.sources.length; index < len; index++) {
        sourceRoot = null;
        if (typeof options.sourceRoot === "string") {
          sourceRoot = options.sourceRoot;
        } else if (typeof map.sourceRoot === "string" && options.sourceRoot !== false) {
          sourceRoot = map.sourceRoot;
        }
        if (sourceRoot === null || sourceRoot === "") {
          fullUrl = resolveUrl(mapUrl, map.sources[index]);
        } else {
          fullUrl = resolveUrl(mapUrl, sourceRoot.replace(endingSlash, "/"), map.sources[index]);
        }
        sourceContent = (map.sourcesContent || [])[index];
        fn(fullUrl, sourceContent, index);
      }
    }
    function resolve(code, codeUrl, read, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (code === null) {
        var mapUrl = codeUrl;
        var data = {
          sourceMappingURL: null,
          url: mapUrl,
          sourcesRelativeTo: mapUrl,
          map: null
        };
        var readUrl = decodeUriComponent(mapUrl);
        read(readUrl, function(error, result) {
          if (error) {
            error.sourceMapData = data;
            return callback(error);
          }
          data.map = String(result);
          try {
            data.map = parseMapToJSON(data.map, data);
          } catch (error2) {
            return callback(error2);
          }
          _resolveSources(data);
        });
      } else {
        resolveSourceMap(code, codeUrl, read, function(error, mapData) {
          if (error) {
            return callback(error);
          }
          if (!mapData) {
            return callback(null, null);
          }
          _resolveSources(mapData);
        });
      }
      function _resolveSources(mapData) {
        resolveSources(mapData.map, mapData.sourcesRelativeTo, read, options, function(error, result) {
          if (error) {
            return callback(error);
          }
          mapData.sourcesResolved = result.sourcesResolved;
          mapData.sourcesContent = result.sourcesContent;
          callback(null, mapData);
        });
      }
    }
    function resolveSync(code, codeUrl, read, options) {
      var mapData;
      if (code === null) {
        var mapUrl = codeUrl;
        mapData = {
          sourceMappingURL: null,
          url: mapUrl,
          sourcesRelativeTo: mapUrl,
          map: null
        };
        mapData.map = readSync(read, mapUrl, mapData);
        mapData.map = parseMapToJSON(mapData.map, mapData);
      } else {
        mapData = resolveSourceMapSync(code, codeUrl, read);
        if (!mapData) {
          return null;
        }
      }
      var result = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read, options);
      mapData.sourcesResolved = result.sourcesResolved;
      mapData.sourcesContent = result.sourcesContent;
      return mapData;
    }
    module2.exports = {
      resolveSourceMap,
      resolveSourceMapSync,
      resolveSources,
      resolveSourcesSync,
      resolve,
      resolveSync,
      parseMapToJSON
    };
  }
});

// ../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/utils.js
var require_utils3 = __commonJS({
  "../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/utils.js"(exports2) {
    "use strict";
    exports2.extend = require_extend_shallow2();
    exports2.SourceMap = require_source_map();
    exports2.sourceMapResolve = require_source_map_resolve_node();
    exports2.unixify = function(fp) {
      return fp.split(/\\+/).join("/");
    };
    exports2.isString = function(str) {
      return str && typeof str === "string";
    };
    exports2.arrayify = function(val) {
      if (typeof val === "string") return [val];
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.last = function(arr, n) {
      return arr[arr.length - (n || 1)];
    };
  }
});

// ../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/source-maps.js
var require_source_maps = __commonJS({
  "../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/source-maps.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var define2 = require_define_property3();
    var utils = require_utils3();
    module2.exports = mixin;
    function mixin(compiler) {
      define2(compiler, "_comment", compiler.comment);
      compiler.map = new utils.SourceMap.SourceMapGenerator();
      compiler.position = { line: 1, column: 1 };
      compiler.content = {};
      compiler.files = {};
      for (var key in exports2) {
        define2(compiler, key, exports2[key]);
      }
    }
    exports2.updatePosition = function(str) {
      var lines = str.match(/\n/g);
      if (lines) this.position.line += lines.length;
      var i = str.lastIndexOf("\n");
      this.position.column = ~i ? str.length - i : this.position.column + str.length;
    };
    exports2.emit = function(str, node) {
      var position = node.position || {};
      var source = position.source;
      if (source) {
        if (position.filepath) {
          source = utils.unixify(position.filepath);
        }
        this.map.addMapping({
          source,
          generated: {
            line: this.position.line,
            column: Math.max(this.position.column - 1, 0)
          },
          original: {
            line: position.start.line,
            column: position.start.column - 1
          }
        });
        if (position.content) {
          this.addContent(source, position);
        }
        if (position.filepath) {
          this.addFile(source, position);
        }
        this.updatePosition(str);
        this.output += str;
      }
      return str;
    };
    exports2.addFile = function(file, position) {
      if (typeof position.content !== "string") return;
      if (Object.prototype.hasOwnProperty.call(this.files, file)) return;
      this.files[file] = position.content;
    };
    exports2.addContent = function(source, position) {
      if (typeof position.content !== "string") return;
      if (Object.prototype.hasOwnProperty.call(this.content, source)) return;
      this.map.setSourceContent(source, position.content);
    };
    exports2.applySourceMaps = function() {
      Object.keys(this.files).forEach(function(file) {
        var content = this.files[file];
        this.map.setSourceContent(file, content);
        if (this.options.inputSourcemaps === true) {
          var originalMap = utils.sourceMapResolve.resolveSync(content, file, fs.readFileSync);
          if (originalMap) {
            var map = new utils.SourceMap.SourceMapConsumer(originalMap.map);
            var relativeTo = originalMap.sourcesRelativeTo;
            this.map.applySourceMap(map, file, utils.unixify(path.dirname(relativeTo)));
          }
        }
      }, this);
    };
    exports2.comment = function(node) {
      if (/^# sourceMappingURL=/.test(node.comment)) {
        return this.emit("", node.position);
      }
      return this._comment(node);
    };
  }
});

// ../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/compiler.js
var require_compiler2 = __commonJS({
  "../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/compiler.js"(exports2, module2) {
    "use strict";
    var use = require_use();
    var define2 = require_define_property3();
    var debug = require_src()("snapdragon:compiler");
    var utils = require_utils3();
    function Compiler(options, state) {
      debug("initializing", __filename);
      this.options = utils.extend({ source: "string" }, options);
      this.state = state || {};
      this.compilers = {};
      this.output = "";
      this.set("eos", function(node) {
        return this.emit(node.val, node);
      });
      this.set("noop", function(node) {
        return this.emit(node.val, node);
      });
      this.set("bos", function(node) {
        return this.emit(node.val, node);
      });
      use(this);
    }
    Compiler.prototype = {
      /**
       * Throw an error message with details including the cursor position.
       * @param {String} `msg` Message to use in the Error.
       */
      error: function(msg, node) {
        var pos = node.position || { start: { column: 0 } };
        var message = this.options.source + " column:" + pos.start.column + ": " + msg;
        var err = new Error(message);
        err.reason = msg;
        err.column = pos.start.column;
        err.source = this.pattern;
        if (this.options.silent) {
          this.errors.push(err);
        } else {
          throw err;
        }
      },
      /**
       * Define a non-enumberable property on the `Compiler` instance.
       *
       * ```js
       * compiler.define('foo', 'bar');
       * ```
       * @name .define
       * @param {String} `key` propery name
       * @param {any} `val` property value
       * @return {Object} Returns the Compiler instance for chaining.
       * @api public
       */
      define: function(key, val) {
        define2(this, key, val);
        return this;
      },
      /**
       * Emit `node.val`
       */
      emit: function(str, node) {
        this.output += str;
        return str;
      },
      /**
       * Add a compiler `fn` with the given `name`
       */
      set: function(name, fn) {
        this.compilers[name] = fn;
        return this;
      },
      /**
       * Get compiler `name`.
       */
      get: function(name) {
        return this.compilers[name];
      },
      /**
       * Get the previous AST node.
       */
      prev: function(n) {
        return this.ast.nodes[this.idx - (n || 1)] || { type: "bos", val: "" };
      },
      /**
       * Get the next AST node.
       */
      next: function(n) {
        return this.ast.nodes[this.idx + (n || 1)] || { type: "eos", val: "" };
      },
      /**
       * Visit `node`.
       */
      visit: function(node, nodes, i) {
        var fn = this.compilers[node.type];
        this.idx = i;
        if (typeof fn !== "function") {
          throw this.error('compiler "' + node.type + '" is not registered', node);
        }
        return fn.call(this, node, nodes, i);
      },
      /**
       * Map visit over array of `nodes`.
       */
      mapVisit: function(nodes) {
        if (!Array.isArray(nodes)) {
          throw new TypeError("expected an array");
        }
        var len = nodes.length;
        var idx = -1;
        while (++idx < len) {
          this.visit(nodes[idx], nodes, idx);
        }
        return this;
      },
      /**
       * Compile `ast`.
       */
      compile: function(ast, options) {
        var opts = utils.extend({}, this.options, options);
        this.ast = ast;
        this.parsingErrors = this.ast.errors;
        this.output = "";
        if (opts.sourcemap) {
          var sourcemaps = require_source_maps();
          sourcemaps(this);
          this.mapVisit(this.ast.nodes);
          this.applySourceMaps();
          this.map = opts.sourcemap === "generator" ? this.map : this.map.toJSON();
          return this;
        }
        this.mapVisit(this.ast.nodes);
        return this;
      }
    };
    module2.exports = Compiler;
  }
});

// ../../node_modules/.pnpm/map-cache@0.2.2/node_modules/map-cache/index.js
var require_map_cache = __commonJS({
  "../../node_modules/.pnpm/map-cache@0.2.2/node_modules/map-cache/index.js"(exports2, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    module2.exports = MapCache;
    function MapCache(data) {
      this.__data__ = data || {};
    }
    MapCache.prototype.set = function mapSet(key, value) {
      if (key !== "__proto__") {
        this.__data__[key] = value;
      }
      return this;
    };
    MapCache.prototype.get = function mapGet(key) {
      return key === "__proto__" ? void 0 : this.__data__[key];
    };
    MapCache.prototype.has = function mapHas(key) {
      return key !== "__proto__" && hasOwn.call(this.__data__, key);
    };
    MapCache.prototype.del = function mapDelete(key) {
      return this.has(key) && delete this.__data__[key];
    };
  }
});

// ../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/position.js
var require_position = __commonJS({
  "../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/position.js"(exports2, module2) {
    "use strict";
    var define2 = require_define_property3();
    module2.exports = function Position(start, parser) {
      this.start = start;
      this.end = { line: parser.line, column: parser.column };
      define2(this, "content", parser.orig);
      define2(this, "source", parser.options.source);
    };
  }
});

// ../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/parser.js
var require_parser2 = __commonJS({
  "../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/lib/parser.js"(exports2, module2) {
    "use strict";
    var use = require_use();
    var util = require("util");
    var Cache = require_map_cache();
    var define2 = require_define_property3();
    var debug = require_src()("snapdragon:parser");
    var Position = require_position();
    var utils = require_utils3();
    function Parser(options) {
      debug("initializing", __filename);
      this.options = utils.extend({ source: "string" }, options);
      this.init(this.options);
      use(this);
    }
    Parser.prototype = {
      constructor: Parser,
      init: function(options) {
        this.orig = "";
        this.input = "";
        this.parsed = "";
        this.column = 1;
        this.line = 1;
        this.regex = new Cache();
        this.errors = this.errors || [];
        this.parsers = this.parsers || {};
        this.types = this.types || [];
        this.sets = this.sets || {};
        this.fns = this.fns || [];
        this.currentType = "root";
        var pos = this.position();
        this.bos = pos({ type: "bos", val: "" });
        this.ast = {
          type: "root",
          errors: this.errors,
          nodes: [this.bos]
        };
        define2(this.bos, "parent", this.ast);
        this.nodes = [this.ast];
        this.count = 0;
        this.setCount = 0;
        this.stack = [];
      },
      /**
       * Throw a formatted error with the cursor column and `msg`.
       * @param {String} `msg` Message to use in the Error.
       */
      error: function(msg, node) {
        var pos = node.position || { start: { column: 0, line: 0 } };
        var line = pos.start.line;
        var column = pos.start.column;
        var source = this.options.source;
        var message = source + " <line:" + line + " column:" + column + ">: " + msg;
        var err = new Error(message);
        err.source = source;
        err.reason = msg;
        err.pos = pos;
        if (this.options.silent) {
          this.errors.push(err);
        } else {
          throw err;
        }
      },
      /**
       * Define a non-enumberable property on the `Parser` instance.
       *
       * ```js
       * parser.define('foo', 'bar');
       * ```
       * @name .define
       * @param {String} `key` propery name
       * @param {any} `val` property value
       * @return {Object} Returns the Parser instance for chaining.
       * @api public
       */
      define: function(key, val) {
        define2(this, key, val);
        return this;
      },
      /**
       * Mark position and patch `node.position`.
       */
      position: function() {
        var start = { line: this.line, column: this.column };
        var self2 = this;
        return function(node) {
          define2(node, "position", new Position(start, self2));
          return node;
        };
      },
      /**
       * Set parser `name` with the given `fn`
       * @param {String} `name`
       * @param {Function} `fn`
       * @api public
       */
      set: function(type, fn) {
        if (this.types.indexOf(type) === -1) {
          this.types.push(type);
        }
        this.parsers[type] = fn.bind(this);
        return this;
      },
      /**
       * Get parser `name`
       * @param {String} `name`
       * @api public
       */
      get: function(name) {
        return this.parsers[name];
      },
      /**
       * Push a `token` onto the `type` stack.
       *
       * @param {String} `type`
       * @return {Object} `token`
       * @api public
       */
      push: function(type, token) {
        this.sets[type] = this.sets[type] || [];
        this.count++;
        this.stack.push(token);
        return this.sets[type].push(token);
      },
      /**
       * Pop a token off of the `type` stack
       * @param {String} `type`
       * @returns {Object} Returns a token
       * @api public
       */
      pop: function(type) {
        this.sets[type] = this.sets[type] || [];
        this.count--;
        this.stack.pop();
        return this.sets[type].pop();
      },
      /**
       * Return true if inside a `stack` node. Types are `braces`, `parens` or `brackets`.
       *
       * @param {String} `type`
       * @return {Boolean}
       * @api public
       */
      isInside: function(type) {
        this.sets[type] = this.sets[type] || [];
        return this.sets[type].length > 0;
      },
      /**
       * Return true if `node` is the given `type`.
       *
       * ```js
       * parser.isType(node, 'brace');
       * ```
       * @param {Object} `node`
       * @param {String} `type`
       * @return {Boolean}
       * @api public
       */
      isType: function(node, type) {
        return node && node.type === type;
      },
      /**
       * Get the previous AST node
       * @return {Object}
       */
      prev: function(n) {
        return this.stack.length > 0 ? utils.last(this.stack, n) : utils.last(this.nodes, n);
      },
      /**
       * Update line and column based on `str`.
       */
      consume: function(len) {
        this.input = this.input.substr(len);
      },
      /**
       * Update column based on `str`.
       */
      updatePosition: function(str, len) {
        var lines = str.match(/\n/g);
        if (lines) this.line += lines.length;
        var i = str.lastIndexOf("\n");
        this.column = ~i ? len - i : this.column + len;
        this.parsed += str;
        this.consume(len);
      },
      /**
       * Match `regex`, return captures, and update the cursor position by `match[0]` length.
       * @param {RegExp} `regex`
       * @return {Object}
       */
      match: function(regex) {
        var m = regex.exec(this.input);
        if (m) {
          this.updatePosition(m[0], m[0].length);
          return m;
        }
      },
      /**
       * Capture `type` with the given regex.
       * @param {String} `type`
       * @param {RegExp} `regex`
       * @return {Function}
       */
      capture: function(type, regex) {
        if (typeof regex === "function") {
          return this.set.apply(this, arguments);
        }
        this.regex.set(type, regex);
        this.set(type, function() {
          var parsed = this.parsed;
          var pos = this.position();
          var m = this.match(regex);
          if (!m || !m[0]) return;
          var prev = this.prev();
          var node = pos({
            type,
            val: m[0],
            parsed,
            rest: this.input
          });
          if (m[1]) {
            node.inner = m[1];
          }
          define2(node, "inside", this.stack.length > 0);
          define2(node, "parent", prev);
          prev.nodes.push(node);
        }.bind(this));
        return this;
      },
      /**
       * Create a parser with open and close for parens,
       * brackets or braces
       */
      capturePair: function(type, openRegex, closeRegex, fn) {
        this.sets[type] = this.sets[type] || [];
        this.set(type + ".open", function() {
          var parsed = this.parsed;
          var pos = this.position();
          var m = this.match(openRegex);
          if (!m || !m[0]) return;
          var val = m[0];
          this.setCount++;
          this.specialChars = true;
          var open = pos({
            type: type + ".open",
            val,
            rest: this.input
          });
          if (typeof m[1] !== "undefined") {
            open.inner = m[1];
          }
          var prev = this.prev();
          var node = pos({
            type,
            nodes: [open]
          });
          define2(node, "rest", this.input);
          define2(node, "parsed", parsed);
          define2(node, "prefix", m[1]);
          define2(node, "parent", prev);
          define2(open, "parent", node);
          if (typeof fn === "function") {
            fn.call(this, open, node);
          }
          this.push(type, node);
          prev.nodes.push(node);
        });
        this.set(type + ".close", function() {
          var pos = this.position();
          var m = this.match(closeRegex);
          if (!m || !m[0]) return;
          var parent = this.pop(type);
          var node = pos({
            type: type + ".close",
            rest: this.input,
            suffix: m[1],
            val: m[0]
          });
          if (!this.isType(parent, type)) {
            if (this.options.strict) {
              throw new Error('missing opening "' + type + '"');
            }
            this.setCount--;
            node.escaped = true;
            return node;
          }
          if (node.suffix === "\\") {
            parent.escaped = true;
            node.escaped = true;
          }
          parent.nodes.push(node);
          define2(node, "parent", parent);
        });
        return this;
      },
      /**
       * Capture end-of-string
       */
      eos: function() {
        var pos = this.position();
        if (this.input) return;
        var prev = this.prev();
        while (prev.type !== "root" && !prev.visited) {
          if (this.options.strict === true) {
            throw new SyntaxError("invalid syntax:" + util.inspect(prev, null, 2));
          }
          if (!hasDelims(prev)) {
            prev.parent.escaped = true;
            prev.escaped = true;
          }
          visit(prev, function(node) {
            if (!hasDelims(node.parent)) {
              node.parent.escaped = true;
              node.escaped = true;
            }
          });
          prev = prev.parent;
        }
        var tok = pos({
          type: "eos",
          val: this.append || ""
        });
        define2(tok, "parent", this.ast);
        return tok;
      },
      /**
       * Run parsers to advance the cursor position
       */
      next: function() {
        var parsed = this.parsed;
        var len = this.types.length;
        var idx = -1;
        var tok;
        while (++idx < len) {
          if (tok = this.parsers[this.types[idx]].call(this)) {
            define2(tok, "rest", this.input);
            define2(tok, "parsed", parsed);
            this.last = tok;
            return tok;
          }
        }
      },
      /**
       * Parse the given string.
       * @return {Array}
       */
      parse: function(input) {
        if (typeof input !== "string") {
          throw new TypeError("expected a string");
        }
        this.init(this.options);
        this.orig = input;
        this.input = input;
        var self2 = this;
        function parse() {
          input = self2.input;
          var node2 = self2.next();
          if (node2) {
            var prev = self2.prev();
            if (prev) {
              define2(node2, "parent", prev);
              if (prev.nodes) {
                prev.nodes.push(node2);
              }
            }
            if (self2.sets.hasOwnProperty(prev.type)) {
              self2.currentType = prev.type;
            }
          }
          if (self2.input && input === self2.input) {
            throw new Error('no parsers registered for: "' + self2.input.slice(0, 5) + '"');
          }
        }
        while (this.input) parse();
        if (this.stack.length && this.options.strict) {
          var node = this.stack.pop();
          throw this.error("missing opening " + node.type + ': "' + this.orig + '"');
        }
        var eos = this.eos();
        var tok = this.prev();
        if (tok.type !== "eos") {
          this.ast.nodes.push(eos);
        }
        return this.ast;
      }
    };
    function visit(node, fn) {
      if (!node.visited) {
        define2(node, "visited", true);
        return node.nodes ? mapVisit(node.nodes, fn) : fn(node);
      }
      return node;
    }
    function mapVisit(nodes, fn) {
      var len = nodes.length;
      var idx = -1;
      while (++idx < len) {
        visit(nodes[idx], fn);
      }
    }
    function hasOpen(node) {
      return node.nodes && node.nodes[0].type === node.type + ".open";
    }
    function hasClose(node) {
      return node.nodes && utils.last(node.nodes).type === node.type + ".close";
    }
    function hasDelims(node) {
      return hasOpen(node) && hasClose(node);
    }
    module2.exports = Parser;
  }
});

// ../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/index.js
var require_snapdragon = __commonJS({
  "../../node_modules/.pnpm/snapdragon@0.8.2/node_modules/snapdragon/index.js"(exports2, module2) {
    "use strict";
    var Base = require_base();
    var define2 = require_define_property3();
    var Compiler = require_compiler2();
    var Parser = require_parser2();
    var utils = require_utils3();
    function Snapdragon(options) {
      Base.call(this, null, options);
      this.options = utils.extend({ source: "string" }, this.options);
      this.compiler = new Compiler(this.options);
      this.parser = new Parser(this.options);
      Object.defineProperty(this, "compilers", {
        get: function() {
          return this.compiler.compilers;
        }
      });
      Object.defineProperty(this, "parsers", {
        get: function() {
          return this.parser.parsers;
        }
      });
      Object.defineProperty(this, "regex", {
        get: function() {
          return this.parser.regex;
        }
      });
    }
    Base.extend(Snapdragon);
    Snapdragon.prototype.capture = function() {
      return this.parser.capture.apply(this.parser, arguments);
    };
    Snapdragon.prototype.use = function(fn) {
      fn.call(this, this);
      return this;
    };
    Snapdragon.prototype.parse = function(str, options) {
      this.options = utils.extend({}, this.options, options);
      var parsed = this.parser.parse(str, this.options);
      define2(parsed, "parser", this.parser);
      return parsed;
    };
    Snapdragon.prototype.compile = function(ast, options) {
      this.options = utils.extend({}, this.options, options);
      var compiled = this.compiler.compile(ast, this.options);
      define2(compiled, "compiler", this.compiler);
      return compiled;
    };
    module2.exports = Snapdragon;
    module2.exports.Compiler = Compiler;
    module2.exports.Parser = Parser;
  }
});

// ../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/braces.js
var require_braces2 = __commonJS({
  "../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/lib/braces.js"(exports2, module2) {
    "use strict";
    var extend = require_extend_shallow2();
    var Snapdragon = require_snapdragon();
    var compilers = require_compilers();
    var parsers = require_parsers();
    var utils = require_utils2();
    function Braces(options) {
      this.options = extend({}, options);
    }
    Braces.prototype.init = function(options) {
      if (this.isInitialized) return;
      this.isInitialized = true;
      var opts = utils.createOptions({}, this.options, options);
      this.snapdragon = this.options.snapdragon || new Snapdragon(opts);
      this.compiler = this.snapdragon.compiler;
      this.parser = this.snapdragon.parser;
      compilers(this.snapdragon, opts);
      parsers(this.snapdragon, opts);
      utils.define(this.snapdragon, "parse", function(pattern, options2) {
        var parsed = Snapdragon.prototype.parse.apply(this, arguments);
        this.parser.ast.input = pattern;
        var stack = this.parser.stack;
        while (stack.length) {
          addParent({ type: "brace.close", val: "" }, stack.pop());
        }
        function addParent(node, parent) {
          utils.define(node, "parent", parent);
          parent.nodes.push(node);
        }
        utils.define(parsed, "parser", this.parser);
        return parsed;
      });
    };
    Braces.prototype.parse = function(ast, options) {
      if (ast && typeof ast === "object" && ast.nodes) return ast;
      this.init(options);
      return this.snapdragon.parse(ast, options);
    };
    Braces.prototype.compile = function(ast, options) {
      if (typeof ast === "string") {
        ast = this.parse(ast, options);
      } else {
        this.init(options);
      }
      return this.snapdragon.compile(ast, options);
    };
    Braces.prototype.expand = function(pattern) {
      var ast = this.parse(pattern, { expand: true });
      return this.compile(ast, { expand: true });
    };
    Braces.prototype.optimize = function(pattern) {
      var ast = this.parse(pattern, { optimize: true });
      return this.compile(ast, { optimize: true });
    };
    module2.exports = Braces;
  }
});

// ../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/index.js
var require_braces3 = __commonJS({
  "../../node_modules/.pnpm/braces@2.3.2/node_modules/braces/index.js"(exports2, module2) {
    "use strict";
    var toRegex = require_to_regex();
    var unique = require_array_unique2();
    var extend = require_extend_shallow2();
    var compilers = require_compilers();
    var parsers = require_parsers();
    var Braces = require_braces2();
    var utils = require_utils2();
    var MAX_LENGTH = 1024 * 64;
    var cache = {};
    function braces(pattern, options) {
      var key = utils.createKey(String(pattern), options);
      var arr = [];
      var disabled = options && options.cache === false;
      if (!disabled && cache.hasOwnProperty(key)) {
        return cache[key];
      }
      if (Array.isArray(pattern)) {
        for (var i = 0; i < pattern.length; i++) {
          arr.push.apply(arr, braces.create(pattern[i], options));
        }
      } else {
        arr = braces.create(pattern, options);
      }
      if (options && options.nodupes === true) {
        arr = unique(arr);
      }
      if (!disabled) {
        cache[key] = arr;
      }
      return arr;
    }
    braces.expand = function(pattern, options) {
      return braces.create(pattern, extend({}, options, { expand: true }));
    };
    braces.optimize = function(pattern, options) {
      return braces.create(pattern, options);
    };
    braces.create = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected a string");
      }
      var maxLength = options && options.maxLength || MAX_LENGTH;
      if (pattern.length >= maxLength) {
        throw new Error("expected pattern to be less than " + maxLength + " characters");
      }
      function create() {
        if (pattern === "" || pattern.length < 3) {
          return [pattern];
        }
        if (utils.isEmptySets(pattern)) {
          return [];
        }
        if (utils.isQuotedString(pattern)) {
          return [pattern.slice(1, -1)];
        }
        var proto = new Braces(options);
        var result = !options || options.expand !== true ? proto.optimize(pattern, options) : proto.expand(pattern, options);
        var arr = result.output;
        if (options && options.noempty === true) {
          arr = arr.filter(Boolean);
        }
        if (options && options.nodupes === true) {
          arr = unique(arr);
        }
        Object.defineProperty(arr, "result", {
          enumerable: false,
          value: result
        });
        return arr;
      }
      return memoize("create", pattern, options, create);
    };
    braces.makeRe = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected a string");
      }
      var maxLength = options && options.maxLength || MAX_LENGTH;
      if (pattern.length >= maxLength) {
        throw new Error("expected pattern to be less than " + maxLength + " characters");
      }
      function makeRe() {
        var arr = braces(pattern, options);
        var opts = extend({ strictErrors: false }, options);
        return toRegex(arr, opts);
      }
      return memoize("makeRe", pattern, options, makeRe);
    };
    braces.parse = function(pattern, options) {
      var proto = new Braces(options);
      return proto.parse(pattern, options);
    };
    braces.compile = function(ast, options) {
      var proto = new Braces(options);
      return proto.compile(ast, options);
    };
    braces.clearCache = function() {
      cache = braces.cache = {};
    };
    function memoize(type, pattern, options, fn) {
      var key = utils.createKey(type + ":" + pattern, options);
      var disabled = options && options.cache === false;
      if (disabled) {
        braces.clearCache();
        return fn(pattern, options);
      }
      if (cache.hasOwnProperty(key)) {
        return cache[key];
      }
      var res = fn(pattern, options);
      cache[key] = res;
      return res;
    }
    braces.Braces = Braces;
    braces.compilers = compilers;
    braces.parsers = parsers;
    braces.cache = cache;
    module2.exports = braces;
  }
});

// ../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/compilers.js
var require_compilers2 = __commonJS({
  "../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/compilers.js"(exports2, module2) {
    "use strict";
    module2.exports = function(nanomatch, options) {
      function slash() {
        if (options && typeof options.slash === "string") {
          return options.slash;
        }
        if (options && typeof options.slash === "function") {
          return options.slash.call(nanomatch);
        }
        return "\\\\/";
      }
      function star() {
        if (options && typeof options.star === "string") {
          return options.star;
        }
        if (options && typeof options.star === "function") {
          return options.star.call(nanomatch);
        }
        return "[^" + slash() + "]*?";
      }
      var ast = nanomatch.ast = nanomatch.parser.ast;
      ast.state = nanomatch.parser.state;
      nanomatch.compiler.state = ast.state;
      nanomatch.compiler.set("not", function(node) {
        var prev = this.prev();
        if (this.options.nonegate === true || prev.type !== "bos") {
          return this.emit("\\" + node.val, node);
        }
        return this.emit(node.val, node);
      }).set("escape", function(node) {
        if (this.options.unescape && /^[-\w_.]/.test(node.val)) {
          return this.emit(node.val, node);
        }
        return this.emit("\\" + node.val, node);
      }).set("quoted", function(node) {
        return this.emit(node.val, node);
      }).set("dollar", function(node) {
        if (node.parent.type === "bracket") {
          return this.emit(node.val, node);
        }
        return this.emit("\\" + node.val, node);
      }).set("dot", function(node) {
        if (node.dotfiles === true) this.dotfiles = true;
        return this.emit("\\" + node.val, node);
      }).set("backslash", function(node) {
        return this.emit(node.val, node);
      }).set("slash", function(node, nodes, i) {
        var val = "[" + slash() + "]";
        var parent = node.parent;
        var prev = this.prev();
        while (parent.type === "paren" && !parent.hasSlash) {
          parent.hasSlash = true;
          parent = parent.parent;
        }
        if (prev.addQmark) {
          val += "?";
        }
        if (node.rest.slice(0, 2) === "\\b") {
          return this.emit(val, node);
        }
        if (node.parsed === "**" || node.parsed === "./**") {
          this.output = "(?:" + this.output;
          return this.emit(val + ")?", node);
        }
        if (node.parsed === "!**" && this.options.nonegate !== true) {
          return this.emit(val + "?\\b", node);
        }
        return this.emit(val, node);
      }).set("bracket", function(node) {
        var close = node.close;
        var open = !node.escaped ? "[" : "\\[";
        var negated = node.negated;
        var inner = node.inner;
        var val = node.val;
        if (node.escaped === true) {
          inner = inner.replace(/\\?(\W)/g, "\\$1");
          negated = "";
        }
        if (inner === "]-") {
          inner = "\\]\\-";
        }
        if (negated && inner.indexOf(".") === -1) {
          inner += ".";
        }
        if (negated && inner.indexOf("/") === -1) {
          inner += "/";
        }
        val = open + negated + inner + close;
        return this.emit(val, node);
      }).set("square", function(node) {
        var val = (/^\W/.test(node.val) ? "\\" : "") + node.val;
        return this.emit(val, node);
      }).set("qmark", function(node) {
        var prev = this.prev();
        var val = "[^.\\\\/]";
        if (this.options.dot || prev.type !== "bos" && prev.type !== "slash") {
          val = "[^\\\\/]";
        }
        if (node.parsed.slice(-1) === "(") {
          var ch = node.rest.charAt(0);
          if (ch === "!" || ch === "=" || ch === ":") {
            return this.emit(node.val, node);
          }
        }
        if (node.val.length > 1) {
          val += "{" + node.val.length + "}";
        }
        return this.emit(val, node);
      }).set("plus", function(node) {
        var prev = node.parsed.slice(-1);
        if (prev === "]" || prev === ")") {
          return this.emit(node.val, node);
        }
        if (!this.output || /[?*+]/.test(ch) && node.parent.type !== "bracket") {
          return this.emit("\\+", node);
        }
        var ch = this.output.slice(-1);
        if (/\w/.test(ch) && !node.inside) {
          return this.emit("+\\+?", node);
        }
        return this.emit("+", node);
      }).set("globstar", function(node, nodes, i) {
        if (!this.output) {
          this.state.leadingGlobstar = true;
        }
        var prev = this.prev();
        var before = this.prev(2);
        var next = this.next();
        var after = this.next(2);
        var type = prev.type;
        var val = node.val;
        if (prev.type === "slash" && next.type === "slash") {
          if (before.type === "text") {
            this.output += "?";
            if (after.type !== "text") {
              this.output += "\\b";
            }
          }
        }
        var parsed = node.parsed;
        if (parsed.charAt(0) === "!") {
          parsed = parsed.slice(1);
        }
        var isInside = node.isInside.paren || node.isInside.brace;
        if (parsed && type !== "slash" && type !== "bos" && !isInside) {
          val = star();
        } else {
          val = this.options.dot !== true ? "(?:(?!(?:[" + slash() + "]|^)\\.).)*?" : "(?:(?!(?:[" + slash() + "]|^)(?:\\.{1,2})($|[" + slash() + "]))(?!\\.{2}).)*?";
        }
        if ((type === "slash" || type === "bos") && this.options.dot !== true) {
          val = "(?!\\.)" + val;
        }
        if (prev.type === "slash" && next.type === "slash" && before.type !== "text") {
          if (after.type === "text" || after.type === "star") {
            node.addQmark = true;
          }
        }
        if (this.options.capture) {
          val = "(" + val + ")";
        }
        return this.emit(val, node);
      }).set("star", function(node, nodes, i) {
        var prior = nodes[i - 2] || {};
        var prev = this.prev();
        var next = this.next();
        var type = prev.type;
        function isStart(n) {
          return n.type === "bos" || n.type === "slash";
        }
        if (this.output === "" && this.options.contains !== true) {
          this.output = "(?![" + slash() + "])";
        }
        if (type === "bracket" && this.options.bash === false) {
          var str = next && next.type === "bracket" ? star() : "*?";
          if (!prev.nodes || prev.nodes[1].type !== "posix") {
            return this.emit(str, node);
          }
        }
        var prefix = !this.dotfiles && type !== "text" && type !== "escape" ? this.options.dot ? "(?!(?:^|[" + slash() + "])\\.{1,2}(?:$|[" + slash() + "]))" : "(?!\\.)" : "";
        if (isStart(prev) || isStart(prior) && type === "not") {
          if (prefix !== "(?!\\.)") {
            prefix += "(?!(\\.{2}|\\.[" + slash() + "]))(?=.)";
          } else {
            prefix += "(?=.)";
          }
        } else if (prefix === "(?!\\.)") {
          prefix = "";
        }
        if (prev.type === "not" && prior.type === "bos" && this.options.dot === true) {
          this.output = "(?!\\.)" + this.output;
        }
        var output = prefix + star();
        if (this.options.capture) {
          output = "(" + output + ")";
        }
        return this.emit(output, node);
      }).set("text", function(node) {
        return this.emit(node.val, node);
      }).set("eos", function(node) {
        var prev = this.prev();
        var val = node.val;
        this.output = "(?:\\.[" + slash() + "](?=.))?" + this.output;
        if (this.state.metachar && prev.type !== "qmark" && prev.type !== "slash") {
          val += this.options.contains ? "[" + slash() + "]?" : "(?:[" + slash() + "]|$)";
        }
        return this.emit(val, node);
      });
      if (options && typeof options.compilers === "function") {
        options.compilers(nanomatch.compiler);
      }
    };
  }
});

// ../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/parsers.js
var require_parsers2 = __commonJS({
  "../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/parsers.js"(exports2, module2) {
    "use strict";
    var regexNot = require_regex_not();
    var toRegex = require_to_regex();
    var cached;
    var NOT_REGEX = `[\\[!*+?$^"'.\\\\/]+`;
    var not = createTextRegex(NOT_REGEX);
    module2.exports = function(nanomatch, options) {
      var parser = nanomatch.parser;
      var opts = parser.options;
      parser.state = {
        slashes: 0,
        paths: []
      };
      parser.ast.state = parser.state;
      parser.capture("prefix", function() {
        if (this.parsed) return;
        var m = this.match(/^\.[\\/]/);
        if (!m) return;
        this.state.strictOpen = !!this.options.strictOpen;
        this.state.addPrefix = true;
      }).capture("escape", function() {
        if (this.isInside("bracket")) return;
        var pos = this.position();
        var m = this.match(/^(?:\\(.)|([$^]))/);
        if (!m) return;
        return pos({
          type: "escape",
          val: m[2] || m[1]
        });
      }).capture("quoted", function() {
        var pos = this.position();
        var m = this.match(/^["']/);
        if (!m) return;
        var quote = m[0];
        if (this.input.indexOf(quote) === -1) {
          return pos({
            type: "escape",
            val: quote
          });
        }
        var tok = advanceTo(this.input, quote);
        this.consume(tok.len);
        return pos({
          type: "quoted",
          val: tok.esc
        });
      }).capture("not", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(this.notRegex || /^!+/);
        if (!m) return;
        var val = m[0];
        var isNegated = val.length % 2 === 1;
        if (parsed === "" && !isNegated) {
          val = "";
        }
        if (parsed === "" && isNegated && this.options.nonegate !== true) {
          this.bos.val = "(?!^(?:";
          this.append = ")$).*";
          val = "";
        }
        return pos({
          type: "not",
          val
        });
      }).capture("dot", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^\.+/);
        if (!m) return;
        var val = m[0];
        this.state.dot = val === "." && (parsed === "" || parsed.slice(-1) === "/");
        return pos({
          type: "dot",
          dotfiles: this.state.dot,
          val
        });
      }).capture("plus", /^\+(?!\()/).capture("qmark", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^\?+(?!\()/);
        if (!m) return;
        this.state.metachar = true;
        this.state.qmark = true;
        return pos({
          type: "qmark",
          parsed,
          val: m[0]
        });
      }).capture("globstar", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^\*{2}(?![*(])(?=[,)/]|$)/);
        if (!m) return;
        var type = opts.noglobstar !== true ? "globstar" : "star";
        var node = pos({ type, parsed });
        this.state.metachar = true;
        while (this.input.slice(0, 4) === "/**/") {
          this.input = this.input.slice(3);
        }
        node.isInside = {
          brace: this.isInside("brace"),
          paren: this.isInside("paren")
        };
        if (type === "globstar") {
          this.state.globstar = true;
          node.val = "**";
        } else {
          this.state.star = true;
          node.val = "*";
        }
        return node;
      }).capture("star", function() {
        var pos = this.position();
        var starRe = /^(?:\*(?![*(])|[*]{3,}(?!\()|[*]{2}(?![(/]|$)|\*(?=\*\())/;
        var m = this.match(starRe);
        if (!m) return;
        this.state.metachar = true;
        this.state.star = true;
        return pos({
          type: "star",
          val: m[0]
        });
      }).capture("slash", function() {
        var pos = this.position();
        var m = this.match(/^\//);
        if (!m) return;
        this.state.slashes++;
        return pos({
          type: "slash",
          val: m[0]
        });
      }).capture("backslash", function() {
        var pos = this.position();
        var m = this.match(/^\\(?![*+?(){}[\]'"])/);
        if (!m) return;
        var val = m[0];
        if (this.isInside("bracket")) {
          val = "\\";
        } else if (val.length > 1) {
          val = "\\\\";
        }
        return pos({
          type: "backslash",
          val
        });
      }).capture("square", function() {
        if (this.isInside("bracket")) return;
        var pos = this.position();
        var m = this.match(/^\[([^!^\\])\]/);
        if (!m) return;
        return pos({
          type: "square",
          val: m[1]
        });
      }).capture("bracket", function() {
        var pos = this.position();
        var m = this.match(/^(?:\[([!^]?)([^\]]+|\]-)(\]|[^*+?]+)|\[)/);
        if (!m) return;
        var val = m[0];
        var negated = m[1] ? "^" : "";
        var inner = (m[2] || "").replace(/\\\\+/, "\\\\");
        var close = m[3] || "";
        if (m[2] && inner.length < m[2].length) {
          val = val.replace(/\\\\+/, "\\\\");
        }
        var esc = this.input.slice(0, 2);
        if (inner === "" && esc === "\\]") {
          inner += esc;
          this.consume(2);
          var str = this.input;
          var idx = -1;
          var ch;
          while (ch = str[++idx]) {
            this.consume(1);
            if (ch === "]") {
              close = ch;
              break;
            }
            inner += ch;
          }
        }
        return pos({
          type: "bracket",
          val,
          escaped: close !== "]",
          negated,
          inner,
          close
        });
      }).capture("text", function() {
        if (this.isInside("bracket")) return;
        var pos = this.position();
        var m = this.match(not);
        if (!m || !m[0]) return;
        return pos({
          type: "text",
          val: m[0]
        });
      });
      if (options && typeof options.parsers === "function") {
        options.parsers(nanomatch.parser);
      }
    };
    function advanceTo(input, endChar) {
      var ch = input.charAt(0);
      var tok = { len: 1, val: "", esc: "" };
      var idx = 0;
      function advance() {
        if (ch !== "\\") {
          tok.esc += "\\" + ch;
          tok.val += ch;
        }
        ch = input.charAt(++idx);
        tok.len++;
        if (ch === "\\") {
          advance();
          advance();
        }
      }
      while (ch && ch !== endChar) {
        advance();
      }
      return tok;
    }
    function createTextRegex(pattern) {
      if (cached) return cached;
      var opts = { contains: true, strictClose: false };
      var not2 = regexNot.create(pattern, opts);
      var re = toRegex("^(?:[*]\\((?=.)|" + not2 + ")", opts);
      return cached = re;
    }
    module2.exports.not = NOT_REGEX;
  }
});

// ../../node_modules/.pnpm/fragment-cache@0.2.1/node_modules/fragment-cache/index.js
var require_fragment_cache = __commonJS({
  "../../node_modules/.pnpm/fragment-cache@0.2.1/node_modules/fragment-cache/index.js"(exports2, module2) {
    "use strict";
    var MapCache = require_map_cache();
    function FragmentCache(caches) {
      this.caches = caches || {};
    }
    FragmentCache.prototype = {
      /**
       * Get cache `name` from the `fragment.caches` object. Creates a new
       * `MapCache` if it doesn't already exist.
       *
       * ```js
       * var cache = fragment.cache('files');
       * console.log(fragment.caches.hasOwnProperty('files'));
       * //=> true
       * ```
       * @name .cache
       * @param {String} `cacheName`
       * @return {Object} Returns the [map-cache][] instance.
       * @api public
       */
      cache: function(cacheName) {
        return this.caches[cacheName] || (this.caches[cacheName] = new MapCache());
      },
      /**
       * Set a value for property `key` on cache `name`
       *
       * ```js
       * fragment.set('files', 'somefile.js', new File({path: 'somefile.js'}));
       * ```
       * @name .set
       * @param {String} `name`
       * @param {String} `key` Property name to set
       * @param {any} `val` The value of `key`
       * @return {Object} The cache instance for chaining
       * @api public
       */
      set: function(cacheName, key, val) {
        var cache = this.cache(cacheName);
        cache.set(key, val);
        return cache;
      },
      /**
       * Returns true if a non-undefined value is set for `key` on fragment cache `name`.
       *
       * ```js
       * var cache = fragment.cache('files');
       * cache.set('somefile.js');
       *
       * console.log(cache.has('somefile.js'));
       * //=> true
       *
       * console.log(cache.has('some-other-file.js'));
       * //=> false
       * ```
       * @name .has
       * @param {String} `name` Cache name
       * @param {String} `key` Optionally specify a property to check for on cache `name`
       * @return {Boolean}
       * @api public
       */
      has: function(cacheName, key) {
        return typeof this.get(cacheName, key) !== "undefined";
      },
      /**
       * Get `name`, or if specified, the value of `key`. Invokes the [cache]() method,
       * so that cache `name` will be created it doesn't already exist. If `key` is not passed,
       * the entire cache (`name`) is returned.
       *
       * ```js
       * var Vinyl = require('vinyl');
       * var cache = fragment.cache('files');
       * cache.set('somefile.js', new Vinyl({path: 'somefile.js'}));
       * console.log(cache.get('somefile.js'));
       * //=> <File "somefile.js">
       * ```
       * @name .get
       * @param {String} `name`
       * @return {Object} Returns cache `name`, or the value of `key` if specified
       * @api public
       */
      get: function(name, key) {
        var cache = this.cache(name);
        if (typeof key === "string") {
          return cache.get(key);
        }
        return cache;
      }
    };
    exports2 = module2.exports = FragmentCache;
  }
});

// ../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/cache.js
var require_cache = __commonJS({
  "../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/cache.js"(exports2, module2) {
    module2.exports = new (require_fragment_cache())();
  }
});

// ../../node_modules/.pnpm/is-windows@1.0.2/node_modules/is-windows/index.js
var require_is_windows = __commonJS({
  "../../node_modules/.pnpm/is-windows@1.0.2/node_modules/is-windows/index.js"(exports2, module2) {
    (function(factory) {
      if (exports2 && typeof exports2 === "object" && typeof module2 !== "undefined") {
        module2.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof window !== "undefined") {
        window.isWindows = factory();
      } else if (typeof global !== "undefined") {
        global.isWindows = factory();
      } else if (typeof self !== "undefined") {
        self.isWindows = factory();
      } else {
        this.isWindows = factory();
      }
    })(function() {
      "use strict";
      return function isWindows() {
        return process && (process.platform === "win32" || /^(msys|cygwin)$/.test(process.env.OSTYPE));
      };
    });
  }
});

// ../../node_modules/.pnpm/arr-diff@4.0.0/node_modules/arr-diff/index.js
var require_arr_diff2 = __commonJS({
  "../../node_modules/.pnpm/arr-diff@4.0.0/node_modules/arr-diff/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function diff(arr) {
      var len = arguments.length;
      var idx = 0;
      while (++idx < len) {
        arr = diffArray(arr, arguments[idx]);
      }
      return arr;
    };
    function diffArray(one, two) {
      if (!Array.isArray(two)) {
        return one.slice();
      }
      var tlen = two.length;
      var olen = one.length;
      var idx = -1;
      var arr = [];
      while (++idx < olen) {
        var ele = one[idx];
        var hasEle = false;
        for (var i = 0; i < tlen; i++) {
          var val = two[i];
          if (ele === val) {
            hasEle = true;
            break;
          }
        }
        if (hasEle === false) {
          arr.push(ele);
        }
      }
      return arr;
    }
  }
});

// ../../node_modules/.pnpm/object.pick@1.3.0/node_modules/object.pick/index.js
var require_object3 = __commonJS({
  "../../node_modules/.pnpm/object.pick@1.3.0/node_modules/object.pick/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_isobject2();
    module2.exports = function pick(obj, keys) {
      if (!isObject(obj) && typeof obj !== "function") {
        return {};
      }
      var res = {};
      if (typeof keys === "string") {
        if (keys in obj) {
          res[keys] = obj[keys];
        }
        return res;
      }
      var len = keys.length;
      var idx = -1;
      while (++idx < len) {
        var key = keys[idx];
        if (key in obj) {
          res[key] = obj[key];
        }
      }
      return res;
    };
  }
});

// ../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/utils.js
var require_utils4 = __commonJS({
  "../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/lib/utils.js"(exports2, module2) {
    "use strict";
    var utils = module2.exports;
    var path = require("path");
    var isWindows = require_is_windows()();
    var Snapdragon = require_snapdragon();
    utils.define = require_define_property();
    utils.diff = require_arr_diff2();
    utils.extend = require_extend_shallow();
    utils.pick = require_object3();
    utils.typeOf = require_kind_of2();
    utils.unique = require_array_unique2();
    utils.isEmptyString = function(val) {
      return String(val) === "" || String(val) === "./";
    };
    utils.isWindows = function() {
      return path.sep === "\\" || isWindows === true;
    };
    utils.last = function(arr, n) {
      return arr[arr.length - (n || 1)];
    };
    utils.instantiate = function(ast, options) {
      var snapdragon;
      if (utils.typeOf(ast) === "object" && ast.snapdragon) {
        snapdragon = ast.snapdragon;
      } else if (utils.typeOf(options) === "object" && options.snapdragon) {
        snapdragon = options.snapdragon;
      } else {
        snapdragon = new Snapdragon(options);
      }
      utils.define(snapdragon, "parse", function(str, options2) {
        var parsed = Snapdragon.prototype.parse.call(this, str, options2);
        parsed.input = str;
        var last = this.parser.stack.pop();
        if (last && this.options.strictErrors !== true) {
          var open = last.nodes[0];
          var inner = last.nodes[1];
          if (last.type === "bracket") {
            if (inner.val.charAt(0) === "[") {
              inner.val = "\\" + inner.val;
            }
          } else {
            open.val = "\\" + open.val;
            var sibling = open.parent.nodes[1];
            if (sibling.type === "star") {
              sibling.loose = true;
            }
          }
        }
        utils.define(parsed, "parser", this.parser);
        return parsed;
      });
      return snapdragon;
    };
    utils.createKey = function(pattern, options) {
      if (typeof options === "undefined") {
        return pattern;
      }
      var key = pattern;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          key += ";" + prop + "=" + String(options[prop]);
        }
      }
      return key;
    };
    utils.arrayify = function(val) {
      if (typeof val === "string") return [val];
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    utils.isString = function(val) {
      return typeof val === "string";
    };
    utils.isRegex = function(val) {
      return utils.typeOf(val) === "regexp";
    };
    utils.isObject = function(val) {
      return utils.typeOf(val) === "object";
    };
    utils.escapeRegex = function(str) {
      return str.replace(/[-[\]{}()^$|*+?.\\/\s]/g, "\\$&");
    };
    utils.combineDupes = function(input, patterns) {
      patterns = utils.arrayify(patterns).join("|").split("|");
      patterns = patterns.map(function(s) {
        return s.replace(/\\?([+*\\/])/g, "\\$1");
      });
      var substr = patterns.join("|");
      var regex = new RegExp("(" + substr + ")(?=\\1)", "g");
      return input.replace(regex, "");
    };
    utils.hasSpecialChars = function(str) {
      return /(?:(?:(^|\/)[!.])|[*?+()|[\]{}]|[+@]\()/.test(str);
    };
    utils.toPosixPath = function(str) {
      return str.replace(/\\+/g, "/");
    };
    utils.unescape = function(str) {
      return utils.toPosixPath(str.replace(/\\(?=[*+?!.])/g, ""));
    };
    utils.stripDrive = function(fp) {
      return utils.isWindows() ? fp.replace(/^[a-z]:[\\/]+?/i, "/") : fp;
    };
    utils.stripPrefix = function(str) {
      if (str.charAt(0) === "." && (str.charAt(1) === "/" || str.charAt(1) === "\\")) {
        return str.slice(2);
      }
      return str;
    };
    utils.isSimpleChar = function(str) {
      return str.trim() === "" || str === ".";
    };
    utils.isSlash = function(str) {
      return str === "/" || str === "\\/" || str === "\\" || str === "\\\\";
    };
    utils.matchPath = function(pattern, options) {
      return options && options.contains ? utils.containsPattern(pattern, options) : utils.equalsPattern(pattern, options);
    };
    utils._equals = function(filepath, unixPath, pattern) {
      return pattern === filepath || pattern === unixPath;
    };
    utils._contains = function(filepath, unixPath, pattern) {
      return filepath.indexOf(pattern) !== -1 || unixPath.indexOf(pattern) !== -1;
    };
    utils.equalsPattern = function(pattern, options) {
      var unixify = utils.unixify(options);
      options = options || {};
      return function fn(filepath) {
        var equal = utils._equals(filepath, unixify(filepath), pattern);
        if (equal === true || options.nocase !== true) {
          return equal;
        }
        var lower = filepath.toLowerCase();
        return utils._equals(lower, unixify(lower), pattern);
      };
    };
    utils.containsPattern = function(pattern, options) {
      var unixify = utils.unixify(options);
      options = options || {};
      return function(filepath) {
        var contains = utils._contains(filepath, unixify(filepath), pattern);
        if (contains === true || options.nocase !== true) {
          return contains;
        }
        var lower = filepath.toLowerCase();
        return utils._contains(lower, unixify(lower), pattern);
      };
    };
    utils.matchBasename = function(re) {
      return function(filepath) {
        return re.test(filepath) || re.test(path.basename(filepath));
      };
    };
    utils.identity = function(val) {
      return val;
    };
    utils.value = function(str, unixify, options) {
      if (options && options.unixify === false) {
        return str;
      }
      if (options && typeof options.unixify === "function") {
        return options.unixify(str);
      }
      return unixify(str);
    };
    utils.unixify = function(options) {
      var opts = options || {};
      return function(filepath) {
        if (opts.stripPrefix !== false) {
          filepath = utils.stripPrefix(filepath);
        }
        if (opts.unescape === true) {
          filepath = utils.unescape(filepath);
        }
        if (opts.unixify === true || utils.isWindows()) {
          filepath = utils.toPosixPath(filepath);
        }
        return filepath;
      };
    };
  }
});

// ../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/index.js
var require_nanomatch = __commonJS({
  "../../node_modules/.pnpm/nanomatch@1.2.13/node_modules/nanomatch/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var toRegex = require_to_regex();
    var extend = require_extend_shallow();
    var compilers = require_compilers2();
    var parsers = require_parsers2();
    var cache = require_cache();
    var utils = require_utils4();
    var MAX_LENGTH = 1024 * 64;
    function nanomatch(list, patterns, options) {
      patterns = utils.arrayify(patterns);
      list = utils.arrayify(list);
      var len = patterns.length;
      if (list.length === 0 || len === 0) {
        return [];
      }
      if (len === 1) {
        return nanomatch.match(list, patterns[0], options);
      }
      var negated = false;
      var omit = [];
      var keep = [];
      var idx = -1;
      while (++idx < len) {
        var pattern = patterns[idx];
        if (typeof pattern === "string" && pattern.charCodeAt(0) === 33) {
          omit.push.apply(omit, nanomatch.match(list, pattern.slice(1), options));
          negated = true;
        } else {
          keep.push.apply(keep, nanomatch.match(list, pattern, options));
        }
      }
      if (negated && keep.length === 0) {
        if (options && options.unixify === false) {
          keep = list.slice();
        } else {
          var unixify = utils.unixify(options);
          for (var i = 0; i < list.length; i++) {
            keep.push(unixify(list[i]));
          }
        }
      }
      var matches = utils.diff(keep, omit);
      if (!options || options.nodupes !== false) {
        return utils.unique(matches);
      }
      return matches;
    }
    nanomatch.match = function(list, pattern, options) {
      if (Array.isArray(pattern)) {
        throw new TypeError("expected pattern to be a string");
      }
      var unixify = utils.unixify(options);
      var isMatch = memoize("match", pattern, options, nanomatch.matcher);
      var matches = [];
      list = utils.arrayify(list);
      var len = list.length;
      var idx = -1;
      while (++idx < len) {
        var ele = list[idx];
        if (ele === pattern || isMatch(ele)) {
          matches.push(utils.value(ele, unixify, options));
        }
      }
      if (typeof options === "undefined") {
        return utils.unique(matches);
      }
      if (matches.length === 0) {
        if (options.failglob === true) {
          throw new Error('no matches found for "' + pattern + '"');
        }
        if (options.nonull === true || options.nullglob === true) {
          return [options.unescape ? utils.unescape(pattern) : pattern];
        }
      }
      if (options.ignore) {
        matches = nanomatch.not(matches, options.ignore, options);
      }
      return options.nodupes !== false ? utils.unique(matches) : matches;
    };
    nanomatch.isMatch = function(str, pattern, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (utils.isEmptyString(str) || utils.isEmptyString(pattern)) {
        return false;
      }
      var equals = utils.equalsPattern(options);
      if (equals(str)) {
        return true;
      }
      var isMatch = memoize("isMatch", pattern, options, nanomatch.matcher);
      return isMatch(str);
    };
    nanomatch.some = function(list, patterns, options) {
      if (typeof list === "string") {
        list = [list];
      }
      for (var i = 0; i < list.length; i++) {
        if (nanomatch(list[i], patterns, options).length === 1) {
          return true;
        }
      }
      return false;
    };
    nanomatch.every = function(list, patterns, options) {
      if (typeof list === "string") {
        list = [list];
      }
      for (var i = 0; i < list.length; i++) {
        if (nanomatch(list[i], patterns, options).length !== 1) {
          return false;
        }
      }
      return true;
    };
    nanomatch.any = function(str, patterns, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (utils.isEmptyString(str) || utils.isEmptyString(patterns)) {
        return false;
      }
      if (typeof patterns === "string") {
        patterns = [patterns];
      }
      for (var i = 0; i < patterns.length; i++) {
        if (nanomatch.isMatch(str, patterns[i], options)) {
          return true;
        }
      }
      return false;
    };
    nanomatch.all = function(str, patterns, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (typeof patterns === "string") {
        patterns = [patterns];
      }
      for (var i = 0; i < patterns.length; i++) {
        if (!nanomatch.isMatch(str, patterns[i], options)) {
          return false;
        }
      }
      return true;
    };
    nanomatch.not = function(list, patterns, options) {
      var opts = extend({}, options);
      var ignore = opts.ignore;
      delete opts.ignore;
      list = utils.arrayify(list);
      var matches = utils.diff(list, nanomatch(list, patterns, opts));
      if (ignore) {
        matches = utils.diff(matches, nanomatch(list, ignore));
      }
      return opts.nodupes !== false ? utils.unique(matches) : matches;
    };
    nanomatch.contains = function(str, patterns, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (typeof patterns === "string") {
        if (utils.isEmptyString(str) || utils.isEmptyString(patterns)) {
          return false;
        }
        var equals = utils.equalsPattern(patterns, options);
        if (equals(str)) {
          return true;
        }
        var contains = utils.containsPattern(patterns, options);
        if (contains(str)) {
          return true;
        }
      }
      var opts = extend({}, options, { contains: true });
      return nanomatch.any(str, patterns, opts);
    };
    nanomatch.matchBase = function(pattern, options) {
      if (pattern && pattern.indexOf("/") !== -1 || !options) return false;
      return options.basename === true || options.matchBase === true;
    };
    nanomatch.matchKeys = function(obj, patterns, options) {
      if (!utils.isObject(obj)) {
        throw new TypeError("expected the first argument to be an object");
      }
      var keys = nanomatch(Object.keys(obj), patterns, options);
      return utils.pick(obj, keys);
    };
    nanomatch.matcher = function matcher(pattern, options) {
      if (utils.isEmptyString(pattern)) {
        return function() {
          return false;
        };
      }
      if (Array.isArray(pattern)) {
        return compose(pattern, options, matcher);
      }
      if (pattern instanceof RegExp) {
        return test(pattern);
      }
      if (!utils.isString(pattern)) {
        throw new TypeError("expected pattern to be an array, string or regex");
      }
      if (!utils.hasSpecialChars(pattern)) {
        if (options && options.nocase === true) {
          pattern = pattern.toLowerCase();
        }
        return utils.matchPath(pattern, options);
      }
      var re = nanomatch.makeRe(pattern, options);
      if (nanomatch.matchBase(pattern, options)) {
        return utils.matchBasename(re, options);
      }
      function test(regex) {
        var equals = utils.equalsPattern(options);
        var unixify = utils.unixify(options);
        return function(str) {
          if (equals(str)) {
            return true;
          }
          if (regex.test(unixify(str))) {
            return true;
          }
          return false;
        };
      }
      var matcherFn = test(re);
      utils.define(matcherFn, "result", re.result);
      return matcherFn;
    };
    nanomatch.capture = function(pattern, str, options) {
      var re = nanomatch.makeRe(pattern, extend({ capture: true }, options));
      var unixify = utils.unixify(options);
      function match() {
        return function(string) {
          var match2 = re.exec(unixify(string));
          if (!match2) {
            return null;
          }
          return match2.slice(1);
        };
      }
      var capture = memoize("capture", pattern, options, match);
      return capture(str);
    };
    nanomatch.makeRe = function(pattern, options) {
      if (pattern instanceof RegExp) {
        return pattern;
      }
      if (typeof pattern !== "string") {
        throw new TypeError("expected pattern to be a string");
      }
      if (pattern.length > MAX_LENGTH) {
        throw new Error("expected pattern to be less than " + MAX_LENGTH + " characters");
      }
      function makeRe() {
        var opts = utils.extend({ wrap: false }, options);
        var result = nanomatch.create(pattern, opts);
        var regex = toRegex(result.output, opts);
        utils.define(regex, "result", result);
        return regex;
      }
      return memoize("makeRe", pattern, options, makeRe);
    };
    nanomatch.create = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected a string");
      }
      function create() {
        return nanomatch.compile(nanomatch.parse(pattern, options), options);
      }
      return memoize("create", pattern, options, create);
    };
    nanomatch.parse = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected a string");
      }
      function parse() {
        var snapdragon = utils.instantiate(null, options);
        parsers(snapdragon, options);
        var ast = snapdragon.parse(pattern, options);
        utils.define(ast, "snapdragon", snapdragon);
        ast.input = pattern;
        return ast;
      }
      return memoize("parse", pattern, options, parse);
    };
    nanomatch.compile = function(ast, options) {
      if (typeof ast === "string") {
        ast = nanomatch.parse(ast, options);
      }
      function compile() {
        var snapdragon = utils.instantiate(ast, options);
        compilers(snapdragon, options);
        return snapdragon.compile(ast, options);
      }
      return memoize("compile", ast.input, options, compile);
    };
    nanomatch.clearCache = function() {
      nanomatch.cache.__data__ = {};
    };
    function compose(patterns, options, matcher) {
      var matchers;
      return memoize("compose", String(patterns), options, function() {
        return function(file) {
          if (!matchers) {
            matchers = [];
            for (var i = 0; i < patterns.length; i++) {
              matchers.push(matcher(patterns[i], options));
            }
          }
          var len = matchers.length;
          while (len--) {
            if (matchers[len](file) === true) {
              return true;
            }
          }
          return false;
        };
      });
    }
    function memoize(type, pattern, options, fn) {
      var key = utils.createKey(type + "=" + pattern, options);
      if (options && options.cache === false) {
        return fn(pattern, options);
      }
      if (cache.has(type, key)) {
        return cache.get(type, key);
      }
      var val = fn(pattern, options);
      cache.set(type, key, val);
      return val;
    }
    nanomatch.compilers = compilers;
    nanomatch.parsers = parsers;
    nanomatch.cache = cache;
    module2.exports = nanomatch;
  }
});

// ../../node_modules/.pnpm/posix-character-classes@0.1.1/node_modules/posix-character-classes/index.js
var require_posix_character_classes = __commonJS({
  "../../node_modules/.pnpm/posix-character-classes@0.1.1/node_modules/posix-character-classes/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
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
  }
});

// ../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/lib/compilers.js
var require_compilers3 = __commonJS({
  "../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/lib/compilers.js"(exports2, module2) {
    "use strict";
    var posix = require_posix_character_classes();
    module2.exports = function(brackets) {
      brackets.compiler.set("escape", function(node) {
        return this.emit("\\" + node.val.replace(/^\\/, ""), node);
      }).set("text", function(node) {
        return this.emit(node.val.replace(/([{}])/g, "\\$1"), node);
      }).set("posix", function(node) {
        if (node.val === "[::]") {
          return this.emit("\\[::\\]", node);
        }
        var val = posix[node.inner];
        if (typeof val === "undefined") {
          val = "[" + node.inner + "]";
        }
        return this.emit(val, node);
      }).set("bracket", function(node) {
        return this.mapVisit(node.nodes);
      }).set("bracket.open", function(node) {
        return this.emit(node.val, node);
      }).set("bracket.inner", function(node) {
        var inner = node.val;
        if (inner === "[" || inner === "]") {
          return this.emit("\\" + node.val, node);
        }
        if (inner === "^]") {
          return this.emit("^\\]", node);
        }
        if (inner === "^") {
          return this.emit("^", node);
        }
        if (/-/.test(inner) && !/(\d-\d|\w-\w)/.test(inner)) {
          inner = inner.split("-").join("\\-");
        }
        var isNegated = inner.charAt(0) === "^";
        if (isNegated && inner.indexOf("/") === -1) {
          inner += "/";
        }
        if (isNegated && inner.indexOf(".") === -1) {
          inner += ".";
        }
        inner = inner.replace(/\\([1-9])/g, "$1");
        return this.emit(inner, node);
      }).set("bracket.close", function(node) {
        var val = node.val.replace(/^\\/, "");
        if (node.parent.escaped === true) {
          return this.emit("\\" + val, node);
        }
        return this.emit(val, node);
      });
    };
  }
});

// ../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/lib/utils.js
var require_utils5 = __commonJS({
  "../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/lib/utils.js"(exports2) {
    "use strict";
    var toRegex = require_to_regex();
    var regexNot = require_regex_not();
    var cached;
    exports2.last = function(arr) {
      return arr[arr.length - 1];
    };
    exports2.createRegex = function(pattern, include) {
      if (cached) return cached;
      var opts = { contains: true, strictClose: false };
      var not = regexNot.create(pattern, opts);
      var re;
      if (typeof include === "string") {
        re = toRegex("^(?:" + include + "|" + not + ")", opts);
      } else {
        re = toRegex(not, opts);
      }
      return cached = re;
    };
  }
});

// ../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/lib/parsers.js
var require_parsers3 = __commonJS({
  "../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/lib/parsers.js"(exports2, module2) {
    "use strict";
    var utils = require_utils5();
    var define2 = require_define_property3();
    var TEXT_REGEX = "(\\[(?=.*\\])|\\])+";
    var not = utils.createRegex(TEXT_REGEX);
    function parsers(brackets) {
      brackets.state = brackets.state || {};
      brackets.parser.sets.bracket = brackets.parser.sets.bracket || [];
      brackets.parser.capture("escape", function() {
        if (this.isInside("bracket")) return;
        var pos = this.position();
        var m = this.match(/^\\(.)/);
        if (!m) return;
        return pos({
          type: "escape",
          val: m[0]
        });
      }).capture("text", function() {
        if (this.isInside("bracket")) return;
        var pos = this.position();
        var m = this.match(not);
        if (!m || !m[0]) return;
        return pos({
          type: "text",
          val: m[0]
        });
      }).capture("posix", function() {
        var pos = this.position();
        var m = this.match(/^\[:(.*?):\](?=.*\])/);
        if (!m) return;
        var inside = this.isInside("bracket");
        if (inside) {
          brackets.posix++;
        }
        return pos({
          type: "posix",
          insideBracket: inside,
          inner: m[1],
          val: m[0]
        });
      }).capture("bracket", function() {
      }).capture("bracket.open", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^\[(?=.*\])/);
        if (!m) return;
        var prev = this.prev();
        var last = utils.last(prev.nodes);
        if (parsed.slice(-1) === "\\" && !this.isInside("bracket")) {
          last.val = last.val.slice(0, last.val.length - 1);
          return pos({
            type: "escape",
            val: m[0]
          });
        }
        var open = pos({
          type: "bracket.open",
          val: m[0]
        });
        if (last.type === "bracket.open" || this.isInside("bracket")) {
          open.val = "\\" + open.val;
          open.type = "bracket.inner";
          open.escaped = true;
          return open;
        }
        var node = pos({
          type: "bracket",
          nodes: [open]
        });
        define2(node, "parent", prev);
        define2(open, "parent", node);
        this.push("bracket", node);
        prev.nodes.push(node);
      }).capture("bracket.inner", function() {
        if (!this.isInside("bracket")) return;
        var pos = this.position();
        var m = this.match(not);
        if (!m || !m[0]) return;
        var next = this.input.charAt(0);
        var val = m[0];
        var node = pos({
          type: "bracket.inner",
          val
        });
        if (val === "\\\\") {
          return node;
        }
        var first = val.charAt(0);
        var last = val.slice(-1);
        if (first === "!") {
          val = "^" + val.slice(1);
        }
        if (last === "\\" || val === "^" && next === "]") {
          val += this.input[0];
          this.consume(1);
        }
        node.val = val;
        return node;
      }).capture("bracket.close", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^\]/);
        if (!m) return;
        var prev = this.prev();
        var last = utils.last(prev.nodes);
        if (parsed.slice(-1) === "\\" && !this.isInside("bracket")) {
          last.val = last.val.slice(0, last.val.length - 1);
          return pos({
            type: "escape",
            val: m[0]
          });
        }
        var node = pos({
          type: "bracket.close",
          rest: this.input,
          val: m[0]
        });
        if (last.type === "bracket.open") {
          node.type = "bracket.inner";
          node.escaped = true;
          return node;
        }
        var bracket = this.pop("bracket");
        if (!this.isType(bracket, "bracket")) {
          if (this.options.strict) {
            throw new Error('missing opening "["');
          }
          node.type = "bracket.inner";
          node.escaped = true;
          return node;
        }
        bracket.nodes.push(node);
        define2(node, "parent", bracket);
      });
    }
    module2.exports = parsers;
    module2.exports.TEXT_REGEX = TEXT_REGEX;
  }
});

// ../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/index.js
var require_expand_brackets2 = __commonJS({
  "../../node_modules/.pnpm/expand-brackets@2.1.4/node_modules/expand-brackets/index.js"(exports2, module2) {
    "use strict";
    var compilers = require_compilers3();
    var parsers = require_parsers3();
    var debug = require_src()("expand-brackets");
    var extend = require_extend_shallow2();
    var Snapdragon = require_snapdragon();
    var toRegex = require_to_regex();
    function brackets(pattern, options) {
      debug("initializing from <%s>", __filename);
      var res = brackets.create(pattern, options);
      return res.output;
    }
    brackets.match = function(arr, pattern, options) {
      arr = [].concat(arr);
      var opts = extend({}, options);
      var isMatch = brackets.matcher(pattern, opts);
      var len = arr.length;
      var idx = -1;
      var res = [];
      while (++idx < len) {
        var ele = arr[idx];
        if (isMatch(ele)) {
          res.push(ele);
        }
      }
      if (res.length === 0) {
        if (opts.failglob === true) {
          throw new Error('no matches found for "' + pattern + '"');
        }
        if (opts.nonull === true || opts.nullglob === true) {
          return [pattern.split("\\").join("")];
        }
      }
      return res;
    };
    brackets.isMatch = function(str, pattern, options) {
      return brackets.matcher(pattern, options)(str);
    };
    brackets.matcher = function(pattern, options) {
      var re = brackets.makeRe(pattern, options);
      return function(str) {
        return re.test(str);
      };
    };
    brackets.makeRe = function(pattern, options) {
      var res = brackets.create(pattern, options);
      var opts = extend({ strictErrors: false }, options);
      return toRegex(res.output, opts);
    };
    brackets.create = function(pattern, options) {
      var snapdragon = options && options.snapdragon || new Snapdragon(options);
      compilers(snapdragon);
      parsers(snapdragon);
      var ast = snapdragon.parse(pattern, options);
      ast.input = pattern;
      var res = snapdragon.compile(ast, options);
      res.input = pattern;
      return res;
    };
    brackets.compilers = compilers;
    brackets.parsers = parsers;
    module2.exports = brackets;
  }
});

// ../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/compilers.js
var require_compilers4 = __commonJS({
  "../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/compilers.js"(exports2, module2) {
    "use strict";
    var brackets = require_expand_brackets2();
    module2.exports = function(extglob) {
      function star() {
        if (typeof extglob.options.star === "function") {
          return extglob.options.star.apply(this, arguments);
        }
        if (typeof extglob.options.star === "string") {
          return extglob.options.star;
        }
        return ".*?";
      }
      extglob.use(brackets.compilers);
      extglob.compiler.set("escape", function(node) {
        return this.emit(node.val, node);
      }).set("dot", function(node) {
        return this.emit("\\" + node.val, node);
      }).set("qmark", function(node) {
        var val = "[^\\\\/.]";
        var prev = this.prev();
        if (node.parsed.slice(-1) === "(") {
          var ch = node.rest.charAt(0);
          if (ch !== "!" && ch !== "=" && ch !== ":") {
            return this.emit(val, node);
          }
          return this.emit(node.val, node);
        }
        if (prev.type === "text" && prev.val) {
          return this.emit(val, node);
        }
        if (node.val.length > 1) {
          val += "{" + node.val.length + "}";
        }
        return this.emit(val, node);
      }).set("plus", function(node) {
        var prev = node.parsed.slice(-1);
        if (prev === "]" || prev === ")") {
          return this.emit(node.val, node);
        }
        var ch = this.output.slice(-1);
        if (!this.output || /[?*+]/.test(ch) && node.parent.type !== "bracket") {
          return this.emit("\\+", node);
        }
        if (/\w/.test(ch) && !node.inside) {
          return this.emit("+\\+?", node);
        }
        return this.emit("+", node);
      }).set("star", function(node) {
        var prev = this.prev();
        var prefix = prev.type !== "text" && prev.type !== "escape" ? "(?!\\.)" : "";
        return this.emit(prefix + star.call(this, node), node);
      }).set("paren", function(node) {
        return this.mapVisit(node.nodes);
      }).set("paren.open", function(node) {
        var capture = this.options.capture ? "(" : "";
        switch (node.parent.prefix) {
          case "!":
          case "^":
            return this.emit(capture + "(?:(?!(?:", node);
          case "*":
          case "+":
          case "?":
          case "@":
            return this.emit(capture + "(?:", node);
          default: {
            var val = node.val;
            if (this.options.bash === true) {
              val = "\\" + val;
            } else if (!this.options.capture && val === "(" && node.parent.rest[0] !== "?") {
              val += "?:";
            }
            return this.emit(val, node);
          }
        }
      }).set("paren.close", function(node) {
        var capture = this.options.capture ? ")" : "";
        switch (node.prefix) {
          case "!":
          case "^":
            var prefix = /^(\)|$)/.test(node.rest) ? "$" : "";
            var str = star.call(this, node);
            if (node.parent.hasSlash && !this.options.star && this.options.slash !== false) {
              str = ".*?";
            }
            return this.emit(prefix + ("))" + str + ")") + capture, node);
          case "*":
          case "+":
          case "?":
            return this.emit(")" + node.prefix + capture, node);
          case "@":
            return this.emit(")" + capture, node);
          default: {
            var val = (this.options.bash === true ? "\\" : "") + ")";
            return this.emit(val, node);
          }
        }
      }).set("text", function(node) {
        var val = node.val.replace(/[\[\]]/g, "\\$&");
        return this.emit(val, node);
      });
    };
  }
});

// ../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/utils.js
var require_utils6 = __commonJS({
  "../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/utils.js"(exports2, module2) {
    "use strict";
    var regex = require_regex_not();
    var Cache = require_fragment_cache();
    var utils = module2.exports;
    var cache = utils.cache = new Cache();
    utils.arrayify = function(val) {
      if (!Array.isArray(val)) {
        return [val];
      }
      return val;
    };
    utils.memoize = function(type, pattern, options, fn) {
      var key = utils.createKey(type + pattern, options);
      if (cache.has(type, key)) {
        return cache.get(type, key);
      }
      var val = fn(pattern, options);
      if (options && options.cache === false) {
        return val;
      }
      cache.set(type, key, val);
      return val;
    };
    utils.createKey = function(pattern, options) {
      var key = pattern;
      if (typeof options === "undefined") {
        return key;
      }
      for (var prop in options) {
        key += ";" + prop + "=" + String(options[prop]);
      }
      return key;
    };
    utils.createRegex = function(str) {
      var opts = { contains: true, strictClose: false };
      return regex(str, opts);
    };
  }
});

// ../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/parsers.js
var require_parsers4 = __commonJS({
  "../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/parsers.js"(exports2, module2) {
    "use strict";
    var brackets = require_expand_brackets2();
    var define2 = require_define_property2();
    var utils = require_utils6();
    var TEXT_REGEX = "([!@*?+]?\\(|\\)|[*?.+\\\\]|\\[:?(?=.*\\])|:?\\])+";
    var not = utils.createRegex(TEXT_REGEX);
    function parsers(extglob) {
      extglob.state = extglob.state || {};
      extglob.use(brackets.parsers);
      extglob.parser.sets.paren = extglob.parser.sets.paren || [];
      extglob.parser.capture("paren.open", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^([!@*?+])?\(/);
        if (!m) return;
        var prev = this.prev();
        var prefix = m[1];
        var val = m[0];
        var open = pos({
          type: "paren.open",
          parsed,
          val
        });
        var node = pos({
          type: "paren",
          prefix,
          nodes: [open]
        });
        if (prefix === "!" && prev.type === "paren" && prev.prefix === "!") {
          prev.prefix = "@";
          node.prefix = "@";
        }
        define2(node, "rest", this.input);
        define2(node, "parsed", parsed);
        define2(node, "parent", prev);
        define2(open, "parent", node);
        this.push("paren", node);
        prev.nodes.push(node);
      }).capture("paren.close", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^\)/);
        if (!m) return;
        var parent = this.pop("paren");
        var node = pos({
          type: "paren.close",
          rest: this.input,
          parsed,
          val: m[0]
        });
        if (!this.isType(parent, "paren")) {
          if (this.options.strict) {
            throw new Error('missing opening paren: "("');
          }
          node.escaped = true;
          return node;
        }
        node.prefix = parent.prefix;
        parent.nodes.push(node);
        define2(node, "parent", parent);
      }).capture("escape", function() {
        var pos = this.position();
        var m = this.match(/^\\(.)/);
        if (!m) return;
        return pos({
          type: "escape",
          val: m[0],
          ch: m[1]
        });
      }).capture("qmark", function() {
        var parsed = this.parsed;
        var pos = this.position();
        var m = this.match(/^\?+(?!\()/);
        if (!m) return;
        extglob.state.metachar = true;
        return pos({
          type: "qmark",
          rest: this.input,
          parsed,
          val: m[0]
        });
      }).capture("star", /^\*(?!\()/).capture("plus", /^\+(?!\()/).capture("dot", /^\./).capture("text", not);
    }
    module2.exports.TEXT_REGEX = TEXT_REGEX;
    module2.exports = parsers;
  }
});

// ../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/extglob.js
var require_extglob2 = __commonJS({
  "../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/lib/extglob.js"(exports2, module2) {
    "use strict";
    var Snapdragon = require_snapdragon();
    var define2 = require_define_property2();
    var extend = require_extend_shallow2();
    var compilers = require_compilers4();
    var parsers = require_parsers4();
    function Extglob(options) {
      this.options = extend({ source: "extglob" }, options);
      this.snapdragon = this.options.snapdragon || new Snapdragon(this.options);
      this.snapdragon.patterns = this.snapdragon.patterns || {};
      this.compiler = this.snapdragon.compiler;
      this.parser = this.snapdragon.parser;
      compilers(this.snapdragon);
      parsers(this.snapdragon);
      define2(this.snapdragon, "parse", function(str, options2) {
        var parsed = Snapdragon.prototype.parse.apply(this, arguments);
        parsed.input = str;
        var last = this.parser.stack.pop();
        if (last && this.options.strict !== true) {
          var node = last.nodes[0];
          node.val = "\\" + node.val;
          var sibling = node.parent.nodes[1];
          if (sibling.type === "star") {
            sibling.loose = true;
          }
        }
        define2(parsed, "parser", this.parser);
        return parsed;
      });
      define2(this, "parse", function(ast, options2) {
        return this.snapdragon.parse.apply(this.snapdragon, arguments);
      });
      define2(this, "compile", function(ast, options2) {
        return this.snapdragon.compile.apply(this.snapdragon, arguments);
      });
    }
    module2.exports = Extglob;
  }
});

// ../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/index.js
var require_extglob3 = __commonJS({
  "../../node_modules/.pnpm/extglob@2.0.4/node_modules/extglob/index.js"(exports2, module2) {
    "use strict";
    var extend = require_extend_shallow2();
    var unique = require_array_unique2();
    var toRegex = require_to_regex();
    var compilers = require_compilers4();
    var parsers = require_parsers4();
    var Extglob = require_extglob2();
    var utils = require_utils6();
    var MAX_LENGTH = 1024 * 64;
    function extglob(pattern, options) {
      return extglob.create(pattern, options).output;
    }
    extglob.match = function(list, pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected pattern to be a string");
      }
      list = utils.arrayify(list);
      var isMatch = extglob.matcher(pattern, options);
      var len = list.length;
      var idx = -1;
      var matches = [];
      while (++idx < len) {
        var ele = list[idx];
        if (isMatch(ele)) {
          matches.push(ele);
        }
      }
      if (typeof options === "undefined") {
        return unique(matches);
      }
      if (matches.length === 0) {
        if (options.failglob === true) {
          throw new Error('no matches found for "' + pattern + '"');
        }
        if (options.nonull === true || options.nullglob === true) {
          return [pattern.split("\\").join("")];
        }
      }
      return options.nodupes !== false ? unique(matches) : matches;
    };
    extglob.isMatch = function(str, pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected pattern to be a string");
      }
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (pattern === str) {
        return true;
      }
      if (pattern === "" || pattern === " " || pattern === ".") {
        return pattern === str;
      }
      var isMatch = utils.memoize("isMatch", pattern, options, extglob.matcher);
      return isMatch(str);
    };
    extglob.contains = function(str, pattern, options) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (pattern === "" || pattern === " " || pattern === ".") {
        return pattern === str;
      }
      var opts = extend({}, options, { contains: true });
      opts.strictClose = false;
      opts.strictOpen = false;
      return extglob.isMatch(str, pattern, opts);
    };
    extglob.matcher = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected pattern to be a string");
      }
      function matcher() {
        var re = extglob.makeRe(pattern, options);
        return function(str) {
          return re.test(str);
        };
      }
      return utils.memoize("matcher", pattern, options, matcher);
    };
    extglob.create = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected pattern to be a string");
      }
      function create() {
        var ext = new Extglob(options);
        var ast = ext.parse(pattern, options);
        return ext.compile(ast, options);
      }
      return utils.memoize("create", pattern, options, create);
    };
    extglob.capture = function(pattern, str, options) {
      var re = extglob.makeRe(pattern, extend({ capture: true }, options));
      function match() {
        return function(string) {
          var match2 = re.exec(string);
          if (!match2) {
            return null;
          }
          return match2.slice(1);
        };
      }
      var capture = utils.memoize("capture", pattern, options, match);
      return capture(str);
    };
    extglob.makeRe = function(pattern, options) {
      if (pattern instanceof RegExp) {
        return pattern;
      }
      if (typeof pattern !== "string") {
        throw new TypeError("expected pattern to be a string");
      }
      if (pattern.length > MAX_LENGTH) {
        throw new Error("expected pattern to be less than " + MAX_LENGTH + " characters");
      }
      function makeRe() {
        var opts = extend({ strictErrors: false }, options);
        if (opts.strictErrors === true) opts.strict = true;
        var res = extglob.create(pattern, opts);
        return toRegex(res.output, opts);
      }
      var regex = utils.memoize("makeRe", pattern, options, makeRe);
      if (regex.source.length > MAX_LENGTH) {
        throw new SyntaxError("potentially malicious regex detected");
      }
      return regex;
    };
    extglob.cache = utils.cache;
    extglob.clearCache = function() {
      extglob.cache.__data__ = {};
    };
    extglob.Extglob = Extglob;
    extglob.compilers = compilers;
    extglob.parsers = parsers;
    module2.exports = extglob;
  }
});

// ../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/compilers.js
var require_compilers5 = __commonJS({
  "../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/compilers.js"(exports2, module2) {
    "use strict";
    var nanomatch = require_nanomatch();
    var extglob = require_extglob3();
    module2.exports = function(snapdragon) {
      var compilers = snapdragon.compiler.compilers;
      var opts = snapdragon.options;
      snapdragon.use(nanomatch.compilers);
      var escape = compilers.escape;
      var qmark = compilers.qmark;
      var slash = compilers.slash;
      var star = compilers.star;
      var text = compilers.text;
      var plus = compilers.plus;
      var dot = compilers.dot;
      if (opts.extglob === false || opts.noext === true) {
        snapdragon.compiler.use(escapeExtglobs);
      } else {
        snapdragon.use(extglob.compilers);
      }
      snapdragon.use(function() {
        this.options.star = this.options.star || function() {
          return "[^\\\\/]*?";
        };
      });
      snapdragon.compiler.set("dot", dot).set("escape", escape).set("plus", plus).set("slash", slash).set("qmark", qmark).set("star", star).set("text", text);
    };
    function escapeExtglobs(compiler) {
      compiler.set("paren", function(node) {
        var val = "";
        visit(node, function(tok) {
          if (tok.val) val += (/^\W/.test(tok.val) ? "\\" : "") + tok.val;
        });
        return this.emit(val, node);
      });
      function visit(node, fn) {
        return node.nodes ? mapVisit(node.nodes, fn) : fn(node);
      }
      function mapVisit(nodes, fn) {
        var len = nodes.length;
        var idx = -1;
        while (++idx < len) {
          visit(nodes[idx], fn);
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/parsers.js
var require_parsers5 = __commonJS({
  "../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/parsers.js"(exports2, module2) {
    "use strict";
    var extglob = require_extglob3();
    var nanomatch = require_nanomatch();
    var regexNot = require_regex_not();
    var toRegex = require_to_regex();
    var not;
    var TEXT = "([!@*?+]?\\(|\\)|\\[:?(?=.*?:?\\])|:?\\]|[*+?!^$.\\\\/])+";
    var createNotRegex = function(opts) {
      return not || (not = textRegex(TEXT));
    };
    module2.exports = function(snapdragon) {
      var parsers = snapdragon.parser.parsers;
      snapdragon.use(nanomatch.parsers);
      var escape = parsers.escape;
      var slash = parsers.slash;
      var qmark = parsers.qmark;
      var plus = parsers.plus;
      var star = parsers.star;
      var dot = parsers.dot;
      snapdragon.use(extglob.parsers);
      snapdragon.parser.use(function() {
        this.notRegex = /^\!+(?!\()/;
      }).capture("escape", escape).capture("slash", slash).capture("qmark", qmark).capture("star", star).capture("plus", plus).capture("dot", dot).capture("text", function() {
        if (this.isInside("bracket")) return;
        var pos = this.position();
        var m = this.match(createNotRegex(this.options));
        if (!m || !m[0]) return;
        var val = m[0].replace(/([[\]^$])/g, "\\$1");
        return pos({
          type: "text",
          val
        });
      });
    };
    function textRegex(pattern) {
      var notStr = regexNot.create(pattern, { contains: true, strictClose: false });
      var prefix = "(?:[\\^]|\\\\|";
      return toRegex(prefix + notStr + ")", { strictClose: false });
    }
  }
});

// ../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/cache.js
var require_cache2 = __commonJS({
  "../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/cache.js"(exports2, module2) {
    module2.exports = new (require_fragment_cache())();
  }
});

// ../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/utils.js
var require_utils7 = __commonJS({
  "../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/lib/utils.js"(exports2, module2) {
    "use strict";
    var utils = module2.exports;
    var path = require("path");
    var Snapdragon = require_snapdragon();
    utils.define = require_define_property();
    utils.diff = require_arr_diff2();
    utils.extend = require_extend_shallow();
    utils.pick = require_object3();
    utils.typeOf = require_kind_of2();
    utils.unique = require_array_unique2();
    utils.isWindows = function() {
      return path.sep === "\\" || process.platform === "win32";
    };
    utils.instantiate = function(ast, options) {
      var snapdragon;
      if (utils.typeOf(ast) === "object" && ast.snapdragon) {
        snapdragon = ast.snapdragon;
      } else if (utils.typeOf(options) === "object" && options.snapdragon) {
        snapdragon = options.snapdragon;
      } else {
        snapdragon = new Snapdragon(options);
      }
      utils.define(snapdragon, "parse", function(str, options2) {
        var parsed = Snapdragon.prototype.parse.apply(this, arguments);
        parsed.input = str;
        var last = this.parser.stack.pop();
        if (last && this.options.strictErrors !== true) {
          var open = last.nodes[0];
          var inner = last.nodes[1];
          if (last.type === "bracket") {
            if (inner.val.charAt(0) === "[") {
              inner.val = "\\" + inner.val;
            }
          } else {
            open.val = "\\" + open.val;
            var sibling = open.parent.nodes[1];
            if (sibling.type === "star") {
              sibling.loose = true;
            }
          }
        }
        utils.define(parsed, "parser", this.parser);
        return parsed;
      });
      return snapdragon;
    };
    utils.createKey = function(pattern, options) {
      if (utils.typeOf(options) !== "object") {
        return pattern;
      }
      var val = pattern;
      var keys = Object.keys(options);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        val += ";" + key + "=" + String(options[key]);
      }
      return val;
    };
    utils.arrayify = function(val) {
      if (typeof val === "string") return [val];
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    utils.isString = function(val) {
      return typeof val === "string";
    };
    utils.isObject = function(val) {
      return utils.typeOf(val) === "object";
    };
    utils.hasSpecialChars = function(str) {
      return /(?:(?:(^|\/)[!.])|[*?+()|\[\]{}]|[+@]\()/.test(str);
    };
    utils.escapeRegex = function(str) {
      return str.replace(/[-[\]{}()^$|*+?.\\\/\s]/g, "\\$&");
    };
    utils.toPosixPath = function(str) {
      return str.replace(/\\+/g, "/");
    };
    utils.unescape = function(str) {
      return utils.toPosixPath(str.replace(/\\(?=[*+?!.])/g, ""));
    };
    utils.stripPrefix = function(str) {
      if (str.charAt(0) !== ".") {
        return str;
      }
      var ch = str.charAt(1);
      if (utils.isSlash(ch)) {
        return str.slice(2);
      }
      return str;
    };
    utils.isSlash = function(str) {
      return str === "/" || str === "\\/" || str === "\\" || str === "\\\\";
    };
    utils.matchPath = function(pattern, options) {
      return options && options.contains ? utils.containsPattern(pattern, options) : utils.equalsPattern(pattern, options);
    };
    utils._equals = function(filepath, unixPath, pattern) {
      return pattern === filepath || pattern === unixPath;
    };
    utils._contains = function(filepath, unixPath, pattern) {
      return filepath.indexOf(pattern) !== -1 || unixPath.indexOf(pattern) !== -1;
    };
    utils.equalsPattern = function(pattern, options) {
      var unixify = utils.unixify(options);
      options = options || {};
      return function fn(filepath) {
        var equal = utils._equals(filepath, unixify(filepath), pattern);
        if (equal === true || options.nocase !== true) {
          return equal;
        }
        var lower = filepath.toLowerCase();
        return utils._equals(lower, unixify(lower), pattern);
      };
    };
    utils.containsPattern = function(pattern, options) {
      var unixify = utils.unixify(options);
      options = options || {};
      return function(filepath) {
        var contains = utils._contains(filepath, unixify(filepath), pattern);
        if (contains === true || options.nocase !== true) {
          return contains;
        }
        var lower = filepath.toLowerCase();
        return utils._contains(lower, unixify(lower), pattern);
      };
    };
    utils.matchBasename = function(re) {
      return function(filepath) {
        return re.test(path.basename(filepath));
      };
    };
    utils.value = function(str, unixify, options) {
      if (options && options.unixify === false) {
        return str;
      }
      return unixify(str);
    };
    utils.unixify = function(options) {
      options = options || {};
      return function(filepath) {
        if (utils.isWindows() || options.unixify === true) {
          filepath = utils.toPosixPath(filepath);
        }
        if (options.stripPrefix !== false) {
          filepath = utils.stripPrefix(filepath);
        }
        if (options.unescape === true) {
          filepath = utils.unescape(filepath);
        }
        return filepath;
      };
    };
  }
});

// ../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/index.js
var require_micromatch2 = __commonJS({
  "../../node_modules/.pnpm/micromatch@3.1.10/node_modules/micromatch/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var braces = require_braces3();
    var toRegex = require_to_regex();
    var extend = require_extend_shallow();
    var compilers = require_compilers5();
    var parsers = require_parsers5();
    var cache = require_cache2();
    var utils = require_utils7();
    var MAX_LENGTH = 1024 * 64;
    function micromatch(list, patterns, options) {
      patterns = utils.arrayify(patterns);
      list = utils.arrayify(list);
      var len = patterns.length;
      if (list.length === 0 || len === 0) {
        return [];
      }
      if (len === 1) {
        return micromatch.match(list, patterns[0], options);
      }
      var omit = [];
      var keep = [];
      var idx = -1;
      while (++idx < len) {
        var pattern = patterns[idx];
        if (typeof pattern === "string" && pattern.charCodeAt(0) === 33) {
          omit.push.apply(omit, micromatch.match(list, pattern.slice(1), options));
        } else {
          keep.push.apply(keep, micromatch.match(list, pattern, options));
        }
      }
      var matches = utils.diff(keep, omit);
      if (!options || options.nodupes !== false) {
        return utils.unique(matches);
      }
      return matches;
    }
    micromatch.match = function(list, pattern, options) {
      if (Array.isArray(pattern)) {
        throw new TypeError("expected pattern to be a string");
      }
      var unixify = utils.unixify(options);
      var isMatch = memoize("match", pattern, options, micromatch.matcher);
      var matches = [];
      list = utils.arrayify(list);
      var len = list.length;
      var idx = -1;
      while (++idx < len) {
        var ele = list[idx];
        if (ele === pattern || isMatch(ele)) {
          matches.push(utils.value(ele, unixify, options));
        }
      }
      if (typeof options === "undefined") {
        return utils.unique(matches);
      }
      if (matches.length === 0) {
        if (options.failglob === true) {
          throw new Error('no matches found for "' + pattern + '"');
        }
        if (options.nonull === true || options.nullglob === true) {
          return [options.unescape ? utils.unescape(pattern) : pattern];
        }
      }
      if (options.ignore) {
        matches = micromatch.not(matches, options.ignore, options);
      }
      return options.nodupes !== false ? utils.unique(matches) : matches;
    };
    micromatch.isMatch = function(str, pattern, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (isEmptyString(str) || isEmptyString(pattern)) {
        return false;
      }
      var equals = utils.equalsPattern(options);
      if (equals(str)) {
        return true;
      }
      var isMatch = memoize("isMatch", pattern, options, micromatch.matcher);
      return isMatch(str);
    };
    micromatch.some = function(list, patterns, options) {
      if (typeof list === "string") {
        list = [list];
      }
      for (var i = 0; i < list.length; i++) {
        if (micromatch(list[i], patterns, options).length === 1) {
          return true;
        }
      }
      return false;
    };
    micromatch.every = function(list, patterns, options) {
      if (typeof list === "string") {
        list = [list];
      }
      for (var i = 0; i < list.length; i++) {
        if (micromatch(list[i], patterns, options).length !== 1) {
          return false;
        }
      }
      return true;
    };
    micromatch.any = function(str, patterns, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (isEmptyString(str) || isEmptyString(patterns)) {
        return false;
      }
      if (typeof patterns === "string") {
        patterns = [patterns];
      }
      for (var i = 0; i < patterns.length; i++) {
        if (micromatch.isMatch(str, patterns[i], options)) {
          return true;
        }
      }
      return false;
    };
    micromatch.all = function(str, patterns, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (typeof patterns === "string") {
        patterns = [patterns];
      }
      for (var i = 0; i < patterns.length; i++) {
        if (!micromatch.isMatch(str, patterns[i], options)) {
          return false;
        }
      }
      return true;
    };
    micromatch.not = function(list, patterns, options) {
      var opts = extend({}, options);
      var ignore = opts.ignore;
      delete opts.ignore;
      var unixify = utils.unixify(opts);
      list = utils.arrayify(list).map(unixify);
      var matches = utils.diff(list, micromatch(list, patterns, opts));
      if (ignore) {
        matches = utils.diff(matches, micromatch(list, ignore));
      }
      return opts.nodupes !== false ? utils.unique(matches) : matches;
    };
    micromatch.contains = function(str, patterns, options) {
      if (typeof str !== "string") {
        throw new TypeError('expected a string: "' + util.inspect(str) + '"');
      }
      if (typeof patterns === "string") {
        if (isEmptyString(str) || isEmptyString(patterns)) {
          return false;
        }
        var equals = utils.equalsPattern(patterns, options);
        if (equals(str)) {
          return true;
        }
        var contains = utils.containsPattern(patterns, options);
        if (contains(str)) {
          return true;
        }
      }
      var opts = extend({}, options, { contains: true });
      return micromatch.any(str, patterns, opts);
    };
    micromatch.matchBase = function(pattern, options) {
      if (pattern && pattern.indexOf("/") !== -1 || !options) return false;
      return options.basename === true || options.matchBase === true;
    };
    micromatch.matchKeys = function(obj, patterns, options) {
      if (!utils.isObject(obj)) {
        throw new TypeError("expected the first argument to be an object");
      }
      var keys = micromatch(Object.keys(obj), patterns, options);
      return utils.pick(obj, keys);
    };
    micromatch.matcher = function matcher(pattern, options) {
      if (Array.isArray(pattern)) {
        return compose(pattern, options, matcher);
      }
      if (pattern instanceof RegExp) {
        return test(pattern);
      }
      if (!utils.isString(pattern)) {
        throw new TypeError("expected pattern to be an array, string or regex");
      }
      if (!utils.hasSpecialChars(pattern)) {
        if (options && options.nocase === true) {
          pattern = pattern.toLowerCase();
        }
        return utils.matchPath(pattern, options);
      }
      var re = micromatch.makeRe(pattern, options);
      if (micromatch.matchBase(pattern, options)) {
        return utils.matchBasename(re, options);
      }
      function test(regex) {
        var equals = utils.equalsPattern(options);
        var unixify = utils.unixify(options);
        return function(str) {
          if (equals(str)) {
            return true;
          }
          if (regex.test(unixify(str))) {
            return true;
          }
          return false;
        };
      }
      var fn = test(re);
      Object.defineProperty(fn, "result", {
        configurable: true,
        enumerable: false,
        value: re.result
      });
      return fn;
    };
    micromatch.capture = function(pattern, str, options) {
      var re = micromatch.makeRe(pattern, extend({ capture: true }, options));
      var unixify = utils.unixify(options);
      function match() {
        return function(string) {
          var match2 = re.exec(unixify(string));
          if (!match2) {
            return null;
          }
          return match2.slice(1);
        };
      }
      var capture = memoize("capture", pattern, options, match);
      return capture(str);
    };
    micromatch.makeRe = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected pattern to be a string");
      }
      if (pattern.length > MAX_LENGTH) {
        throw new Error("expected pattern to be less than " + MAX_LENGTH + " characters");
      }
      function makeRe() {
        var result = micromatch.create(pattern, options);
        var ast_array = [];
        var output = result.map(function(obj) {
          obj.ast.state = obj.state;
          ast_array.push(obj.ast);
          return obj.output;
        });
        var regex = toRegex(output.join("|"), options);
        Object.defineProperty(regex, "result", {
          configurable: true,
          enumerable: false,
          value: ast_array
        });
        return regex;
      }
      return memoize("makeRe", pattern, options, makeRe);
    };
    micromatch.braces = function(pattern, options) {
      if (typeof pattern !== "string" && !Array.isArray(pattern)) {
        throw new TypeError("expected pattern to be an array or string");
      }
      function expand() {
        if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
          return utils.arrayify(pattern);
        }
        return braces(pattern, options);
      }
      return memoize("braces", pattern, options, expand);
    };
    micromatch.braceExpand = function(pattern, options) {
      var opts = extend({}, options, { expand: true });
      return micromatch.braces(pattern, opts);
    };
    micromatch.create = function(pattern, options) {
      return memoize("create", pattern, options, function() {
        function create(str, opts) {
          return micromatch.compile(micromatch.parse(str, opts), opts);
        }
        pattern = micromatch.braces(pattern, options);
        var len = pattern.length;
        var idx = -1;
        var res = [];
        while (++idx < len) {
          res.push(create(pattern[idx], options));
        }
        return res;
      });
    };
    micromatch.parse = function(pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("expected a string");
      }
      function parse() {
        var snapdragon = utils.instantiate(null, options);
        parsers(snapdragon, options);
        var ast = snapdragon.parse(pattern, options);
        utils.define(ast, "snapdragon", snapdragon);
        ast.input = pattern;
        return ast;
      }
      return memoize("parse", pattern, options, parse);
    };
    micromatch.compile = function(ast, options) {
      if (typeof ast === "string") {
        ast = micromatch.parse(ast, options);
      }
      return memoize("compile", ast.input, options, function() {
        var snapdragon = utils.instantiate(ast, options);
        compilers(snapdragon, options);
        return snapdragon.compile(ast, options);
      });
    };
    micromatch.clearCache = function() {
      micromatch.cache.caches = {};
    };
    function isEmptyString(val) {
      return String(val) === "" || String(val) === "./";
    }
    function compose(patterns, options, matcher) {
      var matchers;
      return memoize("compose", String(patterns), options, function() {
        return function(file) {
          if (!matchers) {
            matchers = [];
            for (var i = 0; i < patterns.length; i++) {
              matchers.push(matcher(patterns[i], options));
            }
          }
          var len = matchers.length;
          while (len--) {
            if (matchers[len](file) === true) {
              return true;
            }
          }
          return false;
        };
      });
    }
    function memoize(type, pattern, options, fn) {
      var key = utils.createKey(type + "=" + pattern, options);
      if (options && options.cache === false) {
        return fn(pattern, options);
      }
      if (cache.has(type, key)) {
        return cache.get(type, key);
      }
      var val = fn(pattern, options);
      cache.set(type, key, val);
      return val;
    }
    micromatch.compilers = compilers;
    micromatch.parsers = parsers;
    micromatch.caches = cache.caches;
    module2.exports = micromatch;
  }
});

// ../../node_modules/.pnpm/process-nextick-args@2.0.1/node_modules/process-nextick-args/index.js
var require_process_nextick_args = __commonJS({
  "../../node_modules/.pnpm/process-nextick-args@2.0.1/node_modules/process-nextick-args/index.js"(exports2, module2) {
    "use strict";
    if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
      module2.exports = { nextTick };
    } else {
      module2.exports = process;
    }
    function nextTick(fn, arg1, arg2, arg3) {
      if (typeof fn !== "function") {
        throw new TypeError('"callback" argument must be a function');
      }
      var len = arguments.length;
      var args, i;
      switch (len) {
        case 0:
        case 1:
          return process.nextTick(fn);
        case 2:
          return process.nextTick(function afterTickOne() {
            fn.call(null, arg1);
          });
        case 3:
          return process.nextTick(function afterTickTwo() {
            fn.call(null, arg1, arg2);
          });
        case 4:
          return process.nextTick(function afterTickThree() {
            fn.call(null, arg1, arg2, arg3);
          });
        default:
          args = new Array(len - 1);
          i = 0;
          while (i < args.length) {
            args[i++] = arguments[i];
          }
          return process.nextTick(function afterTick() {
            fn.apply(null, args);
          });
      }
    }
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/internal/streams/stream.js"(exports2, module2) {
    module2.exports = require("stream");
  }
});

// ../../node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "../../node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// ../../node_modules/.pnpm/core-util-is@1.0.3/node_modules/core-util-is/lib/util.js
var require_util3 = __commonJS({
  "../../node_modules/.pnpm/core-util-is@1.0.3/node_modules/core-util-is/lib/util.js"(exports2) {
    function isArray(arg) {
      if (Array.isArray) {
        return Array.isArray(arg);
      }
      return objectToString(arg) === "[object Array]";
    }
    exports2.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports2.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports2.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports2.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports2.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports2.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports2.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports2.isUndefined = isUndefined;
    function isRegExp(re) {
      return objectToString(re) === "[object RegExp]";
    }
    exports2.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports2.isObject = isObject;
    function isDate(d) {
      return objectToString(d) === "[object Date]";
    }
    exports2.isDate = isDate;
    function isError(e) {
      return objectToString(e) === "[object Error]" || e instanceof Error;
    }
    exports2.isError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports2.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports2.isPrimitive = isPrimitive;
    exports2.isBuffer = require("buffer").Buffer.isBuffer;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/internal/streams/BufferList.js"(exports2, module2) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Buffer2 = require_safe_buffer().Buffer;
    var util = require("util");
    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }
    module2.exports = function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList.prototype.push = function push(v) {
        var entry = { data: v, next: null };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList.prototype.unshift = function unshift(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList.prototype.shift = function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function join(s) {
        if (this.length === 0) return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s + p.data;
        }
        return ret;
      };
      BufferList.prototype.concat = function concat(n) {
        if (this.length === 0) return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      return BufferList;
    }();
    if (util && util.inspect && util.inspect.custom) {
      module2.exports.prototype[util.inspect.custom] = function() {
        var obj = util.inspect({ length: this.length });
        return this.constructor.name + " " + obj;
      };
    }
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            pna.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            pna.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            pna.nextTick(emitErrorNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            pna.nextTick(emitErrorNT, _this, err2);
          }
        } else if (cb) {
          cb(err2);
        }
      });
      return this;
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    module2.exports = {
      destroy,
      undestroy
    };
  }
});

// ../../node_modules/.pnpm/util-deprecate@1.0.2/node_modules/util-deprecate/node.js
var require_node3 = __commonJS({
  "../../node_modules/.pnpm/util-deprecate@1.0.2/node_modules/util-deprecate/node.js"(exports2, module2) {
    module2.exports = require("util").deprecate;
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_writable.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    module2.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
    var Duplex;
    Writable.WritableState = WritableState;
    var util = Object.create(require_util3());
    util.inherits = require_inherits();
    var internalUtil = {
      deprecate: require_node3()
    };
    var Stream = require_stream();
    var Buffer2 = require_safe_buffer().Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    util.inherits(Writable, Stream);
    function nop() {
    }
    function WritableState(options, stream) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      var isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
      var hwm = options.highWaterMark;
      var writableHwm = options.writableHighWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      if (hwm || hwm === 0) this.highWaterMark = hwm;
      else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
      else this.highWaterMark = defaultHwm;
      this.highWaterMark = Math.floor(this.highWaterMark);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function(object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
        return new Writable(options);
      }
      this._writableState = new WritableState(options, this);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      this.emit("error", new Error("Cannot pipe, not readable"));
    };
    function writeAfterEnd(stream, cb) {
      var er = new Error("write after end");
      stream.emit("error", er);
      pna.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var valid = true;
      var er = false;
      if (chunk === null) {
        er = new TypeError("May not write null values to stream");
      } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new TypeError("Invalid non-string/buffer chunk");
      }
      if (er) {
        stream.emit("error", er);
        pna.nextTick(cb, er);
        valid = false;
      }
      return valid;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf) encoding = "buffer";
      else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== "function") cb = nop;
      if (state.ended) writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        pna.nextTick(cb, er);
        pna.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        stream.emit("error", er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        stream.emit("error", er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state);
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          asyncWrite(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf) allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null) state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error("_write() is not implemented"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending) endWritable(this, state, cb);
    };
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          stream.emit("error", err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function") {
          state.pendingcb++;
          state.finalCalled = true;
          pna.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished) pna.nextTick(cb);
        else stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      get: function() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      this.end();
      cb(err);
    };
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_duplex.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) {
        keys2.push(key);
      }
      return keys2;
    };
    module2.exports = Duplex;
    var util = Object.create(require_util3());
    util.inherits = require_inherits();
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    util.inherits(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      if (options && options.readable === false) this.readable = false;
      if (options && options.writable === false) this.writable = false;
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
      this.once("end", onend);
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function() {
        return this._writableState.highWaterMark;
      }
    });
    function onend() {
      if (this.allowHalfOpen || this._writableState.ended) return;
      pna.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      get: function() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
    Duplex.prototype._destroy = function(err, cb) {
      this.push(null);
      this.end();
      pna.nextTick(cb, err);
    };
  }
});

// ../../node_modules/.pnpm/string_decoder@1.1.1/node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "../../node_modules/.pnpm/string_decoder@1.1.1/node_modules/string_decoder/lib/string_decoder.js"(exports2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried) return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports2.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0) return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_readable.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    module2.exports = Readable;
    var isArray = require_isarray();
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require("events").EventEmitter;
    var EElistenerCount = function(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream();
    var Buffer2 = require_safe_buffer().Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var util = Object.create(require_util3());
    util.inherits = require_inherits();
    var debugUtil = require("util");
    var debug = void 0;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function() {
      };
    }
    var BufferList = require_BufferList();
    var destroyImpl = require_destroy();
    var StringDecoder;
    util.inherits(Readable, Stream);
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      var isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
      var hwm = options.highWaterMark;
      var readableHwm = options.readableHighWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      if (hwm || hwm === 0) this.highWaterMark = hwm;
      else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
      else this.highWaterMark = defaultHwm;
      this.highWaterMark = Math.floor(this.highWaterMark);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable)) return new Readable(options);
      this._readableState = new ReadableState(options, this);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      get: function() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      this.push(null);
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) {
          stream.emit("error", er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted) stream.emit("error", new Error("stream.unshift() after end event"));
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            stream.emit("error", new Error("stream.push() after EOF"));
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
        }
      }
      return needMoreData(state);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit("data", chunk);
        stream.read(0);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new TypeError("Invalid non-string/buffer chunk");
      }
      return er;
    }
    function needMoreData(state) {
      return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    var MAX_HWM = 8388608;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if (state.objectMode) return 1;
      if (n !== n) {
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
      }
      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false;
      if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0) state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = true;
        n = 0;
      } else {
        state.length -= n;
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null) this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      emitReadable(stream);
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        if (state.sync) pna.nextTick(emitReadable_, stream);
        else emitReadable_(stream);
      }
    }
    function emitReadable_(stream) {
      debug("emit readable");
      stream.emit("readable");
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        pna.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
        else len = state.length;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      this.emit("error", new Error("_read() is not implemented"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) pna.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      var increasedAwaitDrain = false;
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);
        if (false === ret && !increasedAwaitDrain) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
            increasedAwaitDrain = true;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = { hasUnpiped: false };
      if (state.pipesCount === 0) return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) {
          dests[i].emit("unpipe", this, { hasUnpiped: false });
        }
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      if (ev === "data") {
        if (this._readableState.flowing !== false) this.resume();
      } else if (ev === "readable") {
        var state = this._readableState;
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.emittedReadable = false;
          if (!state.reading) {
            pna.nextTick(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        pna.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      if (!state.reading) {
        debug("resume read 0");
        stream.read(0);
      }
      state.resumeScheduled = false;
      state.awaitDrain = 0;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) {
      }
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = /* @__PURE__ */ function(method) {
            return function() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function() {
        return this._readableState.highWaterMark;
      }
    });
    Readable._fromList = fromList;
    function fromList(n, state) {
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.head.data;
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = fromListPartial(n, state.buffer, state.decoder);
      }
      return ret;
    }
    function fromListPartial(n, list, hasStrings) {
      var ret;
      if (n < list.head.data.length) {
        ret = list.head.data.slice(0, n);
        list.head.data = list.head.data.slice(n);
      } else if (n === list.head.data.length) {
        ret = list.shift();
      } else {
        ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
      }
      return ret;
    }
    function copyFromBufferString(n, list) {
      var p = list.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;
      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;
        else ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) list.head = p.next;
            else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = str.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function copyFromBuffer(n, list) {
      var ret = Buffer2.allocUnsafe(n);
      var p = list.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;
      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) list.head = p.next;
            else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = buf.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
      if (!state.endEmitted) {
        state.ended = true;
        pna.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
      }
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }
      return -1;
    }
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_transform.js"(exports2, module2) {
    "use strict";
    module2.exports = Transform;
    var Duplex = require_stream_duplex();
    var util = Object.create(require_util3());
    util.inherits = require_inherits();
    util.inherits(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb) {
        return this.emit("error", new Error("write callback called multiple times"));
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function") {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("_transform() is not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      var _this2 = this;
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
        _this2.emit("close");
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");
      if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");
      return stream.push(null);
    }
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/lib/_stream_passthrough.js"(exports2, module2) {
    "use strict";
    module2.exports = PassThrough;
    var Transform = require_stream_transform();
    var util = Object.create(require_util3());
    util.inherits = require_inherits();
    util.inherits(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// ../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/readable.js
var require_readable = __commonJS({
  "../../node_modules/.pnpm/readable-stream@2.3.8/node_modules/readable-stream/readable.js"(exports2, module2) {
    var Stream = require("stream");
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module2.exports = Stream;
      exports2 = module2.exports = Stream.Readable;
      exports2.Readable = Stream.Readable;
      exports2.Writable = Stream.Writable;
      exports2.Duplex = Stream.Duplex;
      exports2.Transform = Stream.Transform;
      exports2.PassThrough = Stream.PassThrough;
      exports2.Stream = Stream;
    } else {
      exports2 = module2.exports = require_stream_readable();
      exports2.Stream = Stream || exports2;
      exports2.Readable = exports2;
      exports2.Writable = require_stream_writable();
      exports2.Duplex = require_stream_duplex();
      exports2.Transform = require_stream_transform();
      exports2.PassThrough = require_stream_passthrough();
    }
  }
});

// ../../node_modules/.pnpm/readdirp@2.2.1/node_modules/readdirp/stream-api.js
var require_stream_api = __commonJS({
  "../../node_modules/.pnpm/readdirp@2.2.1/node_modules/readdirp/stream-api.js"(exports2, module2) {
    "use strict";
    var stream = require_readable();
    var util = require("util");
    var Readable = stream.Readable;
    module2.exports = ReaddirpReadable;
    util.inherits(ReaddirpReadable, Readable);
    function ReaddirpReadable(opts) {
      if (!(this instanceof ReaddirpReadable)) return new ReaddirpReadable(opts);
      opts = opts || {};
      opts.objectMode = true;
      Readable.call(this, opts);
      this.highWaterMark = Infinity;
      this._destroyed = false;
      this._paused = false;
      this._warnings = [];
      this._errors = [];
      this._pauseResumeErrors();
    }
    var proto = ReaddirpReadable.prototype;
    proto._pauseResumeErrors = function() {
      var self2 = this;
      self2.on("pause", function() {
        self2._paused = true;
      });
      self2.on("resume", function() {
        if (self2._destroyed) return;
        self2._paused = false;
        self2._warnings.forEach(function(err) {
          self2.emit("warn", err);
        });
        self2._warnings.length = 0;
        self2._errors.forEach(function(err) {
          self2.emit("error", err);
        });
        self2._errors.length = 0;
      });
    };
    proto._processEntry = function(entry) {
      if (this._destroyed) return;
      this.push(entry);
    };
    proto._read = function() {
    };
    proto.destroy = function() {
      this.push(null);
      this.readable = false;
      this._destroyed = true;
      this.emit("close");
    };
    proto._done = function() {
      this.push(null);
    };
    proto._handleError = function(err) {
      var self2 = this;
      setImmediate(function() {
        if (self2._paused) return self2._warnings.push(err);
        if (!self2._destroyed) self2.emit("warn", err);
      });
    };
    proto._handleFatalError = function(err) {
      var self2 = this;
      setImmediate(function() {
        if (self2._paused) return self2._errors.push(err);
        if (!self2._destroyed) self2.emit("error", err);
      });
    };
    function createStreamAPI() {
      var stream2 = new ReaddirpReadable();
      return {
        stream: stream2,
        processEntry: stream2._processEntry.bind(stream2),
        done: stream2._done.bind(stream2),
        handleError: stream2._handleError.bind(stream2),
        handleFatalError: stream2._handleFatalError.bind(stream2)
      };
    }
    module2.exports = createStreamAPI;
  }
});

// ../../node_modules/.pnpm/readdirp@2.2.1/node_modules/readdirp/readdirp.js
var require_readdirp = __commonJS({
  "../../node_modules/.pnpm/readdirp@2.2.1/node_modules/readdirp/readdirp.js"(exports2, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path = require("path");
    var micromatch = require_micromatch2().isMatch;
    var toString = Object.prototype.toString;
    function isFunction(obj) {
      return toString.call(obj) === "[object Function]";
    }
    function isString(obj) {
      return toString.call(obj) === "[object String]";
    }
    function isUndefined(obj) {
      return obj === void 0;
    }
    function readdir(opts, callback1, callback2) {
      var stream, handleError, handleFatalError, errors = [], readdirResult = {
        directories: [],
        files: []
      }, fileProcessed, allProcessed, realRoot, aborted = false, paused = false;
      if (isUndefined(callback1)) {
        var api = require_stream_api()();
        stream = api.stream;
        callback1 = api.processEntry;
        callback2 = api.done;
        handleError = api.handleError;
        handleFatalError = api.handleFatalError;
        stream.on("close", function() {
          aborted = true;
        });
        stream.on("pause", function() {
          paused = true;
        });
        stream.on("resume", function() {
          paused = false;
        });
      } else {
        handleError = function(err) {
          errors.push(err);
        };
        handleFatalError = function(err) {
          handleError(err);
          allProcessed(errors, null);
        };
      }
      if (isUndefined(opts)) {
        handleFatalError(
          new Error(
            "Need to pass at least one argument: opts! \nhttps://github.com/paulmillr/readdirp#options"
          )
        );
        return stream;
      }
      opts.root = opts.root || ".";
      opts.fileFilter = opts.fileFilter || function() {
        return true;
      };
      opts.directoryFilter = opts.directoryFilter || function() {
        return true;
      };
      opts.depth = typeof opts.depth === "undefined" ? 999999999 : opts.depth;
      opts.entryType = opts.entryType || "files";
      var statfn = opts.lstat === true ? fs.lstat.bind(fs) : fs.stat.bind(fs);
      if (isUndefined(callback2)) {
        fileProcessed = function() {
        };
        allProcessed = callback1;
      } else {
        fileProcessed = callback1;
        allProcessed = callback2;
      }
      function normalizeFilter(filter) {
        if (isUndefined(filter)) return void 0;
        function isNegated(filters) {
          function negated(f) {
            return f.indexOf("!") === 0;
          }
          var some = filters.some(negated);
          if (!some) {
            return false;
          } else {
            if (filters.every(negated)) {
              return true;
            } else {
              throw new Error(
                "Cannot mix negated with non negated glob filters: " + filters + "\nhttps://github.com/paulmillr/readdirp#filters"
              );
            }
          }
        }
        if (isFunction(filter)) {
          return filter;
        } else if (isString(filter)) {
          return function(entryInfo) {
            return micromatch(entryInfo.name, filter.trim());
          };
        } else if (filter && Array.isArray(filter)) {
          if (filter) filter = filter.map(function(f) {
            return f.trim();
          });
          return isNegated(filter) ? (
            // use AND to concat multiple negated filters
            function(entryInfo) {
              return filter.every(function(f) {
                return micromatch(entryInfo.name, f);
              });
            }
          ) : (
            // use OR to concat multiple inclusive filters
            function(entryInfo) {
              return filter.some(function(f) {
                return micromatch(entryInfo.name, f);
              });
            }
          );
        }
      }
      function processDir(currentDir, entries, callProcessed) {
        if (aborted) return;
        var total = entries.length, processed = 0, entryInfos = [];
        fs.realpath(currentDir, function(err, realCurrentDir) {
          if (aborted) return;
          if (err) {
            handleError(err);
            callProcessed(entryInfos);
            return;
          }
          var relDir = path.relative(realRoot, realCurrentDir);
          if (entries.length === 0) {
            callProcessed([]);
          } else {
            entries.forEach(function(entry) {
              var fullPath = path.join(realCurrentDir, entry), relPath = path.join(relDir, entry);
              statfn(fullPath, function(err2, stat) {
                if (err2) {
                  handleError(err2);
                } else {
                  entryInfos.push({
                    name: entry,
                    path: relPath,
                    fullPath,
                    parentDir: relDir,
                    fullParentDir: realCurrentDir,
                    stat
                  });
                }
                processed++;
                if (processed === total) callProcessed(entryInfos);
              });
            });
          }
        });
      }
      function readdirRec(currentDir, depth, callCurrentDirProcessed) {
        var args = arguments;
        if (aborted) return;
        if (paused) {
          setImmediate(function() {
            readdirRec.apply(null, args);
          });
          return;
        }
        fs.readdir(currentDir, function(err, entries) {
          if (err) {
            handleError(err);
            callCurrentDirProcessed();
            return;
          }
          processDir(currentDir, entries, function(entryInfos) {
            var subdirs = entryInfos.filter(function(ei) {
              return ei.stat.isDirectory() && opts.directoryFilter(ei);
            });
            subdirs.forEach(function(di) {
              if (opts.entryType === "directories" || opts.entryType === "both" || opts.entryType === "all") {
                fileProcessed(di);
              }
              readdirResult.directories.push(di);
            });
            entryInfos.filter(function(ei) {
              var isCorrectType = opts.entryType === "all" ? !ei.stat.isDirectory() : ei.stat.isFile() || ei.stat.isSymbolicLink();
              return isCorrectType && opts.fileFilter(ei);
            }).forEach(function(fi) {
              if (opts.entryType === "files" || opts.entryType === "both" || opts.entryType === "all") {
                fileProcessed(fi);
              }
              readdirResult.files.push(fi);
            });
            var pendingSubdirs = subdirs.length;
            if (pendingSubdirs === 0 || depth === opts.depth) {
              callCurrentDirProcessed();
            } else {
              subdirs.forEach(function(subdir) {
                readdirRec(subdir.fullPath, depth + 1, function() {
                  pendingSubdirs = pendingSubdirs - 1;
                  if (pendingSubdirs === 0) {
                    callCurrentDirProcessed();
                  }
                });
              });
            }
          });
        });
      }
      try {
        opts.fileFilter = normalizeFilter(opts.fileFilter);
        opts.directoryFilter = normalizeFilter(opts.directoryFilter);
      } catch (err) {
        handleFatalError(err);
        return stream;
      }
      fs.realpath(opts.root, function(err, res) {
        if (err) {
          handleFatalError(err);
          return stream;
        }
        realRoot = res;
        readdirRec(opts.root, 0, function() {
          if (errors.length > 0) {
            allProcessed(errors, readdirResult);
          } else {
            allProcessed(null, readdirResult);
          }
        });
      });
      return stream;
    }
    module2.exports = readdir;
  }
});

// ../../node_modules/.pnpm/binary-extensions@1.13.1/node_modules/binary-extensions/binary-extensions.json
var require_binary_extensions = __commonJS({
  "../../node_modules/.pnpm/binary-extensions@1.13.1/node_modules/binary-extensions/binary-extensions.json"(exports2, module2) {
    module2.exports = [
      "3dm",
      "3ds",
      "3g2",
      "3gp",
      "7z",
      "a",
      "aac",
      "adp",
      "ai",
      "aif",
      "aiff",
      "alz",
      "ape",
      "apk",
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
      "oga",
      "ogg",
      "ogv",
      "otf",
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
      "rtf",
      "rz",
      "s3m",
      "s7z",
      "scpt",
      "sgi",
      "shar",
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

// ../../node_modules/.pnpm/is-binary-path@1.0.1/node_modules/is-binary-path/index.js
var require_is_binary_path = __commonJS({
  "../../node_modules/.pnpm/is-binary-path@1.0.1/node_modules/is-binary-path/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var binaryExtensions = require_binary_extensions();
    var exts = /* @__PURE__ */ Object.create(null);
    binaryExtensions.forEach(function(el) {
      exts[el] = true;
    });
    module2.exports = function(filepath) {
      return path.extname(filepath).slice(1).toLowerCase() in exts;
    };
  }
});

// ../../node_modules/.pnpm/chokidar@1.7.0/node_modules/chokidar/lib/nodefs-handler.js
var require_nodefs_handler = __commonJS({
  "../../node_modules/.pnpm/chokidar@1.7.0/node_modules/chokidar/lib/nodefs-handler.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var sysPath = require("path");
    var readdirp = require_readdirp();
    var isBinaryPath = require_is_binary_path();
    var FsWatchInstances = /* @__PURE__ */ Object.create(null);
    function createFsWatchInstance(path, options, listener, errHandler, emitRaw) {
      var handleEvent = function(rawEvent, evPath) {
        listener(path);
        emitRaw(rawEvent, evPath, { watchedPath: path });
        if (evPath && path !== evPath) {
          fsWatchBroadcast(
            sysPath.resolve(path, evPath),
            "listeners",
            sysPath.join(path, evPath)
          );
        }
      };
      try {
        return fs.watch(path, options, handleEvent);
      } catch (error) {
        errHandler(error);
      }
    }
    function fsWatchBroadcast(fullPath, type, val1, val2, val3) {
      if (!FsWatchInstances[fullPath]) return;
      FsWatchInstances[fullPath][type].forEach(function(listener) {
        listener(val1, val2, val3);
      });
    }
    function setFsWatchListener(path, fullPath, options, handlers) {
      var listener = handlers.listener;
      var errHandler = handlers.errHandler;
      var rawEmitter = handlers.rawEmitter;
      var container = FsWatchInstances[fullPath];
      var watcher;
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
      if (!container) {
        watcher = createFsWatchInstance(
          path,
          options,
          fsWatchBroadcast.bind(null, fullPath, "listeners"),
          errHandler,
          // no need to use broadcast here
          fsWatchBroadcast.bind(null, fullPath, "rawEmitters")
        );
        if (!watcher) return;
        var broadcastErr = fsWatchBroadcast.bind(null, fullPath, "errHandlers");
        watcher.on("error", function(error) {
          if (process.platform === "win32" && error.code === "EPERM") {
            fs.open(path, "r", function(err, fd) {
              if (fd) fs.close(fd);
              if (!err) broadcastErr(error);
            });
          } else {
            broadcastErr(error);
          }
        });
        container = FsWatchInstances[fullPath] = {
          listeners: [listener],
          errHandlers: [errHandler],
          rawEmitters: [rawEmitter],
          watcher
        };
      } else {
        container.listeners.push(listener);
        container.errHandlers.push(errHandler);
        container.rawEmitters.push(rawEmitter);
      }
      var listenerIndex = container.listeners.length - 1;
      return function close() {
        delete container.listeners[listenerIndex];
        delete container.errHandlers[listenerIndex];
        delete container.rawEmitters[listenerIndex];
        if (!Object.keys(container.listeners).length) {
          container.watcher.close();
          delete FsWatchInstances[fullPath];
        }
      };
    }
    var FsWatchFileInstances = /* @__PURE__ */ Object.create(null);
    function setFsWatchFileListener(path, fullPath, options, handlers) {
      var listener = handlers.listener;
      var rawEmitter = handlers.rawEmitter;
      var container = FsWatchFileInstances[fullPath];
      var listeners = [];
      var rawEmitters = [];
      if (container && (container.options.persistent < options.persistent || container.options.interval > options.interval)) {
        listeners = container.listeners;
        rawEmitters = container.rawEmitters;
        fs.unwatchFile(fullPath);
        container = false;
      }
      if (!container) {
        listeners.push(listener);
        rawEmitters.push(rawEmitter);
        container = FsWatchFileInstances[fullPath] = {
          listeners,
          rawEmitters,
          options,
          watcher: fs.watchFile(fullPath, options, function(curr, prev) {
            container.rawEmitters.forEach(function(rawEmitter2) {
              rawEmitter2("change", fullPath, { curr, prev });
            });
            var currmtime = curr.mtime.getTime();
            if (curr.size !== prev.size || currmtime > prev.mtime.getTime() || currmtime === 0) {
              container.listeners.forEach(function(listener2) {
                listener2(path, curr);
              });
            }
          })
        };
      } else {
        container.listeners.push(listener);
        container.rawEmitters.push(rawEmitter);
      }
      var listenerIndex = container.listeners.length - 1;
      return function close() {
        delete container.listeners[listenerIndex];
        delete container.rawEmitters[listenerIndex];
        if (!Object.keys(container.listeners).length) {
          fs.unwatchFile(fullPath);
          delete FsWatchFileInstances[fullPath];
        }
      };
    }
    function NodeFsHandler() {
    }
    NodeFsHandler.prototype._watchWithNodeFs = function(path, listener) {
      var directory = sysPath.dirname(path);
      var basename = sysPath.basename(path);
      var parent = this._getWatchedDir(directory);
      parent.add(basename);
      var absolutePath = sysPath.resolve(path);
      var options = { persistent: this.options.persistent };
      if (!listener) listener = Function.prototype;
      var closer;
      if (this.options.usePolling) {
        options.interval = this.enableBinaryInterval && isBinaryPath(basename) ? this.options.binaryInterval : this.options.interval;
        closer = setFsWatchFileListener(path, absolutePath, options, {
          listener,
          rawEmitter: this.emit.bind(this, "raw")
        });
      } else {
        closer = setFsWatchListener(path, absolutePath, options, {
          listener,
          errHandler: this._handleError.bind(this),
          rawEmitter: this.emit.bind(this, "raw")
        });
      }
      return closer;
    };
    NodeFsHandler.prototype._handleFile = function(file, stats, initialAdd, callback) {
      var dirname = sysPath.dirname(file);
      var basename = sysPath.basename(file);
      var parent = this._getWatchedDir(dirname);
      if (parent.has(basename)) return callback();
      var closer = this._watchWithNodeFs(file, function(path, newStats) {
        if (!this._throttle("watch", file, 5)) return;
        if (!newStats || newStats && newStats.mtime.getTime() === 0) {
          fs.stat(file, function(error, newStats2) {
            if (error) {
              this._remove(dirname, basename);
            } else {
              this._emit("change", file, newStats2);
            }
          }.bind(this));
        } else if (parent.has(basename)) {
          this._emit("change", file, newStats);
        }
      }.bind(this));
      if (!(initialAdd && this.options.ignoreInitial)) {
        if (!this._throttle("add", file, 0)) return;
        this._emit("add", file, stats);
      }
      if (callback) callback();
      return closer;
    };
    NodeFsHandler.prototype._handleSymlink = function(entry, directory, path, item) {
      var full = entry.fullPath;
      var dir = this._getWatchedDir(directory);
      if (!this.options.followSymlinks) {
        this._readyCount++;
        fs.realpath(path, function(error, linkPath) {
          if (dir.has(item)) {
            if (this._symlinkPaths[full] !== linkPath) {
              this._symlinkPaths[full] = linkPath;
              this._emit("change", path, entry.stat);
            }
          } else {
            dir.add(item);
            this._symlinkPaths[full] = linkPath;
            this._emit("add", path, entry.stat);
          }
          this._emitReady();
        }.bind(this));
        return true;
      }
      if (this._symlinkPaths[full]) return true;
      else this._symlinkPaths[full] = true;
    };
    NodeFsHandler.prototype._handleDir = function(dir, stats, initialAdd, depth, target, wh, callback) {
      var parentDir = this._getWatchedDir(sysPath.dirname(dir));
      var tracked = parentDir.has(sysPath.basename(dir));
      if (!(initialAdd && this.options.ignoreInitial) && !target && !tracked) {
        if (!wh.hasGlob || wh.globFilter(dir)) this._emit("addDir", dir, stats);
      }
      parentDir.add(sysPath.basename(dir));
      this._getWatchedDir(dir);
      var read = function(directory, initialAdd2, done) {
        directory = sysPath.join(directory, "");
        if (!wh.hasGlob) {
          var throttler = this._throttle("readdir", directory, 1e3);
          if (!throttler) return;
        }
        var previous = this._getWatchedDir(wh.path);
        var current = [];
        readdirp({
          root: directory,
          entryType: "all",
          fileFilter: wh.filterPath,
          directoryFilter: wh.filterDir,
          depth: 0,
          lstat: true
        }).on("data", function(entry) {
          var item = entry.path;
          var path = sysPath.join(directory, item);
          current.push(item);
          if (entry.stat.isSymbolicLink() && this._handleSymlink(entry, directory, path, item)) return;
          if (item === target || !target && !previous.has(item)) {
            this._readyCount++;
            path = sysPath.join(dir, sysPath.relative(dir, path));
            this._addToNodeFs(path, initialAdd2, wh, depth + 1);
          }
        }.bind(this)).on("end", function() {
          if (throttler) throttler.clear();
          if (done) done();
          previous.children().filter(function(item) {
            return item !== directory && current.indexOf(item) === -1 && // in case of intersecting globs;
            // a path may have been filtered out of this readdir, but
            // shouldn't be removed because it matches a different glob
            (!wh.hasGlob || wh.filterPath({
              fullPath: sysPath.resolve(directory, item)
            }));
          }).forEach(function(item) {
            this._remove(directory, item);
          }, this);
        }.bind(this)).on("error", this._handleError.bind(this));
      }.bind(this);
      var closer;
      if (this.options.depth == null || depth <= this.options.depth) {
        if (!target) read(dir, initialAdd, callback);
        closer = this._watchWithNodeFs(dir, function(dirPath, stats2) {
          if (stats2 && stats2.mtime.getTime() === 0) return;
          read(dirPath, false);
        });
      } else {
        callback();
      }
      return closer;
    };
    NodeFsHandler.prototype._addToNodeFs = function(path, initialAdd, priorWh, depth, target, callback) {
      if (!callback) callback = Function.prototype;
      var ready = this._emitReady;
      if (this._isIgnored(path) || this.closed) {
        ready();
        return callback(null, false);
      }
      var wh = this._getWatchHelpers(path, depth);
      if (!wh.hasGlob && priorWh) {
        wh.hasGlob = priorWh.hasGlob;
        wh.globFilter = priorWh.globFilter;
        wh.filterPath = priorWh.filterPath;
        wh.filterDir = priorWh.filterDir;
      }
      fs[wh.statMethod](wh.watchPath, function(error, stats) {
        if (this._handleError(error)) return callback(null, path);
        if (this._isIgnored(wh.watchPath, stats)) {
          ready();
          return callback(null, false);
        }
        var initDir = function(dir, target2) {
          return this._handleDir(dir, stats, initialAdd, depth, target2, wh, ready);
        }.bind(this);
        var closer;
        if (stats.isDirectory()) {
          closer = initDir(wh.watchPath, target);
        } else if (stats.isSymbolicLink()) {
          var parent = sysPath.dirname(wh.watchPath);
          this._getWatchedDir(parent).add(wh.watchPath);
          this._emit("add", wh.watchPath, stats);
          closer = initDir(parent, path);
          fs.realpath(path, function(error2, targetPath) {
            this._symlinkPaths[sysPath.resolve(path)] = targetPath;
            ready();
          }.bind(this));
        } else {
          closer = this._handleFile(wh.watchPath, stats, initialAdd, ready);
        }
        if (closer) this._closers[path] = closer;
        callback(null, false);
      }.bind(this));
    };
    module2.exports = NodeFsHandler;
  }
});

// ../../node_modules/.pnpm/chokidar@1.7.0/node_modules/chokidar/lib/fsevents-handler.js
var require_fsevents_handler = __commonJS({
  "../../node_modules/.pnpm/chokidar@1.7.0/node_modules/chokidar/lib/fsevents-handler.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var sysPath = require("path");
    var readdirp = require_readdirp();
    var fsevents;
    try {
      fsevents = require("fsevents");
    } catch (error) {
    }
    var FSEventsWatchers = /* @__PURE__ */ Object.create(null);
    var consolidateThreshhold = 10;
    function createFSEventsInstance(path, callback) {
      return new fsevents(path).on("fsevent", callback).start();
    }
    function setFSEventsListener(path, realPath, listener, rawEmitter) {
      var watchPath = sysPath.extname(path) ? sysPath.dirname(path) : path;
      var watchContainer;
      var parentPath = sysPath.dirname(watchPath);
      if (couldConsolidate(parentPath)) {
        watchPath = parentPath;
      }
      var resolvedPath = sysPath.resolve(path);
      var hasSymlink = resolvedPath !== realPath;
      function filteredListener(fullPath, flags, info) {
        if (hasSymlink) fullPath = fullPath.replace(realPath, resolvedPath);
        if (fullPath === resolvedPath || !fullPath.indexOf(resolvedPath + sysPath.sep)) listener(fullPath, flags, info);
      }
      function watchedParent() {
        return Object.keys(FSEventsWatchers).some(function(watchedPath) {
          if (!realPath.indexOf(sysPath.resolve(watchedPath) + sysPath.sep)) {
            watchPath = watchedPath;
            return true;
          }
        });
      }
      if (watchPath in FSEventsWatchers || watchedParent()) {
        watchContainer = FSEventsWatchers[watchPath];
        watchContainer.listeners.push(filteredListener);
      } else {
        watchContainer = FSEventsWatchers[watchPath] = {
          listeners: [filteredListener],
          rawEmitters: [rawEmitter],
          watcher: createFSEventsInstance(watchPath, function(fullPath, flags) {
            var info = fsevents.getInfo(fullPath, flags);
            watchContainer.listeners.forEach(function(listener2) {
              listener2(fullPath, flags, info);
            });
            watchContainer.rawEmitters.forEach(function(emitter) {
              emitter(info.event, fullPath, info);
            });
          })
        };
      }
      var listenerIndex = watchContainer.listeners.length - 1;
      return function close() {
        delete watchContainer.listeners[listenerIndex];
        delete watchContainer.rawEmitters[listenerIndex];
        if (!Object.keys(watchContainer.listeners).length) {
          watchContainer.watcher.stop();
          delete FSEventsWatchers[watchPath];
        }
      };
    }
    function couldConsolidate(path) {
      var keys = Object.keys(FSEventsWatchers);
      var count = 0;
      for (var i = 0, len = keys.length; i < len; ++i) {
        var watchPath = keys[i];
        if (watchPath.indexOf(path) === 0) {
          count++;
          if (count >= consolidateThreshhold) {
            return true;
          }
        }
      }
      return false;
    }
    function canUse() {
      return fsevents && Object.keys(FSEventsWatchers).length < 128;
    }
    function depth(path, root) {
      var i = 0;
      while (!path.indexOf(root) && (path = sysPath.dirname(path)) !== root) i++;
      return i;
    }
    function FsEventsHandler() {
    }
    FsEventsHandler.prototype._watchWithFsEvents = function(watchPath, realPath, transform, globFilter) {
      if (this._isIgnored(watchPath)) return;
      var watchCallback = function(fullPath, flags, info) {
        if (this.options.depth !== void 0 && depth(fullPath, realPath) > this.options.depth) return;
        var path = transform(sysPath.join(
          watchPath,
          sysPath.relative(watchPath, fullPath)
        ));
        if (globFilter && !globFilter(path)) return;
        var parent = sysPath.dirname(path);
        var item = sysPath.basename(path);
        var watchedDir = this._getWatchedDir(
          info.type === "directory" ? path : parent
        );
        var checkIgnored = function(stats) {
          if (this._isIgnored(path, stats)) {
            this._ignoredPaths[path] = true;
            if (stats && stats.isDirectory()) {
              this._ignoredPaths[path + "/**/*"] = true;
            }
            return true;
          } else {
            delete this._ignoredPaths[path];
            delete this._ignoredPaths[path + "/**/*"];
          }
        }.bind(this);
        var handleEvent = function(event) {
          if (checkIgnored()) return;
          if (event === "unlink") {
            if (info.type === "directory" || watchedDir.has(item)) {
              this._remove(parent, item);
            }
          } else {
            if (event === "add") {
              if (info.type === "directory") this._getWatchedDir(path);
              if (info.type === "symlink" && this.options.followSymlinks) {
                var curDepth = this.options.depth === void 0 ? void 0 : depth(fullPath, realPath) + 1;
                return this._addToFsEvents(path, false, true, curDepth);
              } else {
                this._getWatchedDir(parent).add(item);
              }
            }
            var eventName = info.type === "directory" ? event + "Dir" : event;
            this._emit(eventName, path);
            if (eventName === "addDir") this._addToFsEvents(path, false, true);
          }
        }.bind(this);
        function addOrChange() {
          handleEvent(watchedDir.has(item) ? "change" : "add");
        }
        function checkFd() {
          fs.open(path, "r", function(error, fd) {
            if (fd) fs.close(fd);
            error && error.code !== "EACCES" ? handleEvent("unlink") : addOrChange();
          });
        }
        var wrongEventFlags = [
          69888,
          70400,
          71424,
          72704,
          73472,
          131328,
          131840,
          262912
        ];
        if (wrongEventFlags.indexOf(flags) !== -1 || info.event === "unknown") {
          if (typeof this.options.ignored === "function") {
            fs.stat(path, function(error, stats) {
              if (checkIgnored(stats)) return;
              stats ? addOrChange() : handleEvent("unlink");
            });
          } else {
            checkFd();
          }
        } else {
          switch (info.event) {
            case "created":
            case "modified":
              return addOrChange();
            case "deleted":
            case "moved":
              return checkFd();
          }
        }
      }.bind(this);
      var closer = setFSEventsListener(
        watchPath,
        realPath,
        watchCallback,
        this.emit.bind(this, "raw")
      );
      this._emitReady();
      return closer;
    };
    FsEventsHandler.prototype._handleFsEventsSymlink = function(linkPath, fullPath, transform, curDepth) {
      if (this._symlinkPaths[fullPath]) return;
      else this._symlinkPaths[fullPath] = true;
      this._readyCount++;
      fs.realpath(linkPath, function(error, linkTarget) {
        if (this._handleError(error) || this._isIgnored(linkTarget)) {
          return this._emitReady();
        }
        this._readyCount++;
        this._addToFsEvents(linkTarget || linkPath, function(path) {
          var dotSlash = "." + sysPath.sep;
          var aliasedPath = linkPath;
          if (linkTarget && linkTarget !== dotSlash) {
            aliasedPath = path.replace(linkTarget, linkPath);
          } else if (path !== dotSlash) {
            aliasedPath = sysPath.join(linkPath, path);
          }
          return transform(aliasedPath);
        }, false, curDepth);
      }.bind(this));
    };
    FsEventsHandler.prototype._addToFsEvents = function(path, transform, forceAdd, priorDepth) {
      var processPath = typeof transform === "function" ? transform : function(val) {
        return val;
      };
      var emitAdd = function(newPath, stats) {
        var pp = processPath(newPath);
        var isDir = stats.isDirectory();
        var dirObj = this._getWatchedDir(sysPath.dirname(pp));
        var base = sysPath.basename(pp);
        if (isDir) this._getWatchedDir(pp);
        if (dirObj.has(base)) return;
        dirObj.add(base);
        if (!this.options.ignoreInitial || forceAdd === true) {
          this._emit(isDir ? "addDir" : "add", pp, stats);
        }
      }.bind(this);
      var wh = this._getWatchHelpers(path);
      fs[wh.statMethod](wh.watchPath, function(error, stats) {
        if (this._handleError(error) || this._isIgnored(wh.watchPath, stats)) {
          this._emitReady();
          return this._emitReady();
        }
        if (stats.isDirectory()) {
          if (!wh.globFilter) emitAdd(processPath(path), stats);
          if (priorDepth && priorDepth > this.options.depth) return;
          readdirp({
            root: wh.watchPath,
            entryType: "all",
            fileFilter: wh.filterPath,
            directoryFilter: wh.filterDir,
            lstat: true,
            depth: this.options.depth - (priorDepth || 0)
          }).on("data", function(entry) {
            if (entry.stat.isDirectory() && !wh.filterPath(entry)) return;
            var joinedPath = sysPath.join(wh.watchPath, entry.path);
            var fullPath = entry.fullPath;
            if (wh.followSymlinks && entry.stat.isSymbolicLink()) {
              var curDepth = this.options.depth === void 0 ? void 0 : depth(joinedPath, sysPath.resolve(wh.watchPath)) + 1;
              this._handleFsEventsSymlink(joinedPath, fullPath, processPath, curDepth);
            } else {
              emitAdd(joinedPath, entry.stat);
            }
          }.bind(this)).on("error", function() {
          }).on("end", this._emitReady);
        } else {
          emitAdd(wh.watchPath, stats);
          this._emitReady();
        }
      }.bind(this));
      if (this.options.persistent && forceAdd !== true) {
        var initWatch = function(error, realPath) {
          if (this.closed) return;
          var closer = this._watchWithFsEvents(
            wh.watchPath,
            sysPath.resolve(realPath || wh.watchPath),
            processPath,
            wh.globFilter
          );
          if (closer) this._closers[path] = closer;
        }.bind(this);
        if (typeof transform === "function") {
          initWatch();
        } else {
          fs.realpath(wh.watchPath, initWatch);
        }
      }
    };
    module2.exports = FsEventsHandler;
    module2.exports.canUse = canUse;
  }
});

// ../../node_modules/.pnpm/chokidar@1.7.0/node_modules/chokidar/index.js
var require_chokidar = __commonJS({
  "../../node_modules/.pnpm/chokidar@1.7.0/node_modules/chokidar/index.js"(exports2) {
    "use strict";
    var EventEmitter = require("events").EventEmitter;
    var fs = require("fs");
    var sysPath = require("path");
    var asyncEach = require_async_each();
    var anymatch = require_anymatch();
    var globParent = require_glob_parent();
    var isGlob = require_is_glob();
    var isAbsolute = require_path_is_absolute();
    var inherits = require_inherits();
    var NodeFsHandler = require_nodefs_handler();
    var FsEventsHandler = require_fsevents_handler();
    var arrify = function(value) {
      if (value == null) return [];
      return Array.isArray(value) ? value : [value];
    };
    var flatten = function(list, result) {
      if (result == null) result = [];
      list.forEach(function(item) {
        if (Array.isArray(item)) {
          flatten(item, result);
        } else {
          result.push(item);
        }
      });
      return result;
    };
    var isString = function(thing) {
      return typeof thing === "string";
    };
    function FSWatcher(_opts) {
      EventEmitter.call(this);
      var opts = {};
      if (_opts) for (var opt in _opts) opts[opt] = _opts[opt];
      this._watched = /* @__PURE__ */ Object.create(null);
      this._closers = /* @__PURE__ */ Object.create(null);
      this._ignoredPaths = /* @__PURE__ */ Object.create(null);
      Object.defineProperty(this, "_globIgnored", {
        get: function() {
          return Object.keys(this._ignoredPaths);
        }
      });
      this.closed = false;
      this._throttled = /* @__PURE__ */ Object.create(null);
      this._symlinkPaths = /* @__PURE__ */ Object.create(null);
      function undef(key) {
        return opts[key] === void 0;
      }
      if (undef("persistent")) opts.persistent = true;
      if (undef("ignoreInitial")) opts.ignoreInitial = false;
      if (undef("ignorePermissionErrors")) opts.ignorePermissionErrors = false;
      if (undef("interval")) opts.interval = 100;
      if (undef("binaryInterval")) opts.binaryInterval = 300;
      if (undef("disableGlobbing")) opts.disableGlobbing = false;
      this.enableBinaryInterval = opts.binaryInterval !== opts.interval;
      if (undef("useFsEvents")) opts.useFsEvents = !opts.usePolling;
      if (!FsEventsHandler.canUse()) opts.useFsEvents = false;
      if (undef("usePolling") && !opts.useFsEvents) {
        opts.usePolling = process.platform === "darwin";
      }
      var envPoll = process.env.CHOKIDAR_USEPOLLING;
      if (envPoll !== void 0) {
        var envLower = envPoll.toLowerCase();
        if (envLower === "false" || envLower === "0") {
          opts.usePolling = false;
        } else if (envLower === "true" || envLower === "1") {
          opts.usePolling = true;
        } else {
          opts.usePolling = !!envLower;
        }
      }
      var envInterval = process.env.CHOKIDAR_INTERVAL;
      if (envInterval) {
        opts.interval = parseInt(envInterval);
      }
      if (undef("atomic")) opts.atomic = !opts.usePolling && !opts.useFsEvents;
      if (opts.atomic) this._pendingUnlinks = /* @__PURE__ */ Object.create(null);
      if (undef("followSymlinks")) opts.followSymlinks = true;
      if (undef("awaitWriteFinish")) opts.awaitWriteFinish = false;
      if (opts.awaitWriteFinish === true) opts.awaitWriteFinish = {};
      var awf = opts.awaitWriteFinish;
      if (awf) {
        if (!awf.stabilityThreshold) awf.stabilityThreshold = 2e3;
        if (!awf.pollInterval) awf.pollInterval = 100;
        this._pendingWrites = /* @__PURE__ */ Object.create(null);
      }
      if (opts.ignored) opts.ignored = arrify(opts.ignored);
      this._isntIgnored = function(path, stat) {
        return !this._isIgnored(path, stat);
      }.bind(this);
      var readyCalls = 0;
      this._emitReady = function() {
        if (++readyCalls >= this._readyCount) {
          this._emitReady = Function.prototype;
          this._readyEmitted = true;
          process.nextTick(this.emit.bind(this, "ready"));
        }
      }.bind(this);
      this.options = opts;
      Object.freeze(opts);
    }
    inherits(FSWatcher, EventEmitter);
    FSWatcher.prototype._emit = function(event, path, val1, val2, val3) {
      if (this.options.cwd) path = sysPath.relative(this.options.cwd, path);
      var args = [event, path];
      if (val3 !== void 0) args.push(val1, val2, val3);
      else if (val2 !== void 0) args.push(val1, val2);
      else if (val1 !== void 0) args.push(val1);
      var awf = this.options.awaitWriteFinish;
      if (awf && this._pendingWrites[path]) {
        this._pendingWrites[path].lastChange = /* @__PURE__ */ new Date();
        return this;
      }
      if (this.options.atomic) {
        if (event === "unlink") {
          this._pendingUnlinks[path] = args;
          setTimeout(function() {
            Object.keys(this._pendingUnlinks).forEach(function(path2) {
              this.emit.apply(this, this._pendingUnlinks[path2]);
              this.emit.apply(this, ["all"].concat(this._pendingUnlinks[path2]));
              delete this._pendingUnlinks[path2];
            }.bind(this));
          }.bind(this), typeof this.options.atomic === "number" ? this.options.atomic : 100);
          return this;
        } else if (event === "add" && this._pendingUnlinks[path]) {
          event = args[0] = "change";
          delete this._pendingUnlinks[path];
        }
      }
      var emitEvent = function() {
        this.emit.apply(this, args);
        if (event !== "error") this.emit.apply(this, ["all"].concat(args));
      }.bind(this);
      if (awf && (event === "add" || event === "change") && this._readyEmitted) {
        var awfEmit = function(err, stats) {
          if (err) {
            event = args[0] = "error";
            args[1] = err;
            emitEvent();
          } else if (stats) {
            if (args.length > 2) {
              args[2] = stats;
            } else {
              args.push(stats);
            }
            emitEvent();
          }
        };
        this._awaitWriteFinish(path, awf.stabilityThreshold, event, awfEmit);
        return this;
      }
      if (event === "change") {
        if (!this._throttle("change", path, 50)) return this;
      }
      if (this.options.alwaysStat && val1 === void 0 && (event === "add" || event === "addDir" || event === "change")) {
        var fullPath = this.options.cwd ? sysPath.join(this.options.cwd, path) : path;
        fs.stat(fullPath, function(error, stats) {
          if (error || !stats) return;
          args.push(stats);
          emitEvent();
        });
      } else {
        emitEvent();
      }
      return this;
    };
    FSWatcher.prototype._handleError = function(error) {
      var code = error && error.code;
      var ipe = this.options.ignorePermissionErrors;
      if (error && code !== "ENOENT" && code !== "ENOTDIR" && (!ipe || code !== "EPERM" && code !== "EACCES")) this.emit("error", error);
      return error || this.closed;
    };
    FSWatcher.prototype._throttle = function(action, path, timeout) {
      if (!(action in this._throttled)) {
        this._throttled[action] = /* @__PURE__ */ Object.create(null);
      }
      var throttled = this._throttled[action];
      if (path in throttled) return false;
      function clear() {
        delete throttled[path];
        clearTimeout(timeoutObject);
      }
      var timeoutObject = setTimeout(clear, timeout);
      throttled[path] = { timeoutObject, clear };
      return throttled[path];
    };
    FSWatcher.prototype._awaitWriteFinish = function(path, threshold, event, awfEmit) {
      var timeoutHandler;
      var fullPath = path;
      if (this.options.cwd && !isAbsolute(path)) {
        fullPath = sysPath.join(this.options.cwd, path);
      }
      var now = /* @__PURE__ */ new Date();
      var awaitWriteFinish = function(prevStat) {
        fs.stat(fullPath, function(err, curStat) {
          if (err) {
            if (err.code !== "ENOENT") awfEmit(err);
            return;
          }
          var now2 = /* @__PURE__ */ new Date();
          if (prevStat && curStat.size != prevStat.size) {
            this._pendingWrites[path].lastChange = now2;
          }
          if (now2 - this._pendingWrites[path].lastChange >= threshold) {
            delete this._pendingWrites[path];
            awfEmit(null, curStat);
          } else {
            timeoutHandler = setTimeout(
              awaitWriteFinish.bind(this, curStat),
              this.options.awaitWriteFinish.pollInterval
            );
          }
        }.bind(this));
      }.bind(this);
      if (!(path in this._pendingWrites)) {
        this._pendingWrites[path] = {
          lastChange: now,
          cancelWait: function() {
            delete this._pendingWrites[path];
            clearTimeout(timeoutHandler);
            return event;
          }.bind(this)
        };
        timeoutHandler = setTimeout(
          awaitWriteFinish.bind(this),
          this.options.awaitWriteFinish.pollInterval
        );
      }
    };
    var dotRe = /\..*\.(sw[px])$|\~$|\.subl.*\.tmp/;
    FSWatcher.prototype._isIgnored = function(path, stats) {
      if (this.options.atomic && dotRe.test(path)) return true;
      if (!this._userIgnored) {
        var cwd = this.options.cwd;
        var ignored = this.options.ignored;
        if (cwd && ignored) {
          ignored = ignored.map(function(path2) {
            if (typeof path2 !== "string") return path2;
            return isAbsolute(path2) ? path2 : sysPath.join(cwd, path2);
          });
        }
        var paths = arrify(ignored).filter(function(path2) {
          return typeof path2 === "string" && !isGlob(path2);
        }).map(function(path2) {
          return path2 + "/**";
        });
        this._userIgnored = anymatch(
          this._globIgnored.concat(ignored).concat(paths)
        );
      }
      return this._userIgnored([path, stats]);
    };
    var replacerRe = /^\.[\/\\]/;
    FSWatcher.prototype._getWatchHelpers = function(path, depth) {
      path = path.replace(replacerRe, "");
      var watchPath = depth || this.options.disableGlobbing || !isGlob(path) ? path : globParent(path);
      var fullWatchPath = sysPath.resolve(watchPath);
      var hasGlob = watchPath !== path;
      var globFilter = hasGlob ? anymatch(path) : false;
      var follow = this.options.followSymlinks;
      var globSymlink = hasGlob && follow ? null : false;
      var checkGlobSymlink = function(entry) {
        if (globSymlink == null) {
          globSymlink = entry.fullParentDir === fullWatchPath ? false : {
            realPath: entry.fullParentDir,
            linkPath: fullWatchPath
          };
        }
        if (globSymlink) {
          return entry.fullPath.replace(globSymlink.realPath, globSymlink.linkPath);
        }
        return entry.fullPath;
      };
      var entryPath = function(entry) {
        return sysPath.join(
          watchPath,
          sysPath.relative(watchPath, checkGlobSymlink(entry))
        );
      };
      var filterPath = function(entry) {
        if (entry.stat && entry.stat.isSymbolicLink()) return filterDir(entry);
        var resolvedPath = entryPath(entry);
        return (!hasGlob || globFilter(resolvedPath)) && this._isntIgnored(resolvedPath, entry.stat) && (this.options.ignorePermissionErrors || this._hasReadPermissions(entry.stat));
      }.bind(this);
      var getDirParts = function(path2) {
        if (!hasGlob) return false;
        var parts = sysPath.relative(watchPath, path2).split(/[\/\\]/);
        return parts;
      };
      var dirParts = getDirParts(path);
      if (dirParts && dirParts.length > 1) dirParts.pop();
      var unmatchedGlob;
      var filterDir = function(entry) {
        if (hasGlob) {
          var entryParts = getDirParts(checkGlobSymlink(entry));
          var globstar = false;
          unmatchedGlob = !dirParts.every(function(part, i) {
            if (part === "**") globstar = true;
            return globstar || !entryParts[i] || anymatch(part, entryParts[i]);
          });
        }
        return !unmatchedGlob && this._isntIgnored(entryPath(entry), entry.stat);
      }.bind(this);
      return {
        followSymlinks: follow,
        statMethod: follow ? "stat" : "lstat",
        path,
        watchPath,
        entryPath,
        hasGlob,
        globFilter,
        filterPath,
        filterDir
      };
    };
    FSWatcher.prototype._getWatchedDir = function(directory) {
      var dir = sysPath.resolve(directory);
      var watcherRemove = this._remove.bind(this);
      if (!(dir in this._watched)) this._watched[dir] = {
        _items: /* @__PURE__ */ Object.create(null),
        add: function(item) {
          if (item !== "." && item !== "..") this._items[item] = true;
        },
        remove: function(item) {
          delete this._items[item];
          if (!this.children().length) {
            fs.readdir(dir, function(err) {
              if (err) watcherRemove(sysPath.dirname(dir), sysPath.basename(dir));
            });
          }
        },
        has: function(item) {
          return item in this._items;
        },
        children: function() {
          return Object.keys(this._items);
        }
      };
      return this._watched[dir];
    };
    FSWatcher.prototype._hasReadPermissions = function(stats) {
      return Boolean(4 & parseInt(((stats && stats.mode) & 511).toString(8)[0], 10));
    };
    FSWatcher.prototype._remove = function(directory, item) {
      var path = sysPath.join(directory, item);
      var fullPath = sysPath.resolve(path);
      var isDirectory = this._watched[path] || this._watched[fullPath];
      if (!this._throttle("remove", path, 100)) return;
      var watchedDirs = Object.keys(this._watched);
      if (!isDirectory && !this.options.useFsEvents && watchedDirs.length === 1) {
        this.add(directory, item, true);
      }
      var nestedDirectoryChildren = this._getWatchedDir(path).children();
      nestedDirectoryChildren.forEach(function(nestedItem) {
        this._remove(path, nestedItem);
      }, this);
      var parent = this._getWatchedDir(directory);
      var wasTracked = parent.has(item);
      parent.remove(item);
      var relPath = path;
      if (this.options.cwd) relPath = sysPath.relative(this.options.cwd, path);
      if (this.options.awaitWriteFinish && this._pendingWrites[relPath]) {
        var event = this._pendingWrites[relPath].cancelWait();
        if (event === "add") return;
      }
      delete this._watched[path];
      delete this._watched[fullPath];
      var eventName = isDirectory ? "unlinkDir" : "unlink";
      if (wasTracked && !this._isIgnored(path)) this._emit(eventName, path);
      if (!this.options.useFsEvents) {
        this._closePath(path);
      }
    };
    FSWatcher.prototype._closePath = function(path) {
      if (!this._closers[path]) return;
      this._closers[path]();
      delete this._closers[path];
      this._getWatchedDir(sysPath.dirname(path)).remove(sysPath.basename(path));
    };
    FSWatcher.prototype.add = function(paths, _origAdd, _internal) {
      var cwd = this.options.cwd;
      this.closed = false;
      paths = flatten(arrify(paths));
      if (!paths.every(isString)) {
        throw new TypeError("Non-string provided as watch path: " + paths);
      }
      if (cwd) paths = paths.map(function(path) {
        if (isAbsolute(path)) {
          return path;
        } else if (path[0] === "!") {
          return "!" + sysPath.join(cwd, path.substring(1));
        } else {
          return sysPath.join(cwd, path);
        }
      });
      paths = paths.filter(function(path) {
        if (path[0] === "!") {
          this._ignoredPaths[path.substring(1)] = true;
        } else {
          delete this._ignoredPaths[path];
          delete this._ignoredPaths[path + "/**"];
          this._userIgnored = null;
          return true;
        }
      }, this);
      if (this.options.useFsEvents && FsEventsHandler.canUse()) {
        if (!this._readyCount) this._readyCount = paths.length;
        if (this.options.persistent) this._readyCount *= 2;
        paths.forEach(this._addToFsEvents, this);
      } else {
        if (!this._readyCount) this._readyCount = 0;
        this._readyCount += paths.length;
        asyncEach(paths, function(path, next) {
          this._addToNodeFs(path, !_internal, 0, 0, _origAdd, function(err, res) {
            if (res) this._emitReady();
            next(err, res);
          }.bind(this));
        }.bind(this), function(error, results) {
          results.forEach(function(item) {
            if (!item || this.closed) return;
            this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
          }, this);
        }.bind(this));
      }
      return this;
    };
    FSWatcher.prototype.unwatch = function(paths) {
      if (this.closed) return this;
      paths = flatten(arrify(paths));
      paths.forEach(function(path) {
        if (!isAbsolute(path) && !this._closers[path]) {
          if (this.options.cwd) path = sysPath.join(this.options.cwd, path);
          path = sysPath.resolve(path);
        }
        this._closePath(path);
        this._ignoredPaths[path] = true;
        if (path in this._watched) {
          this._ignoredPaths[path + "/**"] = true;
        }
        this._userIgnored = null;
      }, this);
      return this;
    };
    FSWatcher.prototype.close = function() {
      if (this.closed) return this;
      this.closed = true;
      Object.keys(this._closers).forEach(function(watchPath) {
        this._closers[watchPath]();
        delete this._closers[watchPath];
      }, this);
      this._watched = /* @__PURE__ */ Object.create(null);
      this.removeAllListeners();
      return this;
    };
    FSWatcher.prototype.getWatched = function() {
      var watchList = {};
      Object.keys(this._watched).forEach(function(dir) {
        var key = this.options.cwd ? sysPath.relative(this.options.cwd, dir) : dir;
        watchList[key || "."] = Object.keys(this._watched[dir]._items).sort();
      }.bind(this));
      return watchList;
    };
    function importHandler(handler) {
      Object.keys(handler.prototype).forEach(function(method) {
        FSWatcher.prototype[method] = handler.prototype[method];
      });
    }
    importHandler(NodeFsHandler);
    if (FsEventsHandler.canUse()) importHandler(FsEventsHandler);
    exports2.FSWatcher = FSWatcher;
    exports2.watch = function(paths, options) {
      return new FSWatcher(options).add(paths);
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/node-loaders.js
var require_node_loaders = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/node-loaders.js"(exports2, module2) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var fs = require("fs");
    var path = require("path");
    var Loader = require_loader();
    var _require = require_precompiled_loader();
    var PrecompiledLoader = _require.PrecompiledLoader;
    var chokidar;
    var FileSystemLoader = /* @__PURE__ */ function(_Loader) {
      _inheritsLoose(FileSystemLoader2, _Loader);
      function FileSystemLoader2(searchPaths, opts) {
        var _this;
        _this = _Loader.call(this) || this;
        if (typeof opts === "boolean") {
          console.log("[nunjucks] Warning: you passed a boolean as the second argument to FileSystemLoader, but it now takes an options object. See http://mozilla.github.io/nunjucks/api.html#filesystemloader");
        }
        opts = opts || {};
        _this.pathsToNames = {};
        _this.noCache = !!opts.noCache;
        if (searchPaths) {
          searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
          _this.searchPaths = searchPaths.map(path.normalize);
        } else {
          _this.searchPaths = ["."];
        }
        if (opts.watch) {
          try {
            chokidar = require_chokidar();
          } catch (e) {
            throw new Error("watch requires chokidar to be installed");
          }
          var paths = _this.searchPaths.filter(fs.existsSync);
          var watcher = chokidar.watch(paths);
          watcher.on("all", function(event, fullname) {
            fullname = path.resolve(fullname);
            if (event === "change" && fullname in _this.pathsToNames) {
              _this.emit("update", _this.pathsToNames[fullname], fullname);
            }
          });
          watcher.on("error", function(error) {
            console.log("Watcher error: " + error);
          });
        }
        return _this;
      }
      var _proto = FileSystemLoader2.prototype;
      _proto.getSource = function getSource(name) {
        var fullpath = null;
        var paths = this.searchPaths;
        for (var i = 0; i < paths.length; i++) {
          var basePath = path.resolve(paths[i]);
          var p = path.resolve(paths[i], name);
          if (p.indexOf(basePath) === 0 && fs.existsSync(p)) {
            fullpath = p;
            break;
          }
        }
        if (!fullpath) {
          return null;
        }
        this.pathsToNames[fullpath] = name;
        var source = {
          src: fs.readFileSync(fullpath, "utf-8"),
          path: fullpath,
          noCache: this.noCache
        };
        this.emit("load", name, source);
        return source;
      };
      return FileSystemLoader2;
    }(Loader);
    var NodeResolveLoader = /* @__PURE__ */ function(_Loader2) {
      _inheritsLoose(NodeResolveLoader2, _Loader2);
      function NodeResolveLoader2(opts) {
        var _this2;
        _this2 = _Loader2.call(this) || this;
        opts = opts || {};
        _this2.pathsToNames = {};
        _this2.noCache = !!opts.noCache;
        if (opts.watch) {
          try {
            chokidar = require_chokidar();
          } catch (e) {
            throw new Error("watch requires chokidar to be installed");
          }
          _this2.watcher = chokidar.watch();
          _this2.watcher.on("change", function(fullname) {
            _this2.emit("update", _this2.pathsToNames[fullname], fullname);
          });
          _this2.watcher.on("error", function(error) {
            console.log("Watcher error: " + error);
          });
          _this2.on("load", function(name, source) {
            _this2.watcher.add(source.path);
          });
        }
        return _this2;
      }
      var _proto2 = NodeResolveLoader2.prototype;
      _proto2.getSource = function getSource(name) {
        if (/^\.?\.?(\/|\\)/.test(name)) {
          return null;
        }
        if (/^[A-Z]:/.test(name)) {
          return null;
        }
        var fullpath;
        try {
          fullpath = require.resolve(name);
        } catch (e) {
          return null;
        }
        this.pathsToNames[fullpath] = name;
        var source = {
          src: fs.readFileSync(fullpath, "utf-8"),
          path: fullpath,
          noCache: this.noCache
        };
        this.emit("load", name, source);
        return source;
      };
      return NodeResolveLoader2;
    }(Loader);
    module2.exports = {
      FileSystemLoader,
      PrecompiledLoader,
      NodeResolveLoader
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/loaders.js
var require_loaders = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/loaders.js"(exports2, module2) {
    "use strict";
    module2.exports = require_node_loaders();
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/tests.js
var require_tests = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/tests.js"(exports2) {
    "use strict";
    var SafeString = require_runtime().SafeString;
    function callable(value) {
      return typeof value === "function";
    }
    exports2.callable = callable;
    function defined(value) {
      return value !== void 0;
    }
    exports2.defined = defined;
    function divisibleby(one, two) {
      return one % two === 0;
    }
    exports2.divisibleby = divisibleby;
    function escaped(value) {
      return value instanceof SafeString;
    }
    exports2.escaped = escaped;
    function equalto(one, two) {
      return one === two;
    }
    exports2.equalto = equalto;
    exports2.eq = exports2.equalto;
    exports2.sameas = exports2.equalto;
    function even(value) {
      return value % 2 === 0;
    }
    exports2.even = even;
    function falsy(value) {
      return !value;
    }
    exports2.falsy = falsy;
    function ge(one, two) {
      return one >= two;
    }
    exports2.ge = ge;
    function greaterthan(one, two) {
      return one > two;
    }
    exports2.greaterthan = greaterthan;
    exports2.gt = exports2.greaterthan;
    function le(one, two) {
      return one <= two;
    }
    exports2.le = le;
    function lessthan(one, two) {
      return one < two;
    }
    exports2.lessthan = lessthan;
    exports2.lt = exports2.lessthan;
    function lower(value) {
      return value.toLowerCase() === value;
    }
    exports2.lower = lower;
    function ne(one, two) {
      return one !== two;
    }
    exports2.ne = ne;
    function nullTest(value) {
      return value === null;
    }
    exports2.null = nullTest;
    function number(value) {
      return typeof value === "number";
    }
    exports2.number = number;
    function odd(value) {
      return value % 2 === 1;
    }
    exports2.odd = odd;
    function string(value) {
      return typeof value === "string";
    }
    exports2.string = string;
    function truthy(value) {
      return !!value;
    }
    exports2.truthy = truthy;
    function undefinedTest(value) {
      return value === void 0;
    }
    exports2.undefined = undefinedTest;
    function upper(value) {
      return value.toUpperCase() === value;
    }
    exports2.upper = upper;
    function iterable(value) {
      if (typeof Symbol !== "undefined") {
        return !!value[Symbol.iterator];
      } else {
        return Array.isArray(value) || typeof value === "string";
      }
    }
    exports2.iterable = iterable;
    function mapping(value) {
      var bool = value !== null && value !== void 0 && typeof value === "object" && !Array.isArray(value);
      if (Set) {
        return bool && !(value instanceof Set);
      } else {
        return bool;
      }
    }
    exports2.mapping = mapping;
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/globals.js
var require_globals = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/globals.js"(exports2, module2) {
    "use strict";
    function _cycler(items) {
      var index = -1;
      return {
        current: null,
        reset: function reset() {
          index = -1;
          this.current = null;
        },
        next: function next() {
          index++;
          if (index >= items.length) {
            index = 0;
          }
          this.current = items[index];
          return this.current;
        }
      };
    }
    function _joiner(sep) {
      sep = sep || ",";
      var first = true;
      return function() {
        var val = first ? "" : sep;
        first = false;
        return val;
      };
    }
    function globals() {
      return {
        range: function range(start, stop, step) {
          if (typeof stop === "undefined") {
            stop = start;
            start = 0;
            step = 1;
          } else if (!step) {
            step = 1;
          }
          var arr = [];
          if (step > 0) {
            for (var i = start; i < stop; i += step) {
              arr.push(i);
            }
          } else {
            for (var _i = start; _i > stop; _i += step) {
              arr.push(_i);
            }
          }
          return arr;
        },
        cycler: function cycler() {
          return _cycler(Array.prototype.slice.call(arguments));
        },
        joiner: function joiner(sep) {
          return _joiner(sep);
        }
      };
    }
    module2.exports = globals;
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/express-app.js
var require_express_app = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/express-app.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    module2.exports = function express(env, app) {
      function NunjucksView(name, opts) {
        this.name = name;
        this.path = name;
        this.defaultEngine = opts.defaultEngine;
        this.ext = path.extname(name);
        if (!this.ext && !this.defaultEngine) {
          throw new Error("No default engine was specified and no extension was provided.");
        }
        if (!this.ext) {
          this.name += this.ext = (this.defaultEngine[0] !== "." ? "." : "") + this.defaultEngine;
        }
      }
      NunjucksView.prototype.render = function render(opts, cb) {
        env.render(this.name, opts, cb);
      };
      app.set("view", NunjucksView);
      app.set("nunjucksEnv", env);
      return env;
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/environment.js
var require_environment = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/environment.js"(exports2, module2) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var asap = require_asap();
    var _waterfall = require_a_sync_waterfall();
    var lib = require_lib();
    var compiler = require_compiler();
    var filters = require_filters();
    var _require = require_loaders();
    var FileSystemLoader = _require.FileSystemLoader;
    var WebLoader = _require.WebLoader;
    var PrecompiledLoader = _require.PrecompiledLoader;
    var tests = require_tests();
    var globals = require_globals();
    var _require2 = require_object();
    var Obj = _require2.Obj;
    var EmitterObj = _require2.EmitterObj;
    var globalRuntime = require_runtime();
    var handleError = globalRuntime.handleError;
    var Frame = globalRuntime.Frame;
    var expressApp = require_express_app();
    function callbackAsap(cb, err, res) {
      asap(function() {
        cb(err, res);
      });
    }
    var noopTmplSrc = {
      type: "code",
      obj: {
        root: function root(env, context, frame, runtime, cb) {
          try {
            cb(null, "");
          } catch (e) {
            cb(handleError(e, null, null));
          }
        }
      }
    };
    var Environment = /* @__PURE__ */ function(_EmitterObj) {
      _inheritsLoose(Environment2, _EmitterObj);
      function Environment2() {
        return _EmitterObj.apply(this, arguments) || this;
      }
      var _proto = Environment2.prototype;
      _proto.init = function init(loaders, opts) {
        var _this = this;
        opts = this.opts = opts || {};
        this.opts.dev = !!opts.dev;
        this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;
        this.opts.throwOnUndefined = !!opts.throwOnUndefined;
        this.opts.trimBlocks = !!opts.trimBlocks;
        this.opts.lstripBlocks = !!opts.lstripBlocks;
        this.loaders = [];
        if (!loaders) {
          if (FileSystemLoader) {
            this.loaders = [new FileSystemLoader("views")];
          } else if (WebLoader) {
            this.loaders = [new WebLoader("/views")];
          }
        } else {
          this.loaders = lib.isArray(loaders) ? loaders : [loaders];
        }
        if (typeof window !== "undefined" && window.nunjucksPrecompiled) {
          this.loaders.unshift(new PrecompiledLoader(window.nunjucksPrecompiled));
        }
        this._initLoaders();
        this.globals = globals();
        this.filters = {};
        this.tests = {};
        this.asyncFilters = [];
        this.extensions = {};
        this.extensionsList = [];
        lib._entries(filters).forEach(function(_ref) {
          var name = _ref[0], filter = _ref[1];
          return _this.addFilter(name, filter);
        });
        lib._entries(tests).forEach(function(_ref2) {
          var name = _ref2[0], test = _ref2[1];
          return _this.addTest(name, test);
        });
      };
      _proto._initLoaders = function _initLoaders() {
        var _this2 = this;
        this.loaders.forEach(function(loader) {
          loader.cache = {};
          if (typeof loader.on === "function") {
            loader.on("update", function(name, fullname) {
              loader.cache[name] = null;
              _this2.emit("update", name, fullname, loader);
            });
            loader.on("load", function(name, source) {
              _this2.emit("load", name, source, loader);
            });
          }
        });
      };
      _proto.invalidateCache = function invalidateCache() {
        this.loaders.forEach(function(loader) {
          loader.cache = {};
        });
      };
      _proto.addExtension = function addExtension(name, extension) {
        extension.__name = name;
        this.extensions[name] = extension;
        this.extensionsList.push(extension);
        return this;
      };
      _proto.removeExtension = function removeExtension(name) {
        var extension = this.getExtension(name);
        if (!extension) {
          return;
        }
        this.extensionsList = lib.without(this.extensionsList, extension);
        delete this.extensions[name];
      };
      _proto.getExtension = function getExtension(name) {
        return this.extensions[name];
      };
      _proto.hasExtension = function hasExtension(name) {
        return !!this.extensions[name];
      };
      _proto.addGlobal = function addGlobal(name, value) {
        this.globals[name] = value;
        return this;
      };
      _proto.getGlobal = function getGlobal(name) {
        if (typeof this.globals[name] === "undefined") {
          throw new Error("global not found: " + name);
        }
        return this.globals[name];
      };
      _proto.addFilter = function addFilter(name, func, async) {
        var wrapped = func;
        if (async) {
          this.asyncFilters.push(name);
        }
        this.filters[name] = wrapped;
        return this;
      };
      _proto.getFilter = function getFilter(name) {
        if (!this.filters[name]) {
          throw new Error("filter not found: " + name);
        }
        return this.filters[name];
      };
      _proto.addTest = function addTest(name, func) {
        this.tests[name] = func;
        return this;
      };
      _proto.getTest = function getTest(name) {
        if (!this.tests[name]) {
          throw new Error("test not found: " + name);
        }
        return this.tests[name];
      };
      _proto.resolveTemplate = function resolveTemplate(loader, parentName, filename) {
        var isRelative = loader.isRelative && parentName ? loader.isRelative(filename) : false;
        return isRelative && loader.resolve ? loader.resolve(parentName, filename) : filename;
      };
      _proto.getTemplate = function getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
        var _this3 = this;
        var that = this;
        var tmpl = null;
        if (name && name.raw) {
          name = name.raw;
        }
        if (lib.isFunction(parentName)) {
          cb = parentName;
          parentName = null;
          eagerCompile = eagerCompile || false;
        }
        if (lib.isFunction(eagerCompile)) {
          cb = eagerCompile;
          eagerCompile = false;
        }
        if (name instanceof Template) {
          tmpl = name;
        } else if (typeof name !== "string") {
          throw new Error("template names must be a string: " + name);
        } else {
          for (var i = 0; i < this.loaders.length; i++) {
            var loader = this.loaders[i];
            tmpl = loader.cache[this.resolveTemplate(loader, parentName, name)];
            if (tmpl) {
              break;
            }
          }
        }
        if (tmpl) {
          if (eagerCompile) {
            tmpl.compile();
          }
          if (cb) {
            cb(null, tmpl);
            return void 0;
          } else {
            return tmpl;
          }
        }
        var syncResult;
        var createTemplate = function createTemplate2(err, info) {
          if (!info && !err && !ignoreMissing) {
            err = new Error("template not found: " + name);
          }
          if (err) {
            if (cb) {
              cb(err);
              return;
            } else {
              throw err;
            }
          }
          var newTmpl;
          if (!info) {
            newTmpl = new Template(noopTmplSrc, _this3, "", eagerCompile);
          } else {
            newTmpl = new Template(info.src, _this3, info.path, eagerCompile);
            if (!info.noCache) {
              info.loader.cache[name] = newTmpl;
            }
          }
          if (cb) {
            cb(null, newTmpl);
          } else {
            syncResult = newTmpl;
          }
        };
        lib.asyncIter(this.loaders, function(loader2, i2, next, done) {
          function handle(err, src) {
            if (err) {
              done(err);
            } else if (src) {
              src.loader = loader2;
              done(null, src);
            } else {
              next();
            }
          }
          name = that.resolveTemplate(loader2, parentName, name);
          if (loader2.async) {
            loader2.getSource(name, handle);
          } else {
            handle(null, loader2.getSource(name));
          }
        }, createTemplate);
        return syncResult;
      };
      _proto.express = function express(app) {
        return expressApp(this, app);
      };
      _proto.render = function render(name, ctx, cb) {
        if (lib.isFunction(ctx)) {
          cb = ctx;
          ctx = null;
        }
        var syncResult = null;
        this.getTemplate(name, function(err, tmpl) {
          if (err && cb) {
            callbackAsap(cb, err);
          } else if (err) {
            throw err;
          } else {
            syncResult = tmpl.render(ctx, cb);
          }
        });
        return syncResult;
      };
      _proto.renderString = function renderString(src, ctx, opts, cb) {
        if (lib.isFunction(opts)) {
          cb = opts;
          opts = {};
        }
        opts = opts || {};
        var tmpl = new Template(src, this, opts.path);
        return tmpl.render(ctx, cb);
      };
      _proto.waterfall = function waterfall(tasks, callback, forceAsync) {
        return _waterfall(tasks, callback, forceAsync);
      };
      return Environment2;
    }(EmitterObj);
    var Context = /* @__PURE__ */ function(_Obj) {
      _inheritsLoose(Context2, _Obj);
      function Context2() {
        return _Obj.apply(this, arguments) || this;
      }
      var _proto2 = Context2.prototype;
      _proto2.init = function init(ctx, blocks, env) {
        var _this4 = this;
        this.env = env || new Environment();
        this.ctx = lib.extend({}, ctx);
        this.blocks = {};
        this.exported = [];
        lib.keys(blocks).forEach(function(name) {
          _this4.addBlock(name, blocks[name]);
        });
      };
      _proto2.lookup = function lookup(name) {
        if (name in this.env.globals && !(name in this.ctx)) {
          return this.env.globals[name];
        } else {
          return this.ctx[name];
        }
      };
      _proto2.setVariable = function setVariable(name, val) {
        this.ctx[name] = val;
      };
      _proto2.getVariables = function getVariables() {
        return this.ctx;
      };
      _proto2.addBlock = function addBlock(name, block) {
        this.blocks[name] = this.blocks[name] || [];
        this.blocks[name].push(block);
        return this;
      };
      _proto2.getBlock = function getBlock(name) {
        if (!this.blocks[name]) {
          throw new Error('unknown block "' + name + '"');
        }
        return this.blocks[name][0];
      };
      _proto2.getSuper = function getSuper(env, name, block, frame, runtime, cb) {
        var idx = lib.indexOf(this.blocks[name] || [], block);
        var blk = this.blocks[name][idx + 1];
        var context = this;
        if (idx === -1 || !blk) {
          throw new Error('no super block available for "' + name + '"');
        }
        blk(env, context, frame, runtime, cb);
      };
      _proto2.addExport = function addExport(name) {
        this.exported.push(name);
      };
      _proto2.getExported = function getExported() {
        var _this5 = this;
        var exported = {};
        this.exported.forEach(function(name) {
          exported[name] = _this5.ctx[name];
        });
        return exported;
      };
      return Context2;
    }(Obj);
    var Template = /* @__PURE__ */ function(_Obj2) {
      _inheritsLoose(Template2, _Obj2);
      function Template2() {
        return _Obj2.apply(this, arguments) || this;
      }
      var _proto3 = Template2.prototype;
      _proto3.init = function init(src, env, path, eagerCompile) {
        this.env = env || new Environment();
        if (lib.isObject(src)) {
          switch (src.type) {
            case "code":
              this.tmplProps = src.obj;
              break;
            case "string":
              this.tmplStr = src.obj;
              break;
            default:
              throw new Error("Unexpected template object type " + src.type + "; expected 'code', or 'string'");
          }
        } else if (lib.isString(src)) {
          this.tmplStr = src;
        } else {
          throw new Error("src must be a string or an object describing the source");
        }
        this.path = path;
        if (eagerCompile) {
          try {
            this._compile();
          } catch (err) {
            throw lib._prettifyError(this.path, this.env.opts.dev, err);
          }
        } else {
          this.compiled = false;
        }
      };
      _proto3.render = function render(ctx, parentFrame, cb) {
        var _this6 = this;
        if (typeof ctx === "function") {
          cb = ctx;
          ctx = {};
        } else if (typeof parentFrame === "function") {
          cb = parentFrame;
          parentFrame = null;
        }
        var forceAsync = !parentFrame;
        try {
          this.compile();
        } catch (e) {
          var err = lib._prettifyError(this.path, this.env.opts.dev, e);
          if (cb) {
            return callbackAsap(cb, err);
          } else {
            throw err;
          }
        }
        var context = new Context(ctx || {}, this.blocks, this.env);
        var frame = parentFrame ? parentFrame.push(true) : new Frame();
        frame.topLevel = true;
        var syncResult = null;
        var didError = false;
        this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err2, res) {
          if (didError && cb && typeof res !== "undefined") {
            return;
          }
          if (err2) {
            err2 = lib._prettifyError(_this6.path, _this6.env.opts.dev, err2);
            didError = true;
          }
          if (cb) {
            if (forceAsync) {
              callbackAsap(cb, err2, res);
            } else {
              cb(err2, res);
            }
          } else {
            if (err2) {
              throw err2;
            }
            syncResult = res;
          }
        });
        return syncResult;
      };
      _proto3.getExported = function getExported(ctx, parentFrame, cb) {
        if (typeof ctx === "function") {
          cb = ctx;
          ctx = {};
        }
        if (typeof parentFrame === "function") {
          cb = parentFrame;
          parentFrame = null;
        }
        try {
          this.compile();
        } catch (e) {
          if (cb) {
            return cb(e);
          } else {
            throw e;
          }
        }
        var frame = parentFrame ? parentFrame.push() : new Frame();
        frame.topLevel = true;
        var context = new Context(ctx || {}, this.blocks, this.env);
        this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, context.getExported());
          }
        });
      };
      _proto3.compile = function compile() {
        if (!this.compiled) {
          this._compile();
        }
      };
      _proto3._compile = function _compile() {
        var props;
        if (this.tmplProps) {
          props = this.tmplProps;
        } else {
          var source = compiler.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
          var func = new Function(source);
          props = func();
        }
        this.blocks = this._getBlocks(props);
        this.rootRenderFunc = props.root;
        this.compiled = true;
      };
      _proto3._getBlocks = function _getBlocks(props) {
        var blocks = {};
        lib.keys(props).forEach(function(k) {
          if (k.slice(0, 2) === "b_") {
            blocks[k.slice(2)] = props[k];
          }
        });
        return blocks;
      };
      return Template2;
    }(Obj);
    module2.exports = {
      Environment,
      Template
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/precompile-global.js
var require_precompile_global = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/precompile-global.js"(exports2, module2) {
    "use strict";
    function precompileGlobal(templates, opts) {
      var out = "";
      opts = opts || {};
      for (var i = 0; i < templates.length; i++) {
        var name = JSON.stringify(templates[i].name);
        var template = templates[i].template;
        out += "(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})[" + name + "] = (function() {\n" + template + "\n})();\n";
        if (opts.asFunction) {
          out += "return function(ctx, cb) { return nunjucks.render(" + name + ", ctx, cb); }\n";
        }
        out += "})();\n";
      }
      return out;
    }
    module2.exports = precompileGlobal;
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/precompile.js
var require_precompile = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/precompile.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var _require = require_lib();
    var _prettifyError = _require._prettifyError;
    var compiler = require_compiler();
    var _require2 = require_environment();
    var Environment = _require2.Environment;
    var precompileGlobal = require_precompile_global();
    function match(filename, patterns) {
      if (!Array.isArray(patterns)) {
        return false;
      }
      return patterns.some(function(pattern) {
        return filename.match(pattern);
      });
    }
    function precompileString(str, opts) {
      opts = opts || {};
      opts.isString = true;
      var env = opts.env || new Environment([]);
      var wrapper = opts.wrapper || precompileGlobal;
      if (!opts.name) {
        throw new Error('the "name" option is required when compiling a string');
      }
      return wrapper([_precompile(str, opts.name, env)], opts);
    }
    function precompile(input, opts) {
      opts = opts || {};
      var env = opts.env || new Environment([]);
      var wrapper = opts.wrapper || precompileGlobal;
      if (opts.isString) {
        return precompileString(input, opts);
      }
      var pathStats = fs.existsSync(input) && fs.statSync(input);
      var precompiled = [];
      var templates = [];
      function addTemplates(dir) {
        fs.readdirSync(dir).forEach(function(file) {
          var filepath = path.join(dir, file);
          var subpath = filepath.substr(path.join(input, "/").length);
          var stat = fs.statSync(filepath);
          if (stat && stat.isDirectory()) {
            subpath += "/";
            if (!match(subpath, opts.exclude)) {
              addTemplates(filepath);
            }
          } else if (match(subpath, opts.include)) {
            templates.push(filepath);
          }
        });
      }
      if (pathStats.isFile()) {
        precompiled.push(_precompile(fs.readFileSync(input, "utf-8"), opts.name || input, env));
      } else if (pathStats.isDirectory()) {
        addTemplates(input);
        for (var i = 0; i < templates.length; i++) {
          var name = templates[i].replace(path.join(input, "/"), "");
          try {
            precompiled.push(_precompile(fs.readFileSync(templates[i], "utf-8"), name, env));
          } catch (e) {
            if (opts.force) {
              console.error(e);
            } else {
              throw e;
            }
          }
        }
      }
      return wrapper(precompiled, opts);
    }
    function _precompile(str, name, env) {
      env = env || new Environment([]);
      var asyncFilters = env.asyncFilters;
      var extensions = env.extensionsList;
      var template;
      name = name.replace(/\\/g, "/");
      try {
        template = compiler.compile(str, asyncFilters, extensions, name, env.opts);
      } catch (err) {
        throw _prettifyError(name, false, err);
      }
      return {
        name,
        template
      };
    }
    module2.exports = {
      precompile,
      precompileString
    };
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/jinja-compat.js
var require_jinja_compat = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/src/jinja-compat.js"(exports2, module2) {
    "use strict";
    function installCompat() {
      "use strict";
      var runtime = this.runtime;
      var lib = this.lib;
      var Compiler = this.compiler.Compiler;
      var Parser = this.parser.Parser;
      var nodes = this.nodes;
      var lexer = this.lexer;
      var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
      var orig_memberLookup = runtime.memberLookup;
      var orig_Compiler_assertType;
      var orig_Parser_parseAggregate;
      if (Compiler) {
        orig_Compiler_assertType = Compiler.prototype.assertType;
      }
      if (Parser) {
        orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
      }
      function uninstall() {
        runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
        runtime.memberLookup = orig_memberLookup;
        if (Compiler) {
          Compiler.prototype.assertType = orig_Compiler_assertType;
        }
        if (Parser) {
          Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
        }
      }
      runtime.contextOrFrameLookup = function contextOrFrameLookup(context, frame, key) {
        var val = orig_contextOrFrameLookup.apply(this, arguments);
        if (val !== void 0) {
          return val;
        }
        switch (key) {
          case "True":
            return true;
          case "False":
            return false;
          case "None":
            return null;
          default:
            return void 0;
        }
      };
      function getTokensState(tokens) {
        return {
          index: tokens.index,
          lineno: tokens.lineno,
          colno: tokens.colno
        };
      }
      if (process.env.BUILD_TYPE !== "SLIM" && nodes && Compiler && Parser) {
        var Slice = nodes.Node.extend("Slice", {
          fields: ["start", "stop", "step"],
          init: function init(lineno, colno, start, stop, step) {
            start = start || new nodes.Literal(lineno, colno, null);
            stop = stop || new nodes.Literal(lineno, colno, null);
            step = step || new nodes.Literal(lineno, colno, 1);
            this.parent(lineno, colno, start, stop, step);
          }
        });
        Compiler.prototype.assertType = function assertType(node) {
          if (node instanceof Slice) {
            return;
          }
          orig_Compiler_assertType.apply(this, arguments);
        };
        Compiler.prototype.compileSlice = function compileSlice(node, frame) {
          this._emit("(");
          this._compileExpression(node.start, frame);
          this._emit("),(");
          this._compileExpression(node.stop, frame);
          this._emit("),(");
          this._compileExpression(node.step, frame);
          this._emit(")");
        };
        Parser.prototype.parseAggregate = function parseAggregate() {
          var _this = this;
          var origState = getTokensState(this.tokens);
          origState.colno--;
          origState.index--;
          try {
            return orig_Parser_parseAggregate.apply(this);
          } catch (e) {
            var errState = getTokensState(this.tokens);
            var rethrow = function rethrow2() {
              lib._assign(_this.tokens, errState);
              return e;
            };
            lib._assign(this.tokens, origState);
            this.peeked = false;
            var tok = this.peekToken();
            if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
              throw rethrow();
            } else {
              this.nextToken();
            }
            var node = new Slice(tok.lineno, tok.colno);
            var isSlice = false;
            for (var i = 0; i <= node.fields.length; i++) {
              if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
                break;
              }
              if (i === node.fields.length) {
                if (isSlice) {
                  this.fail("parseSlice: too many slice components", tok.lineno, tok.colno);
                } else {
                  break;
                }
              }
              if (this.skip(lexer.TOKEN_COLON)) {
                isSlice = true;
              } else {
                var field = node.fields[i];
                node[field] = this.parseExpression();
                isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
              }
            }
            if (!isSlice) {
              throw rethrow();
            }
            return new nodes.Array(tok.lineno, tok.colno, [node]);
          }
        };
      }
      function sliceLookup(obj, start, stop, step) {
        obj = obj || [];
        if (start === null) {
          start = step < 0 ? obj.length - 1 : 0;
        }
        if (stop === null) {
          stop = step < 0 ? -1 : obj.length;
        } else if (stop < 0) {
          stop += obj.length;
        }
        if (start < 0) {
          start += obj.length;
        }
        var results = [];
        for (var i = start; ; i += step) {
          if (i < 0 || i > obj.length) {
            break;
          }
          if (step > 0 && i >= stop) {
            break;
          }
          if (step < 0 && i <= stop) {
            break;
          }
          results.push(runtime.memberLookup(obj, i));
        }
        return results;
      }
      function hasOwnProp(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
      var ARRAY_MEMBERS = {
        pop: function pop(index) {
          if (index === void 0) {
            return this.pop();
          }
          if (index >= this.length || index < 0) {
            throw new Error("KeyError");
          }
          return this.splice(index, 1);
        },
        append: function append(element) {
          return this.push(element);
        },
        remove: function remove(element) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] === element) {
              return this.splice(i, 1);
            }
          }
          throw new Error("ValueError");
        },
        count: function count(element) {
          var count2 = 0;
          for (var i = 0; i < this.length; i++) {
            if (this[i] === element) {
              count2++;
            }
          }
          return count2;
        },
        index: function index(element) {
          var i;
          if ((i = this.indexOf(element)) === -1) {
            throw new Error("ValueError");
          }
          return i;
        },
        find: function find(element) {
          return this.indexOf(element);
        },
        insert: function insert(index, elem) {
          return this.splice(index, 0, elem);
        }
      };
      var OBJECT_MEMBERS = {
        items: function items() {
          return lib._entries(this);
        },
        values: function values() {
          return lib._values(this);
        },
        keys: function keys() {
          return lib.keys(this);
        },
        get: function get(key, def) {
          var output = this[key];
          if (output === void 0) {
            output = def;
          }
          return output;
        },
        has_key: function has_key(key) {
          return hasOwnProp(this, key);
        },
        pop: function pop(key, def) {
          var output = this[key];
          if (output === void 0 && def !== void 0) {
            output = def;
          } else if (output === void 0) {
            throw new Error("KeyError");
          } else {
            delete this[key];
          }
          return output;
        },
        popitem: function popitem() {
          var keys = lib.keys(this);
          if (!keys.length) {
            throw new Error("KeyError");
          }
          var k = keys[0];
          var val = this[k];
          delete this[k];
          return [k, val];
        },
        setdefault: function setdefault(key, def) {
          if (def === void 0) {
            def = null;
          }
          if (!(key in this)) {
            this[key] = def;
          }
          return this[key];
        },
        update: function update(kwargs) {
          lib._assign(this, kwargs);
          return null;
        }
      };
      OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
      OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
      OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
      runtime.memberLookup = function memberLookup(obj, val, autoescape) {
        if (arguments.length === 4) {
          return sliceLookup.apply(this, arguments);
        }
        obj = obj || {};
        if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
          return ARRAY_MEMBERS[val].bind(obj);
        }
        if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
          return OBJECT_MEMBERS[val].bind(obj);
        }
        return orig_memberLookup.apply(this, arguments);
      };
      return uninstall;
    }
    module2.exports = installCompat;
  }
});

// node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/index.js
var require_nunjucks = __commonJS({
  "node_modules/.pnpm/nunjucks@3.2.4/node_modules/nunjucks/index.js"(exports2, module2) {
    "use strict";
    var lib = require_lib();
    var _require = require_environment();
    var Environment = _require.Environment;
    var Template = _require.Template;
    var Loader = require_loader();
    var loaders = require_loaders();
    var precompile = require_precompile();
    var compiler = require_compiler();
    var parser = require_parser();
    var lexer = require_lexer();
    var runtime = require_runtime();
    var nodes = require_nodes();
    var installJinjaCompat = require_jinja_compat();
    var e;
    function configure(templatesPath, opts) {
      opts = opts || {};
      if (lib.isObject(templatesPath)) {
        opts = templatesPath;
        templatesPath = null;
      }
      var TemplateLoader;
      if (loaders.FileSystemLoader) {
        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
          watch: opts.watch,
          noCache: opts.noCache
        });
      } else if (loaders.WebLoader) {
        TemplateLoader = new loaders.WebLoader(templatesPath, {
          useCache: opts.web && opts.web.useCache,
          async: opts.web && opts.web.async
        });
      }
      e = new Environment(TemplateLoader, opts);
      if (opts && opts.express) {
        e.express(opts.express);
      }
      return e;
    }
    module2.exports = {
      Environment,
      Template,
      Loader,
      FileSystemLoader: loaders.FileSystemLoader,
      NodeResolveLoader: loaders.NodeResolveLoader,
      PrecompiledLoader: loaders.PrecompiledLoader,
      WebLoader: loaders.WebLoader,
      compiler,
      parser,
      lexer,
      runtime,
      lib,
      nodes,
      installJinjaCompat,
      configure,
      reset: function reset() {
        e = void 0;
      },
      compile: function compile(src, env, path, eagerCompile) {
        if (!e) {
          configure();
        }
        return new Template(src, env, path, eagerCompile);
      },
      render: function render(name, ctx, cb) {
        if (!e) {
          configure();
        }
        return e.render(name, ctx, cb);
      },
      renderString: function renderString(src, ctx, cb) {
        if (!e) {
          configure();
        }
        return e.renderString(src, ctx, cb);
      },
      precompile: precompile ? precompile.precompile : void 0,
      precompileString: precompile ? precompile.precompileString : void 0
    };
  }
});

// lib/xml_generator.js
var require_xml_generator = __commonJS({
  "lib/xml_generator.js"(exports2, module2) {
    "use strict";
    var nunjucks = require_nunjucks();
    var env = new nunjucks.Environment();
    var pathFn2 = require("path");
    var fs = require("fs");
    env.addFilter("uriencode", function(str) {
      return encodeURI(str);
    });
    env.addFilter("noControlChars", function(str) {
      return str && str.replace(/[\x00-\x1F\x7F]/g, "");
    });
    module2.exports = function(locals) {
      var config2 = this.config;
      var searchConfig = config2.search;
      var searchTmplSrc = searchConfig.template || pathFn2.join(__dirname, "./templates/search.xml");
      var searchTmpl = nunjucks.compile(fs.readFileSync(searchTmplSrc, "utf8"), env);
      var template = searchTmpl;
      var searchfield = searchConfig.field;
      var content = searchConfig.content;
      if (content == void 0) content = true;
      var posts, pages;
      if (searchfield.trim() != "") {
        searchfield = searchfield.trim();
        if (searchfield == "post") {
          posts = locals.posts.sort("-date");
        } else if (searchfield == "page") {
          pages = locals.pages;
        } else {
          posts = locals.posts.sort("-date");
          pages = locals.pages;
        }
      } else {
        posts = locals.posts.sort("-date");
      }
      var rootURL;
      if (config2.root == null) {
        rootURL = "/";
      } else {
        rootURL = config2.root;
      }
      var xml = template.render({
        config: config2,
        posts,
        pages,
        content,
        url: rootURL
      });
      return {
        path: searchConfig.path,
        data: xml
      };
    };
  }
});

// lib/json_generator.js
var require_json_generator = __commonJS({
  "lib/json_generator.js"(exports2, module2) {
    var pathFn2 = require("path");
    var fs = require("fs");
    module2.exports = function(locals) {
      var config2 = this.config;
      var searchConfig = config2.search;
      var searchfield = searchConfig.field;
      var content = searchConfig.content;
      var posts, pages;
      if (searchfield.trim() != "") {
        searchfield = searchfield.trim();
        if (searchfield == "post") {
          posts = locals.posts.sort("-date");
        } else if (searchfield == "page") {
          pages = locals.pages;
        } else {
          posts = locals.posts.sort("-date");
          pages = locals.pages;
        }
      } else {
        posts = locals.posts.sort("-date");
      }
      var res = new Array();
      var index = 0;
      if (posts) {
        posts.each(function(post) {
          if (post.indexing != void 0 && !post.indexing) return;
          var temp_post = new Object();
          if (post.title) {
            temp_post.title = post.title;
          }
          if (post.path) {
            temp_post.url = config2.root + post.path;
          }
          if (content != false && post._content) {
            temp_post.content = post._content;
          }
          if (post.tags && post.tags.length > 0) {
            var tags = [];
            post.tags.forEach(function(tag) {
              tags.push(tag.name);
            });
            temp_post.tags = tags;
          }
          if (post.categories && post.categories.length > 0) {
            var categories = [];
            post.categories.forEach(function(cate) {
              categories.push(cate.name);
            });
            temp_post.categories = categories;
          }
          res[index] = temp_post;
          index += 1;
        });
      }
      if (pages) {
        pages.each(function(page) {
          if (page.indexing != void 0 && !page.indexing) return;
          var temp_page = new Object();
          if (page.title) {
            temp_page.title = page.title;
          }
          if (page.path) {
            temp_page.url = config2.root + page.path;
          }
          if (content != false && page._content) {
            temp_page.content = page._content;
          }
          if (page.tags && page.tags.length > 0) {
            var tags = new Array();
            var tag_index = 0;
            page.tags.each(function(tag) {
              tags[tag_index] = tag.name;
            });
            temp_page.tags = tags;
          }
          if (page.categories && page.categories.length > 0) {
            temp_page.categories = [](page.categories.each || page.categories.forEach)(function(item) {
              temp_page.categories.push(item);
            });
          }
          res[index] = temp_page;
          index += 1;
        });
      }
      var json = JSON.stringify(res);
      return {
        path: searchConfig.path,
        data: json
      };
    };
  }
});

// index.js
var merge = require_utils_merge();
var pathFn = require("path");
var config = hexo.config.search = merge({
  path: "search.xml",
  field: "post"
}, hexo.config.search);
if (!config.path) {
  config.path = "search.xml";
}
if (!pathFn.extname(config.path)) {
  config.path += ".xml";
}
if (pathFn.extname(config.path) == ".xml") {
  hexo.extend.generator.register("xml", require_xml_generator());
}
if (pathFn.extname(config.path) == ".json") {
  hexo.extend.generator.register("json", require_json_generator());
}
/*! Bundled license information:

async-each/index.js:
  (*! async-each - MIT License (c) 2016 Paul Miller (paulmillr.com) *)

filename-regex/index.js:
  (*!
   * filename-regex <https://github.com/regexps/filename-regex>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert
   * Licensed under the MIT license.
   *)

arr-flatten/index.js:
  (*!
   * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

arr-diff/index.js:
  (*!
   * arr-diff <https://github.com/jonschlinkert/arr-diff>
   *
   * Copyright (c) 2014 Jon Schlinkert, contributors.
   * Licensed under the MIT License
   *)

array-unique/index.js:
array-unique/index.js:
  (*!
   * array-unique <https://github.com/jonschlinkert/array-unique>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

isobject/index.js:
  (*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

is-number/index.js:
is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

randomatic/index.js:
  (*!
   * randomatic <https://github.com/jonschlinkert/randomatic>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

repeat-string/index.js:
  (*!
   * repeat-string <https://github.com/jonschlinkert/repeat-string>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

repeat-element/index.js:
  (*!
   * repeat-element <https://github.com/jonschlinkert/repeat-element>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Licensed under the MIT license.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)

expand-range/index.js:
  (*!
   * expand-range <https://github.com/jonschlinkert/expand-range>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT license.
   *)

preserve/index.js:
  (*!
   * preserve <https://github.com/jonschlinkert/preserve>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT license.
   *)

braces/index.js:
  (*!
   * braces <https://github.com/jonschlinkert/braces>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT license.
   *)

is-posix-bracket/index.js:
  (*!
   * is-posix-bracket <https://github.com/jonschlinkert/is-posix-bracket>
   *
   * Copyright (c) 2015-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

expand-brackets/index.js:
  (*!
   * expand-brackets <https://github.com/jonschlinkert/expand-brackets>
   *
   * Copyright (c) 2015 Jon Schlinkert.
   * Licensed under the MIT license.
   *)

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

extglob/index.js:
  (*!
   * extglob <https://github.com/jonschlinkert/extglob>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

for-in/index.js:
  (*!
   * for-in <https://github.com/jonschlinkert/for-in>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

for-own/index.js:
  (*!
   * for-own <https://github.com/jonschlinkert/for-own>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

object.omit/index.js:
  (*!
   * object.omit <https://github.com/jonschlinkert/object.omit>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

glob-base/index.js:
  (*!
   * glob-base <https://github.com/jonschlinkert/glob-base>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-dotfile/index.js:
  (*!
   * is-dotfile <https://github.com/jonschlinkert/is-dotfile>
   *
   * Copyright (c) 2015-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

parse-glob/index.js:
  (*!
   * parse-glob <https://github.com/jonschlinkert/parse-glob>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-primitive/index.js:
  (*!
   * is-primitive <https://github.com/jonschlinkert/is-primitive>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-equal-shallow/index.js:
  (*!
   * is-equal-shallow <https://github.com/jonschlinkert/is-equal-shallow>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

regex-cache/index.js:
  (*!
   * regex-cache <https://github.com/jonschlinkert/regex-cache>
   *
   * Copyright (c) 2015-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

micromatch/lib/expand.js:
micromatch/index.js:
  (*!
   * micromatch <https://github.com/jonschlinkert/micromatch>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

isobject/index.js:
  (*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

define-property/index.js:
  (*!
   * define-property <https://github.com/jonschlinkert/define-property>
   *
   * Copyright (c) 2015-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-plain-object/index.js:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

assign-symbols/index.js:
  (*!
   * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

split-string/index.js:
  (*!
   * split-string <https://github.com/jonschlinkert/split-string>
   *
   * Copyright (c) 2015-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/jonschlinkert/to-regex-range>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

define-property/index.js:
  (*!
   * define-property <https://github.com/jonschlinkert/define-property>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

object-visit/index.js:
  (*!
   * object-visit <https://github.com/jonschlinkert/object-visit>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

collection-visit/index.js:
  (*!
   * collection-visit <https://github.com/jonschlinkert/collection-visit>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-object-path/index.js:
  (*!
   * to-object-path <https://github.com/jonschlinkert/to-object-path>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

get-value/index.js:
  (*!
   * get-value <https://github.com/jonschlinkert/get-value>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

set-value/index.js:
  (*!
   * set-value <https://github.com/jonschlinkert/set-value>
   *
   * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

has-values/index.js:
  (*!
   * has-values <https://github.com/jonschlinkert/has-values>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

has-value/index.js:
  (*!
   * has-value <https://github.com/jonschlinkert/has-value>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

unset-value/index.js:
  (*!
   * unset-value <https://github.com/jonschlinkert/unset-value>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

has-values/index.js:
  (*!
   * has-values <https://github.com/jonschlinkert/has-values>
   *
   * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

has-value/index.js:
  (*!
   * has-value <https://github.com/jonschlinkert/has-value>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

pascalcase/index.js:
  (*!
   * pascalcase <https://github.com/jonschlinkert/pascalcase>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

define-property/index.js:
  (*!
   * define-property <https://github.com/jonschlinkert/define-property>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

copy-descriptor/index.js:
  (*!
   * copy-descriptor <https://github.com/jonschlinkert/copy-descriptor>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

static-extend/index.js:
  (*!
   * static-extend <https://github.com/jonschlinkert/static-extend>
   *
   * Copyright (c) 2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

use/index.js:
  (*!
   * use <https://github.com/jonschlinkert/use>
   *
   * Copyright (c) 2015-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

map-cache/index.js:
  (*!
   * map-cache <https://github.com/jonschlinkert/map-cache>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

fragment-cache/index.js:
  (*!
   * fragment-cache <https://github.com/jonschlinkert/fragment-cache>
   *
   * Copyright (c) 2016-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-windows/index.js:
  (*!
   * is-windows <https://github.com/jonschlinkert/is-windows>
   *
   * Copyright © 2015-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)

arr-diff/index.js:
  (*!
   * arr-diff <https://github.com/jonschlinkert/arr-diff>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

object.pick/index.js:
  (*!
   * object.pick <https://github.com/jonschlinkert/object.pick>
   *
   * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
   * Licensed under the MIT License
   *)
*/
