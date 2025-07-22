// Abstract.
import { WrappedDescriptorBase } from './wrapped-descriptor-base.abstract';
// Class.
import { DescriptorChain } from './descriptor-chain.class';
import { WrappedDescriptor } from './wrapped-descriptor.class';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ValidationCallback } from '@typedly/callback';
/**
 * @description 
 * @export
 * @class WrappedDescriptor
 * @template [O=any] 
 * @template {keyof O} [K=keyof O] 
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [ED=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @extends {WrappedDescriptor<O, K, V, A, ED, C, E>}
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

  public get chain() {
    return this.#chain;
  }

  /**
   * @inheritdoc
   */
  public override get active() {
    return this.chain.last().active as A;
  }

  /**
   * @inheritdoc
   */
  public override get enabled() {
    return this.chain.last().enabled as ED;
  }

  public override get index() {
    return this.chain.last().index as number;
  }

  /**
   * @inheritdoc
   */
  public override get onGet() {
    return this.chain.last()?.onGet;
  }

  /**
   * @inheritdoc
   */
  public override get onSet() {
    return this.chain.last()?.onSet;
  }

  /**
   * @inheritdoc
   */
  public override get previousDescriptor() {
    return this.chain.get(this.index - 1);
  }

  /**
   * @inheritdoc
   */
  public override get privateKey() {
    return this.chain.last().privateKey;
  }

  #chain: DescriptorChain<O, K, V, A, ED, C, E, WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>;
  #object: O;
  #key: K;

  /**
   * Creates an instance of `WrappedDescriptor`.
   * @constructor
   * @param {WrappedPropertyDescriptor<O, K, V, A, ED, C, E>} param0 
   * @param {O} object 
   * @param {K} key 
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
    this.#object = object;
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

  public add(
    descriptor: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>,
    key = this.#key
  ) {
    const chain = this.chain;

    // Set the index if not provided.
    typeof descriptor.index === 'undefined' && (descriptor.index = this.chain.lastIndex);

    const set = function(
      this: O,
      value: V,
      descriptor?: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>
    ) {
      if (descriptor) {
        if (descriptor.enabled !== false) {
          // Set the this as the target object.
          const o = (this as O);

          // Get the previous value from previous descriptor or current value.
          // const previousValue = (o[descriptor.privateKey as K] as O[K] || (descriptor.previousDescriptor as PropertyDescriptor)?.value) as V;

          // Perform previous descriptor.
          typeof descriptor.index === 'number' && descriptor.index > 0 && chain.get(descriptor.index - 1)?.set?.call(o, value, descriptor);

          // Set the private property value.
          Object.assign(
            o as any,
            {
              [descriptor.privateKey as K]: descriptor.onSet
                && (
                  (typeof descriptor.active === 'boolean' && descriptor.active)
                  || (typeof descriptor.active === 'object' && descriptor.active.onSet === true)
                )
                ? descriptor.onSet.call(o, value, undefined as any, key, o) as V
                : value
            }
          );
        };
      }
    }

    descriptor = { ...{ set }, ...descriptor };

    this.#chain.add(new WrappedDescriptor(descriptor, this.#object, this.#key));

    return this;
  }
}
