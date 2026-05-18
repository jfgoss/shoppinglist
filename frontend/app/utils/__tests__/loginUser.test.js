import { loginUser } from "../loginUser"
import { getListApiUrl } from "../config"
import * as axios from "axios"

jest.mock("../config")
jest.mock("axios")

describe('loginUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Calls session token callback on successful api response', async () => {
    // Arrange
    const testUser="testUser"

    const testToken="abcdefg1234"
    const mockSetSessionToken = jest.fn()
    const mockSetErrorMessage = jest.fn()

    const testUrl="https://test.url"
    getListApiUrl.mockReturnValueOnce(testUrl)

    axios.post.mockResolvedValue({ data: { token: testToken } })

    // Act
    await loginUser(testUser, mockSetSessionToken, mockSetErrorMessage)

    // Assert
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(`${testUrl}/login`, { "username": testUser }, { "headers": { "Content-Type": "application/json" } })
    expect(mockSetSessionToken).toHaveBeenCalledTimes(1)
    expect(mockSetSessionToken).toHaveBeenCalledWith(testToken)
    expect(mockSetErrorMessage).not.toHaveBeenCalled()
  })

  it('Calls error callback on failed api response', async () => {
    // Arrange
    const testUser="testUser"

    const testToken="abcdefg1234"
    const mockSetSessionToken = jest.fn()
    const mockSetErrorMessage = jest.fn()

    const testUrl="https://test.url"
    getListApiUrl.mockReturnValueOnce(testUrl)

    axios.post.mockRejectedValue("Mock axios post rejected")

    // Act
    await loginUser(testUser, mockSetSessionToken, mockSetErrorMessage)

    // Assert
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(`${testUrl}/login`, { "username": testUser }, { "headers": { "Content-Type": "application/json" } })
    expect(mockSetSessionToken).toHaveBeenCalledTimes(1)
    expect(mockSetSessionToken).toHaveBeenCalledWith("")
    expect(mockSetErrorMessage).toHaveBeenCalledTimes(1)
    expect(mockSetErrorMessage).toHaveBeenCalledWith("An error occurred during sign in. Please try again.")
  })
})