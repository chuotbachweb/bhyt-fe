import { test } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "./Routes";

test("Routes mounts properly", () => {
  render(
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
  );
  //expect(screen.getByText("Trang chủ")).toBeInTheDocument();
});

//TODO: update to actual landing page content
