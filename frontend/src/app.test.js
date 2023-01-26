import { render, screen, fireEvent, findByRole } from "@testing-library/preact";
import { App } from "./app";

describe("App", () => {
  test("should render the NavBar component", () => {
    const { getByText } = render(<App />);
    const navbar = getByText("codeStats");
    console.log(navbar.innerHTML);
    expect(navbar).toBeTruthy();
  });
});
