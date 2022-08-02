const typed = _ => {
  const raw = _.raw.join('').trim().split('\n').map(v => v.trim())
  
  let result = {};
  raw.forEach(s => {
    const [name,type] = s.split(':').map(v => v.trim());
    const prop = `_${name}`;
    result[prop] = undefined;
    Object.defineProperty(result, name, {
      get() {
        return result[prop];
      },
      set(value) {
        if (typeof value === type)
          result[prop] = value
        else
          throw new Error(`${name}:${type} mismatching type. Got the ${typeof value} instead of ${type}`)
      }
    });
  })

  return result;
}

const object = typed`
  name: string
  phone: number
  flag: boolean
`;

object.name = "Hello"; // Ok
object.phone = 380273738485; // Ok
object.flag = true; // Ok

// object.phone = "text"; -> Throws an error
// object.name = 100; -> Throws an error
// object.flag = 5; -> Throws an error

console.log(object);
