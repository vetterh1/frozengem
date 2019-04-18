const stringifyOnce = (obj, replacer, indent) => {
  const printedObjects = [];
  const printedObjectKeys = [];

  function printOnceReplacer(key, value) {
    // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
    if (printedObjects.length > 2000) {
      return 'object too long';
    }
    let printedObjIndex = false;
    printedObjects.forEach((obj2, index) => {
      if (obj2 === value) {
        printedObjIndex = index;
      }
    });

    if (key === '') { // root element
      printedObjects.push(obj);
      printedObjectKeys.push('root');
      return value;
    } else if (`${printedObjIndex}` !== 'false' && typeof (value) === 'object') {
      if (printedObjectKeys[printedObjIndex] === 'root') return '(pointer to root)';
      return `(see ${((!!value && !!value.constructor) ? value.constructor.name.toLowerCase() : typeof (value))} with key ${printedObjectKeys[printedObjIndex]})`;
    }
    const qualifiedKey = key || '(empty key)';
    printedObjects.push(value);
    printedObjectKeys.push(qualifiedKey);
    if (replacer) {
      return replacer(key, value);
    }
    return value;
  }
  return JSON.stringify(obj, printOnceReplacer, indent);
};

export default stringifyOnce;