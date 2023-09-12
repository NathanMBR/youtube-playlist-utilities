import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { GetAuthCallbackCacheRepository } from "@/data/repositories";
import { GetAuthCallbackImpl } from "./GetAuthCallbackImpl";

const globalDate = new Date();
vi.spyOn(Date, "now").mockReturnValue(globalDate.getTime() - 1000);

const getSUTEnvironment = () => {
  class GetAuthCallbackCacheRepositoryStub implements GetAuthCallbackCacheRepository {
    get(): GetAuthCallbackCacheRepository.Response {
      return {
        accessToken: "test-access-token",
        tokenType: "test-token-type",
        expiresAt: globalDate,
        scope: "test-scope"
      };
    }
  }

  const getAuthCallbackCacheRepository = new GetAuthCallbackCacheRepositoryStub();

  const SUT = new GetAuthCallbackImpl(getAuthCallbackCacheRepository);

  return {
    getAuthCallbackCacheRepository,

    SUT
  };
};

describe("GetAuthCallbackImpl", () => {
  it("should successfully get an auth callback", () => {
    const { SUT } = getSUTEnvironment();

    const SUTResponse = SUT.execute();

    const expectedResponse = {
      accessToken: "test-access-token",
      tokenType: "test-token-type",
      expiresAt: globalDate,
      scope: "test-scope"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return null if getAuthCallbackCacheRepository returns null", () => {
    const { SUT, getAuthCallbackCacheRepository } = getSUTEnvironment();

    vi.spyOn(getAuthCallbackCacheRepository, "get").mockReturnValueOnce(null);

    const SUTResponse = SUT.execute();

    expect(SUTResponse).toBeNull();
  });

  it("should return null if getAuthCallbackCacheRepository response is expired", () => {
    const { SUT, getAuthCallbackCacheRepository } = getSUTEnvironment();

    vi.spyOn(getAuthCallbackCacheRepository, "get").mockReturnValueOnce(
      {
        accessToken: "test-access-token",
        tokenType: "test-token-type",
        expiresAt: new Date(0),
        scope: "test-scope"
      }
    );

    const SUTResponse = SUT.execute();

    expect(SUTResponse).toBeNull();
  });

  it("should call getAuthCallbackCacheRepository", () => {
    const { SUT, getAuthCallbackCacheRepository } = getSUTEnvironment();

    const getSpy = vi.spyOn(getAuthCallbackCacheRepository, "get");

    SUT.execute();

    expect(getSpy).toHaveBeenCalled();
  });

  it("should repass getAuthCallbackCacheRepository errors to upper level", () => {
    const { SUT, getAuthCallbackCacheRepository } = getSUTEnvironment();

    vi.spyOn(getAuthCallbackCacheRepository, "get").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const getSUTResponse = () => SUT.execute();

    expect(getSUTResponse).toThrow();
  });
});
