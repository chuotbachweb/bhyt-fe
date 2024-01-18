import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OTP from "./OTP";

test("OTP mounts properly", () => {
  render(<OTP />);
  expect(screen.getByText("Xác thực OTP")).toBeInTheDocument();
});
