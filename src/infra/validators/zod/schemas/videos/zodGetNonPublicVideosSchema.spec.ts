import {
  describe,
  it,
  expect
} from "vitest";
import {
  SafeParseSuccess,
  SafeParseError,
  ZodIssue
} from "zod";

import { zodGetNonPublicVideosSchema } from "./zodGetNonPublicVideosSchema";

describe("zodGetNonPublicVideosSchema", () => {
  it("should successfully validate a GetNonPublicVideos payload", () => {
    const SUTRequest = {
      playlistURL: "https://youtube.com/playlist?list=test-playlist-id"
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseSuccess<typeof SUTRequest>;

    expect(SUTResponse.success).toBe(true);
  });

  it("should return error if playlistURL isn't defined", () => {
    const SUTRequest = {
      playlistURL: undefined
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBe(false);
    expect(issue.message).toBe("The playlist URL is required");
  });

  it("should return error if playlistURL isn't a string", () => {
    const SUTRequest = {
      playlistURL: 1
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBe(false);
    expect(issue.message).toBe("The playlist URL must be a string");
  });

  it("should return an error if playlistURL isn't a valid URL", () => {
    const SUTRequest = {
      playlistURL: "test"
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBe(false);
    expect(issue.message).toBe("The playlist URL must be a valid URL");
  });

  it("should return an error if playlistURL isn't from YouTube domain", () => {
    const SUTRequest = {
      playlistURL: "https://test.com/playlist?list=test-playlist-id"
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBe(false);
    expect(issue.message).toBe("The playlist URL must be a valid YouTube playlist URL");
  });

  it("should return an error if playlistURL doesn't have a list query parameter", () => {
    const SUTRequest = {
      playlistURL: "https://youtube.com/playlist"
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBe(false);
    expect(issue.message).toBe("The playlist URL must be a valid YouTube playlist URL");
  });

  it("should return error if payload isn't defined", () => {
    const SUTRequest = undefined;

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBe(false);
    expect(issue.message).toBe("The get non public videos payload is required");
  });

  it("should return error if payload isn't an object", () => {
    const SUTRequest = 1;

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBe(false);
    expect(issue.message).toBe("The get non public videos payload must be an object");
  });
});
