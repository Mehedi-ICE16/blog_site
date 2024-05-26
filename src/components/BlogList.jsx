import { useEffect, useState } from "react";
import { Button, Stack, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { getBlog } from "../features/blog/getSlice";
export const BlogList = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blog
  );
  const toggleShowAll = () => {
    setShowAll((showAll) => !showAll);
  };
  const splitTextIntoLines = (text) => {
    return text.split(" ").slice(0, 40).join(" ");
  };
  let searchedBlog;
  const debouncedSearch = debounce((query) => {
    // setSearchQuery(query);
    console.log(query);
    searchedBlog = blogs.find((blog) =>
        blog.title.toLowerCase().startsWith(query.toLowerCase())
      );
 console.log(searchedBlog);
  }, 2000);

  const navigate = useNavigate();
  const navigateToForm = () => {
    navigate("/blog-form");
  };
  const sortBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);
  let content;

  if (isLoading) {
    content = <h3>Loading blogs...</h3>;
  } else if (isError) {
    content = <h1>{error}</h1>;
  } else if (blogs.length === 0) {
    content = <h1>No blogs found</h1>;
  } else {
    content = (
      <Stack spacing={10}>
        {sortBlogs.map((blog) => (
          <Box key={blog.id} boxShadow="sm" p="6" rounded="md" bg="#F7FAFC">
            <Text fontSize={"2xl"} textAlign="left"  mb="3dvh" fontWeight = 'bold'>
              {blog.title}
            </Text>
            {!showAll && (
              <Text fontSize="md" textAlign="left">
                {splitTextIntoLines(blog.content)}
              </Text>
            )}
            {showAll ? (
              <Text fontSize="md" textAlign="left" ml="3dvw" mb="3dvh">
                {blog.content}
              </Text>
            ) : (
              <button style={{ marginBottom: "10dvh", marginRight: "-30dvw", cursor: "pointer" }} onClick={toggleShowAll}>
                Read more
              </button>
            )}
           
            <Text fontSize="md" mb="-3dvh" w = "fit-content" boxShadow="sm" p="3" rounded="3xl" bg="#FFFFFF">
              {blog.tags}
            </Text>
         
            {blog.date && (
              <Text fontSize="lg" mb="-2dvh" mr="-50dvw">
                published at. {new Date(blog.date).toLocaleDateString()}
              </Text>
            )}
          </Box>
        ))}
      </Stack>
    );
  }
  if (content)
    return (
      <>
         <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => {
            setSearchQuery(() => e.target.value);
            debouncedSearch(e.target.value);
        }}
      />
        <Button
          colorScheme="teal"
          ml={"70dvw"}
          size="md"
          onClick={navigateToForm}
        >
          Create Blog
        </Button>
        <Box>{content}</Box>
      </>
    );
};
