import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [data, setData] = useState({
    name: "",
    author: "",
    price: "",
  });
  const navigate = useNavigate();
  const nameRef = useRef();
  const authorRef = useRef();
  const priceRef = useRef();

  const onClickBtn = () => {
    navigate(`/`);
  };

  const onChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  function postDataToJSONFile() {
    if (!data.name) {
      alert("Name 칸을 입력해주세요.");
      nameRef.current.focus();
      return;
    }

    if (!data.author) {
      alert("Author 칸을 입력해주세요.");
      authorRef.current.focus();
      return;
    }

    if (!data.price) {
      alert("Price 칸을 입력해주세요.");
      priceRef.current.focus();
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books");
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
      console.log(xhr.status);
      if (xhr.status === 201) {
        alert("책 리스트가 추가되었습니다.");
        onClickBtn();
      }
    };
  }
  return (
    <div>
      <h1 class="modal-title fs-5" id="exampleModalLabel">
        ADD BOOK
      </h1>

      <div class="input-group">
        NAME : <input onChange={onChangeInput} type="text" placeholder="name" name="name" />
      </div>
      <div class="input-group">
        AUTHOR : <input onChange={onChangeInput} type="text" placeholder="author" name="author" />
      </div>
      <div class="input-group">
        PRICE : <input onChange={onChangeInput} type="number" placeholder="price" name="price" />
      </div>
      <button type="button" onClick={onClickBtn}>
        Close
      </button>
      <button type="button" class="btn btn-primary" onClick={postDataToJSONFile}>
        Add
      </button>
    </div>
  );
}

export default Create;
