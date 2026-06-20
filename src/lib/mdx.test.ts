import { describe, it, expect } from "vitest";
import { slugifyTag } from "./mdx";

describe("slugifyTag", () => {
  it("lowercases and hyphenates", () => {
    expect(slugifyTag("Flight Simulator")).toBe("flight-simulator");
  });

  it("collapses non-alphanumeric runs into a single hyphen", () => {
    expect(slugifyTag("A & B  ++ C")).toBe("a-b-c");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugifyTag("  !Hello!  ")).toBe("hello");
  });

  it("returns an empty string when nothing slugifiable remains", () => {
    expect(slugifyTag("---")).toBe("");
  });
});
