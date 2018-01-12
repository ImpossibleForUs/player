//Data list Service
playerApp.factory('DataList', function() {
	var data = [
        {
            "id": 0,
            "artist": "毛不易",
            "song" : "消愁",
            "album" : "《live》",
            "songUrl" : "static/music/消愁.mp3",
            "avatar" : "static/img/xc.png"
        },
        {
            "id": 1,
            "artist": "以冬",
            "song" : "我的一个道姑朋友",
            "album" : "《我的一个道姑朋友》",
            "songUrl" : "static/music/我的一个道姑朋友.mp3",
            "avatar" : "static/img/wdygdgpy.png"
        },
        {
            "id": 2,
            "artist": "戴荃",
            "song" : "悟空",
            "album" : "《悟空》",
            "songUrl" : "static/music/悟空.mp3",
            "avatar" : "static/img/wk.png"
        },
        {
            "id": 3,
            "artist": "王建房",
            "song" : "在人间",
            "album" : "《长安夜》",
            "songUrl" : "static/music/在人间.mp3",
            "avatar" : "static/img/zrj.png"
        },
        {
            "id": 4,
            "artist": "谢安琪",
            "song" : "钟无艳",
            "album" : "《3/8》",
            "songUrl" : "static/music/钟无艳.mp3",
            "avatar" : "static/img/zwy.png"
        },
        {
            "id": 5,
            "artist": "赵雷",
            "song" : "三十岁的女人",
            "album" : "《吉姆餐厅》",
            "songUrl" : "static/music/三十岁的女人.mp3",
            "avatar" : "static/img/jmct.png"
        },
        {
            "id": 6,
            "artist": "赵雷",
            "song" : "南方姑娘",
            "album" : "《赵小雷》",
            "songUrl" : "static/music/南方姑娘.mp3",
            "avatar" : "static/img/zxl.png"
        },
        {
            "id": 7,
            "artist": "赵雷",
            "song" : "鼓楼",
            "album" : "《无法长大》",
            "songUrl" : "static/music/鼓楼.mp3",
            "avatar" : "static/img/wfzd.png"
        }
	]; 

	return data;
});

//Binding Data Service
playerApp.factory('DataBinding', ['$rootScope', 'DataList', function($rootScope, DataList) {
	$rootScope.datas = DataList;

	var dataObj = {
		dataBindFunc: function(index) {
			$rootScope.avatar = $rootScope.datas[index].avatar;
			$rootScope.artist = $rootScope.datas[index].artist;
			$rootScope.song = $rootScope.datas[index].song;
			$rootScope.album = $rootScope.datas[index].album;
		}
	};

	return dataObj;
}]);

//Audio Service
playerApp.factory('Audio', ['$document', function($document) {
	var audio = $document[0].createElement('audio');

	return audio;
}]);

//Player Service
playerApp.factory('Player', ['$rootScope', '$interval' ,'Audio', 'DataList', 'DataBinding', function($rootScope, $interval, Audio, DataList, DataBinding) {
	$rootScope.data = DataList;
	var musicLength = DataList.length;
	var player = {
		musicLen: musicLength,
		controllPlay: function(index) {
			player.playerSrc(index);
			player.play();//播放
			player.isPlay = true;//让图片转动
			DataBinding.dataBindFunc(index);//显示当前播放歌曲的信息
			player.playing = true;//显示暂停按钮
		},
		playerSrc: function(index) { //Audio的url
			var url = $rootScope.data[index].songUrl;
			Audio.src = url;
		},
		play: function(index) { //播放
			if(player.playing) {
				player.stop();
			}

			Audio.play(); //h5 audio api
			player.isPlay = true; //图片转动
			player.playing = true; //显示暂停按钮
		},
		stop: function() { //暂停
			if(player.playing) {
				Audio.pause();
			}

			player.isPlay = false; //图片停止转动
			player.playing = false;//显示播放按钮
		},
		prev: function(index) { //上一首歌
			console.log('prev:' + player.active);

			if(player.active == 0) { //如果是第一首音乐
				player.active = player.musicLen - 1;  //播放最后一首 	
			} else {
				player.active -= 1; //否则递减
			}

			player.controllPlay(player.active);
		},
		next: function(index) { //下一首歌
			console.log('next:' + player.active);

			if(player.active == (player.musicLen - 1)) {
				player.active = 0;
			} else {
				player.active += 1;
			}

			player.controllPlay(player.active); //播放显示的数据
		}
	};

	return player;
}]);
