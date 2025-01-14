export function useMembershipDuration(joinDate: Date | string | null) {
  if (!joinDate) return "";
  const date = new Date(joinDate);
  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}
