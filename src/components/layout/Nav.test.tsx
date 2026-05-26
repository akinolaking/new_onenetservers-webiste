import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Nav } from "@/components/layout/Nav";

describe("Nav", () => {
  it("renders the logo-only brand and top-level navigation groups", () => {
    render(<Nav />);

    expect(screen.getByLabelText("OneNet Servers home")).toBeInTheDocument();
    expect(screen.queryByText("OneNet Servers")).not.toBeInTheDocument();
    expect(screen.getByText("Hosting")).toBeInTheDocument();
    expect(screen.getByText("Domains")).toBeInTheDocument();
    expect(screen.getByText("Tools & Security")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("opens the currency dropdown and selects a new currency", async () => {
    const user = userEvent.setup();

    render(<Nav />);

    await user.click(screen.getByRole("button", { name: /usd/i }));

    const ngnOption = await screen.findByText("NGN");
    await user.click(ngnOption);

    expect(screen.getByRole("button", { name: /ngn/i })).toBeInTheDocument();
  });

  it("opens the mobile menu sheet and shows quick actions", async () => {
    const user = userEvent.setup();

    render(<Nav />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(await screen.findByText("Call sales")).toBeInTheDocument();
    expect(screen.getByText("Chat on WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close menu/i }));

    expect(screen.queryByText("Call sales")).not.toBeInTheDocument();
  });
});
