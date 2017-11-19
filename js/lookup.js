var fdb = new ForerunnerDB();
var db = fdb.db("accounting")
var accountingCollection = db.collection("accounting");

accountingCollection.load();

function remove(id) {
    accountingCollection.remove({
        _id: id
    })
    accountingCollection.save()
    Search()

};

function Search() {
    $("#accountingTable").find("tr").remove()
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
        var eatcost = 0
        var playcost = 0
        var othercost = 0
        var totalcost = 0
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;
            var id = accountings[i]._id;

            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td><td>" + "<button class=\"btn btn-danger little\" onclick=\"remove('" + id + "')\">刪除</button>" +
                "</td></tr>");
            totalcost += accountings[i].cost / 1

            if (accountings[i].category == "吃的") {
                eatcost += accountings[i].cost / 1

            };
            if (accountings[i].category == "玩的") {
                playcost += accountings[i].cost / 1

            };
            if (accountings[i].category == "其他") {
                othercost += accountings[i].cost / 1

            };
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
        var eatcost = 0
        var playcost = 0
        var othercost = 0
        var totalcost = 0
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;
            totalcost += accountings[i].cost / 1
            console.log("total" + totalcost)
            if (accountings[i].category == "吃的") {
                eatcost += accountings[i].cost / 1
                console.log(eatcost)
            }
            if (accountings[i].category == "玩的") {
                playcost += accountings[i].cost / 1
                console.log(playcost)
            }
            if (accountings[i].category == "其他") {
                othercost += accountings[i].cost / 1
                console.log(othercost)
            }

            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td><td>" + "<button class=\"btn btn-danger little\" onclick=\"remove('" + id + "')\">刪除</button>" +
                "</td></tr>");

        }
    }
    $("#eatcost").text(eatcost)
    $("#playcost").text(playcost)
    $("#othercost").text(othercost)
    $("#totalcost").text(totalcost)
    $("#eatper").text(Math.round(eatcost / totalcost * 100) + "%")
    $("#playper").text(Math.round(playcost / totalcost * 100) + "%")
    $("#otherper").text(Math.round(othercost / totalcost * 100) + "%")
}

