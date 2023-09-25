import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { RemovePlaylistVideoRepository } from "@/data/repositories";
import { RemoveVideoImpl } from "./RemoveVideoImpl";

const getSUTEnvironment = () => {
  class RemovePlaylistVideoRepositoryStub implements RemovePlaylistVideoRepository {
    async remove(): RemovePlaylistVideoRepository.Response {
      return Promise.resolve(
        {
          success: true
        }
      );
    }
  }

  const removePlaylistVideoRepository = new RemovePlaylistVideoRepositoryStub();

  const SUT = new RemoveVideoImpl(
    removePlaylistVideoRepository
  );

  return {
    removePlaylistVideoRepository,

    SUT
  };
};

describe("RemoveVideoImpl", () => {
  it("should successfully remove a video", async () => {
    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: true
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass INVALID_ID error", async () => {
    const { SUT, removePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(removePlaylistVideoRepository, "remove").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "INVALID_ID"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_ID"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass UNAUTHORIZED error", async () => {
    const { SUT, removePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(removePlaylistVideoRepository, "remove").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "UNAUTHORIZED"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "UNAUTHORIZED"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass NOT_FOUND error", async () => {
    const { SUT, removePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(removePlaylistVideoRepository, "remove").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "NOT_FOUND"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "NOT_FOUND"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should pass id and authToken to removePlaylistVideoRepository call", async () => {
    const { SUT, removePlaylistVideoRepository } = getSUTEnvironment();

    const removeSpy = vi.spyOn(removePlaylistVideoRepository, "remove");

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    await SUT.execute(SUTRequest);

    const expectedCall = {
      id: SUTRequest.id,
      authToken: SUTRequest.authToken
    };

    expect(removeSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should repass removePlaylistVideoRepository errors to upper level", async () => {
    const { SUT, removePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(removePlaylistVideoRepository, "remove").mockImplementationOnce(
      async () => {
        throw new Error("Test error");
      }
    );

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = SUT.execute(SUTRequest);

    await expect(SUTResponse).rejects.toThrow();
  });
});
