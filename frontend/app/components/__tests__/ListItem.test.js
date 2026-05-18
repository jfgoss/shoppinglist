import { render } from "@testing-library/react"
import { ListItem } from "../ListItem"

// TODO: Currently fails due to "ReferenceError: React is not defined"
//       Suspect issue with babel translation from jsx?
//       Have tried import React from "react", but doesn't fix
describe('ListItem component', () => {
  it.each([
    [ { order: 1, price: 2.33, title: "test item" } ], // Normal format
    [ { order: 1, price: 2, title: "test item" } ], // Integer price
    [ { price: 2, title: "test item" } ], // Missing order
    [ { order: 1, price: 2 } ], // Missing title
    [ { order: 1, title: "test item" } ], // Missing price
    [ { order: 1, price: -1, title: "test item" } ], // Negative price
  ])('renders listItem name and price %s', (testItem) => {
    // Arrange
    const mockOnDelete = jest.fn()

    // Act
    const {container} = render(
      <ListItem listItem={testItem} onDelete={mockOnDelete} />
    )

    // Assert
    expect(container.firstChild).toMatchSnapshot()
  })
})