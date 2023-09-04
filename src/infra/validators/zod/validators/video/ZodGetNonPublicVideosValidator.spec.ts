import {
  describe,
  it,
  expect,
  vi
} from "vitest";
import { ZodError } from "zod";

import { zodGetNonPublicVideosSchema } from "@/infra/validators";
import { ZodGetNonPublicVideosValidator } from "./ZodGetNonPublicVideosValidator";

vi.spyOn(zodGetNonPublicVideosSchema, "safeParse").mockReturnValue(
  {
    success: true,
    data: {
      playlistURL: "test-playlist-url"
    }
  }
);

const getSUTEnvironment = () => {
  const SUT = new ZodGetNonPublicVideosValidator();

  return {
    SUT
  };
};

describe("ZodGetNonPublicVideosValidator", () => {
  it("should successfully validate a GetNonPublicVideos payload", () => {
    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistURL: "test-playlist-url"
    };

    const SUTResponse = SUT.validate(SUTRequest);

    const expectedResponse = {
      success: true,
      data: SUTRequest
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return error if zodGetNonPublicVideosSchema returns error", () => {
    vi.spyOn(zodGetNonPublicVideosSchema, "safeParse").mockReturnValueOnce(
      {
        success: false,
        error: new ZodError(
          [
            {
              code: "custom",
              path: ["test"],
              message: "Test error"
            }
          ]
        )
      }
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistURL: "test-playlist-url"
    };

    const SUTResponse = SUT.validate(SUTRequest);

    const expectedResponse = {
      success: false,
      errors: [
        "Test error"
      ]
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should not use error throwing zod parse method", () => {
    const { SUT } = getSUTEnvironment();

    const parseSpy = vi.spyOn(zodGetNonPublicVideosSchema, "parse");

    const SUTRequest = {
      playlistURL: "test-playlist-url"
    };

    SUT.validate(SUTRequest);

    expect(parseSpy).not.toHaveBeenCalled();
  });

  it("should pass payload to zodGetNonPublicVideosSchema safeParse call", () => {
    const { SUT } = getSUTEnvironment();

    const safeParseSpy = vi.spyOn(zodGetNonPublicVideosSchema, "safeParse");

    const SUTRequest = {
      playlistURL: "test-playlist-url"
    };

    SUT.validate(SUTRequest);

    expect(safeParseSpy).toHaveBeenCalledWith(SUTRequest);
  });

  it("should repass zodGetNonPublicVideosSchema errors to upper level", () => {
    const { SUT } = getSUTEnvironment();

    vi.spyOn(zodGetNonPublicVideosSchema, "safeParse").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const SUTRequest = {
      playlistURL: "test-playlist-url"
    };

    const getSUTResponse = () => SUT.validate(SUTRequest);

    expect(getSUTResponse).toThrow();
  });
});
