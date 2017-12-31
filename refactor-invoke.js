/**…Minimal – Use as little code as possible that still produces the same problem
…Complete – Provide all parts needed to reproduce the problem
…Verifiable – Test the code you're about to provide to make sure it reproduces the problem*/

/**Process Flow 
 * invoke calls restArgs
 * restArts returns func.call()
 * 
*/



//accumulates arguments into an array normally, but not in this use case.
function restArgs(func, startIndex) {
  //determine startIndex
  return function() {
    return func.call(this, [5, 1, 3, 2, 1], "sort")
  };
};

//if obj is a function then return true, else false
function isFunction(obj) {
  return typeof obj == 'function' || false;
};

// An internal function to generate callbacks that can be applied to each element in a collection
function cb(value, context, argCount) {
  if(isFunction(value)) return optimizeCb(value, context, argCount);
};

function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;
};

function mapp(obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  //if object assign keys
  var keys = !isArrayLike(obj) && Object.keys(obj);
  //in this case as we are passing in a one dimensional array, length = 1 and so for loop iterates once
  var length = (keys || obj).length;
  var results = Array(length);
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    //where iteratee contains return mapp(obj, function(context))
    //THIS IS THE POINT OF ISSUE
    //iteratee is anonymous(context), and yet we are calling it with three arguments?
    //in original underscore, it knows the context is the array, in mine it doesn't.
    //assumptions - this has to do with how the call stack is storing functions and scopes but I can't figure it out
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};



//get length of array, or return undefined (object)
function getLength(obj) {
  return obj == null ? void 0 : obj['length'];
}

//returns true if array like
function isArrayLike(collection) {
  var length = getLength(collection)
  return typeof length == 'number' && length >= 0;

};

function isObj() {

};

var invoke = restArgs(function(obj, path, args){

  //our example returns false for _.isFunction(path) and _.isArray(path)

  return mapp(obj, function(context) {
    var array = context;
    var method = context[path];
    //where method = 'sort'
    return method.apply(context, args)
  });
});

invoke([[5, 1, 3, 2, 1]], 'sort');
