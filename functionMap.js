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

 // Concepts that need researching
 /** js: 2445: if (typeof /./ != 'function' &&...  this isn't written anywhere else in the library, is it a reg exp?
  * js 2056, predicate = cb(predicate, context); optimises callback cb itself uses multiple functions that need to be understood before 'optimises' can be understood.
  * js: 1334: 'createIndexFinder - as of 19/12/2017 was almost completely indecipherable. Not sure on var idx default value as 0 (not passed in with example test parameters). Without knowing context of idx it is difficult/impossible to understand the conditionals within createIndexFinder.
  * js: 552 (_.contains) is highly dependent on _.indexOf (js: 1335) and so is indecipherable without understanding its above helper function.
 */


(function() {
  
    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.

    // &~~~~~~~~~~~~~~~~~~~~~&
    //       optimizecB
    // &~~~~~~~~~~~~~~~~~~~~~&

    /**USES:
       * ~None~
       */
  
      /**USED BY:
     * _.each
     * _.map
     */
 
  
    var builtinIteratee;

    // &~~~~~~~~~~~~~~~~~~~~~&
    //       cb
    // &~~~~~~~~~~~~~~~~~~~~~&

    /**USES:
       * _.iteratee
       * _.isFunction
       * _.isObject
       * _.isArray
       * _.matcher
       * _.property
       */
  
    // An internal function to generate callbacks that can be applied to each
    // element in a collection, returning the desired result — either `identity`,
    // an arbitrary callback, a property matcher, or a property accessor.
  
    //uses a series of if(condition) return func statements (like a flexible switch?)

      /**USED BY:
       * _.each
       * _.map
       */
    

    // &~~~~~~~~~~~~~~~~~~~~~&
    //       restArgs
    // &~~~~~~~~~~~~~~~~~~~~~&
  
    // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
    // This accumulates the arguments passed into an array, after a given index.

      /**USED BY:
       * 
       */
    

    // &~~~~~~~~~~~~~~~~~~~~~&
    //       baseCreate
    // &~~~~~~~~~~~~~~~~~~~~~&
  
    // An internal function for creating a new object that inherits from another.

    /**USES:
       * _.isObject
       * nativeCreate
       * new Ctor
       */
  
    
    // &~~~~~~~~~~~~~~~~~~~~~&
    //       shallowProperty
    // &~~~~~~~~~~~~~~~~~~~~~&

    //shallowProperty is a helper function with multiple uses:
    //Case 1: isArrayLike(obj) => getLength = shallowProperty('length') => getLength(collection /**where collection is array */), in this case key param = 'length'

      /**USED BY:
       * isArrayLike
       */

       /**INDIRECTLY USED BY: (via isArrayLike)
       * _.each
       * _.map
       * _.reduce & _.reduceRight
       * _.find
       */
    
    // &~~~~~~~~~~~~~~~~~~~~~&
    //       deepGet
    // &~~~~~~~~~~~~~~~~~~~~~&
  
    
    // &~~~~~~~~~~~~~~~~~~~~~&
    //       isArrayLike
    // &~~~~~~~~~~~~~~~~~~~~~&

      /**USED BY:
       * _.each
       * _.map
       * _.reduce & _.reduceRight
       * _.find
       */
   
  
  
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
  
    /*

    /**USES:
     * optimiseCb
     * isArrayLike
     * _.keys
     */
  
  
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
  
    /**USES:
     * optimiseCb
     * isArrayLike
     * _.keys
     */
  
  
    // &*************************************&
    //   _.createReduce
    // &*************************************&
  
  
    /**_.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl 
        Also known as inject and foldl, reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.
  
        If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.
  
        var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
        => 6*/

        /**USES:
       * optimiseCb
       * isArrayLike
       * _.keys
       */
  
    
  
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
  
      /**USES:
     * isArrayLike
     * _.keys
     */
  
  
    // &*************************************&
    //     _.filter
    // &*************************************&
  
  
    /**.filter(list, predicate, [context]) Alias: select 
        Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
  
        var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
        => [2, 4, 6] */
  
  
    // &*************************************&
    //     _.reject
    // &*************************************&
  
    /**_.reject(list, predicate, [context]) 
        Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.
  
        var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
        => [1, 3, 5]
        
        STACKFLOW
        _.reject takes initial user defined predicate, stores a wrapped and negated version of this function, passes this to _.filter which calls _.each on each element of the predicate (referred to under the name of iteratee) - when called the engine goes back to _.filter and invokes the negated predicate. If this returns true, the value is stored in a results array.
  
        _.reject(obj, userPredicate, context) 
        
        */

  
    // &*************************************&
    //     _.every
    // &*************************************&
  
    /**_.every(list, [predicate], [context]) Alias: all 
        Returns true if all of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a false element is found.
  
        _.every([2, 4, 5], function(num) { return num % 2 == 0; });
        => false*/
  
  
    // &*************************************&
    //     _.some (opposite of every)
    // &*************************************&
  
    /**_.some(list, [predicate], [context]) Alias: any 
        Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found.
  
        _.some([null, 0, 'yes', false]);
        => true */
  
    
  
  
    // &*************************************&
    //     _.contains
    // &*************************************&
  
  
    /**_.contains(list, value, [fromIndex]) Alias: includes 
        Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.
  
        _.contains([1, 2, 3], 3);
        => true */
  
  
  
    // &*************************************&
    //     _.invoke
    // &*************************************&
  
  
    /**invoke_.invoke(list, methodName, *arguments) 
      Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.
  
      _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
      => [[1, 5, 7], [1, 2, 3]] */
  
  
  
    
    // &*************************************&
    //     _.pluck
    // &*************************************&
  
  
    /**_.pluck(list, propertyName) 
        A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.
  
        var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
        _.pluck(stooges, 'name');
        => ["moe", "larry", "curly"] */
  
    // Convenience version of a common use case of `map`: fetching a property.
    

    // &*************************************&
    //     _.where
    // &*************************************&
  
    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    
    // &*************************************&
    //     _.findWhere
    // &*************************************&
  
    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    
  
  
    // &*************************************&
    //     _.max
    // &*************************************&
  
    /**_.max(list, [iteratee], [context]) 
        Returns the maximum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. -Infinity is returned if list is empty, so an isEmpty guard may be required. Non-numerical values in list will be ignored.
  
        var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
        _.max(stooges, function(stooge){ return stooge.age; });
        => {name: 'curly', age: 60}; */
  
    
  
  
    // &*************************************&
    //     _.min
    // &*************************************&
  
    /**.min(list, [iteratee], [context]) 
        Returns the minimum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. Infinity is returned if list is empty, so an isEmpty guard may be required. Non-numerical values in list will be ignored.
  
        var numbers = [10, 5, 100, 2, 1000];
        _.min(numbers);
        => 2 */
  
    
  
  
    // &*************************************&
    //     _.shuffle
    // &*************************************&
  
    /**_.shuffle(list) 
        Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
  
        _.shuffle([1, 2, 3, 4, 5, 6]);
        => [4, 1, 6, 3, 5, 2] */
  
    
  
  
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
  
    
  
    // &**************************&
    //  group (helper functions)
    // &**************************&
  
    // An internal function used for aggregate "group by" operations.
    
  
  
    // &*************************************&
    //     _.groupBy
    // &*************************************&
  
    /**_.groupBy(list, iteratee, [context]) 
        Splits a collection into sets, grouped by the result of running each value through iteratee. If iteratee is a string instead of a function, groups by the property named by iteratee on each of the values.
  
        _.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });
        => {1: [1.3], 2: [2.1, 2.4]}
  
        _.groupBy(['one', 'two', 'three'], 'length');
        => {3: ["one", "two"], 5: ["three"]} */
  
  
  
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
  
    
  
  
    // &*************************************&
    //     _.countBy
    // &*************************************&
  
    /**_.countBy(list, iteratee, [context]) 
        Sorts a list into groups and returns a count for the number of objects in each group. Similar to groupBy, but instead of returning a list of values, returns a count for the number of values in that group.
  
        _.countBy([1, 2, 3, 4, 5], function(num) {
          return num % 2 == 0 ? 'even': 'odd';
        });
        => {odd: 3, even: 2} */
  
    
  
  
    // &*************************************&
    //     _.toArray
    // &*************************************&
  
    /**_.toArray(list) 
        Creates a real Array from the list (anything that can be iterated over). Useful for transmuting the arguments object.
  
        (function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
        => [2, 3, 4] */
  
    
  
  
    // &*************************************&
    //     _.size
    // &*************************************&
  
    /**_.size(list) 
        Return the number of values in the list.
  
        _.size({one: 1, two: 2, three: 3});
        => 3 */
  
    
  
  
    // &*************************************&
    //     _.partition
    // &*************************************&
  
    /**_.partition(array, predicate) 
        Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.
  
        _.partition([0, 1, 2, 3, 4, 5], isOdd);
        => [[1, 3, 5], [0, 2, 4]] */
  
  
  
  
  
  
  
  
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
  
    
  
  
    // &*************************************&
    //     _.inital
    // &*************************************&
  
  
    /**_.initial(array, [n]) 
        Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
  
        _.initial([5, 4, 3, 2, 1]);
        => [5, 4, 3, 2] */
  
  
  
    // &*************************************&
    //     _.last
    // &*************************************&
  
    /**_.last(array, [n]) 
        Returns the last element of an array. Passing n will return the last n elements of the array.
  
        _.last([5, 4, 3, 2, 1]);
        => 1 */
  
  
  
    // &*************************************&
    //     _.rest
    // &*************************************&
  
    /**_.rest(array, [index]) Aliases: tail, drop 
      Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
  
      _.rest([5, 4, 3, 2, 1]);
      => [4, 3, 2, 1] */
  
  
    // &*************************************&
    //     _.compact
    // &*************************************&
  
    /**_.compact(array) 
        Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
  
        _.compact([0, 1, false, 2, '', 3]);
        => [1, 2, 3] */
  
  
    // &*************************************&
    //     _.flatten
    // &*************************************&
  
    /**_.flatten(array, [shallow]) 
        Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
  
        _.flatten([1, [2], [3, [[4]]]]);
        => [1, 2, 3, 4];
  
        _.flatten([1, [2], [3, [[4]]]], true);
        => [1, 2, 3, [[4]]]; */
  

  
  
    // &*************************************&
    //     _.without
    // &*************************************&
  
    /**_.without(array, *values) 
        Returns a copy of the array with all instances of the values removed.
  
        _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
        => [2, 3, 4] */
  
  
  
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
    
  
  
    // &*************************************&
    //     _.union
    // &*************************************&
  
    /**_.union(*arrays) 
        Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
  
        _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
        => [1, 2, 3, 101, 10] */
  
    
  
  
    // &*************************************&
    //     _.intersection
    // &*************************************&
  
    /**_.intersection(*arrays) 
        Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.
  
        _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
        => [1, 2] */
  
  
  
    // &*************************************&
    //     _.difference
    // &*************************************&
  
    /**_.difference(array, *others) 
        Similar to without, but returns the values from array that are not present in the other arrays.
  
        _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
        => [1, 3, 4] */
  
  
  
    // &*************************************&
    //     _.unzip
    // &*************************************&
  
    /**_.unzip(array) 
        The opposite of zip. Given an array of arrays, returns a series of new arrays, the first of which contains all of the first elements in the input arrays, the second of which contains all of the second elements, and so on.
  
        _.unzip([["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]);
        => [['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]] */
  
  
  
    // &*************************************&
    //     _.zip
    // &*************************************&
  
    /**_.zip(*arrays) 
        Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. Use with apply to pass in an array of arrays. If you're working with a matrix of nested arrays, this can be used to transpose the matrix.
  
        _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
        => [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]] */
  
          // Zip together multiple lists into a single array -- elements that share
          // an index go together.
  
    
  
  
    // &*************************************&
    //     createPredicateIndexFinder
    // &*************************************&
  
    /**Generator function to create the findIndex and findLastIndex functions.*/
  
    
  
  
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
  
  
    // &*************************************&
    //     createIndexFinder
    // &*************************************&
  
    /**Generator function to create the indexOf and lastIndexOf functions. */
  
  
  
  
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
    // [the Python documentation](http://docs.python.org/library/functions.html#range

    // &*************************************&
    //     _.range
    // &*************************************&


    // &*************************************&
    //     _.chunk
    // &*************************************&
  
    // Split an **array** into several arrays containing **count** or less elements
    // of initial array.
    
  
  
  
  
  
    // =======================================================================
    // ====================== Function Functions =============================
    // =======================================================================
  
    // &*************************************&
    //     executeBound
    // &*************************************&
  
    // Determines whether to execute a function as a constructor
    // or a normal function with the provided arguments.
    
  
  
    // &*************************************&
    //     _.bind
    // &*************************************&
  
    /**_.bind(function, object, *arguments) 
        Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. Optionally, pass arguments to the function to pre-fill them, also known as partial application. For partial application without context binding, use partial.
  
        var func = function(greeting){ return greeting + ': ' + this.name };
        func = _.bind(func, {name: 'moe'}, 'hi');
        func();
        => 'hi: moe' */
  
  
  
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
  
  
  
    // &*************************************&
    //     _.memoize
    // &*************************************&
  
    /**_.memoize(function, [hashFunction]) 
        Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to the original function. The default hashFunction just uses the first argument to the memoized function as the key. The cache of memoized values is available as the cache property on the returned function.
  
        var fibonacci = _.memoize(function(n) {
          return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
        }); */
  
  
  
    // &*************************************&
    //     _.delay
    // &*************************************&
  
    /**_.delay(function, wait, *arguments) 
        Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments, they will be forwarded on to the function when it is invoked.
  
        var log = _.bind(console.log, console);
        _.delay(log, 1000, 'logged later');
        => 'logged later' // Appears after one second. */
  
  
  
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
  
  
  
  
    // &*************************************&
    //     _.debounce
    // &*************************************&
  
    /**_.debounce(function, wait, [immediate]) 
        Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed since the last time it was invoked. Useful for implementing behavior that should only happen after the input has stopped arriving. For example: rendering a preview of a Markdown comment, recalculating a layout after the window has stopped being resized, and so on.
  
        At the end of the wait interval, the function will be called with the arguments that were passed most recently to the debounced function.
  
        Pass true for the immediate argument to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a "submit" button from firing a second time.
  
        var lazyLayout = _.debounce(calculateLayout, 300);
        $(window).resize(lazyLayout); */
  
  
  
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
  
  
  
    // &*************************************&
    //     _.negate
    // &*************************************&
  
    /**_.negate(predicate) 
        Returns a new negated version of the predicate function.
  
        var isFalsy = _.negate(Boolean);
        _.find([-2, -1, 0, 1, 2], isFalsy);
        => 0 
        
        */

  
  
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
  
  
    // &*************************************&
    //     collectNonEnumProps
    // &*************************************&
  
  
    // &*************************************&
    //     _.keys
    // &*************************************&
  
    /**.keys(object) 
        Retrieve all the names of the object's own enumerable properties.
  
        _.keys({one: 1, two: 2, three: 3});
        => ["one", "two", "three"] */
  
        /**USED BY:
       * _.each
       */
  
  
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
  
    
  
  
    // &*************************************&
    //     _.values
    // &*************************************&
  
    /**_.values(object) 
        Return all of the values of the object's own properties.
  
        _.values({one: 1, two: 2, three: 3});
        => [1, 2, 3] */
  
  
  
  
    // &*************************************&
    //     _.mapObject
    // &*************************************&
  
    /**_.mapObject(object, iteratee, [context]) 
        Like map, but for objects. Transform the value of each property in turn.
  
        _.mapObject({start: 5, end: 12}, function(val, key) {
          return val + 5;
        });
        => {start: 10, end: 17} */
  
    
  
  
    // &*************************************&
    //     _.pairs
    // &*************************************&
  
    /**_.pairs(object) 
        Convert an object into a list of [key, value] pairs.
  
        _.pairs({one: 1, two: 2, three: 3});
        => [["one", 1], ["two", 2], ["three", 3]] */
  
    
  
  
    // &*************************************&
    //     _.invert
    // &*************************************&
  
    /**_.invert(object) 
        Returns a copy of the object where the keys have become the values and the values the keys. For this to work, all of your object's values should be unique and string serializable.
  
        _.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
        => {Moses: "Moe", Louis: "Larry", Jerome: "Curly"}; */
  
    
  
    // &*************************************&
    //     _.functions
    // &*************************************&
  
    /**_.functions(object) Alias: methods 
        Returns a sorted list of the names of every method in an object — that is to say, the name of every function property of the object.
  
        _.functions(_);
        => ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...; */


    // &*************************************&
    //     createAssigner
    // &*************************************&
  
  
    // An internal function for creating assigner functions.
    
  
  
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
  
    // &*************************************&
    //     keyInObj
    // &*************************************&
  
   
  
  
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
    //     _.create
    // &*************************************&
  
  
  
    // &*************************************&
    //     _.clone
    // &*************************************&
  
    /**_.clone(object) 
        Create a shallow-copied clone of the provided plain object. Any nested objects or arrays will be copied by reference, not duplicated.
  
        _.clone({name: 'moe'});
        => {name: 'moe'}; */

  
  
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

  
  
    // &*************************************&
    //     _.isMatch
    // &*************************************&
  
    /**_.isMatch(object, properties) 
        Tells you if the keys and values in properties are contained in object.
  
        var stooge = {name: 'moe', age: 32};
        _.isMatch(stooge, {age: 32});
        => true */
  
    // Returns whether an object has a given set of `key:value` pairs.
  
  
    // &*************************************&
    //     eq
    // &*************************************&

    // Internal recursive comparison function for `isEqual`.
    

    // &*************************************&
    //     deepEq
    // &*************************************&
  
  
  
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
  
  
  
    // &*************************************&
    //     _.isEmpty
    // &*************************************&
  
    /**_.isEmpty(object) 
        Returns true if an enumerable object contains no values (no enumerable own-properties). For strings and array-like objects _.isEmpty checks if the length property is 0.
  
        _.isEmpty([1, 2, 3]);
        => false
        _.isEmpty({});
        => true */
  
  
  
    // &*************************************&
    //     _.isElement
    // &*************************************&
  
    /**_.isElement(object) 
        Returns true if object is a DOM element.
  
        _.isElement(jQuery('body')[0]);
        => true */
  
  
  
    // &*************************************&
    //     _.isArray
    // &*************************************&
  
    /**_.isArray(object) 
        Returns true if object is an Array.
  
        (function(){ return _.isArray(arguments); })();
        => false
        _.isArray([1,2,3]);
        => true */
  

  
    // &*************************************&
    //     _.isOBject
    // &*************************************&
  
    /**_.isObject(value) 
        Returns true if value is an Object. Note that JavaScript arrays and functions are objects, while (normal) strings and numbers are not.
  
        _.isObject({});
        => true
        _.isObject(1);
        => false */
    _
  
  
    // &*************************************&
    //     _..each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {???????
    // &*************************************&
  
    /** */
  
    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  
  
  
    // &*************************************&
    //     _.isFinite
    // &*************************************&
  
    /**_.isFinite(object) 
        Returns true if object is a finite Number.
  
        _.isFinite(-101);
        => true
  
        _.isFinite(-Infinity);
        => false */
  
    
  
  
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
  
    
  
  
    // &*************************************&
    //     _.isBoolean
    // &*************************************&
  
    /**.isBoolean(object) 
        Returns true if object is either true or false.
  
        _.isBoolean(null);
        => false */
  
    
  
  
    // &*************************************&
    //     _.isNull
    // &*************************************&
  
    /**_.isNull(object) 
        Returns true if the value of object is null.
  
        _.isNull(null);
        => true
        _.isNull(undefined);
        => false */
  
    
  
  
    // &*************************************&
    //     _.isUndefined
    // &*************************************&
  
    /**_.isUndefined(value) 
        Returns true if value is undefined.
  
        _.isUndefined(window.missingVariable);
        => true */
  
  
  
  
    // &*************************************&
    //     _.has
    // &*************************************&
  
    /**_.has(object, key) 
        Does the object contain the given key? Identical to object.hasOwnProperty(key), but uses a safe reference to the hasOwnProperty function, in case it's been overridden accidentally.
  
        _.has({a: 1, b: 2, c: 3}, "b");
        => true */

  
  
  
  
    // =======================================================================
    // ====================== Utility Functions ==============================
    // =======================================================================
  
  
  
  
  
  
  
    // &*************************************&
    //     _.noConflict
    // &*************************************&
  
    /**.noConflict() 
        Give control of the _ variable back to its previous owner. Returns a reference to the Underscore object.
  
        var underscore = _.noConflict(); */
  
  
  
    // &*************************************&
    //     _.identity
    // &*************************************&
  
    /**_.identity(value) 
        Returns the same value that is used as the argument. In math: f(x) = x
        This function looks useless, but is used throughout Underscore as a default iteratee.
  
        var stooge = {name: 'moe'};
        stooge === _.identity(stooge);
        => true */
  
  
    // &*************************************&
    //     _.constant
    // &*************************************&
  
    /**_.constant(value) 
        Creates a function that returns the same value that is used as the argument of _.constant.
  
        var stooge = {name: 'moe'};
        stooge === _.constant(stooge)();
        => true */

  
  
    // &*************************************&
    //     _.noop
    // &*************************************&
  
    /**_.noop() 
        Returns undefined irrespective of the arguments passed to it. Useful as the default for optional callback arguments.
  
        obj.initialize = _.noop; */

  
  
    // &*************************************&
    //     _.propertyOf
    // &*************************************&
  


    // &*************************************&
    //     _.matcher
    // &*************************************&
  
    
  
    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
  
  
    // &*************************************&
    //     _.times
    // &*************************************&
  
    /**_.times(n, iteratee, [context]) 
        Invokes the given iteratee function n times. Each invocation of iteratee is called with an index argument. Produces an array of the returned values. 
        Note: this example uses the object-oriented syntax.
  
        _(3).times(function(n){ genie.grantWishNumber(n); }); */
  
  
  
    // &*************************************&
    //     _.random
    // &*************************************&
  
    /**_.random(min, max) 
        Returns a random integer between min and max, inclusive. If you only pass one argument, it will return a number between 0 and that number.
  
        _.random(0, 100);
        => 42 */

  
  
    // &*************************************&
    //     _.now
    // &*************************************&
  
    /**.now() 
        Returns an integer timestamp for the current time, using the fastest method available in the runtime. Useful for implementing timing/animation functions.
  
        _.now();
        => 1392066795351 */
  
    
    // &*************************************&
    //     createEscaper
    // &*************************************&
  
    // Functions for escaping and unescaping strings to/from HTML interpolation.
    
  
  
  
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
  
  
  
    // &*************************************&
    //     _.uniqueId
    // &*************************************&
  
    /**_.uniqueId([prefix]) 
        Generate a globally-unique id for client-side models or DOM elements that need one. If prefix is passed, the id will be appended to it.
  
        _.uniqueId('contact_');
        => 'contact_104' */
  
  

  
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
  
  
  
    // =======================================================================
    // ====================== OOP ============================================
    // =======================================================================
  
        /**You can use Underscore in either an object-oriented or a functional style, depending on your preference. The following two lines of code are identical ways to double a list of numbers.
  
      _.map([1, 2, 3], function(n){ return n * 2; });
      _([1, 2, 3]).map(function(n){ return n * 2; }); */
  
  
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.

    // &*************************************&
    //     chainResult
    // &*************************************&
  
    // Helper function to continue chaining intermediate results.
  
  
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
  
  
    // Add all of the Underscore functions to the wrapper object.
    
  
    // &*************************************&
    //     _.mixin 
    //    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name)
    //     _.each(['concat', 'join', 'slice'], function(name) {
    // &*************************************&
   
  
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
  