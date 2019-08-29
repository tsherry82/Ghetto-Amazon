var mysql = require('mysql');

var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('\nWelcome to Bamazon!, Take a look at what we are offering today! \n')
    displayStock();


});
var productChosen = null;

function displayStock() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "\n", "Name: " + res[i].product_name + "\n", "Department: " + res[i].department_name + "\n", "Price: " + res[i].price + "\n", 'Stock: ' + res[i].stock_quantity + '\n');
        }
        userPrompt();
    })
};

function userPrompt() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'product',
            message: 'Please input the item ID number that you are interested in purchasing'
        }
    ]).then(function (userRes) {
        productChosen = userRes.product
        switch (userRes.product) {
            case '1':
                console.log('\nThank you for your selection\nYou have chosen the Khaleesi Wig!\n');
                userQuantity();
                break;


            case '2':
                console.log('\nThank you for your selection\nYou have chosen a Blanket!\n');
                userQuantity();
                break;


            case '3':
                console.log('\nThank you for your selection\nYou have selected the 82in Smart TV!\n');
                userQuantity();
                break;


            case '4':
                console.log('\nThank you for your selection\nYou have chosen the Rick and Morty Sweater!\n');
                userQuantity();
                break;


            case '5': console.log('\nThank you for your selection\nYou have chosen the Game of Thrones book!\n');
                userQuantity();
                break;


            case '6':
                console.log('\nThank you for your selection\nYou have chosen the Holes book!\n');
                userQuantity();
                break;


            case '7':
                console.log('\nThank you for your selection\nYou have chosen the Nike Running Shoes!\n');
                userQuantity();
                break;


            case '8':
                console.log('\nThank you for your selection\nYou have chosen the Portable Charger!\n');
                userQuantity();
                break;


            case '9':
                console.log('\nThank you for your selection\nYou have chosen the Air Fryer!\n');
                userQuantity();
                break;


            case '10':
                console.log('\nThank you for your selection\nYou have chosen Kylies Cosmetics!\n');
                userQuantity();
                break;


            default:
                console.log("\n Invalid input, please try again \n");
                userPrompt();
        }
    })
}

function userQuantity() {
    connection.query('SELECT * FROM products', function (err, res) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to purchase?'
            }
        ]).then(function (answer) {
            var chosenProduct = productChosen;
            var chosenQuantity = answer.quantity;
            connection.query('SELECT * FROM products WHERE item_id=?', [chosenProduct], function(err, res){
                if (err) throw err;
                if (chosenQuantity > res[0].stock_quantity){
                    console.log('\nOut of stock, sorry for the inconvenience\n')
                    userPrompt()
                } else {
                    var updatedStock = res[0].stock_quantity - chosenQuantity;
                    query = 'UPDATE products SET ? WHERE ?';
                    connection.query('SELECT * FROM products WHERE item_id=?',
                    [
                        {stock_quantity : updatedStock},
                        {item_id: chosenProduct}
                    ],
                    function(err, res) {
                        if (err) throw err;
                        connection.end();
                    });
                    var totalCost = chosenQuantity * res[0].price;
                    var totalCostOwed = totalCost.toFixed(2);

                    console.log('\nOrder successful!\nYour total cost is $' + totalCostOwed + '\nThanks for shopping with Bamazon!\n')

                }
            })
           
        })
    })
}





