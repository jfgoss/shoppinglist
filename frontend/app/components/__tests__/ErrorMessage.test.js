import React from "react"
import { render } from "@testing-library/react"
import { ErrorMessage } from "../ErrorMessage"

describe('ErrorMessage component', () => {
  it('renders error message', () => {
    // Arrange
    const testMessage = "This is an error message"

    // Act
    const {container} = render(
      <ErrorMessage message={testMessage} />
    )

    // Assert
    expect(container).toMatchSnapshot()
  })
})