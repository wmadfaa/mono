import React from "react";
import { render, screen } from "@testing-library/react";
import { JsComponent } from ".";

describe("JsComponent", () => {
  it("should render name", function () {
    render(<JsComponent data-testid="js-component" name="wasim" />);

    expect(screen.getByTestId(/js-component/i)).toHaveTextContent(/wasim/i);
  });
});
