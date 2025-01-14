import Banner from "@/components/Layout/Banner/Banner";
import HotFeed from "@/components/Layout/HotFeed/HotFeed";
import WholeFeed from "@/components/Layout/WholeFeed/WholeFeed";
import styles from "@/styles/pages/home.module.scss";
import { InitialPageMeta } from "@/components/MetaData/MetaData";
import { serviceUrl } from "@/constants/serviceurl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [OGTitle] = useState("그리미티");
  const [OGUrl, setOGUrl] = useState(serviceUrl);

  useEffect(() => {
    setOGUrl(serviceUrl + router.asPath);
  }, [router.asPath]);

  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <div className={styles.container}>
        <Banner />
        <HotFeed />
        <WholeFeed />
      </div>
    </>
  );
}
