import Head from "next/head";
import { InitialPageMetaProps, DetailsPageMetaProps } from "./MetaData.type";
import { serviceUrl } from "@/constants/serviceurl";

export function DetailsPageMeta({ title, description, currentUrl }: DetailsPageMetaProps) {
  return (
    <Head>
      <title>{`${title} - Grimity`}</title>
      <meta property="og:title" content={`${title} - Grimity`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export function InitialPageMeta({ title, url }: InitialPageMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content="그림쟁이들을 위한 그림 커뮤니티, 그리미티" />
      <meta property="og:image" content="/image/logo.svg" />
      <meta property="og:url" content={url ?? serviceUrl} />
      <meta property="og:type" content="website" />
    </Head>
  );
}
