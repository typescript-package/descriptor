// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
    import { ValidationCallback } from '@typedly/callback';
    import { WrappedDescriptorCore } from './wrapped-descriptor-core.abstract';

export class WeakWrappedDescriptor<
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

  public static getDescriptor<
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
  >(instance: WeakWrappedDescriptor<O, K, V, A, ED, C, E>): WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | undefined {
    return this.#descriptor.get(instance) as WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | undefined;
  }

  static #setDescriptor<
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
  >(
    instance: WeakWrappedDescriptor<O, K, V, A, ED, C, E>,
    descriptor: WrappedPropertyDescriptor<O, K, V, A, ED, C, E>
  ): void {
    this.#descriptor.set(instance, descriptor);
  }

  static readonly #descriptor: WeakMap<
    WeakWrappedDescriptor<any, any, any, any, any, any, any>,
    WrappedPropertyDescriptor<any, any, any, any, any, any, any>
  > = new WeakMap();

  public get active() {
    return WeakWrappedDescriptor.#descriptor.get(this)?.active;
  }

  public get enabled() {
    return WeakWrappedDescriptor.#descriptor.get(this)?.enabled;
  }

  public get onGet() {
    return WeakWrappedDescriptor.#descriptor.get(this)?.onGet;
  }

  public get onSet() {
    return WeakWrappedDescriptor.#descriptor.get(this)?.onSet;
  }

  public get previousDescriptor() {
    return WeakWrappedDescriptor.#descriptor.get(this)?.previousDescriptor;
  }

  public get privateKey() {
    return WeakWrappedDescriptor.#descriptor.get(this)?.privateKey;
  }

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
    super({configurable, enumerable, get, set}, object, key, onValidate);

    const descriptor = this;

    WeakWrappedDescriptor.#setDescriptor(this, descriptor);

    get
      ? (this.get = function(this: O): V { return get?.call(this, descriptor) as V; })
      : (this.get = function(this: O): V {
        if (descriptor.enabled === false) {
          return undefined as V;
        }

        const o = (this as O);

        // Get the previous value from descriptor.
        const previousValue = descriptor.previousDescriptor
          ? descriptor.previousDescriptor.get && typeof descriptor.previousDescriptor.get === 'function'
            ? descriptor.previousDescriptor.get.call(this)
            : (descriptor.previousDescriptor as PropertyDescriptor).value
          : undefined;

        // Current descriptor.
        return descriptor.onGet
          && ((typeof descriptor.active === 'boolean' && descriptor.active)
            || (typeof descriptor.active === 'object' && descriptor.active.onGet === true))
          ? descriptor.onGet.call(o, key, previousValue, o[descriptor.privateKey as K] as V, o) as V
          : o[descriptor.privateKey as K] as V;
      });

    set
      ? (this.set = function(this: O, value: V) { return set?.call(this, value, descriptor); })
      : (this.set = function(this: O, value: V): void {
      if (descriptor.enabled !== false) {
        // Set the this as the target object.
        const o = (this as O);

        // Get the previous value from previous descriptor or current value.
        const previousValue = (o[descriptor.privateKey as K] as O[K] || (descriptor.previousDescriptor as PropertyDescriptor)?.value) as O[K];

        // Perform previous descriptor.
        descriptor.previousDescriptor?.set && descriptor.previousDescriptor.set.call(o, value);

        // Set the private property value.
        Object.assign(
          o as any,
          {
            [descriptor.privateKey as K]: descriptor.onSet
              && (
                (typeof descriptor.active === 'boolean' && descriptor.active)
                || (typeof descriptor.active === 'object' && descriptor.active.onSet === true)
              )
              ? descriptor.onSet.call(o, value, previousValue, key, o) as O[K]
              : value
          }
        );
      }
    });
  }
}
