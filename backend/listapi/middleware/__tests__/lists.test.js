const { getList, setList } = require("../lists")
const { authorise } = require("../auth")
const { getShoppingListItems, setShoppingListItems } = require("../../models/shoppingLists")
const { getShopper } = require("../../models/shoppers")

jest.mock("../auth")
jest.mock("../../models/shoppingLists")
jest.mock("../../models/shoppers")

describe('getList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns if authorise fails', async () => {
    // Arrange
    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    authorise.mockReturnValueOnce(undefined)

    // Act
    await getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).not.toHaveBeenCalled()
    expect(getShoppingListItems).not.toHaveBeenCalled()
    expect(mockRes.status).not.toHaveBeenCalled()
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).not.toHaveBeenCalled()
  })

  it('returns 403 for unknown shopper', async () => {    // Arrange
    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockReturnValueOnce(testUser)
    const testShopper = { id: 1 }
    getShopper.mockReturnValueOnce(undefined)

    // Act
    await getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(getShoppingListItems).not.toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })

  it('returns 404 for unknown list', async () => {
    // Arrange
    const testReq = { params: { listId: 1 }}
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockReturnValueOnce(testUser)
    const testShopper = { id: 1 }
    getShopper.mockReturnValueOnce(testShopper)
    getShoppingListItems.mockReturnValueOnce(undefined)

    // Act
    await getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(getShoppingListItems).toHaveBeenCalledTimes(1)
    expect(getShoppingListItems).toHaveBeenCalledWith(testShopper.id, testReq.params.listId)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })

  it('returns 200 for found list', async () => {
    // Arrange
    const testReq = { params: { listId: 1 }}
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockReturnValueOnce(testUser)
    const testShopper = { id: 1 }
    getShopper.mockReturnValueOnce(testShopper)
    const testList = [ { test: "item1" }, { test: "item2" } ]
    getShoppingListItems.mockReturnValueOnce(testList)

    // Act
    await getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(getShoppingListItems).toHaveBeenCalledTimes(1)
    expect(getShoppingListItems).toHaveBeenCalledWith(testShopper.id, testReq.params.listId)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith(testList)
    expect(mockRes.send).not.toHaveBeenCalled()
  })

  it('returns 500 on exception', async () => {

    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    authorise.mockImplementation(() => { throw new Error("Test exception") })

    // Act
    await getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).not.toHaveBeenCalled()
    expect(getShoppingListItems).not.toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })
})

describe('setList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns if authorise fails', async () => {
    // Arrange
    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    authorise.mockReturnValueOnce(undefined)

    // Act
    await setList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).not.toHaveBeenCalled()
    expect(setShoppingListItems).not.toHaveBeenCalled()
    expect(mockRes.status).not.toHaveBeenCalled()
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).not.toHaveBeenCalled()
  })

  // TODO: Additional setList() tests
})
