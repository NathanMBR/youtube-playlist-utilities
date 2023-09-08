import {
  beforeAll,
  describe,
  it,
  expect
} from "vitest";

import { NodeAuthCallbackRepository } from "./NodeAuthCallbackRepository";

const mockWindowLocationHash = (mockQueryParams: string) => {
  window.location.hash = mockQueryParams;
};

const getSUTEnvironment = () => {
  const windowLocationHash = new URLSearchParams("#test_query=test-value");
  windowLocationHash.set("access_token", "test-token");
  windowLocationHash.set("token_type", "Bearer");
  windowLocationHash.set("expires_in", "3600");
  windowLocationHash.set("scope", "test-scope");

  const SUT = new NodeAuthCallbackRepository();

  return {
    windowLocationHash: windowLocationHash.toString(),

    SUT
  };
};

describe("NodeAuthCallbackRepository", () => {
  beforeAll(() => {
    globalThis.window = Object.create(
      {
        location: {
          hash: ""
        }
      }
    );
  });

  it("should successfully return AuthCallback", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();
    mockWindowLocationHash(windowLocationHash);

    const SUTResponse = SUT.get();

    const expectedResponse = {
      accessToken: "test-token",
      tokenType: "Bearer",
      expiresIn: 3600,
      scope: "test-scope"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return null if access_token doesn't exist", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();

    const missingAccessTokenWindowLocationHash = new URLSearchParams(windowLocationHash);
    missingAccessTokenWindowLocationHash.delete("access_token");

    mockWindowLocationHash(missingAccessTokenWindowLocationHash.toString());

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if token_type doesn't exist", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();

    const missingAccessTokenWindowLocationHash = new URLSearchParams(windowLocationHash);
    missingAccessTokenWindowLocationHash.delete("token_type");

    mockWindowLocationHash(missingAccessTokenWindowLocationHash.toString());

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if token_type isn't Bearer", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();

    const missingAccessTokenWindowLocationHash = new URLSearchParams(windowLocationHash);
    missingAccessTokenWindowLocationHash.set("token_type", "not-bearer");

    mockWindowLocationHash(missingAccessTokenWindowLocationHash.toString());

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if expires_in doesn't exist", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();

    const missingAccessTokenWindowLocationHash = new URLSearchParams(windowLocationHash);
    missingAccessTokenWindowLocationHash.delete("expires_in");

    mockWindowLocationHash(missingAccessTokenWindowLocationHash.toString());

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if expires_in isn't a number", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();

    const missingAccessTokenWindowLocationHash = new URLSearchParams(windowLocationHash);
    missingAccessTokenWindowLocationHash.set("expires_in", "not-number");

    mockWindowLocationHash(missingAccessTokenWindowLocationHash.toString());

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if expires_in isn't strictly positive", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();

    const missingAccessTokenWindowLocationHash = new URLSearchParams(windowLocationHash);
    missingAccessTokenWindowLocationHash.set("expires_in", "0");

    mockWindowLocationHash(missingAccessTokenWindowLocationHash.toString());

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if scope doesn't exist", () => {
    const { SUT, windowLocationHash } = getSUTEnvironment();

    const missingAccessTokenWindowLocationHash = new URLSearchParams(windowLocationHash);
    missingAccessTokenWindowLocationHash.delete("scope");

    mockWindowLocationHash(missingAccessTokenWindowLocationHash.toString());

    const SUTResponse = SUT.get();

    expect(SUTResponse).toBeNull();
  });
});
