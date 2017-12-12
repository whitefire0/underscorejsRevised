/**                   __
                  /\ \                                                         __
 __  __    ___    \_\ \     __   _ __   ____    ___    ___   _ __    __       /\_\    ____
/\ \/\ \ /' _ `\  /'_  \  /'__`\/\  __\/ ,__\  / ___\ / __`\/\  __\/'__`\     \/\ \  /',__\
\ \ \_\ \/\ \/\ \/\ \ \ \/\  __/\ \ \//\__, `\/\ \__//\ \ \ \ \ \//\  __/  __  \ \ \/\__, `\
 \ \____/\ \_\ \_\ \___,_\ \____\\ \_\\/\____/\ \____\ \____/\ \_\\ \____\/\_\ _\ \ \/\____/
  \/___/  \/_/\/_/\/__,_ /\/____/ \/_/ \/___/  \/____/\/___/  \/_/ \/____/\/_//\ \_\ \/___/
                                                                              \ \____/
                                                                               \/___/ */

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2017 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

/**Look for functions with the least dependencies, the least helper functions, and the least things that you don't know. You are looking for relative complexity, as the first time you run through it you might not understand any of it.
 * When you see a function that is dependent on another functions, its probably because it uses this helper function in many over cases. Abstract it to that case alone - a helper function that has 10 different scenarios has 9 scenarios that are essentially dead at this point. Trust that you don't know them and you will encounter them sequentially through actual usage. If you don't use this process reading this level of approach is literally impossible.
 */

 // Number of 

(function() {






  // =======================================================================
  // ====================== Baseline Setup =================================
  // =======================================================================






  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
             typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.

  //where 'context' = 'this' object pointer
  // 'optimizeCallback'
  // called with (iteratee, context) from _.each
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func; 
    switch (argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-parameter case has been omitted only because no current consumers
      // made use of it.
      case null:
      case 3: return function(value, index, collection) {
        //function.call(thisArg, arg1, arg2, ...)
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
  // This accumulates the arguments passed into an array, after a given index.
  var restArgs = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  //shallowProperty is a helper function with multiple uses:
  //Case 1: isArrayLike(obj) => getLength = shallowProperty('length') => getLength(collection /**where collection is array */), in this case key param = 'length'
  
  //nested function that allows both key and obj to be defined and processed
  //'key' is the method or property of the object that we want to return
  var shallowProperty = function(key) {
    //we have to create function that passes in obj as otherwise obj is not defined
    return function(obj) {
      //if obj is null return undefined, else return the object[key]
      //a true object does not have a length property and so returns undefined
      return obj == null ? void 0 : obj[key];
    };
  };

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094

  //math.pow(base, exponent)
  //changed exponent to be 32 due to changes in ECMA2017
  // https://github.com/jashkenas/underscore/pull/2703
  var MAX_ARRAY_INDEX = Math.pow(2, 32) - 1;
  var getLength = shallowProperty('length');
  //isArrayLike is a function that takes another function

  //when called by _.each (specific refactor)
  // var isArrayLike(obj) {
  //   var length = shallowProperty('length') {
  //     return function(obj) {
  //       // returns true if arrayLike
  //       return obj == null ? void 0 : obj['length'];
  //     }
  //   }
  //   returns true if 3 conditions for determining an array are true
  //   return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  // }
    

  var isArrayLike = function(collection) {
    //inside this function, getLength already has 'key' defined (js: 207). By passing in collection to getLength, javascript passes this param to the nested function, not the originally defined function:     

    var length = getLength(collection);
    //returns true if 3 conditions for determining an array are true
    //typeof length == 'number' equivalent to Number(length)
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

 




  // =======================================================================
  // ====================== Collection Functions ===========================
  // =======================================================================






  // &*************************************&
  //       _.each
  // &*************************************&


  /**_.each(list, iteratee, [context]) Alias: forEach 
      Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed. Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.

      _.each([1, 2, 3], alert);
      => alerts each number in turn...
      _.each({one: 1, two: 2, three: 3}, alert);
      => alerts each number value in turn...*/

  /* The cornerstone, an `each` implementation, aka `forEach`.
  Handles raw objects in addition to array-likes. Treats all
  sparse array-likes as if they were dense.*/

  // Unfamiliar Concepts: (2 -iterating over keys, context), # Helper Functions: (4), # of Dependencies: ()
 
  /** Test Functions */

  _.printedIteratee = function printedIteratee (element, index, array){
    console.log('Element: ' + element);
    console.log('Index: ' + index);
    console.log('Array: ' + array);
  };

  _.logThis = function logThis (element) {
    console.log(element);
  }

  /** Test data types */

  _.simpleNumberArray = [1, 2, 3]
  _.simpleStringArray = ['this', 'is', 'a', 'test', 'array', 'of', 'strings'];
  _.simpleNestedNumberArray = [[1], [2], [3], [4]];
  _.complexNestedArray = [[{cars: 'go vroom vroom', cats: 'go meow meow fuck you human'}], ['types of cat', ['twat', 'twat', 'twat']]];
  _.simpleObject = {simple: 'simples'};
  _.computerObject = {
    components: {
      peripherals: ['keyboard', 'mouse', 'printer', 'monitor'],
      core: ['motherboard, cpu, gpu']
    },
    types: {
      old: {nonWindows: 'atari', Windows: 'windows95'},
      notOld: {nonWindows: 'iMac', Windows: 'windows Vista'},
      worthBuying: {nonWindows: 'macbook', Windows: 'windows 10'}
    }
  }


  _.each = _.forEach = function(obj, iteratee, context) {
    //iteratee is bound to the context object if one is passed
    //iteratee now stores a function: interatee.apply(context, arguments)
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    //if obj is array, or array-like objects (arguments, node lists)
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        //each iteratee is clled with three arguments (element, index, list)
        //when iteratee is now called we enter the local scope of optimizeCb (function(){return func.apply(context arguments)})
        iteratee(obj[i], i, obj);
      }
    } else {
      //if obj is an object
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    //returns the list for chaining
    return obj;
  };


  // &*************************************&
  //       _.map
  // &*************************************&


  /**_.map(list, iteratee, [context]) Alias: collect 
      Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.

      _.map([1, 2, 3], function(num){ return num * 3; });
      => [3, 6, 9]
      _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
      => [3, 6, 9]
      _.map([[1, 2], [3, 4]], _.first);
      => [1, 3]
  */

   // Unfamiliar Concepts: (0), # Helper Functions: (4), # of Dependencies: ()
  
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };


  // &*************************************&
  //   _.createReduce
  // &*************************************&


  /**_.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl 
      Also known as inject and foldl, reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.

      If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.

      var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
      => 6*/

  // Unfamiliar Concepts: (1) + recursion, # Helper Functions: (5), # of Dependencies: ()

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);


  // The right-associative version of reduce, also known as `foldr`.
  /**_.reduceRight(list, iteratee, [memo], [context]) Alias: foldr 
      The right-associative version of reduce. Foldr is not as useful in JavaScript as it would be in a language with lazy evaluation.

      var list = [[0, 1], [2, 3], [4, 5]];
      var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
      => [4, 5, 2, 3, 0, 1] */

  _.reduceRight = _.foldr = createReduce(-1);


  // &*************************************&
  //      _.find
  // &*************************************&


  /**_.find(list, predicate, [context]) Alias: detect 
      Looks through each value in the list, returning the first one that passes a truth test (predicate), or undefined if no value passes the test. The function returns as soon as it finds an acceptable element, and doesn't traverse the entire list.

      var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
      => 2*/

    // Unfamiliar Concepts: (1), # Helper Functions: (2), # of Dependencies: ()

  
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };


  // &*************************************&
  //     _.filter
  // &*************************************&


  /**.filter(list, predicate, [context]) Alias: select 
      Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).

      var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
      => [2, 4, 6] */

    // Unfamiliar Concepts: (1), # Helper Functions: (3), # of Dependencies: ()
 
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // &*************************************&
  //     _.reject
  // &*************************************&

  /**_.reject(list, predicate, [context]) 
      Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.

      var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
      => [1, 3, 5]*/

  
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // &*************************************&
  //     _.every
  // &*************************************&

  /**_.every(list, [predicate], [context]) Alias: all 
      Returns true if all of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a false element is found.

      _.every([2, 4, 5], function(num) { return num % 2 == 0; });
      => false*/

  
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // &*************************************&
  //     _.some
  // &*************************************&

  /**_.some(list, [predicate], [context]) Alias: any 
      Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found.

      _.some([null, 0, 'yes', false]);
      => true */

  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };


  // &*************************************&
  //     _.contains
  // &*************************************&


  /**_.contains(list, value, [fromIndex]) Alias: includes 
      Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.

      _.contains([1, 2, 3], 3);
      => true */

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };


  // &*************************************&
  //     _.invoke
  // &*************************************&


  /**invoke_.invoke(list, methodName, *arguments) 
    Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.

    _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
    => [[1, 5, 7], [1, 2, 3]] */

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArgs(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  
  // &*************************************&
  //     _.pluck
  // &*************************************&


  /**_.pluck(list, propertyName) 
      A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.

      var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      _.pluck(stooges, 'name');
      => ["moe", "larry", "curly"] */

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };


  // &*************************************&
  //     _.max
  // &*************************************&

  /**_.max(list, [iteratee], [context]) 
      Returns the maximum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. -Infinity is returned if list is empty, so an isEmpty guard may be required. Non-numerical values in list will be ignored.

      var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      _.max(stooges, function(stooge){ return stooge.age; });
      => {name: 'curly', age: 60}; */

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };


  // &*************************************&
  //     _.min
  // &*************************************&

  /**.min(list, [iteratee], [context]) 
      Returns the minimum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. Infinity is returned if list is empty, so an isEmpty guard may be required. Non-numerical values in list will be ignored.

      var numbers = [10, 5, 100, 2, 1000];
      _.min(numbers);
      => 2 */

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };


  // &*************************************&
  //     _.shuffle
  // &*************************************&

  /**_.shuffle(list) 
      Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.

      _.shuffle([1, 2, 3, 4, 5, 6]);
      => [4, 1, 6, 3, 5, 2] */

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };


  // &*************************************&
  //     _.sample
  // &*************************************&


  /**_.sample(list, [n]) 
      Produce a random sample from the list. Pass a number to return n random elements from the list. Otherwise a single random item will be returned.

      _.sample([1, 2, 3, 4, 5, 6]);
      => 4

      _.sample([1, 2, 3, 4, 5, 6], 3);
      => [1, 6, 2] */

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  
  // &*************************************&
  //     _.sortBy
  // &*************************************&


  /**_.sortBy(list, iteratee, [context]) 
      Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee. iteratee may also be the string name of the property to sort by (eg. length).

      _.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
      => [5, 4, 6, 3, 1, 2]

      var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      _.sortBy(stooges, 'name');
      => [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]; */

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // &**************************&
  //  group (helper functions)
  // &**************************&

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };


  // &*************************************&
  //     _.groupBy
  // &*************************************&

  /**_.groupBy(list, iteratee, [context]) 
      Splits a collection into sets, grouped by the result of running each value through iteratee. If iteratee is a string instead of a function, groups by the property named by iteratee on each of the values.

      _.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });
      => {1: [1.3], 2: [2.1, 2.4]}

      _.groupBy(['one', 'two', 'three'], 'length');
      => {3: ["one", "two"], 5: ["three"]} */

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });


  // &*************************************&
  //     _.indexBy
  // &*************************************&

  /**_.indexBy(list, iteratee, [context]) 
      Given a list, and an iteratee function that returns a key for each element in the list (or a property name), returns an object with an index of each item. Just like groupBy, but for when you know your keys are unique.

      var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      _.indexBy(stooges, 'age');
      => {
        "40": {name: 'moe', age: 40},
        "50": {name: 'larry', age: 50},
        "60": {name: 'curly', age: 60}
      } */

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });


  // &*************************************&
  //     _.countBy
  // &*************************************&

  /**_.countBy(list, iteratee, [context]) 
      Sorts a list into groups and returns a count for the number of objects in each group. Similar to groupBy, but instead of returning a list of values, returns a count for the number of values in that group.

      _.countBy([1, 2, 3, 4, 5], function(num) {
        return num % 2 == 0 ? 'even': 'odd';
      });
      => {odd: 3, even: 2} */

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });


  // &*************************************&
  //     _.toArray
  // &*************************************&

  /**_.toArray(list) 
      Creates a real Array from the list (anything that can be iterated over). Useful for transmuting the arguments object.

      (function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
      => [2, 3, 4] */

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };


  // &*************************************&
  //     _.size
  // &*************************************&

  /**_.size(list) 
      Return the number of values in the list.

      _.size({one: 1, two: 2, three: 3});
      => 3 */

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };


  // &*************************************&
  //     _.partition
  // &*************************************&

  /**_.partition(array, predicate) 
      Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.

      _.partition([0, 1, 2, 3, 4, 5], isOdd);
      => [[1, 3, 5], [0, 2, 4]] */

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);






  // =======================================================================
  // =========================== Array Functions ===========================
  // =======================================================================






  // &*************************************&
  //     _.first
  // &*************************************&

  /**_.first(array, [n]) Aliases: head, take 
      Returns the first element of an array. Passing n will return the first n elements of the array.

      _.first([5, 4, 3, 2, 1]);
      => 5 */

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };


  // &*************************************&
  //     _.inital
  // &*************************************&


  /**_.initial(array, [n]) 
      Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.

      _.initial([5, 4, 3, 2, 1]);
      => [5, 4, 3, 2] */

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };


  // &*************************************&
  //     _.last
  // &*************************************&

  /**_.last(array, [n]) 
      Returns the last element of an array. Passing n will return the last n elements of the array.

      _.last([5, 4, 3, 2, 1]);
      => 1 */

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };


  // &*************************************&
  //     _.rest
  // &*************************************&

  /**_.rest(array, [index]) Aliases: tail, drop 
    Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.

    _.rest([5, 4, 3, 2, 1]);
    => [4, 3, 2, 1] */

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };


  // &*************************************&
  //     _.compact
  // &*************************************&

  /**_.compact(array) 
      Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.

      _.compact([0, 1, false, 2, '', 3]);
      => [1, 2, 3] */

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };


  // &*************************************&
  //     _.flatten
  // &*************************************&

  /**_.flatten(array, [shallow]) 
      Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.

      _.flatten([1, [2], [3, [[4]]]]);
      => [1, 2, 3, 4];

      _.flatten([1, [2], [3, [[4]]]], true);
      => [1, 2, 3, [[4]]]; */

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };


  // &*************************************&
  //     _.without
  // &*************************************&

  /**_.without(array, *values) 
      Returns a copy of the array with all instances of the values removed.

      _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
      => [2, 3, 4] */

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArgs(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });


  // &*************************************&
  //     _.uniq
  // &*************************************&

  /**_.uniq(array, [isSorted], [iteratee]) Alias: unique 
      Produces a duplicate-free version of the array, using === to test object equality. In particular only the first occurence of each value is kept. If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iteratee function.

      _.uniq([1, 2, 1, 4, 1, 3]);
      => [1, 2, 4, 3] */

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };


  // &*************************************&
  //     _.union
  // &*************************************&

  /**_.union(*arrays) 
      Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.

      _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
      => [1, 2, 3, 101, 10] */

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArgs(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });


  // &*************************************&
  //     _.intersection
  // &*************************************&

  /**_.intersection(*arrays) 
      Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.

      _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
      => [1, 2] */

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };


  // &*************************************&
  //     _.difference
  // &*************************************&

  /**_.difference(array, *others) 
      Similar to without, but returns the values from array that are not present in the other arrays.

      _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
      => [1, 3, 4] */

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArgs(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });


  // &*************************************&
  //     _.unzip
  // &*************************************&

  /**_.unzip(array) 
      The opposite of zip. Given an array of arrays, returns a series of new arrays, the first of which contains all of the first elements in the input arrays, the second of which contains all of the second elements, and so on.

      _.unzip([["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]);
      => [['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]] */

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };


  // &*************************************&
  //     _.zip
  // &*************************************&

  /**_.zip(*arrays) 
      Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. Use with apply to pass in an array of arrays. If you're working with a matrix of nested arrays, this can be used to transpose the matrix.

      _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
      => [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]] */

        // Zip together multiple lists into a single array -- elements that share
        // an index go together.

  _.zip = restArgs(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };


  // &*************************************&
  //     Helper function
  // &*************************************&

  /**Generator function to create the findIndex and findLastIndex functions.*/

  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };


  // &*************************************&
  //     _.findIndex/findLastIndex
  // &*************************************&

  /**_.findIndex(array, predicate, [context]) 
      Similar to _.indexOf, returns the first index where the predicate truth test passes; otherwise returns -1.

      _.findIndex([4, 6, 8, 12], isPrime);
      => -1 // not found
      _.findIndex([4, 6, 7, 12], isPrime);
      => 2 
      
     _.findLastIndex(array, predicate, [context]) 
        Like _.findIndex but iterates the array in reverse, returning the index closest to the end where the predicate truth test passes.

        var users = [{'id': 1, 'name': 'Bob', 'last': 'Brown'},
                    {'id': 2, 'name': 'Ted', 'last': 'White'},
                    {'id': 3, 'name': 'Frank', 'last': 'James'},
                    {'id': 4, 'name': 'Ted', 'last': 'Jones'}];
        _.findLastIndex(users, {
          name: 'Ted'
      });
      => 3 */

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);


  // &*************************************&
  //     _.sortedIndex
  // &*************************************&

  /**_.sortedIndex(list, value, [iteratee], [context]) 
      Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order. If an iteratee function is provided, it will be used to compute the sort ranking of each value, including the value you pass. The iteratee may also be the string name of the property to sort by (eg. length).

      _.sortedIndex([10, 20, 30, 40, 50], 35);
      => 3

      var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
      _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');
      => 1 */

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };


  // &*************************************&
  //     Helper Function
  // &*************************************&

  /**Generator function to create the indexOf and lastIndexOf functions. */

  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };


  // &*************************************&
  //     _.indexOf/lastIndexOf
  // &*************************************&


  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.

  /**.indexOf(array, value, [isSorted]) 
      Returns the index at which value can be found in the array, or -1 if value is not present in the array. If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number as the third argument in order to look for the first matching value in the array after the given index.

      _.indexOf([1, 2, 3], 2);
      => 1 */

  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);

  /**_.lastIndexOf(array, value, [fromIndex]) 
      Returns the index of the last occurrence of value in the array, or -1 if value is not present. Pass fromIndex to start your search at a given index.

      _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
      => 4 */

  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Split an **array** into several arrays containing **count** or less elements
  // of initial array.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];

    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };






  // =======================================================================
  // ====================== Function Functions =============================
  // =======================================================================






  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };


  // &*************************************&
  //     _.bind
  // &*************************************&

  /**_.bind(function, object, *arguments) 
      Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. Optionally, pass arguments to the function to pre-fill them, also known as partial application. For partial application without context binding, use partial.

      var func = function(greeting){ return greeting + ': ' + this.name };
      func = _.bind(func, {name: 'moe'}, 'hi');
      func();
      => 'hi: moe' */

  
  _.bind = restArgs(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArgs(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });


  // &*************************************&
  //     _.partial
  // &*************************************&

  /**_.partial(function, *arguments) 
      Partially apply a function by filling in any number of its arguments, without changing its dynamic this value. A close cousin of bind. You may pass _ in your list of arguments to specify an argument that should not be pre-filled, but left open to supply at call-time.

      var subtract = function(a, b) { return b - a; };
      sub5 = _.partial(subtract, 5);
      sub5(20);
      => 15

      // Using a placeholder
      subFrom20 = _.partial(subtract, _, 20);
      subFrom20(5);
      => 15 */

  _.partial = restArgs(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;


  // &*************************************&
  //     _.bindAll
  // &*************************************&

  /**_.bindAll(object, *methodNames) 
      Binds a number of methods on the object, specified by methodNames, to be run in the context of that object whenever they are invoked. Very handy for binding functions that are going to be used as event handlers, which would otherwise be invoked with a fairly useless this. methodNames are required.

      var buttonView = {
        label  : 'underscore',
        onClick: function(){ alert('clicked: ' + this.label); },
        onHover: function(){ console.log('hovering: ' + this.label); }
      };
      _.bindAll(buttonView, 'onClick', 'onHover');
      // When the button is clicked, this.label will have the correct value.
      jQuery('#underscore_button').on('click', buttonView.onClick); */


  _.bindAll = restArgs(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });


  // &*************************************&
  //     _.memoize
  // &*************************************&

  /**_.memoize(function, [hashFunction]) 
      Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to the original function. The default hashFunction just uses the first argument to the memoized function as the key. The cache of memoized values is available as the cache property on the returned function.

      var fibonacci = _.memoize(function(n) {
        return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
      }); */

  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };


  // &*************************************&
  //     _.delay
  // &*************************************&

  /**_.delay(function, wait, *arguments) 
      Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments, they will be forwarded on to the function when it is invoked.

      var log = _.bind(console.log, console);
      _.delay(log, 1000, 'logged later');
      => 'logged later' // Appears after one second. */

 
  _.delay = restArgs(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });


  // &*************************************&
  //     _.defer
  // &*************************************&

  /**_.defer(function, *arguments) 
      Defers invoking the function until the current call stack has cleared, similar to using setTimeout with a delay of 0. Useful for performing expensive computations or HTML rendering in chunks without blocking the UI thread from updating. If you pass the optional arguments, they will be forwarded on to the function when it is invoked.

      _.defer(function(){ alert('deferred'); });
      // Returns from the function before the alert runs. */

  
  _.defer = _.partial(_.delay, _, 1);


  // &*************************************&
  //     _.throttle
  // &*************************************&

  /**_.throttle(function, wait, [options]) 
      Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds. Useful for rate-limiting events that occur faster than you can keep up with.

      By default, throttle will execute the function as soon as you call it for the first time, and, if you call it again any number of times during the wait period, as soon as that period is over. If you'd like to disable the leading-edge call, pass {leading: false}, and if you'd like to disable the execution on the trailing-edge, pass 
      {trailing: false}.

      var throttled = _.throttle(updatePosition, 100);
      $(window).scroll(throttled); */


  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };


  // &*************************************&
  //     _.debounce
  // &*************************************&

  /**_.debounce(function, wait, [immediate]) 
      Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed since the last time it was invoked. Useful for implementing behavior that should only happen after the input has stopped arriving. For example: rendering a preview of a Markdown comment, recalculating a layout after the window has stopped being resized, and so on.

      At the end of the wait interval, the function will be called with the arguments that were passed most recently to the debounced function.

      Pass true for the immediate argument to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a "submit" button from firing a second time.

      var lazyLayout = _.debounce(calculateLayout, 300);
      $(window).resize(lazyLayout); */

  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };


  // &*************************************&
  //     _.wrap
  // &*************************************&

  /**_.wrap(function, wrapper) 
      Wraps the first function inside of the wrapper function, passing it as the first argument. This allows the wrapper to execute code before and after the function runs, adjust the arguments, and execute it conditionally.

      var hello = function(name) { return "hello: " + name; };
      hello = _.wrap(hello, function(func) {
        return "before, " + func("moe") + ", after";
      });
      hello();
      => 'before, hello: moe, after' */

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };


  // &*************************************&
  //     _.negate
  // &*************************************&

  /**_.negate(predicate) 
      Returns a new negated version of the predicate function.

      var isFalsy = _.negate(Boolean);
      _.find([-2, -1, 0, 1, 2], isFalsy);
      => 0 */

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };


  // &*************************************&
  //     _.compose
  // &*************************************&

  /**_.compose(*functions) 
      Returns the composition of a list of functions, where each function consumes the return value of the function that follows. In math terms, composing the functions f(), g(), and h() produces f(g(h())).

      var greet    = function(name){ return "hi: " + name; };
      var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };
      var welcome = _.compose(greet, exclaim);
      welcome('moe');
      => 'hi: MOE!' */

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };


  // &*************************************&
  //     _.after
  // &*************************************&

  /**_.after(count, function) 
      Creates a version of the function that will only be run after being called count times. Useful for grouping asynchronous responses, where you want to be sure that all the async calls have finished, before proceeding.

      var renderNotes = _.after(notes.length, render);
      _.each(notes, function(note) {
        note.asyncSave({success: renderNotes});
      });
      // renderNotes is run once, after all notes have saved. */

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };


  // &*************************************&
  //     _.before
  // &*************************************&

  /**_.before(count, function) 
      Creates a version of the function that can be called no more than count times. The result of the last function call is memoized and returned when count has been reached.

      var monthlyMeeting = _.before(3, askForRaise);
      monthlyMeeting();
      monthlyMeeting();
      monthlyMeeting();
      // the result of any subsequent calls is the same as the second call */

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };


  // &*************************************&
  //     _.once
  // &*************************************&

  /**_.once(function) 
      Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.

      var initialize = _.once(createApplication);
      initialize();
      initialize();
      // Application is only created once. */

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArgs = restArgs;






  // =======================================================================
  // ====================== Function Functions =============================
  // =======================================================================






  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };


  // &*************************************&
  //     _.keys
  // &*************************************&

  /**.keys(object) 
      Retrieve all the names of the object's own enumerable properties.

      _.keys({one: 1, two: 2, three: 3});
      => ["one", "two", "three"] */

  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };


  // &*************************************&
  //     _.allKeys
  // &*************************************&

  /**_.allKeys(object) 
      Retrieve all the names of object's own and inherited properties.

      function Stooge(name) {
        this.name = name;
      }
      Stooge.prototype.silly = true;
      _.allKeys(new Stooge("Moe"));
      => ["name", "silly"] */

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };


  // &*************************************&
  //     _.values
  // &*************************************&

  /**_.values(object) 
      Return all of the values of the object's own properties.

      _.values({one: 1, two: 2, three: 3});
      => [1, 2, 3] */

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };


  // &*************************************&
  //     _.mapObject
  // &*************************************&

  /**_.mapObject(object, iteratee, [context]) 
      Like map, but for objects. Transform the value of each property in turn.

      _.mapObject({start: 5, end: 12}, function(val, key) {
        return val + 5;
      });
      => {start: 10, end: 17} */

  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };


  // &*************************************&
  //     _.pairs
  // &*************************************&

  /**_.pairs(object) 
      Convert an object into a list of [key, value] pairs.

      _.pairs({one: 1, two: 2, three: 3});
      => [["one", 1], ["two", 2], ["three", 3]] */

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };


  // &*************************************&
  //     _.invert
  // &*************************************&

  /**_.invert(object) 
      Returns a copy of the object where the keys have become the values and the values the keys. For this to work, all of your object's values should be unique and string serializable.

      _.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
      => {Moses: "Moe", Louis: "Larry", Jerome: "Curly"}; */

  //The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // &*************************************&
  //     _.functions
  // &*************************************&

  /**_.functions(object) Alias: methods 
      Returns a sorted list of the names of every method in an object — that is to say, the name of every function property of the object.

      _.functions(_);
      => ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...; */

  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };



  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };


  // &*************************************&
  //     _.extend
  // &*************************************&

  /**_.extend(destination, *sources) 
      Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. Any nested objects or arrays will be copied by reference, not duplicated. It's in-order, so the last source will override properties of the same name in previous arguments.

      _.extend({name: 'moe'}, {age: 50});
      => {name: 'moe', age: 50} */

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);


  // &*************************************&
  //     _.extendOwn
  // &*************************************&

  /**_.extendOwn(destination, *sources) Alias: assign 
      Like extend, but only copies own properties over to the destination object. */

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);


  // &*************************************&
  //     _.findKey
  // &*************************************&

  /**_.findKey(object, predicate, [context]) 
      Similar to _.findIndex but for keys in objects. Returns the key where the predicate truth test passes or undefined. */

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };


  // &*************************************&
  //     _.pick
  // &*************************************&

  /**_.pick(object, *keys) 
      Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys). Alternatively accepts a predicate indicating which keys to pick.

      _.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age');
      => {name: 'moe', age: 50}
      _.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
        return _.isNumber(value);
      });
      => {age: 50} */

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArgs(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });


  // &*************************************&
  //     _.omit
  // &*************************************&

  /**_.omit(object, *keys) 
      Return a copy of the object, filtered to omit the blacklisted keys (or array of keys). Alternatively accepts a predicate indicating which keys to omit.

      _.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid');
      => {name: 'moe', age: 50}
      _.omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
        return _.isNumber(value);
      });
      => {name: 'moe', userid: 'moe1'} */

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArgs(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });


  // &*************************************&
  //     _.defaults
  // &*************************************&

  /**_.defaults(object, *defaults) 
      Fill in undefined properties in object with the first value present in the following list of defaults objects.

      var iceCream = {flavor: "chocolate"};
      _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
      => {flavor: "chocolate", sprinkles: "lots"} */

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);


  // &*************************************&
  //     _.
  // &*************************************&

  /** */

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };


  // &*************************************&
  //     _.clone
  // &*************************************&

  /**_.clone(object) 
      Create a shallow-copied clone of the provided plain object. Any nested objects or arrays will be copied by reference, not duplicated.

      _.clone({name: 'moe'});
      => {name: 'moe'}; */

  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };


  // &*************************************&
  //     _.tap
  // &*************************************&

  /**.tap(object, interceptor) 
      Invokes interceptor with the object, and then returns object. The primary purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

      _.chain([1,2,3,200])
        .filter(function(num) { return num % 2 == 0; })
        .tap(alert)
        .map(function(num) { return num * num })
        .value();
      => // [2, 200] (alerted)
      => [4, 40000] */

  
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };


  // &*************************************&
  //     _.isMatch
  // &*************************************&

  /**_.isMatch(object, properties) 
      Tells you if the keys and values in properties are contained in object.

      var stooge = {name: 'moe', age: 32};
      _.isMatch(stooge, {age: 32});
      => true */

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };


  // &*************************************&
  //     _.isEqual
  // &*************************************&

  /**.isEqual(object, other) 
      Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.

      var stooge = {name: 'moe', luckyNumbers: [13, 27, 34]};
      var clone  = {name: 'moe', luckyNumbers: [13, 27, 34]};
      stooge == clone;
      => false
      _.isEqual(stooge, clone);
      => true */

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };


  // &*************************************&
  //     _.isEmpty
  // &*************************************&

  /**_.isEmpty(object) 
      Returns true if an enumerable object contains no values (no enumerable own-properties). For strings and array-like objects _.isEmpty checks if the length property is 0.

      _.isEmpty([1, 2, 3]);
      => false
      _.isEmpty({});
      => true */

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };


  // &*************************************&
  //     _.isElement
  // &*************************************&

  /**_.isElement(object) 
      Returns true if object is a DOM element.

      _.isElement(jQuery('body')[0]);
      => true */

  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };


  // &*************************************&
  //     _.isArray
  // &*************************************&

  /**_.isArray(object) 
      Returns true if object is an Array.

      (function(){ return _.isArray(arguments); })();
      => false
      _.isArray([1,2,3]);
      => true */

  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };


  // &*************************************&
  //     _.isOBject
  // &*************************************&

  /**_.isObject(value) 
      Returns true if value is an Object. Note that JavaScript arrays and functions are objects, while (normal) strings and numbers are not.

      _.isObject({});
      => true
      _.isObject(1);
      => false */

  _.isObject = function(obj) {
    var type = typeof obj;
    //!!obj converts a non-boolean into an boolean and then boolean-inverts it - ie if obj exists, convert to false and then invert to true.
    return type === 'function' || type === 'object' && !!obj;
  };


  // &*************************************&
  //     _.???????????????
  // &*************************************&

  /** */

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }


  // &*************************************&
  //     _.isFinite
  // &*************************************&

  /**_.isFinite(object) 
      Returns true if object is a finite Number.

      _.isFinite(-101);
      => true

      _.isFinite(-Infinity);
      => false */

  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };


  // &*************************************&
  //     _.isNaN
  // &*************************************&

  /**.isNaN(object) 
      Returns true if object is NaN.
      Note: this is not the same as the native isNaN function, which will also return true for many other not-number values, such as undefined.

      _.isNaN(NaN);
      => true
      isNaN(undefined);
      => true
      _.isNaN(undefined);
      => false */

  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };


  // &*************************************&
  //     _.isBoolean
  // &*************************************&

  /**.isBoolean(object) 
      Returns true if object is either true or false.

      _.isBoolean(null);
      => false */

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };


  // &*************************************&
  //     _.isNull
  // &*************************************&

  /**_.isNull(object) 
      Returns true if the value of object is null.

      _.isNull(null);
      => true
      _.isNull(undefined);
      => false */

  _.isNull = function(obj) {
    return obj === null;
  };


  // &*************************************&
  //     _.isUndefined
  // &*************************************&

  /**_.isUndefined(value) 
      Returns true if value is undefined.

      _.isUndefined(window.missingVariable);
      => true */

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };


  // &*************************************&
  //     _.has
  // &*************************************&

  /**_.has(object, key) 
      Does the object contain the given key? Identical to object.hasOwnProperty(key), but uses a safe reference to the hasOwnProperty function, in case it's been overridden accidentally.

      _.has({a: 1, b: 2, c: 3}, "b");
      => true */

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return obj != null && hasOwnProperty.call(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  





  // =======================================================================
  // ====================== Utility Functions ==============================
  // =======================================================================







  // &*************************************&
  //     _.noConflict
  // &*************************************&

  /**.noConflict() 
      Give control of the _ variable back to its previous owner. Returns a reference to the Underscore object.

      var underscore = _.noConflict(); */

  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };


  // &*************************************&
  //     _.identity
  // &*************************************&

  /**_.identity(value) 
      Returns the same value that is used as the argument. In math: f(x) = x
      This function looks useless, but is used throughout Underscore as a default iteratee.

      var stooge = {name: 'moe'};
      stooge === _.identity(stooge);
      => true */

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };


  // &*************************************&
  //     _.constant
  // &*************************************&

  /**_.constant(value) 
      Creates a function that returns the same value that is used as the argument of _.constant.

      var stooge = {name: 'moe'};
      stooge === _.constant(stooge)();
      => true */

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };


  // &*************************************&
  //     _.noop
  // &*************************************&

  /**_.noop() 
      Returns undefined irrespective of the arguments passed to it. Useful as the default for optional callback arguments.

      obj.initialize = _.noop; */

  _.noop = function(){};

  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };


  // &*************************************&
  //     _.propertyOf
  // &*************************************&

  /** */

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };


  // &*************************************&
  //     _.times
  // &*************************************&

  /**_.times(n, iteratee, [context]) 
      Invokes the given iteratee function n times. Each invocation of iteratee is called with an index argument. Produces an array of the returned values. 
      Note: this example uses the object-oriented syntax.

      _(3).times(function(n){ genie.grantWishNumber(n); }); */


  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };


  // &*************************************&
  //     _.random
  // &*************************************&

  /**_.random(min, max) 
      Returns a random integer between min and max, inclusive. If you only pass one argument, it will return a number between 0 and that number.

      _.random(0, 100);
      => 42 */

  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };


  // &*************************************&
  //     _.now
  // &*************************************&

  /**.now() 
      Returns an integer timestamp for the current time, using the fastest method available in the runtime. Useful for implementing timing/animation functions.

      _.now();
      => 1392066795351 */

  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };



  // &*************************************&
  //     _.escape
  // &*************************************&

  /**_.escape(string) 
      Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.

      _.escape('Curly, Larry & Moe');
      => "Curly, Larry &amp; Moe" */

  _.escape = createEscaper(escapeMap);



  // &*************************************&
  //     _.unescape
  // &*************************************&

  /**_.unescape(string) 
      The opposite of escape, replaces &amp;, &lt;, &gt;, &quot;, &#96; and &#x27; with their unescaped counterparts.

      _.unescape('Curly, Larry &amp; Moe');
      => "Curly, Larry & Moe" */

  _.unescape = createEscaper(unescapeMap);


  // &*************************************&
  //     _.result
  // &*************************************&

  /**_.result(object, property, [defaultValue]) 
      If the value of the named property is a function then invoke it with the object as context; otherwise, return it. If a default value is provided and the property doesn't exist or is undefined then the default will be returned. If defaultValue is a function its result will be returned.

      var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
      _.result(object, 'cheese');
      => "crumpets"
      _.result(object, 'stuff');
      => "nonsense"
      _.result(object, 'meat', 'ham');
      => "ham" */


  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };



  // &*************************************&
  //     _.uniqueId
  // &*************************************&

  /**_.uniqueId([prefix]) 
      Generate a globally-unique id for client-side models or DOM elements that need one. If prefix is passed, the id will be appended to it.

      _.uniqueId('contact_');
      => 'contact_104' */


  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };


  // &*************************************&
  //     _.template
  // &*************************************&

  /**_.template(templateString, [settings]) 
      Compiles JavaScript templates into functions that can be evaluated for rendering. Useful for rendering complicated bits of HTML from JSON data sources. Template functions can both interpolate values, using <%= … %>, as well as execute arbitrary JavaScript code, with <% … %>. If you wish to interpolate a value, and have it be HTML-escaped, use <%- … %>. When you evaluate a template function, pass in a data object that has properties corresponding to the template's free variables. The settings argument should be a hash containing any _.templateSettings that should be overridden.

      var compiled = _.template("hello: <%= name %>");
      compiled({name: 'moe'});
      => "hello: moe"

      var template = _.template("<b><%- value %></b>");
      template({value: '<script>'});
      => "<b>&lt;script&gt;</b>"
      You can also use print from within JavaScript code. This is sometimes more convenient than using <%= ... %>.

      var compiled = _.template("<% print('Hello ' + epithet); %>");
      compiled({epithet: "stooge"});
      => "Hello stooge" */

  //see more extensive documentation at http://underscorejs.org/#template


  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };



  // &*************************************&
  //     _.chain
  // &*************************************&

    /**Calling chain will cause all future method calls to return wrapped objects. When you've finished the computation, call value to retrieve the final value. Here's an example of chaining together a map/flatten/reduce, in order to get the word count of every word in a song.

      var lyrics = [
        {line: 1, words: "I'm a lumberjack and I'm okay"},
        {line: 2, words: "I sleep all night and I work all day"},
        {line: 3, words: "He's a lumberjack and he's okay"},
        {line: 4, words: "He sleeps all night and he works all day"}
      ];

      _.chain(lyrics)
        .map(function(line) { return line.words.split(' '); })
        .flatten()
        .reduce(function(counts, word) {
          counts[word] = (counts[word] || 0) + 1;
          return counts;
        }, {})
        .value();

      => {lumberjack: 2, all: 4, night: 2 ... } */


  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };





  // =======================================================================
  // ====================== OOP ============================================
  // =======================================================================

      /**You can use Underscore in either an object-oriented or a functional style, depending on your preference. The following two lines of code are identical ways to double a list of numbers.

    _.map([1, 2, 3], function(n){ return n * 2; });
    _([1, 2, 3]).map(function(n){ return n * 2; }); */




  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };


  // &*************************************&
  //     _.mixin
  // &*************************************&

  /**_.mixin(object) 
      Allows you to extend Underscore with your own utility functions. Pass a hash of {name: function} definitions to have your functions added to the Underscore object, as well as the OOP wrapper.

      _.mixin({
        capitalize: function(string) {
          return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
        }
      });
      _("fabio").capitalize();
      => "Fabio" */


  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define == 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }

}());
