/**
 * Utility method to round numbers to a given number of decimal places.
 */
  
const round = (num: number, precision: number) => {
    precision = Math.pow(10, precision)
    return Math.round(num * precision) / precision
  }

  /**
     * Put numbers into buckets that have equal-size ranges.
     *
     * @param {Number[]} data The data to bucket.
     * @param {Number} bucketCount The number of buckets to use.
     * @param {Number} [min] The minimum allowed data value. Defaults to the smallest value passed.
     * @param {Number} [max] The maximum allowed data value. Defaults to the largest value passed.
     *
     * @return {Number[][]} An array of buckets of numbers.
     */
  export const bucketNumbersLinearly = (data: number[], bucketCount: number, min: number, max: number): number[][] => {
      var i = 0, l = data.length;
      // If min and max are given, set them to the highest and lowest data values
      if (typeof min === 'undefined') {
          min = Infinity;
          max = -Infinity;
          for (i = 0; i < l; i++) {
              if (data[i] < min) min = data[i];
              if (data[i] > max) max = data[i];
          }
      }
      var inc = (max - min) / bucketCount,
        buckets: number[][] = new Array(bucketCount);
      // Initialize buckets
      for (i = 0; i < bucketCount; i++) {
          buckets[i] = [];
      }
      // Put the numbers into buckets
      for (i = 0; i < l; i++) {
          // Buckets include the lower bound but not the higher bound, except the top bucket
          if (data[i] === max) buckets[bucketCount-1].push(data[i]);
          else buckets[((data[i] - min) / inc) | 0].push(data[i]);
      }
      return buckets;
  }
  
  /**
   * Put numbers into equal-sized buckets.
   *
   * @param {Number[]} data The data to bucket.
   * @param {Number} bucketCount The number of buckets to use.
   *
   * @return {Object} An object with two properties, `buckets` and `averages`.
   *   The `buckets` property holds an array of buckets of numbers, and the
   *   `averages` property holds an array of the average value of each bucket.
   */
  export const populationBuckets = (data: number[], bucketCount: number): {buckets: number[][], averages: number[]} => {
      let i = 0,
          inc = (data.length / bucketCount) | 0,
          buckets: number[][] = new Array(bucketCount),
          averages: number[] = new Array(bucketCount)
      data.sort((a, b) => a - b)
      for (i = 0; i < bucketCount; i++) {
          let subset = data.slice(i*inc, (i+1)*inc)
          buckets[i] = subset
          let sum = 0, bl = subset.length
          for (let j = 0; j < bl; j++) {
              sum += subset[j]
          }
          averages[i] = sum / bl
      }
      return { buckets: buckets, averages: averages };
  }
  
  /**
   * Takes an array of buckets of numbers and returns an array of summary statistics for each bucket.
   */
  export const showResults = (buckets: number[][]) => {
      var results: Array<{bucket: number, min: number, max: number, avg: number, count: number}> = [];
      for (var i = 0, l = buckets.length; i < l; i++) {
          var minV = Infinity, maxV = -Infinity, sum = 0, bl = buckets[i].length;
          for (var j = 0; j < bl; j++) {
              if (buckets[i][j] < minV) {
                  minV = buckets[i][j];
              }
              if (buckets[i][j] > maxV) {
                  maxV = buckets[i][j];
              }
              sum += buckets[i][j];
          }
          results.push({bucket: i+1, min: round(minV, 4), max: round(maxV, 4), avg: round(sum / bl, 4), count: bl}); // min, max, avg, count
      }
      return results;
  }
  
  /**
   * Generates an array of `numValues` numbers between `min` and `max`.
   *
   * There's no particular reason numbers have to be uniformly distributed in a specific range;
   * it's just easiest to verify the results if that's the case.
   */
  export const getTestData = (numValues: number, min: number, max: number) => {
      if (typeof max === 'undefined') max = 1;
      if (typeof min === 'undefined') min = 0;
      var data = new Array(numValues), range = max - min;
      for (var i = 0; i < numValues; i++) {
          data[i] = Math.random() * range + min;
      }
      return data;
  }
