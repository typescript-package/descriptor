// Class.
import { Descriptor } from './descriptor.class';
/**
 * @description
 * @export
 * @class Descriptors
 * @template {object} Obj 
 * @template {keyof Obj} Keys 
 */
export class Descriptors<
  Obj extends object,
  Keys extends keyof Obj
> {
  /**
   * @description Accessor to get stored property descriptors.
   * @returns The returned value is descriptors of map type.
   */
  public get descriptors(): Map<Keys, PropertyDescriptor> {
    return this.#descriptors;
  }

  /**
   * @description Privately stored property descriptors.
   */
  readonly #descriptors: Map<Keys, PropertyDescriptor> = new Map();

  /**
   * 
   */
  readonly #object: Obj;

  /**
   * @description Creates an instance of `Descriptors` with obj and `keys` to pick descriptors.
   * @param object An object from which descriptors are retrieved.
   * @param keys Optional property keys to retrieve from specified `object`.
   */
  constructor(object: Obj, ...keys: Keys[]) {
    this.#object = object;
    Array.isArray(keys) && keys.length > 0
      ? this.setPicked(...keys)
      : this.setAll();
  }

  /**
   * @description Get property descriptor from `#descriptors`.
   * @param key
   * @returns
   */
  public get(key: Keys): PropertyDescriptor | undefined {
    return this.#descriptors.get(key);
  }

  /**
   * @description Get all descriptors from `#descriptors`.
   * @returns The returned value is array of all stored descriptors.
   */
  public getAll(): Array<[Keys, PropertyDescriptor]> {
    return Array.from(this.#descriptors.entries());
  }

  /**
   * @description Check whether `#descriptors` has `key`.
   * @param key The `key` to check whether descriptors has.
   * @returns The returned value is a `boolean` indicating whether descriptors has descriptor of property `key`.
   */
  public has(key: Keys): boolean {
    return this.#descriptors.has(key);
  }

  /**
   * @description The method sets the `value` under `key` in `#descriptors`.
   * @param key The property key to set descriptor.
   * @param value Property descriptor to set under the `key`.
   * @returns The returned value is an instance of `Descriptors`.
   */
  public set(key: Keys, value: PropertyDescriptor): this {
    this.#descriptors.set(key, value);
    return this;
  }

  /**
   * @description The method sets all descriptors from `object`.
  //  * @param object The object from which all descriptors are set.
   * @returns The returned value is an instance of this.
   */
  public setAll<Key extends Keys>(): this {
    // Pick all the descriptors of the given `object`.
    const objectDescriptors = Descriptor.getAll(this.#object);
    // If description exists in the object set them into the map storage.
    typeof objectDescriptors === 'object' &&
      Object.keys(objectDescriptors).forEach((key) =>
        this.#descriptors.set(key as Key, objectDescriptors[key as Key])
      );
    return this;
  }

  /**
   * @description The method sets descriptors from `object` of `keys`.
   * @param object An object from which descriptors are set to `#descriptors`.
   * @param keys Keys of `object` to retrieved descriptors.
   * @returns The returned value is an instance of `Descriptors`.
   */
  public setPicked<Key extends Keys>(...keys: Key[]): this {
    // Pick the descriptors of the given `keys`.
    const pickedDescriptors = Descriptor.pick(this.#object, ...keys);
    // If description exists in the object set them into the map storage.
    typeof pickedDescriptors === 'object' &&
      (Object.keys(pickedDescriptors) as Key[]).forEach(key =>
        this.#descriptors.set(key, pickedDescriptors[key])
      );
    return this;
  }
}
