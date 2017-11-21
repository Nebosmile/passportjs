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
		},
		login(){
			var form = this.$refs.app_form;
			var name = form.elements.title;
			var login = form.elements.login;
			var password = form.elements.password;
			var email = form.elements.email;

			var postdata ={
				name:name,
				login:login,
				password:password,
				email:email,
			}


			$.ajax({
				url:'/user/registration',
				processData: false,
				contentType: false,
				data:postdata,
				type:'POST',
				dataType:'json',
				success:function(data) {
					console.log(data);
				}
			})
		}
	}
})
