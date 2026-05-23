import React from "react"
import { render } from "@testing-library/react"
import { Login } from "../Login"

describe('Login component', () => {
  it('renders login component', () => {
    // Arrange
    const mockSetSessionToken = jest.fn()
    const mockSetErrorMessage = jest.fn()

    // Act
    const {container} = render(
      <Login setSessionToken={mockSetSessionToken} setErrorMessage={mockSetErrorMessage} />
    )

    // Assert
    expect(container.firstChild).toMatchSnapshot()
  })
})