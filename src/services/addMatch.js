import {db} from '../firebase';

let getTeamIds = function (team) {
  return team.reduce((total, current) => {
    total[current[".key"]] = true;
    return total;
  }, {});
};

function getRankingTeams(match) {
  let rankingTeams = {winning: [], losing: []};
  if (match.team1Score > match.team2Score) {
    rankingTeams["winning"] = match.team1;
    rankingTeams["losing"] = match.team2;
  }
  else if (match.team1Score < match.team2Score) {
    rankingTeams["winning"] = match.team2;
    rankingTeams["losing"] = match.team1;
  }
  return rankingTeams;
}

let updateRank = function (playerKey, rank) {
  let updateRank = {};
  updateRank['rank/' + playerKey] = rank;
  db.ref().update(updateRank);
};
let updateRanking = function (newMatch) {
  const {winning, losing} = getRankingTeams(newMatch)
  db.ref('rank').once('value').then((snapshot) => {
    let ranks = snapshot.val();
    for (let playerKey of Object.keys(winning)) {
      let rank = {...ranks[playerKey]};
      rank.wins++;
      rank.matches++;
      rank.points++;
      updateRank(playerKey, rank);
    }
    for (let playerKey of Object.keys(losing)) {
      let rank = {...ranks[playerKey]};
      rank.lose++;
      rank.matches++;
      updateRank(playerKey, rank);
    }
  });
}
  let updateRevertRanking = function (newMatch) {
    const {winning, losing} = getRankingTeams(newMatch)
    db.ref('rank').once('value').then((snapshot) => {
      let ranks = snapshot.val();
      for (let playerKey of Object.keys(winning)) {
        let rank = {...ranks[playerKey]};
        rank.wins--;
        rank.matches--;
        rank.points--;
        updateRank(playerKey, rank);
      }
      for (let playerKey of Object.keys(losing)) {
        let rank = {...ranks[playerKey]};
        rank.lose--;
        rank.matches--;
        updateRank(playerKey, rank);
      }
    })
  }

  export default {
    save(match) {
      const team1 = getTeamIds(match.selectedTeam1);
      const team2 = getTeamIds(match.selectedTeam2);

      let newMatch = {
        team1,
        team2,
        date: match.date,
        team1Score: match.team1Score,
        team2Score: match.team2Score
      };
      db.ref('matches').push(newMatch);
      updateRanking(newMatch);
    },
    remove(match) {
      db.ref('matches').child(match[".key"]).remove();
      updateRevertRanking(match);
    }
  }
