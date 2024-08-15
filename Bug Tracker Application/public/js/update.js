var name;
var to_be_updated;

$(document).ready(function () {
  $('#myTable').DataTable();
});
// edit data



$(document).ready(function(){
    $('.update').click(function () {
        id = this.id;
      console.log(this.id)
      console.log('im here');
      $.ajax({
        type: 'GET',
        url: `/getDetails/${id}`,
        success: function (response) {
          $("#update_id").attr("value", response.response.id);
          $("#update_product").attr("value", response.response.product);
          $("#update_data").attr("value", response.response.data);
          $("#update_price").attr("value", response.response.price);
          $('#Modal').modal({ show: true });
        },
        error: function () {
          alert('No data');
        }
      });
    });

});


// update data
$(document).ready(function(){
    
})

$(function () {
    $('#update_table').on('click', function (e) {
      console.log('i am indsd');
      var data1 = parseInt($('#update_id').attr('value')); 
    //   var data2 = $('#update_product').attr('value');
    //   var data3 =  parseInt($('#update_data').attr('value'));
    //   var data4 = parseInt($('#update_price').attr('value'));
    //   const data={"id":data1,"product":data2,"data":data3,"price":data4 }
    var data = $('#update_user').serialize();
    // debugger;
    console.log(JSON.stringify(data));
    e.preventDefault();
      console.log(data);
      
      // debugger;
      e.preventDefault();
      $.ajax({
        url: `/update_user/${data1}`,
        type: 'PUT',
        data: data,
        success: function (data) {
          console.log('updated successfully');
          window.location.reload()
        },
        error: function () {
          alert('No data');
        }
      });
    });
  });