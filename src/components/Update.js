import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Update() {
  const [data, setData] = useState({
    name: "",
    author: "",
    price: "",
    id: "",
  });
  const [changeNum, setChangeNum] = useState(0);
  const [statusMessage, setStatusMessage] = useState("ID를 입력하세요."); // 초기값
  const [statusColor, setStatusColor] = useState("red"); // 초기 색상: 빨간색
  const idRef = useRef();
  const nameRef = useRef();
  const authorRef = useRef();
  const priceRef = useRef();
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(`/`);
  };

  const onChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    // ID 유효성 검사
    if (e.target.name === "id" && !e.target.value) {
      setStatusMessage("ID를 입력하세요.");
      setStatusColor("red");
      return;
    }

    // 모든 입력 필드의 유효성 검사
    if (!data.name || !data.author || !data.price || !data.id) {
      setStatusMessage("모든 입력 필드를 채워주세요.");
      setStatusColor("red");
      return;
    }

    // 입력값이 올바른 경우 API 호출
    updateDataToJSONFile();
  };

  function updateDataToJSONFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books/" + data.id);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
      if (xhr.status === 200) {
        setStatusMessage("책의 정보가 수정되었습니다.");
        setStatusColor("green"); // 성공 메시지는 초록색
        setChangeNum(changeNum + 1); // 수정 횟수 증가
      } else if (xhr.status === 404) {
        setStatusMessage("해당 ID는 존재하지 않습니다.");
        setStatusColor("red");
      } else {
        setStatusMessage("오류가 발생했습니다. 다시 시도해주세요.");
        setStatusColor("red");
      }
    };
  }

  return (
    <div>
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        UPDATE BOOK INFO
      </h1>

      <div className="input-group">
        ID: <input ref={idRef} onChange={onChangeInput} type="text" placeholder="id" name="id" />
      </div>
      <div className="input-group">
        NAME: <input ref={nameRef} onChange={onChangeInput} type="text" placeholder="name" name="name" />
      </div>
      <div className="input-group">
        AUTHOR: <input ref={authorRef} onChange={onChangeInput} type="text" placeholder="author" name="author" />
      </div>
      <div className="input-group">
        PRICE: <input ref={priceRef} onChange={onChangeInput} type="number" placeholder="price" name="price" />
      </div>
      <div>페이지 내에 총 수정 횟수: {changeNum}</div>
      <div style={{ color: statusColor }}>{statusMessage}</div>
      <button type="button" onClick={onClickBtn}>
        Close
      </button>
    </div>
  );
}

export default Update;
