import { FormControl, Box, Input, Stack,Button } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { postBlog } from "../features/blog/postSlice";
export const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();
//   const { addBlog } = useSelector((state) => state.blogs);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const plainTextContent = extractPlainText(content);
    const newBlog = { title, content: plainTextContent, date, tags };
    console.log("NewBlog:", newBlog);
    dispatch(postBlog(newBlog)).then (() => {
        console.log("Blog posted successfully");
    });

    setTitle("");
    setContent("");
    setDate("");
    setTags("");
  }; 
  const extractPlainText = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent;
  };
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <h1>Blog Form</h1>
      <form onSubmit = { handleSubmit }>
      <FormControl>
        <Stack spacing="2dvh">
          <Input type="text" value={title}
          onChange={(e) => setTitle(e.target.value)} placeholder="enter the title" mt="2dvh" />
          <Box>
            <ReactQuill
              style={{ width: "50dvw", height: "50dvh" }}
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              modules={modules}
              formats={formats}
              placeholder="Enter your blog content here"
            />
          </Box>
          <Input type="date" value={date}
          onChange={(e) => setDate(e.target.value)} min={getCurrentDate()} mt="4dvh" />
          <Input type="text"  value={tags}
          onChange={(e) => setTags(e.target.value)} placeholder="enter the tags" />
          <Button type = "submit" colorScheme="teal" size="md">
            Submit
          </Button>
        </Stack>
      </FormControl>
      </form>
    </>
  );
};
