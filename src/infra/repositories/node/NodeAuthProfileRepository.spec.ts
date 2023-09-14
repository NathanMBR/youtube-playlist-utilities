import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { NodeAuthProfileRepository } from "./NodeAuthProfileRepository";

const mockFetchOnce = () => {
  vi.spyOn(globalThis, "fetch").mockImplementationOnce(
    async () => Promise.resolve(
      {
        ok: true,
        status: 200,
        json: async () => Promise.resolve(
          /* eslint-disable camelcase */
          {
            id: "test-id",
            name: "Test Name",
            given_name: "Test Given Name",
            family_name: "Test Family Name",
            picture: "https://test.picture/",
            locale: "test-locale"
          }
          /* eslint-enable camelcase */
        )
      } as any
    )
  );
};

const getSUTEnvironment = () => {
  const googleUserInfoURL = "https://test-url.com/test-playlist";

  const SUT = new NodeAuthProfileRepository(
    googleUserInfoURL
  );

  return {
    googleUserInfoURL,

    SUT
  };
};

describe("NodeAuthProfileRepository", () => {
  it("should successfully get an auth profile", async () => {
    mockFetchOnce();

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      token: "test-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    /* eslint-disable camelcase */
    const expectedResponse = {
      id: "test-id",
      name: "Test Name",
      given_name: "Test Given Name",
      family_name: "Test Family Name",
      picture: "https://test.picture/",
      locale: "test-locale"
    };
    /* eslint-enable camelcase */

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return null if fetch response isn't ok", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      async () => Promise.resolve(
        {
          ok: false
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      token: "test-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    expect(SUTResponse).toBeNull();
  });

  it("should pass googleUserInfoURL and token to fetch call", async () => {
    mockFetchOnce();

    const { SUT, googleUserInfoURL } = getSUTEnvironment();

    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const SUTRequest = {
      token: "test-token"
    };

    await SUT.get(SUTRequest);

    const expectedCall = [
      googleUserInfoURL,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${SUTRequest.token}`
        }
      }
    ];

    expect(fetchSpy).toHaveBeenCalledWith(...expectedCall);
  });

  it("should return null if fetch call throws error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      async () => {
        throw new Error("Test error");
      }
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      token: "test-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    expect(SUTResponse).toBeNull();
  });

  it("should return null if json call returns error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      async () => Promise.resolve(
        {
          ok: true,
          json: async () => {
            throw new Error("Test error");
          }
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      token: "test-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    expect(SUTResponse).toBeNull();
  });
});
