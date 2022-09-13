import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("displays details after clicking", async () => {
  const blog = {
    title: "some title",
    author: "some author",
    user: { name: "some username", id: "testId" },
    likes: 999,
  };

  const user = {
    id: "testId",
  };

  render(<Blog blog={blog} user={user} />);
  const button = screen.getByText("show");
  const feUser = userEvent.setup();
  await feUser.click(button);
  const username = screen.queryByText("some username");
  const likes = screen.queryByText("999");
  const deleteBtn = screen.queryByText("Delete");
  expect(username).toBeDefined();
  expect(likes).toBeDefined();
  expect(deleteBtn).toBeDefined();
});

// test("handler is called twice when like button is clicked twice", async () => {
//   const blog = {
//     title: "some title",
//     author: "some author",
//     user: { name: "some username", id: "testId" },
//     likes: 999,
//   };

//   const user = {
//     id: "testId",
//   };

//   const mockHandler = jest.fn();

//   render(<Blog blog={blog} user={user} likeTest={mockHandler} />);
//   const showBtn = screen.getByText("show");
//   const feUser = userEvent.setup();
//   await feUser.click(showBtn);

//   const likeBtn = screen.getByText("like");
//   expect(likeBtn).toBeDefined();
//   await feUser.click(likeBtn);
//   await feUser.click(likeBtn);
//   expect(mockHandler.mock.calls).toHaveLength(2);
// });
