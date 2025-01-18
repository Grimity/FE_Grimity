import BASE_URL from "@/constants/baseurl";
import { useQuery } from "react-query";

export interface UserFeedsRequest {
  id: string;
  tag?: string;
  lastCreatedAt?: string;
  lastId?: string;
}

export interface UserFeedsResponse {
  id: string;
  title: string;
  cards: string[];
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export async function getUserFeeds({
  tag,
  id,
  lastCreatedAt,
  lastId,
}: UserFeedsRequest): Promise<UserFeedsResponse[]> {
  try {
    const response = await BASE_URL.get(`/users/${id}/feeds`, {
      params: {
        tag,
        lastCreatedAt,
        lastId,
        limit: 12,
      },
    });

    const updatedData = response.data.map((data: UserFeedsResponse) => ({
      ...data,
      cards: data.cards.map((card) => `https://image.grimity.com/${card}`),
    }));

    return updatedData;
  } catch (error) {
    console.error("Error fetching User Feeds:", error);
    throw new Error("Failed to fetch User Feeds");
  }
}

export function useUserFeeds({ id, tag, lastCreatedAt, lastId }: UserFeedsRequest) {
  return useQuery<UserFeedsResponse[]>(["userFeeds", id, tag, lastCreatedAt, lastId], () =>
    getUserFeeds({ id, tag, lastCreatedAt, lastId })
  );
}
