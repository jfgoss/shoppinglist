import { render } from "@testing-library/react"
import { AddItem } from "../AddItem"

// TODO: Currently fails due to "ReferenceError: React is not defined"
//       Suspect issue with babel translation from jsx?
//       Have tried import React from "react", but doesn't fix
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