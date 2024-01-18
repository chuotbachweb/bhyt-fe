import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("Footer mounts properly", () => {
  render(<Footer />);
  expect(screen.getByText("Về chúng tôi")).toBeInTheDocument();
});
