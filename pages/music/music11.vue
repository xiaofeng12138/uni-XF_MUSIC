<template>
	<view>
		<view class="slider">
			{{startTime}}
			<view class="jdt">
				<slider @changing='changing' @change='change' :value="value" block-size='15'/>
			</view>
			{{totalTime}}
		</view>
		<view class="lyric">
			<ul :style=" 'margin-top: -' +  60 *index + 'upx; transition: margin 1s' ">
				<li :style = "index === i && 'color:red;font-size:40upx;margin-bottom:20upx;transition: 1s'" v-for="(item,i) in lrcArray" :key="i"> {{ item.text }} </li>
			</ul>
		</view>
		<tabbar />
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import tabbar from '../tabbar/tabbar.vue'
	export default{
		components:{tabbar},
		data(){
			return{
				startTime:'0:00',
				totalTime:'0:00',
				value:0,
				updateState:true,
				lrcArray:[],
				index:-1, //用来判断当前应该显示那条歌词
			}
		},
		mounted() {
			this.audio.onEnded(()=>{   //音乐播放结束 index改为初始值 歌词再次显示
				this.index = -1 
				//设置头部标题
				uni.setNavigationBarTitle({
					title: this.detail !== undefined ? this.detail.songs[0].name :'暂无标题'
				})
				this.changLrc()
			}),
		
			
			this.changLrc()
			//设置音乐时间改变的函数
			this.audio.onTimeUpdate(this.progress) 
			
		},
		computed:{
			...Vuex.mapState(['detail','audio','lrc'])
		},
		methods:{
			changLrc(){
				const arr = this.lrc.lrc.lyric.split('\n')
				let lrcArr =[]
				 for(let i = 0 ;i<arr.length;i++){
					 let tempArr = arr[i].split(']')
					 lrcArr.push({
						 time:tempArr[0].substring(1,tempArr[0].length - 1),
						 text:tempArr[1]
					 })
					 this.lrcArray = lrcArr
				 }
			},
			progress(){
				// 播放到了多长时间
				    let min = Math.floor(this.audio.currentTime / 60);
					min = min.toString().length === 1 ? ("0" + min): min;
					let sec = Math.round(this.audio.currentTime % 60);
					sec = sec.toString().length === 1 ? ("0" + sec): sec;
					// 总时间
					let zmin = Math.floor(this.audio.duration / 60);
					zmin = zmin.toString().length === 1 ? ("0" + zmin): zmin;
					let zsec = Math.round(this.audio.duration % 60);
					zsec = zsec.toString().length === 1 ? ("0" + zsec): zsec;
					
					this.startTime = `${min}:${sec}`
					this.totalTime = `${zmin}:${zsec}`
					
					if (this.updateState) {
						this.value = this.audio.currentTime / this.audio.duration * 100  //获取音乐播放进度
					}
					if((this.startTime) > this.lrcArray[this.index +1 ].time){
						this.index ++ ;
					}
				 },
				 //slider拖动过程函数
				 changing(){
					 this.updateState = false
				 },
				 change(e){ //改变音乐播放进度
					 this.audio.seek(e.detail.value * this.audio.duration / 100)
					 this.updatestate = true
					 
					 let min = Math.floor(this.audio.currentTime / 60);
					 min = min.toString().length === 1 ? ("0" + min): min;
					 let sec = Math.round(this.audio.currentTime % 60);
					 sec = sec.toString().length === 1 ? ("0" + sec): sec;
					 let s = `${min}:${sec}`
					 let self = this;
					 
					 //递归方法   解决歌词滚动问题
					 this.index = 0 ;
					 function d(){
						 if(s>self.lrcArray[self.index +1 ].time){
							 self.index ++;
							 d()
						 }
					 }
					 d()
				 }
		},
		
	}
</script>

<style>
	.slider{
		width: 95%;
		margin: auto;
		line-height: 70upx;
		display: flex;
	}
	.slider .jdt{
		width: 80%;
	}
	.lyric{
		width: 100%;
		height: 430upx;
		padding-top: 600upx ;
		overflow: hidden;
		background-color: #e4e4e4;
	}
	.lyric li{
		width: 100%;
		/* margin: auto; */
		height: 50upx;
		text-align: center;
		margin-left: -40upx;
		list-style: none;
	}
	
</style>
