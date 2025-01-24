import { AccessorDescriptor } from "../lib";

const descriptor = new AccessorDescriptor();
const object = {};

console.group(`AccessorDescriptor`);
console.log(descriptor);
Object.defineProperty(object, 'name', descriptor);
console.log(`object`, object);
console.groupEnd();


