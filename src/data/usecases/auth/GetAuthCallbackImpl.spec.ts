import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { GetAuthCallbackCacheRepository } from "@/data/repositories";
import { GetAuthCallbackImpl } from "./GetAuthCallbackImpl";

const getSUTEnvironment = () => {
  class GetAuthCallbackRepositoryStub implements GetAuthCallbackCacheRepository {
    get(): GetAuthCallbackCacheRepository.Response {
      return {
        accessToken: "test-access-token",
        tokenType: "test-token-type",
        expiresIn: 123456789,
        scope: "test-scope"
      };
    }
  }

  const getAuthCallbackCacheRepository = new GetAuthCallbackRepositoryStub();

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
      expiresIn: 123456789,
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
