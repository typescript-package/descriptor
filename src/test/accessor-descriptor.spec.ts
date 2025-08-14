import { AccessorDescriptor, Descriptor } from "../lib";
import { Person } from "./person.test";

console.group(`AccessorDescriptor`);

const person = new Person();

Object.defineProperty(person, 'surName', {
  get() {
    return this._surName;
  },
  set(value: string) {
      this._surName = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, 1000);
    })
  },
});

(person as any).surName = 'Smith';
(person as any).surName.then((value: string) => {
  console.debug(`person.surName`, value);
});

// const defined: ThisAccessorPropertyDescriptor<number, Person, true, true> | undefined
const defined = AccessorDescriptor.define({
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

// const created: AccessorDescriptor<Person, "firstName", string, true, true>
const created = AccessorDescriptor.create({
  configurable: true,
  enumerable: true,
  get(this: Person) {
    return this._firstName
  },
  set(this: Person, value) {
    console.log(`Setting firstName to`, value);
    this._firstName = value;
  }
}, person, 'firstName');

console.debug(`created`, created);

const descriptor = new AccessorDescriptor({
  configurable: true,
  enumerable: true,
  get: function(this: { _name: string }) {
    return this._name;
  },
  set: function(this: { _name: string }, value: string) {
    this._name = value;
  }
});

console.debug(`assigned`, Object.defineProperty({
  _name: 'a'
}, 'name', descriptor));



const object = {
  name: 'firstName' as string,
  _name: 'John',
  age: 27,
  location: 'Poland'
} as const;

interface ObjectWithName {
  name: string;
  _name: string;
}

const example = new AccessorDescriptor({
  configurable: true,
  enumerable: true,
  get: function(this: ObjectWithName) {
    return this._name;
  },
  set: function(this: ObjectWithName, value: string) {
    this._name = value;
  }
}, object, 'name');



console.log(descriptor);
Object.defineProperty(object, 'name', descriptor);
console.log(`object`, object);

describe(`AccessorDescriptor`, () => {
  it(`should create an instance from create()`, () => {
    const descriptor = AccessorDescriptor.create({
      configurable: false,
      enumerable: false,
      get: function() {
        return this._name;
      },
      set: function(value: any) {
        this._name = value;
      }
    });
    expect(descriptor).toBeInstanceOf(AccessorDescriptor);
    expect(descriptor.configurable).toBeFalse();
    expect(descriptor.enumerable).toBeFalse();
  });

  it(`should create guard the accessor descriptor`, () => {
    const result = AccessorDescriptor.guard({
      configurable: true,
      enumerable: true,
      get(this: any) {
        return this._name;
      },
      set(this: any, value: string) {
        this._name = value;
      }
    }, (result, descriptor) => {
      console.debug(`guarded`, result);
      expect(result).toBeTrue();
      return result;
    });

    expect(AccessorDescriptor.guard({
      configurable: true,
      enumerable: true,
      get(this: any) {
        return this._name;
      },
      set(this: any, value: string) {
        this._name = value;
      },
      writable: ''
    } as any, (result, descriptor) => {
      console.debug(`guarded`, result);
      expect(result).toBeFalse();
      return result;
    })).toBeFalse();
  });

  it(`should create an instance from new for person.age`, () => {
    const descriptor = new AccessorDescriptor({
      configurable: true,
      enumerable: true,
      get: function() { return this._age; },
      set: function(value: any) { this._age = value; }
    }, person, 'age');

    expect(descriptor).toBeInstanceOf(AccessorDescriptor);
    expect(descriptor.configurable).toBeTrue();
    expect(descriptor.enumerable).toBeTrue();

    person.age = 30;
    expect(person.age).toEqual(30);

    person.age = 27;
    expect(person.age).toEqual(27);
  });

  it(`should create accessor descriptor from define()`, () => {
    const descriptor = AccessorDescriptor.define({
      configurable: false,
      enumerable: false,
      get: function() { return this._name; },
      set: function(value: any) { this._name = value; }
    });
    expect(descriptor).toBeDefined();
    expect(descriptor?.configurable).toBeUndefined();
    expect(descriptor?.enumerable).toBeUndefined();
  });
});

console.debug(`AccessorDescriptor.create()`, AccessorDescriptor.create({
  configurable: true,
  enumerable: true,
  get: function(this: { _name: string }) {
    return this._name;
  },
  set: function(this: { _name: string }, value: string) {
    this._name = value;
  }
}));


// Create just accessor descriptor.
const accessorDescriptor = AccessorDescriptor.create({
  configurable: true,
  enumerable: true,
  get(this: any) {
    return this._name;
  },
  set(this: any, value: string) {
    this._name = value;
  }
});

console.debug(`accessorDescriptor`, accessorDescriptor);

// Define.
export const define = AccessorDescriptor.define({
  configurable: true,
  enumerable: true,
  get(this: any) {
    return this._name;
  },
  set(this: any, value: string) {
    this._name = value;
  }
});

console.debug(`AccessorDescriptor.define()`, define);

/**
 * The type is captured from the `set` if type is defined method.
 */
// The `string` type is captured from the `get` method.
// const accessorDescriptor1: AccessorDescriptor<any, string | number | symbol, string, boolean, boolean>
const accessorDescriptor1 = new AccessorDescriptor({
  set(this: Person, value) {},        // type `string`
  get(this: Person) { return 'a'; },  // type `string`
});

// The `string` type is captured from the `get` method.
// const accessorDescriptor5: AccessorDescriptor<any, string | number | symbol, string, boolean, boolean>
const accessorDescriptor5 = new AccessorDescriptor({
  get(this: Person) { return 'a'; },  // type `string`
  set(this: Person, value) {},        // type `string`
});

// The `number` type is captured from the `set` method.
// const accessorDescriptor0: AccessorDescriptor<any, string | number | symbol, number, boolean, boolean>
const accessorDescriptor0 = new AccessorDescriptor({
  get(this: Person) { return 27; },   // type `number`
  set(this: Person, value: number) {} // type `number`
});

// The `number` type is captured from the `set` method.
// const accessorDescriptor2: AccessorDescriptor<any, string | number | symbol, number, boolean, boolean>
const accessorDescriptor2 = new AccessorDescriptor({
  set(this: Person, value: number) {},  // type `number`
  get(this: Person) { return 27; },     // type `number`
});

// The `number` type is captured from the `set` method.
// const accessorDescriptor4: AccessorDescriptor<any, string | number | symbol, string, boolean, boolean>
const accessorDescriptor4 = new AccessorDescriptor({
  // get(this: Person): number { return 27; },  // type `number`
  set(this: Person, value: string) {},       // type `string`
});

// The `number` type is captured from the `set` method.
// const accessorDescriptor6: AccessorDescriptor<any, string | number | symbol, string, boolean, boolean>
const accessorDescriptor6 = new AccessorDescriptor({
  set(this: Person, value: string) {},      // type `string `
  // get(this: Person): number { return 27; }, // type `number`
});


console.groupEnd();
