import {FetchMock} from "jest-fetch-mock";
import resolvers from '../resolvers'

const fetchMock = fetch as FetchMock;

describe('environmental variables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // this is important
    process.env = { ...OLD_ENV, BASE_URL: undefined };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('will receive process.env variables', () => {
    expect(() => {
      require('../resolvers')
    }).toThrowError()
  });
});

describe('testing api', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('getCats works', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: {
      Cats: [{
        description: "test",
        name: "test",
        origin: "test",
        temperament: "test",
      }]
    }}))

    try {
    const rootQuery = resolvers().RootQuery
    await rootQuery.Cats('', '', '').then(res => {
      expect(res.data).toEqual({
        Cats: [{
          description: "test",
          name: "test",
          origin: "test",
          temperament: "test",
        }]
      })
    })
    } catch(e) {
      // tslint:disable-next-line: no-console
      console.log("error: ", e)
    }

    expect(fetchMock.mock.calls.length).toEqual(1)
  })
  it('searchCats works', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: {
      SearchCats: [{
        description: "test",
        name: "test",
        origin: "test",
        temperament: "test",
      }]
    }}))

    try {
      const rootQuery = resolvers().RootQuery
      await rootQuery.SearchCats('http://localhost',{search: "t"},'').then(res => {
        expect(res.data).toEqual({
          SearchCats: [{
            description: "test",
            name: "test",
            origin: "test",
            temperament: "test",
          }]
        })
      })
      expect(fetchMock.mock.calls.length).toEqual(1)
    } catch(e) {
      // tslint:disable-next-line: no-console
      console.error("error: ", e)
    }
  })

  it('getCat works',async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: {
      Cat: {
        description: "test",
        name: "test",
        origin: "test",
        temperament: "test",
      }
    }}))

    try {
      const rootQuery = resolvers().RootQuery
      await rootQuery.Cat('',{id: "1" },'').then(res => {
        expect(res.data).toEqual({
          Cat: {
            description: "test",
            name: "test",
            origin: "test",
            temperament: "test",
          }
        })
      })
      } catch(e) {
        // tslint:disable-next-line: no-console
        console.error("e: ", e)
      }

    expect(fetchMock.mock.calls.length).toEqual(1)
  })
})