const { getUserFromToken, createUserToken } = require("../../models/authUsers")
const { authorise, getToken } = require("../auth")

jest.mock("../../models/authUsers")

describe('authorise', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns 401 authorise fails', async () => {
    // Arrange
    const testReq = { headers: { authorization: "invalidtoken" } }
    getUserFromToken.mockReturnValueOnce(undefined)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn()
    }

    // Act
    const username = await authorise(testReq, mockRes)

    // Assert
    expect(username).toEqual(undefined)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Unauthorised" })
  })

  it('returns 200 on success %s', async () => {
    // Arrange
    const testToken = "token"
    const testReq = { headers: { authorization: testToken } }
    const testUser = "testuser"
    getUserFromToken.mockReturnValueOnce(testUser)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn()
    }

    // Act
    const username = await authorise(testReq, mockRes)

    // Assert
    expect(getUserFromToken).toHaveBeenCalledWith(testToken)
    expect(username).toEqual(testUser)
    expect(mockRes.status).not.toHaveBeenCalled()
    expect(mockRes.json).not.toHaveBeenCalled()
  })
})

describe('getToken', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    [ { } ],
    [ { body: {} } ],
    [ { body: { username: undefined } } ],
    [ { body: { username: "" } } ]
  ])('returns 400 for no username %s', async (testReq) => {
    // Arrange
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    await getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.send).toHaveBeenCalledTimes(1)
    expect(mockRes.json).not.toHaveBeenCalled()
  })

  it('returns 401 for username no match', async () => {
    // Arrange
    const testReq = { body: { username: "TESTUSER" } }
    createUserToken.mockReturnValueOnce(undefined)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    await getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.send).toHaveBeenCalledTimes(1)
    expect(mockRes.json).not.toHaveBeenCalled()
  })

  it('returns 200 for success %s', async () => {
    // Arrange
    const testReq = { body: { username: "TESTUSER" } }
    const mockToken = "abcdefg"
    createUserToken.mockReturnValueOnce(mockToken)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    await getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.send).not.toHaveBeenCalled()
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ "token": mockToken })
  })

  it('returns 500 on exception', async () => {
    // Arrange
    const testReq = { body: { username: "TESTUSER" } }
    createUserToken.mockImplementation(() => { throw new Error("Test Exception") })
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    await getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.send).toHaveBeenCalledTimes(1)
    expect(mockRes.json).not.toHaveBeenCalled()
  })
})