import { createSignal, type Component } from "solid-js";

import { Effect, Console } from "effect"
import { HttpClient as Http } from "@effect/platform"
import * as Schema from "@effect/schema/Schema"

const App: Component = () => {
  const [count, setCount] = createSignal<number>(0);
  const [message, setMessage] = createSignal<string>("");

  class Secret extends Schema.Class<Secret>("Secret") ({
    id: Schema.Number,
    message: Schema.String
  }) {
    static decodeResponse = Http.response.schemaBodyJsonScoped(Secret);
  }

  const SecretWithoutId = Schema.Struct(Secret.fields).pipe(Schema.omit("id"));
  type SecretWithoutId = Schema.Schema.Type<typeof SecretWithoutId>;

  const postTodo = (message: string) => {
    Console.log("Posting message", message);
    const secret: SecretWithoutId = { message: message };
    return Http.request.schemaBody(SecretWithoutId)(
      Http.request.post("/message"),
      secret
    )
  }

  return (
    <div class="font-sans">
      <header>
        <div class="flex h-screen justify-center items-center">
          <div class="m-auto text-center">
            <h1 class="text-3xl font-bold text-center text-white">
              Create a new Secret Message
            </h1>
              <input
                type="text"
                class="text-base text-center text-sm py-2 px-4 rounded border-2"
                value={message()}
                onInput={(e) => setMessage(e.currentTarget.value)}
              />
            <button
              class="text-base text-center bg-blue-400 hover:bg-blue-500 text-sm text-white py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => {
                Effect.runPromise(postTodo(message())).then(console.log, console.error);
              }}
            >
              Save {count()}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
