import icons from "./icons.js";
import webgradients from "./webgradients.js";

var app = new Vue({
  el: "#app",
  data: {
    iconsModalFlg: false,
    gradientsModalFlg: false,
    title: "Eye Catch Maker",
    title_en: "Featured image maker",
    icon: "fa fa-eye",
    color: "to left top, #05FBFF, #1E00FF",
    width: 780,
    height: 520,
    keyword: "",
    isDownloading: false,
    zoomPercentage: 100,
  },
  mounted() {
    var w = document.getElementById("preview").clientWidth;
    if (w < this.width) {
      this.zoomPercentage = ((w - 40) / this.width) * 100;
    }
  },
  computed: {
    sampleItems: function () {
      return [
        {
          title: "サンプル1",
          title_en: "Sample1",
          icon: "far fa-gem",
          color: "to right top, #F093FB, #F5576C",
        },
        {
          title: "サンプル2",
          title_en: "Sample2",
          icon: "devicons devicons-terminal",
          color: "to top, #5EE7DF, #B490CA",
        },
        {
          title: "サンプル3",
          title_en: "Sample3",
          icon: "fas fa-cat",
          color: "to left top, #20E2D7, #F9FEA5",
        },
      ];
    },
    webgradients: function () {
      return webgradients;
    },
    cssForPreview: function () {
      return {
        zoom: this.zoomPercentage + "%",
        /* iOSでもサイズが変わらないようにBulmaの指定を打ち消す */
        "-webkit-text-size-adjust": "auto",
      };
    },
    cssForScreenshotArea: function () {
      return {
        width: this.width + "px",
        height: this.height + "px",
        background: "linear-gradient(" + this.color + ")",
      };
    },
    searchedIcons: function () {
      const options = {
        threshold: 0.3,
        keys: ["name", "term"],
      };
      const fuse = new Fuse(icons, options);
      let result;
      if (!this.keyword) result = icons;
      else result = fuse.search(this.keyword);
      return result;
    },
  },
  methods: {
    download: function () {
      if (this.isDownloading) return;
      this.isDownloading = true;
      let self = this;

      setTimeout(function () {
        html2canvas(document.querySelector("#screenshot-area"), {
          logging: false,
        }).then(function (canvas) {
          const dataUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "output";
          a.click();
          self.isDownloading = false;
        });
      }, 100);
    },
    showSample: function (item) {
      this.title = item.title;
      this.title_en = item.title_en;
      this.icon = item.icon;
      this.color = item.color;
    },
    selectIcon: function (selectedIcon) {
      this.icon = selectedIcon;
    },
    selectGradient: function (selectedGradient) {
      this.color = selectedGradient;
    },
  },
});
