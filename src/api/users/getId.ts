import BASE_URL from "@/constants/baseurl";
import { useQuery } from "react-query";

export interface UserInfoRequest {
  id: string;
}

export interface UserInfoResponse {
  id: string;
  name: string;
  image: string;
  description: string;
  links: { linkName: string; link: string }[];
  followerCount: number;
  followingCount: number;
  feedCount: number;
  isFollowing: boolean;
}

export async function getUserInfo({ id }: UserInfoRequest): Promise<UserInfoResponse> {
  try {
    const response = await BASE_URL.get(`/users/${id}`);

    const updatedData = response.data;
    updatedData.image = `https://image.grimity.com/${updatedData.image}`;

    return updatedData;
  } catch (error) {
    console.error("Error fetching User Profile:", error);
    throw new Error("Failed to fetch User Profile");
  }
}

export function useUserData(id: string) {
  return useQuery<UserInfoResponse>(["userInfo", id], () => getUserInfo({ id }));
}
