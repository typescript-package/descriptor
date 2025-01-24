// Class.
import { Descriptor } from "./descriptor.class";

export class PropertyDescriptorChain<
  Obj extends object,
  T = (Obj extends new () => any ? (Obj extends { prototype: infer P } ? P : never) : Obj),
  Key extends keyof T = keyof T,
> {

  public get descriptor() {
    return this.#descriptor;
  }

  public get size() {
    return this.#descriptor.length;
  }

  #descriptor = new Array<PropertyDescriptor>();
  #key: Key;
  #object: Obj;

  /**
   * Creates an instance of `PropertyDescriptorChain`.
   * @param object 
   * @param key 
   */
  constructor(object: Obj, key: Key) {
    if (!object || typeof object !== 'object') {
      throw new TypeError('Invalid object provided.');
    }
    if (!key) {
      throw new TypeError('Invalid key provided.');
    }
    this.#key = key;
    this.#object = object;
    this.add();
  }

  public add() {
    const descriptor = Descriptor.fromProperty(this.#object, this.#key as any);
    if (descriptor) {
      this.#descriptor.push(descriptor);
    } else {
      throw new Error(`Descriptor not found for key: ${String(this.#key)}`);
    }
  }

  public get(id: number) {
    return this.#descriptor[id];
  }

  public last(): PropertyDescriptor {
    return this.#descriptor[this.#descriptor.length - 1];
  }
}
