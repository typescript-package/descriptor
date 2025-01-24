import { PropertyDescriptorChain } from "../lib";

const object = {
  name: 'firstName',
  _name: 'a'
};

const descriptorChain = new PropertyDescriptorChain(object, 'name');

console.group(`PropertyDescriptorChain`);

descriptorChain.add();

console.groupEnd();
