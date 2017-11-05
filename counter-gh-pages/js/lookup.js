var fdb = new ForerunnerDB();
var db = fdb.db("accounting")
var accountingCollection = db.collection("accounting");

accountingCollection.load();

function Search() {
    if ($("input:checked").val() == "curMonth") {
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;

        if (month < 10) {
            month = "0" + month;
        }
        // 2017-10-01
        var dateString = year + "-" + month + "-01";
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: dateString
                }
            },
            {
                $orderBy: { "date": -1 }
            }
        );
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;

            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td></tr>");
        }
    } else {
        var dateString1 = $("#fromtime").val();
        var dateString2 = $("#totime").val();
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: dateString1,
                    $lte: dateString2
                }
            },
            {
                $orderBy: { "date": -1 }
            }
        );
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;

            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td></tr>");

        }
    }
}

