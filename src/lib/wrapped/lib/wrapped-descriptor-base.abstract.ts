// Abstract.
import { WrappedDescriptorCore } from './wrapped-descriptor-core.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description The base abstraction class for wrapped descriptors.
 * @export
 * @abstract
 * @class WrappedDescriptorBase
 * @template [O=any] The type of the object to define the descriptor on.
 * @template {keyof O} [K=keyof O] The key of the object to define the descriptor on.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The value type of the key in the object.
 * @template {boolean} [A=boolean] The type of active.
 * @template {boolean} [N=boolean] The type of enabled.
 * @template {boolean} [C=boolean] The type of configurable.
 * @template {boolean} [E=boolean] The type of enumerable.
 * @template {WrappedDescriptorBase<O, K, V, A, N, C, E, D>} [D=WrappedDescriptorBase<O, K, V, A, N, C, E, any>] 
 * @extends {WrappedDescriptorCore<O, K, V, A, N, C, E, D>}
 */
export abstract class WrappedDescriptorBase<
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
  // The type of the previous descriptor.
  D extends WrappedDescriptorBase<O, K, V, A, N, C, E, D> = WrappedDescriptorBase<O, K, V, A, N, C, E, any>,
> extends WrappedDescriptorCore<O, K, V, A, N, C, E, D> {
  /**
   * @description The defaults for instance `active` property.
   * @public
   * @static
   * @type {boolean}
   */
  public static active: boolean = true;

  /**
   * @description The defaults for instance `enabled` property.
   * @public
   * @static
   * @type {boolean}
   */
  public static enabled: boolean = true;

  /**
   * @inheritdoc
   */
  public get active() {
    return this.#active;
  }

  /**
   * @inheritdoc
   */
  public get enabled() {
    return this.#enabled;
  }

  /**
   * @inheritdoc
   */
  public get index() {
    return this.#index;
  }

  /**
   * @inheritdoc
   */
  public get key() {
    return this.#key;
  }

  /**
   * @inheritdoc
   */
  public get onGet() {
    return this.#onGet;
  }

  /**
   * @inheritdoc
   */
  public get onSet() {
    return this.#onSet;
  }

  /**
   * @inheritdoc
   */
  public get previousDescriptor() {
    return this.#previousDescriptor as ('value' extends keyof D ? PropertyDescriptor : D) | undefined;
  }

  /**
   * @inheritdoc
   */
  public get privateKey() {
    return this.#privateKey;
  }
  
  /**
   * @description The active state of the descriptor.
   * @type {A | {onGet?: boolean | undefined; onSet?: boolean | undefined;}
   */
  #active;

  /**
   * @description The enabled state of the descriptor.
   * @type {N}
   */
  #enabled;

  /**
   * @description The index of the descriptor in the chain.
   * @type {number | undefined}
   */
  #index;
  
  /**
   * @description The key of the descriptor.
   * @type {K}
   */
  #key;

  /**
   * @description The on get hook function for the descriptor.
   * @type {(GetterCallback<O, K> | undefined)}
   */
  #onGet;

  /**
   * @description The on set hook function for the descriptor.
   * @type {(SetterCallback<O, K> | undefined)}
   */
  #onSet;

  /**
   * @description The previous descriptor in the chain.
   * @type {D | PropertyDescriptor | undefined}
   */
  #previousDescriptor;

  /**
   * @description The private key for the descriptor.
   * @type {PropertyKey}
   */
  #privateKey;

  /**
   * Creates an instance of `WrappedDescriptorBase` child class.
   * @constructor
   * @param {O} object The object to define the descriptor on.
   * @param {K} key The key of the object to define the descriptor on.
   * @param {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} descriptor The property descriptor to wrap.
   */
  constructor(
    object: O,
    key: K, 
    descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
  ) {
    super(descriptor);

    // Assign the properties.
    this.#active = typeof descriptor.active === 'boolean' || typeof descriptor.active === 'object' ? descriptor.active : WrappedDescriptorBase.active as A;
    this.#enabled = typeof descriptor.enabled === 'boolean' || typeof descriptor.enabled === 'object' ? descriptor.enabled : WrappedDescriptorBase.enabled as N;
    this.#index = descriptor.index;
    this.#key = key;
    this.#onGet = descriptor.onGet;
    this.#onSet = descriptor.onSet;
    this.#previousDescriptor = descriptor.previousDescriptor;
    this.#privateKey = descriptor.privateKey || `_${String(key)}`;
  }
}
