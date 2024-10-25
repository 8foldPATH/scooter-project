class Scooter {
  static nextSerial = 1;

  constructor(station) {
      this.station = station;
      this.user = null;
      this.serial = Scooter.nextSerial++;
      this.charge = 100; // Starts fully charged
      this.isBroken = false; // Starts unbroken
  }

  rent(user) {
      if (this.charge <= 20) {
          throw new Error("Scooter needs to charge.");
      }
      if (this.isBroken) {
          throw new Error("Scooter needs repair.");
      }
      this.user = user;
      this.station = null; // Scooter is checked out
      console.log(`Scooter ${this.serial} rented to ${user.username}.`);
  }

  dock(station) {
      this.station = station;
      this.user = null; // Clear user
      console.log(`Scooter ${this.serial} docked at ${station}.`);
  }

  recharge() {
      const interval = setInterval(() => {
          if (this.charge < 100) {
              this.charge += 10;
              console.log(`Scooter ${this.serial} charge: ${this.charge}%`);
          } else {
              clearInterval(interval);
          }
      }, 1000);
  }

  requestRepair() {
      setTimeout(() => {
          this.isBroken = false;
          console.log(`Repair completed for scooter ${this.serial}.`);
      }, 5000);
  }
}

module.exports = Scooter;
