// // Abstract.
// import { WrappedDescriptorCore } from "../../wrapped/lib/wrapped-descriptor-core.abstract";
// // Interface.
// import { ControllablePropertyDescriptor } from "../interface/controllable-property-descriptor.interface";
// import { WrappedPropertyDescriptorController } from "@typedly/controller";

// export abstract class ControllableDescriptorCore<
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
//   D extends ControllablePropertyDescriptor<O, K, V, A, N, C, E, D> = ControllablePropertyDescriptor<O, K, V, A, N, C, E, any>,
// > extends WrappedDescriptorCore<O, K, V, A, N, C, E, D>
//   implements ControllablePropertyDescriptor<O, K, V, A, N, C, E, D> {
//   abstract override get active(): A | { onGet?: boolean; onSet?: boolean };
//   abstract get controller(): WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>;
//   abstract override get enabled(): N;
//   abstract override get key(): K;
// }
