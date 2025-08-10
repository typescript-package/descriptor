// Abstract.
import { WrappedDescriptorBase } from './wrapped-descriptor-base.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description
 * @export
 * @class WrappedDescriptor
 * @template [O=any] The type of the object to define the descriptor on.
 * @template {keyof O} [K=keyof O] The key of the object to define the descriptor on.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The value type of the key in the object.
 * @template {boolean} [A=boolean] The type of active.
 * @template {boolean} [N=boolean] The type of enabled.
 * @template {boolean} [C=boolean] The type of configurable.
 * @template {boolean} [E=boolean] The type of enumerable.
 * @template {WrappedDescriptor<O, K, V, A, N, C, E, D>} [D=WrappedDescriptor<O, K, V, A, N, C, E, any>] The type of the previous descriptor.
 * @extends {WrappedDescriptorBase<O, K, V, A, N, C, E, D>}
 */
export class WrappedDescriptor<
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
  // Descriptor.
  D extends WrappedDescriptor<O, K, V, A, N, C, E, D> | PropertyDescriptor = WrappedDescriptor<O, K, V, A, N, C, E, any>,
> extends WrappedDescriptorBase<O, K, V, A, N, C, E, D> {
  /**
   * @description The string tag for the descriptor.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'WrappedDescriptor';
  }

  /**
   * @inheritdoc
   */
  public get get() {
    return this.#get;
  }

  /**
   * @inheritdoc
   */
  public get set() {
    return this.#set;
  }
  
  /**
   * @description The `get` method for the descriptor.
   * @type {(this: O, descriptor?: D | undefined) => V}
   */
  #get: (this: O, descriptor?: D | undefined) => V;

  /**
   * @description The `set` method for the descriptor.
   * @type {(this: O, value: V, descriptor?: D | undefined) => void}
   */
  #set: (this: O, value: V, descriptor?: D | undefined) => void;

  /**
   * Creates an instance of `WrappedDescriptor`.
   * @constructor
   * @param {O} object The object to define the descriptor on.
   * @param {K} key The key of the object to define the descriptor on.
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} attributes
   */
  constructor(
    object: O,
    key: K,
    attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>> = {},
  ) {
    super(object, key, attributes);

    // Wrap the property `get` and `set`.
    const {get, set} = this.wrap({
      get: attributes.get,
      set: attributes.set 
    });

    // Assign the wrapped `get` and `set` methods.
    this.#get = get!;
    this.#set = set!;
  }
}
