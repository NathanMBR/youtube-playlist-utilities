import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { GetNonPublicVideosValidator } from "@/data/validators";
import { GetPlaylistVideosRepository } from "@/data/repositories";
import { GetNonPublicVideosImpl } from "./GetNonPublicVideosImpl";

const getSUTEnvironment = () => {
  class GetNonPublicVideosValidatorStub implements GetNonPublicVideosValidator {
    validate(): GetNonPublicVideosValidator.Response {
      return {
        success: true,
        data: {
          playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false"
        }
      };
    }
  }

  class GetPlaylistVideosRepositoryStub implements GetPlaylistVideosRepository {
    async get(): GetPlaylistVideosRepository.Response {
      return {
        success: true,
        data: [
          {
            kind: "test-video-kind",
            etag: "test-video-etag",
            id: "test-video-id",
            snippet: {
              publishedAt: "test-video-published-at",
              channelId: "test-video-channel-id",
              title: "test-video-title",
              description: "test-video-description",
              thumbnails: {
                default: {
                  url: "test-video-thumbnail-default-url",
                  width: 120,
                  height: 90
                },
                medium: {
                  url: "test-video-thumbnail-medium-url",
                  width: 320,
                  height: 180
                },
                high: {
                  url: "test-video-thumbnail-high-url",
                  width: 480,
                  height: 360
                },
                standard: {
                  url: "test-video-thumbnail-standard-url",
                  width: 640,
                  height: 480
                },
                maxres: {
                  url: "test-video-thumbnail-maxres-url",
                  width: 1280,
                  height: 720
                }
              },
              channelTitle: "test-video-channel-title",
              playlistId: "test-video-playlist-id",
              position: 1,
              resourceId: {
                kind: "test-video-resource-id-kind",
                videoId: "test-video-resource-id-video-id"
              },
              videoOwnerChannelTitle: "test-video-video-owner-channel-title",
              videoOwnerChannelId: "test-video-video-owner-channel-id"
            },
            status: {
              privacyStatus: "test-video-status-privacy-status"
            }
          }
        ]
      };
    }
  }

  const getNonPublicVideosValidator = new GetNonPublicVideosValidatorStub();

  const getPlaylistVideosRepository = new GetPlaylistVideosRepositoryStub();

  const SUT = new GetNonPublicVideosImpl(
    getNonPublicVideosValidator,
    getPlaylistVideosRepository
  );

  return {
    getNonPublicVideosValidator,

    getPlaylistVideosRepository,

    SUT
  };
};

describe("GetNonPublicVideosImpl", () => {
  it("should successfully get a non public videos list", async () => {
    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: true,
      data: [
        {
          kind: "test-video-kind",
          etag: "test-video-etag",
          id: "test-video-id",
          snippet: {
            publishedAt: "test-video-published-at",
            channelId: "test-video-channel-id",
            title: "test-video-title",
            description: "test-video-description",
            thumbnails: {
              default: {
                url: "test-video-thumbnail-default-url",
                width: 120,
                height: 90
              },
              medium: {
                url: "test-video-thumbnail-medium-url",
                width: 320,
                height: 180
              },
              high: {
                url: "test-video-thumbnail-high-url",
                width: 480,
                height: 360
              },
              standard: {
                url: "test-video-thumbnail-standard-url",
                width: 640,
                height: 480
              },
              maxres: {
                url: "test-video-thumbnail-maxres-url",
                width: 1280,
                height: 720
              }
            },
            channelTitle: "test-video-channel-title",
            playlistId: "test-video-playlist-id",
            position: 1,
            resourceId: {
              kind: "test-video-resource-id-kind",
              videoId: "test-video-resource-id-video-id"
            },
            videoOwnerChannelTitle: "test-video-video-owner-channel-title",
            videoOwnerChannelId: "test-video-video-owner-channel-id"
          },
          status: {
            privacyStatus: "test-video-status-privacy-status"
          }
        }
      ]
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return VALIDATION_FAILED error when getNonPublicVideosValidator returns error", async () => {
    const { SUT, getNonPublicVideosValidator } = getSUTEnvironment();

    vi.spyOn(getNonPublicVideosValidator, "validate").mockReturnValueOnce(
      {
        success: false,
        errors: [
          "Test error"
        ]
      }
    );

    const SUTRequest = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "VALIDATION_FAILED"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return INVALID_PLAYLIST_URL error when playlistURL doesn't have the list query parameter", async () => {
    const { SUT, getNonPublicVideosValidator } = getSUTEnvironment();

    vi.spyOn(getNonPublicVideosValidator, "validate").mockReturnValueOnce(
      {
        success: true,
        data: {
          playlistURL: "url.test/playlist-id?telemetry=false"
        }
      }
    );

    const SUTRequest = {
      playlistURL: "url.test/playlist-id?telemetry=false",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_PLAYLIST_URL"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return INVALID_PLAYLIST_URL error when playlistURL list query parameter is empty", async () => {
    const { SUT, getNonPublicVideosValidator } = getSUTEnvironment();

    vi.spyOn(getNonPublicVideosValidator, "validate").mockReturnValueOnce(
      {
        success: true,
        data: {
          playlistURL: "url.test/playlist-id?list=&telemetry=false"
        }
      }
    );

    const SUTRequest = {
      playlistURL: "url.test/playlist-id?list=&telemetry=false",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_PLAYLIST_URL"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return REPOSITORY_FAILED error when getPlaylistVideosRepository returns error", async () => {
    const { SUT, getPlaylistVideosRepository } = getSUTEnvironment();

    vi.spyOn(getPlaylistVideosRepository, "get").mockReturnValueOnce(
      Promise.resolve(
        {
          success: false,
          error: "UNKNOWN"
        }
      )
    );

    const SUTRequest = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.execute(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "REPOSITORY_FAILED"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should pass playlistId to getNonPublicVideosValidator call", async () => {
    const { SUT, getNonPublicVideosValidator } = getSUTEnvironment();

    const validateSpy = vi.spyOn(getNonPublicVideosValidator, "validate");

    const SUTRequest = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    await SUT.execute(SUTRequest);

    const expectedCall = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    expect(validateSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should pass playlistId to getPlaylistVideosRepository call", async () => {
    const { SUT, getPlaylistVideosRepository } = getSUTEnvironment();

    const getSpy = vi.spyOn(getPlaylistVideosRepository, "get");

    const SUTRequest = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    await SUT.execute(SUTRequest);

    const expectedCall = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    expect(getSpy).toHaveBeenCalledWith(expectedCall);
  });

  it("should repass getNonPublicVideosValidator errors to upper level", async () => {
    const { SUT, getNonPublicVideosValidator } = getSUTEnvironment();

    vi.spyOn(getNonPublicVideosValidator, "validate").mockImplementationOnce(
      () => {
        throw new Error("Test error");
      }
    );

    const SUTRequest = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    const SUTResponse = SUT.execute(SUTRequest);

    await expect(SUTResponse).rejects.toThrow();
  });

  it("should repass getPlaylistVideosRepository errors to upper level", async () => {
    const { SUT, getPlaylistVideosRepository } = getSUTEnvironment();

    vi.spyOn(getPlaylistVideosRepository, "get").mockImplementationOnce(
      async () => {
        throw new Error("Test error");
      }
    );

    const SUTRequest = {
      playlistURL: "url.test/playlist?list=test-playlist-id&telemetry=false",
      authToken: "test-auth-token"
    };

    const SUTResponse = SUT.execute(SUTRequest);

    await expect(SUTResponse).rejects.toThrow();
  });
});
