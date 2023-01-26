import { render } from "@testing-library/preact";
import { App } from "../../../app";

describe("FileUploader", () => {
  test("renders correctly", () => {
    const { getByText } = render(<App />);

    const desc1 = getByText("Choose a file or drag it here");
    const desc2 = getByText("Supports: ZIP containing .git");

    expect(desc1).toBeTruthy();
    expect(desc2).toBeTruthy();
  });
});
