import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { GetAuthCallbackRepository } from "@/data/repositories";
import { GetAuthCallbackImpl } from "./GetAuthCallbackImpl";

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

  const getAuthCallbackRepositoryStub = new GetAuthCallbackRepositoryStub();

  const SUT = new GetAuthCallbackImpl(getAuthCallbackRepositoryStub);

  return {
    SUT,
    getAuthCallbackRepositoryStub
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

  it("should call getAuthCallbackRepository", () => {
    const { SUT, getAuthCallbackRepositoryStub } = getSUTEnvironment();

    const getSpy = vi.spyOn(getAuthCallbackRepositoryStub, "get");

    SUT.execute();

    expect(getSpy).toHaveBeenCalled();
  });

  it("should repass getAuthCallbackRepository errors to upper level", () => {
    const { SUT, getAuthCallbackRepositoryStub } = getSUTEnvironment();

    vi.spyOn(getAuthCallbackRepositoryStub, "get").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const getSUTResponse = SUT.execute;

    expect(getSUTResponse).toThrow();
  });
});
