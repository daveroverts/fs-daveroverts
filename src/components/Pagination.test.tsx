import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders nothing for a single page", () => {
    const { container } = render(
      <Pagination current={1} total={1} basePath="/archive" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("links page 1 to the bare basePath and others to /page/N", () => {
    render(<Pagination current={1} total={3} basePath="/archive" />);
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/archive/page/2",
    );
    // The active page renders as a span, not a link.
    expect(screen.queryByRole("link", { name: "1" })).toBeNull();
  });

  it("disables Previous on the first page and Next on the last", () => {
    const { rerender } = render(
      <Pagination current={1} total={3} basePath="/archive" />,
    );
    expect(screen.queryByRole("link", { name: /Previous/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Next/ })).toHaveAttribute(
      "href",
      "/archive/page/2",
    );

    rerender(<Pagination current={3} total={3} basePath="/archive" />);
    expect(screen.queryByRole("link", { name: /Next/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Previous/ })).toHaveAttribute(
      "href",
      "/archive/page/2",
    );
  });
});
