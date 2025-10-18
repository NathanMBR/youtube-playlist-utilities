import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { SubstitutePlaylistVideoRepository } from "@/data/repositories";
import { SubstituteVideoImpl } from "./SubstituteVideoImpl";

const getSUTEnvironment = () => {
  class SubstitutePlaylistVideoRepositoryStub implements SubstitutePlaylistVideoRepository {
    async substitute(): SubstitutePlaylistVideoRepository.Response {
      return Promise.resolve(
        {
          success: true
        }
      );
    }
  }

  const substitutePlaylistVideoRepository = new SubstitutePlaylistVideoRepositoryStub();

  const SUT = new SubstituteVideoImpl(
    substitutePlaylistVideoRepository
  );

  return {
    substitutePlaylistVideoRepository,

    SUT
  };
};

describe("SubstituteVideoImpl", () => {
  it("should successfully substitute a video", async () => {
    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      id: "test-id",
      substituteId: "test-substitute-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: true
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass INVALID_ID error", async () => {
    const { SUT, substitutePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(substitutePlaylistVideoRepository, "substitute").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "INVALID_ID"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      substituteId: "test-substitute-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_ID"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass INVALID_SUBSTITUTE_ID error", async () => {
    const { SUT, substitutePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(substitutePlaylistVideoRepository, "substitute").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "INVALID_SUBSTITUTE_ID"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      substituteId: "test-substitute-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_SUBSTITUTE_ID"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass NOT_FOUND error", async () => {
    const { SUT, substitutePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(substitutePlaylistVideoRepository, "substitute").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "NOT_FOUND"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      substituteId: "test-substitute-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "NOT_FOUND"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass SUBSTITUTE_NOT_FOUND error", async () => {
    const { SUT, substitutePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(substitutePlaylistVideoRepository, "substitute").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "SUBSTITUTE_NOT_FOUND"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      substituteId: "test-substitute-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "SUBSTITUTE_NOT_FOUND"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass UNAUTHORIZED error", async () => {
    const { SUT, substitutePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(substitutePlaylistVideoRepository, "substitute").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "UNAUTHORIZED"
        }
      )
    );

    const SUTRequest = {
      id: "test-id",
      substituteId: "test-substitute-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "UNAUTHORIZED"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should repass removePlaylistVideoRepository errors to upper level", async () => {
    const { SUT, substitutePlaylistVideoRepository } = getSUTEnvironment();

    vi.spyOn(substitutePlaylistVideoRepository, "substitute").mockImplementationOnce(
      async () => {
        throw new Error("Test error");
      }
    );

    const SUTRequest = {
      id: "test-id",
      substituteId: "test-substitute-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = SUT.execute(SUTRequest);

    await expect(SUTResponse).rejects.toThrow();
  });
});
