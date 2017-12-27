
function subsets(arr) {
  if (arr.length === 0) return [[]];

  let sets = subsets(arr.slice(1));
  let returnSubsets = [];

  sets.forEach(function(subset) {
    returnSubsets.push(subset);
    returnSubsets.push(arr.slice(0, 1).concat(subset));
  });

  return returnSubsets.sort();
}


let ssets = subsets([1, 2, 3]).sort();
console.log(ssets);
assertEqual([[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]], subsets, [1, 2, 3]);

function incrementNumArray(arrOfNums) {
  let index = arrOfNums.length - 1;

  while (arrOfNums[index] === 9) {
    arrOfNums[index] = 0;
    index -= 1;
    if (index < 0) {
      arrOfNums.unshift(1);
      return arrOfNums;
    }
  }
  arrOfNums[index] += 1;
  return arrOfNums;
}

assertEqual([1, 2, 5, 5], incrementNumArray, [1, 2, 5, 4]);
assertEqual([1, 2, 6, 0], incrementNumArray, [1, 2, 5, 9]);
assertEqual([0, 2, 6, 0], incrementNumArray, [0, 2, 5, 9]);
assertEqual([0, 3, 0, 0], incrementNumArray, [0, 2, 9, 9]);
assertEqual([1, 0, 0, 0, 0], incrementNumArray, [9, 9, 9, 9]);
