$(document).ready(function () {
    var html = "";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://651ab40b340309952f0db7e5.mockapi.io/fakeApiDoAn",
        success: function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                console.log(element.ID);
                html += '<tr><td>' + element.ID + '</td><td>'
                    + element.name + '</td><td>'
                    + element.phoneText + '</td><td>'
                    + element.email
                    + '</td><td>' + element.account + '</td><td> <button onclick="openModal(' + element.ID + ')" class="open_modal_account" id="myBtn">Edit</button><br> <button onclick="openDeleteModal(' + element.ID + ')" type="button" class="bg-red-500 del_btn">Xóa</button></td></tr>';
            }
            $(".put_film").append(html);
        },
        error: function () {
            console.log("có lỗi xảy ra");
        }
    });
});

function openModal(ID) {
    // Truyền thông tin sản phẩm vào modal

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://651ab40b340309952f0db7e5.mockapi.io/fakeApiDoAn/" + ID,
        success: function (data) {
            $("#name").val(data.name);
            $("#ID").val(data.ID);
            $("#phoneText").val(data.phoneText);
            $("#email").val(data.email);
            $("#account").val(data.account);
            $("input").prop("disabled", false);
            $("#myModal").css("display", "block"); // Hiển thị modal
        },
        error: function () {
            console.log("Có lỗi xảy ra");
        },
    });
}

// hàm cập nhật thông tin
$(document).ready(function () {
    $(".submit_account").click(function (e) {
        e.preventDefault();
        let id = $("#ID").val();
        $.ajax({
            type: "PUT",
            data: $("form").serialize(),
            dataType: "json",
            url: "https://651ab40b340309952f0db7e5.mockapi.io/fakeApiDoAn/" + id,
            success: function (data) {
                // Cập nhật thông tin trên trang mà không cần tải lại
                window.location.reload();
            },
            error: function () {
                console.log("Có lỗi xảy ra");
            },
        });
    });
});
//hàm tắt modal thông tin 
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("myModal");
    const closeButton = modal.querySelector(".close");
    const cancelButton = modal.querySelector(".btn_close");

    function closeModal() {
        modal.style.display = "none";
    }

    closeButton.addEventListener("click", closeModal);
    cancelButton.addEventListener("click", closeModal);
});
//hàm xáo thông tin
function openDeleteModal(ID) {
    $("#delModal").css("display", "block");
    $("#delModal").data("id", ID); // Lưu ID vào thuộc tính data của modal
}

$(document).ready(function () {
    $(".confirm_del").click(function (e) {
        e.preventDefault();
        let id = $("#delModal").data("id"); // Lấy ID từ thuộc tính data của modal
        $.ajax({
            type: "DELETE",
            dataType: "json",
            url: "https://651ab40b340309952f0db7e5.mockapi.io/fakeApiDoAn/" + id,
            success: function (data) {
                window.location.reload();
            },
            error: function () {
                console.log("Có lỗi xảy ra");
            },
        });
    });
});
//hàm tắt modal xóa
document.addEventListener("DOMContentLoaded", function () {
    const modal_del = document.getElementById("delModal");
    const closeButton_1 = modal_del.querySelector(".close_del");
    const cancelButton_1 = modal_del.querySelector(".cancel_del");

    function closeModalDel() {
        modal_del.style.display = "none";
    }

    closeButton_1.addEventListener("click", closeModalDel);
    cancelButton_1.addEventListener("click", closeModalDel);
});

//hàm tìm kiếm
$(document).ready(function () {
    $("#searchButton").click(function () {
        var searchTerm = $("#searchInput").val();
        $('tr').each(function () {
            var itemText = $(this).text();
            if (itemText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $("#searchButton").click(function () {
        var searchTerm = $(".select_genre_film").val();
        $('tr').each(function () {
            var itemText = $(this).text();
            if (itemText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $("#searchButton").click(function () {
        var searchTerm = $(".select_status_film_form").val();
        $('tr').each(function () {
            var itemText = $(this).text();
            if (itemText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});