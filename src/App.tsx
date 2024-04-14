import { createSignal, type Component } from "solid-js";

import { Effect, Console } from "effect"

const App: Component = () => {
  const [count, setCount] = createSignal<number>(0);

  const program = Console.log("Hello, World!");
  Effect.runSync(program);

  return (
    <div>
      <header>
        <button
          class="text-base bg-blue-400 hover:bg-blue-500 text-sm text-white py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={() => setCount(count() + 1)}
        >
          Count: {count()}
        </button>
      </header>
    </div>
  );
};

export default App;
