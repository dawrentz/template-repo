import { experiments } from "webpack";
import * as Mod from "./mod.js";

test("works", () => {
  expect(Mod.testFunc()).toBe(777);
});
