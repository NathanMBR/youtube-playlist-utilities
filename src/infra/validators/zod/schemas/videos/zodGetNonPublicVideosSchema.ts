import { z as zod } from "zod";

/* eslint-disable camelcase */
export const zodGetNonPublicVideosSchema = zod.object(
  {
    playlistURL: zod
      .string(
        {
          description: "The GetNonPublicVideos playlist URL",
          required_error: "The get non public videos playlist URL is required",
          invalid_type_error: "The get non public videos playlist URL must be a string"
        }
      )
      .url("The get non public videos playlist URL must be a valid URL")
  },

  {
    description: "The GetNonPublicVideos payload",
    required_error: "The get non public videos payload is required",
    invalid_type_error: "The get non public videos payload must be an object"
  }
);
/* eslint-enable camelcase */
