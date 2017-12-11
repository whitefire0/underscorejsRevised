// Create a safe reference to the Underscore object for use below.
var _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

// All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
  nativeKeys = Object.keys,
  nativeCreate = Object.create;

/** Test data types */

_.simpleNumberArray = [1, 2, 3]
_.simpleStringArray = ['this', 'is', 'a', 'test', 'array', 'of', 'strings'];
_.simpleNestedNumberArray = [[1], [2], [3], [4]];
_.complexNestedArray = [[{cars: 'go vroom vroom', cats: 'go meow meow fuck you human'}], ['types of cat', ['twat', 'twat', 'twat']]];
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

/** Test Functions */

_.printedIteratee = function printedIteratee (element, index, array){
  console.log('Element: ' + element);
  console.log('Index: ' + index);
  console.log('Array: ' + array);
};

_.speak = function speak (element) {
  console.log(element);
}




// Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.

  //where 'context' = 'this' object pointer
  // 'optimizeCallback'
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

  //shallowProperty is a helper function with multiple uses:
  //Case 1: isArrayLike(obj) => getLength = shallowProperty('length') => getLength(collection /**where collection is array */), in this case key param = 'length'
  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  //math.pow(base, exponent)
  //changed exponent to be 32 due to changes in ECMA2017
  // https://github.com/jashkenas/underscore/pull/2703
  var MAX_ARRAY_INDEX = Math.pow(2, 32) - 1;
  var getLength = shallowProperty('length');
  //isArrayLike is a function that takes another function
  var isArrayLike = function(collection) {
    //inside that function, getLength already has 'key' defined, and then collection param is passed into the return function inside getLength (function(obj))
    var length = getLength(collection);
    //returns true if 3 conditions for determining an array are true
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
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
        return type === 'function' || type === 'object' && !!obj;
      };

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
 
  _.each = _.forEach = function(obj, iteratee, context) {
    //iteratee is bound to the context object if one is passed
    //iteratee now stores a function: interatee.apply(context, arguments)
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    //if obj is array, or array-like objects (arguments, node lists)
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        //each iteratee is clled with three arguments (element, index, list)
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
