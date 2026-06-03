import { getList} from "../lists.js"
import { authorise } from "../auth.js"
import { getShoppingList } from "../../models/shoppingLists.js"
import { getShopper } from "../../models/shoppers.js"

jest.mock("../auth")
jest.mock("../../models/shoppingLists")
jest.mock("../../models/shoppers")

describe('getList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns if authorise fails', () => {
    // Arrange
    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    authorise.mockReturnValueOnce(undefined)

    // Act
    getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).not.toHaveBeenCalled()
    expect(getShoppingList).not.toHaveBeenCalled()
    expect(mockRes.status).not.toHaveBeenCalled()
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).not.toHaveBeenCalled()
  })

  it('returns 403 for unknown shopper', () => {    // Arrange
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
    getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(getShoppingList).not.toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })

  it('returns 404 for unknown list', () => {
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
    getShoppingList.mockReturnValueOnce(undefined)

    // Act
    getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(getShoppingList).toHaveBeenCalledTimes(1)
    expect(getShoppingList).toHaveBeenCalledWith(testShopper.id, testReq.params.listId)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })

  it('returns 200 for found list', () => {
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
    const testList = { items: [ { test: "item1" }, { test: "item2" } ] }
    getShoppingList.mockReturnValueOnce(testList)

    // Act
    getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).toHaveBeenCalledTimes(1)
    expect(getShopper).toHaveBeenCalledWith(testUser)
    expect(getShoppingList).toHaveBeenCalledTimes(1)
    expect(getShoppingList).toHaveBeenCalledWith(testShopper.id, testReq.params.listId)
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith(testList.items)
    expect(mockRes.send).not.toHaveBeenCalled()
  })

  it('returns 500 on exception', () => {

    const testReq = { }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn()
    }

    authorise.mockImplementation(() => { throw new Error("Test exception") })

    // Act
    getList(testReq, mockRes)

    // Assert
    expect(authorise).toHaveBeenCalledTimes(1)
    expect(authorise).toHaveBeenCalledWith(testReq, mockRes)
    expect(getShopper).not.toHaveBeenCalled()
    expect(getShoppingList).not.toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledTimes(1)
  })
})