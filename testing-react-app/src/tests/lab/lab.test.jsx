import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";
import server from "../../mocks/handlers";
import { http, HttpResponse } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import HeroesFromAPI from "./Heroes";

describe("formatPrice function", () => {
  it("should returns formatted number with default currency and 2 decimals", () => {
    expect(formatPrice(7256.4)).toBe("$7,256.40");
  });
  it("should returns formatted number with custom currency symbol and decimals", () => {
    expect(formatPrice(52125.2412, "#", 3)).toBe("#52,125.241");
  });
  it("should returns empty string for invalid input", () => {
    expect(formatPrice("Mohamed")).toBe("");
  });
});

describe("HeroesFromAPI component", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => {
    server.close();
  });
  it('should renders "No heroes available" when API returns empty list', async () => {
    /* to make res fadya */
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json([]);
      })
    );
    render(<HeroesFromAPI />);
    const noHeroes = await screen.findByText(/no heroes available/i);
    expect(noHeroes).toBeInTheDocument();
  });

  it("should renders heroes fetched from API from handler ", async () => {
    const response = await fetch("http://localhost:3000/heroes");
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual([
      { id: 1, name: "Mohamed", strength: 80 },
      { id: 2, name: "Ali", strength: 95 },
    ]);

    render(<HeroesFromAPI />);
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
      const heroes = screen.getAllByRole("listitem");
      expect(heroes).toHaveLength(2);
      expect(heroes[0]).toHaveTextContent("Mohamed");
      expect(heroes[1]).toHaveTextContent("Ali");
    });
  });
});