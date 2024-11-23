import React from "react";
import "./List.css";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();
  function getDataFromJSONFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        $("#div_BookList").html("");
        let book = JSON.parse(xhr.response);

        book.forEach((item) => {
          $("#div_BookList").append(`
                <div class="book-item">
                  <span class="book-id">${item.id}</span>
                  <span class="book-name">${item.name}</span>
                  <span class="book-author">${item.author}</span>
                  <span class="book-price">${item.price}</span>
                </div>
              `);
        });
      }
    };
  }

  const onClickCreate = () => {
    navigate(`/create`);
  };

  const onClickUpdate = () => {
    navigate(`/update`);
  };

  function deleteDataFromJSONFile() {
    let id = $("#book_id_delete").val();
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://672818ac270bd0b975544f7b.mockapi.io/api/v1/books/" + id);

    xhr.send();
    xhr.onload = () => {
      console.log("status : " + xhr.status);
      if (xhr.status === 200) {
        alert("책이 삭제되었습니다.");
        window.location.reload();
      } else if (xhr.status === 404) {
        alert("해당 id는 존재하지 않습니다.");
      } else alert("id를 입력하세요.");
    };
  }
  window.onload = getDataFromJSONFile();

  return (
    <div>
      <h1>Book List</h1>
      <p>페이지를 새로고침 할 때마다 Book List 가 자동으로 불러와집니다.</p>
      <p>책을 추가, 수정, 삭제하고 싶으시면 오른쪽 버튼을 통해 페이지에 들어가 진행해주시면 됩니다.</p>
      <p>책의 id는 list의 가장 왼쪽에 있는 순서입니다.</p>
      <div class="main-container">
        <div id="div_BookList"></div>

        <div class="form-container">
          <button type="button" class="btn btn-primary" onClick={onClickCreate}>
            ADD BOOK
          </button>

          <button type="button" class="btn btn-primary" onClick={onClickUpdate}>
            UPDATE BOOK INFO
          </button>

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
            DELETE BOOK
          </button>

          <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="deleteModalLabel">
                    DELETE BOOK
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="input-group">
                    ID : <input type="text" placeholder="id" id="book_id_delete" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary" onClick={deleteDataFromJSONFile}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
