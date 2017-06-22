new Vue({
	el:"#cart",
	data: {
		title:"购物车",
		productList: [],
		totalMoney: 0,
		isAllcheck: false,
		isDelFlag: false,
		curProduct:''
	},
	mounted: function(){ //编译完成后执行
		this.$nextTick(function(){
			this.cartView();
		})
	},
	methods: {
		cartView: function() { //进入页面后填充购物车
			//获取数据方法：this.$http.get("url",{"id":123}).then(function(res){})
			var _this = this;
			this.$http.get({
				ethod:'GET',
            	url:'data/cartData.json',
            	data:{}
			}).then(function(res){
				this.productList = res.data.result.list;
			}).catch(function(){
              console.log("报错信息："+e)
          	});
		},
		changeProduct: function(item,flag){ //增加商品数量
			//console.log(item);
			if(flag == "add"){
				item.productQuantity++;
			}else if(flag == "sub"){
				item.productQuantity--;
				if(item.productQuantity < 1){
					item.productQuantity = 1;
				}
			}
			this.calcuTotalPrice();
			
		},
		selectProduct: function(item){
			if(typeof item.isCheck == 'undefined'){
				//因为是要给每一个item添加isCheck属性，所以只能在这样添加
				//vm.$set( object, key, value )
				//Vue.set(item,"isCheck",true); //全局注册变量
				this.$set(item,"isCheck",true); //局部注册变量
			}else{
				item.isCheck = !item.isCheck;
			}
			this.calcuTotalPrice();
		},
		selectAll: function(){
				_this = this;
				this.isAllcheck = !this.isAllcheck;
				//遍历每个商品对其做选中操作
				this.productList.forEach(function(item,index){ //遍历商品
					if(typeof item.isCheck == 'undefined'){
						_this.$set(item,"isCheck",_this.isAllcheck); 
					}else{
						item.isCheck = _this.isAllcheck;
					}	
				});
				this.calcuTotalPrice();
		},
		calcuTotalPrice: function(){
			_this = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item,index){ //遍历商品
				
				if(item.isCheck){ //为true标识选中状态,只计算选中状态的商品
					_this.totalMoney += item.productQuantity * item.productPrice;
				}	

			});
		},
		delProConfig:function(item){
			this.isDelFlag = true;
			this.curProduct = item;
		},
		delProdcut: function(){
			_this = this;
			//this.productList.$delete(this.curProduct); vue2.0已不再支持该方法
			//采用js原生的删除方法
			var index = this.productList.indexOf(this.curProduct);
			//splice()方法向/从数组中添加/删除项目，表示从index索引处开始删除1条内容，然后返回被修改后的项目，注：该方法会改变原始数组
			this.productList.splice(index,1);
			this.isDelFlag = false;
		}

	},
	filters: {
		formatMoney: function(value){
			return "￥" + value.toFixed(2) + "元";
		}
	},
	watch: {

	},
	components: {

	}
});


Vue.filter("money",function(value){
	return "￥" + value.toFixed(2)+"元";
})