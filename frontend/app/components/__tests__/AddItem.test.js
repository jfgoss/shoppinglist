import React from "react"
import { render } from "@testing-library/react"
import { AddItem } from "../AddItem"

describe('AddItem component', () => {
  it('renders AddItem as expected', () => {
    // Arrange
    const list = {}
    const mockSetList = jest.fn()

    // Act
    const {container} = render(
      <AddItem list={list} setList={mockSetList} />
    )

    // Assert
    expect(container.firstChild).toMatchSnapshot()
  })
})