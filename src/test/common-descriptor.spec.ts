import { CommonDescriptor } from "../lib/common-descriptor.abstract";


export class CustomDescriptor extends CommonDescriptor {}

const descriptor = new CustomDescriptor();
const object = {};

console.group(`CommonDescriptor`);
console.log(descriptor);
Object.defineProperty(object, 'name', descriptor);
console.log(`object`, object);
console.groupEnd();
