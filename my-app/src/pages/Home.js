import React, { Component } from "react";
import "./Home.css";
import axios from "axios";

class Home extends Component {
  render() {
    return (
      <body id="homeBody">
        <div>
          <div className='daily'>
            <h2>Daily Schedule</h2>
            <h4 id="getDate"></h4>
          </div>
          <div class="schedule1">
            <p>Games Today</p>
          </div>
          {/* < NBAIcons.ATL /> */}

        </div>
      </body>
    );
  }

  componentDidMount() {
    this.testDate();
    this.getSchedule();
    }

  testDate = () => {
    var today = new Date();
    document.getElementById('getDate').innerHTML = today.toDateString();
  }

  getSchedule = () => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + mm + dd;

      axios.get(`http://data.nba.net/10s/prod/v1/${today}/scoreboard.json`)
      .then(async res => {
          console.log(res)

          this.createTable();

          //get num of games of current week
          let numGames = res.data.numGames;

          let logoArray = [
            ['ATL', 'https://logoeps.com/wp-content/uploads/2012/11/atlanta-hawks-logo-vector.png'],
            ['BKN', 'https://logoeps.com/wp-content/uploads/2012/10/brooklyn-nets-logo-vector.png'],
            ['BOS', 'https://logoeps.com/wp-content/uploads/2012/10/boston-celtics-logo-vector.png'],
            ['CHA', 'https://logoeps.com/wp-content/uploads/2012/11/new-orleans-hornets-logo-vector.png'],
            ['CHI', 'https://logoeps.com/wp-content/uploads/2012/10/chicago-bulls-logo-vector.png'],
            ['CLE', 'https://logoeps.com/wp-content/uploads/2012/10/cleveland-cavaliers-logo-vector.png'],
            ['DAL', 'https://logoeps.com/wp-content/uploads/2012/12/dallas-mavericks-logo-vector.png'],
            ['DEN', 'https://logoeps.com/wp-content/uploads/2012/10/denver-nuggets-logo-vector.png'],
            ['DET', 'https://logoeps.com/wp-content/uploads/2012/10/detroit-pistons-logo-vector.png'],
            ['GSW', 'https://logoeps.com/wp-content/uploads/2012/12/golden-state-warriors-logo-vector.png'],
            ['HOU', 'https://logoeps.com/wp-content/uploads/2012/10/houston-rockets-logo-vector.png'],
            ['IND', 'https://logoeps.com/wp-content/uploads/2012/11/indiana-pacers-logo-vector.png'],
            ['LAC', 'https://logoeps.com/wp-content/uploads/2012/12/los-angeles-clippers-logo-vector.png'],
            ['LAL', 'https://logoeps.com/wp-content/uploads/2012/10/los-angeles-lakers-logo-vector.png'],
            ['MEM', 'https://logoeps.com/wp-content/uploads/2012/12/memphis-grizzlies-logo-vector.png'],
            ['MIA', 'https://logoeps.com/wp-content/uploads/2012/10/miami-heat-logo-vector.png'],
            ['MIL', 'https://logoeps.com/wp-content/uploads/2012/12/milwaukee-bucks-logo-vector.png'],
            ['MIN', 'https://logoeps.com/wp-content/uploads/2012/11/minnesota-timberwolves-logo-vector.png'],
            ['NOP', 'https://basketballsocietyonline.com/wp-content/uploads/2015/05/nop-logo.png'],
            ['NYK', 'https://logoeps.com/wp-content/uploads/2012/12/new-york-knicks-logo-vector.png'],
            ['OKC', 'https://logoeps.com/wp-content/uploads/2012/10/oklahoma-city-thunder-logo-vector.png'],
            ['ORL', 'https://logoeps.com/wp-content/uploads/2012/12/orlando-magic-logo-vector.png'],
            ['PHI', 'https://logoeps.com/wp-content/uploads/2012/11/philadelphia-76ers-logo-vector.png'],
            ['PHX', 'https://logoeps.com/wp-content/uploads/2012/12/phoenix-suns-logo-vector.png'],
            ['POR', 'https://www.nba.com/blazers/sites/blazers/files/tb_global_rgb_bbgd.png'],
            ['SAC', 'https://logoeps.com/wp-content/uploads/2012/12/sacramento-kings-logo-vector.png'],
            ['SAS', 'https://logoeps.com/wp-content/uploads/2012/10/san-antonio-spurs-logo-vector.png'],
            ['TOR', 'https://logoeps.com/wp-content/uploads/2012/12/toronto-raptors-logo-vector.png'],
            ['UTA', 'https://logoeps.com/wp-content/uploads/2012/10/utah-jazz-logo-vector.png'],
            ['WAS', 'https://logoeps.com/wp-content/uploads/2012/10/washington-wizards-logo-vector.png'],
          ]
          //console.log(logoArray)

          for(let i = 0; i < numGames; i++) {
            this.appendGames(res.data, i, logoArray)
          }

      }).catch(err => {
          console.error(err)
      })

  }

  createTable = () => {
    const scheduleDiv = document.querySelector("div.schedule1")
    let tableheaders = ["Home", "Start Time", "Away", " "];
    
    while( scheduleDiv.firstChild ) scheduleDiv.removeChild(scheduleDiv.firstChild) //remove

    let scheduleTable = document.createElement('table')
    scheduleTable.className = 'scheduleTable'

    let scheduleTableHead = document.createElement('thead')
    scheduleTableHead.className = 'scheduleTableHead'

    let scheduleTableHeadRow = document.createElement('tr')
    scheduleTableHeadRow.className = 'scheduleTableHeadRow'

    //will iterate through table header
    tableheaders.forEach(header => {
      let schedHeader = document.createElement('th')
      schedHeader.innerText = header;

      if(header != 'Start Time')
        schedHeader.colSpan = 2

      scheduleTableHeadRow.append(schedHeader)
    })

    scheduleTableHead.append(scheduleTableHeadRow)
    scheduleTable.append(scheduleTableHead)

    let scheduleTableBody = document.createElement('tbody');
    scheduleTableBody.className = "scheduleTable-body"
    scheduleTable.append(scheduleTableBody)

    scheduleDiv.append(scheduleTable)

  }

  appendGames = (data, schedIndex, logoArray) => {

    const scheduleTable = document.querySelector(`.scheduleTable`)

    let scheduleTableBodyRow = document.createElement('tr');
    scheduleTableBodyRow.className = 'scheduleTableBodyRow'

    //These lines create the column cells

    //Home Team
    let HomeTeam = document.createElement('td')
    HomeTeam.innerText = data.games[schedIndex].hTeam.triCode;

    //hometeam image
    let imaget1 = document.createElement('td');
    let image = document.createElement('img');
    image.alt = 'logo';
    for(let i = 0; i < logoArray.length; i++) {
      if(data.games[schedIndex].hTeam.triCode === logoArray[i][0]) {
        image.setAttribute('src', logoArray[i][1]);
      }
    }
    image.textContent = image.image;
    image.style.width = '50px';
    image.style.height = '50px';
    imaget1.append(image);

    //starttime
    let start = document.createElement('td')
    start.innerText = data.games[schedIndex].homeStartTime;

    //Awayteam image
    let imaget2 = document.createElement('td');
    let image2 = document.createElement('img');
    image2.alt = 'logo'
    for(let i = 0; i < logoArray.length - 1; i++) {
      if(data.games[schedIndex].vTeam.triCode === logoArray[i][0]) {
        image2.setAttribute('src', logoArray[i][1]);
      }
    }
    image2.textContent = image.image;
    image2.style.width = '50px';
    image2.style.height = '50px';
    imaget2.append(image2);

    //Away Team
    let AwayTeam = document.createElement('td');
    AwayTeam.innerText = data.games[schedIndex].vTeam.triCode

    //tickets
    let tickets = document.createElement('td');
    let link = document.createElement('a');

    link.className = 'ticketLink';
    link.setAttribute('href', data.games[schedIndex].tickets.leagTix);
    link.setAttribute('target', "_blank");
    link.innerText = 'Get Tickets'

    tickets.append(link)

    //tickets.innerText = 'Get Tickets'

    scheduleTableBodyRow.append(HomeTeam, imaget1, start, imaget2, AwayTeam, tickets) //append the data

    scheduleTable.append(scheduleTableBodyRow)
  }
  
  createList = (data, numGames) => {
    const scheduleUl = document.getElementById("schedule2")

    //create ul elements and set attributes
    let ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');

    for(let i = 0; i < numGames; i++) {
      let li = document.createElement('li');
      li.innerText = data.games[i].hTeam.triCode + ' '+ data.games[i].homeStartTime+ ' ' +data.games[i].vTeam.triCode
      ul.appendChild(li)
    }

    scheduleUl.appendChild(ul);

  }
};

export default Home;
