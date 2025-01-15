import BASE_URL from "@/constants/baseurl";

export interface FollowRequest {
  id: string;
}

export async function putFollow({ id }: FollowRequest): Promise<Response> {
  const response = await BASE_URL.put(`/users/${id}/follow`, {
    id,
  });
  return response.data;
}
