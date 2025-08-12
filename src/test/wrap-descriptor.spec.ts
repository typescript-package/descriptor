import { WrapDescriptor } from "../lib/wrap-descriptor.class";
import { Person } from "./person.test";


const person = new Person();

const wrappedAge1 = new WrapDescriptor(person, 'age');

console.debug(wrappedAge1);

Object.defineProperty(person, 'age', wrappedAge1);

person.age = 35;

console.debug(person);

