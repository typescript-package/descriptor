// Abstract.
import { WrappedDescriptorCore } from './wrapped-descriptor-core.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
/**
 * @description The base abstraction class for wrapped descriptors.
 * It extends the `WrappedDescriptorCore` class and provides additional functionality
 * for managing the descriptor's state and behavior.
 * It includes methods to activate, deactivate, enable, and disable the descriptor,
 * as well as to check if the descriptor's callbacks are active.
 * This class is intended to be extended by other descriptor classes that require
 * the functionality of a wrapped descriptor.
 * It provides a foundation for creating descriptors that can be dynamically enabled or disabled,
 * and that can have custom getter and setter functions.
 * The class also includes a method to wrap the property with the descriptor,
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
  public get get() {
    return this.#get;
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
   * @inheritdoc
   */
  public get set() {
    return this.#set;
  }

  #active;
  #enabled;
  #get;
  #index;
  #key;
  #onGet;
  #onSet;
  #previousDescriptor;
  #privateKey;
  #set;
  
  /**
   * Creates an instance of `WrappedDescriptorBase`.
   * @constructor
   * @param {O} object 
   * @param {K} key 
   * @param {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} descriptor 
   */
  constructor(
    object: O,
    key: K, 
    descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
  ) {
    super(descriptor);
    // Assign the properties.
    this.#active = descriptor.active || WrappedDescriptorBase.active as A;
    this.#enabled = descriptor.enabled || WrappedDescriptorBase.enabled as N;
    this.#get = descriptor.get;
    this.#index = descriptor.index;
    this.#key = key;
    this.#onGet = descriptor.onGet;
    this.#onSet = descriptor.onSet;
    this.#previousDescriptor = descriptor.previousDescriptor;
    this.#privateKey = descriptor.privateKey || Symbol(`_${String(key)}`);
    this.#set = descriptor.set;
  }

  /**
   * @description Wraps the property with the descriptor.
   * @protected
   * @param {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} param0 The wrapped property `set` and `get` descriptor.
   */
  protected wrap({ get, set }: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>): {
    get: (this: O) => V,
    set: (this: O, value: V) => void
  } {
    // Use descriptor instance.
    const descriptor = this;

    // Return the wrapped property.
    return {
      get: get
        ? (function (this: O): V { return get?.call(this, descriptor as unknown as D) as V; })
        : (function (this: O): V {
          if (descriptor.enabled === true) {
            const o = (this as O);

            // Get the previous value from descriptor.
            const previousValue = descriptor.previousDescriptor && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
              ? descriptor.previousDescriptor.get && typeof descriptor.previousDescriptor.get === 'function'
                ? descriptor.previousDescriptor.get.call(this)
                : 'value' in descriptor.previousDescriptor
                  ? descriptor.previousDescriptor.value
                  : undefined
              : undefined;

            // Check if the descriptor is active.
            const active = descriptor.active === true || (typeof descriptor.active === 'object' && descriptor.active.onGet);

            // Current descriptor.
            return descriptor.onGet && active === true
              ? descriptor.onGet.call(o, descriptor.key as K, previousValue, o[descriptor.privateKey as K] as V, o) as V
              : o[descriptor.privateKey as K] as V;
          } else {
            return undefined as V;
          }
        }
      ),
      set: set
        ? function(this: O, value: V) {
          set?.call(this, value, descriptor as unknown as D);
        }
        : function(this: O, value: V): void {
          if (descriptor.enabled === true) {
            // Set the this as the target object.
            const o = (this as O);

            // Get the previous value from previous descriptor or current value.
            const previousValue = o[descriptor.privateKey as K] as V
              || (
                descriptor.previousDescriptor && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
                  ? descriptor.previousDescriptor.get
                    ? descriptor.previousDescriptor.get.call(this)
                    : 'value' in descriptor.previousDescriptor
                      ? descriptor.previousDescriptor.value
                      : undefined
                  : undefined
              ) as V;

            // Check if the descriptor is active.
            const active = descriptor.active === true || (typeof descriptor.active === 'object' && descriptor.active.onSet);

            // Perform previous descriptor.
            descriptor.previousDescriptor?.set
              && (descriptor.previousDescriptor as WrappedPropertyDescriptor).enabled !== false
              && descriptor.previousDescriptor.set.call(o, value, descriptor.previousDescriptor as D);

            // Set the private property value.
            Object.assign(
              o as any,
              {
                [descriptor.privateKey as K]: descriptor.onSet && active === true
                  ? descriptor.onSet.call(o, value, previousValue, descriptor.key, o) as V
                  : value
              }
            );
          }
        }};
  }
}
