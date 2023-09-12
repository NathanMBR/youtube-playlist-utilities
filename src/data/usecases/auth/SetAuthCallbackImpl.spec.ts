import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import {
  GetAuthCallbackRepository,
  SetAuthCallbackCacheRepository
} from "@/data/repositories";
import { SetAuthCallbackImpl } from "./SetAuthCallbackImpl";

const getSUTEnvironment = () => {
  class GetAuthCallbackRepositoryStub implements GetAuthCallbackRepository {
    get(): GetAuthCallbackRepository.Response {
      return {
        accessToken: "test-access-token",
        tokenType: "test-token-type",
        expiresIn: 123456789,
        scope: "test-scope"
      };
    }
  }

  class SetAuthCallbackCacheRepositoryStub implements SetAuthCallbackCacheRepository {
    set(): SetAuthCallbackCacheRepository.Response {
      return true;
    }
  }

  const getAuthCallbackRepository = new GetAuthCallbackRepositoryStub();
  const setAuthCallbackCacheRepository = new SetAuthCallbackCacheRepositoryStub();

  const SUT = new SetAuthCallbackImpl(
    getAuthCallbackRepository,
    setAuthCallbackCacheRepository
  );

  return {
    getAuthCallbackRepository,
    setAuthCallbackCacheRepository,

    SUT
  };
};

describe("SetAuthCallbackImpl", () => {
  it("should successfully set an auth callback", () => {
    const { SUT } = getSUTEnvironment();

    const SUTResponse = SUT.execute();

    const expectedResponse = true;

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return false if getAuthCallbackRepository returns null", () => {
    const { SUT, getAuthCallbackRepository } = getSUTEnvironment();

    vi.spyOn(getAuthCallbackRepository, "get").mockReturnValueOnce(null);

    const SUTResponse = SUT.execute();

    const expectedResponse = false;

    expect(SUTResponse).toBe(expectedResponse);
  });

  it("should return false if setAuthCallbackRepository returns false", () => {
    const { SUT, setAuthCallbackCacheRepository } = getSUTEnvironment();

    vi.spyOn(setAuthCallbackCacheRepository, "set").mockReturnValueOnce(false);

    const SUTResponse = SUT.execute();

    const expectedResponse = false;

    expect(SUTResponse).toBe(expectedResponse);
  });

  it("should call getAuthCallbackRepository", () => {
    const { SUT, getAuthCallbackRepository } = getSUTEnvironment();

    const getSpy = vi.spyOn(getAuthCallbackRepository, "get");

    SUT.execute();

    expect(getSpy).toHaveBeenCalled();
  });

  it("should pass AuthCallback to setAuthCallbackCacheRepository", () => {
    const { SUT, setAuthCallbackCacheRepository } = getSUTEnvironment();

    const setSpy = vi.spyOn(setAuthCallbackCacheRepository, "set");

    SUT.execute();

    const expectedCall = {
      accessToken: "test-access-token",
      tokenType: "test-token-type",
      expiresIn: 123456789,
      scope: "test-scope"
    };

    expect(setSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should repass getAuthCallbackRepository errors to upper level", () => {
    const { SUT, getAuthCallbackRepository } = getSUTEnvironment();

    vi.spyOn(getAuthCallbackRepository, "get").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const getSUTResponse = () => SUT.execute();

    expect(getSUTResponse).toThrow();
  });

  it("should repass setAuthCallbackCacheRepository errors to upper level", () => {
    const { SUT, setAuthCallbackCacheRepository } = getSUTEnvironment();

    vi.spyOn(setAuthCallbackCacheRepository, "set").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const getSUTResponse = () => SUT.execute();

    expect(getSUTResponse).toThrow();
  });
});
