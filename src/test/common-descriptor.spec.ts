import { CommonDescriptor } from "../lib/common-descriptor.abstract";


export class CustomDescriptor extends CommonDescriptor {}

const descriptor = new CustomDescriptor();
const object = {};

console.group(`CommonDescriptor`);
console.log(descriptor);
Object.defineProperty(object, 'name', descriptor);
console.log(`object`, object);
console.groupEnd();


describe(`CommonDescriptor`, () => {
  it(`new`, () => {
    const descriptor = new CustomDescriptor({
      configurable: false,
      enumerable: false
    });
    expect(descriptor.configurable).toEqual(false);
    expect(descriptor.enumerable).toEqual(false);
  });
});
