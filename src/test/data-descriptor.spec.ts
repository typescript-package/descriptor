import { DataDescriptor } from "../lib";

const descriptor = new DataDescriptor();
const object = {};

console.group(`DataDescriptor`);
console.log(descriptor);
Object.defineProperty(object, 'name', descriptor);
console.log(`object`, object);
console.groupEnd();

describe(`DataDescriptor`, () => {
  it(`new`, () => {
    const descriptor = new DataDescriptor({
      configurable: false,
      enumerable: false,
      value: 'data',
      writable: false
    });
    expect(descriptor.configurable).toEqual(false);
    expect(descriptor.enumerable).toEqual(false);
    expect(descriptor.value).toEqual('data');
    expect(descriptor.writable).toEqual(false);
  });
});
