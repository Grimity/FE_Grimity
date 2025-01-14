import { InitialPageMeta } from "@/components/MetaData/MetaData";
import MyProfile from "@/components/MyProfile/MyProfile";
import { serviceUrl } from "@/constants/serviceurl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MyPage() {
  const router = useRouter();
  const [OGTitle] = useState("내 프로필 - 그리미티");
  const [OGUrl, setOGUrl] = useState(serviceUrl);

  useEffect(() => {
    setOGUrl(serviceUrl + router.asPath);
  }, [router.asPath]);

  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <MyProfile />
    </>
  );
}
