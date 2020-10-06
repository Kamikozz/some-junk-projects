class Node {
  constructor(parentNode) {
    this.value = 0;
    this.left = null;
    this.right = null;
    this.sibling = null;
  }
}

// to get sum of the numbers in tree (for n = 3 -> quantity = 1 + 2 + 3 + 4 = 10)
function getNumbers(n) {
  let numbers = 1;
  for (let i = 1; i <= n; i++) {
    numbers += i + 1;
  }
  return numbers;
}

// gets the most left start node in the given row
function getStartNodeByGivenRow(root, pos) {
  let node = root;
  for (let i = 0; i < pos; i++) {
    node = node.left;
  }
  return node;
}

// get squared sum of the numbers
function getSquaredSum(node) {
  let localNode = node;
  let result = 0;
  while (localNode !== null) {
    result += Math.pow(localNode.value, 2);
    localNode = localNode.sibling;
  }
  return result;
}

function countQuantityOfWays(root) {
  let node = root;
  let firstNode = node;

  while (firstNode !== null && firstNode.left) {
    while (node !== null) {
      node.left.value += node.value;
      node.right.value += node.value;

      node = node.sibling;
    }
    node = firstNode.left;
    firstNode = node;
  }
}


function easyLine(n) {
  // initial settings
  let tree = new Node();
  tree.value = 1;
  let firstNode = tree;
  let node = firstNode;

  let k = 1; // k - is pointer on the parent
  let start = 1; // start position of the children in a row
  let end = 2; // end position of the children in a row
  let breakCycle = getNumbers(n);

  // make tree
  while (start !== breakCycle) {
    for (let i = start; i <= end; i++) {
      if (i === start) {
        node.left = new Node();
      } else if (i === end) {
        node.right = new Node();
        node.left.sibling = node.right;

        node = firstNode.left;
        firstNode = node;
        k = end + 1;
      } else {
        node.right = new Node();
        node.left.sibling = node.right;
        node.sibling.left = node.right;

        node = node.sibling;
        k++;
      }
    }

    end = k + (k - start);
    start = k;
  }

  countQuantityOfWays(tree); // counts the possible ways to reach each child, and leaves it in the .value property

  return Math.round(Math.log(getSquaredSum(getStartNodeByGivenRow(tree, n))));
}