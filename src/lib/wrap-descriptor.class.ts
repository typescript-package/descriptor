// Class.
import { WrappedDescriptor } from "./wrapped/lib/wrapped-descriptor.class";
// Interface.
import { WrappedPropertyDescriptor } from "@typedly/descriptor";
/**
 * @description
 * @export
 * @class WrapDescriptor
 * @template [O=any] 
 * @template {keyof O} [K=keyof O] 
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [N=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @template {WrappedDescriptor<O, K, V, A, N, C, E, D>} [D=WrappedDescriptor<O, K, V, A, N, C, E, any>] 
 */
export class WrapDescriptor<
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
  // Descriptor as previous or current in the `set` and `get`.
  D extends WrappedDescriptor<O, K, V, A, N, C, E, D> = WrappedDescriptor<O, K, V, A, N, C, E, any>
> {
  /**
   * @description
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'WrapDescriptor';
  }

  /**
 * Creates an instance of `WrapDescriptor`.
 * @constructor
 * @param {O} object 
 * @param {K} key 
 * @param {WrapDescriptorOptions<O, K, V, A, N, C, E, D>} [attributes={}] 
 */
constructor(
    object: O,
    key: K,
    attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>> = {}
  ) {
    // Obtain previous descriptor
    const previousDescriptor = attributes.previous
      || attributes.previousDescriptor
      || Object.getOwnPropertyDescriptor(object, key) as D;

    // Create a `WrappedDescriptor`, passing `previousDescriptor`.
    return new WrappedDescriptor(object, key, {
      ...attributes,
      previousDescriptor: previousDescriptor
    });
  }
}
