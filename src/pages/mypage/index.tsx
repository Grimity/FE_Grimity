import { InitialPageMeta } from "@/components/MetaData/MetaData";
import { SSRMetaProps } from "@/components/MetaData/MetaData.type";
import { serviceUrl } from "@/constants/serviceurl";
import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = "내 프로필 - 그리미티";
  const OGUrl = `${serviceUrl}`;
  return {
    props: {
      OGTitle,
      OGUrl,
    },
  };
};

export default function MyPage({ OGTitle, OGUrl }: SSRMetaProps) {
  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <Link href="/mypage/edit">
        <button>프로필 편집</button>
      </Link>
    </>
  );
}
