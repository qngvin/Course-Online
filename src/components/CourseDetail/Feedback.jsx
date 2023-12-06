import React from "react";
import { Rate } from "antd";

export default function Feedback() {
  const feedbackData = [
    {
      id: 1,
      avatarSrc: "/assests/images/avatar_tempt/avatar.jpg",
      username: "Ba la bum ba la bum",
      rating: 2,
      comment: "Khoa học này ko hay",
    },
    {
      id: 2,
      avatarSrc: "/assests/images/avatar_tempt/avatar.jpg",
      username: "Ba la bum ba la bum2",
      rating: 2,
      comment: "Khoa học này ko hay",
    },
    {
      id: 3,
      avatarSrc: "/assests/images/avatar_tempt/avatar.jpg",
      username: "Ba la bum ba la bum3",
      rating: 2,
      comment: "Khoa học này ko hay",
    },
    {
      id: 4,
      avatarSrc: "/assests/images/avatar_tempt/avatar.jpg",
      username: "Ba la bum ba la bum3",
      rating: 2,
      comment: "Khoa học này ko hay",
    },
    {
      id: 5,
      avatarSrc: "/assests/images/avatar_tempt/avatar.jpg",
      username: "Ba la bum ba la bum3",
      rating: 2,
      comment: "Khoa học này ko hay",
    },
    {
      id: 6,
      avatarSrc: "/assests/images/avatar_tempt/avatar.jpg",
      username: "Ba la bum ba la bum3",
      rating: 2,
      comment: "Khoa học này ko hay",
    },
  ];

  return (
    <>
      <h1 className="font-bold flex justify-center text-[38px] mb-4">
        FeedBack
      </h1>
      <div className="flex flex-wrap justify-start ml-[40px]">
        {feedbackData.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white mx-[20px] rounded-[12px] w-[30%] mb-4 p-4"
          >
            <div className="flex items-center">
              <img
                src={feedback.avatarSrc}
                className="relative rounded-[50%] h-[20%] w-[20%]"
              />

              <div className="ml-[20px]">
                <h1 className="font-bold text-[20px]">{feedback.username}</h1>
                <Rate
                  className="text-base text-[#41efb2]"
                  allowHalf
                  value={feedback.rating}
                />
              </div>
            </div>
            <div className="px-2 pt-5">Comment: {feedback.comment}</div>
          </div>
        ))}
      </div>
    </>
  );
}
