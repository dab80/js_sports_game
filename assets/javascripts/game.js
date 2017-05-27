// Clicking a "SHOOT" button attempt to score against the opposing team.
// shots have a random chance of succeeding or failing
// number of shots taken should increase every click on the "SHOOT" button
// number of hits obviously only increases when the shot is successful
// Clicking the "RESET" button resets all the shot and score counters and adds 1 to the number of resets

// --------- Bonus ----------
// play a sound when someone clicks the "Shoot" button.
// --- You'll need to read about the <audio> element and how to use it in JS.
// --- You will also need to download a sound bite
// Make the page just look better

(function() {
  //graphical items
  let reset_button = document.querySelector("#reset");
  let teamone_shoot_button = document.querySelector("#teamone_shoot");
  let teamtwo_shoot_button = document.querySelector("#teamtwo_shoot");

  //storage items
  let num_resets = document.querySelector("#num_resets");
  let teamone_numshots = document.querySelector("#teamone_numshots");
  let teamone_numhits = document.querySelector("#teamone_numhits");
  let teamtwo_numshots = document.querySelector("#teamtwo_numshots");
  let teamtwo_numhits = document.querySelector("#teamtwo_numhits");


  reset_button.addEventListener("click", function(evt) {
    // console.log("clicked reset button");

    //reset team 1 & 2 shots taken
    teamone_numshots.innerHTML = 0;
    teamtwo_numshots.innerHTML = 0;

    //reset team 1 & team 2 goals
    teamone_numhits.innerHTML = 0;
    teamtwo_numhits.innerHTML = 0;

    //increament number of resets
    num_resets.innerHTML = parseInt(num_resets.innerHTML) + 1;

  })

  teamone_shoot_button.addEventListener("click", function(evt) {
    // console.log("clicked teamone_shoot button");

    let random_num = Math.floor(Math.random() * 10) % 2;

    if (random_num === 0) {
      //this will only happen when random number is even
      teamone_numhits.innerHTML = parseInt(teamone_numhits.innerHTML) + 1;
      // console.log("team 1 scored");
      startCount(1);
    }

    //increament number of teamone_shoots
    teamone_numshots.innerHTML = parseInt(teamone_numshots.innerHTML) + 1;

  })

  teamtwo_shoot_button.addEventListener("click", function(evt) {
    // console.log("clicked teamtwo_shoot button");

    let random_num = Math.floor(Math.random() * 10) % 2;

    if (random_num === 0) {
      //this will only happen when random number is even
      teamtwo_numhits.innerHTML = parseInt(teamtwo_numhits.innerHTML) + 1;
      startCount(2);
    }

    //increament number of teamtwo_shoots
    teamtwo_numshots.innerHTML = parseInt(teamtwo_numshots.innerHTML) + 1;

  })

  let counter = 0;
  var t;
  var timer_is_on = 0;
  var audio_cheer = document.getElementById("myAudio");

  function startCount(team) {
    document.getElementById("main_heading").style.color = "yellow";
    sub_heading.innerHTML = "";

    //play cheering crowd
    audio_cheer.load();
    audio_cheer.play();
    //change the background
    if (team === 1) {
      document.body.style.backgroundImage = "url('assets/images/hawks_celebrate.jpg')";
    } else {
      document.body.style.backgroundImage = "url('assets/images/team_2.jpg')";
    }
    if (!timer_is_on) {
      timer_is_on = 1;
      celebrate(team);
    }
  }

  function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
    counter = 0;
    audio_cheer.pause();

    //reset the display
    document.getElementById("main_heading").style.color = "white";
    document.body.style.backgroundImage = "url('assets/images/hockey_game.jpg')";
    main_heading.innerHTML = "Hockey, JavaScript, and the DOM oh My!";
    sub_heading.innerHTML = "...the game";
    // console.log("Leaving celebrate");
  }

  function celebrate(team_num) {
    // console.log("within celebrate");

    let scored_str = 'TEAM  ' + team_num + '  SCORED!!!';
    //if counter is odd, change text
    if ((counter % 2) !== 0) {
      main_heading.innerHTML = "WOW!!!";
    } else {
      // main_heading.innerHTML = "'TEAM ' + team_num + ' SCORED!!!'";
      main_heading.innerHTML = scored_str;
    }

    counter = counter + 1;

    //wait 1 second
    t = setTimeout(function() {
      celebrate(team_num)
    }, 1000);

    //breakout
    if (counter === 4) {
      stopCount();
    }

  }

  // document.body.style.backgroundImage = linear-gradient(to bottom left, DeepSkyBlue, Cyan, DodgeBlue);
  // document.body.style.backgroundImage = "'linear-gradient(' + 'to bottom left' + ', ' + DeepSkyBlue + ', ' + Cyan + ')'";

})();
