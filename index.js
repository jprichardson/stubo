
function stubo (obj, key, subkey, value) {
  // obj is not passed if there are 3 args
  var args = [].slice.call(arguments)
  if (args.length === 3) {
    obj = {}
    key = args[0]
    subkey = args[1]
    value = args[2]
  }

  var o = objKey(obj, key)

  var subkeys = subkey.split('.')
  for (var i = 0; i < subkeys.length - 1; ++i) {
    o = objKey(o, subkeys[i])
  }

  var lastSubKey = subkeys[subkeys.length - 1]
  if (endsWith(lastSubKey, '()')) {
    lastSubKey = lastSubKey.slice(0, -2) // cut off '()'
    o[lastSubKey] = function () {
      return value
    }
  } else {
    o[lastSubKey] = value
  }

  return obj
}

// does key exist in object ? if not, create it with new object
function objKey (obj, key) {
  return key in obj
    ? obj[key]
    : (obj[key] = {})
}

function endsWith (str, suffix) {
  return str.lastIndexOf(suffix) === (str.length - suffix.length)
}

module.exports = stubo
