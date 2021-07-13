import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders trivial paragraph", () => {
    render(<App />);
    const linkElement = screen.getByText(/CRM system/);
    expect(linkElement).toBeInTheDocument();
  });
});
