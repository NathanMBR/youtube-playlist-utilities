import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { RemoveAuthCallbackCacheRepository } from "@/data/repositories";
import { RemoveAuthCallbackImpl } from "./RemoveAuthCallbackImpl";

const getSUTEnvironment = () => {
  class RemoveAuthCallbackCacheRepositoryStub implements RemoveAuthCallbackCacheRepository {
    remove(): RemoveAuthCallbackCacheRepository.Response {
      return true;
    }
  }

  const removeAuthCallbackCacheRepository = new RemoveAuthCallbackCacheRepositoryStub();

  const SUT = new RemoveAuthCallbackImpl(
    removeAuthCallbackCacheRepository
  );

  return {
    removeAuthCallbackCacheRepository,

    SUT
  };
};

describe("RemoveAuthCallbackImpl", () => {
  it("should successfully remove an auth callback", () => {
    const { SUT } = getSUTEnvironment();

    const SUTResponse = SUT.execute();

    const expectedResponse = true;

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return false if removeAuthCallbackCacheRepository returns false", () => {
    const { SUT, removeAuthCallbackCacheRepository } = getSUTEnvironment();

    vi.spyOn(removeAuthCallbackCacheRepository, "remove").mockReturnValueOnce(false);

    const SUTResponse = SUT.execute();

    const expectedResponse = false;

    expect(SUTResponse).toBe(expectedResponse);
  });

  it("should call removeAuthCallbackCacheRepository", () => {
    const { SUT, removeAuthCallbackCacheRepository } = getSUTEnvironment();

    const removeSpy = vi.spyOn(removeAuthCallbackCacheRepository, "remove");

    SUT.execute();

    expect(removeSpy).toHaveBeenCalled();
  });

  it("should repass removeAuthCallbackCacheRepository errors to upper level", () => {
    const { SUT, removeAuthCallbackCacheRepository } = getSUTEnvironment();

    vi.spyOn(removeAuthCallbackCacheRepository, "remove").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const getSUTResponse = () => SUT.execute();

    expect(getSUTResponse).toThrow();
  });
});
