<template>
  <v-app id="inspire">
    <header>
      <v-text-field

              @keydown="getxml"
              label="Search all the GIFs"
              placeholder="Type to search..."
              id="search"
              class="input--search"
              single-line

      ></v-text-field>

    </header>
    <v-item-group >
      <v-container>
        <v-row>

          <v-col
                  v-for="item in items"
                  :key="item.id"
                  cols="12"
                  md="3"
          >

            <v-item>
              <v-fade-transition  mode="in-out">
                <v-card

                        class="d-flex align-center"
                        dark
                        height="200"

                >

                  <v-img v-bind:src="item.images.preview_gif.url" height="200"
                  ></v-img>

                </v-card>
              </v-fade-transition>
            </v-item>

          </v-col>
        </v-row>

      </v-container>
      <div class="text-center">
        <v-pagination v-on:input="getxml"
                      id="pagination"
                      v-model="page"
                      v-bind:length="pages"
                      :total-visible="10"
        ></v-pagination>
      </div>
    </v-item-group>
  </v-app>

</template>

<script>

  export default {
    name: 'Search',
    data(){

      return {
        query: '',
        response: this.response,
        items: [],
        pages: 1,
        page: 1,
        offset: 0
      }
    },
    mounted: function (e) {
      var _this = this;
      this.$nextTick(function () {
        _this.getrandom();
      });


    },
    methods:{
      getrandom: function(e, c=0){
        var _this = this;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            var json = JSON.parse(request.responseText);
            _this.items.push(json.data);
            c++;
            (c < 20) ? _this.getrandom(e,c) : null;
          }
        };
        request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=JSzjd9QyoBlFk7OKb53BL8M8LxJbRlVo', true);
        request.send();
      },
      getxml: function(e, params = null, limit = 20) {
        var _this = this,
                request = new XMLHttpRequest();
        (e.type === 'keydown') ? _this.query = e.target.value : _this.offset = (_this.page-1)*limit;
        request.onreadystatechange = function() {
          if (request.readyState === 4 ) {
            var json = JSON.parse(request.responseText);
            _this.response        = json;
            _this.items           = (json.data.length > 0) ? json.data : [{images: {preview_gif: {url: "https://media3.giphy.com/media/rqoATGnsKBWqaM53Rl/giphy.gif?cid=ecf05e47r2qbs54mswj1mhdb8tv4gou8ycamdze5eiqteaf8&rid=giphy.gif&ct=g"}}}];
            _this.pages           = (json.pagination.total_count/limit > parseInt(json.pagination.total_count/limit)) ? parseInt(json.pagination.total_count/limit)+1 : parseInt(json.pagination.total_count/limit);
            (_this.pages < 1) ? _this.pages = 1:null;
          }
        };
        request.open('GET', 'https://api.giphy.com/v1/gifs/search?api_key=JSzjd9QyoBlFk7OKb53BL8M8LxJbRlVo&offset=' + _this.offset + '&limit=' + limit + '&q=' + _this.query, true);
        request.send();


      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
