var fdb = new ForerunnerDB();
var db = fdb.db("accounting")
var accountingCollection = db.collection("accounting");

accountingCollection.load();

function submit() {
    if ($("#category").val() != "" && $("#cost").val() != "" && $("#item").val() != "" && $("#date").val() != "") {
        var newob = {
            category: $("#category").val(),
            cost: $("#cost").val(),
            item: $("#item").val(),
            date: $("#date").val()
        }
        accountingCollection.insert(newob)
        $("#category").val("")
        $("#cost").val("")
        $("#item").val("")
        $("#date").val("")
        accountingCollection.save()
    }
};
