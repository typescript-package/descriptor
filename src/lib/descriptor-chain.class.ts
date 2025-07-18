// Abstract.
import { DescriptorChainCore } from "./descriptor-chain-core.abstract";
// Class.
import { Descriptor } from "./descriptor.class";
// Type.
import { StrictPropertyDescriptor } from "@typedly/descriptor";
/**
 * @description The class representing a chain of property descriptors.
 * @export
 * @class DescriptorChain
 * @template [O=any] The type of the object that the property descriptors are associated with.
 * @template {keyof O} [K=keyof O] The type of the property name in the object.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value accessed by the property.
 * @template {boolean} [A=boolean] The type of active property.
 * @template {boolean} [ED=boolean] The type of enabled property.
 * @template {boolean} [C=boolean] The type of configurable property.
 * @template {boolean} [E=boolean] The type of enumerable property.
 * @template {StrictPropertyDescriptor<V, O, C, E>} [D=StrictPropertyDescriptor<V, O, C, E>] The type of strict property descriptor.
 * @template {Descriptor<O, K, V, C, E>} [DR=Descriptor<O, K, V, C, E>] The type of descriptor chain.
 */
export class DescriptorChain<
  // Object.
  O = any,
  // Key.
  K extends keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Active.
  A extends boolean = boolean,
  // Enabled.
  ED extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // Descriptor
  D extends StrictPropertyDescriptor<V, O, C, E> = StrictPropertyDescriptor<V, O, C, E>,
  // Descriptor chain.
  DR extends Descriptor<O, K, V, C, E> = Descriptor<O, K, V, C, E>
> implements DescriptorChainCore<O, K, V, A, ED, C, E, D> {

  get active(): A {
    return false as A;
  }

  get current(): D {
    return this.#data[this.#currentIndex] as D;
  }

  get enabled(): ED {
    return false as ED
  }

  public get lastIndex(): number {
    return this.#data.length > 0 ? this.#data.length -  1 : 0;
  }

  public get size(): number {
    return this.#data.length
  }

  #currentIndex: number = 0;
  #data = new Array<D>();
  #key: K;
  #object: O;

  /**
   * Creates an instance of `PropertyDescriptorChain`.
   * @param object The object containing the property.
   * @param key The key of the property.
   */
  constructor(object: O, key: K) { 
    this.#key = key;
    this.#object = object; 
  }

  public add(descriptor: D): this {
    this.#data.push(descriptor);
    return this;
  }

  public clear(): this {
    this.#data.length = 0;
    return this;
  }

  public delete(index: number): this {
    this.#data.splice(index, 1);
    return this;
  }

  public entries(): IterableIterator<[number, D]> {
    return this.#data.entries();
  }

  public first(): D {
    return this.#data[0];
  }

  public get(index: number): D {
    return this.#data[index];
  }

  public has(index: number): boolean {
    return index >= 0 && index < this.#data.length;
  }

  public last(): D {
    return this.#data[this.#data.length - 1] as D;
  }

  public load(): this {
    const descriptor = Descriptor.fromProperty(
      this.#object,
      this.#key
    ) as StrictPropertyDescriptor<O, K>;
    if (descriptor) {
      this.add(descriptor as D);
    } else {
      throw new Error(`Descriptor not found for key: ${String(this.#key)}`);
    }
    return this;
  }

  public set(index: number, value: D): this {
    this.#data[index] = value;
    return this;
  }

  public update(index: number, value: D): this {
    this.#data[index] = {
      ...this.#data[index],
      ...value
    };
    return this;
  }

  public values(): IterableIterator<D> {
    return this.#data.values();
  }
}
