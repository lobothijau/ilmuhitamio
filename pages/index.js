import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeId from "dayjs/locale/id";

export default function Home({ posts }) {
  return (
    <div className="mx-auto w-6/12">
      {posts.map((post, index) => (
        <div className="mb-10">
          <div className="flex flex-row gap-1 mb-1">
            {post.frontMatter.tags.map((tag, index) => (
              <Link href={""} key={index}>
                <a onClick={() => alert('fitur belum tersedia')}>
                  <span className="bg-slate-200 text-custom-title hover:bg-slate-800 hover:text-slate-200 px-2 rounded-lg py-1">
                    {tag}
                  </span>
                </a>
              </Link>
            ))}
          </div>
          <Link href={"/blog/" + post.slug} passHref key={index}>
            <a>
              <p className="font-inter font-bold text-custom-subtitle text-4xl">
                {post.frontMatter.title}
              </p>
            </a>
          </Link>
          <p className="text-gray-500">{post.frontMatter.description}</p>
          <p className="text-slate-700">
            <small>
              {post.dateString} • oleh:{" "}
              <Link
                href={post.frontMatter.authorUrl ?? "https://ilmuhitam.io/"}
              >
                <a target={"_blank"}>
                  {post.frontMatter.author ?? "ilmuhitam.io"}
                </a>
              </Link>
            </small>
          </p>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    dayjs.locale(localeId);
    dayjs.extend(relativeTime);
    dayjs.extend(customParseFormat);
    const date = dayjs(frontMatter.date, "DD-MM-YYYY HH:mm:ss");
    let dateString = "";
    console.log(date.diff(dayjs(), "d"));
    if (date.diff(dayjs(), "d") >= -7) {
      dateString = date.fromNow();
    } else {
      dateString = date.format("D MMMM YYYY");
    }

    return {
      frontMatter,
      slug: filename.split(".")[0],
      dateString,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
