import { z as zod } from "zod";

/* eslint-disable camelcase */
export const zodGetNonPublicVideosSchema = zod.object(
  {
    playlistURL: zod
      .string(
        {
          description: "The GetNonPublicVideos playlist URL",
          required_error: "The playlist URL is required",
          invalid_type_error: "The playlist URL must be a string"
        }
      )
      .url("The playlist URL must be a valid URL")
      .refine(url => url.includes("youtube.com/playlist"), "The playlist URL must be a valid YouTube playlist URL")
      .refine(url => url.includes("list="), "The playlist URL must be a valid YouTube playlist URL")
  },

  {
    description: "The GetNonPublicVideos payload",
    required_error: "The get non public videos payload is required",
    invalid_type_error: "The get non public videos payload must be an object"
  }
);
/* eslint-enable camelcase */
