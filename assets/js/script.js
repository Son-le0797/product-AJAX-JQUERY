class Product {
    constructor(id, name, brand) {
      this.id = id;
      this.name = name;
      this.brand = brand;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getId() {
      return this.id;
    }
  
    setName(name) {
        this.name = name;
    }
  
    getName() {
        return this.name;
    }
  
    setBrand(brand) {
      this.brand = brand;
    }
  
    getBrand() {
      return this.brand;
    }
  };

  class brand {
      constructor(brandId, brandName) {
          this.brandId = brandId;
          this.brandName = brandName;
      }

      getBrandId() {
          return this.brandId;
      }

      getBrandName() {
          return this.brandName;
      }

      setBrandId(brandId) {
          this.brandId = brandId;
      }

      setBrandName(brandName) {
          this.brandName = brandName;
      }
  }
  
  let id = 0;
  let productList = [
    new Product(id++, "Inphone 12", "Apple"),
    new Product(id++, "Samsung Note 20", "Samsung"),
    new Product(id++, "Nokia 630", "Nokia"),
  ];
  
  showProduct = function () {
    $(".table tbody").empty();
    productList = productList.sort(function (a, b) {
      return b.id - a.id;
    });
    $.each(productList, (index, item) => {
      $(".table tbody").append(`
                  <tr>
                      <th scope="row" >${index + 1}</th>
                      <td class="prodId" hidden>${item.id + 1}</td>
                      <td class="prodName">${item.name}</td>
                      <td class="prodBrand">${item.brand}</td>
                      <td><a href="javascript:;" class="btn btn-outline-success edit" onclick="select(${index})">Edit</a></td>
                      <td><a href="javascript:;" class="btn btn-outline-danger" onclick="remove(${index})">Delete</a></td>
                  </tr>
              `);
    });
  };
  
  clear = function () {
    $('input[name="name"]').val("");
    $('#inlineFormCustomSelect option[value="Apple"]').prop("selected", true);
  };
  
  add = function () {
    let name = $('input[name="name"]').val();
    let brand = $("#inlineFormProductSelect").find(":selected").val();
  
    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid product name !",
        
      });
      clear();
    } else {
      Swal.fire({
        
        icon: "success",
        title: "New product has been added !",
        showConfirmButton: false,
        timer: 1500,
      });
      product = new Product(id++, name, brand);
      productList.push(product);
      clear();
      showProduct();
    }
  };

  update = function () {
    let id = $('input[name="productID"]').val();
    let newName = $('input[name="name"]').val();
    let newBrand = $("#inlineFormProductSelect").find(":selected").val();
  
    if (newName == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid product name !",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      clear();
    } else {
      productList[id].setId(id);
      productList[id].setName(newName);
      productList[id].setBrand(newBrand);
      clear();
      showProduct();
    }
  };

  select = function (id) {
    $.each(productList, (index, item) => {
      if (id == index) {
        $('input[name="productID"]').val(item.id);
        $('input[name="name"]').val(item.name);
        $("#inlineFormProductSelect").val(item.brand).change();
      }
    });
  };
  
  edit = function (id) {
    $.each(productList, (index, item) => {
      if (id == index) {
        $('input[name="productID"]').val(item.id);
        $('input[name="name"]').val(item.name);
        $("#inlineFormCustomSelect").val(item.brand).change();
      }
    });
  };
  
  remove = function (id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        productList.splice(id, 1);
        showProduct();
      }
      $(".cancel").prop("disabled", true);
    });
  };
  
  
  $(document).ready(function () {
    showProduct();
    $(".edit").click(function () {
      $(".submit").addClass("d-none");
      $(".update").removeClass("d-none");
      $(".cancel").removeAttr("disabled");
    });
    $(".cancel").click(function () {
      $(".submit").removeClass("d-none");
      $(".update").addClass("d-none");
      $(".cancel").prop("disabled", true);
      clear();
    });
  });