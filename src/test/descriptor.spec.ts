import { Descriptor } from "../lib/descriptor.class";
import { Person } from "./person.test";

console.group(`Descriptor`);

const person = new Person();

export const created = Descriptor.create({
  configurable: true,
  enumerable: true,
  get(this: Person) {
    return this._age;
  },
  set(this: Person, value: number) {
    console.log(`Setting age to`, value);
    this._age = value;
  }
}, person, 'age');

console.debug(`created`, created);


export const defined = Descriptor.define({
  configurable: true,
  enumerable: true,
  get(this: Person) {
    return this._age;
  },
  set(this: Person, value: number) {
    console.log(`Setting age to`, value);
    this._age = value;
  }
}, person, 'age');


console.debug(`defined`, defined);

/**
 * ! The type ifs captured from the first `get` or `set` method.
 * @description The order of the properties is important, first `get` then `set`.
 * @type {*}
 * const descriptor0: Descriptor<unknown, never, any, boolean, boolean, boolean>
 */
const descriptor0 = new Descriptor({
  set(
    value // Captured `any` cause of wrong order.
  ) {
  },
  get() {
    return 'Name';
  },
})

/**
 * @description
 * @type {*}
 * const descriptor01: Descriptor<any, string | number | symbol, string, boolean, boolean, boolean>
 */
const descriptor01 = new Descriptor({
  set(value: string ) {},
  get() { return 'Name'; },
})

/**
 * @description The type of the value is captured from the returned get.
 * @type {*}
 * const descriptor1: Descriptor<any, string | number | symbol, number, boolean, boolean, boolean>
 */
const descriptor1 = new Descriptor({
  get() { return 27;  }, // The type of the value is captured from the returned get.
  set(value) { } // captured `number`.
});

/**
 * @description The type of the value is captured from the returned get.
 * @type {*}
 * const descriptor2: Descriptor<any, string | number | symbol, string, boolean, boolean, boolean>
 */
const descriptor2 = new Descriptor({
  get() {
    return 'Doe'; // The type of the value is captured from the returned get.
  },
  set(
    value // captured `string`.
  ) {
  }
});

/**
 * @description
 * @type {*}
 */
const descriptor3 = new Descriptor({
  get() { return this._age; },
  set(value) { },
}, person, 'age');

console.log(descriptor3);

console.groupEnd();


/**
 * The type is captured from the `set` if type is defined method.
 */
// The `string` type is captured from the `get` method.
const accessorDescriptor1 = new Descriptor({
  set(this: Person, value) {},        // type `string`
  get(this: Person) { return 'a'; },  // type `string`
});

// The `string` type is captured from the `get` method.
const accessorDescriptor5 = new Descriptor({
  get(this: Person) { return 'a'; },  // type `string`
  set(this: Person, value) {},        // type `string`
});

// The `number` type is captured from the `set` method.
const accessorDescriptor0 = new Descriptor({
  get(this: Person) { return 27; },   // type `number`
  set(this: Person, value: number) {} // type `number`
});

// The `number` type is captured from the `set` method.
const accessorDescriptor2 = new Descriptor({
  set(this: Person, value: number) {},  // type `number`
  get(this: Person) { return 27; },     // type `number`
});

// The `number` type is captured from the `set` method.
const accessorDescriptor4 = new Descriptor({
  // get(this: Person): number { return 27; },  // type `number`
  set(this: Person, value: string) {},       // type `string`
});

// The `number` type is captured from the `set` method.
const accessorDescriptor6 = new Descriptor({
  set(this: Person, value: string) {},      // type `string `
  // get(this: Person): number { return 27; }, // type `number`
});
