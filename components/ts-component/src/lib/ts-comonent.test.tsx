import React from "react";
import { render, screen } from "@testing-library/react";
import { TsComponent } from ".";

describe("TsComponent", () => {
  it("should render name", function () {
    render(<TsComponent data-testid="ts-component" name="wasim" />);

    expect(screen.getByTestId(/ts-component/i)).toHaveTextContent(/wasim/i);
  });
});
