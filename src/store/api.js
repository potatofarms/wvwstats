import Vue from 'vue'
import * as Const from './const'

export function fetchMatches () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.matchesUrl).then((response) => {
      const matches = response.data
      resolve(matches)
    }, () => {
      reject()
    })
  })
}

export function fetchWorlds () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.worldsUrl).then((response) => {
      const worlds = response.data
      resolve(worlds)
    }, () => {
      reject()
    })
  })
}

export function fetchGlicko () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.glickoUrl).then((response) => {
      const glicko = {}
      for (var i = 0; i < response.data.length; i++) {
        let curGlicko = response.data[i]
        glicko[response.data[i].id] = response.data[i].glicko
      }
      resolve(glicko)
    }, () => {
      reject()
    })
  })
}

export function fetchPredictedGlicko () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.predictedGlickoUrl).then((response) => {
      const pglicko = response.data
      resolve(pglicko)
    }, () => {
      reject()
    })
  })
}

export function fetchObjectives () {
  var requestIds = ''
  for (var id in Const.objectiveIds) {
    requestIds += Const.objectiveIds[id] + ','
  }

  return new Promise((resolve, reject) => {
    Vue.http.get(Const.objectivesUrl + requestIds).then((response) => {
      const objectives = response.data
      resolve(objectives)
    }, () => {
      reject()
    })
  })
}

export function fetchGuild (id) {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.guildUrl + id).then((response) => {
      const guild = response.data
      resolve(guild)
    }, () => {
      reject()
    })
  })
}

export function fetchLeaderboard () {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.weekleaderboardUrl).then((response) => {
      const leaderboard = response.data
      resolve(leaderboard)
    }, () => {
      reject()
    })
  })
}

export function fetchArchiveData (matchid, data, start_time, end_time) {
  var diff = 15 // difference in start_time. static variable to account for match start variability
  var tmp = new Date(start_time)
  var tmp2 = new Date(end_time)
  // Fixed the timezone issue with the database ITSELF. The DB was discarding timezone info
  // and the API was putting timezone info back into it resulting in everything being off
  // by either 4 or 5 hours (depending on Daylight Savings status)
  var timeOffset = 0 // SHOULD NOT NEED THIS ANYMORE. Keeping it in case.
  start_time = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(),
    tmp.getHours() - timeOffset, tmp.getMinutes() + diff, tmp.getSeconds()).toISOString()
    .replace('.000Z','Z')
  end_time = new Date(tmp2.getFullYear(), tmp2.getMonth(), tmp2.getDate(),
    tmp2.getHours() - timeOffset, tmp2.getMinutes(), tmp2.getSeconds()).toISOString()
    .replace('.000Z','Z')

  var url = `${Const.matcharchiveUrl}?data=${data}&match=${matchid}&start_time=${start_time}&end_time=${end_time}`
  return Vue.http.get(url)
}

export function fetchTimezone (timezone, start_time) {
  return new Promise((resolve, reject) => {
    var url = Const.timezonesUrl + '?start_time=' + start_time + '&timezone=' + timezone
    Vue.http.get(url).then( (response) => {
      const timezone = response.data
      resolve(timezone)
    }, () => {
      reject()
    })
  })
}

// will need to be updated to handle pagination and caching.
export function fetchMatchHistoryIds (server = 'All') {
  const url = server === 'All'
    ? Const.matchHistoryUrl
    : Const.matchHistoryUrl + '?server=' + server

  return new Promise((resolve, reject) => {
    Vue.http.get(url).then( (response) => {
      const matchHistory = response.data
      resolve(matchHistory)
    }, () => {
      reject()
    })
  })
}

export function fetchMatch (id) {
  return new Promise((resolve, reject) => {
    Vue.http.get(Const.matchUrl + id).then( (response) => {
      const match = response.data
      resolve(match)
    }, () => {
      reject()
    })
  })
}

export function fetchMultipleMatches (ids) {
  return Promise.all(ids.map(id => fetchMatch(id)))
}

export function fetchDataRange (start, end, match) {
  const query = `?start_time=${start}&end_time=${end}&match=${match}`

  return new Promise((resolve, reject) => {
    Vue.http.get(Const.dataRangeUrl + query).then( (response) => {
      const result = response.data
      resolve(result)
    }, () => {
      reject()
    })
  })
}
