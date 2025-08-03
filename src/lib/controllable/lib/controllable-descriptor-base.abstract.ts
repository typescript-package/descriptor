// Abstract.
import { ControllableDescriptorCore } from './controllable-descriptor-core.abstract';
// Interface.
import { ControllablePropertyDescriptor } from '../interface/controllable-property-descriptor.interface';
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
import { WrappedPropertyDescriptorController } from '@typedly/controller';

export abstract class ControllableDescriptorBase<
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
  D extends ControllablePropertyDescriptor<O, K, V, A, N, C, E, D> = ControllablePropertyDescriptor<O, K, V, A, N, C, E, any>,
> extends ControllableDescriptorCore<O, K, V, A, N, C, E, D> {
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
  public override get active() {
    return this.controller.active;
  }

  /**
   * @description The `controller` for the descriptor.
   * @public
   * @readonly
   * @type {WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>}
   */
  public override get controller() {
    return this.#controller;
  }

  /**
   * @inheritdoc
   */
  public override get enabled() {
    return this.controller.enabled;
  }

  /**
   * @inheritdoc
   */
  public override get index() {
    return this.controller.index;
  }

  /**
   * @inheritdoc
   */
  public override get key() {
    return this.controller.key;
  }

  /**
   * @inheritdoc
   */
  public override get onGet() {
    return this.controller.onGet;
  }

  /**
   * @inheritdoc
   */
  public override get onSet() {
    return this.controller.onSet;
  }

  /**
   * @inheritdoc
   */
  public override get previousDescriptor() {
    return this.controller.previousDescriptor as ('value' extends keyof D ? PropertyDescriptor : D) | undefined;
  }

  /**
   * @inheritdoc
   */
  public override get privateKey() {
    return this.controller.privateKey;
  }

  /**
   * @inheritdoc
   */
  public get get() {
    return this.controller.get;
  }

  /**
   * @inheritdoc
   */
  public get set() {
    return this.controller.set;
  }

  /**
   * @description Privately stored controller.
   * @type {WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>}
   */
  #controller: WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>;

  /**
   * Creates an instance of `WrappedDescriptorBase` child class.
   * @constructor
   * @param {O} object The object to define the descriptor on.
   * @param {K} key The key of the object to define the descriptor on.
   * @param {WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>} descriptor The property descriptor to wrap.
   */
  constructor(
    object: O,
    key: K,
    descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
    controller: new (
      object: O,
      key: K,
      descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
    ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>
  ) {
    super({ configurable: descriptor.configurable, enumerable: descriptor.enumerable });
    // Set the controller.
    this.#controller = new controller(
      object,
      key, { 
        ...descriptor,
        ...super.wrap({
          get: descriptor.get,
          set: descriptor.set
        })
      }
    );
  }
}
