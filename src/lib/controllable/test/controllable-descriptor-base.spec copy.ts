// import { WrappedPropertyDescriptorController } from "@typedly/controller";
// import { Person } from "../../../test/person.test";
// import { ControllableDescriptorBase } from "../lib/controllable-descriptor-base.abstract";
// import { WrappedPropertyDescriptor } from "@typedly/descriptor";
// // import { WrappedDescriptorController } from "../lib/wrapped-descriptor-controller.class";
// import { WrappedDescriptorBase } from "../lib/wrapped-descriptor-base.abstract";

// const person = new Person();


// export class WrappedDescriptorController<
// O = any, K extends keyof O = keyof O,
// V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
// A extends boolean = boolean, N extends boolean = boolean, C extends boolean = boolean,
// E extends boolean = boolean,
// D extends WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> = WrappedPropertyDescriptor<O, K, V, A, N, C, E, any>
// > implements WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D> {
//   active: A | { onGet?: boolean | undefined; onSet?: boolean | undefined; } = true as A;
//   enabled: N = true as N;
//   key: K = '' as K;
//   privateKey: PropertyKey = '' as PropertyKey;

//   // constructor(
//   //   object: O,
//   //   key: K,
//   //   descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> = {}
//   // ) {

//   // }

//   public activate(callback: "both" | "onGet" | "onSet"): this {
//     return this;
//   }

//   public deactivate(callback: "both" | "onGet" | "onSet"): this {
//     return this;
//   }

//   public enable(): this {
//     return this;
//   }

//   public disable(): this {
//     return this;
//   }

//   public isActive(callback: "both" | "onGet" | "onSet"): boolean {
//     return true;
//   }
// }

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
//   // The type of the controller.
//   R extends WrappedDescriptorController<O, K, V, A, N, C, E, D> = WrappedDescriptorController<O, K, V, A, N, C, E, any>,
//   // The type of the previous descriptor.
//   D extends ControllableDescriptorBase<O, K, V, A, N, C, E, R, D> = ControllableDescriptorBase<O, K, V, A, N, C, E, R, any>,
// > extends ControllableDescriptorBase<O, K, V, A, N, C, E, R, D> {
//   public get controller() {
//     return undefined as any;
//     // return this.#controller;
//   }

//   // #controller: R;


//   constructor(
//     object: O,
//     key: K,
//     descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>,
//     // controller: new (object: O, key: K, descriptor: WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>) => R
//     // controller: R
//   ) {
//     super(object, key, descriptor);
//     // this.#controller = undefined as any;
//     // this.#controller = new controller(object, key, descriptor);
//   }
// }



// new TestControllableDescriptor(
//   person, 'name', {}, 
//   // {} as any
//   // WrappedDescriptorController
// );
