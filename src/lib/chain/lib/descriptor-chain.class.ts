// Abstract.
import { DescriptorChainCore } from "./descriptor-chain-core.abstract";
// Class.
import { Descriptor } from "../../descriptor.class";
// Type.
import { StrictPropertyDescriptor, ThisAccessorPropertyDescriptor } from "@typedly/descriptor";
/**
 * @description The class representing a chain of property descriptors.
 * @export
 * @class DescriptorChain
 * @template [O=any] The type of the object that the property descriptors are associated with.
 * @template {keyof O} [K=keyof O] The type of the property name in the object.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value accessed by the property.
 * @template {boolean} [A=boolean] The type of active property.
 * @template {boolean} [N=boolean] The type of enabled property.
 * @template {boolean} [C=boolean] The type of configurable property.
 * @template {boolean} [E=boolean] The type of enumerable property.
 * @template {ThisAccessorPropertyDescriptor<V, O, C, E>} [D=ThisAccessorPropertyDescriptor<V, O, C, E>] The type of strict property descriptor.
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
  N extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // Descriptor
  D extends ThisAccessorPropertyDescriptor<V, O, C, E> = ThisAccessorPropertyDescriptor<V, O, C, E>,
> implements DescriptorChainCore<O, K, V, A, N, C, E, D> {
  /**
   * @inheritdoc
   */
  get active(): A {
    return false as A;
  }

  /**
   * @inheritdoc
   */
  get current(): D {
    return this.#data[this.currentIndex] as D;
  }

  /**
   * @inheritdoc
   */
  get currentIndex(): number {
    return this.#currentIndex;
  }

  /**
   * @inheritdoc
   */
  public get enabled(): N {
    return false as N
  }

  /**
   * @inheritdoc
   */
  public get lastIndex(): number {
    return this.#data.length - 1;
  }

  /**
   * @inheritdoc
   */
  public get size(): number {
    return this.#data.length
  }

  #currentIndex: number = 0;
  #data = new Array<D>();
  #key: K;
  #object: O;

  /**
   * Creates an instance of `DescriptorChain`.
   * @param object The object containing the property.
   * @param key The key of the property.
   */
  constructor(object: O, key: K) { 
    this.#key = key;
    this.#object = object; 
  }

  /**
   * @inheritdoc
   */
  public add(descriptor: D): this {
    this.#data.push(descriptor);
    return this;
  }

  /**
   * @inheritdoc
   */
  public clear(): this {
    this.#data.length = 0;
    return this;
  }

  /**
   * @inheritdoc
   */
  public delete(index: number): this {
    this.#data.splice(index, 1);
    return this;
  }

  /**
   * @inheritdoc
   */
  public entries(): IterableIterator<[number, D]> {
    return this.#data.entries();
  }

  /**
   * @inheritdoc
   */
  public first(): D {
    return this.#data[0];
  }

  /**
   * @inheritdoc
   */
  public get(index: number): D {
    return this.#data[index];
  }

  /**
   * @inheritdoc
   */
  public has(index: number): boolean {
    return index >= 0 && index < this.#data.length;
  }

  /**
   * @inheritdoc
   */
  public last(): D {
    return this.#data[this.lastIndex] as D;
  }

  /**
   * @inheritdoc
   */
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

  /**
   * @inheritdoc
   */
  public set(index: number, value: D): this {
    this.#data[index] = value;
    return this;
  }
  
  /**
   * @inheritdoc
   */
  public setCurrentIndex(index: number): this {
    this.#currentIndex = index;
    return this;
  }

  /**
   * @inheritdoc
   */
  public update(index: number, value: D): this {
    this.#data[index] = {
      ...this.#data[index],
      ...value
    };
    return this;
  }

  /**
   * @inheritdoc
   */
  public values(): IterableIterator<D> {
    return this.#data.values();
  }
}
