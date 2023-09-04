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
      playlistURL: "https://test.com/test-url?query=test"
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseSuccess<typeof SUTRequest>;

    expect(SUTResponse.success).toBeTruthy();
  });

  it("should return error if playlistURL isn't defined", () => {
    const SUTRequest = {
      playlistURL: undefined
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBeFalsy();
    expect(issue.message).toBe("The get non public videos playlist URL is required");
  });

  it("should return error if playlistURL isn't a string", () => {
    const SUTRequest = {
      playlistURL: 1
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBeFalsy();
    expect(issue.message).toBe("The get non public videos playlist URL must be a string");
  });

  it("should return an error if playlistURL isn't a valid URL", () => {
    const SUTRequest = {
      playlistURL: "test"
    };

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBeFalsy();
    expect(issue.message).toBe("The get non public videos playlist URL must be a valid URL");
  });

  it("should return error if payload isn't defined", () => {
    const SUTRequest = undefined;

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBeFalsy();
    expect(issue.message).toBe("The get non public videos payload is required");
  });

  it("should return error if payload isn't an object", () => {
    const SUTRequest = 1;

    const SUTResponse = zodGetNonPublicVideosSchema.safeParse(SUTRequest) as SafeParseError<typeof SUTRequest>;
    const issue = SUTResponse.error.issues[0] as ZodIssue;

    expect(SUTResponse.success).toBeFalsy();
    expect(issue.message).toBe("The get non public videos payload must be an object");
  });
});
