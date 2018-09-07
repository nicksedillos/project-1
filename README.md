# “Home Manager”

A collaborative project made for the University of Minnesota Full Stack Web Development Coding Boot Camp, August 2018

by [Chris Berry](https://github.com/Casttle), [James Breckenitch](https://github.com/jrbreckenitch), [Colton Scherer](https://github.com/Cmoney45), [Nick Sedillos](https://nicksedillos.github.io/) & [Zach Zeurcher](https://github.com/zachscodecamp)

* GitHub repository: https://github.com/nicksedillos/project-1
* Deployment: https://nicksedillos.github.io/project-1/

## Description

Home Manager is a tool for keeping track of what items you have, and how many of each. It lets you tag items with their physical Location, Category or type of product, and if desired, a UPC for future shopping. With this tool, you don’t have to memorize an inventory or physically check it each time you go shopping. This could be useful for families, office teams, or anyone else who shares things scattered across multiple locations and needs a simple way to keep track of them.

Our application was partially inspired the real life scenario of a family compiling a shopping list. Many households go through a lot of food, cleaning supplies, and other household goods, and even if they can keep everything in the house physically organized, it’s sometimes a chore to run to the basement or the garage or the pantry and check whether you need paper towels, or printer paper, or whatever else you might be running out of. The goal for this app was to help a user or group of users gather information about their goods over a period of time and then track it through changes, so that they aren’t forced to memorize, guess, or constantly recheck.

## Project requirements

* Build something awesome
* Must use at least two APIs
* Must use Ajax to pull data
* Must utilize at least one new library or technology that we haven’t discussed
* Must have a polished frontend/UI
* Must meet good quality coding standards (indentation, scoping, naming)
* Must NOT use alerts, confirms, or prompts (look into modals!)
* Must have some sort of repeating element (table, columns, etc)
* Must use Bootstrap or alternative CSS framework
* Must be deployed (GitHub Pages or Firebase)
* Must have user input validation
* Presentation date: two week from today

## Our approach

We referred to the project requirements and thought about the concepts we’d studied so far in Boot Camp, and how they might be combined in ways that are useful. We especially thought about the possibilities of Firebase as a way of persistently tracking information. The API criteria inspired us to look for other apps and technologies that would give the user more information based on what they’d already entered into the database. The process of writing our MVP criteria was useful in whittling down our slightly vague idea into a core functionality that could be built on in the future.

Bootstrap was a key component in making a quick framework within the first day of the project. We didn’t use rows or columns, but what were useful were Bootstrap’s Navbar and dropdowns, which allowed us to provide a filter mechanic with which the user can easily find what they’re looking for. From there we were able use CSS to make adjustments when necessary and to provide a unique style for the app.

Working together as our Triforce, JavaScript, jQuery and Firebase were essential for the functionality of the app, from programing the click events to generating and displaying the table. With Firebase housing all of data for the app, we used jQuery to call upon our information when needed and push it into the table. When the page is first loaded, jQuery grabs and posts the entire item list from Firebase. At the same time, the Locations and Categories of each item are sorted into their own arrays and duplicates are removed. These are then appended, in alphabetical order, into their respective dropdowns in the navbar.

Google Charts is a data visualization API offering a variety of ways for users to see the relative quantities of all their different items. A remote JavaScript file called loader.js contains the API. A local, customizable JavaScript file identifies our Firebase database as the information to be used and loads Google’s Visualization API. Callback functions populate the charts with our data and prepare click events for the user to interact with them. The charts themselves are rendered in-browser with HTML5 and Scalable Vector Graphics (SVG).

## Ideas for future development

We had several ideas for features that we were not able to add into the app:

* Add a sign in for different users to have unique item lists
* The total price of each item calculates with the quantity
* Have a total price at the bottom that also updates with the filter criteria, e.g. total cost of what is in the pantry or total for all of your movies
* Clicking the item name provides a list of shopping links, possibly with price comparisons.
* Items are time stamped when first added as well as when the quantity is changed, so the user can track how often it is being used.
* Be like Facebook and have mind-reading ads you didn't ask for.