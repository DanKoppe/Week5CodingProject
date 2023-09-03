// Fantasy Football League

class Player {  // class #1 with 3 parameters
    constructor(name, position, byeWeek) { // constructor method with 3 variables.
        this.name = name;         // refering to the instance of the player class variables
        this.position = position; // this way when we create a new object with the player class it knows to refer to the newly entered variables in that instance.
        this.byeWeek = byeWeek;
    }
    describe() { // describe method with template literals to display information to the user
        return `${this.name} plays ${this.position} and has a bye week of ${byeWeek}.`;
    }
}

class team {  // class #2 with 2 parameters
    constructor(name, color){
        this.name = name;  // pointing to instanced variables in a new object created from this class
        this.color = color;
        this.players = [];  // Our empty array to push newly created players into
    }
    addPlayer(player) { // add player method
        if (player instanceof Player) {  // checking to see if varible is an instance of the player class to prevent data like a number being entered.
            this.players.push(player); // pushing a player value to the array
        } else {
            throw new Error (`You can only add an instance of a Player, argument is not a player: ${player}`); // error exception to display if the entered data is not an instance of the player class.
        }
    }
    describe() {
        return `${this.name} has ${this.players.length} players on the team.`; // Print out info for the user.
    }
}


class Menu {  //class #3
    constructor() {
        this.teams = []; // empty array to push teams into
        this.selectedTeam = null; // no teams selected at menu start
    }
    start() {  //starts menu application
        let selection = this.showMainMenuOptions();  // default menu displayed initially and when the user has not selected a method from our switch or 0 to exit.
        while (selection != 0) { //while loop to run our menu as long as user has not selected 0 to exit.
            switch(selection) { //switch for our selection variable
                case '1':
                    this.createTeam();  // calls create team method if 1 is selected
                    break; // break to exit the loop if option 1 is selected
                case '2':
                    this.viewTeam(); // calls view team method if 2 i selected
                    break;
                case '3':
                    this.deleteTeam(); // calls delete team method if 3 is selected
                    break;
                case '4':
                    this.displayTeams(); // calls display teams method if 4 is selected
                    break;
                default:  // if anything other that above options are selected, default to 0.
                    selection = 0; // 0 to exit the application             
            }
            selection = this.showMainMenuOptions(); // displays the main menu again after we exit our loop
        }
        alert('Bye Now'); // message to display to user when they select 0 to exit the application
    }

    showMainMenuOptions() {  // Main menu method
        return prompt (`
            0) exit
            1) create new team
            2) view team
            3) delete team
            4) display teams
        `); // using template literal to avoid concatenation, displays menu prompt to the user.
    }

    showTeamMenuOptions(teamInfo) { //show team method
        return prompt(`
            0) back
            1) create player
            2) delete player

            ${teamInfo}
        `); // gives options within the show team menu to create or delete players as well as displays the team information for the user
    }

    displayTeams() { // display teams method
        let teamString = ''; // emtpy string to push vteam names into
            for (let i = 0; i < this.teams.length; i++) { // for loop to iterate through teams 
                teamString += i+ ') ' + this.teams[i].name + '\n'; // using index to number each team and then add the team name to our empty string 
            }
        alert(teamString); // display all teams   
    }

    createTeam() {  // create team method
        let name = prompt('Enter your team name:'); // prompt user for team name
        let color = prompt('Enter your team color:'); // prompt user for team color
        this.teams.push(new team(name, color));  // push new team into our empty array by creating new team object with team class
    }

    viewTeam() {  // view team method
        let index = prompt('Enter the index of the team you wish to view:');  // prompt user for index of the team they want to view
        if (index > -1 && index < this.teams.length) {  // validates user input to avoid error incase they enter negative value or value greater than amount of teams
            this.selectedTeam = this.teams[index];  // identifies which team from our this.teams array that the user is currently viewing.
            let description = `
            Team Name: ${this.selectedTeam.name} 
            Team Color: ${this.selectedTeam.color}
            `; // displays team name and color.  I had to use template literals to get the formatting to display correctly and not off center.

            for (let i = 0; i < this.selectedTeam.players.length; i++) { // for loop to add description of players to the team infomation
                description += `
            ${i}) ${this.selectedTeam.players[i].name} - ${this.selectedTeam.players[i].position} - Bye Week ${this.selectedTeam.players[i].byeWeek}`;
            } // adds specific player for current iteration to the team description. again had to use template literals to get the format correct.
            let selection1 = this.showTeamMenuOptions(description); // displays the team menu options and take their input for currently selected team
            switch (selection1) {  // switch for our menu options
                case '1':
                this.createPlayer(); // calls create player method if option 1 is selected
                break;
                case '2':
                this.deletePlayer(); // calls delete player method if options 2 is selected  
            }
        }
    }

    createPlayer() {  // create player method
        let name = prompt('Enter Player name:');  // prompt user for player name
        let position = prompt('Enter Player position:'); // prompt user for player position
        let byeWeek = prompt('Enter bye week');  // prompt user for player bye week
        this.selectedTeam.players.push(new Player(name, position, byeWeek));  // pushes new player object with 3 parameters into currently selected team
    }

    deletePlayer() {  // delete player method
        let index = prompt('Enter the index of the player to delete:');  // prompts user for index of player they wish to delete
        if (index > -1 && index < this.selectedTeam.players.length) {  // validates user input
            this.selectedTeam.players.splice(index, 1);  // uses the .splice method to mutate the array remove "1" player(value) at the entered index
        }
    }

    deleteTeam() {  // delete team method
        let index = prompt('Enter the index of team to delete:');  // prompts user for index of the team they wish to delete
        if (index > -1 && index < this.teams.length){  // validates user input
            this.teams.splice(index, 1);  // uses .splice to remove 1 value at entered index
        }
    }
}

let menu = new Menu(); // create new instance of our menu
menu.start(); // method that shows our menu




