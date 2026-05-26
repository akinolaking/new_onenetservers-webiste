import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the logo-only footer mark and key legal content", () => {
    render(<Footer />);

    expect(screen.getByLabelText("OneNet Servers home")).toBeInTheDocument();
    expect(screen.queryByText("OneNet Servers")).not.toBeInTheDocument();
    expect(screen.getByText(/Registered in England & Wales No\. 14565201/i)).toBeInTheDocument();
    expect(screen.getByText(/Registered in Nigeria No\. 1775966/i)).toBeInTheDocument();
  });

  it("renders trust badges, payment methods, and contact actions", () => {
    render(<Footer />);

    expect(screen.getByText("NiRA Accredited")).toBeInTheDocument();
    expect(screen.getByText("Tech Nation Endorsed")).toBeInTheDocument();
    expect(screen.getByText("Paystack")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\+234 201 330 9154/i })).toHaveAttribute(
      "href",
      "tel:+2342013309154",
    );
    expect(screen.getByRole("link", { name: /support@onenetservers\.net/i })).toHaveAttribute(
      "href",
      "mailto:support@onenetservers.net",
    );
  });
});
