console.log('app script is loaded');

var app = new Vue({
	el:'#app',
	data:{
		message:'',
		authorization:'',
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
		},
		loginpasp(){
			var newthis = this;
			var form = this.$refs.app_form;
			var login = form.elements.login.value;
			var password = form.elements.password.value;


			var postdata ={
				login:login,
				password:password
			}


			$.ajax({
				url:'/login',
				data:postdata,
				xhrFields: {
					withCredentials: true,
				},
				type:'POST',
				dataType:'JSON',
				success:function(data) {
					console.log(data);
					newthis.authorization=data.token;
					console.log(newthis.authorization);
				}
			})
		},
		access(){
			$.ajax({
				url:'/access',
					xhrFields: {
					withCredentials: true,
				},
				type:'GET',
				dataType:'text',
				success:function(data) {
					console.log(data);
				}
			})
		},
		jwtauth(){
			$.ajax({
				url:'/custom',
				headers: {
			    	authorization: this.authorization
			    },
				// xhrFields: {
				// 	withCredentials: true,
				// },
				type:'POST',
				dataType:'text',
				success:function(data) {
					console.log(data);
				}
			})
		},
		logout(){
			$.ajax({
				url:'/logout',
					xhrFields: {
					withCredentials: true
				},
				type:'GET',
				dataType:'text',
				success:function(data) {
					console.log(data);
				}
			})
		},
		send_message1s(){

					var fd = new FormData();
					fd.append('message', this.message);
					return $.ajax({
						url:'/',
						processData: false,
						contentType: false,
						data:fd,
						type:'POST',
						dataType:'json',
						success:function(data) {
							console.log('1s message');
							console.log(data);
						}
					})


		},
		send_message2s(){

					var fd = new FormData();
					fd.append('message', this.message);

					return $.ajax({
						url:'/2s',
						processData: false,
						contentType: false,
						data:fd,
						type:'POST',
						dataType:'json',
						success:function(data) {
							console.log('2s message');
							console.log(data);
						}
					})


		},
		async set2s(){
			return new Promise((resolve)=>{
				setTimeout(()=>{
					console.log('2smidle');
				resolve();
				},2000)
			})

		},
		async send_allmessages(){
		 	await this.send_message2s();
			await this.set2s();
			await this.send_message1s();
			await console.log('after message');
		}
	}
})
