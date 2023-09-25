import {
  describe,
  it,
  expect,
  vi
} from "vitest";

import { NodeVideosRepository } from "./NodeVideosRepository";

const mockFetchForGetOnce = () => {
  vi.spyOn(globalThis, "fetch").mockImplementationOnce(
    () => Promise.resolve(
      {
        ok: true,
        status: 200,
        async json() {
          return Promise.resolve(
            {
              nextPageToken: undefined,
              items: [
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
            }
          );
        }
      } as any
    )
  );
};

const mockFetchForRemoveOnce = () => {
  vi.spyOn(globalThis, "fetch").mockImplementationOnce(
    () => Promise.resolve(
      {
        ok: true,
        status: 200
      } as any
    )
  );
};

const getSUTEnvironment = () => {
  const youtubePlaylistVideosURL = "https://test-url.com/test-playlist";

  const SUT = new NodeVideosRepository(
    youtubePlaylistVideosURL
  );

  return {
    youtubePlaylistVideosURL,

    SUT
  };
};

describe("NodeVideosRepository get()", () => {
  it("should successfully get all playlist videos", async () => {
    mockFetchForGetOnce();

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

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

  it("should repeat search if pageToken is defined", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    fetchSpy.mockReset();

    fetchSpy.mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: true,
          status: 200,
          async json() {
            return Promise.resolve(
              {
                nextPageToken: "test-next-page-token",
                items: [
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
              }
            );
          }
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    await SUT.get(SUTRequest);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("should return INVALID_PLAYLIST error if fetch returns status code 400", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 400
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_PLAYLIST"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return FORBIDDEN_PLAYLIST error if fetch returns status code 403", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 403
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "FORBIDDEN_PLAYLIST"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return PLAYLIST_NOT_FOUND error if fetch returns status code 404", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 404
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "PLAYLIST_NOT_FOUND"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return UNKNOWN error if fetch returns any other failure status code", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 999
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "UNKNOWN"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return INVALID_FETCH_URL error if fetch returns status code 404", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 404
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "PLAYLIST_NOT_FOUND"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return INVALID_PLAYLIST_URL error if fetch throws TypeError", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      async () => {
        throw new TypeError("Test error");
      }
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_PLAYLIST_URL"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return NON_JSON_RESPONSE_BODY error if fetch throws SyntaxError", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      async () => {
        throw new SyntaxError("Test error");
      }
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.get(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "NON_JSON_RESPONSE_BODY"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should pass playlistItemsURL and authToken to fetch call", async () => {
    mockFetchForGetOnce();

    const { SUT, youtubePlaylistVideosURL } = getSUTEnvironment();

    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    await SUT.get(SUTRequest);

    const expectedCall = [
      `${youtubePlaylistVideosURL}?playlistId=${SUTRequest.playlistId}&part=id%2Csnippet%2Cstatus&maxResults=50`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${SUTRequest.authToken}`
        }
      }
    ];

    expect(fetchSpy).toHaveBeenCalledWith(...expectedCall);
  });

  it("should repass fetch errors to upper level", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      async () => {
        throw new Error("Test error");
      }
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      playlistId: "test-playlist-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = SUT.get(SUTRequest);

    await expect(SUTResponse).rejects.toThrow();
  });
});

describe("NodeVideosRepository remove()", () => {
  it("should successfully remove a video", async () => {
    mockFetchForRemoveOnce();

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.remove(SUTRequest);

    const expectedResponse = {
      success: true
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return INVALID_ID error if fetch returns status code 400", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 400
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.remove(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "INVALID_ID"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return UNAUTHORIZED error if fetch returns status code 403", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 403
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.remove(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "UNAUTHORIZED"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return NOT_FOUND error if fetch returns status code 404", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      () => Promise.resolve(
        {
          ok: false,
          status: 404
        } as any
      )
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = await SUT.remove(SUTRequest);

    const expectedResponse = {
      success: false,
      error: "NOT_FOUND"
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should pass playlistItemsURL and authToken to fetch call", async () => {
    mockFetchForRemoveOnce();

    const { SUT, youtubePlaylistVideosURL } = getSUTEnvironment();

    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    await SUT.remove(SUTRequest);

    const expectedCall = [
      `${youtubePlaylistVideosURL}?id=${SUTRequest.id}`,

      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${SUTRequest.authToken}`
        }
      }
    ];

    expect(fetchSpy).toHaveBeenCalledWith(...expectedCall);
  });

  it("should repass fetch error to upper level", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementationOnce(
      async () => {
        throw new Error("Test error");
      }
    );

    const { SUT } = getSUTEnvironment();

    const SUTRequest = {
      id: "test-id",
      authToken: "test-auth-token"
    };

    const SUTResponse = SUT.remove(SUTRequest);

    await expect(SUTResponse).rejects.toThrow();
  });
});
