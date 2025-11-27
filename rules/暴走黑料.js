const csdown = {
    d: [],
    author: '流苏',
    version: '20251106',
    search: function() {
        var d = this.d;
        let pg = MY_PAGE;
        setPageTitle('');
        try {
            if (MY_PAGE == 1) {
                d.push({
                    title: '',
                    col_type: 'rich_text',
                })
                d.push({   
                    title: "搜索 ",
                    url: $.toString(() => {
                        putMyVar('keyword', input)
                        refreshPage(false)
                        return "hiker://empty"
                    }),
                       desc: "请输入搜索关键词",
                       col_type: "input",
                    extra: {
                        defaultValue: getMyVar('keyword', ''),
                        onChange: $.toString(() => {
                            putMyVar('keyword', input)
                        }),
                        pageTitle: '搜索结果'
                    }
                })
                let search = [{
                    title: '视频&黑料&社区&漫画&涩图',
                    id: '1&2&3&4&5'
                }];
                this.Cate(search, 'search', d);
            }
            let 分类 = getMyVar('search', '1');
            if (分类 == 1) {
                let list = this.post('search/keyWordVideo?pageSize=20&page=' + pg + '&searchWord=' + getMyVar('keyword')).data;
                list.forEach(data => {
                    d.push({
                        title: data.title,
                        desc: (data.createdAt ? data.createdAt.split('.')[0] : '') + '    ' + parseInt(data.playTime / 60) + ':' + parseInt(data.playTime % 60),
                        img: this.images(data.coverImg[0]),
                        url: this.vods(data.videoId),
                        col_type: 'movie_2',
                        extra: {
                            videoId: data.videoId,
                            pageTitle: data.title,
                        }
                    })
                })
            } else if (分类 == 2) {
                let list = this.post('search/keyWord?pageSize=20&page=' + pg + '&searchWord=' + getMyVar('keyword')).data;
                list.forEach(data => {
                    d.push({
                        title: data.title,
                        desc: (data.checkAt ? data.checkAt.split('.')[0] : '') + ' 浏览数：' + data.fakeWatchTimes + ' \n' + (data.classifyTitles && data.classifyTitles.length != 0 ? data.classifyTitles.join(' ') : ''),
                        img: this.images(data.coverImg[0] + '_480'),
                        url: $('hiker://empty?#gameTheme##noHistory#').rule(() => {
                            $.require('csdown').black_erji();
                        }),
                        col_type: 'pic_1_card',
                        extra: {
                            dynamicId: data.dynamicId,
                            pageTitle: data.title,
                        }
                    })
                })
            } else if (分类 == 3) {
                let list = this.post('search/keyWordAll?pageSize=20&page=' + pg + '&searchWord=' + getMyVar('keyword') + '&searchType=1').dynamicList;
                list.forEach(data => {
                    d.push({
                        title: data.nickName,
                        desc: data.checkAt,
                        img: data.logo ? this.images(data.logo) : 'https://img.xxxh.de/1762084615547.png',
                        url: 'hiker://empty',
                        col_type: 'avatar',
                        extra: {
                            user_id: data.userId,
                        }
                    }, {
                        title: data.title,
                        url: $('hiker://empty?#gameTheme#&#noHistory#').rule(() => {
                            $.require('csdown').topic_erji();
                        }),
                        col_type: 'text_1',
                        extra: {
                            lineVisible: false,
                            dynamicId: data.dynamicId,
                        },
                    })
                    let img = data.images;
                    if (img && img.length < 2) {
                        img.forEach(data => {
                            d.push({
                                img: this.images(data + '_480'),
                                url: this.images(data + '_480'),
                                col_type: 'pic_1_full',
                            })
                        })
                    } else if (img) {
                        img.forEach(data => {
                            d.push({
                                img: this.images(data + '_480'),
                                url: this.images(data + '_480'),
                                col_type: 'pic_3',
                            })
                        })
                    }
                    if (data.video) {
                        d.push({
                            title: '视频',
                            desc: '0',
                            img: this.images(data.video.coverImg),
                            url: $('hiker://empty?#gameTheme#&#noHistory#').rule(() => {
                                $.require('csdown').topic_erji();
                            }),
                            col_type: 'card_pic_1',
                            extra: {
                                lineVisible: false,
                                dynamicId: data.dynamicId,
                            },
                        })
                    }
                })
            } else if (分类 == 4) {
                let list = this.post('search/keyWordAll?pageSize=20&page=' + pg + '&searchWord=' + getMyVar('keyword') + '&searchType=2').comicsList;
                list.forEach(data => {
                    d.push({
                        title: data.comicsTitle,
                        img: this.images(data.coverImg),
                        url: $('hiker://empty?#immersiveTheme#').rule(() => {
                            $.require('csdown').comic_erji();
                        }),
                        col_type: 'movie_3',
                        extra: {
                            comic_id: data.comicsId,
                            pageTitle: data.comicsTitle,
                        }
                    })
                })
            } else if (分类 == 5) {
                let list = this.post('search/keyWordAll?pageSize=20&page=' + pg + '&searchWord=' + getMyVar('keyword') + '&searchType=4').portrayList;
                list.forEach(data => {
                    d.push({
                        title: data.title,
                        img: this.images(data.coverImg),
                        desc: `共${data.imgNum}张图`,
                        url: this.portrays(data.portrayPicId),
                        col_type: 'movie_3',
                        extra: {
                            pageTitle: data.title,
                        }
                    })
                })
            }
        } catch (e) {
            log(e.message)
        }
        setResult(d)
    },
    portrays: function(id) {
        return $().lazyRule((id) => {
            let images = $.require('csdown').post('portray/getPictureDetailById?portrayPicId=' + id).data.imgList.map(data => $.require('csdown').images(data))
            return 'pics://' + images.join('&&');
        }, id)
    },
    portray: function() {
        let d = this.d,
            pg = MY_PAGE;
        if (MY_PAGE == 1) {
            if (!storage0.getItem('portray_classifyList')) {
                let portray_classifyList = this.post('portray/classifyList').data.map(data => {
                    return {
                        name: data.classTitle,
                        id: data.classId,
                    }
                });
                storage0.setItem('portray_classifyList', portray_classifyList)
            }
            let portray_classifyList = storage0.getItem('portray_classifyList');
            this.top_Cate(portray_classifyList, 'portray', d);
            let 分类 = [{
                title: '最近更新&精选推荐&观看最多',
                id: '1&2&3'
            }];
            this.Cate(分类, 'portray_cate', d);
        }
        let portray_ = getMyVar('portray', getItem('portray_index'));
        if (!storage0.getMyVar('portray_' + portray_ + getMyVar('portray_cate', '1') + pg)) {
            let d_ = [];
            let portray_list = this.post('portray/getPictureList?page=' + pg + '&pageSize=20&sortType=' + getMyVar('portray_cate', '1') + '&classId=' + portray_).data;
            portray_list.forEach(data => {
                d_.push({
                    title: data.title,
                    img: this.images(data.coverImg),
                    desc: `共${data.imgNum}张图`,
                    url: this.portrays(data.portrayPicId),
                    col_type: 'movie_3',
                })
            })
            storage0.putMyVar('portray_' + portray_ + getMyVar('portray_cate', '1') + pg, d_)
        }
        storage0.getMyVar('portray_' + portray_ + getMyVar('portray_cate', '1') + pg).forEach(data => d.push(data))
    },
    comics: function(id) {
        return $().lazyRule((id) => {
            let images = $.require('csdown').post('comics/base/chapterInfo?chapterId=' + id).imgList.map(data => $.require('csdown').images(data))
            return 'pics://' + images.join('&&');
        }, id)
    },
    comic_erji: function() {
        let d = this.d,
            id = MY_PARAMS.comic_id,
            data = this.post('comics/base/info?comicsId=' + id),
            more = this.post('comics/base/getRec?comicsId=' + id).data;
        setPageTitle(data.comicsTitle);
        d.push({
            title: data.comicsTitle + `\n““””作者：${data.authorName}`.small(),
            desc: data.tagList.map(data => data.title).join(' ') + '\n更新至' + data.chapterNewNum + '话',
            img: this.images(data.coverImg),
            url: this.images(data.coverImg),
            col_type: 'movie_1_vertical_pic_blur',
        })
        this.setDesc(d, data.info);
        d.push({
            title: (getMyVar('shsort', '0') == '1') ? '““””<b><span style="color: #FF0000">逆序</span></b>' : '““””<b><span style="color: #1aad19">正序</span></b>',
            url: $('#noLoading#').lazyRule(() => {
                return $.require("csdown").shsort();
            }),
            col_type: 'text_center_1',
            extra: {
                id: '排序',
                lineVisible: false,
                longClick: [{
                    title: '当前样式：' + getItem('pic_col_type', 'text_2'),
                    js: $.toString(() => {
                        //let options = ['text_1', 'text_2', 'text_3', 'text_4', 'text_center_1', 'avatar', 'text_icon', 'icon_1_left_pic'];
                        //log(getColTypes())
                        let options = getColTypes();
                        let Line = {
                            title: '切换样式',
                            options: options,
                            selectedIndex: options.indexOf(getItem('pic_col_type', 'text_2')),
                            col: 2,
                            js: $.toString((options) => {
                                setItem('pic_col_type', input);
                                refreshPage(false);
                                toast('样式切换为：' + input);
                            }, options)
                        }
                        return 'select://' + JSON.stringify(Line);
                    })
                }]
            }
        })
        let chapterList = data.chapterList;
        if (getMyVar('shsort', '0') == '1') {
            chapterList.reverse();
        }
        chapterList.forEach(data => {
            d.push({
                title: data.chapterTitle,
                img: this.images(data.coverImg),
                url: this.comics(data.chapterId),
                col_type: getItem('pic_col_type', 'text_2'),
                extra: {
                    cls: '选集_',
                    lineVisible: false,
                }
            })
        })
        d.push({
            col_type: 'blank_block',
            extra: {
                id: 'blank',
            }
        }, {
            title: '<b><span style="color: #ff847c">推荐</span></b>',
            img: 'http://123.56.105.145/tubiao/messy/9.svg',
            url: $('#noLoading#').lazyRule(() => {
                refreshPage(false)
                return 'hiker://empty'
            }),
            col_type: 'text_icon',
            extra: {

            }
        })
        more.forEach(data => {
            d.push({
                title: data.comicsTitle,
                img: this.images(data.coverImg),
                url: $('hiker://empty?#immersiveTheme#').rule(() => {
                    $.require('csdown').comic_erji();
                }),
                col_type: 'movie_3',
                extra: {
                    comic_id: data.comicsId,
                    pageTitle: data.comicsTitle,
                }
            })
        })
        setResult(d)
    },
    comic: function() {
        let d = this.d,
            pg = MY_PAGE;
        if (MY_PAGE == 1) {
            if (!storage0.getItem('comic_classifyList')) {
                let comic_classifyList = this.post('comics/other/classList').data.map(data => {
                    return {
                        name: data.title,
                        id: data.classId,
                    }
                });
                storage0.setItem('comic_classifyList', comic_classifyList)
            }
            let comic_classifyList = storage0.getItem('comic_classifyList');
            this.top_Cate(comic_classifyList, 'comic', d);
            let 分类 = [{
                title: '最近更新&精选推荐&观看最多',
                id: '1&2&3'
            }];
            this.Cate(分类, 'comic_cate', d)
        }
        let comic_ = getMyVar('comic', getItem('comic_index'));
        if (!storage0.getMyVar('comic_' + comic_ + getMyVar('comic_cate', '1') + pg)) {
            let d_ = [];
            let comic_list = this.post('comics/base/findList', {
                "page": pg,
                "pageSize": 20,
                "orderType": +getMyVar('comic_cate', '1'),
                "classId": +comic_
            }).data;
            comic_list.forEach(data => {
                d_.push({
                    title: data.comicsTitle,
                    img: this.images(data.coverImg),
                    url: $('hiker://empty?#immersiveTheme#').rule(() => {
                        $.require('csdown').comic_erji();
                    }),
                    col_type: 'movie_3',
                    extra: {
                        comic_id: data.comicsId,
                    }
                })
            })
            storage0.putMyVar('comic_' + comic_ + getMyVar('comic_cate', '1') + pg, d_);
        }
        storage0.getMyVar('comic_' + comic_ + getMyVar('comic_cate', '1') + pg).forEach(data => d.push(data));
    },
    dark: function() {
        let d = this.d,
            pg = MY_PAGE;
        if (MY_PAGE == 1) {
            d.push({
                title: '',
                col_type: 'rich_text',
            })
        }
        let dark = this.post('video/getRankVideos?sortType=1&type=1&page=' + pg + '&pageSize=20').data;
        dark.forEach(data => {
            d.push({
                title: data.title,
                desc: (data.createdAt ? data.createdAt.split('.')[0] : '') + '    ' + parseInt(data.playTime / 60) + ':' + parseInt(data.playTime % 60),
                img: this.images(data.coverImg[0]),
                url: this.vods(data.videoId),
                col_type: 'movie_2',
                extra: {
                    videoId: data.videoId,
                }
            })
        })
        setResult(d)
    },
    topic_more: function() {
        let d = this.d,
            pg = MY_PAGE,
            id = MY_PARAMS.topic_id;
        if (MY_PAGE == 1) {
            d.push({
                title: '',
                col_type: 'rich_text',
            })
            let 社区分类 = [{
                title: '最新&最热&推荐&视频',
                id: '5&6&7&8'
            }];
            this.Cate(社区分类, 'topic_more', d);
        }
        let list = this.post('dynamic/zone/list?topic=' + id + '&loadType=' + getMyVar('topic_more', '5') + '&page=' + pg + '&pageSize=20').data;
        list.forEach(data => {
            d.push({
                title: data.nickName,
                desc: data.checkAt,
                img: data.logo ? this.images(data.logo) : 'https://img.xxxh.de/1762084615547.png',
                url: 'hiker://empty',
                col_type: 'avatar',
                extra: {
                    user_id: data.userId,
                }
            }, {
                title: data.title,
                url: $('hiker://empty?#gameTheme#&#noHistory#').rule(() => {
                    $.require('csdown').topic_erji();
                }),
                col_type: 'text_1',
                extra: {
                    lineVisible: false,
                    dynamicId: data.dynamicId,
                },
            })
            let img = data.images;
            if (img && img.length < 2) {
                img.forEach(data => {
                    d.push({
                        img: this.images(data + '_480'),
                        url: this.images(data + '_480'),
                        col_type: 'pic_1_full',
                    })
                })
            } else if (img) {
                img.forEach(data => {
                    d.push({
                        img: this.images(data + '_480'),
                        url: this.images(data + '_480'),
                        col_type: 'pic_3',
                    })
                })
            }
            if (data.video) {
                d.push({
                    title: '视频',
                    desc: '0',
                    img: this.images(data.video.coverImg),
                    url: $('hiker://empty?#gameTheme#&#noHistory#').rule(() => {
                        $.require('csdown').topic_erji();
                    }),
                    col_type: 'card_pic_1',
                    extra: {
                        lineVisible: false,
                        dynamicId: data.dynamicId,
                    },
                })
            }
        })
        setResult(d)
    },
    topic_erji: function() {
        let d = this.d,
            pg = MY_PAGE,
            id = MY_PARAMS.dynamicId;
        d.push({
            title: '',
            col_type: 'rich_text',
        })
        let data = this.post('dynamic/zone/dynamicInfo?dynamicId=' + id).data;
        d.push({
            title: data.nickName,
            desc: data.checkAt,
            img: data.logo ? this.images(data.logo) : 'https://img.xxxh.de/1762084615547.png',
            url: 'hiker://empty',
            col_type: 'avatar',
            extra: {
                user_id: data.userId,
            }
        }, {
            title: data.title,
            col_type: 'rich_text',
        })
        if (data.video) {
            d.push({
                title: '视频',
                img: this.images(data.video.coverImg),
                desc: '0',
                url: getItem('host') + 'm3u8/decode/authPath?auth_key=' + data.video.authKey + '&path=' + data.video.videoUrl,
                col_type: 'card_pic_1',
            })
        }
        if (data.contentText) {
            d.push({
                title: data.contentText,
                col_type: 'rich_text'
            })
        }
        let img = data.images;
        if (img) {
            img.forEach(data => {
                d.push({
                    img: this.images(data + '_480'),
                    url: this.images(data + '_480'),
                    col_type: 'pic_1_full',
                })
            })
        }
        setResult(d)
    },
    topic: function() {
        let d = this.d,
            pg = MY_PAGE;
        if (MY_PAGE == 1) {
            let 社区分类 = [{
                title: '最新&最热&推荐&视频',
                id: '1&2&3&4'
            }];
            this.Cate(社区分类, '社区分类', d);
            if (!storage0.getMyVar('topic_')) {
                let topic = this.post('topic/zone/list?page=1&pageSize=6').data;
                storage0.putMyVar('topic_', topic);
            }
            storage0.getMyVar('topic_').forEach(data => {
                d.push({
                    title: data.name,
                    img: this.images(data.logo + '_480'),
                    url: $('hiker://empty?page=fypage&#gameTheme#&#noHistory#').rule(() => {
                        $.require('csdown').topic_more();
                    }),
                    col_type: 'card_pic_3_center',
                    extra: {
                        topic_id: data.name,
                    }
                })
            })
        }
        if (!storage0.getMyVar('topic_' + getMyVar('社区分类', '1') + pg)) {
            let d_ = [];
            let zone = this.post('dynamic/zone/list?loadType=' + getMyVar('社区分类', '1') + '&page=' + pg + '&pageSize=20').data;
            zone.forEach(data => {
                d_.push({
                    title: data.nickName,
                    desc: data.checkAt,
                    img: data.logo ? this.images(data.logo) : 'https://img.xxxh.de/1762084615547.png',
                    url: 'hiker://empty',
                    col_type: 'avatar',
                    extra: {
                        user_id: data.userId,
                    }
                }, {
                    title: data.title,
                    url: $('hiker://empty?#gameTheme#&#noHistory#').rule(() => {
                        $.require('csdown').topic_erji();
                    }),
                    col_type: 'text_1',
                    extra: {
                        lineVisible: false,
                        dynamicId: data.dynamicId,
                    },
                })
                let img = data.images;
                if (img && img.length < 2) {
                    img.forEach(data => {
                        d_.push({
                            img: this.images(data + '_480'),
                            url: this.images(data + '_480'),
                            col_type: 'pic_1_full',
                        })
                    })
                } else if (img) {
                    img.forEach(data => {
                        d_.push({
                            img: this.images(data + '_480'),
                            url: this.images(data + '_480'),
                            col_type: 'pic_3',
                        })
                    })
                }
                if (data.video) {
                    d_.push({
                        title: '视频',
                        desc: '0',
                        img: this.images(data.video.coverImg),
                        url: $('hiker://empty?#gameTheme#&#noHistory#').rule(() => {
                            $.require('csdown').topic_erji();
                        }),
                        col_type: 'card_pic_1',
                        extra: {
                            lineVisible: false,
                            dynamicId: data.dynamicId,
                        },
                    })
                }
            })
            storage0.putMyVar('topic_' + getMyVar('社区分类', '1') + pg, d_)
        }
        storage0.getMyVar('topic_' + getMyVar('社区分类', '1') + pg).forEach(data => d.push(data));
    },
    recommend: function() {
        let d = this.d,
            pg = MY_PAGE,
            dailyRecommendList = this.post('video/dailyRecommendList?page=' + pg + '&pageSize=300').data;
        if (MY_PAGE == 1) {
            d.push({
                title: '',
                col_type: 'rich_text',
            })
        }
        dailyRecommendList.forEach(item => {
            d.push({
                title: this.strong(item.dateStr + '推荐', 'ff6699'),
                url: 'hiker://empty',
                col_type: 'text_center_1',
                extra: {
                    lineVisible: false,
                }
            })
            item.videoList.forEach(data => {
                d.push({
                    title: data.title,
                    desc: (data.createdAt ? data.createdAt.split('.')[0] : '') + '    ' + parseInt(data.playTime / 60) + ':' + parseInt(data.playTime % 60),
                    img: this.images(data.coverImg[0]),
                    url: this.vods(data.videoId),
                    col_type: 'movie_2',
                    extra: {
                        videoId: data.videoId,
                    }
                })
            })
        })
        setResult(d)
    },
    video_more: function() {
        let d = this.d,
            id = MY_PARAMS.stationId,
            name = MY_PARAMS.stationName,
            pg = MY_PAGE;
        if (MY_PAGE == 1) {
            d.push({
                title: '',
                col_type: 'rich_text',
            }, {
                title: `‘‘${name}’’`,
                url: 'hiker://empty',
                col_type: 'text_center_1',
                extra: {
                    lineVisible: false,
                }
            })
            this.Cate([{
                title: '最近更新&精选推荐&最热影片&观看最多',
                id: '1&2&3&4',
            }], 'video_more_sort', d);
        }
        let list = this.post('station/getStationMore?pageSize=20&page=' + pg + '&stationId=' + id + '&sortType=' + getMyVar('video_more_sort', '1')).data;
        list.forEach(data => {
            d.push({
                title: data.title,
                desc: (data.createdAt ? data.createdAt.split('.')[0] : '') + '    ' + parseInt(data.playTime / 60) + ':' + parseInt(data.playTime % 60),
                img: this.images(data.coverImg[0]),
                url: this.vods(data.videoId),
                col_type: 'movie_2',
                extra: {
                    videoId: data.videoId,
                }
            })
        })
        setResult(d)
    },
    video: function() {
        let d = this.d,
            pg = MY_PAGE;
        if (MY_PAGE == 1) {
            if (!storage0.getItem('video_classifyList')) {
                let video_classifyList = this.post('video/classifyList').data.map(data => {
                    return {
                        name: data.classifyTitle,
                        id: data.classifyId,
                    }
                });
                storage0.setItem('video_classifyList', video_classifyList)
            }
            let video_classifyList = storage0.getItem('video_classifyList');
            this.top_Cate(video_classifyList, 'video', d);
        }
        let video_ = getMyVar('video', getItem('video_index'));
        if (video_ == getItem('video_index')) {
            if (MY_PAGE == 1) {
                d.push({
                    title: '““推荐””',
                    url: $('hiker://empty?page=fypage&#gameTheme#&#noHistory#').rule(() => {
                        $.require('csdown').recommend();
                    }),
                    col_type: 'text_center_1',
                    extra: {
                        lineVisible: false,
                        longClick: [{
                            title: '打开暗网',
                            js: $.toString(() => {
                                return $('hiker://empty?page=fypage&#gameTheme##noHistory#').rule(() => {
                                    $.require('csdown').dark();
                                })
                            }),
                        }]
                    }
                })
            }
            if (!storage0.getMyVar('video_' + video_ + pg)) {
                let video_list = this.post('station/getStationIndex?classifyId=' + video_ + '&page=' + pg + '&pageSize=20').data;
                let d_ = [];
                video_list.forEach(item => {
                    d_.push({
                        title: this.color(item.stationName),
                        img: 'hiker://images/icon_right5',
                        url: $('hiker://empty?page=fypage&#gameTheme##noHistory#').rule(() => {
                            $.require('csdown').video_more();
                        }),
                        col_type: 'text_icon',
                        extra: {
                            stationId: item.stationId,
                            stationName: item.stationName,
                        }
                    });
                    item.videoList.forEach(data => {
                        d_.push({
                            title: data.title,
                            desc: (data.createdAt ? data.createdAt.split('.')[0] : '') + '    ' + parseInt(data.playTime / 60) + ':' + parseInt(data.playTime % 60),
                            img: this.images(data.coverImg[0]),
                            url: this.vods(data.videoId),
                            col_type: 'movie_2',
                            extra: {
                                videoId: data.videoId,
                            }
                        })
                    })
                })
                storage0.putMyVar('video_' + video_ + pg, d_);
            }
            storage0.getMyVar('video_' + video_ + pg).forEach(data => d.push(data));
        } else {
            if (MY_PAGE == 1) {
                this.Cate([{
                    title: '最近更新&精选推荐&最热影片&观看最多',
                    id: '1&2&3&4',
                }], 'video_sort', d);
                if (!storage0.getMyVar('getZoneListByClassifyId' + video_)) {
                    let getZoneListByClassifyId = this.post('video/getZoneListByClassifyId?classifyId=' + video_).data.map(data => {
                        return {
                            name: data.zoneTitle,
                            id: data.zoneId,
                        }
                    });
                    storage0.putMyVar('getZoneListByClassifyId' + video_, getZoneListByClassifyId);
                }
                storage0.getMyVar('getZoneListByClassifyId' + video_).forEach(data => {
                    d.push({
                        title: data.name,
                        url: $('hiker://empty?page=fypage&#gameTheme#&#noHistory#').rule(() => {
                            $.require('csdown').video_more();
                        }),
                        col_type: 'text_4',
                        extra: {
                            stationId: data.id,
                            stationName: data.name,
                        }
                    })
                })
            }
            if (!storage0.getMyVar('video_' + video_ + getMyVar('video_sort', '1') + pg)) {
                let video_list = this.post('video/queryVideos?sortType=' + getMyVar('video_sort', '1') + '&page=' + pg + '&pageSize=20&classifyId=' + video_).data;
                let d_ = [];
                video_list.forEach(data => {
                    d_.push({
                        title: data.title,
                        desc: (data.createdAt ? data.createdAt.split('.')[0] : '') + '    ' + parseInt(data.playTime / 60) + ':' + parseInt(data.playTime % 60),
                        img: this.images(data.coverImg[0]),
                        url: this.vods(data.videoId),
                        col_type: 'movie_2',
                        extra: {
                            videoId: data.videoId,
                        }
                    })
                })
                storage0.putMyVar('video_' + video_ + getMyVar('video_sort', '1') + pg, d_);
            }
            storage0.getMyVar('video_' + video_ + getMyVar('video_sort', '1') + pg).forEach(data => d.push(data));
        }
    },
    black_erji: function() {
        let d = this.d,
            id = MY_PARAMS.dynamicId;
        let info = this.post('community/dynamic/dynamicInfo?dynamicId=' + id).data;
        d.push({
            title: '',
            col_type: 'rich_text'
        })
        d.push({
            title: info.title,
            col_type: 'rich_text',
        })
        info.contents.forEach(data => {
            let type = data.type;
            if (type == 2) {
                video = data.video;
                d.push({
                    title: '视频',
                    img: this.images(video.coverImg[0]),
                    desc: '0',
                    url: getItem('host').replace('/api/', '') + '/api/m3u8/decode/authPath?auth_key=' + info.auth_key + '&path=' + video.videoUrl,
                    col_type: 'card_pic_1',
                })
            }
        })
        info.contents.forEach(data => {
            let type = data.type;
            if (type == 0) {
                d.push({
                    title: data.text.replace(/\n/g, '<br>'),
                    col_type: 'rich_text',
                })
            } else if (type == 1) {
                data.images.forEach(item => {
                    d.push({
                        img: this.images(item),
                        url: this.images(item),
                        col_type: 'pic_1_full',
                    })
                })
            } else if (type == 2) {
                video = data.video;
                d.push({
                    title: '视频',
                    img: this.images(video.coverImg[0]),
                    desc: '0',
                    url: getItem('host').replace('/api/', '') + '/api/m3u8/decode/authPath?auth_key=' + info.auth_key + '&path=' + video.videoUrl,
                    col_type: 'card_pic_1',
                })
            }
        })
        setResult(d)
    },
    black: function() {
        let d = this.d,
            pg = MY_PAGE;
        try {
            if (MY_PAGE == 1) {
                this.info();
                if (!storage0.getItem('getDynClassifys')) {
                    let getDynClassifys = this.post('community/dynamic/getDynClassifys').data.map(data => {
                        return {
                            name: data.classifyTitle,
                            id: data.classifyId,
                        }
                    })
                    storage0.setItem('getDynClassifys', getDynClassifys);
                };
                let getDynClassifys = storage0.getItem('getDynClassifys');
                this.top_Cate(getDynClassifys, 'black', d);
            }
            let black_ = getMyVar('black', getItem('black_index'));
            if (!storage0.getMyVar('black' + black_ + pg)) {
                let d_ = [];
                let community = this.post('community/dynamic/list?classifyId=' + black_ + '&page=' + pg + '&pageSize=20').data;
                community.forEach(data => {
                    d_.push({
                        title: data.title,
                        desc: (data.checkAt ? data.checkAt.split('.')[0] : '') + ' 浏览数：' + data.fakeWatchTimes + ' \n' + (data.classifyTitles && data.classifyTitles.length != 0 ? data.classifyTitles.join(' ') : ''),
                        img: this.images(data.coverImg[0] + '_480'),
                        url: $('hiker://empty?#gameTheme##noHistory#').rule(() => {
                            $.require('csdown').black_erji();
                        }),
                        col_type: 'pic_1_card',
                        extra: {
                            dynamicId: data.dynamicId,
                        }
                    })
                })
                storage0.putMyVar('black' + black_ + pg, d_);
            }
            storage0.getMyVar('black' + black_ + pg).forEach(data => d.push(data));
        } catch (e) {
            log(e.message);
            if (getMyVar('a') == '') {
                //let host_arr = JSON.parse(fetch('https://d3vymh21nygiy.cloudfront.net/bghl.json'));
                let host_arr = ['https://dm.e0albx1.work', 'https://v4mycsc.fi05ait.work'];
                for (let item of host_arr) {
                    let live = JSON.parse(fetch(item + '/api/sys/live', {
                        onlyHeaders: true,
                        timeout: 5000,
                    }));
                    if (live.statusCode == 200) {
                        setItem('host', item + '/api/');
                        break;
                    }
                }
                // 调用方法生成随机字符串
                let deviceId = this.generateRandomHex(32);
                setItem('deviceId', deviceId)
                let token_url = getItem('host') + 'user/traveler';
                let time = Math.floor(Date.now()) + '';
                let s = md5(time.toString().substring(3, 8));
                let token_data = JSON.parse(fetch(token_url, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        't': time,
                        's': s,
                        'deviceid': deviceId,
                    },
                    body: {
                        "deviceId": deviceId,
                        "tt": "D",
                        "code": ""
                    },
                    method: 'POST'
                }));
                let token = token_data.data.token;
                let imgDomain = token_data.data.imgDomain;
                setItem('token', token);
                setItem('imgDomain', imgDomain);
                setItem('inviteCode', token_data.data.inviteCode);
                refreshPage(false);
                putMyVar('a', '1');
                toast('域名已更新')
            }
        }
    },
    home: function() {
        var d = this.d;
        if (MY_PAGE == 1) {
            d.push({   
                title: "搜索 ",
                url: $.toString(() => {
                    putMyVar('keyword', input)
                    return $('hiker://empty?page=fypage&#gameTheme#').rule(() => {
                        $.require('csdown').search()
                    })
                }),
                desc: "请输入搜索关键词",
                 col_type: "input",
                extra: {
                    defaultValue: getMyVar('keyword', ''),
                    onChange: $.toString(() => {
                        putMyVar('keyword', input)
                    })
                }
            })
        };
        let pg = MY_PAGE;
        if (MY_PAGE == 1) {
            let 首页 = [{
                title: '吃瓜&视频&社区&漫画&色图',
                id: '1&2&3&4&5',
                img: 'https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/47.png&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/175.png&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/78.png&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/48.png&https://ghproxy.net/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/109.png'
            }];
            this.Cate(首页, '首页', d, 'icon_5');
            d.push({
                col_type: 'big_blank_block',
            }, {
                col_type: 'big_blank_block',
            });
        }
        let 分类 = getMyVar('首页', '1');
        if (MY_RULE.author == this.author || MY_NAME == '嗅觉浏览器') {
            if (分类 == 1) {
                this.black()
            } else if (分类 == 2) {
                this.video()
            } else if (分类 == 3) {
                this.topic()
            } else if (分类 == 4) {
                this.comic()
            } else if (分类 == 5) {
                this.portray()
            }
        } else {
            d.push({
                title: '请勿修改作者名称',
                url: 'hiker://empty',
                col_type: 'text_center_1',
            })
        }
        setResult(d)
    },
    color: function(txt) {
        return '<b><font color=' + '#FF6699' + '>' + txt + '</font></b>'
    },
    strong: function(d, c) {
        return '‘‘’’<strong><font color=#' + (c || '000000') + '>' + d + '</font></strong>';
    },
    addressTag: function(url, text) {
        return "<a href='" + url + "'>" + text + "</a>";
    },
    top_Cate: function(list, n, d, col, longclick) {
        col = col || 'scroll_button';
        longclick = longclick || [];
        setItem(n + '_index', list[0].id + '');
        let n_ = getMyVar(n, getItem(n + '_index'));
        list.forEach(data => {
            d.push({
                title: (n_ == data.id ? this.strong(data.name, 'FF6699') : data.name),
                img: data.img || '',
                url: $('#noLoading#').lazyRule((n, name, nowid, newid) => {
                    if (newid != nowid) {
                        putMyVar(n, newid);
                        refreshPage(false);
                    }
                    return 'hiker://empty';
                }, n, data.name, n_, data.id + ''),
                col_type: col,
                extra: {
                    longClick: longclick,
                    backgroundColor: n_ == data.id ? "#20FA7298" : "",
                }
            })
        })
        d.push({
            col_type: 'blank_block',
        });
        return d
    },
    Cate: function(list, n, d, col, longclick) {
        col = col || 'scroll_button';
        longclick = longclick || [];
        let index_n = list[0].id.split('&')[0] + '';
        list.forEach(data => {
            let title = data.title.split('&');
            let id = data.id.split('&');
            let img = data.img != null ? data.img.split('&') : [];
            let n_ = getMyVar(n, index_n);
            title.forEach((title, index) => {
                d.push({
                    title: (n_ == id[index] ? (col == 'icon_small_3' ? this.color(title) : this.strong(title, 'FF6699')) : title),
                    img: img[index],
                    url: $('#noLoading#').lazyRule((n, title, nowid, newid) => {
                        if (newid != nowid) {
                            putMyVar(n, newid);
                            refreshPage(false);
                        }
                        return 'hiker://empty';
                    }, n, title, n_, id[index] + ''),
                    col_type: col,
                    extra: {
                        longClick: longclick,
                        backgroundColor: n_ == id[index] ? "#20FA7298" : "",
                    }
                })
            })
            d.push({
                col_type: 'blank_block',
            });
        })
        return d;
    },
    info: function() {
        if (!getMyVar('info', '')) {
            let info = this.post('user/base/info', {});
            setItem('imgDomain', info.imgDomain);
            putMyVar('info', '1');
        }
    },
    post: function(url, body) {
        // 解密函数
        function Decrypt(word) {
            eval(getCryptoJS());
            const key = CryptoJS.enc.Utf8.parse("JhbGciOiJIUzI1Ni");
            let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
            let decrypt = CryptoJS.AES.decrypt({
                ciphertext: encryptedHexStr
            }, key, {
                iv: key,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            return decryptedStr;
        };
        url = getItem('host') + url;
        body = JSON.stringify(body) || '';
        token = getItem('token') || '';
        deviceId = getItem('deviceId') || '';
        let time = Math.floor(Date.now()) + '';
        let s = md5(time.toString().substring(3, 8));
        let html = fetch(url, {
            headers: {
                'aut': token,
                'Content-Type': 'application/json;charset=utf-8',
                't': time,
                's': s,
                'deviceId': deviceId,
            },
            body: body,
            method: body == '' ? 'GET' : 'POST',
        });
        let html1 = JSON.parse(html).encData;
        let html2 = Decrypt(html1);
        return JSON.parse(html2);
    },
    // 随机字符串方法
    generateRandomHex: function(length) {
        var result = '';
        var characters = '0123456789abcdef';
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    },
    image: function() {
        const FileUtil = com.example.hikerview.utils.FileUtil;
        let data = FileUtil.toBytes(input);
        let key = '2020-zq3-888'.split('').map(c => c.charCodeAt(0));
        let keyLen = key.length;
        let limit = Math.min(100, data.length);
        for (let i = 0; i < limit; i++) {
            data[i] = data[i] ^ key[i % keyLen];
        }
        return FileUtil.toInputStream(data);
    },
    images: function(pic) {
        pic = getItem('imgDomain') + pic;
        return $(pic).image(() => {
            return $.require('csdown?rule=' + MY_TITLE).image();
        })
    },
    vods: function(id) {
        return $().lazyRule((id) => {
            return $.require('csdown').vod(id);
        }, id);
    },
    vod: function(id) {
        let data = this.post('video/getVideoById?videoId=' + id);
        let url = getItem('host') + 'm3u8/decode/authPath?auth_key=' + data.authKey + '&path=' + data.videoUrl;
        return url;
    },
    formatNumberToTenThousand: function(num) {
        if (num < 10000) {
            return num.toString() + '字'; // 小于1万直接返回
        }
        const tenThousand = num / 10000;
        // 保留一位小数，然后转换为字符串
        let result = tenThousand.toFixed(1);
        // 如果小数部分是0，可以去掉小数部分（可选）
        if (result.endsWith('.0')) {
            result = result.slice(0, -2);
        }
        return result + '万字';
    },
    setDesc: function(d, desc, num) {
        //log(desc)
        if (desc == undefined) {
            return;
        }
        desc = desc.constructor == Array ? desc.join('<br>') : desc;
        if (desc.replace(/(<br>|\s+|<\/?p>|&nbsp;)/g, '').length == 0) {
            return;
        }
        const mark = 'desc';
        num = typeof(num) == 'undefined' ? 45 : num
        desc = desc.startsWith('　　') ? desc : '　　' + desc;
        desc = desc.replace(/'/g, "&#39;");
        desc = desc.replace(/\r\n/g, "<br>");
        desc = desc.replace(/\r/g, "<br>");
        desc = desc.replace(/\n/g, "<br>").replace(/[<p>|</p>]/g, "").replace(/br/g, '<br>');

        function substr(str, maxLength) {
            let len = 0;
            for (let i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255) {
                    len += 2;
                } else {
                    len++;
                }
                if (len > maxLength) {
                    return str.slice(0, i) + '...';
                }
            }
            return str;
        }
        let sdesc = substr(desc, num);
        var colors = {
            show: "black",
            hide: "grey"
        }
        var lazy = $(`#noLoading#`).lazyRule((dc, sdc, m, cs) => {
            var show = storage0.getItem(m, '0');
            var title = findItem('desc').title;
            var re = /(<\/small><br>.*?>).+/g;
            var exp = '展开:';
            var ret = '收起:';
            if (show == '1') {
                updateItem('desc', {
                    title: title
                        .replace(ret, exp)
                        .replace(re, '$1' + sdc + '</small>')
                        .replace(/(<\/small><br>\<font color=").*?(">)/, '$1' + cs.hide + '$2')
                })
                storage0.setItem(m, '0');
            } else {
                updateItem('desc', {
                    title: title
                        .replace(exp, ret)
                        .replace(re, '$1' + dc + '</small>')
                        .replace(/(<\/small><br>\<font color=").*?(">)/, '$1' + cs.show + '$2')
                })
                storage0.setItem(m, '1');
            }
            return `hiker://empty`
        }, desc, sdesc, mark, colors)
        var sc = storage0.getItem(mark, '0') == '0' ? '展开:' : '收起:';
        var dc = storage0.getItem(mark, '0') == '0' ? sdesc : desc;
        var cs = storage0.getItem(mark, '0') == '0' ? colors.hide : colors.show;
        d.push({
            title: '' + '<b><font color="#098AC1">∷剧情简介	</font></b>' + "<small><a style='text-decoration: none;' href='" + lazy + "'>" + sc + '</a></small><br><font color="' + cs + '">' + `${dc}` + '</small>',
            col_type: 'rich_text',
            extra: {
                id: 'desc',
                lineSpacing: 6,
                textSize: 15,
                lineVisible: true,
            }
        })
    },
    shsort: function() {
        let shsort = getMyVar('shsort');
        putMyVar('shsort', shsort == '1' ? '0' : '1');
        shsort = getMyVar('shsort');
        try {
            let urls = findItemsByCls("选集_") || [];
            deleteItemByCls('选集_');
            urls.reverse();
            urls.forEach(item => {
                item.col_type = item.type;
            });
            updateItem('排序', {
                title: (shsort == '1') ? '““””<b><span style="color: #FF0000">逆序</span></b>' : '““””<b><span style="color: #1aad19">正序</span></b>',
            })
            addItemAfter('排序', urls);
            toast('切换排序成功');
        } catch (e) {
            refreshPage(false)
        }
        return 'hiker://empty';
    },
}
$.exports = csdown