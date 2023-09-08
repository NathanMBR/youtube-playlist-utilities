import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { NodeAuthCallbackCacheRepository } from "./NodeAuthCallbackCacheRepository";

const mockedAuthCallback = {
  accessToken: "test-access-token",
  tokenType: "test-token-type",
  expiresIn: 1,
  scope: "test-scope"
};

globalThis.localStorage = Object.create(
  {
    getItem: vi.fn(() => JSON.stringify(mockedAuthCallback)),
    setItem: vi.fn(() => {})
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

  it("should call localStorage.getItem() with auth-callback", () => {
    const { SUT } = getSUTEnvironment();

    const getItemSpy = vi.spyOn(localStorage, "getItem");

    SUT.get();

    const expectedCall = "auth-callback";

    expect(getItemSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should call JSON.parse() with string AuthCallback", () => {
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
