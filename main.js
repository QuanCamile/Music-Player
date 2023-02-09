const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const playlist = $('.playlist');
    const headerH2 = $('header h2');
    const cdThumb = $('.cd-thumb');
    const audio = $('#audio');
    const cd = $('.cd');
    const playBtn = $('.btn.btn-toggle-play');
    const changeiconPlay = $('.player');
    const loopSong = $('.btn.btn-repeat');
    const updateTime = $('#progress');
    const timeStart = $('.timeStart');
    const timeEnd = $('.timeEnd');


    //app -- list musci
    const app = {
        currentIndex: 0,
        isPlaying: false,
        isLoop: false,
        songs: [
            {
                name: 'Lỡ Hẹn Với Dòng Lam',
                singer: 'Thái Học',
                path: './music/lohendonglam.mp3',
                image: './img/thaihoc.jpg'
            },
            {
                name: '2AM',
                singer: 'JustaTee feat Big Daddy',
                path: './music/lohendonglam.mp3',
                image: './img/JustaTee.jpg'
            },
            {
                name: 'OK',
                singer: 'BINZ',
                path: './music/lohendonglam.mp3',
                image: './img/binz.jpg'
            },
            {
                name: 'Khuôn Mặt Đáng Thương',
                singer: 'Sơn Tùng MTP',
                path: './music/lohendonglam.mp3',
                image: './img/sontung.jpg'
            },
            {
                name: 'Yêu Cô Gái Bạc Liêu',
                singer: 'Nghi Nghi',
                path: './music/lohendonglam.mp3',
                image: './img/nghinghi.jpg'
            },
            {
                name: 'Nến Và Hoa',
                singer: 'Anh Tú',
                path: './music/lohendonglam.mp3',
                image: './img/anhtu.jpg'
            },
        ],

        render: function () {
            const html = this.songs.map(song => {
                return `<div class="song">
                            <div class="thumb" 
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                        `;
            })
            playlist.innerHTML = html.join('');

        },
        
        defineProperties: function(){
            Object.defineProperty(this, 'currentSong', {
                get: function(){
                    return this.songs[this.currentIndex];
                }
            });
        },

        //ham xu ly thoi gian bai hat
        setTimeSong: function(time){
            const getTime = Math.floor(time)
            if(getTime > 60){
                
                var second =(getTime % 60);
                if(second<10){
                    second = '0' + second;
                }
                var minute = (getTime-second)/60;
                if(minute<10){
                    minute = '0' + minute;
                }
                var total = minute+':'+second;
            }
            else if(getTime < 10){
                total = '00:0'+ getTime;
            }else{
                total = '00:'+getTime;
            }
            return total;
        },
        

        handleEvents: function(){
            const cdWidth = cd.offsetWidth;
            const _this = this;
            //su kien cuon man hinh phong to thu nho CD
            document.onscroll = function (){
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const newCD = cdWidth - scrollTop;
                cd.style.width = newCD > 0 ? newCD + 'px': 0;
                cd.style.opacity = newCD / cdWidth;
            }

            //xu ly lap bai hat
            loopSong.onclick = function(){
                if(_this.isLoop){
                    loopSong.classList.remove('active');
                    _this.isLoop = false;
                    audio.loop = false;
                }
                else{
                    _this.isLoop = true;
                    loopSong.classList.add('active');
                    audio.loop = true;
                }
               
                
            }

            //xu ly khi click play
            playBtn.onclick = function(){
                if(_this.isPlaying){            
                    audio.pause();
                }
                else{
                    audio.play();
                 

                }
            }

            //khi lang xe songs duoc play
            audio.onplay = function(){
                _this.isPlaying = true;
                changeiconPlay.classList.add('playing');
             
            }

            //Lấy ra tổng thời gian mà bài hát có
            audio.onloadedmetadata = function(){
                const getTimeEnd = Math.round(audio.duration)
                const minute = Math.floor(getTimeEnd/60);
                const second =Math.round(audio.duration - (minute*60));
                if(minute < 10){
                    timeEnd.innerHTML = "0"+minute+":"+second;
                }
                timeEnd.innerHTML = "0"+minute+":"+second;

                
            }

            //khi lang xe songs bi pause
            audio.onpause = function(){
                _this.isPlaying = false;
                changeiconPlay.classList.remove('playing');
            }

            //khi tien do bai hat thay doi
            audio.ontimeupdate = function(){
                if(audio.duration){
                    const progressPercent = Math.floor(audio.currentTime/audio.duration*100);
                    updateTime.value = progressPercent;
                    timeStart.innerHTML =_this.setTimeSong((audio.currentTime));
                }
            }

            //xu ly khi tua bai hat
            updateTime.oninput  = function(e){
               //phan tram => số giây trong bài hát
                const currentTimeUpdate = e.target.value/100*audio.duration;
                audio.currentTime = currentTimeUpdate;  
            }

        },
        loadCurrentSong: function(){
            headerH2.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
            

        },
        start: function () {
            // dinh nghia cac thuoc tinh cho Object
            this.defineProperties();

            // lang nghe va xu ly cac su kien - DOM Events
            this.handleEvents();

            // tai thong tin bai hat dau tien vao app khi run
            this.loadCurrentSong();

            //Render playlist
            this.render();
        }
    };

    app.start();