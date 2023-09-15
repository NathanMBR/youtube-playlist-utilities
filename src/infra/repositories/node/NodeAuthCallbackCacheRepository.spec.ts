import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { NodeAuthCallbackCacheRepository } from "./NodeAuthCallbackCacheRepository";

const globalDate = new Date();
const mockedAuthCallback = {
  accessToken: "test-access-token",
  tokenType: "test-token-type",
  expiresAt: globalDate,
  scope: "test-scope"
};

globalThis.localStorage = Object.create(
  {
    getItem: vi.fn(() => JSON.stringify(mockedAuthCallback)),
    setItem: vi.fn(() => {}),
    removeItem: vi.fn(() => {})
  }
);

vi.spyOn(console, "error").mockImplementation(() => {});

const getSUTEnvironment = () => {
  const SUT = new NodeAuthCallbackCacheRepository();

  return {
    SUT
  };
};

describe("NodeAuthCallbackCacheRepository get()", () => {
  it("should successfully return AuthCallback", () => {
    const { SUT } = getSUTEnvironment();

    const SUTResponse = SUT.get();

    expect(SUTResponse).toEqual(mockedAuthCallback);
  });

  it("should return null if localStorage returns null", () => {
    vi.spyOn(localStorage, "getItem").mockReturnValueOnce(null);

    const { SUT } = getSUTEnvironment();

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should pass auth-callback to localStorage.getItem()", () => {
    const { SUT } = getSUTEnvironment();

    const getItemSpy = vi.spyOn(localStorage, "getItem");

    SUT.get();

    const expectedCall = "auth-callback";

    expect(getItemSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should pass string AuthCallback to JSON.parse()", () => {
    const { SUT } = getSUTEnvironment();

    const parseSpy = vi.spyOn(JSON, "parse");

    SUT.get();

    const expectedCall = JSON.stringify(mockedAuthCallback);

    expect(parseSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should return null if localStorage.getItem() throws", () => {
    const { SUT } = getSUTEnvironment();

    vi.spyOn(localStorage, "getItem").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if JSON.parse() throws", () => {
    const { SUT } = getSUTEnvironment();

    vi.spyOn(JSON, "parse").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });
});

describe("NodeAuthCallbackCacheRepository set()", () => {
  it("should successfully set AuthCallback", () => {
    const { SUT } = getSUTEnvironment();

    const SUTResponse = SUT.set(mockedAuthCallback);

    const expectedResponse = true;

    expect(SUTResponse).toBe(expectedResponse);
  });

  it("should pass AuthCallback to JSON.stringify()", () => {
    const { SUT } = getSUTEnvironment();

    const stringifySpy = vi.spyOn(JSON, "stringify");

    SUT.set(mockedAuthCallback);

    const expectedCall = mockedAuthCallback;

    expect(stringifySpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should pass AuthCallback string to localStorage.setItem()", () => {
    const { SUT } = getSUTEnvironment();

    const setItemSpy = vi.spyOn(localStorage, "setItem");

    SUT.set(mockedAuthCallback);

    const expectedCall = [
      "auth-callback",
      JSON.stringify(mockedAuthCallback)
    ];

    expect(setItemSpy).toHaveBeenCalledWith(...expectedCall);
  });

  it("should return false if JSON.stringify() throws", () => {
    const { SUT } = getSUTEnvironment();

    vi.spyOn(JSON, "stringify").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const SUTResponse = SUT.set(mockedAuthCallback);

    const expectedResponse = false;

    expect(SUTResponse).toBe(expectedResponse);
  });

  it("should return false if localStorage.setItem() throws", () => {
    const { SUT } = getSUTEnvironment();

    vi.spyOn(localStorage, "setItem").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const SUTResponse = SUT.set(mockedAuthCallback);

    const expectedResponse = false;

    expect(SUTResponse).toBe(expectedResponse);
  });
});

describe("NodeAuthCallbackCacheRepository remove()", () => {
  it("should successfully remove an AuthCallback", () => {
    const { SUT } = getSUTEnvironment();

    const SUTResponse = SUT.remove();

    const expectedResponse = true;

    expect(SUTResponse).toBe(expectedResponse);
  });

  it("should pass auth-callback to localStorage.removeItem()", () => {
    const { SUT } = getSUTEnvironment();

    const removeItemSpy = vi.spyOn(localStorage, "removeItem");

    SUT.remove();

    const expectedCall = "auth-callback";

    expect(removeItemSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should return false if localStorage.removeItem() throws", () => {
    const { SUT } = getSUTEnvironment();

    vi.spyOn(localStorage, "removeItem").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const SUTResponse = SUT.remove();

    const expectedResponse = false;

    expect(SUTResponse).toBe(expectedResponse);
  });
});
