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

    authorise.mockResolvedValue(undefined)

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

  it('returns 403 for unknown shopper', async () => {
    // Arrange
    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockResolvedValue(testUser)
    const testShopper = { id: 1 }
    getShopper.mockResolvedValue(undefined)

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
    const testReq = { params: { listId: 1 } }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockResolvedValue(testUser)
    const testShopper = { id: 1 }
    getShopper.mockResolvedValue(testShopper)
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
    authorise.mockResolvedValue(testUser)
    const testShopper = { id: 1, username: "testUser" }
    getShopper.mockResolvedValue(testShopper)
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

    authorise.mockResolvedValue(undefined)

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

  it('returns 403 for unknown shopper', async () => {
    // Arrange
    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockResolvedValue(testUser)
    getShopper.mockResolvedValue(undefined)

    // Act
    await setList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(setShoppingListItems).not.toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })

  it.each([
    [{ }],
    [{ body: { }}],
    [{ body: { listId: 1234 }}],
    [{ body: { listId: 1234, list: "notArray" }}],
    [{ body: { list: [ "testItem1", "testItem2" ] }}],
  ])('returns 400 for invalid body', async (testReq) => {
    // Arrange
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockResolvedValue(testUser)
    const testShopper = { id: 1, username: "testUser" }
    getShopper.mockResolvedValue(testShopper)

    // Act
    await setList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(setShoppingListItems).not.toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })

  it('returns 404 for unknown list', async () => {
    // Arrange
    const testList = [ "testItem1", "testItem2" ] // not actual items, but for test doesn't matter
    const testReq = { body: { listId: 1234, list: testList } }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockResolvedValue(testUser)
    const testShopper = { id: 1, username: "testUser" }
    getShopper.mockResolvedValue(testShopper)
    setShoppingListItems.mockReturnValueOnce(undefined)

    // Act
    await setList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(setShoppingListItems).toHaveBeenCalledTimes(1)
    expect(setShoppingListItems).toHaveBeenCalledWith(testShopper.id, testReq.body.listId, testReq.body.list)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })

  it('returns 200 for found and updated list', async () => {
    // Arrange
    const testList = [ "testItem1", "testItem2" ] // not actual items, but for test doesn't matter
    const testReq = { body: { listId: 1234, list: testList } }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    const testUser = "testUser"
    authorise.mockResolvedValue(testUser)
    const testShopper = { id: 1 }
    getShopper.mockResolvedValue(testShopper)
    setShoppingListItems.mockReturnValueOnce(testReq.body.listId)

    // Act
    await setList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(setShoppingListItems).toHaveBeenCalledTimes(1)
    expect(setShoppingListItems).toHaveBeenCalledWith(testShopper.id, testReq.body.listId, testReq.body.list)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).not.toHaveBeenCalledWith()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
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
    await setList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).not.toHaveBeenCalled()
    expect(setShoppingListItems).not.toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })
})
