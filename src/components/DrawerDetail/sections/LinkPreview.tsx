import { Helmet } from "react-meta-tags";
// import parse from "react-html-parser";
import { useEffect, useState } from "react";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";

const LinkPreview = ({ content }) => {
  console.log(content);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchdata = async (url) => {
      try {
        const response = await fetch(
          `https://api.linkpreview.net/?q=${url}&key=91d3fa5f170943c118179f45bd43f253`
        );
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error("Error fetching OGP data:", error);
      }
    };

    const extractLink = () => {
      const linkRegex = /<a\b[^>]*>(.*?)<\/a>/;
      const match = content.match(linkRegex);

      if (match) {
        const link = match[0].replace(/<a\b[^>]*>/, "").replace(/<\/a>/, "");
        fetchdata(link);
      }
    };
    extractLink();
  }, [content]);

  return (
    <>
      {metadata && (
        <Helmet>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:image" content={metadata.image} />
          <meta property="og:url" content={metadata.url} />
        </Helmet>
      )}
      {metadata && (
        <Stack>
          <Heading fontSize={"xl"}>{metadata.title}</Heading>
          <Text>{metadata.description}</Text>
          {metadata.image && <Image src={metadata.image} alt="preview"></Image>}
        </Stack>
      )}
    </>
  );
};

export default LinkPreview;
