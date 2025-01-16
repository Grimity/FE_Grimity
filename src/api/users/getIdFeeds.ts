import BASE_URL from "@/constants/baseurl";
import { useQuery } from "react-query";

export interface UserFeedsRequest {
  id: string;
  lastCreatedAt?: string;
  lastId?: string;
}

export interface UserFeedsResponse {
  id: string;
  title: string;
  cards: string[];
  createdAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export async function getUserFeeds({
  id,
  lastCreatedAt,
  lastId,
}: UserFeedsRequest): Promise<UserFeedsResponse[]> {
  try {
    const response = await BASE_URL.get(`/users/${id}/feeds`, {
      params: { lastCreatedAt, lastId },
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

export function useUserFeeds({ id, lastCreatedAt, lastId }: UserFeedsRequest) {
  return useQuery<UserFeedsResponse[]>(["userFeeds", id, lastCreatedAt, lastId], () =>
    getUserFeeds({ id, lastCreatedAt, lastId })
  );
}
