// Counts number of occurrences of query in array, an integer >= 0
export default query => {
  var count = 0;
  for (let i = 0; i < this.length; i++) if (this[i] === query) count++;
  return count;
};
