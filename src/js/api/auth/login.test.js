import { login } from "./login.js";
import { load } from "../../storage/index.js";

/* mock for fetch */
const fetchMock = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: { accessToken: "mockToken" } }),
});

// eslint-disable-next-line no-undef
global.fetch = fetchMock;

/* mock for localStorage */
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();

// eslint-disable-next-line no-undef
global.localStorage = localStorageMock;

/* test */
describe("login function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save the token in localStorage when login is succesful", async () => {
    await login("validemail@stud.noroff.no", "123456789");

    const storedToken = load("token");

    expect(storedToken).toEqual("mockToken");
  });
});
