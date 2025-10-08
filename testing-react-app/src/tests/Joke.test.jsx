import { render, screen, waitFor } from "@testing-library/react";
import JokeFetcher from "../components/Joke/Joke";
import { afterAll, beforeAll, expect } from "vitest";
import server from "../mocks/handlers";

describe("Button component", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  it("should be rendered with 'loading ...'", async () => {
    render(<JokeFetcher />);

    expect(screen.getByRole("heading")).toHaveTextContent(/loading/i);
    //1
    // expect( await screen.findByRole("heading")).toHaveTextContent(/our fake joke/i)
    //2
   await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent(/our fake joke/i);
    });
  });
});
