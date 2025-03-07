import { fireEvent, render, screen } from "@testing-library/react"
import CurrencyContext from "../contexts/CurrencyContext"
import CurrencyConverter from "./CurrencyConverter"
import { it } from "vitest";

describe("Currency Converter", ()=>{
    it("should render all expected elements", () => {
        render(
            <CurrencyContext.Provider 
                value={{
                    fromCurrency: "USD",
                    toCurrency: "EUR",
            }}
            >
                <CurrencyConverter />
            </CurrencyContext.Provider>
            );
        expect(screen.getByText("USD")).toBeInTheDocument();
        expect(screen.getByText("EUR")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
    });
    it("should show correct output based on input", () => {
        render(<CurrencyContext.Provider 
            value={{
                fromCurrency: "USD",
                toCurrency: "EUR",
        }}
        >
            <CurrencyConverter />
        </CurrencyContext.Provider>
        );
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.change(input, { target: { value: "" }});
        expect(screen.getByText("0")).toBeInTheDocument();
    });
    it("should show 0 when input is empty", () => {
        render(<CurrencyContext.Provider 
            value={{
                fromCurrency: "USD",
                toCurrency: "EUR",
        }}
        >
            <CurrencyConverter />
        </CurrencyContext.Provider>
        );
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.change(input, { target: { value: "10" }});
        expect(screen.getByText("20")).toBeInTheDocument();
    });
});