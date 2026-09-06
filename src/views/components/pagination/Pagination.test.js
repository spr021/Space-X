import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Pagination from "./Pagination"
import { transformLaunchData } from "../../../utils/transformLaunchData"

describe("Pagination", () => {
  it("moves between pages and disables controls at the boundaries", () => {
    const onPageChange = jest.fn()
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        totalItems={25}
        onPageChange={onPageChange}
      />
    )

    expect(screen.getByText("Page 1 of 3 (25 launches)")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled()

    fireEvent.click(screen.getByRole("button", { name: /next page/i }))
    expect(onPageChange).toHaveBeenCalledWith(2)

    rerender(
      <Pagination
        currentPage={3}
        totalPages={3}
        totalItems={25}
        onPageChange={onPageChange}
      />
    )

    expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled()
    fireEvent.click(screen.getByRole("button", { name: /previous page/i }))
    expect(onPageChange).toHaveBeenLastCalledWith(2)
  })

  it("is hidden when all results fit on one page", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        totalItems={4}
        onPageChange={jest.fn()}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })
})

describe("transformLaunchData", () => {
  it("continues generated flight numbers from the page offset", () => {
    const launches = transformLaunchData({ results: [{ id: "launch-id" }] }, 20)

    expect(launches[0].flight_number).toBe(21)
  })
})
