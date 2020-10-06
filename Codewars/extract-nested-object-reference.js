var obj = {
  person: {
    name: 'joe',
    history: {
      hometown: 'bratislava',
      bio: {
        funFact: 'I like fishing.',
      }
    }
  }
};

function finding(prop, obj) {
  let keys = Object.keys(obj);
  if (!keys.includes(prop)) return {res: undefined};
  return {res: true, val: obj[prop]};
}

function swag(str, obj) {
  let myObj = obj;
  let props = str.split('.');
  for (let i = 0; i < props.length; i += 1) {
    let result = finding(props[i], myObj);
    if (result.res === undefined) return undefined;
    myObj = result.val;
  }
  return myObj;
}

console.log(swag('person.yo', obj));
