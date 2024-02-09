import { Effect, Console } from "effect"

// $ExpectType Effect<number, never, Scope>
const program = Effect.addFinalizer((exit) =>
  Console.log(`finalizer after ${exit._tag}`)
).pipe(Effect.flatMap(() => Effect.succeed(1)))

// $ExpectType Effect<number, never, never>
const runnable = Effect.scoped(program)

Effect.runPromise(runnable).then(console.log, console.error)
/*
Output:
finalizer after Success
1
*/
