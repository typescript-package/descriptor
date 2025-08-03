// import { ControllableDescriptorBase } from '../lib/controllable-descriptor-base.abstract';
// import { WrappedPropertyDescriptor } from '@typedly/descriptor';
// import { WrappedPropertyDescriptorController } from '@typedly/controller';
// import { WrappedDescriptorController } from '../lib/wrapped-descriptor-controller.class';




// export class TestControllableDescriptor<
//   // Object.
//   O = any,
//   // Key.
//   K extends keyof O = keyof O,
//   // Value.
//   V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
//   // Active.
//   A extends boolean = boolean,
//   // Enabled.
//   N extends boolean = boolean,
//   // Configurable.
//   C extends boolean = boolean,
//   // Enumerable.
//   E extends boolean = boolean,
//   // The type of the previous descriptor.
//   D extends ControllableDescriptorBase<O, K, V, A, N, C, E, D> = ControllableDescriptorBase<O, K, V, A, N, C, E, any>,
// > extends ControllableDescriptorBase<O, K, V, A, N, C, E, D> {
//   /**
//    * @description The string tag for the descriptor.
//    * @public
//    * @readonly
//    * @type {string}
//    */
//   public get [Symbol.toStringTag](): string {
//     return 'WrappedDescriptor';
//   }

//   /**
//    * @inheritdoc
//    */
//   public override get active() {
//     return this.controller.active;
//   }

//   /**
//    * @inheritdoc
//    */
//   public override get enabled() {
//     return this.controller.enabled;
//   }

//   /**
//    * @inheritdoc
//    */
//   public override get index() {
//     return this.controller.index;
//   }

//   /**
//    * @inheritdoc
//    */
//   public override get key() {
//     return this.controller.key;
//   }

//   /**
//    * @inheritdoc
//    */
//   public override get onGet() {
//     return this.controller.onGet;
//   }

//   /**
//    * @inheritdoc
//    */
//   public override get onSet() {
//     return this.controller.onSet;
//   }

//   /**
//    * @inheritdoc
//    */
//   public override get previousDescriptor() {
//     return this.controller.previousDescriptor as ('value' extends keyof D ? PropertyDescriptor : D) | undefined;
//   }


//   public override get privateKey() {
//     return this.controller.privateKey;
//   }

//   /**
//    * @description The `controller` for the descriptor.
//    * @public
//    * @readonly
//    * @type {R}
//    */
//   public get controller() {
//     return this.#controller;
//   }

//   /**
//    * @inheritdoc
//    * @public
//    * @readonly
//    * @type {*}
//    */
//   public override get get() {
//     return this.controller.get;
//   }

//   /**
//    * @inheritdoc
//    * @public
//    * @readonly
//    * @type {*}
//    */
//   public override get set() {
//     return this.controller.set;
//   }

//   /**
//    * @description Privately stored controller.
//    * @type {WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>}
//    */
//   #controller: WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>;

//   constructor(
//     object: O,
//     key: K,
//     descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
//   ) {
//     super(object, key, descriptor);
//     this.#controller = new WrappedDescriptorController<O, K, V, A, N, C, E, D>(
//       object,
//       key,
//       descriptor
//     );
//   }
// }
