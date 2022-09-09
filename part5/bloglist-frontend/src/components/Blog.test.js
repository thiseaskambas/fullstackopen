import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "some title",
    author: "some author",
    user: { name: "some username" },
    likes: 999,
  };

  render(<Blog blog={blog} />);
  //   screen.debug();

  const title = screen.queryByText("some title");
  const author = screen.queryByText("some author");
  const username = screen.queryByText("some username");
  const likes = screen.queryByText("999");
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(username).toBeNull();
  expect(likes).toBeNull();
});
