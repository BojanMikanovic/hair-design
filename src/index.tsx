/// <reference types="vite/client" />

import { createAccessorModelProxy, Store } from "cx/data";
import { expr, startHotAppLoop } from "cx/ui";
import { Debug } from "cx/util";
import { Button, TextField } from "cx/widgets";
import { renderThemeVariables, defaultPreset } from "cx-theme-variables";

import "./tailwind.css";
import "./index.scss";

renderThemeVariables(defaultPreset);

Debug.enable("app-data");

interface Model {
  name: string;
}

const store = new Store<Model>();

const m = createAccessorModelProxy<Model>();

const App = (
  <div class="p-16 m-8 border border-gray-200 rounded-2xl bg-gray-50">
    <h1 class="font-bold text-5xl">CxJS Vite App</h1>
    <p class="mt-4">
      Hello <span text={expr(m.name, (name) => name ?? "Unnamed Explorer")} />!
    </p>
    <div class="mt-5">
      <TextField value={m.name} placeholder="Enter your name" />
    </div>
    <div class="mt-5">
      <Button
        onClick={(e, { store }) => alert("Hello " + store.get(m.name))}
        disabled={expr(m.name, (name) => !name)}
      >
        Click Me
      </Button>
    </div>
  </div>
);

// remove later
if (!import.meta.hot.data.state) import.meta.hot.data.state = {};

startHotAppLoop(
  { hot: import.meta.hot },
  document.getElementById("app")!,
  store,
  App,
);

// this is required even though startHotAppLoop calls it too
if (import.meta.hot) import.meta.hot.accept();
