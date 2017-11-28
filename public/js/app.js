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
		save_user(){
			var form = this.$refs.app_form;
			var name = form.elements.title.value;
			var login = form.elements.login.value;
			var password = form.elements.password.value;
			var email = form.elements.email.value;

			var postdata ={
				name:name,
				login:login,
				password:password,
				email:email,
			}


			$.ajax({
				url:'/user/registration',
				data:postdata,
				type:'POST',
				dataType:'json',
				success:function(data) {
					console.log(data);
				}
			})
		},
		login(){
			var form = this.$refs.app_form;
			var login = form.elements.login.value;
			var password = form.elements.password.value;


			var postdata ={
				login:login,
				password:password
			}


			$.ajax({
				url:'/user/login',
				data:postdata,
				type:'POST',
				dataType:'text',
				success:function(data) {
					console.log(data);
				}
			})
		}
	}
})
