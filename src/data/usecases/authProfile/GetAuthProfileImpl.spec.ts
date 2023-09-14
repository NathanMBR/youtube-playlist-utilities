import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { GetAuthProfileRepository } from "@/data/repositories";
import { GetAuthProfileImpl } from "./GetAuthProfileImpl";

const getSUTEnvironment = () => {
  class GetAuthProfileRepositoryStub implements GetAuthProfileRepository {
    async get(): GetAuthProfileRepository.Response {
      /* eslint-disable camelcase */
      return Promise.resolve(
        {
          id: "test-id",
          name: "Test Name",
          given_name: "Test Guiven Name",
          family_name: "Test Family Name",
          picture: "https://test.picture/",
          locale: "test-locale"
        }
      );
      /* eslint-enable camelcase */
    }
  }

  const getAuthProfileRepository = new GetAuthProfileRepositoryStub();

  const SUT = new GetAuthProfileImpl(
    getAuthProfileRepository
  );

  return {
    getAuthProfileRepository,

    SUT
  };
};

describe("GetAuthProfileImpl", () => {
  it("should successfully get an auth profile", async () => {
    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      token: "test-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      name: "Test Name",
      imageURL: "https://test.picture/"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return null if getAuthProfileRepository returns null", async () => {
    const { SUT, getAuthProfileRepository } = getSUTEnvironment();

    vi.spyOn(getAuthProfileRepository, "get").mockReturnValueOnce(
      Promise.resolve(null)
    );

    const SUTRequest = {
      token: "test-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    expect(SUTResponse).toBeNull();
  });

  it("should pass token to getAuthProfileRepository call", async () => {
    const { SUT, getAuthProfileRepository } = getSUTEnvironment();

    const getSpy = vi.spyOn(getAuthProfileRepository, "get");

    const SUTRequest = {
      token: "test-token"
    };

    await SUT.execute(SUTRequest);

    const expectedCall = {
      token: SUTRequest.token
    };

    expect(getSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should repass getAuthProfileRepository errors to upper level", async () => {
    const { SUT, getAuthProfileRepository } = getSUTEnvironment();

    vi.spyOn(getAuthProfileRepository, "get").mockImplementationOnce(
      async () => {
        throw new Error("Test error");
      }
    );

    const SUTRequest = {
      token: "test-token"
    };

    const SUTResponse = SUT.execute(SUTRequest);

    await expect(SUTResponse).rejects.toThrow();
  });
});
