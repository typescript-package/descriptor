import { DataDescriptor } from "../lib";

const descriptor = new DataDescriptor();
const object = {};

console.group(`DataDescriptor`);
console.log(descriptor);
Object.defineProperty(object, 'name', descriptor);
console.log(`object`, object);
console.groupEnd();
