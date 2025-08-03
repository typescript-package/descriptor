import { Person } from "../../../test/person.test";
import { ControllableDescriptor } from "../lib/controllable-descriptor.class";
import { WrappedDescriptorController } from "../../../../../controller/src/property/descriptor/lib/wrapped-descriptor-controller.class";

console.group(`ControllableDescriptor`);

const person = new Person();

const controllableDescriptor = new ControllableDescriptor(
  person,
  'name',
  {},
  WrappedDescriptorController
);

Object.defineProperty(person, 'name', controllableDescriptor);

console.log(`ControllableDescriptor`, controllableDescriptor);
console.log(`person`, person);

person.name = 'John Doe';

console.groupEnd();
