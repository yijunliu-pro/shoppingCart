new Vue({
	el:".address",
	data:{
		limitNum: 3,
		addressList:'',
		curIndex: 0,  //收获地址：默认要显示第一条
		shippingMethod: 1,
		curAddress: '', //当前地址
		isShow: false, //是否显示
		editShowFlag: false //编辑框是否显示
	},
	mounted: function(argument) {
		this.$nextTick(function(){
			this.getAddressList();
		})
	},
	computed: { //实时计算的相关方法
	  filterAddressList: function () { //计算默认情况下只显示3条地址信息
	    return this.addressList.slice(0, this.limitNum); //slice()对数组进行截取返回一个新数据
	  }
	},
	methods:{
		getAddressList: function(){//获取已存的地址
			_this = this;
			this.$http({
				method:'GET',
            	url:'data/address.json',
            	data:{}
			}).then(function(res){
				var addressData = res.data;
				if(addressData.status == 0){
					_this.addressList = addressData.result;
				}
			})
		},
		loadMore: function(){ //加载更多
			this.limitNum = this.addressList.length;
		},
		setDefault: function(addressId){ //设置默认地址
			this.addressList.forEach(function(item,index){
				if(item.addressId == addressId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
			})
		},
		delConfirm: function(curitem){//删除当前地址的相关信息
			this.isShow = true;
			this.curAddress = curitem;
		},
		delAddress: function(){
			var index = this.addressList.indexOf(this.curAddress);
			this.addressList.splice(index,1);
			this.isShow = false;
		},
		addNewAddress: function(){ //添加新地址
			this.editShowFlag = true;
		},
		editAddress: function(){ //编辑地址

		}



	}
})