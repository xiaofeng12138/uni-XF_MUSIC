<script>
	import Vuex from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.audio.onEnded(()=>{  //音乐播放结束的回调函数
				if(this.model == 1){
					 this.play()  //播放结束重新继续播放
				}else if(this.model == 2){
					this.setSrc(this.history[this.musicIndex + 1].src)  //重新设置歌曲的src
					this.setLrc(this.history[this.musicIndex + 1].lrc)
					this.setDetail(this.history[this.musicIndex + 1].detail)
					this.setMusicIndex()  //改变当前播放的音乐下标
				} else if(this.model == 3){
					let index = Math.floor(Math.random() * this.history.length)
					this.setSrc(this.history[index].src)  //重新设置歌曲的src
					this.setLrc(this.history[index].lrc)
					this.setDetail(this.history[index].detail)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed:{
			...Vuex.mapState(['audio','detail','lrc','history','model','musicIndex'])
		},
		methods:{
			...Vuex.mapMutations(['play','setSrc','setDetail','setLrc','setMusicIndex'])
		}
	}
</script>

<style>
	@import './common/uni.css';
</style>
