$(document).ready(()=>{

    $('.submitBTN').on("click", ()=>{

        const name = $(".name").val();
        const score  = parseInt($(".scores").text());

        $.ajax({
            type: "POST",
            url: "record.php",
            data: {
                username: name,
                playerscores: score
            },
            success: function(response){
                alert("Saved Successfully");
            }, error: function(){
                alert("Unable to save");
            }
        });
    });

})