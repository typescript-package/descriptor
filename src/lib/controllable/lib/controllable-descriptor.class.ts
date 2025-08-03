// Abstract.
import { ControllableDescriptorBase } from './controllable-descriptor-base.abstract';
// Interface.
import { ControllablePropertyDescriptor } from '../interface/controllable-property-descriptor.interface';
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
import { WrappedPropertyDescriptorController } from '@typedly/controller';

export class ControllableDescriptor<
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
  // Descriptor.
  D extends ControllablePropertyDescriptor<O, K, V, A, N, C, E, D> = ControllablePropertyDescriptor<O, K, V, A, N, C, E, any>,
> extends ControllableDescriptorBase<O, K, V, A, N, C, E, D> {
  /**
   * @description The string tag for the descriptor.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'ControllableDescriptor';
  }

  /**
   * Creates an instance of `ControllableDescriptor`.
   * @constructor
   * @param {O} object 
   * @param {K} key 
   * @param {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} [descriptor={}] 
   * @param {new (
   *       object: O,
   *       key: K,
   *       descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
   *     ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>} controller 
   */
  constructor(
    object: O,
    key: K,
    descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> = {},
    controller: new (
      object: O,
      key: K,
      descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
    ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>
  ) {
    super(object, key, descriptor, controller);
  }
}
