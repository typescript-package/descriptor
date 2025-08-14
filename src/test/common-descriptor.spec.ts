import { CommonDescriptor } from "../lib/common-descriptor.abstract";

export class CustomDescriptor<
  C extends boolean = boolean,
  E extends boolean = boolean
> extends CommonDescriptor<
C, E
> {}

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
