// Class.
import { AccessorDescriptor } from './accessor-descriptor.class';
// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { GetterCallback, ValidationCallback, SetterCallback } from '@typedly/callback';
/**
 * @description
 * @export
 * @abstract
 * @class WrappedDescriptorCore
 * @template [O=any] 
 * @template {keyof O} [K=keyof O] 
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [ED=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @extends {AccessorDescriptor<O, K, V, C, E>}
 */
export abstract class WrappedDescriptorCore<
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
  abstract get active(): A | { onGet?: boolean; onSet?: boolean };
  abstract get enabled(): ED;
  abstract get onGet(): GetterCallback<O, K> | undefined;
  abstract get onSet(): SetterCallback<O, K> | undefined;
  abstract get previousDescriptor(): WrappedPropertyDescriptor<O, K, V, A, ED, C, E> | PropertyDescriptor | undefined;
  abstract get privateKey(): PropertyKey | undefined;
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
  }
}
