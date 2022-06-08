import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import slugify from "slugify";
import Link from "next/link";
import rehypeSlug from "rehype-slug";

export const getTableOfContents = async (content) => {
  const regexp = new RegExp(/^(### |## )(.*)\n/, "gm");
  const headings = [...content.matchAll(regexp)];

  let tableOfContents = [];

  if (headings.length) {
    tableOfContents = headings.map((heading) => {
      const headingText = heading[2].trim();
      const headingType = heading[1].trim() === "##" ? "h2" : "h3";
      const headingLink = slugify(headingText, { lower: true, strict: true });

      return {
        title: headingType === "h2" ? headingText : `- ${headingText}`,
        link: `#${headingLink}`,
      };
    });
  }

  return tableOfContents;
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const options = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug, // add IDs to any h1-h6 tag that doesn't have one, using a slug made from its text
      ],
    },
  };
  const mdxSource = await serialize(content, options);
  const tableOfContents = await getTableOfContents(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
      tableOfContents,
    },
  };
};

const PostPage = ({ frontMatter: { title }, mdxSource, tableOfContents }) => {
  return (
    <div className="flex justify-center antialiased my-20">
      <aside className="hidden md:block md:w-80">
        <div className="flex flex-col sticky top-0 ml-10">
          <span className="text-lg font-bold mb-3 mt-6 font-inter text-custom-toc">DAFTAR ISI</span>
          <ul>
            {tableOfContents.map((el, index) => (
              <li key={index} className='pb-3 leading-none hover:text-black text-custom-toc font-inter'>
                <Link passHref href={el["link"]} >
                  {el["title"]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <article className="my-5 mx-10 flex-1 prose lg:prose-xl prose-headings:font-epilogue prose-h1:text-custom-title prose-h2:text-custom-subtitle prose-h3:text-custom-subtitle prose-h4:text-custom-subtitle">
        <MDXRemote {...mdxSource} components={{ SyntaxHighlighter }} />
      </article>
    </div>
  );
};

export default PostPage;
