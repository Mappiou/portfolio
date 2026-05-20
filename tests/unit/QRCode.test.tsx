import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { QRCode } from "../../src/variants/cinema/components/projects/QRCode";

describe("<QRCode />", () => {
  it("renders an SVG with the provided value as title (absolute URL kept as-is)", () => {
    const value =
      "https://github.com/mathieudiep/volley_meteo/releases/latest/download/volley_meteo.apk";
    const { container } = render(<QRCode value={value} ariaLabel="QR volley" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    const title = container.querySelector("title");
    expect(title?.textContent).toBe("QR volley");
  });

  it("resolves a relative URL to an absolute URL using window.location.origin", () => {
    const { container } = render(<QRCode value="/apks/volley_meteo.apk" />);
    const title = container.querySelector("title");
    // jsdom defaults window.location.origin to http://localhost:3000
    expect(title?.textContent).toBe(`${window.location.origin}/apks/volley_meteo.apk`);
  });

  it("respects the size prop", () => {
    const { container } = render(<QRCode value="https://example.com" size={250} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("250");
    expect(svg?.getAttribute("height")).toBe("250");
  });
});
