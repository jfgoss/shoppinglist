import { render } from "@testing-library/react"
import { Login } from "../Login"

// TODO: Currently fails due to "ReferenceError: React is not defined"
//       Suspect issue with babel translation from jsx?
//       Have tried import React from "react", but doesn't fix
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