import { render } from "@testing-library/react"
import { ErrorMessage } from "../ErrorMessage"

// TODO: Currently fails due to "ReferenceError: React is not defined"
//       Suspect issue with babel translation from jsx?
//       Have tried import React from "react", but doesn't fix
describe('ErrorMessage component', () => {
  it('renders error message', () => {
    // Arrange
    const testMessage = "This is an error message"

    // Act
    const {container} = render(
      <ErrorMessage message={testMessage} />
    )

    // Assert
    expect(container.firstChild).toMatchSnapshot()
  })
})