<template>
  <div
    class="mdl-shadow--2dp mdl-color--blue-grey-100 mdl-cell mdl-cell--6-col
    mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-grid">

    <div class="mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--4-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          Server
        </li>
        <li class="servername">
          <span>{{ getWorldById(match.worlds.green).name }}</span>
        </li>
        <li class="servername">
          <span>{{ getWorldById(match.worlds.blue).name }}</span>
        </li>
        <li class="servername">
          <span>{{ getWorldById(match.worlds.red).name }}</span>
        </li>
      </ul>
    </div>

    <div class="mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header servername">
          <span>PPT Points</span>
        </li>
        <li>
          {{ Math.floor(match.scores.green - 2.3 * match.kills.green) }}
        </li>
        <li>
          {{ Math.floor(match.scores.blue - 2.3 * match.kills.blue) }}
        </li>
        <li>
          {{ Math.floor(match.scores.red - 2.3 * match.kills.red) }}
        </li>
      </ul>
    </div>

    <div class="mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          % PPT
        </li>
        <li>
          {{ round(((match.scores.green - 2.3 * match.kills.green) / match.scores.green) * 100, 3, false) }}%
        </li>
        <li>
          {{ round(((match.scores.blue - 2.3 * match.kills.blue) / match.scores.blue) * 100, 3, false) }}%
        </li>
        <li>
          {{ round(((match.scores.red - 2.3 * match.kills.red) / match.scores.red) * 100, 3, false) }}%
        </li>
      </ul>
    </div>

    <div class="mdl-cell--3-col mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-grid">
      <ul class="mdl-list" style="width: 100%;">
        <li class="list_header">
          % PPK
        </li>
        <li>
          {{ round((1 - ((match.scores.green - 2.3 * match.kills.green) / match.scores.green)) * 100, 3, false) }}%
        </li>
        <li>
          {{ round((1 - ((match.scores.blue - 2.3 * match.kills.blue) / match.scores.blue)) * 100, 3, false) }}%
        </li>
        <li>
          {{ round((1 - ((match.scores.red - 2.3 * match.kills.red) / match.scores.red)) * 100, 3, false) }}%
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>

<script>
  export default {
    props: ['match', 'worldlist'],
    methods: {
      getWorldById (id) {
        for (var i = 0; i < this.worldlist.length; i++) {
          let curWorld = this.worldlist[i]
          if(curWorld.id === id) {
            return curWorld
          }
        }
        return
      },

      round (value, accuracy, keep) {
        if (typeof value !== 'number') return value

        var fixed = value.toFixed(accuracy)

        return keep ? fixed : +fixed
      }
    }
  }
</script>
