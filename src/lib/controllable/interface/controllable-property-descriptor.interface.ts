import { WrappedPropertyDescriptor } from '@typedly/descriptor';
import { WrappedPropertyDescriptorController } from '@typedly/controller';

export interface ControllablePropertyDescriptor<
  O = any,
  K extends keyof O = keyof O,
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  A extends boolean = boolean,
  N extends boolean = boolean,
  C extends boolean = boolean,
  E extends boolean = boolean,
  D extends ControllablePropertyDescriptor<O, K, V, A, N, C, E, D> = ControllablePropertyDescriptor<O, K, V, A, N, C, E, any>,
> extends WrappedPropertyDescriptor<O, K, V, A, N, C, E, D> {
  get active(): A | { onGet?: boolean; onSet?: boolean };
  get enabled(): N;
  get controller(): WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>;
  get key(): K;
}
