// Abstract.
import { WrappedDescriptorCore } from './wrapped-descriptor-core.abstract';
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
 * @extends {WrappedDescriptorCore<O, K, V, A, ED, C, E>}
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
  ED extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
> extends WrappedDescriptorCore<O, K, V, A, ED, C, E> {
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
      privateKey,
      set
    }: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>,
    object: O,
    key: K,
    onValidate?: ValidationCallback<WrappedPropertyDescriptor<O, K, V, A, ED, C, E>>
  ) {
    super({ configurable, enumerable, get, set }, object, key, onValidate);

    // Use descriptor instance.
    const descriptor = this;

    // Set the `get`.
    this.get = get
      ? (function (this: O): V { return get?.call(this, descriptor) as V; })
      : (function (this: O): V {
        if (descriptor.enabled === true) {
          const o = (this as O);

          // Get the previous value from descriptor.
          const previousValue = descriptor.previousDescriptor
            ? descriptor.previousDescriptor.get && typeof descriptor.previousDescriptor.get === 'function'
              ? descriptor.previousDescriptor.get.call(this)
              : (descriptor.previousDescriptor as PropertyDescriptor).value
            : undefined;

          // Current descriptor.
          return descriptor.onGet && descriptor.isActive('onGet')
            ? descriptor.onGet.call(o, key, previousValue, o[descriptor.privateKey as K] as V, o) as V
            : o[descriptor.privateKey as K] as V;
        } else {
          return undefined as V;
        }
      }
    );

    // Set the `set`.
    this.set = set 
      ? (function (this: O, value: V): void { return set?.call(this, value, descriptor); })
      : (function (this: O, value: V): void {
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
          descriptor.previousDescriptor?.set && descriptor.previousDescriptor.set.call(o, value);

          // Set the private property value.
          Object.assign(
            o as any,
            {
              [descriptor.privateKey as K]: descriptor.onSet && descriptor.isActive('onSet')
                ? descriptor.onSet.call(o, value, previousValue, key, o) as V
                : value
            }
          );
        }
      });
  }

  /**
   * @description
   * @public
   * @param {('onGet' | 'onSet')} type 
   * @returns {boolean} 
   */
  public isActive(type: 'onGet' | 'onSet'): boolean {
    return typeof this.active === 'boolean'
      ? this.active
      : type === 'onGet' || type === 'onSet' ? this.active[type] === true : false;
  }
}
