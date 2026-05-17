import { getList } from "../listApi"
import { getListApiUrl } from "../config"
import { getSessionToken } from "../loginUser"
import * as axios from "axios"

jest.mock("../config")
jest.mock("../loginUser")
jest.mock("axios")

describe('getList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    [ "" ],
    [ undefined ]
  ])('Calls error callback if no user session %s', async (testToken) => {
    // Arrange
    getSessionToken.mockReturnValueOnce(testToken)
    const mockSetList = jest.fn()
    const mockSetErrorMessage = jest.fn()

    // Act
    await getList(1, mockSetList, mockSetErrorMessage)

    // Assert
    expect(mockSetList).not.toHaveBeenCalled()
    expect(mockSetErrorMessage).toHaveBeenCalledTimes(1)
    expect(mockSetErrorMessage).toHaveBeenCalledWith("No user session, please sign in")
  })

  it('Calls list callback on successful api response', async () => {
    // Arrange
    const testToken="abcdefg1234"
    getSessionToken.mockReturnValueOnce(testToken)

    const testList = {
      testData: "testData"
    }
    const mockSetList = jest.fn()
    const mockSetErrorMessage = jest.fn()

    const testUrl="https://test.url"
    getListApiUrl.mockReturnValueOnce(testUrl)

    axios.get.mockResolvedValue({ data: testList })

    // Act
    await getList(1, mockSetList, mockSetErrorMessage)

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`${testUrl}/list/1`, { "headers": { "authorization": testToken }})
    expect(mockSetList).toHaveBeenCalledTimes(1)
    expect(mockSetList).toHaveBeenCalledWith(testList)
    expect(mockSetErrorMessage).not.toHaveBeenCalled()
  })

  it('Calls error callback on failed api response', async () => {
    // Arrange
    const testToken="abcdefg1234"
    getSessionToken.mockReturnValueOnce(testToken)

    const mockSetList = jest.fn()
    const mockSetErrorMessage = jest.fn()

    const testUrl="https://test.url"
    getListApiUrl.mockReturnValueOnce(testUrl)

    await axios.get.mockRejectedValue("Mock axios get rejected")

    // Act
    await getList(1, mockSetList, mockSetErrorMessage)
  
    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`${testUrl}/list/1`, { "headers": { "authorization": testToken }})
    expect(mockSetList).not.toHaveBeenCalled()
    expect(mockSetErrorMessage).toHaveBeenCalledTimes(1)
    expect(mockSetErrorMessage).toHaveBeenCalledWith("An error occurred getting the list")
  })
})