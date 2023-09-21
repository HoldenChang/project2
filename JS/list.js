$(document).ready(()=>{

    const list = () => {
        $.ajax({
            type: "GET",
            url: "list.php",
            success: function(data) {
                const list = JSON.parse(data);
                list.sort((a, b) => b.playerScore - a.playerScore);
                const top10 = list.slice(0,10);

                $(".record").empty();

                top10.forEach((item, index) => {
                    $(".record").append(`<li>${item.playerName}: ${item.playerScore}</li>`);
                });
            }, error: function() {
                alert("Error");
            }
        });
    }

    list();
    $('.submitBTN').on("click", ()=>{
        list();
    });
    $('.restartBTN').on("click", ()=>{
        list();
    });

})