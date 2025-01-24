// Abstract,
import { CommonDescriptor } from './common-descriptor.abstract';
// Interface.
import { ThisAccessorPropertyDescriptor, AccessorPropertyDescriptor } from '@typedly/descriptor';
// Type.
import { ValidationCallback } from '@typedly/callback';
/**
 * @description
 * @export
 * @class AccessorDescriptor
 * @template {object} [Obj=object] 
 * @template {keyof Obj} [PropertyName=keyof Obj] 
 * @template [Value=Obj[PropertyName]] 
 * @extends {CommonDescriptor}
 */
export class AccessorDescriptor<
  Obj extends object = object,
  PropertyName extends keyof Obj = keyof Obj,
  Value = Obj[PropertyName],
> extends CommonDescriptor {
  /**
   * @description Returns strictly defined accessor descriptor of a `ThisAccessorPropertyDescriptor<Value, Obj>` type on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, to define with the default values of the
   * `CommonDescriptor`.
   * @param onGuard A `ValidationCallback` function to handle the result of the check whether the `descriptor` is an `object`
   * with `get` or `set` property, by default it uses `accessorCallback()` function.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The returned value is an `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type.
   */
  public static define<Value, Obj extends object = object>(
    descriptor: ThisAccessorPropertyDescriptor<Value, Obj>,
    onGuard?: ValidationCallback
  ): ThisAccessorPropertyDescriptor<Value, Obj> | undefined {
    const { configurable, enumerable, get, set } = descriptor;
    return this.guard(descriptor, onGuard)
      ? {
        ...{
          configurable: AccessorDescriptor.configurable,
          enumerable: AccessorDescriptor.enumerable,
        },
        ...{ configurable, enumerable, get, set }
      }
      : undefined;
  }

  /**
   * @description Guards the `descriptor` to be an `object` of a `ThisAccessorPropertyDescriptor<Value, Obj>` type.
   * @param descriptor The object of a `ThisAccessorPropertyDescriptor<Value, Obj>` type to guard.
   * @param callbackFn A `ValidationCallback` function to handle the result of the check whether or not the descriptor is an `object`
   * containing the `get` or `set` property.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorPropertyDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The return value is a boolean indicating whether the `descriptor` is an `object` with the `get` or `set` property.
   */
  public static guard<Value, Obj extends object>(
    descriptor: ThisAccessorPropertyDescriptor<Value, Obj>,
    callbackFn?: ValidationCallback
  ): descriptor is ThisAccessorPropertyDescriptor<Value, Obj> {
    return callbackFn?.(typeof descriptor === 'object' && ('get' in descriptor || 'set' in descriptor), descriptor) || false;
  }

  //#region Accessor descriptor.
  /**
   * @description
   * @public
   * @type {?() => Value}
   */
  public get?: () => Value;

  /**
   * @description
   * @public
   * @type {?(value: Value) => void}
   */
  public set?: (value: Value) => void;
  //#endregion

  /**
   * Creates an instance of `AccessorDescriptor`.
   * @constructor
   * @param {AccessorPropertyDescriptor<Value>} [param0={}] 
   * @param {AccessorPropertyDescriptor<Value>} param0.get 
   * @param {AccessorPropertyDescriptor<Value>} param0.set 
   * @param {?Obj} [object] 
   * @param {?PropertyName} [key] 
   */
  constructor(
    { configurable, enumerable, get, set }: AccessorPropertyDescriptor<Value> = {},
    object?: Obj,
    key?: PropertyName
  ) {
    super({ configurable, enumerable });
    delete this.get, delete this.set;

    typeof get === 'function' && (this.get = get);
    typeof set === 'function' && (this.set = set);
  }
}
