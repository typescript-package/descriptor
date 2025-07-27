// Abstract.
import { WrappedDescriptorBase } from './wrapped-descriptor-base.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { GetterCallback, SetterCallback } from '@typedly/callback';
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
 * @extends {WrappedDescriptorBase<O, K, V, A, ED, C, E>}
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
  ED extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  D extends WrappedDescriptor<O, K, V, A, ED, C, E, D> = WrappedDescriptor<O, K, V, A, ED, C, E, any>
> extends WrappedDescriptorBase<O, K, V, A, ED, C, E, D> {
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
    return this.#previousDescriptor;
  }

  /**
   * @inheritdoc
   */
  public get privateKey() {
    return this.#privateKey;
  }

  /**
   * @description Privately stored active state of the descriptor.
   * @type {(A | { onGet?: boolean; onSet?: boolean })}
   */
  #active: A | { onGet?: boolean; onSet?: boolean } = true as A;

  /**
   * @description Privately stored enabled state of the descriptor.
   * @type {ED}
   */
  #enabled: ED = true as ED;

  /**
   * @description Privately stored index of the descriptor in the chain.
   * @type {number}
   */
  #index?: number = undefined;

  /**
   * @description
   * @type {K}
   */
  #key: K;

  /**
   * @description Privately stored previous descriptor.
   * @type {?(D | PropertyDescriptor)}
   */
  #previousDescriptor?: 'value' extends keyof D ? PropertyDescriptor : D;

  /**
   * @description Privately stored private key for the descriptor.
   * @type {PropertyKey}
   */
  #privateKey: PropertyKey;

  /**
   * @description Privately stored getter callback for the descriptor.
   * @type {?GetterCallback<O, K>}
   */
  #onGet?: GetterCallback<O, K>;

  /**
   * @description Privately stored setter callback for the descriptor.
   * @type {?SetterCallback<O, K>}
   */
  #onSet?: SetterCallback<O, K>;

  /**
   * Creates an instance of `WrappedDescriptor`.
   * @constructor
   * @param {O} object 
   * @param {K} key
   * @param {WrappedPropertyDescriptor<O, K, V, A, ED, C, E>} param0 
   */
  constructor(
    object: O,
    key: K,
    {
      active,
      configurable,
      enabled,
      enumerable,
      get,
      index,
      onGet,
      onSet,
      previousDescriptor,
      privateKey,
      set,
    }: WrappedPropertyDescriptor<O, K, V, A, ED, C, E, D> = {}
  ) {
    super(object, key, { configurable, enumerable, get, set });
    this.#active = (active || WrappedDescriptor.active) as A;
    this.#enabled = (enabled || WrappedDescriptor.enabled) as ED;
    typeof index === 'number' && (this.#index = index);
    this.#key = key;
    this.#onGet = onGet;
    this.#onSet = onSet;
    this.#previousDescriptor = previousDescriptor
      || {
        ...{enabled: true},
        ...Object.getOwnPropertyDescriptor(object, key)
      } as any;

    // Set the private key.
    this.#privateKey = privateKey || `_${String(key)}` as PropertyKey;
    // Wrap the property.
    super.wrap({ get, set });
  }

  /**
   * @inheritdoc
   */
  public activate(): this {
    this.#active = true as A;
    return this;
  }

  /**
   * @inheritdoc
   */
  public deactivate(): this {
    this.#active = false as A;
    return this;
  }

  /**
   * @inheritdoc
   */
  public disable(): this {
    this.#enabled = false as ED;
    return this;
  }

  /**
   * @inheritdoc
   */
  public enable(): this {
    this.#enabled = true as ED;
    return this;
  }
}
