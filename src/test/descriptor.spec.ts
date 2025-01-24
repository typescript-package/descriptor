import { Descriptor } from "../lib";

const person = {
  age: 27,
  name: 'Someone',
  work: 'Gig'
}

const descriptor = new Descriptor({
  configurable: true,
  set() {
  }
}, person, 'age');


console.group(`Descriptor`);
console.log(descriptor);
console.groupEnd();

const a = Object.defineProperty(person, 'a', {
  set() { 
  }
});
