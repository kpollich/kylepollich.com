import { compareDesc, format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';

import styled from 'styled-components';
import {
  childVariants,
  EnterTransition,
} from '../../components/EnterTransition';
import { MetaTags } from '../../components/MetaTags';
import { getAllPostData } from '../../content';
import { Layout } from '../../layouts';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: auto;
`;

const BlogPostList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 6em;

    :last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: none;
    }
  }
`;

interface Props {
  posts: Array<{
    slug: string;
    excerpt: string;
    frontMatter: {
      title: string;
      subtitle: string;
      datePublished: string;
      imageAlt?: string;
      imageCreditText?: string;
      imageCreditLink?: string;
      image?: string;
      seoImage?: string;
    };
  }>;
}

const BlogPage: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <Layout>
      <MetaTags
        title="Blog"
        description="Where I blog about web technologies and software engineering culture."
      />
      <EnterTransition>
        <Wrapper>
          <motion.h1 variants={childVariants}>Blog Posts</motion.h1>

          <BlogPostList>
            {posts
              .sort((first, second) =>
                compareDesc(
                  new Date(first.frontMatter.datePublished),
                  new Date(second.frontMatter.datePublished)
                )
              )
              .map((post) => (
                <motion.li variants={childVariants} key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <a>
                      <Image
                        src={post.frontMatter.image ?? ''}
                        alt={post.frontMatter.imageAlt}
                        width={800}
                        height={450}
                      />
                    </a>
                  </Link>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>
                      <a>{post.frontMatter.title}</a>
                    </Link>
                  </h3>
                  <time>
                    {format(
                      new Date(post.frontMatter.datePublished),
                      'MMMM do, yyyy'
                    )}
                  </time>
                  <p>{post.excerpt}</p>
                  <div>
                    <Link href={`/blog/${post.slug}`}>
                      <a
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          textDecoration: 'underline',
                        }}
                      >
                        <span style={{ marginRight: '0.5rem' }}>Read</span>{' '}
                        <ArrowRight size={20} />
                      </a>
                    </Link>
                  </div>
                </motion.li>
              ))}
          </BlogPostList>
        </Wrapper>
      </EnterTransition>
    </Layout>
  );
};

export async function getStaticProps() {
  const postData = getAllPostData();

  return {
    props: {
      posts: postData,
    },
  };
}

export default BlogPage;