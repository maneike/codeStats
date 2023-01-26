import { render } from "@testing-library/preact";
import { App } from "../../../app";

describe("NavBar", () => {
  test("renders correctly", () => {
    const { getByText } = render(<App />);

    const title = getByText("codeStats");

    expect(title).toBeTruthy();
  });
});
