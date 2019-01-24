import icons from './icons.js';

var app = new Vue({
  el: '#app',
  data: {
    isActive: false,
    title: 'Eye Catch Maker',
    title_en: 'Featured image maker',
    icon: "fa fa-eye",
    color: "to left top, #05FBFF, #1E00FF",
    items: [
      {
        title: 'サンプル1',
        title_en: 'Sample1',
        icon: "far fa-gem",
        color: "to right top, #F093FB, #F5576C"
      },
      {
        title: 'サンプル2',
        title_en: 'Sample2',
        icon: "devicons devicons-terminal",
        color: "to top, #5EE7DF, #B490CA"
      },
      {
        title: "サンプル3",
        title_en: 'Sample3',
        icon: "fas fa-cat",
        color: "to left top, #20E2D7, #F9FEA5"
      }],
    keyword: "",
  },
  computed: {
    linearGradient: function () {
      return {
        "background": "linear-gradient(" +this.color+ ")"
      }
    },
    searchedIcons: function () {
      var options = {
        threshold: 0.3,
        keys: ['name','term'],
      }
      var fuse = new Fuse(icons, options)
      var result
      if(!this.keyword){
        result = icons;
      }else{
        result = fuse.search(this.keyword);
      }
      return result
    }
  },
  methods: {
    capture: function () {
      html2canvas(document.querySelector('#screenshot-area'), {logging: false}).then(function(canvas) {
        var dataUrl = canvas.toDataURL("image/png");
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'output';
        a.click();
      })
    },
    showSample: function (item) {
      this.title = item.title
      this.title_en = item.title_en
      this.icon = item.icon
      this.color = item.color
    },
    openModal: function () {
      this.title = item.title
      this.title_en = item.title_en
      this.icon = item.icon
      this.color = item.color
    },
    selectIcon: function (selectedIcon) {
      this.icon = selectedIcon
    }
  }
})
