console.log('app script is loaded');

var app = new Vue({
	el:'#app',
	data:{
		message:''
	},
	methods:{
		send_message(){
			var fd = new FormData();
			fd.append('message', this.message);
			$.ajax({
				url:'/',
				processData: false,
				contentType: false,
				data:fd,
				type:'POST',
				dataType:'json',
				success:function(data) {
					console.log(data);
				}
			})
		}
	}
})
