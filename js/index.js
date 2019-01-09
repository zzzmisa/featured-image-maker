var app = new Vue({
	el: '#app',
	data: {
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
      }]
	},
	computed: {
		reverseMessage: function () {
			return {
				"background": "linear-gradient(" +this.color+ ")"
			}
		}
	},
	methods: {
		capture: function () {
			html2canvas(document.querySelector('#screenshot-area'), {	
				onrendered: function(canvas) {
					var dataUrl = canvas.toDataURL("image/png")   // PNG形式
					var event = document.createEvent("MouseEvents")
					event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
					var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
					a.href = dataUrl
					a.download = "output"
					a.dispatchEvent(event)
				}
			})
		},
		showSample: function (item) {
			this.title = item.title
			this.title_en = item.title_en
			this.icon = item.icon
			this.color = item.color
		}
	}
})
