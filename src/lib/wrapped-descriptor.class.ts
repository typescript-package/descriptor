// Class.
import { AccessorDescriptor } from './accessor-descriptor.class';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { GetterCallback, ValidationCallback, SetterCallback } from '@typedly/callback';

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
> extends AccessorDescriptor<O, K, V, C, E> {
  public get active() {
    return this.#active;
  }

  public get enabled() {
    return this.#enabled;
  }

  public get onGet() {
    return this.#onGet;
  }

  public get onSet() {
    return this.#onSet;
  }

  public get previousDescriptor() {
    return this.#previousDescriptor;
  }

  public get privateKey() {
    return this.#privateKey;
  }

  #active: A | { onGet?: boolean; onSet?: boolean } = true as A;
  #enabled: ED = true as ED;
  #previousDescriptor: WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | PropertyDescriptor | undefined = undefined;
  #privateKey: PropertyKey | undefined = undefined;
  #onGet: GetterCallback<O, K> | undefined = undefined;
  #onSet: SetterCallback<O, K> | undefined = undefined;

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

    !get && (this.get = function(this: O): V {
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

    !set && (this.set = function(this: O, value: V): void {
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

    this.#active = typeof active === 'object' ? active : true as A;
    this.#enabled = enabled as ED;
    this.#onGet = onGet;
    this.#onSet = onSet;
    this.#previousDescriptor = previousDescriptor;
    this.#privateKey = privateKey;
  }
}
