import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	
	state:{
		audio:uni.createInnerAudioContext(),  //创建一个audio标签
		detail:{},
		paused:true,  //true代表暂停状态  false代表播放
		lrc:{},
		history:[],
		srcId:'', //歌曲的ID
		model:2,   //播放模式 1 单曲循环  2 顺序播放 3 随机播放
		musicIndex:0,  //当前播放歌曲的下表
	},
	//用来修改state里面定义的参数
	mutations:{
		setSrc(state,src){
			state.audio.src = src;
			state.audio.play()
			state.paused = false
		},
		setDetail(state,detai){
			state.detail = detai;
		},
		play(state){
			state.audio.play()
			state.paused = false
		},
		pause(state){
			state.audio.pause()
			state.paused = true 
		},
		setLrc(state,lrc){
			state.lrc = lrc
		},
		setHistory(state,data){
			console.log(data)
			let num = state.history.findIndex((item)=>{
				return item.id  == data[3]
			})
			if(num === -1){
				state.history.unshift({
					src:data[0],
					detail:data[1],
					lrc:data[2],
					id:data[3]  //存储歌曲Id
				})
			}
		},
		setMusicIndex(state){
			state.musicIndex ++ ;
			if(state.musicIndex >= state.history.length ){
				state.musicIndex = 0 
			}
		},
		setPrev(state){
			//上一首
			console.log(state.musicIndex)
			if(state.musicIndex === 0){
				state.musicIndex = state.history.length
			}
			if(state.musicIndex === -1){
				state.musicIndex = state.history.length - 1 
			}
			state.musicIndex --;
		},
		
		changeModel(state){
			state.model ++ ;
			if(state.model === 4){
				state.model = 1
			}
		}
			
			
	},
	actions:{
		getSrc({commit,dispatch},item){
			//commit 主要用来执行mutations里面的函数方法
		    //dispatch主要用来执行actions里面的函数方法
			
			//等待这三个ajax全部请求完成后 在执行XX
			
			Promise.all([
				   new Promise((next)=>{
                      uni.request({
                      	url:`http://106.15.185.178:6025/song/url?id=${item.id}`,
                      	success(res) {
                      		commit('setSrc',res.data.data[0].url)
                      		next(res.data.data[0].url)
                      	  }
                      });
				   }),
				   //存储歌曲详情
				   new Promise((next)=>{
				   		uni.request({
				   			url:`http://106.15.185.178:6025/song/detail?ids=${item.id}`,
				   			success(res) {
				   				// console.log(res.data)
				   				commit('setDetail',res.data)
								next(res.data)
				   			}
				   		});  
				   }),
				   new Promise((next)=>{
					   //存储歌曲歌词
				   		uni.request({
				   			url:`http://106.15.185.178:6025/lyric?id=${item.id}`,
				   			success(res) {
				   				// console.log(res.data)
				   				commit('setLrc',res.data)
								next(res.data)
				   			}
				   		});
				   }),
			    ]
			 ).then((data)=>{
				 console.log(data)
				 data[3] = item.id
				commit('setHistory',data)
		  })
		}
	}
})