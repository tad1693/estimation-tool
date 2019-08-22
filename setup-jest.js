import $ from 'jquery'

global.$ = global.jQuery = $
global.google = {
  charts: {
    load: function () {},
    setOnLoadCallback: function () {},
    Line: class Line {
      static convertOptions () {}
      draw () {}
    }
  },
  visualization: {
    DataTable: function () {}
  }
}
global.Chart = class Chart {
}
