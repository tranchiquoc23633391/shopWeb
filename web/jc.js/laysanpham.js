  // Lấy sku từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const sku = urlParams.get("sku");

  fetch("../jc.js/product.json")
    .then(res => res.json())
    .then(products => {
      // Tìm sản phẩm có sku đúng
      const data = products.find(item => item.sku === sku);
      
      if (!data) {
        document.body.innerHTML = "<h3 class='text-center mt-5'>Không tìm thấy sản phẩm.</h3>";
        return;
      }

      // Cập nhật thông tin
      document.getElementById("product-name").textContent = data.productName;
      document.getElementById("breadcrumb-name").textContent = data.productName;
      document.getElementById("sku").textContent = "SKU: " + data.sku;
      document.getElementById("price").textContent = data.price.toLocaleString("vi-VN") + " đ";
      document.getElementById("status").textContent = data.inStock ? "Còn hàng" : "Hết hàng";

      if (data.inStock) {
        document.getElementById("status").classList.remove("out-of-stock");
        document.getElementById("status").classList.add("btn-success");
      }

      // Mô tả
      document.getElementById("description").textContent = data.description;

      // Tính năng
      const features = document.getElementById("features");
      features.innerHTML = ""; // clear cũ
      data.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = "✅ " + feature;
        features.appendChild(li);
      });

      // Tags
      document.getElementById("tags").textContent = "Tags: " + data.tags.join(", ");

      // Hình ảnh
      const thumbnails = document.getElementById("thumbnails");
      document.getElementById("mainImage").src = data.images[0];
      thumbnails.innerHTML = "";

      data.images.forEach((img, index) => {
        const image = document.createElement("img");
        image.src = img;
        image.classList.add("thumbnail-img", "img-thumbnail");
        if (index === 0) image.classList.add("active");

        image.addEventListener("click", () => {
          document.getElementById("mainImage").src = img;
          document.querySelectorAll(".thumbnail-img").forEach(el => el.classList.remove("active"));
          image.classList.add("active");
        });

        thumbnails.appendChild(image);
      });
    });

