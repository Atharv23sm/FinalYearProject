import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { LuImagePlus, LuTrash2 } from "react-icons/lu";

export default function TestPreview(value) {
  const questions = value.value[0];
  const setViewQuestions = value.value[1];
  const [updatedQuestions, setUpdatedQuestions] = useState(questions);

  const handleButtonClick = (questionId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleUpload(questionId, file);
      }
    };
    input.click();
  };
  const handleUpload = async (questionId, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axiosInstance.post(
        `/upload-image/${questionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setViewQuestions(true);
        setUpdatedQuestions((prev) => {
          if (Array.isArray(prev)) {
            return prev.map((item) =>
              item._id === questionId
                ? { ...item, image: response.data.imageUrl }
                : item
            );
          }
          return prev;
        });
        setUploadStatus("Image uploaded successfully!");
      } else {
        console.error("Failed to upload image:", response.data.message);
        setUploadStatus("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(error.response.data.message);
    }
  };

  const handleDelete = async (questionId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the image?"
    );
    if (isConfirmed) {
      try {
        const response = await axiosInstance.delete(
          `/delete-image/${questionId}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setViewQuestions(true);
          setUpdatedQuestions((prev) => {
            if (Array.isArray(prev)) {
              return prev.map((item) =>
                item._id === questionId
                  ? { ...item, image: response.data.imageUrl }
                  : item
              );
            }
            return prev;
          });
        } else {
          console.error("Failed to upload image:", response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image.");
      }
    } else {
      console.log("Delete action canceled");
      alert("Something went wrong while deleting the image, try again later.");
    }
  };

  return (
    <div className="w-full p-2 md:p-4 bg-[#eee] rounded-md space-y-4">
      {updatedQuestions.map((item, index) => (
        <div
          key={index}
          className="w-full p-2 md:p-4 bg-white rounded-md space-y-4"
        >
          <div>
            {"Question " + item.index + " : "}
            <br />
            {item.question}
          </div>
          <div>
            {"Options : "}
            <br />
            <div>
              {Object.values(item.options).map((item, index) => (
                <div key={index}>{item.label + ") " + item.answer}</div>
              ))}
            </div>
          </div>
          <div>{"Correct Answer : " + item.correctAnswer}</div>
          <div>
            {item.image ? (
              <div className="space-y-4">
                <img
                  src={item.image}
                  alt={`Question ${item.index}`}
                  className="max-w-full h-auto rounded-md bg-[#ddf]"
                />

                <LuTrash2
                  onClick={() => handleDelete(item._id)}
                  size={32}
                  color="white"
                  className="p-1 bg-[#f00] rounded-md cursor-pointer"
                />
              </div>

            ) : (
              <div className="flex items-center gap-1">
                <LuImagePlus
                  size={32}
                  onClick={() => handleButtonClick(item._id)}
                  className="button p-1"
                />
              </div>
            )}
          </div>
        </div>
      ))}
       
    </div>
  );
}
