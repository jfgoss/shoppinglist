import React from "react"
import { render } from "@testing-library/react"
import { ShoppingList } from "../ShoppingList"

describe('ShoppingList component', () => {
  it('renders shopping list in order', () => {
    // Arrange
    const testShoppingList = [
      {
        price: 1.23,
        title: "cheese",
        order: 4
      },
      {
        price: 2.31,
        title: "milk 4pt",
        order: 1
      },
      {
        price: 1.50,
        title: "porridge",
        order: 3
      },
      {
        price: 2,
        title: "apples",
        order: 2
      },
    ]
    const mockSetList = jest.fn()

    // Act
    const {container} = render(
      <ShoppingList list={testShoppingList} setList={mockSetList} />
    )

    // Assert
    expect(container).toMatchSnapshot()
  })
})