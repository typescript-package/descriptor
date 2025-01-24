import { AccessorDescriptor } from "../lib";

const descriptor = new AccessorDescriptor();
const object = {
  name: 'firstName',
  _name: 'a'
};

console.group(`AccessorDescriptor`);
console.log(descriptor);
Object.defineProperty(object, 'name', descriptor);
console.log(`object`, object);
console.groupEnd();

describe(`AccessorDescriptor`, () => {
  it(`new`, () => {
    const descriptor = new AccessorDescriptor<any>({
      configurable: false,
      enumerable: false,
      get: function() {
        return this._name;
      },
      set: function(value: any) {
        this._name = value;
      }
    });
    expect(descriptor.configurable).toEqual(false);
    expect(descriptor.enumerable).toEqual(false);
  });
});

