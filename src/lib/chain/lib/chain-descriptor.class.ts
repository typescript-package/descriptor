// Abstract.
import { WrappedDescriptorBase } from '../../wrapped/lib/wrapped-descriptor-base.abstract';
// Class.
import { DescriptorChain } from './descriptor-chain.class';
import { WrappedDescriptor } from '../../wrapped/lib/wrapped-descriptor.class';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ValidationCallback } from '@typedly/callback';
/**
 * @description
 * @export
 * @class ChainDescriptor
 * @template [O=any] 
 * @template {keyof O} [K=keyof O] 
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [ED=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @extends {WrappedDescriptorBase<O, K, V, A, ED, C, E>}
 */
export class ChainDescriptor<
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
> extends WrappedDescriptorBase<O, K, V, A, ED, C, E> {
  /**
   * @description
   * @public
   * @readonly
   * @type {DescriptorChain<O, K, V, A, ED, C, E, WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>}
   */
  public get chain() {
    return this.#chain;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {A}
   */
  public override get active() {
    return this.chain.current.active as A | { onGet?: boolean; onSet?: boolean };
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {ED}
   */
  public override get enabled() {
    return this.chain.current.enabled as ED;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {number}
   */
  public override get index() {
    return this.chain.current.index as number;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {*}
   */
  public override get onGet() {
    return this.chain.current.onGet;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {*}
   */
  public override get onSet() {
    return this.chain.current.onSet;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {}
   */
  public override get previousDescriptor() {
    return this.chain.get(this.index - 1);
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {*}
   */
  public override get privateKey() {
    return this.chain.current.privateKey;
  }

  /**
   * @description The descriptor chain instance.
   * @type {DescriptorChain<O, K, V, A, ED, C, E, WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>}
   */
  #chain: DescriptorChain<O, K, V, A, ED, C, E, WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>;

  /**
   * @description The object to define the descriptor on.
   * @type {O}
   */
  #object: O;

  /**
   * @description The key to define the descriptor on.
   * @type {K}
   */
  #key: K;

  /**
   * Creates an instance of `WrappedDescriptor`.
   * @constructor
   * @param {WrappedPropertyDescriptor<O, K, V, A, ED, C, E>} param0 The properties of the wrapped descriptor.
   * @param {O} object The object to define the descriptor on.
   * @param {K} key The key to define the descriptor on.
   * @param {?ValidationCallback<WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>} [onValidate] 
   */
  constructor(
    {
      active,
      configurable,
      enabled,
      enumerable,
      get,
      onGet,
      onSet,
      previousDescriptor,
      index,
      privateKey,
      set
    }: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>,
    object: O,
    key: K,
    onValidate?: ValidationCallback<WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>
  ) {
    super(arguments[0], object, key, onValidate);
    // Initialize the descriptor chain.
    this.#chain = new DescriptorChain(object, key);
    // Set the object.
    this.#object = object;
    // Set the key.
    this.#key = key;
    // Add the descriptor to the chain.
    this.add({
      active,
      configurable,
      enabled,
      enumerable,
      get,
      onGet,
      onSet,
      previousDescriptor,
      index,
      privateKey,
      set
    });
  }

  /**
   * @description Adds a new descriptor to the chain.
   * @public
   * @param {WrappedPropertyDescriptor<O, K, V, A, ED, C, E>} descriptor The descriptor to add.
   * @param {K} [key=this.#key] The key to define the descriptor on.
   * @returns {this} The instance of the chain descriptor for method chaining.
   */
  public add(
    descriptor: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>,
    key = this.#key
  ) {
    const chain = this.chain;

    // Sets the current index to the last index of the chain if not already set.
    !descriptor.index && (descriptor.index = this.chain.lastIndex + 1);

    // Sets the current index to the descriptor index or last index of the chain.
    this.chain.setCurrentIndex(descriptor.index);

    // Set the private key if not provided.
    this.#chain.add(new WrappedDescriptor({ ...{
      index: descriptor.index,
      set: function(
        this: O,
        value: V,
        descriptor?: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>
      ) {
        if (descriptor) {
          if (descriptor.enabled === true) {
            // Set the this as the target object.
            const o = (this as O);

            // Get the previous value from previous descriptor or current value.
            const previousValue = o[descriptor.privateKey as K] as V
              || (
                descriptor.previousDescriptor ?
                  descriptor.previousDescriptor.get
                    ? descriptor.previousDescriptor.get.call(this)
                    : (descriptor.previousDescriptor as PropertyDescriptor).value
                  : undefined
              ) as V;

            // Perform previous descriptor.
            typeof descriptor.index === 'number'
              && descriptor.index > 0
              && chain.get(descriptor.index - 1)?.set?.call(o, value, descriptor);

            // Set the private property value.
            Object.assign(
              o as any,
              {
                [descriptor.privateKey as K]: descriptor.onSet && descriptor.isActive?.('onSet')
                  ? descriptor.onSet.call(o, value, previousValue, key, o) as V
                  : value
              }
            );
          }
        }
      }
    }, ...descriptor }, this.#object, this.#key));
    return this;
  }
}
