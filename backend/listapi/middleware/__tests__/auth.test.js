import { jest } from "@jest/globals"

import { getUserFromToken, createUserToken } from "../../models/authUsers.js"
import { authorise, getToken } from "../auth.js"

jest.mock("../../models/authUsers")

describe('authorise', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns 401 authorise fails', () => {
    // Arrange
    const testReq = { headers: { authorization: "invalidtoken" } }
    const mockUserAuth = [
      {
        username: "testuser",
        token: "testToken"
      },
    ]
    getUserAuth.mockReturnValueOnce(mockUserAuth)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn()
    }

    // Act
    const username = authorise(testReq, mockRes)

    // Assert
    expect(username).toEqual(undefined)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Unauthorised" })
  })

  it.each([
    [{ headers: { authorization: "testtoken" } }], 
    [{ headers: { authorization: "TESTTOKEN" } }] // Check case insensitive
  ])('returns 200 on success %s', (testReq) => {
    // Arrange
    const mockUserAuth = [
      {
        username: "testuser",
        token: "testToken"
      },
    ]
    getUserAuth.mockReturnValueOnce(mockUserAuth)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn()
    }

    // Act
    const username = authorise(testReq, mockRes)

    // Assert
    expect(username).toEqual(mockUserAuth[0].username)
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
  ])('returns 400 for no username %s', (testReq) => {
    // Arrange
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.send).toHaveBeenCalledTimes(1)
    expect(mockRes.json).not.toHaveBeenCalled()
  })

  it('returns 401 for username no match', () => {
    // Arrange
    const testReq = { body: { username: "TESTUSER" } }

    const mockUserAuth = [
      {
        username: "invaliduser",
        token: "testToken"
      },
    ]
    getUserAuth.mockReturnValueOnce(mockUserAuth)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.send).toHaveBeenCalledTimes(1)
    expect(mockRes.json).not.toHaveBeenCalled()
  })

    it.each([
    [ { body: { username: "TESTUSER" } } ], // Check username is case insensitive in lookup
    [ { body: { username: "testuser" } } ]
  ])('returns 200 for success %s', (testReq) => {
    // Arrange
    const mockUserAuth = [
      {
        username: "testuser",
        token: "testToken"
      },
    ]
    getUserAuth.mockReturnValueOnce(mockUserAuth)
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.send).not.toHaveBeenCalled()
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ token: mockUserAuth[0].token })
  })

  it('returns 500 on exception', () => {
    // Arrange
    const testReq = { body: { username: "TESTUSER" } }
    getUserAuth.mockImplementation(() => { throw new Error("Test Exception") })
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    // Act
    getToken(testReq, mockRes)

    // Assert
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.send).toHaveBeenCalledTimes(1)
    expect(mockRes.json).not.toHaveBeenCalled()
  })
})