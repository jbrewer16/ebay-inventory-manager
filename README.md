## Ebay Inventory Manager

This project is for keeping track of the items I am selling on eBay and the listings associated with them. Ebay only keeps sales data up to 90 days. By creating this project I can track the data myself longer than the 90 days and do custom reports on that data. This project is still in development. 

## To run project
Project is hosted at https://ebay-inventory-manager.vercel.app/ \
Before data will load, the node.js server must be started locally \
This can be done by navigating to the backend folder in the project directory, and running `nodemon server` \
Note: Must be using at least Node version 14

## Showcasing different features of the project
Since the server has to be running locally, even though the project is hosted on Vercel, there isn't currently a way for others to really test the project themselves \
Because of that, I'll put some gifs showing different features here

### Creating an Item

![Creating_An_Item](https://user-images.githubusercontent.com/56033125/207464832-912adc08-454d-4086-b2af-fe02152c2c97.gif)

### Creating a Listing

![Creating_A_Listing](https://user-images.githubusercontent.com/56033125/207465691-f1348607-a035-462f-9acf-e948c6546173.gif)

### Creating an Order

![Creating_An_Order](https://user-images.githubusercontent.com/56033125/207465726-754ab983-fc62-4726-8a42-352c883d98f0.gif)

### Updating Order status

![Updating_Order_Status](https://user-images.githubusercontent.com/56033125/207465757-5ead5c71-97b2-4e5a-9c9b-d58590ebccf0.gif)

## Plans moving forward
 * The biggest thing I want to change is not having to run the node.js server to access the database.
 * Refactor the code for readability and fix existings bugs
 * Add more reporting capabilities, will probably need to refactor the database to fix how the data is stored and revisit what data is tracked
 * Add the ability to sort listings and orders by the headers
 * Add a date range filter on sales report
 * Clean up the UI
   * The listings table should scroll instead of the entire page
   * Fix the Item cards to look more modern and cut off excessively long names so it doesn't mess with the height
   * Update the item information page


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
