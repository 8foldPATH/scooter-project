class ScooterApp {
  constructor() {
      this.stations = {
          "Station A": [],
          "Station B": [],
          "Station C": []
      };
      this.registeredUsers = {}; 
  }

  registerUser(username, password, age) {
      if (this.registeredUsers[username]) {
          throw new Error("User already registered.");
      }
      if (age < 18) {
          throw new Error("Too young to register."); 
      }
      const user = new User(username, password, age); // Create a new User instance
      this.registeredUsers[username] = user; // Add user to registered users
      console.log(`${username} has been registered.`);
      return user;
  }

  loginUser(username, password) {
      const user = this.registeredUsers[username]; // Find the user by username
      if (!user || user.password !== password) {  // Check if user exists and password matches
          throw new Error("Username or password is incorrect."); 
      }
      user.login(password);
  }

  logoutUser(username) {
      const user = this.registeredUsers[username]; // Find the user by username
      if (!user) {
          throw new Error("No such user is logged in.");
      }
      user.logout();
  }

  createScooter(station) {
      if (!this.stations[station]) { // Check if the station exists
          throw new Error("No such station.");
      }
      const scooter = new Scooter(station); // Create a new Scooter instance
      this.stations[station].push(scooter); // Add scooter to the station's list
      console.log(`Created new scooter ${scooter.serial} at ${station}.`);
      return scooter; 
  }

  dockScooter(scooter, station) {
      if (!this.stations[station]) { // Check if the station exists
          throw new Error("No such station."); 
      }
      if (scooter.station === station) { // Check if the scooter is already at the station
          throw new Error("Scooter already at station."); 
      }
      scooter.dock(station); 
      this.stations[station].push(scooter); // Add to station's list
  }

  rentScooter(scooter, user) {
      const stationScooters = this.stations[scooter.station]; // Get scooters at the station
      const index = stationScooters.indexOf(scooter); // Find the scooter's index
      if (index === -1) { // Check if the scooter is found at the station
          throw new Error("Scooter not found at station."); 
      }
      stationScooters.splice(index, 1); // Remove the scooter from the station
      scooter.rent(user);
  }

  print() {
      console.log("Registered Users:", Object.keys(this.registeredUsers)); // Log registered users
      console.log("Stations and Scooter Count:");
      for (const station in this.stations) {
          console.log(`${station}: ${this.stations[station].length} scooters`); // Log each station and its scooter count
      }
  }
}