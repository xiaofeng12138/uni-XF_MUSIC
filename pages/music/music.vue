<template>
	<view class="musica">
		<view class="imgRotate">
			<view class="imgRotatea">
				<img :src="detail.songs[0].al.picUrl + '?param=180y180'" alt="">
			</view>
		</view>
		<view class="lrcs">
			<ul :style=" 'margin-top: -' + 25*index + 'px; transition: margin 1.5s' ">
				<li ref="li" :style="index === i && 'color:red;'" v-for="(item, i) in lrcArray" :key="i">
					{{ item.text }}
				</li>
			</ul>
		</view>
		<view class="slideree">
			<view>{{startTime}} </view>
			<!-- 导航条 -->
			<view class="slidere">
				<slider @changing='changing' @change='change' :value="value" block-size='15' backgroundColor='#888888' activeColor='#ccc'/>
			</view>
			<view>{{totalTime}}</view>
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
			uni.setNavigationBarTitle({
				title: this.detail !== undefined ? this.detail.songs[0].name :'暂无标题'
			})
			this.audio.onEnded(()=>{   //音乐播放结束 index改为初始值 歌词再次显示
				this.index = -1 
				//设置头部标题
				uni.setNavigationBarTitle({
					title: this.detail !== undefined ? this.detail.songs[0].name :'暂无标题'
				})
				this.changLrc()
			}),
			this.audio.onPlay(()=>{
				this.index = -1
				//设置头部标题
				uni.setNavigationBarTitle({
					title: this.detail !== undefined ? this.detail.songs[0].name :'暂无标题'
				})
				this.changLrc()
			})
		
			
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
	.slideree{
		display: flex;
		justify-content: center;
		align-items:center;
	}
	.slidere{
		width: 70%;
	}
	.lrcs{
		/* style="height:30upx; overflow:auto; text-align:center;padding:360upx 80upx 40upx 0;" */
		text-align: center;
		overflow: hidden;
		height: 300upx;
		margin-top: 100upx;
		padding: 100upx 50upx;
	}
	li{
		list-style: none;
	}
	.musica{
		padding-top:70upx ;
	}
	.musica img{
		border-radius: 50%;
	}
	@-webkit-keyframes rotation{

    from {-webkit-transform: rotate(0deg);}

    to {-webkit-transform: rotate(360deg);}

	}
	.imgRotate{
			width: 360upx;
			height: 360upx;
			margin: 0 auto;
	}
	.imgRotate image{
		width: 360upx;
		height: 360upx;
		
	}
	.imgRotatea{
		-webkit-transform: rotate(360deg);
		
		animation: rotation 3s linear infinite;
		
		-moz-animation: rotation 3s linear infinite;
		
		-webkit-animation: rotation 3s linear infinite;
		
		-o-animation: rotation 3s linear infinite;
	}
</style>
