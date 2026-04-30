import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { QRCode } from "../../src/components/projects/QRCode";

describe("<QRCode />", () => {
  it("renders an SVG with the provided value as title", () => {
    const value =
      "https://github.com/mathieudiep/volley_meteo/releases/latest/download/volley_meteo.apk";
    const { container } = render(<QRCode value={value} ariaLabel="QR volley" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    const title = container.querySelector("title");
    expect(title?.textContent).toBe("QR volley");
  });

  it("respects the size prop", () => {
    const { container } = render(<QRCode value="https://example.com" size={250} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("250");
    expect(svg?.getAttribute("height")).toBe("250");
  });
});
