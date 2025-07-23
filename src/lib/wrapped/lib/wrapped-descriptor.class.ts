// Abstract.
import { WrappedDescriptorBase } from './wrapped-descriptor-base.abstract';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { GetterCallback, ValidationCallback, SetterCallback } from '@typedly/callback';
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
> extends WrappedDescriptorBase<O, K, V, A, ED, C, E> {
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

  public get index() {
    return this.#index;
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
  #index: number = 0;

  /**
   * @description Privately stored previous descriptor.
   * @type {(WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | PropertyDescriptor | undefined)}
   */
  #previousDescriptor: WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | PropertyDescriptor | undefined = undefined;

  /**
   * @description Privately stored private key for the descriptor.
   * @type {(PropertyKey | undefined)}
   */
  #privateKey: PropertyKey | undefined = undefined;

  /**
   * @description Privately stored getter callback for the descriptor.
   * @type {(GetterCallback<O, K> | undefined)}
   */
  #onGet: GetterCallback<O, K> | undefined = undefined;

  /**
   * @description Privately stored setter callback for the descriptor.
   * @type {(SetterCallback<O, K> | undefined)}
   */
  #onSet: SetterCallback<O, K> | undefined = undefined;

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
      index,
      onGet,
      onSet,
      previousDescriptor,
      privateKey,
      set,
    }: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>,
    object: O,
    key: K,
    onValidate?: ValidationCallback<WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>
  ) {
    super({ configurable, enumerable, get, set }, object, key, onValidate);

    this.#active = active as A;
    this.#enabled = enabled as ED;
    typeof index === 'number' && (this.#index = index);
    this.#onGet = onGet;
    this.#onSet = onSet;
    this.#previousDescriptor = previousDescriptor;
    this.#privateKey = privateKey;
  }
}
