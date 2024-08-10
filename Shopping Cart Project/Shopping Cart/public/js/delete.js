$(document).ready(function(){
    $('.delete').click(function() {
var response = confirm("do you want to delete")
alert(this.id)
del = this.id;
console.log(response)
if(response === true){
    $.ajax({
        type: 'DELETE',
        url: `/delete_user/${del}`,
        method: 'delete',
        success: function(data){
            console.log('data is '+JSON.stringify(data));
            window.location.reload()
        },
        error: function(){
            alert('No data');
        }
    });
}
else{
    console.log("not deleted")
}
});	

});