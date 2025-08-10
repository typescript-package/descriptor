// Abstract.
import { WrappedDescriptorCore } from './wrapped-descriptor-core.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { GetterCallback, SetterCallback } from '@typedly/callback';
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
  D extends WrappedDescriptorBase<O, K, V, A, N, C, E, D> | PropertyDescriptor = WrappedDescriptorBase<O, K, V, A, N, C, E, any>,
> extends WrappedDescriptorCore<O, K, V, A, N, C, E, D> {
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

  public get previous() {
    return this.#previous;
  }
  /**
   * @inheritdoc
   */
  public get previousDescriptor() {
    return this.#previous;
  }

  /**
   * @inheritdoc
   */
  public get privateKey() {
    return this.#privateKey;
  }
  
  /**
   * @description The active state of the descriptor.
   * @type {(A | {onGet?: boolean | undefined; onSet?: boolean | undefined;})}
   */
  #active: A | {onGet?: boolean | undefined; onSet?: boolean | undefined;};

  /**
   * @description The enabled state of the descriptor.
   * @type {N}
   */
  #enabled: N;

  /**
   * @description The index of the descriptor in the chain.
   * @type {?number}
   */
  #index?: number;
  
  /**
   * @description The key of the descriptor.
   * @type {K}
   */
  #key: K;

  /**
   * @description The on get hook function for the descriptor.
   * @type {?GetterCallback<O, K>}
   */
  #onGet?: GetterCallback<O, K>;

  /**
   * @description The on set hook function for the descriptor.
   * @type {?SetterCallback<O, K>}
   */
  #onSet?: SetterCallback<O, K>;

  /**
   * @description The previous descriptor in the chain.
   * @type {?D}
   */
  #previous?: D;

  /**
   * @description The private key for the descriptor.
   * @type {PropertyKey}
   */
  #privateKey: PropertyKey;

  /**
   * Creates an instance of `WrappedDescriptorBase` child class.
   * @constructor
   * @param {O} object The object to define the descriptor on.
   * @param {K} key The key of the object to define the descriptor on.
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} [attributes={}] The property descriptor attributes.
   */
  constructor(
    object: O,
    key: K, 
    attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>> = {},
  ) {
    super(attributes);

    // Assign the properties.
    // Required.
    this.#active = typeof attributes.active === 'boolean' || typeof attributes.active === 'object' ? attributes.active : WrappedDescriptorBase.active as A;
    this.#enabled = typeof attributes.enabled === 'boolean' || typeof attributes.enabled === 'object' ? attributes.enabled : WrappedDescriptorBase.enabled as N;
    this.#privateKey = attributes.privateKey || `${WrappedDescriptorBase.prefix}${String(key)}`;

    // Optional.
    this.#index = attributes.index;
    this.#key = key;
    this.#onGet = attributes.onGet;
    this.#onSet = attributes.onSet;
    this.#previous = attributes.previousDescriptor;
  }

  /**
   * @inheritdoc
   * @public
   * @returns {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} 
   */
  public override valueOf(): WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> {
    return {
      active: this.active,
      configurable: this.configurable,
      enabled: this.enabled,
      enumerable: this.enumerable,
      get: this.get,
      index: this.index,
      onGet: this.onGet,
      onSet: this.onSet,
      previousDescriptor: this.previousDescriptor,
      privateKey: this.privateKey,
      set: this.set,
    };
  }
}
